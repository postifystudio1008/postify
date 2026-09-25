// ===== DATA — Categories & Videos =====
const CATEGORIES = [
    {
        id: 'talking-head',
        name: 'Talking Head',
        icon: '🎙️',
        videos: [
            'videos/TalkingHead.mp4',
            'videos/TalkingHead2.mp4',
            'videos/TalkingHead5.mp4',
            'videos/TalkingHead8.mp4',
            'videos/TalkingHead3.mp4',
            'videos/TalkingHead10.mp4',
            'videos/TalkingHead6.mp4',
            'videos/TalkingHead12.mp4',
            'videos/TalkingHead7.mp4',
            'videos/talkinghead15.mp4',
            'videos/TalkingHead9.mp4',
            'videos/TalkingHead11.mp4',
            'videos/TalkingHead13.mp4',
            'videos/talkinghead14.mp4',
        ],
        featured: false,
    },
    {
        id: 'travel',
        name: 'Travel',
        icon: '✈️',
        videos: [
            'videos/travel6.mp4',
            'videos/travel14.mp4',
            'videos/travel3.mp4',
            'videos/travel7.mp4',
            'videos/travel9.mp4',
            'videos/Travel.mp4',
            'videos/travel10.mp4',
            'videos/travel2.mp4',
            'videos/travel13.mp4',
            'videos/travel4.mp4',
            'videos/travel5.mp4',
            'videos/travel8.mp4',
            'videos/travel11.mp4',
            'videos/travel12.mp4',
        ],
        featured: false,
    },
    {
        id: 'cinematic',
        name: 'Cinematic',
        icon: '🎬',
        videos: [
            'videos/cinematic7.mp4',
            'videos/Cinematic.mp4',
            'videos/Cinematic2.mp4',
            'videos/Cinematic3.mp4',
            'videos/cinematic8.mp4',
            'videos/cinematic4.mp4',
            'videos/cinematic5.mp4',
            'videos/cinematic6.mp4',
        ],
        featured: true,
    },
    {
        id: 'clothing',
        name: 'Clothing & Fashion',
        icon: '👗',
        videos: [
            'videos/clothing5.mp4',
            'videos/clothing.mp4',
            'videos/clothing2.mp4',
            'videos/clothing8.mp4',
            'videos/clothing7.mp4',
            'videos/clothing6.mp4',
            'videos/clothing4.mp4',
            'videos/clothing3.mp4',
        ],
        featured: false,
    },
    {
        id: 'walkthrough',
        name: 'Walkthrough',
        icon: '🚶',
        videos: [
            'videos/walkthrough.mp4',
            'videos/walkthrough2.mp4',
            'videos/walkthrough6.mp4',
            'videos/walkthrough3.mp4',
            'videos/walkthrough4.mp4',
            'videos/walkthrough5.mp4',
        ],
        featured: false,
    },
    {
        id: 'ai-videos',
        name: 'AI Videos',
        icon: '🤖',
        videos: [
            'videos/AI.mp4',
            'videos/AI2.mp4',
            'videos/AI3.mp4',
        ],
        featured: false,
    },
    {
        id: 'ai-voice',
        name: 'AI Voice',
        icon: '🗣️',
        videos: [
            'videos/AiVoice1.mp4',
            'videos/AiVoice.mp4',
            'videos/AiVoice2.mp4',
            'videos/AIvoice3.mp4',
            'videos/AiVoice4.mp4',
        ],
        featured: false,
    },
    {
        id: 'storytelling',
        name: 'Storytelling',
        icon: '📖',
        videos: [
            'videos/Storytelling.mp4',
            'videos/storytelling2.mp4',
        ],
        featured: false,
    },
    {
        id: 'opening',
        name: 'Opening / Intro',
        icon: '🎯',
        videos: [
            'videos/opening11.mp4',
            'videos/opening3.mp4',
            'videos/opening2.mp4',
            'videos/opening9.mp4',
            'videos/Opening.mp4',
            'videos/opening10.mp4',
            'videos/opening4.mp4',
            'videos/opening5.mp4',
            'videos/opening6.mp4',
            'videos/opening7.mp4',
            'videos/opening8.mp4',
        ],
        featured: false,
    },
    {
        id: 'model',
        name: 'Model Shoots',
        icon: '📸',
        videos: [
            'videos/Model6.mp4',
            'videos/Model7.mp4',
            'videos/Model.mp4',
            'videos/Model3.mp4',
            'videos/Model2.mp4',
            'videos/Model5.mp4',
            'videos/model4.mp4',
        ],
        featured: true,
    },
];

