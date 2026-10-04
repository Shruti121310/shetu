/**
 * সেতু (Shetu) - Books (গ্রন্থ সেতু) Module
 * Handles Book listings across 3 tabs (দান, ধার, বিনিময়), Borrow calculations,
 * and Book Exchange interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('booksCardsContainer')) {
    initBooksListingPage();
  }
  if (document.getElementById('bookDetailsContainer')) {
    initBookDetailsPage();
  }
  if (document.getElementById('bookBorrowCalculator')) {
    initBookBorrowCalculator();
  }
  if (document.getElementById('bookExchangeContainer')) {
    initBookExchangePage();
  }
  if (document.getElementById('bookDonateForm')) {
    initBookDonateForm();
  }
});

function initBooksListingPage() {
  const container = document.getElementById('booksCardsContainer');
  const searchInput = document.getElementById('booksSearchInput');
  const categoryFilter = document.getElementById('booksCategoryFilter');
  const distanceFilter = document.getElementById('booksDistanceFilter');
  const tabButtons = document.querySelectorAll('.books-tab-btn');
  let activeMode = 'all'; // all, donate, borrow, exchange

  function render(items) {
    if (!items || items.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-state-icon">📚</div>
          <h3 class="empty-state-title">এই মুহূর্তে কোনো বই পাওয়া যাচ্ছে না</h3>
          <p class="empty-state-desc">আপনার নির্বাচিত ক্যাটাগরি বা মোডে কোনো বই খুঁজে পাওয়া যায়নি। অন্য ক্যাটাগরি বেছে নিন অথবা নতুন বই যুক্ত করতে পারেন।</p>
          <button class="btn btn-primary" id="emptyStateResetBooksBtn">সব বই দেখুন</button>
        </div>
      `;
      document.getElementById('emptyStateResetBooksBtn')?.addEventListener('click', () => {
        switchTab('all');
      });
      return;
    }

    container.innerHTML = items.map(item => {
      let modeBadge = '';
      if (item.mode === 'donate') {
        modeBadge = `<span class="badge badge-success">🎁 দান</span>`;
      } else if (item.mode === 'borrow') {
        modeBadge = `<span class="badge badge-info">📖 ধার (${toBanglaDigits(item.borrowDays || 15)} দিন)</span>`;
      } else {
        modeBadge = `<span class="badge badge-warning">🔄 বিনিময়</span>`;
      }

      return `
        <article class="item-card book-card" data-id="${item.id}">
          <div class="card-media-wrapper" style="height: 240px; background: #fdfbf7;">
            <img src="${item.coverImage}" alt="${item.title}" class="card-media-img" style="object-fit: cover;">
            <div class="card-badge-top-left">
              ${modeBadge}
            </div>
            <div class="card-badge-top-right">
              <span class="status-pill pill-available">${item.statusBangla}</span>
            </div>
          </div>
          <div class="card-body">
            <div class="card-meta-top">
              <span>🏷️ ${item.category}</span>
              <span>👤 ${item.ownerType}</span>
            </div>
            <h3 class="card-title">${item.title}</h3>
            <p style="font-size: 0.95rem; color: var(--primary-dark); font-weight: 600; margin-bottom: 0.5rem;">
              লেখক: ${item.author}
            </p>
            <p class="card-desc">${item.description}</p>

            <div class="card-meta-list">
              <div class="card-meta-item">
                <span>📖 <strong>পদ্ধতি:</strong> ${item.modeBangla}</span>
              </div>
              <div class="card-meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>${item.location}</span>
              </div>
              <div class="card-meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span>মালিক: ${item.owner}</span>
              </div>
            </div>

            <div class="card-footer">
              <div class="card-distance">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M16.2 7.8l-2 6.4-6.4 2 2-6.4z"/></svg>
                <span>${item.distanceText}</span>
              </div>
              <div style="display:flex; gap:0.5rem; align-items:center;">
                <button class="btn btn-outline btn-sm" data-report-trigger data-item-name="${item.title}" title="রিপোর্ট করুন">🚨</button>
                <a href="/books/details/?id=${item.id}" class="btn btn-primary btn-sm">বইটি দেখুন</a>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  function applyFilters() {
    const q = (searchInput?.value || '').trim().toLowerCase();
    const cat = categoryFilter?.value || '';
    const maxDist = parseFloat(distanceFilter?.value || '999');

    const filtered = (window.ShetuData?.bookListings || []).filter(item => {
      const matchQ = !q || item.title.toLowerCase().includes(q) || item.author.toLowerCase().includes(q) || item.category.toLowerCase().includes(q);
      const matchMode = activeMode === 'all' || item.mode === activeMode;
      const matchCat = !cat || item.category === cat;
      const matchDist = item.distance <= maxDist;

      return matchQ && matchMode && matchCat && matchDist;
    });

    render(filtered);
  }

  function switchTab(mode) {
    activeMode = mode;
    tabButtons.forEach(btn => {
      if (btn.getAttribute('data-mode') === mode) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    applyFilters();
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.getAttribute('data-mode'));
    });
  });

  searchInput?.addEventListener('input', applyFilters);
  categoryFilter?.addEventListener('change', applyFilters);
  distanceFilter?.addEventListener('change', applyFilters);

  // Check URL parameter for default tab (e.g. ?mode=borrow)
  const urlParams = new URLSearchParams(window.location.search);
  const paramMode = urlParams.get('mode');
  if (paramMode && ['donate', 'borrow', 'exchange'].includes(paramMode)) {
    switchTab(paramMode);
  } else {
    applyFilters();
  }
}

// Book Details Page
function initBookDetailsPage() {
  const container = document.getElementById('bookDetailsContainer');
  const urlParams = new URLSearchParams(window.location.search);
  const bookId = parseInt(urlParams.get('id') || '201', 10);

  const item = (window.ShetuData?.bookListings || []).find(b => b.id === bookId) || window.ShetuData?.bookListings[0];

  if (!item) {
    container.innerHTML = `
      <div class="error-state-card">
        <h3 class="error-state-title">কিছু একটা সমস্যা হয়েছে</h3>
        <p class="error-state-desc">বইটির বিবরণ খুঁজে পাওয়া যায়নি।</p>
        <a href="/books/" class="btn btn-primary">বইয়ের তালিকায় ফিরে যান</a>
      </div>
    `;
    return;
  }

  const isBorrow = item.mode === 'borrow';
  const isExchange = item.mode === 'exchange';

  container.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1.25fr; gap: 2.5rem; align-items: start;">
      <div>
        <div style="background: #fff; border-radius: var(--radius-xl); overflow: hidden; border: 1px solid var(--border-light); padding: 1.5rem; text-align: center;">
          <img src="${item.coverImage}" alt="${item.title}" style="max-height: 420px; margin: 0 auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);">
          <div style="margin-top: 1.5rem; display: flex; justify-content: center; gap: 0.75rem;">
            <span class="badge ${item.mode === 'donate' ? 'badge-success' : item.mode === 'borrow' ? 'badge-info' : 'badge-warning'}">
              পদ্ধতি: ${item.modeBangla}
            </span>
            <span class="status-pill pill-available">${item.statusBangla}</span>
          </div>
        </div>

        <!-- Location Box -->
        <div style="background: #fff; border-radius: var(--radius-xl); border: 1px solid var(--border-light); padding: 1.5rem; margin-top: 1.5rem;">
          <h4 style="font-weight: 700; margin-bottom: 0.5rem;">📍 অবস্থান ও দূরত্ব</h4>
          <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1rem;">
            ${item.location} (আপনার কাছ থেকে <strong>${item.distanceText}</strong>)
          </p>
          <div class="map-visual-placeholder" style="height: 180px;">
            <div class="map-grid-bg"></div>
            <div class="map-route-visual" style="padding: 0.6rem 1.2rem;">
              <span style="font-size: 1.2rem;">📖 দাতা</span>
              <span class="route-distance-pill">${item.distanceText}</span>
              <span style="font-size: 1.2rem;">📍 আপনি</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Details & Action -->
      <div>
        <div style="background: #fff; border: 1px solid var(--border-light); border-radius: var(--radius-xl); padding: 2rem; box-shadow: var(--shadow-sm);">
          <span class="badge badge-info" style="margin-bottom: 0.5rem;">🏷️ ${item.category}</span>
          <h1 style="font-size: 2.25rem; font-weight: 700; margin-bottom: 0.25rem; color: var(--text-main);">${item.title}</h1>
          <h3 style="font-size: 1.2rem; color: var(--primary-dark); font-weight: 600; margin-bottom: 1rem;">লেখক: ${item.author}</h3>
          
          <p style="font-size: 1.05rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 1.5rem;">
            ${item.description}
          </p>

          <div style="background: var(--bg-subtle); border-radius: var(--radius-lg); padding: 1.25rem; margin-bottom: 1.5rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 0.75rem;">
              <span style="color:var(--text-subtle);">বর্তমান মালিক / দাতা:</span>
              <strong>${item.owner} (${item.ownerType})</strong>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="color:var(--text-subtle);">পদ্ধতি:</span>
              <strong>${item.modeBangla}</strong>
            </div>
          </div>

          ${isBorrow ? `
            <!-- Borrow Period Selector & Deadline -->
            <div style="border: 2px dashed var(--primary-subtle); background: var(--primary-surface); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1.5rem;">
              <h4 style="font-weight: 700; color: var(--primary-darker); margin-bottom: 0.75rem;">⏱️ ধার নেওয়ার সময়সীমা নির্ধারণ</h4>
              <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1rem;">কত দিনের জন্য ধার নিতে চান তা নির্বাচন করুন:</p>
              
              <div style="display: flex; gap: 1rem; margin-bottom: 1.25rem;">
                <label style="flex: 1; border: 2px solid var(--primary); background: #fff; padding: 0.85rem; border-radius: var(--radius-md); text-align: center; cursor: pointer;">
                  <input type="radio" name="borrowDuration" value="15" checked> <strong>১৫ দিন</strong>
                </label>
                <label style="flex: 1; border: 2px solid var(--border-light); background: #fff; padding: 0.85rem; border-radius: var(--radius-md); text-align: center; cursor: pointer;">
                  <input type="radio" name="borrowDuration" value="30"> <strong>৩০ দিন</strong>
                </label>
              </div>

              <div id="deadlineDisplay" style="background: #fff; padding: 0.85rem; border-radius: var(--radius-md); border: 1px solid var(--border-light); font-size: 0.95rem;">
                <!-- Injected by calculateDeadlines() -->
              </div>
            </div>

            <button class="btn btn-primary btn-lg btn-block" id="borrowBookConfirmBtn">
              📖 বইটি ধার নেওয়ার অনুরোধ করুন
            </button>
          ` : isExchange ? `
            <!-- Exchange Request Details -->
            <div style="background: var(--warning-bg); border: 1px solid #fde68a; padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1.5rem;">
              <h4 style="font-weight: 700; color: #92400e; margin-bottom: 0.5rem;">🔄 বিনিময়ের শর্ত</h4>
              <p style="font-size: 0.95rem; color: #78350f; margin-bottom: 1rem;">
                বইটির মালিক <strong>“${item.exchangeWish || 'অন্য কোনো সমমানের বই'}”</strong> এর সঙ্গে বইটি বিনিময় করতে আগ্রহী।
              </p>
              <a href="/books/exchange/?targetId=${item.id}" class="btn btn-secondary btn-lg btn-block">
                🔄 বই বিনিময়ের প্রস্তাব পাঠান
              </a>
            </div>
          ` : `
            <!-- Free Donation -->
            <div style="background: var(--primary-surface); border: 1px solid var(--primary-subtle); padding: 1.25rem; border-radius: var(--radius-lg); margin-bottom: 1.5rem;">
              <p style="color: var(--primary-darker); font-size: 0.95rem;">
                🎁 এই বইটি সম্পূর্ণ উপহার/দান হিসেবে দেওয়া হচ্ছে। কোনো ফেরত বা অর্থ প্রদান করতে হবে না।
              </p>
            </div>
            <button class="btn btn-primary btn-lg btn-block" id="claimDonatedBookBtn">
              🎁 বইটি পাওয়ার আবেদন করুন
            </button>
          `}

          <div style="display:flex; justify-content:space-between; margin-top: 1.25rem;">
            <button class="btn btn-outline btn-sm" data-report-trigger data-item-name="${item.title}">🚨 রিপোর্ট করুন</button>
            <a href="/books/" class="btn btn-outline btn-sm">← বইয়ের তালিকায় ফেরত যান</a>
          </div>
        </div>
      </div>
    </div>
  `;

  // Borrow deadline calculations
  if (isBorrow) {
    const radios = document.querySelectorAll('input[name="borrowDuration"]');
    function updateDeadline() {
      const days = parseInt(document.querySelector('input[name="borrowDuration"]:checked')?.value || '15', 10);
      const today = new Date();
      const returnDate = new Date();
      returnDate.setDate(today.getDate() + days);

      const banglaMonths = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
      const todayText = `${toBanglaDigits(today.getDate())} ${banglaMonths[today.getMonth()]}`;
      const returnText = `${toBanglaDigits(returnDate.getDate())} ${banglaMonths[returnDate.getMonth()]}`;

      const display = document.getElementById('deadlineDisplay');
      if (display) {
        display.innerHTML = `
          📅 <strong>ধার নেওয়ার তারিখ:</strong> ${todayText}<br>
          ⚠️ <strong>ফেরত দেওয়ার শেষ তারিখ:</strong> <span style="color:var(--danger); font-weight:700;">${returnText}</span>
        `;
      }
    }

    radios.forEach(r => r.addEventListener('change', updateDeadline));
    updateDeadline();

    document.getElementById('borrowBookConfirmBtn')?.addEventListener('click', () => {
      showToast('বইটি ধার নেওয়ার অনুরোধ মালিকের কাছে পৌঁছে গেছে! সম্মতির পর আপনাকে অবহিত করা হবে।', 'success');
    });
  }

  document.getElementById('claimDonatedBookBtn')?.addEventListener('click', () => {
    showToast('আপনার বই দানের আবেদনটি সফলভাবে জমা হয়েছে!', 'success');
  });
}

// Book Exchange Page Logic
function initBookExchangePage() {
  const acceptBtn = document.getElementById('exchangeAcceptBtn');
  const rejectBtn = document.getElementById('exchangeRejectBtn');
  const newExchangeForm = document.getElementById('newExchangeForm');

  acceptBtn?.addEventListener('click', () => {
    showToast('বিনিময়ের প্রস্তাবটি গ্রহণ করা হয়েছে! ডেলিভারি বা সরাসরি সাক্ষাতের স্থান নির্ধারণ করুন।', 'success');
    const incomingCard = document.getElementById('incomingExchangeCard');
    if (incomingCard) {
      incomingCard.style.border = '2px solid var(--success)';
      incomingCard.querySelector('.exchange-action-buttons').innerHTML = `
        <span class="badge badge-success" style="font-size: 0.95rem; padding: 0.45rem 1rem;">
          ✅ বিনিময় প্রস্তাবটি আপনি গ্রহণ করেছেন
        </span>
      `;
    }
  });

  rejectBtn?.addEventListener('click', () => {
    showToast('বিনিময়ের প্রস্তাবটি বাতিল করা হয়েছে।', 'info');
    const incomingCard = document.getElementById('incomingExchangeCard');
    if (incomingCard) {
      incomingCard.style.opacity = '0.5';
      incomingCard.querySelector('.exchange-action-buttons').innerHTML = `
        <span class="badge badge-danger">বাতিল করা হয়েছে</span>
      `;
    }
  });

  newExchangeForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('আপনার বই বিনিময়ের প্রস্তাবটি সফলভাবে পাঠানো হয়েছে!', 'success');
    newExchangeForm.reset();
  });
}

function initBookDonateForm() {
  const form = document.getElementById('bookDonateForm');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('ধন্যবাদ! আপনার বইয়ের লিস্টিংটি সফলভাবে প্রকাশিত হয়েছে।', 'success');
    setTimeout(() => {
      window.location.href = '/books/';
    }, 1200);
  });
}

function toBanglaDigits(str) {
  if (str === null || str === undefined) return '';
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return str.toString().replace(/[0-9]/g, digit => banglaDigits[digit]);
}
