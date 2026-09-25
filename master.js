/* ============================================================
   POSTIFY STUDIO — MASTER JAVASCRIPT
   Handles Navbar, Stats Counters, 3D Globe, Pricing Switcher,
   Scroll Reveals, FAQs, and Interactive 3D Effects.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ===== 1. NAVBAR SCROLL & MOBILE MENU =====
    const navbar = document.getElementById('navbar');
    const navHamburger = document.getElementById('navHamburger');
    const navLinks = document.getElementById('navLinks');

    if (navbar) {
        const handleScroll = () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
    }

    if (navHamburger && navLinks) {
        navHamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            navHamburger.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        // Close mobile nav on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navHamburger.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });

        // Close mobile nav on outside click
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !navHamburger.contains(e.target)) {
                navHamburger.classList.remove('active');
                navLinks.classList.remove('open');
            }
        });
    }

    // ===== 2. SCROLL REVEAL OBSERVER =====
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // ===== 3. STATS NUMBER COUNTERS =====
    const statElements = document.querySelectorAll('.stat-num[data-target]');
    if (statElements.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'), 10);
                const suffix = el.getAttribute('data-suffix') || '';
                const duration = 1400; // ms
                const startTime = performance.now();

                function updateCount(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    // Ease out expo
                    const easeVal = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                    const currentVal = Math.floor(easeVal * target);

                    el.textContent = currentVal + suffix;

                    if (progress < 1) {
                        requestAnimationFrame(updateCount);
                    } else {
                        el.textContent = target + suffix;
                    }
                }

                requestAnimationFrame(updateCount);
                counterObserver.unobserve(el);
            });
        }, { threshold: 0.4 });

        statElements.forEach(el => counterObserver.observe(el));
    }

    // ===== 4. HERO 3D CARDS TILT INTERACTION =====
    const heroSection = document.getElementById('hero');
    const heroCards = document.querySelectorAll('.hv-card');

    if (heroSection && heroCards.length > 0 && window.innerWidth > 992) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            heroCards.forEach(card => {
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
        });

        heroSection.addEventListener('mouseleave', () => {
            heroCards.forEach(card => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            });
        });
    }

    // ===== 5. PRICING DURATION SWITCHER =====
    (function initPricing() {
        const plans = {
            starter: {
                monthly: { price: '3,000', period: '/month' },
                '3mo': { price: '3,000', period: '/month' },
                '6mo': { price: '3,000', period: '/month' }
            },
            builder: {
                monthly: { price: '8,000', period: '/month' },
                '3mo': { price: '7,333', period: '/month', total: '₹22,000 billed quarterly', save: 'Save ₹2,000', bonus: '<i class="fa-solid fa-gift"></i> Bonus: Free Business Consulting included' },
                '6mo': { price: '7,000', period: '/month', total: '₹42,000 billed semi-annually', save: 'Save ₹6,000', bonus: '<i class="fa-solid fa-gift"></i> Bonus: Your Own Webpage included' }
            },
            dominator: {
                monthly: { price: '12,000', period: '/month' },
                '3mo': { price: '11,000', period: '/month', total: '₹33,000 billed quarterly', save: 'Save ₹3,000', bonus: '<i class="fa-solid fa-gift"></i> Bonus: Own Webpage + Camera/Model Shoot' },
                '6mo': { price: '10,666', period: '/month', total: '₹64,000 billed semi-annually', save: 'Save ₹8,000', bonus: '<i class="fa-solid fa-gift"></i> Bonus: Own Webpage + Influencer Collaboration Reel' }
            }
        };

        const options = document.querySelectorAll('.dur-option');
        const slider = document.getElementById('durSlider');
        const subEl = document.getElementById('durationSub');
        let currentDur = 'monthly';

        function updateSlider() {
            const active = document.querySelector('.dur-option.active');
            if (!active || !slider) return;
            slider.style.width = active.offsetWidth + 'px';
            slider.style.left = active.offsetLeft + 'px';
        }

        function updatePrices(dur) {
            const planKeys = Object.keys(plans);
            for (let k = 0; k < planKeys.length; k++) {
                const planKey = planKeys[k];
                const plan = plans[planKey];
                const data = plan[dur] || plan.monthly;
                const isFallback = !plan[dur];

                const priceEl = document.getElementById(planKey + 'Price');
                const savingsEl = document.getElementById(planKey + 'Savings');
                const totalEl = document.getElementById(planKey + 'Total');
                const bonusEl = document.getElementById(planKey + 'Bonus');
                const originalEl = document.getElementById(planKey + 'Original');

                if (priceEl) priceEl.textContent = data.price;

                if (savingsEl) {
                    if (data.save && !isFallback) {
                        savingsEl.textContent = data.save;
                        savingsEl.classList.remove('dur-hide');
                    } else {
                        savingsEl.classList.add('dur-hide');
                    }
                }

                if (totalEl) {
                    if (data.total && !isFallback) {
                        totalEl.textContent = data.total;
                        totalEl.classList.remove('dur-hide');
                    } else {
                        totalEl.classList.add('dur-hide');
                    }
                }

                if (bonusEl) {
                    if (data.bonus && !isFallback) {
                        bonusEl.innerHTML = data.bonus;
                        bonusEl.classList.remove('dur-hide');
                    } else {
                        bonusEl.classList.add('dur-hide');
                    }
                }

                if (originalEl) {
                    if (dur !== 'monthly' && !isFallback && data.price !== plan.monthly.price) {
                        originalEl.textContent = '₹' + plan.monthly.price + '/month';
                        originalEl.classList.remove('dur-hide');
                    } else {
                        originalEl.classList.add('dur-hide');
                    }
                }
            }

            if (subEl) {
                if (dur === 'monthly') {
                    subEl.innerHTML = 'Flexible monthly plans. Cancel anytime.';
                } else if (dur === '3mo') {
                    subEl.innerHTML = '<span class="save-highlight"><i class="fa-solid fa-tag"></i> Commit 3 months & unlock bonus perks</span>';
                } else {
                    subEl.innerHTML = '<span class="save-highlight"><i class="fa-solid fa-tag"></i> Commit 6 months & maximize your savings</span>';
                }
            }
        }

        options.forEach(opt => {
            opt.addEventListener('click', () => {
                const dur = opt.getAttribute('data-dur');
                if (dur === currentDur) return;
                currentDur = dur;
                options.forEach(o => o.classList.remove('active'));
                opt.classList.add('active');
                updateSlider();
                updatePrices(dur);
            });
        });

        updateSlider();
        window.addEventListener('resize', updateSlider);
    })();

    // ===== 6. 3D GLOBE TESTIMONIALS =====
    (function initGlobe() {
        const testimonials = [
            {
                text: "Since Postify took over our social media, our video quality and reel editing have reached an entirely new standard. What impressed me most is their Meta Ads management—we are consistently getting genuine, high-intent inquiries for laptops rather than spam leads. Their ROI focus is unmatched.",
                name: "Shiv Enterprise (Laptopworld)",
                initial: "S",
                avatarGrad: "linear-gradient(135deg, #0284c7, #0369a1)",
                avatarTextColor: "#fff",
                badge: "Tech Retail",
                badgeIcon: "fa-solid fa-laptop"
            },
            {
                text: "We've run our optical store for 25 years with virtually zero digital presence. Postify stepped in with their starter package and completely transformed how we showcase our frames and brand. Today, they've even coached me to create my own reels with confidence—local customers now walk in recognizing our store from Instagram!",
                name: "Zaveri Optical",
                initial: "Z",
                avatarGrad: "linear-gradient(135deg, #0d9488, #115e59)",
                avatarTextColor: "#fff",
                badge: "Eyewear",
                badgeIcon: "fa-solid fa-glasses"
            },
            {
                text: "Launching a new ladies' boutique in a competitive market was challenging, but Postify built us an authoritative social presence from day one. Their targeted ad campaigns and aesthetic reels translate directly into real walk-in footfall at our store every single week. They don't just post—they drive actual sales.",
                name: "Sakhi Fashion",
                initial: "S",
                avatarGrad: "linear-gradient(135deg, #f43f5e, #be123c)",
                avatarTextColor: "#fff",
                badge: "Fashion",
                badgeIcon: "fa-solid fa-bag-shopping"
            },
            {
                text: "I run a home-based studio and used to struggle with amateur content. Postify's starter package gave my profile an ultra-luxurious, boutique identity that immediately attracted high-paying clients. Their video editing is genuinely breathtaking! Devbhai treats small businesses with so much personal care and patience—I couldn't have asked for a better partner.",
                name: "Noor Beauty Care",
                initial: "N",
                avatarGrad: "linear-gradient(135deg, #ec4899, #a21caf)",
                avatarTextColor: "#fff",
                badge: "Beauty Care",
                badgeIcon: "fa-solid fa-spa"
            },
            {
                text: "I had massive camera anxiety and never imagined speaking on video. Postify's production team coached me on-set and guided every frame with ease. Our very first reel clocked 3x our usual views! Devbhai possesses a rare understanding of storytelling and knows exactly how to position a local salon as a standout premium brand.",
                name: "A-One Salon",
                initial: "A",
                avatarGrad: "linear-gradient(135deg, #8b5cf6, #4c1d95)",
                avatarTextColor: "#fff",
                badge: "Grooming",
                badgeIcon: "fa-solid fa-scissors"
            },
            {
                text: "For our brand launch, Postify took complete charge of everything—from hiring professional models and directing 4K camera shoots to crafting a viral rollout roadmap. Within month one, multiple reels crossed 5x to 6x our industry's standard view counts, establishing instant credibility and brand authority in Ahmedabad.",
                name: "India Salon",
                initial: "I",
                avatarGrad: "linear-gradient(135deg, #f59e0b, #b45309)",
                avatarTextColor: "#fff",
                badge: "Brand Launch",
                badgeIcon: "fa-solid fa-wand-magic-sparkles"
            },
            {
                text: "Since Postify optimized our Instagram presence, our visibility has skyrocketed. We are getting significantly more views and local footfall. It truly works wonders for local businesses!",
                name: "Khodiyar Garments",
                initial: "K",
                avatarGrad: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                avatarTextColor: "#fff",
                badge: "Apparel",
                badgeIcon: "fa-solid fa-shirt"
            },
            {
                text: "Postify held my hand from day one. Through professional video shoots, proven growth strategies, and highly creative ideas, they elevated my brand and positioned my profile squarely in the premium category.",
                name: "Elegant Layers by Khyati",
                initial: "E",
                avatarGrad: "linear-gradient(135deg, #ec4899, #be185d)",
                avatarTextColor: "#fff",
                badge: "Fashion",
                badgeIcon: "fa-solid fa-gem"
            },
            {
                text: "I spent thousands on other agencies with zero ROI. Postify changed everything. Within a month, we saw real results, and two of our reels went completely viral. They deliver what they promise.",
                name: "Egg World",
                initial: "E",
                avatarGrad: "linear-gradient(135deg, #eab308, #a16207)",
                avatarTextColor: "#fff",
                badge: "Food",
                badgeIcon: "fa-solid fa-utensils"
            },
            {
                text: "I've run my Garba classes for 9 years, but Postify took us to the next level. The creative business ideas and strategies they implemented helped us engage a massive new wave of students.",
                name: "Shakti Keshav Garba",
                initial: "S",
                avatarGrad: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
                avatarTextColor: "#fff",
                badge: "Dance",
                badgeIcon: "fa-solid fa-music"
            },
            {
                text: "Built a content strategy that crossed 1.3M reel views with just 152 followers. Turned Instagram into a consistent source of travel bookings.",
                name: "Waycation Tours",
                initial: "W",
                avatarGrad: "linear-gradient(135deg, #00d2ff, #0284c7)",
                avatarTextColor: "#fff",
                badge: "Travel",
                badgeIcon: "fa-solid fa-plane-departure"
            },
            {
                text: "Positioned our brand strategically. Smart campaigns drove strong local recognition and increased footfall noticeably across the city.",
                name: "The Black Bird's Cafe",
                initial: "B",
                avatarGrad: "linear-gradient(135deg, #1a1a2e, #0f0f1a)",
                avatarTextColor: "#fff",
                badge: "Cafe",
                badgeIcon: "fa-solid fa-mug-hot",
                avatarBorder: true
            }
        ];

        const container = document.getElementById('globeContainer');
        const world = document.getElementById('globeWorld');
        const modal = document.getElementById('globeModal');
        const modalContent = document.getElementById('globeModalContent');
        const modalClose = document.getElementById('globeModalClose');

        if (!container || !world) return;

        // Responsive hints
        const isMobile = window.innerWidth <= 768;
        let RADIUS = isMobile ? 240 : 360;
        let rotY = 0, rotX = 15, autoSpd = 0.15;
        let hovering = false, dragging = false;
        let dStartX = 0, dStartY = 0, dStartRY = 0, dStartRX = 0, vel = 0;
        let pinchD0 = 0, pinchR0 = RADIUS;

        const desktopHint = document.querySelector('.desktop-hint');
        const mobileHint = document.querySelector('.mobile-hint');
        if (isMobile) {
            if (desktopHint) desktopHint.style.display = 'none';
            if (mobileHint) mobileHint.style.display = 'inline';
        } else {
            if (desktopHint) desktopHint.style.display = 'inline';
            if (mobileHint) mobileHint.style.display = 'none';
        }

        function buildHTML(t) {
            const bs = t.avatarBorder ? 'border:1px solid rgba(255,255,255,0.15);' : '';
            return `
                <div class="g-quote">"</div>
                <div class="g-text">${t.text}</div>
                <div class="g-author">
                    <div class="g-avatar" style="background:${t.avatarGrad};color:${t.avatarTextColor};${bs}">${t.initial}</div>
                    <div>
                        <div class="g-name">${t.name}</div>
                        <div class="g-badge"><i class="${t.badgeIcon}" style="font-size:0.55rem"></i> ${t.badge}</div>
                    </div>
                </div>
            `;
        }

        const cards = [];
        testimonials.forEach((t, i) => {
            const c = document.createElement('div');
            c.className = 'globe-card';
            c.innerHTML = buildHTML(t);
            c.dataset.index = i;

            c.addEventListener('click', (e) => {
                e.stopPropagation();
                openModal(i);
            });
            c.addEventListener('mouseenter', () => { hovering = true; });
            c.addEventListener('mouseleave', () => { hovering = false; });

            world.appendChild(c);
            cards.push(c);
        });

        // Fibonacci sphere point distribution
        function getSphPos(n) {
            const p = [];
            for (let i = 0; i < n; i++) {
                p.push({
                    phi: Math.acos(1 - (2 * (i + 0.5)) / n),
                    theta: (2 * Math.PI * i) / ((1 + Math.sqrt(5)) / 2)
                });
            }
            return p;
        }

        const pos = getSphPos(cards.length);

        function mr(v, a, b, c, d) {
            return c + ((v - a) / (b - a)) * (d - c);
        }

        function renderGlobe() {
            if (!dragging && !hovering) {
                rotY += autoSpd + vel;
                vel *= 0.95;
                if (Math.abs(vel) < 0.01) vel = 0;
            }

            const ry = (rotY * Math.PI) / 180;
            const rx = (rotX * Math.PI) / 180;

            cards.forEach((c, i) => {
                const { phi, theta } = pos[i];
                let x = RADIUS * Math.sin(phi) * Math.cos(theta + ry);
                let y = RADIUS * Math.cos(phi);
                let z = RADIUS * Math.sin(phi) * Math.sin(theta + ry);

                // Pitch around X
                const y2 = y * Math.cos(rx) - z * Math.sin(rx);
                const z2 = y * Math.sin(rx) + z * Math.cos(rx);
                y = y2;
                z = z2;

                const sc = mr(z, -RADIUS, RADIUS, 0.52, 1.08);
                const op = mr(z, -RADIUS, RADIUS, 0.2, 1);
                const zi = Math.round(mr(z, -RADIUS, RADIUS, 0, 50));
                const cw = isMobile ? 220 : 300;
                const ch = isMobile ? 150 : 190;

                c.style.transform = `translate3d(${x - cw / 2}px, ${y - ch / 2}px, ${z}px) scale(${sc})`;
                c.style.opacity = op;
                c.style.zIndex = zi;
            });

            requestAnimationFrame(renderGlobe);
        }

        // Mouse controls
        container.addEventListener('mousedown', (e) => {
            dragging = true;
            dStartX = e.clientX;
            dStartY = e.clientY;
            dStartRY = rotY;
            dStartRX = rotX;
        });

        window.addEventListener('mousemove', (e) => {
            if (!dragging) return;
            rotY = dStartRY - (e.clientX - dStartX) * 0.3;
            rotX = Math.max(-40, Math.min(40, dStartRX - (e.clientY - dStartY) * 0.3));
        });

        window.addEventListener('mouseup', (e) => {
            if (dragging) {
                dragging = false;
                vel = -(e.clientX - dStartX) * 0.05;
            }
        });

        // Touch controls
        function gPD(e) {
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            return Math.sqrt(dx * dx + dy * dy);
        }

        container.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                dragging = true;
                hovering = true;
                dStartX = e.touches[0].clientX;
                dStartY = e.touches[0].clientY;
                dStartRY = rotY;
                dStartRX = rotX;
            }
            if (e.touches.length === 2) {
                pinchD0 = gPD(e);
                pinchR0 = RADIUS;
            }
        }, { passive: true });

        container.addEventListener('touchmove', (e) => {
            if (e.touches.length === 1 && dragging) {
                rotY = dStartRY - (e.touches[0].clientX - dStartX) * 0.4;
                rotX = Math.max(-40, Math.min(40, dStartRX - (e.touches[0].clientY - dStartY) * 0.4));
            }
            if (e.touches.length === 2) {
                RADIUS = Math.max(150, Math.min(500, pinchR0 * (gPD(e) / pinchD0)));
            }
        }, { passive: true });

        container.addEventListener('touchend', (e) => {
            if (e.touches.length === 0) {
                dragging = false;
                hovering = false;
            }
        }, { passive: true });

        // Modal opening
        function openModal(i) {
            if (!modal || !modalContent) return;
            const t = testimonials[i];
            const bs = t.avatarBorder ? 'border:1px solid rgba(255,255,255,0.15);' : '';
            modalContent.innerHTML = `
                <button class="globe-modal-close" id="modalCloseBtn" aria-label="Close modal"><i class="fa-solid fa-xmark"></i></button>
                <div style="font-family:'Outfit',sans-serif;font-weight:800;font-size:2.8rem;background:linear-gradient(135deg,var(--brand-primary),var(--brand-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:0.8rem;line-height:1;">"</div>
                <div style="font-size:1.05rem;color:rgba(255,255,255,0.85);line-height:1.75;margin-bottom:1.8rem;">${t.text}</div>
                <div style="display:flex;align-items:center;gap:0.8rem;">
                    <div style="background:${t.avatarGrad};color:${t.avatarTextColor};${bs}width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Outfit',sans-serif;font-weight:800;font-size:1.05rem;">${t.initial}</div>
                    <div>
                        <div style="font-family:'Outfit',sans-serif;font-weight:800;font-size:1rem;letter-spacing:-0.01em;color:#fff;">${t.name}</div>
                        <div style="display:inline-flex;align-items:center;gap:0.4rem;padding:0.25rem 0.6rem;border-radius:999px;background:rgba(139,92,246,0.12);border:1px solid rgba(139,92,246,0.25);font-size:0.65rem;font-weight:600;color:#c4b5fd;text-transform:uppercase;letter-spacing:0.05em;margin-top:0.3rem;">
                            <i class="${t.badgeIcon}" style="font-size:0.6rem"></i> ${t.badge}
                        </div>
                    </div>
                </div>
            `;
            modal.classList.add('active');

            const btn = document.getElementById('modalCloseBtn');
            if (btn) {
                btn.addEventListener('click', () => modal.classList.remove('active'));
            }
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.classList.remove('active');
            });
        }
        if (modalClose) {
            modalClose.addEventListener('click', () => modal.classList.remove('active'));
        }
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal) modal.classList.remove('active');
        });

        renderGlobe();

        window.addEventListener('resize', () => {
            const newIsMobile = window.innerWidth <= 768;
            if (newIsMobile !== isMobile) {
                RADIUS = newIsMobile ? 240 : 360;
            }
        });
    })();

    // ===== 7. FAQ ACCORDION INTERACTIVITY =====
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.setAttribute('tabindex', '0');
            question.setAttribute('role', 'button');
            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    item.classList.toggle('active');
                }
            });
        }
    });

    // ===== 8. SMOOTH SCROLLING FOR INTERNAL LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== 9. VIP PLANS TOGGLE =====
    window.toggleVipSection = function () {
        const vipSec = document.getElementById('vipSection');
        const vipBtn = document.getElementById('vipToggleBtn');
        const vipArrow = document.getElementById('vipToggleArrow');
        if (!vipSec) return;

        const isCollapsed = vipSec.classList.contains('vip-collapsed');
        if (isCollapsed) {
            vipSec.classList.remove('vip-collapsed');
            vipSec.classList.add('vip-expanded');
            if (vipBtn) {
                vipBtn.setAttribute('aria-expanded', 'true');
                vipBtn.classList.add('active');
                const label = vipBtn.querySelector('.vip-trigger-label');
                if (label) label.innerHTML = 'Showing VIP & Enterprise Plans <strong>(Click to Hide)</strong>';
            }
            if (vipArrow) vipArrow.style.transform = 'rotate(180deg)';
            setTimeout(() => {
                vipSec.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        } else {
            vipSec.classList.remove('vip-expanded');
            vipSec.classList.add('vip-collapsed');
            if (vipBtn) {
                vipBtn.setAttribute('aria-expanded', 'false');
                vipBtn.classList.remove('active');
                const label = vipBtn.querySelector('.vip-trigger-label');
                if (label) label.innerHTML = 'Looking for Guaranteed Inquiries? <strong>View VIP & Enterprise Plans (Elite & Empire)</strong>';
            }
            if (vipArrow) vipArrow.style.transform = 'rotate(0deg)';
        }
    };
});
