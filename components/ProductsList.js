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
  products.forEach((product) => {
    row.push(<ProductRow product={product} key={product.id} />)
  });
  return <table className='table'> 
    <thead>
      <tr>
        <th>Name</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      {row}
    </tbody>
  </table>
}
  
class ProductsList extends Component {
  render() {
    const { products } = this.props;
    return (
        <View>
           <Text><h1>Products List</h1></Text>
           <ProductsTable products={products} />
        </View>
)
  }
}
export default ProductsList;
