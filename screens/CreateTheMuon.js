import { useState, useEffect } from 'react';
import { Image, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
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
            console.log("ok");

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
        let response = await fetch(API_URL + '/dauSach/getWithHinhAnh?' + new URLSearchParams({ tinhTrang: 'Co san' }));
        if (response.ok) {
            console.log("ok");

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
            let result = [...dauSachMuon];
            if (result.length == 3) {
                result.shift();
            }
            result = [...result, sach];
            setDauSachMuon(result);
            setTenDauSach('');
        }
    }

    async function create() {
        let newDauSachs = await fetch(API_URL + '/dauSach/getWithHinhAnh?' + new URLSearchParams({ tinhTrang: 'Co san' }));
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
                let theMuon = await fetch(API_URL + '/theMuon/get?' + new URLSearchParams({
                    tinhTrang: 'Chua tra',
                    docGia: docGia[0]._id
                }));
                theMuon = await theMuon.json();
                if (theMuon.length > 0) {
                    setShowMessage(true);
                    setMessge('Độc giả này vẫn còn sách chưa trả');
                }
                else {
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
            <Text style={{ fontSize: 40, fontWeight: 'bold', paddingBottom: 10 }}>Tạo phiếu mượn</Text>
            <View style={styles.box}>
                <View style={styles.upperView}>
                    <View style={[styles.inputFrame, { zIndex: 99 }]}>
                        <View style={styles.iconPart}>
                            <FontAwesomeIcon icon={faUser} size={20} />
                        </View>
                        <View style={styles.inputPart}>
                            <AutocompleteInput
                                inputContainerStyle={{ borderWidth: 0, marginTop: 4 }}
                                data={filteredDocGias}
                                value={maDocGia}
                                onChangeText={text => setMaDocGia(text)}
                                placeholder='Mã độc giả'
                                style={{ fontSize: 15, paddingTop: 3 }}
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
                    <View style={[styles.inputFrame, { zIndex: 99 }]}>
                        <View style={styles.iconPartBook}>
                            <FontAwesomeIcon icon={faBook} size={20} />
                        </View>
                        <View style={styles.inputPartBook}>
                            <AutocompleteInput
                                inputContainerStyle={{ borderWidth: 0, marginTop: 4 }}
                                data={filteredDauSachs}
                                value={tenDauSach}
                                onChangeText={text => setTenDauSach(text)}
                                placeholder='Tên đầu sách'
                                style={{ fontSize: 15, paddingTop: 3 }}
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
                        <View style={styles.pressPartBook}>
                            <Pressable onPress={() => addSach()}>
                                <Text style={{ fontWeight: "bold", fontSize: 16, paddingLeft: 20, color: "#007bff" }}>Thêm sách</Text>
                            </Pressable>
                        </View>
                    </View>
                    <Text style={{ fontSize: 13, fontStyle: 'italic', paddingTop: 8, paddingRight: 45 }}>Lưu ý : Trước khi chọn tạo thẻ mượn, cần thêm sách</Text>
                </View>
                <View style={styles.lowerView}>
                    <View style={{ flex: 9.2 }}>
                        <View style={{ flexDirection: 'row', gap: 180, marginBottom: 3 }}>
                            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Sách mượn</Text>
                            <Text style={{ fontSize: 13, color: '#007bff' }}>Giới hạn {dauSachMuon.length}/3</Text>
                        </View>
                        <ScrollView contentContainerStyle={styles.bookBorrowFrame}>
                            {
                                dauSachMuon.map((dauSach, index) => (
                                    <Image key={index} style={{ width: 95, height: 140, borderRadius: 15, marginRight: 5 }} source={{ uri: 'data:image/' + dauSach.hinhAnh.format + ';base64,' + dauSach.hinhAnh.dataUrl }} />
                                ))
                            }
                        </ScrollView>
                        <Pressable style={styles.button} onPress={() => create()}>
                            <Text style={{ fontWeight: "bold", fontSize: 25 }}>Tạo phiếu mượn</Text>
                        </Pressable>
                    </View>
                </View>
                <View style={{ flex: 0.8 }}>
                    {
                        showMessage ?
                            <View>
                                <Text style={{ paddingTop: 7, fontSize: 15, paddingLeft: 20, fontWeight: 'bold', fontStyle: 'italic', color: '#f95454' }}>{messge}</Text>
                            </View> :
                            <View></View>
                    }
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
        height: 500,
        backgroundColor: "#fff",
        borderRadius: 20,
        borderWidth: 0.5,
        elevation: 5

    },
    upperView: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    lowerView: {
        flex: 6,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 3,
    },
    inputFrame: {
        flexDirection: 'row',
        height: 45,
        margin: 7,
        borderRadius: 5,
        backgroundColor: 'white',
        borderBottomWidth: 0.5,
        alignItems: 'center',
    },
    iconPart: {
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputPart: {
        flex: 8.5,
    },
    pressPartBook: {
        flex: 3
    },
    iconPartBook: {
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputPartBook: {
        flex: 5.5,
    },
    bookBorrowFrame: {
        height: 150,
        width: 345,
        backgroundColor: 'white',
        borderWidth: 0.3,
        flexDirection: 'row',
        borderRadius: 10,
        alignItems: 'center',
    },
    bookBorrow: {
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
        height: 80,
        width: 345,
        backgroundColor: "#fff2cc",
        alignItems: "center",
        borderRadius: 15,
        justifyContent: 'center',
    },
});