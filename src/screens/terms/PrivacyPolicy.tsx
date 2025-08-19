import React from "react";
import LegalScreen from "./LegalScreen";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  const introText = t("termsSection.dummyLorem");
  const privacySections = t("termsSection.privacyArr", {
    returnObjects: true,
  }) as any;

  return (
    <LegalScreen
      title={t("termsSection.privacyPolicy")}
      intro={introText}
      sections={privacySections}
    />
  );
};

export default PrivacyPolicy;
