<?php
/**
 * Plugin Name: Ultimate Social Chat Layout V2
 * Description: Tùy chỉnh linh hoạt vị trí, hình ảnh, màu sắc, link/sđt và tối ưu mobile.
 * Version: 2.1
 */

if (!defined('ABSPATH')) exit;

// 1. TẠO MENU VÀ LƯU SETTINGS
add_action('admin_menu', 'uscl_admin_menu');
function uscl_admin_menu() {
    add_menu_page('Social Chat Config', 'Social Chat', 'manage_options', 'uscl-settings', 'uscl_settings_page', 'dashicons-share');
}

function uscl_settings_page() {
    if (isset($_POST['save_uscl'])) {
        update_option('uscl_data', $_POST['uscl']);
        echo '<div class="updated"><p>Cài đặt đã được lưu thành công!</p></div>';
    }
    $data = get_option('uscl_data', []);
    
    // Mặc định 4 nút phổ biến nếu chưa có dữ liệu
    $items = isset($data['items']) ? $data['items'] : [
        ['img' => 'https://cdn-icons-png.flaticon.com/512/724/724664.png', 'link' => '0901234567', 'bg' => '#e32e2e', 'type' => 'tel'],
        ['img' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_Zalo.svg/1200px-Icon_Zalo.svg.png', 'link' => 'https://zalo.me/0901234567', 'bg' => '#0084ff', 'type' => 'url'],
        ['img' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Facebook_Messenger_logo_2020.svg/2048px-Facebook_Messenger_logo_2020.svg.png', 'link' => 'https://m.me/username', 'bg' => '#00bff3', 'type' => 'url']
    ];
    ?>
    <div class="wrap">
        <h1>Cấu hình Layout Social Chat</h1>
        <form method="post" style="background: #fff; padding: 20px; border: 1px solid #ccd0d4; border-radius: 5px;">
            
            <section style="margin-bottom: 30px;">
                <h3>1. Cấu hình Chung (Vị trí & Kích thước)</h3>
                <table class="form-table">
                    <tr>
                        <th>Vị trí trên màn hình</th>
                        <td>
                            Cách Dưới: <input type="text" name="uscl[bottom]" value="<?php echo $data['bottom'] ?? '20px'; ?>" style="width:80px"> 
                            Cách Phải: <input type="text" name="uscl[right]" value="<?php echo $data['right'] ?? '20px'; ?>" style="width:80px">
                            <p class="description">Ví dụ: 20px, 5%, hoặc 0 (để sát mép).</p>
                        </td>
                    </tr>
                    <tr>
                        <th>Kích thước & Khoảng cách</th>
                        <td>
                            Kích thước Icon: <input type="number" name="uscl[size]" value="<?php echo $data['size'] ?? '50'; ?>" style="width:70px"> px | 
                            Khoảng cách dọc: <input type="number" name="uscl[gap]" value="<?php echo $data['gap'] ?? '15'; ?>" style="width:70px"> px
                        </td>
                    </tr>
                    <tr>
                        <th>Hiệu ứng Hover (Phóng to)</th>
                        <td>
                            <input type="number" step="0.1" name="uscl[hover]" value="<?php echo $data['hover'] ?? '1.2'; ?>" style="width:70px">
                            <span class="description">1.2 = Phóng to 20% khi rê chuột.</span>
                        </td>
                    </tr>
                </table>
            </section>

            <hr>

            <section>
                <h3>2. Danh sách các nút Chat (Gắn Link/SĐT)</h3>
                <div id="uscl-items-list">
                    <?php foreach ($items as $index => $item) : ?>
                    <div style="background: #f9f9f9; border: 1px solid #ddd; padding: 15px; margin-bottom: 10px; border-radius: 4px; display: flex; flex-wrap: wrap; gap: 15px; align-items: center;">
                        <strong>Nút #<?php echo $index + 1; ?></strong>
                        
                        <div>
                            Loại: 
                            <select name="uscl[items][<?php echo $index; ?>][type]">
                                <option value="url" <?php selected($item['type'], 'url'); ?>>Link Website (https://)</option>
                                <option value="tel" <?php selected($item['type'], 'tel'); ?>>Số điện thoại (tel:)</option>
                            </select>
                        </div>

                        <div style="flex: 1; min-width: 200px;">
                            Nhập Link/SĐT: 
                            <input type="text" name="uscl[items][<?php echo $index; ?>][link]" value="<?php echo $item['link']; ?>" style="width: 100%;" placeholder="Link web hoặc số điện thoại">
                        </div>

                        <div>
                            Link ảnh Icon: 
                            <input type="text" name="uscl[items][<?php echo $index; ?>][img]" value="<?php echo $item['img']; ?>" style="width: 150px;">
                        </div>

                        <div>
                            Màu nền: 
                            <input type="color" name="uscl[items][<?php echo $index; ?>][bg]" value="<?php echo $item['bg']; ?>">
                        </div>
                    </div>
                    <?php endforeach; ?>
                </div>
            </section>

            <p class="submit">
                <input type="submit" name="save_uscl" class="button button-primary button-large" value="Lưu tất cả cấu hình">
            </p>
        </form>
    </div>
    <?php
}

// 2. HIỂN THỊ RA FRONTEND
add_action('wp_footer', 'uscl_render_frontend');
function uscl_render_frontend() {
    $data = get_option('uscl_data');
    if (!$data || empty($data['items'])) return;
    ?>
    <div id="uscl-fixed-layout">
        <?php foreach ($data['items'] as $item) : 
            if(empty($item['img'])) continue;
            
            // Xử lý tiền tố link
            $href = $item['link'];
            if ($item['type'] === 'tel') {
                $href = 'tel:' . preg_replace('/[^0-9+]/', '', $item['link']);
            }
        ?>
            <a href="<?php echo $href; ?>" class="uscl-item-link" target="<?php echo ($item['type'] === 'url') ? '_blank' : '_self'; ?>">
                <div class="uscl-circle" style="background-color: <?php echo $item['bg']; ?>;">
                    <img src="<?php echo $item['img']; ?>" alt="icon">
                </div>
            </a>
        <?php endforeach; ?>
    </div>

    <style>
        #uscl-fixed-layout {
            position: fixed;
            bottom: <?php echo $data['bottom']; ?>;
            right: <?php echo $data['right']; ?>;
            display: flex;
            flex-direction: column;
            gap: <?php echo $data['gap']; ?>px;
            z-index: 999998;
        }

        .uscl-circle {
            width: <?php echo $data['size']; ?>px;
            height: <?php echo $data['size']; ?>px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
            overflow: hidden;
        }

        .uscl-circle img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .uscl-item-link:hover .uscl-circle {
            transform: scale(<?php echo $data['hover']; ?>);
        }

        /* THIẾT LẬP MOBILE ĐẶC BIỆT */
        @media (max-width: 768px) {
            #uscl-fixed-layout {
                bottom: 15px !important; 
                right: 15px !important;
                gap: 12px !important;
            }
            .uscl-circle {
                width: 60px !important; /* Luôn to để dễ bấm bằng ngón cái */
                height: 60px !important;
            }
        }
    </style>
    <?php
}