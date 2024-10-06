import React, { useState, useEffect } from 'react';
import { Alert, Button, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View,Image } from 'react-native';
import { useRoute } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';



export default function App({ navigation }) {
    
    const route = useRoute();

    const [book, setBook] = useState({});

    const [listChuyenNganh, setListChuyenNganh] = useState([]);

    async function getBook() {
        let data = await fetch("http://10.10.78.157:8080/dauSach/getCoSan")
        if (data.ok) {
            let book = await data.json();
        }
    }

    useEffect(() => {
        getBook();
        getChuyenNganh();
    })

    async function getChuyenNganh() {
        let data = await fetch("http://10.10.78.157:8080/chuyenNganh/get");
        if (data.ok) {
            let chuyenNganhs = await data.json();
            setListChuyenNganh(chuyenNganhs);
        }
    }


    function borrowBook() {

        navigation.navigate("Home");
    }

    return (
        <View style={styles.container}>
            <Image style={styles.img} source={{uri: route.params?.book.hinhAnh}} resizeMode="contain"/>
            <Text style = {styles.title}>{route.params?.book.tenDauSach}</Text>
            <View style = {styles.descriptionFrame}>
                <View style ={styles.icon}>
                <Icon name="user" size={30} style={{paddingLeft :10}} />
                </View>
                <View style ={styles.detail}>
                    <Text style={{opacity :0.5}}>Tác giả</Text>
                    <Text style={styles.detailDescription}>{route.params?.book.tacGia}</Text>
                </View>

            </View>

            <View style = {styles.descriptionFrame}>
                <View style ={styles.icon}>
                <Icon name="book" size={30} style={{paddingLeft :10}} />
                </View>
                <View style ={styles.detail}>
                    <Text style={{opacity :0.5}}>Chuyên ngành</Text>
                    {
                        listChuyenNganh.map((chuyenNganh) => {
                            if(chuyenNganh._id == route.params?.book.chuyenNganh){
                                return(
                                    <Text style ={styles.detailDescription}>{chuyenNganh.tenChuyenNganh}</Text>
                                )
                            }
                        }
                        )}
                </View>

            </View>

            <View style = {styles.descriptionFrame}>
                <View style ={styles.icon}>
                <Icon name="print" size={30} style={{paddingLeft :10}} />
                </View>
                <View style ={styles.detail}>
                    <Text style={{opacity :0.5}}>Tác giả</Text>
                    <Text style={styles.detailDescription}>{route.params?.book.nhaXuatBan}</Text>
                </View>

            </View>

            <View style = {styles.descriptionFrame}>
                <View style ={styles.icon}>
                <Icon name="pagelines" size={30} style={{paddingLeft :10}} />
                </View>
                <View style ={styles.detail}>
                    <Text style={{opacity :0.5}}>Số trang</Text>
                    <Text style={styles.detailDescription}>{route.params?.book.soTrang}</Text>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingLeft: 25,
        paddingRight: 25,
        backgroundColor: "#fff",
        paddingTop: 50
    },
    icon : {
        flex : 1,
    },
    detail : {
        flex : 6,
    },
    detailDescription :{
        fontSize:15,
        fontWeight:'bold'

    },
    
   
    headBox: {
        padding: 10,
        marginTop: 15,
        borderRadius: 15,
        backgroundColor: "#fff",
        elevation: 5,
        borderWidth :1,

    },
    descriptionFrame: {
        borderRadius : 5,
        borderColor: "black",
        borderWidth : 1,
        flexDirection : 'row',
        height :60,
        width : "100%",
        alignItems : 'center',
        marginBottom :5,
        borderColor: 'rgba(0, 0, 0, 0.3)'


    },

    img: {
        width: '100%',
        height: '50%',
        borderRadius : 5,
        fontWeight :'bold',
        borderWidth : 1,
        borderColor : 'black',
        marginTop : 30,
        borderColor: 'rgba(0, 0, 0, 0.3)'


       
    },

    title: {
        fontSize: 30,
        paddingBottom :30,
        paddingLeft : 5,
        paddingTop : 7,
        fontWeight : 'bold',
    },

    author: {
        fontSize: 20,
    },

    mota : {
        fontWeight :'bold',
        fontSize :20,
    },

    button: {
        marginTop: 30,
        width: 180,
        height: 50,
        backgroundColor: "#ff914d",
        alignItems: "center",
        borderRadius: 15,
        padding: 5,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: "center"
    },

    btnText: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});