import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { savePreference, getPreference, UserLocation } from '@/services/data-store';
import { calculateZmanim, ZmanimResult } from '@/services/zmanim-service';
import { Calendar as CalendarIcon, ArrowLeft } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const DEFAULT_LOCATION: UserLocation = {
  latitude: 31.7767, // Jerusalem
  longitude: 35.2345, // Jerusalem
  timezone: 'Asia/Jerusalem',
  locationName: 'Jerusalem',
};

const ZmanimPage: React.FC = () => {
  const [location, setLocation] = useState<UserLocation>(DEFAULT_LOCATION);
  const [zmanim, setZmanim] = useState<ZmanimResult | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    const loadLocation = async () => {
      const savedLocation = await getPreference<UserLocation>('userLocation');
      console.log("DEBUG: ZmanimPage - Saved Location from localforage:", savedLocation);
      if (savedLocation) {
        setLocation(savedLocation);
      }
    };
    loadLocation();
  }, []);

  useEffect(() => {
    if (location.latitude && location.longitude && location.timezone) {
      const calculatedZmanim = calculateZmanim(location, selectedDate);
      setZmanim(calculatedZmanim);
    }
  }, [location, selectedDate]);

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocation(prev => ({ ...prev, [name]: name === 'latitude' || name === 'longitude' ? parseFloat(value) : value }));
  };

  const handleSaveLocation = async () => {
    await savePreference('userLocation', location);
    const calculatedZmanim = calculateZmanim(location, selectedDate);
    setZmanim(calculatedZmanim);
    toast.success('Location saved successfully!');
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <Button asChild variant="outline" className="mb-4">
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </Button>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl">Zmanim Calculator Settings</CardTitle>
          <CardDescription>Set your location to calculate Zmanim.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <Label htmlFor="locationName">Location Name</Label>
              <Input
                id="locationName"
                name="locationName"
                value={location.locationName || ''}
                onChange={handleLocationChange}
                placeholder="e.g., Jerusalem"
              />
            </div>
            <div>
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                name="latitude"
                type="number"
                step="0.0001"
                value={location.latitude}
                onChange={handleLocationChange}
                placeholder="e.g., 31.7767"
              />
            </div>
            <div>
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                name="longitude"
                type="number"
                step="0.0001"
                value={location.longitude}
                onChange={handleLocationChange}
                placeholder="e.g., 35.2345"
              />
            </div>
            <div>
              <Label htmlFor="timezone">Timezone (e.g., America/New_York)</Label>
              <Input
                id="timezone"
                name="timezone"
                value={location.timezone}
                onChange={handleLocationChange}
                placeholder="e.g., Asia/Jerusalem"
              />
            </div>
          </div>
          <Button onClick={handleSaveLocation} className="w-full">
            Save Location
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            Zmanim for {location.locationName || 'Custom Location'}
          </CardTitle>
          <CardDescription className="flex items-center space-x-2">
            <span>Date: {zmanim?.date || 'N/A'}</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[180px] justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => setSelectedDate(date || new Date())}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {zmanim ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-lg">
              <div className="font-semibold">Alos Hashachar:</div> <div>{zmanim.alosHashachar}</div>
              <div className="font-semibold">Sunrise:</div> <div>{zmanim.sunrise}</div>
              <Separator className="col-span-2 my-2" />
              <div className="font-semibold">Sof Zman Shma (MGA):</div> <div>{zmanim.sofZmanShmaMGA}</div>
              <div className="font-semibold">Sof Zman Shma (GRA):</div> <div>{zmanim.sofZmanShmaGRA}</div>
              <div className="font-semibold">Sof Zman Tefilla (MGA):</div> <div>{zmanim.sofZmanTefillaMGA}</div>
              <div className="font-semibold">Sof Zman Tefilla (GRA):</div> <div>{zmanim.sofZmanTefillaGRA}</div>
              <Separator className="col-span-2 my-2" />
              <div className="font-semibold">Chatzos:</div> <div>{zmanim.chatzos}</div>
              <div className="font-semibold">Mincha Gedola:</div> <div>{zmanim.minchaGedola}</div>
              <div className="font-semibold">Mincha Ketana:</div> <div>{zmanim.minchaKetana}</div>
              <div className="font-semibold">Plag HaMincha:</div> <div>{zmanim.plagHaMincha}</div>
              <Separator className="col-span-2 my-2" />
              <div className="font-semibold">Sunset:</div> <div>{zmanim.sunset}</div>
              <div className="font-semibold">Tzeit Hakochavim:</div> <div>{zmanim.tzeit}</div>
            </div>
          ) : (
            <p className="text-center text-gray-500">Please save a valid location to see Zmanim.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ZmanimPage;