import { Alert, Button, KeyboardAvoidingView, Pressable, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';


export default function App({ navigation }) {

    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: "bold", fontSize: 18, textAlign: "left", paddingLeft: 35, marginTop: 10 }}>Thông tin người mượn</Text>
            <View style={styles.box}>
                <View style={styles.leftBox}>
                    <Text style={styles.leftBoxText}>Họ và tên</Text>
                    <Text style={styles.leftBoxText}>Username</Text>
                    <Text style={styles.leftBoxText}>ID:</Text>
                </View>
                <View style={styles.rightBox}>
                    <Text style={styles.rightBoxText}>John Does</Text>
                    <Text style={styles.rightBoxText}>SuperIdol2024</Text>
                    <Text style={styles.rightBoxText}>1</Text>
                </View>
            </View>

            <Text style={{ fontWeight: "bold", fontSize: 18, textAlign: "left", paddingLeft: 35, marginTop: 10 }}>Sách mượn</Text>
            <View style={styles.borrowedBox}>
                <Image style={styles.img} source={require("../assets/img/Blank_img.png")} />
                <Image style={styles.img} source={require("../assets/img/Blank_img.png")} />
                <Image style={styles.img} source={require("../assets/img/Blank_img.png")} />
            </View>

            <View style={styles.timeBox}>
                <View style={styles.leftBox}>
                    <Text style={styles.leftBoxText}>Trạng thái</Text>
                    <Text style={styles.leftBoxText}>Thời gian mượn</Text>
                    <Text style={styles.leftBoxText}>Thời gian trả</Text>
                </View>
                <View style={styles.rightBox}>
                    <Text style={styles.rightBoxText}>Đăng ký</Text>
                    {/* <Text style={styles.rightBoxText}>Chờ duyệt</Text>
                    <Text style={styles.rightBoxText}>Đã duyệt</Text> */}
                    <Text style={styles.rightBoxText}>17:00pm 24/10/2024</Text>
                    <Text style={styles.rightBoxText}>17:00pm 25/10/2024</Text>
                </View>
            </View>

            <View style={styles.buttonBox}>
                <Pressable style={styles.btnBorrow}>
                    <Text style={styles.btnText}>Mượn</Text>
                </Pressable>
                <Pressable style={styles.btnCancel}>
                    <Text style={styles.btnText}>Hủy</Text>
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

    buttonBox:{
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
