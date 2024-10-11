import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useRoute } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function App({ navigation }) {
    const book = useRoute().params.book;

    return (

        <View style={styles.container}>
            <View style={styles.bookView}>
                <Image style={styles.img} source={{ uri: 'data:image/' + book.hinhAnh.format + ';base64,' + book.hinhAnh.dataUrl }} />
                <Text style={styles.title}>{book.tenDauSach}</Text>
            </View>
            <View style={styles.discriptionView}>
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
                    marginTop: 80
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
        flex: 4,
        backgroundColor: '#ffe699',
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: 'row',
        overflow: 'visible',
        borderRadius: 30,
        elevation: 5
    },
    discriptionView: {
        flex: 5.3,
    },
    bottomView: {
        flex: 0.7,
        backgroundColor: "#FFEEAD",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
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
        height: '90%',
        marginLeft: 40,
        borderRadius: 25,
        position: 'absolute',
        top: 65,
        left: -10,
        elevation: 10





    },

    title: {
        fontSize: 25,
        paddingBottom: 20,
        paddingLeft: 230,
        paddingTop: 120,
        fontWeight: 'bold',
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