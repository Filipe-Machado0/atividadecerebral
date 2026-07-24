document.addEventListener("DOMContentLoaded", () => {
    // 1. FAQ Accordion
    const faqButtons = document.querySelectorAll("#faq button");
    faqButtons.forEach(button => {
        button.addEventListener("click", () => {
            const content = button.nextElementSibling;
            const arrow = button.querySelector("span");
            
            if (content.style.maxHeight === "0px" || content.style.maxHeight === "") {
                content.style.maxHeight = content.scrollHeight + 30 + "px";
                content.style.paddingBottom = "1rem";
                arrow.style.transform = "rotate(180deg)";
            } else {
                content.style.maxHeight = "0px";
                content.style.paddingBottom = "0px";
                arrow.style.transform = "rotate(0deg)";
            }
        });
    });

    // 2. Notification Toast
    const toast = document.querySelector(".notification-toast");
    
    if (toast) {
        const toastNumber = toast.querySelector("strong");
        toast.style.transition = "all 0.5s ease";
        toast.style.transform = "translateY(100px)";
        toast.style.opacity = "0";
        toast.style.position = "fixed";
        toast.style.bottom = "20px";
        toast.style.left = "20px";
        toast.style.zIndex = "9999";
        toast.style.display = "flex";

        function showToast() {
            const num = Math.floor(Math.random() * 30) + 15;
            if (toastNumber) toastNumber.innerText = num + " pessoas";
            
            toast.style.transform = "translateY(0)";
            toast.style.opacity = "1";
            
            setTimeout(() => {
                toast.style.transform = "translateY(100px)";
                toast.style.opacity = "0";
            }, 4000);
        }

        setInterval(showToast, 12000);
        setTimeout(showToast, 3000);
    }

    // 3. Exit Intent Modal
    const exitModal = document.querySelector(".exit-intent-modal");
    
    if (exitModal) {
        let modalShown = false;
        
        exitModal.style.transition = "opacity 0.3s ease";
        exitModal.style.opacity = "0";
        exitModal.style.pointerEvents = "none";
        exitModal.style.position = "fixed";
        exitModal.style.top = "0";
        exitModal.style.left = "0";
        exitModal.style.width = "100%";
        exitModal.style.height = "100%";
        exitModal.style.backgroundColor = "rgba(0,0,0,0.6)";
        exitModal.style.backdropFilter = "blur(3px)";
        exitModal.style.zIndex = "10000";
        exitModal.style.display = "flex";
        exitModal.style.alignItems = "center";
        exitModal.style.justifyContent = "center";

        const modalContent = exitModal.querySelector(".modal-content");
        if (modalContent) {
            modalContent.style.backgroundColor = "#fff";
            modalContent.style.padding = "3rem 2rem";
            modalContent.style.borderRadius = "24px";
            modalContent.style.position = "relative";
            modalContent.style.width = "90%";
            modalContent.style.maxWidth = "450px";
            modalContent.style.textAlign = "center";
            modalContent.style.boxShadow = "0 0 40px 10px rgba(138, 43, 226, 0.4)";
            modalContent.style.border = "3px solid rgba(138, 43, 226, 0.6)";
        }

        const modalIcon = exitModal.querySelector(".modal-icon");
        if (modalIcon) {
            modalIcon.style.fontSize = "4.5rem";
            modalIcon.style.display = "block";
            modalIcon.style.marginBottom = "1rem";
            modalIcon.style.lineHeight = "1";
        }

        const closeBtn = exitModal.querySelector(".modal-close");
        if (closeBtn) {
            closeBtn.style.position = "absolute";
            closeBtn.style.top = "15px";
            closeBtn.style.right = "15px";
            closeBtn.style.fontSize = "1.5rem";
            closeBtn.style.color = "#999";
            closeBtn.style.background = "none";
            closeBtn.style.border = "none";
            closeBtn.style.cursor = "pointer";
            
            closeBtn.addEventListener("click", () => {
                exitModal.style.opacity = "0";
                exitModal.style.pointerEvents = "none";
            });
        }
        
        const contentBtn = exitModal.querySelector(".btn-primary");
        if (contentBtn) {
            contentBtn.style.backgroundColor = "#8b5cf6";
            contentBtn.style.color = "white";
            contentBtn.style.padding = "1rem 2rem";
            contentBtn.style.borderRadius = "2rem";
            contentBtn.style.display = "inline-block";
            contentBtn.style.fontWeight = "bold";
            contentBtn.style.marginTop = "1rem";
            contentBtn.style.border = "none";
            contentBtn.style.textDecoration = "none";
            contentBtn.style.boxShadow = "0 4px 15px rgba(138, 43, 226, 0.3)";
            
            contentBtn.addEventListener("click", () => {
                exitModal.style.opacity = "0";
                exitModal.style.pointerEvents = "none";
            });
        }

        // Show modal when mouse leaves the document (exit intent)
        document.addEventListener("mouseleave", (e) => {
            if (e.clientY <= 20 && !modalShown) {
                modalShown = true;
                exitModal.style.opacity = "1";
                exitModal.style.pointerEvents = "auto";
            }
        });
        
        // Failsafe & Mobile Exit Intent: if they scroll down then quickly back to top
        let hasScrolledDown = false;
        document.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                hasScrolledDown = true;
            }
            if (hasScrolledDown && window.scrollY < 50 && !modalShown) {
                modalShown = true;
                exitModal.style.opacity = "1";
                exitModal.style.pointerEvents = "auto";
            }
        });
    }

    // 4. Timer Bar
    const timerElement = document.querySelector(".timer-numbers");
    if (timerElement) {
        let timeLeft = 15 * 60; // 15 minutes
        setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
                const s = (timeLeft % 60).toString().padStart(2, '0');
                timerElement.innerText = `${m}:${s}`;
            }
        }, 1000);
    }
    
    // 5. Carousel
    const slides = document.querySelectorAll(".carousel-slide");
    const dots = document.querySelectorAll(".carousel-dots .dot");
    const prevBtn = document.querySelector(".carousel-prev");
    const nextBtn = document.querySelector(".carousel-next");
    
    if (slides.length > 0) {
        let currentSlide = 0;
        
        slides.forEach((s, i) => {
            s.style.display = i === 0 ? "block" : "none";
            s.style.width = "100%";
            s.style.borderRadius = "1rem";
        });

        function showSlide(index) {
            slides.forEach(s => s.style.display = "none");
            dots.forEach(d => d.classList.remove("active"));
            
            slides[index].style.display = "block";
            if(dots[index]) dots[index].classList.add("active");
            currentSlide = index;
        }

        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                let prev = currentSlide - 1;
                if (prev < 0) prev = slides.length - 1;
                showSlide(prev);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                let next = currentSlide + 1;
                if (next >= slides.length) next = 0;
                showSlide(next);
            });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => showSlide(index));
        });
        
        setInterval(() => {
            let next = currentSlide + 1;
            if (next >= slides.length) next = 0;
            showSlide(next);
        }, 4000);
    }
});
