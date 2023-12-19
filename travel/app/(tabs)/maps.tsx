import { View, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'


const Page = () => {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} provider={PROVIDER_GOOGLE}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    }
})
export default Page