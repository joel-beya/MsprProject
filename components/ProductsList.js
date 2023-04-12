import React, { Component } from 'react';
import { Text, View, AppRegistry } from 'react-native';

class ProductsList extends Component {
  render() {
    const { products } = this.props;
    return <View><Text>{JSON.stringify(products)}</Text></View>;
  }
}
export default ProductsList;
