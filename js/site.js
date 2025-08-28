window.consoleLogger = {
    log: function (message) {
        console.log(message);
    },
    warn: function (message) {
        console.warn(message);
    },
    error: function (message) {
        console.error(message);
    }
};

window.scrollCarousel = function(direction) {
  const container = document.querySelector('.announcement-carousel');
  const scrollAmount = 320;
  container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
};

window.enableSwipe = function (elementId, onSwipeLeft, onSwipeRight) {
  const el = document.getElementById(elementId);
  if (!el) return;

  let startX = 0;

  el.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

  el.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    const deltaX = endX - startX;

    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) {
        DotNet.invokeMethodAsync('YourAssemblyName', onSwipeLeft);
      } else {
        DotNet.invokeMethodAsync('YourAssemblyName', onSwipeRight);
      }
    }
  });
};

window.enableSwipeWithInstance = function (elementId, dotNetRef) {
  const el = document.getElementById(elementId);
  if (!el) return;

  let startX = 0;

  el.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

  el.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    const deltaX = endX - startX;

    if (Math.abs(deltaX) > 50) {
      const direction = deltaX < 0 ? "left" : "right";
      dotNetRef.invokeMethodAsync("HandleSwipe", direction);
    }
  });
};
