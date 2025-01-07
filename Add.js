import React,{useState} from 'react';
import { StatusBar, View, Button, Text, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Add = ({navigation, route}) => {
    const [name, setName] = useState('');
    const [isbn, setISBN] = useState('');
    const [copies, setCopies] = useState('');
    const [imgLink, setImgLink] = useState('');

    const setData = async(value) => {
        AsyncStorage.setItem("alphadata", value);
        navigation.navigate("Home");
    }

    return (
        <View style={{padding: 10}}>
            <View style={{padding: 10}}>
                <Text style={{fontWeight: 'bold'}}>Name:</Text>
                <TextInput style={{borderWidth: 1}} onChangeText={(text) => setName(text)}/>
                <Text style={{fontWeight: 'bold'}}>ISBN:</Text>
                <TextInput style={{borderWidth: 1}} onChangeText={(text) => setISBN(text)}/>
                <Text style={{fontWeight: 'bold'}}>Copies Owned:</Text>
                <TextInput style={{borderWidth: 1}} onChangeText={(text) => setCopies(text)}/>
                <Text style={{fontWeight: 'bold'}}>Image Link</Text>
                <TextInput style={{borderWidth: 1}} onChangeText={(text) => setImgLink(text)}/>
            </View>

            <Button title="SUBMIT"
                    onPress={() => {
                        let mydata = JSON.parse(route.params.datastring);
                        let item = {key: name, isbn: isbn, copies: copies, img: imgLink};
                        mydata[0].data.push(item);
                        let stringdata = JSON.stringify(mydata);
                        setData(stringdata);
                    }}/>
        </View>
    );
};

export default Add;
