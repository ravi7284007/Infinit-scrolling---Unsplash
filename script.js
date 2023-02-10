const imageContainer = document.getElementById('imageContainer');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 10;
const view = "portrait"
// const APIKEY = `tHoYMbjiQBDLML3U45fy_QapwcU2-fqGV3-R4vy_L_o`;
const APIKEY = `fCSXSyqHhxmur2Cbix4ulXvM87BkWd91ejHEYD2f76k`;

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${APIKEY}&count=${count}&orientation=${view}`;

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.style.display = 'none'
    }
}

function setAttribute(ele, attr) {
    for (const key in attr) {
        ele.setAttribute(key, attr[key])
    }
}

// Create Element for links & photos, Add to the DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;

    photosArray.forEach(photo => {
        // Create A tag to unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        item.classList.add('imageBox')
        setAttribute(item, {
            href: photo.links.html,
            target: '_blank'
        })
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description)
        // img.setAttribute('title', photo.alt_description);
        setAttribute(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })

        img.addEventListener('load', imageLoaded)

        item.appendChild(img);
        imageContainer.appendChild(item)
    })
}

// Get Photos from unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos()

    } catch (err) {
        console.log(err);
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});
getPhotos()

