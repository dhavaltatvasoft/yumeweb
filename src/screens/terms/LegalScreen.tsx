import React, { useCallback, useMemo } from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useScreenDimensions } from "../../../src/utils/DimensionsUtilities";
import { createStyles } from "./styles";

type Section = {
  title: string;
  bullets: string[];
};

type LegalScreenProps = {
  title: string;
  intro?: string;
  sections: Section[];
};

const LegalScreen: React.FC<LegalScreenProps> = ({
  title,
  intro,
  sections,
}) => {
  const { isMobile, isTablet, isDesktop, scaleFactor, fontScale } =
    useScreenDimensions();
  const isMobileOrTablet = isMobile || isTablet;
  const scale = useCallback(
    (value: number) => value * scaleFactor,
    [scaleFactor]
  );
  const fontScales = useCallback(
    (value: number) => value * fontScale,
    [scaleFactor]
  );

  const styles = useMemo(
    () =>
      createStyles(isMobile, isMobileOrTablet, isDesktop, scale, fontScales),
    [isMobile, isMobileOrTablet, isDesktop, scale, fontScales]
  );

  const Paragraph = ({ children }: { children: React.ReactNode }) => (
    <Text style={styles.paragraph}>{children}</Text>
  );

  const BulletPoint = ({
    children,
    index,
  }: {
    children: React.ReactNode;
    index: number;
  }) => <Text style={styles.bulletPoint}>{`${index + 1}. ${children}`}</Text>;

  const SectionHeading = ({ children }: { children: React.ReactNode }) => (
    <Text style={styles.subHeading}>{children}</Text>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.innerContent}>
          <Text style={styles.heading}>{title}</Text>
          {intro && <Paragraph>{intro}</Paragraph>}

          {sections.map((section, sIdx) => (
            <View key={`section-${sIdx}`}>
              <SectionHeading>{section.title}</SectionHeading>
              {section.bullets.map((point, pIdx) => (
                <BulletPoint key={`point-${pIdx}`} index={pIdx}>
                  {point}
                </BulletPoint>
              ))}
            </View>
          ))}
        </View>
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
};

export default LegalScreen;
