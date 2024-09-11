import MongoConnect from './databases/mongo';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import mLop from './models/mongo/mLop';

//MongoConnect();

// let test = new mLop({
//   tenLop: 'Test Lop',
//   soLuongSinhVien: 10
// });

// test.save();

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}