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

    // Toast Logic
    const showToast = (message, duration = 3000) => {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        // Trigger reflow to enable transition
        void toast.offsetWidth;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, duration);
    };

    // API Configuration
    const API_BASE = 'https://we-circle.zeabur.app/api/v1/users';

    // Form Handling
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const submitBtn = loginForm.querySelector('button[type="submit"]');

        try {
            submitBtn.textContent = '登录中...';
            submitBtn.disabled = true;

            const response = await fetch(`${API_BASE}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok && data.code === 200) {
                // Success: Alert as requested
                alert('登录成功');
                // You might want to save token here: localStorage.setItem('token', data.data.accessToken);
            } else {
                alert(data.message || '登录失败，请检查邮箱和密码');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('登录请求失败，请检查网络连接');
        } finally {
            submitBtn.textContent = '登 录';
            submitBtn.disabled = false;
        }
    });

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('reg-username').value;
        const email = document.getElementById('reg-email').value;
        const avatar = document.getElementById('reg-avatar').value;
        const password = document.getElementById('reg-password').value;
        const confirmPassword = document.getElementById('reg-confirm-password').value;
        const submitBtn = registerForm.querySelector('button[type="submit"]');

        if (password !== confirmPassword) {
            alert('两次输入的密码不一致！');
            return;
        }

        try {
            submitBtn.textContent = '注册中...';
            submitBtn.disabled = true;

            const response = await fetch(`${API_BASE}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    avatar: avatar || '' // Optional
                })
            });

            const data = await response.json();

            if (response.ok && data.code === 200) {
                // Success: Toast and redirect
                showToast('注册成功！正在跳转登录页面...');

                // Switch to login after a short delay
                setTimeout(() => {
                    switchView(false); // Switch to login view
                    // Optional: pre-fill email
                    document.getElementById('login-email').value = email;
                }, 1500);
            } else {
                alert(data.message || '注册失败');
            }
        } catch (error) {
            console.error('Register error:', error);
            alert('注册请求失败，请检查网络连接');
        } finally {
            submitBtn.textContent = '注 册';
            submitBtn.disabled = false;
        }
    });
});
