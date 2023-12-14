import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { defaultStyles } from '../../constants/Styles'

const Page = () => {

  const [group, setGroup] = useState([])

  

  useEffect(() => {
    fetch("http://localhost:5555/groups")
    .then((res) => res.json())
    .then((data) => {setGroup(data)})
  }, [])

  let groupList = group.map((groupItem) => groupItem['group_name'])

  return (
    <SafeAreaView style={defaultStyles.container}>
      <Text>{groupList}</Text>
    </SafeAreaView>
  )
}

export default Page