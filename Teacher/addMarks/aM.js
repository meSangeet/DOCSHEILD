document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('marksForm');
    form.addEventListener('submit', async function(event) {
      event.preventDefault();
      
      const token = getCookie('token');
      const subjectId = document.getElementById('subjectId').value;
      const email = document.getElementById('email').value;
      const privateKey = document.getElementById('privateKey').value;
      const studentElements = document.querySelectorAll('.studentMarks');
      const data = {};
  
      studentElements.forEach((studentElement, index) => {
        const enrollmentNo = studentElement.querySelector('.enrollmentNo').value;
        const marks = parseInt(studentElement.querySelector('.marks').value);
        const totalMarks = parseInt(studentElement.querySelector('.totalMarks').value);
  
        data[enrollmentNo] = { marks, totalMarks };
      });
  
      const requestData = {
        token: token,
        SubjectId: subjectId,
        message: "abc",
        data: data,
        documentName: "sub2 marks",
        documentType: "marks",
        pdf: {
          name: "t1",
          email: email,
          encprivateKey: privateKey
        }
      };
  
      try {
        const response = await fetch('http://localhost:5000/api/document', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestData)
        });
  
        const responseData = await response.json();
        alert(responseData.message);
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to upload marks');
      }
    });
  
    document.getElementById('marksContainer').addEventListener('click', function(event) {
      if (event.target.classList.contains('addBtn')) {
        const div = document.createElement('div');
        div.classList.add('studentMarks');
        div.innerHTML = `
          <input type="text" class="enrollmentNo" name="enrollmentNo[]" placeholder="Enrollment No" required>
          <input type="number" class="marks" name="marks[]" placeholder="Marks" required>
          <input type="number" class="totalMarks" name="totalMarks[]" placeholder="Total Marks" required>
          <button type="button" class="addBtn">+</button>
          <button type="button" class="removeBtn">-</button>
        `;
        document.getElementById('marksContainer').appendChild(div);
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
  