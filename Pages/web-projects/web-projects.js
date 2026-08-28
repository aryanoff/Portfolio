document.addEventListener('DOMContentLoaded', () => {

  // =========================================
  // 1. LIKE BUTTON LOGIC
  // =========================================
  document.querySelectorAll('.like-btn').forEach((button, index) => {
    const countEl = button.querySelector('.like-count');
    const heartIcon = button.querySelector('.heart-icon');
    let projectKey = button.getAttribute('data-project');
    if (!projectKey) {
      console.warn('Missing data-project attribute on like button. Falling back to index, which may cause state collisions if projects are reordered.');
      projectKey = `project-like-${index}`;
    }
    
    let count = parseInt(localStorage.getItem(`${projectKey}-count`) || countEl.textContent) || 0;
    let isLiked = localStorage.getItem(`${projectKey}-liked`) === 'true';
    
    countEl.textContent = count;
    
    if (isLiked) {
      heartIcon.textContent = '❤️';
      button.classList.add('liked');
    } else {
      heartIcon.textContent = '🤍';
      button.classList.remove('liked');
    }
    
    button.addEventListener('click', () => {
      if (!isLiked) {
        count++;
        heartIcon.textContent = '❤️';
        button.classList.add('liked');
        isLiked = true;
      } else {
        count--;
        heartIcon.textContent = '🤍';
        button.classList.remove('liked');
        isLiked = false;
      }
      countEl.textContent = count;
      localStorage.setItem(`${projectKey}-count`, count);
      localStorage.setItem(`${projectKey}-liked`, isLiked);
    });
  });

  // =========================================
  // 2. READ MORE TOGGLE LOGIC
  // =========================================
  const readMoreBtns = document.querySelectorAll('.read-more-btn');

  readMoreBtns.forEach(btn => {
      btn.addEventListener('click', () => {
          const desc = btn.parentElement.nextElementSibling;
          
          if (desc.classList.contains('expanded')) {
              desc.classList.remove('expanded');
              btn.textContent = 'Read More';
          } else {
              desc.classList.add('expanded');
              btn.textContent = 'Show Less';
          }
      });
  });

});