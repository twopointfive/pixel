(function(cookieKey, urlKey){
  window.addEventListener('DOMContentLoaded', function (event) {
    const url = new URL(location.href);

    let id = url.searchParams.get(urlKey);

    // Parse existing cookie
    document.cookie.split(';').forEach((cookieString) => {
      let splitCookie = cookieString.split('=').map(function (cookiePart) { return cookiePart.trim() });
      if (splitCookie[0] === cookieKey) {
        id = splitCookie[1];
      }
    });

    // Write (or rewrite cookie)
    if (id) {
      document.cookie = cookieKey + '=' + id + '; path=/; max-age=604800; Secure';
    }

    const seen = {};
    window.twofiveconversion = function twofiveconversions(event) {
      const idempotency = event + id;
      if (seen[idempotency]) return;
      seen[idempotency] = true;
      const img = new Image();
      img.onload = img.onerror = function(){};
      img.src = 'https://redirect.5.dev/track?' + Date.now() + '&event=' + event + '&uid=' + id;
    }
  });
})('25uid', 'utm_25uid');
