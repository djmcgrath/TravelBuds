import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { defaultStyles } from '../../constants/Styles'
import Colors from '../../constants/Colors'
import useUserStore from '../../storeStates/userState'
import { useAuth } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'

const Page = () => {
    const { userSt } = useUserStore()
    const { isSignedIn } = useAuth()
    const router = useRouter()
    const {setUserPost} = useUserStore()

    // console.log("User Info:", userSt.user_groups[0].groups.posts.body)
    
    // useEffect(() => {
    //   if(userSt.user_groups.length > 0){
    //     if(isSignedIn && userSt.user_groups[0].user_id === userSt.id){
    //       fetch(`http://localhost:5555/usergroups/${userSt.id}`)
    //       .then((res) => res.json())
    //       .then((data) => {
    //         console.log("USER GROUPS:", data)
    //         setUserGroup(data)
    //       })
    //       .catch((error) => {
    //         console.error('Error:', error)
    //       })
    //     }
    //   }
    // }, [isSignedIn])
    // {() => {router.push('/(tabs)/group')}}

    function goToPosts (item) {
      setUserPost(item.groups.posts)
      router.push('/(tabs)/group')
    }
  
    function handleGroupNameList () {
      if (userSt.user_groups.length > 0){
        if(isSignedIn ){
          let groupName = userSt.user_groups.map((item) => {
              return (
                // console.log("item:", item)
                <TouchableOpacity onPress={() => goToPosts(item)}>
                  <Text style={styles.card}>{item.groups.group_name}</Text>
                </TouchableOpacity>
              )
            })
        return groupName
        } 
      } else {
          return (
            <Text style={styles.card}>You don't have a Group. Make one below.</Text>
          )
        }
      }
    
    
    
    return (
      <SafeAreaView style={defaultStyles.container}>
        <View>
            <Text style={{ fontSize: 25, textAlign: "center", fontFamily: "mon-sb"}}>Welcome {userSt["first_name"]} {userSt["last_name"]}</Text>
        </View>
        <ScrollView style={styles.container}>
          {handleGroupNameList()}
        </ScrollView>
        {/* <View>
            <Text style={styles.title}> Create a New Group</Text>
            <TextInput />
        </View> */}
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