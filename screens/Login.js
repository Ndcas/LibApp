import { useState } from 'react';
import { Alert, Button, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View ,ImageBackground,Icon} from 'react-native';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function App({ navigation }) {

    const [isFocused, setIsFocused] = useState(false);
    const [userName, setUserName] = useState("");
    const [pass, setPass] = useState("");

    async function login() {
        console.log("1215");
        let dats = await fetch("http://192.168.1.8:8080/login", {
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

            if (global.user.vaiTro == "Thu thu") {
                navigation.navigate("ProfileLibrarian");
            } else if(global.user.vaiTro == "Doc gia") {
                navigation.navigate("Home");
            }else{
                
            }
        }
    }

        return (
            <ImageBackground 
              source={require('../assets/img/Screenshot (18).png')} // Đường dẫn tới hình ảnh của bạn
              style={styles.container}>
            <Text style ={{paddingLeft : 20,fontSize:50,fontWeight :'bold'}}>My Library</Text>
            <Text style = {{paddingLeft: 20,fontSize:15,opacity:0.5,paddingTop :5,paddingBottom:20}}>Login to continue using My Library</Text>
            <View style={styles.inputBoxID}>
                <View style ={styles.icon}>
                <FontAwesomeIcon icon ={faUser} size={23} style ={{paddingLeft :15}}></FontAwesomeIcon>
                </View>
                <View style = {styles.id}>
                <Text style = {{fontSize : 12,opacity :0.5, fontWeight :'bold'}}>Tên đăng nhập</Text>
                <TextInput style={styles.input} placeholder='ID' placeholderTextColor="#c5c5c5" clearTextOnFocus={true} value={userName} onChangeText={text => setUserName(text)}></TextInput>
                </View>
                </View>

                <View style={styles.inputBoxPassword}>
                <View style ={styles.icon}>
                <FontAwesomeIcon icon ={faUser} size={23} style ={{paddingLeft :15}}></FontAwesomeIcon>
                </View>
                <View style = {styles.id}>
                <Text style = {{fontSize : 12,opacity :0.5,fontWeight :'bold'}}>Mật khẩu</Text>
                <TextInput style={styles.input} placeholder='Password' placeholderTextColor="#c5c5c5" clearTextOnFocus={true} value={pass} secureTextEntry onChangeText={text => setPass(text)}></TextInput>
                </View>
                </View>
                <Pressable style={styles.button} onPress={() => login()}>
                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>Đăng nhập</Text>
                </Pressable>

    
            </ImageBackground>
          );
        };
    

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffbd59',
        alignItems: 'flex-start',
        justifyContent: 'center',
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
        paddingLeft:10,
        flexDirection:'row',
        width: 370,
        height: 55,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 10,
        backgroundColor :'white',
        marginLeft :20,
        alignItems :'center',
        elevation :7,
    },
    inputBoxPassword: {
        marginTop: 15,
        paddingLeft:10,
        flexDirection:'row',
        width: 370,
        height: 55,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 10,
        backgroundColor :'white',
        marginLeft :20,
        alignItems :'center',
        elevation :7,
    },
    icon : {
        flex :1,
        paddingTop :1
    },
    id : {
        flex :10,
        
    },

    input: {
        fontSize: 15,
       
    },

    button: {
        marginTop: 30,
        width: 120,
        backgroundColor: "#ff914d",
        alignItems: "center",
        borderRadius: 10,
        padding: 5
    },
});
