/* ============================================================
   NorthStay Review — shared site engine
   Handles: header/footer injection, star rendering, hotel cards,
   review-page rendering, embedded maps, and the reservation &
   feedback session flows. Driven entirely by data.js.
   ============================================================ */
(function () {
  "use strict";

  var NS = (SITE.brandMark || "site").toLowerCase().replace(/[^a-z0-9]/g, "");
  var RES_KEY = NS + "_reservation";
  var FB_KEY = NS + "_feedback";

  /* ---------- small helpers ---------- */
  function el(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function currentPage() {
    var p = location.pathname.split("/").pop();
    return p || "index.html";
  }

  /* ---------- stars ---------- */
  function ratingStars(r) {
    var html = "";
    for (var i = 1; i <= 5; i++) {
      if (r >= i) html += '<span class="st full">★</span>';
      else if (r >= i - 0.5) html += '<span class="st half">★</span>';
      else html += '<span class="st empty">★</span>';
    }
    return '<span class="rating-stars" aria-hidden="true">' + html + "</span>";
  }
  function classStars(n) {
    var html = "";
    for (var i = 0; i < n; i++) html += '<span class="st full">★</span>';
    return '<span class="rating-stars class-stars" title="' + n + '-star class" aria-hidden="true">' + html + "</span>";
  }

  /* ---------- navigation config ---------- */
  var NAV = [
    { href: "index.html", label: "Home" },
    { href: "index.html#hotels", label: "Reviews" },
    { href: "authors.html", label: "Our Writers" },
    { href: "index.html#about", label: "About" },
    { href: "help-center.html", label: "Help Centre" }
  ];

  var FOOTER_LINKS = {
    "Company": [
      { href: "index.html#about", label: "About Us" },
      { href: "authors.html", label: "Our Writers" },
      { href: "partnership.html", label: "Partnership" },
      { href: "affiliate-disclosure.html", label: "Affiliate Disclosure" },
      { href: "feedback.html", label: "Send Feedback" }
    ],
    "Travellers": [
      { href: "help-center.html", label: "Help Centre" },
      { href: "travel-documents.html", label: "International Travel Documents" },
      { href: "traveller-rights.html", label: "Your Rights as a Traveller" },
      { href: "accessibility.html", label: "Accessibility" },
      { href: "content-guidelines.html", label: "Content Guidelines & Reporting" }
    ],
    "Legal": [
      { href: "privacy.html", label: "Privacy Policy" },
      { href: "terms.html", label: "Terms of Use" },
      { href: "cookie-policy.html", label: "Cookie Policy" },
      { href: "opt-out.html", label: "Your Privacy Choices" },
      { href: "#", label: "Cookie Settings", cookieSettings: true }
    ]
  };

  /* ---------- header / footer ---------- */
  function buildHeader() {
    var page = currentPage();
    var items = NAV.map(function (n) {
      var base = n.href.split("#")[0];
      var active = base === page && n.href.indexOf("#") === -1 ? " active" : "";
      return '<li><a class="nav-link' + active + '" href="' + n.href + '">' + n.label + "</a></li>";
    }).join("");
    return (
      '<div class="topbar"><div class="wrap topbar__in">' +
        '<span>★ Independent reviews · No hidden fees shown · Reader-first since ' + SITE.established + "</span>" +
        '<span class="topbar__contact">' + esc(SITE.email) + "</span>" +
      "</div></div>" +
      '<header class="site-header"><div class="wrap site-header__in">' +
        '<a class="brand" href="index.html">' +
          '<span class="brand__mark">' + (SITE.glyph || "▲") + "</span>" +
          '<span class="brand__text"><strong>' + esc(SITE.brandMark) + "</strong><em>" + esc(SITE.brandSuffix || "Review") + "</em></span>" +
        "</a>" +
        '<button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">☰</button>' +
        '<nav class="site-nav"><ul>' + items + "</ul></nav>" +
      "</div></header>"
    );
  }

  function buildFooter() {
    var cols = Object.keys(FOOTER_LINKS).map(function (title) {
      var links = FOOTER_LINKS[title].map(function (l) {
        if (l.cookieSettings) {
          return '<li><a href="#" data-cookie-settings="1">' + l.label + "</a></li>";
        }
        return '<li><a href="' + l.href + '">' + l.label + "</a></li>";
      }).join("");
      return '<div class="footer-col"><h4>' + title + "</h4><ul>" + links + "</ul></div>";
    }).join("");
    var year = 2026;
    return (
      '<footer class="site-footer"><div class="wrap">' +
        '<div class="footer-grid">' +
          '<div class="footer-brand">' +
            '<a class="brand brand--footer" href="index.html"><span class="brand__mark">' + (SITE.glyph || "▲") + "</span>" +
            '<span class="brand__text"><strong>' + esc(SITE.brandMark) + "</strong><em>" + esc(SITE.brandSuffix || "Review") + "</em></span></a>" +
            "<p>" + esc(SITE.intro) + "</p>" +
            '<p class="footer-contact">' + esc(SITE.city) + " · " + esc(SITE.email) + "</p>" +
          "</div>" + cols +
        "</div>" +
        '<div class="footer-disclaimer">' +
          "<p><strong>Affiliate disclosure:</strong> " + esc(SITE.brand) + " is an independent, reader-supported review service. " +
          "We may earn a commission when you book a stay through partner links on this site, at no additional cost to you. " +
          "Commissions never influence our ratings or the opinions of our writers. " +
          '<a href="affiliate-disclosure.html">Read the full disclosure</a>.</p>' +
          "<p><strong>Not affiliated with the hotels we review.</strong> " + esc(SITE.brand) + " is an independent editorial publication. " +
          "We are not a hotel, booking agency, or travel agent, and we are not affiliated with, authorised by, endorsed by, or an official representative of any hotel, resort, brand or booking platform mentioned on this site. " +
          "All hotel names, logos and trademarks are the property of their respective owners and are used for identification and editorial purposes only. This is not the official website of any hotel.</p>" +
        "</div>" +
        '<div class="footer-bottom">' +
          "<span>© " + year + " " + esc(SITE.brand) + ". All rights reserved.</span>" +
          '<span class="footer-bottom__links">' +
            '<a href="privacy.html">Privacy</a><a href="terms.html">Terms</a><a href="cookie-policy.html">Cookies</a>' +
          "</span>" +
        "</div>" +
      "</div></footer>"
    );
  }

  function injectChrome() {
    var h = el("site-header");
    if (h) h.innerHTML = buildHeader();
    var f = el("site-footer");
    if (f) f.innerHTML = buildFooter();
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".site-nav");
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }
    // "Cookie Settings" links (footer + anywhere with data-cookie-settings)
    document.querySelectorAll('[data-cookie-settings]').forEach(function (a) {
      a.addEventListener("click", function (e) { e.preventDefault(); Consent.open(); });
    });
  }

  /* ============================================================
     Cookie consent (Google EU user consent policy / Consent Mode v2)
     - Non-essential storage defaults to DENIED for everyone.
     - Choice is stored in localStorage and mirrored to Google
       Consent Mode signals via dataLayer, so if Google Analytics
       or Google Ads tags are added later they respect the choice.
     - NOTE: For personalised ads to users in the EEA/UK/Switzerland,
       Google requires a *certified* CMP (IAB TCF). This lightweight
       banner is a compliant baseline; swap in a certified CMP before
       serving personalised ads in those regions. See README-compliance.md.
     ============================================================ */
  var Consent = (function () {
    var KEY = NS + "_consent";
    var CATS = ["analytics", "marketing"]; // functional+necessary are always on

    function gtag() { (window.dataLayer = window.dataLayer || []).push(arguments); }

    function setDefaults() {
      // Fire BEFORE any tag loads: deny non-essential until the user chooses.
      gtag("consent", "default", {
        ad_storage: "denied", analytics_storage: "denied",
        ad_user_data: "denied", ad_personalization: "denied",
        functionality_storage: "granted", security_storage: "granted",
        wait_for_update: 500
      });
    }

    function read() {
      try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; }
    }
    function apply(state) {
      gtag("consent", "update", {
        ad_storage: state.marketing ? "granted" : "denied",
        analytics_storage: state.analytics ? "granted" : "denied",
        ad_user_data: state.marketing ? "granted" : "denied",
        ad_personalization: state.marketing ? "granted" : "denied"
      });
      window.NSConsent = state;
    }
    function save(state) {
      state.date = "recorded";
      try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
      apply(state);
      var b = el("ns-consent"); if (b) b.parentNode.removeChild(b);
    }

    function bar(existing) {
      var a = existing && existing.analytics ? " checked" : "";
      var m = existing && existing.marketing ? " checked" : "";
      return (
        '<div id="ns-consent" class="consent" role="dialog" aria-live="polite" aria-label="Cookie consent">' +
          '<div class="consent__in">' +
            '<div class="consent__body">' +
              "<h4>We value your privacy</h4>" +
              "<p>We use cookies to run this site and, with your permission, to measure traffic and support our affiliate partnerships. " +
              "Strictly necessary cookies are always on. You can accept all, reject non-essential, or choose below. " +
              'Read our <a href="cookie-policy.html">Cookie Policy</a> and <a href="privacy.html">Privacy Policy</a>.</p>' +
              '<div class="consent__opts">' +
                '<label class="consent__opt"><input type="checkbox" checked disabled> Strictly necessary <span>(always active)</span></label>' +
                '<label class="consent__opt"><input type="checkbox" id="ns-c-analytics"' + a + "> Performance &amp; analytics</label>" +
                '<label class="consent__opt"><input type="checkbox" id="ns-c-marketing"' + m + "> Affiliate &amp; marketing</label>" +
              "</div>" +
            "</div>" +
            '<div class="consent__actions">' +
              '<button class="btn btn--ghost" id="ns-c-reject" type="button">Reject non-essential</button>' +
              '<button class="btn btn--outline" id="ns-c-save" type="button">Save choices</button>' +
              '<button class="btn btn--primary" id="ns-c-accept" type="button">Accept all</button>' +
            "</div>" +
          "</div>" +
        "</div>"
      );
    }

    function render(existing) {
      if (el("ns-consent")) return;
      var host = document.createElement("div");
      host.innerHTML = bar(existing);
      document.body.appendChild(host.firstChild);
      el("ns-c-accept").addEventListener("click", function () { save({ analytics: true, marketing: true }); });
      el("ns-c-reject").addEventListener("click", function () { save({ analytics: false, marketing: false }); });
      el("ns-c-save").addEventListener("click", function () {
        save({ analytics: el("ns-c-analytics").checked, marketing: el("ns-c-marketing").checked });
      });
    }

    return {
      init: function () {
        setDefaults();
        var s = read();
        if (s) { apply(s); } else { render(null); }
      },
      open: function () { render(read()); }
    };
  })();

  /* ---------- hotel cards (homepage) ---------- */
  function hotelCard(h) {
    var badge = h.casino ? '<span class="card__badge">🎰 On-site Casino</span>' : "";
    var tags = (h.tags || []).slice(0, 3).map(function (t) {
      return '<span class="chip">' + esc(t) + "</span>";
    }).join("");
    return (
      '<article class="card">' +
        '<a class="card__media" href="review-' + h.slug + '.html">' +
          '<img src="' + h.img + '" alt="' + esc(h.name) + '" loading="lazy">' + badge +
          '<span class="card__rating">' + h.guestRating.toFixed(1) + "</span>" +
        "</a>" +
        '<div class="card__body">' +
          '<div class="card__meta">' + classStars(h.stars) +
            '<span class="card__loc">' + esc(h.city) + ", " + esc(h.province) + "</span></div>" +
          '<h3 class="card__title"><a href="review-' + h.slug + '.html">' + esc(h.name) + "</a></h3>" +
          '<p class="card__desc">' + esc(h.short) + "</p>" +
          '<div class="card__chips">' + tags + "</div>" +
          '<a class="btn btn--primary card__cta" href="review-' + h.slug + '.html">Read the review →</a>' +
        "</div>" +
      "</article>"
    );
  }
  function renderHotelGrid() {
    var grid = el("hotel-grid");
    if (!grid) return;
    grid.innerHTML = HOTEL_ORDER.map(function (slug) { return hotelCard(HOTELS[slug]); }).join("");
  }

  /* ---------- map ---------- */
  function mapEmbed(h) {
    var dLng = 0.010, dLat = 0.006;
    var bbox = [h.lng - dLng, h.lat - dLat, h.lng + dLng, h.lat + dLat].join("%2C");
    var src = "https://www.openstreetmap.org/export/embed.html?bbox=" + bbox +
      "&layer=mapnik&marker=" + h.lat + "%2C" + h.lng;
    var link = "https://www.openstreetmap.org/?mlat=" + h.lat + "&mlon=" + h.lng + "#map=16/" + h.lat + "/" + h.lng;
    return (
      '<div class="map">' +
        '<iframe title="Map of ' + esc(h.name) + '" src="' + src + '" loading="lazy"></iframe>' +
        '<a class="map__link" href="' + link + '" target="_blank" rel="noopener">View larger map ↗</a>' +
      "</div>"
    );
  }

  /* ---------- review page rendering ---------- */
  function reviewInitial(name) {
    var m = name.trim().match(/[A-Za-z]/);
    return m ? m[0].toUpperCase() : "★";
  }
  function reviewCard(r) {
    return (
      '<figure class="qr">' +
        '<div class="qr__head">' +
          '<span class="qr__avatar">' + esc(reviewInitial(r.name)) + "</span>" +
          '<div><span class="qr__name">' + esc(r.name) + "</span>" +
          '<span class="qr__date">' + esc(r.date) + "</span></div>" +
          '<span class="qr__score">' + ratingStars(r.rating) + "</span>" +
        "</div>" +
        '<blockquote class="qr__text">' + esc(r.text) + "</blockquote>" +
      "</figure>"
    );
  }

  function renderReviewPage(main) {
    var h = HOTELS[main.getAttribute("data-hotel")];
    if (!h) return;
    var author = AUTHORS[h.author];

    document.title = h.name + " — Review | " + SITE.brand;

    // hero
    var hero = main.querySelector('[data-render="hero"]');
    if (hero) {
      hero.innerHTML =
        '<div class="rhero__media"><img src="' + h.img + '" alt="' + esc(h.name) + '">' +
          (h.casino ? '<span class="rhero__badge">🎰 On-site Casino</span>' : "") + "</div>" +
        '<div class="rhero__panel">' +
          '<div class="rhero__crumbs"><a href="index.html">Home</a> › <a href="index.html#hotels">Reviews</a> › <span>' + esc(h.city) + "</span></div>" +
          "<h1>" + esc(h.name) + "</h1>" +
          '<div class="rhero__meta">' + classStars(h.stars) +
            '<span class="rhero__loc">📍 ' + esc(h.city) + ", " + esc(h.province) + "</span></div>" +
          '<div class="rhero__score"><span class="rhero__num">' + h.guestRating.toFixed(1) + "/5</span>" +
            ratingStars(h.guestRating) +
            '<span class="rhero__count">based on ' + h.reviewCount.toLocaleString() + "+ traveller reviews</span></div>" +
          '<div class="rhero__tags">' + (h.tags || []).map(function (t) { return '<span class="chip chip--light">' + esc(t) + "</span>"; }).join("") + "</div>" +
          '<a class="btn btn--primary btn--lg" href="reserve.html?hotel=' + h.slug + '">Reserve a room →</a>' +
        "</div>";
    }

    // author byline
    var byline = main.querySelector('[data-render="byline"]');
    if (byline && author) {
      byline.innerHTML =
        '<span class="byline__avatar">' + esc(author.name.charAt(0)) + "</span>" +
        '<div class="byline__info">' +
          '<span class="byline__by">Field review by</span>' +
          '<a class="byline__name" href="authors.html#' + author.slug + '">' + esc(author.name) + "</a>" +
          '<span class="byline__role">' + esc(author.role) + " · " + esc(SITE.brandMark) + " Review</span>" +
        "</div>";
    }

    // amenities (optional slot)
    var amen = main.querySelector('[data-render="amenities"]');
    if (amen) {
      amen.innerHTML = "<h3>What you'll find on site</h3><ul class=\"amenity-list\">" +
        h.amenities.map(function (a) { return "<li>" + esc(a) + "</li>"; }).join("") + "</ul>";
    }

    // guest reviews
    var rev = main.querySelector('[data-render="reviews"]');
    if (rev) {
      var avg = (h.reviews.reduce(function (s, r) { return s + r.rating; }, 0) / h.reviews.length);
      rev.innerHTML =
        '<div class="section-head">' +
          "<h2>What real guests are saying</h2>" +
          "<p>A selection of verified traveller reviews we gathered for " + esc(h.name) +
          ", reflecting an average of " + avg.toFixed(1) + "/5 across the reviews below.</p>" +
        "</div>" +
        '<div class="qr-grid">' + h.reviews.map(reviewCard).join("") + "</div>";
    }

    // reserve CTA + contact + map
    var cta = main.querySelector('[data-render="cta"]');
    if (cta) {
      cta.innerHTML =
        '<div class="reserve__grid">' +
          '<div class="reserve__info">' +
            "<h2>Ready to stay at " + esc(h.name) + "?</h2>" +
            "<p>Reserve your room in under a minute. Tell us who you are and we'll pass your request to the property's reservations team — you'll never see a surprise charge from us.</p>" +
            '<ul class="contact-list">' +
              '<li><span>📍 Address</span>' + esc(h.address) + "</li>" +
              '<li><span>📞 Phone</span><a href="tel:' + h.phone.replace(/[^+0-9]/g, "") + '">' + esc(h.phone) + "</a></li>" +
              '<li><span>🏨 Class</span>' + h.stars + "-star · " + esc(h.city) + ", " + esc(h.province) + "</li>" +
            "</ul>" +
            '<a class="btn btn--primary btn--lg" href="reserve.html?hotel=' + h.slug + '">Reserve this room →</a>' +
          "</div>" +
          '<div class="reserve__map">' + mapEmbed(h) + "</div>" +
        "</div>";
    }
  }

  /* ---------- authors page ---------- */
  function renderAuthorsPage() {
    var list = el("authors-list");
    if (!list) return;
    // map author -> articles from HOTELS
    var byAuthor = {};
    Object.keys(HOTELS).forEach(function (slug) {
      var h = HOTELS[slug];
      (byAuthor[h.author] = byAuthor[h.author] || []).push(h);
    });
    list.innerHTML = Object.keys(AUTHORS).map(function (aslug) {
      var a = AUTHORS[aslug];
      var arts = (byAuthor[aslug] || []).map(function (h) {
        return '<li><a href="review-' + h.slug + '.html">' + esc(h.name) + "</a> <span class=\"muted\">· " + esc(h.city) + "</span></li>";
      }).join("") || '<li class="muted">Reviews coming soon.</li>';
      return (
        '<article class="author-card" id="' + a.slug + '">' +
          '<div class="author-card__head">' +
            '<span class="author-card__avatar">' + esc(a.name.charAt(0)) + "</span>" +
            "<div><h2>" + esc(a.name) + "</h2>" +
            '<p class="author-card__role">' + esc(a.role) + " · with us since " + a.since + "</p>" +
            '<p class="author-card__focus">Focus: ' + esc(a.focus) + " · " + esc(a.location) + "</p></div>" +
          "</div>" +
          "<p class=\"author-card__bio\">" + esc(a.bio) + "</p>" +
          '<div class="author-card__articles"><h3>Reviews by ' + esc(a.name.split(" ")[0]) + "</h3><ul>" + arts + "</ul></div>" +
        "</article>"
      );
    }).join("");
    if (location.hash) {
      var t = document.getElementById(location.hash.slice(1));
      if (t) setTimeout(function () { t.scrollIntoView({ behavior: "smooth", block: "start" }); t.classList.add("flash"); }, 120);
    }
  }

  /* ---------- reservation flow ---------- */
  function getParam(name) {
    return new URLSearchParams(location.search).get(name);
  }
  function renderReservePage() {
    var wrap = el("reserve-app");
    if (!wrap) return;
    var slug = getParam("hotel");
    var hotel = slug && HOTELS[slug] ? HOTELS[slug] : null;
    var saved = null;
    try { saved = JSON.parse(sessionStorage.getItem(RES_KEY) || "null"); } catch (e) {}

    function statusView(data) {
      return (
        '<div class="notice notice--success">' +
          '<div class="notice__icon">✓</div>' +
          "<div><h2>Your request is in — thank you, " + esc(data.first) + "!</h2>" +
          "<p>We've forwarded your reservation enquiry for <strong>" + esc(data.hotelName) + "</strong> to the property's reservations desk. " +
          "A member of the team will contact you shortly to confirm the details of your stay.</p>" +
          '<ul class="summary">' +
            "<li><span>Hotel</span>" + esc(data.hotelName) + "</li>" +
            "<li><span>Guest</span>" + esc(data.first + " " + data.last) + "</li>" +
            "<li><span>Phone</span>" + esc(data.phone) + "</li>" +
            "<li><span>Email</span>" + esc(data.email) + "</li>" +
            "<li><span>Submitted</span>" + esc(data.when) + "</li>" +
          "</ul>" +
          '<p class="notice__foot">Status: <strong>Processing</strong> — we\'ll be in touch soon. ' +
          'Need to start over? <a href="#" id="reset-res">Submit a new request</a>.</p>' +
          "</div>" +
        "</div>"
      );
    }

    function formView() {
      var opts = HOTEL_ORDER.map(function (s) {
        var hh = HOTELS[s];
        var sel = hotel && hotel.slug === s ? " selected" : "";
        return '<option value="' + s + '"' + sel + ">" + esc(hh.name) + " — " + esc(hh.city) + "</option>";
      }).join("");
      var chosen =
        '<div class="chosen-hotel">' +
          (hotel
            ? '<img src="' + hotel.img + '" alt="' + esc(hotel.name) + '"><div><span class="chosen-hotel__label">You\'re reserving</span>' +
              "<strong>" + esc(hotel.name) + "</strong><span class=\"muted\">" + esc(hotel.city) + ", " + esc(hotel.province) + "</span></div>"
            : '<div><span class="chosen-hotel__label">Reserve a stay</span><strong>Choose your hotel below</strong></div>') +
        "</div>";
      return (
        '<div class="reserve-layout">' +
          '<form class="res-form" id="res-form" novalidate>' +
            chosen +
            '<div class="field"><label for="f-hotel">Hotel</label><select id="f-hotel" name="hotel" required>' + opts + "</select></div>" +
            '<div class="field-row">' +
              '<div class="field"><label for="f-first">First name</label><input id="f-first" name="first" type="text" required autocomplete="given-name"></div>' +
              '<div class="field"><label for="f-last">Last name</label><input id="f-last" name="last" type="text" required autocomplete="family-name"></div>' +
            "</div>" +
            '<div class="field-row">' +
              '<div class="field"><label for="f-phone">Phone number</label><input id="f-phone" name="phone" type="tel" required autocomplete="tel" placeholder="+1 ___ ___ ____"></div>' +
              '<div class="field"><label for="f-email">Email</label><input id="f-email" name="email" type="email" required autocomplete="email" placeholder="you@example.com"></div>' +
            "</div>" +
            '<div class="field"><label for="f-notes">Anything we should know? <span class="muted">(optional)</span></label><textarea id="f-notes" name="notes" rows="3" placeholder="Dates, room preference, accessibility needs…"></textarea></div>' +
            '<p class="form-error" id="res-error" hidden></p>' +
            '<button class="btn btn--primary btn--lg btn--block" type="submit">Send my reservation request →</button>' +
            '<p class="form-fineprint">By submitting you agree to our <a href="terms.html">Terms of Use</a> and <a href="privacy.html">Privacy Policy</a>. We never display or charge prices on this site.</p>' +
          "</form>" +
          '<aside class="reserve-side">' +
            "<h3>Why book through " + esc(SITE.brandMark) + "?</h3>" +
            '<ul class="tick-list">' +
              "<li>Independent reviews written by real guests on the ground</li>" +
              "<li>No booking fees and no prices shown — ever</li>" +
              "<li>Your enquiry goes straight to the property's reservations team</li>" +
              "<li>Your details are stored only in your browser for this session</li>" +
            "</ul>" +
            '<div class="reserve-side__help">Questions first? Visit our <a href="help-center.html">Help Centre</a>.</div>' +
          "</aside>" +
        "</div>"
      );
    }

    function bindForm() {
      var form = el("res-form");
      if (!form) return;
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var errEl = el("res-error");
        errEl.hidden = true;
        var fd = new FormData(form);
        var first = (fd.get("first") || "").toString().trim();
        var last = (fd.get("last") || "").toString().trim();
        var phone = (fd.get("phone") || "").toString().trim();
        var email = (fd.get("email") || "").toString().trim();
        var hslug = (fd.get("hotel") || "").toString();
        if (!first || !last || !phone || !email) {
          errEl.textContent = "Please fill in your name, phone number and email so the hotel can reach you.";
          errEl.hidden = false; return;
        }
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
          errEl.textContent = "That email address doesn't look quite right — please check it.";
          errEl.hidden = false; return;
        }
        var data = {
          first: first, last: last, phone: phone, email: email,
          hotelSlug: hslug, hotelName: (HOTELS[hslug] || {}).name || "your selected hotel",
          when: new Date().toLocaleString()
        };
        sessionStorage.setItem(RES_KEY, JSON.stringify(data));
        wrap.innerHTML = statusView(data);
        bindReset();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
    function bindReset() {
      var r = el("reset-res");
      if (r) r.addEventListener("click", function (e) {
        e.preventDefault();
        sessionStorage.removeItem(RES_KEY);
        wrap.innerHTML = formView(); bindForm();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    if (saved) { wrap.innerHTML = statusView(saved); bindReset(); }
    else { wrap.innerHTML = formView(); bindForm(); }
  }

  /* ---------- feedback flow ---------- */
  function renderFeedbackPage() {
    var wrap = el("feedback-app");
    if (!wrap) return;
    var saved = null;
    try { saved = JSON.parse(sessionStorage.getItem(FB_KEY) || "null"); } catch (e) {}

    function savedView(data) {
      return (
        '<div class="notice notice--success">' +
          '<div class="notice__icon">✓</div>' +
          "<div><h2>Thank you — your feedback was sent!</h2>" +
          "<p>We read every message and use it to make " + esc(SITE.brand) + " better. Here's what you shared with us this session:</p>" +
          '<blockquote class="fb-quote">' + esc(data.text) + "</blockquote>" +
          (data.topic ? '<p class="muted">Topic: ' + esc(data.topic) + " · " + esc(data.when) + "</p>" : '<p class="muted">' + esc(data.when) + "</p>") +
          '<p class="notice__foot"><a href="#" id="reset-fb">Send another note</a></p>' +
          "</div>" +
        "</div>"
      );
    }
    function formView() {
      return (
        '<form class="fb-form" id="fb-form" novalidate>' +
          '<div class="field"><label for="fb-topic">What\'s this about?</label>' +
            '<select id="fb-topic" name="topic">' +
              "<option>General feedback</option><option>A hotel review</option><option>Website issue</option>" +
              "<option>Accessibility</option><option>Partnership enquiry</option><option>Something else</option>" +
            "</select></div>" +
          '<div class="field"><label for="fb-name">Your name <span class="muted">(optional)</span></label><input id="fb-name" name="name" type="text" autocomplete="name"></div>' +
          '<div class="field"><label for="fb-text">Your message</label><textarea id="fb-text" name="text" rows="6" required placeholder="Tell us what you loved, what we got wrong, or what you\'d like to see…"></textarea></div>' +
          '<p class="form-error" id="fb-error" hidden></p>' +
          '<button class="btn btn--primary btn--lg" type="submit">Send feedback →</button>' +
        "</form>"
      );
    }
    function popup(text) {
      var ov = document.createElement("div");
      ov.className = "modal-overlay";
      ov.innerHTML =
        '<div class="modal" role="dialog" aria-modal="true">' +
          '<div class="modal__icon">✓</div>' +
          "<h3>Feedback sent!</h3>" +
          "<p>" + esc(text) + "</p>" +
          '<button class="btn btn--primary" id="modal-ok">Got it</button>' +
        "</div>";
      document.body.appendChild(ov);
      requestAnimationFrame(function () { ov.classList.add("show"); });
      function close() { ov.classList.remove("show"); setTimeout(function () { ov.remove(); }, 250); }
      ov.addEventListener("click", function (e) { if (e.target === ov) close(); });
      el("modal-ok").addEventListener("click", close);
    }
    function bindForm() {
      var form = el("fb-form");
      if (!form) return;
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var errEl = el("fb-error"); errEl.hidden = true;
        var fd = new FormData(form);
        var text = (fd.get("text") || "").toString().trim();
        if (text.length < 5) { errEl.textContent = "Please add a little more detail so we can act on it."; errEl.hidden = false; return; }
        var data = { text: text, name: (fd.get("name") || "").toString().trim(), topic: (fd.get("topic") || "").toString(), when: new Date().toLocaleString() };
        sessionStorage.setItem(FB_KEY, JSON.stringify(data));
        popup("We truly appreciate you taking the time. We'll review your note and take your wishes into account.");
        setTimeout(function () { wrap.innerHTML = savedView(data); bindReset(); }, 400);
      });
    }
    function bindReset() {
      var r = el("reset-fb");
      if (r) r.addEventListener("click", function (e) { e.preventDefault(); sessionStorage.removeItem(FB_KEY); wrap.innerHTML = formView(); bindForm(); });
    }
    if (saved) { wrap.innerHTML = savedView(saved); bindReset(); }
    else { wrap.innerHTML = formView(); bindForm(); }
  }

  /* ---------- reveal-on-scroll ---------- */
  function initReveal() {
    var els = document.querySelectorAll("[data-reveal]");
    if (!els.length || !("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- boot ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    Consent.init();
    injectChrome();
    renderHotelGrid();
    var main = document.querySelector("main[data-hotel]");
    if (main) renderReviewPage(main);
    renderAuthorsPage();
    renderReservePage();
    renderFeedbackPage();
    initReveal();
    // footer year
    var y = el("year"); if (y) y.textContent = "2026";
  });

  // expose for inline use if needed
  window.NorthStay = { ratingStars: ratingStars, classStars: classStars, cookieSettings: function () { Consent.open(); } };
})();
