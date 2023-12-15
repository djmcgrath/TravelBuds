import { View, Text, StyleSheet, TouchableOpacity, Button, Alert, Pressable } from 'react-native'
import React, { useState } from 'react'
import { usWarmUpBrowser } from '../../hooks/useWarmUpBrowser'
import { TextInput } from 'react-native'
import { defaultStyles } from '../../constants/Styles'
import Colors from '../../constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useOAuth, useSignIn } from '@clerk/clerk-expo'
import { useRouter, Link } from 'expo-router'
import Spinner from 'react-native-loading-spinner-overlay';

enum Strategy {
    Google = "oauth_google",
    Apple = "oauth_apple",
}

const Page = () => {
  
  usWarmUpBrowser()

  const router = useRouter()
  const { startOAuthFlow: googleAuth } = useOAuth({strategy: "oauth_google"})
  const { startOAuthFlow: appleAuth } = useOAuth({strategy: "oauth_apple"})

  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    console.log("pressed")
    console.log(isLoaded)
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  }

  const onSelectAuth = async (strategy: Strategy) => {
    const seletedAuth = {
        [Strategy.Google]: googleAuth,
        [Strategy.Apple]: appleAuth,
    }[strategy]

    try {
        const { createdSessionId, setActive } = await seletedAuth()

        if (createdSessionId) {
            setActive!({ session: createdSessionId})
            router.push("/(tabs)")
        }
    } catch (err) {
        console.error("OAuth error: ", err)
    }
  }

  return (
    <View style={styles.container}>
        <Spinner visible={loading} />
            <View style={{gap: 20}}>
                <TextInput autoCapitalize="none" placeholder="email@gmail.com" value={emailAddress} onChangeText={setEmailAddress} style={defaultStyles.inputField} />
                <TextInput placeholder="password" value={password} onChangeText={setPassword} secureTextEntry style={defaultStyles.inputField} />

                <TouchableOpacity style={styles.btnOutline} onPress={onSignInPress}>
                    <Text style={styles.btnOutlineText}>Login</Text>
                </TouchableOpacity>
                {/* <Button onPress={onSignInPress} title="Login" color={'#6c47ff'}></Button> */}

                <Link href="/reset" asChild>
                    <Pressable style={styles.btnOutline}>
                        <Text style={styles.btnOutlineText}>Forgot password?</Text>
                    </Pressable>
                </Link>
                <Link href="/register" asChild>
                    <Pressable style={styles.btnOutline}>
                        <Text style={styles.btnOutlineText}>Create Account</Text>
                    </Pressable>
                </Link>
            </View>
        <View style={styles.seperatorView}>
            <View style={{
                flex: 1,
                borderBottomColor: '#000',
                borderBottomWidth: StyleSheet.hairlineWidth,
            }}/>
            <Text style={styles.seperator}>or</Text>
            <View style={{
                flex: 1,
                borderBottomColor: '#000',
                borderBottomWidth: StyleSheet.hairlineWidth,
            }}/>
        </View>

        <View style={{ gap: 20 }}>
            <TouchableOpacity style={styles.btnOutlineClerk} onPress={() => onSelectAuth(Strategy.Google)}>
                <Ionicons name='md-logo-google' style={[defaultStyles.btnIcon]} size={24}/>
                <Text style={styles.btnOutlineText}>Continue with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnOutlineClerk} onPress={() => onSelectAuth(Strategy.Apple)}>
                <Ionicons name='md-logo-apple' style={[defaultStyles.btnIcon]} size={24}/>
                <Text style={styles.btnOutlineText}>Continue with Apple</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 26,
    },
    seperatorView: {
        flexDirection: "row",
        gap: 10,
        alignItems: 'center',
        marginVertical: 30,
    },
    seperator: {
        fontFamily: "mon-sb",
        color: Colors.grey,
    },
    btnOutline: {
        backgroundColor: "#9370DB",
        borderWidth: 1,
        borderColor: Colors.grey,
        height: 50,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        paddingHorizontal: 10,
    },
    btnOutlineClerk: {
        backgroundColor: "#C71585",
        borderWidth: 1,
        borderColor: Colors.grey,
        height: 50,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        paddingHorizontal: 10,
    },
    btnOutlineText: {
        color: "#000",
        fontSize: 16,
        fontFamily: "mon-sb",
    },
})

export default Page