/* Shared shell: sidebar + topbar
   Each page calls renderShell({ active, page, crumb })
*/

const ICONS = {
  dashboard: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>',
  map: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>',
  box: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
  tag: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
  users: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  report: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
  settings: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  bell: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
  search: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  help: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  logo: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L3 7v6c0 5 3.8 8.7 9 10 5.2-1.3 9-5 9-10V7l-9-5z"/><path d="M8 12l3 3 5-6"/></svg>',
};

const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', href: 'dashboard.html', icon: 'dashboard' },
  { key: 'peta', label: 'Peta Stok', href: 'peta-stok.html', icon: 'map' },
  { key: 'bahan', label: 'Bahan Baku', href: 'bahan-baku.html', icon: 'box', badge: '5' },
  { key: 'kategori', label: 'Kategori', href: '#', icon: 'tag' },
  { key: 'pj', label: 'PJ Wilayah', href: '#', icon: 'users' },
  { key: 'laporan', label: 'Laporan', href: 'laporan.html', icon: 'report' },
];

function renderShell({ active, page, crumb = 'Sistem Pemetaan Bahan Baku' }) {
  document.title = page + ' — MBG Bondowoso';

  const sidebar = `
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-mark">${ICONS.logo}</div>
        <div class="brand-text">
          <span class="t">MBG Bondowoso</span>
          <span class="s">Sistem Pemetaan</span>
        </div>
      </div>
      <nav class="nav">
        <div class="nav-group-label">Menu Utama</div>
        ${NAV_ITEMS.map(it => `
          <a href="${it.href}" class="nav-item ${it.key === active ? 'active' : ''}">
            ${ICONS[it.icon]}
            <span>${it.label}</span>
            ${it.badge ? `<span class="badge">${it.badge}</span>` : ''}
          </a>
        `).join('')}
        <div class="nav-group-label">Sistem</div>
        <a href="#" class="nav-item">${ICONS.settings}<span>Pengaturan</span></a>
        <a href="#" class="nav-item">${ICONS.help}<span>Bantuan</span></a>
      </nav>
      <div class="sidebar-footer">
        <div class="org">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
          Dinas Ketahanan Pangan
        </div>
        Pemerintah Kabupaten Bondowoso
      </div>
    </aside>
  `;

  const topbar = `
    <header class="topbar">
      <div class="topbar-title">
        <span class="crumb">${crumb}</span>
        <span class="page">${page}</span>
      </div>
      <div class="topbar-right">
        <div class="topbar-search">
          ${ICONS.search}
          <input placeholder="Cari bahan baku, kecamatan, PJ..." />
        </div>
        <button class="icon-btn" title="Bantuan">${ICONS.help}</button>
        <button class="icon-btn" title="Notifikasi">
          ${ICONS.bell}
          <span class="dot"></span>
        </button>
        <div class="profile">
          <div class="avatar">SR</div>
          <div class="who">
            <span class="n">Sri Rahayu</span>
            <span class="r">Admin Dinas</span>
          </div>
        </div>
      </div>
    </header>
  `;

  document.querySelector('.app').insertAdjacentHTML('afterbegin', sidebar + topbar);
}
