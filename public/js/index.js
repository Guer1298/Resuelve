// main.js | TuLibranza
document.addEventListener("DOMContentLoaded", () => {
    highlightActiveMenu();
    enableSmoothScroll();
    revealOnScroll();
    setupWhatsAppRedirect(); // opcional
  });
  
  /**
   * 1. Destaca el enlace activo en la barra de navegación
   */
  function highlightActiveMenu() {
    const currentPath = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll(".nav-links a");
  
    navLinks.forEach(link => {
      if (link.getAttribute("href") === currentPath) {
        link.classList.add("active");
      }
    });
  }
  
  /**
   * 2. Scroll suave para anclas internas
   */
  function enableSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener("click", e => {
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }
  
  /**
   * 3. Aplica animación al hacer scroll (fade-in)
   */
  function revealOnScroll() {
    const elements = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1
      }
    );
  
    elements.forEach(el => observer.observe(el));
  }
  
  /**
   * 4. Abre WhatsApp con mensaje predeterminado
   */
  function setupWhatsAppRedirect() {
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    const defaultMessage = "Hola, quiero más información sobre el crédito por libranza.";
    whatsappLinks.forEach(link => {
      link.addEventListener("click", function (e) {
        if (!link.href.includes("text=")) {
          e.preventDefault();
          const phone = link.href.split("/").pop();
          const url = `https://wa.me/${phone}?text=${encodeURIComponent(defaultMessage)}`;
          window.open(url, "_blank");
        }
      });
    });
  }
  