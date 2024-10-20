import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { useRoute } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function App({ navigation }) {
    const book = useRoute().params.book;

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/img/Screenshot (32).png')} // Đường dẫn tới hình ảnh của bạn
                style={styles.bookView}>
                <Image style={styles.img} source={{ uri: 'data:image/' + book.hinhAnh.format + ';base64,' + book.hinhAnh.dataUrl }} />
            </ImageBackground>
            <View style={styles.discriptionView}>
                <Text style={styles.title}>Tên sách</Text>
                <Text style={{ paddingLeft: 30, fontSize: 30, fontWeight: 'bold' }}>{book.tenDauSach}</Text>
                <View style={{
                    flexDirection: 'row',
                    height: 70,
                    width: 390,
                    alignItems: 'center',
                    marginBottom: 10,
                    elevation: 5,
                    borderRadius: 20,
                    backgroundColor: "white",
                    marginLeft: 10,
                    marginTop: 50
                }}>
                    <View style={styles.icon}>
                        <Icon name="user" size={30} style={{ paddingLeft: 10 }} />
                    </View>
                    <View style={styles.detail}>
                        <Text style={{ opacity: 0.5 }}>Tác giả</Text>
                        <Text style={styles.detailDescription}>{book.tacGia}</Text>
                    </View>
                </View>
                <View style={styles.descriptionFrame}>
                    <View style={styles.icon}>
                        <Icon name="book" size={30} style={{ paddingLeft: 10 }} />
                    </View>
                    <View style={styles.detail}>
                        <Text style={{ opacity: 0.5 }}>Chuyên ngành</Text>
                        <Text style={styles.detailDescription}>{book.chuyenNganh.tenChuyenNganh}</Text>
                    </View>
                </View>
                <View style={styles.descriptionFrame}>
                    <View style={styles.icon}>
                        <Icon name="print" size={30} style={{ paddingLeft: 10 }} />
                    </View>
                    <View style={styles.detail}>
                        <Text style={{ opacity: 0.5 }}>Nhà xuất bản</Text>
                        <Text style={styles.detailDescription}>{book.nhaXuatBan}</Text>
                    </View>
                </View>
                <View style={styles.descriptionFrame}>
                    <View style={styles.icon}>
                        <Icon name="pagelines" size={30} style={{ paddingLeft: 10 }} />
                    </View>
                    <View style={styles.detail}>
                        <Text style={{ opacity: 0.5 }}>Số trang</Text>
                        <Text style={styles.detailDescription}>{book.soTrang}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.bottomView}></View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    icon: {
        flex: 1,
    },
    detail: {
        flex: 6,
    },
    detailDescription: {
        fontSize: 15,
        fontWeight: 'bold',

    },
    bookView: {
        flex: 3,
        backgroundColor: '#fff2cc',
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: 'row',
        overflow: 'visible',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    discriptionView: {
        flex: 7,
    },
    bottomView: {
        flex: 0,
        backgroundColor: "#fff2cc",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        elevation: 5
    },


    headBox: {
        padding: 10,
        marginTop: 15,
        borderRadius: 15,
        backgroundColor: "#fff",
        elevation: 5,
        borderWidth: 1,

    },
    descriptionFrame: {
        flexDirection: 'row',
        height: 70,
        width: 390,
        alignItems: 'center',
        marginBottom: 10,
        elevation: 5,
        borderRadius: 20,
        backgroundColor: "white",
        marginLeft: 10,

    },

    img: {
        width: '45%',
        height: '95%',
        marginLeft: 40,
        borderRadius: 20,
        position: 'absolute',
        top: 55,
        left: -20,
        elevation: 10





    },

    title: {
        fontSize: 13,
        paddingLeft: 30,
        paddingTop: 50,
        paddingRight: 25,
        opacity: 0.5,
    },

    author: {
        fontSize: 20,
    },

    mota: {
        fontWeight: 'bold',
        fontSize: 20,
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