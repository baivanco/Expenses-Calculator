import React from "react";
import { Link } from "react-router-dom";

function Product(props) {
  return (
    <div>
      <tr>
        <td>{props.prod.product_name}</td>
        <td>{props.prod.product_type}</td>
        <td>{props.prod.product_description}</td>
        <td>{props.prod.purchase_date}</td>
        <td>{props.prod.product_price}</td>
        <td>
          <Link to={"/edit/" + props.prod._id}>edit</Link>
        </td>
      </tr>
    </div>
  );
}

export default Product;
