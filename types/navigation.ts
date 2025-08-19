// types/navigation.ts
export type RootStackParamList = {
    Footer: undefined;
    aboutus: undefined;
    contactus: undefined;
    Bookings: undefined;
    Profile: undefined;
    Home: undefined;
    FindDoctor: undefined;
    fqa: undefined;
    term: undefined;
    privacypolicy: undefined;
    dashboard: undefined;
    profileScreen:undefined;
    doctors:undefined;
    doctorscompare:undefined;
    doctorshome:undefined;
    inpersonbooking: { consultancyType: string };
    doctorsdetails: { doctorId: string,isAvailable:boolean };

  };
  