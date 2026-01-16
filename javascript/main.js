


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

    // 1. ОТКРЫТИЕ ПРИ НАВЕДЕНИИ
    openBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    

    // 2. ЗАКРЫТИЕ
    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };
    closeBtn.onclick = closeModal;
    document.getElementById('okey').onclick = closeModal;
    window.onclick = (e) => { if (e.target == modal) closeModal(); };

    // 3. ЛОГИКА СУММ
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

    // 4. ПЕРЕКЛЮЧЕНИЕ ШАГОВ
    donateBtn.onclick = () => {
        if(!document.getElementById('oferta').checked) return alert("Примите оферту");
        
        document.getElementById('step1').classList.remove('active');
        document.getElementById('step2').classList.add('active');
        document.getElementById('step1Dot').classList.remove('active');
        document.getElementById('step2Dot').classList.add('active');
    };
});