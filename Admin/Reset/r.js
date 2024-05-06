document.addEventListener('DOMContentLoaded', function () {
    const resetAllBtn = document.getElementById('resetAll');
    const resetSelectedBtn = document.getElementById('resetSelected');
    const teacherList = document.getElementById('teacherList');
  
    resetAllBtn.addEventListener('click', function () {
      resetTeachers('all');
    });
  
    resetSelectedBtn.addEventListener('click', function () {
      const teachers = [];
      teacherList.querySelectorAll('input[type="number"]').forEach(function (input) {
        const regNo = parseInt(input.value.trim());
        if (!isNaN(regNo)) {
          teachers.push(regNo);
        }
      });
      if (teachers.length > 0) {
        resetTeachers(teachers);
      } else {
        alert('Please enter at least one registration number.');
      }
    });
  
    function resetTeachers(teachers) {
      const token = getCookie('token');
      if (!token) {
        alert('Token not found in cookies. Please log in.');
        return;
      }
      const message = "hello";
      const pdf = {
        name: "admin",
        email: "propslux@gmail.com",
        encprivateKey: "YmNkOTU2MmVkOTdiYWI3OTAzMGJkZjFlNDk3ODU1NzBmYmM5MGZjYTk3Y2JjNGIxZTIzNWVkOGJhMmM1N2IzMWM3MjRhMDE2MTM1MzVlZTcwMTY3ZDA3YWIyMDQzNDVmMTViNDU2YmU4OTVkZjM1NjAyMzUxNTNlNWIyYzFiOGVkZTMwNjAyZGYxMjI3MTkxMTYyMWFiMzc5MGU3NGJkNQ"
      };
      const data = {
        token,
        message,
        teachers,
        pdf
      };
  
      fetch('http://localhost:5000/api/teacher/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        alert(data.message);
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      });
    }
  
    function getCookie(name) {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
          return cookie.substring(name.length + 1);
        }
      }
      return null;
    }
  
    teacherList.addEventListener('click', function (event) {
      if (event.target.classList.contains('addBtn')) {
        const newInput = document.createElement('div');
        newInput.classList.add('teacherInput');
        newInput.innerHTML = `
          <input type="number" placeholder="Registration Number">
          <button class="addBtn">+</button>
          <button class="removeBtn">-</button>
        `;
        teacherList.appendChild(newInput);
      } else if (event.target.classList.contains('removeBtn')) {
        event.target.parentElement.remove();
      }
    });
  });
  