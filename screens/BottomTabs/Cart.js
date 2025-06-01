import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { Swipeable } from "react-native-gesture-handler";

const initialCart = [
  {
    id: 1,
    store: "HEINEMANN",
    name: "Hibiki Whisky",
    sub: "43% 0.7L",
    price: 99.9,
    originalPrice: 119.9,
    image:
      "https://images.sampletemplates.com/wp-content/uploads/2023/10/Hibiki-Whisky-Bottle.png",
    qty: 2,
  },
  {
    id: 2,
    store: "HEINEMANN",
    name: "Tom Ford Portofino",
    sub: "100 ml",
    price: 379.9,
    image:
      "https://cdn.notinoimg.com/images/products/small/TFOTFPBE/418368/tom-ford-neroli-portofino-eau-de-parfum-unisex__234871.jpg",
    qty: 1,
  },
  {
    id: 3,
    store: "STARBUCKS",
    name: "Caramel Brulée Latte",
    sub: "400 ml",
    price: 4.2,
    image:
      "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20221011_CaramelBruleeLatte.jpg",
    qty: 1,
  },
];

const CartScreen = () => {
  const [cartItems, setCartItems] = useState(initialCart);
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };
  const renderRightActions = (id) => (
    <TouchableOpacity
      onPress={() => removeItem(id)}
      style={styles.deleteButton}
    >
      <Ionicons name="trash-outline" size={22} color="#fff" />
      <Text style={styles.deleteText}>Remove</Text>
    </TouchableOpacity>
  );

  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
      )
    );
  };

  const stores = [...new Set(cartItems.map((item) => item.store))];

  const itemTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const originalTotal = cartItems.reduce(
    (acc, item) =>
      acc + (item.originalPrice ? item.originalPrice : item.price) * item.qty,
    0
  );
  const savings = originalTotal - itemTotal;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>CART</Text>
        <TouchableOpacity>
          <Text style={styles.clearText}>CLEAR CART</Text>
        </TouchableOpacity>
      </View>

      {/* Delivery Time */}
      <View style={styles.deliveryInfo}>
        <Ionicons name="time-outline" size={16} color="#DB2777" />
        <Text style={styles.deliveryText}>
          Estimated order delivery time:{" "}
          <Text style={{ fontWeight: "bold" }}>15 min</Text>
        </Text>
      </View>

      {/* Items */}
      <ScrollView style={styles.scroll}>
        {stores.map((store) => (
          <View key={store}>
            <Text style={styles.storeLabel}>
              {store} <Ionicons name="information-circle-outline" size={14} />
            </Text>
            {cartItems
              .filter((item) => item.store === store)
              .map((item) => (
                <Swipeable
                  key={item.id}
                  renderRightActions={() => renderRightActions(item.id)}
                >
                  <View style={styles.itemRow}>
                    <Image
                      source={{ uri: item.image }}
                      style={styles.itemImage}
                    />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.itemSub}>{item.sub}</Text>
                      <View style={styles.priceRow}>
                        <Text style={styles.price}>
                          Br {item.price.toFixed(2)}
                        </Text>
                        {item.originalPrice && (
                          <Text style={styles.originalPrice}>
                            Br {item.originalPrice.toFixed(2)}
                          </Text>
                        )}
                      </View>
                    </View>
                    <View style={styles.qtyControl}>
                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => decreaseQty(item.id)}
                      >
                        <Text style={styles.qtySymbol}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.qtyText}>{item.qty}</Text>
                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => increaseQty(item.id)}
                      >
                        <Text style={styles.qtySymbol}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Swipeable>
              ))}
          </View>
        ))}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>4 Items</Text>
          <Text style={styles.summaryValue}>Br {originalTotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>You save</Text>
          <Text style={styles.summaryValue}>-Br {savings.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>TOTAL</Text>
          <Text style={styles.totalValue}>Br {itemTotal.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutBtn}>
          <Text style={styles.checkoutText}>Go to Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1C1C1E" },
  header: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontFamily: "Outfit_600SemiBold",
    color: "#fff",
  },
  clearText: {
    fontSize: 13,
    fontFamily: "Outfit_600SemiBold",
    color: "#DB2777",
  },
  deliveryInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2E2E32",
    padding: 12,
    marginHorizontal: 16,
    borderRadius: 10,
    marginBottom: 8,
  },
  deliveryText: {
    marginLeft: 8,
    fontSize: 13,
    fontFamily: "Outfit_400Regular",
    color: "#DB2777",
  },
  scroll: {
    paddingHorizontal: 16,
  },
  storeLabel: {
    marginTop: 24,
    fontSize: 14,
    fontFamily: "Outfit_600SemiBold",
    color: "#fff",
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 12,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: "#333",
  },
  deleteButton: {
    backgroundColor: "#DB2777",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    marginTop: 2,
    marginBottom: 18,
    borderRadius: 12,
  },
  deleteText: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Outfit_600SemiBold",
    marginTop: 4,
  },
  
  itemName: {
    fontSize: 14,
    fontFamily: "Outfit_600SemiBold",
    color: "#fff",
  },
  itemSub: {
    fontSize: 12,
    fontFamily: "Outfit_400Regular",
    color: "#999",
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  price: {
    fontSize: 14,
    fontFamily: "Outfit_600SemiBold",
    color: "#fff",
  },
  originalPrice: {
    fontSize: 12,
    fontFamily: "Outfit_400Regular",
    color: "#888",
    textDecorationLine: "line-through",
  },
  qtyControl: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2E2E32",
    borderRadius: 30,
    paddingHorizontal: 6,
    paddingVertical: 4,
    gap: 12,
  },
  qtyBtn: {
    backgroundColor: "#DB2777",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  qtySymbol: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  qtyText: {
    fontSize: 16,
    fontFamily: "Outfit_600SemiBold",
    color: "#fff",
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#333",
    padding: 20,
    backgroundColor: "#1C1C1E",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 13,
    fontFamily: "Outfit_400Regular",
    color: "#aaa",
  },
  summaryValue: {
    fontSize: 13,
    fontFamily: "Outfit_400Regular",
    color: "#fff",
  },
  totalLabel: {
    fontSize: 16,
    fontFamily: "Outfit_600SemiBold",
    color: "#fff",
  },
  totalValue: {
    fontSize: 16,
    fontFamily: "Outfit_600SemiBold",
    color: "#fff",
  },
  checkoutBtn: {
    marginTop: 14,
    backgroundColor: "#DB2777",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  checkoutText: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "Outfit_600SemiBold",
  },
});
