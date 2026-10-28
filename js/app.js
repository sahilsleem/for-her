/**
 * Main Application Logic & Romantic Micro-Interactions
 */

import {
  ROMANTIC_CONFIG,
  REASONS_I_LOVE_YOU,
  OPEN_WHEN_LETTERS,
  DATE_BUCKET_LIST,
  PHOTO_MANIFEST
} from './data.js';
import { romanticAudio } from './audio.js';
import { RomanticCanvasEffect } from './petals.js';

document.addEventListener('DOMContentLoaded', () => {
  initOpeningSurprise();
  initMusicAndPetalsControls();
  initReasonsGenerator();
  initOpenWhenLetters();
  initPromiseSeal();
  initDateBucketList();
  initPhotoScrapbook();
  initSecretCoupon();
  initFinalActions();
});

/**
 * 1. OPENING SURPRISE TRANSITION
 */
function initOpeningSurprise() {
  const introScreen = document.getElementById('intro-screen');
  const mainSite = document.getElementById('main-site');
  const openSurpriseBtn = document.getElementById('open-surprise-btn');
  const envelopeGraphic = document.getElementById('intro-envelope');

  if (!openSurpriseBtn) return;

  const handleOpen = () => {
    // Play chime sound & trigger heart burst
    if (romanticAudio) {
      romanticAudio.playChime();
      romanticAudio.start();
    }

    const rect = openSurpriseBtn.getBoundingClientRect();
    window.dispatchEvent(new CustomEvent('celebrateHearts', {
      detail: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, count: 25 }
    }));

    if (envelopeGraphic) {
      envelopeGraphic.classList.add('envelope-opened');
    }

    setTimeout(() => {
      introScreen.classList.add('fade-out');
      mainSite.classList.remove('site-hidden');
      mainSite.classList.add('site-revealed');

      setTimeout(() => {
        introScreen.style.display = 'none';
        // Smooth scroll to top of main content
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 700);
    }, 600);
  };

  openSurpriseBtn.addEventListener('click', handleOpen);
  if (envelopeGraphic) {
    envelopeGraphic.addEventListener('click', handleOpen);
  }
}

/**
 * 2. FLOATING MUSIC & PETALS CONTROLS
 */
function initMusicAndPetalsControls() {
  const musicToggleBtn = document.getElementById('music-toggle-btn');
  const petalsToggleBtn = document.getElementById('petals-toggle-btn');
  const musicIcon = document.getElementById('music-icon');
  const musicLabel = document.getElementById('music-label');

  if (musicToggleBtn && romanticAudio) {
    musicToggleBtn.addEventListener('click', () => {
      const isPlaying = romanticAudio.toggle();
      updateMusicUI(isPlaying);
    });

    document.addEventListener('musicStateChange', (e) => {
      updateMusicUI(e.detail.isPlaying);
    });
  }

  function updateMusicUI(isPlaying) {
    if (!musicToggleBtn) return;
    if (isPlaying) {
      musicToggleBtn.classList.add('playing');
      if (musicIcon) musicIcon.textContent = '🎵';
      if (musicLabel) musicLabel.textContent = 'playing music ♡';
    } else {
      musicToggleBtn.classList.remove('playing');
      if (musicIcon) musicIcon.textContent = '🔇';
      if (musicLabel) musicLabel.textContent = 'play music ♡';
    }
  }

  if (petalsToggleBtn && window.romanticCanvas) {
    petalsToggleBtn.addEventListener('click', () => {
      const isRunning = window.romanticCanvas.toggle();
      petalsToggleBtn.classList.toggle('active', isRunning);
      petalsToggleBtn.setAttribute('aria-pressed', isRunning ? 'true' : 'false');
    });
  }
}

/**
 * 3. "REASONS I LOVE YOU" RANDOM GENERATOR
 */
function initReasonsGenerator() {
  const reasonText = document.getElementById('current-reason-text');
  const reasonCounter = document.getElementById('reason-counter');
  const nextReasonBtn = document.getElementById('next-reason-btn');
  const cardElement = document.getElementById('reasons-card');

  if (!nextReasonBtn || !reasonText) return;

  let availableIndices = [...Array(REASONS_I_LOVE_YOU.length).keys()];
  let currentIndex = -1;

  function showNextReason() {
    if (availableIndices.length === 0) {
      // Reset when all reasons have been viewed
      availableIndices = [...Array(REASONS_I_LOVE_YOU.length).keys()];
    }

    // Pick random index from available
    const randomPickIdx = Math.floor(Math.random() * availableIndices.length);
    currentIndex = availableIndices.splice(randomPickIdx, 1)[0];

    // Card flip / shimmer transition
    if (cardElement) {
      cardElement.classList.remove('card-shimmer');
      void cardElement.offsetWidth; // force reflow
      cardElement.classList.add('card-shimmer');
    }

    reasonText.style.opacity = '0';
    reasonText.style.transform = 'translateY(8px)';

    setTimeout(() => {
      reasonText.textContent = REASONS_I_LOVE_YOU[currentIndex];
      if (reasonCounter) {
        reasonCounter.textContent = `reason #${currentIndex + 1} of ${REASONS_I_LOVE_YOU.length} ♡`;
      }
      reasonText.style.opacity = '1';
      reasonText.style.transform = 'translateY(0)';
    }, 180);

    if (romanticAudio) {
      romanticAudio.playPop();
    }
  }

  nextReasonBtn.addEventListener('click', (e) => {
    showNextReason();
    const rect = nextReasonBtn.getBoundingClientRect();
    window.dispatchEvent(new CustomEvent('celebrateHearts', {
      detail: { x: rect.left + rect.width / 2, y: rect.top, count: 12 }
    }));
  });

  // Display initial reason
  showNextReason();
}

