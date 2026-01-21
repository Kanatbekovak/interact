// --- 1. АККОРДЕОН (FAQ) ---
const faqItems = document.querySelectorAll('.question_list');
faqItems.forEach(item => {
    item.addEventListener('click', () => {
        const wasActive = item.classList.contains('active');
        faqItems.forEach(el => el.classList.remove('active'));
        if (!wasActive) {
            item.classList.add('active');
        }
    });
});

// --- 2. МОДАЛКА ПОЖЕРТВОВАНИЙ (DONATE) ---
const donateModal = document.getElementById('invitationModal');
const openDonateBtns = document.querySelectorAll('.my_help, .results_button');
const closeDonateBtn = document.getElementById('closeModal');
const donateSubmitBtn = document.getElementById('donate');
const moneyBtns = document.querySelectorAll('.moneyfff');
const customSumInput = document.getElementById('custom_sum');

const openDonateModal = (sum = null) => {
    if (!donateModal) return;
    donateModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    if (sum) {
        moneyBtns.forEach(btn => btn.classList.remove('selected'));
        customSumInput.value = '';
        let match = false;
        moneyBtns.forEach(btn => {
            if (btn.innerText.includes(sum)) {
                btn.classList.add('selected');
                match = true;
            }
        });
        if (!match && customSumInput) customSumInput.value = sum;
        if (donateSubmitBtn) donateSubmitBtn.innerText = `Пожертвовать ${sum} сом`;
    }
};

const closeDonateModal = () => {
    if (!donateModal) return;
    donateModal.style.display = 'none';
    document.body.style.overflow = 'auto';
};

if (openDonateBtns) {
    openDonateBtns.forEach(btn => btn.addEventListener('click', () => openDonateModal()));
}

if (closeDonateBtn) {
    closeDonateBtn.onclick = closeDonateModal;
}

if (document.getElementById('okey')) {
    document.getElementById('okey').onclick = closeDonateModal;
}

window.addEventListener('click', (e) => { 
    if (e.target == donateModal) closeDonateModal(); 
});

if (moneyBtns.length) {
    moneyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            moneyBtns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            if (customSumInput) customSumInput.value = '';
            if (donateSubmitBtn) donateSubmitBtn.innerText = `Пожертвовать ${btn.innerText}`;
        });
    });
}

if (customSumInput) {
    customSumInput.oninput = () => {
        moneyBtns.forEach(b => b.classList.remove('selected'));
        if (donateSubmitBtn) donateSubmitBtn.innerText = `Пожертвовать ${customSumInput.value || 0} сом`;
    };
}

if (donateSubmitBtn) {
    donateSubmitBtn.onclick = () => {
        if(!document.getElementById('oferta')?.checked) {
            alert("Примите оферту");
            return;
        }
        if (document.getElementById('step1')) {
            document.getElementById('step1').classList.remove('active');
            document.getElementById('step1Dot')?.classList.remove('active');
        }
        if (document.getElementById('step2')) {
            document.getElementById('step2').classList.add('active');
            document.getElementById('step2Dot')?.classList.add('active');
        }
    };
}

// --- 3. МОДАЛКА ВОЛОНТЕРСТВА ---
const modalVolun = document.getElementById('invitationModalVoluntur');
const step1Volun = document.getElementById('step1Volun');
const step2Volun = document.getElementById('step2Volun');
const openVolunBtns = document.querySelectorAll('.want');

if (openVolunBtns.length && modalVolun) {
    openVolunBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modalVolun.classList.add('active');
            document.body.style.overflow = 'hidden';
            if (step1Volun) step1Volun.classList.add('active');
            if (step2Volun) step2Volun.classList.remove('active');
        });
    });
}

const closeVolun = () => {
    if (modalVolun) modalVolun.classList.remove('active');
    document.body.style.overflow = '';
};

if (document.getElementById('closeModalVolun')) {
    document.getElementById('closeModalVolun').onclick = closeVolun;
}

if (document.getElementById('okeyVolun')) {
    document.getElementById('okeyVolun').onclick = closeVolun;
}

if (document.getElementById('successVolun')) {
    document.getElementById('successVolun').onclick = () => {
        if (step1Volun) step1Volun.classList.remove('active');
        if (step2Volun) step2Volun.classList.add('active');
    };
}

