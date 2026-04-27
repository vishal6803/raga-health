self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "Patient Alert";
  const options = {
    body: data.body || "A new update is available for a patient.",
    icon: "/icon.png",
    badge: "/badge.png",
    vibrate: [300, 100, 300],
    tag: "critical-update",
    actions: [
      { action: "view", title: "View Patient Record" },
      { action: "dismiss", title: "Acknowledge" },
    ],
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Simple local notification handler
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SHOW_NOTIFICATION") {
    self.registration.showNotification(event.data.title, {
      body: event.data.body,
      icon: "/vite.svg",
    });
  }
});
