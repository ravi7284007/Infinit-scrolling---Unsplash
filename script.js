const imageContainer = document.getElementById('imageContainer');
const loader = document.getElementById('loader')

let photoArray = [];

const imageBox = document.querySelector('.imageBox')


// Unsplash API
const count = 30;
const view = "portrait"
const APIKEY = `tHoYMbjiQBDLML3U45fy_QapwcU2-fqGV3-R4vy_L_o`;

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${APIKEY}&count=${count}&orientation=${view}`;

// Create Element for links & photos, Add to the DOM
function displayPhotos() {
    photoArray.forEach(photo => {
        // Create A tag to unsplash
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        item.classList.add('imageBox')

        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description)
        img.setAttribute('title', photo.alt_description);

        item.appendChild(img);
        imageContainer.appendChild(item)
    })
}

// Get Photos from unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photoArray = await response.json();
        displayPhotos()

    } catch (err) {
        console.log(err);
    }
}
getPhotos()