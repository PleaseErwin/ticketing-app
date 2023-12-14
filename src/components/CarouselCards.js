import React from 'react'
import { View, TouchableOpacity, StyleSheet, Image, Text, Dimensions } from "react-native"
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { useNavigation } from '@react-navigation/native';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const CarouselCards = ({ data }) => {
  const navigation = useNavigation();

  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);

  return (
    <View>
      {data.length > 0 ?
        <View>
          <Carousel
            layout="default"
            ref={isCarousel}
            data={data}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity onPress={() => navigation.navigate('ShowInfo', { item: item })}>
                  <View style={styles.container} key={index}>
                    <Image
                      source={{ uri: `data:image/jpg;base64,${item.imgEncode}` }}
                      style={styles.image}
                    />
                    <Text numberOfLines={1} style={styles.header}>{item.showname}</Text>
                    <Text />

                    <View style={{ marginLeft: 20, marginRight: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        {item.reservedSeat.map((seat, i) => {
                          return (
                            <Text key={i} style={styles.body}>A{seat.seatid}  </Text>
                          );
                        })}
                      </View>
                      <Text style={styles.body}>{item.showdate}</Text>
                    </View>

                  </View>
                </TouchableOpacity>
              )
            }}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            onSnapToItem={(index) => setIndex(index)}
            useScrollView={true}
          />
          <Pagination
            dotsLength={data.length}
            activeDotIndex={index}
            carouselRef={isCarousel}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.92)'
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            tappableDots={true}
          />
        </View>
        : <Text>보유중인 티켓이 없습니다.</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: ITEM_WIDTH,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginTop: 70,
  },
  image: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    width: ITEM_WIDTH,
    height: 300,
  },
  header: {
    color: "#222",
    fontSize: 22,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20
  },
  body: {
    color: "#222",
    fontSize: 16,
  }
})

export default CarouselCards;