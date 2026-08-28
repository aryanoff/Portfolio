(function () {
  "use strict";

  const yearEl = document.getElementById("copyright-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

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
    faders.forEach((el) => el.classList.add("is-visible"));
  }

  const toggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelectorAll(".nav-links a");

  if (toggle) {
    toggle.addEventListener("change", (e) => {
      if (e.target.checked) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        toggle.checked = false;
        document.body.style.overflow = "";
      });
    });
  }

  const form = document.getElementById("contact-form");
  const formFeedback = document.getElementById("form-feedback");

  if (form) {
    form.addEventListener("submit", function (e) {
      const action = form.getAttribute("action");

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
        .then(async (res) => {
          const json = await res.json().catch(() => null);
          if (res.ok) {
            form.reset();
            if (formFeedback) {
              formFeedback.textContent =
                json?.message || "Message sent successfully! I'll get back to you soon.";
              formFeedback.className = "form-feedback form-feedback--success";
            }
          } else {
            throw new Error(json?.message || "Submission failed");
          }
        })
        .catch((err) => {
          if (formFeedback) {
            formFeedback.textContent = err.message !== "Submission failed" ? err.message : "Something went wrong. Please try emailing directly.";
            formFeedback.className = "form-feedback form-feedback--error";
          }
        });
    });
  }
})();
