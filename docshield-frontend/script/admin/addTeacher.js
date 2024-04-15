const addTeacherForm = document.getElementById('addTeacherForm');

addTeacherForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(addTeacherForm);

  try {
    const response = await fetch('http://localhost:5000/admin/add-teacher', {
      method: 'POST',
      body: formData
    });
    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      // Clear the form after successful submission
      addTeacherForm.reset();
    } else {
      alert('Failed to add teacher');
    }
  } catch (error) {
    console.error('Error adding teacher:', error);
    alert('Failed to add teacher');
  }
});
