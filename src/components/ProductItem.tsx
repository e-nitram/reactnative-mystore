// src/components/ProductItem.tsx
import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, Button} from 'react-native';
import {Product} from '../types';
import database from '../db';
import ProductModel from '../db/models/ProductModel';

interface Props {
  product: Product;
}

const ProductItem: React.FC<Props> = ({product}) => {
  const [rating, setRating] = useState(product.rating.rate);

  const saveRating = async (newRating: number) => {
    const productRecord = (await database.collections
      .get('products')
      .find(product.id.toString())) as ProductModel;
    await productRecord.update(record => {
      record.rating_rate = newRating;
    });
    setRating(newRating);
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: product.image}} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.rating}>Rating: {rating}</Text>
      <Button title="Rate 5" onPress={() => saveRating(5)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  rating: {
    fontSize: 12,
    color: '#666',
  },
});

export default ProductItem;
