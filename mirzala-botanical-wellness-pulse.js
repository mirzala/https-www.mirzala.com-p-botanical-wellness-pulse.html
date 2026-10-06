(function () {
  "use strict";

  /* =========================================================
     MIRZALA PULSE
     TARGET PAGE:
     /p/new-new-new.html
     ========================================================= */

  var TARGET_PATH = "/p/new-new-new.html";

  var currentPath = window.location.pathname
    .toLowerCase()
    .replace(/\/+$/, "");

  if (currentPath !== TARGET_PATH) {
    return;
  }

  /* =========================================================
     SETTINGS
     ========================================================= */

  var JSON_URL = "";

  var FALLBACK_IMG =
    "https://via.placeholder.com/800x800.png?text=Mirzala";

  /* =========================================================
     PRODUCT DATABASE
     ========================================================= */

  var products = [
    {
      id: "product-1",
      title: "Botanical Wellness Product",
      description:
        "Discover a carefully selected wellness product through Mirzala Pulse.",
      image: FALLBACK_IMG,
      price: "",
      category: "Wellness",
      url: "https://www.amazon.com/",
      affiliate: true
    },

    {
      id: "product-2",
      title: "Premium Wellness Selection",
      description:
        "Explore another carefully selected product from the Mirzala discovery feed.",
      image: FALLBACK_IMG,
      price: "",
      category: "Wellness",
      url: "https://www.amazon.com/",
      affiliate: true
    }
  ];

  /* =========================================================
     ROOT
     ========================================================= */

  function createRoot() {

    var oldRoot = document.getElementById("curated-standalone");

    if (oldRoot) {
      oldRoot.remove();
    }

    var root = document.createElement("div");

    root.id = "curated-standalone";

    root.innerHTML = `
      <div id="curated-stage">

        <header id="curated-header">

          <div id="curated-brand">
            <span class="curated-logo">MIRZALA</span>
            <span class="curated-label">PULSE</span>
          </div>

          <button
            id="curated-share"
            type="button"
            aria-label="Share">
            ↗
          </button>

        </header>


        <div id="curated-sponsored">
          SPONSORED
        </div>


        <main id="curated-content">

          <div id="curated-image-wrap">

            <img
              id="curated-product-image"
              src="${FALLBACK_IMG}"
              alt="Mirzala Pulse product"
            />

          </div>


          <div id="curated-info">

            <div id="curated-category">
              WELLNESS
            </div>

            <h1 id="curated-title">
              Mirzala Pulse
            </h1>

            <p id="curated-description">
              Discover carefully selected products.
            </p>

            <div id="curated-price"></div>

            <a
              id="curated-cta"
              href="#"
              target="_blank"
              rel="nofollow sponsored noopener">
              VIEW PRODUCT
            </a>

          </div>

        </main>


        <div id="curated-disclosure">
          As an affiliate, Mirzala may earn a commission from qualifying purchases.
        </div>


        <nav id="curated-nav">

          <button
            id="curated-prev"
            type="button"
            aria-label="Previous product">
            ↑
          </button>

          <div id="curated-counter">
            1 / 1
          </div>

          <button
            id="curated-next"
            type="button"
            aria-label="Next product">
            ↓
          </button>

        </nav>


        <button
          id="curated-home"
          type="button"
          aria-label="Home">
          MIRZALA
        </button>


        <div
          id="curated-share-panel"
          aria-hidden="true">

          <div class="curated-share-box">

            <button
              id="curated-share-close"
              type="button"
              aria-label="Close">
              ×
            </button>

            <h2>Share this product</h2>

            <button
              id="curated-whatsapp"
              type="button">
              WhatsApp
            </button>

            <button
              id="curated-copy"
              type="button">
              Copy Link
            </button>

          </div>

        </div>

      </div>
    `;

    document.body.appendChild(root);

    return root;
  }


  /* =========================================================
     NORMALIZE PRODUCT
     ========================================================= */

  function normalizeProduct(item, index) {

    item = item || {};

    return {
      id: item.id || ("product-" + (index + 1)),

      title:
        item.title ||
        item.name ||
        "Mirzala Product",

      description:
        item.description ||
        item.desc ||
        "Discover this selected product through Mirzala Pulse.",

      image:
        item.image ||
        item.image_url ||
        item.img ||
        FALLBACK_IMG,

      price:
        item.price ||
        "",

      category:
        item.category ||
        "Featured",

      url:
        item.url ||
        item.link ||
        "#",

      affiliate:
        item.affiliate !== false
    };
  }


  /* =========================================================
     PRODUCT ID FROM URL
     ========================================================= */

  function getProductIdFromURL() {

    try {

      var params = new URLSearchParams(
        window.location.search
      );

      return params.get("product_id");

    } catch (e) {

      return null;

    }
  }


  /* =========================================================
     STATE
     ========================================================= */

  var currentIndex = 0;


  /* =========================================================
     RENDER
     ========================================================= */

  function renderProduct(index) {

    if (!products.length) {
      return;
    }

    if (index < 0) {
      index = products.length - 1;
    }

    if (index >= products.length) {
      index = 0;
    }

    currentIndex = index;

    var product = products[currentIndex];

    var image =
      document.getElementById("curated-product-image");

    var title =
      document.getElementById("curated-title");

    var description =
      document.getElementById("curated-description");

    var price =
      document.getElementById("curated-price");

    var category =
      document.getElementById("curated-category");

    var cta =
      document.getElementById("curated-cta");

    var counter =
      document.getElementById("curated-counter");


    if (image) {

      image.src =
        product.image || FALLBACK_IMG;

      image.alt =
        product.title;

    }


    if (title) {
      title.textContent =
        product.title;
    }


    if (description) {
      description.textContent =
        product.description;
    }


    if (category) {

      category.textContent =
        String(product.category).toUpperCase();

    }


    if (price) {

      if (product.price) {

        price.textContent =
          product.price;

        price.style.display =
          "block";

      } else {

        price.textContent = "";

        price.style.display =
          "none";

      }

    }


    if (cta) {

      cta.href =
        product.url || "#";

      cta.textContent =
        "VIEW PRODUCT";

    }


    if (counter) {

      counter.textContent =
        (currentIndex + 1) +
        " / " +
        products.length;

    }

  }


  /* =========================================================
     SMART SHARE URL
     ========================================================= */

  function getShareURL() {

    var product =
      products[currentIndex];

    if (!product) {
      return window.location.href;
    }

    var base =
      window.location.origin +
      window.location.pathname;

    return (
      base +
      "?product_id=" +
      encodeURIComponent(product.id)
    );

  }


  /* =========================================================
     SHARE PANEL
     ========================================================= */

  function openSharePanel() {

    var panel =
      document.getElementById(
        "curated-share-panel"
      );

    if (!panel) {
      return;
    }

    panel.setAttribute(
      "aria-hidden",
      "false"
    );

    panel.classList.add(
      "active"
    );

  }


  function closeSharePanel() {

    var panel =
      document.getElementById(
        "curated-share-panel"
      );

    if (!panel) {
      return;
    }

    panel.setAttribute(
      "aria-hidden",
      "true"
    );

    panel.classList.remove(
      "active"
    );

  }


  /* =========================================================
     SHARE
     ========================================================= */

  function shareCurrentProduct() {

    var shareURL =
      getShareURL();

    var product =
      products[currentIndex];

    var shareTitle =
      product
        ? product.title
        : "Mirzala Pulse";


    if (
      navigator.share
    ) {

      navigator.share({

        title:
          shareTitle,

        text:
          "Discover this product on Mirzala Pulse.",

        url:
          shareURL

      }).catch(function () {});

      return;
    }


    openSharePanel();

  }


  /* =========================================================
     WHATSAPP
     ========================================================= */

  function shareWhatsApp() {

    var url =
      getShareURL();

    var text =
      "Check this out on Mirzala Pulse: " +
      url;

    window.open(
      "https://wa.me/?text=" +
      encodeURIComponent(text),
      "_blank"
    );

  }


  /* =========================================================
     COPY LINK
     ========================================================= */

  function copyShareLink() {

    var url =
      getShareURL();


    if (
      navigator.clipboard &&
      navigator.clipboard.writeText
    ) {

      navigator.clipboard
        .writeText(url)
        .then(function () {

          alert(
            "Link copied."
          );

        })
        .catch(function () {

          window.prompt(
            "Copy this link:",
            url
          );

        });

    } else {

      window.prompt(
        "Copy this link:",
        url
      );

    }

  }


  /* =========================================================
     NAVIGATION
     ========================================================= */

  function nextProduct() {

    renderProduct(
      currentIndex + 1
    );

  }


  function previousProduct() {

    renderProduct(
      currentIndex - 1
    );

  }


  /* =========================================================
     INIT EVENTS
     ========================================================= */

  function initEvents() {

    var next =
      document.getElementById(
        "curated-next"
      );

    var prev =
      document.getElementById(
        "curated-prev"
      );

    var share =
      document.getElementById(
        "curated-share"
      );

    var closeShare =
      document.getElementById(
        "curated-share-close"
      );

    var whatsapp =
      document.getElementById(
        "curated-whatsapp"
      );

    var copy =
      document.getElementById(
        "curated-copy"
      );

    var home =
      document.getElementById(
        "curated-home"
      );


    if (next) {

      next.addEventListener(
        "click",
        nextProduct
      );

    }


    if (prev) {

      prev.addEventListener(
        "click",
        previousProduct
      );

    }


    if (share) {

      share.addEventListener(
        "click",
        shareCurrentProduct
      );

    }


    if (closeShare) {

      closeShare.addEventListener(
        "click",
        closeSharePanel
      );

    }


    if (whatsapp) {

      whatsapp.addEventListener(
        "click",
        shareWhatsApp
      );

    }


    if (copy) {

      copy.addEventListener(
        "click",
        copyShareLink
      );

    }


    if (home) {

      home.addEventListener(
        "click",
        function () {

          window.location.href =
            "/";

        }
      );

    }


    /* Keyboard */

    document.addEventListener(
      "keydown",
      function (event) {

        if (
          event.key === "ArrowDown" ||
          event.key === "ArrowRight"
        ) {

          nextProduct();

        }

        if (
          event.key === "ArrowUp" ||
          event.key === "ArrowLeft"
        ) {

          previousProduct();

        }

        if (
          event.key === "Escape"
        ) {

          closeSharePanel();

        }

      }
    );


    /* Mouse wheel */

    var stage =
      document.getElementById(
        "curated-stage"
      );

    if (stage) {

      stage.addEventListener(
        "wheel",
        function (event) {

          if (
            Math.abs(event.deltaY) < 20
          ) {
            return;
          }

          if (
            event.deltaY > 0
          ) {

            nextProduct();

          } else {

            previousProduct();

          }

        },
        {
          passive: true
        }
      );

    }


    /* Touch swipe */

    var touchStartY =
      null;

    if (stage) {

      stage.addEventListener(
        "touchstart",
        function (event) {

          if (
            event.touches &&
            event.touches.length
          ) {

            touchStartY =
              event.touches[0].clientY;

          }

        },
        {
          passive: true
        }
      );


      stage.addEventListener(
        "touchend",
        function (event) {

          if (
            touchStartY === null
          ) {
            return;
          }

          var touchEndY =
            event.changedTouches[0].clientY;

          var difference =
            touchStartY -
            touchEndY;


          if (
            Math.abs(difference) > 50
          ) {

            if (
              difference > 0
            ) {

              nextProduct();

            } else {

              previousProduct();

            }

          }


          touchStartY =
            null;

        },
        {
          passive: true
        }
      );

    }

  }


  /* =========================================================
     LOAD JSON
     ========================================================= */

  function loadProducts() {

    if (!JSON_URL) {

      finishInit();

      return;

    }


    fetch(JSON_URL)

      .then(function (response) {

        if (!response.ok) {
          throw new Error(
            "JSON request failed"
          );
        }

        return response.json();

      })

      .then(function (data) {

        if (
          Array.isArray(data) &&
          data.length
        ) {

          products =
            data.map(
              normalizeProduct
            );

        }

        finishInit();

      })

      .catch(function () {

        finishInit();

      });

  }


  /* =========================================================
     FINISH
     ========================================================= */

  function finishInit() {

    var root =
      createRoot();


    if (!root) {
      return;
    }


    /* Normalize fallback products */

    products =
      products.map(
        normalizeProduct
      );


    /* URL product */

    var requestedID =
      getProductIdFromURL();


    if (requestedID) {

      var foundIndex =
        products.findIndex(
          function (product) {

            return (
              product.id ===
              requestedID
            );

          }
        );


      if (foundIndex >= 0) {

        currentIndex =
          foundIndex;

      }

    }


    renderProduct(
      currentIndex
    );


    initEvents();

  }


  /* =========================================================
     START
     ========================================================= */

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      loadProducts
    );

  } else {

    loadProducts();

  }

})();
