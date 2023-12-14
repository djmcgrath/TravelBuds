import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { defaultStyles } from '../../constants/Styles'

const Page = () => {
  return (
    <SafeAreaView style={defaultStyles.container}>
      <Text>Map</Text>
    </SafeAreaView>
  )
}

export default Page