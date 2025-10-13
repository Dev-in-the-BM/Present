import localforage from 'localforage';

// Configure localforage instance
const dataStore = localforage.createInstance({
  name: 'zmanimApp',
  storeName: 'userPreferences',
});

export const savePreference = async <T>(key: string, value: T): Promise<void> => {
  try {
    await dataStore.setItem(key, value);
  } catch (error) {
    console.error(`Error saving preference ${key}:`, error);
  }
};

export const getPreference = async <T>(key: string): Promise<T | null> => {
  try {
    return await dataStore.getItem<T>(key);
  } catch (error) {
    console.error(`Error getting preference ${key}:`, error);
    return null;
  }
};

export const removePreference = async (key: string): Promise<void> => {
  try {
    await dataStore.removeItem(key);
  } catch (error) {
    console.error(`Error removing preference ${key}:`, error);
  }
};

// Define a type for location data
export interface UserLocation {
  latitude: number;
  longitude: number;
  timezone: string;
  locationName?: string;
}