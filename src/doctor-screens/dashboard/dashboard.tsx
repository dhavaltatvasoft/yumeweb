import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { useScreenDimensions } from '../../utils/DimensionsUtilities';
import { color, font, fontSize } from '../../theme/color';
import { assets } from './assets';
import { assets as rootAssets } from '../../assets/index';
import LoginHeader from '../components/login-header';
import { useSelector } from 'react-redux';

export default function DashboardScreen({ navigation }: any) {
  const { t } = useTranslation();
  const { isMobile, scaleFactor, fontScale } = useScreenDimensions();
  const scale = (value: number) => (isMobile ? value * scaleFactor : value);
  const fontScales = (value: number) => value * fontScale;
  const screenWidth = Dimensions.get('window').width;
  const styles = createStyles(scale, isMobile, screenWidth,fontScales);

  const userData = useSelector((v: any) => v.appReducer.userInfo);

  const stats = [
    {
      label: t('dashboard.stats.waitList', 'Wait List Requests'),
      count: 12,
      icon: assets.stats1,
      color: color.colorFAB446,
    },
    {
      label: t('dashboard.stats.newAppointments', 'New Appointments'),
      count: 8,
      icon: assets.stats2,
      color: color.doctorRatingContainer,
    },
    {
      label: t('dashboard.stats.totalAppointments', 'Total Appointments'),
      count: 128,
      icon: assets.stats3,
      color: color.color73AF00,
    },
  ];

  const bookings = [
    {
      name: 'Richard Johnson',
      reason: 'Routine medical check up',
      status: t('dashboard.bookings.status.ongoing', 'On Going'),
      image: { uri: 'https://randomuser.me/api/portraits/men/1.jpg' },
    },
    {
      name: 'Mary Ross',
      reason: 'Neurology Disorder',
      time: '12:00 PM',
      image: { uri: 'https://randomuser.me/api/portraits/men/1.jpg' },
    },
    {
      name: 'Paul Mitchell',
      reason: 'Migraines',
      time: '12:00 PM',
      image: { uri: 'https://randomuser.me/api/portraits/men/1.jpg' },
    },
    {
      name: 'Lee Thompson',
      reason: 'High Blood Sugar',
      time: '12:00 PM',
      image: { uri: 'https://randomuser.me/api/portraits/men/1.jpg' },
    },
  ];

  const reviews = [
    {
      name: 'Richard Johnson',
      time: '5 hours ago',
      rating: 4.5,
      image: { uri: 'https://randomuser.me/api/portraits/men/1.jpg' },
    },
    {
      name: 'Mary Ross',
      time: '5 hours ago',
      rating: 3.0,
      image: { uri: 'https://randomuser.me/api/portraits/men/1.jpg' },
    },
    {
      name: 'Paul Mitchel',
      time: '10 hours ago',
      rating: 5.0,
      image: { uri: 'https://randomuser.me/api/portraits/men/1.jpg' },
    },
    {
      name: 'Lee Thompson',
      time: '15 hours ago',
      rating: 4.5,
      image: { uri: 'https://randomuser.me/api/portraits/men/1.jpg' },
    },
  ];

  const appointments = [
    {
      name: 'Richard P. Johnson',
      date: '05-03-2022, 11:30 AM',
      type: 'Video Consultancy',
      reason: 'Health Checkup',
      image: { uri: 'https://randomuser.me/api/portraits/men/1.jpg' },
    },
    {
      name: 'Emily J. Watkins',
      date: '10-03-2022, 10:00 AM',
      type: 'Video Consultancy',
      reason: 'Migraine',
      image: { uri: 'https://randomuser.me/api/portraits/men/1.jpg' },
    },
    {
      name: 'Clarence Y. Bugg',
      date: '10-03-2022, 10:00 AM',
      type: 'In-Person',
      reason: 'High Blood Sugar',
      image: { uri: 'https://randomuser.me/api/portraits/men/1.jpg' },
    },
    {
      name: 'Perry O. Calderon',
      date: '12-03-2022, 05:00 PM',
      type: 'In-Person',
      reason: 'Cholesterol',
      image: { uri: 'https://randomuser.me/api/portraits/men/1.jpg' },
    },
  ];

  const handleViewAllBookings = () => {
    console.log('View all bookings');
  };

  const handleViewAllReviews = () => {
    console.log('View all reviews');
  };

  return (
    <View style={styles.screen}>
      <LoginHeader headerTitle={"Dashboard"}  navigation={navigation} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.statsRow}>
          {stats.map((item, index) => (
            <View key={index} style={styles.stateCardContainer}>
              <View style={[styles.card, { backgroundColor: `${item.color}05` }]}>
                <Image
                  source={item.icon}
                  resizeMode="contain"
                  style={styles.imageIcon}
                />
              </View>
              <View style={{ marginHorizontal: fontScales(20) }}>
                <Text style={styles.statLabel}>{item.label}</Text>
                <Text style={styles.statCount}>{item.count}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.row}>
          <View style={styles.cardBox}>
            <View style={styles.cardHeader}>
              <Text style={styles.sectionTitle}>
                {t('dashboard.bookings.title', "Today's Bookings")} ({bookings.length})
              </Text>
              <TouchableOpacity onPress={handleViewAllBookings}>
                <Text style={styles.viewAll}>
                  {t('dashboard.bookings.viewAll', 'VIEW ALL')}
                </Text>
              </TouchableOpacity>
            </View>
            {bookings.map((item, i) => (
              <View
                key={i}
                style={[
                  styles.rowItem,
                  item.status && styles.ongoingHighlight,
                ]}
              >
                <Image
                  source={item.image}
                  style={styles.avatar}
                  resizeMode="contain"
                />
                <View style={styles.info}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.reason}>{item.reason}</Text>
                </View>
                {item.time && <Text style={styles.time}>{item.time}</Text>}
                {item.status && (
                  <Text style={styles.status}>{item.status}</Text>
                )}
              </View>
            ))}
          </View>

          <View style={styles.cardBox}>
            <View style={styles.cardHeader}>
              <Text style={styles.sectionTitle}>
                {t('dashboard.reviews.title', 'Recent Reviews')}
              </Text>
              <TouchableOpacity onPress={handleViewAllReviews}>
                <Text style={styles.viewAll}>
                  {t('dashboard.reviews.viewAll', 'VIEW ALL')}
                </Text>
              </TouchableOpacity>
            </View>
            {reviews.map((item, i) => (
              <View key={i} style={styles.rowItem}>
                <Image source={item.image} style={styles.avatar} />
                <View style={styles.info}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.reason}>Reviewed {item.time}</Text>
                </View>
                <View style={styles.rating}>
                  <Icon
                    name="star"
                    size={fontScales(18)}
                    color={color.doctorRatingContainer}
                  />
                  <Text style={styles.ratingText}>
                    {item.rating.toFixed(1)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.tableCard}>
          <Text style={styles.sectionTitle}>
            {t('dashboard.appointments.title', 'New Appointments')} ({appointments.length})
          </Text>
          {isMobile ? (
            appointments.map((item, i) => (
              <View key={i} style={styles.appointmentCard}>
                <View style={styles.appointmentCardHeader}>
                  <Image source={item.image} style={styles.smallAvatar} />
                  <View style={styles.appointmentCardInfo}>
                    <Text style={styles.appointmentCardName}>{item.name}</Text>
                    <Text style={styles.appointmentCardDetail}>
                      {t('dashboard.appointments.headers.date', 'Date')}: {item.date}
                    </Text>
                    <Text style={styles.appointmentCardDetail}>
                      {t('dashboard.appointments.headers.type', 'Consultancy Type')}: {item.type}
                    </Text>
                    <Text style={styles.appointmentCardDetail}>
                      {t('dashboard.appointments.headers.reason', 'Reason')}: {item.reason}
                    </Text>
                  </View>
                </View>
                <View style={styles.actionIcons}>
                  <View style={styles.markYes}>
                    <Icon name="check" size={fontScales(20)} color={color.white} />
                  </View>
                  <View style={styles.markClose}>
                    <Icon name="close" size={fontScales(20)} color={color.white} />
                  </View>
                </View>
              </View>
            ))
          ) : (
            <>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableCol, styles.nameCol]}>
                  {t('dashboard.appointments.headers.name', 'Name')}
                </Text>
                <Text style={[styles.tableCol, styles.dateCol]}>
                  {t('dashboard.appointments.headers.date', 'Date')}
                </Text>
                <Text style={[styles.tableCol, styles.typeCol]}>
                  {t('dashboard.appointments.headers.type', 'Consultancy Type')}
                </Text>
                <Text style={[styles.tableCol, styles.reasonCol]}>
                  {t('dashboard.appointments.headers.reason', 'Reason')}
                </Text>
                <Text style={[styles.tableCol, styles.actionCol]}>
                  {t('dashboard.appointments.headers.action', 'Action')}
                </Text>
              </View>
              {appointments.map((item, i) => (
                <View key={i} style={styles.tableRow}>
                  <View style={[styles.avatarCell, styles.nameCol]}>
                    <Image source={item.image} style={styles.smallAvatar} />
                    <Text style={[styles.tableCellText, styles.nameText]}>{item.name}</Text>
                  </View>
                  <Text style={[styles.tableCell, styles.dateCol]}>{item.date}</Text>
                  <Text style={[styles.tableCell, styles.typeCol]}>{item.type}</Text>
                  <Text style={[styles.tableCell, styles.reasonCol]}>{item.reason}</Text>
                  <View style={[styles.actionIcons, styles.actionCol]}>
                    <View style={styles.markYes}>
                      <Icon name="check" size={fontScales(20)} color={color.white} />
                    </View>
                    <View style={styles.markClose}>
                      <Icon name="close" size={fontScales(20)} color={color.white} />
                    </View>
                  </View>
                </View>
              ))}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const createStyles = (
  scale: (val: number) => number,
  isMobile: boolean,
  screenWidth: number,
  fontScales: (val: number) => number
) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: color.colorF9F9F9 },
    container: {
      padding: fontScales(16),
      backgroundColor: color.colorF9F9F9,
    },
    statsRow: {
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      gap: fontScales(12),
      marginBottom: fontScales(16),
    },
    stateCardContainer: {
      padding: fontScales(16),
      backgroundColor: color.white,
      borderRadius: fontScales(10),
      alignItems: 'center',
      flexDirection: 'row',
      width: isMobile ? '100%' : screenWidth / 4,
    },
    card: {
      padding: fontScales(20),
      borderRadius: fontScales(6),
      justifyContent: 'center',
      alignItems: 'center',
      height: fontScales(50),
      width: fontScales(50),
    },
    imageIcon: {
      height: fontScales(30),
      width: fontScales(30),
    },
    statCount: {
      fontSize: isMobile ? fontScales(fontSize.fontSize24) : fontScales(fontSize.fontSize30),
      fontFamily: font.Rubik_500m,
      color: color.lable1,
      marginVertical: fontScales(6),
    },
    statLabel: {
      fontSize: isMobile ? fontScales(fontSize.fontSize16) : fontScales(fontSize.fontSize20),
      fontFamily: font.Rubik_400r,
      color: color.lable1,
    },
    row: {
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      gap: fontScales(12),
      marginBottom: fontScales(16),
    },
    cardBox: {
      flex: 1,
      backgroundColor: color.white,
      borderRadius: fontScales(8),
      padding: fontScales(20),
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: fontScales(8),
    },
    sectionTitle: {
      fontFamily: font.Rubik_500m,
      fontSize: isMobile ? fontScales(fontSize.fontSize20) : fontScales(fontSize.fontSize24),
      color: color.lable1,
      lineHeight: fontScales(30),
    },
    viewAll: {
      fontSize: isMobile ? fontScales(fontSize.fontSize14) : fontScales(fontSize.fontSize16),
      color: color.color7F18E5,
      fontFamily: font.Rubik_500m,
      lineHeight: fontScales(22),
    },
    rowItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: fontScales(6),
      height: fontScales(70),
      paddingHorizontal: fontScales(10),
    },
    ongoingHighlight: {
      backgroundColor: color.colorFFF4FA,
      borderRadius: fontScales(8),
    },
    avatar: {
      width: fontScales(50),
      height: fontScales(50),
      borderRadius: fontScales(25),
      marginRight: fontScales(10),
    },
    info: {
      flex: 1,
    },
    name: {
      fontFamily: font.Rubik_400r,
      fontSize: isMobile ? fontScales(fontSize.fontSize16) : fontScales(fontSize.fontSize18),
      color: color.lable1,
      lineHeight: fontScales(24),
    },
    reason: {
      fontFamily: font.Rubik_400r,
      fontSize: isMobile ?  fontScales(fontSize.fontSize14) : fontScales(fontSize.fontSize16),
      color: color.textLight,
      lineHeight: fontScales(16),
    },
    time: {
      fontFamily: font.Rubik_400r,
      fontSize: isMobile ?  fontScales(fontSize.fontSize14) : fontScales(fontSize.fontSize16),
      color: color.lable1,
      lineHeight: fontScales(24),
    },
    status: {
      color: color.colorFF1E97,
      fontFamily: font.Rubik_500m,
      fontSize: isMobile ?  fontScales(fontSize.fontSize14) : fontScales(fontSize.fontSize16),
      lineHeight: fontScales(24),
    },
    rating: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    ratingText: {
      marginLeft: fontScales(4),
      fontSize: isMobile ? fontScales(fontSize.fontSize11) : fontScales(fontSize.fontSize12),
      color: color.lable1,
    },
    tableCard: {
      padding: fontScales(20),
      backgroundColor: color.white,
      borderRadius: fontScales(10),
    },
    tableHeader: {
      flexDirection: 'row',
      marginTop: fontScales(8),
      paddingVertical: fontScales(20),
      borderBottomWidth: 1,
      borderBottomColor: color.colorE3E3E3,
    },
    tableRow: {
      flexDirection: 'row',
      marginTop: fontScales(8),
      paddingVertical: fontScales(10),
      alignItems: 'center',
    },
    tableCol: {
      fontSize: fontScales(fontSize.fontSize18),
      fontFamily: font.Rubik_400r,
      color: color.lable1,
      lineHeight: fontScales(16),
      paddingHorizontal: fontScales(8),
    },
    nameCol: {
      flex: 3,
    },
    dateCol: {
      flex: 2,
    },
    typeCol: {
      flex: 2,
    },
    reasonCol: {
      flex: 2,
    },
    actionCol: {
      flex: 1,
    },
    avatarCell: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: fontScales(6),
    },
    smallAvatar: {
      width: fontScales(50),
      height: fontScales(50),
      borderRadius: fontScales(25),
    },
    tableCellText: {
      fontSize: fontScales(fontSize.fontSize16),
      fontFamily: font.Rubik_400r,
      color: color.lable1,
      lineHeight: fontScales(24),
    },
    nameText: {
      flexShrink: 1,
    },
    tableCell: {
      fontSize: fontScales(fontSize.fontSize16),
      fontFamily: font.Rubik_400r,
      color: color.lable1,
      lineHeight: fontScales(24),
      paddingHorizontal: fontScales(8),
    },
    appointmentCard: {
      marginTop: fontScales(8),
      padding: fontScales(10),
      backgroundColor: color.colorF9F9F9,
      borderRadius: fontScales(8),
      borderWidth: 1,
      borderColor: color.colorE3E3E3,
    },
    appointmentCardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: fontScales(10),
    },
    appointmentCardInfo: {
      flex: 1,
      marginLeft: fontScales(10),
    },
    appointmentCardName: {
      fontSize: isMobile ? fontScales(fontSize.fontSize14) : fontScales(fontSize.fontSize16),
      fontFamily: font.Rubik_500m,
      color: color.lable1,
      lineHeight: fontScales(24),
    },
    appointmentCardDetail: {
      fontSize: isMobile ? fontScales(fontSize.fontSize12) : fontScales(fontSize.fontSize14),
      fontFamily: font.Rubik_400r,
      color: color.textLight,
      lineHeight: fontScales(20),
    },
    actionIcons: {
      flexDirection: 'row',
      justifyContent: isMobile ? 'flex-end' : 'flex-start',
    },
    markYes: {
      height: fontScales(30),
      width: fontScales(30),
      borderRadius: fontScales(15),
      marginRight: fontScales(8),
      backgroundColor: color.color73AF00,
      justifyContent: 'center',
      alignItems: 'center',
    },
    markClose: {
      height: fontScales(30),
      width: fontScales(30),
      borderRadius: fontScales(15),
      marginRight: fontScales(8),
      backgroundColor: color.colorDC1717,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });