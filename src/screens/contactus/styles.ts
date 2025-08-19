import { StyleSheet,Platform } from "react-native";
import { font, color,fontSize } from "../../theme/color";

export const createStyles = (
  isMobile: boolean,
  isMobileOrTablet: boolean,
  isDesktop: boolean,
  scale: (val: number) => number,
  fontScales: (val: number) => number
) =>
  StyleSheet.create({

  
 safeArea: {
    flex: 1,
    backgroundColor: color.textColorPrimary,
  },
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: fontScales(70),
  },
  scrollContentSmall: {
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
  },
  fullWidth: {
    marginRight: 0,
    marginVertical: fontScales(20),
  },
  leftSection: {
    marginRight: fontScales(12),
  },
  rightSection: {
    backgroundColor: color.white,
    borderColor: color.border,
    borderWidth: 1,
    marginTop: fontScales(40),
    height: fontScales(300),
    justifyContent: 'center',
    paddingHorizontal: fontScales(20),
    borderRadius: fontScales(12),
  },
  title: {
    fontSize: fontScales(fontSize.fontSize24),
    fontFamily: font.Rubik_500m,
    color: color.black,
    marginBottom: fontScales(8),
  },
  subtitle: {
    fontSize: fontScales(fontSize.fontSize20),
    fontFamily: font.Rubik_400r,
    color: color.color_28252C,
    marginVertical: scale(20),
  },
  label: {
    fontSize: fontScales(fontSize.fontSize16),
    fontFamily: font.Rubik_400r,
    color: color.color_28252C,
    marginBottom: fontScales(8),
  },
  input: {
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: fontScales(6),
    padding: fontScales(12),
    backgroundColor: color.white,
    marginBottom: fontScales(16),
    fontSize: fontScales(fontSize.fontSize16),
    fontFamily: font.Rubik_400r,
    color: color.color_28252C,
    minWidth: fontScales(100),
  },
  messageInput: {
    height: fontScales(200),
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: fontScales(6),
    padding: fontScales(12),
    fontSize: fontScales(fontSize.fontSize16),
    fontFamily: font.Rubik_400r,
    color: color.color_28252C,
    backgroundColor: color.white,
    marginBottom: fontScales(16),
  },
  sendButton: {
    backgroundColor: color.buttonPink,
    paddingVertical: fontScales(14),
    borderRadius: fontScales(6),
    alignItems: 'center',
    width: fontScales(150),
    marginTop: fontScales(20),
  },
  sendButtonText: {
    color: color.white,
    fontSize: fontScales(fontSize.fontSize20),
    fontFamily: font.Rubik_500m,
  },
  supportTitle: {
    marginVertical: fontScales(16),
    color: color.color_28252C,
    fontSize: fontScales(fontSize.fontSize22),
    fontFamily: font.Rubik_500m,
  },
  supportRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: fontScales(16),
  },
  iconBox: {
    backgroundColor: 'rgba(147, 39, 255, 0.05)',
    height: fontScales(50),
    width: fontScales(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: fontScales(10),
  },
  supportTextContainer: {
    marginLeft: fontScales(15),
  },
  supportLabel: {
    color: color.color_28252C,
    fontSize: fontScales(fontSize.fontSize14),
    fontFamily: font.Rubik_400r,
  },
  supportValue: {
    fontWeight: 'bold',
    color: color.color_28252C,
    fontSize: fontScales(fontSize.fontSize16),
    fontFamily: font.Rubik_500m,
    marginTop: fontScales(6),
  },
  });
