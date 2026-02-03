document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const loginView = document.getElementById('login-view');
    const registerView = document.getElementById('register-view');
    const toRegisterLink = document.getElementById('to-register');
    const toLoginLink = document.getElementById('to-login');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // View Switching Logic
    const switchView = (showRegister) => {
        if (showRegister) {
            // Hide Login, Show Register
            loginView.style.opacity = '0';
            setTimeout(() => {
                loginView.classList.add('hidden');
                registerView.classList.remove('hidden');
                // Trigger reflow
                void registerView.offsetWidth;
                registerView.classList.add('fade-in');
            }, 300); // Wait for opacity transition
        } else {
            // Hide Register, Show Login
            registerView.classList.remove('fade-in'); // Reset animation
            registerView.classList.add('hidden');

            loginView.classList.remove('hidden');
            loginView.style.opacity = '1';
            loginView.classList.add('fade-in');
        }
    };

    // Event Listeners for Navigation
    toRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        // Simple toggle implementation for better performance
        loginView.classList.add('hidden');
        registerView.classList.remove('hidden');
        registerView.classList.add('fade-in');
    });

    toLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerView.classList.add('hidden');
        loginView.classList.remove('hidden');
        loginView.classList.add('fade-in');
    });

    // Form Handling (Mock)
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        console.log('Login attempt:', email);
        alert(`尝试登录:\n邮箱: ${email}`);
        // TODO: Call API
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;
        const confirmPassword = document.getElementById('reg-confirm-password').value;

        if (password !== confirmPassword) {
            alert('两次输入的密码不一致！');
            return;
        }

        console.log('Register attempt:', email);
        alert(`尝试注册:\n邮箱: ${email}`);
        // TODO: Call API
    });
});
