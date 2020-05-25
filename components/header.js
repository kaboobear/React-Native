import React, {useContext} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {userContext} from '../context/userContext';
import {itemContext} from '../context/itemContext';

const Header = ({navigation}) => {
  const {user, isAuth, logout} = useContext(userContext);
  const {setItems} = useContext(itemContext);

  return (
    <View style={styles.header}>
      {/* <Text style={styles.logo}>Shoppy</Text> */}
      <Image style={styles.ico} source={require('../img/ico.png')} />

      <TouchableOpacity
        style={styles.user_block}
        onPress={() => {
          logout(navigation);
          setTimeout(() => {
            setItems([]);
          }, 3000);
        }}>
        <Text style={styles.user_name}>{user.username}</Text>
        <Image style={styles.user_img} source={require('../img/door.png')} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    padding: 15,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  ico: {
    width: 100,
    height: 30,
  },

  logo: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '600',
  },

  user_block: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  user_name: {
    fontSize: 20,
    marginRight: 7,
    color: '#fff',
  },

  user_img: {
    width: 35,
    height: 35,
    borderRadius: 100,
  },
});

export default Header;
