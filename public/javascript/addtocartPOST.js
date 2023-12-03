const addtcartbutton = document.getElementById('addtocartButton');

addtcartbutton.addEventListener('click', async () => {
    try {
        const el = document.querySelector('.product-container');
        const prodID = el.id;

        const response = await fetch('/addtocart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prodid: prodID,
            }),
        });

        if (response.ok) {
            console.log('Product added to cart successfully!');
        } else {
            console.error('Failed to add product to cart');
        }
    } catch (err) {
        console.error(`Error: ${err}`);
    }
});
