// =====================================================
// TYPED.JS
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    const typedElement = document.querySelector(".typed-text");

    if (typedElement && typeof Typed !== "undefined") {

        new Typed(".typed-text", {

            strings: [
                "Full-Stack Web Developer",
                "MERN Stack Developer",
                "Frontend Developer",
                "Backend Developer"
            ],

            typeSpeed: 70,
            backSpeed: 45,
            backDelay: 1500,

            loop: true,

            showCursor: true,
            cursorChar: "|"

        });

    }


    // =================================================
    // MOBILE NAVBAR
    // =================================================

    const menuBtn = document.getElementById("menu-btn");
    const navbar = document.getElementById("navbar");

    if (menuBtn && navbar) {

        menuBtn.addEventListener("click", () => {

            navbar.classList.toggle("active");

            const icon = menuBtn.querySelector("i");

            if (navbar.classList.contains("active")) {

                icon.classList.remove("bx-menu");
                icon.classList.add("bx-x");

            } else {

                icon.classList.remove("bx-x");
                icon.classList.add("bx-menu");

            }

        });


        // Mobile menu link click ke baad close

        const navLinks = navbar.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navbar.classList.remove("active");

                const icon = menuBtn.querySelector("i");

                icon.classList.remove("bx-x");
                icon.classList.add("bx-menu");

            });

        });

    }


    // =================================================
    // ACTIVE NAVBAR LINK
    // =================================================

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".navbar a");

    function updateActiveLink() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {

                currentSection = section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === `#${currentSection}`) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener("scroll", updateActiveLink);

    updateActiveLink();


    // =================================================
    // CURRENT YEAR
    // =================================================

    const yearElement = document.getElementById("year");

    if (yearElement) {

        yearElement.textContent = new Date().getFullYear();

    }


    // =================================================
    // CONTACT FORM
    // =================================================

    const contactForm = document.getElementById("contact-form");
    const formMessage = document.getElementById("form-message");

    if (contactForm) {

        contactForm.addEventListener("submit", async (event) => {

            event.preventDefault();


            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();


            // Basic validation

            if (!name || !email || !subject || !message) {

                showFormMessage(
                    "Please fill in all fields.",
                    "error"
                );

                return;

            }


            // Email validation

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {

                showFormMessage(
                    "Please enter a valid email address.",
                    "error"
                );

                return;

            }


            // -----------------------------------------
            // BACKEND CONNECTION
            // -----------------------------------------
            //
            // Part 4 mein Express backend banayenge.
            //
            // Backend URL:
            //
            // http://localhost:5000/api/contact
            //
            // Deployment ke baad is URL ko production
            // backend URL se replace karenge.
            //

            const API_URL = "http://localhost:5000/api/contact";


            try {

                showFormMessage(
                    "Sending message...",
                    "loading"
                );


                const response = await fetch(API_URL, {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        name: name,
                        email: email,
                        subject: subject,
                        message: message

                    })

                });


                const data = await response.json();


                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Something went wrong."
                    );

                }


                showFormMessage(
                    data.message ||
                    "Message sent successfully!",
                    "success"
                );


                // Form clear

                contactForm.reset();


            } catch (error) {

                console.error(
                    "Contact form error:",
                    error
                );


                showFormMessage(
                    "Unable to send message right now. Please try again later.",
                    "error"
                );

            }

        });

    }


    // =================================================
    // FORM MESSAGE FUNCTION
    // =================================================

    function showFormMessage(message, type) {

        if (!formMessage) return;

        formMessage.textContent = message;


        if (type === "success") {

            formMessage.style.color = "#00ff88";

        } else if (type === "error") {

            formMessage.style.color = "#ff6b6b";

        } else {

            formMessage.style.color = "#00eeff";

        }

    }


    // =================================================
    // SCROLL REVEAL
    // =================================================

    const revealElements = document.querySelectorAll(
        ".section-title, .about-container, .skill-card, .project-card, .certificate-card, .contact-container"
    );


    const observer = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(element => {

        element.classList.add("reveal");

        observer.observe(element);

    });


    // =================================================
    // BACK TO TOP
    // =================================================

    const backToTop = document.querySelector(".footer a");

    if (backToTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {

                backToTop.style.opacity = "1";

                backToTop.style.pointerEvents = "auto";

            } else {

                backToTop.style.opacity = "0.7";

            }

        });

    }

});