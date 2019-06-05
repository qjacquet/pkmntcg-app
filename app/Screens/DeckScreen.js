import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator } from 'react-native'

class DeckScreen extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.main_container}>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  }
})

export default DeckScreen