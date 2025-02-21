let dragElement = null;
let parent = document.getElementById('parent');
let children = document.getElementsByClassName('image');

// Adding event listeners to each image element for drag events
Array.from(children).forEach(child => {
  child.addEventListener('dragstart', (e) => {
    dragElement = e.target; // Store the dragged element
    setTimeout(() => {
      e.target.style.opacity = 0.5; // Make the dragged element semi-transparent
    }, 0);
  });

  child.addEventListener('dragend', (e) => {
    setTimeout(() => {
      dragElement.style.opacity = 1; // Reset the opacity after dragging
      dragElement = null; // Clear the dragged element reference
    }, 0);
  });

  child.addEventListener('dragover', (e) => {
    e.preventDefault(); // Allow dropping by preventing the default behavior
    e.target.style.backgroundColor = 'lightblue'; // Change color when dragging over
  });

  child.addEventListener('dragleave', (e) => {
    e.target.style.backgroundColor = ''; // Reset background color when dragging leaves
  });

  child.addEventListener('drop', (e) => {
    e.preventDefault(); // Prevent default drop behavior
    
    if (dragElement !== e.target) {
      // Get the index of the dragged element and the drop target
      let dragIndex = Array.from(parent.children).indexOf(dragElement);
      let dropIndex = Array.from(parent.children).indexOf(e.target);

      // Move the dragged element to the new position
      if (dragIndex !== dropIndex) {
        parent.insertBefore(dragElement, dropIndex > dragIndex ? e.target.nextSibling : e.target);
      }
    }
    e.target.style.backgroundColor = ''; // Reset background after drop
  });
});
