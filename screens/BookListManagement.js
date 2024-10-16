import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, ScrollView, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { useRoute } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { API_URL } from '@env';


export default function App({ navigation }) {

    const book = useRoute().params.book;

    const [listBook, setListBook] = useState([]);
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
                                <Text style={styles.detailName}>Tác giả</Text>
                                <Text style={styles.detailText}>{book.tacGia}</Text>
                            </View>
                        </View>

                        <View style={styles.descriptionDetailFrame}>
                            <View style={styles.icon1}>
                            <Icon name="book" size={20} />
                            </View>
                            <View style={styles.detail1}>
                                <Text style={styles.detailName}>Chuyên ngành</Text>
                                <Text style={styles.detailText}>{chuyenNganh && chuyenNganh[0].tenChuyenNganh}</Text>
                            </View>
                        </View>

                        <View style={styles.descriptionDetailFrame}>
                            <View style={styles.icon1}>
                                <Icon name="print" size={20} />
                            </View>
                            <View style={styles.detail1}>
                                <Text style={styles.detailName}>Nhà xuất bản</Text>
                                <Text style={styles.detailText}>{book.nhaXuatBan}</Text>
                            </View>
                        </View>

                        <View style={styles.descriptionDetailFrame}>
                            <View style={styles.icon1}>
                                <Icon name="pagelines" size={20} />
                            </View>
                            <View style={styles.detail1}>
                                <Text style={styles.detailName}>Số trang</Text>
                                <Text style={styles.detailText}>{book.soTrang}</Text>
                            </View>
                        </View>

                    </View>
                    </View>
                    <View style = {styles.titleDescription}>
                    <Text style={styles.titleName}>Tên sách</Text>
                    <Text style={styles.titleText}>{book.tenDauSach}</Text>
                    </View>
                </View>
                
                <View style ={styles.booklist}>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ flex: 1, fontSize: 24, fontWeight: 'bold', marginTop: 15, paddingLeft: 15 }}>Danh sách sách</Text>
                    <Pressable style={{ flex: 1, justifyContent: "flex-end", alignItems: "flex-end", paddingRight: 10}} onPress={() => createNewBook()}>
                        <Text style={{ fontSize: 17, marginTop: 15,fontWeight :'bold',color :'#007bff' }}>Thêm sách</Text>
                    </Pressable>
                </View>
                <ScrollView style={styles.bookScrollView}>
                    {
                        listBook.map((book) =>
                            <Pressable style={styles.book}>
                                <View style={{ marginLeft: 10, marginTop: 10, gap: 5, justifyContent: "center" }}>
                                    <Text>
                                        <Text style={styles.myText}>ID:</Text>
                                        {"\t" + book._id}
                                    </Text>
                                    <Text>
                                        <Text style={styles.myText}>Tình trạng:</Text>
                                        <Text style ={{color :'#007bff',fontWeight :'bold'}}>{"\t" + book.tinhTrang}</Text>
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
        backgroundColor: 'white',
        paddingHorizontal : 15
    },
    booklist :{
        width : 390,
        height : "50%",
        backgroundColor :'#F4F6FF',
        marginTop: 10,
        borderRadius :15,
        elevation : 5,
    },
    bookScrollView :{
        flexDirection: 'column',
        marginTop : 14 ,
        padding :10,
    },
    description : {
        width : 375,
        height : "40%",
        flexDirection :'column',
        backgroundColor :'#F4F6FF',
        marginTop: 15,
        borderRadius :15,
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
        flex: 4,
    },
    descriptionPart: {
        flex: 6,
        flexDirection: 'column',
        paddingTop: 5,
        alignItems: 'center',
        justifyContent: 'center',

    },
    descriptionDetailFrame: {
        flexDirection: 'row',
        height: 50,
        width: 205,
        alignItems: 'center',
        marginBottom: 5,
        borderRadius: 10,
        elevation :2,
        backgroundColor :'#F4F6FF'


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
        width: "100%",
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
        height: 80,
        padding: 5,
        backgroundColor :'white',
        marginBottom : 13,
        flexDirection: "row",
        elevation :3,
        borderRadius :10
    },

    myText: {
        fontSize: 15,
        fontWeight: "bold",
    },
    
    icon: {
        flex: 1,
    },
    detailName : {
        opacity: 0.5, 
        fontSize: 10, 
        paddingLeft: 5, 
        paddingTop: 5 
    },
    detailText : {
        fontSize: 12, 
        paddingLeft: 5
    },
    titleName : {
        fontSize: 12, 
        fontWeight: 'bold', 
        paddingLeft: 20, 
        opacity: 0.5, 
        paddingTop: 13
    },
    titleText : {
        fontSize: 25, 
        fontWeight: 'bold', 
        paddingLeft: 20
    }
})