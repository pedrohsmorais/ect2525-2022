import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View,} from 'react-native';

import Header from '../components/Header';
import Stories from '../components/Stories';
import Feed from '../components/Feed';

const statusBarHeigth= StatusBar.currentHeigth ? StatusBar.currentHeigth : 40;

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style='auto'/>
      <Header navigation = {navigation}/>
      <Stories/>
      <Feed/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:statusBarHeigth,
  },
});