/**
 * Looker URL Embed Visualization
 * Embeds external URLs via iframe within Looker dashboards
 */

looker.plugins.visualizations.add({
  id: "url_embed_viz",
  label: "URL Embed",
  options: {
    embed_url: {
      type: "string",
      label: "Embed URL",
      display: "text",
      section: "Content",
      placeholder: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      order: 1
    },
    url_title: {
      type: "string",
      label: "Title",
      display: "text",
      section: "Content",
      placeholder: "External Content",
      order: 2
    },
    show_title: {
      type: "boolean",
      label: "Show Title",
      section: "Content",
      default: true,
      order: 3
    },
    iframe_height: {
      type: "string",
      label: "Height",
      display: "text",
      section: "Layout",
      default: "600px",
      placeholder: "600px or 100%",
      order: 4
    },
    iframe_width: {
      type: "string",
      label: "Width",
      display: "text",
      section: "Layout",
      default: "100%",
      placeholder: "100% or 800px",
      order: 5
    },
    allow_features: {
      type: "string",
      label: "iframe Allow Attribute",
      display: "text",
      section: "Security",
      default: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen",
      placeholder: "fullscreen; camera; microphone",
      order: 6
    },
    show_error_details: {
      type: "boolean",
      label: "Show Error Details",
      section: "Advanced",
      default: true,
      order: 7
    },
    loading_message: {
      type: "string",
      label: "Loading Message",
      display: "text",
      section: "Advanced",
      default: "Loading content...",
      order: 8
    },
    refresh_interval: {
      type: "number",
      label: "Auto-refresh (seconds, 0=disabled)",
      display: "number",
      section: "Advanced",
      default: 0,
      order: 9
    },
    referrer_policy: {
      type: "string",
      label: "Referrer Policy",
      display: "select",
      section: "Advanced",
      default: "no-referrer-when-downgrade",
      values: [
        {"No Referrer": "no-referrer"},
        {"No Referrer When Downgrade": "no-referrer-when-downgrade"},
        {"Origin": "origin"},
        {"Origin When Cross-Origin": "origin-when-cross-origin"},
        {"Same Origin": "same-origin"},
        {"Strict Origin": "strict-origin"},
        {"Strict Origin When Cross-Origin": "strict-origin-when-cross-origin"},
        {"Unsafe URL": "unsafe-url"}
      ],
      order: 10
    }
  },

  create: function(element, config) {
    var container = document.createElement('div');
    container.className = 'url-embed-container';
    container.style.cssText = 'display: flex; flex-direction: column; height: 100%; width: 100%; font-family: "Open Sans", "Helvetica", sans-serif; background: #fff;';

    var header = document.createElement('div');
    header.className = 'url-embed-header';
    header.style.cssText = 'padding: 12px 16px; background-color: #f8f9fa; border-bottom: 1px solid #dee2e6; font-size: 16px; font-weight: 600; color: #212529; display: none;';

    var content = document.createElement('div');
    content.className = 'url-embed-content';
    content.style.cssText = 'flex: 1; position: relative; overflow: hidden; background: #fff;';

    container.appendChild(header);
    container.appendChild(content);
    element.appendChild(container);

    this.container = container;
    this.header = header;
    this.content = content;
    this.refreshInterval = null;
  },

  updateAsync: function(data, element, config, queryResponse, details, done) {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    }

    this.content.innerHTML = '';

    if (config.show_title && config.url_title) {
      this.header.textContent = config.url_title;
      this.header.style.display = 'block';
    } else {
      this.header.style.display = 'none';
    }

    if (!config.embed_url) {
      this.content.innerHTML = '<div style="padding: 16px; text-align: center; color: #6c757d; font-size: 14px;">' +
        '<p><strong>Configuration Required</strong></p>' +
        '<p>Please enter an Embed URL in the visualization settings.</p>' +
        '<p style="margin-top: 12px; font-size: 12px;">Example: https://www.youtube.com/embed/VIDEO_ID</p>' +
        '</div>';
      done();
      return;
    }

    try {
      new URL(config.embed_url);
    } catch (e) {
      var errorHtml = '<div style="padding: 20px; text-align: center; color: #dc3545;">' +
        '<div style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">Invalid URL</div>' +
        '<p>The provided URL is not valid.</p>';

      if (config.show_error_details) {
        errorHtml += '<div style="font-size: 14px; color: #6c757d; margin-top: 8px; padding: 12px; background-color: #f8f9fa; border-radius: 4px; text-align: left;">' +
          '<strong>URL:</strong> ' + config.embed_url + '<br>' +
          '<strong>Error:</strong> ' + e.message +
          '</div>';
      }

      errorHtml += '</div>';
      this.content.innerHTML = errorHtml;
      done();
      return;
    }

    var loadingHtml = '<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; color: #6c757d;">' +
      '<div style="border: 3px solid #f3f3f3; border-top: 3px solid #3498db; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto 12px;"></div>' +
      '<style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>' +
      '<div>' + (config.loading_message || 'Loading content...') + '</div>' +
      '</div>';

    this.content.innerHTML = loadingHtml;

    var iframe = document.createElement('iframe');
    iframe.className = 'url-embed-iframe';
    iframe.src = config.embed_url;
    iframe.style.cssText = 'border: none; display: block; width: ' + (config.iframe_width || '100%') + '; height: ' + (config.iframe_height || '600px') + ';';

    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', 'true');
    iframe.setAttribute('loading', 'lazy');

    if (config.allow_features) {
      iframe.setAttribute('allow', config.allow_features);
    }

    if (config.referrer_policy) {
      iframe.setAttribute('referrerpolicy', config.referrer_policy);
    }

    var self = this;
    var loadTimeout;
    var hasLoaded = false;

    iframe.onload = function() {
      if (hasLoaded) return;
      hasLoaded = true;
      clearTimeout(loadTimeout);
      self.content.innerHTML = '';
      self.content.appendChild(iframe);
      done();
    };

    iframe.onerror = function() {
      if (hasLoaded) return;
      hasLoaded = true;
      clearTimeout(loadTimeout);

      var errorHtml = '<div style="padding: 20px; text-align: center; color: #dc3545;">' +
        '<div style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">Failed to Load Content</div>' +
        '<p>The embedded content could not be loaded. This may be due to:</p>' +
        '<ul style="text-align: left; display: inline-block; margin-top: 12px;">' +
        '<li>X-Frame-Options preventing embedding</li>' +
        '<li>Content Security Policy restrictions</li>' +
        '<li>Network connectivity issues</li>' +
        '<li>Invalid or inaccessible URL</li>' +
        '</ul>';

      if (config.show_error_details) {
        errorHtml += '<div style="font-size: 14px; color: #6c757d; margin-top: 8px; padding: 12px; background-color: #f8f9fa; border-radius: 4px; text-align: left;">' +
          '<strong>URL:</strong> ' + config.embed_url + '<br>' +
          '<strong>Tip:</strong> Try using the embed version of the URL (e.g., youtube.com/embed/VIDEO_ID)' +
          '</div>';
      }

      errorHtml += '</div>';
      self.content.innerHTML = errorHtml;
      done();
    };

    this.content.appendChild(iframe);

    loadTimeout = setTimeout(function() {
      if (!hasLoaded && self.content.querySelector('iframe')) {
        hasLoaded = true;
        self.content.innerHTML = '';
        self.content.appendChild(iframe);
        done();
      }
    }, 3000);

    if (config.refresh_interval && config.refresh_interval > 0) {
      this.refreshInterval = setInterval(function() {
        if (iframe && iframe.parentNode) {
          var currentSrc = iframe.src;
          iframe.src = 'about:blank';
          setTimeout(function() {
            iframe.src = currentSrc;
          }, 50);
        }
      }, config.refresh_interval * 1000);
    }
  }
});
