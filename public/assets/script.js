// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
        });
    });

    // Card hover effects
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Floating action button functionality
    const floatingBtn = document.querySelector('.floating-action-btn');
    
    floatingBtn.addEventListener('click', function() {
        // Add a pulse animation
        this.style.animation = 'pulse 0.3s ease';
        
        setTimeout(() => {
            this.style.animation = '';
        }, 300);
        
        console.log('Floating action button clicked!');
    });

    // Arrow button functionality
    const arrowButtons = document.querySelectorAll('.arrow-button');
    
    arrowButtons.forEach(button => {
        button.addEventListener('click', function() {
            const section = this.closest('.content-section');
            const sectionTitle = section.querySelector('.section-title').textContent;
            
            console.log(`Arrow clicked for ${sectionTitle} section`);
            
            // Add a subtle animation
            this.style.transform = 'translateX(8px)';
            setTimeout(() => {
                this.style.transform = 'translateX(0)';
            }, 200);
        });
    });

    // Add scroll effect to header
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
            header.style.opacity = '0.9';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
            header.style.opacity = '1';
        }
        
        lastScrollTop = scrollTop;
    });

    // Add intersection observer for card animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Add CSS animation for pulse effect
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);



let NoNote = `
<div id="EmptyNote">
    <span class="material-icons">inbox</span>
    You don't have notifications
</div>`;

// Select the container where notifications would go
let container9 = document.getElementById("popupate_nots"); 

// Check if the container has any child nodes
if (container9.children.length === 0) {
    // Add the "NoNote" message
    container9.innerHTML = NoNote;
}
