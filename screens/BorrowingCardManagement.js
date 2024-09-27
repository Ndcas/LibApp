import { Alert, Button, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass, width } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { faRefresh } from '@fortawesome/free-solid-svg-icons/faRefresh';


export default function App({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.search}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} style={styles.icon} />
                    <TextInput style={{ flex: 1 }} placeholder='Tìm kiếm' placeholderTextColor="#000000" clearTextOnFocus={true}></TextInput>
                </View>
            </View>

            <Pressable style={styles.update}>
                <FontAwesomeIcon icon={faRefresh} style={{ paddingTop: 23 }} />
                <Text style={{}}> Cập nhật</Text>
            </Pressable>

            <View style={styles.cardList}>
                <Pressable style={styles.card} onPress={() => navigation.navigate("BorrowingCardApprove")}>
                    <Text style={{flex: 1, fontSize: 18, fontWeight: "bold", textAlign: "left"}}>#1</Text>
                    <Text style={{flex: 1, fontSize: 15, textAlign: "right"}}>Đã duyệt</Text>
                </Pressable>

                <Pressable style={styles.card} onPress={() => navigation.navigate("BorrowingCardApprove")}>
                    <Text style={{flex: 1, fontSize: 18, fontWeight: "bold", textAlign: "left"}}>#1</Text>
                    <Text style={{flex: 1, fontSize: 15, textAlign: "right"}}>Đã duyệt</Text>
                </Pressable>

                <Pressable style={styles.card} onPress={() => navigation.navigate("BorrowingCardApprove")}>
                    <Text style={{flex: 1, fontSize: 18, fontWeight: "bold", textAlign: "left"}}>#1</Text>
                    <Text style={{flex: 1, fontSize: 15, textAlign: "right"}}>Chờ duyệt</Text>
                </Pressable>
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
        height: "80%"
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