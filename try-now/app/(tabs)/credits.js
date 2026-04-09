import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import api from "../../services/api";

const plans = [
  {
    id: "starter",
    name: "Starter",
    credits: 15,
    price: "₹99",
    popular: false,
  },
  {
    id: "popular",
    name: "Popular",
    credits: 40,
    price: "₹199",
    popular: true,
  },
  {
    id: "pro",
    name: "Pro",
    credits: 110,
    price: "₹499",
    popular: false,
  },
];

export default function Credits() {
  const handlePurchase = async (planId) => {
    try {
      const res = await api.post("/credits/order", {
        plan: planId,
      });

      Alert.alert(
        "Order Created",
        `Order ID: ${res.data.orderId}`
      );

      // Razorpay Integration Here
    } catch (err) {
      Alert.alert(
        "Purchase Failed",
        err.response?.data?.error || "Something went wrong"
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Buy Credits</Text>

        <Text style={styles.subheading}>
          Unlock more AI generations with premium credit packs.
        </Text>

        {plans.map((plan) => (
          <View
            key={plan.id}
            style={[
              styles.planCard,
              plan.popular && styles.popularCard,
            ]}
          >
            {plan.popular && (
              <View style={styles.popularBadge}>
                <Text style={styles.popularText}>MOST POPULAR</Text>
              </View>
            )}

            <Text style={styles.planName}>{plan.name}</Text>

            <Text style={styles.creditCount}>
              {plan.credits} Credits
            </Text>

            <Text style={styles.price}>{plan.price}</Text>

            <View style={styles.features}>
              <Feature text="High Quality AI Output" />
              <Feature text="Fast Processing" />
              <Feature text="Commercial Use Allowed" />
            </View>

            <TouchableOpacity
              style={styles.buyBtn}
              onPress={() => handlePurchase(plan.id)}
            >
              <Ionicons name="wallet" size={18} color="#000" />
              <Text style={styles.buyBtnText}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function Feature({ text }) {
  return (
    <View style={styles.featureRow}>
      <Ionicons
        name="checkmark-circle"
        size={16}
        color="#00FF99"
      />
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#050505",
  },

  container: {
    padding: 18,
    paddingBottom: 120,
  },

  heading: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
  },

  subheading: {
    color: "#777",
    marginTop: 8,
    marginBottom: 24,
    fontSize: 14,
    lineHeight: 22,
  },

  planCard: {
    backgroundColor: "#111",
    borderRadius: 24,
    padding: 22,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#1A1A1A",
  },

  popularCard: {
    borderColor: "#00FF99",
  },

  popularBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#00FF99",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 30,
    marginBottom: 14,
  },

  popularText: {
    color: "#000",
    fontSize: 11,
    fontWeight: "800",
  },

  planName: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },

  creditCount: {
    color: "#00FF99",
    fontSize: 16,
    marginTop: 8,
  },

  price: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "800",
    marginTop: 12,
  },

  features: {
    marginTop: 18,
    gap: 10,
  },

  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  featureText: {
    color: "#AAA",
    fontSize: 13,
  },

  buyBtn: {
    marginTop: 22,
    backgroundColor: "#00FF99",
    paddingVertical: 15,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  buyBtnText: {
    color: "#000",
    fontWeight: "800",
    fontSize: 15,
  },
});