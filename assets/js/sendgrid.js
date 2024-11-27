document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  const loadingSvg = document.getElementById('loading-svg');

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(form);
    const to = 'marine.krikorian.4@gmail.com';
    const from = 'Evelyn-Translation';
    const fullname = formData.get('fullname');
    const email = formData.get('email');
    const subject = formData.get('Subject');
    const message = formData.get('message');

    console.log('To',to);
    console.log('From',from);
    console.log('email',email);
    console.log('full name', fullname);
    console.log('message', message);

    const apiUrl = `https://kanusoft.azurewebsites.net/api/EmailServiceContoller/SendMail?to=${to}&from=${from}&email=${email}&fullname=${fullname}&subject=${subject}&message=${message}`;

    const headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*'); // Allow all origins
    headers.append('Access-Control-Allow-Methods','POST');
    headers.append('KanuSofTMail', 'TheAkkadian');

    // Show loading SVG
    loadingSvg.style.display = 'block';

    fetch(apiUrl, {
      method: 'POST',
      headers: headers
    })
    .then(response => {
      if (response.ok) {
        const modal = new bootstrap.Modal(document.getElementById('ContactModal'));
        modal.show();
        form.reset(); // Reset the form
      } else {
        console.error('Failed to send email.');
      }
    })
    .catch(error => {
      console.error('An error occurred:', error);
      // Additional logic for handling errors
    })
    .finally(() => {
      // Hide loading SVG after modal is shown
      loadingSvg.style.display = 'none';
    });
  });
});
