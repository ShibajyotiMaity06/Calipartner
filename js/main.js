// CaliPartner Interactive Script & Location-Based Pricing
document.addEventListener("DOMContentLoaded", () => {
  // Mobile Nav Toggle
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  // Coming Soon Modal Elements
  const modal = document.getElementById("coming-soon-modal");
  const modalPlatform = document.getElementById("modal-platform-name");
  const modalClose = document.getElementById("modal-close-btn");
  const modalDismiss = document.getElementById("modal-dismiss-btn");

  function openComingSoon(platform) {
    if (!modal) return;
    if (modalPlatform) {
      modalPlatform.textContent = platform || "Mobile";
    }
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeComingSoon() {
    if (!modal) return;
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
  }

  if (modalClose) modalClose.addEventListener("click", closeComingSoon);
  if (modalDismiss) modalDismiss.addEventListener("click", closeComingSoon);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeComingSoon();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        closeComingSoon();
      }
    });
  }

  // Attach click to all Android / iOS store buttons
  const storeBtns = document.querySelectorAll(".js-store-btn");
  storeBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const platform = btn.getAttribute("data-platform") || (btn.id.includes("play") ? "Android" : "iOS");
      openComingSoon(platform);

      // Flash feedback on button badge
      const badge = btn.querySelector(".store-badge");
      if (badge) {
        badge.textContent = "Coming Soon!";
        badge.style.transform = "scale(1.1)";
        setTimeout(() => { badge.style.transform = "scale(1)"; }, 300);
      }
    });
  });

  // ---------------------------------------------------------------------------
  // Automatic Location-Based Pricing (INR for India, USD for International)
  // ---------------------------------------------------------------------------
  // 1. Purge any legacy manual toggle preference or test params
  try {
    sessionStorage.removeItem("cp_geo_country");
    localStorage.removeItem("cp_user_currency");
    if (window.location.search && (window.location.search.includes("country=") || window.location.search.includes("currency="))) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  } catch (e) {}

  // 2. Remove any cached badge remnants if loaded from stale cache
  document.querySelectorAll(".location-badge, [id^='loc-badge'], .loc-switch-link").forEach((el) => el.remove());

  const pricingData = {
    INR: {
      symbol: "₹",
      free: { price: "₹0", period: "forever", equiv: "Free forever for solo & pairs" },
      plus: {
        monthly: { price: "₹249", period: "/ month", equiv: "Billed monthly • 7-day free trial" },
        annual: { price: "₹1,499", period: "/ year", equiv: "₹125 / month • ~50% savings (₹1,489 saved)" }
      },
      pro: {
        monthly: { price: "₹499", period: "/ month", equiv: "Billed monthly • Immediate billing" },
        annual: { price: "₹2,499", period: "/ year", equiv: "₹192 / month • ~58% savings (₹3,209 saved)" }
      }
    },
    USD: {
      symbol: "$",
      free: { price: "$0", period: "forever", equiv: "Free forever for solo & pairs" },
      plus: {
        monthly: { price: "$4.99", period: "/ month", equiv: "Billed monthly • 7-day free trial" },
        annual: { price: "$29.99", period: "/ year", equiv: "$2.33 / month • ~53% savings ($31.89 saved)" }
      },
      pro: {
        monthly: { price: "$9.99", period: "/ month", equiv: "Billed monthly • Immediate billing" },
        annual: { price: "$49.00", period: "/ year", equiv: "$3.92 / month • ~61% savings ($72.88 saved)" }
      }
    }
  };

  // Indian device check (Kolkata/Calcutta timezone, UTC+5:30 offset -330)
  function isIndianDevice() {
    try {
      const tz = (Intl.DateTimeFormat().resolvedOptions().timeZone || "").toLowerCase();
      const offset = new Date().getTimezoneOffset(); // -330 for IST
      const lang = (navigator.languages && navigator.languages.join(",")) || navigator.language || "";
      if (
        tz.includes("kolkata") ||
        tz.includes("calcutta") ||
        tz.includes("asia/kolkata") ||
        tz.includes("asia/calcutta") ||
        offset === -330 ||
        /-in\b/i.test(lang) ||
        /^(hi|ta|te|bn|gu|mr|kn|ml|pa)\b/i.test(lang)
      ) {
        return true;
      }
    } catch (e) {}
    return false;
  }

  // India is the default for CaliPartner
  let currentCurrency = "INR";
  let currentBilling = "annual"; // Default to annual best value

  function updatePricingDisplay() {
    const data = pricingData[currentCurrency] || pricingData.INR;

    // Update billing toggle buttons (Monthly vs Annual)
    document.querySelectorAll(".js-bill-btn").forEach((b) => {
      b.classList.toggle("active", b.getAttribute("data-billing") === currentBilling);
    });

    // Update Free card prices
    document.querySelectorAll("#price-free, .js-price-free").forEach((el) => {
      el.textContent = data.free.price;
    });

    // Update Plus card prices
    document.querySelectorAll("#price-plus, .js-price-plus").forEach((el) => {
      el.textContent = data.plus[currentBilling].price;
    });
    document.querySelectorAll("#period-plus, .js-period-plus").forEach((el) => {
      el.textContent = data.plus[currentBilling].period;
    });
    document.querySelectorAll("#equiv-plus, .js-equiv-plus").forEach((el) => {
      el.textContent = data.plus[currentBilling].equiv;
    });

    // Update Pro card prices
    document.querySelectorAll("#price-pro, .js-price-pro").forEach((el) => {
      el.textContent = data.pro[currentBilling].price;
    });
    document.querySelectorAll("#period-pro, .js-period-pro").forEach((el) => {
      el.textContent = data.pro[currentBilling].period;
    });
    document.querySelectorAll("#equiv-pro, .js-equiv-pro").forEach((el) => {
      el.textContent = data.pro[currentBilling].equiv;
    });
  }

  // Handle billing cycle toggle (Monthly vs Annual)
  document.querySelectorAll(".js-bill-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentBilling = btn.getAttribute("data-billing") || "annual";
      updatePricingDisplay();
    });
  });

  // Ensure all pricing tier action buttons reliably navigate to app.calipartner.site
  document.querySelectorAll(".plan-card a, .compare a.btn, a[href*='app.calipartner.site']").forEach((btn) => {
    btn.setAttribute("href", "https://app.calipartner.site");
    btn.setAttribute("target", "_blank");
    btn.setAttribute("rel", "noopener noreferrer");
  });

  // Initial paint (always renders immediately as INR for zero flicker)
  updatePricingDisplay();

  // If the user's device is in India, they stay on INR 100% of the time.
  // Only query external IP for international users whose device is NOT in India:
  if (!isIndianDevice()) {
    const fetchWithTimeout = async (url, timeoutMs = 2500) => {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(id);
        if (!res.ok) throw new Error("HTTP " + res.status);
        return await res.json();
      } catch (err) {
        clearTimeout(id);
        throw err;
      }
    };

    const detectForeign = async () => {
      try {
        const d = await fetchWithTimeout("https://api.country.is");
        if (d && d.country) return d.country.toUpperCase();
      } catch (e) {}
      try {
        const d = await fetchWithTimeout("https://ipwho.is/");
        if (d && d.success && d.country_code) return d.country_code.toUpperCase();
      } catch (e) {}
      try {
        const d = await fetchWithTimeout("https://freeipapi.com/api/json");
        if (d && d.countryCode) return d.countryCode.toUpperCase();
      } catch (e) {}
      return null;
    };

    detectForeign().then((country) => {
      // Only switch to USD if explicitly confirmed NOT in India
      if (country && country !== "IN") {
        currentCurrency = "USD";
        updatePricingDisplay();
      }
    });
  }
});
