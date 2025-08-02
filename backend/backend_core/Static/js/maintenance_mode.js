// Progress bar animation
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const notifyButton = document.getElementById('notifyButton');
const notification = document.getElementById('notification');
const notifyEmail = document.getElementById('notifyEmail');

// Set random completion time between 30-60 minutes
const completionMinutes = Math.floor(Math.random() * 30) + 30;
const completionDate = new Date();
completionDate.setMinutes(completionDate.getMinutes() + completionMinutes);

// Format time
function formatTime(date) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
}

progressText.textContent = `Estimated completion: ${formatTime(completionDate)}`;

// Animate progress bar
let progress = 0;
const interval = setInterval(() => {
    progress += 0.5;
    progressBar.style.width = `${progress}%`;
    
    if (progress >= 100) {
        clearInterval(interval);
    }
}, completionMinutes * 600); // Divide by 100 for percentage and multiply by 1000 for ms

// Notification functionality
notifyButton.addEventListener('click', () => {
    if (notifyEmail.value.trim() !== '' && notifyEmail.value.includes('@')) {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
        notifyEmail.value = '';
    } else {
        notifyEmail.focus();
        notifyEmail.style.borderColor = '#ef4444';
        setTimeout(() => {
            notifyEmail.style.borderColor = '';
        }, 3000);
    }
});

// Create floating particles
const particles = document.getElementById('particles');

function createParticles() {
    particles.innerHTML = '';
    const particleCount = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size between 5-20px
        const size = Math.random() * 15 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random animation
        const duration = Math.random() * 50 + 10;
        particle.style.animation = `float ${duration}s ease-in-out infinite`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        particles.appendChild(particle);
    }
}

createParticles();
window.addEventListener('resize', createParticles);// Empty JS for maintenance_mode page
