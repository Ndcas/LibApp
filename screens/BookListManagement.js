import React, { useState, useEffect } from 'react';
import { Alert, Button, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View, Image, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass, width } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { API_URL } from '@env';
import { useRoute } from "@react-navigation/native";


export default function App({ navigation }) {

    const dauSachId = useRoute().params.dauSachId;

    const [listBook, setListBook] = useState([]);

    async function createNewBook() {
        let dats = await fetch(API_URL + '/sach/create', {
            method: "post",
            body: JSON.stringify({ dauSachId: dauSachId }),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });
        console.log(dats.ok);
        if (dats.ok) {
            console.log(dats);
        }
        getBooks();
    }

    async function getBooks() {
        let data = await fetch(API_URL + `/sach/get?dauSach=${dauSachId}`);
        if (data.ok) {
            let books = await data.json();
            setListBook(books);
        }
    }

    useEffect(() => {
        getBooks();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.search}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} style={styles.icon} />
                    <TextInput style={{ flex: 1 }} placeholder='Tìm kiếm' placeholderTextColor="#000000" clearTextOnFocus={true}></TextInput>
                </View>
            </View>

            <Pressable style={styles.addBook} onPress={() => createNewBook()}>
                <Text style={{}}>+ Thêm sách</Text>
            </Pressable>

            <ScrollView style={styles.bookList}>
                {
                    listBook.map((book) =>
                        <Pressable style={styles.book}>
                            <View style={{ flex: 2, marginLeft: 10, marginTop: 10, gap: 10, justifyContent: "center" }}>
                                <Text>
                                    <Text style={styles.myText}>ID:</Text>
                                    {"\t" + book._id}
                                </Text>
                                <Text>
                                    <Text style={styles.myText}>Tình trạng:</Text>
                                    {"\t" + book.tinhTrang}
                                </Text>
                            </View>
                        </Pressable>
                    )
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 40,
        paddingHorizontal: 20
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
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

    img: {
        height: "100%",
        width: undefined,
        backgroundColor: "#ff914d",
        borderRadius: 10
    },

    addBook: {
        flexDirection: "row",
        marginTop: 10
    },

    bookList: {
        flexDirection: "column",
        gap: 10,
        marginTop: 25,
        borderWidth: 1,
        height: "80%"
    },

    book: {
        width: "100%",
        height: 180,
        borderWidth: 1,
        borderColor: "#c1c1c1",
        padding: 5,
        flexDirection: "row",
    },

    myText: {
        fontSize: 18,
        fontWeight: "bold",
    },
})