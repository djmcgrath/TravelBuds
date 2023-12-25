import { 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
  RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { defaultStyles } from '../../constants/Styles'
import Colors from '../../constants/Colors'
import useUserStore from '../../storeStates/userState'
import { useAuth } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import useUniversalRefresh from '../../storeStates/universalRefresh'

const Page = () => {
    const { userSt } = useUserStore()
    const { isSignedIn } = useAuth()
    const router = useRouter()
    const { setUserPost } = useUserStore()
    const [form, setForm] = useState("")
    const [patchForm, setPatchForm] = useState("")
    // const { state, changeState } = useUniversalRefresh()
    
    console.log("Just Checking:", userSt)
    
    const handleGroupPost = async () => {
      if(isSignedIn){
        fetch("http://localhost:5555/groups", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"},
          body: JSON.stringify({
            group_name: form,
            user_id: userSt.id
          })
        })
        .then((res) => res.json())
        .then((data) => {
          setUserPost(data)
          changeState()
        })
      }
    }

    function handleGroupPatch (item: { groups: { id: any } }) {
      if(isSignedIn){
        fetch(`http://localhost:5555/groups/${item.groups.id}`, {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"},
          body: JSON.stringify({
            group_name: patchForm,
          })
        })
        .then((res) => res.json())
        .then((data) => {
          setUserPost(data)
          changeState()
        })
      }
    }

    function handleGroupDelete (item) {
      if(isSignedIn){
        fetch(`http://localhost:5555/groups/${item.groups.id}`, {
          method: "DELETE"
        })
        .then(res => res.json())
        .then((data) => {
          setUserPost(data)
          changeState()
        })
      }
    }
    

    function goToPosts (item) {
      if (item.groups.posts === null) {
        router.push('/(tabs)/group')
      } else {
        setUserPost(item.groups.posts)
        router.push('/(tabs)/group')
      }
      
    }
  
    function handleGroupNameList () {
      const [edit, setEdit] = useState(false)
        if(isSignedIn && userSt.user_groups.length > 0 ){
          let groupName = userSt.user_groups.map((item) => {
              return (
                <View>
                  {!edit && (
                    <View style={styles.editRow}>
                      <TouchableOpacity onPress={() => goToPosts(item)}>
                        <Text style={styles.card}>{item.groups.group_name} </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setEdit(true)}>
                        <Ionicons name="create-outline" size={24} color={Colors.dark} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleGroupDelete(item)}>
                        <MaterialCommunityIcons name="delete" size={24} color={Colors.dark} />
                      </TouchableOpacity>
                    </View>
                  )}
                  {edit && (
                    <View style={styles.editRow}>
                      <TextInput
                        key={item.groups.id}
                        placeholder="First Name"
                        value={patchForm}
                        onChangeText={setPatchForm}
                        style={[defaultStyles.inputField, { width: 100 }]}
                      />
                      <TouchableOpacity onPress={() =>{ handleGroupPatch(item); setEdit(false)}}>
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
          <Text style={{ fontSize: 25, textAlign: "center", fontFamily: "mon-sb"}}>Welcome {userSt["first_name"]} {userSt["last_name"]}</Text>
        </View>
        <ScrollView style={styles.container} >
          {handleGroupNameList()}
        </ScrollView>
        <View style={{gap: 10}}>
          <Text style={styles.title}> Create a New Group</Text>
          <TextInput  
            placeholder="Group name"  
            value={form}
            style={defaultStyles.inputField}
            onChangeText={setForm} 
          />
          <TouchableOpacity style={styles.btnOutlineClerk} onPress={() => handleGroupPost()} >
              <Text style={styles.btnOutlineText}>Add New Group</Text>
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
        marginBottom: 2,
        fontFamily: "mon",
        flexDirection: "row",
      },
      avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.grey,
      },
      editRow: {
        flex: 1,
        padding: 24,
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
    deletebtn: {
      backgroundColor: "#C71585",
      borderWidth: 1,
      borderColor: Colors.grey,
      height: 40,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      padding: 2,
      marginHorizontal: 24,
      marginTop: 0,
    },
    });
  

export default Page