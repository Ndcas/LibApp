import { useState, useEffect } from 'react';
import { Image, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { API_URL } from '@env';
import AutocompleteInput from 'react-native-autocomplete-input';

export default function App({ navigation }) {
    const [docGias, setDocGias] = useState([]);
    const [maDocGia, setMaDocGia] = useState('');
    const filteredDocGias = filterDocGia();
    const [dauSachs, setDauSachs] = useState([]);
    const [tenDauSach, setTenDauSach] = useState('');
    const filteredDauSachs = filterDauSach();
    const [dauSachMuon, setDauSachMuon] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [messge, setMessge] = useState('');

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
        if (maDocGia.trim().length <= 1) {
            return [];
        }
        let result = docGias.filter(docGia => docGia.maDocGia.toLowerCase().includes(maDocGia.toLowerCase().trim()));
        if (result.length == 1 && result[0].maDocGia == maDocGia) {
            return [];
        }
        return result.slice(0, 5);
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
        return result.slice(0, 5);
    }

    function addSach() {
        let sach = dauSachs.find((dauSach) => dauSach.tenDauSach == tenDauSach);
        if (sach && !dauSachMuon.find((dauSach) => dauSach == sach)) {
            setDauSachMuon([...dauSachMuon, sach]);
        }
    }

    async function create() {
        let newDauSachs = await fetch(API_URL + '/dauSach/getCoSan');
        newDauSachs = await newDauSachs.json();
        let sachIds = [];
        let ok = true;
        for (let i = 0; i < dauSachMuon.length; i++) {
            let dauSach = newDauSachs.find(dauSach => dauSach._id == dauSachMuon[i]._id);
            if (dauSach) {
                let sach = dauSach.sachs.find(sach => sach.tinhTrang == 'Co san');
                if (sach) {
                    sachIds.push(sach._id);
                }
                else {
                    ok = false;
                    break;
                }
            }
            else {
                ok = false;
                break;
            }
        }
        if (sachIds.length == 0) {
            setShowMessage(true);
            setMessge('Hãy thêm sách cần mượn');
        }
        else if (ok) {
            let docGia = await fetch(API_URL + `/docGia/get?maDocGia=${maDocGia}`);
            docGia = await docGia.json();
            if (docGia.length == 1) {
                let thuThu = await fetch(API_URL + `/thuThu/get?maThuThu=${global.user.maThuThu}`);
                thuThu = await thuThu.json();
                let response = await fetch(API_URL + '/theMuon/create', {
                    method: 'post',
                    body: JSON.stringify({
                        docGiaId: docGia[0]._id,
                        thuThuId: thuThu[0]._id,
                        sachIds: sachIds
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
                response = await response.json();
                if (response.message == 'Tao thanh cong') {
                    navigation.popToTop();
                }
                else {
                    setShowMessage(true);
                    setMessge('Không thể tạo thẻ mượn, hãy thử lại');
                }
            }
            else {
                setShowMessage(true);
                setMessge('Không tìm thấy độc giả');
            }
        }
        else {
            setShowMessage(true);
            setMessge('Có sách không thể mượn');
        }
        setDauSachs(newDauSachs);
        setDauSachMuon([]);
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
                            renderItem: ({ item }) => (
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
                            renderItem: ({ item }) => (
                                <Pressable onPress={() => setTenDauSach(item.tenDauSach)}>
                                    <Text>{item.tenDauSach}</Text>
                                </Pressable>
                            )
                        }}
                    />
                </View>
                <Pressable style={styles.button} onPress={() => addSach()}>
                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>Thêm sách</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => create()}>
                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>Tạo thẻ mượn</Text>
                </Pressable>
                {
                    showMessage ?
                    <View>
                        <Text>{messge}</Text>
                    </View> :
                    <View></View>
                }
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