// --- 4. ПОИСК В ХЕДЕРЕ (ОБНОВЛЕННЫЙ КОД) ---
document.addEventListener('DOMContentLoaded', () => {
    console.log('Инициализация поиска...');
    
    // Находим элементы
    const header = document.querySelector('header');
    const searchIcons = document.querySelectorAll('.mingcute--search-line');
    const closeButtons = document.querySelectorAll('.search-close');
    
    console.log(`Найдено: ${searchIcons.length} иконок поиска, ${closeButtons.length} кнопок закрытия`);
    
    // Функция открытия поиска
    const openSearch = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Открываем поиск');
        if (header) header.classList.add('search-open');
        
        // Фокус на поле ввода
        setTimeout(() => {
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.focus();
            }
        }, 50);
    };
    
    // Функция закрытия поиска
    const closeSearch = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Закрываем поиск');
        if (header) header.classList.remove('search-open');
    };
    
    // Назначаем обработчики на иконки поиска
    searchIcons.forEach((icon, index) => {
        // Проверяем, что иконка не внутри уже открытого поиска
        const parentContainer = icon.closest('.search-header, .search-header-mobile');
        if (!parentContainer) {
            icon.addEventListener('click', openSearch);
            console.log(`Обработчик добавлен на иконку поиска #${index}`);
        }
    });
    
    // Назначаем обработчики на кнопки закрытия
    closeButtons.forEach((button, index) => {
        button.addEventListener('click', closeSearch);
        console.log(`Обработчик добавлен на кнопку закрытия #${index}`);
    });
    
    // Закрытие по ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && header && header.classList.contains('search-open')) {
            header.classList.remove('search-open');
        }
    });
    
    // Обработка форм поиска
    const searchForms = document.querySelectorAll('.search-form-full');
    console.log(`Найдено форм: ${searchForms.length}`);
    
    searchForms.forEach((form, index) => {
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                console.log(`Форма #${index} отправлена`);
                
                const input = this.querySelector('input[type="text"]');
                if (input && input.value.trim()) {
                    console.log('Поиск:', input.value.trim());
                    // Ваша логика поиска здесь
                }
            });
        }
    });
    
    // Обработка кнопок "Найти"
    const searchSubmitButtons = document.querySelectorAll('.search-submit');
    console.log(`Найдено кнопок "Найти": ${searchSubmitButtons.length}`);
    
    searchSubmitButtons.forEach((button, index) => {
        if (button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                console.log(`Кнопка "Найти" #${index} нажата`);
                
                const form = this.closest('.head_list')?.querySelector('.search-form-full');
                if (form) {
                    const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
                    form.dispatchEvent(submitEvent);
                }
            });
        }
    });
    
    
});

// --- 5. БУРГЕР МЕНЮ (2/3 ЭКРАНА) ---
const burgerBtn = document.querySelector('.material-symbols--menu-rounded');
const burgerMenu = document.getElementById('burgerMenu');
const burgerOverlay = document.getElementById('burgerOverlay');
const closeBurger = document.querySelector('.close-burger');

if (burgerBtn && burgerMenu && burgerOverlay) {
    burgerBtn.parentElement.addEventListener('click', () => {
        burgerMenu.classList.add('active');
        burgerOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

const hideBurger = () => {
    if (burgerMenu) burgerMenu.classList.remove('active');
    if (burgerOverlay) burgerOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
};

if (closeBurger) closeBurger.onclick = hideBurger;
if (burgerOverlay) burgerOverlay.onclick = hideBurger;

// --- 6. ФУТЕР (ДОНАТ ИЗ ФУТЕРА В МОДАЛКУ) ---
const footerSection = document.querySelector('.footer-section');
if (footerSection) {
    const footerAmountBtns = footerSection.querySelectorAll('.amount_btn');
    const footerInput = footerSection.querySelector('.money input');
    const footerHelpBtn = footerSection.querySelector('.button_help');

    if (footerAmountBtns.length && footerHelpBtn) {
        footerAmountBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                footerAmountBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                if (footerInput) footerInput.value = ''; 
            });
        });
    }

    if (footerInput) {
        footerInput.addEventListener('input', () => {
            if (footerAmountBtns.length) {
                footerAmountBtns.forEach(b => b.classList.remove('active'));
            }
        });
    }

    if (footerHelpBtn) {
        footerHelpBtn.addEventListener('click', () => {
            let finalValue = footerInput ? footerInput.value.trim() : '';
            const activeBtn = footerSection.querySelector('.amount_btn.active');
            if (!finalValue && activeBtn) {
                finalValue = activeBtn.innerText.replace(/[^0-9]/g, '');
            }

            if (!finalValue || finalValue === "0") {
                alert("Выберите сумму");
                return;
            }
            openDonateModal(finalValue);
        });
    }
}