import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { defaultStyles } from '../../constants/Styles'
import Colors from '../../constants/Colors'
import useUserStore from '../../storeStates/userState'
import { useAuth } from '@clerk/clerk-expo'

const Page = () => {
  const [group, setGroup] = useState([])
  const { userSt } = useUserStore()
  const { isSignedIn } = useAuth()
  
    useEffect(() => {
      fetch("http://localhost:5555/groups")
      .then((res) => res.json())
      .then((data) => {setGroup(data)})
    }, [isSignedIn])
  
    
    let groupList = group?.map((groupItem: any) => {
      return (
          <Text key={groupItem["id"]} style={styles.card}> {groupItem["group_name"]!}</Text>
      )
    })

    

    return (
      <SafeAreaView style={defaultStyles.container}>
        <View>
            <Text style={{ fontSize: 25, textAlign: "center", fontFamily: "mon-sb"}}>Welcome {userSt["first_name"]} {userSt["last_name"]} {userSt.id}</Text>
        </View>
        <ScrollView style={styles.container}>
          {groupList}
        </ScrollView>
        <TouchableOpacity>
            <Text style={styles.title}> Create a New Group</Text>

        </TouchableOpacity>
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
        marginBottom: 20,
      },
    });
  

export default Page