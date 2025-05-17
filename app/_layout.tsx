import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { type SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import { useColorScheme } from "@/hooks/useColorScheme";
import { AppContextProvider } from "@/context/app/app-context-provider";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// ----------------------------------------------------------------------
const DATABASE_VERSION = 1;

async function migrateDbIfNeeded(db: SQLiteDatabase) {
  try {
    const result = await db.getFirstAsync<{
      user_version: number;
    }>("PRAGMA user_version");

    if (result === null) {
      return;
    }

    let user_version = result.user_version;

    if (user_version >= DATABASE_VERSION) {
      return;
    }

    if (user_version === 0) {
      const QUERY = `
        PRAGMA journal_mode = 'wal';
        CREATE TABLE IF NOT EXISTS members (id INTEGER PRIMARY KEY NOT NULL, name TEXT, paid INT);
        `;
      await db.execAsync(QUERY);
      user_version = 1;
    }
    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
  } catch (error) {
    // error here.
  }
}

// ----------------------------------------------------------------------

function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SukhumvitSet: require("../assets/fonts/SukhumvitSet-Medium.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SQLiteProvider databaseName="db.sharemeal" onInit={migrateDbIfNeeded}>
        <SafeAreaProvider>
          <AppContextProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
          </AppContextProvider>
        </SafeAreaProvider>
      </SQLiteProvider>
    </ThemeProvider>
  );
}

export default RootLayout;
