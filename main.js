
document.getElementById('subscribeButton').addEventListener('click', function() {
    var emailInput = document.getElementById('emailInput');
    var email = emailInput.value.trim();
    
    // Validasi email menggunakan pola regex
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email === '') {
        alert('Please enter an email address.');
        return;
    }

    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Replace this with actual subscription logic
    console.log('Subscribed email:', email);
    alert('Thank you for subscribing!');

    // Clear the input field
    emailInput.value = '';
});

