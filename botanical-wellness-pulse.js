(function() {
  var MIRZALA_PRODUCTS = [
    {
      image: "https://images-na.ssl-images-amazon.com/images/P/B0CMS5WTG4.jpg",
      title: "Secret Roll-On Powder Fresh, 1.8 oz (12-Pack)",
      description: "Bring a fresh, uplifting scent into your home with 100% pure botanical and wellness care oils. Steam distilled and ready to transform your daily routine.",
      url: "https://www.amazon.com/dp/B0CMS5WTG4"
    },
    {
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=60",
      title: "Botanical Essential Care Oil",
      description: "Natural hair and body care essentials designed for your daily organic rituals.",
      url: "https://www.amazon.com/dp/XXXXXXXXXX"
    }
  ];

  var JSON_URL = '';
  var FALLBACK_IMG = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=60";

  var path = window.location.pathname.toLowerCase();
  var isCurated = path.indexOf('botanical-wellness-pulse') !== -1 || path.indexOf('oil-product') !== -1;
  if (!isCurated) return;

  var root = document.createElement('div');
  root.id = 'curated-standalone';
  root.innerHTML = `
    <div id="curated-stage">
      <button id="curated-home-btn" title="Home">
        <svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
      </button>

      <div id="curated-touch-shield"></div>

      <div class="curated-card-header">
        <span class="curated-brand-logo">MIRZALA PULSE</span>
        <span class="curated-sponsored-text">Sponsored</span>
      </div>

      <div class="curated-image-wrapper">
        <div class="curated-image-container">
          <img id="curated-img" src="" alt="Product">
        </div>
      </div>

      <div class="curated-content">
        <div class="curated-nav" id="curated-nav">
          <button class="curated-nav-btn" id="ctrl-up" title="Previous Product" aria-label="Previous Product">
            <svg viewBox="0 0 24 24"><path d="M6.5 14.5 12 9l5.5 5.5"/></svg>
          </button>

          <button id="curated-share-btn" class="curated-share-btn" title="Share" aria-label="Share">
            <svg viewBox="0 0 24 24">
              <circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/>
              <path d="m8.2 10.9 7.5-4.2M8.2 13.1l7.5 4.2"/>
            </svg>
          </button>

          <button class="curated-nav-btn" id="ctrl-down" title="Next Product" aria-label="Next Product">
            <svg viewBox="0 0 24 24"><path d="m6.5 9.5 5.5 5.5 5.5-5.5"/></svg>
          </button>
        </div>

        <h2 class="curated-title" id="curated-title">Loading Botanical Essentials...</h2>
        <p class="curated-description" id="curated-desc">Please wait while we load the collection...</p>
      </div>

      <div class="curated-bottom-group">
        <div class="curated-cta-container">
          <a id="curated-link" href="#" class="curated-cta-button" target="_blank" rel="nofollow">Check It Out ➔</a>
        </div>
        <div class="curated-ftc-disclosure">
          <span class="disclosure-star">*</span> mirzala is reader-supported. We may earn a commission from qualifying purchases. <a href="/p/affiliate-disclosure.html" target="_blank">Affiliate Disclosure</a>.
        </div>
      </div>

      <div id="curated-share-overlay" aria-hidden="true">
        <div class="curated-share-sheet" role="dialog" aria-label="Share product">
          <div class="curated-share-top">
            <span class="curated-share-heading">Share this selection</span>
            <button class="curated-share-close" id="curated-share-close" aria-label="Close"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
          </div>
          <div class="curated-share-options">
            <button class="curated-share-option" data-share="whatsapp" type="button"><svg viewBox="0 0 24 24"><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4A8 8 0 1 1 20 11.5Z"/><path d="M8.7 8.4c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4-.1.6l-.5.6c-.1.1-.1.3 0 .5.5.9 1.2 1.6 2.1 2.1.2.1.4.1.5 0l.7-.5c.2-.2.4-.2.6-.1l1.6.7c.2.1.4.3.4.5v.5c0 .3-.1.5-.4.7-.4.3-1 .4-1.5.2-2.6-.8-4.6-2.8-5.4-5.4-.2-.5-.1-1.1.1-1.6Z"/></svg><span>WhatsApp</span></button>
            <button class="curated-share-option" data-share="copy" type="button"><svg viewBox="0 0 24 24"><rect x="8" y="8" width="11" height="11" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg><span>Copy Link</span></button>
          </div>
          <div class="curated-share-note">Share this product on WhatsApp or copy its link directly.</div>
        </div>
      </div>

      <div id="curated-share-toast">Link copied</div>
    </div>
  `;
  document.body.appendChild(root);

  var currentList = [];
  var currentIndex = 0;

  var titleEl = document.getElementById('curated-title');
  var descEl = document.getElementById('curated-desc');
  var imgEl = document.getElementById('curated-img');
  var linkEl = document.getElementById('curated-link');
  var navEl = document.getElementById('curated-nav');
  var stage = document.getElementById('curated-stage');
  var shareOverlay = document.getElementById('curated-share-overlay');

  function hashString(str) {
    var h = 5381;
    for (var i = 0; i < str.length; i++) { h = ((h << 5) + h + str.charCodeAt(i)) >>> 0; }
    return h.toString(36);
  }

  function buildStableId(item, title, url) {
    var explicitId = item.id || item.product_id || item.productId || item.asin || item.ASIN || '';
    if (explicitId) return String(explicitId).trim();
    var asin = String(url).match(/(?:prodsku=|\/dp\/|\/gp\/product\/)([A-Z0-9]{10})/i);
    if (asin) return asin[1].toUpperCase();
    return 'p' + hashString(title + '|' + url);
  }

  function normalize(item) {
    if (!item || typeof item !== 'object') return null;
    var image = item.image || item.img || item.photo || item.imageUrl || item.image_url || '';
    var title = item.title || item.text || item.name || '';
    var desc = item.description || item.desc || '';
    var url = item.url || item.affiliate || item.affiliateUrl || item.affiliate_url || item.link || '#';

    if (!title && !image) return null;
    title = String(title || "Featured Product");
    url = String(url);

    return {
      id: buildStableId(item, title, url),
      title: title,
      desc: String(desc || ""),
      img: (typeof image === 'string' && image.trim() !== "") ? image.trim() : FALLBACK_IMG,
      url: url
    };
  }

  function checkUrlProductParam() {
    var urlParams = new URLSearchParams(window.location.search);
    var targetId = urlParams.get('product_id') || urlParams.get('id');
    if (targetId && currentList.length > 0) {
      var foundIdx = currentList.findIndex(function(p) { return p.id === targetId; });
      if (foundIdx !== -1) currentIndex = foundIdx;
    }
  }

  function render(idx) {
    if (!currentList || currentList.length === 0) return;
    if (idx >= currentList.length) currentIndex = 0;
    if (idx < 0) currentIndex = currentList.length - 1;

    var p = currentList[currentIndex];
    titleEl.textContent = p.title;
    descEl.textContent = p.desc;
    descEl.style.display = p.desc ? '-webkit-box' : 'none';
    imgEl.src = p.img;
    linkEl.href = p.url;
  }

  function getSmartProductUrl() {
    if (!currentList || !currentList[currentIndex]) return window.location.href;
    var url = new URL(window.location.href);
    url.searchParams.delete('id');
    url.searchParams.set('product_id', currentList[currentIndex].id);
    url.hash = '';
    return url.toString();
  }

  function openSharePanel() { shareOverlay.classList.add('show'); shareOverlay.setAttribute('aria-hidden', 'false'); }
  function closeSharePanel() { shareOverlay.classList.remove('show'); shareOverlay.setAttribute('aria-hidden', 'true'); }

  function showShareToast(message) {
    var toast = document.getElementById('curated-share-toast');
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(window.__mirzalaShareToastTimer);
    window.__mirzalaShareToastTimer = setTimeout(function() { toast.classList.remove('show'); }, 1800);
  }

  function fallbackCopyText(text, success) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;left:-10000px;top:0;width:1px;height:1px;opacity:0;user-select:text;-webkit-user-select:text;';
    document.body.appendChild(ta);
    ta.focus(); ta.select(); ta.setSelectionRange(0, ta.value.length);
    var copied = false;
    try { copied = document.execCommand('copy'); } catch (err) { copied = false; }
    document.body.removeChild(ta);
    if (copied) success(); else window.prompt('Copy link:', text);
  }

  function copyText(text, message) {
    function success() { showShareToast(message || 'Link copied'); }
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        navigator.clipboard.writeText(text).then(success).catch(function() { fallbackCopyText(text, success); });
        return;
      }
    } catch (err) {}
    fallbackCopyText(text, success);
  }

  function handleShare(type) {
    var product = currentList[currentIndex];
    if (!product) return;
    var smartUrl = getSmartProductUrl();

    if (type === 'whatsapp') {
      var text = product.title + ' - ' + smartUrl; // Düzeltilmiş tire kullanıldı
      window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank', 'noopener,noreferrer');
      closeSharePanel();
      return;
    }
    if (type === 'copy') { copyText(smartUrl, 'Link copied'); }
  }

  function go(step) {
    if (currentList.length < 2) return;
    currentIndex = (currentIndex + step + currentList.length) % currentList.length;
    render(currentIndex);
  }

  function init(rawList) {
    currentList = rawList.map(normalize).filter(function(p) { return p; });
    if (currentList.length === 0) {
      titleEl.textContent = "No products found";
      descEl.textContent = "Please add products to the list.";
      navEl.style.display = 'none';
      return;
    }
    var single = currentList.length < 2;
    document.getElementById('ctrl-up').style.display = single ? 'none' : 'flex';
    document.getElementById('ctrl-down').style.display = single ? 'none' : 'flex';

    window.MirzalaProductDatabase = currentList;
    checkUrlProductParam();
    render(currentIndex);
  }

  if (JSON_URL) {
    fetch(JSON_URL + '?t=' + new Date().getTime())
      .then(function(response) { return response.json(); })
      .then(function(data) {
        var extra = Array.isArray(data) ? data : (data && data.products ? data.products : []);
        init(MIRZALA_PRODUCTS.concat(extra));
      })
      .catch(function(err) { init(MIRZALA_PRODUCTS); });
  } else {
    init(MIRZALA_PRODUCTS);
  }

  document.getElementById('curated-home-btn').addEventListener('click', function(e) {
    e.stopPropagation(); window.location.href = 'https://www.mirzala.com/';
  });
  document.getElementById('ctrl-up').addEventListener('click', function(e) { e.stopPropagation(); go(-1); });
  document.getElementById('ctrl-down').addEventListener('click', function(e) { e.stopPropagation(); go(1); });
  document.getElementById('curated-share-btn').addEventListener('click', function(e) { e.stopPropagation(); openSharePanel(); });
  document.getElementById('curated-share-close').addEventListener('click', function(e) { e.stopPropagation(); closeSharePanel(); });

  shareOverlay.addEventListener('click', function(e) { if (e.target === shareOverlay) closeSharePanel(); });
  shareOverlay.querySelectorAll('[data-share]').forEach(function(btn) {
    btn.addEventListener('click', function(e) { e.stopPropagation(); handleShare(btn.getAttribute('data-share')); });
  });

  var startY = 0;
  stage.addEventListener('touchstart', function(e) { startY = e.touches[0].clientY; }, { passive: true });
  stage.addEventListener('touchend', function(e) {
    if (shareOverlay.classList.contains('show')) return;
    var diffY = e.changedTouches[0].clientY - startY;
    if (diffY < -30) go(1); else if (diffY > 30) go(-1);
  }, { passive: true });

  stage.addEventListener('wheel', function(e) {
    e.preventDefault();
    if (shareOverlay.classList.contains('show')) return;
    if (e.deltaY > 15) go(1); else if (e.deltaY < -15) go(-1);
  }, { passive: false });

  window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') { closeSharePanel(); return; }
    if (shareOverlay.classList.contains('show')) return;
    if (e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); go(1); }
    else if (e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); go(-1); }
  });
})();
