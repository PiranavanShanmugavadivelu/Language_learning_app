import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView,
  TextInput,
  ListView
} from 'react-native';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import firebase from 'react-native-firebase';

export default class CituationScreen extends Component {


static navigationOptions = {
  title: 'Cituations',
}

  constructor() {
    super();
    this.ref = firebase.firestore().collection('Cituations');
    this.unsubscribe = null;
    this.state = {
        loading: true,
        Cituations: [],

    };

}



componentDidMount() {
  this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
}

componentWillUnmount() {
  this.unsubscribe();
}

onCollectionUpdate = (querySnapshot) => {
  const Cituations = [];
  querySnapshot.forEach((doc) => {
    const { Title,Description} = doc.data();
    Cituations.push({
      key: doc.id,
      doc, // DocumentSnapshot
      Title,
      Description
    });
  });
  this.setState({
    Cituations,
    loading: false,
 });
}

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContent}>
          <View style={styles.inputContainer}>
            <Image style={[styles.icon, styles.inputIcon]} source={{uri: 'https://png.icons8.com/search/androidL/100/2ecc71'}}/>
            <TextInput style={styles.inputs}
                ref={'txtPassword'}
                placeholder="Search"
                underlineColorAndroid='transparent'
                onChangeText={(name_address) => this.setState({name_address})}/>
          </View>

          <TouchableHighlight style={styles.saveButton} onPress={() => this.clickEventListener('search')}>
            <Image style={[styles.icon, styles.iconBtnSearch]} source={{uri: 'https://png.icons8.com/search/androidL/100/ffffff'}}/>
          </TouchableHighlight>
        </View>

        <FlatList style={styles.notificationList} enableEmptySections={true}
          data={this.state.Cituations}
          keyExtractor= {(item) => {
            return item.Title,item.Description;
          }}
          renderItem={(post) => {
            const item = post.item;
            return (
              <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('Conversation',
                 {
                  Title:item.Title,
                }
                );
                }} >
              <View style={styles.notificationBox}>
                {/* <Image style={styles.image}
                  source={{uri: notification.Title}}/> */}

                <Text style={styles.title}>{item.Title}</Text>
                {/* <Text style={styles.description}>{item.Description }</Text> */}

              </View>
              </TouchableOpacity>
            )}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
  formContent:{
    flexDirection: 'row',
    marginTop:30,
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      height:45,
      flexDirection: 'row',
      alignItems:'center',
      flex:1,
      margin:10,
  },
  icon:{
    width:30,
    height:30,
  },
  iconBtnSearch:{
    alignSelf:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    marginLeft:15,
    justifyContent: 'center'
  },
  saveButton: {
    height:45,
    justifyContent: 'center',
    alignItems: 'center',
    margin:10,
    width:70,
    alignSelf: 'flex-end',
    backgroundColor: '#40E0D0',
    borderRadius:30,
  },
  saveButtonText: {
    color: 'white',
  },
  notificationList:{
    marginTop:20,
    padding:10,
  },
  notificationBox: {
    padding:20,
    marginTop:5,
    marginBottom:5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius:10,
  },
  image:{
    width:45,
    height:45,
  },
  title:{
    fontSize:18,
    color: "#3498db",
    marginLeft:10,
  },
  description:{
    fontSize:15,
    color: "#646464",
  },
});