/**
 * 4. "OPEN WHEN" LETTERS MODAL
 */
function initOpenWhenLetters() {
  const container = document.getElementById('open-when-grid');
  const modal = document.getElementById('letter-modal');
  const modalClose = document.getElementById('letter-modal-close');
  const modalTitle = document.getElementById('letter-modal-title');
  const modalBody = document.getElementById('letter-modal-body');

  if (!container || !modal) return;

  // Render open-when envelopes
  OPEN_WHEN_LETTERS.forEach((letter) => {
    const card = document.createElement('div');
    card.className = 'envelope-card';
    card.innerHTML = `
      <div class="envelope-stamp">POSTAL LOVE</div>
      <div class="envelope-icon">${letter.envelopeIcon}</div>
      <span class="envelope-tag">${letter.tag}</span>
      <h4 class="envelope-title">${letter.title}</h4>
      <p class="envelope-preview">${letter.preview}</p>
      <button class="envelope-open-btn" aria-label="Open letter: ${letter.title}">
        <span>open letter</span>
        <span class="btn-heart">♡</span>
      </button>
    `;

    card.addEventListener('click', () => {
      openLetter(letter);
    });

    container.appendChild(card);
  });

  function openLetter(letter) {
    if (modalTitle) modalTitle.innerHTML = `<span class="letter-tag">${letter.tag}</span> ${letter.title}`;
    if (modalBody) modalBody.innerHTML = letter.content;

    modal.classList.add('active');
    document.body.classList.add('modal-open');

    if (romanticAudio) {
      romanticAudio.playChime();
    }

    window.dispatchEvent(new CustomEvent('celebrateHearts', {
      detail: { x: window.innerWidth / 2, y: window.innerHeight / 2, count: 20 }
    }));
  }

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
    if (romanticAudio) romanticAudio.playPop();
  };

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/**
 * 5. "A TINY PROMISE" INTERACTIVE WAX SEAL
 */
function initPromiseSeal() {
  const sealBtn = document.getElementById('seal-promise-btn');
  const sealStamp = document.getElementById('wax-seal-stamp');
  const sealStatus = document.getElementById('seal-status-text');
  const promiseCheckboxes = document.querySelectorAll('.promise-checkbox');

  // Load saved seal state
  const isSealed = localStorage.getItem('romantic_promise_sealed') === 'true';
  if (isSealed && sealStamp) {
    sealStamp.classList.add('sealed');
    if (sealStatus) sealStatus.textContent = 'sealed with all my love & commitment ♡';
    if (sealBtn) sealBtn.textContent = 'promise renewed ♡';
  }

  if (sealBtn && sealStamp) {
    const handleSeal = () => {
      sealStamp.classList.add('sealed', 'stamp-press');
      localStorage.setItem('romantic_promise_sealed', 'true');

      if (sealStatus) {
        sealStatus.textContent = 'sealed with all my love & commitment ♡';
      }
      sealBtn.textContent = 'promise sealed forever ♡';

      if (romanticAudio) {
        romanticAudio.playChime();
      }

      const rect = sealStamp.getBoundingClientRect();
      window.dispatchEvent(new CustomEvent('celebrateHearts', {
        detail: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, count: 25 }
      }));

      setTimeout(() => {
        sealStamp.classList.remove('stamp-press');
      }, 500);
    };

    sealBtn.addEventListener('click', handleSeal);
    sealStamp.addEventListener('click', handleSeal);
  }

  // Audio pop when tapping checkboxes
  promiseCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      if (romanticAudio) romanticAudio.playPop();
    });
  });
}

/**
 * 6. "LITTLE THINGS I WANT TO DO WITH YOU" (INTERACTIVE DATE BUCKET LIST)
 */
