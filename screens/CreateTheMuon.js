import { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Pressable, StyleSheet, Text, View } from 'react-native';
import { API_URL } from '@env';
import AutocompleteInput from 'react-native-autocomplete-input';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';

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
            setTenDauSach('');
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
            <Text style={{ fontSize: 30, fontWeight: 'bold', paddingBottom: 10 }}>Tạo phiếu mượn</Text>
            <View style={styles.box}>
                <View style={styles.upperView}>
                    <View style={styles.inputFrame}>
                        <View style={styles.iconPart}>
                            <FontAwesomeIcon icon={faUser} size={20} />
                        </View>
                        <View style={styles.inputPart}>
                            <AutocompleteInput
                                inputContainerStyle={{ borderWidth: 0, marginTop: 4 }}
                                data={filteredDocGias}
                                value={maDocGia}
                                onChangeText={text => setMaDocGia(text)}
                                placeholder='Mã đọc giả' style={{ fontSize: 16, paddingTop: 3 }}
                                flatListProps={{
                                    keyboardShouldPersistTaps: 'always',
                                    renderItem: ({ item }) => (
                                        <Pressable onPress={() => setMaDocGia(item.maDocGia)}>
                                            <Text>{item.maDocGia + ' ' + item.hoTen}</Text>
                                        </Pressable>
                                    )
                                }}
                            />
                        </View>
                    </View>
                    <View style={styles.inputFrame}>
                        <View style={styles.iconPart}>
                            <FontAwesomeIcon icon={faBook} size={20} />
                        </View>
                        <View style={styles.inputPart}>
                            <AutocompleteInput
                                inputContainerStyle={{ borderWidth: 0, marginTop: 4 }}
                                data={filteredDauSachs}
                                value={tenDauSach}
                                onChangeText={text => setTenDauSach(text)}
                                placeholder='Tên đầu sách' style={{ fontSize: 16, paddingTop: 3 }}

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
                    </View>
                    <Text style={{ fontSize: 13, fontStyle: 'italic', paddingTop: 4 }}>Lưu ý : Trước khi chọn tạo thẻ mượn, cần thêm sách</Text>
                </View>


                <View style={styles.lowerView}>
                    <View style={{ flex: 7, flexDirection: 'row', gap: 7, alignItems: 'center', justifyContent: 'center' }}>
                        <Pressable style={styles.button} onPress={() => addSach()}>
                            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Thêm sách</Text>
                        </Pressable>

                        <Pressable style={styles.button} onPress={() => create()}>
                            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Tạo phiếu mượn</Text>
                        </Pressable>
                    </View>
                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                        {
                            showMessage ?
                                <View style={{ width: '60%', height: 30, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14 }}>{messge}</Text>
                                </View> :
                                <View></View>
                        }
                    </View>
                </View>
            </View>

        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff2cc',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    box: {
        width: "100%",
        height: 350,
        backgroundColor: "#fff",
        borderRadius: 13,
        borderWidth: 0.5,
        elevation: 5

    },
    upperView: {
        flex: 6,
        alignItems: 'center',
        justifyContent: 'center'
    },
    lowerView: {
        flex: 4,
        justifyContent: 'center',
        gap: 3,
    },
    inputFrame: {
        flexDirection: 'row',
        height: 50,
        margin: 7,
        borderRadius: 5,
        backgroundColor: 'white',
        borderBottomWidth: 0.5
    },
    iconPart: {
        flex: 1.3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputPart: {
        flex: 8.7
    },


    myText: {
        fontWeight: 'bold',
        fontSize: 25
    },

    inputBox: {
        marginTop: 5
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
        height: 70,
        width: 170,
        backgroundColor: "#fff2cc",
        alignItems: "center",
        borderRadius: 15,
        justifyContent: 'center',
    },
});