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
      placeholder: "https://example.com/dashboard",
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
      default: "fullscreen",
      placeholder: "fullscreen; camera; microphone",
      order: 6
    },
    sandbox_permissions: {
      type: "string",
      label: "Sandbox Permissions",
      display: "text",
      section: "Security",
      default: "allow-scripts allow-same-origin allow-forms",
      placeholder: "allow-scripts allow-same-origin",
      order: 7
    },
    show_error_details: {
      type: "boolean",
      label: "Show Error Details",
      section: "Advanced",
      default: true,
      order: 8
    },
    loading_message: {
      type: "string",
      label: "Loading Message",
      display: "text",
      section: "Advanced",
      default: "Loading content...",
      order: 9
    },
    refresh_interval: {
      type: "number",
      label: "Auto-refresh (seconds, 0=disabled)",
      display: "number",
      section: "Advanced",
      default: 0,
      order: 10
    }
  },

  create: function(element, config) {
    element.innerHTML = `
      <style>
        .url-embed-container {
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 100%;
          font-family: "Open Sans", "Helvetica", sans-serif;
        }

        .url-embed-header {
          padding: 12px 16px;
          background-color: #f8f9fa;
          border-bottom: 1px solid #dee2e6;
          font-size: 16px;
          font-weight: 600;
          color: #212529;
        }

        .url-embed-content {
          flex: 1;
          position: relative;
          overflow: hidden;
        }

        .url-embed-iframe {
          border: none;
          display: block;
        }

        .url-embed-loading {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          color: #6c757d;
        }

        .url-embed-spinner {
          border: 3px solid #f3f3f3;
          border-top: 3px solid #3498db;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin: 0 auto 12px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .url-embed-error {
          padding: 20px;
          text-align: center;
          color: #dc3545;
        }

        .url-embed-error-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .url-embed-error-details {
          font-size: 14px;
          color: #6c757d;
          margin-top: 8px;
          padding: 12px;
          background-color: #f8f9fa;
          border-radius: 4px;
          text-align: left;
        }

        .url-embed-info {
          padding: 16px;
          text-align: center;
          color: #6c757d;
          font-size: 14px;
        }
      </style>
      <div class="url-embed-container">
        <div class="url-embed-header" style="display: none;"></div>
        <div class="url-embed-content"></div>
      </div>
    `;

    this.container = element.querySelector('.url-embed-container');
    this.header = element.querySelector('.url-embed-header');
    this.content = element.querySelector('.url-embed-content');
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
      this.content.innerHTML = `
        <div class="url-embed-info">
          <p><strong>Configuration Required</strong></p>
          <p>Please enter an Embed URL in the visualization settings.</p>
        </div>
      `;
      done();
      return;
    }

    try {
      new URL(config.embed_url);
    } catch (e) {
      this.content.innerHTML = `
        <div class="url-embed-error">
          <div class="url-embed-error-title">Invalid URL</div>
          <p>The provided URL is not valid.</p>
          ${config.show_error_details ? `
            <div class="url-embed-error-details">
              <strong>URL:</strong> ${config.embed_url}<br>
              <strong>Error:</strong> ${e.message}
            </div>
          ` : ''}
        </div>
      `;
      done();
      return;
    }

    this.content.innerHTML = `
      <div class="url-embed-loading">
        <div class="url-embed-spinner"></div>
        <div>${config.loading_message || 'Loading content...'}</div>
      </div>
    `;

    const iframe = document.createElement('iframe');
    iframe.className = 'url-embed-iframe';
    iframe.src = config.embed_url;
    iframe.style.width = config.iframe_width || '100%';
    iframe.style.height = config.iframe_height || '600px';

    if (config.allow_features) {
      iframe.setAttribute('allow', config.allow_features);
    }

    if (config.sandbox_permissions) {
      iframe.setAttribute('sandbox', config.sandbox_permissions);
    }

    const self = this;

    iframe.onload = function() {
      self.content.innerHTML = '';
      self.content.appendChild(iframe);
      done();
    };

    iframe.onerror = function(error) {
      self.content.innerHTML = `
        <div class="url-embed-error">
          <div class="url-embed-error-title">Failed to Load Content</div>
          <p>The embedded content could not be loaded. This may be due to:</p>
          <ul style="text-align: left; display: inline-block; margin-top: 12px;">
            <li>X-Frame-Options preventing embedding</li>
            <li>Content Security Policy restrictions</li>
            <li>Network connectivity issues</li>
            <li>Invalid or inaccessible URL</li>
          </ul>
          ${config.show_error_details ? `
            <div class="url-embed-error-details">
              <strong>URL:</strong> ${config.embed_url}
            </div>
          ` : ''}
        </div>
      `;
      done();
    };

    this.content.appendChild(iframe);

    if (config.refresh_interval && config.refresh_interval > 0) {
      this.refreshInterval = setInterval(function() {
        if (iframe && iframe.contentWindow) {
          iframe.src = iframe.src;
        }
      }, config.refresh_interval * 1000);
    }

    setTimeout(function() {
      if (self.content.querySelector('.url-embed-loading')) {
        self.content.innerHTML = '';
        self.content.appendChild(iframe);
        done();
      }
    }, 5000);
  }
});
