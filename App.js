import { RealmProvider } from '@realm/react';
import SearchData from './realmSchemas/SearchData';
import LoginInfo from './realmSchemas/LoginInfo';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <RealmProvider schema={[SearchData, LoginInfo]}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </RealmProvider>
  );
}