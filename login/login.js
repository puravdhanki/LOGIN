lucide.createIcons();

const loginForm = document.getElementById('loginForm');
const roleSelect = document.getElementById('role');
const departmentSelect = document.getElementById('department');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const rememberCheckbox = document.getElementById('remember');

// Handle form submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        role: roleSelect.value,
        department: departmentSelect.value,
        email: emailInput.value,
        password: passwordInput.value,
        remember: rememberCheckbox.checked
    };

    try {
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            const token = data.user.token;
            if (formData.remember) {
                localStorage.setItem('authToken', token);
            } else {
                sessionStorage.setItem('authToken', token);
            }

            showSuccessPopup(data.user.role);
        } else {
            showErrorPopup(data.error || 'Login failed. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        showErrorPopup('An error occurred. Please try again later.');
    }
});

// Pop-up Functionality
function showSuccessPopup(role) {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML = `
        <div class="popup-content">
            <h2>Login Successful</h2>
            <p>Welcome, ${role}!</p>
            <button onclick="redirectUser('${role}')">Proceed</button>
        </div>`;
    document.body.appendChild(popup);
}

function showErrorPopup(message) {
    const popup = document.createElement('div');
    popup.classList.add('popup', 'error');
    popup.innerHTML = `
        <div class="popup-content">
            <h2>Error</h2>
            <p>${message}</p>
            <button onclick="closePopup()">Close</button>
        </div>`;
    document.body.appendChild(popup);
}

function closePopup() {
    document.querySelector('.popup').remove();
}

function redirectUser(role) {
    switch (role) {
        case 'student':
            window.location.href = 'student-dashboard.php';
            break;
        case 'teacher':
            window.location.href = 'teacher-dashboard.php';
            break;
        case 'admin':
            window.location.href = 'admin-dashboard.php';
            break;
    }
}
