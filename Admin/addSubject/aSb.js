document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('subjectForm');
    form.addEventListener('submit', async function(event) {
      event.preventDefault();
      
      const token = getCookie('token');
      const subjectName = document.getElementById('subjectName').value;
      const teacherRegNo = document.getElementById('teacherRegNo').value;
      const enrollmentNumbers = [...document.querySelectorAll('.enrollmentNumber')].map(input => input.value);
  
      const data = {
        token: token,
        regno: teacherRegNo,
        subjectName: subjectName,
        studentsEnrollmentNumbers: enrollmentNumbers,
        message: "abc",
        pdf: {
          name: "admin",
          email: "propslux@gmail.com",
          encprivateKey: "YmNkOTU2MmVkOTdiYWI3OTAzMGJkZjFlNDk3ODU1NzBmYmM5MGZjYTk3Y2JjNGIxZTIzNWVkOGJhMmM1N2IzMWM3MjRhMDE2MTM1MzVlZTcwMTY3ZDA3YWIyMDQzNDVmMTViNDU2YmU4OTVkZjM1NjAyMzUxNTNlNWIyYzFiOGVkZTMwNjAyZGYxMjI3MTkxMTYyMWFiMzc5MGU3NGJkNQ=="
        }
      };
  
      try {
        const response = await fetch('http://localhost:5000/api/teacher/subject', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
  
        const responseData = await response.json();
        alert(responseData.message);
        setTimeout(()=>{
          window.location.href = '../dashboard/d.html';
      },2000);
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to create subject');
      }
    });
  
    document.getElementById('studentsContainer').addEventListener('click', function(event) {
      if (event.target.classList.contains('addBtn')) {
        const input = document.createElement('input');
        input.type = 'text';
        input.classList.add('enrollmentNumber');
        input.name = 'enrollmentNumber[]';
        input.required = true;
        
        const addBtn = document.createElement('button');
        addBtn.textContent = '+';
        addBtn.type = 'button';
        addBtn.classList.add('addBtn');
        
        const removeBtn = document.createElement('button');
        removeBtn.textContent = '-';
        removeBtn.type = 'button';
        removeBtn.classList.add('removeBtn');
        
        const div = document.createElement('div');
        div.appendChild(input);
        div.appendChild(addBtn);
        div.appendChild(removeBtn);
        
        document.getElementById('studentsContainer').appendChild(div);
      } else if (event.target.classList.contains('removeBtn')) {
        event.target.parentNode.remove();
      }
    });
  });
  
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  