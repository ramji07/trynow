import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Home() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Hero Section */}
        <View style={styles.heroCard}>
          <Text style={styles.smallLabel}>AI FASHION STUDIO</Text>

          <Text style={styles.heroTitle}>
            Transform Your Outfit With{" "}
            <Text style={styles.highlight}>AI Magic</Text>
          </Text>

          <Text style={styles.heroSubtitle}>
            Upload your photo, describe your style, and generate stunning AI
            outfit transformations instantly.
          </Text>

          <TouchableOpacity
            style={styles.generateBtn}
            onPress={() => router.push("/generate")}
          >
            <Ionicons name="sparkles" size={18} color="#000" />
            <Text style={styles.generateText}>Generate Now</Text>
          </TouchableOpacity>
        </View>

        {/* Feature Cards */}
        <View style={styles.grid}>
          <FeatureCard icon="flash" title="Fast AI" subtitle="Generate in seconds" />
          <FeatureCard icon="images" title="HD Output" subtitle="High quality edits" />
          <FeatureCard icon="shirt" title="Fashion Styles" subtitle="Multiple outfit looks" />
          <FeatureCard icon="wallet" title="Credits" subtitle="Affordable pricing" />
        </View>

        {/* How It Works */}
        <Text style={styles.sectionTitle}>How It Works</Text>

        <StepCard
          number="1"
          title="Upload Photo"
          desc="Choose your outfit image from gallery."
        />
        <StepCard
          number="2"
          title="Describe Style"
          desc="Tell AI what fashion look you want."
        />
        <StepCard
          number="3"
          title="Generate"
          desc="Receive realistic AI edited outfit."
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function FeatureCard({ icon, title, subtitle }) {
  return (
    <View style={styles.featureCard}>
      <Ionicons name={icon} size={22} color="#00FF99" />
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureSubtitle}>{subtitle}</Text>
    </View>
  );
}

function StepCard({ number, title, desc }) {
  return (
    <View style={styles.stepCard}>
      <View style={styles.stepNumber}>
        <Text style={styles.stepNumberText}>{number}</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.stepTitle}>{title}</Text>
        <Text style={styles.stepDesc}>{desc}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#050505",
  },

  container: {
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 120,
    backgroundColor: "#050505",
  },

  heroCard: {
    backgroundColor: "#111",
    padding: 24,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#1A1A1A",
    marginBottom: 22,
  },

  smallLabel: {
    color: "#00FF99",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 10,
  },

  heroTitle: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "800",
    lineHeight: 40,
  },

  highlight: {
    color: "#00FF99",
  },

  heroSubtitle: {
    color: "#888",
    fontSize: 14,
    lineHeight: 22,
    marginTop: 14,
  },

  generateBtn: {
    marginTop: 20,
    backgroundColor: "#00FF99",
    paddingVertical: 15,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  generateText: {
    color: "#000",
    fontWeight: "800",
    fontSize: 15,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  featureCard: {
    width: "48%",
    backgroundColor: "#111",
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#1A1A1A",
  },

  featureTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    marginTop: 12,
  },

  featureSubtitle: {
    color: "#777",
    fontSize: 12,
    marginTop: 4,
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 14,
  },

  stepCard: {
    backgroundColor: "#111",
    padding: 18,
    borderRadius: 18,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderWidth: 1,
    borderColor: "#1A1A1A",
  },

  stepNumber: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#00FF99",
    justifyContent: "center",
    alignItems: "center",
  },

  stepNumberText: {
    color: "#000",
    fontWeight: "800",
  },

  stepTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },

  stepDesc: {
    color: "#777",
    fontSize: 13,
    marginTop: 4,
  },
});