import React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import AppNavigator from './src/navigation/AppNavigator';
import { store, persistedStore } from './src/redux/store';
import { color } from './src/theme/color';

// Component to fill iOS status bar area with background color
const StatusBarSpacer = () => {
  const insets = useSafeAreaInsets();

  return (
    <>
      {(Platform.OS === "ios" || Platform.OS === "android") && (
        <View style={{ height: insets.top, backgroundColor: color.primary1 }} />
      )}
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <SafeAreaProvider>
          <StatusBarSpacer />

          <StatusBar
            translucent={Platform.OS === 'android'}
            backgroundColor={color.primary1}
            barStyle="light-content"
          />

          <AppNavigator />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
