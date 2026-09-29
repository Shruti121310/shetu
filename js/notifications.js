/**
 * সেতু (Shetu) - Notification Center Module
 * Handles categorized notifications, unread badges, and interactive read states
 */

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('notificationsContainer')) {
    initNotificationsPage();
  }
});

function initNotificationsPage() {
  const container = document.getElementById('notificationsContainer');
  const filterBtns = document.querySelectorAll('.notif-filter-btn, #notifFilterBar .tab-btn');
  const markAllReadBtn = document.getElementById('markAllReadBtn');
  let currentCategory = 'all';

  let list = JSON.parse(JSON.stringify(window.ShetuData?.notificationsList || []));

  // Fix relative links if running inside pages/
  const isInsidePages = window.location.pathname.includes('/pages/') || window.location.pathname.endsWith('notifications.html');
  function resolveLink(link) {
    if (!link) return '#';
    let clean = link.replace('pages/volunteer-dashboard.html', 'pages/volunteers.html');
    if (isInsidePages && clean.startsWith('pages/')) {
      return clean.replace(/^pages\//, '');
    }
    return clean;
  }

  function render() {
    const filtered = list.filter(item => {
      if (currentCategory === 'all') return true;
      if (currentCategory === 'unread') return item.isUnread;
      if (currentCategory === 'food') return item.type === 'food';
      if (currentCategory === 'clothes') return item.type === 'clothes' || item.type === 'delivery';
      if (currentCategory === 'books') return item.type === 'exchange' || item.type === 'book_return' || item.type === 'books';
      if (currentCategory === 'volunteer') return item.type === 'volunteer';
      if (currentCategory === 'system') return item.type === 'system' || item.type === 'delivery';
      return item.type === currentCategory;
    });

    // Update tab badges if present
    const unreadTotal = list.filter(n => n.isUnread).length;
    const badgeAll = document.getElementById('badge-all');
    if (badgeAll) {
      badgeAll.textContent = unreadTotal > 0 ? toBanglaDigits(unreadTotal) : '';
      badgeAll.style.display = unreadTotal > 0 ? 'inline-block' : 'none';
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="background:#fff; border-radius:var(--radius-xl); padding:3rem 1.5rem; text-align:center; border:1px solid var(--border-light);">
          <div class="empty-state-icon" style="font-size:3rem; margin-bottom:1rem;">🔔</div>
          <h3 class="empty-state-title" style="font-size:1.25rem; font-weight:700; margin-bottom:0.5rem; color:var(--text-main);">এই মুহূর্তে কোনো বিজ্ঞপ্তি নেই</h3>
          <p class="empty-state-desc" style="color:var(--text-muted); font-size:0.95rem; max-width:450px; margin:0 auto;">কাছাকাছি কোনো নতুন খাবার, বস্ত্র বা বইয়ের তথ্য এলে আপনাকে সাথে সাথে অবহিত করা হবে।</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(item => `
      <div class="notification-item-card ${item.isUnread ? 'is-unread' : ''}" data-id="${item.id}" style="
        background: #fff;
        border: 1px solid ${item.isUnread ? 'var(--primary-subtle)' : 'var(--border-light)'};
        border-left: 4px solid ${item.isUnread ? 'var(--primary)' : 'var(--border-light)'};
        border-radius: var(--radius-lg);
        padding: 1.25rem;
        margin-bottom: 1rem;
        box-shadow: ${item.isUnread ? 'var(--shadow-sm)' : 'none'};
        display: flex;
        gap: 1.25rem;
        align-items: flex-start;
        transition: all 0.2s ease;
      ">
        <div style="
          width: 44px;
          height: 44px;
          border-radius: var(--radius-full);
          background: ${item.isUnread ? 'var(--primary-surface)' : 'var(--bg-subtle)'};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.35rem;
          flex-shrink: 0;
        ">
          ${item.type === 'food' ? '🍱' : item.type === 'exchange' ? '🔄' : item.type === 'volunteer' ? '🤝' : item.type === 'delivery' ? '🚚' : '📖'}
        </div>

        <div style="flex-grow: 1;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 0.35rem; flex-wrap:wrap; gap:0.5rem;">
            <div style="display:flex; align-items:center; gap:0.5rem;">
              <span class="badge ${item.isUnread ? 'badge-success' : 'badge-info'}" style="font-size:0.75rem;">
                ${item.category}
              </span>
              ${item.distance ? `<span style="font-size:0.8rem; color:var(--text-subtle);">📍 ${item.distance}</span>` : ''}
              ${item.timeRemaining ? `<span style="font-size:0.8rem; color:var(--danger); font-weight:600;">⏱️ ${item.timeRemaining}</span>` : ''}
            </div>
            <span style="font-size: 0.8rem; color: var(--text-subtle);">${item.timestamp}</span>
          </div>

          <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.35rem;">
            ${item.title}
          </h4>
          <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.5; margin-bottom: 0.85rem;">
            ${item.message}
          </p>

          <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap:wrap;">
            <a href="${resolveLink(item.link)}" class="btn btn-primary btn-sm">${item.actionText}</a>
            ${item.isUnread ? `
              <button class="btn btn-outline btn-sm btn-mark-read" data-id="${item.id}" style="font-size:0.8rem;">
                পড়া হয়েছে চিহ্নিত করুন
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    `).join('');

    // Attach read click
    container.querySelectorAll('.btn-mark-read').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.target.getAttribute('data-id'), 10);
        const target = list.find(n => n.id === id);
        if (target) {
          target.isUnread = false;
          render();
          updateNavbarBadge();
          if (typeof showToast === 'function') {
            showToast('বিজ্ঞপ্তিটি পড়া হয়েছে চিহ্নিত করা হয়েছে।', 'info');
          }
        }
      });
    });
  }

  function updateNavbarBadge() {
    const unreadCount = list.filter(n => n.isUnread).length;
    const badges = document.querySelectorAll('.notification-pill');
    badges.forEach(badge => {
      if (unreadCount > 0) {
        badge.style.display = 'flex';
        badge.textContent = toBanglaDigits(unreadCount);
      } else {
        badge.style.display = 'none';
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category') || btn.getAttribute('data-filter') || 'all';
      render();
    });
  });

  window.filterNotifs = function(cat, btn) {
    filterBtns.forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    currentCategory = cat;
    render();
  };

  window.markAllRead = function() {
    list.forEach(n => n.isUnread = false);
    render();
    updateNavbarBadge();
    if (typeof showToast === 'function') {
      showToast('সবগুলো বিজ্ঞপ্তি পড়া হয়েছে চিহ্নিত করা হয়েছে।', 'success');
    }
  };

  markAllReadBtn?.addEventListener('click', window.markAllRead);

  render();
}

function toBanglaDigits(str) {
  if (str === null || str === undefined) return '';
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return str.toString().replace(/[0-9]/g, digit => banglaDigits[digit]);
}
