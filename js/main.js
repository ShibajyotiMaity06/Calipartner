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

  // Location-Based Pricing Data
  const pricingData = {
    INR: {
      symbol: "₹",
      regionLabel: "Pricing for India (₹ INR)",
      switchLabel: "(Switch to USD)",
      targetCurrency: "USD",
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
      regionLabel: "Pricing for International ($ USD)",
      switchLabel: "(Switch to INR)",
      targetCurrency: "INR",
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

  // Detect user location (Indian users see INR, others see USD)
  function detectInitialCurrency() {
    // 1. Check if user previously made an explicit choice
    const stored = localStorage.getItem("cp_user_currency");
    if (stored === "INR" || stored === "USD") return stored;

    // 2. High-accuracy client timezone / language detection
    try {
      const tz = (Intl.DateTimeFormat().resolvedOptions().timeZone || "").toLowerCase();
      const offset = new Date().getTimezoneOffset(); // -330 for IST
      const lang = (navigator.languages && navigator.languages.join(",")) || navigator.language || "";

      if (tz.includes("kolkata") || tz.includes("calcutta") || offset === -330 || lang.includes("-IN")) {
        return "INR";
      }
    } catch (e) {}

    return "USD";
  }

  let currentCurrency = detectInitialCurrency();
  let currentBilling = "annual"; // Default to annual best value

  function updatePricingDisplay() {
    const data = pricingData[currentCurrency] || pricingData.INR;

    // Update location indicator badge
    document.querySelectorAll(".js-loc-text").forEach((el) => {
      el.textContent = data.regionLabel;
    });
    document.querySelectorAll(".js-loc-switch").forEach((btn) => {
      btn.textContent = data.switchLabel;
      btn.setAttribute("data-target", data.targetCurrency);
    });

    // Update billing toggle buttons
    document.querySelectorAll(".js-bill-btn").forEach((b) => {
      b.classList.toggle("active", b.getAttribute("data-billing") === currentBilling);
    });

    // Update Free card
    const freePrice = document.getElementById("price-free");
    if (freePrice) freePrice.textContent = data.free.price;

    // Update Plus card
    const plusPrice = document.getElementById("price-plus");
    const plusPeriod = document.getElementById("period-plus");
    const plusEquiv = document.getElementById("equiv-plus");
    if (plusPrice && plusPeriod && plusEquiv) {
      const p = data.plus[currentBilling];
      plusPrice.textContent = p.price;
      plusPeriod.textContent = p.period;
      plusEquiv.textContent = p.equiv;
    }

    // Update Pro card
    const proPrice = document.getElementById("price-pro");
    const proPeriod = document.getElementById("period-pro");
    const proEquiv = document.getElementById("equiv-pro");
    if (proPrice && proPeriod && proEquiv) {
      const p = data.pro[currentBilling];
      proPrice.textContent = p.price;
      proPeriod.textContent = p.period;
      proEquiv.textContent = p.equiv;
    }
  }

  // Handle location currency toggle link
  document.querySelectorAll(".js-loc-switch").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentCurrency = currentCurrency === "INR" ? "USD" : "INR";
      try { localStorage.setItem("cp_user_currency", currentCurrency); } catch (e) {}
      updatePricingDisplay();
    });
  });

  // Handle billing cycle buttons (Monthly vs Annual)
  document.querySelectorAll(".js-bill-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentBilling = btn.getAttribute("data-billing") || "annual";
      updatePricingDisplay();
    });
  });

  // Initial render
  updatePricingDisplay();

  // Async non-blocking geo verification (if no explicit manual preference stored)
  if (!localStorage.getItem("cp_user_currency")) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1800);
    fetch("https://api.country.is", { signal: controller.signal })
      .then((r) => r.json())
      .then((geo) => {
        clearTimeout(timeout);
        if (geo && geo.country) {
          const verifiedCurrency = geo.country === "IN" ? "INR" : "USD";
          if (verifiedCurrency !== currentCurrency) {
            currentCurrency = verifiedCurrency;
            updatePricingDisplay();
          }
        }
      })
      .catch(() => {});
  }
});
