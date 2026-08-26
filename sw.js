self.addEventListener("push", function(event) {

  let data = {
    title: "Morning Brief",
    body: "🌅🌸 Rise and shine, sleeping beauty",
    url: "/"
  };

  if (event.data) {
    try {
      data = {
        ...data,
        ...event.data.json()
      };
    } catch (error) {
      data.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/icon-192.png",
      badge: "/icon-192.png",
      data: {
        url: data.url || "/"
      }
    })
  );

});


self.addEventListener("notificationclick", function(event) {

  event.notification.close();

  const url =
    event.notification.data?.url || "/";

  event.waitUntil(
    clients.openWindow(url)
  );

});
