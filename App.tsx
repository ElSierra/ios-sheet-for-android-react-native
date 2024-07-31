import React, { useCallback, useMemo, useRef } from "react";

import Main from "./src";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


const App = () => {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <Main />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
