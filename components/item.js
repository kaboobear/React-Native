import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {itemContext} from '../context/itemContext';
const Sound = require('react-native-sound');

const Item = ({item, index}) => {
  const {deleteItem} = useContext(itemContext);

  let removeSound = new Sound('remove.Wave', Sound.MAIN_BUNDLE);

  return (
    <TouchableOpacity
      onPress={() => {
        deleteItem(item._id);
        removeSound.play();
      }}>
      <View style={styles.item}>
        <Text style={styles.item_title}>
          <Text style={styles.index}>{index + 1}.</Text> {item.title}
        </Text>
        <Icon name="remove" size={20} color="#ff5757" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    paddingRight: 32,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },

  index: {
    fontSize: 16,
    color: '#aaa',
  },

  item_title: {
    fontSize: 18,
    fontWeight: '300',
    alignItems: 'center',
  },

  item_delete: {
    borderRadius: 10,
    textTransform: 'lowercase',
    backgroundColor: '#f00',
  },
});

export default Item;
