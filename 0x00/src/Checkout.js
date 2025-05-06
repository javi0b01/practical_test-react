import { useEffect, useState } from 'react';
import styles from './Checkout.module.css';
import { LoadingIcon } from './Icons';
import { getProducts } from './dataService';

// You are provided with an incomplete <Checkout /> component.
// You are not allowed to add any additional HTML elements.
// You are not allowed to use refs.

// Demo video - You can view how the completed functionality should look at: https://drive.google.com/file/d/1o2Rz5HBOPOEp9DlvE9FWnLJoW9KUp5-C/view?usp=sharing

// Once the <Checkout /> component is mounted, load the products using the getSelectedProducts function.
// Once all the data is successfully loaded, hide the loading icon.
// Render each product object as a <Product/> component, passing in the necessary props.
// Implement the following functionality:
//  - The add and remove buttons should adjust the ordered quantity of each product
//  - The add and remove buttons should be enabled/disabled to ensure that the ordered quantity can’t be negative and can’t exceed the available count for that product.
//  - The total shown for each product should be calculated based on the ordered quantity and the price
//  - The total in the order summary should be calculated
//  - For orders over $1000, apply a 10% discount to the order. Display the discount text only if a discount has been applied.
//  - The total should reflect any discount that has been applied
//  - All dollar amounts should be displayed to 2 decimal places

const Product = ({
  id,
  name,
  availableCount,
  price,
  orderedQuantity,
  total,
  setUpdateQuantity,
}) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{availableCount}</td>
      <td>${price}</td>
      <td>{orderedQuantity}</td>
      <td>${total.toFixed(2)}</td>
      <td>
        <button
          disabled={!availableCount > 0}
          className={styles.actionButton}
          onClick={() => {
            setUpdateQuantity(['add', id]);
          }}
        >
          +
        </button>
        <button
          disabled={!orderedQuantity > 0}
          className={styles.actionButton}
          onClick={() => {
            setUpdateQuantity(['remove', id]);
          }}
        >
          -
        </button>
      </td>
    </tr>
  );
};

const Checkout = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [updateQuantity, setUpdateQuantity] = useState([]);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    getProducts()
      .then((products) => {
        const initProducts = products.map((product) => ({
          ...product,
          orderedQuantity: 0,
          total: 0,
        }));
        setData(initProducts);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (updateQuantity.length === 2) {
      if (updateQuantity[0] === 'add') addProduct();
      if (updateQuantity[0] === 'remove') removeProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateQuantity]);

  const getSelectedProduct = () => {
    const product = data.filter((p) => p.id === updateQuantity[1])[0];
    const idx = data.indexOf(product);
    return { idx, product };
  };

  const updateTotal = () => {
    let sum = 0;
    for (const product of data) sum += product.total;
    if (sum > 1000) {
      setDiscount(sum * 0.1);
      setTotal(sum - sum * 0.1);
    } else {
      setDiscount(0);
      setTotal(sum);
    }
  };

  const updateData = (idx, product) => {
    const newData = data;
    newData[idx] = product;
    setData(newData);
    setUpdateQuantity([]);
    updateTotal();
  };

  const addProduct = () => {
    const { idx, product } = getSelectedProduct();
    if (product.availableCount === 0) return;
    product.availableCount--;
    product.orderedQuantity++;
    product.total += product.price * 1;
    updateData(idx, product);
  };

  const removeProduct = () => {
    const { idx, product } = getSelectedProduct();
    if (product.orderedQuantity === 0) return;
    product.orderedQuantity--;
    product.availableCount++;
    product.total -= product.price * 1;
    updateData(idx, product);
  };

  return (
    <div>
      <header className={styles.header}>
        <h1>Electro World</h1>
      </header>
      <main>
        {loading && <LoadingIcon />}
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th># Available</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((p) => (
              <Product
                key={p.id}
                {...p}
                setUpdateQuantity={setUpdateQuantity}
              />
            ))}
          </tbody>
        </table>
        <h2>Order summary</h2>
        <p>Discount: ${discount.toFixed(2)}</p>
        <p>Total: ${total.toFixed(2)}</p>
      </main>
    </div>
  );
};

export default Checkout;
