// Dark mode toggle
document.querySelectorAll("#darkModeToggle").forEach(btn => {
    btn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
});

// Back-to-top button
const backToTopButtons = document.querySelectorAll("#backToTop");
backToTopButtons.forEach(btn => {
    btn.style.display = "none";
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) btn.style.display = "block";
        else btn.style.display = "none";
    });
    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

// Optional: fade-in effect
document.querySelectorAll(".section").forEach(section => {
    section.style.opacity = 0;
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 1s ease-out, transform 1s ease-out";
    window.addEventListener("scroll", () => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            section.style.opacity = 1;
            section.style.transform = "translateY(0)";
        }
    });
});