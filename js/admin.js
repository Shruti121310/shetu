/**
 * সেতু (Shetu) - Admin Dashboard Controller
 * Handles administration moderation mock actions (Approve, Reject, Remove, Suspend)
 */

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('adminDashboardContainer')) {
    initAdminDashboard();
  }
});

function initAdminDashboard() {
  // 1. Listings Table Actions
  document.querySelectorAll('.btn-admin-approve').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const row = e.target.closest('tr');
      const statusCell = row.querySelector('.listing-status-cell');
      if (statusCell) {
        statusCell.innerHTML = '<span class="status-pill pill-available">অনুমোদিত</span>';
      }
      e.target.disabled = true;
      e.target.textContent = 'অনুমোদিত';
      showToast('লিস্টিংটি সফলভাবে অনুমোদন করা হয়েছে।', 'success');
    });
  });

  document.querySelectorAll('.btn-admin-reject').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const row = e.target.closest('tr');
      const statusCell = row.querySelector('.listing-status-cell');
      if (statusCell) {
        statusCell.innerHTML = '<span class="status-pill pill-expired">প্রত্যাখ্যাত</span>';
      }
      e.target.parentElement.innerHTML = '<span class="badge badge-danger">বাতিলকৃত</span>';
      showToast('লিস্টিংটি প্রত্যাখ্যান করা হয়েছে।', 'warning');
    });
  });

  document.querySelectorAll('.btn-admin-delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (confirm('আপনি কি এই লিস্টিংটি প্ল্যাটফর্ম থেকে সম্পূর্ণ সরিয়ে দিতে চান?')) {
        const row = e.target.closest('tr');
        row.remove();
        showToast('লিস্টিংটি প্ল্যাটফর্ম থেকে মুছে দেওয়া হয়েছে।', 'danger');
      }
    });
  });

  // 2. User Suspend Action
  document.querySelectorAll('.btn-user-suspend').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const row = e.target.closest('tr');
      const userName = row.querySelector('.user-name-cell')?.textContent || 'ব্যবহারকারী';
      if (confirm(`আপনি কি "${userName}" অ্যাকাউন্টটি সাময়িকভাবে স্থগিত করতে চান?`)) {
        const statusCell = row.querySelector('.user-status-cell');
        if (statusCell) {
          statusCell.innerHTML = '<span class="badge badge-danger">স্থগিত</span>';
        }
        btn.textContent = 'পুনর্বহাল করুন';
        btn.classList.replace('btn-danger', 'btn-outline-primary');
        showToast(`ব্যবহারকারী "${userName}" সফলভাবে স্থগিত করা হয়েছে।`, 'warning');
      }
    });
  });

  // 3. Report Resolution
  document.querySelectorAll('.btn-report-resolve').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const row = e.target.closest('tr');
      const statusCell = row.querySelector('.report-status-cell');
      if (statusCell) {
        statusCell.innerHTML = '<span class="badge badge-success">মীমাংসিত</span>';
      }
      e.target.disabled = true;
      e.target.textContent = 'সমাধান হয়েছে';
      showToast('রিপোর্টটি সফলভাবে মীমাংসা করা হয়েছে।', 'success');
    });
  });
}
