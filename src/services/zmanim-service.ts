import { ComplexZmanimCalendar, GeoLocation } from 'kosher-zmanim';
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
  candleLighting?: string;
  parsha?: string;
}

const DEFAULT_LAT = 31.7767; // Jerusalem
const DEFAULT_LON = 35.2345; // Jerusalem
const DEFAULT_TZ = 'Asia/Jerusalem';

export const calculateZmanim = (location: UserLocation, date: Date): ZmanimResult => {
  // Robustly parse location data with fallbacks to prevent errors
  const lat = parseFloat(String(location.latitude));
  const lon = parseFloat(String(location.longitude));

  const validLat = isNaN(lat) ? DEFAULT_LAT : lat;
  const validLon = isNaN(lon) ? DEFAULT_LON : lon;
  const validTimezone = location.timezone || DEFAULT_TZ;
  const validLocationName = location.locationName || 'Default Location';

  const geoLocation = new GeoLocation(
    validLocationName,
    validLat,
    validLon,
    validTimezone,
  );

  const zmanimCalendar = new ComplexZmanimCalendar(geoLocation);
  zmanimCalendar.setDate(date);

  const formatTime = (timeValue: Date | null | undefined): string => {
    // Check for valid Date object before formatting
    if (timeValue instanceof Date && !isNaN(timeValue.getTime())) {
      return timeValue.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    }
    return 'N/A';
  };

  return {
    date: date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    alosHashachar: formatTime(zmanimCalendar.getAlosHashachar()),
    sunrise: formatTime(zmanimCalendar.getSunrise()),
    sofZmanShmaMGA: formatTime(zmanimCalendar.getSofZmanShmaMGA()),
    sofZmanShmaGRA: formatTime(zmanimCalendar.getSofZmanShmaGRA()),
    sofZmanTefillaMGA: formatTime(zmanimCalendar.getSofZmanTfilaMGA()),
    sofZmanTefillaGRA: formatTime(zmanimCalendar.getSofZmanTfilaGRA()),
    chatzos: formatTime(zmanimCalendar.getChatzos()),
    minchaGedola: formatTime(zmanimCalendar.getMinchaGedola()),
    minchaKetana: formatTime(zmanimCalendar.getMinchaKetana()),
    plagHaMincha: formatTime(zmanimCalendar.getPlagHamincha()),
    sunset: formatTime(zmanimCalendar.getSunset()),
    tzeit: formatTime(zmanimCalendar.getTzais()),
  };
};