document.addEventListener('DOMContentLoaded', () => {

    // Инициализируем корзину из памяти браузера или создаем пустой массив, если там ничего нет
    let cart = JSON.parse(localStorage.getItem('petShopCart')) || [];

    // --- 1. НАСТРОЙКА КНОПОК "КУПИТЬ" ---
    const buyButtons = document.querySelectorAll('.buy-btn');

    buyButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const productCard = event.target.closest('.product-card');
            const productName = productCard.querySelector('h4').innerText;
            const productPrice = productCard.querySelector('.price').innerText;

            // Создаем объект товара
            const product = {
                name: productName,
                price: productPrice
            };

            // Добавляем товар в массив корзины
            cart.push(product);

            // Сохраняем обновленную корзину в память браузера
            localStorage.setItem('petShopCart', JSON.stringify(cart));

            // Считаем общую стоимость
            const totalSum = cart.reduce((sum, item) => {
                // Извлекаем цифры из строки цены (например, "850 ₽" -> 850)
                const priceValue = parseInt(item.price.replace(/\s/g, ''));
                return sum + priceValue;
            }, 0);

            // Красивое уведомление с подсчетом всех добавленных товаров
            alert(`🎉 Товар добавлен в корзину!\n\n🛍️ Вы выбрали: ${productName}\n📦 Всего товаров в корзине: ${cart.length}\n💰 Общая сумма: ${totalSum.toLocaleString()} ₽`);

            // Визуальный отклик кнопки
            const originalText = button.innerText;
            button.innerText = 'В корзине ✓';
            button.style.backgroundColor = '#10ac84';

            setTimeout(() => {
                button.innerText = originalText;
                button.style.backgroundColor = '';
            }, 1500);
        });
    });

    // --- 2. НАСТРОЙКА КНОПКИ "НАЗАД / НА ГЛАВНУЮ" ---
    const backButton = document.querySelector('.back-btn');
    if (backButton) {
        backButton.addEventListener('click', (event) => {
            if (document.referrer && window.history.length > 1) {
                event.preventDefault();
                window.history.back();
            }
        });
    }

    // --- 3. ПЛАВНЫЙ СКРОЛЛ ДЛЯ МЕНЮ НАВИГАЦИИ ---
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});
