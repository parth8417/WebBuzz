// Adjust the hero height to fit perfectly on any screen
// This ensures the hero section is always fully visible and fits nicely

function adjustHeroHeight() {
  const hero = document.getElementById('home');
  const navbar = document.querySelector('nav');
  
  if (!hero || !navbar) return;
  
  const viewportHeight = window.innerHeight;
  const navbarHeight = navbar.offsetHeight;
  const availableHeight = viewportHeight - navbarHeight;
  
  // Apply the calculated height to ensure full visibility
  hero.style.minHeight = `${availableHeight}px`;
  
  // Adjust content positioning based on viewport height
  const heroContent = hero.querySelector('.hero-content');
  if (heroContent) {
    if (viewportHeight < 700) {
      heroContent.classList.add('compact-spacing');
    } else {
      heroContent.classList.remove('compact-spacing');
    }
  }
  
  // Apply additional classes for extremely short viewports
  if (viewportHeight < 600) {
    hero.classList.add('ultra-compact');
  } else {
    hero.classList.remove('ultra-compact');
  }
  
  // Adjust "Discover More" position based on viewport
  const discoverMobileElement = hero.querySelector('.discover-more-mobile');
  const discoverDesktopElement = hero.querySelector('.discover-more-desktop');
  
  if (discoverMobileElement && discoverDesktopElement) {
    // For better mobile positioning
    if (viewportHeight < 700 || window.innerWidth < 768) {
      discoverMobileElement.style.display = 'flex';
      discoverDesktopElement.style.display = 'none';
    } else {
      discoverMobileElement.style.display = 'none';
      discoverDesktopElement.style.display = 'flex';
    }
  }
}

// Initial adjustment
window.addEventListener('DOMContentLoaded', adjustHeroHeight);

// Adjust on resize
window.addEventListener('resize', adjustHeroHeight);

export default adjustHeroHeight;
