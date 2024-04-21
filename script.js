document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/api/teacher/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                myemail: username,
                password: password
            }),
            credentials: 'include',
        });

        const data = await response.json();
        if (response.ok) {
            if (data.email === 'propslux@gmail.com') {
                showMessage('Admin login successful', 'success');
                // Redirect or perform other actions for admin
                window.location.href = '/Admin/Admin.html';
            } else {
                showMessage('Teacher login successful', 'success');
                // Redirect or perform other actions for teacher
                window.location.href = '/Admin/Admin-dash.html';
            }

            document.cookie = `token=${data.token}; expires=${new Date(data.expiresAt).toUTCString()}; path=/`;

        } else {
            showMessage(data.message, 'error');
        }
        console.log(data);
    } catch (error) {
        console.error('Fetch error:', error);
        showMessage('Failed to fetch', 'error');
    }
});

function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.className = type;
}
