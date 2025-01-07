import React,{useState} from 'react';
import { Alert, View, Button, Text, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Edit = ({navigation, route}) => {

  let mydata = JSON.parse(route.params.datastring);
  let myindex = route.params.index;

  const [name, setName] = useState(route.params.key);
  const [isbn, setISBN] = useState(route.params.isbn);
  const [copies, setCopies] = useState(route.params.copies);


  const setData = async(value) => {
      AsyncStorage.setItem("alphadata", value);
      navigation.navigate("Home");
  }

  return (
    <View>
      <Text style={{fontWeight: 'bold'}}>Name:</Text>
      <TextInput value={name} style={{borderWidth:1}} onChangeText={(text)=>setName(text)}/>
      <Text style={{fontWeight: 'bold'}}>ISBN:</Text>
      <TextInput value={isbn} style={{borderWidth:1}} onChangeText={(text)=>setISBN(text)}/>
      <Text style={{fontWeight: 'bold'}}>Copies Owned:</Text>
      <TextInput value={copies} style={{borderWidth:1}} onChangeText={(text)=>setCopies(text)}/>

      <View style={{flexDirection:"row"}}>
        <View style={{margin:10,flex:1}}>
        <Button title='Save'
          onPress={()=>{
            mydata[0].data[myindex].key=name;
              mydata[0].data[myindex].isbn=isbn;
            mydata[0].data[myindex].copies=copies;
            let stringdata = JSON.stringify(mydata);
            setData(stringdata);
          }
        }
        />
        </View>
        <View style={{margin:10,flex:1}}>
        <Button title='Delete'
          onPress={()=>{
            Alert.alert("Are you sure?",'',
              [{text:'Yes', onPress:()=>{
                mydata[0].data.splice(myindex,1);
                let stringdata = JSON.stringify(mydata);
                setData(stringdata);
              }},
              {text:'No'}])
          }
        }
        />
        </View>
      </View>
    </View>
  );
};

export default Edit;
