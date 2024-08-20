document.getElementById('downloadBtn').addEventListener('click', function() {
  const inputURL = document.getElementById('urlInput').value;
  const apiKeyURL = `https://api.tiklydown.eu.org/api/download?url=${encodeURIComponent(inputURL)}`;

  const loadingSpinner = document.getElementById('loadingSpinner');
  const imageContainer = document.getElementById('imageContainer');

  loadingSpinner.style.display = 'block';

  fetch(apiKeyURL, {
      method: 'GET',
      headers: {
        'accept': 'application/json'
      },
      mode: 'cors'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Data dari API:', data);
      imageContainer.innerHTML = ''; // Bersihkan gambar sebelumnya

      if (data.images && data.images.length > 0) {
        data.images.forEach((image) => {
          const imageDiv = document.createElement('div');
          imageDiv.className = 'image-container'; // Tambahkan kelas CSS yang sesuai

          const imgElement = document.createElement('img');
          imgElement.src = image.url;
          imgElement.alt = 'Gambar tidak bisa ditampilkan';

          const downloadButton = document.createElement('button');
          downloadButton.className = 'btn-download px-4 py-2 bg-blue-500 text-white rounded-lg'; // Sesuaikan dengan kelas CSS
          downloadButton.innerText = 'Download Media';
          downloadButton.addEventListener('click', () => {
            // Mengunduh gambar menggunakan fetch dan Blob
            fetch(image.url)
              .then(response => response.blob())
              .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = ''; // Nama file jika diperlukan
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url); // Bersihkan URL objek
              })
              .catch(error => {
                console.error('Download error:', error);
              });
          });

          imageDiv.appendChild(imgElement);
          imageDiv.appendChild(downloadButton);
          imageContainer.appendChild(imageDiv);
        });
      } else {
        alert('Gambar tidak ditemukan!');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat mengambil data dari API.');
    })
    .finally(() => {
      loadingSpinner.style.display = 'none';
    });
});


