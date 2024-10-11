import { Pressable, Image, StyleSheet, Text, View, ScrollView } from 'react-native';
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
        let chiTiet = await fetch(API_URL + `/chiTietTheMuon/getByTheMuon?id=${theMuon._id}`);
        chiTiet = (await chiTiet.json());
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
        <View style={styles.container}>
            <Text style={{ fontWeight: "bold", fontSize: 18, textAlign: "left", paddingLeft: 35, marginTop: 10 }}>Thông tin người mượn</Text>
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

            <Text style={{ fontWeight: "bold", fontSize: 18, textAlign: "left", paddingLeft: 35, marginTop: 10 }}>Sách mượn</Text>
            <View style={styles.borrowedBox}>
                {
                    sachMuon.map((sach, index) =>
                        <Image key={index} style={styles.img} source={{ uri: 'data:image/' + sach.hinhAnh.format + ';base64,' + sach.hinhAnh.dataUrl }} />
                    )
                }
            </View>

            <View style={styles.timeBox}>
                <View style={styles.leftBox}>
                    <Text style={styles.leftBoxText}>Trạng thái</Text>
                    <Text style={styles.leftBoxText}>Thời gian mượn</Text>
                </View>
                <View style={styles.rightBox}>
                    <Text style={styles.rightBoxText}>{theMuon.tinhTrang}</Text>
                    <Text style={styles.rightBoxText}>{formatDate(theMuon.ngayMuon)}</Text>
                </View>
            </View>

            <View style={styles.buttonBox}>
                <Pressable style={styles.btnBorrow} onPress={() => traSach()}>
                    <Text style={styles.btnText}>Trả sách</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50
    },

    box: {
        width: "80%",
        height: 150,
        backgroundColor: "#fff",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#b5b5b5",
        alignItems: "center",
        alignSelf: "center",
        padding: 10,
        marginTop: 10,
        flexDirection: "row"
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
    },

    rightBoxText: {
        flex: 1,
        textAlign: "right",
        textAlignVertical: "center",
    },

    borrowedBox: {
        width: "80%",
        height: 180,
        marginTop: 10,
        padding: 10,
        borderWidth: 1,
        alignSelf: "center",
        flexDirection: "row",
        gap: 10,
    },

    img: {
        flex: 1,
        height: undefined,
        width: "30%",
        borderRadius: 5
    },

    timeBox: {
        width: "80%",
        height: 100,
        backgroundColor: "#fff",
        alignItems: "center",
        alignSelf: "center",
        padding: 10,
        marginTop: 20,
        flexDirection: "row",
    },

    buttonBox: {
        flexDirection: "row",
        width: "80%",
        marginTop: 30,
        alignSelf: "center",
        gap: 10,
    },

    btnBorrow: {
        flex: 2,
        backgroundColor: "#ff914d",
        borderRadius: 50,
        height: 70,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center"
    },

    btnCancel: {
        flex: 1,
        backgroundColor: "#ff914d",
        borderRadius: 50,
        height: 70,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center"
    },

    btnText: {
        fontSize: 25,
        fontWeight: "bold"
    },
});
