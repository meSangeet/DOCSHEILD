const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:5000/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password })
    });
    const data = await response.json();

    if (response.ok) {
      window.location.href = 'dashboard.html';
    } else {
      loginMessage.textContent = data.message;
    }
  } catch (error) {
    console.error('Error logging in:', error);
  }
});
