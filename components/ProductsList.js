import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

//Function For creating a single product row
function ProductRow({ product }) {
  return (
    <View style={styles.row}>
      <Text style={styles.cell}>{product.name}</Text>
      <Text style={styles.cell}>{product.price}</Text>
    </View>
  );
}

//Function for creating products table
function ProductsTable({ products }) {
  const rows = products.map((product) => {
    return <ProductRow product={product} key={product.id} />;
  });

  return (
    <View style={styles.table}>
      <View style={styles.row}>
        <Text style={styles.headerCell}>Name</Text>
        <Text style={styles.headerCell}>Price</Text>
      </View>
      {rows}
    </View>
  );
}

class ProductsList extends Component {
  render() {
    const { products } = this.props;
    return (
      <View>
        <Text style={styles.title}>Products List</Text>
        <ProductsTable products={products} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: 'black',
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingVertical: 5,
  },
  headerCell: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
});

export default ProductsList;
