// ========================================
// MODAL MANAGEMENT
// ========================================

const modalTriggers = document.querySelectorAll('[data-dialog], .dialog-trigger');
const modals = {
  privacy: document.getElementById('privacy-dialog'),
  accessibility: document.getElementById('accessibility-dialog'),
  transparency: document.getElementById('transparency-dialog'),
};

function openModal(dialogName) {
  const modal = modals[dialogName];
  if (modal) {
    modal.showModal();
    document.body.style.overflow = 'hidden';

    // Focus the close button
    const closeBtn = modal.querySelector('[data-dialog]');
    if (closeBtn) closeBtn.focus();
  }
}

function closeModal(dialogName) {
  const modal = modals[dialogName];
  if (modal) {
    modal.close();
    document.body.style.overflow = '';
  }
}

// Modal trigger buttons
modalTriggers.forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    const dialogName = trigger.getAttribute('data-dialog');
    if (dialogName) {
      e.preventDefault();
      openModal(dialogName);
    }
  });
});

// Modal close buttons and footer buttons
document.querySelectorAll('.modal-close, .modal-footer button').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const dialog = btn.closest('.modal-dialog');
    if (dialog) {
      const dialogName = dialog.id.replace('-dialog', '');
      closeModal(dialogName);
    }
  });
});

// Close modal on Escape key
Object.values(modals).forEach(modal => {
  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      const dialogName = modal.id.replace('-dialog', '');
      closeModal(dialogName);
    }
  });

  // Close modal when clicking outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      const dialogName = modal.id.replace('-dialog', '');
      closeModal(dialogName);
    }
  });
});

// ========================================
// DONATION BUTTON INTERACTIONS
// ========================================

const donateButtons = document.querySelectorAll('.donate-btn-primary, .donate-btn-header');

donateButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Scroll to donation section
    const donationSection = document.getElementById('donate');
    if (donationSection) {
      donationSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ========================================
// COPY TO CLIPBOARD
// ========================================

const copyButton = document.getElementById('copy-bank-details');

if (copyButton) {
  copyButton.addEventListener('click', async () => {
    const bankDetails = `
שם המוטב: קופת צדקה מנחת אריה
בנק: בנק לאומי (מספר בנק 10)
סניף: 902
מספר חשבון: 77300078
    `.trim();

    try {
      await navigator.clipboard.writeText(bankDetails);
      showToast('פרטי הבנק הועתקו בהצלחה!');

      // Visual feedback
      const originalText = copyButton.textContent;
      copyButton.textContent = '✓ הועתקו!';
      copyButton.style.backgroundColor = 'var(--color-success)';

      setTimeout(() => {
        copyButton.textContent = originalText;
        copyButton.style.backgroundColor = '';
      }, 2000);
    } catch (err) {
      showToast('שגיאה בהעתקה. אנא נסו שוב.', 'error');
    }
  });
}

// ========================================
// TOAST NOTIFICATIONS
// ========================================

function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');

  toast.textContent = message;
  toast.className = `toast show`;

  if (type === 'error') {
    toast.style.backgroundColor = 'var(--color-error)';
  } else {
    toast.style.backgroundColor = 'var(--color-success)';
  }

  // Auto-hide after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// ========================================
// KEYBOARD NAVIGATION
// ========================================

document.addEventListener('keydown', (e) => {
  // Alt + D to open donation section
  if (e.altKey && e.key === 'd') {
    e.preventDefault();
    const donationSection = document.getElementById('donate');
    if (donationSection) {
      donationSection.scrollIntoView({ behavior: 'smooth' });
      donationSection.querySelector('h2').focus();
    }
  }

  // Alt + C to open contact section
  if (e.altKey && e.key === 'c') {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      contactSection.querySelector('h2').focus();
    }
  }
});

// ========================================
// SMOOTH SCROLL POLYFILL FOR OLDER BROWSERS
// ========================================

if (!('scrollBehavior' in document.documentElement.style)) {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'auto' });
        }
      }
    });
  });
}

// ========================================
// PERFORMANCE: LAZY LOAD IMAGES IF ADDED LATER
// ========================================

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ========================================
// ACCESSIBILITY: FOCUS MANAGEMENT
// ========================================

// Track focus for keyboard users (optional visual indicator)
let isKeyboardUser = false;

document.addEventListener('keydown', () => {
  isKeyboardUser = true;
});

document.addEventListener('mousedown', () => {
  isKeyboardUser = false;
});

// Add focus visible styles for keyboard navigation
document.addEventListener('focusin', (e) => {
  if (isKeyboardUser && e.target.matches('button, a, input, [role="button"]')) {
    e.target.classList.add('keyboard-focus');
  }
});

document.addEventListener('focusout', (e) => {
  if (e.target.matches('button, a, input, [role="button"]')) {
    e.target.classList.remove('keyboard-focus');
  }
});

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  // All elements are ready
  console.log('Website loaded successfully');
});
