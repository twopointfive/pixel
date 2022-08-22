window.twofiveconversion = (function(){
  const queue = [];
  const twofiveconversionPreload = function twofiveconversionPreload() {
    queue.push([].slice.call(arguments));
  }
  twofiveconversionPreload.queue = queue;
  return twofiveconversionPreload;
})();

var script = document.createElement('script');
script.onload = function () {
  //do stuff with the script
};
script.src = 'https://pixel.5.dev/dist/pixel.js';

document.head.appendChild(script); //or something of the likes