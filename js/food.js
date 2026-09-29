/**
 * সেতু (Shetu) - Food (আহার সেতু) Module
 * Renders food cards, filters, food details, distance matching & request modals
 */

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('foodCardsContainer')) {
    initFoodListingPage();
  }
  if (document.getElementById('foodDetailsContainer')) {
    initFoodDetailsPage();
  }
  if (document.getElementById('foodDonateForm')) {
    initFoodDonateForm();
  }
});

// Render food listing with search & filters
function initFoodListingPage() {
  const container = document.getElementById('foodCardsContainer');
  const searchInput = document.getElementById('foodSearchInput');
  const distanceFilter = document.getElementById('foodDistanceFilter');
  const categoryFilter = document.getElementById('foodCategoryFilter');
  const statusFilter = document.getElementById('foodStatusFilter');
  const deliveryFilter = document.getElementById('foodDeliveryFilter');
  const resetBtn = document.getElementById('resetFiltersBtn');

  function render(items) {
    if (!items || items.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-state-icon">🍱</div>
          <h3 class="empty-state-title">কোনো খাবার পাওয়া যায়নি</h3>
          <p class="empty-state-desc">আপনার নির্বাচিত বাছাই ও ফিল্টার অনুযায়ী এই মুহূর্তে কোনো খাবার পাওয়া যায়নি। অন্য এলাকা বা দূরত্ব বাড়িয়ে খুঁজে দেখতে পারেন।</p>
          <button class="btn btn-primary" id="emptyStateResetBtn">বাছাই মুছে দিন</button>
        </div>
      `;
      document.getElementById('emptyStateResetBtn')?.addEventListener('click', resetFilters);
      return;
    }

    container.innerHTML = items.map(item => {
      const isExpired = item.status === 'expired' || item.expiryHours <= 0;
      const statusClass = isExpired ? 'pill-expired' : 'pill-available';
      const statusText = isExpired ? 'মেয়াদ শেষ' : item.statusBangla;

      return `
        <article class="item-card food-card ${isExpired ? 'item-expired' : ''}" data-id="${item.id}">
          <div class="card-media-wrapper">
            <img src="${item.image}" alt="${item.title}" class="card-media-img" loading="lazy">
            <div class="card-badge-top-left">
              <span class="status-pill ${statusClass}">${statusText}</span>
            </div>
            <div class="card-badge-top-right" data-expiry-time="${item.expiryTimestamp}">
              <!-- Countdown injected here by countdown.js -->
            </div>
          </div>
          <div class="card-body">
            <div class="card-meta-top">
              <span>🏷️ ${item.category}</span>
              <span>👥 ${item.servingsText}</span>
            </div>
            <h3 class="card-title">${item.title}</h3>
            <p class="card-desc">${item.description}</p>
            
            <div class="card-meta-list">
              <div class="card-meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>${item.cookedTime}</span>
              </div>
              <div class="card-meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>${item.location}</span>
              </div>
              <div class="card-meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                <span>${item.deliveryMethodText}</span>
              </div>
            </div>

            <div class="card-footer">
              <div class="card-distance">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M16.2 7.8l-2 6.4-6.4 2 2-6.4z"/></svg>
                <span>${item.distanceText}</span>
              </div>
              <div style="display:flex; gap:0.5rem; align-items:center;">
                <button class="btn btn-outline btn-sm" data-report-trigger data-item-name="${item.title}" title="রিপোর্ট করুন">🚨</button>
                <a href="food-details.html?id=${item.id}" class="btn btn-primary btn-sm">বিস্তারিত দেখুন</a>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Trigger live countdown initialization
    if (window.initCountdowns) {
      window.initCountdowns();
    }
  }

  function applyFilters() {
    const q = (searchInput?.value || '').trim().toLowerCase();
    const maxDist = parseFloat(distanceFilter?.value || '999');
    const category = categoryFilter?.value || '';
    const status = statusFilter?.value || '';
    const delivery = deliveryFilter?.value || '';

    const filtered = (window.ShetuData?.foodListings || []).filter(item => {
      const matchQuery = !q || item.title.toLowerCase().includes(q) || item.location.toLowerCase().includes(q) || item.category.toLowerCase().includes(q);
      const matchDist = item.distance <= maxDist;
      const matchCat = !category || item.category === category;
      const matchStatus = !status || item.status === status;
      const matchDelivery = !delivery || item.deliveryMethods.includes(delivery);

      return matchQuery && matchDist && matchCat && matchStatus && matchDelivery;
    });

    render(filtered);
  }

  function resetFilters() {
    if (searchInput) searchInput.value = '';
    if (distanceFilter) distanceFilter.value = '999';
    if (categoryFilter) categoryFilter.value = '';
    if (statusFilter) statusFilter.value = '';
    if (deliveryFilter) deliveryFilter.value = '';
    applyFilters();
  }

  searchInput?.addEventListener('input', applyFilters);
  distanceFilter?.addEventListener('change', applyFilters);
  categoryFilter?.addEventListener('change', applyFilters);
  statusFilter?.addEventListener('change', applyFilters);
  deliveryFilter?.addEventListener('change', applyFilters);
  resetBtn?.addEventListener('click', resetFilters);

  // Initial render
  applyFilters();
}

// Food Details Page Logic
function initFoodDetailsPage() {
  const container = document.getElementById('foodDetailsContainer');
  const urlParams = new URLSearchParams(window.location.search);
  const foodId = parseInt(urlParams.get('id') || '1', 10);

  const item = (window.ShetuData?.foodListings || []).find(f => f.id === foodId) || window.ShetuData?.foodListings[0];

  if (!item) {
    container.innerHTML = `
      <div class="error-state-card">
        <h3 class="error-state-title">কিছু একটা সমস্যা হয়েছে</h3>
        <p class="error-state-desc">খাবারটির তথ্য খুঁজে পাওয়া যায়নি।</p>
        <a href="food.html" class="btn btn-primary">খাবারের তালিকায় ফিরে যান</a>
      </div>
    `;
    return;
  }

  const isExpired = item.status === 'expired' || item.expiryHours <= 0;

  container.innerHTML = `
    <div style="display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 2.5rem; align-items: start;">
      <!-- Left Column: Image, Info, Map -->
      <div>
        <div style="background: #fff; border-radius: var(--radius-xl); overflow: hidden; border: 1px solid var(--border-light); margin-bottom: 2rem;">
          <img src="${item.image}" alt="${item.title}" style="width: 100%; height: 380px; object-fit: cover;">
          <div style="padding: 1.75rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
              <span class="badge badge-info">🍱 ${item.category}</span>
              <div data-expiry-time="${item.expiryTimestamp}"></div>
            </div>
            <h1 style="font-size: 2rem; font-weight: 700; margin-bottom: 0.75rem; color: var(--text-main);">${item.title}</h1>
            <p style="font-size: 1.05rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 1.5rem;">${item.description}</p>
            
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; padding: 1.25rem; background: var(--bg-subtle); border-radius: var(--radius-lg); margin-bottom: 1.5rem;">
              <div>
                <span style="font-size:0.8rem; color:var(--text-subtle); display:block;">পরিমাণ</span>
                <strong style="font-size:1.1rem; color:var(--text-main);">${item.servingsText}</strong>
              </div>
              <div>
                <span style="font-size:0.8rem; color:var(--text-subtle); display:block;">রান্নার সময়</span>
                <strong style="font-size:0.95rem; color:var(--text-main);">${item.cookedTime}</strong>
              </div>
              <div>
                <span style="font-size:0.8rem; color:var(--text-subtle); display:block;">অবস্থা</span>
                <strong style="font-size:0.95rem; color:var(--primary-dark);">${item.statusBangla}</strong>
              </div>
            </div>

            <!-- Location & Map Section -->
            <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.75rem;">📍 অবস্থান ও দূরত্ব</h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1rem;">
              ঠিকানা: <strong>${item.location}</strong> (আপনার বর্তমান অবস্থান থেকে <strong>${item.distanceText}</strong>)
            </p>
            
            <div class="map-visual-placeholder">
              <div class="map-grid-bg"></div>
              <div class="map-route-visual">
                <div class="map-marker">
                  <span class="map-marker-pin">🏪</span>
                  <span class="map-marker-label">দাতা (${item.donor.name})</span>
                </div>
                <div class="map-route-line">
                  <span class="route-distance-pill">${item.distanceText}</span>
                  <div class="route-dots"></div>
                </div>
                <div class="map-marker">
                  <span class="map-marker-pin">📍</span>
                  <span class="map-marker-label">আপনার অবস্থান</span>
                </div>
              </div>
            </div>
            <p style="font-size: 0.8rem; color: var(--text-subtle); text-align: right; margin-top: 0.5rem;">
              * ভবিষ্যতে এটি Leaflet + OpenStreetMap দিয়ে রিয়েল-টাইম ইন্টারেক্টিভ ম্যাপ হবে।
            </p>
          </div>
        </div>
      </div>

      <!-- Right Column: Donor details & Request Action Card -->
      <div>
        <div style="background: #fff; border: 1px solid var(--border-light); border-radius: var(--radius-xl); padding: 1.75rem; box-shadow: var(--shadow-sm); position: sticky; top: 90px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-light);">
            <div>
              <span style="font-size: 0.85rem; color: var(--text-subtle);">দাতার বিবরণ</span>
              <h4 style="font-size: 1.15rem; font-weight: 700; color: var(--text-main); margin-top: 0.2rem;">
                ${item.donor.name}
              </h4>
            </div>
            ${item.donor.isVerified ? `<span class="badge badge-verified">🏅 যাচাইকৃত সামাজিক দাতা</span>` : ''}
          </div>

          <div style="display: flex; flex-direction: column; gap: 0.65rem; margin-bottom: 1.5rem; font-size: 0.92rem; color: var(--text-muted);">
            <div>🏢 প্রতিষ্ঠানের ধরন: <strong>${item.donor.type}</strong></div>
            <div>⭐ রেটিং: <strong>${item.donor.rating || '৫.০'} / ৫.০</strong></div>
            <div>📞 যোগাযোগ: <strong>${item.donor.phone}</strong> (অনুরোধের পর দৃশ্যমান)</div>
            <div>🚚 ডেলিভারি সুবিধা: <strong>${item.deliveryMethodText}</strong></div>
          </div>

          <div style="background: var(--primary-surface); border: 1px solid var(--primary-subtle); border-radius: var(--radius-md); padding: 1rem; margin-bottom: 1.5rem;">
            <p style="font-size: 0.88rem; color: var(--primary-darker); line-height: 1.5;">
              💡 <strong>জরুরি সতর্কবার্তা:</strong> খাবার নষ্ট হওয়ার আগেই সংগ্রহ বা ডেলিভারির ব্যবস্থা করুন। খাবার নষ্ট রোধে সেতু প্ল্যাটফর্ম অঙ্গীকারবদ্ধ।
            </p>
          </div>

          ${isExpired ? `
            <button class="btn btn-outline btn-block" disabled style="opacity: 0.6; cursor: not-allowed;">
              ⚠️ এই খাবারের মেয়াদ উত্তীর্ণ হয়েছে
            </button>
          ` : `
            <button class="btn btn-primary btn-lg btn-block" id="openFoodRequestModalBtn">
              🍱 খাবারের অনুরোধ করুন
            </button>
          `}

          <div style="display: flex; justify-content: space-between; margin-top: 1rem;">
            <button class="btn btn-outline btn-sm" data-report-trigger data-item-name="${item.title}">
              🚨 রিপোর্ট করুন
            </button>
            <a href="food.html" class="btn btn-outline btn-sm">
              ← তালিকায় ফেরত যান
            </a>
          </div>
        </div>
      </div>
    </div>
  `;

  // Initialize countdown
  if (window.initCountdowns) {
    window.initCountdowns();
  }

  // Request modal event
  document.getElementById('openFoodRequestModalBtn')?.addEventListener('click', () => {
    openFoodRequestModal(item);
  });
}

// Request Modal for Food
function openFoodRequestModal(item) {
  let modal = document.getElementById('foodRequestModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'foodRequestModal';
    modal.className = 'modal-backdrop';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-header">
        <h3 class="modal-title">🍱 খাবার অনুরোধের ফর্ম</h3>
        <button class="modal-close">&times;</button>
      </div>
      <form id="foodRequestSubmitForm">
        <div class="modal-body">
          <div style="background: var(--primary-surface); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1.25rem;">
            <strong>${item.title}</strong> (${item.servingsText})<br>
            <span style="font-size:0.85rem; color:var(--text-muted);">দাতার অবস্থান: ${item.location} (${item.distanceText})</span>
          </div>

          <div class="form-group" style="margin-bottom: 1rem;">
            <label class="form-label">আপনার নাম / প্রতিষ্ঠানের নাম <span class="required">*</span></label>
            <input type="text" class="form-control" required placeholder="উদা: আহসান উল্লাহ / বাতিঘর এতিমখানা">
          </div>

          <div class="form-group" style="margin-bottom: 1rem;">
            <label class="form-label">মোবাইল নম্বর <span class="required">*</span></label>
            <input type="tel" class="form-control" required placeholder="০১৭১২-XXXXXX">
          </div>

          <div class="form-group" style="margin-bottom: 1rem;">
            <label class="form-label">কতজনের জন্য খাবার প্রয়োজন? <span class="required">*</span></label>
            <input type="number" class="form-control" max="${item.servings}" value="${item.servings}" required>
            <span class="form-hint">সর্বোচ্চ ${item.servings} জনের খাবার গ্রহণ করতে পারবেন।</span>
          </div>

          <div class="form-group" style="margin-bottom: 1rem;">
            <label class="form-label">সংগ্রহ / ডেলিভারির পদ্ধতি বেছে নিন <span class="required">*</span></label>
            
            <div class="delivery-options-group" style="grid-template-columns: 1fr; gap: 0.65rem;">
              <label class="delivery-radio-card active">
                <input type="radio" name="requestDelivery" value="pickup" checked>
                <div class="delivery-card-icon">🚶</div>
                <div class="delivery-card-title">নিজে এসে সংগ্রহ</div>
                <div class="delivery-card-desc">গ্রহীতা নিজে এসে নির্দিষ্ট সময়ে খাবারটি সংগ্রহ করবেন।</div>
              </label>

              <label class="delivery-radio-card">
                <input type="radio" name="requestDelivery" value="volunteer">
                <div class="delivery-card-icon">🤝</div>
                <div class="delivery-card-title">স্বেচ্ছাসেবকের সাহায্য</div>
                <div class="delivery-card-desc">কাছাকাছি কোনো স্বেচ্ছাসেবক খাবারটি আপনার কাছে পৌঁছে দেবেন।</div>
              </label>

              <label class="delivery-radio-card">
                <input type="radio" name="requestDelivery" value="paid">
                <div class="delivery-card-icon">🚚</div>
                <div class="delivery-card-title">পেইড ডেলিভারি</div>
                <div class="delivery-card-desc">রাইডার বা ডেলিভারি সার্ভিসের মাধ্যমে ডেলিভারি খরচ পরিশোধ সাপেক্ষে।</div>
              </label>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">বিশেষ কোনো বার্তা (ঐচ্ছিক)</label>
            <textarea class="form-textarea" rows="2" placeholder="প্রয়োজনীয় কোনো বিশেষ নির্দেশনা..."></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline" data-modal-dismiss>বাতিল</button>
          <button type="submit" class="btn btn-primary">অনুরোধ নিশ্চিত করুন</button>
        </div>
      </form>
    </div>
  `;

  openModal('foodRequestModal');

  modal.querySelector('#foodRequestSubmitForm').addEventListener('submit', (e) => {
    e.preventDefault();
    closeModal(modal);
    showToast('আপনার অনুরোধ সফলভাবে পাঠানো হয়েছে! দাতা ও নিকটস্থ স্বেচ্ছাসেবক নোটিফিকেশন পেয়েছেন।', 'success');
  });
}

// Food Donation Form Logic
function initFoodDonateForm() {
  const form = document.getElementById('foodDonateForm');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('ধন্যবাদ! আপনার খাবার দানের পোস্টটি সফলভাবে প্রকাশিত হয়েছে। নিকটস্থ মানুষের কাছে বিজ্ঞপ্তি পৌঁছে গেছে।', 'success');
    setTimeout(() => {
      window.location.href = 'food.html';
    }, 1200);
  });
}
