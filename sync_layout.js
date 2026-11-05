const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\hp\\.gemini\\antigravity\\scratch\\neurospark-x';

function getHeader(activePage) {
  return `  <!-- Header -->
  <header class="site-header">
    <div class="container nav-inner">
      <a href="index.html" class="brand-logo">
        <span class="brand-icon">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <path d="M16 0L17.5 12.5L28 6L19.5 15.5L32 16L19.5 16.5L28 26L17.5 19.5L16 32L14.5 19.5L4 26L12.5 16.5L0 16L12.5 15.5L4 6L14.5 12.5L16 0Z" fill="url(#star-grad)"/>
            <circle cx="16" cy="16" r="3" fill="#F8FAFC"/>
            <defs>
              <linearGradient id="star-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stop-color="#14B8A6"/>
                <stop offset="0.5" stop-color="#4F46E5"/>
                <stop offset="1" stop-color="#7C3AED"/>
              </linearGradient>
            </defs>
          </svg>
        </span>
        <span>NEUROSPARK <span class="logo-x">X</span></span>
      </a>

      <nav class="nav-menu">
        <!-- Explore -->
        <div class="nav-item ${activePage === 'explore' ? 'active' : ''}">
          <a href="explore.html" class="nav-link">
            Explore <span class="chevron">▼</span>
          </a>
          <div class="nav-dropdown">
            <a href="explore.html#philosophy" class="dropdown-item">
              <span class="icon">✧</span>
              <div>
                <span class="item-title">The Philosophy</span>
                <span class="item-desc">What NeuroSpark X believes</span>
              </div>
            </a>
            <a href="explore.html#ecosystem" class="dropdown-item">
              <span class="icon">☊</span>
              <div>
                <span class="item-title">The Ecosystem</span>
                <span class="item-desc">How the parts connect</span>
              </div>
            </a>
            <a href="explore.html#youniversity" class="dropdown-item">
              <span class="icon">🪷</span>
              <div>
                <span class="item-title">Youniversity</span>
                <span class="item-desc">Learning & transformation</span>
              </div>
            </a>
            <a href="explore.html#labs" class="dropdown-item">
              <span class="icon">⬡</span>
              <div>
                <span class="item-title">Digital Intelligence Labs</span>
                <span class="item-desc">AI, systems & apps</span>
              </div>
            </a>
          </div>
        </div>

        <!-- Shop -->
        <div class="nav-item ${activePage === 'shop' ? 'active' : ''}">
          <a href="shop.html" class="nav-link">
            Shop <span class="chevron">▼</span>
          </a>
          <div class="nav-dropdown">
            <a href="shop.html" class="dropdown-item">
              <span class="icon">◈</span>
              <div>
                <span class="item-title">All Products</span>
                <span class="item-desc">Complete marketplace</span>
              </div>
            </a>
            <a href="shop.html?cat=ai-tools" class="dropdown-item">
              <span class="icon">⚡</span>
              <div>
                <span class="item-title">AI & Tools</span>
                <span class="item-desc">Agents, prompts & models</span>
              </div>
            </a>
            <a href="shop.html?cat=systems" class="dropdown-item">
              <span class="icon">☍</span>
              <div>
                <span class="item-title">Systems</span>
                <span class="item-desc">Operating frameworks</span>
              </div>
            </a>
            <a href="shop.html?cat=learn" class="dropdown-item">
              <span class="icon">📖</span>
              <div>
                <span class="item-title">Learn</span>
                <span class="item-desc">Playbooks & guides</span>
              </div>
            </a>
            <a href="shop.html?cat=growth" class="dropdown-item">
              <span class="icon">✦</span>
              <div>
                <span class="item-title">Growth</span>
                <span class="item-desc">SoulMap & self-mastery</span>
              </div>
            </a>
            <a href="shop.html?cat=bundles" class="dropdown-item">
              <span class="icon">📦</span>
              <div>
                <span class="item-title">Bundles</span>
                <span class="item-desc">Complete suites</span>
              </div>
            </a>
            <a href="shop.html?cat=free" class="dropdown-item">
              <span class="icon">🎁</span>
              <div>
                <span class="item-title">Free Lead Magnets</span>
                <span class="item-desc">Instant system decodes</span>
              </div>
            </a>
          </div>
        </div>

        <!-- Learn -->
        <div class="nav-item ${activePage === 'learn' ? 'active' : ''}">
          <a href="learn.html" class="nav-link">
            Learn <span class="chevron">▼</span>
          </a>
          <div class="nav-dropdown">
            <a href="learn.html#playbooks" class="dropdown-item">
              <span class="icon">📖</span>
              <div>
                <span class="item-title">Playbooks</span>
                <span class="item-desc">Tactical blueprints</span>
              </div>
            </a>
            <a href="learn.html#courses" class="dropdown-item">
              <span class="icon">🎓</span>
              <div>
                <span class="item-title">Courses</span>
                <span class="item-desc">Full curriculums</span>
              </div>
            </a>
            <a href="learn.html#guides" class="dropdown-item">
              <span class="icon">🧭</span>
              <div>
                <span class="item-title">Guides & Manuals</span>
                <span class="item-desc">Field diagnostic guides</span>
              </div>
            </a>
            <a href="learn.html#workbooks" class="dropdown-item">
              <span class="icon">✍</span>
              <div>
                <span class="item-title">Workbooks</span>
                <span class="item-desc">Interactive exercises</span>
              </div>
            </a>
          </div>
        </div>

        <!-- Media -->
        <div class="nav-item ${activePage === 'media' ? 'active' : ''}">
          <a href="media.html" class="nav-link">
            Media <span class="chevron">▼</span>
          </a>
          <div class="nav-dropdown">
            <a href="media.html#blog" class="dropdown-item">
              <span class="icon">✍</span>
              <div>
                <span class="item-title">Blog / Signal Dispatch</span>
                <span class="item-desc">Articles & frameworks</span>
              </div>
            </a>
            <a href="media.html#podcast" class="dropdown-item">
              <span class="icon">🎙</span>
              <div>
                <span class="item-title">Podcast</span>
                <span class="item-desc">Conversations & decodes</span>
              </div>
            </a>
          </div>
        </div>

        <!-- About -->
        <div class="nav-item ${activePage === 'about' ? 'active' : ''}">
          <a href="about.html" class="nav-link">
            About <span class="chevron">▼</span>
          </a>
          <div class="nav-dropdown">
            <a href="about.html#story" class="dropdown-item">
              <span class="icon">🪐</span>
              <div>
                <span class="item-title">Our Story</span>
                <span class="item-desc">Origin & mission</span>
              </div>
            </a>
            <a href="about.html#movement" class="dropdown-item">
              <span class="icon">⚔</span>
              <div>
                <span class="item-title">The Movement</span>
                <span class="item-desc">Sovereign creators</span>
              </div>
            </a>
            <a href="about.html#contact" class="dropdown-item">
              <span class="icon">✉</span>
              <div>
                <span class="item-title">Contact Support</span>
                <span class="item-desc">Reach the team</span>
              </div>
            </a>
          </div>
        </div>
      </nav>

      <div class="nav-actions">
        <button class="nav-icon-btn" aria-label="Search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </button>
        <button id="cart-toggle-btn" class="nav-icon-btn" aria-label="Library Cart">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          <span class="cart-badge">0</span>
        </button>
        <button class="nav-icon-btn" data-open-lead-magnet title="Claim Free Lead Magnets">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
        </button>
        <a href="dashboard.html" class="user-avatar-pill ${activePage === 'dashboard' ? 'active-avatar' : ''}" title="My NeuroSpark X — Personal Constellation" style="${activePage === 'dashboard' ? 'box-shadow: 0 0 15px var(--teal); border-color: var(--teal);' : ''}">Z</a>
        <button class="btn-cta-system" data-enter-system>ENTER THE SYSTEM</button>
        <button class="mobile-nav-toggle" aria-label="Open Navigation">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile Drawer Menu -->
  <div class="modal-overlay mobile-menu-drawer">
    <div class="modal-card" style="max-width:320px; height:100vh; position:fixed; right:0; top:0; border-radius:0; padding:30px;">
      <button class="modal-close-btn mobile-close-btn">✕</button>
      <div style="margin-bottom:30px;"><span class="brand-logo">NEUROSPARK <span class="logo-x">X</span></span></div>
      <div style="display:flex; flex-direction:column; gap:20px; font-size:1.1rem; font-family:var(--font-display);">
        <a href="index.html" ${activePage === 'home' ? 'style="color:var(--teal);"' : ''}>Home</a>
        <a href="explore.html" ${activePage === 'explore' ? 'style="color:var(--teal);"' : ''}>Explore</a>
        <a href="shop.html" ${activePage === 'shop' ? 'style="color:var(--teal);"' : ''}>Shop</a>
        <a href="learn.html" ${activePage === 'learn' ? 'style="color:var(--teal);"' : ''}>Learn</a>
        <a href="media.html" ${activePage === 'media' ? 'style="color:var(--teal);"' : ''}>Media</a>
        <a href="about.html" ${activePage === 'about' ? 'style="color:var(--teal);"' : ''}>About</a>
        <a href="dashboard.html" ${activePage === 'dashboard' ? 'style="color:var(--teal);"' : ''}>My Constellation</a>
      </div>
      <div style="margin-top:40px;"><button class="btn btn-gold" style="width:100%;" data-enter-system>ENTER THE SYSTEM</button></div>
    </div>
  </div>`;
}

