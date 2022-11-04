import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

export default function ChatList({ navigation }) {

  const [chatList, setChatList] = useState([]);

  useEffect(function() {
      async function getData() {
          const response = await fetch('https://mobile.ect.ufrn.br:3000/chatlist');
          const chatList = await response.json();
          setChatList(chatList);
      }
      getData();
  }, []);

  function renderItem({item}){
    return (
      <TouchableOpacity style={styles.chat} onPress={() => {navigation.navigate('ChatScreen', {id: item.id})}}>
        <Image style={styles.imgUsuario} source={{uri: item.imgPerfilUri}}/>
        <View style={styles.textbox}>        
          <Text style={styles.username}>{item.nomeUsuario}</Text>
          <Text style={styles.lastmensage}>{item.ultimaMensagem}</Text>
        </View>
      </TouchableOpacity>
        );
  }

 return (
        <View style={styles.container}>
          <StatusBar style='auto'/>
            <FlatList
            data={chatList}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            />
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imgUsuario:{
    margin: 5,
    width: 60,
    height:60,
    borderRadius: 70/2,
  },
  chat: {
    flexDirection: 'row',
  },
  username: {
    marginBottom: 10,
    marginLeft: 11,
    fontWeight: 'bold',
  },
  lastmensage: {
    color: 'grey',
    marginLeft: 10,
  },
  textbox:{
    justifyContent: 'center',
  }
});