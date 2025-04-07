document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const animatedBox = document.getElementById('animatedBox');
    const triggerBtn = document.getElementById('triggerBtn');
    const darkModeToggle = document.getElementById('darkMode');
    const animationSpeedSelect = document.getElementById('animationSpeed');
    
    // Animation types
    const animations = ['bounce', 'spin', 'pulse'];
    let currentAnimationIndex = 0;
    
    // Load saved preferences
    loadPreferences();
    
    // Event Listeners
    triggerBtn.addEventListener('click', triggerAnimation);
    darkModeToggle.addEventListener('change', toggleDarkMode);
    animationSpeedSelect.addEventListener('change', changeAnimationSpeed);
    
    // Trigger animation function
    function triggerAnimation() {
        // Remove any existing animation classes
        animatedBox.classList.remove(...animations);
        
        // Add the next animation
        currentAnimationIndex = (currentAnimationIndex + 1) % animations.length;
        const nextAnimation = animations[currentAnimationIndex];
        animatedBox.classList.add(nextAnimation);
        
        // Save the current animation to localStorage
        localStorage.setItem('lastAnimation', nextAnimation);
    }
    
    // Toggle dark mode
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode', darkModeToggle.checked);
        localStorage.setItem('darkMode', darkModeToggle.checked);
    }
    
    // Change animation speed
    function changeAnimationSpeed() {
        const speed = animationSpeedSelect.value;
        animatedBox.classList.remove('slow-animation', 'fast-animation');
        
        if (speed === 'slow') {
            animatedBox.classList.add('slow-animation');
        } else if (speed === 'fast') {
            animatedBox.classList.add('fast-animation');
        }
        
        localStorage.setItem('animationSpeed', speed);
    }
    
    // Load saved preferences from localStorage
    function loadPreferences() {
        // Dark mode preference
        const savedDarkMode = localStorage.getItem('darkMode') === 'true';
        darkModeToggle.checked = savedDarkMode;
        document.body.classList.toggle('dark-mode', savedDarkMode);
        
        // Animation speed preference
        const savedSpeed = localStorage.getItem('animationSpeed') || 'normal';
        animationSpeedSelect.value = savedSpeed;
        changeAnimationSpeed();
        
        // Last animation preference
        const savedAnimation = localStorage.getItem('lastAnimation');
        if (savedAnimation && animations.includes(savedAnimation)) {
            currentAnimationIndex = animations.indexOf(savedAnimation);
            animatedBox.classList.add(savedAnimation);
        }
    }
    
    // Initialize with first animation if none saved
    if (!localStorage.getItem('lastAnimation')) {
        triggerAnimation();
    }
});
