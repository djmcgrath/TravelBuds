import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'

const Page = () => {

  const [group, setGroup] = useState([])

  

  useEffect(() => {
    fetch("http://localhost:5555/groups")
    .then((res) => res.json())
    .then((data) => {setGroup(data)})
  }, [])

  let groupList = group.map((groupItem) => groupItem['group_name'])

  return (
    <View>
      <Text>{groupList}</Text>
    </View>
  )
}

export default Page