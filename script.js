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
    const toggleButton = () => {
        if (window.scrollY > 300) btn.style.display = "block";
        else btn.style.display = "none";
    };

    // Initial check
    toggleButton();

    window.addEventListener("scroll", toggleButton);

    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
