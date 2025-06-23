function addRecommendation() {
    let recommendation = document.getElementById("new_recommendation");
  
    if (recommendation.value.trim() !== "") {
      // Log action
      console.log("Echo dropped");
  
      // Create recommendation bubble
      const element = document.createElement("div");
      element.setAttribute("class", "recommendation");
      element.innerHTML = "<span>&#8220;</span>" + recommendation.value + "<span>&#8221;</span>";
  
      // Append
      document.getElementById("all_recommendations").appendChild(element);
  
      // Clear textarea
      recommendation.value = "";
  
      // Show popup
      showPopup(true);
  
      // Hide popup after delay
      setTimeout(() => showPopup(false), 3000);
    }
  }
  
function showPopup(bool) {
  const popup = document.getElementById("popup");
  popup.style.visibility = bool ? "visible" : "hidden";
}

// DOM Elements
const nav = document.querySelector('nav');
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const scrollTopBtn = document.querySelector('.scroll-top');
const projectGrid = document.querySelector('.project-grid');
const prevButton = document.querySelector('.project-nav.prev');
const nextButton = document.querySelector('.project-nav.next');
const feedbackForm = document.getElementById('feedbackForm');
const feedbackSuccess = document.getElementById('feedbackSuccess');

// Navigation Functions
function toggleNav() {
    navLinks.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
}

function handleScroll() {
    // Show/hide scroll to top button
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }

    // Update navigation background
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Project Navigation
function initProjectNavigation() {
    if (!projectGrid || !prevButton || !nextButton) return;

    const scrollAmount = 370; // card width + gap

    prevButton.addEventListener('click', () => {
        projectGrid.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    nextButton.addEventListener('click', () => {
        projectGrid.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Update button visibility based on scroll position
    projectGrid.addEventListener('scroll', () => {
        prevButton.style.opacity = projectGrid.scrollLeft > 0 ? '1' : '0.5';
        nextButton.style.opacity = 
            projectGrid.scrollLeft < (projectGrid.scrollWidth - projectGrid.clientWidth) 
            ? '1' : '0.5';
    });
}

// Feedback Form Handling
function initFeedbackForm() {
    if (!feedbackForm || !feedbackSuccess) return;

    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('feedbackName').value,
            email: document.getElementById('feedbackEmail').value,
            message: document.getElementById('feedbackMessage').value
        };

        // Here you would typically send the data to a server
        console.log('Feedback submitted:', formData);

        // Show success message
        feedbackSuccess.style.display = 'flex';
        
        // Reset form
        feedbackForm.reset();

        // Hide success message after 3 seconds
        setTimeout(() => {
            feedbackSuccess.style.display = 'none';
        }, 3000);
    });
}

// Event Listeners
function initEventListeners() {
    // Navigation
    if (burger) {
        burger.addEventListener('click', toggleNav);
    }

    // Scroll events
    window.addEventListener('scroll', handleScroll);

    // Scroll to top
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', scrollToTop);
    }

    // Initialize project navigation
    initProjectNavigation();

    // Initialize feedback form
    initFeedbackForm();
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', initEventListeners);

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add smooth reveal animation for sections
const revealSection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});

document.querySelectorAll('section').forEach(section => {
    section.classList.add('section-hidden');
    sectionObserver.observe(section);
});

// Add CSS for animations
const additionalStyles = `
    .section-hidden {
        opacity: 0;
        transform: translateY(50px);
        transition: all 1s ease;
    }

    .revealed {
        opacity: 1;
        transform: translateY(0);
    }

    .success-message {
        background-color: #10B981;
        color: white;
        padding: 1rem;
        border-radius: 5px;
        margin-top: 1rem;
        text-align: center;
        animation: slideIn 0.5s ease;
    }

    @keyframes slideIn {
        from {
            transform: translateY(-20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Scroll Animation
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .nav-active {
        display: flex;
        flex-direction: column;
        position: absolute;
        right: 0;
        top: 70px;
        background: var(--white);
        width: 100%;
        align-items: center;
        padding: 2rem 0;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .toggle .line1 {
        transform: rotate(-45deg) translate(-5px, 6px);
    }

    .toggle .line2 {
        opacity: 0;
    }

    .toggle .line3 {
        transform: rotate(45deg) translate(-5px, -6px);
    }

    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    section {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease-out;
    }

    section.show {
        opacity: 1;
        transform: translateY(0);
    }
`;

document.head.appendChild(style);