/**
 * সেতু (Shetu) - Dashboard & Volunteer Dashboard Controller
 * Handles user overview, donation lists, borrowed books tracking,
 * volunteer task acceptance, and point redemption.
 */

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('userDashboardWrapper')) {
    initUserDashboard();
  }
  if (document.getElementById('volunteerDashboardWrapper')) {
    initVolunteerDashboard();
  }
});

function initUserDashboard() {
  const sidebarLinks = document.querySelectorAll('.dashboard-nav-item');
  const sections = document.querySelectorAll('.dashboard-view-section');

  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('data-target');
      
      sidebarLinks.forEach(l => l.classList.remove('active'));
      sections.forEach(s => s.style.display = 'none');

      link.classList.add('active');
      const targetSec = document.getElementById(targetId);
      if (targetSec) {
        targetSec.style.display = 'block';
      }
    });
  });

  // Cancel / Complete donation demo buttons
  document.querySelectorAll('.btn-action-cancel')?.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const row = e.target.closest('tr');
      if (confirm('আপনি কি এই লিস্টিংটি বাতিল করতে চান?')) {
        row.style.opacity = '0.4';
        e.target.parentElement.innerHTML = '<span class="badge badge-danger">বাতিল</span>';
        showToast('লিস্টিংটি বাতিল করা হয়েছে।', 'info');
      }
    });
  });
}

function initVolunteerDashboard() {
  // 1. Accept Task Button
  const acceptTaskBtns = document.querySelectorAll('.btn-accept-task');
  acceptTaskBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const taskCard = e.target.closest('.volunteer-task-card');
      const taskId = taskCard?.getAttribute('data-task-id') || 'VOL-101';
      
      btn.disabled = true;
      btn.textContent = 'চলমান...';
      btn.classList.remove('btn-primary');
      btn.classList.add('btn-outline');

      showToast(`আপনি কাজ #${taskId} গ্রহণ করেছেন! সংগ্রহকারী দাতার সাথে যোগাযোগের নম্বর উন্মুক্ত হয়েছে।`, 'success');

      // Move or update card status
      const badge = taskCard.querySelector('.task-status-pill');
      if (badge) {
        badge.className = 'status-pill pill-reserved';
        badge.textContent = 'আপনার দায়িত্বে';
      }
    });
  });

  // 2. Complete Delivery Button
  const completeDeliveryBtns = document.querySelectorAll('.btn-complete-delivery');
  completeDeliveryBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.delivery-item-card');
      btn.disabled = true;
      btn.textContent = 'সম্পন্ন ✅';
      card.style.border = '2px solid var(--success)';
      showToast('অভিনন্দন! ডেলিভারি সম্পন্ন হয়েছে এবং আপনার অ্যাকাউন্টে ৪০ পয়েন্ট যোগ করা হয়েছে! 🌟', 'success');

      // Update Points Counter
      const pointsEl = document.getElementById('volunteerPointsCounter');
      if (pointsEl) {
        pointsEl.textContent = '৩৮০ পয়েন্ট';
      }
    });
  });

  // 3. Redeem Voucher Buttons
  const redeemBtns = document.querySelectorAll('.btn-redeem-reward');
  redeemBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const cost = parseInt(btn.getAttribute('data-points-cost') || '300', 10);
      const rewardTitle = btn.getAttribute('data-reward-title') || 'ভাউচার';

      if (cost > 340) {
        showToast(`দুঃখিত! এই ভাউচারের জন্য ${toBanglaDigits(cost)} পয়েন্ট প্রয়োজন। আপনার বর্তমান পয়েন্ট ৩৪০।`, 'warning');
      } else {
        btn.disabled = true;
        btn.textContent = 'রিডিম সম্পন্ন';
        btn.classList.replace('btn-primary', 'btn-outline');
        showToast(`অভিনন্দন! আপনার ${rewardTitle} রিডিম কোড: SHETU-${Math.floor(1000 + Math.random() * 9000)}। মেসেজে পাঠানো হয়েছে।`, 'success');
        
        const pointsEl = document.getElementById('volunteerPointsCounter');
        if (pointsEl) {
          const remaining = 340 - cost;
          pointsEl.textContent = `${toBanglaDigits(remaining)} পয়েন্ট`;
        }
      }
    });
  });
}

function toBanglaDigits(str) {
  if (str === null || str === undefined) return '';
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return str.toString().replace(/[0-9]/g, digit => banglaDigits[digit]);
}
