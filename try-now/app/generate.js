import { useState } from "react";
import {
  View,
  Image,
  Alert,
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Share,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import api from "../services/api";
import BeforeAfterSlider from "../components/BeforeAfterSlider";

const outfitTemplates = [
  {
    id: 1,
    title: "Office",
    subtitle: "Professional Look",
    icon: "briefcase-outline",
  },
  {
    id: 2,
    title: "Casual",
    subtitle: "Everyday Style",
    icon: "shirt-outline",
  },
  {
    id: 3,
    title: "Party",
    subtitle: "Night Out",
    icon: "wine-outline",
  },
  {
    id: 4,
    title: "Streetwear",
    subtitle: "Urban Fashion",
    icon: "flame-outline",
  },
  {
    id: 5,
    title: "Wedding",
    subtitle: "Traditional/Formal",
    icon: "diamond-outline",
  },
  {
    id: 6,
    title: "Gym",
    subtitle: "Activewear",
    icon: "barbell-outline",
  },
];

export default function Generate() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [selectedOutfit, setSelectedOutfit] = useState("Office");

  const pick = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (!res.canceled) {
      setImage(res.assets[0].uri);
      setResult(null);
    }
  };

  const generate = async () => {
    if (!image) {
      return Alert.alert("Select Image", "Please upload an image first.");
    }

    try {
      setLoading(true);

      const fd = new FormData();
      fd.append("image", {
        uri: image,
        name: "upload.jpg",
        type: "image/jpeg",
      });

      const finalPrompt = `${selectedOutfit} outfit. ${prompt}`;
      fd.append("prompt", finalPrompt);

      const res = await api.post("/generate", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResult(res.data.imageUrl);
    } catch {
      Alert.alert("Generation Failed", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = async () => {
    try {
      const permission = await MediaLibrary.requestPermissionsAsync();

      if (!permission.granted) {
        return Alert.alert("Permission Needed");
      }

      await MediaLibrary.saveToLibraryAsync(result);

      Alert.alert("Success", "Image saved to gallery");
    } catch {
      Alert.alert("Download Failed");
    }
  };

  const shareImage = async () => {
    try {
      await Share.share({
        message: result,
      });
    } catch {
      Alert.alert("Share Failed");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Back */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#00FF99" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        {/* Header */}
        <Text style={styles.heading}>AI Outfit Generator</Text>
        <Text style={styles.subheading}>
          Upload image, choose template, and generate AI outfit edits.
        </Text>

        {/* Upload */}
        <TouchableOpacity style={styles.uploadBox} onPress={pick}>
          {image ? (
            <Image source={{ uri: image }} style={styles.previewImage} />
          ) : (
            <>
              <Ionicons
                name="cloud-upload-outline"
                size={42}
                color="#00FF99"
              />
              <Text style={styles.uploadTitle}>Tap to Upload Image</Text>
              <Text style={styles.uploadSubtitle}>JPG / PNG Supported</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Templates */}
        <Text style={styles.templateHeading}>Choose Outfit Template</Text>

        <View style={styles.templateGrid}>
          {outfitTemplates.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => setSelectedOutfit(item.title)}
              style={[
                styles.templateCard,
                selectedOutfit === item.title && styles.templateCardActive,
              ]}
            >
              <Ionicons
                name={item.icon}
                size={28}
                color={selectedOutfit === item.title ? "#000" : "#00FF99"}
              />

              <Text
                style={[
                  styles.templateTitle,
                  selectedOutfit === item.title &&
                    styles.templateTitleActive,
                ]}
              >
                {item.title}
              </Text>

              <Text
                style={[
                  styles.templateSubtitle,
                  selectedOutfit === item.title &&
                    styles.templateSubtitleActive,
                ]}
              >
                {item.subtitle}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Prompt */}
        <TextInput
          placeholder="Additional custom prompt..."
          placeholderTextColor="#666"
          value={prompt}
          onChangeText={setPrompt}
          multiline
          style={styles.promptInput}
        />

        {/* Generate */}
        <TouchableOpacity
          style={styles.generateBtn}
          onPress={generate}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <>
              <Ionicons name="sparkles" size={18} color="#000" />
              <Text style={styles.generateText}>Generate AI Outfit</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Result */}
        {result && (
          <>
            <Text style={styles.sectionTitle}>Before / After Preview</Text>

            <View style={{ height: 300, marginVertical: 16 }}>
              <BeforeAfterSlider
                beforeImage={image}
                afterImage={result}
                height={300}
              />
            </View>

            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={downloadImage}
              >
                <Ionicons name="download" size={18} color="#00FF99" />
                <Text style={styles.actionText}>Download</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionBtn}
                onPress={shareImage}
              >
                <Ionicons
                  name="share-social"
                  size={18}
                  color="#00FF99"
                />
                <Text style={styles.actionText}>Share</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
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

  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 16,
  },

  backText: {
    color: "#00FF99",
    fontWeight: "700",
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

  uploadBox: {
    height: 260,
    borderRadius: 24,
    backgroundColor: "#111",
    borderWidth: 1.5,
    borderColor: "#1A1A1A",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  previewImage: {
    width: "100%",
    height: "100%",
  },

  uploadTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 12,
  },

  uploadSubtitle: {
    color: "#666",
    marginTop: 6,
  },

  templateHeading: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 24,
    marginBottom: 14,
  },

  templateGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },

  templateCard: {
    width: "48%",
    backgroundColor: "#111",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#1A1A1A",
  },

  templateCardActive: {
    backgroundColor: "#00FF99",
    borderColor: "#00FF99",
  },

  templateTitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
    marginTop: 14,
  },

  templateTitleActive: {
    color: "#000",
  },

  templateSubtitle: {
    color: "#777",
    fontSize: 12,
    marginTop: 4,
  },

  templateSubtitleActive: {
    color: "#111",
  },

  promptInput: {
    marginTop: 20,
    backgroundColor: "#111",
    borderRadius: 18,
    padding: 16,
    color: "#fff",
    minHeight: 90,
    borderWidth: 1,
    borderColor: "#1A1A1A",
    textAlignVertical: "top",
  },

  generateBtn: {
    marginTop: 20,
    backgroundColor: "#00FF99",
    paddingVertical: 16,
    borderRadius: 18,
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

  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 30,
    marginBottom: 16,
  },

  actionRow: {
    flexDirection: "row",
    gap: 14,
    marginTop: 22,
  },

  actionBtn: {
    flex: 1,
    backgroundColor: "#111",
    paddingVertical: 16,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#1A1A1A",
  },

  actionText: {
    color: "#00FF99",
    fontWeight: "700",
  },
});