function getFooter() {
  return `  <!-- Footer with User's Telegram & WhatsApp Links -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-lead-magnets">
        <div class="lead-magnet-card telegram">
          <div class="lead-icon-box">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
          </div>
          <div class="lead-info">
            <h4>OFFICIAL TELEGRAM CHANNEL</h4>
            <h3>OfficialNeuroSparkX</h3>
            <p>Get instant access to free lead magnets, secret signal drops & weekly system decodes directly in your Telegram.</p>
            <a href="https://t.me/OfficialNeuroSparkX" target="_blank" class="lead-btn">JOIN TELEGRAM →</a>
          </div>
        </div>

        <div class="lead-magnet-card whatsapp">
          <div class="lead-icon-box">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </div>
          <div class="lead-info">
            <h4>OFFICIAL WHATSAPP COMMUNITY</h4>
            <h3>VIP Inner Circle</h3>
            <p>Join our private VIP inner circle, receive automated welcome lead magnets & engage in live mastermind chats.</p>
            <a href="https://chat.whatsapp.com/E5URnI6QwEhCdLUXCduRqw?s=cl&p=i&mlu=4&ilr=4" target="_blank" class="lead-btn">JOIN WHATSAPP →</a>
          </div>
        </div>
      </div>

      <div class="footer-main-grid">
        <div class="footer-brand">
          <a href="index.html" class="brand-logo">
            <span class="brand-icon">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                <path d="M16 0L17.5 12.5L28 6L19.5 15.5L32 16L19.5 16.5L28 26L17.5 19.5L16 32L14.5 19.5L4 26L12.5 16.5L0 16L12.5 15.5L4 6L14.5 12.5L16 0Z" fill="url(#star-grad)"/>
              </svg>
            </span>
            <span>NEUROSPARK <span class="logo-x">X</span></span>
          </a>
          <p>We help you decode the hidden systems shaping your life and build the future you're here to create.</p>
          <div class="footer-socials">
            <a href="https://t.me/OfficialNeuroSparkX" target="_blank" class="social-link" title="Telegram"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.87 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.46c.536-.195 1.006.128.824.94z"/></svg></a>
            <a href="https://chat.whatsapp.com/E5URnI6QwEhCdLUXCduRqw?s=cl&p=i&mlu=4&ilr=4" target="_blank" class="social-link" title="WhatsApp"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 0C5.394 0 0 5.394 0 12.031c0 2.119.55 4.186 1.597 6.002L.057 24l6.14-1.61c1.745.952 3.714 1.453 5.834 1.453 6.637 0 12.031-5.394 12.031-12.031S18.668 0 12.031 0zm0 21.968c-1.898 0-3.754-.51-5.37-1.472l-.385-.228-3.642.955.972-3.55-.25-.398A9.92 9.92 0 012.08 12.03c0-5.487 4.464-9.951 9.951-9.951 5.487 0 9.951 4.464 9.951 9.951 0 5.487-4.464 9.951-9.951 9.951z"/></svg></a>
            <a href="#" class="social-link" title="X (Twitter)">𝕏</a>
            <a href="#" class="social-link" title="YouTube">▶</a>
            <a href="#" class="social-link" title="LinkedIn">in</a>
          </div>
        </div>

        <div class="footer-col">
          <h5>EXPLORE</h5>
          <ul class="footer-links">
            <li><a href="explore.html#philosophy">The Philosophy</a></li>
            <li><a href="explore.html#ecosystem">The Ecosystem</a></li>
            <li><a href="explore.html#youniversity">Youniversity</a></li>
            <li><a href="explore.html#labs">Digital Intelligence Labs</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h5>SHOP</h5>
          <ul class="footer-links">
            <li><a href="shop.html">All Products</a></li>
            <li><a href="shop.html?cat=ai-tools">AI & Tools</a></li>
            <li><a href="shop.html?cat=systems">Systems</a></li>
            <li><a href="shop.html?cat=bundles">Bundles</a></li>
            <li><a href="shop.html?cat=free">Free Magnets</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h5>LEARN</h5>
          <ul class="footer-links">
            <li><a href="learn.html#courses">Courses</a></li>
            <li><a href="learn.html#playbooks">Playbooks</a></li>
            <li><a href="learn.html#guides">Guides</a></li>
            <li><a href="learn.html#workbooks">Workbooks</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h5>MEDIA</h5>
          <ul class="footer-links">
            <li><a href="media.html#blog">Blog</a></li>
            <li><a href="media.html#podcast">Podcast</a></li>
            <li><a href="media.html#newsletter">Signal Dispatch</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h5>ABOUT</h5>
          <ul class="footer-links">
            <li><a href="about.html#story">Our Story</a></li>
            <li><a href="about.html#movement">The Movement</a></li>
            <li><a href="about.html#contact">Contact</a></li>
            <li><a href="404.html">404 Demo</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <div>© 2026 NeuroSpark X. All Rights Reserved.</div>
        <div class="footer-legal-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="about.html#contact">Support</a>
        </div>
      </div>
    </div>
  </footer>`;
}

