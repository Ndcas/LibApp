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
import CreateTheMuon from "./screens/CreateTheMuon";
import BookListManagement from "./screens/BookListManagement";
import BorrowingCardsMember from "./screens/BorrowingCardsMember";
import BorrowingCardMemberDetails from "./screens/BorrowingCardMemberDetails"
import test from "./screens/test";
import { RealmProvider } from '@realm/react';
import LoginInfo from './realmSchemas/LoginInfo';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <RealmProvider schema={[LoginInfo]}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="BookDetail" component={BookDetail} />
          <Stack.Screen name="ProfileMember" component={ProfileMember} />
          <Stack.Screen name="ProfileLibrarian" component={ProfileLibrarian} />
          <Stack.Screen name="BookManagement" component={BookManagement} />
          <Stack.Screen name="BookListManagement" component={BookListManagement} />
          <Stack.Screen name="BorrowingCard" component={BorrowingCard} />
          <Stack.Screen name="BorrowingCardManagement" component={BorrowingCardManagement} />
          <Stack.Screen name="BorrowingCardApprove" component={BorrowingCardApprove} />
          <Stack.Screen name="CreateTheMuon" component={CreateTheMuon} />
          <Stack.Screen name="BorrowingCardsMember" component={BorrowingCardsMember} />
          <Stack.Screen name="BorrowingCardMemberDetails" component={BorrowingCardMemberDetails} />
          <Stack.Screen name="test" component={test} />
        </Stack.Navigator>
      </NavigationContainer>
    </RealmProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
