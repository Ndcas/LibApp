import { Alert, Button, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App({ navigation }) {

    return (
        <View style={styles.container}>
            <View style={styles.headBox}>
                <View style={styles.img}></View>
                <View style={{ flex: 3, flexDirection: "column" }}>
                    <View style={{ flex: 2, alignItems: "center" }}>
                        <Text style={styles.title}>Tên sách</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <Text style={styles.author}>NXB-Tác giả</Text>
                    </View>
                </View>
            </View>

            <View style={styles.descriptionBox}>
                <View>
                    <Text style={styles.description}>
                        Mô tả
                    </Text>
                </View>
            </View>

            <Pressable style={styles.button}>
                <Text style={styles.btnText}>Mượn sách</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingLeft: 25,
        paddingRight: 25,
        backgroundColor: "#fff",
        paddingTop: 50
    },

    headBox: {
        flexDirection: "row",
        padding: 10,
        marginTop: 20,
        borderRadius: 20,
        backgroundColor: "#fff",
        elevation: 5

    },

    img: {
        flex: 1.2,
        width: 100,
        height: 150,
        backgroundColor: "#ff914d"
    },

    title: {
        fontSize: 25
    },

    author: {
        fontSize: 20
    },

    descriptionBox: {
        marginTop: 30,
        height: 150,
        padding: 10,
        backgroundColor: "#fff",
        elevation: 4,
        borderRadius: 18
    },

    description: {
        fontSize: 18
    },

    button: {
        marginTop: 30,
        width: 180,
        height: 50,
        backgroundColor: "#ff914d",
        alignItems: "center",
        borderRadius: 15,
        padding: 5,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: "center"
    },

    btnText:{
        fontSize: 20,
        fontWeight:'bold'
    }
});
