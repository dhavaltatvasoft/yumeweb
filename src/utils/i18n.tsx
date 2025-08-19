import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { LanguageDetectorAsyncModule } from "i18next";

// Global/common translations
import enCommon from "../translation/en.json";
import frCommon from "../translation/fr.json";

// Component-scoped
import enAuth from "../screens/dashboard/components/login/translations/en.json";
import frAuth from "../screens/dashboard/components/login/translations/fr.json";
import enHeader from "../screens/dashboard/components/header/translations/en.json";
import frHeader from "../screens/dashboard/components/header/translations/fr.json";
import enDoctor from "../screens/dashboard/components/doctor-section/translations/en.json";
import frDoctor from "../screens/dashboard/components/doctor-section/translations/fr.json";
import enFeed from "../screens/dashboard/components/feed/translations/en.json";
import frFeed from "../screens/dashboard/components/feed/translations/fr.json";
import enSpecialtiesSection from "../screens/dashboard/components/specialties/translations/en.json";
import frSpecialtiesSection from "../screens/dashboard/components/specialties/translations/fr.json";
import enFourSteps from "../screens/dashboard/components/step/translations/en.json";
import frFourSteps from "../screens/dashboard/components/step/translations/fr.json";
import enProfileScreen from "../screens/profile/translations/en.json";
import frProfileScreen from "../screens/profile/translations/fr.json";
import enDoctorLogin from "../doctor-screens/translations/en.json";
import frDoctorLogin from "../doctor-screens/translations/fr.json";
import enDoctorDashboard from "../doctor-screens/dashboard/translations/en.json";
import frDoctorDashboard from "../doctor-screens/dashboard/translations/fr.json";

import enDoctorsScreen from "../screens/doctors/translations/en.json";
import frDoctorsScreen from "../screens/doctors/translations/fr.json";

import enTermsScreen from "../screens/terms/translations/en.json";
import frTermsScreen from "../screens/terms/translations/fr.json";

import enFaqScreen from "../screens/faq/translations/en.json";
import frFaqScreen from "../screens/faq/translations/fr.json";

import enContactusScreen from "../screens/contactus/translations/en.json";
import frContactusScreen from "../screens/contactus/translations/fr.json";

import enAboutusScreen from "../screens/aboutus/translations/en.json";
import frAboutusScreen from "../screens/aboutus/translations/fr.json";

import enDoctorsDetailsScreen from '../screens/doctorsdetails/translations/en.json';
import frDoctorsDetailsScreen from '../screens/doctorsdetails/translations/fr.json';

import endoctorscompareScreen from '../screens/doctorscompare/translations/en.json';
import frdoctorscompareScreen from '../screens/doctorscompare/translations/fr.json';

import enPublicTopic from "../screens/publictopic/translations/en.json";
import frPublicTopic from "../screens/publictopic/translations/fr.json";

import enDashboardDocSection from "../screens/dashboard/components/doctor-section/translations/en.json";
import frDashboardDocSection from "../screens/dashboard/components/doctor-section/translations/fr.json";

import enAppointments from "../doctor-screens/appointments/translations/en.json";
import frAppointments from "../doctor-screens/appointments/translations/fr.json";

import enDoctorProfile from "../doctor-screens/profile/translations/en.json";
import frDoctorProfile from "../doctor-screens/profile/translations/fr.json";

const languageDetector: LanguageDetectorAsyncModule = {
  type: "languageDetector",
  async: true,
  init: () => {},
  detect(callback) {
    AsyncStorage.getItem("settings.lang")
      .then((lang) => callback?.(lang || "en"))
      .catch(() => callback?.("en"));
  },
  cacheUserLanguage: async (lang) => {
    await AsyncStorage.setItem("settings.lang", lang);
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v4",
    fallbackLng: "en",
    resources: {
      en: {
        translation: {
             ...enDashboardDocSection,
          ...enCommon,
          ...enAuth,
          ...enHeader,
          ...enDoctor,
          ...enFeed,
          ...enSpecialtiesSection,
          ...enFourSteps,
          ...enProfileScreen,
          ...enDoctorsScreen,
          ...enTermsScreen,
          ...enFaqScreen,
          ...enContactusScreen,
          ...enAboutusScreen,
          ...enDoctorLogin,
          ...enDoctorDashboard,
          ...enDoctorsDetailsScreen,
          ...enPublicTopic,
          ...enAppointments,
          ...endoctorscompareScreen,
          ...enDoctorProfile,
        },
      },
      fr: {
        translation: {
          ...frDashboardDocSection,
          ...frCommon,
          ...frAuth,
          ...frHeader,
          ...frDoctor,
          ...frFeed,
          ...frSpecialtiesSection,
          ...frFourSteps,
          ...frProfileScreen,
          ...frDoctorsScreen,
          ...frTermsScreen,
          ...frFaqScreen,
          ...frContactusScreen,
          ...frAboutusScreen,
          ...frDoctorLogin,
          ...frDoctorDashboard,
          ...frDoctorsDetailsScreen,
          ...frPublicTopic,
          ...frAppointments,
          ...frdoctorscompareScreen,
          ...frDoctorProfile,
        },
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
