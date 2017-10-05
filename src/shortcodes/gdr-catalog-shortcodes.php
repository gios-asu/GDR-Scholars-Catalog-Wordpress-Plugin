<?php
namespace GDRCatalogWordPress\Shortcodes;
use Honeycomb\Wordpress\Hook;
use GDRCatalogWordPress\Admin\GDR_Catalog_Admin_Page;


// Avoid direct calls to this file
if ( ! defined( 'GDR_CATALOG_WORDPRESS_PLUGIN_VERSION' ) ) {
  header( 'Status: 403 Forbidden' );
  header( 'HTTP/1.1 403 Forbidden' );
  exit();
}

/**
 * GDR_Catalog_Shortcodes
 * provides the shortcode [gdr-catalog-shortcode]
 */
class GDR_Catalog_Shortcodes extends Hook {
  use \GDRCatalogWordPress\Options_Handler_Trait;


  public function __construct() {
    parent::__construct( 'gdr-catalog-shortcodes', GDR_CATALOG_WORDPRESS_PLUGIN_VERSION );
    $this->define_hooks();
  }

  public function define_hooks() {
    $this->add_action( 'wp_enqueue_scripts', $this, 'wp_enqueue_scripts' );
    $this->add_shortcode( 'gdr-catalog-shortcode', $this, 'gdr_catalog_shortcode' );
    $this->add_action( 'wp', $this, 'add_http_cache_header' );
    $this->add_action( 'wp_head', $this, 'add_html_cache_header' );
  }


  /**
   * Do not cache any sensitive form data - ASU Web Application Security Standards
   */
  public function add_html_cache_header() {
    if ( $this->current_page_has_gdr_catalog_shortcode() ) {
      echo '<meta http-equiv="Pragma" content="no-cache"/>
            <meta http-equiv="Expires" content="-1"/>
            <meta http-equiv="Cache-Control" content="no-store,no-cache" />';
    }
  }

  /**
   * Do not cache any sensitive form data - ASU Web Application Security Standards
   * This call back needs to hook after send_headers since we depend on the $post variable
   * and that is not populated at the time of send_headers.
   */
  public function add_http_cache_header() {
    if ( $this->current_page_has_gdr_catalog_shortcode() ) {
      header( 'Cache-Control: no-Cache, no-Store, must-Revalidate' );
      header( 'Pragma: no-Cache' );
      header( 'Expires: 0' );
    }
  }

  /**
   * Returns true if the page is using the [gdr-catalog-shortcode] shortcode, else false
   */
  private function current_page_has_gdr_catalog_shortcode() {
    global $post;
    return ( is_a( $post, 'WP_Post' ) && has_shortcode( $post->post_content, 'gdr-scholars-catalog' ) );
  }

  /**
   * Enqueue CSS and JS
   * Hooks onto `wp_enqueue_scripts`.
   */
  public function wp_enqueue_scripts() {
    if ( $this->current_page_has_gdr_catalog_shortcode() ) {
      $url_to_css_file = plugin_dir_url( dirname( dirname( __FILE__ ) ) ) . 'assets/css/shortcode.css';
      wp_enqueue_style( $this->plugin_slug, $url_to_css_file, array(), $this->version );

      $url_to_js_bundle = plugin_dir_url( dirname( dirname( __FILE__ ) ) ) . 'assets/js/shortcode.js';
      wp_enqueue_script( 'gdr-catalog-shortcode-js', $url_to_js_bundle, array(), $this->version, false );
    }
  }

  /**
   * Handle the shortcode [gdr-catalog-shortcode]
   *   attributes:
   *     test_mode = 'test' or leave blank for the default production
   */
  public function gdr_catalog_shortcode( $atts, $content = '' ) {
    // if there are no attributes passed then $atts is not an array, its a string
    if ( ! is_array( $atts ) ) {
      $atts = array();
    }

    if ( isset( $atts['test_mode'] ) && 0 === strcasecmp( 'true', $atts['test_mode'] ) ) {
      $gdr_api_url = 'https://gdrscholars.api.dev.gios.asu.edu/api/v1';
    } else {
      $gdr_api_url = 'https://gdrscholars.api.dev.gios.asu.edu/api/v1';
    }

    $app_root_url = $this->get_option_attribute_or_default(
        array(
            'name'      => GDR_Catalog_Admin_Page::$options_name,
            'attribute' => GDR_Catalog_Admin_Page::$app_root_url_option_name,
            'default'   => '/',
        )
    );

    $default_page_size = $this->get_option_attribute_or_default(
        array(
            'name'      => GDR_Catalog_Admin_Page::$options_name,
            'attribute' => GDR_Catalog_Admin_Page::$default_page_size_option_name,
            'default'   => 50,
        )
    );

    $object = shortcode_atts( array(
      'gdr_api_url' => $gdr_api_url,
      'gdr_app_root_url' => $app_root_url,
      'gdr_default_page_size' => $default_page_size,
    ), $atts, 'gdr-catalog' );

    wp_localize_script( 'gdr-catalog-shortcode-script', 'gdr_catalog_object', $object );

    $shortcode = "<div id='gdr-catalog-shortcode'></div>";
    return $shortcode;
  }
}
