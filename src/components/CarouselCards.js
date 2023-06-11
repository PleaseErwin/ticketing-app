import React from 'react'
import { View, TouchableOpacity, StyleSheet, Image, Text, Dimensions } from "react-native"
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { useNavigation } from '@react-navigation/native';
import Axios from 'axios';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const CarouselCards = () => {
  const navigation = useNavigation();

  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);

  const [data, setData] = React.useState([
    {
      title: "크러쉬 팬미팅",
      place: "-돔",
      time: "5/03 14:00",
      seats: "A1",
      imgUrl: "https://picsum.photos/id/11/200/300",
    },
    {
      title: "김연경 콘서트",
      place: "-돔",
      time: "5/22 18:00",
      seats: "D12",
      imgUrl: "https://picsum.photos/id/10/200/300",
    },
    {
      title: "양지은 콘서트",
      place: "-돔",
      time: "5/02 12:00",
      seats: "C5",
      imgUrl: "https://picsum.photos/id/12/200/300",
    },
  ]);

  // React.useEffect(() => {
  //   Axios.post('http://3.37.125.95:3000/main', variable)
  //     .then(response => {
  //       if (response.data.success) {// response.data = Object 형태
  //         setData(response.data.videoDetail);
  //       } else {
  //         alert('홈페이지 로딩 실패');
  //       }
  //     })
  // }, []);// 여기 useisfocused 넣으면 뒤로 가는걸로 인식될까?

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
                      source={{ uri: item.imgUrl }}
                      style={styles.image}
                    />
                    <Text style={styles.header}>{item.title}</Text>
                    <Text />
                    <Text style={styles.body}>{item.time}</Text>
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
    width: ITEM_WIDTH,
    height: 300,
  },
  header: {
    color: "#222",
    fontSize: 28,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 20
  },
  body: {
    color: "#222",
    fontSize: 18,
    paddingLeft: 25,
    paddingRight: 20
  }
})

export default CarouselCards;