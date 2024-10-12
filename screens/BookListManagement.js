import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, ScrollView, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { useRoute } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { API_URL } from '@env';


export default function App({ navigation }) {

    const book = useRoute().params.book;

    const [listBook, setListBook] = useState(null);
    const [chuyenNganh, setChuyenNganh] = useState(null);

    async function createNewBook() {
        let dats = await fetch(API_URL+"/sach/create", {
            method: "post",
            body: JSON.stringify({ dauSachId: book._id }),
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
        let data = await fetch(API_URL+`/sach/get?dauSach=${book._id}`);
        if (data.ok) {
            let books = await data.json();
            setListBook(books);
        }
    }

    async function getChuyenNganh() {
        let data = await fetch(API_URL+`/chuyenNganh/get?_id=${book.chuyenNganh}`);
        if (data.ok) {
            let chuyenNganhTemp = await data.json();
            setChuyenNganh(chuyenNganhTemp);
        }
    }

    useEffect(() => {
        getBooks();
        getChuyenNganh();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.upperPart}>
                <View style={styles.bookDescription}>
                    {/* Phần hình ảnh trong view */}
                    <View style={styles.imagePart}>
                        <Image style={styles.img} source={{ uri: 'data:image/' + book.hinhAnh.format + ';base64,' + book.hinhAnh.dataUrl }} />
                    </View>
                    {/* Phần mô tả trong view */}
                    <View style={styles.descriptionPart}>
                        {/* Các thành phần trong mô tả */}


                        <View style={styles.descriptionDetailFrame}>
                            <View style={styles.icon1}>
                                <Icon name="user" size={20} />
                            </View>
                            <View style={styles.detail1}>
                                <Text style={{ opacity: 0.5, fontSize: 10, paddingLeft: 5, paddingTop: 5 }}>Tác giả</Text>
                                <Text style={{ fontSize: 12, paddingLeft: 5 }}>{book.tacGia}</Text>
                            </View>
                        </View>

                        <View style={styles.descriptionDetailFrame}>
                            <View style={styles.icon1}>
                                <Icon name="user" size={20} />
                            </View>
                            <View style={styles.detail1}>
                                <Text style={{ opacity: 0.5, fontSize: 10, paddingLeft: 5, paddingTop: 5 }}>Chuyên ngành</Text>
                                <Text style={{ fontSize: 12, paddingLeft: 5 }}>{chuyenNganh && chuyenNganh[0].tenChuyenNganh}</Text>
                            </View>
                        </View>

                        <View style={styles.descriptionDetailFrame}>
                            <View style={styles.icon1}>
                                <Icon name="print" size={20} />
                            </View>
                            <View style={styles.detail1}>
                                <Text style={{ opacity: 0.5, fontSize: 10, paddingLeft: 5, paddingTop: 5 }}>Nhà xuất bản</Text>
                                <Text style={{ fontSize: 12, paddingLeft: 5 }}>{book.nhaXuatBan}</Text>
                            </View>
                        </View>

                        <View style={styles.descriptionDetailFrame}>
                            <View style={styles.icon1}>
                                <Icon name="pagelines" size={20} />
                            </View>
                            <View style={styles.detail1}>
                                <Text style={{ opacity: 0.5, fontSize: 10, paddingLeft: 5, paddingTop: 5 }}>Số trang</Text>
                                <Text style={{ fontSize: 12, paddingLeft: 5 }}>{book.soTrang}</Text>
                            </View>
                        </View>

                    </View>
                </View>
                <Text style={{ fontSize: 12, fontWeight: 'bold', paddingLeft: 20, opacity: 0.5, paddingTop: 13 }}>Tên sách</Text>
                <Text style={{ fontSize: 25, fontWeight: 'bold', paddingLeft: 20 }}>{book.tenDauSach}</Text>
            </View>
            <View style={styles.lowerPart}>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ flex: 1, fontSize: 20, fontWeight: 'bold', marginTop: 15, paddingLeft: 20 }}>Danh sách sách</Text>
                    <Pressable style={{ flex: 1, justifyContent: "flex-end", alignItems: "flex-end", paddingRight: 10}} onPress={() => createNewBook()}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 15, paddingLeft: 20 }}>+ Thêm sách</Text>
                    </Pressable>
                </View>
                <ScrollView style={{ flexDirection: 'column', borderWidth: 1 }}>
                    {
                        listBook &&
                        listBook.map((book) =>
                            <Pressable style={styles.book}>
                                <View style={{ marginLeft: 10, marginTop: 10, gap: 10, justifyContent: "center" }}>
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
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    upperPart: {
        flex: 4.5,
        backgroundColor: '#fff2cc',
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    lowerPart: {
        flex: 5.5,
        backgroundColor: 'white',

    },

    bookDescription: {
        flexDirection: 'row',
        height: "70%",
        width: 375,
        marginLeft: 16,
        marginTop: 20,

    },
    imagePart: {
        flex: 4,
        justifyContent: 'flex-end',
    },
    descriptionPart: {
        flex: 6,
        flexDirection: 'column',
        paddingLeft: 12,
        paddingTop: 7,
        alignItems: 'flex-start',
        justifyContent: 'flex-end'
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

    icon1: {
        flex: 1,
        paddingLeft: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    detail1: {
        flex: 6,
        justifyContent: 'center',
    },

    img: {
        height: "90%",
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
        marginTop: 10,
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
        fontSize: 15,
        fontWeight: "bold",
    },
    descriptionDetailFrame: {
        flexDirection: 'row',
        height: 55,
        width: 220,
        alignItems: 'center',
        marginBottom: 3,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: "white",

    },
    icon: {
        flex: 1,
    },
})