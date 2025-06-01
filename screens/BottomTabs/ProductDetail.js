import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const windowWidth = Dimensions.get("window").width;

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;
  const [selectedSize, setSelectedSize] = useState("42");
  const sizes = ["41", "42", "43", "44", "45"];

  const handleAddToCart = () => {
    navigation.navigate("Cart");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>PRODUCT DETAILS</Text>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageWrapper}>
          <Image
            source={{
              uri:
                product?.image ||
                "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-mens-shoes-KkLcGR.png",
            }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        {/* Slider Indicator */}
        <View style={styles.indicator}>
          <View style={styles.indicatorDot} />
        </View>

        {/* Product Info */}
        <View style={styles.details}>
          <Text style={styles.rating}>
            ⭐ 5.0 <Text style={styles.reviewCount}>(124 reviews)</Text>
          </Text>
          <Text style={styles.title}>
            {product?.name || "Air Jordan 1 Low Fragment\nX Travis Scott"}
          </Text>
          <Text style={styles.byline}>
            By <Text style={styles.brand}>Nike Official </Text>
            <Ionicons name="checkmark-circle" size={14} color="#3B82F6" />
          </Text>

          <Text style={styles.sectionTitle}>DESCRIPTION :</Text>
          <Text style={styles.description}>
            It's the Rare Sneaker That Satisfies The "Rule Of Three"—Sometimes, Having Three...{" "}
            <Text style={styles.readMore}>Read More</Text>
          </Text>

          <Text style={styles.sectionTitle}>SIZE :</Text>
          <View style={styles.sizeRow}>
            {sizes.map((sz) => (
              <TouchableOpacity
                key={sz}
                style={[styles.sizeBox, selectedSize === sz && styles.selectedSize]}
                onPress={() => setSelectedSize(sz)}
              >
                <Text
                  style={[styles.sizeText, selectedSize === sz && styles.selectedSizeText]}
                >
                  {sz}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.price}>Br 145.26</Text>
        <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
          <Text style={styles.cartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
  },
  scroll: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#1A1A1A",
  },
  headerText: {
    fontSize: 14,
    fontFamily: "Outfit_600SemiBold",
    color: "#fff",
  },
  imageWrapper: {
    width: windowWidth,
    backgroundColor: "#1F1F1F",
    paddingTop: 10,
    alignItems: "center",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 280,
  },
  indicator: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 16,
  },
  indicatorDot: {
    width: 30,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#DB2777",
  },
  details: {
    paddingHorizontal: 24,
  },
  rating: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 4,
    fontFamily: "Outfit_400Regular",
  },
  reviewCount: {
    color: "#ccc",
  },
  title: {
    fontSize: 22,
    fontFamily: "Outfit_600SemiBold",
    color: "#fff",
    marginBottom: 6,
    lineHeight: 28,
  },
  byline: {
    fontSize: 13,
    color: "#bbb",
    marginBottom: 20,
    fontFamily: "Outfit_400Regular",
  },
  brand: {
    color: "#DB2777",
    fontFamily: "Outfit_600SemiBold",
  },
  sectionTitle: {
    fontSize: 13,
    color: "#ccc",
    marginTop: 16,
    fontFamily: "Outfit_600SemiBold",
  },
  description: {
    fontSize: 13,
    color: "#aaa",
    fontFamily: "Outfit_400Regular",
    marginTop: 4,
  },
  readMore: {
    color: "#DB2777",
    fontFamily: "Outfit_600SemiBold",
  },
  sizeRow: {
    flexDirection: "row",
    marginTop: 12,
    flexWrap: "wrap",
    gap: 10,
  },
  sizeBox: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#333",
    backgroundColor: "#1F1F1F",
  },
  sizeText: {
    fontFamily: "Outfit_400Regular",
    color: "#aaa",
  },
  selectedSize: {
    backgroundColor: "#DB2777",
    borderColor: "#DB2777",
  },
  selectedSizeText: {
    color: "#fff",
    fontFamily: "Outfit_600SemiBold",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#1A1A1A",
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  price: {
    fontSize: 20,
    fontFamily: "Outfit_600SemiBold",
    color: "#fff",
  },
  cartButton: {
    backgroundColor: "#DB2777",
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 14,
  },
  cartButtonText: {
    color: "#fff",
    fontFamily: "Outfit_600SemiBold",
    fontSize: 15,
  },
});
