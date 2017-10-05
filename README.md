# GDR-Scholars-Catalog-WordPress-Plugin

WordPress plugin to submit Request For Information requests into Salesforce

# Requirements
* php > 5.5
* [GitHub Updater WordPress Plugin](https://github.com/afragen/github-updater)


# Site Settings

**Application Root URL** The application root URL is the base path--the folders string following the site domain name--at which the application can be accessed.

Example 1: / for an application hosted at 'https://examplesite.org/'.
Example 2: /root/path/ for an application hosted at 'https://examplesite.org/root/path/'.

**Default Page Size** This setting determines the initial number of data rows displayed per page. The user is able to subsequently select a new page size while using the application.


# Shortcode

`[gdr-catalog-shortcode]` - For displaying the GDR Catalog.
* attributes:
  * **test_mode** = `test` or leave blank for the default production mode.
