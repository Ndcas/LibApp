import React, { useState, useEffect } from 'react';
import { ImageBackground, Platform, Pressable, ScrollView, StyleSheet, KeyboardAvoidingView, Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { API_URL } from '@env';
import AutocompleteInput from 'react-native-autocomplete-input';
import { ButtonGroup, color } from '@rneui/base';

export default function App({ navigation }) {
    const [listTheMuon, setListTheMuon] = useState([]);
    const [showTheMuon, setShowTheMuon] = useState([]);
    const [docGias, setDocGias] = useState([]);
    const [maDocGia, setMaDocGia] = useState('');
    const filteredDocGias = filterDocGia();
    const [filter, setFilter] = useState(0);
    const today = new Date();

    useEffect(() => {
        getListTheMuon();
        getDocGias();
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

    async function getListTheMuon() {
        let data = await fetch(API_URL + "/theMuon/get");
        if (data.ok) {
            let theMuons = await data.json();
            theMuons.sort((a, b) => {
                let d1 = new Date(a.ngayMuon);
                let d2 = new Date(b.ngayMuon);
                return d2 - d1;
            });
            setListTheMuon(theMuons);
            setShowTheMuon(theMuons);
        }
    }

    function filterMaDocGia(text) {
        setMaDocGia(text);
        if (text.trim().length > 0) {
            let docGia = docGias.find(docGia => docGia.maDocGia == text);
            if (docGia) {
                let result = listTheMuon.filter(theMuon => theMuon.docGia == docGia._id);
                switch (filter) {
                    case 1:
                        result = result.filter(theMuon => theMuon.tinhTrang == 'Da tra');
                        break;
                    case 2:
                        result = result.filter(theMuon => theMuon.tinhTrang == 'Chua tra' && new Date(theMuon.hanTra) >= today);
                        break;
                    case 3:
                        result = result.filter(theMuon => theMuon.tinhTrang == 'Chua tra' && new Date(theMuon.hanTra) < today);
                        break;
                }
                setShowTheMuon(result);
            }
            else {
                setShowTheMuon([]);
            }
        }
        else {
            let result = [...listTheMuon];
            switch (filter) {
                case 1:
                    result = result.filter(theMuon => theMuon.tinhTrang == 'Da tra');
                    break;
                case 2:
                    result = result.filter(theMuon => theMuon.tinhTrang == 'Chua tra' && new Date(theMuon.hanTra) >= today);
                    break;
                case 3:
                    result = result.filter(theMuon => theMuon.tinhTrang == 'Chua tra' && new Date(theMuon.hanTra) < today);
                    break;
            }
            setShowTheMuon(result);
        }
    }

    function filterTinhTrang(value) {
        setFilter(value);
        let result = [...listTheMuon];
        if (maDocGia.trim().length > 0) {
            let docGia = docGias.find(docGia => docGia.maDocGia == maDocGia);
            if (docGia) {
                result = result.filter(theMuon => theMuon.docGia == docGia._id);
                switch (value) {
                    case 1:
                        result = result.filter(theMuon => theMuon.tinhTrang == 'Da tra');
                        break;
                    case 2:
                        result = result.filter(theMuon => theMuon.tinhTrang == 'Chua tra' && new Date(theMuon.hanTra) >= today);
                        break;
                    case 3:
                        result = result.filter(theMuon => theMuon.tinhTrang == 'Chua tra' && new Date(theMuon.hanTra) < today);
                        break;
                }
                setShowTheMuon(result);
            }
            else {
                setShowTheMuon([]);
            }
        }
        else {
            switch (value) {
                case 1:
                    result = listTheMuon.filter(theMuon => theMuon.tinhTrang == 'Da tra');
                    break;
                case 2:
                    result = listTheMuon.filter(theMuon => theMuon.tinhTrang == 'Chua tra' && new Date(theMuon.hanTra) >= today);
                    break;
                case 3:
                    result = listTheMuon.filter(theMuon => theMuon.tinhTrang == 'Chua tra' && new Date(theMuon.hanTra) < today);
                    break;
            }
            setShowTheMuon(result);
        }
    }

    function formatDate(dateStr) {
        let date = new Date(dateStr);
        let dd = String(date.getDate()).padStart(2, '0');
        let mm = String(date.getMonth() + 1).padStart(2, '0');
        let yyyy = date.getFullYear();
        return `${dd}/${mm}/${yyyy}`;
    }

    function tinhTrangColor(theMuon) {
        if (theMuon.tinhTrang == 'Da tra') {
            return { color: 'green' }
        }
        if (theMuon.tinhTrang == 'Chua tra' && new Date(theMuon.hanTra) < today) {
            return { color: 'red' }
        }
        return { color: '#007bff' }
    }

    function getTinhTrang(theMuon) {
        if (theMuon.tinhTrang == 'Da tra') {
            return 'Đã trả';
        }
        else if (theMuon.tinhTrang == 'Chua tra' && new Date(theMuon.hanTra) < today) {
            return 'Quá hạn';
        }
        return 'Chưa trả';
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ImageBackground
                source={require('../assets/img/Screenshot (32).png')} // Đường dẫn tới hình ảnh của bạn
                style={styles.upperView}>
                <Text style={{ fontSize: 35, fontWeight: 'bold', paddingLeft: 15 }}>Quản lý phiếu mượn</Text>
                <Text style={{ fontSize: 13, opacity: 0.5, paddingLeft: 18, paddingBottom: 13 }}>Quản lý danh sách phiếu mượn và phiếu mượn</Text>
                <View style={styles.header}>
                    <View style={styles.search}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} style={styles.icon} />
                        <View style={{ backgroundColor: 'transparent', flex: 8, justifyContent: 'center' }}>
                            <AutocompleteInput
                                inputContainerStyle={{ borderWidth: 0, paddingLeft: 10, marginRight: 15 }}
                                data={filteredDocGias}
                                value={maDocGia}
                                onChangeText={text => filterMaDocGia(text)}
                                placeholder='Tìm kiếm thẻ mượn' style={{ paddingTop: 7 }}
                                flatListProps={{
                                    keyboardShouldPersistTaps: 'always',
                                    renderItem: ({ item }) => (
                                        <Pressable onPress={() => filterMaDocGia(item.maDocGia)}>
                                            <Text>{item.maDocGia + ' ' + item.hoTen}</Text>
                                        </Pressable>
                                    )
                                }}
                            />
                        </View>
                    </View>
                </View>
                <ButtonGroup
                    buttons={['Tất cả', 'Đã trả', 'Chưa trả', 'Quá hạn']}
                    selectedIndex={filter}
                    onPress={(value) => filterTinhTrang(value)}
                />
            </ImageBackground>

            <KeyboardAvoidingView style={styles.lowerView} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <View style={{ flexDirection: 'row', gap: 60 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', paddingBottom: 20 }}>Danh sách phiếu mượn</Text>
                    <Pressable>
                        <Pressable style={{}} onPress={() => navigation.navigate("CreateTheMuon")}>
                            <Text style={styles.addText}>
                                Thêm phiếu mượn
                            </Text>
                        </Pressable>
                    </Pressable>
                </View>
                <ScrollView>
                    {
                        showTheMuon.map((theMuon, index) => {
                            return (
                                <Pressable key={index} style={styles.card} onPress={() => navigation.navigate("BorrowingCard", { borrowingCard: theMuon })}>
                                    <Text style={styles.cardIndex}>#{index + 1}</Text>
                                    <View>
                                        <Text style={styles.cardText}>Mã độc giả: {docGias.find(docGia => docGia._id === theMuon.docGia) ? docGias.find(docGia => docGia._id === theMuon.docGia).maDocGia : 'Không tìm thấy độc giả'}</Text>
                                        <Text style={styles.cardText}>Ngày mượn: {formatDate(theMuon.ngayMuon)}</Text>
                                    </View>
                                    <Text style={[styles.cardStatus, tinhTrangColor(theMuon)]}>
                                        {
                                            getTinhTrang(theMuon)
                                        }
                                    </Text>
                                </Pressable>
                            )
                        })
                    }
                </ScrollView>
            </KeyboardAvoidingView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    upperView: {
        flex: 4,
        backgroundColor: '#fff2cc',
        justifyContent: 'center'

    },
    lowerView: {
        flex: 6,
        backgroundColor: "white",
        padding: 15,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -30
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    search: {
        flexDirection: "row",
        width: '95%',
        height: 50,
        marginTop: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 20,
        backgroundColor: '#fff',
        paddingLeft: 10,
        elevation: 2,
        alignItems: "center",
        justifyContent: 'center'

    },

    icon: {
        flex: 2,
        color: '#666',
    },

    update: {
        flexDirection: "row",
        marginTop: 10,
        marginLeft: 20
    },

    addText: {
        color: "#007bff",
        fontSize: 15,
        fontWeight: "bold",
        elevation: 7,
        paddingTop: 3

    },

    cardList: {
        marginTop: 20,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        paddingVertical: 10,
    },

    card: {
        width: "100%",
        borderWidth: 1,
        borderRadius: 12,
        borderColor: "#ddd",
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        elevation: 2,
        marginBottom: 15
    },

    cardIndex: {
        fontSize: 18,
        fontWeight: "bold",
        flex: 1,
        color: "#333",
    },

    cardText: {
        fontSize: 16,
        color: "#333",
    },

    cardStatus: {
        flex: 1,
        fontSize: 14,
        textAlign: "right",
    },
});
