import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, TextInput} from 'react-native';

export default function ChatScreen({ route }) {
    
    const [chat, setChat] = useState([]);

    useEffect(function() {
        async function getData() {
            const response = await fetch(`https://mobile.ect.ufrn.br:3000/chatlist/${route.params.id}`);
            const chat = await response.json();
            setChat(chat);
        }
        getData();
    }, []);
  
    function renderItem({item}){
        return (
          <View style={item.autor ? styles.trueAutor : styles.falseAutor}>
            <Text> {item.texto}</Text>
          </View>
            );
      }

     return (
            <View style={styles.container}>
                <StatusBar style='auto'/>
                <View style={styles.chatContainer}>
                    <FlatList
                    data={chat.mensagens}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder='Mensagem'>

                    </TextInput>
                    <TouchableOpacity>
                        <Text style={ styles.sendButton}>Enviar</Text>
                    </TouchableOpacity>
                </View>
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
    chatContainer:{
        flex: 1,
        margin: 5,
    },
    input:{
        flex:1,
        fontSize: 15,
        marginLeft: 5,
    },
    inputContainer:{
        backgroundColor: 'lightgrey',
        height: 50,
        alignItems: 'center',
        borderColor: 'grey' ,
        borderWidth: 1,
        borderRadius: 20,
        marginBottom: 15,
        marginHorizontal: 10,
        flexDirection: 'row',
    },
    trueAutor: {
        height: 30,
        backgroundColor: 'lightgreen',
        borderRadius: 3,
        justifyContent: 'center',
        padding: 5,
        alignSelf: 'flex-end'
    },
    falseAutor:{
        height: 30,
        backgroundColor: 'lightgrey',
        borderRadius: 3,
        justifyContent: 'center',
        padding: 5,
        alignSelf: 'flex-start'
    },
    lastmensage: {
      color: 'grey',
      marginLeft: 10,
    },
    textbox:{
      justifyContent: 'center',
    },
    sendButton: {
        marginRight: 5,
    }
  });