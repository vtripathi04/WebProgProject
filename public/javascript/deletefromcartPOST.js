// Assuming each delete button has a class name 'delete-button'
const deleteButtons = document.querySelectorAll('.delete-button');

// Function to handle the click event
const handleDeleteButtonClick = async (productId) => {
    try {
        const response = await fetch('/removeFromCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productId: productId,
            }),
        });

        if (response.ok) {
            console.log('Item removed from cart successfully!');
            // Optionally, you can update the UI to reflect the removal
        } else {
            console.error('Failed to remove item from cart');
        }
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};

// Attach event listener to each delete button
deleteButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        // Get the product id from the itemid attribute of the parent div
        const productId = event.target.closest('.cart-item').getAttribute('itemid');
        
        // Call the function to handle the click event
        handleDeleteButtonClick(productId);

        // window.location.reload();
    });
});





// Assuming you have an event listener on the delete button
// document.addEventListener('click', async (event) => {
//     if (event.target.classList.contains('delete-button')) {
//       const itemId = event.target.parentElement.getAttribute('itemid');
  
//       try {
//         const response = await fetch('/removeFromCart', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             itemId: itemId,
//           }),
//         });
  
//         if (response.ok) {
//           console.log('Item removed from cart successfully!');
//           // Update the UI to reflect the change (remove the item from the DOM)
//           event.target.parentElement.remove();
//         } else {
//           console.error('Failed to remove item from cart');
//         }
//       } catch (err) {
//         console.error(`Error: ${err}`);
//       }
//     }
//   });
  