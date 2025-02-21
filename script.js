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


describe('Drag and Drop Tests', () => {
    beforeEach(() => {
        cy.visit('your-url-here'); // Replace with your actual URL
    });

    it('All divs exist', () => {
        for (let index = 1; index <= 6; index++) {
            cy.get(`#drag${index}`).should('have.length', 1);
        }
    });

    it('Drag and drop 3rd image on 6th', () => {
        cy.get('#drag3').trigger('mousedown', { which: 1 });
        cy.get('#drag6').trigger('mousemove').trigger('mouseup', { force: true });
        cy.get('#drag3').should('contain', 'Image 6');
        cy.get('#drag6').should('contain', 'Image 3');
    });

    // Add more tests for other drag-and-drop scenarios
});