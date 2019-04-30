import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Animated, Dimensions } from 'react-native'
import moment from 'moment'
import FadeIn from '../Animation/FadeIn'

class CardItem extends React.Component {

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
    const { card, displayDetailForCard } = this.props
    return (
      <View>
        <TouchableOpacity
          style={styles.main_container}
          onPress={() => displayDetailForCard(card.id)}>
          <Image
            style={styles.image}
            source={{uri: card.imageUrl}}
          />
          {/* <View style={styles.content_container}>
            <View style={styles.header_container}>
              <Text style={styles.title_text}>{card.title}</Text>
              <Text style={styles.vote_text}>{card.vote_average}</Text>
            </View>
            <View style={styles.description_container}>
              <Text style={styles.description_text} numberOfLines={6}>{card.overview}</Text>
            </View>
            <View style={styles.date_container}>
              <Text style={styles.date_text}>Sorti le {moment(new Date(card.release_date)).format('DD/MM/YYYY')}</Text>
            </View>
          </View> */}
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: 'row'
  },
  image: {
    width: 120,
    height: 180,
    margin: 5
  },
  content_container: {
    flex: 1,
    margin: 5
  },
  header_container: {
    flex: 3,
    flexDirection: 'row'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666'
  },
  description_container: {
    flex: 7
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666'
  },
  date_container: {
    flex: 1
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14
  },
  favorite_image: {
    width: 25,
    height: 25,
    marginRight: 5
  }
})

export default CardItem