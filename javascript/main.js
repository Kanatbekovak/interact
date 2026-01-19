


const items = document.querySelectorAll('.question_list');

items.forEach(item => {
    item.addEventListener('click', () => {
        console.log('работает'); 
            
        const wasActive = item.classList.contains('active');

        items.forEach(el => el.classList.remove('active'));

        if (!wasActive) {
            item.classList.add('active');
        }
    });
});



////////////////////////////////////////////


document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('invitationModal');
    const openBtns = document.querySelectorAll('.my_help'); // Все кнопки хедере
    const closeBtn = document.getElementById('closeModal');
    const donateBtn = document.getElementById('donate');
    const moneyBtns = document.querySelectorAll('.moneyfff');
    const customSum = document.getElementById('custom_sum');
    const resultsBtn = document.getElementById('.results_button');

  
    openBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    


    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };
    closeBtn.onclick = closeModal;
    document.getElementById('okey').onclick = closeModal;
    window.onclick = (e) => { if (e.target == modal) closeModal(); };


    moneyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            moneyBtns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            customSum.value = '';
            donateBtn.innerText = `Пожертвовать ${btn.innerText}`;
        });
    });

    customSum.oninput = () => {
        moneyBtns.forEach(b => b.classList.remove('selected'));
        donateBtn.innerText = `Пожертвовать ${customSum.value || 0} сом`;
    };

  
    donateBtn.onclick = () => {
        if(!document.getElementById('oferta').checked) return alert("Примите оферту");
        
        document.getElementById('step1').classList.remove('active');
        document.getElementById('step2').classList.add('active');
        document.getElementById('step1Dot').classList.remove('active');
        document.getElementById('step2Dot').classList.add('active');
    };
});


document.addEventListener('DOMContentLoaded', () => {
    const typeButtons = document.querySelectorAll('.button_first_question button');

    typeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            typeButtons.forEach(b => b.classList.remove('active'));

            this.classList.add('active');
        });
    });
});




///////////////////

document.addEventListener('DOMContentLoaded', () => {
    const modalVolun = document.getElementById('invitationModalVoluntur');
    const step1 = document.getElementById('step1Volun');
    const step2 = document.getElementById('step2Volun');
    const openVolunBtns = document.querySelectorAll('.want');
    const closeVolunBtn = document.getElementById('closeModalVolun');
    const okeyVolunBtn = document.getElementById('okeyVolun');
    const successBtn = document.getElementById('successVolun');

    // Функция открытия
    const openModal = (e) => {
        e.preventDefault();
        modalVolun.classList.add('active'); // В SCSS это включает display: flex
        document.body.style.overflow = 'hidden';
        // Сброс на 1 шаг при открытии
        step1.classList.add('active');
        step2.classList.remove('active');
    };

    // Функция закрытия
    const closeModal = () => {
        modalVolun.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Слушатели событий
    openVolunBtns.forEach(btn => btn.addEventListener('click', openModal));
    closeVolunBtn.addEventListener('click', closeModal);
    okeyVolunBtn.addEventListener('click', closeModal);

    // Закрытие по клику на фон
    modalVolun.addEventListener('click', (e) => {
        if (e.target === modalVolun) closeModal();
    });

    // Переключение пола
    const genderBtns = document.querySelectorAll('.gender-btn');
    genderBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            genderBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Переход ко второму шагу
    successBtn.addEventListener('click', () => {
        step1.classList.remove('active');
        step2.classList.add('active');
    });
});