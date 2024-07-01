import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList} from 'react-native';
import ProductItem from './ProductItem';
import {fetchProducts} from '../store/slices/productsSlice';
import {RootState, AppDispatch} from '../store';
import {Product} from '../types';

const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <FlatList
      data={products}
      renderItem={({item}: {item: Product}) => <ProductItem product={item} />}
      keyExtractor={item => item.id.toString()}
    />
  );
};

export default ProductList;
