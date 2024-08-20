// Function to handle video download
const handleDownloadVideo = async (videoUrl) => {
    try {
        const downloadResponse = await fetch(videoUrl, { method: 'GET', headers: { 'accept': 'application/json' }, mode: 'cors' });
        const url = window.URL.createObjectURL(await downloadResponse.blob());
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'video.mp4');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        URL.revokeObjectURL(url); // Clean up the URL object
    } catch (error) {
        console.error('Download video error:', error.message);
    }
};

// Add event listener to the download button
document.getElementById('downloadBtn').addEventListener('click', function() {
    const inputURL = document.getElementById('urlInput').value;
    const apiKeyURL = `https://api.tiklydown.eu.org/api/download?url=${encodeURIComponent(inputURL)}`;

    const loadingSpinner = document.getElementById('loadingSpinner');
    const mediaDisplay = document.getElementById('mediaDisplay');
    
    // Display the spinner
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
        mediaDisplay.innerHTML = ''; // Clear previous results

        if (data.video && data.video.noWatermark && data.title) {
            const videoUrl = data.video.noWatermark;
            const title = data.title;

            // Create a container to hold the video and download button
            const container = document.createElement('div');
            container.className = 'flex flex-col items-center w-full max-w-xs mx-auto p-4 rounded-lg shadow-md mt-3'; // Center container

            // Create and append video element
            const videoElement = document.createElement('video');
            videoElement.src = videoUrl;
            videoElement.width = 200; // Set video width
            videoElement.height = 150; // Set video height
            videoElement.controls = true;
            videoElement.className = 'mb-4'; // Add margin below video
            container.appendChild(videoElement);

            // Create and append download button
            const downloadBtn = document.createElement('button');
            downloadBtn.className = 'px-4 py-2 bg-blue-600 text-white rounded hover:bg-purple-700 font-poppins';
            downloadBtn.textContent = 'Download Video';
            downloadBtn.onclick = () => handleDownloadVideo(videoUrl);
            container.appendChild(downloadBtn);

            // Append container to mediaDisplay
            mediaDisplay.appendChild(container);
        } else {
            alert('Media tidak ditemukan!');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat mengambil data dari API.');
    })
    .finally(() => {
        // Hide the spinner after API response is processed
        loadingSpinner.style.display = 'none';
    });
});
