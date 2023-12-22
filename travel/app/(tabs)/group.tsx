import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { defaultStyles } from '../../constants/Styles'
import Colors from '../../constants/Colors'
import useUserStore from '../../storeStates/userState'

const Page = () => {
  const {userSt} = useUserStore()
  const {userPost} = useUserStore()

  console.log("userInfo:", userSt)

//   console.log("userst:", userSt.id)
//   let groupPosts = userGroup.map((item) => {
//     return (
//         <Text style={styles.card}>{item.title} {item.body}</Text>
//     )
//   })

    
  return (
    <SafeAreaView style={defaultStyles.container}>
        <View>
            <Text style={{ fontSize: 25, textAlign: "center", fontFamily: "mon-sb"}}>Posts</Text>
        </View>
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{userPost.title}</Text>
            <Text style={styles.text} >{userPost.body}</Text>
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
      fontFamily: "mon"
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
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 20,
      },
  });

export default Page