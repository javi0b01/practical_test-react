# practical_test-react
## 0x00
### Requirements
You are provided with an incomplete `<Checkout />` component.  
You are not allowed to add any additional HTML elements.  
You are not allowed to use *refs*.

You can view how the completed functionality should look at: [Demo video](https://drive.google.com/file/d/1o2Rz5HBOPOEp9DlvE9FWnLJoW9KUp5-C/view?usp=sharing)

Once the `<Checkout />` component is mounted, load the products using the getSelectedProducts function.  
Once all the data is successfully loaded, hide the loading icon.  
Render each product object as a `<Product/>` component, passing in the necessary props.

Implement the following functionality:  
- The add and remove buttons should adjust the ordered quantity of each product.
- The add and remove buttons should be enabled/disabled to ensure that the ordered quantity can’t be negative and can’t exceed the available count for that product.
- The total shown for each product should be calculated based on the ordered quantity and the price.
- The total in the order summary should be calculated.
- For orders over $1000, apply a 10% discount to the order. Display the discount text only if a discount has been applied.
- The total should reflect any discount that has been applied.
- All dollar amounts should be displayed to 2 decimal places.
## Running locally
Then you can clone or download this repository
### Type in your terminal
```
$ cd 0x00
$ npm i
$ npm start
```
### Use
Go to the following URL on your browser
```
http://localhost:3000
```
**Done!**
## Software Developer
Built by [Javi](https://github.com/javi0b01) :copyright: 2025  
Found a bug or have an idea? [Contact me](https://www.linkedin.com/in/javi0b01/).
