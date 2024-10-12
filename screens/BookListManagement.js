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
            <View style ={styles.description}>
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
                            <Icon name="book" size={20} />
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
                    <View style = {styles.titleDescription}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold', paddingLeft: 20, opacity: 0.5, paddingTop: 13 }}>Tên sách</Text>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', paddingLeft: 20 }}>{book.tenDauSach}</Text>
                    </View>
                </View>
                
                <View style ={styles.booklist}>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ flex: 1, fontSize: 24, fontWeight: 'bold', marginTop: 15, paddingLeft: 15 }}>Danh sách sách</Text>
                    <Pressable style={{ flex: 1, justifyContent: "flex-end", alignItems: "flex-end", paddingRight: 10}} onPress={() => createNewBook()}>
                        <Text style={{ fontSize: 13, marginTop: 15 }}>Thêm sách</Text>
                    </Pressable>
                </View>
                <ScrollView style={styles.bookScrollView}>
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
        justifyContent : 'center',
        alignItems :'center',
        backgroundColor: '#fff2cc',
        padding :10
    },
    booklist :{
        width : 390,
        height : "60%",
        backgroundColor :'white',
        marginTop: 10,
        borderRadius :25,
        elevation : 5,
    },
    bookScrollView :{
        flexDirection: 'column',
        marginTop : 14 ,
        padding :10,
    },
    description : {
        width : 390,
        height : "30%",
        flexDirection :'column',
        backgroundColor :'white',
        marginTop: 15,
        borderRadius :25,
        elevation : 5,
        marginBottom :7

    },

    bookDescription: {
        flexDirection: 'row',
        flex : 7,
        marginLeft: 10,
        marginTop: 20,
        justifyContent: 'center',
        alignItems :'center',
    },
    titleDescription : {
        flex : 3
    },
    imagePart: {
        flex: 3.5,
    },
    descriptionPart: {
        flex: 6.5,
        flexDirection: 'column',
        paddingTop: 5,
        alignItems: 'center',
        justifyContent: 'center',

    },
    descriptionDetailFrame: {
        flexDirection: 'row',
        height: 45,
        width: 210,
        alignItems: 'center',
        marginBottom: 3,
        borderRadius: 10,


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
        height: "100%",
        width: undefined,
        backgroundColor: "white",
        borderRadius: 15,
        elevation :5
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
        alignItems :'center',
        width: "100%",
        height: 70,
        padding: 5,
        backgroundColor :'white',
        marginBottom : 10,
        flexDirection: "row",
        elevation :5,
        borderRadius :20,
        borderColor :'black'
    },

    myText: {
        fontSize: 15,
        fontWeight: "bold",
    },
    
    icon: {
        flex: 1,
    },
})