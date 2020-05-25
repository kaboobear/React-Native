import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';
import {userContext} from '../context/userContext';
import {errorContext} from '../context/errorContext';
import Spinner from 'react-native-spinkit';

const Login = ({navigation}) => {
  const {isAuth, login, isLoading} = useContext(userContext);
  const {errorMsg, errorId, clearErrors} = useContext(errorContext);

  const [formData, setFormData] = useState({mail: '', pass: ''});
  const [msg, setMsg] = useState({});
  const [color, setColor] = useState(['#fff', '#fff']);

  useEffect(() => {
    if (isAuth === true) {
      navigation.navigate('Home');
      clearErrors();
      setTimeout(() => {
        setFormData({mail: '', pass: ''});
      }, 3000);
    }

    if (errorId === 'LOGIN_FAIL') {
      setMsg(errorMsg);
    } else {
      setMsg({});
    }
  }, [isAuth, errorId]);

  useEffect(() => {
    return () => {
      clearErrors();
    };
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    const loginData = {
      username: formData.mail,
      password: formData.pass,
    };

    login(loginData);
  };

  return (
    <View style={styles.log_section}>
      <ImageBackground source={require('../img/bg.jpg')} style={styles.bg_img}>
        {isLoading || isAuth ? (
          <View style={styles.log_section_load}>
            {/* <Text style={styles.log_section_load_text}>Loading...</Text> */}
            <Spinner isVisible={true} size={60} type={'Wave'} color={'#fff'} />
          </View>
        ) : (
          <View style={styles.log_section_inner}>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
              <Image style={styles.ico} source={require('../img/ico.png')} />

              <View style={styles.log_form}>
                <View style={styles.simple_input}>
                  <View style={styles.input_img}>
                    <Image
                      style={styles.input_img_element}
                      source={require('../img/user.png')}
                    />
                  </View>

                  <TextInput
                    placeholder="Username"
                    placeholderTextColor={msg.mail ? color[0] : color[0]}
                    value={formData.mail}
                    onFocus={() => {
                      setColor(['transparent', '#fff']);
                    }}
                    onBlur={() => {
                      setColor(['#fff', '#fff']);
                    }}
                    selectionColor={'#fff'}
                    onChangeText={text => {
                      setFormData({...formData, mail: text});
                    }}
                    style={[styles.text_input, msg.mail && styles.error]}
                  />

                  {msg.mail && (
                    <View style={styles.exclam}>
                      <Image
                        style={styles.exclam_img}
                        source={require('../img/exclam-ico.png')}
                      />
                    </View>
                  )}
                </View>

                <View style={styles.simple_input}>
                  <View style={styles.input_img}>
                    <Image
                      style={[styles.input_img_element, styles.iie2]}
                      source={require('../img/lock.png')}
                    />
                  </View>

                  <TextInput
                    placeholder="Password"
                    placeholderTextColor={msg.pass ? color[1] : color[1]}
                    value={formData.pass}
                    onFocus={() => {
                      setColor(['#fff', 'transparent']);
                    }}
                    onBlur={() => {
                      setColor(['#fff', '#fff']);
                    }}
                    onChangeText={text => {
                      setFormData({...formData, pass: text});
                    }}
                    style={[styles.text_input, msg.pass && styles.error]}
                    selectionColor={'#fff'}
                  />

                  {msg.mail && (
                    <View style={styles.exclam}>
                      <Image
                        style={styles.exclam_img}
                        source={require('../img/exclam-ico.png')}
                      />
                    </View>
                  )}
                </View>

                <TouchableOpacity style={styles.btn} onPress={onSubmit}>
                  <Text style={styles.btn_text}>Sign In</Text>
                </TouchableOpacity>

                <View style={styles.log_buttons}>
                  <TouchableOpacity
                    style={styles.log_btn}
                    onPress={() => navigation.push('Register')}>
                    <Text style={styles.log_title}>Create Account</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  log_section: {
    // backgroundColor: '#40c9c4',
    // backgroundColor: '#000',
    flex: 1,
    width: '100%',
  },

  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  bg_img: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
  },

  ico: {
    width: 240,
    height: 73,
    marginTop: 35,
    marginBottom: 10,
  },

  log_section_inner: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },

  log_section_load: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  log_buttons: {
    flexDirection: 'row',
  },

  log_btn: {
    width: '100%',
  },

  log_title: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '300',
    color: '#fff',
    textDecorationLine: 'underline',
  },

  log_form: {
    width: '100%',
    padding: 20,
    paddingBottom: 15,
  },

  simple_input: {
    width: '100%',
    position: 'relative',
    marginBottom: 10,
  },

  input_img: {
    position: 'absolute',
    left: 15,
    top: 14,
    width: 25,
  },

  input_img_element: {
    width: 30,
    height: 30,
  },

  iie2: {
    marginBottom: 2,
    width: 28,
    height: 28,
  },

  text_input: {
    backgroundColor: 'rgba(255,255,255,.3)',
    borderRadius: 50,
    padding: 15,
    paddingLeft: 57,
    paddingRight: 60,
    fontSize: 18,
    width: '100%',
    color: '#fff',
  },

  error: {
    // borderColor: '#e7717d',
    // color: '#e7717d',
  },

  exclam: {
    position: 'absolute',
    right: 17,
    top: 12,
  },

  exclam_img: {
    width: 33,
    height: 33,
  },

  btn: {
    width: '100%',
    padding: 15,
    borderRadius: 50,
    // backgroundColor: '#40c9c4',
    backgroundColor: '#f96331',
    marginBottom: 20,
  },

  btn_text: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
  },
});

export default Login;
