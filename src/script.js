// ============================================
// Mobile Menu Toggle
// ============================================
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const isActive = menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', isActive);
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', false);
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav')) {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', false);
    }
  });
}

// ============================================
// Newsletter Form Handling
// ============================================
function handleNewsletterSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const emailInput = form.querySelector('input[type="email"]');
  const email = emailInput.value.trim();

  // Basic email validation
  if (!isValidEmail(email)) {
    alert('Please enter a valid email address');
    return;
  }

  // Simulate form submission
  const button = form.querySelector('button');
  const originalText = button.textContent;
  button.textContent = 'Subscribing...';
  button.disabled = true;

  // Simulate API call with setTimeout
  setTimeout(() => {
    button.textContent = 'Subscribed! ✓';
    button.style.background = 'var(--color-success)';
    emailInput.value = '';

    // Reset after 3 seconds
    setTimeout(() => {
      button.textContent = originalText;
      button.style.background = '';
      button.disabled = false;
    }, 3000);
  }, 1000);

  console.log('Newsletter signup:', email);
}

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ============================================
// Smooth Scroll Enhancement (with fallback)
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ============================================
// Scroll Animation Trigger (Optional Enhancement)
// ============================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all cards and testimonials for fade-in effect
document.querySelectorAll('.card, .testimonial, .step').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 300ms ease-in-out, transform 300ms ease-in-out';
  observer.observe(el);
});

// ============================================
// Keyboard Navigation Enhancement
// ============================================
document.addEventListener('keydown', (e) => {
  // Close mobile menu on Escape
  if (e.key === 'Escape') {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && menuToggle.classList.contains('active')) {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', false);
      menuToggle.focus();
    }
  }
});

// ============================================
// Performance: Lazy load images (if needed)
// ============================================
if ('IntersectionObserver' in window) {
  const imgObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imgObserver.observe(img);
  });
}

console.log('Practise Agent - Interactive elements loaded');
