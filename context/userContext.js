import React, {createContext, useState, useContext, useEffect} from 'react';
import {errorContext} from './errorContext';
import axios from 'axios';
import storage from './storage';
import {StatusBar} from 'react-native';

export const userContext = createContext();

const UserContextProvider = props => {
  const {getErrors} = useContext(errorContext);

  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token === false) {
      setIsLoading(false);
      setIsAuth(false);
      setUser({});
    } else if (token !== null) {
      axios
        .get('https://kaboo-native-test.herokuapp.com/user/info', tokenConfig())
        .then(res => {
          setUser(res.data);
          setIsLoading(false);
          setIsAuth(true);
        })
        .catch(err => {
          getErrors(err.response.data, err.response.status, 'AUTH_ERROR');
          setIsLoading(false);
          setIsAuth(false);
          setUser({});
        });
    }
  }, [token]);

  const loadUser = async () => {
    setIsLoading(true);

    let currentToken = await storage.getToken();
    StatusBar.setHidden(true);
    if (currentToken !== null) {
      currentToken = currentToken.token;
    }
    setToken(currentToken);
  };

  const login = loginData => {
    const config = {headers: {'Content-type': 'application/json'}};

    const body = JSON.stringify(loginData);
    axios
      .post('https://kaboo-native-test.herokuapp.com/user/login', body, config)
      .then(async res => {
        const tokenVal = res.data.token;
        try {
          await storage.setToken(tokenVal);
        } catch (err) {
          console.log(err);
        }
        setUser(res.data);
        setIsAuth(true);
        setIsLoading(false);
        setToken(tokenVal);
      })
      .catch(err => {
        console.log(err.response);
        getErrors(err.response.data, err.response.status, 'LOGIN_FAIL');
        setIsAuth(false);
        setIsLoading(false);
        setUser({});
        setToken(null);
      });
  };

  const register = regData => {
    const config = {headers: {'Content-type': 'application/json'}};

    const body = regData;
    axios
      .post(
        'https://kaboo-native-test.herokuapp.com/user/register',
        body,
        config,
      )
      .then(async res => {
        const tokenVal = res.data.token;
        try {
          await storage.setToken(tokenVal);
        } catch (err) {
          console.log(err);
        }
        setIsAuth(true);
        setIsLoading(false);
        setUser(res.data);
        setToken(tokenVal);
      })
      .catch(err => {
        console.log(err.response);
        getErrors(err.response.data, err.response.status, 'REGISTER_FAIL');
        setIsAuth(false);
        setIsLoading(false);
        setUser({});
        setToken(null);
      });
  };

  const logout = async navigation => {
    try {
      await storage.removeToken();
    } catch (err) {
      console.log(err);
    }
    setIsAuth(false);
    setIsLoading(false);
    setUser({});
    setToken(null);
    navigation.navigate('Login');
  };

  const tokenConfig = () => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    if (token) {
      config.headers['x-auth-token'] = token;
    }

    return config;
  };

  return (
    <userContext.Provider
      value={{
        user,
        isAuth,
        isLoading,
        setUser,
        setIsAuth,
        setIsLoading,
        login,
        loadUser,
        register,
        logout,
      }}>
      {props.children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
