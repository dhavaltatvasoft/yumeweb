import { StyleSheet } from 'react-native';
import { font, color } from '../../theme/color';

export const createStyles = (
  isMobile: boolean,
  isMobileOrTablet: boolean,
  isDesktop: boolean,
  scale: (val: number) => number,
  fontScales: (val: number) => number
) =>
  StyleSheet.create({
    footer_container: {
    backgroundColor: color.primary1,
    paddingHorizontal: fontScales(80),
    paddingVertical: fontScales(25),
  },
  footer_container_sm: {
    paddingHorizontal: fontScales(20),
    alignItems: "center",
  },
  footer_topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: fontScales(10),
  },
  footer_topRow_sm: {
  flexDirection: "column",
  alignItems: "center",
  gap: fontScales(12),
  width: '100%',
  },
  footer_logo: {
    width: fontScales(100),
    height: fontScales(40),
    resizeMode: "contain",
    marginBottom: fontScales(10),
  },
  footer_navLinks: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: fontScales(16),
    flex: 1,
    justifyContent: "center",
  },
  footer_navLinks_sm: {
    justifyContent: "center",
    marginVertical: fontScales(10),
  },
  footer_navText: {
    color: color.white,
    fontSize: fontScales(14),
    fontFamily: font.Rubik_400r,
    marginHorizontal: fontScales(4),
  },
  footer_socialIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: fontScales(12),
    marginTop: fontScales(10),
  },
  footer_icon: {
    width: fontScales(40),
    height: fontScales(40),
    resizeMode: "contain",
  },
  footer_bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: fontScales(20),
    borderTopColor: color.white2,
    borderTopWidth: fontScales(0.5),
    paddingTop: fontScales(15),
  },
  footer_bottomRow_sm: {
    flexDirection: "column",
    alignItems: "center",
    gap: fontScales(6),
  },
  footer_copyText: {
    color: color.white,
    fontSize: fontScales(12),
    fontFamily: font.Rubik_300l,
    textAlign: "center",
    marginBottom: fontScales(5),
  },
  footer_legalLinks: {
    flexDirection: "row",
    alignItems: "center",
  },
  footer_legalText: {
    color: color.white,
    fontSize: fontScales(12),
    fontFamily: font.Rubik_300l,
    marginHorizontal: fontScales(5),
  },
  footer_dot: {
    color: color.white,
    fontSize: fontScales(12),
  },
  });
