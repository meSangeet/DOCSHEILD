document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('marksForm');
  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const token = getCookie('token');
    const email = getCookie('username')
    console.log(token);
    const subjectId = document.getElementById('subjectId').value;
    const tm = parseInt(document.getElementById('tm').value);
    // console.log(subjectId)
    const pdfFile = document.getElementById('pdfFile').files[0];

    if (!pdfFile) {
      alert('Please select a PDF file');
      return;
    }

    const reader = new FileReader();
    reader.onload = async function (event) {
      const typedarray = new Uint8Array(event.target.result);
      const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
      const numPages = pdf.numPages;

      let textContent = '';
      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const text = await page.getTextContent();
        textContent += text.items.map(item => item.str).join(' ');
      }

      let str = textContent;
      let mainPrivateKey = str;

      // console.log(mainPrivateKey)

      const studentElements = document.querySelectorAll('.studentMarks');
      const data = {};

      studentElements.forEach((studentElement, index) => {
        const enrollmentNo = studentElement.querySelector('.enrollmentNo').value;
        const marks = parseInt(studentElement.querySelector('.marks').value);
        const totalmarks = tm;

        data[enrollmentNo] = { marks, totalmarks };
      });

      
      // console.log(data)

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
          encprivateKey: mainPrivateKey
        }
      };

      // alert(JSON.stringify(requestData))

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
        setTimeout(()=>{
          window.location.href="../TeacherDashboard/t.html";
        }, 2000);
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to upload marks');
      }
    }
    reader.readAsArrayBuffer(pdfFile);
});

  document.getElementById('marksContainer').addEventListener('click', function (event) {
    if (event.target.classList.contains('addBtn')) {
      const div = document.createElement('div');
      div.classList.add('studentMarks');
      div.innerHTML = `
      <br>
          <input type="text" class="enrollmentNo" name="enrollmentNo[]" placeholder="Enrollment No" required>
          <input type="number" class="marks" name="marks[]" placeholder="Marks" required>
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
