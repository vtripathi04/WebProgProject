document.addEventListener('DOMContentLoaded', function() {
    // Get all elements with the class 'product-image'
    var productImages = document.getElementsByClassName('mpimg');
  
    // Add click event listener to each image
    Array.from(productImages).forEach(function(image) {
      image.addEventListener('click', function() {
        // Get the product ID associated with the clicked image
        var productId = image.getAttribute('data-product-id');
  
        // Navigate to the product page with the corresponding product ID
        window.location.href = 'productId=' + productId;
      });
    });
  });
  