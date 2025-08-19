import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import { assets } from '../../assets';
import { color } from '../../../../theme/color';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconIonic from 'react-native-vector-icons/Ionicons';
import LoginModal from './LoginModel';
import ForgotPasswordModal from './ForgotPassword';
import SetNewPasswordModal from './SetNewPasswordModal';
import { useScreenDimensions } from '../../../../utils/DimensionsUtilities';
import { createStyles } from './auth-style';
import { useTranslation } from 'react-i18next';

interface AuthModalProps {
  open: boolean;
  authType: string;
  onOpenChange: (open: boolean) => void;
  onClosePress: () => void;
  onFacebookPress: () => void;
  onTwitterPress: () => void;
  onGooglePress: () => void;
  onEmailPress: () => void;
  onLoginPress: () => void;
  onRegisterPress: () => void;
}

const AuthModal = ({
  open,
  authType,
  onOpenChange,
  onClosePress,
  onFacebookPress,
  onTwitterPress,
  onGooglePress,
  onEmailPress,
  onLoginPress,
  onRegisterPress,
}: AuthModalProps) => {
  const { t } = useTranslation();
  const isLogin = authType === 'Login';
  const { isMobile, scaleFactor, fontScale } = useScreenDimensions();
  const scale = (value: number) => (isMobile ? value * (scaleFactor - 0.5) : value);
  const fontScales = useCallback(
        (value: number) => value * fontScale,
        [scaleFactor]
      );
  const styles = createStyles(scale,fontScales);

  const [showLoginModal, setShowLoginModal] = useState(isLogin);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showSetNewPasswordModal, setShowSetNewPasswordModal] = useState(false);

  const handleLoginPress = () => {
    setShowLoginModal(true);
    onOpenChange(false);
  };

  return (
    <>
      <Modal visible={open} transparent={true} onRequestClose={() => onOpenChange(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.headerContent}>
              <Text style={styles.title}>{t('auth.title')}</Text>
              <IconIonic
                name="close-outline"
                size={fontScales(24)}
                color={color.color_212121}
                onPress={onClosePress}
              />
            </View>

            <View style={styles.imageContainer}>
              <Image source={assets.signUp} style={styles.image} />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.facebookButton]}
                onPress={onFacebookPress}
              >
                <Icon name="facebook" size={scale(20)} color="white" style={styles.icon} />
                <Text style={styles.buttonText}>{t('auth.facebook')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.twitterButton]}
                onPress={onTwitterPress}
              >
                <Icon name="twitter" size={scale(20)} color="white" style={styles.icon} />
                <Text style={styles.buttonText}>{t('auth.twitter')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.googleButton]}
                onPress={onGooglePress}
              >
                <Icon name="google" size={scale(20)} color="white" style={styles.icon} />
                <Text style={styles.buttonText}>{t('auth.google')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.emailButton]}
                onPress={handleLoginPress}
              >
                <Icon name="envelope" size={scale(20)} color="white" style={styles.icon} />
                <Text style={styles.buttonText}>{t('auth.email')}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                {t('auth.alreadyRegistered')}{' '}
                <Text onPress={handleLoginPress} style={styles.loginLink}>
                  {t('auth.login')}
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </Modal>

      <LoginModal
        visible={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onForgotPassword={() => {
          setShowLoginModal(false);
          setShowForgotPasswordModal(true);
        }}
        onRegister={() => {
          setShowLoginModal(false);
          onRegisterPress();
        }}
        onLoginPress={() => {}}
      />

      <ForgotPasswordModal
        visible={showForgotPasswordModal}
        onClose={() => {
          setShowForgotPasswordModal(false);
          setShowSetNewPasswordModal(true);
        }}
      />

      <SetNewPasswordModal
        visible={showSetNewPasswordModal}
        onClose={() => setShowSetNewPasswordModal(false)}
        onLogin={() => {
          setShowSetNewPasswordModal(false);
          setShowLoginModal(true);
        }}
      />
    </>
  );
};

export default AuthModal;
