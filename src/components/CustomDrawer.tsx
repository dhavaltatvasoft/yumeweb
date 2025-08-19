import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { color, font, fontSize } from '../theme/color';
import Header from './Header';
import Footer from './Footer';

type Props = {
  sections: string[];
  selectedSection: string;
  onSectionChange: (section: string) => void;
};

export default function CustomDrawer({
  sections,
  selectedSection,
  onSectionChange,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 768;

  const toggleDrawer = () => {
    setIsOpen(prev => !prev);
  };

  const handleItemPress = (section: string) => {
    onSectionChange(section);
    setIsOpen(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleDrawer} style={styles.toggleButton}>
        <Ionicons
          name={isOpen ? 'close' : 'menu'}
          size={28}
          color={color.primary1}
        />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.drawerContainer}>
          <Header />
          <View style={styles.drawerContent}>
            {sections.map(section => {
              const isSelected = section === selectedSection;
              return (
                <TouchableOpacity
                  key={section}
                  style={[
                    styles.drawerItem,
                    isSelected && styles.drawerItemSelected,
                  ]}
                  onPress={() => handleItemPress(section)}>
                  <Text
                    style={[
                      styles.drawerText,
                      isSelected && styles.drawerTextSelected,
                    ]}>
                    {section}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <Footer />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  toggleButton: {
    alignSelf: 'flex-start',
    padding: 10,
    marginBottom: 20,
  },
  drawerContainer: {
    backgroundColor: color.white,
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 20,
  },
  drawerContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  drawerItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 8,
  },
  drawerItemSelected: {
    backgroundColor: color.primary1,
  },
  drawerText: {
    fontSize: fontSize.fontSize16,
    fontFamily: font.Rubik_400r,
    color: color.lable1,
  },
  drawerTextSelected: {
    color: color.white,
    fontFamily: font.Rubik_500m,
  },
});
