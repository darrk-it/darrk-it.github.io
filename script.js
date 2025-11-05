// -------------------- Dark Mode Toggle --------------------
const darkModeButtons = document.querySelectorAll("#darkModeToggle");
darkModeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
});

// -------------------- Back-to-Top Button --------------------
const backToTopButtons = document.querySelectorAll("#backToTop");

backToTopButtons.forEach(btn => {
    btn.style.display = "none";

    const toggleButton = () => {
        if (window.scrollY > 300) btn.style.display = "block";
        else btn.style.display = "none";
    };

    window.addEventListener("scroll", toggleButton);
    window.addEventListener("load", toggleButton);

    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

// -------------------- Stable Fade-In Effect --------------------
const fadeSections = document.querySelectorAll(".fade-in");

// Initialize sections
fadeSections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 1s ease-out, transform 1s ease-out";
});

const handleFadeIn = () => {
    fadeSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            section.style.opacity = 1;
            section.style.transform = "translateY(0)";
        }
    });
};

// Trigger fade-in on scroll and page load
window.addEventListener("scroll", handleFadeIn);
window.addEventListener("load", handleFadeIn);
