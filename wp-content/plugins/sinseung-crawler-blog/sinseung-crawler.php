<?php
/**
 * Plugin Name: Sinseung Blog Crawler AJAX V2.7
 * Description: Cào dữ liệu, lưu JSON từng bài một để tránh lỗi giới hạn dung lượng trên Hostinger.
 * Version: 2.7
 */

if (!defined('ABSPATH')) exit;

add_action('admin_menu', function() {
    add_menu_page('Sinseung Crawler', 'Sinseung Crawler', 'manage_options', 'ss-crawler', 'ss_crawler_page_html', 'dashicons-rss');
});

function ss_crawler_page_html() {
    $upload_dir = wp_upload_dir();
    $json_url = $upload_dir['baseurl'] . '/data_blog.json';
    ?>
    <div class="wrap">
        <h1>Sinseung Blog Crawler Pro (V2.7)</h1>
        <div style="background:#fff; padding:20px; border:1px solid #ccd0d4; margin-bottom:20px; display: flex; gap: 10px;">
            <button id="btn-crawl" class="button button-primary button-large">🚀 Bắt đầu cào mới (Xóa cũ)</button>
            <button id="btn-import" class="button button-secondary button-large">📥 Import vào Posts</button>
            <a href="<?php echo $json_url; ?>?t=<?php echo time(); ?>" target="_blank" class="button button-large">📂 Mở file JSON</a>
        </div>

        <div id="crawler-log" style="background:#1c1c1c; color:#32ff32; padding:15px; height:450px; overflow-y:auto; font-family:monospace; border-radius:4px; line-height:1.6;">
            > Sẵn sàng...<br>
        </div>
    </div>

    <script>
    jQuery(document).ready(function($) {
        function writeLog(msg, color = '#32ff32') {
            const logBox = $('#crawler-log');
            logBox.append(`<div style="color:${color}">> ${msg}</div>`);
            logBox.scrollTop(logBox[0].scrollHeight);
        }

        $('#btn-crawl').click(function() {
            if(!confirm('Bắt đầu cào mới sẽ xóa file JSON cũ. Tiếp tục?')) return;
            const btn = $(this);
            btn.prop('disabled', true);
            writeLog('--- ĐANG KHỞI TẠO FILE JSON MỚI ---', '#ffcc00');
            
            $.post(ajaxurl, { action: 'ss_ajax_init_json' }, function() {
                crawlStep('https://www.sinseungok.com/news/');
            });
        });

        function crawlStep(url) {
            writeLog(`Đang quét danh sách: ${url}`);
            $.post(ajaxurl, { action: 'ss_ajax_crawl_and_save', target_url: url }, function(res) {
                if(res.success) {
                    res.data.titles.forEach(t => writeLog(`Đã lưu bài: ${t}`, 'cyan'));
                    if(res.data.next_page) {
                        crawlStep(res.data.next_page);
                    } else {
                        writeLog('=== HOÀN TẤT CÀO 100%. FILE JSON ĐÃ SẴN SÀNG ===', '#32ff32');
                        $('#btn-crawl').prop('disabled', false);
                    }
                } else {
                    writeLog('Lỗi: ' + res.data, 'red');
                    $('#btn-crawl').prop('disabled', false);
                }
            });
        }

        $('#btn-import').click(function() {
            const btn = $(this);
            btn.prop('disabled', true);
            writeLog('--- BẮT ĐẦU IMPORT VÀO POSTS ---', '#ffcc00');
            
            $.post(ajaxurl, { action: 'ss_ajax_get_json' }, function(res) {
                if(res.success && res.data.length > 0) {
                    importItem(res.data, 0);
                } else {
                    writeLog('Không có dữ liệu trong JSON.', 'red');
                    btn.prop('disabled', false);
                }
            });
        });

        function importItem(dataArray, index) {
            if(index >= dataArray.length) {
                writeLog('=== IMPORT HOÀN TẤT! ===', '#32ff32');
                $('#btn-import').prop('disabled', false);
                return;
            }
            const item = dataArray[index];
            $.post(ajaxurl, { action: 'ss_ajax_import_post', post_data: item }, function(res) {
                if(res.success) writeLog(`(${index+1}/${dataArray.length}) Thành công: ${item.title}`, 'cyan');
                else writeLog(`(${index+1}/${dataArray.length}) Bỏ qua: ${item.title}`, '#999');
                importItem(dataArray, index + 1);
            });
        }
    });
    </script>
    <?php
}

// KHỞI TẠO FILE JSON RỖNG
add_action('wp_ajax_ss_ajax_init_json', function() {
    $file = wp_upload_dir()['basedir'] . '/data_blog.json';
    file_put_contents($file, json_encode([]));
    wp_send_json_success();
});

