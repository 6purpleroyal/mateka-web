// Add this JavaScript code at the end of your HTML, after including jQuery and Bootstrap JS
$(document).ready(function () {
  $('[data-toggle="offcanvas"]').on('click', function () {
      $('#offcanvas').toggleClass('open');
  });

  // Close the off-canvas menu when the close button is clicked
  $('.offcanvas .close').on('click', function () {
      $('#offcanvas').removeClass('open');
  });
});

// JavaScript to trigger the welcome-intro-text animation
$(document).ready(function () {
$('.home-intro-text').addClass('animate-in');
});

// JavaScript to trigger the welcome-intro-text and welcome-home animation
$(document).ready(function () {
$('.welcome-intro-text, .welcome-home').addClass('animate-in');
});

// JavaScript to trigger the slide-in from right animation for the "Welcome Home" text
$(document).ready(function () {
$('.slide-in-right').addClass('slide-in-right-animation');
});

function createCardAnimations(sectionSelector, cardSelector, leftboxSelector) {
  const cardTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: sectionSelector,
      start: "top bottom",
      end: "top top",
      scrub: true,
    },
  });

  // Animate the leftbox card
  const leftboxCard = document.querySelector(leftboxSelector);
  cardTimeline.fromTo(
    leftboxCard,
    { x: "-100%", y: "0%" },
    {
      x: "0%",
      y: "0%",
      duration: 0.5,
      ease: "power2.inOut",
    },
    0
  );

  const cards = document.querySelectorAll(cardSelector);
  cards.forEach((card, index) => {
    cardTimeline.fromTo(
      card,
      { x: "100%" },
      {
        x: "0%",
        duration: 0.5,
        delay: index * 0.2,
        ease: "power2.inOut",
      },
      0
    );

    // Apply ScrollTrigger effect to each card
    ScrollTrigger.create({
      trigger: card, // The card element triggers the animation
      toggleClass: 'active', // Toggle the CSS class 'active'
      start: "top 90%",
      end: "top 20%",
      // markers: true
    });
  });
}

// Call the function for the "sermons" section
createCardAnimations("#sermons", ".card", ".leftbox");

// Call the function for the "events" section
createCardAnimations(".events-section", ".event-card", ".leftbox");
let prevScrollPos = window.scrollY;
const navbar = document.querySelector('.navbar');
const navbarRect = navbar.getBoundingClientRect();

window.addEventListener('scroll', () => {
  const currentScrollPos = window.scrollY;

  // Check if the user is scrolling down and not hovering within the navbar area
  if (
    prevScrollPos < currentScrollPos &&
    !isMouseInsideNavbarArea(navbarRect) &&
    !navbar.classList.contains('navbar-hover')
  ) {
    navbar.style.top = `-${navbarRect.height}px`; // Hide the navbar
  } else {
    navbar.style.top = '0'; // Show the navbar
  }

  prevScrollPos = currentScrollPos;
});

// Handle hover events
navbar.addEventListener('mouseenter', () => {
  navbar.classList.add('navbar-hover'); // Add a class to indicate hover
  navbar.style.top = '0'; // Show the navbar on hover
});

navbar.addEventListener('mouseleave', () => {
  if (!navbar.classList.contains('navbar-hover') && !isMouseInsideNavbarArea(navbarRect)) {
    navbar.style.top = `-${navbarRect.height}px`; // Hide the navbar when not hovered and outside the navbar area
  }
});

// Function to check if the mouse pointer is within the navbar area
function isMouseInsideNavbarArea(navbarRect) {
  const mouseX = EventTarget.clientX;
  const mouseY = EventTarget.clientY;
  return (
    mouseX >= navbarRect.left &&
    mouseX <= navbarRect.right &&
    mouseY >= navbarRect.top &&
    mouseY <= navbarRect.bottom
  );
}

document.addEventListener('DOMContentLoaded', function() {
  const eventCards = document.querySelectorAll('.event-card');
  const modal = document.getElementById('eventModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const closeBtn = document.getElementsByClassName('close')[0];

  // Function to open the modal
  function openModal(event) {
    modalTitle.textContent = event.dataset.event;
    // Set event details based on the event clicked
    switch (event.dataset.event) {
      case 'Sunday Service':
        modalDescription.textContent = "Sunday Service details:\nSunday Service\ntime: 9.00 am - 12.00 pm";
        break;
      case 'Cell Group':
        modalDescription.textContent = "Cell Group details:\nCell Group\ntime: 5.00 pm onwards every Sunday";
        break;
      case 'Bible Study':
        modalDescription.textContent = "Bible Study details:\nBible Study Prayer and Intercession\nevery Wednesday from 5 pm onwards";
        break;
      default:
        modalDescription.textContent = "Event details not available.";
    }
    modal.style.display = 'block';
  }

  // Function to close the modal
  function closeModal() {
    modal.style.display = 'none';
  }

  // Add click event listeners to each event card
  eventCards.forEach(eventCard => {
    eventCard.addEventListener('click', () => {
      openModal(eventCard);
    });
  });

  // Close the modal when the user clicks outside of it
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
});

const textPhrases = ["Build Hope", "Grow Faith", "Live for God"];
const textElement = document.querySelector('.multitext');

let index = 0;
let charIndex = 0;

function typeText() {
  const currentPhrase = textPhrases[index];
  const typingSpeed = 80; // Adjust typing speed as needed
  const lineBreakSpeed = 1000; // Delay after typing a line
  const clearSpeed = 100; // Speed for clearing text
  const pauseBeforeClear = 3000; // Pause before clearing text
  const pauseBeforeRepeat = 5000; // Pause before repeating

  let typingInterval = setInterval(() => {
    if (charIndex < currentPhrase.length) {
      textElement.textContent += currentPhrase.charAt(charIndex);
      charIndex++;
    } else {
      clearInterval(typingInterval);
      charIndex = 0; // Reset charIndex

      // After typing the phrase, wait for lineBreakSpeed milliseconds
      setTimeout(() => {
        eraseText();
      }, lineBreakSpeed);
    }
  }, typingSpeed);

  function eraseText() {
    let erasingInterval = setInterval(() => {
      if (charIndex > 0) {
        textElement.textContent = textElement.textContent.slice(0, charIndex - 1);
        charIndex--;
      } else {
        clearInterval(erasingInterval);
        setTimeout(() => {
          textElement.textContent = ""; // Clear the text
          setTimeout(() => {
            index = (index + 1) % textPhrases.length; // Loop through the phrases
            if (index === 0) {
              // If it's the end of the loop, pause before repeating
              setTimeout(() => {
                typeText(); // Start typing the next phrase
              }, pauseBeforeRepeat);
            } else {
              typeText(); // Start typing the next phrase without pause
            }
          }, pauseBeforeClear);
        }, clearSpeed);
      }
    }, clearSpeed);
  }
}

// Start the typing animation
setTimeout(typeText, 1000); // Initial delay before starting

window.onload = function () {
  window.scrollTo(0, 0); // Scroll to the top of the page on load
};
