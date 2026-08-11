// AgentMoss Website - Interactive Features
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const toggle = document.querySelector('.navbar-mobile-toggle');
  const menu = document.querySelector('.navbar-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('mobile-open');
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const navbarH = 60;
          const top = target.getBoundingClientRect().top + window.scrollY - navbarH - 8;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

  // Tab system (if any page uses tabs)
  document.querySelectorAll('.tabs').forEach(tabsEl => {
    const tabs = tabsEl.querySelectorAll('.tab');
    const panels = tabsEl.parentElement.querySelectorAll('.tab-panel');
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        if (panels[i]) panels[i].classList.add('active');
      });
    });
  });

  // Sidebar active state on scroll
  const sidebarItems = document.querySelectorAll('.sidebar-item');
  const detailSections = document.querySelectorAll('.detail-section');
  if (sidebarItems.length > 0 && detailSections.length > 0) {
    const updateActive = () => {
      const navbarH = 80;
      let currentSection = detailSections[0];
      for (const section of detailSections) {
        const rect = section.getBoundingClientRect();
        if (rect.top - navbarH <= 0) {
          currentSection = section;
        }
      }
      const targetId = currentSection.getAttribute('id');
      sidebarItems.forEach(item => {
        item.classList.remove('active');
        const href = item.getAttribute('href');
        if (href === '#' + targetId) {
          item.classList.add('active');
        }
      });
    };
    let scrollTimer = null;
    window.addEventListener('scroll', () => {
      if (scrollTimer) cancelAnimationFrame(scrollTimer);
      scrollTimer = requestAnimationFrame(updateActive);
    });
    updateActive();
  }

  // Category card hover effect
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'all 0.3s ease';
    });
  });
});
