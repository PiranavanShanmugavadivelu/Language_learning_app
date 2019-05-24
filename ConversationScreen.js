
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Button,
  TouchableHighlight,
  Alert,
  Image,
  ListView,
  TouchableOpacity
} from 'react-native';
import firebase from 'react-native-firebase';

export default class ConversationScreen extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection('Cituations/GLrxXeUoWYNnbuoaAIrz/Conversation');
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
  const Conversation = [];
  querySnapshot.forEach((doc) => {
    const { English,Tamil,Url} = doc.data();
    Conversation.push({
      key: doc.id,
      doc, // DocumentSnapshot
      English,
      Tamil,
      Url
    });
  });
  this.setState({
    Conversation,
    loading: false,
 });
}

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('Title'),
    };
  };

  render() {
    const { navigation } = this.props;
    const Title = navigation.getParam('Title');

    return (

          <FlatList style={styles.notificationList} enableEmptySections={true}
          data={this.state.Conversation}
          keyExtractor= {(item) => {
            return item.Title,item.Description;
          }}
          renderItem={(post) => {
            const item = post.item;

          return (
            <View style={styles.box}>
              {/* <Image style={styles.image} source={{uri: service.image}} /> */}
              <View style={styles.boxContent}>
                <Text style={styles.title}>{item.Tamil}</Text>
                <Text style={styles.description}>{item.English}</Text>
                <View style={styles.buttons}>
                  <TouchableHighlight style={[styles.button, styles.view]} onPress={() => this.clickListener('login')}>
                    <Image style={styles.icon} source={{uri: 'https://img.icons8.com/ios/50/000000/play.png'}}/>
                  </TouchableHighlight>

                  <TouchableHighlight style={[styles.button, styles.profile]} onPress={() => this.clickListener('login')}>
                    <Image style={styles.icon} source={{uri: 'https://img.icons8.com/ios/50/000000/stop.png'}}/>
                  </TouchableHighlight>

                  <TouchableHighlight style={[styles.button, styles.message]} onPress={() => this.clickListener('login')}>
                    <Image style={styles.icon} source={{uri: 'https://img.icons8.com/ios/50/000000/pause.png'}}/>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          )
        }}/>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height:100,
  },
  box: {
    padding:20,
    marginTop:5,
    marginBottom:5,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  boxContent: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft:10,
  },
  title:{
    fontSize:18,
    color:"#151515",
  },
  description:{
    fontSize:15,
    color: "#646464",
  },
  buttons:{
    flexDirection: 'row',
  },
  button: {
    height:35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:10,
    width:50,
    marginRight:5,
    marginTop:5,
  },
  icon:{
    width:20,
    height:20,
  },
  view: {
    backgroundColor: "#FF1493",
  },
  profile: {
    backgroundColor: "#1E90FF",
  },
  message: {
    backgroundColor: "#228B22",
  },
});
