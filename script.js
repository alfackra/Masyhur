/* =========================================================
   MASYHUR MANAGEMENT GROUP
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     MOBILE MENU
  ======================================================= */

  const menuButton = document.querySelector(".menu-button");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
    });

    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
      });
    });
  }


  /* =======================================================
     LA PRICE CALCULATOR
  ======================================================= */

  let pax = 35;

  const paxDisplay = document.querySelector("#paxCount");
  const priceDisplay = document.querySelector("#pricePerPax");
  const totalDisplay = document.querySelector("#totalPrice");

  const minusButton = document.querySelector("#minusPax");
  const plusButton = document.querySelector("#plusPax");

  const whatsappButton =
    document.querySelector("#calculatorWhatsapp");


  /* -------------------------------------------------------
     PRICE TABLE
  ------------------------------------------------------- */

  function getPricePerPax(totalPax) {

    if (totalPax >= 46) return 60;

    if (totalPax >= 41) return 64;

    if (totalPax >= 36) return 68;

    if (totalPax >= 31) return 73;

    if (totalPax >= 26) return 80;

    if (totalPax >= 21) return 90;

    if (totalPax >= 16) return 107;

    if (totalPax >= 11) return 140;

    if (totalPax >= 5) return 195;

    return 290;
  }


  /* -------------------------------------------------------
     FORMAT USD
  ------------------------------------------------------- */

  function formatUSD(number) {
    return "$" + number.toLocaleString("en-US");
  }


  /* -------------------------------------------------------
     UPDATE CALCULATOR
  ------------------------------------------------------- */

  function updateCalculator() {

    const pricePerPax = getPricePerPax(pax);

    const total = pax * pricePerPax;

    if (paxDisplay) {
      paxDisplay.textContent = pax;
    }

    if (priceDisplay) {
      priceDisplay.textContent = "$" + pricePerPax;
    }

    if (totalDisplay) {
      totalDisplay.textContent = formatUSD(total);
    }


    /* -----------------------------------------------------
       WHATSAPP AUTO MESSAGE
    ----------------------------------------------------- */

    if (whatsappButton) {

      const message =
`Assalamu'alaikum Masyhur Management.

Saya ingin konsultasi Land Arrangement Saudi Arabia.

Jumlah jamaah: ${pax} pax
Estimasi harga: $${pricePerPax} / pax
Estimasi total: ${formatUSD(total)}

Mohon informasi lebih lanjut mengenai layanan dan ketersediaan.`;


      whatsappButton.href =
        "https://wa.me/6281805234529?text=" +
        encodeURIComponent(message);
    }
  }


  /* -------------------------------------------------------
     PLUS BUTTON
  ------------------------------------------------------- */

  if (plusButton) {

    plusButton.addEventListener("click", () => {

      if (pax < 50) {

        pax++;

        updateCalculator();

      }

    });

  }


  /* -------------------------------------------------------
     MINUS BUTTON
  ------------------------------------------------------- */

  if (minusButton) {

    minusButton.addEventListener("click", () => {

      if (pax > 1) {

        pax--;

        updateCalculator();

      }

    });

  }


  /* INITIAL CALCULATION */

  updateCalculator();


  /* =======================================================
     NAVBAR SCROLL EFFECT
  ======================================================= */

  const header = document.querySelector(".header");

  window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 40) {

      header.classList.add("header-scrolled");

    } else {

      header.classList.remove("header-scrolled");

    }

  });


  /* =======================================================
     SMOOTH INTERNAL LINKS
  ======================================================= */

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(event) {

      const targetID = this.getAttribute("href");

      if (targetID === "#") return;

      const target = document.querySelector(targetID);

      if (target) {

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    });

  });

});
