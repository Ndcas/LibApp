import { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { API_URL } from '@env';

export default function App({ navigation }) {

    const [idDocGia, setIdDocGia] = useState("");
    const [idSach, setIdSach] = useState("");
    const [idSachs, setIdSachs] = useState([]);
    const [idThuThu, setidThuThu] = useState("");

    function addBook(){
        idSachs.push(idSach);
        console.log(idDocGia + " " + idThuThu + " " + idSachs);
    }

    async function getIdThuThu(){
        let dats = await fetch(API_URL + `/thuThu/get?maThuThu=${global.user.maThuThu}`);
        if(dats.ok){
            let thuThu = await dats.json();
            // console.log(thuThu[0]._id);            
            setidThuThu(thuThu[0]._id);
        }
    }

    async function createTheMuon() {
        // let dats = await fetch("http://192.168.1.8:8080/theMuon/create", {
        let dats = await fetch(API_URL + "/theMuon/create", {
            method: "post",
            body: JSON.stringify({
                docGiaId: idDocGia,
                thuThuId: idThuThu,
                sachIds: idSachs
            }),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });
        

        console.log(idThuThu);
        
        
        setIdSachs([]);

        console.log(dats);
        
        if (dats.ok) {
            console.log(dats);
        }
    }

    useEffect(() => {
        getIdThuThu();
    }, []);

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.box}>
                <View style={styles.inputBox}>
                    <TextInput style={styles.input} placeholder='ID độc giả' placeholderTextColor="#c5c5c5" clearTextOnFocus={true} value={idDocGia} onChangeText={text => setIdDocGia(text)}></TextInput>
                    <TextInput style={styles.input} placeholder='ID sách' placeholderTextColor="#c5c5c5" clearTextOnFocus={true} value={idSach} onChangeText={text => setIdSach(text)}></TextInput>
                </View>
                <Pressable style={styles.button} onPress={() => addBook()}>
                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>Thêm sách</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => createTheMuon()}>
                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>Tạo thẻ mượn</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffbd59',
        alignItems: 'center',
        justifyContent: 'center',
    },

    box: {
        width: 200,
        height: 250,
        backgroundColor: "#fff",
        borderRadius: 30,
        alignItems: "center",
        padding: 15
    },

    myText: {
        fontWeight: 'bold',
        fontSize: 25
    },

    inputBox: {
        marginTop: 25,
        gap: 10
    },

    input: {
        width: 170,
        height: 30,
        borderWidth: 1,
        borderColor: "#c5c5c5",
        borderRadius: 20,
        paddingLeft: 10,
        fontSize: 15,
    },

    button: {
        marginTop: 30,
        width: 120,
        backgroundColor: "#ff914d",
        alignItems: "center",
        borderRadius: 15,
        padding: 5
    },
});
