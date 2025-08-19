import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput as RNTextInput,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import IconIonic from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { color, font, fontSize } from '../../../../theme/color';

interface Props {
  visible: boolean;
  onClose: () => void;
  onVerify: (otp: string) => void;
  phoneNumber: string;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

const OtpVerificationModal: React.FC<Props> = ({
  visible,
  onClose,
  onVerify,
  phoneNumber,
}) => {
  const { t } = useTranslation();
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [countdown, setCountdown] = useState<number>(60);

  const inputs = useRef<RNTextInput[]>([]);

  useEffect(() => {
    if (visible) {
      setOtp(new Array(6).fill(''));
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) clearInterval(timer);
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [visible]);

  const handleChange = (text: string, index: number) => {
    if (!/^\d*$/.test(text)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = text.slice(-1);
    setOtp(updatedOtp);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (event.nativeEvent.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        const updatedOtp = [...otp];
        updatedOtp[index - 1] = '';
        setOtp(updatedOtp);
        inputs.current[index - 1]?.focus();
      } else {
        const updatedOtp = [...otp];
        updatedOtp[index] = '';
        setOtp(updatedOtp);
      }
    }
  };

  const handleVerify = () => {
    onVerify(otp.join(''));
  };

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <IconIonic
              name="close-outline"
              size={24}
              color={color.color_212121}
            />
          </TouchableOpacity>

          <Text style={styles.title}>{t('otpVerification.title')}</Text>

          <Text style={styles.subtitle}>
            {t('otpVerification.subtitle', { phoneNumber })}
          </Text>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  if (ref) inputs.current[index] = ref;
                }}
                style={styles.otpInput}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
              />
            ))}
          </View>

          <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
            <Text style={styles.verifyText}>{t('otpVerification.verifyButton')}</Text>
          </TouchableOpacity>

          <Text style={styles.resendText}>
            {countdown > 0 ? (
              <>
                {t('otpVerification.resendText', { countdown })}
              </>
            ) : (
              <Text style={{ color: color.secondary1 }}>
                {t('otpVerification.resendNow')}
              </Text>
            )}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: color.blackLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: color.white,
    borderRadius: 8,
    padding: 30,
    width: '100%',
    maxWidth: 500,
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 30,
    zIndex: 10,
  },
  title: {
    fontFamily: font.Rubik_600sb,
    fontSize: fontSize.fontSize36,
    lineHeight: 24,
    color: color.lable1,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: color.lable1,
    marginTop: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    width: 45,
    height: 50,
    borderWidth: 1,
    borderColor: color.grey,
    borderRadius: 6,
    textAlign: 'center',
    fontSize: fontSize.fontSize18,
  },
  verifyButton: {
    backgroundColor: color.secondary1,
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 15,
  },
  verifyText: {
    color: color.white,
    fontWeight: 'bold',
  },
  resendText: {
    textAlign: 'center',
    color: color.lable1,
    fontFamily: font.Rubik_600sb,
    lineHeight: 24,
  },
});

export default OtpVerificationModal;