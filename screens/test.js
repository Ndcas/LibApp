import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

export default function App() {
    const [quote, setQuote] = useState([]);
    useEffect(() => {
        fetch("https://libappnodejs.onrender.com/docGia/get")
            .then(data => data.json())
            .then(data => {
                for(let i = 0; i < data.length; i++){
                    console.log(data[i]["hoTen"]);
                }
            })
            .catch(error => console.log(error))
    });

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>{quote[0]}</Text>
        </View>
    );
};