window.twofiveconversion = (function(){
  const queue = [];
  const twofiveconversionPreload = function twofiveconversionPreload() {
    queue.push([].slice.call(arguments));
  }
  twofiveconversionPreload.queue = queue;
  return twofiveconversionPreload;
})();