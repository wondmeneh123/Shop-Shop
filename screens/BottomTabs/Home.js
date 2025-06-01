import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Feather, FontAwesome5 } from "@expo/vector-icons";
import { Dimensions } from "react-native";

export default function HomeScreen({ navigation }) {
  const { width } = Dimensions.get("window");

  const bannerImages = [
    "https://cdn.pixabay.com/photo/2022/11/25/07/03/shopping-7614446_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/08/06/00/14/people-2583493_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/09/02/12/45/shoes-918372_1280.jpg",
  ];
  const products = [
    {
      id: 1,
      name: "Nike Air Max",
      price: "Br 129.99",
      rating: 4.5,
      reviews: 124,
      image:
        "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-mens-shoes-KkLcGR.png",
    },
    {
      id: 2,
      name: "Adidas Ultraboost",
      price: "Br 179.99",
      rating: 4.8,
      reviews: 89,
      image:
        "https://assets.adidas.com/images/w_600,f_auto,q_auto/2c1a1a0c0c0c4c0c0c0c0c0c0c0c0c0c_9366/Ultraboost_22_Shoes_Black_GZ0127_01_standard.jpg",
    },
    {
      id: 3,
      name: "Puma RS-X",
      price: "Br 99.99",
      rating: 4.2,
      reviews: 56,
      image:
        "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/374915/01/sv01/fnd/PNA/fmt/png/RS-X-3D-Sneakers",
    },
    {
      id: 4,
      name: "New Balance 990",
      price: "Br 149.99",
      rating: 4.7,
      reviews: 203,
      image:
        "https://nb.scene7.com/is/image/NB/m990gl3_nb_02_i?$pdpflexf2$&qlt=80&fmt=webp&wid=440&hei=440",
    },
  ];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // simulate loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.topBarWrapper}>
        <View style={styles.topBar}>
          <TouchableOpacity>
            <Feather name="menu" size={24} color="#F472B6" />
          </TouchableOpacity>
          <View style={styles.locationContainer}>
            <Text style={styles.location}>Adama</Text>
            <TouchableOpacity>
              <Feather name="bell" size={24} color="#F472B6" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Search */}
        <View style={styles.searchWrapper}>
          <Feather
            name="search"
            size={20}
            color="#ccc"
            style={{ marginRight: 10 }}
          />
          <TextInput
            placeholder="Search products, stores..."
            placeholderTextColor="#888"
            style={styles.searchInput}
          />
        </View>
        {/* <View style={styles.carouselWrapper}>
  <ScrollView
    horizontal
    pagingEnabled
    showsHorizontalScrollIndicator={false}
    style={styles.carousel}
  >
    {bannerImages.map((img, index) => (
      <Image
        key={index}
        source={{ uri: img }}
        style={styles.carouselImage}
        resizeMode="cover"
      />
    ))}
  </ScrollView>
</View> */}

        {/* Promo Card */}
        <View style={styles.promoCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.promoTitle}>Big Deal</Text>
            <Text style={styles.promoSub}>Exclusive in Jan 2025</Text>
            <Text style={styles.promoDiscount}>50% OFF</Text>
            <TouchableOpacity style={styles.promoButton}>
              <Text style={styles.promoButtonText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
          <Ionicons name="pricetag" size={70} color="#F472B6" />
        </View>

        {/* Favorite Brands */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your favorite stores</Text>
            <TouchableOpacity>
              <Text style={styles.link}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              { icon: "adn" },
              { icon: "pied-piper" },
              { icon: "apple" },
              { icon: "lastfm" },
              { icon: "neuter" },
            ].map((brand, i) => (
              <View style={styles.brandCircle} key={i}>
                <FontAwesome5 name={brand.icon} size={24} color="#F472B6" />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Product Grid */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Products</Text>
            <TouchableOpacity>
              <Text style={styles.link}>See all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.productsGrid}>
            {loading
              ? Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <View key={i} style={styles.productCard}>
                      <View style={[styles.productImage, { backgroundColor: "#1a1a1a" }]} />
                      <View style={styles.productInfo}>
                        <View style={[styles.shimmerText, { backgroundColor: "#1a1a1a" }]} />
                        <View style={[styles.shimmerTextSmall, { backgroundColor: "#1a1a1a" }]} />
                      </View>
                    </View>
                  ))
              : products.map((product) => (
                  <TouchableOpacity
                    key={product.id}
                    style={styles.productCard}
                    onPress={() => navigation.navigate("detail", { product })}
                  >
                    <Image source={{ uri: product.image }} style={styles.productImage} />
                    <View style={styles.productInfo}>
                      <Text style={styles.productName}>{product.name}</Text>
                      <Text style={styles.productPrice}>{product.price}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Inline ProductCard component
function ProductCard({ product, onPress }) {
  return (
    <TouchableOpacity style={styles.productCard} onPress={onPress}>
      <Image
        source={{ uri: product.image }}
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.productPrice}>{product.price}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  topBarWrapper: {
    backgroundColor: "#121212",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  location: {
    fontSize: 18,
    fontFamily: "Outfit_600SemiBold",
    color: "#F472B6",
  },
  scroll: {
    paddingBottom: 80,
    paddingHorizontal: 20,
  },
  shimmerText: {
    width: "80%",
    height: 14,
    borderRadius: 6,
    marginBottom: 8,
  },
  shimmerTextSmall: {
    width: "40%",
    height: 12,
    borderRadius: 6,
  },
  
  searchWrapper: {
    flexDirection: "row",
    backgroundColor: "#1F1F1F",
    borderRadius: 14,
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 25,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#eee",
    fontFamily: "Outfit_400Regular",
  },
  promoCard: {
    backgroundColor: "#1E1B24",
    borderRadius: 20,
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
    marginBottom: 25,
  },
  promoTitle: {
    fontSize: 16,
    color: "#F9A8D4",
    fontFamily: "Outfit_600SemiBold",
    marginBottom: 2,
  },
  carouselWrapper: {
    height: 160,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 25,
  },
  carousel: {
    width: "100%",
  },
  carouselImage: {
    width: Dimensions.get("window").width - 40,
    height: 160,
    borderRadius: 16,
    marginRight: 10,
  },

  promoSub: {
    fontSize: 13,
    color: "#D8B4FE",
    fontFamily: "Outfit_400Regular",
    marginBottom: 4,
  },
  promoDiscount: {
    fontSize: 22,
    fontFamily: "Outfit_600SemiBold",
    color: "#F472B6",
  },
  promoButton: {
    marginTop: 10,
    backgroundColor: "#F472B6",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  promoButtonText: {
    color: "#fff",
    fontFamily: "Outfit_600SemiBold",
    fontSize: 13,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Outfit_600SemiBold",
    color: "#eee",
  },
  link: {
    fontSize: 13,
    color: "#F472B6",
    fontFamily: "Outfit_600SemiBold",
  },
  brandCircle: {
    width: 60,
    height: 60,
    backgroundColor: "#1F1F1F",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  productCard: {
    width: "48%",
    backgroundColor: "#1C1C1E",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: 180,
    backgroundColor: "#292929",
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontFamily: "Outfit_500Medium",
    color: "#e0e0e0",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontFamily: "Outfit_600SemiBold",
    color: "#F472B6",
  },
});
