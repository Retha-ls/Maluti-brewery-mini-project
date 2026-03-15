// Simple mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log("JavaScript loaded!");
    
    // Get elements
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-links');
    const body = document.body;
    
    console.log("Menu button found:", menuBtn);
    console.log("Nav menu found:", navMenu);
    
    // Only add click event if elements exist
    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling
            console.log("Menu button clicked!");
            navMenu.classList.toggle('active');
            
            // Toggle body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
            
            // Change icon
            const icon = this.querySelector('i');
            if (icon) {
                if (icon.classList.contains('fa-bars')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
        
        // Close menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                body.style.overflow = '';
                
                // Reset menu button icon
                const icon = menuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !menuBtn.contains(e.target)) {
            navMenu.classList.remove('active');
            body.style.overflow = '';
            
            // Reset menu button icon
            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
    
    // Mobile dropdown functionality
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                const dropdown = this.closest('.dropdown');
                dropdown.classList.toggle('active');
                
                // Toggle icon
                const icon = this.querySelector('i');
                if (icon) {
                    if (icon.classList.contains('fa-chevron-down')) {
                        icon.classList.remove('fa-chevron-down');
                        icon.classList.add('fa-chevron-up');
                    } else {
                        icon.classList.remove('fa-chevron-up');
                        icon.classList.add('fa-chevron-down');
                    }
                }
                
                // Close other dropdowns
                dropdownToggles.forEach(otherToggle => {
                    if (otherToggle !== toggle) {
                        const otherDropdown = otherToggle.closest('.dropdown');
                        otherDropdown.classList.remove('active');
                        const otherIcon = otherToggle.querySelector('i');
                        if (otherIcon) {
                            otherIcon.classList.remove('fa-chevron-up');
                            otherIcon.classList.add('fa-chevron-down');
                        }
                    }
                });
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    body.style.overflow = '';
                    const icon = menuBtn.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 768) {
                // Reset mobile menu state on desktop
                if (navMenu) {
                    navMenu.classList.remove('active');
                    body.style.overflow = '';
                }
                
                // Reset all dropdowns
                dropdownToggles.forEach(toggle => {
                    const dropdown = toggle.closest('.dropdown');
                    dropdown.classList.remove('active');
                    const icon = toggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-chevron-up');
                        icon.classList.add('fa-chevron-down');
                    }
                });
                
                // Reset menu button icon
                if (menuBtn) {
                    const icon = menuBtn.querySelector('i');
                    if (icon && icon.classList.contains('fa-times')) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        }, 250);
    });
    
    // Add touch event for mobile devices
    if (menuBtn) {
        menuBtn.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.click();
        });
    }
});
