import React, { useState, useEffect } from 'react';
import { Alert, Button, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View, Image,Platform, ScrollView ,Keyboard,TouchableWithoutFeedback} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass, width } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';


export default function App({ navigation }) {

    const [txtSearch, setTxtSearch] = useState("");
    const [listBook, setListBook] = useState([]);

    async function getBook() {
        let data = await fetch("http://192.168.1.8:8080/dauSach/get")
        // let data = await fetch("http://192.168.1.9:8080/dauSach/get")
        if (data.ok) {
            let books = await data.json();
            for (let i = 0; i < books.length; i++) {
                let img = await fetch(`http://192.168.1.8:8080/hinhAnh/getById?id=${books[i].hinhAnh}`);
                // let img = await fetch(`http://192.168.1.9:8080/hinhAnh/getById?id=${books[i].hinhAnh}`);
                
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
    }, []); //Chỗ này thêm dấu ngoặc vuông để code đừng lặp vô hạn

    async function searchBook() {
        if (txtSearch == "") {
            getBook();
        }
        else {
            let data = await fetch(`http://192.168.1.9:8080/dauSach/get?tenDauSach=${txtSearch}`)
            if (data.ok) {
                let books = await data.json();
                for (let i = 0; i < books.length; i++) {
                    let img = await fetch(`http://192.168.1.9:8080/hinhAnh/getById?id=${books[i].hinhAnh}`);

                    if (img.ok) {
                        img = await img.json();
                        books[i].hinhAnh = "data:image/" + img.format + ";base64," + img.dataUrl;
                    }
                }
                setListBook(books);
            }
        }

    }


    return (
        <View style ={styles.container}>
            <Pressable style={styles.profileBtn} onPress={() => navigation.navigate("ProfileMember")}>
                        <FontAwesomeIcon icon={faUser} style={styles.user} size={25} />
                    </Pressable>
                <Text style = {{fontSize :35,fontWeight :'bold',marginLeft :15,marginTop :10}}>Khám phá</Text>
                <Text style = {{fontSize :14,opacity :0.3,marginLeft :15,fontStyle :'italic',marginRight :15}}>"Những người khôn ngoan tìm được sự an ủi khỏi những rắc rối của cuộc đời chính từ sách" - Victor Hugo</Text>
                <View style={styles.search}>
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{marginLeft :1,marginRight :10}} />
                <TextInput style={{ flex: 1 }} placeholder='Tìm kiếm' placeholderTextColor="#000000" clearTextOnFocus={true} value={txtSearch} onChangeText={text => setTxtSearch(text)} />
                </View>
                <Text style={styles.category}>
                Tất cả sách
            </Text>

            <View style={styles.bookList}>
                {
                    listBook.map((book) =>
                        <Pressable style={styles.book} onPress={() => navigation.navigate("BookDetail", {book: book})}>
                            <Image style={{height: 100, width: 50}} source={{uri: book.hinhAnh}}/>
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
        backgroundColor: '#ffe699',
        alignItems :'flex-start',
        justifyContent : 'flex-start',
    },
    description : {
        flex : 3,
        backgroundColor : "#ffe699",
    },


    detail : {
        flex : 7,
        borderTopLeftRadius : 30,
        borderTopRightRadius : 30,
        overflow: 'hidden',   
        marginTop : -20,
        backgroundColor : "white",
      
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 10,
        marginTop: 20
    },

    search: {
        flexDirection:'row',
        width: 370,
        height: 45,
        marginTop: 25,
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 10,
        paddingLeft: 15,
        fontSize: 17,
        marginLeft :15,
        alignItems :'center',
        justifyContent :'center',
        backgroundColor :"white"


    },
    searchAndUSer : {
        flex : 2,
        justifyContent : 'flex-end',
        flexDirection : 'row',
        alignItems :'flex-end'
    },
    discover : {
        flex : 4,
        alignItems : "flex-start",
        justifyContent : 'center',
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
        borderRadius: 25,
        marginTop :90,
        marginLeft :15,
        alignItems :'center',
        justifyContent : 'center'
    },

    category: {
        fontWeight: "bold",
        fontSize: 18,
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginTop: 15
    },

    /******************************************************** */
    bookList: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginHorizontal: 20,
        marginTop: 10,
        justifyContent: "center",
    },

    book: {
        flex: 1,
        minWidth: 100,
        borderWidth: 1,
        alignItems: "center"
    },

    /****************flexwrap + minWidth = grid **************/

    img: {
        width: 100,
        height: 150,
        backgroundColor: "#ff914d"
    }
})