import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import api from "../../services/api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/user/profile");
      setUser(res.data);
    } catch (err) {
      console.log("Profile Error:", err.response?.data);
      Alert.alert("Error", "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      router.replace("/login");
    } catch {
      Alert.alert("Error", "Logout failed");
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loader}>
        <ActivityIndicator size="large" color="#00FF99" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </Text>
          </View>

          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.email}>{user?.email}</Text>

          <View style={styles.planBadge}>
            <Text style={styles.planText}>
              {user?.plan || "Free"} Member
            </Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="wallet" size={22} color="#00FF99" />
            <Text style={styles.statValue}>{user?.credits ?? 0}</Text>
            <Text style={styles.statLabel}>Credits</Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="sparkles" size={22} color="#00FF99" />
            <Text style={styles.statValue}>{user?.plan || "Free"}</Text>
            <Text style={styles.statLabel}>Current Plan</Text>
          </View>
        </View>

        {/* Menu */}
        <View style={styles.menuSection}>
          <MenuItem icon="person-outline" title="Edit Profile" />
          <MenuItem icon="images-outline" title="My Generations" />
          <MenuItem icon="card-outline" title="Billing & Credits" />
          <MenuItem icon="settings-outline" title="Settings" />
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#FF4D4D" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function MenuItem({ icon, title }) {
  return (
    <TouchableOpacity style={styles.menuItem}>
      <View style={styles.menuLeft}>
        <Ionicons name={icon} size={20} color="#00FF99" />
        <Text style={styles.menuText}>{title}</Text>
      </View>

      <Ionicons name="chevron-forward" size={18} color="#666" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#050505",
  },

  container: {
    padding: 20,
    paddingBottom: 140,
    backgroundColor: "#050505",
    flexGrow: 1,
  },

  loader: {
    flex: 1,
    backgroundColor: "#050505",
    justifyContent: "center",
    alignItems: "center",
  },

  profileCard: {
    backgroundColor: "#111",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#1A1A1A",
  },

  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: "#00FF99",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },

  avatarText: {
    fontSize: 32,
    fontWeight: "800",
    color: "#000",
  },

  name: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },

  email: {
    color: "#888",
    marginTop: 4,
    fontSize: 14,
  },

  planBadge: {
    marginTop: 14,
    backgroundColor: "rgba(0,255,153,0.15)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 30,
  },

  planText: {
    color: "#00FF99",
    fontWeight: "600",
  },

  statsContainer: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 24,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#111",
    padding: 18,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1A1A1A",
  },

  statValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 8,
  },

  statLabel: {
    color: "#777",
    fontSize: 12,
    marginTop: 4,
  },

  menuSection: {
    backgroundColor: "#111",
    borderRadius: 22,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#1A1A1A",
  },

  menuItem: {
    paddingHorizontal: 18,
    paddingVertical: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  menuText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
  },

  logoutBtn: {
    marginTop: 24,
    marginBottom: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    padding: 16,
    borderRadius: 18,
    backgroundColor: "#111",
    borderWidth: 1,
    borderColor: "#2A1212",
  },

  logoutText: {
    color: "#FF4D4D",
    fontWeight: "700",
    fontSize: 15,
  },
});