// CÀO VÀ GHI ĐÈ DẦN VÀO JSON (CHỐNG QUÁ TẢI)
add_action('wp_ajax_ss_ajax_crawl_and_save', function() {
    $url = $_POST['target_url'];
    $args = ['timeout' => 30, 'user-agent' => 'Mozilla/5.0...', 'sslverify' => false];
    $html = wp_remote_retrieve_body(wp_remote_get($url, $args));
    if (!$html) wp_send_json_error('Crawl error');

    $dom = new DOMDocument(); @$dom->loadHTML('<?xml encoding="utf-8" ?>' . $html);
    $xpath = new DOMXPath($dom);
    $nodes = $xpath->query("//div[contains(@class, 'news-list')]//ul/li");
    
    $file = wp_upload_dir()['basedir'] . '/data_blog.json';
    $current_data = json_decode(file_get_contents($file), true);
    $new_titles = [];

    foreach ($nodes as $node) {
        $link = $xpath->query(".//a[contains(@class, 'img-box')]", $node)->item(0);
        if ($link) {
            $d_url = $link->getAttribute('href');
            if (strpos($d_url, 'http') === false) $d_url = 'https://www.sinseungok.com' . $d_url;
            
            $d_html = wp_remote_retrieve_body(wp_remote_get($d_url, $args));
            $d_dom = new DOMDocument(); @$d_dom->loadHTML('<?xml encoding="utf-8" ?>' . $d_html);
            $d_xpath = new DOMXPath($d_dom);

            $title = ($n = $d_xpath->query("//div[contains(@class, 'ipd-20')]//h1")->item(0)) ? trim($n->nodeValue) : '';
            $img = ($n = $d_xpath->query("//div[contains(@class, 'img-box')]//img")->item(0)) ? $n->getAttribute('src') : '';
            if ($img && strpos($img, 'http') === false) $img = 'https://www.sinseungok.com' . $img;
            
            $catalog_raw = ($n = $d_xpath->query("//div[contains(@class, 'crumbs-box')]")->item(0)) ? trim($n->nodeValue) : '';
            $content = ($n = $d_xpath->query("//div[contains(@class, 'editor-content')]")->item(0)) ? $d_dom->saveHTML($n) : '';

            $item = ['title' => $title, 'image' => $img, 'content' => $content, 'catalog' => $catalog_raw];
            $current_data[] = $item;
            $new_titles[] = $title;
        }
    }

    file_put_contents($file, json_encode($current_data, JSON_UNESCAPED_UNICODE));
    
    $next = $xpath->query("//a[contains(@class, 'nextpostslink')]")->item(0);
    $next_page = $next ? $next->getAttribute('href') : null;
    if ($next_page && strpos($next_page, 'http') === false) $next_page = 'https://www.sinseungok.com' . $next_page;

    wp_send_json_success(['titles' => $new_titles, 'next_page' => $next_page]);
});

// LẤY DỮ LIỆU ĐỂ IMPORT
add_action('wp_ajax_ss_ajax_get_json', function() {
    $file = wp_upload_dir()['basedir'] . '/data_blog.json';
    wp_send_json_success(json_decode(file_get_contents($file), true));
});

// IMPORT TỪNG BÀI (XỬ LÝ CATEGORY)
add_action('wp_ajax_ss_ajax_import_post', function() {
    require_once(ABSPATH . 'wp-admin/includes/image.php');
    require_once(ABSPATH . 'wp-admin/includes/file.php');
    require_once(ABSPATH . 'wp-admin/includes/media.php');

    $item = $_POST['post_data'];
    if (get_page_by_title($item['title'], OBJECT, 'post')) wp_send_json_error('Exists');

    // Xử lý Category
    $cat_ids = [];
    if (!empty($item['catalog'])) {
        $parts = explode('>', $item['catalog']);
        array_pop($parts); 
        $cat_name = trim(end($parts));
        if ($cat_name && $cat_name != 'Home') {
            $term = term_exists($cat_name, 'category');
            if (!$term) $term = wp_insert_term($cat_name, 'category');
            if (!is_wp_error($term)) $cat_ids[] = (int) $term['term_id'];
        }
    }

    $post_id = wp_insert_post([
        'post_title' => $item['title'],
        'post_content' => $item['content'],
        'post_status' => 'publish',
        'post_category' => $cat_ids
    ]);

    if ($post_id && !empty($item['image'])) {
        $attach_id = media_sideload_image($item['image'], $post_id, $item['title'], 'id');
        if (!is_wp_error($attach_id)) set_post_thumbnail($post_id, $attach_id);
    }
    wp_send_json_success($post_id);
});