import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutChangeEvent,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import { useScreenDimensions } from '../../utils/DimensionsUtilities';
import { color, font } from '../../theme/color';

type Props = {
  label?: string;
  value: string;
  placeholder?: string;
  data: string[];
  labelStyle?: StyleProp<TextStyle>;
  dropdownHighlightText?: StyleProp<TextStyle>;
  dropdownItemStyle?: StyleProp<ViewStyle>;
  dropdownWrapper?: StyleProp<ViewStyle>;
  dropdownStyle?: StyleProp<any>;
  containerStyle?: StyleProp<ViewStyle>;
  onChangeItem?: (text: string) => void;
  leftIconClosed?: React.ReactNode;
  leftIconOpen?: React.ReactNode;
  rightIconClosed?: React.ReactNode;
  rightIconOpen?: React.ReactNode;
  dropdownWidth?: number | string; 
  onInputLayoutChange?: (width: number,height:number) => void; // <-- key prop

};

const CustomDropdown = ({
  label,
  value,
  data = [],
  labelStyle,
  dropdownStyle,
  dropdownItemStyle,
  dropdownWrapper,
  containerStyle,
  onChangeItem,
  onInputLayoutChange,
  placeholder,
  dropdownWidth,
  leftIconClosed,
  leftIconOpen,
  rightIconClosed,
  rightIconOpen,
  dropdownHighlightText,
}: Props) => {

    const { isMobile, isTablet, isDesktop, scaleFactor, width, fontScale, isMobileBrowser } = useScreenDimensions();
    const isMobileOrTablet = isMobile || isTablet;
    const scale = useCallback((value: number) => value * scaleFactor, [scaleFactor]);
    const fontScales = (value: number) => value * fontScale;
    const styles = useMemo(() => createStyles(isMobile, isMobileOrTablet, isDesktop, scale, fontScales, isMobileBrowser), [
      isMobile,
      isMobileOrTablet,
      isDesktop,
      fontScales,
      fontScales,
      isMobileBrowser
    ]);

  const dropdownRef = useRef<ModalDropdown>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [inputWidth, setInputWidth] = useState<number>(0);
  const [dropdownItemHeight, setDropdownItemHeight] = useState(40);

 

   const onInputLayout = (event: LayoutChangeEvent) => {
    const width = event.nativeEvent.layout.width;
    const height = event.nativeEvent.layout.height;
    setInputWidth(width);

    if (onInputLayoutChange) {
      onInputLayoutChange(width,height);
    }
  };
  
  const handleLayoutItem = (e: LayoutChangeEvent) => setDropdownItemHeight(e.nativeEvent.layout.height);

  const handleDropdownSelect = useCallback(
    (idx: string, option: string) => {
      onChangeItem?.(option);
      setIsDropdownOpen(false);
      dropdownRef.current?.hide();
    },
    [onChangeItem]
  );

  const defaultRightIconClosed = <Icon name="chevron-down-outline" size={fontScales(22)} color={color.color_E0DEE2} />;
  const defaultRightIconOpen = <Icon name="chevron-up-outline" size={fontScales(22)} color={color.color_E0DEE2} />;

  return (
    <View style={[styles.dropdownWrapper1, dropdownWrapper]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <View onLayout={onInputLayout}>
        <ModalDropdown
          key={value}
          ref={dropdownRef}
          options={data}
          defaultValue={value || 'Select an option'}
          onSelect={handleDropdownSelect}
          onDropdownWillShow={() => setIsDropdownOpen(true)}
          onDropdownWillHide={() => setIsDropdownOpen(false)}
          renderRow={(option, idx, _) => {
            const isSelectedValue = option === value;
            return (
              <TouchableOpacity
                key={idx}
                style={[styles.dropdownRow, isSelectedValue && styles.dropdownRowSelected, dropdownItemStyle]}
                onLayout={handleLayoutItem}
                onPress={() => handleDropdownSelect(idx.toString(), option)}
              >
                <Text style={styles.dropdownItemText}>{option}</Text>
              </TouchableOpacity>
            );
          }}
          dropdownStyle={[
            dropdownStyle,
            styles.dropdown,
            {
               width: dropdownWidth ?? inputWidth,
              height: fontScales(dropdownItemHeight * data.length + 10),
            //  height: isMobile ? fontScales(dropdownItemHeight + 20) : fontScales(dropdownItemHeight * data.length + 10),
            },
          ]}
          dropdownTextStyle={styles.dropdownItemText}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.inputWrapper, containerStyle]}>
            <View style={styles.touchableArea}>
              <View style={styles.leftIcon}>
                {isDropdownOpen ? leftIconOpen : leftIconClosed}
              </View>

              {dropdownHighlightText ? 
              <Text style={value ? dropdownHighlightText : styles.placeholderText}>
                {value || placeholder}
              </Text> : 

              <Text style={value ? [styles.dropdownText, dropdownHighlightText] : styles.placeholderText}>
                {value || placeholder}
              </Text>
            }         
              <View style={styles.rightIcon}>
                {isDropdownOpen ? rightIconOpen || defaultRightIconOpen : rightIconClosed || defaultRightIconClosed}
              </View>
            </View>
          </View>
        </ModalDropdown>
      </View>
    </View>
  );
};

const createStyles = (
  isMobile: boolean,
  isMobileOrTablet: boolean,
  isDesktop: boolean,
  scale: (val: number) => number,
  fontScales: (val: number) => number,
  isMobileBrowser:boolean
) =>
  StyleSheet.create({
    dropdownWrapper1: {
      zIndex: 1000,
      marginVertical: fontScales(10),
    },
    label: {
      fontSize: fontScales(16),
      marginBottom: fontScales(6),
      color: color.lable1,
      fontFamily: font.Rubik_400r,
    },
    inputWrapper: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      backgroundColor: color.white,
      paddingHorizontal: fontScales(12),
      paddingVertical: fontScales(10),
      justifyContent: 'center',
      height: fontScales(48),
      minHeight: isMobile ? fontScales(48) : 0,
       color: color.lable1,
    },
    touchableArea: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    leftIcon: {
      marginRight: fontScales(10),
    },
    rightIcon: {
      marginLeft: fontScales(10),
    },
    dropdown: {
      marginTop: fontScales(10),
      borderRadius: fontScales(10),
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#ccc',
      elevation: fontScales(10),
      maxHeight: fontScales(300),
    },
    dropdownItemText: {
      color: color.lable1,
      fontSize: fontScales(16),
      fontFamily: font.Rubik_400r,
    },
    dropdownRow: {
      paddingVertical: fontScales(10),
      paddingHorizontal: fontScales(12),
    },
    dropdownRowSelected: {
      backgroundColor: '#f0f0f0',
    },
    dropdownText: {
      fontSize: fontScales(14),
      color: '#333',
      fontFamily: font.Rubik_400r,
      textAlign:'left',     
      flex: 1,
    },
    placeholderText: {
      color: '#aaa',
      fontSize: fontScales(14),
      fontFamily: font.Rubik_400r,
      flex: 1,
    },
  });

export default CustomDropdown;