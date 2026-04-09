import { useEffect, useState, useCallback } from "react";
import {
  FlatList,
  Image,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import api from "../../services/api";

export default function History() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchImages = async () => {
    try {
      const res = await api.get("/images");
      setImages(res.data || []);
    } catch (err) {
      console.log("History Error:", err.response?.data);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchImages();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#00FF99" />
      </View>
    );
  }

  if (!images.length) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="images-outline" size={70} color="#00FF99" />
        <Text style={styles.emptyTitle}>No AI Generations Yet</Text>
        <Text style={styles.emptySubtitle}>
          Start generating outfits and your AI creations will appear here.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={images}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.list}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#00FF99"
        />
      }
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image
            source={{ uri: item.generatedImageUrl }}
            style={styles.image}
            resizeMode="cover"
          />

          {item.prompt && (
            <Text style={styles.prompt} numberOfLines={2}>
              {item.prompt}
            </Text>
          )}

          {item.category && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.category}</Text>
            </View>
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    backgroundColor: "#050505",
    justifyContent: "center",
    alignItems: "center",
  },

  list: {
    padding: 16,
    backgroundColor: "#050505",
  },

  card: {
    backgroundColor: "#111",
    borderRadius: 22,
    marginBottom: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#1A1A1A",
  },

  image: {
    width: "100%",
    height: 280,
  },

  prompt: {
    color: "#fff",
    paddingHorizontal: 14,
    paddingTop: 12,
    fontSize: 14,
    fontWeight: "500",
  },

  badge: {
    alignSelf: "flex-start",
    margin: 14,
    marginTop: 10,
    backgroundColor: "rgba(0,255,153,0.15)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 30,
  },

  badgeText: {
    color: "#00FF99",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
  },

  emptyContainer: {
    flex: 1,
    backgroundColor: "#050505",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  emptyTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    marginTop: 18,
  },

  emptySubtitle: {
    color: "#777",
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
    lineHeight: 22,
  },
});