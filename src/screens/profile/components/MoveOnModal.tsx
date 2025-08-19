import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import IconIonic from 'react-native-vector-icons/Ionicons';
import { color, font, fontSize } from '../../../theme/color';
import { useScreenDimensions } from '../../../utils/DimensionsUtilities';
import { assets } from '../assets';

interface MoveOnModalProps {
  visible: boolean;
  onClose: () => void;
  groups: string[];
  onSave: (selectedGroup: string) => void;
}

const MoveOnModal = ({ visible, onClose, groups, onSave }: MoveOnModalProps) => {
  const { t } = useTranslation();
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const { isMobile, scaleFactor, fontScale } = useScreenDimensions();
  const scale = (value: number) => (isMobile ? value * scaleFactor : value);
  const fontScales = useCallback(
                  (value: number) => value * fontScale,
                  [scaleFactor]
                );
  const styles = createStyles(scale, fontScales);

  const handleSave = () => {
    if (selectedGroup) {
      onSave(selectedGroup);
      setSelectedGroup(null);
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{t('moveOnModal.title')}</Text>
            <TouchableOpacity onPress={onClose}>
              <IconIonic
                name="close-outline"
                size={fontScales(24)}
                color={color.color_212121}
              />
            </TouchableOpacity>
          </View>

          <FlatList
            data={groups}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.groupItem,
                  selectedGroup === item && styles.selectedGroupItem,
                ]}
                onPress={() => setSelectedGroup(item)}
              >
                <Text style={styles.groupText}>{item}</Text>
                <View
                  style={[
                    styles.radio,
                    selectedGroup === item && styles.radioSelected,
                  ]}
                >
                  {selectedGroup === item && (
                    <Image
                      style={{ height: '100%', width: '100%' }}
                      source={assets.checkMark}
                      resizeMode="contain"
                    />
                  )}
                </View>
              </TouchableOpacity>
            )}
            style={styles.groupList}
          />

          <TouchableOpacity style={styles.createGroup}>
            <Text style={styles.createGroupText}>
              {t('moveOnModal.createNewGroup')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>{t('moveOnModal.save')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const createStyles = (scale: (val: number) => number, fontScales: (val: number) => number) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: color.blackLight,
      justifyContent: 'center',
      alignItems: 'center',
      padding: fontScales(20),
    },
    container: {
      backgroundColor: 'white',
      borderRadius: fontScales(8),
      padding: fontScales(20),
      width: '100%',
      maxWidth: fontScales(400),
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: fontScales(20),
    },
    title: {
      fontSize: fontScales(fontSize.fontSize24),
      fontFamily: font.Rubik_500m,
      color: color.lable1,
    },
    groupList: {
      marginBottom: fontScales(16),
    },
    groupItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: fontScales(12),
      borderRadius: fontScales(8),
      backgroundColor: color.colorF9F9F9,
      marginBottom: fontScales(8),
    },
    selectedGroupItem: {
      backgroundColor: '#F5F5F5',
    },
    groupText: {
      fontSize: fontScales(fontSize.fontSize16),
      fontFamily: font.Rubik_400r,
      color: color.lable1,
    },
    radio: {
      height: fontScales(20),
      width: fontScales(20),
      borderRadius: fontScales(10),
      borderWidth: 1,
      borderColor: color.lable1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    radioSelected: {
      borderColor: color.secondary1,
      backgroundColor: color.white,
    },
    createGroup: {
      alignSelf: 'flex-start',
      marginBottom: fontScales(16),
    },
    createGroupText: {
      color: color.secondary1,
      fontSize: fontScales(fontSize.fontSize14),
      fontFamily: font.Rubik_500m,
    },
    saveButton: {
      backgroundColor: color.secondary1,
      padding: fontScales(16),
      borderRadius: fontScales(8),
      alignItems: 'center',
    },
    saveButtonText: {
      color: color.white,
      fontSize: fontScales(fontSize.fontSize18),
      fontFamily: font.Rubik_700b,
    },
  });

export default MoveOnModal;