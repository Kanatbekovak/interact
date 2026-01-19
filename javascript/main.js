


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
    const openBtns = document.querySelectorAll('.my_help, .results_button');
    const closeBtn = document.getElementById('closeModal');
    const donateBtn = document.getElementById('donate');
    const moneyBtns = document.querySelectorAll('.moneyfff');
    const customSum = document.getElementById('custom_sum');

  
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


    const openModal = (e) => {
        e.preventDefault();
        modalVolun.classList.add('active');
        document.body.style.overflow = 'hidden';
        step1.classList.add('active');
        step2.classList.remove('active');
    };


    const closeModal = () => {
        modalVolun.classList.remove('active');
        document.body.style.overflow = '';
    };

    openVolunBtns.forEach(btn => btn.addEventListener('click', openModal));
    closeVolunBtn.addEventListener('click', closeModal);
    okeyVolunBtn.addEventListener('click', closeModal);


    modalVolun.addEventListener('click', (e) => {
        if (e.target === modalVolun) closeModal();
    });


    const genderBtns = document.querySelectorAll('.gender-btn');
    genderBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            genderBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });


    successBtn.addEventListener('click', () => {
        step1.classList.remove('active');
        step2.classList.add('active');
    });
});


/////////////////////


document.addEventListener('DOMContentLoaded', () => {

    const footerSection = document.querySelector('.footer-section');
    const footerAmountBtns = footerSection.querySelectorAll('.amount_btn');
    const footerInput = footerSection.querySelector('.money input');
    const footerHelpBtn = footerSection.querySelector('.button_help');


    const modal = document.getElementById('invitationModal');
    const modalCustomSum = document.getElementById('custom_sum');
    const modalDonateBtn = document.getElementById('donate');
    const modalMoneyBtns = document.querySelectorAll('.moneyfff');

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
        let finalValue = "";
        const activeBtn = footerSection.querySelector('.amount_btn.active');

  
        if (footerInput.value.trim() !== "") {
            finalValue = footerInput.value.trim();
        } else if (activeBtn) {
            finalValue = activeBtn.innerText.replace(/[^0-9]/g, '');
        }

        if (!finalValue || finalValue === "0") {
            alert("Пожалуйста, выберите или введите сумму");
            return;
        }


        openDonateModal(finalValue);
    });

    function openDonateModal(sum) {

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';


        modalMoneyBtns.forEach(btn => btn.classList.remove('selected'));
        modalCustomSum.value = '';

        let matchFound = false;
        modalMoneyBtns.forEach(btn => {
            if (btn.innerText.includes(sum)) {
                btn.classList.add('selected');
                matchFound = true;
            }
        });

        if (!matchFound) {
            modalCustomSum.value = sum;
        }

        if (modalDonateBtn) {
            modalDonateBtn.innerText = `Пожертвовать ${sum} сом`;
        }
    }
});