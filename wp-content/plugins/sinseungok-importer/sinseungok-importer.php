<?php
/**
 * Plugin Name: Sinseungok Importer V2.4
 * Description: Fix 503 bằng Ajax Queue, đầy đủ tính năng Import WooCommerce và Log.
 * Version: 2.4
 * Author: Gemini AI
 */

if (!defined('ABSPATH')) exit;

class Sinseungok_Importer_V2_4 {

    private $json_file;
    private $log_file;
    private $json_url;

    public function __construct() {
        $upload_dir = wp_upload_dir();
        $this->json_file = $upload_dir['basedir'] . '/sinseungok_products.json';
        $this->json_url  = $upload_dir['baseurl'] . '/sinseungok_products.json';
        $this->log_file  = $upload_dir['basedir'] . '/importer_log.txt';
        
        add_action('admin_menu', [$this, 'add_admin_menu']);
        add_action('wp_ajax_process_single_sku', [$this, 'ajax_process_single_sku']);
        add_action('wp_ajax_get_importer_logs', [$this, 'ajax_get_logs']);
        add_action('wp_ajax_clear_importer_data', [$this, 'ajax_clear_data']);
    }

    public function add_admin_menu() {
        add_menu_page('Sinseungok Importer', 'Sinseungok Importer', 'manage_options', 'sinseungok-importer', [$this, 'admin_page_html'], 'dashicons-download');
    }

    private function log($message) {
        $time = date("H:i:s");
        file_put_contents($this->log_file, "[$time] $message" . PHP_EOL, FILE_APPEND);
    }

