// Home page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Sample event data
    const events = [
        {
            title: 'Web Automation Fundamentals',
            description: 'Learn the basics of web automation testing with Selenium and Playwright.',
            date: '2025-05-15',
            image: 'https://picsum.photos/seed/event1/600/400.jpg'
        },
        {
            title: 'Advanced JavaScript for Automation',
            description: 'Deep dive into JavaScript techniques for complex web automation scenarios.',
            date: '2025-05-22',
            image: 'https://picsum.photos/seed/event2/600/400.jpg'
        },
        {
            title: 'API Testing Workshop',
            description: 'Master API testing with Postman and RESTful services.',
            date: '2025-05-29',
            image: 'https://picsum.photos/seed/event3/600/400.jpg'
        },
        {
            title: 'Cross-Browser Testing Strategies',
            description: 'Learn how to effectively test your web applications across multiple browsers.',
            date: '2025-06-05',
            image: 'https://picsum.photos/seed/event4/600/400.jpg'
        },
        {
            title: 'Mobile Automation with Appium',
            description: 'Discover how to automate mobile app testing with Appium.',
            date: '2025-06-12',
            image: 'https://picsum.photos/seed/event5/600/400.jpg'
        }
    ];
    
    // Display events
    const eventsContainer = document.getElementById('events-container');
    
    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        
        eventCard.innerHTML = `
            <img src="${event.image}" alt="${event.title}">
            <div class="event-card-content">
                <h3>${event.title}</h3>
                <p>${event.description}</p>
                <div class="event-date">${formatDate(event.date)}</div>
            </div>
        `;
        
        eventsContainer.appendChild(eventCard);
    });
    
    // Populate event select dropdown
    const eventSelect = document.getElementById('event-select');
    
    events.forEach(event => {
        const option = document.createElement('option');
        option.value = event.title;
        option.textContent = `${event.title} (${formatDate(event.date)})`;
        eventSelect.appendChild(option);
    });
    
    // Handle form submission
    const registrationForm = document.getElementById('event-registration-form');
    const registrationMessage = document.getElementById('registration-message');
    
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const birthday = document.getElementById('birthday').value;
        const event = document.getElementById('event-select').value;
        const notes = document.getElementById('notes').value;
        
        // In a real application, you would send this data to a server
        // For this demo, we'll just show a success message
        registrationMessage.textContent = `Thank you, ${name}! You have successfully registered for "${event}". We'll send a confirmation email to ${email}.`;
        registrationMessage.className = 'message success';
        
        // Reset form
        registrationForm.reset();
    });
    
    // Helper function to format dates
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
    
    // Logout functionality
    const logoutLink = document.getElementById('logout-link');
    logoutLink.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'login.html';
    });
});