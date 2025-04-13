const videoItems = document.querySelectorAll('.video-item');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;

function updateVideoDisplay() {
    videoItems.forEach((item, index) => {
        if (index === currentIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === videoItems.length - 1;
}
prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateVideoDisplay();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentIndex < videoItems.length - 1) {
        currentIndex++;
        updateVideoDisplay();
    }
});

updateVideoDisplay();


const menuIcon = document.querySelector('#menu');
        const navMenu = document.getElementById('navLinks');

        menuIcon.addEventListener('click', (e) => {
            console.log(e)
            navMenu.classList.toggle('active');
        });

        const navLinks = document.querySelectorAll('.navLinks a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
