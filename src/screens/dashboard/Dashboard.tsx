import React from 'react';
import {ScrollView, SafeAreaView, StyleSheet} from 'react-native';

import Header from './components/header/Header';
import StepsSection from './components/step/StepsSection';
import DoctorsSection from './components/doctor-section/DoctorSection';
import SpecialtiesSection from './components/specialties/SpecialtiesSection';
import FeedSection from './components/feed/FeedSection';
import Footer from '../../components/footer/Footer';

const Dashboard = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.container}>

        <ScrollView style={styles.scrollView}>
          <Header navigation={navigation} />
          <StepsSection />
          <DoctorsSection />
          <SpecialtiesSection />
          <FeedSection />
          <Footer />
        </ScrollView>
    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
});

export default Dashboard;
