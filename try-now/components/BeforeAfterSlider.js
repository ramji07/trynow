import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  PanResponder,
  Dimensions,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get("window").width;
const HANDLE_WIDTH = 52;

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  height = 300,
}) {
  const containerWidth = SCREEN_WIDTH - 36; // matches page padding
  const [sliderPos, setSliderPos] = useState(containerWidth / 2 - HANDLE_WIDTH / 2);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      let newPos = gesture.moveX - HANDLE_WIDTH / 2 - 18;

      if (newPos < 0) newPos = 0;
      if (newPos > containerWidth - HANDLE_WIDTH) {
        newPos = containerWidth - HANDLE_WIDTH;
      }

      setSliderPos(newPos);
    },
  });

  return (
    <View style={[styles.container, { height }]}>
      {/* Before Image */}
      <Image source={{ uri: beforeImage }} style={[styles.image, { height }]} />

      {/* After Image */}
      <View
        style={[
          styles.afterWrapper,
          {
            width: sliderPos + HANDLE_WIDTH / 2,
            height,
          },
        ]}
      >
        <Image source={{ uri: afterImage }} style={[styles.image, { height }]} />
      </View>

      {/* Labels */}
      <View style={styles.beforeBadge}>
        <Text style={styles.badgeText}>Before</Text>
      </View>

      <View style={styles.afterBadge}>
        <Text style={styles.badgeText}>After</Text>
      </View>

      {/* Divider Line */}
      <View
        style={[
          styles.sliderLine,
          {
            left: sliderPos + HANDLE_WIDTH / 2 - 1.5,
            height,
          },
        ]}
      />

      {/* Handle */}
      <View
        {...panResponder.panHandlers}
        style={[
          styles.handle,
          {
            left: sliderPos,
            top: height / 2 - 26,
          },
        ]}
      >
        <Ionicons name="chevron-back" size={18} color="#000" />
        <Ionicons name="chevron-forward" size={18} color="#000" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 24,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#111",
  },

  image: {
    width: "100%",
    position: "absolute",
    resizeMode: "cover",
  },

  afterWrapper: {
    overflow: "hidden",
    position: "absolute",
    left: 0,
    top: 0,
  },

  sliderLine: {
    position: "absolute",
    width: 3,
    backgroundColor: "#00FF99",
    zIndex: 8,
  },

  handle: {
    position: "absolute",
    width: HANDLE_WIDTH,
    height: 52,
    borderRadius: 26,
    backgroundColor: "rgba(0,255,153,0.95)",
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#00FF99",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },

    elevation: 8,
  },

  beforeBadge: {
    position: "absolute",
    top: 14,
    left: 14,
    backgroundColor: "rgba(0,0,0,0.55)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    zIndex: 12,
  },

  afterBadge: {
    position: "absolute",
    top: 14,
    right: 14,
    backgroundColor: "rgba(0,0,0,0.55)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    zIndex: 12,
  },

  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
});