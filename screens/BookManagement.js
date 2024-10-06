import React, { useState, useEffect } from 'react';
import { Alert, Button, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass, width } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { faRefresh } from '@fortawesome/free-solid-svg-icons/faRefresh';


export default function App({ navigation }) {

    const [listBook, setListBook] = useState([]);

    async function getBooks() {
        let data = await fetch("http://192.168.1.8:8080/dauSach/get")
        // let data = await fetch("http://192.168.1.9:8080/dauSach/get")
        if (data.ok) {
            let books = await data.json();
            for (let i = 0; i < books.length; i++) {
                let img = await fetch(`http://192.168.1.8:8080/hinhAnh/getById?id=${books[i].hinhAnh}`);
                // let img = await fetch(`http://192.168.1.9:8080/hinhAnh/getById?id=${books[i].hinhAnh}`);

                if (img.ok) {
                    img = await img.json();

                    books[i].hinhAnh = "data:image/" + img.format + ";base64," + img.dataUrl;
                }
            }
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

            <Pressable style={styles.addBook}>
                <Text style={{}}>+ Thêm đầu sách</Text>
            </Pressable>

            <View style={styles.bookList}>
                {
                    listBook.map((book) =>
                        <Pressable style={styles.book} onPress={() => navigation.navigate("BookListManagement", {dauSachId: book._id})}>
                            <View style={{ flex: 1 }}>
                                <Image style={styles.img} source={{uri: book.hinhAnh}} />
                            </View>
                            <View style={{ flex: 2, marginLeft: 10, marginTop: 10, gap: 10, justifyContent: "center" }}>
                                <Text>
                                    <Text style={styles.myText}>Tên sách:</Text>
                                    {"\t" + book.tenDauSach}
                                </Text>

                                <Text>
                                    <Text style={styles.myText}>Mã:</Text>
                                    {"\t" + book._id}
                                </Text>

                                <Text>
                                    <Text style={styles.myText}>Số trang:</Text>
                                    {"\t" + book.soTrang}
                                </Text>
                            </View>
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