async function uploadFile() {
  const fileInput = document.getElementById('fileInput');
  const wordCountResult = document.getElementById('wordCountResult');

  const file = fileInput.files[0];
  if (!file) {
    alert('Please choose a file.');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    wordCountResult.textContent = `Word Count: ${data.wordCount}`;
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}
