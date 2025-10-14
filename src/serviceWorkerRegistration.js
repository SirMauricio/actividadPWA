// Archivo base de CRA adaptado para registrar el service worker
const isLocalhost = Boolean(
window.location.hostname === "localhost" ||
    window.location.hostname === "[::1]" ||
    window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export function register() {
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

        if (isLocalhost) {
        // En localhost, verifica si el service worker ya existe
        checkValidServiceWorker(swUrl);
        } else {
        // En producción, solo registra el SW
        registerValidSW(swUrl);
        }
    });
    }
}

function registerValidSW(swUrl) {
    navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
        console.log("Service Worker registrado correctamente:", registration);
    })
    .catch((error) => {
        console.error("Error al registrar el Service Worker:", error);
    });
}

function checkValidServiceWorker(swUrl) {
    fetch(swUrl)
    .then((response) => {
        if (
        response.status === 404 ||
        response.headers.get("content-type").indexOf("javascript") === -1
        ) {
        navigator.serviceWorker.ready.then((registration) => {
            registration.unregister();
        });
        } else {
        registerValidSW(swUrl);
        }
    })
    .catch(() => {
        console.log("Sin conexión. Se ejecutará en modo offline.");
    });
}
