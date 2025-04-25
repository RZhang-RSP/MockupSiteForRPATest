// Login functionality
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Check if username and password are correct
        if (username === 'admin' && password === 'Admin#123!') {
            // Store login status in localStorage
            localStorage.setItem('isLoggedIn', 'true');
            
            // Redirect to home page
            window.location.href = 'home.html';
        } else {
            loginMessage.textContent = 'Invalid username or password. Please try again.';
            loginMessage.className = 'message error';
        }
    });
    
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        window.location.href = 'home.html';
    }
});