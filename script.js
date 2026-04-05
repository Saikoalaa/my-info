
(function() {
    // ========== DETECT REACHING THE END OF PROFILE ==========
    const endElement = document.getElementById('endOfProfile');
    const toast = document.getElementById('endToast');
    let hasShownToast = false;

    if (endElement && toast) {
        // Using Intersection Observer for mobile performance
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
                    if (!hasShownToast) {
                        showEndToast();
                        hasShownToast = true;
                        // subtle visual feedback on end section
                        endElement.style.transition = "background 0.3s, border-color 0.2s";
                        endElement.style.backgroundColor = "#1a0a0a";
                        endElement.style.borderColor = "#dc2626";
                        setTimeout(() => {
                            if (endElement) endElement.style.backgroundColor = "";
                            if (endElement) endElement.style.borderColor = "#2c2c2c";
                        }, 700);
                    }
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: "0px 0px -20px 0px"
        });
        
        observer.observe(endElement);
    } else {
        // Fallback for older browsers
        let fallbackActive = true;
        const checkScrollEnd = () => {
            if (hasShownToast) {
                if (fallbackActive) window.removeEventListener('scroll', checkScrollEnd);
                return;
            }
            const scrollPosition = window.scrollY + window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            if (scrollPosition >= documentHeight - 80) {
                showEndToast();
                hasShownToast = true;
                if (endElement) {
                    endElement.style.backgroundColor = "#1a0a0a";
                    endElement.style.borderColor = "#dc2626";
                    setTimeout(() => {
                        if (endElement) endElement.style.backgroundColor = "";
                        if (endElement) endElement.style.borderColor = "#2c2c2c";
                    }, 700);
                }
                if (fallbackActive) window.removeEventListener('scroll', checkScrollEnd);
            }
        };
        window.addEventListener('scroll', checkScrollEnd);
        checkScrollEnd(); // initial check
    }

    function showEndToast() {
        if (!toast) return;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3500);
    }

    // ========== SOCIAL BUTTONS INTERACTION (non-intrusive demo) ==========
    // Since you want to keep social links but remove "contact / portfolio" buttons,
    // we just add a subtle temporary message when clicking social icons (to avoid page reload 
    // while preserving the demo feel. You can later replace # with real links).
    const socialBtns = document.querySelectorAll('.social-btn');
    socialBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const iconElem = btn.querySelector('i');
            let platform = "social";
            if (iconElem) {
                const classList = iconElem.classList;
                if (classList.contains('fa-twitter')) platform = "Twitter";
                else if (classList.contains('fa-instagram')) platform = "Instagram";
                else if (classList.contains('fa-linkedin-in')) platform = "LinkedIn";
                else if (classList.contains('fa-github')) platform = "GitHub";
                else if (classList.contains('fa-youtube')) platform = "YouTube";
            }
            // Flash message (lightweight, no alerts)
            const tempMsg = document.createElement('div');
            tempMsg.textContent = `🔗 Opening ${platform} (link ready to connect)`;
            tempMsg.style.position = 'fixed';
            tempMsg.style.bottom = '90px';
            tempMsg.style.left = '50%';
            tempMsg.style.transform = 'translateX(-50%)';
            tempMsg.style.backgroundColor = '#111111';
            tempMsg.style.color = '#f87171';
            tempMsg.style.padding = '8px 20px';
            tempMsg.style.borderRadius = '40px';
            tempMsg.style.fontSize = '0.75rem';
            tempMsg.style.fontWeight = '500';
            tempMsg.style.zIndex = '999';
            tempMsg.style.whiteSpace = 'nowrap';
            tempMsg.style.border = '1px solid #b91c1c';
            tempMsg.style.fontFamily = "'Inter', sans-serif";
            tempMsg.style.backdropFilter = 'blur(4px)';
            document.body.appendChild(tempMsg);
            setTimeout(() => tempMsg.remove(), 2000);
        });
    });
    
    // ========== ADD A WELCOME TOUCH (non-intrusive, appears once) ==========
    let welcomeShown = false;
    const showWelcomeHint = () => {
        if (welcomeShown) return;
        welcomeShown = true;
        const welcomeDiv = document.createElement('div');
        welcomeDiv.textContent = '🖤 Scroll down to reach the red edge 🩸';
        welcomeDiv.style.position = 'fixed';
        welcomeDiv.style.top = '20px';
        welcomeDiv.style.left = '50%';
        welcomeDiv.style.transform = 'translateX(-50%)';
        welcomeDiv.style.backgroundColor = '#1c1c1c';
        welcomeDiv.style.color = '#ef4444';
        welcomeDiv.style.padding = '6px 18px';
        welcomeDiv.style.borderRadius = '60px';
        welcomeDiv.style.fontSize = '0.7rem';
        welcomeDiv.style.fontWeight = '500';
        welcomeDiv.style.zIndex = '999';
        welcomeDiv.style.whiteSpace = 'nowrap';
        welcomeDiv.style.border = '0.5px solid #b91c1c';
        welcomeDiv.style.fontFamily = "'Inter', sans-serif";
        document.body.appendChild(welcomeDiv);
        setTimeout(() => welcomeDiv.remove(), 2800);
    };
    // small delay to not overwhelm user
    setTimeout(showWelcomeHint, 800);
    
    // optional: smooth class for any interaction
    console.log("Black & Red Profile — Ready | No action buttons, only socials.");
})();