// ===== DOM References =====
const loader = document.getElementById('loader');
const loaderFill = document.getElementById('loaderFill');
const pageMain = document.getElementById('pageMain');
const mosaicBg = document.getElementById('mosaicBg');
const vaultGrid = document.getElementById('vaultGrid');
const scrollCta = document.getElementById('scrollCta');
const reelViewer = document.getElementById('reelViewer');
const reelBack = document.getElementById('reelBack');
const reelCategoryPill = document.getElementById('reelCategoryPill');
const reelCounter = document.getElementById('reelCounter');
const reelSnap = document.getElementById('reelSnap');
const reelProgress = document.getElementById('reelProgress');
const reelMute = document.getElementById('reelMute');
const categorySwitcher = document.getElementById('categorySwitcher');
const playPauseIcon = document.getElementById('playPauseIcon');

let currentCategoryIndex = 0;
let isMuted = true;
let currentVideoIndex = 0;
let reelVideos = [];
let scrollTimeout = null;

// ===== LOADER =====
function runLoader() {
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress > 100) progress = 100;
        loaderFill.style.width = progress + '%';
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.classList.add('hidden');
                initPage();
            }, 400);
        }
    }, 120);
}

// ===== MOSAIC BACKGROUND =====
function createMosaic() {
    if (!mosaicBg) return;
    // Pick random videos for background mosaic
    const allVideos = CATEGORIES.flatMap(c => c.videos);
    const shuffled = allVideos.sort(() => 0.5 - Math.random()).slice(0, 12);

    shuffled.forEach(src => {
        const vid = document.createElement('video');
        vid.src = src;
        vid.muted = true;
        vid.loop = true;
        vid.playsInline = true;
        vid.autoplay = true;
        vid.setAttribute('playsinline', '');
        vid.setAttribute('muted', '');
        vid.preload = 'metadata';
        // Start at random time to create variety
        vid.addEventListener('loadedmetadata', () => {
            vid.currentTime = Math.random() * (vid.duration || 5);
        });
        mosaicBg.appendChild(vid);
    });
}

// ===== VAULT GRID =====
function createVaultCards() {
    CATEGORIES.forEach((cat, index) => {
        const card = document.createElement('div');
        card.className = `vault-card${cat.featured ? ' card-featured' : ''}`;
        card.dataset.index = index;

        // Use first video as preview
        const previewVid = document.createElement('video');
        previewVid.src = cat.videos[0];
        previewVid.muted = true;
        previewVid.loop = true;
        previewVid.playsInline = true;
        previewVid.setAttribute('playsinline', '');
        previewVid.setAttribute('muted', '');
        previewVid.preload = 'metadata';

        const info = document.createElement('div');
        info.className = 'vault-card-info';
        info.innerHTML = `
            <span class="vault-card-icon">${cat.icon}</span>
            <div class="vault-card-name">${cat.name}</div>
            <div class="vault-card-count">${cat.videos.length} reel${cat.videos.length !== 1 ? 's' : ''}</div>
        `;

        card.appendChild(previewVid);
        card.appendChild(info);

        // Click → open reel viewer
        card.addEventListener('click', () => openReelViewer(index));

        vaultGrid.appendChild(card);
    });
}

