import React from "react";
import LegalScreen from "./LegalScreen";
import { useTranslation } from "react-i18next";

const Term = () => {
  const { t } = useTranslation();

  const introText = t("termsSection.dummyLorem");
  const termsSections = t("termsSection.termArr", {
    returnObjects: true,
  }) as any;

  return (
    <LegalScreen
      title={t("termsSection.terms")}
      intro={introText}
      sections={termsSections}
    />
  );
};

export default Term;
