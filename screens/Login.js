import { Alert, Button, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App({navigation}) {

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.myText}>Đăng nhập</Text>
                <View style={styles.inputBox}>
                    <TextInput style={styles.input} placeholder='ID' placeholderTextColor="#c5c5c5" clearTextOnFocus={true}></TextInput>
                    <TextInput style={styles.input} placeholder='Password' placeholderTextColor="#c5c5c5" clearTextOnFocus={true} secureTextEntry></TextInput>
                </View>
                <Pressable style={styles.button} onPress={() => navigation.navigate("Home")}>
                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>Đăng nhập</Text>
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
