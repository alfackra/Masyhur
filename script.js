/* =========================================================
   MASYHUR MANAGEMENT GROUP
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     CONFIG
     ========================================================= */

  const CONFIG = {
    whatsapp: "6281805234529",

    // Tarif LA estimator.
    // Ubah angka ini sesuai rate resmi Masyhur.
    laRates: [
      { min: 1,  max: 9,  price: 85 },
      { min: 10, max: 19, price: 78 },
      { min: 20, max: 29, price: 72 },
      { min: 30, max: 39, price: 68 },
      { min: 40, max: 49, price: 64 },
      { min: 50, max: 9999, price: 60 }
    ],

    defaultJamaah: 45,
    minJamaah: 1,
    maxJamaah: 500
  };


  /* =========================================================
     HELPER FUNCTIONS
     ========================================================= */

  function formatUSD(value) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(value);
  }


  function getRate(jamaah) {
    const rate = CONFIG.laRates.find(
      item => jamaah >= item.min && jamaah <= item.max
    );

    return rate ? rate.price : 0;
  }


  function openWhatsApp(message) {
    const url =
      `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }


  /* =========================================================
     MOBILE MENU
     ========================================================= */

  const menuButton = document.getElementById("menuButton");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {

      mobileMenu.classList.toggle("active");

      const isOpen = mobileMenu.classList.contains("active");

      menuButton.innerHTML = isOpen ? "✕" : "☰";

      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Tutup menu" : "Buka menu"
      );

    });


    mobileMenu.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");

        menuButton.innerHTML = "☰";

        menuButton.setAttribute(
          "aria-label",
          "Buka menu"
        );

      });

    });


    document.addEventListener("click", event => {

      const clickedInsideMenu =
        mobileMenu.contains(event.target);

      const clickedButton =
        menuButton.contains(event.target);

      if (
        !clickedInsideMenu &&
        !clickedButton &&
        mobileMenu.classList.contains("active")
      ) {

        mobileMenu.classList.remove("active");

        menuButton.innerHTML = "☰";

      }

    });

  }


  /* =========================================================
     SMOOTH SCROLL
     ========================================================= */

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (event) {

      const href = this.getAttribute("href");

      if (!href || href === "#") return;

      const target = document.querySelector(href);

      if (!target) return;

      event.preventDefault();

      const header =
        document.querySelector(".header");

      const headerHeight =
        header ? header.offsetHeight : 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight -
        15;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

    });

  });


  /* =========================================================
     HEADER EFFECT ON SCROLL
     ========================================================= */

  const header = document.querySelector(".header");

  function updateHeader() {

    if (!header) return;

    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  }

  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  /* =========================================================
     LA CALCULATOR
     ========================================================= */

  const minusButton =
    document.getElementById("minusJamaah");

  const plusButton =
    document.getElementById("plusJamaah");

  const jamaahValue =
    document.getElementById("jamaahValue");

  const pricePerPerson =
    document.getElementById("pricePerPerson");

  const totalPrice =
    document.getElementById("totalPrice");

  const quotationButton =
    document.querySelector(".calculator-button");


  let jamaah = CONFIG.defaultJamaah;


  // Kalau HTML sudah punya angka, gunakan angka tersebut.
  if (jamaahValue) {

    const initialValue =
      parseInt(jamaahValue.textContent.trim(), 10);

    if (!Number.isNaN(initialValue)) {
      jamaah = initialValue;
    }

  }


  function updateCalculator() {

    jamaah = Math.max(
      CONFIG.minJamaah,
      Math.min(CONFIG.maxJamaah, jamaah)
    );

    const price = getRate(jamaah);

    const total = jamaah * price;


    if (jamaahValue) {
      jamaahValue.textContent = jamaah;
    }


    if (pricePerPerson) {
      pricePerPerson.textContent =
        formatUSD(price);
    }


    if (totalPrice) {
      totalPrice.textContent =
        formatUSD(total);
    }


    if (minusButton) {
      minusButton.disabled =
        jamaah <= CONFIG.minJamaah;
    }


    if (plusButton) {
      plusButton.disabled =
        jamaah >= CONFIG.maxJamaah;
    }


    // Update WhatsApp quotation otomatis.
    if (quotationButton) {

      const message =
`Assalamu'alaikum Masyhur Management Group.

Saya ingin meminta quotation Land Arrangement.

Jumlah jamaah: ${jamaah} pax
Estimasi rate: ${formatUSD(price)} / pax
Estimasi total: ${formatUSD(total)}

Mohon informasi rate dan fasilitas terbaru.
Terima kasih.`;

      quotationButton.href =
        `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;

    }

  }


  if (minusButton) {

    minusButton.addEventListener("click", () => {

      if (jamaah > CONFIG.minJamaah) {

        jamaah--;

        updateCalculator();

      }

    });

  }


  if (plusButton) {

    plusButton.addEventListener("click", () => {

      if (jamaah < CONFIG.maxJamaah) {

        jamaah++;

        updateCalculator();

      }

    });

  }


  // Klik tahan = angka bergerak lebih cepat.
  function addHoldAction(button, direction) {

    if (!button) return;

    let interval = null;
    let timeout = null;


    const stop = () => {

      clearTimeout(timeout);
      clearInterval(interval);

      timeout = null;
      interval = null;

    };


    button.addEventListener("mousedown", () => {

      timeout = setTimeout(() => {

        interval = setInterval(() => {

          jamaah += direction;

          jamaah = Math.max(
            CONFIG.minJamaah,
            Math.min(CONFIG.maxJamaah, jamaah)
          );

          updateCalculator();

        }, 100);

      }, 500);

    });


    button.addEventListener("mouseup", stop);
    button.addEventListener("mouseleave", stop);
    button.addEventListener("touchend", stop);

  }


  addHoldAction(minusButton, -1);
  addHoldAction(plusButton, 1);


  updateCalculator();


  /* =========================================================
     PACKAGE FILTER
     ========================================================= */

  const packageButtons =
    document.querySelectorAll(".package-filter-btn");

  const packageCards =
    document.querySelectorAll(
      ".package-card[data-category]"
    );


  packageButtons.forEach(button => {

    button.addEventListener("click", () => {

      const filter =
        button.dataset.filter || "all";


      // Active button
      packageButtons.forEach(btn => {
        btn.classList.remove("active");
      });

      button.classList.add("active");


      // Filter card
      packageCards.forEach(card => {

        const category =
          card.dataset.category;

        const shouldShow =
          filter === "all" ||
          category === filter;


        if (shouldShow) {

          card.style.display = "";

          requestAnimationFrame(() => {
            card.classList.add("package-visible");
          });

        } else {

          card.classList.remove(
            "package-visible"
          );

          card.style.display = "none";

        }

      });

    });

  });


  /* =========================================================
     PACKAGE WHATSAPP
     ========================================================= */

  document
    .querySelectorAll(".package-card")
    .forEach(card => {

      const button =
        card.querySelector(".package-button");

      if (!button) return;


      button.addEventListener("click", event => {

        // Biarkan link WhatsApp bawaan bekerja jika tersedia.
        const href =
          button.getAttribute("href");

        if (
          href &&
          href.includes("wa.me")
        ) {
          return;
        }


        event.preventDefault();


        const packageName =
          card.querySelector("h3")
            ?.textContent
            ?.trim() ||
          "Land Arrangement";


        const message =
`Assalamu'alaikum Masyhur Management Group.

Saya ingin mendapatkan informasi B2B mengenai paket ${packageName}.

Mohon dikirimkan rate, fasilitas, hotel, transportasi dan ketentuan terbaru.

Terima kasih.`;


        openWhatsApp(message);

      });

    });


  /* =========================================================
     SERVICE CARD INTERACTION
     ========================================================= */

  document
    .querySelectorAll(".service-card")
    .forEach(card => {

      card.addEventListener(
        "mouseenter",
        () => {
          card.classList.add("is-hovered");
        }
      );

      card.addEventListener(
        "mouseleave",
        () => {
          card.classList.remove("is-hovered");
        }
      );

    });


  /* =========================================================
     SCROLL REVEAL
     ========================================================= */

  const revealElements =
    document.querySelectorAll(
      [
        ".stat-card",
        ".service-card",
        ".package-card",
        ".hotel-card",
        ".transport-card"
      ].join(",")
    );


  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "revealed"
              );

              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.1,
          rootMargin:
            "0px 0px -40px 0px"
        }
      );


    revealElements.forEach(element => {
      observer.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("revealed");
    });

  }


  /* =========================================================
     ACTIVE NAVIGATION
     ========================================================= */

  const sections =
    document.querySelectorAll(
      "section[id]"
    );

  const navigationLinks =
    document.querySelectorAll(
      '.desktop-nav a[href^="#"]'
    );


  function updateActiveNavigation() {

    let currentSection = "";


    sections.forEach(section => {

      const sectionTop =
        section.offsetTop - 180;

      if (
        window.scrollY >= sectionTop
      ) {

        currentSection =
          section.getAttribute("id");

      }

    });


    navigationLinks.forEach(link => {

      link.classList.remove("active");

      const href =
        link.getAttribute("href");

      if (
        href === `#${currentSection}`
      ) {

        link.classList.add("active");

      }

    });

  }


  window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
  );


  updateActiveNavigation();


  /* =========================================================
     EXTERNAL LINKS SECURITY
     ========================================================= */

  document
    .querySelectorAll('a[target="_blank"]')
    .forEach(link => {

      const currentRel =
        link.getAttribute("rel") || "";

      if (
        !currentRel.includes("noopener")
      ) {

        link.setAttribute(
          "rel",
          `${currentRel} noopener noreferrer`.trim()
        );

      }

    });


  /* =========================================================
     READY
     ========================================================= */

  console.log(
    "Masyhur Management website ready ✓"
  );

});
