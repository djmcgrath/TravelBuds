import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, useRouter, Slot, useSegments } from 'expo-router';
import { useEffect, useState} from 'react';
import { TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { ClerkProvider, useAuth, useUser } from '@clerk/clerk-expo';
import useUserStore from '../storeStates/userState';

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key)
    } catch (err) {
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return 
    }
  },
}

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "mon": require("../assets/fonts/Montserrat-Regular.ttf"),
    "mon-sb": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "mon-b": require("../assets/fonts/Montserrat-Bold.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
      <RootLayoutNav />
    </ClerkProvider>
  )
}

function RootLayoutNav() {
  const router = useRouter()
  const segments = useSegments();
  const { user } = useUser()
  const { setUserSt } = useUserStore()
  const { isLoaded, isSignedIn } = useAuth()

  useEffect(() => {
    if (isSignedIn) {
      fetch('http://localhost:5555/users', {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"},
          body: JSON.stringify({
              "first_name": user?.firstName,
              "last_name": user?.lastName
          })
        })
        .then(res => res.json())
        .then(data => {
          setUserSt(data)})
    }
  },[isSignedIn])
      

  useEffect(() => {
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === '(tabs)';

    console.log('User changed: ', isSignedIn);

    if (isSignedIn && !inTabsGroup) {
      router.push('/(tabs)/user_group');
    } else if (!isSignedIn) {
      router.replace('/(tabs)');
    }
  }, [isSignedIn]);


  return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="(modals)/login" 
          options={{ 
            title: 'Login or Sign Up',
            headerTitleStyle: {
              fontFamily: 'mon-sb',
            },
            // presentation: "modal", 
            headerLeft: () => (
              <TouchableOpacity onPress={() => {router.push('/(tabs)')}}>
                <Ionicons name="close-outline" size={28} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="(modals)/register"
          options={{
            headerTitle: 'Create Account',
          }}
        />
        <Stack.Screen
          name="(modals)/reset"
          options={{
              headerTitle: 'Reset Password',
            }}
        />
      </Stack>
  
  );
}
