# GDR-Scholars-Catalog-WordPress-Plugin

The GDR Scholars Catalog WordPress Plugin enables the GDR Catalog, a React.JS frontend application for the [ASU-USAID Fellowships program](https://schoolofsustainability.asu.edu/degrees-and-programs/graduate-degrees-programs/usaid-ri-fellowships/), to be deployed within a WordPress site via a shortcode.

## Requirements
* php > 5.5
* [GitHub Updater WordPress Plugin](https://github.com/afragen/github-updater)


## Setup and installation
* Download and install the [latest named release package](https://github.com/gios-asu/GDR-Scholars-Catalog-Wordpress-Plugin/releases/latest) (GDR-Scholars-Catalog-Wordpress-Plugin-xxx.tar).
* Activate the plugin in the WP Plugins Admin screen.
* Insert shortcode, [gdr-catalog], into page content area
* The "Full Width" page template is recommended for this application.


## Site Settings

**Application Root URL** The application root URL is the base path--the folders string following the site domain name--at which the application can be accessed.

Example 1: / for an application hosted at 'https://examplesite.org/'.
Example 2: /root/path/ for an application hosted at 'https://examplesite.org/root/path/'.

**Default Page Size** This setting determines the initial number of data rows displayed per page. The user is able to subsequently select a new page size while using the application.


## Shortcode

`[gdr-catalog-shortcode]` - For displaying the GDR Catalog.
* attributes:
  * **test_mode** = `test` or leave blank for the default production mode.


# Setup for Development
* **Install [Node 4.0.0 or greater](https://nodejs.org)**
* **Install [Yarn](https://yarnpkg.com/en/docs/install)** (Or use npm if you prefer)

## Development Usage
* Install required modules: `yarn` (or `npm install`)
* Build development version of app and watch for changes: `yarn build` (or `npm run build`)
* Build production version of app:`yarn prod` (or `npm run prod`)


## Technologies
| **Tech** | **Description** |
|----------|-------|
|  [React](https://facebook.github.io/react/)  |   A JavaScript library for building user interfaces. |
|  [Babel](http://babeljs.io) |  Compiles next generation JS features to ES5. Enjoy the new version of JavaScript, today. |
| [Webpack](http://webpack.js.org) | For bundling our JavaScript assets. |
| [ESLint](http://eslint.org/)| Pluggable linting utility for JavaScript and JSX  |
