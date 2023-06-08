const throttled = (delay, fn) => {
    let lastCall = 0;
    return function (...args) {
      const now = (new Date).getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return fn(...args);
    }
  }
  
  const movableElementsWrapper = document.querySelector('.movable-elements-wrapper');
  
  const mouseMoveHandler = (e) => {
        const y = e.movementY;
        const x = e.movementX;
    
        let moveX = x > 0 ? -x : x;
        let moveY = y > 0 ? -y : y;
  
        const movableElements =   document.querySelectorAll('.movable');
  
        movableElements.forEach(
          (movableElement) => {
            gsap.to(movableElement, {x: moveX, y: moveY, duration: 1})
          }
        );
     };
  const speed = 0.35;
  
  const mouseMoveHandler2 = (e) => {
    const movableElements =   document.querySelectorAll('.movable');
  
    movableElements.forEach(
      (movableElement) => {
        const  shiftValue = movableElement.getAttribute('data-value');
        const moveX = (e.clientX * shiftValue) / 350;
        const moveY = (e.clientY * shiftValue) / 350;
        
        
        gsap.to(movableElement, {x: moveX, y: moveY, duration: 1})
  
      }
    );
  };
  
  const tHandler = throttled(200, mouseMoveHandler2);
  movableElementsWrapper.onmousemove = tHandler;
  