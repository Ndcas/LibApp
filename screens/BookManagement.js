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

            <View style={styles.bookList}>
                <View style={styles.book}>
                    <View style={{ flex: 1 }}>
                        <Image style={styles.img} source={require("../assets/img/Blank_img.png")} />
                    </View>
                    <View style={{ flex: 2, marginLeft: 10, marginTop: 10, gap: 10, justifyContent: "center" }}>
                        <Text>
                            <Text style={styles.myText}>Tên sách:</Text>
                            {"\tDế mèn phiêu lưu ký"}
                        </Text>

                        <Text>
                            <Text style={styles.myText}>Mã:</Text>
                            {"\t1"}
                        </Text>

                        <Text>
                            <Text style={styles.myText}>Số lượng:</Text>
                            {"\t5"}
                        </Text>
                    </View>
                </View>
                <View style={styles.book}>
                    <View style={{ flex: 1 }}>
                        <Image style={styles.img} source={require("../assets/img/Blank_img.png")} />
                    </View>
                    <View style={{ flex: 2, marginLeft: 10, marginTop: 10, gap: 10, justifyContent: "center" }}>
                        <Text>
                            <Text style={styles.myText}>Tên sách:</Text>
                            {"\tKính vạn hoa"}
                        </Text>

                        <Text>
                            <Text style={styles.myText}>Mã:</Text>
                            {"\t2"}
                        </Text>

                        <Text>
                            <Text style={styles.myText}>Số lượng:</Text>
                            {"\t5"}
                        </Text>
                    </View>
                </View>
                <View style={styles.book}>
                    <View style={{ flex: 1 }}>
                        <Image style={styles.img} source={require("../assets/img/Blank_img.png")} />
                    </View>
                    <View style={{ flex: 2, marginLeft: 10, marginTop: 10, gap: 10, justifyContent: "center" }}>
                        <Text>
                            <Text style={styles.myText}>Tên sách:</Text>
                            {"\tGame of throne"}
                        </Text>

                        <Text>
                            <Text style={styles.myText}>Mã:</Text>
                            {"\t5"}
                        </Text>

                        <Text>
                            <Text style={styles.myText}>Số lượng:</Text>
                            {"\t5"}
                        </Text>
                    </View>
                </View>
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

    img: {
        height: "100%",
        width: undefined,
        backgroundColor: "#ff914d",
        borderRadius: 10
    },

    update: {
        flexDirection: "row",
        marginTop: 10
    },

    bookList: {
        flexDirection: "column",
        gap: 10,
        marginTop: 25,
        borderWidth: 1,
        height: "80%"
    },

    book: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#c1c1c1",
        padding: 5,
        flexDirection: "row",
        flex: 1,
    },

    myText: {
        fontSize: 18,
        fontWeight: "bold",
    },
})