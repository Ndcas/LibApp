import React, { useState, useEffect } from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, TextInput, View, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { API_URL } from '@env';

export default function App({ navigation }) {
    const [listBook, setListBook] = useState([]);
    const [displayBook, setDisplayBook] = useState([]);
    const [search, setSearch] = useState('');

    async function getBooks() {
        let data = await fetch(API_URL + "/dauSach/get")
        if (data.ok) {
            let books = await data.json();
            for (let i = 0; i < books.length; i++) {
                let img = await fetch(API_URL + `/hinhAnh/getById?id=${books[i].hinhAnh}`);
                books[i].hinhAnh = await img.json();
            }
            setListBook(books);
            setDisplayBook(books);
        }
    }

    function searchBook() {
        if (search.trim() == "") {
            setDisplayBook(listBook);
        }
        else {
            books = listBook.filter((book) => {
                return book.tenDauSach.toLowerCase().includes(search.trim().toLowerCase());
            });
            setDisplayBook(books);
        }
    }

    useEffect(() => {
        getBooks();
    }, []);


    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ImageBackground
                source={require('../assets/img/Screenshot (32).png')} // Đường dẫn tới hình ảnh của bạn
                style={styles.header}>
                <Text style={{ fontWeight: 'bold', fontSize: 40 }}>Quản lý sách</Text>
                <Text style={{ fontSize: 13, opacity: 0.5, paddingLeft: 5 }}>Quản lý đầu sách và số sách</Text>
                <View style={styles.search}>
                    <Pressable onPress={() => searchBook()}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} style={styles.icon} />
                    </Pressable>
                    <TextInput style={{ flex: 1, paddingLeft: 10, fontSize: 15 }} placeholder='Tìm kiếm' placeholderTextColor="#000000" clearTextOnFocus={true} value={search} onChangeText={(text) => setSearch(text)}></TextInput>
                </View>
            </ImageBackground>
            <KeyboardAvoidingView style={styles.list} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <ScrollView style={styles.bookList}>
                    {
                        displayBook.map((book, index) =>
                            <Pressable key={index} style={styles.book} onPress={() => navigation.navigate("BookListManagement", { book: book })}>
                                <View style={{ flex: 1 }}>
                                    <Image style={styles.img} source={{ uri: 'data:image/' + book.hinhAnh.format + ';base64,' + book.hinhAnh.dataUrl }} />
                                </View>
                                <View style={{ flex: 2, marginLeft: 10, marginTop: 7, gap: 10, justifyContent: "flex-start", alignItems: 'flex-start' }}>
                                    <Text>
                                        <Text style={styles.myText}>Tên sách : </Text>
                                        <Text style={{ fontSize: 16 }}>{book.tenDauSach}</Text>
                                    </Text>
                                    <Text>
                                        <Text style={{ fontSize: 14, fontStyle: 'italic' }}>Bởi </Text>
                                        <Text style={{ fontSize: 14, fontStyle: 'italic' }}>{book.tacGia}</Text>
                                    </Text>
                                </View>
                            </Pressable>
                        )
                    }

                </ScrollView>
            </KeyboardAvoidingView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',

    },

    header: {
        flex: 2.5,
        backgroundColor: "#fff2cc",
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: 40,
        paddingLeft: 15,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginBottom: 20
    },
    list: {
        flex: 6.5,
    },
    footer: {
        flex: 1,
        backgroundColor: "white",
        elevation: 5,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },

    search: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: 380,
        height: 55,
        marginTop: 20,
        borderRadius: 15,
        paddingLeft: 10,
        fontSize: 15,
        elevation: 5,
        backgroundColor: "white"
    },

    icon: {
        flex: 1,
        paddingTop: 39,
        paddingLeft: 5,
    },

    img: {
        height: "100%",
        width: undefined,
        backgroundColor: "#ff914d",
        borderRadius: 20
    },

    addBook: {
        flexDirection: "row",
        marginTop: 10,
        paddingLeft: 10
    },

    bookList: {
        flexDirection: "column",
        backgroundColor: "white",


    },

    book: {
        width: "94%",
        height: 170,
        backgroundColor: 'white',
        borderRadius: 20,
        elevation: 5,
        padding: 5,
        marginBottom: 20,
        marginLeft: 10,
        flexDirection: "row",
    },

    myText: {
        fontSize: 16,
        fontWeight: "bold",
    },
})