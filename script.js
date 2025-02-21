//your code here
let dragElement=null
let parent=document.getElementById('parent')
let children=document.getElementsByClassName('image')
// alert(`${child}`)
Array.from(children).forEach(child => {
  child.addEventListener('dragstart', (e) => {
    dragElement = e.target; // Store the dragged element
    setTimeout(() => {
      e.target.style.opacity = 0.5; // Make the dragged element semi-transparent
    }, 0);
  });

	child.addEventListener('dragend', (e) => {
    setTimeout(() => {
      dragElement.style.opacity = 1; // Reset the opacity
      dragElement = null; // Clear the dragged element
    }, 0);
  });

	 child.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.target.style.backgroundColor = 'lightblue'; // Change color when dragging over
  });

  // Remove the background color when the drag leaves the element
  child.addEventListener('dragleave', (e) => {
    e.target.style.backgroundColor = ''; // Reset the background color
  });
child.addEventListener('drop', (e) => {
    e.preventDefault(); // Prevent default behavior
    if (dragElement !== e.target) {
      let draggedIndex = Array.from(children).indexOf(dragElement);
      let targetIndex = Array.from(children).indexOf(e.target);

      // Swap the positions
      parent.insertBefore(dragElement, targetIndex < draggedIndex ? e.target : e.target.nextSibling);
    }
    e.target.style.backgroundColor = ''; // Reset background after drop
  });
});