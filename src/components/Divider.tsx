import {View, StyleSheet} from 'react-native';
import { color } from '../theme/color';

export const Divider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
  divider: {
    width: 1,
    height: '70%',
    backgroundColor: color.divider,
  },
});
