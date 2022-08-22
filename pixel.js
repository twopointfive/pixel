(function(cookieKey, urlKey, w, d){
    const url = new URL(location.href);

    let id = url.searchParams.get(urlKey);

    // Parse existing cookie
    d.cookie.split(';').forEach((cookieString) => {
      let splitCookie = cookieString.split('=').map(function (cookiePart) { return cookiePart.trim() });
      if (splitCookie[0] === cookieKey) {
        id = splitCookie[1];
      }
    });

    // Write (or rewrite cookie)
    if (id) {
      d.cookie = cookieKey + '=' + id + '; path=/; max-age=604800; Secure';
    }

    const seen = {};
    // Save existing queued conversions if any
    const queue = (w.twofiveconversion && w.twofiveconversion.queue) ? w.twofiveconversion.queue : [];
    w.twofiveconversion = function twofiveconversions(event) {
      const idempotency = event + id;
      if (seen[idempotency]) return;
      seen[idempotency] = true;
      const img = new Image();
      img.onload = img.onerror = function(){};
      img.src = 'https://r.5.dev/track?' + Date.now() + '&event=' + (event || 'default') + '&uid=' + id+ '&url=' + encodeURIComponent(location.href);
    }
    // Apply queued conversion tracks
    queue.forEach((args) => {
      w.twofiveconversion.apply(null, args);
    })
})('25uid', 'utm_25uid', window, document);
