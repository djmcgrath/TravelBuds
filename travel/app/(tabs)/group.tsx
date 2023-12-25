import { View, Text, SafeAreaView, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { defaultStyles } from '../../constants/Styles'
import Colors from '../../constants/Colors'
import useUserStore from '../../storeStates/userState'
import { useAuth } from '@clerk/clerk-expo'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

const Page = () => {
  const {userSt} = useUserStore()
  const {userPost} = useUserStore()
  const [postForm, setPostForm] = useState("")
  const { isSignedIn } = useAuth()

  console.log("userInfo:", userSt)

//   console.log("userst:", userSt.id)
//   let groupPosts = userGroup.map((item) => {
//     return (
//         <Text style={styles.card}>{item.title} {item.body}</Text>
//     )
//   })

function handlePostList () {
  const [edit, setEdit] = useState(false)
    if(isSignedIn && userSt.user_groups.length > 0 ){
      let groupName = userSt.user_groups.map((item) => {
          return (
            <View>
              {!edit && (
                <View style={styles.editRow}>
                  <TouchableOpacity >
                    <View style={styles.card}>
                      <Text style={styles.title}>{item.groups.posts.title} </Text>
                      <Text style={styles.text}>{item.groups.posts.body} </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setEdit(true)}>
                    <Ionicons name="create-outline" size={24} color={Colors.dark} />
                  </TouchableOpacity>
                  <TouchableOpacity >
                    <MaterialCommunityIcons name="delete" size={24} color={Colors.dark} />
                  </TouchableOpacity>
                </View>
              )}
              {edit && (
                <View style={styles.editRow}>
                  <TextInput
                    key={item.groups.id}
                    placeholder="First Name"
                    // value={patchForm}
                    // onChangeText={setPatchForm}
                    style={[defaultStyles.inputField, { width: 100 }]}
                  />
                  <TouchableOpacity onPress={() => setEdit(false)}>
                    <Ionicons name="checkmark-outline" size={24} color={Colors.dark} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )
        })
    return groupName
    } else {
      return (
        <ScrollView>
          <Text style={styles.card}>You don't have a Group. Make one below.</Text>
        </ScrollView>
      )
    }
  }

    
  return (
    <SafeAreaView style={defaultStyles.container}>
        <View>
            <Text style={{ fontSize: 25, textAlign: "center", fontFamily: "mon-sb"}}>Posts</Text>
        </View>
        <ScrollView style={styles.container}>
            {handlePostList()}
        </ScrollView>
        <View style={{gap: 10}}>
          <Text style={styles.title}> Create a New Post</Text>
          <TextInput  
            placeholder="Group name"  
            value={postForm}
            style={defaultStyles.inputField}
            onChangeText={setPostForm} 
          />
          <TouchableOpacity style={styles.btnOutlineClerk} >
              <Text style={styles.btnOutlineText}>Add new Post</Text>
          </TouchableOpacity>
        </View>
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
  });

export default Page