// Update explore.html
let exploreHtml = fs.readFileSync(path.join(dir, 'explore.html'), 'utf8');
exploreHtml = exploreHtml.replace(/<!-- Header -->[\s\S]*?<\/div>\s*<\/div>\s*<\/header>/, getHeader('explore'));
// Also replace mobile drawer if needed
exploreHtml = exploreHtml.replace(/<footer class="site-footer">[\s\S]*?<\/footer>/, getFooter());
fs.writeFileSync(path.join(dir, 'explore.html'), exploreHtml, 'utf8');

// Update shop.html
let shopHtml = fs.readFileSync(path.join(dir, 'shop.html'), 'utf8');
shopHtml = shopHtml.replace(/<footer class="site-footer">[\s\S]*?<\/footer>/, getFooter());
fs.writeFileSync(path.join(dir, 'shop.html'), shopHtml, 'utf8');

// Update learn.html
let learnHtml = fs.readFileSync(path.join(dir, 'learn.html'), 'utf8');
learnHtml = learnHtml.replace(/<footer class="site-footer">[\s\S]*?<\/footer>/, getFooter());
fs.writeFileSync(path.join(dir, 'learn.html'), learnHtml, 'utf8');

// Update media.html
let mediaHtml = fs.readFileSync(path.join(dir, 'media.html'), 'utf8');
mediaHtml = mediaHtml.replace(/<footer class="site-footer">[\s\S]*?<\/footer>/, getFooter());
fs.writeFileSync(path.join(dir, 'media.html'), mediaHtml, 'utf8');

// Update about.html
let aboutHtml = fs.readFileSync(path.join(dir, 'about.html'), 'utf8');
aboutHtml = aboutHtml.replace(/<footer class="site-footer">[\s\S]*?<\/footer>/, getFooter());
fs.writeFileSync(path.join(dir, 'about.html'), aboutHtml, 'utf8');

// Update dashboard.html
let dashHtml = fs.readFileSync(path.join(dir, 'dashboard.html'), 'utf8');
dashHtml = dashHtml.replace(/<footer class="site-footer">[\s\S]*?<\/footer>/, getFooter());
fs.writeFileSync(path.join(dir, 'dashboard.html'), dashHtml, 'utf8');

console.log('Layout synchronized across all pages!');
