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
        console.log(data);
        if (response.ok) {
            if (data.encryptedPrivateKey) {
                // First-time login
                const pdfData = `Encrypted Private Key: ${data.encryptedPrivateKey}\nName: ${data.name}\nEmail: ${data.email}`;
                downloadPDF(pdfData, 'first_time_login.pdf');
                showMessage('First-time login. PDF downloaded.', 'success');
                // Redirect to change password page
                window.location.href = '/changePassword.html';
            } else {
                // Non-first-time login
                showMessage('Login successful', 'success');
                // Redirect to teacher dashboard
                window.location.href = '/Admin/Admin-dash.html';
            }

            document.cookie = `token=${data.token}; expires=${new Date(data.expiresAt).toUTCString()}; path=/`;
            document.cookie = `username=${username}; path=/`; // Store username as cookie

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

function downloadPDF(pdfData, filename) {
    const doc = new jsPDF();
    doc.text(pdfData, 10, 10);
    doc.save(filename);
}
