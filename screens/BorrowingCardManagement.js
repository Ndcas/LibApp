import React, { useState, useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { API_URL } from '@env';
import AutocompleteInput from 'react-native-autocomplete-input';

export default function App({ navigation }) {
    const [listTheMuon, setListTheMuon] = useState([]);
    const [showTheMuon, setShowTheMuon] = useState([]);
    const [docGias, setDocGias] = useState([]);
    const [maDocGia, setMaDocGia] = useState('');
    const filteredDocGias = filterDocGia();

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

    function filterTheMuon(text) {
        setMaDocGia(text);
        if (text.length != 0) {
            let docGia = docGias.find(docGia => docGia.maDocGia == text);
            if (docGia) {
                setShowTheMuon(listTheMuon.filter(theMuon => theMuon.docGia == docGia._id));
            }
            else {
                setShowTheMuon([]);
            }
        }
        else {
            setShowTheMuon(listTheMuon);
        }
    }

    function formatDate(dateStr) {
        let date = new Date(dateStr);
        let dd = String(date.getDate()).padStart(2, '0');
        let mm = String(date.getMonth() + 1).padStart(2, '0');
        let yyyy = date.getFullYear();
        return `${dd}/${mm}/${yyyy}`;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.search}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} style={styles.icon} />
                    <View style={{ backgroundColor: 'transparent' }}>
                        <AutocompleteInput
                            inputContainerStyle={{ borderWidth: 0 }}
                            data={filteredDocGias}
                            value={maDocGia}
                            onChangeText={text => filterTheMuon(text)}
                            placeholder='Mã độc giả'
                            flatListProps={{
                                keyboardShouldPersistTaps: 'always',
                                renderItem: ({ item }) => (
                                    <Pressable onPress={() => filterTheMuon(item.maDocGia)}>
                                        <Text>{item.maDocGia + ' ' + item.hoTen}</Text>
                                    </Pressable>
                                )
                            }}
                        />
                    </View>
                </View>
            </View>

            <Pressable style={styles.update}>
                <Pressable style={{}} onPress={() => navigation.navigate("CreateTheMuon")}>
                    <Text>
                        + Thêm thẻ mượn
                    </Text>
                </Pressable>
            </Pressable>

            <View style={styles.cardList}>
                <ScrollView>
                    {
                        showTheMuon.map((theMuon, index) => {
                            return (
                                <Pressable key={index} style={styles.card} onPress={() => navigation.navigate("BorrowingCard", { borrowingCard: theMuon })}>
                                    <Text style={{ flex: 1, fontSize: 18, fontWeight: "bold", textAlign: "left" }}>#{index + 1}</Text>
                                    <View>
                                        <Text>Mã độc giả: {docGias.find(docGia => docGia._id = theMuon.docGia).maDocGia}</Text>
                                        <Text>Ngày mượn: {formatDate(theMuon.ngayMuon)}</Text>
                                    </View>
                                    <Text style={{ flex: 1, fontSize: 15, textAlign: "right" }}>{theMuon.tinhTrang}</Text>
                                </Pressable>
                            )
                        })
                    }
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 40,
        paddingHorizontal: 20
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    search: {
        flexDirection: "row",
        flex: 5,
        width: 345,
        height: 40,
        marginTop: 15,
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 20,
        paddingLeft: 10,
        fontSize: 15,
    },

    icon: {
        flex: 1,
        paddingTop: 39,
        paddingLeft: 5,
    },

    update: {
        flexDirection: "row",
        marginTop: 10
    },

    cardList: {
        gap: 10,
        marginTop: 25,
        height: "80%",
        borderWidth: 1
    },

    card: {
        width: "100%",
        borderWidth: 1,
        borderRadius: 12,
        borderColor: "#c1c1c1",
        padding: 10,
        flexDirection: "row",
        height: 70,
        alignItems: "center"
    },

    myText: {
        fontSize: 18,
        fontWeight: "bold",
        flex: 1,
    },
})