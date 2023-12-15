import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { defaultStyles } from '../../constants/Styles'
import Colors from '../../constants/Colors'

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
      <ScrollView style={styles.container}>
        <Text style={styles.card}>{groupList[0]}</Text>
        <Text style={styles.card}>{groupList[1]}</Text>
        <Text style={styles.card}>{groupList[2]}</Text>
        <Text style={styles.card}>{groupList[3]}</Text>
        <Text style={styles.card}>{groupList[4]}</Text>
        <Text style={styles.card}>{groupList[0]}</Text>
        <Text style={styles.card}>{groupList[1]}</Text>
        <Text style={styles.card}>{groupList[2]}</Text>
        <Text style={styles.card}>{groupList[3]}</Text>
        <Text style={styles.card}>{groupList[4]}</Text>
      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: 130,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
          width: 1,
          height: 10,
        }
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 24,
    },
    header: {
      fontFamily: 'mon-b',
      fontSize: 24,
    },
    card: {
      backgroundColor: '#fff',
      padding: 24,
      borderRadius: 16,
      marginHorizontal: 24,
      marginTop: 24,
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 6,
      shadowOffset: {
        width: 1,
        height: 2,
      },
      alignItems: 'center',
      gap: 14,
      marginBottom: 24,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: Colors.grey,
    },
    editRow: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
  });
export default Page