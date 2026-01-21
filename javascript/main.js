

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
    const openBtns = document.querySelectorAll('.mingcute--search-line');
    const closeBtns = document.querySelectorAll('.search-close');
    
    const headMain = document.querySelector('.head');
    const headMob = document.querySelector('.head-mobile');
    const searchBar = document.getElementById('searchBar');
    const searchBarMob = document.getElementById('searchBar-mobile');

    // Открытие
    openSearchBtns = (e) => {
        const isMobile = window.innerWidth <= 1200;
        
        if (!isMobile) {
            headMain.style.display = 'none';
            searchBar.classList.add('active');
            searchBar.querySelector('input').focus();
        } else {
            headMob.style.setProperty('display', 'none', 'important');
            searchBarMob.classList.add('active');
            searchBarMob.querySelector('input').focus();
        }
    };

    openBtns.forEach(btn => {
        const parentRound = btn.closest('.round');
        if (parentRound) parentRound.onclick = openSearchBtns;
    });

    // Закрытие
    closeBtns.forEach(btn => {
        btn.onclick = () => {
            searchBar.classList.remove('active');
            searchBarMob.classList.remove('active');
            headMain.style.display = 'flex';
            headMob.style.display = ''; // Возвращает дефолт из CSS
        };
    });
});


// document.addEventListener('DOMContentLoaded', () => {
//     // Кнопки открытия (лупы)
//     const openSearchBtns = document.querySelectorAll('.mingcute--search-line');
//     // Кнопки закрытия (крестики)
//     const closeSearchBtns = document.querySelectorAll('.search-close');

//     // Основные контейнеры
//     const headDesktop = document.querySelector('.head');
//     const headMobile = document.querySelector('.head-mobile');
//     const searchDesktop = document.getElementById('searchBar');
//     const searchMobile = document.getElementById('searchBar-mobile');

//     // Функция ОТКРЫТИЯ поиска
//     openSearchBtns.forEach(btn => {
//         btn.closest('.round').onclick = function() {
//             if (window.innerWidth > 1200) {
//                 headDesktop.style.display = 'none';
//                 searchDesktop.classList.add('active');
//                 searchDesktop.querySelector('input').focus();
//             } else {
//                 headMobile.style.setProperty('display', 'none', 'important');
//                 searchMobile.classList.add('active');
//                 searchMobile.querySelector('input').focus();
//             }
//         };
//     });

//     // Функция ЗАКРЫТИЯ поиска
//     closeSearchBtns.forEach(btn => {
//         btn.onclick = function() {
//             // Убираем активный поиск
//             searchDesktop.classList.remove('active');
//             searchMobile.classList.remove('active');
            
//             // Возвращаем видимость обычным хедерам (сброс инлайновых стилей)
//             headDesktop.style.display = '';
//             headMobile.style.display = '';
//         };
//     });
// });