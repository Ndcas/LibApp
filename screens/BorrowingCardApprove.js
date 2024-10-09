import { useState, useEffect } from 'react';
import { Pressable, Image, StyleSheet, Text, View } from 'react-native';
import { useRoute } from "@react-navigation/native";
import { API_URL } from '@env';

export default function App({ navigation }) {

    const route = useRoute();

    const [docGia, setDocGia] = useState({});

    async function getBorrowingCardDetails(){
        console.log(route.params?.borrowingCard);
        
        const data = await fetch(API_URL + `/docGia/get?_id=${route.params?.borrowingCard.docGia}`);
        if(data.ok){
            let docGiatemp = await data.json();
            setDocGia(docGiatemp);
            
        }
    }

    useEffect(() => {
        getBorrowingCardDetails();
    }, []);

    async function traSach(){
        let data = await fetch(API_URL + `/theMuon/traSach?id=${route.params?.borrowingCard._id}`);
        if(data.ok){
            console.log(data);
        }
    }


    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: "bold", fontSize: 18, textAlign: "left", paddingLeft: 35 }}>Thông tin người mượn</Text>
            <View style={styles.box}>
                <View style={styles.leftBox}>
                    <Text style={styles.leftBoxText}>Mã độc giả</Text>
                    <Text style={styles.leftBoxText}>Họ và tên</Text>
                    <Text style={styles.leftBoxText}>Giới tính</Text>
                </View>
                <View style={styles.rightBox}>
                    {/* <Text style={styles.rightBoxText}>{docGia[0].maDocGia}</Text>
                    <Text style={styles.rightBoxText}>{docGia[0].hoTen}</Text>
                    <Text style={styles.rightBoxText}>{docGia[0].gioiTinh}</Text> */}
                </View>
            </View>

            <Text style={{ fontWeight: "bold", fontSize: 18, textAlign: "left", paddingLeft: 35, marginTop: 10 }}>Sách muọn</Text>
            <View style={styles.borrowedBox}>
                <Image style={styles.img} source={require("../assets/img/Blank_img.png")} />
                <Image style={styles.img} source={require("../assets/img/Blank_img.png")} />
                <Image style={styles.img} source={require("../assets/img/Blank_img.png")} />
            </View>

            <View style={styles.timeBox}>
                <View style={styles.leftBox}>
                    <Text style={styles.leftBoxText}>Thời gian mượn</Text>
                    <Text style={styles.leftBoxText}>Thời gian trả</Text>
                </View>
                <View style={styles.rightBox}>
                    <Text style={styles.rightBoxText}>17:00pm 24/10/2024</Text>
                    <Text style={styles.rightBoxText}>17:00pm 25/10/2024</Text>
                </View>
            </View>

            <Pressable style={styles.button} onPress={() => traSach()}>
                <Text style={styles.btnText}>Trả sách</Text>
            </Pressable>
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
        flex: 3,
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
        flexDirection: "row"
    },

    button: {
        backgroundColor: "#ff914d",
        borderRadius: 50,
        width: "70%",
        height: 70,
        alignItems: "center",
        alignSelf: "center",
        marginTop: 30,
        justifyContent: "center"
    },

    btnText: {
        fontSize: 25,
        fontWeight: "bold"
    },
});
