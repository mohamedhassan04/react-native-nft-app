import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./Screens/Welcome";
import Home from "./Screens/Home";
import NFTDetails from "./Screens/NFTDetails";

export default function App() {
  /*Import fonts */
  const [FontLoaded] = useFonts({
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
  });

  if (!FontLoaded) {
    return null;
  }

  const Stack = createNativeStackNavigator();

  return (
    <>
      <StatusBar style="light" animated={true} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="NFT-details" component={NFTDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
