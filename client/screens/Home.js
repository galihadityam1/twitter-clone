import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import CardComponent from '../components/CardComponent'

const Home = () => {
  return (
    <ScrollView className="bg-blue-950 h-screen w-screen">
        <CardComponent/>
        <CardComponent/>
        <CardComponent/>
    </ScrollView>
  )
}

export default Home