import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  SafeAreaView,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../constants/index";
import React, { useEffect, useRef } from "react";
import nft08 from "../assets/images/nft08.jpg";
import nft06 from "../assets/images/nft06.jpg";
import nft04 from "../assets/images/nft04.jpg";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";

const Welcome = () => {
  const duration = 1000;
  const delay = duration + 300;

  const navigation = useNavigation();

  const fadeImagesAnimation = useRef(new Animated.Value(0)).current;
  const moveImagesAnimation = useRef(
    new Animated.ValueXY({ x: 100, y: 100 })
  ).current;

  const fadeTextAnimation = useRef(new Animated.Value(0)).current;
  const moveButtonAnimation = useRef(new Animated.Value(1)).current;

  const pressHandler = () => {
    navigation.navigate("Home");
  };

  /** Animations */
  const imagesAnimationHandler = () => {
    Animated.sequence([
      Animated.timing(fadeImagesAnimation, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
      Animated.spring(moveImagesAnimation, {
        toValue: { x: 0, y: 0 },
        duration,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const textAnimationHandler = () => {
    Animated.timing(fadeTextAnimation, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: true,
    }).start();
  };

  const buttonAnimationHandler = () => {
    Animated.spring(moveButtonAnimation, {
      toValue: 0,
      friction: 4,
      delay,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    imagesAnimationHandler();
    textAnimationHandler();
    buttonAnimationHandler();
  }, [imagesAnimationHandler, textAnimationHandler, buttonAnimationHandler]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.imageContainer,
          {
            opacity: fadeImagesAnimation,
            transform: moveImagesAnimation.getTranslateTransform(),
          },
        ]}
      >
        <View style={styles.imageCard}>
          <Image source={nft06} style={styles.image} />
        </View>
        <View style={[styles.imageCard, , { top: SIZES.medium + 17 }]}>
          <Image source={nft08} style={styles.image} />
        </View>
        <View style={styles.imageCard}>
          <Image source={nft04} style={styles.image} />
        </View>
      </Animated.View>
      <Animated.View
        style={[styles.textContainer, { opacity: fadeTextAnimation }]}
      >
        <Text style={styles.mainText}>Find, Collect and Sell Amazing NFTs</Text>
        <Text style={styles.subText}>
          Explore the top collection of NFTs and buy and sell your NFTs as well
        </Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.buttonContainer,
          {
            transform: [
              {
                translateY: moveButtonAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 200],
                }),
              },
            ],
          },
        ]}
      >
        <Button
          title="Get Started"
          pressHandler={pressHandler}
          stylesButton={styles.button}
          stylesText={styles.buttonText}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.small + 10,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  imageContainer: {
    top: -SIZES.medium,
    flexDirection: "row",
    gap: SIZES.small,
  },
  imageCard: {
    borderRadius: SIZES.medium,
    padding: SIZES.small,
    backgroundColor: COLORS.cardBg,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: SIZES.medium,
  },
  textContainer: {
    margin: SIZES.small,
    padding: SIZES.small,
    marginVertical: SIZES.xLarge + 6,
  },
  mainText: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.xLarge + 5,
    color: COLORS.white,
    textAlign: "center",
  },
  subText: {
    fontFamily: FONTS.light,
    color: COLORS.gray,
    marginTop: SIZES.large,
    textAlign: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: SIZES.xLarge + 20,
    marginVertical: SIZES.xLarge,
  },
  button: {
    backgroundColor: COLORS.second,
    borderRadius: SIZES.medium,
    alignItems: "center",
    width: 240,
    padding: SIZES.small + 4,
  },
  buttonText: {
    color: COLORS.white,
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.large,
  },
});
