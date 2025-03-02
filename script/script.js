const btn = document.querySelector('.header__burger')
const menu = document.querySelector('.header__menu')
const links = document.querySelectorAll('.header__menu a')


btn.addEventListener('click', () => {
    menu.classList.toggle('active')
})

links.forEach(el => {
    el.addEventListener('click', () => {
        menu.classList.remove('active')
    })
})


const modal = document.querySelector('.modal');
const modalWrap = document.querySelector('.modal__wrapper');
const modalBtn = document.querySelectorAll('.modal__btn');
const modalClose = document.querySelector('.modal__close');
let selectedProduct = ''; // Переменная для хранения названия товара
let selectedCategory = ''; // Переменная для хранения названия категории


modalBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Найдем родительский элемент карточки
        const card = btn.closest('.catalog__card');
        // Из карточки получим заголовок товара (элемент h3)
        const productTitle = card.querySelector('h3').textContent;
        // Сохраним название товара в переменной
        selectedProduct = productTitle;

        // Найдем ближайший блок .catalog__wrapper и элемент h2 для категории
        const wrapper = card.closest('.catalog__wrapper');
        const section = wrapper.closest('.catalog'); // Найдём ближайший section, которому принадлежит wrapper
        const categoryTitle = section.querySelector('h2').textContent; // Получим заголовок категории
        // Сохраним название категории в переменной
        selectedCategory = categoryTitle;

        // Открываем модальное окно
        modal.classList.toggle('active');
    });
});

// Обработчик закрытия модального окна
modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
});

modal.addEventListener('click', (event) => {
    if (!modalWrap.contains(event.target)) {
        modal.classList.remove('active');
    }
});

modalWrap.addEventListener('click', (event) => {
    event.stopPropagation();
});

// TELEGRAM

// Select all forms with the class 'form'
const forms = document.querySelectorAll('.form');

forms.forEach(form => {
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the form from submitting the traditional way

        // Get the input values from the current form
        const name = form.querySelector('.name').value;
        const phone = form.querySelector('.phone').value;

        // Prepare the message text, including the selected product and category titles
        const message = `Категория: ${selectedCategory}\nТовар: ${selectedProduct}\nИмя: ${name}\nТелефон: ${phone}`;

        // Telegram bot token and chat ID
        const token = '7152055615:AAHk2bCRmWPMZE2hSJlmUFHekKtE2xOXLEM';
        const chatId = '-4563353571';
        const url = `https://api.telegram.org/bot${token}/sendMessage`;

        // Send the data to Telegram
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    alert('Ваша заявка отправлена. Мы свяжемся с Вами в ближайшее время!');
                    location.reload();
                } else {
                    alert('Ошибка при отправке сообщения.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Произошла ошибка при отправке данных.');
            });
    });
});
