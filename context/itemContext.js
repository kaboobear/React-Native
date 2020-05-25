import React, {createContext, useState} from 'react';
import axios from 'axios';

export const itemContext = createContext();

const ItemContextProvider = props => {
  const [items, setItems] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(false);

  const loadItems = id => {
    setItemsLoading(true);

    axios
      .post('https://kaboo-native-test.herokuapp.com/item', {id})
      .then(res => {
        setItems(res.data);
        setItemsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setItemsLoading(false);
      });
  };

  const addItem = data => {
    axios
      .post('https://kaboo-native-test.herokuapp.com/item/addItem', data)
      .then(res => {
        setItems([res.data, ...items]);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteItem = id => {
    axios
      .post('https://kaboo-native-test.herokuapp.com/item/deleteItem', {id})
      .then(res => {
        setItems(items.filter(elem => res.data._id !== elem._id));
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <itemContext.Provider
      value={{items, itemsLoading, setItems, loadItems, addItem, deleteItem}}>
      {props.children}
    </itemContext.Provider>
  );
};

export default ItemContextProvider;
