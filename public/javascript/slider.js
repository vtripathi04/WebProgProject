document.addEventListener("DOMContentLoaded", function () {
    // Get all scroller containers on the page
    const scrollerContainers = document.querySelectorAll(".image-scroller");

    // Loop through each scroller
    scrollerContainers.forEach((scrollerContainer) => {
        const container = scrollerContainer.querySelector(".scroller-container");
        const prevButton = scrollerContainer.querySelector(".prev-button");
        const nextButton = scrollerContainer.querySelector(".next-button");

        let currentIndex = 0;
        const slideWidth = container.children[0].offsetWidth;
        const totalSlides = container.children.length;

        function showSlide(index) {
            const newPosition = -index * slideWidth;
            container.style.transform = `translateX(${newPosition}px)`;
        }

        function showNextSlide() {
            currentIndex = (currentIndex + 1) % totalSlides;
            showSlide(currentIndex);
        }

        function showPrevSlide() {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            showSlide(currentIndex);
        }

        nextButton.addEventListener("click", function () {
            showNextSlide();
        });

        prevButton.addEventListener("click", function () {
            showPrevSlide();
        });

        // Infinite scrolling logic
        function startInfiniteScroll() {
            setInterval(() => {
                showNextSlide();

                // If we reach the end, reset to the first slide
                if (currentIndex === 0) {
                    container.style.transition = "none"; // Disable transition for instant reset
                    setTimeout(() => {
                        showSlide(currentIndex);
                        container.style.transition = ""; // Re-enable transition for smooth animation
                    }, 0);
                }
            }, 3000); // Adjust the interval as needed (in milliseconds)
        }

        // Start infinite scrolling
        startInfiniteScroll();


        
    });
});
