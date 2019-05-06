import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Animated, Dimensions } from 'react-native'
import moment from 'moment'

class CardSetsListItem extends React.Component {

//   _displayFavoriteImage() {
//     if (this.props.isCardFavorite) {
//       // Si la props isCardFavorite vaut true, on affiche le ??
//       return (
//         <Image
//           style={styles.favorite_image}
//           source={require('../Images/ic_favorite.png')}
//         />
//       )
//     }
//   }

  render() {
	 const { cardSet, displayDetailForCardSet } = this.props
    return (
      <View>
        <TouchableOpacity
          style={styles.main_container}
          onPress={() => {}}>
          <Image
            style={styles.image}
            source={{uri: cardSet.logoUrl}}
          />
			 <Text>ddsdqs</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
	main_container: {
		height: 100,
		flexDirection: 'row'
	 },
	 image: {
		height: 50,
		width: Dimensions.get('window').width / 2,
		margin: 5
	 }
})

export default CardSetsListItem