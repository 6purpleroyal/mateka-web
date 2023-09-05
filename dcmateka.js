var backgroundImages = ["sermons-bg.jpg", "sermons1-bg.jpg", "sermons2-bg.jpg"]; // Add your image URLs here
        var currentIndex = 0;
        
        function changeBackgroundImage() {
            currentIndex = (currentIndex + 1) % backgroundImages.length;
            var imageUrl = 'url(' + backgroundImages[currentIndex] + ')';
            document.querySelector('.image-slider').style.backgroundImage = imageUrl;
        }
        
        // Change background image every 3 seconds
        setInterval(changeBackgroundImage, 3000);
