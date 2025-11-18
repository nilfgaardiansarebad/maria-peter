// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('💖 Инициализация вселенной любви...');
    
    // Убираем прелоадер
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                console.log('✅ Вселенная любви загружена!');
            }, 800);
        }
    }, 2000);

    // Настройка всех функций
    setupLoveNavigation();
    setupLoveGiftButton();
    setupLoveAnimations();
    createFloatingElements();
    setupInteractiveLove();
    setupDiary();
    setupMusicPlayer();
    setupPhotoUpload();
    loadExistingData();
});

// Интерактивная зона - ВСЕ КНОПКИ РАБОТАЮТ
function setupInteractiveLove() {
    const addMemoryBtn = document.getElementById('addMemoryBtn');
    const uploadPhotoBtn = document.getElementById('uploadPhotoBtn');
    const writeDiaryBtn = document.getElementById('writeDiaryBtn');
    
    console.log('🔍 Поиск кнопок:', { addMemoryBtn, uploadPhotoBtn, writeDiaryBtn });
    
    if (addMemoryBtn) {
        addMemoryBtn.addEventListener('click', function() {
            console.log('🎁 Кнопка "Добавить воспоминание" нажата');
            showLoveMessage('💫', 'Добавить воспоминание', 'Эта функция скоро будет доступна!');
        });
    }
    
    if (uploadPhotoBtn) {
        uploadPhotoBtn.addEventListener('click', function() {
            console.log('📸 Кнопка "Добавить фото" нажата');
            openPhotoModal();
        });
    }
    
    if (writeDiaryBtn) {
        writeDiaryBtn.addEventListener('click', function() {
            console.log('📖 Кнопка "Запись в дневник" нажата');
            document.getElementById('diary').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            // Фокусируемся на поле ввода через небольшую задержку
            setTimeout(() => {
                const diaryTitle = document.getElementById('diaryTitle');
                if (diaryTitle) {
                    diaryTitle.focus();
                }
            }, 500);
        });
    }
}

// Дневник любви
function setupDiary() {
    const diaryForm = document.getElementById('diaryForm');
    const diaryEntries = document.getElementById('diaryEntries');
    
    console.log('📔 Настройка дневника:', { diaryForm, diaryEntries });
    
    // Загружаем существующие записи
    loadDiaryEntries();
    
    if (diaryForm) {
        diaryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('📝 Форма дневника отправлена');
            
            const title = document.getElementById('diaryTitle').value.trim();
            const content = document.getElementById('diaryContent').value.trim();
            const date = document.getElementById('diaryDate').value;
            const mood = document.getElementById('diaryMood').value;
            
            if (title && content && date) {
                addDiaryEntry(title, content, date, mood);
                diaryForm.reset();
                document.getElementById('diaryDate').valueAsDate = new Date();
                
                showLoveMessage('📖', 'Запись сохранена!', 'Ваша история пополнилась новой страницей любви');
            } else {
                showLoveMessage('⚠️', 'Заполните все поля', 'Пожалуйста, заполните все обязательные поля');
            }
        });
    }
    
    function addDiaryEntry(title, content, date, mood) {
        const entry = {
            title: title,
            content: content,
            date: date,
            mood: mood,
            timestamp: new Date().toISOString()
        };
        
        saveDiaryEntry(entry);
        displayDiaryEntry(entry);
    }
    
    function saveDiaryEntry(entry) {
        let entries = JSON.parse(localStorage.getItem('loveDiary')) || [];
        entries.push(entry);
        localStorage.setItem('loveDiary', JSON.stringify(entries));
    }
    
    function loadDiaryEntries() {
        const entries = JSON.parse(localStorage.getItem('loveDiary')) || [];
        
        if (!diaryEntries) return;
        
        diaryEntries.innerHTML = '';
        
        if (entries.length === 0) {
            diaryEntries.innerHTML = `
                <div class="diary-placeholder">
                    <i class="fas fa-book-open"></i>
                    <p>Здесь будут ваши записи</p>
                    <small>Каждая запись - это страница вашей уникальной истории любви</small>
                </div>
            `;
            return;
        }
        
        entries.sort((a, b) => new Date(b.date) - new Date(a.date));
        entries.forEach(entry => displayDiaryEntry(entry));
    }
    
    function displayDiaryEntry(entry) {
        if (!diaryEntries) return;
        
        const entryElement = document.createElement('div');
        entryElement.className = 'diary-entry';
        entryElement.innerHTML = `
            <div class="diary-header">
                <h4 class="diary-title">${entry.title}</h4>
                <div class="diary-meta">
                    <span class="diary-date">${new Date(entry.date).toLocaleDateString('ru-RU')}</span>
                    <span class="diary-mood">${entry.mood}</span>
                </div>
            </div>
            <div class="diary-content">${entry.content}</div>
        `;
        
        const placeholder = diaryEntries.querySelector('.diary-placeholder');
        if (placeholder) {
            diaryEntries.innerHTML = '';
        }
        
        diaryEntries.prepend(entryElement);
    }
}

