import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Colors from '../../constants/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const Layout = () => {
  return (
    <Tabs screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarLabelStyle: {
            fontFamily: "mon-sb",
        },
    }}>
        <Tabs.Screen name='index' options={{
            tabBarLabel: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, size}) => 
            <MaterialCommunityIcons name='account' color={color} size={size}/>
        }}
        />
        <Tabs.Screen name='user_group' options={{
            tabBarLabel: "All Groups",
            headerShown: false,
            tabBarIcon: ({ color, size}) => 
            <MaterialCommunityIcons name='account-group-outline' color={color} size={size}/>
        }}
        />
        <Tabs.Screen name='group' options={{
            tabBarLabel: "Group Page",
            headerShown: false,
            tabBarIcon: ({ color, size}) => 
            <MaterialCommunityIcons name='account-group' color={color} size={size}/>
        }}
        />
        <Tabs.Screen name='maps' options={{
            tabBarLabel: "Maps",
            headerShown: false,
            tabBarIcon: ({ color, size}) => 
            <MaterialCommunityIcons name='map-marker-radius-outline' color={color} size={size}/>
        }}
        />
    </Tabs>
  )
}

export default Layout