import React, {useState, useContext} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {itemContext} from '../context/itemContext';
import {userContext} from '../context/userContext';
const Sound = require('react-native-sound');

const AddItem = () => {
  const {addItem} = useContext(itemContext);
  const {user} = useContext(userContext);
  const [title, setTitle] = useState('');

  let addSound = new Sound('add.Wave', Sound.MAIN_BUNDLE);

  const onChange = val => {
    setTitle(val);
  };

  return (
    <TouchableOpacity>
      <View style={styles.add_form}>
        <TextInput
          style={styles.input}
          placeholder="Text..."
          value={title}
          onChangeText={onChange}
        />

        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            addItem({title, author: user._id});
            setTitle('');
            addSound.play();
          }}>
          <Icon style={styles.btn_text} name="plus" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  add_form: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    flex: 1,
    fontSize: 18,
  },

  btn: {
    marginLeft: 10,
    padding: 15,
    borderRadius: 100,
    backgroundColor: '#4db066',
  },

  btn_text: {
    textAlign: 'center',
    width: 20,
    color: '#fff',
    fontSize: 18,
  },
});

export default AddItem;
