/* =========================================================
   MASYHUR MANAGEMENT GROUP
   MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     1. MOBILE MENU
     ========================================================= */

  const menuButton = document.querySelector(".menu-button");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
      });
    });

  }


  /* =========================================================
     2. SMOOTH SCROLL
     ========================================================= */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", function (event) {

      const targetId = this.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    });

  });


  /* =========================================================
     3. LA PRICE CALCULATOR
     ========================================================= */

  let pax = 35;

  const MIN_PAX = 10;
  const MAX_PAX = 200;

  const paxDisplay =
    document.querySelector("#paxCount");

  const priceDisplay =
    document.querySelector("#pricePerPax");

  const totalDisplay =
    document.querySelector("#totalPrice");

  const minusButton =
    document.querySelector("#minusPax");

  const plusButton =
    document.querySelector("#plusPax");

  const whatsappButton =
    document.querySelector("#calculatorWhatsapp");


  /* ---------------------------------------------------------
     FORMAT NUMBER
     --------------------------------------------------------- */

  function formatNumber(number) {

    return new Intl.NumberFormat("en-US").format(number);

  }


  /* ---------------------------------------------------------
     PRICE PER PAX

     Semakin besar grup, estimasi harga per pax lebih rendah.
     Angka ini bisa kita ubah nanti.
     --------------------------------------------------------- */

  function calculatePricePerPax(numberOfPax) {

    if (numberOfPax >= 100) {
      return 52;
    }

    if (numberOfPax >= 80) {
      return 55;
    }

    if (numberOfPax >= 60) {
      return 58;
    }

    if (numberOfPax >= 45) {
      return 61;
    }

    if (numberOfPax >= 35) {
      return 64;
    }

    if (numberOfPax >= 25) {
      return 68;
    }

    return 72;

  }


  /* ---------------------------------------------------------
     UPDATE CALCULATOR
     --------------------------------------------------------- */

  function updateCalculator() {

    const pricePerPax = calculatePricePerPax(pax);

    const totalPrice = pax * pricePerPax;


    if (paxDisplay) {

      paxDisplay.textContent = pax;

    }


    if (priceDisplay) {

      priceDisplay.textContent =
        "$" + formatNumber(pricePerPax);

    }


    if (totalDisplay) {

      totalDisplay.textContent =
        "$" + formatNumber(totalPrice);

    }


    /* Update WhatsApp quotation */

    if (whatsappButton) {

      const message =
        `Assalamualaikum Masyhur Management,

Saya ingin meminta quotation Land Arrangement.

Jumlah Jamaah: ${pax} pax
Estimasi Harga: $${pricePerPax}/pax
Estimasi Total: $${formatNumber(totalPrice)}

Mohon informasi paket dan ketersediaannya.`;

      whatsappButton.href =
        "https://wa.me/6281805234529?text=" +
        encodeURIComponent(message);

    }


    /* Disable button kalau mencapai batas */

    if (minusButton) {

      minusButton.disabled =
        pax <= MIN_PAX;

    }


    if (plusButton) {

      plusButton.disabled =
        pax >= MAX_PAX;

    }

  }


  /* ---------------------------------------------------------
     MINUS BUTTON
     --------------------------------------------------------- */

  if (minusButton) {

    minusButton.addEventListener("click", () => {

      if (pax > MIN_PAX) {

        pax -= 5;

        updateCalculator();

      }

    });

  }


  /* ---------------------------------------------------------
     PLUS BUTTON
     --------------------------------------------------------- */

  if (plusButton) {

    plusButton.addEventListener("click", () => {

      if (pax < MAX_PAX) {

        pax += 5;

        updateCalculator();

      }

    });

  }


  /* Jalankan calculator pertama kali */

  updateCalculator();



  /* =========================================================
     4. B2B PACKAGE FILTER
     ========================================================= */

  const filterButtons =
    document.querySelectorAll(
      ".filter-btn, .package-filter, [data-filter]"
    );

  const packageCards =
    document.querySelectorAll(
      ".package-card, .b2b-card"
    );


  if (
    filterButtons.length > 0 &&
    packageCards.length > 0
  ) {

    filterButtons.forEach((button) => {

      button.addEventListener("click", () => {

        const filter =
          button.dataset.filter || "all";


        /* Active button */

        filterButtons.forEach((btn) => {

          btn.classList.remove("active");

        });

        button.classList.add("active");


        /* Filter cards */

        packageCards.forEach((card) => {

          const category =
            card.dataset.category ||
            card.dataset.type ||
            "all";


          if (
            filter === "all" ||
            category === filter
          ) {

            card.style.display = "";

          }

          else {

            card.style.display = "none";

          }

        });

      });

    });

  }



  /* =========================================================
     5. NAVBAR EFFECT ON SCROLL
     ========================================================= */

  const header =
    document.querySelector("header");

  function updateHeader() {

    if (!header) return;


    if (window.scrollY > 30) {

      header.classList.add("scrolled");

    }

    else {

      header.classList.remove("scrolled");

    }

  }


  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );

  updateHeader();



  /* =========================================================
     6. PACKAGE WHATSAPP BUTTON
     ========================================================= */

  document
    .querySelectorAll("[data-package]")
    .forEach((button) => {

      button.addEventListener("click", function () {

        const packageName =
          this.dataset.package;

        if (!packageName) return;


        const message =
          `Assalamualaikum Masyhur Management,

Saya tertarik dengan paket ${packageName}.

Mohon informasi harga, hotel, transportasi dan fasilitas yang tersedia.`;


        const whatsappURL =
          "https://wa.me/6281805234529?text=" +
          encodeURIComponent(message);


        window.open(
          whatsappURL,
          "_blank",
          "noopener,noreferrer"
        );

      });

    });



  /* =========================================================
     7. EXTERNAL LINKS SECURITY
     ========================================================= */

  document
    .querySelectorAll('a[target="_blank"]')
    .forEach((link) => {

      link.setAttribute(
        "rel",
        "noopener noreferrer"
      );

    });



  /* =========================================================
     WEBSITE READY
     ========================================================= */

  console.log(
    "Masyhur Management website ready."
  );

});
