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


///////////////


// ===== МОДУЛЬ ПОИСКА (РАБОЧАЯ ВЕРСИЯ С ПРАВИЛЬНЫМИ СТИЛЯМИ) =====
class SearchModule {
    constructor() {
        this.resultsPage = document.getElementById('searchResultsPage');
        this.resultsList = document.getElementById('searchResultsList');
        this.loadingElement = document.getElementById('searchResultsLoading');
        this.emptyElement = document.getElementById('searchResultsEmpty');
        this.pagination = document.getElementById('searchResultsPagination');
        this.queryText = document.getElementById('searchQueryText');
        
        // Ищем ВСЕ инпуты поиска на странице
        this.searchInputs = document.querySelectorAll('input[type="text"]');
        this.searchButtons = document.querySelectorAll('.search-submit');
        this.searchForms = document.querySelectorAll('form');
        
        this.currentQuery = '';
        this.isLoading = false;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        console.log('Search Module initialized');
    }
    
    bindEvents() {
        // Обработка ВСЕХ кнопок "Найти"
        this.searchButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleSearch(e));
        });
        
        // Обработка Enter во ВСЕХ инпутах
        this.searchInputs.forEach(input => {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.handleSearch(e);
                }
            });
        });
        
        // Обработка форм
        this.searchForms.forEach(form => {
            form.addEventListener('submit', (e) => this.handleSearch(e));
        });
        
        // Кнопка закрытия
        const closeBtn = document.querySelector('.search-results-header__close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeResults());
        }
    }
    
    handleSearch(e) {
        e.preventDefault();
        e.stopPropagation();
        
        let searchInput = null;
        
        // Находим ближайший инпут к кнопке/форме
        if (e.target.closest('form')) {
            const form = e.target.closest('form');
            searchInput = form.querySelector('input[type="text"]');
        } else if (e.target.closest('.head_list')) {
            const headList = e.target.closest('.head_list');
            searchInput = headList.querySelector('input[type="text"]');
        } else {
            // Если не нашли конкретный - берем первый доступный
            searchInput = document.querySelector('#searchInput, #searchInputMobile, .search-input');
        }
        
        if (searchInput && searchInput.value.trim()) {
            this.performSearch(searchInput.value.trim());
        } else {
            console.warn('Не найден инпут для поиска');
        }
    }
    
    async performSearch(query) {
        if (this.isLoading) return;
        
        this.currentQuery = query;
        this.isLoading = true;
        
        // Показываем страницу результатов
        this.showResultsPage();
        
        // Показываем загрузку
        this.showLoading();
        
        // Обновляем заголовок
        if (this.queryText) {
            this.queryText.textContent = query;
        }
        
        try {
            // Имитация задержки поиска
            await new Promise(resolve => setTimeout(resolve, 600));
            
            // Получаем результаты
            const results = this.getMockResults(query);
            
            // Отображаем результаты
            this.displayResults(results);
            
        } catch (error) {
            console.error('Search error:', error);
            this.showError();
        } finally {
            this.isLoading = false;
        }
    }
    
    getMockResults(query) {
        const mockResults = [];
        const baseResult = {
            date: "12.09.2025",
            title: "Благотворительность рядом с вами",
            description: "Мы верим, что даже маленькое доброе дело способно изменить чью-то жизнь. Вместе мы создаём больше возможностей для помощи тем, кто в ней нуждается."
        };
        
        // Создаем 4 одинаковых результата
        for (let i = 0; i < 4; i++) {
            mockResults.push({
                id: i + 1,
                number: i + 1,
                ...baseResult
            });
        }
        
        return mockResults;
    }
    
    showResultsPage() {
        if (this.resultsPage) {
            document.body.style.overflow = 'hidden';
            this.resultsPage.classList.add('active');
            
            // Прокручиваем в начало
            setTimeout(() => {
                this.resultsPage.scrollTop = 0;
            }, 100);
        }
    }
    
    showLoading() {
        if (this.loadingElement) {
            this.loadingElement.style.display = 'block';
            this.loadingElement.classList.add('visible');
        }
        if (this.emptyElement) {
            this.emptyElement.style.display = 'none';
            this.emptyElement.classList.remove('visible');
        }
        if (this.resultsList) {
            this.resultsList.style.display = 'none';
            this.resultsList.classList.remove('visible');
            this.resultsList.innerHTML = '';
        }
        if (this.pagination) {
            this.pagination.style.display = 'none';
            this.pagination.classList.remove('visible');
        }
    }
    
    displayResults(results) {
        // Скрываем загрузку
        if (this.loadingElement) {
            this.loadingElement.style.display = 'none';
            this.loadingElement.classList.remove('visible');
        }
        
        if (results.length === 0) {
            // Показываем "ничего не найдено"
            if (this.emptyElement) {
                this.emptyElement.style.display = 'block';
                this.emptyElement.classList.add('visible');
            }
            return;
        }
        
        // Отображаем результаты с ПРАВИЛЬНЫМИ КЛАССАМИ
        if (this.resultsList) {
            this.resultsList.style.display = 'block';
            this.resultsList.classList.add('visible');
            this.resultsList.innerHTML = this.generateResultsHTML(results);
        }
        
        // Показываем пагинацию
        if (this.pagination) {
            this.pagination.style.display = 'flex';
            this.pagination.classList.add('visible');
        }
    }
    
    generateResultsHTML(results) {
        // ВАЖНО: Используем правильные классы из вашего SCSS
        return results.map(result => `
            <div class="result-item">
                <div class="res-date">${result.date}</div>
                <div class="res-content">
                    <h2>${this.highlightQuery(result.title, this.currentQuery)}</h2>
                    <p>${this.highlightQuery(result.description, this.currentQuery)}</p>
                </div>
            </div>
        `).join('');
    }
    
    highlightQuery(text, query) {
        if (!query || typeof text !== 'string') return text;
        
        const regex = new RegExp(`(${this.escapeRegex(query)})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    }
    
    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    showError() {
        if (this.loadingElement) {
            this.loadingElement.style.display = 'none';
            this.loadingElement.classList.remove('visible');
        }
        
        if (this.resultsList) {
            this.resultsList.style.display = 'block';
            this.resultsList.classList.add('visible');
            this.resultsList.innerHTML = `
                <div class="result-item">
                    <div class="res-date">${new Date().toLocaleDateString()}</div>
                    <div class="res-content">
                        <h2>Ошибка поиска</h2>
                        <p>Произошла ошибка при выполнении поиска. Пожалуйста, попробуйте позже.</p>
                    </div>
                </div>
            `;
        }
    }
    
    closeResults() {
        if (this.resultsPage) {
            this.resultsPage.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}

// ===== ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ =====
document.addEventListener('DOMContentLoaded', () => {
    // Создаем экземпляр модуля поиска
    const searchModule = new SearchModule();
    
    // Экспортируем для глобального доступа
    window.searchModule = searchModule;
    
    console.log('✅ Поиск инициализирован');
    console.log('Доступные функции:');
    console.log('1. window.searchModule.performSearch("ваш запрос")');
    console.log('2. Нажмите кнопку "Найти" на любом поиске');
    console.log('3. Нажмите Enter в любом поле поиска');
});

// ===== ДОПОЛНИТЕЛЬНЫЙ КОД ДЛЯ ОТЛАДКИ СТИЛЕЙ =====
function checkSearchStyles() {
    console.log('=== ПРОВЕРКА СТИЛЕЙ ПОИСКА ===');
    
    const resultsPage = document.getElementById('searchResultsPage');
    if (!resultsPage) {
        console.error('❌ Нет элемента searchResultsPage');
        return;
    }
    
    // Проверяем CSS стили
    const styles = window.getComputedStyle(resultsPage);
    console.log('Страница результатов:', {
        display: styles.display,
        position: styles.position,
        background: styles.backgroundColor
    });
    
    // Проверяем структуру
    const resultItems = document.querySelectorAll('.result-item');
    console.log('Найдено элементов:', resultItems.length);
    
    resultItems.forEach((item, index) => {
        const itemStyles = window.getComputedStyle(item);
        console.log(`Элемент ${index + 1}:`, {
            display: itemStyles.display,
            flexDirection: itemStyles.flexDirection,
            padding: itemStyles.padding,
            borderBottom: itemStyles.borderBottom
        });
    });
}

// Запускаем проверку через 2 секунды после загрузки
setTimeout(checkSearchStyles, 2000);