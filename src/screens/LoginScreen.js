import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const statusBarHeigth = StatusBar.currentHeigth ? StatusBar.currentHeigth : 40;

export default function LoginScreen({ navigation }) {

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  async function logar() {
    const headerOptions = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, password}),
    };
    const response = await fetch('https://mobile.ect.ufrn.br:3000/login', headerOptions);
    if(response.status === 200){
      const token = await response.text();
      await AsyncStorage.setItem('token', token);
      navigation.navigate('HomeScreen');
    } else{
      Alert.alert(
        'ERROR: ' + response.status,
        'Usuário ou senha inválidos',
      );
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style='auto'/>
      <View style= {styles.loginContainer}>
        <TextInput 
        style= {styles.input} 
        placeholder='Usuário'
        value={user}
        onChangeText={setUser}
        />
        <TextInput 
        style= {styles.input} 
        placeholder='Senha'
        value={password}
        onChangeText={setPassword} 
        secureTextEntry={true}
        />
        <TouchableOpacity 
        style={styles.sendButton}
        onPress={() => logar()}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: statusBarHeigth,
    justifyContent: 'center',
  },
  loginContainer:{
    backgroundColor: 'yellow',
    justifyContent: 'center',
    margin: 20,
    padding: 40,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#f9f6eb',
  },
  input: {
    height: 40,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    backgroundColor: 'white',
    paddingLeft: 5,
  },
  sendButton: {
    padding: 10,
    width: 120,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop:20,
    alignSelf: 'center'
  }
});