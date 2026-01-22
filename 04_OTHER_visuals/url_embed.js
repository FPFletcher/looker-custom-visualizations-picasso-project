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
      default: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
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
    csp_timeout: {
      type: "number",
      label: "CSP Detection Timeout (ms)",
      display: "number",
      section: "Advanced",
      default: 2000,
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
    this.cspCheckInterval = null;
  },

  updateAsync: function(data, element, config, queryResponse, details, done) {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    }

    if (this.cspCheckInterval) {
      clearInterval(this.cspCheckInterval);
      this.cspCheckInterval = null;
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
        '<p style="margin-top: 12px; font-size: 12px;">Examples:</p>' +
        '<p style="font-size: 12px;">• YouTube: https://www.youtube.com/embed/VIDEO_ID</p>' +
        '<p style="font-size: 12px;">• Looker: https://your-instance.looker.com/embed/dashboards/ID</p>' +
        '</div>';
      done();
      return;
    }

    var parsedUrl;
    try {
      parsedUrl = new URL(config.embed_url);
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
    iframe.setAttribute('loading', 'lazy');

    if (config.allow_features) {
      iframe.setAttribute('allow', config.allow_features);
    }

    var self = this;
    var loadTimeout;
    var cspCheckTimeout;
    var hasLoaded = false;
    var hasFailed = false;

    function showCspError(detectedIssue) {
      if (hasFailed) return;
      hasFailed = true;

      clearTimeout(loadTimeout);
      clearTimeout(cspCheckTimeout);
      if (self.cspCheckInterval) {
        clearInterval(self.cspCheckInterval);
        self.cspCheckInterval = null;
      }

      var domain = parsedUrl.hostname;
      var isYouTube = domain.includes('youtube.com');
      var isGoogleDocs = domain.includes('docs.google.com');
      var isLooker = domain.includes('looker.com');

      var errorTitle = 'Content Security Policy (CSP) Blocked';
      var errorMessage = 'The website "' + domain + '" has blocked embedding in this context.';
      var suggestions = [];

      if (isYouTube) {
        errorTitle = 'YouTube Embedding Issue';
        errorMessage = 'YouTube videos cannot be embedded in this context due to security restrictions.';
        suggestions = [
          'Use the embed URL format: https://www.youtube.com/embed/VIDEO_ID',
          'Make sure the video is not age-restricted or private',
          'YouTube may block embedding in nested iframes (Looker limitation)',
          'Consider using a direct link instead of embedding'
        ];
      } else if (isGoogleDocs) {
        errorTitle = 'Google Docs Embedding Issue';
        errorMessage = 'Google Docs content has strict frame-ancestors policy.';
        suggestions = [
          'Google Docs typically only allows embedding on specific domains',
          'Try using Google Drive preview links instead',
          'Consider exporting as PDF and hosting elsewhere'
        ];
      } else if (isLooker) {
        errorTitle = 'Looker Dashboard Embedding Issue';
        errorMessage = 'Looker dashboards may have CSP restrictions when nested.';
        suggestions = [
          'Ensure the embed URL is from the same Looker instance',
          'Check if SSO/authentication is required',
          'Nested Looker embeds may not work due to frame-ancestors policy'
        ];
      } else {
        suggestions = [
          'The website has X-Frame-Options or frame-ancestors CSP set',
          'Contact the website owner to allow embedding',
          'Try using an embed-specific URL if available',
          'Some sites only allow embedding on whitelisted domains'
        ];
      }

      var errorHtml = '<div style="padding: 20px; text-align: center; color: #dc3545;">' +
        '<div style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">🚫 ' + errorTitle + '</div>' +
        '<p style="color: #212529; margin-bottom: 16px;">' + errorMessage + '</p>';

      if (config.show_error_details) {
        errorHtml += '<div style="font-size: 14px; color: #6c757d; margin-top: 8px; padding: 16px; background-color: #fff3cd; border: 1px solid #ffc107; border-radius: 4px; text-align: left;">' +
          '<strong style="color: #856404;">🔍 Troubleshooting Tips:</strong><ul style="margin: 8px 0; padding-left: 20px; text-align: left;">';

        suggestions.forEach(function(suggestion) {
          errorHtml += '<li style="margin: 4px 0;">' + suggestion + '</li>';
        });

        errorHtml += '</ul>' +
          '<div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #ffc107;">' +
          '<strong style="color: #856404;">Technical Details:</strong><br>' +
          '<code style="background: #fff; padding: 4px 8px; border-radius: 3px; font-size: 12px;">' + config.embed_url + '</code><br>' +
          '<span style="font-size: 12px; margin-top: 4px; display: block;">Issue: ' + (detectedIssue || 'CSP frame-ancestors violation') + '</span>' +
          '</div>' +
          '</div>';
      }

      errorHtml += '<div style="margin-top: 16px; padding: 12px; background-color: #e7f3ff; border-radius: 4px; font-size: 13px; color: #004085;">' +
        '<strong>💡 Alternative:</strong> Consider opening the content in a new tab instead of embedding.' +
        '</div></div>';

      self.content.innerHTML = errorHtml;
      done();
    }

    iframe.onload = function() {
      if (hasLoaded || hasFailed) return;
      hasLoaded = true;
      clearTimeout(loadTimeout);
      clearTimeout(cspCheckTimeout);
      if (self.cspCheckInterval) {
        clearInterval(self.cspCheckInterval);
        self.cspCheckInterval = null;
      }
      self.content.innerHTML = '';
      self.content.appendChild(iframe);
      done();
    };

    iframe.onerror = function() {
      showCspError('iframe.onerror triggered');
    };

    this.content.appendChild(iframe);

    cspCheckTimeout = setTimeout(function() {
      if (!hasLoaded && !hasFailed) {
        try {
          var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
          if (!iframeDoc || iframeDoc.body.innerHTML === '') {
            showCspError('Empty iframe content detected (likely CSP block)');
          }
        } catch (e) {
          // Cross-origin, but that's expected and okay
          hasLoaded = true;
          clearTimeout(loadTimeout);
          self.content.innerHTML = '';
          self.content.appendChild(iframe);
          done();
        }
      }
    }, config.csp_timeout || 2000);

    loadTimeout = setTimeout(function() {
      if (!hasLoaded && !hasFailed) {
        hasLoaded = true;
        self.content.innerHTML = '';
        self.content.appendChild(iframe);
        done();
      }
    }, 5000);

    if (config.refresh_interval && config.refresh_interval > 0) {
      this.refreshInterval = setInterval(function() {
        if (iframe && iframe.parentNode && !hasFailed) {
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
