import { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { API_URL } from '@env';
import AutocompleteInput from 'react-native-autocomplete-input';

export default function App({ navigation }) {

    const [docGias, setDocGias] = useState([]);
    const [maDocGia, setMaDocGia] = useState('');
    const filteredDocGias = filterDocGia();
    const [dauSachs, setDauSachs] = useState([]);
    const [tenDauSach, setTenDauSach] = useState('');
    const filteredDauSachs = filterDauSach();
    const [idSachs, setIdSachs] = useState([]);

    async function createTheMuon() {
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
        getDocGias();
        getDauSachs();
    }, []);

    async function getDocGias() {
        let response = await fetch(API_URL + '/docGia/get');
        if (response.ok) {
            setDocGias(await response.json());
        }
    }

    function filterDocGia() {
        if (maDocGia.trim().length <= 1)  {
            return [];
        }
        let result = docGias.filter(docGia => docGia.maDocGia.toLowerCase().includes(maDocGia.toLowerCase().trim()));
        if (result.length == 1 && result[0].maDocGia == maDocGia) {
            return [];
        }
        return result;
    }

    async function getDauSachs() {
        let response = await fetch(API_URL + '/dauSach/getCoSan');
        if (response.ok) {
            setDauSachs(await response.json());
        }
    }

    function filterDauSach() {
        if (tenDauSach.trim().length <= 2) {
            return [];
        }
        let result = dauSachs.filter(dauSach => dauSach.tenDauSach.toLowerCase().includes(tenDauSach.toLowerCase().trim()));
        if (result.length == 1 && result[0].tenDauSach == tenDauSach) {
            return [];
        }
        return result;
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.box}>
                <View style={styles.inputBox}>
                    <AutocompleteInput
                        data={filteredDocGias}
                        value={maDocGia}
                        onChangeText={text => setMaDocGia(text)}
                        placeholder='Mã độc giả'
                        flatListProps={{
                            keyboardShouldPersistTaps: 'always',
                            renderItem: ({item}) => (
                                <Pressable onPress={() => setMaDocGia(item.maDocGia)}>
                                    <Text>{item.maDocGia + ' ' + item.hoTen}</Text>
                                </Pressable>
                            )
                        }}
                    />
                    <AutocompleteInput
                        data={filteredDauSachs}
                        value={tenDauSach}
                        onChangeText={text => setTenDauSach(text)}
                        placeholder='Tên đầu sách'
                        flatListProps={{
                            keyboardShouldPersistTaps: 'always',
                            renderItem: ({item}) => (
                                <Pressable onPress={() => setTenDauSach(item.tenDauSach)}>
                                    <Text>{item.tenDauSach}</Text>
                                </Pressable>
                            )
                        }}
                    />
                </View>
                <Pressable style={styles.button} onPress={() => {}}>
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
