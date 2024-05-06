document.addEventListener('DOMContentLoaded', async function () {
  const token = getCookie('token');
  const email = getCookie('username');

  // Fetch subjects
  try {
      const response = await fetch('http://localhost:5000/api/teacher/getsubjects', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token }),
          credentials: 'include'
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
          const subjectSelect = document.getElementById('subjectSelect');
          data.subjects.forEach(subject => {
              const option = document.createElement('option');
              option.value = subject._id;
              option.textContent = subject.name;
              subjectSelect.appendChild(option);
          });
      } else {
          alert(data.message);
      }
  } catch (error) {
      console.error('Fetch error:', error);
      alert('Failed to fetch subjects');
  }

  // Handle subject selection
  const subjectSelect = document.getElementById('subjectSelect');
  subjectSelect.addEventListener('change', async function () {
      const subjectId = subjectSelect.value;
      if (!subjectId) return;

      try {
          const response = await fetch(`http://localhost:5000/api/teacher/getsubjectdetails/${subjectId}`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ token }),
              credentials: 'include'
          });
          const data = await response.json();
          console.log(data);
          if (response.ok) {
              const studentsList = document.getElementById('studentsList');
              studentsList.innerHTML = '';
              data.students.forEach(student => {
                  const div = document.createElement('div');
                  div.innerHTML = `
                      <br>
                      <input type="hidden" name="enrollmentNo[]" value="${student.enrollmentNumber}">
                      <span>${student.name} (${student.enrollmentNumber})</span>
                      <input type="number" class="marks" name="marks[]" placeholder="Marks" required>
                      `;
                  studentsList.appendChild(div);
              });
              studentsList.innerHTML += `
                  <br><br>
                  <label for="totalMarks">Total Marks:</label>
                  <input type="number" id="totalMarks" name="totalMarks" placeholder="Total Marks" required>
                  <br><br>
                  <label for="pvtkey">Upload Digital Certificate:</label>
                  <input type="file" id="pdfFile" accept=".pdf" name="pvtkey"><br><br>
                  <button type="submit">Upload Marks</button>
              `;
          } else {
              alert(data.message);
          }
      } catch (error) {
          console.error('Fetch error:', error);
          alert('Failed to fetch subject details');
      }
  });
});