    // --- CƠ CHẾ QUÉT DỮ LIỆU (AJAX) ---
    public function ajax_process_single_sku() {
        $sku = sanitize_text_field($_POST['sku']);
        
        $search_url = "https://www.sinseungok.com/?s=" . urlencode($sku);
        $resp = $this->fetch_url($search_url);

        if (is_wp_error($resp)) wp_send_json_error("Lỗi: " . $resp->get_error_message());
        
        if (wp_remote_retrieve_response_code($resp) == 503) {
            $this->log("!!! 503 detected cho SKU $sku - Đợi 10s...");
            wp_send_json_error("503"); // Gửi tín hiệu để JS biết và đợi lâu hơn
        }

        $detail_url = $this->get_detail_link(wp_remote_retrieve_body($resp));
        if ($detail_url) {
            $detail_resp = $this->fetch_url($detail_url);
            if (!is_wp_error($detail_resp)) {
                $product_data = $this->parse_detail_page(wp_remote_retrieve_body($detail_resp), $sku);
                
                $current_data = file_exists($this->json_file) ? json_decode(file_get_contents($this->json_file), true) : [];
                $current_data[] = $product_data;
                file_put_contents($this->json_file, json_encode($current_data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
                
                $this->log(" -> OK: $sku");
                wp_send_json_success();
            }
        }
        $this->log(" -> Không thấy SP: $sku");
        wp_send_json_error("Not found");
    }

    private function fetch_url($url) {
        $args = [
            'timeout'    => 30,
            'user-agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'headers'    => ['referer' => 'https://www.sinseungok.com/']
        ];
        return wp_remote_get($url, $args);
    }

    // --- CƠ CHẾ IMPORT WOOCOMMERCE (PHP thuần - vì data đã nằm trong JSON của bạn) ---
    private function process_woocommerce_import() {
        if (!file_exists($this->json_file)) return;
        require_once(ABSPATH . 'wp-admin/includes/media.php');
        require_once(ABSPATH . 'wp-admin/includes/file.php');
        require_once(ABSPATH . 'wp-admin/includes/image.php');

        $items = json_decode(file_get_contents($this->json_file), true);
        $this->log("--- BẮT ĐẦU IMPORT VÀO WOO (" . count($items) . " SP) ---");

        foreach ($items as $item) {
            $existing_id = wc_get_product_id_by_sku($item['sku']);
            $product = $existing_id ? wc_get_product($existing_id) : new WC_Product_Simple();
            
            $product->set_sku($item['sku']);
            $product->set_name($item['title']);
            $product->set_status('publish');
            $product->set_short_description($item['short_description']);
            $product->set_description($item['description']);
            $product->set_category_ids($this->get_or_create_categories($item['categories']));
            $id = $product->save();

            if ($item['image_url'] && !has_post_thumbnail($id)) {
                $img_id = media_sideload_image($item['image_url'], $id, $item['title'], 'id');
                if (!is_wp_error($img_id)) set_post_thumbnail($id, $img_id);
            }
            $this->log(" > Đã import: " . $item['sku']);
        }
        $this->log("--- IMPORT HOÀN TẤT ---");
    }

    // --- HELPER FUNCTIONS ---
    private function get_or_create_categories($categories) {
        $parent_id = 0; $final_ids = [];
        foreach ($categories as $cat_name) {
            $term = get_term_by('name', $cat_name, 'product_cat');
            if (!$term) {
                $new_term = wp_insert_term($cat_name, 'product_cat', ['parent' => $parent_id]);
                if (!is_wp_error($new_term)) $parent_id = $new_term['term_id'];
            } else { $parent_id = $term->term_id; }
            $final_ids[] = $parent_id;
        }
        return $final_ids;
    }

    private function get_detail_link($html) {
        $dom = new DOMDocument(); @$dom->loadHTML('<?xml encoding="UTF-8">' . $html);
        $xpath = new DOMXPath($dom);
        $nodes = $xpath->query("//div[contains(@class, 'text-box')]//a/@href");
        return ($nodes->length > 0) ? $nodes->item(0)->nodeValue : false;
    }

    private function parse_detail_page($html, $sku) {
        $dom = new DOMDocument(); @$dom->loadHTML('<?xml encoding="UTF-8">' . $html);
        $xpath = new DOMXPath($dom);
        $data = ['sku' => $sku];

        // Lấy Category
        $temp_cats = [];
        foreach ($xpath->query("//div[contains(@class, 'crumbs-box')]//a | //div[contains(@class, 'crumbs-box')]//span") as $node) {
            $txt = trim($node->nodeValue);
            if ($txt && !in_array($txt, ['>', 'Home', 'Products'])) $temp_cats[] = $txt;
        }
        if (!empty($temp_cats)) array_pop($temp_cats);
        $data['categories'] = array_merge(['Sinseungok'], $temp_cats);
        
        $t = $xpath->query("//h1[contains(@class, 't')]");
        $data['title'] = ($t->length > 0) ? trim($t->item(0)->nodeValue) : $sku;

        $img = $xpath->query("//div[contains(@class, 'video-thumb-only')]//img");
        $data['image_url'] = ($img->length > 0) ? ($img->item(0)->getAttribute('data-lazy-src') ?: $img->item(0)->getAttribute('src')) : '';

        $data['short_description'] = $this->get_inner_html($xpath, "//div[contains(@class, 'tips-box')]//div[contains(@class, 'd')]", $dom);
        $spe = $this->get_inner_html($xpath, "//div[contains(@class, 'prodis-spe')]", $dom);
        $feature = $this->get_inner_html($xpath, "//div[contains(@class, 'prodis-feature')]", $dom);
        $data['description'] = $spe . '<hr>' . $feature;

        return $data;
    }

    private function get_inner_html($xpath, $query, $dom) {
        $nodes = $xpath->query($query);
        if ($nodes->length > 0) {
            $inner = "";
            foreach ($nodes->item(0)->childNodes as $child) { $inner .= $dom->saveHTML($child); }
            return stripslashes($inner);
        }
        return '';
    }

    public function ajax_get_logs() {
        if (file_exists($this->log_file)) echo nl2br(esc_html(file_get_contents($this->log_file)));
        wp_die();
    }

    public function ajax_clear_data() {
        if (file_exists($this->json_file)) unlink($this->json_file);
        file_put_contents($this->log_file, "--- ĐÃ XÓA DỮ LIỆU CŨ ---" . PHP_EOL);
        wp_die();
    }

    // --- GIAO DIỆN ADMIN ---
    public function admin_page_html() {
        if (isset($_POST['run_import'])) {
            $this->process_woocommerce_import();
        }
        $json_exists = file_exists($this->json_file);
        ?>
        <div class="wrap">
            <h1>Sinseungok Importer V2.4</h1>
            <div class="card" style="padding: 20px; border-left: 4px solid #27ae60; margin-bottom: 20px;">
                <h3>Bước 1: Quét dữ liệu (Chống 503)</h3>
                <textarea id="sku_list" rows="6" style="width:100%;" placeholder="Dán danh sách SKU tại đây..."></textarea>
                <div style="margin-top:10px;">
                    <button id="btn_start_crawl" class="button button-primary">Bắt đầu Quét</button>
                    <button id="btn_clear" class="button">Xóa dữ liệu cũ (JSON)</button>
                    <?php if ($json_exists): ?>
                        <a href="<?php echo $this->json_url; ?>" target="_blank" class="button button-secondary">Mở file JSON</a>
                    <?php endif; ?>
                </div>
                <div id="progress_container" style="display:none; margin-top:15px;">
                    <strong>Tiến độ: <span id="progress_status">0/0</span></strong>
                    <div style="background:#ddd; height:20px; width:100%;"><div id="progress_bar" style="background:#27ae60; height:100%; width:0%;"></div></div>
                </div>
            </div>

            <div class="card" style="padding: 20px; border-left: 4px solid #2980b9;">
                <h3>Bước 2: Import vào WooCommerce</h3>
                <form method="post">
                    <button type="submit" name="run_import" class="button button-primary" <?php echo !$json_exists ? 'disabled' : ''; ?>>
                        Đẩy dữ liệu từ JSON vào sản phẩm Woo
                    </button>
                </form>
            </div>

            <h3>Nhật ký hệ thống:</h3>
            <div id="logs-box" style="background:#000; color:#0f0; padding:15px; height:300px; overflow-y:scroll; font-family:monospace;"></div>
        </div>

        <script>
        jQuery(document).ready(function($) {
            let skus = [];
            let current = 0;

            $('#btn_start_crawl').click(function() {
                skus = $('#sku_list').val().split('\n').map(s => s.trim()).filter(s => s !== "");
                if (skus.length === 0) return alert("Nhập SKU đã!");
                
                current = 0;
                $('#progress_container').show();
                $(this).prop('disabled', true);
                doNext();
            });

            function doNext() {
                if (current >= skus.length) {
                    alert("Đã quét xong!");
                    location.reload();
                    return;
                }

                $('#progress_status').text((current + 1) + '/' + skus.length);
                $('#progress_bar').css('width', ((current + 1) / skus.length * 100) + '%');

                $.ajax({
                    url: ajaxurl,
                    method: 'POST',
                    data: { action: 'process_single_sku', sku: skus[current] },
                    success: function(res) {
                        let wait = Math.floor(Math.random() * 3000) + 2000; // Nghỉ 2-5s
                        if (res.data === "503") wait = 10000; // Nếu bị 503 thì nghỉ 10s
                        
                        current++;
                        setTimeout(doNext, wait);
                    },
                    error: function() {
                        setTimeout(doNext, 5000); // Lỗi thì nghỉ 5s rồi thử lại
                    }
                });
            }

            $('#btn_clear').click(function() {
                if(confirm("Xóa file JSON hiện tại?")) {
                    $.post(ajaxurl, { action: 'clear_importer_data' }, function() { location.reload(); });
                }
            });

            setInterval(function() {
                $.post(ajaxurl, { action: 'get_importer_logs' }, function(data) {
                    $('#logs-box').html(data).scrollTop($('#logs-box')[0].scrollHeight);
                });
            }, 2500);
        });
        </script>
        <?php
    }
}
new Sinseungok_Importer_V2_4();