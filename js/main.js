/**
 * সেতু (Shetu) - Main JavaScript
 * Handles navigation, mobile menu, modals, toast notifications,
 * report system, and support interactions across all pages.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initModals();
  initReportModal();
  initSupportModal();
  initUserSessionState();
});

// 1. Mobile Menu Toggle
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      const isExpanded = navLinks.classList.toggle('show-mobile');
      toggleBtn.setAttribute('aria-expanded', isExpanded);
      toggleBtn.innerHTML = isExpanded 
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('show-mobile');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

// 2. Global Toast Notification System
window.showToast = function (message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const icon = type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️';

  toast.innerHTML = `
    <span style="font-size: 1.25rem;">${icon}</span>
    <div style="flex-grow: 1; font-weight: 500;">${message}</div>
    <button style="background:none; border:none; cursor:pointer; font-size:1.1rem; color:#64748b;" onclick="this.parentElement.remove()">×</button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
};

// 3. Generic Modals Controller
function initModals() {
  // Close modals on close button or backdrop click
  document.addEventListener('click', (e) => {
    if (e.target.matches('.modal-backdrop') || e.target.closest('.modal-close') || e.target.closest('[data-modal-dismiss]')) {
      const modal = e.target.closest('.modal-backdrop');
      if (modal) {
        closeModal(modal);
      }
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModal = document.querySelector('.modal-backdrop.show');
      if (openModal) closeModal(openModal);
    }
  });
}

window.openModal = function (modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
};

window.closeModal = function (modalElementOrId) {
  const modal = typeof modalElementOrId === 'string' 
    ? document.getElementById(modalElementOrId) 
    : modalElementOrId;
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
};

// 4. Report Listing / Account System
function initReportModal() {
  document.addEventListener('click', (e) => {
    const reportBtn = e.target.closest('[data-report-trigger]');
    if (reportBtn) {
      const itemName = reportBtn.getAttribute('data-item-name') || 'এই বিষয়টি';
      openReportDialog(itemName);
    }
  });
}

function openReportDialog(itemName) {
  let modal = document.getElementById('reportModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'reportModal';
    modal.className = 'modal-backdrop';
    modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-header">
          <h3 class="modal-title">🚨 রিপোর্ট পাঠান</h3>
          <button class="modal-close">&times;</button>
        </div>
        <form id="reportForm">
          <div class="modal-body">
            <p style="margin-bottom: 1rem; color: var(--text-muted); font-size: 0.95rem;">
              আপনি <strong id="reportTargetName" style="color: var(--text-main);"></strong> সম্পর্কে রিপোর্ট করছেন। তথ্য দিয়ে সেতুকে নিরাপদ রাখতে সাহায্য করুন।
            </p>
            <div class="form-group" style="margin-bottom: 1rem;">
              <label class="form-label">রিপোর্টের কারণ <span class="required">*</span></label>
              <select class="form-select" id="reportReason" required>
                <option value="">কারণ নির্বাচন করুন</option>
                <option value="ভুয়া পোস্ট">ভুয়া পোস্ট / অকার্যকর তথ্য</option>
                <option value="সন্দেহজনক ব্যবহারকারী">সন্দেহজনক ব্যবহারকারী বা আচরণ</option>
                <option value="ভুল তথ্য">খাবার বা পণ্যের বিবরণ ভুল</option>
                <option value="অনুপযুক্ত content">অনুপযুক্ত ভাষা বা ছবি</option>
                <option value="অন্যান্য">অন্যান্য কারণ</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">বিস্তারিত বিবরণ</label>
              <textarea class="form-textarea" id="reportDetails" rows="3" placeholder="সমস্যাটি সম্পর্কে সংক্ষেপে লিখুন..."></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline" data-modal-dismiss>বাতিল</button>
            <button type="submit" class="btn btn-danger">রিপোর্ট পাঠান</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('#reportForm').addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal(modal);
      showToast('আপনার রিপোর্টটি সফলভাবে গ্রহণ করা হয়েছে। সেতু টিম দ্রুত পর্যালোচনা করবে।', 'success');
      e.target.reset();
    });
  }

  modal.querySelector('#reportTargetName').textContent = itemName;
  openModal('reportModal');
}

// 5. Platform Sustainability Support Modal
function initSupportModal() {
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-support-trigger]')) {
      openSupportDialog();
    }
  });
}

function openSupportDialog() {
  let modal = document.getElementById('supportModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'supportModal';
    modal.className = 'modal-backdrop';
    modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-header">
          <h3 class="modal-title">💚 সেতুকে সচল রাখতে সহায়তা করুন</h3>
          <button class="modal-close">&times;</button>
        </div>
        <form id="supportForm">
          <div class="modal-body">
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.25rem; line-height: 1.6;">
              সেতু একটি সম্পূর্ণ অলাভজনক সামাজিক প্ল্যাটফর্ম। সার্ভার রক্ষণাবেক্ষণ, এসএমএস নোটিফিকেশন ও মাঠপর্যায়ের কার্যক্রম সচল রাখতে আপনার যেকোনো পরিমাণের সাহায্য অমূল্য।
            </p>
            <div class="form-group" style="margin-bottom: 1.25rem;">
              <label class="form-label">অনুদান পরিমাণ নির্বাচন করুন</label>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem;">
                <label style="border: 2px solid var(--border-light); padding: 0.65rem; border-radius: var(--radius-md); text-align: center; cursor: pointer;">
                  <input type="radio" name="supportAmount" value="50" checked> <strong>৳৫০</strong>
                </label>
                <label style="border: 2px solid var(--border-light); padding: 0.65rem; border-radius: var(--radius-md); text-align: center; cursor: pointer;">
                  <input type="radio" name="supportAmount" value="100"> <strong>৳১০০</strong>
                </label>
                <label style="border: 2px solid var(--border-light); padding: 0.65rem; border-radius: var(--radius-md); text-align: center; cursor: pointer;">
                  <input type="radio" name="supportAmount" value="500"> <strong>৳৫০০</strong>
                </label>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">পেমেন্ট মেথড (ডেমো প্রোটোটাইপ)</label>
              <div style="display: flex; gap: 1rem; align-items: center; background: var(--bg-subtle); padding: 0.85rem; border-radius: var(--radius-md);">
                <span>📱 বিকাশ / নগদ / রকেট</span>
                <span class="badge badge-info" style="margin-left: auto;">পরীক্ষামূলক</span>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline" data-modal-dismiss>পরে করব</button>
            <button type="submit" class="btn btn-primary">সেতুকে সহায়তা করুন</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('#supportForm').addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal(modal);
      showToast('সেতুর কার্যক্রমে পাশে থাকার জন্য আপনাকে আন্তরিক ধন্যবাদ! 💚', 'success');
    });
  }
  openModal('supportModal');
}

// 6. User Session State Toggle (Allows reviewer to toggle logged-in state)
function initUserSessionState() {
  const isUserLoggedIn = localStorage.getItem('shetu_logged_in') === 'true';
  const navActions = document.querySelector('.nav-actions');

  if (!navActions) return;

  // Preserve existing notification button if present
  const notifBtn = navActions.querySelector('.nav-notification-btn');

  if (isUserLoggedIn) {
    const userHtml = `
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <a href="${getRelativePath('pages/dashboard.html')}" class="btn btn-outline-primary btn-sm" style="display:flex; align-items:center; gap:0.4rem;">
          <span>👤 ড্যাশবোর্ড</span>
        </a>
        <button id="logoutDemoBtn" class="btn btn-outline btn-sm" title="লগআউট ডেমো" style="font-size:0.8rem; padding: 0.35rem 0.6rem;">লগআউট</button>
      </div>
    `;
    // Update login action container
    const authWrapper = navActions.querySelector('.auth-buttons');
    if (authWrapper) {
      authWrapper.innerHTML = userHtml;
      document.getElementById('logoutDemoBtn')?.addEventListener('click', () => {
        localStorage.setItem('shetu_logged_in', 'false');
        showToast('আপনি লগআউট হয়েছেন।', 'info');
        setTimeout(() => location.reload(), 500);
      });
    }
  }
}

// Helper to resolve relative path depending on root or subfolder
function getRelativePath(targetPath) {
  const isInsidePages = window.location.pathname.includes('/pages/');
  if (isInsidePages) {
    return targetPath.replace('pages/', '');
  }
  return targetPath;
}
