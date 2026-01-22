/**
 * Looker URL Embed Visualization with Proxy Support
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
    use_link_button: {
      type: "boolean",
      label: "Use Link Button Instead (if embedding fails)",
      section: "Fallback",
      default: false,
      order: 6
    },
    show_error_details: {
      type: "boolean",
      label: "Show Error Details",
      section: "Advanced",
      default: true,
      order: 7
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
  },

  updateAsync: function(data, element, config, queryResponse, details, done) {
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
        '<p style="font-size: 12px;">• Notion: https://your-workspace.notion.site/PAGE_ID</p>' +
        '</div>';
      done();
      return;
    }

    var parsedUrl;
    try {
      parsedUrl = new URL(config.embed_url);
    } catch (e) {
      this.content.innerHTML = '<div style="padding: 20px; text-align: center; color: #dc3545;">' +
        '<div style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">Invalid URL</div>' +
        '<p>The provided URL is not valid.</p></div>';
      done();
      return;
    }

    var isYouTube = parsedUrl.hostname.includes('youtube.com');
    var isNotion = parsedUrl.hostname.includes('notion.site') || parsedUrl.hostname.includes('notion.so');
    var domain = parsedUrl.hostname;

    // If user wants link button mode or known problematic sites
    if (config.use_link_button || isYouTube || isNotion) {
      var buttonHtml = '<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; padding: 40px; text-align: center;">' +
        '<div style="font-size: 48px; margin-bottom: 20px;">🔗</div>' +
        '<h3 style="margin: 0 0 12px 0; color: #212529; font-size: 20px; font-weight: 600;">';

      if (config.url_title) {
        buttonHtml += config.url_title;
      } else if (isYouTube) {
        buttonHtml += 'YouTube Video';
      } else if (isNotion) {
        buttonHtml += 'Notion Page';
      } else {
        buttonHtml += 'External Content';
      }

      buttonHtml += '</h3>' +
        '<p style="color: #6c757d; margin-bottom: 24px; max-width: 500px;">Due to security restrictions, this content cannot be embedded directly in Looker. Click the button below to open it in a new tab.</p>' +
        '<a href="' + config.embed_url + '" target="_blank" rel="noopener noreferrer" ' +
        'style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background-color: #1a73e8; color: white; text-decoration: none; border-radius: 4px; font-weight: 500; font-size: 14px; transition: background-color 0.2s;"' +
        'onmouseover="this.style.backgroundColor=\'#1557b0\'" onmouseout="this.style.backgroundColor=\'#1a73e8\'">' +
        '<span>Open ' + (isYouTube ? 'Video' : isNotion ? 'Page' : 'Content') + '</span>' +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
        '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>' +
        '<polyline points="15 3 21 3 21 9"></polyline>' +
        '<line x1="10" y1="14" x2="21" y2="3"></line>' +
        '</svg>' +
        '</a>';

      if (config.show_error_details) {
        buttonHtml += '<div style="margin-top: 24px; padding: 16px; background-color: #fff3cd; border: 1px solid #ffc107; border-radius: 4px; text-align: left; max-width: 600px; font-size: 13px; color: #856404;">' +
          '<strong>⚠️ Why can\'t this be embedded?</strong><ul style="margin: 8px 0; padding-left: 20px;">';

        if (isYouTube) {
          buttonHtml += '<li>YouTube blocks embedding in nested iframes (Looker limitation)</li>' +
            '<li>Cache storage restrictions prevent the YouTube player from loading</li>';
        } else if (isNotion) {
          buttonHtml += '<li>Notion\'s CSP only allows: notion.so, mail.notion.so</li>' +
            '<li>Even public pages cannot be embedded in third-party sites</li>';
        } else {
          buttonHtml += '<li>The site has X-Frame-Options or CSP restrictions</li>' +
            '<li>Looker\'s sandboxed iframe environment blocks this content</li>';
        }

        buttonHtml += '</ul><div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #ffc107;">' +
          '<code style="background: #fff; padding: 2px 6px; border-radius: 3px; font-size: 11px; word-break: break-all;">' +
          config.embed_url + '</code></div></div>';
      }

      buttonHtml += '</div>';

      this.content.innerHTML = buttonHtml;
      done();
      return;
    }

    // Try standard iframe for other sites
    var loadingHtml = '<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; color: #6c757d;">' +
      '<div style="border: 3px solid #f3f3f3; border-top: 3px solid #3498db; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto 12px;"></div>' +
      '<style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>' +
      '<div>Loading content...</div></div>';

    this.content.innerHTML = loadingHtml;

    var iframe = document.createElement('iframe');
    iframe.src = config.embed_url;
    iframe.style.cssText = 'border: none; display: block; width: ' + (config.iframe_width || '100%') + '; height: ' + (config.iframe_height || '600px') + ';';
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', 'true');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');

    var self = this;
    var hasLoaded = false;
    var loadTimeout;

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

      self.content.innerHTML = '<div style="padding: 20px; text-align: center; color: #dc3545;">' +
        '<div style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">Failed to Load Content</div>' +
        '<p>The content could not be embedded due to security restrictions.</p>' +
        '<p style="margin-top: 16px;"><a href="' + config.embed_url + '" target="_blank" style="color: #1a73e8; text-decoration: none; font-weight: 500;">Open in New Tab →</a></p>' +
        '</div>';
      done();
    };

    this.content.appendChild(iframe);

    loadTimeout = setTimeout(function() {
      if (!hasLoaded) {
        hasLoaded = true;
        self.content.innerHTML = '';
        self.content.appendChild(iframe);
        done();
      }
    }, 3000);
  }
});
