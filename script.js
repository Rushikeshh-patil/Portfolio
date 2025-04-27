document.addEventListener('DOMContentLoaded', () => {
    // Dark Mode Toggle
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const body = document.body;

    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark');
        darkModeToggle.textContent = '☀️';
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark');
        if (body.classList.contains('dark')) {
            darkModeToggle.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        } else {
            darkModeToggle.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        }
    });

    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('open');
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            navLinks.classList.remove('active');
            hamburger.classList.remove('open');
        });
    });

    // Sticky Navbar
    const navbar = document.getElementById('navbar');
    const sticky = navbar.offsetTop;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset >= sticky) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });

    // Project Filter
    const filterButtons = document.querySelectorAll('.filter-buttons button');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = 1, 10);
                } else {
                    card.style.opacity = 0;
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });

    // Project Details Toggle
    const toggleButtons = document.querySelectorAll('.project-toggle');
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const details = button.nextElementSibling;
            details.classList.toggle('active');
            button.textContent = details.classList.contains('active') ? 'Hide Details' : 'Details';
        });
    });

    // Fade-in Animation on Scroll
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
});