// Загрузка фото
function setupPhotoUpload() {
    const addGalleryPhoto = document.getElementById('addGalleryPhoto');
    const photoModal = document.getElementById('photoModal');
    const closeModal = document.querySelector('.close-modal');
    const photoForm = document.getElementById('photoForm');
    
    console.log('📷 Настройка загрузки фото:', { addGalleryPhoto, photoModal });
    
    if (addGalleryPhoto) {
        addGalleryPhoto.addEventListener('click', function() {
            console.log('🖼️ Кнопка добавления фото в галерею нажата');
            openPhotoModal();
        });
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            photoModal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', function(event) {
        if (event.target === photoModal) {
            photoModal.style.display = 'none';
        }
    });
    
    if (photoForm) {
        photoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('📤 Форма загрузки фото отправлена');
            
            const fileInput = document.getElementById('photoUpload');
            const title = document.getElementById('photoTitle').value.trim();
            const description = document.getElementById('photoDescription').value.trim();
            const date = document.getElementById('photoDate').value;
            
            if (fileInput.files.length > 0 && title) {
                const file = fileInput.files[0];
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    addPhotoToGallery(e.target.result, title, description, date);
                    photoModal.style.display = 'none';
                    photoForm.reset();
                    
                    showLoveMessage('📸', 'Фото добавлено!', 'Ваша галерея пополнилась новым воспоминанием');
                };
                
                reader.readAsDataURL(file);
            } else {
                showLoveMessage('⚠️', 'Заполните все поля', 'Пожалуйста, выберите фото и укажите название');
            }
        });
    }
}

function openPhotoModal() {
    const photoModal = document.getElementById('photoModal');
    if (photoModal) {
        photoModal.style.display = 'block';
        const photoDate = document.getElementById('photoDate');
        if (photoDate) {
            photoDate.valueAsDate = new Date();
        }
    }
}

function addPhotoToGallery(imageData, title, description, date) {
    const galleryGrid = document.querySelector('.gallery-grid');
    if (!galleryGrid) return;
    
    const newGalleryItem = document.createElement('div');
    newGalleryItem.className = 'gallery-item';
    newGalleryItem.innerHTML = `
        <div class="gallery-frame">
            <img src="${imageData}" alt="${title}">
            <div class="gallery-overlay">
                <div class="overlay-content">
                    <h4>${title}</h4>
                    <p>${description || 'Особенный момент'}</p>
                </div>
            </div>
        </div>
    `;
    
    newGalleryItem.style.animation = 'diaryAppear 0.5s ease-out';
    savePhotoToGallery(imageData, title, description, date);
    galleryGrid.appendChild(newGalleryItem);
}

