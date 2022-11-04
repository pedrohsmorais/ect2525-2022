import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity} from 'react-native';
import React, { useEffect, useState  } from 'react';
import {FontAwesome5} from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


export default function Feed() {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
      async function getData() {
          const response = await fetch('https://mobile.ect.ufrn.br:3000/feed');
          const feed = await response.json();
          setFeed(feed);
      }
      getData();
  }, [])

    function renderItem({item}){
        return (
            <View style={styles.feed}>
                <View style={styles.greyline}/>
                <View style={styles.post}>
                <View style={styles.postheader}>
                  <View style={styles.postheaderleft}>
                  <Image style={styles.postheaderimg} source={{uri: item.imgPerfilUri}}/>
                  <Text style={styles.textpostheader}>{item.nomeUsuario}</Text>
                  </View>
                  <FontAwesome5 style={styles.fontapostheader} name="ellipsis-h" size={18} color="black"/>
                </View>
                <Image style={styles.postimg} aspectRatio={item.aspectRatio}  source={{uri: item.imgPostUri}}/>
                <View style={styles.footer}>
                  <FontAwesome style={styles.footericon} name="heart" size={24} color="red" />
                  <FontAwesome5 name="comments" size={25}/>
                </View>
                </View>      
            </View>
        );
    }

    return(
        <View style={styles.feed}>
            <FlatList
            data={feed}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    feed: {
      flex: 1,
      backgroundColor: '#fff',
    },
    post: {
      backgroundColor: '#fff',
    },
    postheader: {
      margin: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 50,
    },
    postheaderimg: {
      height: 50,
      width: 50,
      borderRadius: 25,
    },
    postheaderleft:{
        flexDirection: 'row',
        alignItems: 'center',
      },
    textpostheader: {
      fontWeight: 'bold',
      paddingLeft: 5,
    },
    fontapostheader: {
      paddingRight: 5,
    },
    postimg: {
      width: '100%',
      height: undefined,
    },
    footer: {
      height: 50,
      backgroundColor: '#fff',
      flexDirection: 'row',
      alignItems: 'center',
    },
    footericon: {
      margin: 5,
    },
    greyline: {
      backgroundColor: 'lightgrey',
      height: 1,
      marginHorizontal: 10,
    },
  });