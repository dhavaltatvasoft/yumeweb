import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Dimensions,
  LayoutChangeEvent,
} from 'react-native';
import { color, font, fontSize } from '../../../theme/color';
import Footer from '../../Footer';
import { useScreenDimensions } from '../../../utils/DimensionsUtilities';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import Header from '../../Header';
import { assets } from '../../assets';
import ModalDropdown from 'react-native-modal-dropdown';
import { createStyles } from './FindProfile-styles';

const FindYourProfile = ({ navigation }: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isMobile, scaleFactor, fontScale } = useScreenDimensions();
  const screenWidth = Dimensions.get('window').width;
  const scale = (value: number) => (isMobile ? value * scaleFactor : value);
  const fontScales = useCallback(
              (value: number) => value * fontScale,
              [scaleFactor]
      )
  const styles = createStyles(scale, isMobile, screenWidth, fontScales);

  const states = [
    t('findYourProfile.states.all', 'All States'),
    t('findYourProfile.states.ohio', 'Ohio'),
    t('findYourProfile.states.california', 'California'),
    t('findYourProfile.states.texas', 'Texas'),
    t('findYourProfile.states.newYork', 'New York'),
  ];

  const dummyProfiles = Array.from({ length: 40 }, (_, index) => ({
    id: index.toString(),
    name: 'John Smith, MD',
    specialty: 'Other MD/DO',
    location: 'Miamisburg, Ohio',
    invites: t('findYourProfile.profiles.invites', { count: Math.floor(Math.random() * 25), defaultValue: '{{count}} invites pending' }),
  }));

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [searching, setSearching] = useState(false);
  const [visibleCount, setVisibleCount] = useState(isMobile ? 2 : 9);
  const [npiSearch, setNpiSearch] = useState('');
  const [isScrollable, setIsScrollable] = useState(false);
  const [selectedState, setSelectedState] = useState(t('findYourProfile.states.all', 'All States'));
  const [dropdownKey, setDropdownKey] = useState(Date.now());

  const contentRef = useRef<View>(null);
  const screenHeight = Dimensions.get('window').height;

  const handleFindProfile = () => {
    setSearching(true);
  };

  const filteredProfiles = dummyProfiles.filter(
    p =>
      p.name.toLowerCase().includes(npiSearch.toLowerCase()) &&
      (selectedState === t('findYourProfile.states.all', 'All States') || p.location.includes(selectedState)),
  );

  const onContentLayout = (event: LayoutChangeEvent) => {
    const height = event.nativeEvent.layout.height;
    setIsScrollable(height > screenHeight);
  };

  const handleViewMore = () => {
    setVisibleCount(prevCount => prevCount + (isMobile ? 2 : 6));
  };

  return (
    <SafeAreaView style={styles.flexContainer}>
      <Header navigation={navigation} />
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          isMobile ? styles.mobileScrollContent : null,
        ]}>
        {!searching ? (
          <View style={[styles.content, isMobile ? styles.mobileContent : null]}>
            <Text style={[styles.title, isMobile ? styles.mobileTitle : null]}>
              {t('findYourProfile.initial.title', 'Join over one million healthcare professionals on yume')}
            </Text>
            <Text style={[styles.subtitle, isMobile ? styles.mobileSubtitle : null]}>
              {t('findYourProfile.initial.subtitle', 'Enter your first and last name to claim your profile')}
            </Text>
            <View style={[styles.inputRow, isMobile ? styles.mobileInputRow : null]}>
              <View style={[styles.inputGroup, isMobile ? styles.mobileInputGroup : null]}>
                <Text style={[styles.label, isMobile ? styles.mobileLabel : null]}>
                  {t('findYourProfile.initial.fields.firstName.label', 'First Name')}
                </Text>
                <TextInput
                  style={[styles.input, isMobile ? styles.mobileInput : null]}
                  placeholder={t('findYourProfile.initial.fields.firstName.placeholder', 'First Name')}
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholderTextColor={color.placeholder1}
                />
              </View>
              <View style={[styles.inputGroup, isMobile ? styles.mobileInputGroup : null]}>
                <Text style={[styles.label, isMobile ? styles.mobileLabel : null]}>
                  {t('findYourProfile.initial.fields.lastName.label', 'Last Name')}
                </Text>
                <TextInput
                  style={[styles.input, isMobile ? styles.mobileInput : null]}
                  placeholder={t('findYourProfile.initial.fields.lastName.placeholder', 'Last Name')}
                  value={lastName}
                  onChangeText={setLastName}
                  placeholderTextColor={color.placeholder1}
                />
              </View>
              <TouchableOpacity
                style={[styles.findButton, isMobile ? styles.mobileFindButton : null]}
                onPress={handleFindProfile}>
                <Text
                  style={[styles.findButtonText, isMobile ? styles.mobileFindButtonText : null]}>
                  {t('findYourProfile.initial.buttons.find', 'FIND MY PROFILE')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View onLayout={onContentLayout}>
            <View style={[styles.searchRow, isMobile ? styles.mobileSearchRow : null]}>
              <Text
                style={[styles.selectProfileText, isMobile ? styles.mobileSelectProfileText : null]}>
                {t('findYourProfile.search.title', 'Select Your Profile')}
              </Text>
              <View
                style={[styles.searchControls, isMobile ? styles.mobileSearchControls : null]}>
                <TextInput
                  style={[styles.searchInput, isMobile ? styles.mobileSearchInput : null]}
                  placeholder={t('findYourProfile.search.fields.npi.placeholder', 'Search by NPI')}
                  value={npiSearch}
                  onChangeText={setNpiSearch}
                  placeholderTextColor={color.placeholder1}
                />
                <ModalDropdown
                  key={dropdownKey}
                  options={states}
                  style={{
                    width: isMobile ? '100%' : '40%',
                    paddingHorizontal: isMobile ? 10 : 0,
                  }}
                  defaultValue={selectedState}
                  dropdownStyle={styles.dropdownStyle}
                  isFullWidth={!isMobile}
                  dropdownTextStyle={styles.dropdownTextStyle}
                  dropdownTextHighlightStyle={styles.dropdownTextHighlightStyle}
                  renderSeparator={() => null}
                  onSelect={(index: string, value: string) => {
                    setDropdownKey(Date.now());
                    setSelectedState(value);
                  }}>
                  <View
                    style={[styles.dropdownWrapper, isMobile ? styles.mobileDropdownWrapper : null]}>
                    <Text style={isMobile ? styles.mobileDropdownText : null}>
                      {selectedState}
                    </Text>
                  </View>
                </ModalDropdown>
              </View>
            </View>

            <View style={[styles.grid, isMobile ? styles.mobileGrid : null]}>
              {filteredProfiles.slice(0, visibleCount).map(profile => (
                <View
                  key={profile.id}
                  style={[styles.card, isMobile ? styles.mobileCard : null]}>
                  <Text
                    style={[styles.cardName, isMobile ? styles.mobileCardName : null]}>
                    {profile.name}
                  </Text>
                  <Text
                    style={[styles.cardDetail, isMobile ? styles.mobileCardDetail : null]}>
                    {profile.specialty}
                  </Text>
                  <Text
                    style={[styles.cardDetail, isMobile ? styles.mobileCardDetail : null]}>
                    {profile.location}
                  </Text>
                  <Text
                    style={[styles.cardInvites, isMobile ? styles.mobileCardInvites : null]}>
                    {profile.invites}
                  </Text>
                </View>
              ))}
            </View>

            {visibleCount < filteredProfiles.length && (
              <View
                style={[styles.buttonContainer, isMobile ? styles.mobileButtonContainer : null]}>
                <TouchableOpacity
                  style={[styles.viewMoreButton, isMobile ? styles.mobileViewMoreButton : null]}
                  onPress={handleViewMore}>
                  <Text
                    style={[styles.viewMoreText, isMobile ? styles.mobileViewMoreText : null]}>
                    {t('findYourProfile.search.buttons.viewMore', 'VIEW MORE')}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={[styles.secureRow, isMobile ? styles.mobileSecureRow : null]}>
              <Image
                source={assets.lock}
                style={[styles.lockIcon, isMobile ? styles.mobileLockIcon : null]}
              />
              <Text
                style={[styles.secureText, isMobile ? styles.mobileSecureText : null]}>
                {t('findYourProfile.secure.text', 'HIPAA Secure Communication Tools')}
              </Text>
            </View>
          </View>
        )}
        <View style={styles.bottomPadding} />
      </ScrollView>
      <Footer navigation={navigation} />
    </SafeAreaView>
  );
};

export default FindYourProfile;