function savePhotoToGallery(imageData, title, description, date) {
    let photos = JSON.parse(localStorage.getItem('loveGallery')) || [];
    photos.push({
        image: imageData,
        title: title,
        description: description,
        date: date,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('loveGallery', JSON.stringify(photos));
}

// Музыкальный плеер
function setupMusicPlayer() {
    const musicToggle = document.getElementById('musicToggle');
    let isPlaying = false;
    
    console.log('🎵 Настройка музыки:', { musicToggle });
    
    if (musicToggle) {
        musicToggle.addEventListener('click', function() {
            console.log('🎶 Кнопка музыки нажата, состояние:', isPlaying);
            
            if (isPlaying) {
                // Останавливаем музыку (заглушка)
                musicToggle.innerHTML = '<i class="fas fa-music music-note"></i><span>Романтическая мелодия</span>';
                showLoveMessage('⏸️', 'Музыка остановлена', 'Нажмите снова чтобы включить');
            } else {
                // Включаем музыку (заглушка)
                musicToggle.innerHTML = '<i class="fas fa-pause"></i><span>Выключить музыку</span>';
                showLoveMessage('🎵', 'Музыка включена', 'Наслаждайтесь романтической мелодией');
            }
            isPlaying = !isPlaying;
        });
    }
}

// Плавная навигация
function setupLoveNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const mobileToggle = document.querySelector('.nav-mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    console.log('🧭 Настройка навигации:', { navItems: navItems.length, mobileToggle, navMenu });
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            console.log('📍 Навигация к:', targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            console.log('📱 Мобильное меню:', navMenu.classList.contains('active'));
        });
    }
    
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('.love-nav');
        if (nav) {
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(255, 229, 236, 0.98)';
                nav.style.boxShadow = '0 2px 20px rgba(231, 84, 128, 0.1)';
            } else {
                nav.style.background = 'rgba(255, 229, 236, 0.95)';
                nav.style.boxShadow = 'none';
            }
        }
    });
}

// Создание дополнительных плавающих элементов
function createFloatingElements() {
    const elementsContainer = document.querySelector('.floating-elements');
    const elementTypes = ['💖', '✨', '🌟', '💫', '🎀', '💕', '💞', '💓'];
    
    if (!elementsContainer) return;
    
    for (let i = 0; i < 8; i++) {
        const element = document.createElement('div');
        element.className = `floating-element element-${i + 6}`;
        element.innerHTML = elementTypes[Math.floor(Math.random() * elementTypes.length)];
        
        element.style.cssText = `
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation-delay: -${Math.random() * 20}s;
            font-size: ${1.5 + Math.random() * 1.5}rem;
            opacity: ${0.05 + Math.random() * 0.1};
        `;
        
        elementsContainer.appendChild(element);
    }
}

// Настройка кнопки подарка
function setupLoveGiftButton() {
    const giftButton = document.getElementById('giftButton');
    
    console.log('🎁 Настройка кнопки подарка:', { giftButton });
    
    if (giftButton) {
        giftButton.addEventListener('click', function() {
            console.log('💝 Кнопка подарка нажата!');
            createSparkEffect(this);
            
            const giftData = {
                couple: "Мария и Пётр",
                timestamp: new Date().toLocaleString('ru-RU'),
                theme: "universe_of_love"
            };
            
            console.log('📊 Данные подарка:', giftData);
            showLoveGiftMessage();
            
            setTimeout(() => {
                window.open('https://docs.google.com/forms/d/e/1FAIpQLScwNCQDbI2QcGHpMpIle3aESm9nFJsSIEoBe4eIXBRwUgfYsA/viewform?usp=sf_link', '_blank');
            }, 2000);
        });
    }
}

