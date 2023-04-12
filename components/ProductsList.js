import React, { Component } from 'react';
import { Text, View, AppRegistry } from 'react-native';

//Function For creating a single product row
function ProductRow({ product }) {
  return <tr>
    <td>{product.name}</td>
    <td>{product.price}</td>
  </tr>
}
//Function for creating products table
function ProductsTable({ products }) {
  const row =[]
 
  return <table className='table'> 
    <thead>
      <tr>
        <th>Name</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  </table>
}
  
class ProductsList extends Component {
  render() {
    const { products } = this.props;
    return <ProductsTable products={products} />
  }
}
export default ProductsList;
