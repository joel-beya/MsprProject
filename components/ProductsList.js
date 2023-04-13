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
    <View style={styles.tableContainer}>
      <View style={styles.table}>
        <View style={styles.headerRow}>
          <Text style={styles.headerCell}>Name</Text>
          <Text style={styles.headerCell}>Price</Text>
        </View>
        <View style={[styles.rowsContainer, {flexGrow: 1}]}>
          {rows}
        </View>
      </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'lightgray',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  headerText: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  tableContainer: {
    height: 320, // Ajouter une hauteur fixe à la vue parente
  },
  table: {
    borderWidth: 1,
    borderColor: 'black',
    marginVertical: 10,
    flex: 50, // Permet à la vue de s'étendre dans la vue parente
  },
  rowsContainer: {
    paddingHorizontal: 1, // Ajouter un espacement horizontal pour les bords
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingVertical: 5,
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default ProductsList;
