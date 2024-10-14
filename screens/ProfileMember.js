import { useQuery, useRealm } from '@realm/react';
import { Pressable, Image, StyleSheet, Text, View ,ImageBackground} from 'react-native';
import LoginInfo from '../realmSchemas/LoginInfo';
import Icon from 'react-native-vector-icons/FontAwesome';
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
        <ImageBackground 
          source={require('../assets/img/Screenshot (32).png')} // Đường dẫn tới hình ảnh của bạn
          style={styles.container}>
            <View style={styles.box}>
                <View style={{ flex: 3.5,justifyContent :'center'}}>
                    <Image style={styles.img} source={require("../assets/img/Blank_profile.webp")} />
                    </View>
                    <View style = {{flex :6.5}}>
                        <View style ={{flex : 3,justifyContent :'center',backgroundColor:'#fff2cc',borderRadius : 10,alignItems:'flex-start',marginLeft :7}}>
                        <Text style ={{fontSize:23,fontWeight:'bold',paddingLeft:55}}>Độc giả</Text>
                        </View>
                        <View style ={{flex : 7,flexDirection :'column'}}>

                        <View style= {{flexDirection :'row',marginTop :15,height :40,width :110,gap: 25}}>
                        <Text style ={{fontSize : 16,paddingLeft :10,paddingBottom:5}}>Tên độc giả </Text>
                        <Text style ={{fontSize :16,fontWeight :'bold'}}>{global.user.hoTen}</Text>
                        </View>
                        <View style= {{flexDirection :'row',height :40,width :110,gap: 85}}>
                        <Text style ={{fontSize : 16,paddingLeft :10,paddingBottom:5}}>Mã </Text>
                        <Text style ={{fontSize :16,fontWeight :'bold'}}>{global.user.maDocGia}</Text>
                        </View>
                        </View>
                    
                    </View>
        
    
            </View>


            {/* <View style={styles.recentBox}>
                <Pressable style={{flexDirection: "row", alignItems: "center"}} onPress={() => navigation.navigate("BorrowingCard")}>
                    <Text style={{ flex: 2, fontWeight: "bold", fontSize: 20 }}>Recently added</Text>
                    <Text style={{ flex: 1, fontWeight: "bold", fontSize: 30, textAlign: "right"}}>→</Text>
                </Pressable>

                <View style={styles.bookList}>
                    <Image style={styles.book} source={require("../assets/img/Blank_img.png")} />
                    <Image style={styles.book} source={require("../assets/img/Blank_img.png")} />
                    <Image style={styles.book} source={require("../assets/img/Blank_img.png")} />
                </View>
            </View> */}
            <View>
            <Pressable onPress={() => logout()}>
                    <View style ={{backgroundColor:'white',borderRadius:15,height :45,width :300,elevation:5,marginTop :50}}>

                    <View style ={{flex :8,justifyContent:'center',alignItems:'center',paddingLeft :5}}>
                    <Text style={{fontSize:19,fontWeight :'bold'}}>Đăng xuất</Text>
                    </View>
                    </View>
                </Pressable>
            </View>
        </ImageBackground>
    );
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
    bookList: {
        flexDirection: "row",
        height: "80%",
        gap: 9,
        marginTop: 7
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
    },
    book: {
        flex: 1,
        height: "100%",
        borderRadius: 5
    }
});
