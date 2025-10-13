import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getPreference, UserLocation } from '@/services/data-store';
import { calculateZmanim, ZmanimResult } from '@/services/zmanim-service';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { ArrowRightCircle } from 'lucide-react';

const DEFAULT_LOCATION: UserLocation = {
  latitude: 31.7767,
  longitude: 35.2345,
  timezone: 'Asia/Jerusalem',
  locationName: 'Jerusalem',
};

const ZmanimWidget: React.FC = () => {
  const [location, setLocation] = useState<UserLocation>(DEFAULT_LOCATION);
  const [zmanim, setZmanim] = useState<ZmanimResult | null>(null);
  const [selectedDate] = useState<Date>(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const loadLocationAndZmanim = async () => {
      const savedLocation = await getPreference<UserLocation>('userLocation');
      console.log("DEBUG: ZmanimWidget - Saved Location from localforage:", savedLocation);
      const currentLocation = savedLocation || DEFAULT_LOCATION;
      setLocation(currentLocation);
      
      const calculatedZmanim = calculateZmanim(currentLocation, selectedDate);
      setZmanim(calculatedZmanim);
    };
    loadLocationAndZmanim();
  }, [selectedDate]);

  return (
    <Card 
      onClick={() => navigate('/zmanim')}
      className="cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-white/30 dark:border-gray-700/50 h-full flex flex-col"
    >
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Today's Zmanim</CardTitle>
          <CardDescription>For {location.locationName}</CardDescription>
          <CardDescription>{format(selectedDate, "PPP")}</CardDescription>
        </div>
        <ArrowRightCircle className="h-6 w-6 text-gray-400" />
      </CardHeader>
      <CardContent className="flex-grow">
        {zmanim ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div className="font-semibold">Sunrise:</div> <div>{zmanim.sunrise}</div>
            <div className="font-semibold">Sof Zman Shma:</div> <div>{zmanim.sofZmanShmaGRA}</div>
            <div className="font-semibold">Chatzos:</div> <div>{zmanim.chatzos}</div>
            <div className="font-semibold">Sunset:</div> <div>{zmanim.sunset}</div>
            <div className="font-semibold">Tzeit Hakochavim:</div> <div>{zmanim.tzeit}</div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading Zmanim...</p>
        )}
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground text-center w-full">Click to see more and change location</p>
      </CardFooter>
    </Card>
  );
};

export default ZmanimWidget;