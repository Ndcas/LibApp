import { Image, StyleSheet, Text, View, ScrollView, ImageBackground } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { API_URL } from '@env';

export default function App({ navigation }) {
    const theMuon = useRoute().params.borrowingCard;
    const [docGia, setDocGia] = useState({});
    const [sachMuon, setSachMuon] = useState([]);
    const today = new Date();

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

    function tinhTrangColor() {
        if (theMuon.tinhTrang == 'Da tra') {
            return { color: 'green' }
        }
        if (theMuon.tinhTrang == 'Chua tra' && new Date(theMuon.hanTra) < today) {
            return { color: 'red' }
        }
        return { color: '#007bff' }
    }

    function getTinhTrang() {
        if (theMuon.tinhTrang == 'Da tra') {
            return 'Đã trả';
        }
        else if (theMuon.tinhTrang == 'Chua tra' && new Date(theMuon.hanTra) < today) {
            return 'Quá hạn';
        }
        return 'Chưa trả';
    }

    return (
        <ImageBackground
            source={require('../assets/img/Screenshot (32).png')} // Đường dẫn tới hình ảnh của bạn
            style={styles.container}>
            <View style={{ borderRadius: 10, backgroundColor: 'white', elevation: 3, padding: 8, justifyContent: 'center' }}>
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
                        {
                            theMuon.tinhTrang == 'Da tra' ?
                                <Text style={styles.leftBoxText}>Thời gian trả</Text> :
                                <Text style={styles.leftBoxText}>Hạn trả sách</Text>
                        }
                    </View>
                    <View style={styles.rightBox}>
                        <Text style={[styles.rightBoxTextTinhTrang, tinhTrangColor()]}>
                            {
                                getTinhTrang()
                            }
                        </Text>
                        <Text style={styles.rightBoxText}>{formatDate(theMuon.ngayMuon)}</Text>
                        {
                            theMuon.tinhTrang == 'Da tra' ?
                                <Text style={styles.rightBoxText}>{formatDate(theMuon.ngayTra)}</Text> :
                                <Text style={styles.rightBoxText}>{formatDate(theMuon.hanTra)}</Text>
                        }
                    </View>
                </View>
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
        elevation: 2,
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
        elevation: 2,
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
        elevation: 2,
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