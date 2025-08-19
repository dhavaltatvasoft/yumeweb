import { DayData, WeekData } from './calendarData';

export const toAmPm = (time: string, showMinutes: boolean = false): string => {
  const [hour, minute] = time.split(':').map(Number);
  const period = hour >= 12 ? 'PM' : 'AM';
  const adjustedHour = hour % 12 || 12;
  return showMinutes 
    ? `${adjustedHour}:${minute.toString().padStart(2, '0')} ${period}`
    : `${adjustedHour}${period}`;
};

export const generateMonthDates = (currentDate: Date, monthOffset: number): WeekData => {
  const dates: DayData[] = [];

    const baseDate = new Date(currentDate);
    baseDate.setMonth(baseDate.getMonth() + monthOffset);
    baseDate.setDate(1);

    const month = baseDate.toLocaleString("default", { month: "long" });
    const year = baseDate.getFullYear();
    const currentMonth = baseDate.getMonth();

    const firstDayOfWeek = baseDate.getDay();
    const adjustedFirstDay = (firstDayOfWeek + 6) % 7;
    const daysInMonth = new Date(year, currentMonth + 1, 0).getDate();

    const prevMonthDays = adjustedFirstDay;
    const prevMonth = new Date(year, currentMonth, 0);
    const daysInPrevMonth = prevMonth.getDate();

    for (let i = prevMonthDays - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      const prevMonthDate = new Date(year, currentMonth - 1, day);
      const prevMonthName = prevMonthDate.toLocaleString("default", {
        month: "long",
      });
      dates.push({
        day: prevMonthDate.toLocaleDateString("en-US", { weekday: "short" }),
        dayNumber: day.toString(),
        fullDate: `${prevMonthName} ${day}, ${prevMonthDate.getFullYear()}`,
        appointments: [],
        isCurrentMonth: false,
      });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, currentMonth, day);
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
      const dayNumber = day.toString();
      dates.push({
        day: dayName,
        dayNumber: dayNumber,
        fullDate: `${month} ${dayNumber}, ${year}`,
        appointments: [],
        isCurrentMonth: true,
      });
    }

    const totalCells = dates.length;
    const remainingCells = 42 - totalCells;
    for (let day = 1; day <= remainingCells; day++) {
      const nextMonthDate = new Date(year, currentMonth + 1, day);
      const nextMonthName = nextMonthDate.toLocaleString("default", {
        month: "long",
      });
      dates.push({
        day: nextMonthDate.toLocaleDateString("en-US", { weekday: "short" }),
        dayNumber: day.toString(),
        fullDate: `${nextMonthName} ${day}, ${nextMonthDate.getFullYear()}`,
        appointments: [],
        isCurrentMonth: false,
      });
    }

    return { dates, month, year };
};

export const generateWeekDates = (startDate: Date, weekOffset: number): WeekData => {
  const dates: DayData[] = [];
    let month: string = "";
    let year: number = 0;
    const baseDate = new Date(startDate);
    baseDate.setDate(baseDate.getDate() + weekOffset * 7);

    const dayOfWeek = baseDate.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    baseDate.setDate(baseDate.getDate() + mondayOffset);

    for (let i = 0; i < 7; i++) {
      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() + i);
      const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
        date.getDay()
      ];
      const dayNumber = date.getDate().toString();
      month = date.toLocaleString("default", { month: "long" });
      year = date.getFullYear();
      dates.push({
        day: `${dayName}`,
        dayNumber: `${dayNumber}`,
        fullDate: `${month} ${dayNumber}, ${year}`,
        appointments: [],
        isCurrentMonth: false,
      });
    }
    return { dates, month, year };
};

export const getAppointmentOffset = (time: string): number => {
  const minutes = parseInt(time.split(':')[1], 10);
  return Math.floor(minutes / 15) * 40; // 40 is 4 slot space for hours
};

export const getTimeRowHeight = (hour: string, days: DayData[]): number => {
  const maxSlots = days.reduce((max: number, day: DayData) => {
    const appointmentsInHour = day.appointments.filter(apt => apt.time.startsWith(hour.slice(0, 2)));
    if (appointmentsInHour.length === 0) return max;
    const lastAppointment = appointmentsInHour.sort((a, b) => b.time.localeCompare(a.time))[0];
    const lastMinute = parseInt(lastAppointment.time.split(':')[1], 10);
    const slotCount = Math.ceil((lastMinute + 15) / 15);
    return Math.max(max, slotCount);
  }, 0);
  return maxSlots === 0 ? 70 : 4 * 40;
};