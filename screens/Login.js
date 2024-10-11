import { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View, ImageBackground, Platform } from 'react-native';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { API_URL } from '@env';
import { useQuery, useRealm } from '@realm/react';
import LoginInfo from '../realmSchemas/LoginInfo';

export default function App({ navigation }) {

    const [showMessage, setShowMessage] = useState(false);
    const [userName, setUserName] = useState("");
    const [pass, setPass] = useState("");
    const realm = useRealm();
    const loginInfos = useQuery(LoginInfo);

    useEffect(() => {
        tryLogin();
    }, []);

    async function tryLogin() {
        if (loginInfos.length > 0) {
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
                    if (global.user.vaiTro == "Thu thu") {
                        navigation.replace("ProfileLibrarian");
                    } 
                    else if (global.user.vaiTro == "Doc gia") {
                        navigation.replace("Home");
                    }
                }
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
            if (global.user.message == 'Dang nhap thanh cong') {
                if (global.user.vaiTro == "Thu thu") {
                    realm.write(() => {
                        realm.delete(loginInfos);
                        realm.create('LoginInfo', {
                            username: global.user.maThuThu,
                            password: global.user.matKhau
                        });
                    });
                    navigation.replace("ProfileLibrarian");
                } 
                else if (global.user.vaiTro == "Doc gia") {
                    realm.write(() => {
                        realm.delete(loginInfos);
                        realm.create('LoginInfo', {
                            username: global.user.maDocGia,
                            password: global.user.matKhau
                        });
                    });
                    navigation.replace("Home");
                } 
            }
            setShowMessage(true);
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
                <Text style={{ paddingLeft: 20, fontSize: 50, fontWeight: 'bold' }}>My Library</Text>
                <Text style={{ paddingLeft: 20, fontSize: 15, opacity: 0.5, paddingTop: 5, paddingBottom: 20 }}>Login to continue using My Library</Text>
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
                {
                    showMessage ?
                    <View>
                        <Text>Tài khoản hoặc mật khẩu không đúng</Text>
                    </View> :
                    <View></View>
                }
                <Pressable style={styles.button} onPress={() => login()}>
                    <Text style={{ fontWeight: "bold", fontSize: 25 }}>Đăng nhập</Text>
                </Pressable>
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
        fontSize: 17,

    },

    button: {
        width: 370,
        height: 70,
        marginTop: 60,
        borderRadius: 20,
        backgroundColor: "#FCDE70",
        alignItems: "center",
        justifyContent: 'center',
        marginLeft: 20,

    },
});
