const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#review-title').value.trim();
    const reviewContent = document.querySelector('#review-desc').value.trim();
  
    if (name && reviewContent) {
      const response = await fetch(`/api/reviews`, {
        method: 'POST',
        body: JSON.stringify({ name, needed_funding, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create review');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/review/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete project');
      }
    }
  };
  
  document
    .querySelector('.new-reivew-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.review-list')
    .addEventListener('click', delButtonHandler);
  