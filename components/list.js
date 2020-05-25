import React, {useContext} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import Item from './item';
import Spinner from 'react-native-spinkit';

import {itemContext} from '../context/itemContext';

const List = () => {
  const {items, itemsLoading} = useContext(itemContext);

  return (
    <View style={styles.list_wrap}>
      {itemsLoading ? (
        <View style={styles.log_section_load}>
          {/* <Text style={styles.log_section_load_text}>Loading...</Text> */}
          <Spinner isVisible={true} size={40} type={'Wave'} color={'#333'} />
        </View>
      ) : (
        <View style={styles.list_inner}>
          {items.length === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.empty_text}>List is Empty</Text>
            </View>
          ) : (
            <FlatList
              style={styles.list}
              data={items}
              renderItem={({item, index}) => <Item item={item} index={index} />}
              keyExtractor={item => item._id}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  list_wrap: {
    alignItems: 'center',
    flex: 1,
  },

  list_inner: {
    flex: 1,
    width: '100%',
  },

  log_section_load: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  log_section_load_text: {
    fontSize: 22,
    color: '#333',
  },

  list: {
    width: '100%',
  },

  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  empty_text: {
    fontSize: 20,
    color: '#333',
  },
});

export default List;
