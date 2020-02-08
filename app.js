//Milan Hirani

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/js13kPWA/sw.js');
};

//Requesting Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/Coursework 2 code/js13kPWA/sw.js');
};

//Requesting permission for the notification
var button = document.getElementById("notifications");
button.addEventListener('click', function (e) {
    Notification.requestPermission().then(function (result) {
        if (result === 'granted') {
            randomNotification();
        }
    });
});

let imagesToLoad = document.querySelectorAll('img[data-src]');
const loadImages = (image) => {
    image.setAttribute('src', image.getAttribute('data-src'));
    image.onload = () => {
        image.removeAttribute('data-src');
    };
};

imagesToLoad.forEach((img) => {   
    loadImages(img); 
});
