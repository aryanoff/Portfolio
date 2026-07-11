/* ═══════════════════════════════════════════
   main.js — Portfolio Enhancements
   ═══════════════════════════════════════════ */

(function () {
  "use strict";

  /* ── 1. Dynamic Copyright Year ── */
  const yearEl = document.getElementById("copyright-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── 2. Scroll-triggered fade-in-up ── */
  const faders = document.querySelectorAll(".fade-in-up");

  if (faders.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    faders.forEach((el) => observer.observe(el));
  } else {
    // Fallback: just show everything
    faders.forEach((el) => el.classList.add("is-visible"));
  }

  /* ── 3. Mobile menu auto-close ── */
  const toggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelectorAll(".nav-links a");

  if (toggle) {
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        toggle.checked = false;
      });
    });
  }

  /* ── 4. Contact form handler (Formspree-ready) ── */
  const form = document.getElementById("contact-form");
  const formFeedback = document.getElementById("form-feedback");

  if (form) {
    form.addEventListener("submit", function (e) {
      const action = form.getAttribute("action");

      // If no real Formspree endpoint is configured, prevent submission and show message
      if (!action || action === "#") {
        e.preventDefault();
        if (formFeedback) {
          formFeedback.textContent =
            "Form endpoint not configured yet. Please email directly for now.";
          formFeedback.className = "form-feedback form-feedback--info";
          formFeedback.hidden = false;
        }
        return;
      }

      // If Formspree is configured, let it submit naturally (no JS fetch needed)
      // Formspree handles the redirect. For AJAX:
      e.preventDefault();
      const data = new FormData(form);

      if (formFeedback) {
        formFeedback.textContent = "Sending…";
        formFeedback.className = "form-feedback form-feedback--info";
        formFeedback.hidden = false;
      }

      fetch(action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      })
        .then((res) => {
          if (res.ok) {
            form.reset();
            if (formFeedback) {
              formFeedback.textContent =
                "Message sent successfully! I'll get back to you soon.";
              formFeedback.className = "form-feedback form-feedback--success";
            }
          } else {
            throw new Error("Submission failed");
          }
        })
        .catch(() => {
          if (formFeedback) {
            formFeedback.textContent =
              "Something went wrong. Please try emailing directly.";
            formFeedback.className = "form-feedback form-feedback--error";
          }
        });
    });
  }
})();
