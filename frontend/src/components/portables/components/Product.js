import React from "react";
import styles from "./Product.module.css";

function Product({ product }) {
  const { title, fault, serial_numbers, in_warranty } = product;

  return (
    <div>
      <div className={styles.title}>{title}</div>
      <div className={styles.infoBox}>
        <span>In Warranty</span>
        <div className={in_warranty ? styles.yes : styles.no}>
          {in_warranty ? "Yes" : "No"}
        </div>
      </div>
      <div className={styles.infoBox}>
        <span>Serial Number(s)</span>
        {serial_numbers.length > 0 ? (
          serial_numbers.map((number, index) => <div key={index}>{number}</div>)
        ) : (
          <div>Not given</div>
        )}
      </div>
      <div className={styles.infoBox}>
        <span>Fault Description</span>
        <div>{fault === "" ? "Not given" : fault}</div>
      </div>
    </div>
  );
}

export default Product;
