import { StyleSheet } from "react-native";
import { color, font, fontSize } from "../../../../theme/color";

export const createStyles = (isMobile: any, isMobileOrTablet: any, scale: (val: number) => number, fontScales: (val: number) => number) => StyleSheet.create({
  container: {
    paddingHorizontal: fontScales(isMobileOrTablet ? 16 : 100),
    backgroundColor: color.white,
  },
  header: {
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: isMobile ? 'flex-start' : 'center',
    marginBottom: fontScales(24),
    gap: isMobile ? fontScales(16) : 0,
  },
  sectionTitle: {
    fontSize: fontScales(isMobile ? fontSize.fontSize24 : fontSize.fontSize36),
    fontFamily: font.Rubik_500m,
    color: color.lable1,
    lineHeight: fontScales(isMobile ? 32 : 50),
  },
  viewAllButton: {
    backgroundColor: color.secondary1,
    paddingHorizontal: fontScales(30),
    paddingVertical: fontScales(12),
    borderRadius: fontScales(8),
    alignSelf: isMobile ? 'stretch' : 'auto',
    alignItems: isMobile ? 'center' : 'flex-end',
  },
  viewAllText: {
    color: color.white,
    fontSize: fontScales(fontSize.fontSize16),
    fontFamily: font.Rubik_400r,
    lineHeight: fontScales(20),
  },
  feedContainer: {
    flexDirection: 'row',
    marginBottom: fontScales(30),
    flexGrow:1
  },
  feedGrid: {
    flexDirection: 'column',
  },
  feedCardSpacing: {
    marginBottom: fontScales(20),
  }
});