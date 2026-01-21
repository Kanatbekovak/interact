

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
            if (!match) customSumInput.value = sum;
            donateSubmitBtn.innerText = `Пожертвовать ${sum} сом`;
        }
    };

    const closeDonateModal = () => {
        donateModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    openDonateBtns.forEach(btn => btn.addEventListener('click', () => openDonateModal()));
    closeDonateBtn.onclick = closeDonateModal;
    document.getElementById('okey').onclick = closeDonateModal;
    window.addEventListener('click', (e) => { if (e.target == donateModal) closeDonateModal(); });

    moneyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            moneyBtns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            customSumInput.value = '';
            donateSubmitBtn.innerText = `Пожертвовать ${btn.innerText}`;
        });
    });

    customSumInput.oninput = () => {
        moneyBtns.forEach(b => b.classList.remove('selected'));
        donateSubmitBtn.innerText = `Пожертвовать ${customSumInput.value || 0} сом`;
    };

    donateSubmitBtn.onclick = () => {
        if(!document.getElementById('oferta').checked) return alert("Примите оферту");
        document.getElementById('step1').classList.remove('active');
        document.getElementById('step2').classList.add('active');
        document.getElementById('step1Dot').classList.remove('active');
        document.getElementById('step2Dot').classList.add('active');
    };

    // --- 3. МОДАЛКА ВОЛОНТЕРСТВА ---
    const modalVolun = document.getElementById('invitationModalVoluntur');
    const step1Volun = document.getElementById('step1Volun');
    const step2Volun = document.getElementById('step2Volun');
    const openVolunBtns = document.querySelectorAll('.want');

    openVolunBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modalVolun.classList.add('active');
            document.body.style.overflow = 'hidden';
            step1Volun.classList.add('active');
            step2Volun.classList.remove('active');
        });
    });

    const closeVolun = () => {
        modalVolun.classList.remove('active');
        document.body.style.overflow = '';
    };

    document.getElementById('closeModalVolun').onclick = closeVolun;
    document.getElementById('okeyVolun').onclick = closeVolun;
    document.getElementById('successVolun').onclick = () => {
        step1Volun.classList.remove('active');
        step2Volun.classList.add('active');
    };

    // --- 4. ПОИСК В ХЕДЕРЕ ---
    const searchBar = document.getElementById('searchBar');
    const searchResults = document.getElementById('searchResults');
    const searchIcon = document.querySelector('.mingcute--search-line');
    const closeSearch = document.querySelector('.close-search-btn');
    const searchForm = document.getElementById('searchForm');

    if (searchIcon) {
        searchIcon.parentElement.onclick = () => searchBar.classList.add('active');
    }

    if (closeSearch) {
        closeSearch.onclick = () => {
            searchBar.classList.remove('active');
            searchResults.classList.remove('active');
        };
    }

    searchForm.onsubmit = (e) => {
        e.preventDefault();
        const query = document.getElementById('searchInput').value;
        const resultsBox = searchResults.querySelector('.container');
        resultsBox.innerHTML = `<h2 style="color:white">Результаты для: ${query}</h2><p style="color:white">Ничего не найдено.</p>`;
        searchResults.classList.add('active');
    };

    // --- 5. БУРГЕР МЕНЮ (2/3 ЭКРАНА) ---
    const burgerBtn = document.querySelector('.material-symbols--menu-rounded');
    const burgerMenu = document.getElementById('burgerMenu');
    const burgerOverlay = document.getElementById('burgerOverlay');
    const closeBurger = document.querySelector('.close-burger');

    if (burgerBtn) {
        burgerBtn.parentElement.addEventListener('click', () => {
            burgerMenu.classList.add('active');
            burgerOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    const hideBurger = () => {
        burgerMenu.classList.remove('active');
        burgerOverlay.classList.remove('active');
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

        footerAmountBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                footerAmountBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                footerInput.value = ''; 
            });
        });

        footerInput.addEventListener('input', () => {
            footerAmountBtns.forEach(b => b.classList.remove('active'));
        });

        footerHelpBtn.addEventListener('click', () => {
            let finalValue = footerInput.value.trim();
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


document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('searchBar');
    const searchInput = document.getElementById('searchInput');
    const closeBtn = document.querySelector('.close-search-btn');
    
    // Находим все лупы (в десктопе и мобилке)
    const allSearchIcons = document.querySelectorAll('.mingcute--search-line');

    allSearchIcons.forEach(icon => {
        // Находим ближайший кликабельный родитель (div.round)
        const trigger = icon.closest('.round');
        
        if (trigger) {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation(); // Чтобы клик не ушел дальше
                searchBar.classList.add('active');
                
                // Фокус на инпут, чтобы сразу печатать
                setTimeout(() => searchInput.focus(), 150);
            });
        }
    });

    // Закрытие
    if (closeBtn) {
        closeBtn.onclick = (e) => {
            e.preventDefault();
            searchBar.classList.remove('active');
        };
    }
});