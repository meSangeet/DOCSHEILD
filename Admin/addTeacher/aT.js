document.getElementById('addTeacherForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const token = getCookie('token');
    const data = {
        token: token,
        name: name,
        email: email,
        message: "abdsded",
        pdf: {
            name: "admin",
            email: "propslux@gmail.com",
            encprivateKey: "YmNkOTU2MmVkOTdiYWI3OTAzMGJkZjFlNDk3ODU1NzBmYmM5MGZjYTk3Y2JjNGIxZTIzNWVkOGJhMmM1N2IzMWM3MjRhMDE2MTM1MzVlZTcwMTY3ZDA3YWIyMDQzNDVmMTViNDU2YmU4OTVkZjM1NjAyMzUxNTNlNWIyYzFiOGVkZTMwNjAyZGYxMjI3MTkxMTYyMWFiMzc5MGU3NGJkNQ=="
        }
    };
    console.log(token);
    try {
        const response = await fetch('http://localhost:5000/api/teacher/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        if (response.ok) {
            alert(responseData.message);
        } else {
            alert('Failed to add teacher');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to add teacher');
    }
});

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
