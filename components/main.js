import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from './header';
import List from './list';
import Add from './add';

import {userContext} from '../context/userContext';

const Main = ({navigation}) => {
  // useEffect(() => {
  //   if (!isLoading && !isAuth) {
  //     navigation.navigate('Login');
  //   }
  // }, [isAuth]);

  return (
    <View style={styles.main}>
      <Header navigation={navigation} />
      <Add />
      <List />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});

export default Main;