// ===== INTERSECTION OBSERVER (Card reveal + video play) =====
function setupCardObserver() {
    const cards = document.querySelectorAll('.vault-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const delay = parseInt(card.dataset.index) % 2 === 0 ? 0 : 100;
                setTimeout(() => {
                    card.classList.add('in-view');
                }, delay + 50);

                // Auto-play preview video
                const vid = card.querySelector('video');
                if (vid) {
                    vid.play().catch(() => { });
                }
            } else {
                // Pause when out of view
                const vid = entry.target.querySelector('video');
                if (vid) vid.pause();
            }
        });
    }, { threshold: 0.2 });

    cards.forEach(card => observer.observe(card));
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target);
                animateNumber(el, 0, target, 1200);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => observer.observe(el));
}

function animateNumber(el, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();

    function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + range * eased);
        el.textContent = current;
        if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

// ===== REEL VIEWER =====
function openReelViewer(categoryIndex) {
    currentCategoryIndex = categoryIndex;
    const cat = CATEGORIES[categoryIndex];

    // Update UI
    reelCategoryPill.textContent = cat.name;

    // Build category switcher pills
    buildCategorySwitcher(categoryIndex);

    // Build reel slides
    buildReelSlides(cat.videos);

    // Show viewer
    reelViewer.classList.add('active');
    document.body.classList.add('no-scroll');

    // Play first video
    setTimeout(() => {
        playVideoAtIndex(0);
    }, 100);
}

function closeReelViewer() {
    reelViewer.classList.remove('active');
    document.body.classList.remove('no-scroll');

    // Pause all reel videos
    reelVideos.forEach(v => {
        v.pause();
        v.currentTime = 0;
    });
    reelVideos = [];
    reelSnap.innerHTML = '';
    reelProgress.innerHTML = '';
}

function buildReelSlides(videos) {
    reelSnap.innerHTML = '';
    reelProgress.innerHTML = '';
    reelVideos = [];
    currentVideoIndex = 0;

    videos.forEach((src, i) => {
        // Slide
        const slide = document.createElement('div');
        slide.className = 'reel-slide';

        const vid = document.createElement('video');
        vid.src = src;
        vid.muted = isMuted;
        vid.loop = true;
        vid.playsInline = true;
        vid.setAttribute('playsinline', '');
        vid.preload = 'metadata';
        vid.dataset.index = i;

        // Tap to play/pause
        vid.addEventListener('click', (e) => {
            e.stopPropagation();
            togglePlayPause(vid);
        });

        slide.appendChild(vid);
        reelSnap.appendChild(slide);
        reelVideos.push(vid);

        // Progress dot
        const dot = document.createElement('div');
        dot.className = `reel-dot${i === 0 ? ' active' : ''}`;
        dot.addEventListener('click', () => {
            scrollToReelIndex(i);
        });
        reelProgress.appendChild(dot);
    });

    updateReelCounter(0, videos.length);

    // Setup snap scroll listener
    reelSnap.removeEventListener('scroll', onReelScroll);
    reelSnap.addEventListener('scroll', onReelScroll, { passive: true });
}

function onReelScroll() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        const scrollTop = reelSnap.scrollTop;
        const slideHeight = reelSnap.clientHeight;
        const newIndex = Math.round(scrollTop / slideHeight);

        if (newIndex !== currentVideoIndex && newIndex >= 0 && newIndex < reelVideos.length) {
            playVideoAtIndex(newIndex);
        }
    }, 80);
}

function playVideoAtIndex(index) {
    // Pause all
    reelVideos.forEach(v => {
        v.pause();
    });

    currentVideoIndex = index;
    const vid = reelVideos[index];
    vid.muted = isMuted;
    vid.currentTime = 0;
    vid.play().catch(() => { });

    updateReelCounter(index, reelVideos.length);
    updateProgressDots(index);
}

function scrollToReelIndex(index) {
    const slideHeight = reelSnap.clientHeight;
    reelSnap.scrollTo({
        top: slideHeight * index,
        behavior: 'smooth'
    });
    // playVideoAtIndex will be called by scroll handler
}

function updateReelCounter(current, total) {
    reelCounter.textContent = `${current + 1}/${total}`;
}

