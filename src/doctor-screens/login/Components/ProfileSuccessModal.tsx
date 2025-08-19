import React, { useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useScreenDimensions } from '../../../utils/DimensionsUtilities';
import { color, font, fontSize } from '../../../theme/color';
import { assets } from '../../assets';

interface ProfileSuccessModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ProfileSuccessModal = ({ visible, onCancel, onConfirm }: ProfileSuccessModalProps) => {
  const { t } = useTranslation();
  const { isMobile, scaleFactor, fontScale } = useScreenDimensions();
  const scale = (value: number) => (isMobile ? value * scaleFactor : value);
  const fontScales = useCallback(
                  (value: number) => value * fontScale,
                  [scaleFactor]
          )
  const styles = createStyles(scale,fontScales);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Image style={styles.iconDelete} source={assets.yes} />

          <Text style={styles.title}>
            {t('profileSuccessModal.title', 'Profile Request Successful')}
          </Text>
          <Text style={styles.message}>
            {t('profileSuccessModal.message', 'Congratulations! Your application has been submitted successfully. You will receive further instructions via email.')}
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelText}>
                {t('profileSuccessModal.cancel', 'Cancel')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.confirmText}>
                {t('profileSuccessModal.confirm', 'Confirm')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const createStyles = (scale: (val: number) => number,fontScales: (val: number) => number) =>
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
      padding: fontScales(24),
      width: '100%',
      maxWidth: fontScales(400),
      alignItems: 'center',
    },
    iconDelete: {
      height: fontScales(50),
      width: fontScales(50),
      marginVertical: fontScales(10),
    },
    title: {
      fontSize: fontScales(fontSize.fontSize20),
      fontFamily: font.Rubik_500m,
      color: color.lable1,
      marginBottom: fontScales(8),
    },
    message: {
      fontSize: fontScales(fontSize.fontSize14),
      fontFamily: font.Rubik_400r,
      color: color.lable1,
      textAlign: 'center',
      marginBottom: fontScales(24),
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    cancelButton: {
      flex: 1,
      padding: fontScales(14),
      borderRadius: fontScales(8),
      borderWidth: 1,
      borderColor: color.grey,
      marginRight: fontScales(8),
      alignItems: 'center',
    },
    cancelText: {
      color: color.lable1,
      fontFamily: font.Rubik_500m,
      fontSize: fontScales(fontSize.fontSize16),
    },
    confirmButton: {
      flex: 1,
      padding: fontScales(14),
      borderRadius: fontScales(8),
      backgroundColor: color.secondary1,
      marginLeft: fontScales(8),
      alignItems: 'center',
    },
    confirmText: {
      color: color.white,
      fontFamily: font.Rubik_500m,
      fontSize: fontScales(fontSize.fontSize16),
    },
  });

export default ProfileSuccessModal;