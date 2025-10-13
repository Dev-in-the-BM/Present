import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getPreference, UserLocation } from '@/services/data-store';
import { calculateZmanim, ZmanimResult } from '@/services/zmanim-service';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';

const DEFAULT_LOCATION: UserLocation = {
  latitude: 31.7767, // Jerusalem
  longitude: 35.2345, // Jerusalem
  timezone: 'Asia/Jerusalem',
  locationName: 'Jerusalem',
};

const ZmanimWidget: React.FC = () => {
  const [location, setLocation] = useState<UserLocation>(DEFAULT_LOCATION);
  const [zmanim, setZmanim] = useState<ZmanimResult | null>(null);
  const [selectedDate] = useState<Date>(new Date());

  useEffect(() => {
    const loadLocationAndZmanim = async () => {
      const savedLocation = await getPreference<UserLocation>('userLocation');
      const currentLocation = savedLocation || DEFAULT_LOCATION;
      setLocation(currentLocation);
      
      const calculatedZmanim = calculateZmanim(currentLocation, selectedDate);
      setZmanim(calculatedZmanim);
    };
    loadLocationAndZmanim();
  }, [selectedDate]);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Today's Zmanim</CardTitle>
        <CardDescription>For {location.locationName || 'Default Location'}</CardDescription>
        <CardDescription>{format(selectedDate, "PPP")}</CardDescription>
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
        <Button asChild variant="outline" className="w-full">
          <Link to="/zmanim">
            <Settings className="mr-2 h-4 w-4" />
            Change Location & See More
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ZmanimWidget;