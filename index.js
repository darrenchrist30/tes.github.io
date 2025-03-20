if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/tes.github.io/sw.js', { scope: '/tes.github.io/' })
    .then(reg => console.log('Service Worker Registered!', reg))
    .catch(err => console.log('Service Worker Registration Failed:', err));
}
