// src/screens/ProductListScreen.tsx
import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProducts} from '../store/slices/productsSlice';
import {RootState, AppDispatch} from '../store';

const ProductListScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);
  const [sortOption, setSortOption] = useState<'price' | 'rating'>('price');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = products.filter(
    product =>
      (selectedCategory === 'All' || product.category === selectedCategory) &&
      product.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOption === 'price') {
      return a.price - b.price;
    } else {
      return b.rating.rate - a.rating.rate;
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Picker
          selectedValue={selectedCategory}
          style={styles.picker}
          onValueChange={(itemValue: string) => setSelectedCategory(itemValue)}>
          <Picker.Item label="All" value="All" />
          <Picker.Item label="Electronics" value="electronics" />
          <Picker.Item label="Jewelery" value="jewelery" />
          <Picker.Item label="Men's Clothing" value="men's clothing" />
          <Picker.Item label="Women's Clothing" value="women's clothing" />
        </Picker>
      </View>
      <View style={styles.sortContainer}>
        <TouchableOpacity
          style={[
            styles.sortButton,
            sortOption === 'price' && styles.activeSortButton,
          ]}
          onPress={() => setSortOption('price')}>
          <Text
            style={[
              styles.sortText,
              sortOption === 'price' && styles.activeSortText,
            ]}>
            Price
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.sortButton,
            sortOption === 'rating' && styles.activeSortButton,
          ]}
          onPress={() => setSortOption('rating')}>
          <Text
            style={[
              styles.sortText,
              sortOption === 'rating' && styles.activeSortText,
            ]}>
            Rating
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={sortedProducts}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.productContainer}>
            <Image source={{uri: item.image}} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
              <View style={styles.productRating}>
                <Text>{item.rating.rate}</Text>
                <Text> ({item.rating.count} Ratings)</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginRight: 8,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  picker: {
    height: 40,
    width: 150,
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  sortButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeSortButton: {
    backgroundColor: '#007bff',
  },
  sortText: {
    fontSize: 16,
  },
  activeSortText: {
    color: '#fff',
  },
  productContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    overflow: 'hidden',
  },
  productImage: {
    width: 100,
    height: 100,
  },
  productInfo: {
    flex: 1,
    padding: 8,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#007bff',
    marginBottom: 4,
  },
  productRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ProductListScreen;
