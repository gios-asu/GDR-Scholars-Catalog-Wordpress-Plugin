if (! window._babelPolyfill) {
  require('babel-polyfill');
}

import React from 'react';
import ReactDOM from 'react-dom';
import App from "./containers/App";

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(React.createElement(App), document.getElementById('gdr-catalog-shortcode'));
});
