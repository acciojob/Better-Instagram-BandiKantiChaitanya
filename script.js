// Get all draggable elements
const draggables = document.querySelectorAll('.image');

// Add event listeners for drag events
draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
    draggable.addEventListener('dragover', dragOver);
    draggable.addEventListener('drop', drop);
});

// Function to handle drag start
function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    e.target.classList.add('selected');
}

// Function to handle drag over
function dragOver(e) {
    e.preventDefault(); // Prevent default to allow drop
}

// Function to handle drop
function drop(e) {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text/plain');
    const draggedElement = document.getElementById(draggedId);
    
    // Swap the images and names
    const targetElement = e.target;
    const targetId = targetElement.id;

    if (draggedId !== targetId) {
        // Swap background images
        const draggedImageStyle = window.getComputedStyle(draggedElement).backgroundImage;
        const targetImageStyle = window.getComputedStyle(targetElement).backgroundImage;

        draggedElement.style.backgroundImage = targetImageStyle;
        targetElement.style.backgroundImage = draggedImageStyle;

        // Swap inner text
        const draggedText = draggedElement.innerText;
        const targetText = targetElement.innerText;

        draggedElement.innerText = targetText;
        targetElement.innerText = draggedText;
    }

    draggedElement.classList.remove('selected');
}