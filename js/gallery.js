document.addEventListener('DOMContentLoaded', function() {
    // Only run on events page
    if (!document.querySelector('.events-page')) return;
    
    // Filterable Gallery
    const filterButtons = document.querySelectorAll('.filter-btn');
    const eventCards = document.querySelectorAll('.event-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter events
            eventCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Modal for Event Details
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <div class="modal-body"></div>
        </div>
    `;
    document.body.appendChild(modal);
    
    const modalContent = modal.querySelector('.modal-body');
    const closeBtn = modal.querySelector('.modal-close');
    
    // Open modal when clicking on event cards
    document.querySelectorAll('.view-details').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const eventId = this.getAttribute('data-event');
            showEventDetails(eventId);
        });
    });
    
    // Close modal
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    function showEventDetails(eventId) {
        // In a real app, this would fetch event details from an API
        // For demo, we'll use sample data
        const event = {
            id: eventId,
            title: "Sample Event",
            date: "January 1, 2023",
            location: "Event Venue, City",
            description: "This is a detailed description of the event. It would include all the relevant information about the event, including speakers, schedule, and other important details.",
            image: "images/event-detail.webp"
        };
        
        modalContent.innerHTML = `
            <div class="modal-image">
                <img src="${event.image}" alt="${event.title}">
            </div>
            <div class="modal-info">
                <h2>${event.title}</h2>
                <p class="modal-date">${event.date}</p>
                <p class="modal-location">${event.location}</p>
                <div class="modal-description">
                    <p>${event.description}</p>
                </div>
                <a href="#" class="btn btn-primary">Register Now</a>
            </div>
        `;
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Initialize events - similar to featured events but with more data
    initializeEvents();
});

function initializeEvents() {
    const eventsContainer = document.querySelector('.events-container');
    if (!eventsContainer) return;
    
    // Sample events data - in a real app, this would come from an API
    const events = [
        {
            id: 1,
            title: "Summer Music Festival",
            description: "Join us for the biggest music event of the year.",
            date: "June 15, 2023",
            image: "images/event1.webp",
            category: "music",
            fullDescription: "This year's Summer Music Festival features over 50 artists across 3 stages. Enjoy a weekend of music, food, and fun in the heart of the city. Gates open at 12 PM each day.",
            location: "Central Park, Main Stage"
        },
        {
            id: 2,
            title: "Tech Conference 2023",
            description: "The future of technology discussed by industry leaders.",
            date: "July 22, 2023",
            image: "images/event2.webp",
            category: "conference",
            fullDescription: "Our annual tech conference brings together innovators and thought leaders to discuss emerging technologies. Keynote speakers include CEOs from top tech companies and groundbreaking researchers.",
            location: "Convention Center, Room A"
        },
        {
            id: 3,
            title: "Art Exhibition Opening",
            description: "Contemporary art from emerging artists.",
            date: "August 5, 2023",
            image: "images/event3.webp",
            category: "art",
            fullDescription: "This exclusive exhibition showcases works from 20 emerging artists working in various mediums. The opening night includes meet-and-greets with the artists and live performances.",
            location: "Modern Art Gallery"
        },
        // More events...
    ];
    
    // Display events
    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.setAttribute('data-category', event.category);
        eventCard.innerHTML = `
            <div class="event-image">
                <img src="${event.image}" alt="${event.title}" loading="lazy">
            </div>
            <div class="event-content">
                <span class="event-date">${event.date}</span>
                <h3 class="event-title">${event.title}</h3>
                <p class="event-description">${event.description}</p>
                <div class="event-actions">
                    <a href="#" class="btn btn-small view-details" data-event="${event.id}">Details</a>
                    <a href="#" class="btn btn-small btn-accent">Register</a>
                </div>
            </div>
        `;
        eventsContainer.appendChild(eventCard);
    });
}