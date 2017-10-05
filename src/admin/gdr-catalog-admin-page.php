<?php
namespace GDRCatalogWordPress\Admin;
use Honeycomb\Wordpress\Hook;

// Avoid direct calls to this file
if ( ! defined( 'GDR_CATALOG_WORDPRESS_PLUGIN_VERSION' ) ) {
  header( 'Status: 403 Forbidden' );
  header( 'HTTP/1.1 403 Forbidden' );
  exit();
}

/**
 * GDR_Catalog_Admin_Page
 * Generates the Admin settings page
 */
class GDR_Catalog_Admin_Page extends Hook {
  use \GDRCatalogWordPress\Options_Handler_Trait;

  public static $page_name                     = 'gdr-catalog-admin-page';
  public static $section_id                    = 'gdr-catalog-section_id';
  public static $section_name                  = 'gdr-catalog-section_name';
  public static $options_group                 = 'gdr-catalog-options_group';
  public static $options_name                  = 'gdr-catalog-options';
  public static $app_root_url_option_name      = 'app_root_url';
  public static $default_page_size_option_name = 'default_page_size';


 public function __construct( $version = '0.1' ) {
    parent::__construct( $version );

    $this->add_action( 'admin_menu', $this, 'admin_menu' );
    $this->add_action( 'admin_init', $this, 'admin_init' );

    // Set default options
    add_option(
        self::$options_name,
        array(
          self::$app_root_url_option_name => '/',
          self::$default_page_size_option_name => 50,
        )
    );

    $this->define_hooks();
  }


  /**
   * Add filters and actions
   *
   * @override
   */
  public function define_hooks() {
    $this->add_action( 'admin_init', $this, 'admin_init' );
  }

  /**
   * Set up administrative fields
   */
  public function admin_init() {
    register_setting(
        self::$options_group,
        self::$options_name,
        array( $this, 'form_submit' )
    );

    add_settings_section(
        self::$section_id,
        'GDR Scholars Catalog Settings',
        array(
          $this,
          'print_section_info',
        ),
        self::$section_name
    );

    add_settings_field(
        self::$app_root_url_option_name,
        'Application Root URL',
        array(
          $this,
          'app_root_url_on_callback',
        ), // Callback
        self::$section_name,
        self::$section_id
    );

    add_settings_field(
        self::$default_page_size_option_name,
        'Default Page Size (rows per page)',
        array(
          $this,
          'default_page_size_on_callback',
        ), // Callback
        self::$section_name,
        self::$section_id
    );
  }

  public function admin_menu() {
    $page_title = 'GDR Scholars Catalog Plugin Settings';
    $menu_title = 'GDR Scholars Catalog';
    $capability = 'manage_options';
    $path = plugin_dir_url( __FILE__ );

    add_options_page(
        'Settings Admin',
        'GDR Scholars Catalog',
        $capability,
        self::$page_name,
        array( $this, 'render_admin_page' )
    );

  }

  public function render_admin_page() {
    ?>
    <div class="wrap">
        <h1>GDR Scholars Catalog Settings</h1>
        <form method="post" action="options.php">
        <?php
            // This prints out all hidden setting fields
            settings_fields( self::$options_group );
            do_settings_sections( self::$section_name );
            submit_button();
        ?>
        </form>
    </div>
    <?php
  }


  /**
   * Print the section text
   */
  public function print_section_info() {
    print 'Enter your settings below:';
  }

  /**
   * Print the form section for the application root url setting
   */
  public function app_root_url_on_callback() {

    $value = $this->get_option_attribute_or_default(
        array(
          'name'      => self::$options_name,
          'attribute' => self::$app_root_url_option_name,
          'default'   => '/',
        )
    );

    $html = <<<HTML
    <input type="text" id="%s" name="%s[%s]" value="%s"/><br/>
    <em>The application root URL is the base path--the folders string following the site domain name--at which the application can be accessed.</em><br/>
    <span>Example 1: <strong>/</strong> for an application hosted at 'https://examplesite.org/'.</span><br />
    <span>Example 2: <strong>/root/path/</strong> for an application hosted at 'https://examplesite.org/root/path/'.</span>
HTML;

    printf(
        $html,
        self::$app_root_url_option_name,
        self::$options_name,
        self::$app_root_url_option_name,
        $value
    );
  }

  /**
   * Print the form section for the catalog default page size
   */
  public function default_page_size_on_callback() {

    $value = $this->get_option_attribute_or_default(
        array(
          'name'      => self::$options_name,
          'attribute' => self::$default_page_size_option_name,
          'default'   => 50,
        )
    );

    $html = <<<HTML
    <input type="text" id="%s" name="%s[%s]" value="%s"/><br/>
    <em>This setting determines the initial number of data rows displayed per page. The user is able to subsequently select a new page size while using the application.</em>
HTML;

    printf(
        $html,
        self::$default_page_size_option_name,
        self::$options_name,
        self::$default_page_size_option_name,
        $value
    );
  }

  /**
   * Handle form submissions for validations
   */
  public function form_submit( $input ) {
    if ( isset( $input[ self::$app_root_url_option_name ] ) ) {
      $input[ self::$app_root_url_option_name ] = strtolower( $input[ self::$app_root_url_option_name ] );
    }

    // intval the default_page_size_option_name
    if ( isset( $input[ self::$default_page_size_option_name ] ) ) {
      $input[ self::$default_page_size_option_name ] = intval( $input[ self::$default_page_size_option_name ] );
    }

    return $input;
  }

}
