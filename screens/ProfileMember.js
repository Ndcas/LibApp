import { useQuery, useRealm } from '@realm/react';
import { Pressable, Image, StyleSheet, Text, View } from 'react-native';
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
                        <Text style={styles.bottomRightText}>Member</Text>
                    </View>
                </View>
            </View>

            <View style={styles.recentBox}>
                <Pressable style={{flexDirection: "row", alignItems: "center"}} onPress={() => navigation.navigate("BorrowingCard")}>
                    <Text style={{ flex: 2, fontWeight: "bold", fontSize: 20 }}>Recently added</Text>
                    <Text style={{ flex: 1, fontWeight: "bold", fontSize: 30, textAlign: "right"}}>→</Text>
                </Pressable>

                <View style={styles.bookList}>
                    <Image style={styles.book} source={require("../assets/img/Blank_img.png")} />
                    <Image style={styles.book} source={require("../assets/img/Blank_img.png")} />
                    <Image style={styles.book} source={require("../assets/img/Blank_img.png")} />
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
        justifyContent :'center',
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

    bookList: {
        flexDirection: "row",
        height: "80%",
        gap: 9,
        marginTop: 7
    },

    book: {
        flex: 1,
        height: "100%",
        borderRadius: 5
    }
});
