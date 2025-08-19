import React, { useCallback, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useTranslation } from "react-i18next";
import { assets } from "../assets";
import { color, font, fontSize } from "../../../theme/color";
import { useScreenDimensions } from "../../../utils/DimensionsUtilities";
import { favoriteGroups } from "../../../utils/dummyData";
import MoveOnModal from "./MoveOnModal";
import DeleteGroupModal from "./DeleteGroupModal";
import ModalDropdown from "react-native-modal-dropdown";
import { createStyles } from "./fav-styles";

type Doctor = {
  id: string;
  name: string;
  specialty: string;
  distance: string;
  rating: string;
  reviews: number;
  address: string;
  hours: string;
  videoConsultant: boolean;
  inPerson: boolean;
  image: string;
};

export type FavoriteGroup = {
  id: string;
  name: string;
  doctors: Doctor[];
};

const Favorites = () => {
  const { t } = useTranslation();
  const {
    isMobile,
    isTablet,
    scaleFactor,
    fontScale,
    isMobileBrowser,
    isMobileApp,
  } = useScreenDimensions();
  const isMobileOrTablet = isMobile || isTablet;

  const scale = (value: number) => value * scaleFactor;
  const fontScales = useCallback(
    (value: number) => value * fontScale,
    [scaleFactor]
  );

  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {
      group1: true,
      group3: false,
      group4: false,
    }
  );
  const dropdownRefs = useRef<Record<string, any>>({});
  const [groups, setGroups] = useState<FavoriteGroup[]>(
    favoriteGroups.map((group) => ({
      ...group,
      name: t(`favorites.groups.${group.id}`),
    }))
  );
  const [groupToDelete, setGroupToDelete] = useState<string | null>(null);
  const [showMoveOn, setShowMoveOn] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [dropdownKey, setDropdownKey] = useState(Date.now());
  const [doctorToMove, setDoctorToMove] = useState<{
    doctorId: string;
    fromGroupId: string;
  } | null>(null);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const ChevronDownIcon = ({ onPress }: any) => (
    <TouchableOpacity onPress={onPress}>
      <Image
        style={{ height: fontScales(9), width: fontScales(15) }}
        source={assets.arrowUp}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
  const ChevronUpIcon = ({ onPress }: any) => (
    <TouchableOpacity onPress={onPress}>
      <Image
        style={{ height: fontScales(9), width: fontScales(15) }}
        source={assets.arrowDownFill}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );

  const styles = createStyles(isMobile, isMobileOrTablet, scale, fontScales);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {groups.map((group) => (
          <View key={group.id} style={styles.groupContainer}>
            <View style={styles.groupHeader}>
              <View style={styles.groupTitleContainer}>
                <Text style={styles.groupTitle}>{group.name}</Text>
                <Text style={styles.doctorCount}>
                  {isMobileApp
                    ? `( ${group.doctors.length} )`
                    : t("favorites.doctorCount", {
                        count: group.doctors.length,
                      })}
                </Text>
              </View>
              <View style={styles.groupHeaderButtons}>
                {isMobileOrTablet && (
                  <TouchableOpacity
                    onPress={() => dropdownRefs.current[group.id]?.show()}
                    style={{ padding: 10 }}
                  >
                    <Image
                      style={{
                        height: fontScales(15),
                        width: fontScales(15),
                        marginRight: fontScales(10),
                      }}
                      source={assets.menuIcon}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                )}
                {!isMobileOrTablet && (
                  <ModalDropdown
                    ref={(ref) => {
                      if (ref) dropdownRefs.current[group.id] = ref;
                    }}
                    key={`${group.id}-${dropdownKey}`}
                    dropdownStyle={[
                      styles.dropdownStyle,
                      { zIndex: 9999, elevation: 20 },
                    ]}
                    options={[
                      t("favorites.dropdownOptions.editGroup"),
                      t("favorites.dropdownOptions.deleteGroup"),
                    ]}
                    dropdownTextStyle={styles.dropdownTextStyle}
                    dropdownTextHighlightStyle={
                      styles.dropdownTextHighlightStyle
                    }
                    renderSeparator={() => null}
                    adjustFrame={(style: any) => {
                      return {
                        ...style,
                        top: style.top + 10,
                        zIndex: 9999,
                      };
                    }}
                    onSelect={(index: string, value: string) => {
                      setDropdownKey(Date.now());
                      if (value === t("favorites.dropdownOptions.editGroup")) {
                        // Handle edit group logic
                      } else {
                        setGroupToDelete(group.id);
                        setShowDeleteConfirm(true);
                      }
                    }}
                  >
                    <Image
                      style={{
                        height: fontScales(15),
                        width: fontScales(15),
                        marginRight: fontScales(10),
                      }}
                      source={assets.menuIcon}
                      resizeMode="contain"
                    />
                  </ModalDropdown>
                )}
                {expandedGroups[group.id] ? (
                  <ChevronUpIcon
                    onPress={() => {
                      toggleGroup(group.id);
                    }}
                  />
                ) : (
                  <ChevronDownIcon
                    onPress={() => {
                      toggleGroup(group.id);
                    }}
                  />
                )}
              </View>
            </View>

            {isMobileOrTablet && (
              <ModalDropdown
                ref={(ref) => {
                  if (ref) dropdownRefs.current[group.id] = ref;
                }}
                key={`${group.id}-${dropdownKey}`}
                dropdownStyle={[
                  styles.dropdownStyle,
                  { zIndex: 9999, elevation: 20 },
                ]}
                options={[
                  t("favorites.dropdownOptions.editGroup"),
                  t("favorites.dropdownOptions.deleteGroup"),
                ]}
                dropdownTextStyle={styles.dropdownTextStyle}
                dropdownTextHighlightStyle={styles.dropdownTextHighlightStyle}
                renderSeparator={() => null}
                adjustFrame={(style: any) => {
                  return {
                    ...style,
                    top: isMobileApp
                      ? style.top - fontScales(70) : isMobile
                      ? isMobileBrowser
                        ? style.top + fontScales(70)
                        : style.top - fontScales(30)
                      : style.top - fontScales(30),
                    left: isMobileApp
                      ? style.left + fontScales(150)
                      : isMobile
                      ? isMobileBrowser
                        ? style.left + fontScales(150)
                        : style.left + fontScales(250)
                      : style.left + fontScales(250 * 2),
                    zIndex: 9999,
                  };
                }}
                onSelect={(index: string, value: string) => {
                  setDropdownKey(Date.now());
                  if (value === t("favorites.dropdownOptions.editGroup")) {
                    // Handle edit group logic
                  } else {
                    setGroupToDelete(group.id);
                    setShowDeleteConfirm(true);
                  }
                }}
              >
                <View style={{ padding: 10 }}></View>
              </ModalDropdown>
            )}

            {expandedGroups[group.id] &&
              group.doctors.map((doctor) => (
                <View
                  key={doctor.id}
                  style={[
                    styles.doctorCard,
                    isMobileOrTablet && styles.doctorCardMobile,
                  ]}
                >
                  <View style={styles.cardContent}>
                    <View
                      style={[
                        styles.doctorInfo,
                        isMobile && styles.doctorInfoMobile,
                      ]}
                    >
                      <View style={styles.imageContainer}>
                        <Image
                          source={{ uri: doctor.image }}
                          style={styles.doctorImage}
                        />
                      </View>

                      <View style={styles.detailsContainer}>
                        <View style={styles.doctorHeader}>
                          <View>
                            <View style={styles.doctorNameContainer}>
                              <Text style={styles.doctorName}>
                                {doctor.name}
                              </Text>
                              <View style={styles.appointmentTypes}>
                                {doctor.videoConsultant && (
                                  <View style={styles.videoConsultBadge}>
                                    <Image
                                      style={styles.iconVideo}
                                      source={assets.videoCam}
                                      resizeMode="contain"
                                    />
                                    <Text style={styles.videoBadgeText}>
                                      {t(
                                        "favorites.doctorCard.videoConsultant"
                                      )}
                                    </Text>
                                  </View>
                                )}
                                {doctor.inPerson && (
                                  <View style={styles.inPersonBadge}>
                                    <Image
                                      style={styles.iconPPL}
                                      source={assets.userPpl}
                                      resizeMode="contain"
                                    />
                                    <Text style={styles.inPersonBadgeText}>
                                      {t("favorites.doctorCard.inPerson")}
                                    </Text>
                                  </View>
                                )}
                              </View>
                            </View>

                            <View style={styles.specialtyRow}>
                              <Text style={styles.doctorSpecialty}>
                                {doctor.specialty}
                              </Text>
                              <Text style={styles.doctorDistance}>
                                {doctor.distance}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.hoursContainer}>
                            <Image
                              style={styles.iconClock}
                              source={assets.clock}
                              resizeMode="contain"
                            />
                            <Text style={styles.doctorHours}>
                              {doctor.hours}
                            </Text>
                          </View>
                        </View>

                        <View style={styles.ratingContainer}>
                          <View style={styles.ratingBadge}>
                            <Image
                              style={{
                                height: fontScales(12),
                                width: fontScales(12),
                                marginHorizontal: fontScales(4),
                              }}
                              source={assets.startCard}
                              resizeMode="contain"
                            />
                            <Text style={styles.ratingText}>
                              {doctor.rating}
                            </Text>
                          </View>
                          <Text style={styles.reviewCount}>
                            {t("favorites.doctorCard.reviews", {
                              count: doctor.reviews,
                            })}
                          </Text>
                        </View>

                        <View style={styles.doctorAddressContainer}>
                          <Text style={styles.doctorAddress}>
                            {doctor.address}
                          </Text>
                          <View style={styles.favoriteContainer}>
                            <TouchableOpacity>
                              <Image
                                style={styles.iconHeart}
                                source={assets.heartCard}
                                resizeMode="contain"
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>

                    <View style={styles.dividerVertical} />

                    <View style={styles.actionBar}>
                      <TouchableOpacity
                        onPress={() => {
                          setDoctorToMove({
                            doctorId: doctor.id,
                            fromGroupId: group.id,
                          });
                          setShowMoveOn(true);
                        }}
                      >
                        <Text style={styles.moveToButton}>
                          {t("favorites.doctorCard.moveTo")}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setGroups((prev) =>
                            prev.map((g) =>
                              g.id === group.id
                                ? {
                                    ...g,
                                    doctors: g.doctors.filter(
                                      (d) => d.id !== doctor.id
                                    ),
                                  }
                                : g
                            )
                          );
                        }}
                        style={styles.removeButton}
                      >
                        <Image
                          style={styles.iconTrash}
                          source={assets.trash}
                          resizeMode="contain"
                        />
                        <Text style={styles.removeButtonText}>
                          {t("favorites.doctorCard.remove")}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
          </View>
        ))}
      </ScrollView>

      <MoveOnModal
        visible={showMoveOn}
        onClose={() => setShowMoveOn(false)}
        groups={groups.map((group) => group.name)}
        onSave={(targetGroupName) => {
          if (!doctorToMove) return;

          setGroups((prev) => {
            const fromGroup = prev.find(
              (g) => g.id === doctorToMove.fromGroupId
            );
            const toGroup = prev.find((g) => g.name === targetGroupName);
            if (!fromGroup || !toGroup) return prev;

            const doctor = fromGroup.doctors.find(
              (d) => d.id === doctorToMove.doctorId
            );
            if (!doctor) return prev;

            return prev.map((group) => {
              if (group.id === fromGroup.id) {
                return {
                  ...group,
                  doctors: group.doctors.filter(
                    (d) => d.id !== doctorToMove.doctorId
                  ),
                };
              }
              if (group.id === toGroup.id) {
                return {
                  ...group,
                  doctors: [...group.doctors, doctor],
                };
              }
              return group;
            });
          });

          setShowMoveOn(false);
          setDoctorToMove(null);
        }}
      />

      <DeleteGroupModal
        visible={showDeleteConfirm}
        onCancel={() => setShowDeleteConfirm(false)}
        onConfirm={() => {
          setGroups((prev: any) =>
            prev.filter((group: any) => group.id !== groupToDelete)
          );
          setShowDeleteConfirm(false);
          setGroupToDelete(null);
        }}
      />
    </View>
  );
};

export default Favorites;