function initDateBucketList() {
  const listContainer = document.getElementById('date-list-container');
  const addDateForm = document.getElementById('add-date-form');
  const dateInput = document.getElementById('new-date-input');
  const countBadge = document.getElementById('date-selected-counter');

  if (!listContainer) return;

  // Load persisted dates from localStorage or default
  let userDates = [];
  try {
    const saved = localStorage.getItem('romantic_bucket_list');
    if (saved) {
      userDates = JSON.parse(saved);
    } else {
      userDates = [...DATE_BUCKET_LIST];
    }
  } catch (e) {
    userDates = [...DATE_BUCKET_LIST];
  }

  function saveAndRender() {
    try {
      localStorage.setItem('romantic_bucket_list', JSON.stringify(userDates));
    } catch (e) {}

    listContainer.innerHTML = '';
    let selectedCount = 0;

    userDates.forEach((item, index) => {
      if (item.checked) selectedCount++;

      const dateItem = document.createElement('div');
      dateItem.className = `date-item ${item.checked ? 'completed' : ''}`;
      dateItem.innerHTML = `
        <label class="custom-checkbox-wrapper">
          <input type="checkbox" ${item.checked ? 'checked' : ''} data-index="${index}" aria-label="${item.title}">
          <span class="custom-checkmark">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </span>
        </label>
        <div class="date-content">
          <span class="date-title">${item.title}</span>
          ${item.desc ? `<p class="date-desc">${item.desc}</p>` : ''}
        </div>
        <button class="delete-date-btn" data-index="${index}" aria-label="Remove item" title="Remove item">×</button>
      `;

      listContainer.appendChild(dateItem);
    });

    if (countBadge) {
      countBadge.textContent = `${selectedCount} memory ideas checked ♡`;
    }
  }

  // Handle toggling checkmarks
  listContainer.addEventListener('change', (e) => {
    if (e.target.matches('input[type="checkbox"]')) {
      const idx = parseInt(e.target.dataset.index, 10);
      userDates[idx].checked = e.target.checked;
      if (romanticAudio) romanticAudio.playPop();

      if (e.target.checked) {
        const rect = e.target.getBoundingClientRect();
        window.dispatchEvent(new CustomEvent('celebrateHearts', {
          detail: { x: rect.left + 15, y: rect.top + 10, count: 12 }
        }));
      }
      saveAndRender();
    }
  });

  // Handle deleting custom dates
  listContainer.addEventListener('click', (e) => {
    if (e.target.matches('.delete-date-btn')) {
      const idx = parseInt(e.target.dataset.index, 10);
      userDates.splice(idx, 1);
      if (romanticAudio) romanticAudio.playPop();
      saveAndRender();
    }
  });

  // Handle adding new custom date
  if (addDateForm && dateInput) {
    addDateForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = dateInput.value.trim();
      if (!val) return;

      userDates.unshift({
        id: `custom-${Date.now()}`,
        title: val,
        desc: "Added with love by us ♡",
        checked: false
      });

      dateInput.value = '';
      if (romanticAudio) romanticAudio.playPop();

      saveAndRender();

      window.dispatchEvent(new CustomEvent('celebrateHearts', {
        detail: { x: window.innerWidth / 2, y: window.innerHeight / 2, count: 18 }
      }));
    });
  }

  saveAndRender();
}

/**
 * 7. PHOTO SCRAPBOOK & LIGHTBOX WITH GRACEFUL FALLBACKS
 */
