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
        9: {
            id: 9,
            title: "Next Assignment",
            thumbnail: "",
            problem: "Automated system generating skill-based assignments using real-time Indian news.",
            startDate: "Sept 2025",
            endDate: "Sept 2025",
			project_subject: "Data Science, GEN AI",
			project_tech: "ETL, GNews, S-Transformers",
            skills: ["python", "streamlit", "postgresql", "githubactions"],
            description: "A daily script collects five latest Indian news articles, stores them, and uses subject and skill inputs to create two engaging, real-world assignments improving practical understanding.",
            flowcharts: [],
            outputs: ["project_9_1.jpg", "project_9_2.jpg", "project_9_3.jpg"],
            demoVideo: "https://drive.google.com/file/d/14lLT0SGEf3hqdU98zH8t8KR5dGPD6KuM/view",
            liveLink: "https://next-assignment.streamlit.app/",
            githubLink: "https://github.com/harshbari-153/Next-Assignment"
        },
        8: {
            id: 8,
            title: "Knitting Justification Neural Network (KJNN)",
            thumbnail: "",
            problem: "Neural network for fine-grained claim and justification truth classification.",
            startDate: "Jan 2025",
            endDate: "Jan 2025",
			project_subject: "MTech Dissertation",
			project_tech: "sBERT, DistilBERT, GloVe, RoBERTa Base, Word2Vec",
            skills: ["python", "pytorch", "numpy", "scikitlearn", "jupyter"],
            description: "MTech dissertation proposing a novel neural network classifying claims with supporting justifications into six truth levels, trained on 21k PolitiFact articles to detect fake statements, speeches, and misleading advertisements.",
            flowcharts: ["project_8_2.png"],
            outputs: ["project_8_1.png", "project_8_3.jpg", "project_8_4.png", "project_8_5.png"],
            demoVideo: "",
            liveLink: "",
            githubLink: "https://github.com/harshbari-153/KJNN"
        },
        7: {
            id: 7,
            title: "PARAKH",
            thumbnail: "",
            problem: "Trust scoring system for identifying genuine and reliable college reviews.",
            startDate: "Feb 2025",
            endDate: "Feb 2025",
			project_subject: "Dotslash 8.0 Hackathon at SVNIT, Surat",
			project_tech: "Streamlit",
            skills: ["python", "streamlit", "firebase", "Gemini_API"],
            description: "Built during a college hackathon by a three-member team, PARAKH analyzes reviews and assigns a 0–100 trust score, helping students distinguish authentic feedback from biased or fake opinions.",
            flowcharts: [],
            outputs: ["project_7_1.jpg", "project_7_2.jpg", "project_7_1.jpg", "project_7_2.jpg"],
            demoVideo: "https://youtu.be/M7bCrkPdl_g?si=wrP2x_tZ8RRD9vpX",
            liveLink: "",
            githubLink: "https://github.com/harshbari-153/PARAKH"
        },/*
        6: {
            id: 6,
            title: "Claim Justification Cross Question Generator",
            thumbnail: "",
            problem: "Automated generation of cross-questions for claim and justification evaluation.",
            startDate: "Dec 2024",
            endDate: "Dec 2024",
			project_subject: "LLM Text Generation",
			project_tech: "BART, Pegasus, GPT-2, T5",
            skills: ["python", "scikitlearn", "NLTK", "jupyter"],
            description: "Research project extending claim-justification classification by generating logical cross-questions for any given claim and supporting sentences, aiding deeper verification and critical analysis of potentially misleading information.",
            flowcharts: [],
            outputs: ["output1.jpg", "output2.jpg", "output3.jpg", "output4.jpg"],
            demoVideo: "",
            liveLink: "",
            githubLink: "https://github.com/harshbari-153/Text_Generation_in_Claim_Justification"
        },*/
        5: {
            id: 5,
            title: "BDP Vectorization",
            thumbnail: "",
            problem: "Novel sentence embedding technique for improved semantic representation in NLP.",
            startDate: "Feb 2024",
            endDate: "April 2024",
			project_subject: "NLP Research",
			project_tech: "Sarcasm Detection Dataset",
            skills: ["python", "jupyter"],
            description: "An NLP research project proposing a new sentence vectorization method, evaluated on an 80k-plus Twitter sarcasm detection dataset, showing effective semantic understanding compared to traditional embeddings.",
            flowcharts: ["project_5_1.jpg"],
            outputs: ["project_5_2.png", "project_5_3.png", "project_5_4.png"],
            demoVideo: "",
            liveLink: "",
            githubLink: "https://github.com/harshbari-153/BDP-Vectorization"
        },
        4: {
            id: 4,
            title: "Chess",
            thumbnail: "",
            problem: "Console-based single-player chess game using minimax with alpha-beta pruning.",
            startDate: "July 2023",
            endDate: "July 2023",
			project_subject: "AI, MiniMax Algorithm",
			project_tech: "Alpha Beta Pruning",
            skills: ["cplusplus"],
            description: "A basic console chess game where the player competes against an AI opponent implemented using the minimax algorithm with alpha-beta pruning for efficient decision-making.",
            flowcharts: [],
            outputs: ["output1.jpg", "output2.jpg", "output3.jpg", "output4.jpg"],
            demoVideo: "",
            liveLink: "",
            githubLink: "https://github.com/harshbari-153/Chess"
        },
        3: {
            id: 3,
            title: "Generalized Immutable Ledger (GILED)",
            thumbnail: "project_3_4.jpg",
            problem: "Decentralized immutable ledger system for building trust in shared databases.",
            startDate: "Jan 2023",
            endDate: "Dec 2021",
			project_subject: "BTech Final Year Project",
			project_tech: "Blockchain Architecture",
            skills: ["csharp", "visualstudio"],
            description: "BTech final year project designing a generalized immutable ledger using blockchain architecture, enabling decentralized data storage with transparency, integrity, and trust across distributed database systems.",
            flowcharts: [],
            outputs: ["project_3_1.jpg", "project_3_2.jpg", "project_3_3.jpg", "project_3_4.jpg"],
            demoVideo: "",
            liveLink: "",
            githubLink: "https://github.com/harshbari-153/GILED"
        },
        2: {
            id: 2,
            title: "Harry Porter Game",
            thumbnail: "project_2_1.jpeg",
            problem: "Console-based adventure game inspired by the Harry Potter storyline.",
            startDate: "Nov 2020",
            endDate: "Nov 2020",
			project_subject: "TURBO C GAME",
			project_tech: "Fun Game",
            skills: ["cplusplus"],
            description: "A colorful console game with seven levels where players destroy horcruxes using wands or swords, following a Harry Potter-inspired storyline with progressive challenges.",
            flowcharts: [],
            outputs: ["project_2_1.jpeg", "project_2_2.jpeg", "project_2_3.jpeg", "project_2_4.jpeg", "project_2_5.jpeg"],
            demoVideo: "",
            liveLink: "",
            githubLink: "https://github.com/harshbari-153/Basic-Turbo-C-Games"
        },
        1: {
            id: 1,
            title: "Tank Shadow Game",
            thumbnail: "",
            problem: "Console game featuring an invisible target tracked only through its shadow.",
            startDate: "July 2020",
            endDate: "July 2020",
			project_subject: "TURBO C GAME",
			project_tech: "Fun Game",
            skills: ["cplusplus"],
            description: "A console-based game where a tank aims at a hidden moving target, visible only by its shadow, which moves exactly opposite to the actual target position.",
            flowcharts: [],
            outputs: ["project_1_1.jpg", "project_1_2.jpg", "project_1_3.jpg", "project_1_3.jpg"],
            demoVideo: "",
            liveLink: "",
            githubLink: "https://github.com/harshbari-153/Tank-Shadow-Game"
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
	
	// Update project subject
    const projectSubject = document.querySelector('.project-subject');
    if (projectSubject && project.project_subject) {
        projectSubject.textContent = project.project_subject;
    }
	
	// Update project subject
    const projectTech = document.querySelector('.project-tech');
    if (projectTech && project.project_tech) {
        projectTech.textContent = project.project_tech;
    }
    
    // Update project date
    const dateElement = document.querySelector('.project-date');
    if (dateElement && project.startDate && project.endDate) {
        dateElement.textContent = `${project.startDate} - ${project.endDate}`;
    }
	
	// Project Image
    const projectImage = document.querySelector('.project-image-main');
    if (project.thumbnail) {
        projectImage.src = "assets/images/" + project.thumbnail;
    }
	else {
		projectImage.src = "assets/images/default_project.png";
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
	
	// flowcharts
	const flowchartImages = document.querySelector('.flowchart');
	if (project.flowcharts && project.flowcharts.length > 0) {
		const imagesGrid = flowchartImages.querySelector('.project-images-grid');

		project.flowcharts.forEach(imagePath => {
			// Create container div
			const imageContainer = document.createElement('div');
			imageContainer.classList.add('project-image-container');

			// Create image element
			const img = document.createElement('img');
			img.src = "assets/images/" + imagePath;
			img.alt = 'Project flowchart';
			img.style.height = '200px';
			img.style.width = '100%';
			img.style.border = "2px solid black";
			img.style.display = "flex";

			// Append image to container
			imageContainer.appendChild(img);

			// Append container to grid
			imagesGrid.appendChild(imageContainer);
		});
	} else {
		flowchartImages.style.display = 'none';
	}

	
	// output
	const outputImages = document.querySelector('.output');
	if (project.outputs && project.outputs.length > 0) {
		const imagesGrid = outputImages.querySelector('.project-images-grid');

		project.outputs.forEach(imagePath => {
			// Create container div
			const imageContainer = document.createElement('div');
			imageContainer.classList.add('project-image-container');

			// Create image element
			const img = document.createElement('img');
			img.src = "assets/images/" + imagePath;
			img.alt = 'Project output';
			img.style.height = '200px';
			img.style.width = '100%';
			img.style.border = "2px solid black";
			img.style.display = "flex";

			// Append image to container
			imageContainer.appendChild(img);

			// Append container to grid
			imagesGrid.appendChild(imageContainer);
		});
	}
	else {
		outputImages.style.display = 'none';
	}
	
    
	// Watch Demo
    const demoLink = document.querySelector('.demo-link');
    if (demoLink) {
        if (project.demoVideo) {
            demoLink.href = project.demoVideo;
            demoLink.style.display = 'inline-block';
        } else {
            demoLink.style.display = 'none';
        }
    }
    
	// Live Link
    const liveLink = document.querySelector('.live-link');
    if (liveLink && project.liveLink) {
        liveLink.href = project.liveLink;
    }
	else {
		liveLink.style.display = 'none';
	}
    
	// GitHub Link
    const githubLink = document.querySelector('.github-link');
    if (githubLink && project.githubLink) {
        githubLink.href = project.githubLink;
    }
	else {
		githubLink.style.display = 'none';
	}
    
    // Update page title
    document.title = `${project.title} - My Portfolio`;
}

// Initialize project details if on project description page
if (window.location.pathname.includes('project_description.html')) {
    document.addEventListener('DOMContentLoaded', loadProjectDetails);
}
