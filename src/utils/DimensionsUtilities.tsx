import { useState, useEffect } from "react";
import { Dimensions, Platform, PixelRatio } from "react-native";


export const useScreenDimensions = () => {
  const isWeb = Platform.OS === "web";

  // Additional check for mobile browsers if running in a web context
  const isMobileBrowser =
    isWeb && /Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent);


  // Helper to get initial dimensions
  const getInitialDimensions = () => {
    if (isWeb) {
      return {
        width: typeof window !== "undefined" ? window.innerWidth : 0,
        height: typeof window !== "undefined" ? window.innerHeight : 0,
      };
    }
    let dimensions = Dimensions.get("window");

    if (dimensions.width === 0 || dimensions.height === 0) {
      dimensions = Dimensions.get("screen");
    }
    return dimensions;
  };

  const [dimensions, setDimensions] = useState(getInitialDimensions);

  useEffect(() => {
    const handleResize = () => {
      if (isWeb) {
        const newDimensions = {
          width: window.innerWidth,
          height: window.innerHeight,
        };

        setDimensions(newDimensions);
      } else {
        let newDimensions = Dimensions.get("window");

        if (newDimensions.width === 0 || newDimensions.height === 0) {
          newDimensions = Dimensions.get("screen");
        }
        setDimensions(newDimensions);
      }
    };

    // Call handleResize immediately to ensure correct initial dimensions
    handleResize();

    if (isWeb) {
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    } else {
      const subscription = Dimensions.addEventListener(
        "change",
        ({ window, screen }) => {
          let newDimensions = window;

          if (newDimensions.width === 0 || newDimensions.height === 0) {
            newDimensions = screen;
          }
          setDimensions(newDimensions);
        }
      );
      return () => {
        subscription?.remove();
      };
    }
  }, [isWeb]);

  // Use raw width
  const effectiveWidth = dimensions.width;

  // Define breakpoints for web
  const isMobileBasedOnWidth = effectiveWidth < 896;
  // Force isMobile to true on native platforms or mobile browsers
  const isMobile = !isWeb ? true : isMobileBrowser || isMobileBasedOnWidth;
  const isMobileApp = Platform.OS === "ios" || Platform.OS === "android";
  const isTablet = effectiveWidth >= 896 && effectiveWidth < 1024;

  const scaleFactor = isMobile
    ? isWeb
      ? isWeb && isMobile && isMobileBrowser
        ? 2.5 // this is for mobile web
        : 2 // this is for browser ==> mobile web
      : 2 // temp condition
    : 1; // Desktop

  const fontScale =
    isWeb && isMobile && isMobileBrowser
      ? 2.5 // this is for mobile web
      : 1;

  return {
    ...dimensions,
    isMobileApp,
    isMobile,
    isTablet,
    isMobileBrowser,
    fontScale,
    isDesktop: effectiveWidth >= 1024,
    scaleFactor,
    width: dimensions.width,
    height: dimensions.height,
  };
};
