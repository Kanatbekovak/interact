
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
