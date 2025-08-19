import { AppRegistry } from 'react-native';
import App from './App';
import appJson from './app.json';

const appName = appJson.name;

// Import fonts and react-native-vector-icons
import 'react-native-vector-icons/Fonts/AntDesign.ttf';
import 'react-native-vector-icons/Fonts/Entypo.ttf';
import 'react-native-vector-icons/Fonts/EvilIcons.ttf';
import 'react-native-vector-icons/Fonts/Feather.ttf';
import 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import 'react-native-vector-icons/Fonts/FontAwesome5_Brands.ttf';
import 'react-native-vector-icons/Fonts/FontAwesome5_Regular.ttf';
import 'react-native-vector-icons/Fonts/FontAwesome5_Solid.ttf';
import 'react-native-vector-icons/Fonts/Foundation.ttf';
import 'react-native-vector-icons/Fonts/Ionicons.ttf';
import 'react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf';
import 'react-native-vector-icons/Fonts/MaterialIcons.ttf';
import 'react-native-vector-icons/Fonts/SimpleLineIcons.ttf';
import 'react-native-vector-icons/Fonts/Zocial.ttf';

import './assets/fonts/Rubik/Rubik-Light.ttf';
import './assets/fonts/Rubik/Rubik-Regular.ttf';
import './assets/fonts/Rubik/Rubik-Medium.ttf';
import './assets/fonts/Rubik/Rubik-SemiBold.ttf';
import './assets/fonts/Rubik/Rubik-Bold.ttf';
import './assets/fonts/Rubik/Rubik-ExtraBold.ttf';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('root'),
});
