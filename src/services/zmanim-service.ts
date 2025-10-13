import { ComplexZmanimCalendar, GeoLocation } from 'kosher-zmanim'; // Directly import named exports
import { UserLocation } from './data-store';

export interface ZmanimResult {
  date: string;
  alosHashachar: string;
  sunrise: string;
  sofZmanShmaMGA: string;
  sofZmanShmaGRA: string;
  sofZmanTefillaMGA: string;
  sofZmanTefillaGRA: string;
  chatzos: string;
  minchaGedola: string;
  minchaKetana: string;
  plagHaMincha: string;
  sunset: string;
  tzeit: string;
  shkia: string;
  candleLighting?: string;
  parsha?: string;
}

export const calculateZmanim = (location: UserLocation, date: Date): ZmanimResult => {
  const geoLocation = new GeoLocation(
    location.locationName || 'Custom Location',
    location.latitude,
    location.longitude,
    location.timezone,
  );

  const zmanimCalendar = new ComplexZmanimCalendar(geoLocation);
  zmanimCalendar.setDate(date);

  // Ensure that 'timeValue' is an actual Date object before calling toLocaleTimeString.
  const formatTime = (timeValue: Date | null | undefined): string => {
    if (timeValue instanceof Date) {
      return timeValue.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    }
    // If it's not a Date object (e.g., null, undefined, or some other unexpected type), return 'N/A'.
    return 'N/A';
  };

  return {
    date: date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    alosHashachar: formatTime(zmanimCalendar.getAlosHashachar()),
    sunrise: formatTime(zmanimCalendar.getSunrise()),
    sofZmanShmaMGA: formatTime(zmanimCalendar.getSofZmanShmaMGA()),
    sofZmanShmaGRA: formatTime(zmanimCalendar.getSofZmanShmaGRA()),
    sofZmanTefillaMGA: formatTime(zmanimCalendar.getSofZmanTefillaMGA()),
    sofZmanTefillaGRA: formatTime(zmanimCalendar.getSofZmanTefillaGRA()),
    chatzos: formatTime(zmanimCalendar.getChatzos()),
    minchaGedola: formatTime(zmanimCalendar.getMinchaGedola()),
    minchaKetana: formatTime(zmanimCalendar.getMinchaKetana()),
    plagHaMincha: formatTime(zmanimCalendar.getPlagHaMincha()),
    sunset: formatTime(zmanimCalendar.getSunset()),
    tzeit: formatTime(zmanimCalendar.getTzais()),
    shkia: formatTime(zmanimCalendar.getShkia()),
  };
};