document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const particles = document.querySelector(".particles");
    let currentSlide = 0;
    const totalSlides = slides.length;
    const emojis = [
      "💖",
      "✨",
      "🎂",
      "🎁",
      "🎈",
      "🎊",
      "💕",
      "💓",
      "💗",
      "💘",
    ];

    // Set up the reveal button on slide 4
    const revealBtn = document.querySelector(".reveal-btn");
    const hiddenContent = document.querySelector(".hidden-content");

    revealBtn.addEventListener("click", function () {
      hiddenContent.classList.add("revealed");
      this.style.display = "none";

      // Add extra celebration effect when revealing
      createConfetti();

      // Add shake animation to content
      const content = this.parentElement;
      content.animate(
        [
          { transform: "translateX(-5px)" },
          { transform: "translateX(5px)" },
          { transform: "translateX(-5px)" },
          { transform: "translateX(5px)" },
          { transform: "translateX(0)" },
        ],
        {
          duration: 500,
          easing: "ease",
        }
      );
    });

    // Initialize
    showSlide(currentSlide);
    createHearts();
    createEmojis();

    // Event listeners
    prevBtn.addEventListener("click", () => {
      prevSlide();
      buttonClickEffect(prevBtn);
    });

    nextBtn.addEventListener("click", () => {
      nextSlide();
      buttonClickEffect(nextBtn);
    });

    // Functions
    function prevSlide() {
      slides[currentSlide].classList.remove("active");
      slides[currentSlide].classList.add("previous");

      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;

      slides.forEach((slide, index) => {
        if (index !== currentSlide) {
          slide.classList.remove("previous");
        }
      });

      slides[currentSlide].classList.add("active");
    }

    function nextSlide() {
      slides[currentSlide].classList.remove("active");

      currentSlide = (currentSlide + 1) % totalSlides;

      slides.forEach((slide, index) => {
        slide.classList.remove("previous");
      });

      slides[currentSlide].classList.add("active");

      // Reset hidden content if we navigate away from slide 4
      if (currentSlide !== 3) {
        if (hiddenContent.classList.contains("revealed")) {
          hiddenContent.classList.remove("revealed");
          revealBtn.style.display = "block";
        }
      }
    }

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.remove("active", "previous");
        if (i < index) {
          slide.classList.add("previous");
        }
      });
      slides[index].classList.add("active");
    }

    function buttonClickEffect(button) {
      button.style.transform = "scale(0.9)";
      setTimeout(() => {
        button.style.transform = "";
      }, 200);

      // Add ripple effect
      const ripple = document.createElement("div");
      ripple.style.position = "absolute";
      ripple.style.top = "50%";
      ripple.style.left = "50%";
      ripple.style.width = "0";
      ripple.style.height = "0";
      ripple.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
      ripple.style.borderRadius = "50%";
      ripple.style.transform = "translate(-50%, -50%)";
      ripple.style.transition = "all 0.5s ease-out";

      button.appendChild(ripple);

      setTimeout(() => {
        ripple.style.width = "200%";
        ripple.style.height = "200%";
        ripple.style.opacity = "0";
      }, 10);

      setTimeout(() => {
        ripple.remove();
      }, 500);
    }

    function createHearts() {
      setInterval(() => {
        const heart = document.createElement("div");
        heart.classList.add("heart");

        // Random position
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;

        // Random size
        const size = Math.random() * 15 + 10;

        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;

        document.body.appendChild(heart);

        // Animation
        heart.animate(
          [
            { transform: `rotate(45deg) scale(0)`, opacity: 0 },
            {
              transform: `rotate(45deg) scale(1)`,
              opacity: 1,
              offset: 0.3,
            },
            {
              transform: `rotate(45deg) scale(1) translateY(-${
                Math.random() * 100 + 100
              }px)`,
              opacity: 1,
              offset: 0.8,
            },
            {
              transform: `rotate(45deg) scale(0) translateY(-${
                Math.random() * 200 + 200
              }px)`,
              opacity: 0,
            },
          ],
          {
            duration: 4000,
            easing: "cubic-bezier(0.37, 0, 0.63, 1)",
          }
        );

        setTimeout(() => {
          heart.remove();
        }, 4000);
      }, 300);
    }

    function createEmojis() {
      setInterval(() => {
        if (Math.random() > 0.7) {
          const emoji = document.createElement("div");
          emoji.classList.add("emoji");
          emoji.textContent =
            emojis[Math.floor(Math.random() * emojis.length)];

          // Random position
          const x = Math.random() * window.innerWidth;

          emoji.style.left = `${x}px`;
          emoji.style.bottom = "-30px";

          // Random rotation speed and direction
          const rotationSpeed = Math.random() * 20 - 10;
          const duration = Math.random() * 4000 + 6000;

          particles.appendChild(emoji);

          emoji.animate(
            [
              { transform: "translateY(0) rotate(0deg)", opacity: 0 },
              {
                transform:
                  "translateY(-100px) rotate(" + rotationSpeed * 2 + "deg)",
                opacity: 1,
                offset: 0.1,
              },
              {
                transform:
                  "translateY(-" +
                  (window.innerHeight + 100) +
                  "px) rotate(" +
                  rotationSpeed * 20 +
                  "deg)",
                opacity: 1,
              },
            ],
            {
              duration: duration,
              easing: "cubic-bezier(0.37, 0, 0.63, 1)",
            }
          );

          setTimeout(() => {
            emoji.remove();
          }, duration);
        }
      }, 500);
    }

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    });

    // Add touch swipe functionality
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    function handleSwipe() {
      const swipeThreshold = 50;
      if (touchEndX - touchStartX > swipeThreshold) {
        // Swipe right - previous slide
        prevSlide();
      } else if (touchStartX - touchEndX > swipeThreshold) {
        // Swipe left - next slide
        nextSlide();
      }
    }

    // Add confetti effect on slide change
    function createConfetti() {
      for (let i = 0; i < 50; i++) {
        const confetti = document.createElement("div");
        confetti.style.position = "absolute";
        confetti.style.width = `${Math.random() * 10 + 5}px`;
        confetti.style.height = `${Math.random() * 5 + 5}px`;
        confetti.style.backgroundColor = `hsl(${
          Math.random() * 360
        }, 100%, 70%)`;
        confetti.style.borderRadius = `${
          Math.random() > 0.5 ? "50%" : "0"
        }`;
        confetti.style.top = "-20px";
        confetti.style.left = `${Math.random() * window.innerWidth}px`;
        confetti.style.zIndex = "100";

        document.body.appendChild(confetti);

        const animationDuration = Math.random() * 3000 + 2000;
        const xMovement = (Math.random() - 0.5) * 200;

        confetti.animate(
          [
            { transform: "translateY(0) rotate(0deg)", opacity: 1 },
            {
              transform: `translateX(${xMovement}px) translateY(${
                window.innerHeight
              }px) rotate(${Math.random() * 360}deg)`,
              opacity: 0,
            },
          ],
          {
            duration: animationDuration,
            easing: "cubic-bezier(0.37, 0, 0.63, 1)",
          }
        );

        setTimeout(() => {
          confetti.remove();
        }, animationDuration);
      }
    }

    // Add image hover effects
    const imageBoxes = document.querySelectorAll(".image-box");
    imageBoxes.forEach((box) => {
      box.addEventListener("mouseenter", () => {
        const hearts = [];
        for (let i = 0; i < 5; i++) {
          const miniHeart = document.createElement("div");
          miniHeart.style.position = "absolute";
          miniHeart.style.color = "#ff5e78";
          miniHeart.style.fontSize = `${Math.random() * 15 + 15}px`;
          miniHeart.textContent = "❤";
          miniHeart.style.top = `${Math.random() * 100}%`;
          miniHeart.style.left = `${Math.random() * 100}%`;
          miniHeart.style.zIndex = "10";
          miniHeart.style.opacity = "0";
          box.appendChild(miniHeart);

          miniHeart.animate(
            [
              { transform: "translateY(0)", opacity: 0 },
              { transform: "translateY(-20px)", opacity: 1, offset: 0.3 },
              { transform: "translateY(-40px)", opacity: 0 },
            ],
            {
              duration: 1000,
              easing: "ease-out",
            }
          );

          hearts.push(miniHeart);

          setTimeout(() => {
            miniHeart.remove();
          }, 1000);
        }
      });
    });

    // Create confetti effect on slide change
    prevBtn.addEventListener("click", createConfetti);
    nextBtn.addEventListener("click", createConfetti);

    // Initial confetti
    createConfetti();
  });