import { Pressable, Image, StyleSheet, Text, View,ImageBackground } from 'react-native';
import { useRealm, useQuery } from '@realm/react';
import LoginInfo from '../realmSchemas/LoginInfo';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';

export default function App({ navigation }) {
    const realm = useRealm();
    const loginInfos = useQuery(LoginInfo);

    function logout() {
        realm.write(() => {
            realm.delete(loginInfos);
            navigation.reset({
                index: 0,
                routes: [{
                    name: 'Login'
                }]
            });
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <View style={{ flex: 3.5,justifyContent :'center'}}>
                    <Image style={styles.img} source={require("../assets/img/Blank_profile.webp")} />
                    </View>
                    <View style = {{flex :6.5}}>
                        <View style ={{flex : 3,justifyContent :'center',backgroundColor:'#fff2cc',borderRadius : 10,alignItems:'flex-start',marginLeft :7}}>
                        <Text style ={{fontSize:23,fontWeight:'bold',paddingLeft:55}}>Thủ thư</Text>
                        </View>
                        <View style ={{flex : 7,flexDirection :'row'}}>
                            <View style ={{flex : 1,justifyContent :'flex-start',paddingTop:10}}>
                        <Text style ={{fontSize : 16,paddingLeft :10,paddingBottom:5}}>Tên thủ thư</Text>
                        <Text style ={{fontSize : 16,paddingLeft :10}}>Mã</Text>
                        </View>
                        <View style ={{flex : 1,justifyContent :'flex-start',alignItems:'flex-end',paddingTop:10}}>
                        <Text style ={{fontSize : 16,paddingLeft :10,paddingBottom:5,fontWeight:'bold'}}>{global.user.tenThuThu}</Text>
                        <Text style ={{fontSize : 16,paddingLeft :10,fontWeight:'bold'}}>{global.user.maThuThu}</Text>
                            </View>
                        </View>
                    </View>
        
    
            </View>

            <View style={styles.recentBox}>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>Chức năng</Text>

                <View style={styles.manageBox}>
    
                    <Pressable style ={styles.functions} onPress={() => navigation.navigate("BookManagement")}>
                    <ImageBackground 
                    source={require('../assets/img/Screenshot (22).png')}
                    style={styles.imageBackground}
                    >
                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Quản lý sách</Text>
                        </ImageBackground>
                    </Pressable>
                    
                    <Pressable style={styles.functions} onPress={() => navigation.navigate("BorrowingCardManagement")}>
                    <ImageBackground 
                    source={require('../assets/img/Screenshot (24).png')}
                    style={styles.imageBackground}
                    >
                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Quản lý phiếu mượn</Text>
                        </ImageBackground>
                    </Pressable>

                </View>
            </View>
            <Pressable onPress={() => logout()}>
                    <View style ={{flexDirection:'row',backgroundColor:'white',borderRadius:10,height :40,width :310,elevation:5,marginTop :20}}>
                    <View style ={{flex :2,justifyContent:'center',alignItems:'center'}}>
                    <FontAwesomeIcon icon={faDoorOpen} size={20}/>
                    </View>
                    <View style ={{flex :8,justifyContent:'center',alignItems:'flex-start'}}>
                    <Text style={{fontSize:17,fontWeight :'bold'}}>Đăng xuất</Text>
                    </View>
                    </View>
                </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff2cc',
        alignItems: 'center',
        paddingTop: 50,
        justifyContent : 'center'
    },

    box: {
        width: 330,
        height: 150,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 7,
        flexDirection: 'row',
        elevation : 8
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
        borderRadius: 20,
        width: "100%",
        marginTop: 10,
        padding: 10,
        backgroundColor: "#fff2cc",
        elevation : 8
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
        fontSize: 25,
        fontWeight :'bold'
    },

    img: {
        height :"100%",
        width :undefined,
        borderRadius: 20
    },

    button: {
        flex: 1,
        backgroundColor: "#fff2cc",
        borderRadius: 20,
        width: 150,
        alignItems: "center",
        justifyContent: "center",
        elevation : 5
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
    imageBackground: {
        height : 130,
        width : 150,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flex : 1,
        opacity : 0.8,
        elevation :5,
        overflow: 'hidden',
        borderRadius : 15,
        paddingLeft : 7,
        paddingTop : 7
      },
    functions: {
        paddingTop : 15,
    }
});
