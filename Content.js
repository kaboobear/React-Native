import React, {useEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import Navigation from './components/navigation';

import {userContext} from './context/userContext';
import {itemContext} from './context/itemContext';

const Content = () => {
  const {loadUser, user, isAuth} = useContext(userContext);
  const {loadItems} = useContext(itemContext);

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    isAuth && loadItems(user._id);
  }, [isAuth]);

  return (
    <View style={styles.container}>
      <Navigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Content;
