import { Pressable, Image, StyleSheet, Text, View, ScrollView,ImageBackground } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { API_URL } from '@env';

export default function App({ navigation }) {
    const theMuon = useRoute().params.borrowingCard;
    const [docGia, setDocGia] = useState({});
    const [sachMuon, setSachMuon] = useState([]);

    useEffect(() => {
        getInfo();
    }, []);

    async function getInfo() {
        let docGia = await fetch(API_URL + `/docGia/get?_id=${theMuon.docGia}`);
        let sachs = await fetch(API_URL + `/dauSach/getByTheMuon?id=${theMuon._id}`);
        setDocGia((await docGia.json())[0]);
        setSachMuon(await sachs.json());
    }

    function formatDate(dateStr) {
        let date = new Date(dateStr);
        let hh = String(date.getHours()).padStart(2, '0');
        let MM = String(date.getMinutes()).padStart(2, '0');
        let ss = String(date.getSeconds()).padStart(2, '0');
        let dd = String(date.getDate()).padStart(2, '0');
        let mm = String(date.getMonth() + 1).padStart(2, '0');
        let yyyy = date.getFullYear();
        return `${hh}:${MM}:${ss} ${dd}/${mm}/${yyyy}`;
    }

    async function traSach() {
        let result = await fetch(API_URL + `/theMuon/traSach?id=${theMuon._id}`);
        result = await result.json();
        if (result.message == 'Tra sach thanh cong') {
            routes = navigation.getState().routes.slice(0, -2);
            routes = [...routes, {
                name: 'BorrowingCardManagement'
            }];
            navigation.reset({
                index: routes.length - 1,
                routes: routes
            });
        }
    }

    return (
        <ImageBackground
                source={require('../assets/img/Screenshot (32).png')} // Đường dẫn tới hình ảnh của bạn
                style={styles.container}>
            <View style ={{borderRadius :20,backgroundColor :'white',elevation :3,padding :8,justifyContent:'center'}}>
            <Text style={{ fontWeight: "bold", fontSize: 25, textAlign: "left", paddingLeft: 5, marginTop: 25 }}>Thông tin người mượn</Text>
            <View style={styles.box}>
                <View style={styles.leftBox}>
                    <Text style={styles.leftBoxText}>Họ và tên</Text>
                    <Text style={styles.leftBoxText}>Mã độc giả</Text>
                </View>
                <View style={styles.rightBox}>
                    <Text style={styles.rightBoxText}>{docGia.hoTen}</Text>
                    <Text style={styles.rightBoxText}>{docGia.maDocGia}</Text>
                </View>
            </View>

            <Text style={{ fontWeight: "bold", fontSize: 25, textAlign: "left", paddingLeft: 5, marginTop: 25 }}>Sách mượn</Text>
            <View style={styles.borrowedBox}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    {
                        sachMuon.map((sach, index) =>
                            <Image key={index} style={styles.img} source={{ uri: 'data:image/' + sach.hinhAnh.format + ';base64,' + sach.hinhAnh.dataUrl }} />
                        )
                    }
                </ScrollView>
            </View>
            <Text style={{ fontWeight: "bold", fontSize: 25, textAlign: "left", paddingLeft: 5, marginTop: 25 }}>Chi tiết mượn</Text>
            <View style={styles.timeBox}>
                <View style={styles.leftBox}>
                    <Text style={styles.leftBoxText}>Trạng thái</Text>
                    <Text style={styles.leftBoxText}>Thời gian mượn</Text>
                </View>
                <View style={styles.rightBox}>
                    <Text style={styles.rightBoxTextTinhTrang}>{theMuon.tinhTrang}</Text>
                    <Text style={styles.rightBoxText}>{formatDate(theMuon.ngayMuon)}</Text>
                </View>
            </View>
            {
                theMuon.tinhTrang == "Chua tra" &&
                <Pressable style={styles.btnBorrow} onPress={() => traSach()}>
                    <Text style={styles.btnText}>Trả sách</Text>
                </Pressable>
            }
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center'

    },
    panel: {
        height: "76%",
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 15,
        marginTop: 50,
        elevation: 5
    },

    box: {
        width: "90%",
        height: 100,
        backgroundColor: "#fff",
        borderRadius: 7,
        alignItems: "center",
        alignSelf: "center",
        padding: 10,
        marginTop: 10,
        flexDirection: "row",
        elevation: 5,
        borderBottomWidth: 0.3
    },

    leftBox: {
        flex: 1,
        flexDirection: "column",
    },

    rightBox: {
        flex: 1.2,
        flexDirection: "column",
    },

    leftBoxText: {
        flex: 1,
        fontWeight: "bold",
        textAlignVertical: "center",
        fontSize: 17,


    },

    rightBoxText: {
        flex: 1,
        textAlign: "right",
        textAlignVertical: "center",
        fontSize: 17,
    },
    rightBoxTextTinhTrang: {
        flex: 1,
        textAlign: "right",
        textAlignVertical: "center",
        fontSize: 17,
        color: '#007bff'
    },

    borrowedBox: {
        width: "90%",
        height: 150,
        marginTop: 10,
        alignSelf: "center",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        backgroundColor: 'white',
        borderBottomWidth :0.3,
        elevation: 3,
        borderRadius: 7,


    },

    img: {
        height: 140,
        width: 100,
        borderRadius: 10,
        marginRight: 5
    },

    timeBox: {
        width: "90%",
        height: 100,
        backgroundColor: "white",
        alignItems: "center",
        alignSelf: "center",
        marginTop: 15,
        marginBottom: 15,
        padding: 8,
        flexDirection: "row",
        borderRadius: 7,
        elevation: 3,
        borderBottomWidth :0.3,
        marginBottom: 30

    },

    buttonBox: {
        flexDirection: "row",
        width: "80%",
        marginTop: 30,
        alignSelf: "center",
        gap: 10,
    },

    btnBorrow: {
        backgroundColor: "#fff2cc",
        borderRadius: 20,
        height: 80,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        width: 350
    },

    btnCancel: {
        flex: 1,
        backgroundColor: "#ff914d",
        borderRadius: 50,
        height: 20,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center"
    },

    btnText: {
        fontSize: 25,
        fontWeight: "bold"
    },
});