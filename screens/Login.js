import { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View, ImageBackground, Platform } from 'react-native';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { API_URL } from '@env';
import { useQuery, useRealm } from '@realm/react';
import LoginInfo from '../realmSchemas/LoginInfo';
import { CheckBox } from '@rneui/base';

export default function App({ navigation }) {
    const [showMessage, setShowMessage] = useState(false);
    const [userName, setUserName] = useState("");
    const [pass, setPass] = useState("");
    const realm = useRealm();
    const loginInfos = useQuery(LoginInfo);
    const [remember, setRemember] = useState(false);

    useEffect(() => {
        tryLogin();
    }, []);

    async function tryLogin() {
        if (loginInfos.length == 0) {
            return;
        }
        let today = new Date();
        if (loginInfos[0].expireDate < today) {
            realm.write(() => {
                realm.delete(loginInfos);
            });
            return;
        }
        let data = await fetch(API_URL + '/loginHash', {
            method: 'post',
            body: JSON.stringify({
                taiKhoan: loginInfos[0].username,
                matKhau: loginInfos[0].password
            }),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });
        if (data.ok) {
            global.user = await data.json();
            if (global.user.message == 'Dang nhap thanh cong') {
                realm.write(() => {
                    today.setDate(today.getDate() + 3);
                    loginInfos[0].expireDate = today;
                });
                if (global.user.vaiTro == "Thu thu") {
                    navigation.replace("ProfileLibrarian");
                }
                else if (global.user.vaiTro == "Doc gia") {
                    navigation.replace("Home");
                }
            }
            else {
                realm.write(() => {
                    realm.delete(loginInfos);
                });
            }
        }
    }

    async function login() {
        let dats = await fetch(API_URL + "/login", {
            method: "post",
            body: JSON.stringify({
                taiKhoan: userName,
                matKhau: pass
            }),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });
        if (dats.ok) {
            global.user = await dats.json();
            if (global.user.message == 'Dang nhap that bai') {
                setShowMessage(true);
                return;
            }
            let date = new Date();
            date.setDate(date.getDate() + 3);
            realm.write(() => {
                realm.delete(loginInfos);
            });
            if (global.user.vaiTro == "Thu thu") {
                if (remember) {
                    realm.write(() => {
                        realm.create('LoginInfo', {
                            username: global.user.maThuThu,
                            password: global.user.matKhau,
                            expireDate: date
                        });
                    });
                }
                navigation.replace("ProfileLibrarian");
            }
            else if (global.user.vaiTro == "Doc gia") {
                if (remember) {
                    realm.write(() => {
                        realm.create('LoginInfo', {
                            username: global.user.maDocGia,
                            password: global.user.matKhau,
                            expireDate: date
                        });
                    });
                }
                navigation.replace("Home");
            }
        }
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
            <ImageBackground
                source={require('../assets/img/Screenshot (18).png')} // Đường dẫn tới hình ảnh của bạn
                style={styles.container}>
                <Text style={{ paddingLeft: 20, fontSize: 60, fontWeight: 'bold', color: 'black' }}>My Library</Text>
                <Text style={{ paddingLeft: 20, fontSize: 15, opacity: 0.5, paddingTop: 5, paddingBottom: 20 }}>Đăng nhập để tiếp tục sử dụng My Library</Text>
                <View style={styles.inputBoxID}>
                    <View style={styles.icon}>
                        <FontAwesomeIcon icon={faUser} size={23} style={{ paddingLeft: 15 }}></FontAwesomeIcon>
                    </View>
                    <View style={styles.id}>
                        <Text style={{ fontSize: 12, opacity: 0.5, fontWeight: 'bold' }}>Tên đăng nhập</Text>
                        <TextInput style={styles.input} placeholder='ID' placeholderTextColor="#c5c5c5" clearTextOnFocus={true} value={userName} onChangeText={text => setUserName(text)}></TextInput>
                    </View>
                </View>
                <View style={styles.inputBoxPassword}>
                    <View style={styles.icon}>
                        <FontAwesomeIcon icon={faEye} size={23} style={{ paddingLeft: 15 }} />
                    </View>
                    <View style={styles.id}>
                        <Text style={{ fontSize: 12, opacity: 0.5, fontWeight: 'bold' }}>Mật khẩu</Text>
                        <TextInput style={styles.input} placeholder='Password' placeholderTextColor="#c5c5c5" clearTextOnFocus={true} value={pass} secureTextEntry onChangeText={text => setPass(text)}></TextInput>
                    </View>
                </View>
                <View style={{}}>
                    <View style={{ paddingLeft: 3, justifyContent: 'center', marginTop: -2 }}>
                        <CheckBox checked={remember} onPress={() => setRemember(!remember)} title='Duy trì đăng nhập' containerStyle={{ backgroundColor: 'transparent' }}
                            titleProps={{ style: { marginLeft: 2, fontSize: 14 } }} />
                    </View>
                    <View style={{ marginTop: 60 }}>
                        <View style={{ height: 20, width: 320 }}>
                            {
                                showMessage ?
                                    <View>
                                        <Text style={{ color: 'black', marginLeft: 23, fontSize: 15 }}>Tài khoản hoặc mật khẩu không đúng</Text>
                                    </View> :
                                    <View></View>
                            }
                        </View>
                        <Pressable style={styles.button} onPress={() => login()}>
                            <Text style={{ fontWeight: "bold", fontSize: 30 }}>Đăng nhập</Text>
                        </Pressable>
                    </View>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffbd59',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    loginBox: {
        width: 370,
        height: 60,
        marginTop: 20,
        borderRadius: 15,
        backgroundColor: "#FCDE70",
    },
    box: {
        width: 200,
        height: 250,
        backgroundColor: "#fff",
        borderRadius: 10,
        alignItems: "center",
        padding: 15
    },
    myText: {
        fontWeight: 'bold',
        fontSize: 25
    },
    inputBoxID: {
        marginTop: 25,
        paddingLeft: 10,
        flexDirection: 'row',
        width: 370,
        height: 65,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 15,
        backgroundColor: 'white',
        marginLeft: 20,
        alignItems: 'center',
        elevation: 7,
    },
    inputBoxPassword: {
        marginTop: 12,
        paddingLeft: 10,
        flexDirection: 'row',
        width: 370,
        height: 65,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 15,
        backgroundColor: 'white',
        marginLeft: 20,
        alignItems: 'center',
        elevation: 7,
    },
    icon: {
        flex: 1,
        paddingTop: 1
    },
    id: {
        flex: 10,

    },
    input: {
        fontSize: 18,

    },
    button: {
        width: 370,
        height: 80,
        marginTop: 10,
        borderRadius: 20,
        backgroundColor: "#FCDE70",
        alignItems: "center",
        justifyContent: 'center',
        marginLeft: 20,
        elevation: 4
    },
});
