import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
  Animated,
  Easing,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

const orders = [
  {
    id: "#ORD12345",
    date: "2025-05-01",
    total: "Br 145.26",
    status: "Out for Delivery",
    progress: 2,
    items: [
      {
        name: "Hibiki Whisky",
        qty: 1,
        image:
          "https://images.sampletemplates.com/wp-content/uploads/2023/10/Hibiki-Whisky-Bottle.png",
      },
      {
        name: "Latte 400ml",
        qty: 2,
        image:
          "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20221011_CaramelBruleeLatte.jpg",
      },
    ],
  },
  {
    id: "#ORD12344",
    date: "2025-04-27",
    total: "Br 79.99",
    status: "Delivered",
    progress: 3,
    items: [
      {
        name: "Tom Ford Portofino",
        qty: 1,
        image:
          "https://cdn.notinoimg.com/images/products/small/TFOTFPBE/418368/tom-ford-neroli-portofino-eau-de-parfum-unisex__234871.jpg",
      },
    ],
  },
];

export default function OrderScreen() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.out(Easing.exp),
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Orders</Text>

      {orders.map((order, idx) => (
        <View key={idx} style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.orderId}>{order.id}</Text>
            <Text style={styles.orderDate}>{order.date}</Text>
          </View>
          <Text style={styles.total}>Total: {order.total}</Text>

          <View style={styles.tracker}>
            {["Ordered", "Shipped", "Out for Delivery", "Delivered"].map((step, i) => (
              <View key={i} style={styles.trackerStep}>
                <Animated.View
                  style={[
                    styles.circle,
                    i <= order.progress && styles.activeCircle,
                    i <= order.progress && {
                      transform: [
                        {
                          scale: progressAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.8, 1],
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  {i <= order.progress ? (
                    <Ionicons name="checkmark" size={12} color="#fff" />
                  ) : (
                    <Text style={styles.circleText}>{i + 1}</Text>
                  )}
                </Animated.View>
                <Text style={[styles.stepLabel, i <= order.progress && styles.activeLabel]}>
                  {step}
                </Text>
                {i < 3 && (
                  <Animated.View
                    style={[
                      styles.line,
                      i < order.progress && styles.activeLine,
                      {
                        width: progressAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: ["0%", "100%"],
                        }),
                      },
                    ]}
                  />
                )}
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={styles.detailsBtn}
            onPress={() => {
              setSelectedOrder(order);
              setModalVisible(true);
            }}
          >
            <Text style={styles.detailsText}>View Details</Text>
            <Feather name="arrow-right" size={16} color="#DB2777" />
          </TouchableOpacity>
        </View>
      ))}

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Order Details</Text>
            {selectedOrder?.items?.map((item, idx) => (
              <View key={idx} style={styles.modalItem}>
                <Image source={{ uri: item.image }} style={styles.modalImage} />
                <View>
                  <Text style={styles.modalItemName}>{item.name}</Text>
                  <Text style={styles.modalQty}>Qty: {item.qty}</Text>
                </View>
              </View>
            ))}
            <Text style={styles.modalSummary}>
              Total: <Text style={{ fontWeight: "bold" }}>{selectedOrder?.total}</Text>
            </Text>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1C1C1E", padding: 20 },
  title: {

    fontSize: 20,
    fontFamily: "Outfit_600SemiBold",
    color: "#fff",
    marginBottom: 20,
    marginTop: 20,
  },
  card: {
    backgroundColor: "#2D2D30",
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderId: {
    fontFamily: "Outfit_600SemiBold",
    color: "#DB2777",
  },
  orderDate: {
    fontFamily: "Outfit_400Regular",
    fontSize: 13,
    color: "#aaa",
  },
  total: {
    fontSize: 14,
    marginTop: 6,
    fontFamily: "Outfit_600SemiBold",
    color: "#fff",
  },
  tracker: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  trackerStep: {
    alignItems: "center",
    flex: 1,
    position: "relative",
  },
  circle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: "#888",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1C1C1E",
  },
  activeCircle: {
    backgroundColor: "#DB2777",
    borderColor: "#DB2777",
  },
  circleText: {
    fontSize: 12,
    color: "#aaa",
    fontFamily: "Outfit_600SemiBold",
  },
  stepLabel: {
    fontSize: 10,
    marginTop: 4,
    textAlign: "center",
    color: "#888",
    fontFamily: "Outfit_400Regular",
  },
  activeLabel: {
    color: "#DB2777",
    fontFamily: "Outfit_600SemiBold",
  },
  line: {
    position: "absolute",
    top: 12,
    left: "50%",
    right: "-50%",
    height: 2,
    backgroundColor: "#444",
    zIndex: -1,
  },
  activeLine: {
    backgroundColor: "#DB2777",
  },
  detailsBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  detailsText: {
    color: "#DB2777",
    fontFamily: "Outfit_600SemiBold",
    marginRight: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "85%",
    backgroundColor: "#2D2D30",
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Outfit_600SemiBold",
    color: "#fff",
    marginBottom: 20,
  },
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  modalImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#444",
  },
  modalItemName: {
    fontSize: 14,
    fontFamily: "Outfit_600SemiBold",
    color: "#fff",
  },
  modalQty: {
    fontSize: 12,
    fontFamily: "Outfit_400Regular",
    color: "#aaa",
  },
  modalSummary: {
    fontSize: 16,
    fontFamily: "Outfit_600SemiBold",
    color: "#fff",
    marginTop: 20,
  },
  closeBtn: {
    marginTop: 20,
    backgroundColor: "#DB2777",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  closeText: {
    color: "#fff",
    fontFamily: "Outfit_600SemiBold",
  },
});
