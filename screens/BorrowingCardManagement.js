import React, { useState, useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { API_URL } from '@env';


export default function App({ navigation }) {

    const [listTheMuon, setListTheMuon] = useState([]);

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
        }
    }

    useEffect(() => {
        getListTheMuon();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.search}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} style={styles.icon} />
                    <TextInput style={{ flex: 1 }} placeholder='Tìm kiếm' placeholderTextColor="#000000" clearTextOnFocus={true}></TextInput>
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
                        listTheMuon.map((theMuon, index) => {
                            return(
                                <Pressable key={index} style={styles.card} onPress={() => navigation.navigate("BorrowingCard", {borrowingCard: theMuon})}>
                                    <Text style={{ flex: 1, fontSize: 18, fontWeight: "bold", textAlign: "left" }}>#{index + 1}</Text>
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