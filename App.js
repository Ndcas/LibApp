import { RealmProvider } from '@realm/react';
import SearchData from './realmSchemas/SearchData';
import LoginInfo from './realmSchemas/LoginInfo';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from "./screens/Home";
import Login from "./screens/Login";
import BookDetail from "./screens/BookDetail";
import ProfileMember from "./screens/ProfileMember";
import ProfileLibrarian from "./screens/ProfileLibrarian";
import BookManagement from "./screens/BookManagement";
import BorrowingCard from "./screens/BorrowingCard";
import BorrowingCardManagement from "./screens/BorrowingCardManagement";
import BorrowingCardApprove from "./screens/BorrowingCardApprove";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <RealmProvider schema={[SearchData, LoginInfo]}>
      <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="BookDetail" component={BookDetail}/>
        <Stack.Screen name="ProfileMember" component={ProfileMember}/>
        <Stack.Screen name="ProfileLibrarian" component={ProfileLibrarian}/>
        <Stack.Screen name="BookManagement" component={BookManagement}/>
        <Stack.Screen name="BorrowingCard" component={BorrowingCard}/>
        <Stack.Screen name="BorrowingCardManagement" component={BorrowingCardManagement}/>
        <Stack.Screen name="BorrowingCardApprove" component={BorrowingCardApprove}/>
      </Stack.Navigator>
    </NavigationContainer>
    </RealmProvider>
  );
}