/**
 * NeuroSpark X — Core Interaction Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Clean URL Bar Normalizer (Removes .html extension instantly from URL bar if present)
  if (window.location.pathname.endsWith('.html')) {
    let clean = window.location.pathname.replace(/\.html$/, '/');
    if (clean === '/index/' || clean === 'index/') clean = '/';
    window.history.replaceState(null, '', clean + window.location.search + window.location.hash);
  }

  // 2. Intelligent Clean Page Link Handling
  // Ensures clicking a nav link to the current page smoothly scrolls to top or section,
  // preventing the "not opening the 2nd time" browser behavior.
  const currentCleanPath = window.location.pathname.replace(/\/+$/, '') || '/';

  document.querySelectorAll('a[href]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('javascript')) return;

      const [targetPage, targetHash] = href.split('#');
      const targetCleanPath = (targetPage || '').replace(/\/+$/, '') || '/';

      // If clicking the current page without a hash
      if ((targetCleanPath === currentCleanPath || (targetPage === '' && !targetHash)) && !targetHash) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.querySelector('.mobile-menu-drawer')?.classList.remove('active');
        return;
      }

      // If clicking an anchor on the current page
      if (targetHash && (targetCleanPath === currentCleanPath || targetPage === '')) {
        const targetEl = document.getElementById(targetHash);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
          history.pushState(null, null, `#${targetHash}`);
          document.querySelector('.mobile-menu-drawer')?.classList.remove('active');
        }
      }
    });
  });

  // 3. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu-drawer');
  const mobileClose = document.querySelector('.mobile-close-btn');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.add('active');
    });
  }
  if (mobileClose && mobileMenu) {
    mobileClose.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
    });
  }

  // 4. Lead Magnet Modal Handlers
  const leadMagnetModal = document.getElementById('lead-magnet-modal');
  const openLeadMagnetBtns = document.querySelectorAll('[data-open-lead-magnet]');
  const closeModals = document.querySelectorAll('[data-close-modal]');

  openLeadMagnetBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      leadMagnetModal?.classList.add('active');
    });
  });

  closeModals.forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.modal-overlay').forEach((m) => m.classList.remove('active'));
    });
  });

  // Close on backdrop click
  document.querySelectorAll('.modal-overlay').forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  });

  // 5. "ENTER THE SYSTEM" Diagnostic Modal
  const enterSystemBtns = document.querySelectorAll('[data-enter-system]');
  const systemModal = document.getElementById('system-diagnostic-modal');

  enterSystemBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      systemModal?.classList.add('active');
    });
  });

  // 6. Product Quick-View Modal
  const productModal = document.getElementById('product-detail-modal');
  window.openProductDetail = function (productId) {
    const prod = window.NeuroSparkData?.products?.find((p) => p.id === productId);
    if (!prod || !productModal) {
      window.location.href = `shop.html`;
      return;
    }

    const tagEl = document.getElementById('modal-prod-tag');
    const titleEl = document.getElementById('modal-prod-title');
    const priceEl = document.getElementById('modal-prod-price');
    const summaryEl = document.getElementById('modal-prod-summary');
    const whatEl = document.getElementById('modal-prod-what');
    const forEl = document.getElementById('modal-prod-for');
    const worksEl = document.getElementById('modal-prod-works');

    if (tagEl) tagEl.innerText = prod.tag || 'SYSTEM';
    if (titleEl) titleEl.innerText = prod.title;
    if (priceEl) priceEl.innerText = prod.price === 0 ? 'FREE' : `$${prod.price}`;
    if (summaryEl) summaryEl.innerText = prod.summary;
    if (whatEl) whatEl.innerText = prod.whatItIs;
    if (forEl) forEl.innerText = prod.whoItsFor;
    if (worksEl) worksEl.innerText = prod.howItWorks;

    const listContainer = document.getElementById('modal-prod-items');
    if (listContainer && prod.whatYouGet) {
      listContainer.innerHTML = prod.whatYouGet.map((item) => `<li><span style="color:var(--teal)">✦</span> ${item}</li>`).join('');
    }

    const buyBtn = document.getElementById('modal-prod-cta');
    if (buyBtn) {
      if (prod.price === 0) {
        buyBtn.innerText = 'CLAIM FREE LEAD MAGNET →';
        buyBtn.onclick = () => {
          productModal.classList.remove('active');
          leadMagnetModal?.classList.add('active');
        };
      } else {
        buyBtn.innerText = `ACCESS SYSTEM ($${prod.price}) →`;
        buyBtn.onclick = () => {
          addToCart(prod.title, prod.price);
          productModal.classList.remove('active');
        };
      }
    }

    productModal.classList.add('active');
  };

  // 7. Cart Management
  let cart = JSON.parse(localStorage.getItem('ns_cart') || '[]');
  const cartBadge = document.querySelector('.cart-badge');
  const cartBtn = document.getElementById('cart-toggle-btn');
  const cartDrawer = document.getElementById('cart-drawer');

  function updateCartBadge() {
    if (cartBadge) {
      cartBadge.innerText = cart.length;
      cartBadge.style.display = cart.length > 0 ? 'flex' : 'none';
    }
    localStorage.setItem('ns_cart', JSON.stringify(cart));
  }
  updateCartBadge();

  window.addToCart = function (title, price) {
    cart.push({ title, price });
    updateCartBadge();
    showToast(`Added to System Library: ${title}`);
  };

  if (cartBtn && cartDrawer) {
    cartBtn.addEventListener('click', () => {
      cartDrawer.classList.toggle('active');
      renderCart();
    });
  }

  function renderCart() {
    const list = document.getElementById('cart-items-list');
    const totalEl = document.getElementById('cart-total-amount');
    if (!list) return;

    if (cart.length === 0) {
      list.innerHTML = `<p style="text-align:center; padding: 40px 0; color: var(--text-muted);">Your library queue is empty.<br>Explore the Shop to unlock systems.</p>`;
      if (totalEl) totalEl.innerText = '$0';
      return;
    }

    let sum = 0;
    list.innerHTML = cart
      .map((item, idx) => {
        sum += item.price;
        return `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:12px; background:rgba(255,255,255,0.03); border-radius:8px; margin-bottom:8px;">
          <div>
            <div style="font-weight:600; font-size:0.9rem; color:var(--soft-white);">${item.title}</div>
            <div style="font-size:0.8rem; color:var(--teal); font-family:var(--font-mono);">$${item.price}</div>
          </div>
          <button onclick="removeFromCart(${idx})" style="background:none; border:none; color:var(--text-subtle); cursor:pointer; padding:6px;">✕</button>
        </div>
      `;
      })
      .join('');

    if (totalEl) totalEl.innerText = `$${sum}`;
  }

  window.removeFromCart = function (index) {
    cart.splice(index, 1);
    updateCartBadge();
    renderCart();
  };

  // 8. Toast Notifications
  function showToast(message) {
    const toast = document.createElement('div');
    toast.style.position = 'fixed';
    toast.style.bottom = '24px';
    toast.style.right = '24px';
    toast.style.background = '#0F101A';
    toast.style.border = '1px solid var(--teal)';
    toast.style.borderRadius = '8px';
    toast.style.padding = '14px 20px';
    toast.style.color = '#F8FAFC';
    toast.style.fontFamily = 'var(--font-main)';
    toast.style.fontSize = '0.9rem';
    toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.8), 0 0 20px var(--teal-glow)';
    toast.style.zIndex = '9999';
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    toast.style.gap = '10px';
    toast.innerHTML = `<span style="color:var(--teal); font-size:1.1rem;">⚡</span> ${message}`;

    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  }

  // 9. Podcast Audio Demo Player
  let isPlaying = false;
  window.toggleAudioPlay = function (btn, title) {
    isPlaying = !isPlaying;
    const icon = btn.querySelector('.play-icon');
    if (isPlaying) {
      if (icon) icon.innerText = '⏸';
      showToast(`Now Streaming: ${title}`);
    } else {
      if (icon) icon.innerText = '▶';
    }
  };

  // 10. Newsletter Form Submit
  const newsletterForms = document.querySelectorAll('.newsletter-form-action');
  newsletterForms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && input.value) {
        showToast(`Signal Connected: Welcome ${input.value}. Lead magnets queued!`);
        input.value = '';
        leadMagnetModal?.classList.add('active');
      }
    });
  });

  // 11. Homepage Featured Products with Visual Mockups
  const homeProdsEl = document.getElementById('homepage-featured-products');
  if (homeProdsEl && window.NeuroSparkData && window.NeuroSparkData.products) {
    const featured = window.NeuroSparkData.products.filter(p => ['prod-1', 'prod-2', 'prod-5'].includes(p.id));
    homeProdsEl.innerHTML = featured.map(prod => `
      <div class="product-card">
        <div class="product-card-visual" onclick="window.location.href='product.html?id=${prod.id}'">
          <div class="product-ribbon ${prod.price === 0 ? 'gold' : ''}">${prod.ribbonText || prod.badge}</div>
          ${window.NeuroSparkData.getProductVisual ? window.NeuroSparkData.getProductVisual(prod.id) : ''}
          <div class="product-card-format-badge">${prod.format ? prod.format.split('+')[0].trim() : 'System Module'}</div>
        </div>

        <div class="product-card-body">
          <div>
            <div class="product-card-tag">${prod.tag}</div>
            <h3 class="product-card-title">
              <a href="product.html?id=${prod.id}">
                ${prod.title}
              </a>
            </h3>
            <p class="product-card-summary">${prod.summary}</p>
          </div>

          <div class="product-card-footer">
            <div>
              <div style="font-family: var(--font-mono); font-size: 1.35rem; font-weight: 700; color: ${prod.price === 0 ? 'var(--teal)' : 'var(--gold)'};">
                ${prod.price === 0 ? 'FREE' : `$${prod.price}`}
              </div>
              ${prod.originalPrice ? `<span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-subtle); text-decoration: line-through;">$${prod.originalPrice}</span>` : ''}
            </div>
            <div style="display: flex; gap: 8px;">
              <a href="product.html?id=${prod.id}" class="btn btn-glass" style="padding: 8px 14px; font-size: 0.75rem;">
                VIEW SYSTEM →
              </a>
              <button class="btn btn-gold" onclick="addToCart('${prod.title}', ${prod.price})" style="padding: 8px 12px; font-size: 0.75rem;" title="Add to Cart">
                + CART
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }
});
