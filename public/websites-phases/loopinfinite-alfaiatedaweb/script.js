class InfiniteCarousel {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    this.track = this.container.querySelector('.cards-grid-container');
    if (!this.track) return;
    
    // Store original list of cards
    this.originalCards = Array.from(this.track.querySelectorAll('.service-card'));
    this.numOriginals = this.originalCards.length;
    
    // We clone 3 cards at each end because at most 3 cards can be visible at once (center + left peek + right peek)
    this.numClones = 3;
    
    this.clonesCreated = false;
    this.initialized = false;
    this.isDragging = false;
    
    // Bind all handlers to maintain lexical 'this' context
    this.resizeHandler = this.handleResize.bind(this);
    this.touchStart = this.onTouchStart.bind(this);
    this.touchMove = this.onTouchMove.bind(this);
    this.touchEnd = this.onTouchEnd.bind(this);
    this.transitionEnd = this.onTransitionEnd.bind(this);
    
    this.mouseDown = this.onMouseDown.bind(this);
    this.mouseMove = this.onMouseMove.bind(this);
    this.mouseUp = this.onMouseUp.bind(this);
    
    // Listen for resize to determine mobile vs desktop state
    window.addEventListener('resize', this.resizeHandler);
    this.checkViewport();
  }
  
  checkViewport() {
    if (window.innerWidth <= 768) {
      if (!this.initialized) {
        this.init();
      } else {
        // Recalculate dimensions on viewport resize (e.g. device rotation)
        this.updatePosition(false);
      }
    } else {
      if (this.initialized) {
        this.destroy();
      }
    }
  }
  
  handleResize() {
    this.checkViewport();
  }
  
  init() {
    this.initialized = true;
    this.createClones();
    this.currentIndex = this.numClones; // Start on the first original card (index 3)
    
    // Align track position to the starting card
    requestAnimationFrame(() => {
      this.updatePosition(false);
    });
    
    // Setup touch events
    this.track.addEventListener('touchstart', this.touchStart, { passive: true });
    this.track.addEventListener('touchmove', this.touchMove, { passive: true });
    this.track.addEventListener('touchend', this.touchEnd);
    
    // Setup mouse events for testing on desktop simulation
    this.track.addEventListener('mousedown', this.mouseDown);
    window.addEventListener('mousemove', this.mouseMove);
    window.addEventListener('mouseup', this.mouseUp);
    
    // Infinite loop jump listener
    this.track.addEventListener('transitionend', this.transitionEnd);
  }
  
  createClones() {
    if (this.clonesCreated) return;
    
    // 1. Clone the first N cards and append them
    const clonesToAppend = this.originalCards.slice(0, this.numClones).map(card => {
      const clone = card.cloneNode(true);
      clone.classList.add('clone');
      clone.setAttribute('aria-hidden', 'true');
      clone.setAttribute('tabindex', '-1');
      return clone;
    });
    clonesToAppend.forEach(clone => this.track.appendChild(clone));
    
    // 2. Clone the last N cards and prepend them (maintain correct sequence order)
    const clonesToPrepend = this.originalCards.slice(-this.numClones).map(card => {
      const clone = card.cloneNode(true);
      clone.classList.add('clone');
      clone.setAttribute('aria-hidden', 'true');
      clone.setAttribute('tabindex', '-1');
      return clone;
    });
    clonesToPrepend.reverse().forEach(clone => {
      this.track.insertBefore(clone, this.track.firstChild);
    });
    
    this.clonesCreated = true;
    this.cards = Array.from(this.track.querySelectorAll('.service-card'));
  }
  
  destroyClones() {
    if (!this.clonesCreated) return;
    
    // Remove all created clones
    const clones = this.track.querySelectorAll('.clone');
    clones.forEach(clone => clone.remove());
    
    this.clonesCreated = false;
    this.cards = this.originalCards;
    
    // Reset active classes on original cards
    this.cards.forEach(card => card.classList.remove('active'));
  }
  
  destroy() {
    this.initialized = false;
    
    // Clean up event listeners
    this.track.removeEventListener('touchstart', this.touchStart);
    this.track.removeEventListener('touchmove', this.touchMove);
    this.track.removeEventListener('touchend', this.touchEnd);
    
    this.track.removeEventListener('mousedown', this.mouseDown);
    window.removeEventListener('mousemove', this.mouseMove);
    window.removeEventListener('mouseup', this.mouseUp);
    
    this.track.removeEventListener('transitionend', this.transitionEnd);
    
    this.destroyClones();
    
    // Reset element styles to original state
    this.track.style.transform = '';
    this.track.style.transition = '';
    this.track.classList.remove('dragging');
  }
  
  updatePosition(animate = true) {
    if (!this.initialized || !this.cards || this.cards.length === 0) return;
    
    const cardWidth = this.cards[0].offsetWidth;
    const gap = parseFloat(window.getComputedStyle(this.track).gap) || 20;
    const containerWidth = this.container.offsetWidth;
    
    // Centering calculation:
    // translateX centers the active card indices in the viewport:
    const translateX = (containerWidth - cardWidth) / 2 - this.currentIndex * (cardWidth + gap);
    this.currentTranslateX = translateX;
    
    if (animate) {
      this.track.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    } else {
      this.track.style.transition = 'none';
      // Force reflow so the browser applies 'transition: none' immediately before changing transform
      this.track.offsetHeight;
    }
    
    this.track.style.transform = `translate3d(${translateX}px, 0, 0)`;
    this.updateActiveState();
  }
  
  getOriginalIndex(index) {
    let idx = (index - this.numClones) % this.numOriginals;
    if (idx < 0) {
      idx += this.numOriginals;
    }
    return idx;
  }
  
  updateActiveState() {
    if (!this.cards || this.cards.length === 0) return;
    
    const cardWidth = this.cards[0].offsetWidth;
    const gap = parseFloat(window.getComputedStyle(this.track).gap) || 20;
    const containerWidth = this.container.offsetWidth;
    
    // Determine which card is closest to the horizontal center of the viewport
    const closestIndex = Math.round(- (this.currentTranslateX - (containerWidth - cardWidth) / 2) / (cardWidth + gap));
    const clampedIndex = Math.max(0, Math.min(this.cards.length - 1, closestIndex));
    
    const activeOriginalIdx = this.getOriginalIndex(clampedIndex);
    
    this.cards.forEach((card, idx) => {
      const originalIdx = this.getOriginalIndex(idx);
      if (originalIdx === activeOriginalIdx) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
  }
  
  startDrag(clientX) {
    // Safety check: if user touch-starts while sliding, resolve any clone position first
    this.teleportClonesIfNeeded();
    
    this.isDragging = true;
    this.startX = clientX;
    this.startTranslateX = this.currentTranslateX;
    this.touchStartTime = Date.now();
    
    this.track.style.transition = 'none';
    this.track.classList.add('dragging');
  }
  
  moveDrag(clientX) {
    if (!this.isDragging) return;
    
    const dX = clientX - this.startX;
    this.currentTranslateX = this.startTranslateX + dX;
    
    this.track.style.transform = `translate3d(${this.currentTranslateX}px, 0, 0)`;
    this.updateActiveState();
  }
  
  endDrag(clientX) {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.track.classList.remove('dragging');
    
    const dX = clientX - this.startX;
    const duration = Date.now() - this.touchStartTime;
    const velocity = dX / duration; // px/ms
    
    let targetIndex = this.currentIndex;
    const cardWidth = this.cards[0].offsetWidth;
    const gap = parseFloat(window.getComputedStyle(this.track).gap) || 20;
    const containerWidth = this.container.offsetWidth;
    
    // If swipe was fast, move in swipe direction; otherwise, snap to nearest card
    if (Math.abs(velocity) > 0.25) {
      if (velocity < 0) {
        targetIndex = this.currentIndex + 1;
      } else {
        targetIndex = this.currentIndex - 1;
      }
    } else {
      targetIndex = Math.round(- (this.currentTranslateX - (containerWidth - cardWidth) / 2) / (cardWidth + gap));
    }
    
    targetIndex = Math.max(0, Math.min(this.cards.length - 1, targetIndex));
    
    this.currentIndex = targetIndex;
    this.updatePosition(true);
  }
  
  teleportClonesIfNeeded() {
    if (this.currentIndex < this.numClones) {
      // Jump from prepend clone to the matching original card (e.g. Card 9 Clone -> Card 9 Original)
      this.currentIndex += this.numOriginals;
      this.updatePosition(false);
    } else if (this.currentIndex >= this.numOriginals + this.numClones) {
      // Jump from append clone to the matching original card (e.g. Card 1 Clone -> Card 1 Original)
      this.currentIndex -= this.numOriginals;
      this.updatePosition(false);
    }
  }
  
  // Touch Event Handlers
  onTouchStart(e) {
    this.startDrag(e.touches[0].clientX);
  }
  
  onTouchMove(e) {
    if (!this.isDragging) return;
    this.moveDrag(e.touches[0].clientX);
  }
  
  onTouchEnd(e) {
    this.endDrag(e.changedTouches[0].clientX);
  }
  
  // Mouse Event Handlers (for responsiveness testing)
  onMouseDown(e) {
    if (e.button !== 0) return; // Only trigger on left-click
    this.startDrag(e.clientX);
    e.preventDefault(); // Prevent text dragging selection
  }
  
  onMouseMove(e) {
    this.moveDrag(e.clientX);
  }
  
  onMouseUp(e) {
    this.endDrag(e.clientX);
  }
  
  onTransitionEnd(e) {
    // Only handle transition if it originated from the track (ignores child card scale/opacity transitions)
    if (e.target !== this.track || e.propertyName !== 'transform') return;
    this.teleportClonesIfNeeded();
  }
}

// Initialize when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new InfiniteCarousel('services-carousel');
});
