document.getElementById('addStudentBtn').addEventListener('click', function() {
    const studentInputs = document.getElementById('studentInputs');
    const inputCount = studentInputs.querySelectorAll('.input-group').length;

    const newInputGroup = document.createElement('div');
    newInputGroup.classList.add('input-group');
    newInputGroup.innerHTML = `
        <span class="serial-number">${inputCount + 1}.</span>
        <input type="text" name="student" placeholder="Student Name" required>
        <button type="button" class="remove-btn">-</button>
    `;
    studentInputs.appendChild(newInputGroup);
});

document.getElementById('studentInputs').addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-btn')) {
        event.target.parentElement.remove();
        updateSerialNumbers();
    }
});

function updateSerialNumbers() {
    const serialNumbers = document.querySelectorAll('.serial-number');
    serialNumbers.forEach((serialNumber, index) => {
        serialNumber.textContent = `${index + 1}.`;
    });
}

document.getElementById('addStudentsForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const token = getCookie('token');
    const students = Array.from(document.getElementsByName('student')).map(input => ({ name: input.value }));

    const data = {
        token: token,
        students: students,
        message: "abc",
        pdf: {
            name: "admin",
            email: "propslux@gmail.com",
            encprivateKey: "YmNkOTU2MmVkOTdiYWI3OTAzMGJkZjFlNDk3ODU1NzBmYmM5MGZjYTk3Y2JjNGIxZTIzNWVkOGJhMmM1N2IzMWM3MjRhMDE2MTM1MzVlZTcwMTY3ZDA3YWIyMDQzNDVmMTViNDU2YmU4OTVkZjM1NjAyMzUxNTNlNWIyYzFiOGVkZTMwNjAyZGYxMjI3MTkxMTYyMWFiMzc5MGU3NGJkNQ=="
        }
    };
    
    try {
        const response = await fetch('http://localhost:5000/api/teacher/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        if (response.ok) {
            alert(responseData.message);
            setTimeout(()=>{
                window.location.href = '../dashboard/d.html';
            },2000);
        } else {
            alert('Failed to add students');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to add students');
    }
});

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
