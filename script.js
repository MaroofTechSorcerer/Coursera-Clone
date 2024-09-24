document.addEventListener('DOMContentLoaded', function() {
    const selectedCourses = JSON.parse(localStorage.getItem('selectedCourses')) || [];
    const purchasedCourses = JSON.parse(localStorage.getItem('purchasedCourses')) || [];

    const updateCart = () => {
        const cartItems = document.getElementById('cart-items');
        if (cartItems) {
            cartItems.innerHTML = '';
            selectedCourses.forEach(course => {
                const div = document.createElement('div');
                div.classList.add('cart-item');
                div.innerHTML = `
                    <h3>${course.title}</h3>
                    <p>${course.description}</p>
                `;
                cartItems.appendChild(div);
            });
        }
    };

    const updateMyCourses = () => {
        const myCoursesList = document.getElementById('my-courses-list');
        if (myCoursesList) {
            myCoursesList.innerHTML = '';
            purchasedCourses.forEach(course => {
                const div = document.createElement('div');
                div.classList.add('my-course-item');
                div.innerHTML = `
                    <h3>${course.title}</h3>
                    <p>${course.description}</p>
                `;
                myCoursesList.appendChild(div);
            });
        }
    };

    document.querySelectorAll('.select-course-button').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.parentElement;
            const course = {
                id: card.getAttribute('data-id'),
                title: card.querySelector('h3').textContent,
                description: card.querySelector('p').textContent
            };

            selectedCourses.push(course);
            localStorage.setItem('selectedCourses', JSON.stringify(selectedCourses));
            alert('Course added to cart!');
        });
    });

    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            window.location.href = 'payment.html';
        });
    }

    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Payment successful!');

            purchasedCourses.push(...selectedCourses);
            localStorage.setItem('purchasedCourses', JSON.stringify(purchasedCourses));
            localStorage.removeItem('selectedCourses');

            window.location.href = 'my-courses.html';
        });
    }

    if (document.getElementById('cart-items')) {
        updateCart();
    }

    if (document.getElementById('my-courses-list')) {
        updateMyCourses();
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    let currentUser = localStorage.getItem('currentUser');

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const user = users.find(u => u.username === username && u.password === password);
            if (user) {
                localStorage.setItem('currentUser', username);
                window.location.href = 'index.html';
            } else {
                alert('Invalid username or password');
            }
        });
    }

    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('signup-username').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;

            const userExists = users.some(u => u.username === username);
            if (userExists) {
                alert('Username already taken');
            } else {
                users.push({ username, email, password });
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('currentUser', username);
                window.location.href = 'index.html';
            }
        });
    }

    const accountButton = document.querySelector('.account-button');
    if (currentUser && accountButton) {
        accountButton.textContent = currentUser;
        accountButton.href = 'my-courses.html';
    }
});
