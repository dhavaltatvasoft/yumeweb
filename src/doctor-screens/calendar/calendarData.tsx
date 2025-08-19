export interface Appointment {
  time: string;
  name: string;
  doctor: string;
  color: string;
  duration: number;
  type?: 'video' | 'audio';
}

export interface DayData {
  day: string;
  dayNumber?: string;
  fullDate: string;
  appointments: Appointment[];
  isCurrentMonth: boolean;
}

export interface WeekData {
  dates: DayData[];
  month: string;
  year: number;
}

export const initialCalendarData: DayData[] = [
  {
    day: "Mon 19",
    fullDate: "May 19, 2025",
    appointments: [
      {
        time: "08:00",
        name: "John Doe",
        doctor: "Stephen Parker",
        color: "#FF1E9709",
        duration: 15,
        type: "video",
      },
      {
        time: "08:30",
        name: "Michael K. Shumate",
        doctor: "",
        color: "#FF1E9709",
        duration: 15,
      },
      {
        time: "08:45",
        name: "Michael K. Shumate",
        doctor: "",
        color: "#FF1E9709",
        duration: 15,
        type: "video",
      },
      {
        time: "09:30",
        name: "Michael K. Shumate",
        doctor: "",
        color: "#FF1E9709",
        duration: 15,
      },
    ],
    isCurrentMonth: false,
  },
  {
    day: "Tue 20",
    fullDate: "May 20, 2025",
    appointments: [
      {
        time: "08:00",
        name: "Debbie R. Archuleta",
        doctor: "Rita N. Franklin",
        color: "#FF1E9709",
        duration: 15,
      },
      {
        time: "08:15",
        name: "",
        doctor: "Rita N. Franklin",
        color: "#F4EDFB",
        duration: 15,
      },
    ],
    isCurrentMonth: false,
  },
  {
    day: "Wed 21",
    fullDate: "May 21, 2025",
    appointments: [
      {
        time: "08:00",
        name: "Joseph E. Shaw",
        doctor: "Stephen Parker",
        color: "#FF1E9709",
        duration: 15,
      },
      {
        time: "08:15",
        name: "",
        doctor: "Stephen Parker",
        color: "#F4EDFB",
        duration: 15,
      },
      {
        time: "09:15",
        name: "",
        doctor: "Stephen Parker",
        color: "#F4EDFB",
        duration: 15,
      },
    ],
    isCurrentMonth: false,
  },
  {
    day: "Thu 22",
    fullDate: "May 22, 2025",
    appointments: [
      {
        time: "08:00",
        name: "Carolyn A. Leonard",
        doctor: "",
        color: "#FF1E9709",
        duration: 15,
      },
    ],
    isCurrentMonth: false,
  },
  {
    day: "Fri 23",
    fullDate: "May 23, 2025",
    appointments: [],
    isCurrentMonth: false,
  },
  {
    day: "Sat 24",
    fullDate: "May 24, 2025",
    appointments: [],
    isCurrentMonth: false,
  },
  {
    day: "Tue 10",
    fullDate: "June 10, 2025",
    appointments: [
      {
        time: "08:00",
        name: "Carolyn A. Leonard",
        doctor: "",
        color: "#FF1E9709",
        duration: 15,
        type: "video",
      },
       {
        time: "08:15",
        name: "DhavalS",
        doctor: "",
        color: "#FF1E9709",
        duration: 15,
        type: "audio",
      },
       {
        time: "08:30",
        name: "DhavalS",
        doctor: "",
        color: "#FF1E9709",
        duration: 15,
        type: "audio",
      },
       {
        time: "08:45",
        name: "DhavalS",
        doctor: "",
        color: "#FF1E9709",
        duration: 15,
        type: "audio",
      },
      {
        time: "09:30",
        name: "Carolyn A. Leonard",
        doctor: "",
        color: "#FF1E9709",
        duration: 15,
      },
    ],
    isCurrentMonth: true,
  },
  {
    day: "Wed 11",
    fullDate: "June 11, 2025",
    appointments: [
      {
        time: "10:00",
        name: "John Doe",
        doctor: "Dr. Lewis",
        color: "#F4EDFB",
        duration: 15,
        type: "video",
      },
      {
        time: "10:30",
        name: "Jane Smith",
        doctor: "",
        color: "#FF1E9709",
        duration: 30,
        type: "audio",
      },
    ],
    isCurrentMonth: true,
  },
  {
    day: "Thu 12",
    fullDate: "June 12, 2025",
    appointments: [
      {
        time: "09:00",
        name: "Emily Johnson",
        doctor: "Dr. Franklin",
        color: "#F4EDFB",
        duration: 15,
      },
      {
        time: "09:15",
        name: "Samuel Patel",
        doctor: "",
        color: "#FF1E9709",
        duration: 15,
        type: "video",
      },
    ],
    isCurrentMonth: true,
  },
  {
    day: "Fri 13",
    fullDate: "June 13, 2025",
    appointments: [
      {
        time: "08:00",
        name: "Ravi Mehta",
        doctor: "Dr. Parker",
        color: "#FF1E9709",
        duration: 30,
      },
    ],
    isCurrentMonth: true,
  },
  {
    day: "Sat 14",
    fullDate: "June 14, 2025",
    appointments: [
      {
        time: "11:00",
        name: "Anjali Desai",
        doctor: "",
        color: "#F4EDFB",
        duration: 15,
        type: "audio",
      },
    ],
    isCurrentMonth: true,
  },
  {
    day: "Sun 15",
    fullDate: "June 15, 2025",
    appointments: [],
    isCurrentMonth: true,
  },
  {
    day: "Mon 16",
    fullDate: "June 16, 2025",
    appointments: [
      {
        time: "10:00",
        name: "Karan Bhatt",
        doctor: "Dr. Thomas",
        color: "#FF1E9709",
        duration: 20,
        type: "video",
      },
      {
        time: "10:30",
        name: "Asha Patel",
        doctor: "",
        color: "#F4EDFB",
        duration: 15,
      },
    ],
    isCurrentMonth: true,
  },
  {
    day: "Tue 17",
    fullDate: "June 17, 2025",
    appointments: [],
    isCurrentMonth: true,
  },
  {
    day: "Wed 18",
    fullDate: "June 18, 2025",
    appointments: [
      {
        time: "09:00",
        name: "Suraj Sinha",
        doctor: "",
        color: "#FF1E9709",
        duration: 15,
      },
      {
        time: "09:30",
        name: "Neha Shah",
        doctor: "Dr. Franklin",
        color: "#F4EDFB",
        duration: 15,
        type: "audio",
      },
      {
        time: "10:30",
        name: "Neha Shah",
        doctor: "Dr. Franklin",
        color: "#F4EDFB",
        duration: 15,
        type: "audio",
      },
      {
        time: "11:30",
        name: "Neha Shah",
        doctor: "Dr. Franklin",
        color: "#F4EDFB",
        duration: 15,
        type: "audio",
      },
      {
        time: "12:30",
        name: "Neha Shah",
        doctor: "Dr. Franklin",
        color: "#F4EDFB",
        duration: 15,
        type: "audio",
      },
    ],
    isCurrentMonth: true,
  },
  {
    day: "Thu 19",
    fullDate: "June 19, 2025",
    appointments: [
      {
        time: "10:00",
        name: "Samantha R.",
        doctor: "Dr. Green",
        color: "#FF1E9709",
        duration: 15,
        type: "video",
      },
      {
        time: "10:15",
        name: "Dhruv Patel",
        doctor: "",
        color: "#F4EDFB",
        duration: 15,
      },
       {
        time: "11:15",
        name: "Dhruv Patel",
        doctor: "",
        color: "#F4EDFB",
        duration: 15,
      },
       {
        time: "12:15",
        name: "Dhruv Patel",
        doctor: "",
        color: "#F4EDFB",
        duration: 15,
      },
        {
        time: "13:15",
        name: "Dhruv Patel",
        doctor: "",
        color: "#F4EDFB",
        duration: 15,
      },
    ],
    isCurrentMonth: true,
  },
];