import React, { useState, useEffect } from 'react';
import { ImageBackground, Platform, Pressable, ScrollView, StyleSheet, KeyboardAvoidingView, Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { API_URL } from '@env';
import { ButtonGroup } from '@rneui/base';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

export default function App({ navigation }) {
    const [listTheMuon, setListTheMuon] = useState([]);
    const [showTheMuon, setShowTheMuon] = useState([]);
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

    function filterTinhTrang(value) {
        setFilter(value);
        let result = [...listTheMuon];
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
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, marginLeft: 17 }}>
                    <FontAwesomeIcon icon={faFilter} style={styles.icon} size={13} />
                    <Text style={{ fontSize: 13, paddingLeft: 5, opacity: 0.7 }}>Lọc theo</Text>
                </View>
                <ButtonGroup
                    buttons={['Tất cả', 'Đã trả', 'Chưa trả', 'Quá hạn']}
                    selectedIndex={filter}
                    onPress={(value) => filterTinhTrang(value)}
                    containerStyle={{ marginHorizontal: 13, backgroundColor: "transparent", borderColor: "transparent" }}
                    buttonContainerStyle={{ width: 15, height: 38, borderRadius: 20, marginHorizontal: 0.5, backgroundColor: "transparent", borderColor: "transparent" }}
                    buttonStyle={{ backgroundColor: "#F4F6FF", borderRadius: 10 }}
                    selectedButtonStyle={{ backgroundColor: 'black' }}
                    textStyle={{ color: 'black' }} />
            </ImageBackground>
            <KeyboardAvoidingView style={styles.lowerView} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <View style={{ flexDirection: 'row', gap: 60 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', paddingBottom: 20 }}>Danh sách phiếu mượn</Text>
                </View>
                <ScrollView>
                    {
                        showTheMuon.map((theMuon, index) => {
                            return (
                                <Pressable key={index} style={styles.card} onPress={() => navigation.navigate("BorrowingCardMemberDetails", { borrowingCard: theMuon })}>
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
        flex: 3.5,
        backgroundColor: '#fff2cc',
        justifyContent: 'center'

    },
    lowerView: {
        flex: 6.5,
        backgroundColor: "white",
        padding: 15,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -30,
        borderRadius: 0.3
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    search: {
        flexDirection: "row",
        width: '95%',
        height: 55,
        marginTop: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 15,
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
