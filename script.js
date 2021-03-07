// DOM elements
const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

// Unsplash API
const count = 30;
const apiKey = 'FxFZM2AYrpNxG0bkm0xFHWmvg5dBPDobQxBji9CH4eU';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded)
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

function displayPhoto() {
    photosArray.forEach((photo, index) => {
        imageContainer.insertAdjacentHTML('beforeend', `
            <a href="${photo.links.html}" target="_blank">
                <img src="${photo.urls.regular}" alt="${photo.alt_description}" title="${photo.alt_description}">
            </a>
        `)
        imageContainer.querySelectorAll('img')[index + totalImages - 30]
            .addEventListener('load', imageLoaded)
    })
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl)
        photosArray = await response.json()
        totalImages += photosArray.length;
        displayPhoto();
    } catch (e) {
        // Catch Error Here
        console.log('Whoops: ', e)
    }
}

// Check to see if scrolling near bottom of page, Load More photo
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

// On Load
getPhotos();
