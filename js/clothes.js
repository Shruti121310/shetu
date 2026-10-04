/**
 * সেতু (Shetu) - Clothes (বস্ত্র সেতু) Module
 * Handles clothes listings, filtering by age/gender/size/condition, details, and donation
 */

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('clothesCardsContainer')) {
    initClothesListingPage();
  }
  if (document.getElementById('clothesDetailsContainer')) {
    initClothesDetailsPage();
  }
  if (document.getElementById('clothesDonateForm')) {
    initClothesDonateForm();
  }
});

function initClothesListingPage() {
  const container = document.getElementById('clothesCardsContainer');
  const searchInput = document.getElementById('clothesSearchInput');
  const categoryFilter = document.getElementById('clothesCategoryFilter');
  const targetFilter = document.getElementById('clothesTargetFilter');
  const sizeFilter = document.getElementById('clothesSizeFilter');
  const conditionFilter = document.getElementById('clothesConditionFilter');
  const distanceFilter = document.getElementById('clothesDistanceFilter');
  const resetBtn = document.getElementById('resetClothesFiltersBtn');
    const djangoClothesListings = Array.isArray(window.djangoClothesDonations)
  ? window.djangoClothesDonations.map(donation => ({
      id: donation.id,
      title: donation.title,
      category: donation.category,
      description: donation.description || 'কোনো বিবরণ দেওয়া হয়নি।',
      quantity: donation.quantity,
      location: donation.location,
      target: 'সাধারণ',
      age: 'প্রাপ্তবয়স্ক',
      size: 'ফ্রি সাইজ',
      condition: 'ভালো',
      conditionBadge: 'ভালো',
      statusBangla: 'উপলব্ধ',
      image: "/static/images/clothes-placeholder.jpg",
      distance: 999,
      distanceText: 'দূরত্ব নির্ধারণ করা হয়নি',
      donor: {
        name: donation.donor,
        isVerified: false,
        type: 'দাতা',
        phone: ''
      }
    }))
  : [];

  function render(items) {
    if (!items || items.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-state-icon">👕</div>
          <h3 class="empty-state-title">কোনো পোশাক পাওয়া যায়নি</h3>
          <p class="empty-state-desc">আপনার নির্বাচিত ফিল্টার অনুযায়ী এই মুহূর্তে কোনো পোশাক পাওয়া যায়নি। সাইজ বা ক্যাটাগরি পরিবর্তন করে আবার দেখুন।</p>
          <button class="btn btn-primary" id="emptyStateResetClothesBtn">ফিল্টার মুছে দিন</button>
        </div>
      `;
      document.getElementById('emptyStateResetClothesBtn')?.addEventListener('click', resetFilters);
      return;
    }

    container.innerHTML = items.map(item => `
      <article class="item-card clothes-card" data-id="${item.id}">
        <div class="card-media-wrapper">
          <img src="${item.image}" alt="${item.title}" class="card-media-img" loading="lazy">
          <div class="card-badge-top-left">
            <span class="status-pill pill-available">${item.statusBangla}</span>
          </div>
          <div class="card-badge-top-right">
            <span class="badge badge-info">${item.conditionBadge}</span>
          </div>
        </div>
        <div class="card-body">
          <div class="card-meta-top">
            <span>🏷️ ${item.category}</span>
            <span>👤 ${item.target}র জন্য (${item.age})</span>
          </div>
          <h3 class="card-title">${item.title}</h3>
          <p class="card-desc">${item.description}</p>

          <div class="card-meta-list">
            <div class="card-meta-item">
              <span>📏 <strong>সাইজ:</strong> ${item.size} | <strong>পরিমাণ:</strong> ${item.quantity}</span>
            </div>
            <div class="card-meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>${item.location}</span>
            </div>
            <div class="card-meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span>দাতা: ${item.donor.name} ${item.donor.isVerified ? '🏅' : ''}</span>
            </div>
          </div>

          <div class="card-footer">
            <div class="card-distance">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M16.2 7.8l-2 6.4-6.4 2 2-6.4z"/></svg>
              <span>${item.distanceText}</span>
            </div>
            <div style="display:flex; gap:0.5rem; align-items:center;">
              <button class="btn btn-outline btn-sm" data-report-trigger data-item-name="${item.title}" title="রিপোর্ট করুন">🚨</button>
            <a href="/clothes/details/?id=${item.id}" class="btn btn-primary btn-sm">বিস্তারিত দেখুন</a>            </div>
          </div>
        </div>
      </article>
    `).join('');
  }

  function applyFilters() {
  const q = (searchInput?.value || '').trim().toLowerCase();
  const cat = categoryFilter?.value || '';
  const target = targetFilter?.value || '';
  const size = sizeFilter?.value || '';
  const cond = conditionFilter?.value || '';
  const maxDist = parseFloat(distanceFilter?.value || '999');

  console.log("LISTINGS:", djangoClothesListings);
  console.log("FILTER VALUES:", cat, target, size, cond, maxDist);

  const filtered = djangoClothesListings.filter(item => {
    const matchQ =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q);

    const matchCat = !cat || item.category === cat;
    const matchTarget = !target || item.target === target;
    const matchSize = !size || item.size === size;
    const matchCond = !cond || item.condition === cond;
    const matchDist = item.distance <= maxDist;

    return matchQ && matchCat && matchTarget && matchSize && matchCond && matchDist;
  });

  render(filtered);
}

  function resetFilters() {
    if (searchInput) searchInput.value = '';
    if (categoryFilter) categoryFilter.value = '';
    if (targetFilter) targetFilter.value = '';
    if (sizeFilter) sizeFilter.value = '';
    if (conditionFilter) conditionFilter.value = '';
    if (distanceFilter) distanceFilter.value = '999';
    console.log("FINAL CLOTHES DATA:", djangoClothesListings);
    applyFilters();
  }

  searchInput?.addEventListener('input', applyFilters);
  categoryFilter?.addEventListener('change', applyFilters);
  targetFilter?.addEventListener('change', applyFilters);
  sizeFilter?.addEventListener('change', applyFilters);
  conditionFilter?.addEventListener('change', applyFilters);
  distanceFilter?.addEventListener('change', applyFilters);
  resetBtn?.addEventListener('click', resetFilters);

  applyFilters();
}

function initClothesDetailsPage() {
  const container = document.getElementById('clothesDetailsContainer');
  const urlParams = new URLSearchParams(window.location.search);
  const clothesId = parseInt(urlParams.get('id') || '101', 10);

const djangoItem = window.djangoClothesItem;
const item = djangoItem ? {
    id: djangoItem.id,
    title: djangoItem.title,
    category: djangoItem.category,
    description: djangoItem.description || 'কোনো বিবরণ দেওয়া হয়নি।',
    quantity: djangoItem.quantity,
    location: djangoItem.location,
    target: 'সাধারণ',
    age: 'প্রাপ্তবয়স্ক',
    size: 'ফ্রি সাইজ',
    condition: 'ভালো',
    conditionBadge: 'ভালো',
    statusBangla: 'উপলব্ধ',
    image: "/static/images/clothes-placeholder.jpg",
    distance: 999,
    distanceText: 'দূরত্ব নির্ধারণ করা হয়নি',
    donor: {
        name: djangoItem.donor,
        isVerified: false,
        type: 'দাতা',
        phone: ''
    }
} : ((window.ShetuData?.clothesListings || []).find(c => c.id === clothesId) || window.ShetuData?.clothesListings[0]);

  if (!item) {
    container.innerHTML = `
      <div class="error-state-card">
        <h3 class="error-state-title">কিছু একটা সমস্যা হয়েছে</h3>
        <p class="error-state-desc">পোশাকটির বিবরণ খুঁজে পাওয়া যায়নি।</p>
        <a href="clothes.html" class="btn btn-primary">পোশাকের তালিকায় ফিরে যান</a>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div style="display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 2.5rem; align-items: start;">
      <div>
        <div style="background: #fff; border-radius: var(--radius-xl); overflow: hidden; border: 1px solid var(--border-light); margin-bottom: 2rem;">
          <img src="${item.image}" alt="${item.title}" style="width: 100%; height: 400px; object-fit: cover;">
          <div style="padding: 2rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
              <span class="badge badge-info">👕 ${item.category}</span>
              <span class="status-pill pill-available">${item.statusBangla}</span>
            </div>
            <h1 style="font-size: 2.2rem; font-weight: 700; margin-bottom: 0.75rem; color: var(--text-main);">${item.title}</h1>
            <p style="font-size: 1.05rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 1.5rem;">${item.description}</p>
            
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; padding: 1.25rem; background: var(--bg-subtle); border-radius: var(--radius-lg); margin-bottom: 1.5rem;">
              <div>
                <span style="font-size:0.8rem; color:var(--text-subtle); display:block;">কার জন্য</span>
                <strong style="color:var(--text-main);">${item.target}</strong>
              </div>
              <div>
                <span style="font-size:0.8rem; color:var(--text-subtle); display:block;">বয়স</span>
                <strong style="color:var(--text-main);">${item.age}</strong>
              </div>
              <div>
                <span style="font-size:0.8rem; color:var(--text-subtle); display:block;">সাইজ</span>
                <strong style="color:var(--text-main);">${item.size}</strong>
              </div>
              <div>
                <span style="font-size:0.8rem; color:var(--text-subtle); display:block;">অবস্থা</span>
                <strong style="color:var(--primary-dark);">${item.condition}</strong>
              </div>
            </div>

            <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.75rem;">📍 অবস্থান ও দূরত্ব</h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1rem;">
              ঠিকানা: <strong>${item.location}</strong> (আপনার কাছ থেকে <strong>${item.distanceText}</strong>)
            </p>

            <div class="map-visual-placeholder">
              <div class="map-grid-bg"></div>
              <div class="map-route-visual">
                <div class="map-marker">
                  <span class="map-marker-pin">👕</span>
                  <span class="map-marker-label">পোশাকের অবস্থান</span>
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
          </div>
        </div>
      </div>

      <div>
        <div style="background: #fff; border: 1px solid var(--border-light); border-radius: var(--radius-xl); padding: 1.75rem; box-shadow: var(--shadow-sm); position: sticky; top: 90px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-light);">
            <div>
              <span style="font-size: 0.85rem; color: var(--text-subtle);">দাতার তথ্য</span>
              <h4 style="font-size: 1.15rem; font-weight: 700; color: var(--text-main); margin-top: 0.2rem;">
                ${item.donor.name}
              </h4>
            </div>
            ${item.donor.isVerified ? `<span class="badge badge-verified">🏅 যাচাইকৃত দাতা</span>` : ''}
          </div>

          <div style="display: flex; flex-direction: column; gap: 0.65rem; margin-bottom: 1.5rem; font-size: 0.92rem; color: var(--text-muted);">
            <div>🏷️ ভূমিকা: <strong>${item.donor.type}</strong></div>
            <div>📞 যোগাযোগ: <strong>${item.donor.phone}</strong></div>
            <div>📦 উপলব্ধ পরিমাণ: <strong>${item.quantity}</strong></div>
          </div>

          <button class="btn btn-primary btn-lg btn-block" id="openClothesRequestModalBtn">
            👕 পোশাকটির অনুরোধ করুন
          </button>

          <div style="display: flex; justify-content: space-between; margin-top: 1rem;">
            <button class="btn btn-outline btn-sm" data-report-trigger data-item-name="${item.title}">
              🚨 রিপোর্ট করুন
            </button>
            <a href="clothes.html" class="btn btn-outline btn-sm">
              ← তালিকায় ফেরত যান
            </a>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('openClothesRequestModalBtn')?.addEventListener('click', () => {
    openClothesRequestModal(item);
  });
}

function openClothesRequestModal(item) {
  let modal = document.getElementById('clothesRequestModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'clothesRequestModal';
    modal.className = 'modal-backdrop';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-header">
        <h3 class="modal-title">👕 পোশাকের অনুরোধ ফর্ম</h3>
        <button class="modal-close">&times;</button>
      </div>
            <form id="clothesRequestSubmitForm" method="POST" action="/clothes/request/${item.id}/">
        <input type="hidden" name="csrfmiddlewaretoken" value="${window.djangoCsrfToken || ''}">
        <div class="modal-body">
          <div style="background: var(--clothes-bg); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1.25rem;">
            <strong>${item.title}</strong> (সাইজ: ${item.size})<br>
            <span style="font-size:0.85rem; color:var(--text-muted);">দাতার এলাকা: ${item.location} (${item.distanceText})</span>
          </div>

          <div class="form-group" style="margin-bottom: 1rem;">
            <label class="form-label">আপনার নাম <span class="required">*</span></label>
            <input type="text" name="requester_name" class="form-control" required placeholder="আপনার পূর্ণ নাম">          </div>

          <div class="form-group" style="margin-bottom: 1rem;">
            <label class="form-label">মোবাইল নম্বর <span class="required">*</span></label>
            <input type="tel" name="mobile" class="form-control" required placeholder="০১৭১২-XXXXXX">
          </div>

          <div class="form-group" style="margin-bottom: 1rem;">
            <label class="form-label">ডেলিভারি / সংগ্রহের মাধ্যম <span class="required">*</span></label>
            <div class="delivery-options-group" style="grid-template-columns: 1fr; gap: 0.65rem;">
              <label class="delivery-radio-card active">
                <input type="radio" name="clothesDelivery" value="pickup" checked>
                <div class="delivery-card-icon">🚶</div>
                <div class="delivery-card-title">নিজে এসে সংগ্রহ</div>
                <div class="delivery-card-desc">সরাসরি দাতার স্থান থেকে সংগ্রহ করবেন।</div>
              </label>

              <label class="delivery-radio-card">
                <input type="radio" name="clothesDelivery" value="volunteer">
                <div class="delivery-card-icon">🤝</div>
                <div class="delivery-card-title">স্বেচ্ছাসেবকের মাধ্যমে</div>
                <div class="delivery-card-desc">নিকটস্থ কোনো স্বেচ্ছাসেবক পৌঁছে দিতে সহায়তা করবেন।</div>
              </label>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">প্রয়োজনীয়তার সংক্ষেপ বিবরণ</label>
            <textarea class="form-textarea" rows="2" placeholder="কেন এই পোশাকটি আপনার বা আপনার পরিচিত কারও প্রয়োজন..."></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline" data-modal-dismiss>বাতিল</button>
          <button type="submit" class="btn btn-primary">অনুরোধ জমা দিন</button>
        </div>
      </form>
    </div>
  `;

  openModal('clothesRequestModal');

  
}

function initClothesDonateForm() {
  const form = document.getElementById('clothesDonateForm');
}