function updateProgressDots(activeIndex) {
    const dots = reelProgress.querySelectorAll('.reel-dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === activeIndex);
    });
}

function togglePlayPause(vid) {
    if (vid.paused) {
        vid.play().catch(() => { });
        showPlayPauseIcon(false);
    } else {
        vid.pause();
        showPlayPauseIcon(true);
    }
}

let ppTimeout;
function showPlayPauseIcon(isPaused) {
    const svg = playPauseIcon.querySelector('svg');
    if (isPaused) {
        svg.innerHTML = '<polygon points="5,3 19,12 5,21"/>';
    } else {
        svg.innerHTML = '<rect x="5" y="3" width="4" height="18"/><rect x="15" y="3" width="4" height="18"/>';
    }
    playPauseIcon.classList.add('show');
    clearTimeout(ppTimeout);
    ppTimeout = setTimeout(() => {
        playPauseIcon.classList.remove('show');
    }, 600);
}

// ===== MUTE TOGGLE =====
reelMute.addEventListener('click', () => {
    isMuted = !isMuted;

    const iconOff = reelMute.querySelector('.mute-icon-off');
    const iconOn = reelMute.querySelector('.mute-icon-on');

    if (isMuted) {
        iconOff.style.display = '';
        iconOn.style.display = 'none';
    } else {
        iconOff.style.display = 'none';
        iconOn.style.display = '';
    }

    // Update current video
    reelVideos.forEach(v => {
        v.muted = isMuted;
    });
});

// ===== CATEGORY SWITCHER =====
function buildCategorySwitcher(activeIndex) {
    categorySwitcher.innerHTML = '';

    CATEGORIES.forEach((cat, i) => {
        const pill = document.createElement('div');
        pill.className = `cat-pill${i === activeIndex ? ' active' : ''}`;
        pill.textContent = `${cat.icon} ${cat.name}`;

        pill.addEventListener('click', () => {
            if (i === currentCategoryIndex) return;
            switchCategory(i);
        });

        categorySwitcher.appendChild(pill);
    });

    // Scroll active pill into view
    setTimeout(() => {
        const activePill = categorySwitcher.querySelector('.cat-pill.active');
        if (activePill) {
            activePill.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
    }, 100);
}

function switchCategory(newIndex) {
    currentCategoryIndex = newIndex;
    const cat = CATEGORIES[newIndex];

    // Update pill
    reelCategoryPill.textContent = cat.name;

    // Update active pill in switcher
    categorySwitcher.querySelectorAll('.cat-pill').forEach((pill, i) => {
        pill.classList.toggle('active', i === newIndex);
    });

    // Scroll active pill into view
    const activePill = categorySwitcher.querySelector('.cat-pill.active');
    if (activePill) {
        activePill.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }

    // Pause old videos
    reelVideos.forEach(v => {
        v.pause();
        v.currentTime = 0;
    });

    // Rebuild slides
    buildReelSlides(cat.videos);

    // Scroll to top
    reelSnap.scrollTop = 0;

    // Play first
    setTimeout(() => {
        playVideoAtIndex(0);
    }, 150);
}

// ===== EVENT LISTENERS =====
if (reelBack) {
    reelBack.addEventListener('click', closeReelViewer);
}

if (scrollCta) {
    scrollCta.addEventListener('click', () => {
        const target = document.getElementById('portfolio') || document.getElementById('vault');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
}

// Handle back button / swipe back
window.addEventListener('popstate', () => {
    if (reelViewer.classList.contains('active')) {
        closeReelViewer();
    }
});

// Push state when opening reel viewer so back button works
const originalOpen = openReelViewer;
const wrappedOpen = (index) => {
    history.pushState({ reel: true }, '');
    originalOpen(index);
};
// Override card click handlers aren't set yet, so we handle it differently:
// We intercept in the openReelViewer function itself

// ===== INIT =====
function initPage() {
    createMosaic();
    createVaultCards();
    setupCardObserver();
    animateCounters();
}

// Start
document.addEventListener('DOMContentLoaded', () => {
    runLoader();
});
