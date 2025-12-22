// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initPageLoadAnimation();
    initScrollProgress();
    initClickSparkEffect();
    initHoverEffects();
    
    // Set current year for any copyright notice
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(el => {
        el.textContent = new Date().getFullYear();
    });
    
    // Mark current page as active in navigation
    highlightCurrentPage();
});

// Initialize Navigation (Mobile Hamburger Menu)
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            // Prevent scrolling when menu is open
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !mobileMenu.contains(event.target)) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            const hamburger = document.querySelector('.hamburger');
            const mobileMenu = document.querySelector('.mobile-menu');
            
            if (hamburger && mobileMenu) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
}

// Page Load Border Animation
function initPageLoadAnimation() {
    // Remove loading animation after page loads
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Remove animation elements after animation completes
        setTimeout(function() {
            const animatedBorders = document.querySelectorAll('body::before, body::after, .main-container::before, .main-container::after');
            // These are pseudo-elements and can't be removed, but we hide them with opacity
        }, 2000);
    });
}

// Scroll Progress Bar
function initScrollProgress() {
    const progressBar = document.querySelector('.progress-bar');
    
    if (progressBar) {
        window.addEventListener('scroll', function() {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }
}

// Click Spark Effect
function initClickSparkEffect() {
    document.addEventListener('click', function(e) {
        // Don't create spark for navigation toggle
        if (e.target.closest('.hamburger')) return;
        
        createSpark(e.clientX, e.clientY);
    });
    
    // Also add spark effect to button clicks for better UX
    const buttons = document.querySelectorAll('.btn, .project-tile, .hobby-tile, .achievement-card, .timeline-content, .connection-link');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Get center of button for spark
            const rect = this.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            
            createSpark(x, y);
        });
    });
}

function createSpark(x, y) {
    const spark = document.createElement('div');
    spark.className = 'spark';
    spark.style.left = x + 'px';
    spark.style.top = y + 'px';
    
    document.body.appendChild(spark);
    
    // Remove spark element after animation
    setTimeout(() => {
        spark.remove();
    }, 500);
}

// Hover Effects
function initHoverEffects() {
    // Add hover class to interactive elements on hover
    const hoverElements = document.querySelectorAll('.project-tile, .hobby-tile, .achievement-card, .timeline-content, .connection-link, .skill-icon');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.classList.add('hover-active');
        });
        
        el.addEventListener('mouseleave', function() {
            this.classList.remove('hover-active');
        });
    });
}

// Highlight Current Page in Navigation
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Project Data Handling (for passing data between pages)
function getProjectData(projectId) {
    // In a real implementation, this would fetch from an API or database
    // For now, we'll use localStorage to pass data between pages
    
    const projects = {
        1: {
            id: 1,
            title: "Predictive Analytics for Customer Behavior",
            thumbnail: "",
            problem: "Businesses struggle to predict customer churn and purchasing behavior, leading to revenue loss and ineffective marketing strategies.",
            startDate: "Jan 2024",
            endDate: "Apr 2024",
            skills: ["python", "pandas", "scikit-learn", "streamlit", "matplotlib"],
            description: "Developed a machine learning model to predict customer churn and purchasing patterns using historical transaction data. The solution includes a Streamlit dashboard for real-time insights and predictions.",
            flowcharts: ["flow1.jpg", "flow2.jpg"],
            outputs: ["output1.jpg", "output2.jpg", "output3.jpg", "output4.jpg"],
            demoVideo: "https://drive.google.com/file/d/example1/view",
            liveLink: "https://customer-analytics-demo.streamlit.app/",
            githubLink: "https://github.com/username/customer-analytics"
        },
        2: {
            id: 2,
            title: "Automated Document Classification System",
            thumbnail: "",
            problem: "Organizations receive thousands of documents daily that need to be categorized manually, which is time-consuming and error-prone.",
            startDate: "Sep 2023",
            endDate: "Dec 2023",
            skills: ["python", "tensorflow", "nltk", "flask", "docker"],
            description: "Built a deep learning model using CNN and NLP techniques to automatically classify documents into predefined categories. The system includes a REST API for integration with existing workflows.",
            flowcharts: ["flow1.jpg", "flow2.jpg"],
            outputs: ["output1.jpg", "output2.jpg", "output3.jpg", "output4.jpg"],
            demoVideo: "",
            liveLink: "https://document-classifier.example.com/",
            githubLink: "https://github.com/username/document-classifier"
        }
    };
    
    return projects[projectId] || projects[1];
}

// Function to load project details on project_description.html
function loadProjectDetails() {
    // Check if we're on the project description page
    if (!window.location.pathname.includes('project_description.html')) return;
    
    // Get project ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id') || 1;
    
    // Get project data
    const project = getProjectData(parseInt(projectId));
    
    // Update page elements with project data
    updateProjectPage(project);
}

// Update project page with data
function updateProjectPage(project) {
    // Update title
    const titleElement = document.querySelector('.project-title');
    if (titleElement && project.title) {
        titleElement.textContent = project.title;
    }
    
    // Update meta information
    const dateElement = document.querySelector('.project-date');
    if (dateElement && project.startDate && project.endDate) {
        dateElement.textContent = `${project.startDate} - ${project.endDate}`;
    }
    
    // Update problem statement
    const problemElement = document.querySelector('.project-problem');
    if (problemElement && project.problem) {
        problemElement.textContent = project.problem;
    }
    
    // Update description
    const descriptionElement = document.querySelector('.project-description');
    if (descriptionElement && project.description) {
        descriptionElement.textContent = project.description;
    }
    
    // Update skills
    const skillsContainer = document.querySelector('.project-skills');
    if (skillsContainer && project.skills) {
        skillsContainer.innerHTML = '';
        project.skills.forEach(skill => {
            const skillIcon = document.createElement('div');
            skillIcon.className = 'skill-icon';
            skillIcon.innerHTML = `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skill}/${skill}-original.svg" alt="${skill}" />`;
            skillsContainer.appendChild(skillIcon);
        });
    }
    
    // Update links
    const demoLink = document.querySelector('.demo-link');
    if (demoLink) {
        if (project.demoVideo) {
            demoLink.href = project.demoVideo;
            demoLink.style.display = 'inline-block';
        } else {
            demoLink.style.display = 'none';
        }
    }
    
    const liveLink = document.querySelector('.live-link');
    if (liveLink && project.liveLink) {
        liveLink.href = project.liveLink;
    }
    
    const githubLink = document.querySelector('.github-link');
    if (githubLink && project.githubLink) {
        githubLink.href = project.githubLink;
    }
    
    // Update page title
    document.title = `${project.title} - My Portfolio`;
}

// Initialize project details if on project description page
if (window.location.pathname.includes('project_description.html')) {
    document.addEventListener('DOMContentLoaded', loadProjectDetails);
}
