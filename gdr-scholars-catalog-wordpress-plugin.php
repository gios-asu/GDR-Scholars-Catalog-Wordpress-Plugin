<?php

/*
Plugin Name: GDR Scholars Catalog WordPress Plugin
Plugin URI: http://github.com/gios-asu/GDR-Scholars-Catalog-WordPress-Plugin
Description: Wordpress plugin to publish the ASU Global Research Development Program fellowship catalog, a ReactJS application
Version: 1.1.0
Author: Julie Ann Wrigley Global Institute of Sustainability
License: Copyright 2017

GitHub Plugin URI: https://github.com/gios-asu/GDR-Scholars-Catalog-WordPress-Plugin
GitHub Branch: master
*/


if ( ! function_exists( 'add_filter' ) ) {
  header( 'Status: 403 Forbidden' );
  header( 'HTTP/1.1 403 Forbidden' );
  exit();
}

define( 'GDR_CATALOG_WORDPRESS_PLUGIN_VERSION', '1.1.0' );

require __DIR__ . '/vendor/autoload.php';

$registry = new \Honeycomb\Services\Register();
$registry->register(
    require __DIR__ . '/src/registry/wordpress-registry.php'
);

