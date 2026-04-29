# WordPress Integration Guide

## Overview
This guide explains how to integrate the Next.js frontend with a WordPress backend for dynamic banner management.

## WordPress Setup

### 1. Create Custom Post Type for Banners

Add this code to your theme's `functions.php` or create a custom plugin:

```php
// Register Custom Post Type for Banners
function create_banner_post_type() {
    register_post_type('banner',
        array(
            'labels' => array(
                'name' => __('Banners'),
                'singular_name' => __('Banner')
            ),
            'public' => true,
            'has_archive' => true,
            'supports' => array('title', 'thumbnail', 'excerpt'),
            'menu_icon' => 'dashicons-images-alt2',
            'show_in_rest' => true, // Enable REST API support
        )
    );
}
add_action('init', 'create_banner_post_type');

// Add Custom Fields for Banners
function add_banner_meta_fields() {
    add_meta_box(
        'banner_details',
        'Banner Details',
        'banner_details_callback',
        'banner',
        'normal',
        'default'
    );
}
add_action('add_meta_boxes', 'add_banner_meta_fields');

function banner_details_callback($post) {
    wp_nonce_field('banner_details_save', 'banner_details_nonce');
    
    $subtitle = get_post_meta($post->ID, '_banner_subtitle', true);
    $description = get_post_meta($post->ID, '_banner_description', true);
    $link = get_post_meta($post->ID, '_banner_link', true);
    $alt_text = get_post_meta($post->ID, '_banner_alt_text', true);
    
    echo '<label for="banner_subtitle">Subtitle:</label>';
    echo '<input type="text" id="banner_subtitle" name="banner_subtitle" value="' . esc_attr($subtitle) . '" size="25" />';
    
    echo '<label for="banner_description">Description:</label>';
    echo '<textarea id="banner_description" name="banner_description" rows="4">' . esc_textarea($description) . '</textarea>';
    
    echo '<label for="banner_link">Link URL:</label>';
    echo '<input type="text" id="banner_link" name="banner_link" value="' . esc_attr($link) . '" size="25" />';
    
    echo '<label for="banner_alt_text">Alt Text:</label>';
    echo '<input type="text" id="banner_alt_text" name="banner_alt_text" value="' . esc_attr($alt_text) . '" size="25" />';
}

function save_banner_details($post_id) {
    if (!isset($_POST['banner_details_nonce']) || !wp_verify_nonce($_POST['banner_details_nonce'], 'banner_details_save')) {
        return;
    }
    
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    
    if (isset($_POST['banner_subtitle'])) {
        update_post_meta($post_id, '_banner_subtitle', sanitize_text_field($_POST['banner_subtitle']));
    }
    
    if (isset($_POST['banner_description'])) {
        update_post_meta($post_id, '_banner_description', sanitize_textarea_field($_POST['banner_description']));
    }
    
    if (isset($_POST['banner_link'])) {
        update_post_meta($post_id, '_banner_link', esc_url_raw($_POST['banner_link']));
    }
    
    if (isset($_POST['banner_alt_text'])) {
        update_post_meta($post_id, '_banner_alt_text', sanitize_text_field($_POST['banner_alt_text']));
    }
}
add_action('save_post', 'save_banner_details');

// Custom REST API endpoint for banners
function register_banner_api_endpoint() {
    register_rest_route('wp/v2', '/banners', array(
        'methods' => 'GET',
        'callback' => 'get_banners_data',
        'permission_callback' => '__return_true'
    ));
}
add_action('rest_api_init', 'register_banner_api_endpoint');

function get_banners_data($request) {
    $args = array(
        'post_type' => 'banner',
        'posts_per_page' => -1,
        'post_status' => 'publish'
    );
    
    $banners = get_posts($args);
    $banner_data = array();
    
    foreach ($banners as $banner) {
        $banner_data[] = array(
            'id' => $banner->ID,
            'title' => array('rendered' => get_the_title($banner->ID)),
            'acf' => array(
                'subtitle' => get_post_meta($banner->ID, '_banner_subtitle', true),
                'description' => get_post_meta($banner->ID, '_banner_description', true),
                'link' => get_post_meta($banner->ID, '_banner_link', true),
                'alt_text' => get_post_meta($banner->ID, '_banner_alt_text', true),
                'banner_image' => array(
                    'url' => get_the_post_thumbnail_url($banner->ID, 'full')
                )
            )
        );
    }
    
    return new WP_REST_Response($banner_data, 200);
}
```

### 2. Environment Configuration

Create a `.env.local` file in your Next.js project:

```env
WORDPRESS_API_URL=https://your-wordpress-site.com/wp-json
WORDPRESS_API_TOKEN=your-api-token-if-needed
```

### 3. Using Advanced Custom Fields (ACF) Alternative

If you prefer using ACF Pro:

```php
// Register ACF fields for banners
function register_banner_acf_fields() {
    if (function_exists('acf_add_local_field_group')) {
        acf_add_local_field_group(array(
            'key' => 'group_banner_details',
            'title' => 'Banner Details',
            'fields' => array(
                array(
                    'key' => 'field_banner_subtitle',
                    'label' => 'Subtitle',
                    'name' => 'subtitle',
                    'type' => 'text',
                ),
                array(
                    'key' => 'field_banner_description',
                    'label' => 'Description',
                    'name' => 'description',
                    'type' => 'textarea',
                ),
                array(
                    'key' => 'field_banner_link',
                    'label' => 'Link',
                    'name' => 'link',
                    'type' => 'url',
                ),
                array(
                    'key' => 'field_banner_image',
                    'label' => 'Banner Image',
                    'name' => 'banner_image',
                    'type' => 'image',
                    'return_format' => 'array',
                ),
            ),
            'location' => array(
                array(
                    array(
                        'param' => 'post_type',
                        'operator' => '==',
                        'value' => 'banner',
                    ),
                ),
            ),
        ));
    }
}
add_action('acf/init', 'register_banner_acf_fields');
```

## Frontend Usage

The Next.js frontend will automatically fetch banners from the WordPress API. The API endpoint includes:

- **Error handling**: Falls back to default banners if WordPress API fails
- **Caching**: Uses `no-store` to ensure fresh data
- **Data transformation**: Converts WordPress data structure to match frontend requirements

## Features

### Dynamic Banner Management
- Add/edit banners through WordPress admin
- Custom fields for subtitle, description, links, and alt text
- Featured image support for banner images
- REST API integration for frontend consumption

### Frontend Features
- Auto-rotating carousel (5-second intervals)
- Manual navigation with arrow buttons
- Dot pagination for direct slide access
- Responsive design for all screen sizes
- Smooth transitions and hover effects
- Fallback to default banners if API fails

### Performance Optimizations
- Image optimization with Next.js Image component
- Priority loading for first banner
- Efficient state management with React hooks
- Clean component architecture

## Usage

1. **In WordPress Admin**: Go to "Banners" > "Add New" to create new banners
2. **Fill in details**: Add title, subtitle, description, link, and featured image
3. **Publish**: The banner will automatically appear in the frontend carousel
4. **Manage**: Edit or delete banners as needed through WordPress admin

The system provides a complete content management solution for dynamic banner management with WordPress backend integration.
