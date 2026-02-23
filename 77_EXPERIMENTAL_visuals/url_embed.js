/**
 * Looker URL Embed Visualization v2
 * Features:
 * - Tile-based display for blocked content (no button fallback)
 * - Raw HTML/Code embed option to bypass CSP restrictions
 * - Thumbnail/preview support for YouTube and other services
 * - Click-to-play functionality
 */

looker.plugins.visualizations.add({
  id: "url_embed_viz_v2",
  label: "URL Embed v2",
  options: {
    // === CONTENT SECTION ===
    embed_mode: {
      type: "string",
      label: "Embed Mode",
      display: "select",
      values: [
        { "URL (iframe)": "url" },
        { "Raw HTML Code": "html_code" }
      ],
      section: "Content",
      default: "url",
      order: 1
    },
    embed_url: {
      type: "string",
      label: "Embed URL",
      display: "text",
      section: "Content",
      placeholder: "https://www.youtube.com/embed/VIDEO_ID",
      order: 2
    },
    html_code: {
      type: "string",
      label: "HTML Code (for Raw HTML mode)",
      display: "text",
      section: "Content",
      placeholder: "<iframe src='...' width='100%' height='400'></iframe>",
      order: 3
    },
    url_title: {
      type: "string",
      label: "Title",
      display: "text",
      section: "Content",
      placeholder: "External Content",
      order: 4
    },
    show_title: {
      type: "boolean",
      label: "Show Title Bar",
      section: "Content",
      default: false,
      order: 5
    },

    // === LAYOUT SECTION ===
    iframe_height: {
      type: "string",
      label: "Height",
      display: "text",
      section: "Layout",
      default: "100%",
      placeholder: "600px or 100%",
      order: 10
    },
    iframe_width: {
      type: "string",
      label: "Width",
      display: "text",
      section: "Layout",
      default: "100%",
      placeholder: "100% or 800px",
      order: 11
    },

    // === TILE FALLBACK SECTION ===
    fallback_style: {
      type: "string",
      label: "Fallback Display Style",
      display: "select",
      values: [
        { "Thumbnail Tile (Click to Open)": "thumbnail" },
        { "Info Card": "card" },
        { "Minimal Link": "minimal" }
      ],
      section: "Fallback",
      default: "thumbnail",
      order: 20
    },
    custom_thumbnail: {
      type: "string",
      label: "Custom Thumbnail URL",
      display: "text",
      section: "Fallback",
      placeholder: "https://example.com/thumbnail.jpg",
      order: 21
    },
    fallback_icon: {
      type: "string",
      label: "Fallback Icon (emoji or text)",
      display: "text",
      section: "Fallback",
      default: "🔗",
      placeholder: "🎬 or 📄",
      order: 22
    },
    fallback_description: {
      type: "string",
      label: "Fallback Description",
      display: "text",
      section: "Fallback",
      placeholder: "Click to view content",
      order: 23
    },

    // === SECURITY SECTION ===
    allow_features: {
      type: "string",
      label: "iframe Allow Attribute",
      display: "text",
      section: "Security",
      default: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; web-share",
      order: 30
    },
    force_fallback: {
      type: "boolean",
      label: "Force Fallback Mode (skip iframe attempt)",
      section: "Security",
      default: false,
      order: 31
    },

    // === ADVANCED SECTION ===
    show_error_details: {
      type: "boolean",
      label: "Show Error Details on Failure",
      section: "Advanced",
      default: false,
      order: 40
    },
    loading_timeout: {
      type: "number",
      label: "Loading Timeout (seconds)",
      section: "Advanced",
      default: 5,
      order: 41
    },
    background_color: {
      type: "string",
      label: "Background Color",
      display: "color",
      section: "Advanced",
      default: "#ffffff",
      order: 42
    }
  },

  create: function(element, config) {
    // Main container
    this.container = document.createElement('div');
    this.container.className = 'url-embed-container';
    this.container.style.cssText = 'width: 100%; height: 100%; overflow: hidden; position: relative; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;';
    element.appendChild(this.container);

    // Content area
    this.content = document.createElement('div');
    this.content.className = 'url-embed-content';
    this.content.style.cssText = 'width: 100%; height: 100%; display: flex; flex-direction: column;';
    this.container.appendChild(this.content);

    // Add base styles
    var style = document.createElement('style');
    style.textContent = [
      '.url-embed-tile { display: flex; flex-direction: column; height: 100%; cursor: pointer; transition: all 0.2s ease; border-radius: 8px; overflow: hidden; }',
      '.url-embed-tile:hover { transform: scale(1.01); box-shadow: 0 4px 20px rgba(0,0,0,0.15); }',
      '.url-embed-tile:hover .tile-overlay { opacity: 1; }',
      '.tile-thumbnail { flex: 1; background-size: cover; background-position: center; position: relative; min-height: 200px; }',
      '.tile-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.2s; }',
      '.tile-play-icon { width: 80px; height: 80px; background: rgba(255,255,255,0.95); border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(0,0,0,0.3); }',
      '.tile-play-icon svg { width: 40px; height: 40px; fill: #1a73e8; margin-left: 4px; }',
      '.tile-info { padding: 16px; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); position: absolute; bottom: 0; left: 0; right: 0; color: white; }',
      '.tile-title { font-size: 16px; font-weight: 600; margin: 0 0 4px 0; text-shadow: 0 1px 3px rgba(0,0,0,0.5); }',
      '.tile-description { font-size: 13px; opacity: 0.9; margin: 0; }',
      '.url-embed-card { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; padding: 32px; text-align: center; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); cursor: pointer; transition: all 0.2s; }',
      '.url-embed-card:hover { background: linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%); }',
      '.card-icon { font-size: 56px; margin-bottom: 16px; }',
      '.card-title { font-size: 18px; font-weight: 600; color: #212529; margin: 0 0 8px 0; }',
      '.card-description { font-size: 14px; color: #6c757d; margin: 0 0 16px 0; max-width: 400px; }',
      '.card-domain { font-size: 12px; color: #1a73e8; display: flex; align-items: center; gap: 4px; }',
      '.url-embed-minimal { display: flex; align-items: center; justify-content: center; height: 100%; }',
      '.minimal-link { display: flex; align-items: center; gap: 8px; padding: 12px 20px; background: #f8f9fa; border-radius: 8px; text-decoration: none; color: #1a73e8; font-weight: 500; transition: all 0.2s; }',
      '.minimal-link:hover { background: #e9ecef; }',
      '.title-bar { padding: 12px 16px; background: #f8f9fa; border-bottom: 1px solid #e9ecef; display: flex; align-items: center; gap: 8px; }',
      '.title-bar-icon { font-size: 18px; }',
      '.title-bar-text { font-size: 14px; font-weight: 500; color: #212529; flex: 1; }',
      '.title-bar-link { font-size: 12px; color: #6c757d; text-decoration: none; }',
      '.title-bar-link:hover { color: #1a73e8; }',
      '@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }',
      '.loading-skeleton { animation: pulse 1.5s ease-in-out infinite; background: #e9ecef; }'
    ].join('\n');
    element.appendChild(style);
  },

  updateAsync: function(data, element, config, queryResponse, details, done) {
    var self = this;

    // Apply background color
    this.container.style.backgroundColor = config.background_color || '#ffffff';

    // Clear previous content
    this.content.innerHTML = '';

    // Determine embed mode
    var embedMode = config.embed_mode || 'url';

    // === RAW HTML CODE MODE ===
    if (embedMode === 'html_code') {
      if (!config.html_code || config.html_code.trim() === '') {
        this.showPlaceholder('Enter HTML code in settings', 'Paste your embed code (iframe, script, etc.) in the "HTML Code" field');
        done();
        return;
      }

      // Render raw HTML directly
      this.renderHtmlCode(config);
      done();
      return;
    }

    // === URL MODE ===
    if (!config.embed_url || config.embed_url.trim() === '') {
      this.showPlaceholder('Enter URL to embed', 'Configure the embed URL in visualization settings');
      done();
      return;
    }

    var parsedUrl;
    try {
      parsedUrl = new URL(config.embed_url);
    } catch (e) {
      this.showError('Invalid URL', 'The provided URL is not valid: ' + config.embed_url);
      done();
      return;
    }

    // Detect content type
    var contentInfo = this.detectContentType(parsedUrl, config);

    // If force fallback or known problematic site, show tile directly
    if (config.force_fallback || contentInfo.forcesFallback) {
      this.renderFallbackTile(config, contentInfo, parsedUrl);
      done();
      return;
    }

    // Try iframe embedding with fallback
    this.tryIframeEmbed(config, contentInfo, parsedUrl, done);
  },

  detectContentType: function(parsedUrl, config) {
    var hostname = parsedUrl.hostname.toLowerCase();
    var pathname = parsedUrl.pathname;
    var info = {
      type: 'generic',
      icon: config.fallback_icon || '🔗',
      title: config.url_title || 'External Content',
      description: config.fallback_description || 'Click to view content',
      thumbnail: config.custom_thumbnail || null,
      forcesFallback: false
    };

    // YouTube detection
    if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
      var videoId = this.extractYouTubeId(parsedUrl);
      info.type = 'youtube';
      info.icon = '🎬';
      info.title = config.url_title || 'YouTube Video';
      info.description = config.fallback_description || 'Click to watch video';
      info.forcesFallback = true; // YouTube is always blocked in Looker's nested iframe
      if (videoId && !config.custom_thumbnail) {
        info.thumbnail = 'https://img.youtube.com/vi/' + videoId + '/maxresdefault.jpg';
        info.thumbnailFallback = 'https://img.youtube.com/vi/' + videoId + '/hqdefault.jpg';
      }
    }
    // Notion detection
    else if (hostname.includes('notion.site') || hostname.includes('notion.so')) {
      info.type = 'notion';
      info.icon = '📝';
      info.title = config.url_title || 'Notion Page';
      info.description = config.fallback_description || 'Click to view Notion page';
      info.forcesFallback = true; // Notion blocks iframe embedding
    }
    // Vimeo
    else if (hostname.includes('vimeo.com')) {
      info.type = 'vimeo';
      info.icon = '🎥';
      info.title = config.url_title || 'Vimeo Video';
      info.description = config.fallback_description || 'Click to watch video';
    }
    // Google Docs/Sheets/Slides
    else if (hostname.includes('docs.google.com')) {
      info.type = 'google_docs';
      info.icon = '📄';
      info.title = config.url_title || 'Google Document';
      info.description = config.fallback_description || 'Click to view document';
    }
    // Looker Studio
    else if (hostname.includes('lookerstudio.google.com') || hostname.includes('datastudio.google.com')) {
      info.type = 'looker_studio';
      info.icon = '📊';
      info.title = config.url_title || 'Looker Studio Report';
      info.description = config.fallback_description || 'Click to view report';
    }
    // Figma
    else if (hostname.includes('figma.com')) {
      info.type = 'figma';
      info.icon = '🎨';
      info.title = config.url_title || 'Figma Design';
      info.description = config.fallback_description || 'Click to view design';
    }
    // Miro
    else if (hostname.includes('miro.com')) {
      info.type = 'miro';
      info.icon = '🗂️';
      info.title = config.url_title || 'Miro Board';
      info.description = config.fallback_description || 'Click to view board';
    }
    // GitHub
    else if (hostname.includes('github.com')) {
      info.type = 'github';
      info.icon = '💻';
      info.title = config.url_title || 'GitHub Repository';
      info.description = config.fallback_description || 'Click to view on GitHub';
      info.forcesFallback = true;
    }

    return info;
  },

  extractYouTubeId: function(parsedUrl) {
    var videoId = null;
    if (parsedUrl.hostname.includes('youtu.be')) {
      videoId = parsedUrl.pathname.slice(1);
    } else if (parsedUrl.pathname.includes('/embed/')) {
      videoId = parsedUrl.pathname.split('/embed/')[1].split(/[?&]/)[0];
    } else if (parsedUrl.pathname.includes('/watch')) {
      videoId = parsedUrl.searchParams.get('v');
    }
    return videoId;
  },

  renderHtmlCode: function(config) {
    var self = this;

    // Optional title bar
    if (config.show_title && config.url_title) {
      var titleBar = document.createElement('div');
      titleBar.className = 'title-bar';
      titleBar.innerHTML = '<span class="title-bar-icon">📌</span>' +
        '<span class="title-bar-text">' + this.escapeHtml(config.url_title) + '</span>';
      this.content.appendChild(titleBar);
    }

    // Create wrapper for HTML content
    var wrapper = document.createElement('div');
    wrapper.style.cssText = 'flex: 1; width: 100%; height: ' + (config.show_title ? 'calc(100% - 48px)' : '100%') + '; overflow: auto;';

    // IMPORTANT: Using innerHTML to render raw HTML
    // This allows embedding iframes, scripts, and other HTML that might bypass CSP
    // when the source is trusted by the user
    try {
      wrapper.innerHTML = config.html_code;

      // Adjust iframe sizes within the HTML code
      var iframes = wrapper.querySelectorAll('iframe');
      for (var i = 0; i < iframes.length; i++) {
        var iframe = iframes[i];
        if (!iframe.style.width || iframe.style.width === '') {
          iframe.style.width = config.iframe_width || '100%';
        }
        if (!iframe.style.height || iframe.style.height === '') {
          iframe.style.height = config.iframe_height || '100%';
        }
        iframe.style.border = 'none';
      }
    } catch (e) {
      wrapper.innerHTML = '<div style="padding: 20px; color: #dc3545;">Error rendering HTML: ' + this.escapeHtml(e.message) + '</div>';
    }

    this.content.appendChild(wrapper);
  },

  tryIframeEmbed: function(config, contentInfo, parsedUrl, done) {
    var self = this;

    // Show loading state
    this.content.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%;">' +
      '<div style="text-align: center; color: #6c757d;">' +
      '<div class="loading-skeleton" style="width: 40px; height: 40px; border-radius: 50%; margin: 0 auto 12px;"></div>' +
      '<div>Loading content...</div>' +
      '</div></div>';

    // Create iframe
    var iframeWrapper = document.createElement('div');
    iframeWrapper.style.cssText = 'width: 100%; height: 100%; display: flex; flex-direction: column;';

    // Optional title bar
    if (config.show_title && config.url_title) {
      var titleBar = document.createElement('div');
      titleBar.className = 'title-bar';
      titleBar.innerHTML = '<span class="title-bar-icon">' + contentInfo.icon + '</span>' +
        '<span class="title-bar-text">' + this.escapeHtml(config.url_title) + '</span>' +
        '<a href="' + config.embed_url + '" target="_blank" rel="noopener" class="title-bar-link">Open in new tab ↗</a>';
      iframeWrapper.appendChild(titleBar);
    }

    var iframe = document.createElement('iframe');
    iframe.src = config.embed_url;
    iframe.style.cssText = 'flex: 1; border: none; width: ' + (config.iframe_width || '100%') + '; height: ' + (config.show_title ? 'calc(100% - 48px)' : (config.iframe_height || '100%')) + ';';
    iframe.setAttribute('loading', 'lazy');
    iframe.setAttribute('allowfullscreen', 'true');

    if (config.allow_features) {
      iframe.setAttribute('allow', config.allow_features);
    }

    var hasLoaded = false;
    var hasFailed = false;
    var loadTimeout;

    function onLoad() {
      if (hasFailed) return;
      hasLoaded = true;
      clearTimeout(loadTimeout);

      // Successfully loaded - show iframe
      self.content.innerHTML = '';
      self.content.appendChild(iframeWrapper);
      done();
    }

    function onError() {
      if (hasLoaded || hasFailed) return;
      hasFailed = true;
      clearTimeout(loadTimeout);

      // Show fallback tile
      self.renderFallbackTile(config, contentInfo, parsedUrl);
      done();
    }

    iframe.onload = onLoad;
    iframe.onerror = onError;

    // Timeout for CSP blocking (won't trigger onerror)
    var timeout = (config.loading_timeout || 5) * 1000;
    loadTimeout = setTimeout(function() {
      if (!hasLoaded && !hasFailed) {
        // Check if iframe is blank (likely CSP blocked)
        try {
          var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
          // If we can access it and it's empty, it's blocked
          if (!iframeDoc || !iframeDoc.body || iframeDoc.body.innerHTML === '') {
            onError();
          }
        } catch (e) {
          // Cross-origin - might be working, give it more time
          // But if still no load event after extra time, fail
          setTimeout(function() {
            if (!hasLoaded) {
              onError();
            }
          }, 2000);
        }
      }
    }, timeout);

    iframeWrapper.appendChild(iframe);
  },

  renderFallbackTile: function(config, contentInfo, parsedUrl) {
    var self = this;
    var fallbackStyle = config.fallback_style || 'thumbnail';
    var url = config.embed_url;
    var domain = parsedUrl.hostname;

    // === THUMBNAIL TILE STYLE ===
    if (fallbackStyle === 'thumbnail') {
      var tile = document.createElement('div');
      tile.className = 'url-embed-tile';
      tile.onclick = function() { window.open(url, '_blank', 'noopener'); };

      var thumbnail = document.createElement('div');
      thumbnail.className = 'tile-thumbnail';

      if (contentInfo.thumbnail) {
        thumbnail.style.backgroundImage = 'url(' + contentInfo.thumbnail + ')';
        // Fallback for YouTube thumbnail sizes
        if (contentInfo.thumbnailFallback) {
          var img = new Image();
          img.onerror = function() {
            thumbnail.style.backgroundImage = 'url(' + contentInfo.thumbnailFallback + ')';
          };
          img.src = contentInfo.thumbnail;
        }
      } else {
        // Gradient placeholder with icon
        thumbnail.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        thumbnail.innerHTML = '<div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 64px; opacity: 0.3;">' + contentInfo.icon + '</div>';
      }

      // Overlay with play icon
      var overlay = document.createElement('div');
      overlay.className = 'tile-overlay';
      overlay.innerHTML = '<div class="tile-play-icon">' +
        '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>' +
        '</div>';
      thumbnail.appendChild(overlay);

      // Info section
      var info = document.createElement('div');
      info.className = 'tile-info';
      info.innerHTML = '<h4 class="tile-title">' + this.escapeHtml(contentInfo.title) + '</h4>' +
        '<p class="tile-description">' + this.escapeHtml(contentInfo.description) + ' • ' + domain + '</p>';
      thumbnail.appendChild(info);

      tile.appendChild(thumbnail);
      this.content.appendChild(tile);
    }
    // === CARD STYLE ===
    else if (fallbackStyle === 'card') {
      var card = document.createElement('div');
      card.className = 'url-embed-card';
      card.onclick = function() { window.open(url, '_blank', 'noopener'); };

      card.innerHTML = '<div class="card-icon">' + contentInfo.icon + '</div>' +
        '<h3 class="card-title">' + this.escapeHtml(contentInfo.title) + '</h3>' +
        '<p class="card-description">' + this.escapeHtml(contentInfo.description) + '</p>' +
        '<div class="card-domain">' +
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
        '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>' +
        '<polyline points="15 3 21 3 21 9"/>' +
        '<line x1="10" y1="14" x2="21" y2="3"/>' +
        '</svg>' +
        domain +
        '</div>';

      this.content.appendChild(card);
    }
    // === MINIMAL STYLE ===
    else {
      var minimal = document.createElement('div');
      minimal.className = 'url-embed-minimal';

      var link = document.createElement('a');
      link.className = 'minimal-link';
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener';
      link.innerHTML = '<span>' + contentInfo.icon + '</span>' +
        '<span>' + this.escapeHtml(contentInfo.title) + '</span>' +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
        '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>' +
        '<polyline points="15 3 21 3 21 9"/>' +
        '<line x1="10" y1="14" x2="21" y2="3"/>' +
        '</svg>';

      minimal.appendChild(link);
      this.content.appendChild(minimal);
    }

    // Show error details if enabled
    if (config.show_error_details) {
      var details = document.createElement('div');
      details.style.cssText = 'position: absolute; bottom: 8px; left: 8px; right: 8px; padding: 8px 12px; background: rgba(255,243,205,0.95); border: 1px solid #ffc107; border-radius: 4px; font-size: 11px; color: #856404;';
      details.innerHTML = '<strong>ℹ️ CSP Notice:</strong> ' + domain + ' blocks iframe embedding. Content opens in new tab.';
      this.content.appendChild(details);
    }
  },

  showPlaceholder: function(title, description) {
    this.content.innerHTML = '<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; padding: 32px; text-align: center; color: #6c757d;">' +
      '<div style="font-size: 48px; margin-bottom: 16px; opacity: 0.5;">📋</div>' +
      '<h3 style="margin: 0 0 8px 0; color: #212529; font-weight: 600;">' + this.escapeHtml(title) + '</h3>' +
      '<p style="margin: 0; max-width: 400px;">' + this.escapeHtml(description) + '</p>' +
      '</div>';
  },

  showError: function(title, message) {
    this.content.innerHTML = '<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; padding: 32px; text-align: center;">' +
      '<div style="font-size: 48px; margin-bottom: 16px;">⚠️</div>' +
      '<h3 style="margin: 0 0 8px 0; color: #dc3545; font-weight: 600;">' + this.escapeHtml(title) + '</h3>' +
      '<p style="margin: 0; color: #6c757d; max-width: 400px;">' + this.escapeHtml(message) + '</p>' +
      '</div>';
  },

  escapeHtml: function(text) {
    if (!text) return '';
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
});
