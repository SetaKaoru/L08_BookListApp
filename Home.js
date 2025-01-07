import React, {useState} from 'react';
import {StatusBar, Button, SectionList, StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import { datasource } from './Data.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    boxPokemon: {
        borderWidth: 1,
        flexWrap: 'wrap-reverse',
        flexDirection: 'row',
        backgroundColor: 'papayawhip',
        padding:'auto'
    },
    content:{
        flexDirection: 'column',
        maxWidth: 210,
    },
    nameStyle: {
        fontSize: 17,
        margin: 3,
        marginLeft: 7,
        fontWeight: 'bold'
    },
    subStyle: {
        fontSize: 15,
        margin: 3,
        marginLeft: 7,
    },
});

const Home = ({navigation}) => {

    const [mydata, setMydata] = useState([]);

    const getData = async() => {
        let datastr = await AsyncStorage.getItem('alphadata');
        if(datastr!= null){
            jsondata = JSON.parse(datastr);
            setMydata(jsondata);
        }
        else{
            setMydata(datasource);
        }
    }
    getData();

    const renderItem = ({item=datasource, index}) => {
        return (
            <View style={styles.boxPokemon}>

                <TouchableOpacity style={styles.content} onPress={()=>
                {
                    let datastr = JSON.stringify(mydata);
                    navigation.navigate("Edit",{index: index, key:item.key, isbn: item.isbn, copies: item.copies, datastring: datastr})
                }
                }>
                    <Text style={styles.nameStyle}>{item.key}</Text>
                    <Text style={styles.subStyle}>ISBN: {item.isbn}</Text>
                    <Text style={styles.subStyle}>Copies Owned: {item.copies}</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={{uri: item.img}} style={[styles.imageStyle, {width: 160, height: 230, margin: 17}]}/>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={{marginTop: 0, marginBottom: 50}}>
            <StatusBar/>
            <Button title='Add New Book' onPress={()=>{
                let datastr = JSON.stringify(mydata);
                navigation.navigate("Add", {datastring: datastr});
            }}/>
            <SectionList sections={mydata} renderItem={renderItem}/>
        </View>
    );
};

export default Home;
