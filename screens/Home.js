import React, { useState, useEffect } from 'react';
import { ImageBackground, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View, Image, Platform, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { API_URL } from '@env';

export default function App({ navigation }) {
    const [txtSearch, setTxtSearch] = useState("");
    const [listBook, setListBook] = useState([]);
    const [displayBooks, setDisplayBooks] = useState([]);

    async function getBook() {
        let data = await fetch(API_URL + "/dauSach/getCoSan")
        if (data.ok) {
            let books = await data.json();
            setListBook(books);
            setDisplayBooks(books);
        }
    }

    useEffect(() => {
        getBook();
    }, []);

    async function searchBook() {
        if (txtSearch.trim() == "") {
            setDisplayBooks(listBook);
        }
        else {
            books = listBook.filter((book) => {
                return book.tenDauSach.toLowerCase().includes(txtSearch.trim().toLowerCase());
            });
            setDisplayBooks(books);
        }
    }

    return (

        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/img/Screenshot (32).png')} // Đường dẫn tới hình ảnh của bạn
                style={styles.descriptionAndSearch}>
                <Pressable style={styles.profileBtn} onPress={() => navigation.navigate("ProfileMember")}>
                    <FontAwesomeIcon icon={faUser} style={styles.user} size={20} />
                </Pressable>
                <Text style={{ fontSize: 40, fontWeight: 'bold', marginLeft: 15, marginTop: 10 }}>My Library</Text>
                <Text style={{ fontSize: 14, opacity: 0.3, marginLeft: 15, fontStyle: 'italic', marginRight: 15 }}>"Những người khôn ngoan tìm được sự an ủi khỏi những rắc rối của cuộc đời chính từ sách" - Victor Hugo</Text>
                <View style={styles.search}>
                    <Pressable onPress={() => searchBook()}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} style={{ marginRight: 10 }} />
                    </Pressable>
                    <TextInput style={{ flex: 1, opacity: 0.7 }} placeholder='Bạn muốn đọc gì ?' placeholderTextColor="#000000" clearTextOnFocus={true} value={txtSearch} onChangeText={text => setTxtSearch(text)} />
                </View>
            </ImageBackground>



            <KeyboardAvoidingView
                style={styles.booklist}
                behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <Text style={styles.category}>
                    Tất cả sách
                </Text>
                <ScrollView style={{ marginTop: 15 }}>
                    <View style={styles.bookList}>
                        {
                            displayBooks.map((book, index) =>
                                <Pressable style={styles.book} key={index} onPress={() => navigation.navigate("BookDetail", { book: book })}>
                                    <View style={styles.bookPart}>
                                        <Image style={{ height: 150, width: 100, borderRadius: 20 }} source={{ uri: 'data:image/' + book.hinhAnh.format + ';base64,' + book.hinhAnh.dataUrl }} />
                                    </View>
                                    <View style={styles.descriptionPart}>
                                        <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{book.tenDauSach}</Text>
                                        <Text style={{ fontSize: 12, opacity: 0.5 }}> Bởi {book.tacGia}</Text>

                                    </View>
                                </Pressable>
                            )

                        }
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>





        </View>

    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    descriptionAndSearch: {
        flex: 4,
        backgroundColor: '#fff2cc',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    booklist: {
        flex: 6,
        backgroundColor: "white",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -30,
    },


    detail: {
        flex: 7,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: 'hidden',
        marginTop: -20,
        backgroundColor: "white",

    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 10,
        marginTop: 20
    },

    search: {
        flexDirection: 'row',
        width: 370,
        height: 60,
        marginTop: 25,
        borderColor: "#000000",
        borderRadius: 23,
        paddingLeft: 15,
        fontSize: 17,
        marginLeft: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "white",
        elevation: 5


    },
    searchAndUSer: {
        flex: 2,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    discover: {
        flex: 4,
        alignItems: "flex-start",
        justifyContent: 'center',
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
        width: 40,
        height: 40,
        borderWidth: 1,
        borderRadius: 25,
        marginTop: 60,
        marginLeft: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },

    category: {
        fontWeight: "bold",
        fontSize: 18,
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginTop: 15
    },
    bookPart: {
        flex: 3
    },
    descriptionPart: {
        flex: 7,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 10
    },

    /******************************************************** */
    bookList: {
        marginHorizontal: 20,
        justifyContent: "center",
    },

    book: {
        flex: 1,
        marginBottom: 25,
        borderRadius: 20,
        flexDirection: 'row',
        backgroundColor: "white",
        elevation: 10,
        overflow: 'visible'

    },

    /****************flexwrap + minWidth = grid **************/

    img: {
        width: 100,
        height: 150,
        backgroundColor: "#ff914d"
    }
})