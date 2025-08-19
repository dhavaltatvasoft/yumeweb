import React, { useRef, useEffect } from "react";
import {
  Platform,
  View,
  StyleSheet,
  Image,
  ViewStyle,
  ImageSourcePropType,
} from "react-native";
import MapboxGL from "@rnmapbox/maps";
import { useScreenDimensions } from "../../../utils/DimensionsUtilities";
import { assets } from "../assets";
import Entypo from "react-native-vector-icons/Entypo";
import { color, font } from "../../../theme/color";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoibWVodWx0YXR2YSIsImEiOiJjbWF3OXF2bzYwOTlvMm1zNXExdzR2cjN6In0.NJITQ-NOheowbtBZ8N_41Q";

let mapboxgl: typeof import("mapbox-gl") | null = null;

// Web-specific setup
if (Platform.OS === "web") {
  mapboxgl = require("mapbox-gl");
  mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

  if (typeof document !== "undefined") {
    const existingLink = document.getElementById("mapbox-gl-css");
    if (!existingLink) {
      const link = document.createElement("link");
      link.id = "mapbox-gl-css";
      link.href = "https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
  }
} else {
  MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);
}

type BaseMapProps = {
  lat: number;
  long: number;
  style?: ViewStyle | React.CSSProperties;
};

const MapboxMap: React.FC<BaseMapProps> = ({ lat, long, style }) =>
  Platform.OS === "web" ? (
    <MapboxWeb lat={lat} long={long} style={style as React.CSSProperties} />
  ) : (
    <MapboxMobile lat={lat} long={long} style={style as ViewStyle} />
  );

const MapboxMobile: React.FC<BaseMapProps> = ({ lat, long, style }) => {
  const { scaleFactor } = useScreenDimensions();
  const scale = (value: number) => value * scaleFactor;

  const mobileStyles = StyleSheet.create({
    container: {
      borderRadius: 8,
      overflow: "hidden",
      width: "100%",
      height: 200, // or make dynamic if needed
    },
    pinImage: {
      width: scale(16),
      height: scale(16),
    },
    pinImageMobile: {
      width: scale(30),
      height: scale(30),
    },
  });

  return (
    <View style={[mobileStyles.container, style as any]}>
      <MapboxGL.MapView
        style={StyleSheet.absoluteFill}
        compassEnabled={false}
        zoomEnabled={true}
        scrollEnabled={true}
        attributionEnabled={false} 
        logoEnabled={false}>
        <MapboxGL.Camera
          zoomLevel={14}
          centerCoordinate={[long, lat]}
          animationMode="flyTo"
          animationDuration={1000}
        />

        <MapboxGL.PointAnnotation id="mapPin" coordinate={[long, lat]}>
          <Entypo
            name="location-pin"
            size={scale(24)}
            color={color.red}
          />
      
        </MapboxGL.PointAnnotation>
      </MapboxGL.MapView>
    </View>
  );
};

const MapboxWeb: React.FC<BaseMapProps> = ({ lat, long, style }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const { scaleFactor } = useScreenDimensions();
  const scale = (value: number) => value * scaleFactor;

  useEffect(() => {
    if (!mapContainerRef.current || !mapboxgl) return;

    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        attributionControl: false,

        style: "mapbox://styles/mapbox/streets-v11",
        center: [long, lat],
        zoom: 14,
      });
    }

    const markerElement = document.createElement("img");
    markerElement.src =
      typeof assets.location === "string"
        ? assets.location
        : assets.location.default || "";

    markerElement.style.width = `${scale(30)}px`;
    markerElement.style.height = `${scale(30)}px`;

    markerRef.current = new mapboxgl.Marker({ element: markerElement })
      .setLngLat([long, lat])
      .addTo(mapRef.current);

    return () => {
      markerRef.current?.remove();
      mapRef.current?.remove();
      markerRef.current = null;
      mapRef.current = null;
    };
  }, [lat, long, scale]);

  const webStyles: React.CSSProperties = {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    overflow: "hidden",
  };

  return <div ref={mapContainerRef} style={style || webStyles} />;
};

export default MapboxMap;
