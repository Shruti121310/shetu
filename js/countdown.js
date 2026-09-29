/**
 * সেতু (Shetu) - Live Expiry Countdown Timer
 * Handles real-time countdown clocks in Bengali digits for food items
 */

(function () {
  function padZero(num) {
    return num < 10 ? '0' + num : '' + num;
  }

  function toBanglaDigits(str) {
    const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return str.toString().replace(/[0-9]/g, digit => banglaDigits[digit]);
  }

  function updateCountdownElement(el) {
    const targetTimestamp = parseInt(el.getAttribute('data-expiry-time'), 10);
    if (!targetTimestamp || isNaN(targetTimestamp)) return;

    const now = Date.now();
    const diff = targetTimestamp - now;

    if (diff <= 0) {
      el.innerHTML = `<span class="countdown-badge expired">⚠️ মেয়াদ শেষ</span>`;
      el.classList.add('is-expired');
      const card = el.closest('.food-card');
      if (card) {
        card.classList.add('item-expired');
        const badge = card.querySelector('.status-pill');
        if (badge) {
          badge.textContent = 'মেয়াদ শেষ';
          badge.className = 'status-pill pill-expired';
        }
      }
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const timeString = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
    const banglaTimeString = toBanglaDigits(timeString);

    const urgentClass = hours === 0 && minutes < 30 ? 'countdown-urgent' : '';

    el.innerHTML = `
      <span class="countdown-badge ${urgentClass}">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        <span>${banglaTimeString} বাকি</span>
      </span>
    `;
  }

  function initCountdowns() {
    const countdownEls = document.querySelectorAll('[data-expiry-time]');
    countdownEls.forEach(el => updateCountdownElement(el));
  }

  // Run on load and every second
  document.addEventListener('DOMContentLoaded', () => {
    initCountdowns();
    setInterval(initCountdowns, 1000);
  });

  window.initCountdowns = initCountdowns;
})();
