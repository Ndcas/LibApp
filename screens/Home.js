import React, { useState, useEffect } from 'react';
import { Alert, Button, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass, width } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';


export default function App({ navigation }) {

    const [listBook, setListBook] = useState([]);

    async function getBook() {
        let data = await fetch("http://192.168.1.8:8080/dauSach/get")
        if (data.ok) {
            let books = await data.json();
            for (let i = 0; i < books.length; i++) {
                let img = await fetch(`http://192.168.1.8:8080/hinhAnh/getById?id=${books[i].hinhAnh}`);
                
                if(img.ok){
                    img = await img.json();
                    
                    books[i].hinhAnh = "data:image/" + img.format + ";base64," +  img.dataUrl;
                }
            }
            setListBook(books);
        }
    }

    useEffect(() => {
        getBook();
    })


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.search}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} style={styles.icon} />
                    <TextInput style={{ flex: 1 }} placeholder='Tìm kiếm' placeholderTextColor="#000000" clearTextOnFocus={true} />
                </View>
                <View style={styles.profile}>
                    <Pressable style={styles.profileBtn} onPress={() => navigation.navigate("ProfileMember")}>
                        <FontAwesomeIcon icon={faUser} style={styles.user} size={35} />
                    </Pressable>
                </View>
            </View>

            <Text style={styles.category}>
                Tất cả sách
            </Text>

            {/* <View style={styles.bookList}>

                <View style={{ flex: 1 }}>
                    <Pressable onPress={() => navigation.navigate("BookDetail")}>
                        <Image style={styles.img} source={require("../assets/img/Blank_img.png")} />
                        <Text>sc</Text>
                    </Pressable>
                </View>

                <View style={{ flex: 1 }}>
                    <Pressable onPress={() => navigation.navigate("BookDetail")}>
                        <Image style={styles.img} source={require("../assets/img/Blank_img.png")} />
                        <Text>Name</Text>
                    </Pressable>
                </View>

                <View style={{ flex: 1 }}>
                    <Pressable onPress={() => navigation.navigate("BookDetail")}>
                        <Image style={styles.img} source={require("../assets/img/Blank_img.png")} />
                        <Text>Name</Text>
                    </Pressable>
                </View>
            </View> */}

            <View style={styles.bookList}>
                {
                    listBook.map((book) =>
                        <Pressable onPress={() => navigation.navigate("BookDetail", {book: book})}>
                            <Image style={{height: 100, width: 50}} source={{uri: book.hinhAnh}}/>
                            <Text>{book.tenDauSach}</Text>
                        </Pressable>
                    )

                }
            </View>



        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 10,
        marginTop: 20
    },

    search: {
        flexDirection: "row",
        flex: 5,
        width: 345,
        height: 40,
        marginTop: 15,
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 20,
        paddingLeft: 10,
        fontSize: 15,
    },

    icon: {
        flex: 1,
        paddingTop: 39,
        paddingLeft: 5,
    },

    user: {
        margin: 6,
        marginTop: 5
    },

    profile: {
        flex: 1,
        height: 50,
        marginTop: 15,
        marginLeft: 15,
        borderRadius: 50,
    },

    profileBtn: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderRadius: 25
    },

    category: {
        fontWeight: "bold",
        fontSize: 18,
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginTop: 15
    },

    bookList: {
        flexDirection: "row",
        marginLeft: 20,
        marginTop: 10
    },

    book: {
        flex: 1,
        flexDirection: "column",
    },

    img: {
        width: 100,
        height: 150,
        backgroundColor: "#ff914d"
    }
})