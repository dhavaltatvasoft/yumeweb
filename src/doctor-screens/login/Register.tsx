import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useScreenDimensions} from '../../utils/DimensionsUtilities';
import Header from '../Header';
import Footer from '../Footer';
import {color} from '../../theme/color';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {createStyles} from './Register-styles';
import ProfileSuccessModal from './Components/ProfileSuccessModal';

interface RegisterProps {
  navigation: any;
  route:any
}

const Register = ({navigation, route}: RegisterProps) => {
  const {params} = route || null;
  const {isFromLogin} = params || false
  const {t} = useTranslation();
  const {isMobile, scaleFactor, fontScale} = useScreenDimensions();
  const screenWidth = Dimensions.get('window').width;
  const scale = (value: number) => (isMobile ? value * scaleFactor : value);
  const fontScales = useCallback(
            (value: number) => value * fontScale,
            [scaleFactor]
    )
    
  const [form, setForm] = useState({
    firstName: 'Dhaval',
    lastName: 'Sarva',
    occupation: 'SA',
    specialty: 'SA',
    street: 'SA',
    suite: 'AS',
    zip: '360002',
    city: 'RA',
    phone: '1234567890',
    ext: '12',
    fax: '1234567890',
    medicalSchool: 'SA',
    gradYear: '2001',
    dob: '09-09-2000',
    state: 'Sa',
    email: 'sarvaiyadhaval167@gmail.com',
    password: 'Dhaval123',
    keepSignedIn: false,
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    occupation: '',
    specialty: '',
    street: '',
    suite: '',
    zip: '',
    city: '',
    phone: '',
    ext: '',
    fax: '',
    medicalSchool: '',
    gradYear: '',
    dob: '',
    state: '',
    email: '',
    password: '',
  });

  const [focusedField, setFocusedField] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [steps, setSteps] = useState([
    t('register.steps.confirm', 'Confirm'),
    t('register.steps.verify', 'Verify'),
    t('register.steps.complete', 'Complete'),
  ]);
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (field: string, value: string | boolean) => {
    setForm({...form, [field]: value});
    setErrors({...errors, [field]: ''});
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateStep1 = () => {
    let valid = true;
    const newErrors = {...errors};

    if (!form.firstName.trim()) {
      newErrors.firstName = t(
        'register.step1.fields.firstName.errors.required',
        'First name is required',
      );
      valid = false;
    } else if (!/^[A-Za-z]+$/.test(form.firstName)) {
      newErrors.firstName = t(
        'register.step1.fields.firstName.errors.lettersOnly',
        'First name must contain only letters',
      );
      valid = false;
    } else {
      newErrors.firstName = '';
    }

    if (!form.lastName.trim()) {
      newErrors.lastName = t(
        'register.step1.fields.lastName.errors.required',
        'Last name is required',
      );
      valid = false;
    } else if (!/^[A-Za-z]+$/.test(form.lastName)) {
      newErrors.lastName = t(
        'register.step1.fields.lastName.errors.lettersOnly',
        'Last name must contain only letters',
      );
      valid = false;
    } else {
      newErrors.lastName = '';
    }

    if (!form.occupation.trim()) {
      newErrors.occupation = t(
        'register.step1.fields.occupation.errors.required',
        'Occupation is required',
      );
      valid = false;
    } else {
      newErrors.occupation = '';
    }

    if (!form.specialty.trim()) {
      newErrors.specialty = t(
        'register.step1.fields.specialty.errors.required',
        'Specialty is required',
      );
      valid = false;
    } else {
      newErrors.specialty = '';
    }

    if (!form.street.trim()) {
      newErrors.street = t(
        'register.step1.fields.street.errors.required',
        'Street address is required',
      );
      valid = false;
    } else {
      newErrors.street = '';
    }

    if (!form.suite.trim()) {
      newErrors.suite = t(
        'register.step1.fields.suite.errors.required',
        'Suite is required',
      );
      valid = false;
    } else {
      newErrors.suite = '';
    }

    if (!form.zip.trim()) {
      newErrors.zip = t(
        'register.step1.fields.zip.errors.required',
        'ZIP code is required',
      );
      valid = false;
    } else if (!/^\d{6}$/.test(form.zip)) {
      newErrors.zip = t(
        'register.step1.fields.zip.errors.invalid',
        'ZIP code must be 6 digits',
      );
      valid = false;
    } else {
      newErrors.zip = '';
    }

    if (!form.city.trim()) {
      newErrors.city = t(
        'register.step1.fields.city.errors.required',
        'City is required',
      );
      valid = false;
    } else {
      newErrors.city = '';
    }

    if (!form.phone.trim()) {
      newErrors.phone = t(
        'register.step1.fields.phone.errors.required',
        'Office phone is required',
      );
      valid = false;
    } else if (!/^\d{10}$/.test(form.phone.replace(/[-()\s]/g, ''))) {
      newErrors.phone = t(
        'register.step1.fields.phone.errors.invalid',
        'Office phone must be 10 digits',
      );
      valid = false;
    } else {
      newErrors.phone = '';
    }

    if (!form.ext.trim()) {
      newErrors.ext = t(
        'register.step1.fields.ext.errors.required',
        'Extension is required',
      );
      valid = false;
    } else if (form.ext && !/^\d+$/.test(form.ext)) {
      newErrors.ext = t(
        'register.step1.fields.ext.errors.digitsOnly',
        'Extension must contain only digits',
      );
      valid = false;
    } else {
      newErrors.ext = '';
    }

    if (!form.fax.trim()) {
      newErrors.fax = t(
        'register.step1.fields.fax.errors.required',
        'Fax is required',
      );
      valid = false;
    } else if (form.fax && !/^\d{10}$/.test(form.fax.replace(/[-()\s]/g, ''))) {
      newErrors.fax = t(
        'register.step1.fields.fax.errors.invalid',
        'Fax must be 10 digits',
      );
      valid = false;
    } else {
      newErrors.fax = '';
    }

    setErrors(newErrors);
    return valid;
  };

  const validateStep2 = () => {
    let valid = true;
    const newErrors = {...errors};

    if (!form.medicalSchool.trim()) {
      newErrors.medicalSchool = t(
        'register.step2.fields.medicalSchool.errors.required',
        'Medical school is required',
      );
      valid = false;
    } else {
      newErrors.medicalSchool = '';
    }

    const currentYear = new Date().getFullYear();
    if (!form.gradYear.trim()) {
      newErrors.gradYear = t(
        'register.step2.fields.gradYear.errors.required',
        'Graduation year is required',
      );
      valid = false;
    } else if (
      !/^\d{4}$/.test(form.gradYear) ||
      Number(form.gradYear) < 1900 ||
      Number(form.gradYear) > currentYear
    ) {
      newErrors.gradYear = t(
        'register.step2.fields.gradYear.errors.invalid',
        'Graduation year must be between 1900 and {{currentYear}}',
        {currentYear},
      );
      valid = false;
    } else {
      newErrors.gradYear = '';
    }

    if (!form.dob.trim()) {
      newErrors.dob = t(
        'register.step2.fields.dob.errors.required',
        'Date of birth is required',
      );
      valid = false;
    } else if (
      !/^(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])-\d{4}$/.test(form.dob)
    ) {
      newErrors.dob = t(
        'register.step2.fields.dob.errors.format',
        'Date of birth must be in MM-DD-YYYY format',
      );
      valid = false;
    } else {
      const [month, day, year] = form.dob.split('-').map(Number);
      const dobDate = new Date(year, month - 1, day);
      if (
        dobDate.getFullYear() !== year ||
        dobDate.getMonth() + 1 !== month ||
        dobDate.getDate() !== day
      ) {
        newErrors.dob = t(
          'register.step2.fields.dob.errors.invalid',
          'Invalid date of birth',
        );
        valid = false;
      } else if (dobDate > new Date()) {
        newErrors.dob = t(
          'register.step2.fields.dob.errors.future',
          'Date of birth cannot be in the future',
        );
        valid = false;
      } else {
        newErrors.dob = '';
      }
    }

    if (!form.state.trim()) {
      newErrors.state = t(
        'register.step2.fields.state.errors.required',
        'State is required',
      );
      valid = false;
    } else {
      newErrors.state = '';
    }

    setErrors(newErrors);
    return valid;
  };

  const validateStep3 = () => {
    let valid = true;
    const newErrors = {...errors};

    if (!form.email.trim()) {
      newErrors.email = t(
        'register.step3.fields.email.errors.required',
        'Email is required',
      );
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = t(
        'register.step3.fields.email.errors.invalid',
        'Invalid email format',
      );
      valid = false;
    } else {
      newErrors.email = '';
    }

    if (!form.password.trim()) {
      newErrors.password = t(
        'register.step3.fields.password.errors.required',
        'Password is required',
      );
      valid = false;
    } else if (!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(form.password)) {
      newErrors.password = t(
        'register.step3.fields.password.errors.invalid',
        'Password must be at least 8 characters with at least 1 letter and 1 number',
      );
      valid = false;
    } else {
      newErrors.password = '';
    }

    setErrors(newErrors);
    return valid;
  };

  const handleNext = () => {
    let valid = false;

    if (currentStep === 1) {
      valid = validateStep1();
    } else if (currentStep === 2) {
      valid = validateStep2();
    } else if (currentStep === 3) {
      valid = validateStep3();
    }

    if (valid) {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
      } else {
        setShowSuccessModal(true);
        console.log('Form submitted', form);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

 const renderUserProfileCard = () => {
  const user = { 
    name: 'John Smith, MD',
    specialty: 'Orthopaedic Surgery',
    location: 'Salt Lake City, UT 84120',
  };

  return (
    <View>
      <Text style={styles.title}>
        {t('userProfileCard.title', 'Create your identity')}
      </Text>
      <Text style={styles.subtitle}>
        {t('userProfileCard.subtitle', "Before you can view and edit your info, let's verify your identity.")}
      </Text>

      <View style={styles.profileCard}>
        <Image
          source={{
            uri: 'https://randomuser.me/api/portraits/men/1.jpg',
          }}
          style={styles.avatar}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.specialty}>{user.specialty}</Text>
          <Text style={styles.location}>{user.location}</Text>
          <Text style={styles.note}>
            {t('userProfileCard.note', 'If some info is outdated, you can update it after verification.')}
            {'\n'}
            <Text style={styles.link}>
              {t('userProfileCard.link', 'Wrong Photo?')}
            </Text>
          </Text>
        </View>
      </View>

      <View style={styles.buttonRowCard}>
        <TouchableOpacity
          onPress={() => {
            setCurrentStep(currentStep + 1);
          }}
          style={styles.primaryButton}
        >
          <Text style={styles.primaryButtonText}>
            {t('userProfileCard.buttons.yes', 'YES, THIS IS ME')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
          }}
        >
          <Text style={styles.secondaryButtonText}>
            {t('userProfileCard.buttons.no', 'No, this isn’t me')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

  const styles = createStyles(scale, isMobile, screenWidth, fontScales);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return isFromLogin ? (
          renderUserProfileCard()
        ) : (
          <>
            <Text style={styles.title}>
              {t('register.step1.title', 'Create your yume profile')}
            </Text>
            <Text style={styles.subtitle}>
              {t(
                'register.step1.subtitle',
                'Please complete all applicable fields to continue',
              )}
            </Text>

            <View style={[styles.row, isMobile ? styles.mobileRow : null]}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  {t('register.step1.fields.firstName.label', 'First Name')}
                </Text>
                <TextInput
                  placeholder={t(
                    'register.step1.fields.firstName.placeholder',
                    'First Name',
                  )}
                  value={form.firstName}
                  onChangeText={v => handleChange('firstName', v)}
                  style={[
                    styles.input,
                    {
                      borderColor: errors.firstName
                        ? color.red
                        : focusedField === 'firstName'
                        ? color.secondary1
                        : color.border,
                    },
                  ]}
                  placeholderTextColor={color.placeholder1}
                  onFocus={() => setFocusedField('firstName')}
                  onBlur={() => setFocusedField('')}
                />
                {errors.firstName ? (
                  <Text style={styles.errorText}>{errors.firstName}</Text>
                ) : null}
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  {t('register.step1.fields.lastName.label', 'Last Name')}
                </Text>
                <TextInput
                  placeholder={t(
                    'register.step1.fields.lastName.placeholder',
                    'Last Name',
                  )}
                  value={form.lastName}
                  onChangeText={v => handleChange('lastName', v)}
                  style={[
                    styles.input,
                    {
                      borderColor: errors.lastName
                        ? color.red
                        : focusedField === 'lastName'
                        ? color.secondary1
                        : color.border,
                    },
                  ]}
                  placeholderTextColor={color.placeholder1}
                  onFocus={() => setFocusedField('lastName')}
                  onBlur={() => setFocusedField('')}
                />
                {errors.lastName ? (
                  <Text style={styles.errorText}>{errors.lastName}</Text>
                ) : null}
              </View>
            </View>

            <View style={[styles.row, isMobile ? styles.mobileRow : null]}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  {t('register.step1.fields.occupation.label', 'Occupation')}
                </Text>
                <TextInput
                  placeholder={t(
                    'register.step1.fields.occupation.placeholder',
                    'Select appropriate Occupation',
                  )}
                  value={form.occupation}
                  onChangeText={v => handleChange('occupation', v)}
                  style={[
                    styles.input,
                    {
                      borderColor: errors.occupation
                        ? color.red
                        : focusedField === 'occupation'
                        ? color.secondary1
                        : color.border,
                    },
                  ]}
                  placeholderTextColor={color.placeholder1}
                  onFocus={() => setFocusedField('occupation')}
                  onBlur={() => setFocusedField('')}
                />
                {errors.occupation ? (
                  <Text style={styles.errorText}>{errors.occupation}</Text>
                ) : null}
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  {t('register.step1.fields.specialty.label', 'Specialty')}
                </Text>
                <TextInput
                  placeholder={t(
                    'register.step1.fields.specialty.placeholder',
                    'Select appropriate Specialty',
                  )}
                  value={form.specialty}
                  onChangeText={v => handleChange('specialty', v)}
                  style={[
                    styles.input,
                    {
                      borderColor: errors.specialty
                        ? color.red
                        : focusedField === 'specialty'
                        ? color.secondary1
                        : color.border,
                    },
                  ]}
                  placeholderTextColor={color.placeholder1}
                  onFocus={() => setFocusedField('specialty')}
                  onBlur={() => setFocusedField('')}
                />
                {errors.specialty ? (
                  <Text style={styles.errorText}>{errors.specialty}</Text>
                ) : null}
              </View>
            </View>

            <View
              style={{
                width: '100%',
                backgroundColor: color.colorE3E3E3,
                height: fontScales(1),
              }}
            />

            <Text style={styles.sectionTitle}>
              {t(
                'register.step1.sectionTitle',
                'Office address & contact numbers',
              )}
            </Text>

            <View style={[styles.row, isMobile ? styles.mobileRow : null]}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  {t('register.step1.fields.street.label', 'Street Address')}
                </Text>
                <TextInput
                  placeholder={t(
                    'register.step1.fields.street.placeholder',
                    'Street Address',
                  )}
                  value={form.street}
                  onChangeText={v => handleChange('street', v)}
                  style={[
                    styles.input,
                    {
                      borderColor: errors.street
                        ? color.red
                        : focusedField === 'street'
                        ? color.secondary1
                        : color.border,
                    },
                  ]}
                  placeholderTextColor={color.placeholder1}
                  onFocus={() => setFocusedField('street')}
                  onBlur={() => setFocusedField('')}
                />
                {errors.street ? (
                  <Text style={styles.errorText}>{errors.street}</Text>
                ) : null}
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  {t('register.step1.fields.suite.label', 'Suite')}
                </Text>
                <TextInput
                  placeholder={t(
                    'register.step1.fields.suite.placeholder',
                    'Suite',
                  )}
                  value={form.suite}
                  onChangeText={v => handleChange('suite', v)}
                  style={[
                    styles.input,
                    {
                      borderColor: errors.suite
                        ? color.red
                        : focusedField === 'suite'
                        ? color.secondary1
                        : color.border,
                    },
                  ]}
                  placeholderTextColor={color.placeholder1}
                  onFocus={() => setFocusedField('suite')}
                  onBlur={() => setFocusedField('')}
                />
                {errors.suite ? (
                  <Text style={styles.errorText}>{errors.suite}</Text>
                ) : null}
              </View>
            </View>

            <View style={[styles.row, isMobile ? styles.mobileRow : null]}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  {t('register.step1.fields.zip.label', 'Zip Code')}
                </Text>
                <TextInput
                  placeholder={t(
                    'register.step1.fields.zip.placeholder',
                    'Enter zip code',
                  )}
                  value={form.zip}
                  onChangeText={v => handleChange('zip', v)}
                  style={[
                    styles.input,
                    {
                      borderColor: errors.zip
                        ? color.red
                        : focusedField === 'zip'
                        ? color.secondary1
                        : color.border,
                    },
                  ]}
                  placeholderTextColor={color.placeholder1}
                  onFocus={() => setFocusedField('zip')}
                  onBlur={() => setFocusedField('')}
                />
                {errors.zip ? (
                  <Text style={styles.errorText}>{errors.zip}</Text>
                ) : null}
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  {t('register.step1.fields.city.label', 'City')}
                </Text>
                <TextInput
                  placeholder={t(
                    'register.step1.fields.city.placeholder',
                    'Select city',
                  )}
                  value={form.city}
                  onChangeText={v => handleChange('city', v)}
                  style={[
                    styles.input,
                    {
                      borderColor: errors.city
                        ? color.red
                        : focusedField === 'city'
                        ? color.secondary1
                        : color.border,
                    },
                  ]}
                  placeholderTextColor={color.placeholder1}
                  onFocus={() => setFocusedField('city')}
                  onBlur={() => setFocusedField('')}
                />
                {errors.city ? (
                  <Text style={styles.errorText}>{errors.city}</Text>
                ) : null}
              </View>
            </View>

            <View style={[styles.row, isMobile ? styles.mobileRow : null]}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  {t('register.step1.fields.phone.label', 'Office Phone')}
                </Text>
                <TextInput
                  placeholder={t(
                    'register.step1.fields.phone.placeholder',
                    'Office Phone',
                  )}
                  value={form.phone}
                  onChangeText={v => handleChange('phone', v)}
                  style={[
                    styles.input,
                    {
                      borderColor: errors.phone
                        ? color.red
                        : focusedField === 'phone'
                        ? color.secondary1
                        : color.border,
                    },
                  ]}
                  placeholderTextColor={color.placeholder1}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField('')}
                />
                {errors.phone ? (
                  <Text style={styles.errorText}>{errors.phone}</Text>
                ) : null}
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  {t('register.step1.fields.ext.label', 'Ext')}
                </Text>
                <TextInput
                  placeholder={t(
                    'register.step1.fields.ext.placeholder',
                    'Ext',
                  )}
                  value={form.ext}
                  onChangeText={v => handleChange('ext', v)}
                  style={[
                    styles.input,
                    {
                      borderColor: errors.ext
                        ? color.red
                        : focusedField === 'ext'
                        ? color.secondary1
                        : color.border,
                    },
                  ]}
                  placeholderTextColor={color.placeholder1}
                  onFocus={() => setFocusedField('ext')}
                  onBlur={() => setFocusedField('')}
                />
                {errors.ext ? (
                  <Text style={styles.errorText}>{errors.ext}</Text>
                ) : null}
              </View>
            </View>

            <View style={[styles.row, isMobile ? styles.mobileRow : null]}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  {t('register.step1.fields.fax.label', 'Office Fax')}
                </Text>
                <TextInput
                  placeholder={t(
                    'register.step1.fields.fax.placeholder',
                    'Office Fax',
                  )}
                  value={form.fax}
                  onChangeText={v => handleChange('fax', v)}
                  style={[
                    styles.input,
                    {alignSelf: 'stretch'},
                    {
                      borderColor: errors.fax
                        ? color.red
                        : focusedField === 'fax'
                        ? color.secondary1
                        : color.border,
                    },
                  ]}
                  placeholderTextColor={color.placeholder1}
                  onFocus={() => setFocusedField('fax')}
                  onBlur={() => setFocusedField('')}
                />
                {errors.fax ? (
                  <Text style={styles.errorText}>{errors.fax}</Text>
                ) : null}
              </View>
              <View style={styles.inputContainer} />
            </View>
          </>
        );
      case 2:
        return (
          <>
            <Text style={styles.title}>
              {t(
                'register.step2.title',
                'Verify you are a health professional',
              )}
            </Text>
            <Text style={styles.subtitle}>
              {t(
                'register.step2.subtitle',
                'Enter the medical school, graduation year, date of birth and home ZIP to verify you are a healthcare professional',
              )}
            </Text>

            <View style={[styles.row, isMobile ? styles.mobileRow : null]}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  {t(
                    'register.step2.fields.medicalSchool.label',
                    'Medical School',
                  )}
                </Text>
                <TextInput
                  placeholder={t(
                    'register.step2.fields.medicalSchool.placeholder',
                    'Medical School',
                  )}
                  value={form.medicalSchool}
                  onChangeText={v => handleChange('medicalSchool', v)}
                  style={[
                    styles.input,
                    {
                      borderColor: errors.medicalSchool
                        ? color.red
                        : focusedField === 'medicalSchool'
                        ? color.secondary1
                        : color.border,
                    },
                  ]}
                  placeholderTextColor={color.placeholder1}
                  onFocus={() => setFocusedField('medicalSchool')}
                  onBlur={() => setFocusedField('')}
                />
                {errors.medicalSchool ? (
                  <Text style={styles.errorText}>{errors.medicalSchool}</Text>
                ) : null}
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  {t('register.step2.fields.gradYear.label', 'Grad Year')}
                </Text>
                <TextInput
                  placeholder={t(
                    'register.step2.fields.gradYear.placeholder',
                    'Grad Year',
                  )}
                  value={form.gradYear}
                  onChangeText={v => handleChange('gradYear', v)}
                  style={[
                    styles.input,
                    {
                      borderColor: errors.gradYear
                        ? color.red
                        : focusedField === 'gradYear'
                        ? color.secondary1
                        : color.border,
                    },
                  ]}
                  placeholderTextColor={color.placeholder1}
                  onFocus={() => setFocusedField('gradYear')}
                  onBlur={() => setFocusedField('')}
                />
                {errors.gradYear ? (
                  <Text style={styles.errorText}>{errors.gradYear}</Text>
                ) : null}
              </View>
            </View>

            <View style={[styles.row, isMobile ? styles.mobileRow : null]}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  {t('register.step2.fields.dob.label', 'Date of Birth')}
                </Text>
                <TextInput
                  placeholder={t(
                    'register.step2.fields.dob.placeholder',
                    'Date of birth (MM-DD-YYYY)',
                  )}
                  value={form.dob}
                  onChangeText={v => handleChange('dob', v)}
                  style={[
                    styles.input,
                    {
                      borderColor: errors.dob
                        ? color.red
                        : focusedField === 'dob'
                        ? color.secondary1
                        : color.border,
                    },
                  ]}
                  placeholderTextColor={color.placeholder1}
                  onFocus={() => setFocusedField('dob')}
                  onBlur={() => setFocusedField('')}
                />
                {errors.dob ? (
                  <Text style={styles.errorText}>{errors.dob}</Text>
                ) : null}
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  {t('register.step2.fields.state.label', 'State')}
                </Text>
                <TextInput
                  placeholder={t(
                    'register.step2.fields.state.placeholder',
                    'State',
                  )}
                  value={form.state}
                  onChangeText={v => handleChange('state', v)}
                  style={[
                    styles.input,
                    {
                      borderColor: errors.state
                        ? color.red
                        : focusedField === 'state'
                        ? color.secondary1
                        : color.border,
                    },
                  ]}
                  placeholderTextColor={color.placeholder1}
                  onFocus={() => setFocusedField('state')}
                  onBlur={() => setFocusedField('')}
                />
                {errors.state ? (
                  <Text style={styles.errorText}>{errors.state}</Text>
                ) : null}
              </View>
            </View>

            <Text style={styles.linkText}>
              {t(
                'register.step2.linkText',
                'Why do we ask for this information?',
              )}
            </Text>
          </>
        );
      case 3:
        return (
          <>
            <Text style={styles.title}>
              {t('register.step3.title', "You're almost done!")}
            </Text>
            <Text style={styles.subtitle}>
              {t(
                'register.step3.subtitle',
                'Enter your email and create a password to access your yume Profile',
              )}
            </Text>

            <View style={[styles.row, isMobile ? styles.mobileRow : null]}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  {t('register.step3.fields.email.label', 'Email Address')}
                </Text>
                <TextInput
                  placeholder={t(
                    'register.step3.fields.email.placeholder',
                    'Email Address',
                  )}
                  value={form.email}
                  onChangeText={v => handleChange('email', v)}
                  style={[
                    styles.input,
                    {
                      borderColor: errors.email
                        ? color.red
                        : focusedField === 'email'
                        ? color.secondary1
                        : color.border,
                    },
                  ]}
                  placeholderTextColor={color.placeholder1}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField('')}
                />
                {errors.email ? (
                  <Text style={styles.errorText}>{errors.email}</Text>
                ) : null}
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  {t('register.step3.fields.password.label', 'Password')}
                </Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    placeholder={t(
                      'register.step3.fields.password.placeholder',
                      'Password',
                    )}
                    value={form.password}
                    onChangeText={v => handleChange('password', v)}
                    style={[
                      styles.input,
                      styles.passwordInput,
                      {
                        borderColor: errors.password
                          ? color.red
                          : focusedField === 'password'
                          ? color.secondary1
                          : color.border,
                      },
                    ]}
                    placeholderTextColor={color.placeholder1}
                    secureTextEntry={!showPassword}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField('')}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={togglePasswordVisibility}>
                    <Icon
                      name={showPassword ? 'visibility' : 'visibility-off'}
                      size={fontScales(20)}
                      color={color.lable1}
                    />
                  </TouchableOpacity>
                </View>
                {errors.password ? (
                  <Text style={styles.errorText}>{errors.password}</Text>
                ) : null}
              </View>
            </View>

            <Text style={styles.termsText}>
              {t(
                'register.step3.terms.text',
                'By signing up for yume, you agree to the Terms of Service and the yume Privacy Policy',
                {
                  termsLink: (
                    <Text style={styles.linkText}>
                      {t('register.step3.terms.termsLink', 'Terms of Service')}
                    </Text>
                  ),
                  privacyLink: (
                    <Text style={styles.linkText}>
                      {t(
                        'register.step3.terms.privacyLink',
                        'yume Privacy Policy',
                      )}
                    </Text>
                  ),
                },
              )}
            </Text>

            <View style={styles.checkboxRow}>
              <TouchableOpacity
                onPress={() => handleChange('keepSignedIn', !form.keepSignedIn)}
                style={styles.checkboxContainer}>
                <View
                  style={[
                    styles.checkbox,
                    form.keepSignedIn ? styles.checkboxChecked : null,
                  ]}>
                  {form.keepSignedIn && (
                    <Icon name="check" size={fontScales(16)} color={color.white} />
                  )}
                </View>
                <Text style={styles.checkboxLabel}>
                  {t(
                    'register.step3.fields.keepSignedIn.label',
                    'Keep me signed in on this device',
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View style={{flex: 1}}>
      <Header navigation={navigation} isFromRegister />
      <ScrollView
        contentContainerStyle={styles.container}
        horizontal={false}
        showsHorizontalScrollIndicator={false}>
        <View
          style={[
            styles.stepperContainer,
            isMobile ? styles.mobileStepperContainer : null,
          ]}>
          {steps.map((label, index) => {
            const step = index + 1;
            const isActive = step === currentStep;
            const isCompleted = step < currentStep;
            return (
              <React.Fragment key={label}>
                <View
                  style={[
                    styles.stepItem,
                    isMobile ? styles.mobileStepItem : null,
                  ]}>
                  <View
                    style={[
                      styles.circle,
                      isActive ? styles.activeCircle : null,
                      isCompleted ? styles.completedCircle : null,
                    ]}>
                    {isCompleted ? (
                      <Icon name="check" size={fontScales(24)} color={color.white} />
                    ) : (
                      <Text
                        style={[
                          styles.circleText,
                          isActive ? styles.activeCircleText : null,
                        ]}>
                        {step}
                      </Text>
                    )}
                  </View>
                  <Text
                    style={[
                      styles.stepLabel,
                      isActive ? styles.activeStepLabel : null,
                      isCompleted ? styles.completedStepLabel : null,
                      isMobile ? styles.mobileStepLabel : null,
                    ]}>
                    {label}
                  </Text>
                </View>
                {step < 3 && (
                  <View
                    style={[
                      styles.stepLine,
                      isCompleted ? styles.completedStepLine : null,
                    ]}
                  />
                )}
              </React.Fragment>
            );
          })}
        </View>

        <View style={{backgroundColor: color.white, padding: fontScales(20)}}>
          {renderStepContent()}

          <View
            style={[
              styles.buttonRow,
              isMobile ? styles.mobileButtonRow : null,
            ]}>
           {(!isFromLogin || currentStep !== 1) && <TouchableOpacity
              style={[
                styles.nextButton,
                isMobile ? styles.mobileNextButton : null,
              ]}
              onPress={handleNext}>
              <Text
                style={[
                  styles.nextText,
                  isMobile ? styles.mobileNextText : null,
                ]}>
                {currentStep === steps.length
                  ? t('register.buttons.complete', 'Complete Registration')
                  : currentStep === 1
                  ? t('register.buttons.next', 'Next')
                  : t('register.buttons.submit', 'Submit')}
              </Text>
            </TouchableOpacity>}
          </View>
        </View>
      </ScrollView>

      <ProfileSuccessModal
        visible={showSuccessModal}
        onCancel={() => setShowSuccessModal(false)}
        onConfirm={() => {}}
      />
      <Footer navigation={navigation} />
    </View>
  );
};

export default Register;