// Эффект искр
function createSparkEffect(element) {
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 12; i++) {
        const spark = document.createElement('div');
        spark.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: var(--gold);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            animation: sparkFloat 1.5s ease-out forwards;
        `;
        
        document.body.appendChild(spark);
        
        setTimeout(() => {
            spark.remove();
        }, 1500);
    }
    
    const sparkStyle = document.createElement('style');
    sparkStyle.textContent = `
        @keyframes sparkFloat {
            0% {
                transform: translate(0, 0) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(${Math.random() * 100 - 50}px, -100px) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(sparkStyle);
    
    setTimeout(() => {
        sparkStyle.remove();
    }, 1500);
}

// Красивое сообщение о подарке
function showLoveGiftMessage() {
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--white);
        padding: 2.5rem;
        border-radius: 15px;
        text-align: center;
        z-index: 10000;
        box-shadow: 0 20px 50px rgba(255, 175, 204, 0.3);
        border: 2px solid var(--deep-rose);
        animation: loveMessageAppear 0.6s ease-out;
        max-width: 450px;
        width: 90%;
    `;
    
    messageDiv.innerHTML = `
        <div style="font-size: 3.5rem; margin-bottom: 1.5rem; animation: messageHeart 2s infinite;">💝</div>
        <h3 style="margin-bottom: 1rem; font-family: 'Playfair Display', serif; color: var(--text-dark); font-size: 1.8rem;">Волшебный момент!</h3>
        <p style="margin-bottom: 1.5rem; line-height: 1.6; color: var(--text-dark); font-size: 1.1rem;">Вы открываете особенный подарок любви! Сейчас откроется форма для его получения.</p>
        <div style="font-size: 0.9rem; color: var(--text-light); display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
            <i class="fas fa-star"></i>
            Форма откроется через несколько секунд...
        </div>
    `;
    
    document.body.appendChild(messageDiv);
    
    const messageStyle = document.createElement('style');
    messageStyle.textContent = `
        @keyframes loveMessageAppear {
            0% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.8) rotate(-5deg);
            }
            100% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1) rotate(0deg);
            }
        }
        @keyframes messageHeart {
            0%, 100% { transform: scale(1) rotate(0deg); }
            50% { transform: scale(1.1) rotate(10deg); }
        }
    `;
    document.head.appendChild(messageStyle);
    
    setTimeout(() => {
        messageDiv.style.animation = 'loveMessageAppear 0.5s ease-in reverse';
        setTimeout(() => {
            messageDiv.remove();
            messageStyle.remove();
        }, 500);
    }, 3000);
}

// Общее сообщение
function showLoveMessage(icon, title, message) {
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--white);
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        z-index: 10000;
        box-shadow: 0 15px 40px rgba(255, 175, 204, 0.3);
        border: 2px solid var(--deep-rose);
        animation: loveMessageAppear 0.4s ease-out;
        max-width: 400px;
        width: 90%;
    `;
    
    messageDiv.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 1rem;">${icon}</div>
        <h4 style="margin-bottom: 1rem; font-family: 'Playfair Display', serif; color: var(--text-dark); font-size: 1.5rem;">${title}</h4>
        <p style="color: var(--text-dark); line-height: 1.5;">${message}</p>
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'loveMessageAppear 0.4s ease-in reverse';
        setTimeout(() => {
            messageDiv.remove();
        }, 400);
    }, 2000);
}

// Анимации при скролле
function setupLoveAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                if (entry.target.classList.contains('story-card')) {
                    entry.target.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                }
                
                if (entry.target.classList.contains('moment-card')) {
                    const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 0.2;
                    entry.target.style.transitionDelay = `${delay}s`;
                }
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.story-card, .moment-card, .gallery-item, .philosophy-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Загрузка существующих данных
function loadExistingData() {
    const photos = JSON.parse(localStorage.getItem('loveGallery')) || [];
    const galleryGrid = document.querySelector('.gallery-grid');
    
    if (galleryGrid && photos.length > 0) {
        photos.forEach(photo => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <div class="gallery-frame">
                    <img src="${photo.image}" alt="${photo.title}">
                    <div class="gallery-overlay">
                        <div class="overlay-content">
                            <h4>${photo.title}</h4>
                            <p>${photo.description || 'Особенный момент'}</p>
                        </div>
                    </div>
                </div>
            `;
            galleryGrid.appendChild(galleryItem);
        });
    }
}

// Добавляем интерактивные эффекты для элементов
document.addEventListener('DOMContentLoaded', function() {
    const loveElements = document.querySelectorAll('.gift-button, .nav-item, .moment-card, .gallery-item, .love-btn');
    
    loveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.transition = 'all 0.3s ease';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Функция для случайной анимации элементов
function addElementAnimations() {
    const elements = document.querySelectorAll('.moment-icon, .marker-heart, .philosophy-heart, .contact-heart');
    
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.animation = `momentFloat ${3 + Math.random() * 2}s ease-in-out infinite`;
        }, index * 300);
    });
}

// Запускаем анимации элементов после загрузки
setTimeout(addElementAnimations, 2500);

console.log('🚀 Все функции JavaScript загружены и готовы к работе!');