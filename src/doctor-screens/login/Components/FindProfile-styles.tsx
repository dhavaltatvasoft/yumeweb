import { StyleSheet } from "react-native";
import { color, font, fontSize } from "../../../theme/color";

export const createStyles = (
  scale: (val: number) => number,
  isMobile: boolean,
  screenWidth: number,
  fontScales: (val: number) => number,
) =>
  StyleSheet.create({
    flexContainer: {
      flex: 1,
      backgroundColor: color.colorF9F9F9,
    },
    scrollContent: {
      backgroundColor: color.colorF9F9F9,
      paddingTop: fontScales(20),
      paddingHorizontal: fontScales(80),
      flexGrow: 1,
    },
    mobileScrollContent: {
      paddingHorizontal: fontScales(15),
      paddingTop: fontScales(15),
    },
    content: {
      alignItems: 'center',
    },
    mobileContent: {
      paddingHorizontal: fontScales(10),
    },
    title: {
      fontSize: fontScales(fontSize.fontSize30),
      fontFamily: font.Rubik_500m,
      color: color.lable1,
      textAlign: 'center',
      marginBottom: fontScales(10),
    },
    mobileTitle: {
      fontSize: fontScales(fontSize.fontSize22),
      lineHeight: fontScales(32),
    },
    subtitle: {
      fontSize: fontScales(fontSize.fontSize24),
      textAlign: 'center',
      color: color.lable1,
      fontFamily: font.Rubik_400r,
      marginBottom: fontScales(30),
    },
    mobileSubtitle: {
      fontSize: fontScales(fontSize.fontSize16),
      lineHeight: fontScales(24),
      marginBottom: fontScales(20),
    },
    inputRow: {
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: 'center',
      gap: fontScales(12),
      marginBottom: fontScales(30),
    },
    mobileInputRow: {
      gap: fontScales(8),
      marginBottom: fontScales(20),
      width: '100%',
    },
    inputGroup: {
      marginBottom: isMobile ? fontScales(15) : 0,
    },
    mobileInputGroup: {
      marginBottom: fontScales(10),
      width: '100%',
    },
    label: {
      marginBottom: fontScales(5),
      fontSize: fontScales(fontSize.fontSize16),
      lineHeight: fontScales(24),
      fontFamily: font.Rubik_400r,
      color: color.lable1,
    },
    mobileLabel: {
      fontSize: fontScales(fontSize.fontSize14),
      lineHeight: fontScales(20),
    },
    input: {
      backgroundColor: color.white,
      paddingVertical: fontScales(10),
      paddingHorizontal: fontScales(15),
      borderRadius: 6,
      borderWidth: 1,
      borderColor: color.border,
      width: fontScales(300),
      outlineStyle: 'none' as any
    },
    mobileInput: {
      paddingVertical: fontScales(8),
      paddingHorizontal: fontScales(12),
      width: '100%',
      fontSize: fontScales(fontSize.fontSize14),
    },
    findButton: {
      backgroundColor: color.secondary1,
      paddingVertical: fontScales(12),
      paddingHorizontal: fontScales(20),
      borderRadius: 6,
      alignSelf: isMobile ? 'center' : 'flex-end',
      marginTop: isMobile ? fontScales(15) : 0,
    },
    mobileFindButton: {
      paddingVertical: fontScales(10),
      paddingHorizontal: fontScales(15),
      marginTop: fontScales(10),
      width: '100%',
    },
    findButtonText: {
      color: color.white,
      fontFamily: font.Rubik_700b,
      fontSize: fontScales(fontSize.fontSize16),
      textAlign: 'center',
    },
    mobileFindButtonText: {
      fontSize: fontScales(fontSize.fontSize14),
    },
    secureRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: fontScales(20),
    },
    mobileSecureRow: {
      marginVertical: fontScales(15),
    },
    lockIcon: {
      width: fontScales(16),
      height: fontScales(16),
      marginRight: fontScales(6),
    },
    mobileLockIcon: {
      width: fontScales(14),
      height: fontScales(14),
      marginRight: fontScales(4),
    },
    secureText: {
      color: color.color666666,
      fontSize: fontScales(fontSize.fontSize16),
      fontFamily: font.Rubik_400r,
      lineHeight: fontScales(16),
    },
    mobileSecureText: {
      fontSize: fontScales(fontSize.fontSize14),
      lineHeight: fontScales(14),
    },
    selectProfileText: {
      fontSize: fontScales(fontSize.fontSize24),
      fontFamily: font.Rubik_500m,
      color: color.lable1,
    },
    mobileSelectProfileText: {
      fontSize: fontScales(fontSize.fontSize20),
      lineHeight: fontScales(28),
      textAlign: 'center',
    },
    searchRow: {
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: fontScales(20),
      gap: fontScales(12),
    },
    mobileSearchRow: {
      gap: fontScales(8),
      marginBottom: fontScales(15),
    },
    searchControls: {
      flexDirection: 'row',
      gap: fontScales(10),
    },
    mobileSearchControls: {
      flexDirection: 'column',
      gap: fontScales(8),
      width: '100%',
      alignItems: 'center',
    },
    searchInput: {
      backgroundColor: color.white,
      borderColor: color.border,
      borderWidth: 1,
      borderRadius: 6,
      paddingHorizontal: fontScales(15),
      paddingVertical: fontScales(10),
      width: fontScales(250),
    },
    mobileSearchInput: {
      paddingHorizontal: fontScales(12),
      paddingVertical: fontScales(8),
      width: '100%',
      fontSize: fontScales(fontSize.fontSize14),
    },
    dropdownWrapper: {
      borderWidth: 1,
      borderColor: color.border,
      borderRadius: 6,
      backgroundColor: color.white,
      width: fontScales(180),
      height: fontScales(40),
      justifyContent: 'center',
      paddingStart: fontScales(10),
    },
    mobileDropdownWrapper: {
      width: '100%',
      padding: fontScales(8),
    },
    mobileDropdownText: {
      fontSize: fontScales(fontSize.fontSize14),
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      rowGap: fontScales(16),
    },
    mobileGrid: {
      flexDirection: 'row',
      rowGap: fontScales(12),
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    card: {
      backgroundColor: color.white,
      padding: fontScales(20),
      width: '32%',
      borderRadius: 8,
      shadowColor: color.blackLight,
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    mobileCard: {
      padding: fontScales(15),
      width: '100%',
      marginBottom: fontScales(8),
    },
    cardName: {
      fontSize: fontScales(fontSize.fontSize18),
      fontFamily: font.Rubik_400r,
      color: color.lable1,
      marginBottom: fontScales(6),
      lineHeight: fontScales(24),
    },
    mobileCardName: {
      fontSize: fontScales(fontSize.fontSize16),
      lineHeight: fontScales(20),
    },
    cardDetail: {
      fontSize: fontScales(fontSize.fontSize16),
      color: color.colorA8A2AF,
      fontFamily: font.Rubik_400r,
      lineHeight: fontScales(16),
      marginBottom: fontScales(2),
    },
    mobileCardDetail: {
      fontSize: fontScales(fontSize.fontSize14),
      lineHeight: fontScales(14),
    },
    cardInvites: {
      fontSize: fontScales(fontSize.fontSize14),
      color: color.lable1,
      fontFamily: font.Rubik_400r,
      lineHeight: fontScales(20),
      marginTop: fontScales(4),
    },
    mobileCardInvites: {
      fontSize: fontScales(fontSize.fontSize12),
      lineHeight: fontScales(18),
    },
    viewMoreButton: {
      marginTop: fontScales(20),
      paddingVertical: fontScales(10),
      paddingHorizontal: fontScales(20),
      borderWidth: 1,
      borderColor: color.secondary1,
      borderRadius: 6,
    },
    mobileViewMoreButton: {
      marginTop: fontScales(15),
      paddingVertical: fontScales(8),
      paddingHorizontal: fontScales(15),
      width: '100%',
    },
    viewMoreText: {
      color: color.secondary1,
      fontFamily: font.Rubik_500m,
      lineHeight: fontScales(20),
      fontSize: fontScales(fontSize.fontSize16),
      textAlign: 'center',
    },
    mobileViewMoreText: {
      fontSize: fontScales(fontSize.fontSize14),
    },
    buttonContainer: {
      alignItems: 'center',
      marginBottom: fontScales(20),
    },
    mobileButtonContainer: {
      marginBottom: fontScales(15),
    },
    footerContainer: {
      width: '100%',
      marginHorizontal: -fontScales(80),
    },
    mobileFooterContainer: {
      marginHorizontal: -fontScales(15),
    },
    bottomPadding: {
      height: fontScales(20),
    },
    dropdownStyle: {
      width: fontScales(200),
      marginTop: fontScales(5),
      borderRadius: fontScales(6),
      overflow: 'hidden',
      borderWidth: 0,
      height: fontScales(120),
    },
    dropdownTextStyle: {
      fontSize: fontScales(fontSize.fontSize16),
      paddingVertical: fontScales(12),
      paddingHorizontal: fontScales(10),
      color: color.loginDropDownText,
      fontFamily: font.Rubik_500m,
    },
    dropdownTextHighlightStyle: {
      color: color.shadowColor,
    },
  });