function initPhotoScrapbook() {
  const featuredContainer = document.getElementById('featured-photo-card');
  const galleryGrid = document.getElementById('scrapbook-grid');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxDate = document.getElementById('lightbox-date');
  const lightboxClose = document.getElementById('lightbox-close');

  if (!galleryGrid) return;

  // 1. Featured Polaroid Card
  const heroData = PHOTO_MANIFEST.find(p => p.id === 'hero');
  if (featuredContainer && heroData) {
    featuredContainer.innerHTML = createPolaroidHTML(heroData, true);
    attachPhotoEvents(featuredContainer.querySelector('.polaroid-frame'), heroData);
  }

  // 2. Scrapbook Grid Polaroids
  const gridPhotos = PHOTO_MANIFEST.filter(p => p.id !== 'hero');
  gridPhotos.forEach((photo, idx) => {
    const col = document.createElement('div');
    col.className = `scrapbook-col scrapbook-col-${(idx % 3) + 1}`;
    col.innerHTML = createPolaroidHTML(photo, false);
    attachPhotoEvents(col.querySelector('.polaroid-frame'), photo);
    galleryGrid.appendChild(col);
  });

  function createPolaroidHTML(photo, isFeatured = false) {
    const initialSrc = ROMANTIC_CONFIG.hasRealPhotos ? photo.realPath : photo.placeholderPath;
    return `
      <div class="polaroid-frame ${isFeatured ? 'polaroid-featured' : ''}" role="button" tabindex="0" aria-label="View photo: ${photo.title}">
        <div class="polaroid-washi washi-${Math.floor(Math.random() * 4) + 1}"></div>
        <div class="polaroid-photo-wrapper">
          <img class="polaroid-img" 
               src="${initialSrc}" 
               data-fallback="${photo.placeholderPath}" 
               alt="${photo.title}" 
               loading="lazy" />
          <div class="polaroid-view-badge">tap to zoom ♡</div>
        </div>
        <div class="polaroid-footer">
          <span class="polaroid-title">${photo.title}</span>
          <span class="polaroid-caption">${photo.caption}</span>
          <span class="polaroid-date">${photo.date}</span>
        </div>
      </div>
    `;
  }

  function attachPhotoEvents(frameEl, photo) {
    if (!frameEl) return;
    const imgEl = frameEl.querySelector('.polaroid-img');

    // Graceful fallback if real photo doesn't exist
    if (imgEl) {
      imgEl.addEventListener('error', () => {
        if (!imgEl.src.endsWith(photo.placeholderPath)) {
          imgEl.src = photo.placeholderPath;
          frameEl.classList.add('has-placeholder');
        }
      });
    }

    const openZoom = () => {
      if (!lightboxModal) return;
      lightboxImg.src = imgEl.src;
      if (lightboxTitle) lightboxTitle.textContent = photo.title;
      if (lightboxCaption) lightboxCaption.textContent = photo.caption;
      if (lightboxDate) lightboxDate.textContent = photo.date;

      lightboxModal.classList.add('active');
      document.body.classList.add('modal-open');

      if (romanticAudio) romanticAudio.playPop();
    };

    frameEl.addEventListener('click', openZoom);
    frameEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openZoom();
      }
    });
  }

  // Lightbox Close
  const closeLightbox = () => {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      document.body.classList.remove('modal-open');
    }
  };

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/**
 * 8. "ONE LAST THING..." SECRET REVEAL / COUPON
 */
function initSecretCoupon() {
  const revealBtn = document.getElementById('reveal-coupon-btn');
  const secretContent = document.getElementById('secret-reveal-content');

  if (!revealBtn || !secretContent) return;

  revealBtn.addEventListener('click', () => {
    revealBtn.style.display = 'none';
    secretContent.classList.remove('hidden-coupon');
    secretContent.classList.add('revealed-coupon');

    if (romanticAudio) {
      romanticAudio.playChime();
    }

    window.dispatchEvent(new CustomEvent('celebrateHearts', {
      detail: { x: window.innerWidth / 2, y: window.innerHeight / 2, count: 30 }
    }));
  });
}

/**
 * 9. FINAL ACTIONS & MORNING TEXT PREFILL
 */
function initFinalActions() {
  const sendTextBtn = document.getElementById('send-morning-text-btn');
  const sendHugBtn = document.getElementById('send-virtual-hug-btn');
  const toastNotification = document.getElementById('love-toast');

  if (sendHugBtn) {
    sendHugBtn.addEventListener('click', (e) => {
      const rect = sendHugBtn.getBoundingClientRect();
      window.dispatchEvent(new CustomEvent('celebrateHearts', {
        detail: { x: rect.left + rect.width / 2, y: rect.top, count: 30 }
      }));

      if (romanticAudio) {
        romanticAudio.playChime();
      }

      showToast("Sending you the tightest, warmest hug right now... ♡");
    });
  }

  if (sendTextBtn) {
    sendTextBtn.addEventListener('click', () => {
      const defaultText = encodeURIComponent("Good morning my love ♡ I just woke up and saw your little surprise... I loved it so much!");
      
      if (ROMANTIC_CONFIG.directSmsNumber) {
        window.location.href = `sms:${ROMANTIC_CONFIG.directSmsNumber}?body=${defaultText}`;
      } else if (ROMANTIC_CONFIG.whatsappNumber) {
        window.location.href = `https://wa.me/${ROMANTIC_CONFIG.whatsappNumber}?text=${defaultText}`;
      } else {
        // Fallback: celebratory toast & copy message option
        if (navigator.clipboard) {
          navigator.clipboard.writeText("Good morning my love ♡ I just woke up and saw your little surprise... I loved it so much!").catch(() => {});
        }
        showToast("Text copied to clipboard! Send it to him when you wake up ♡");
        
        window.dispatchEvent(new CustomEvent('celebrateHearts', {
          detail: { x: window.innerWidth / 2, y: window.innerHeight / 2, count: 25 }
        }));
      }
    });
  }

  function showToast(message) {
    if (!toastNotification) return;
    toastNotification.textContent = message;
    toastNotification.classList.add('visible');

    setTimeout(() => {
      toastNotification.classList.remove('visible');
    }, 4500);
  }
}
