document.querySelectorAll('.like-btn').forEach((button, index) => {
  const countEl = button.querySelector('.like-count');
  const heartIcon = button.querySelector('.heart-icon');
  const projectKey = button.getAttribute('data-project') || `project-like-${index}`;
  
  
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
