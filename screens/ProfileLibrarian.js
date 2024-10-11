import { Pressable, Image, StyleSheet, Text, View } from 'react-native';
import { useRealm, useQuery } from '@realm/react';
import LoginInfo from '../realmSchemas/LoginInfo';
import { CommonActions } from '@react-navigation/native';

export default function App({ navigation }) {
    const realm = useRealm();
    const loginInfos = useQuery(LoginInfo);

    function logout() {
        realm.write(() => {
            realm.delete(loginInfos);
            navigation.dispatch(CommonActions.reset({
                index: 0,
                routes: [{
                    name: 'Login'
                }]
            }));
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <View style={{ flex: 3, flexDirection: "row", gap: 15 }}>
                    <Image style={styles.img} source={require("../assets/img/Blank_profile.webp")} />
                    <View style={styles.topLeftBox}>
                        <View style={{ flex: 3, justifyContent: "center" }}>
                            <Text style={styles.userName}>SuperIdol2024</Text>
                        </View>
                        <Pressable style={styles.button}>
                            <Text style={styles.btnText}>Chỉnh sửa</Text>
                        </Pressable>
                    </View>
                </View>
                <View style={styles.bottomBox}>
                    <View style={styles.bottomLeft}>
                        <Text style={styles.bottomLeftText}>John Does</Text>
                        <Text style={styles.bottomLeftText}>ID: 1</Text>
                    </View>

                    <View style={styles.bottomRight}>
                        <Text style={styles.bottomRightText}>Librarian</Text>
                    </View>
                </View>
            </View>

            <View style={styles.recentBox}>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>Management</Text>

                <View style={styles.manageBox}>
                    <Pressable style={styles.functions} onPress={() => navigation.navigate("BookManagement")}>
                        <Text style={{ fontSize: 12, fontWeight: "bold" }}>Quản Lý Sách</Text>
                    </Pressable>
                    <Pressable style={styles.functions} onPress={() => navigation.navigate("BorrowingCardManagement")}>
                        <Text style={{ fontSize: 12, fontWeight: "bold" }}>Quản Lý phiếu mượn</Text>
                    </Pressable>
                </View>
            </View>
            <View>
                <Pressable onPress={() => logout()}>
                    <Text>Đăng xuất</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 50
    },

    box: {
        width: 320,
        height: 300,
        backgroundColor: "#fff",
        borderRadius: 15,
        borderWidth: 1,
        alignItems: "center",
        padding: 15,
        flexDirection: "column"
    },

    topLeftBox: {
        flex: 5,
        flexDirection: "column",
        alignItems: "center",
        paddingVertical: 10
    },

    bottomBox: {
        flex: 2,
        flexDirection: "row",
        borderRadius: 10,
        width: "100%",
        marginTop: 10,
        padding: 10,
        backgroundColor: "#d9d9d9"
    },

    bottomLeft: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        gap: 5
    },

    bottomLeftText: {
        fontSize: 18
    },

    bottomRight: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },

    bottomRightText: {
        fontWeight: "bold",
        fontSize: 25
    },

    recentBox: {
        height: 200,
        width: 320,
        marginTop: 30,
        padding: 10
    },

    userName: {
        fontSize: 18
    },

    img: {
        flex: 3,
        height: undefined,
        borderRadius: 20
    },

    button: {
        flex: 1,
        backgroundColor: "#ff914d",
        borderRadius: 15,
        width: 150,
        alignItems: "center",
        justifyContent: "center"
    },

    btnText: {
        fontSize: 15,
    },

    manageBox: {
        flexDirection: "row",
        height: "80%",
        gap: 9,
        marginTop: 7
    },

    functions: {
        flex: 1,
        height: "50%",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ff914d"
    }
});
