
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { savePreference, getPreference, UserLocation } from '@/services/data-store';
import { calculateZmanim, ZmanimResult } from '@/services/zmanim-service';
import { Calendar as CalendarIcon, ArrowLeft, Settings, MapPin, Sun, Sunset, Coffee } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';

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
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const loadLocation = async () => {
      const savedLocation = await getPreference<UserLocation>('userLocation');
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
    setIsSettingsOpen(false);
  };

  const renderZmanimList = (zmanimSubset: { [key: string]: string }) => (
    <div className="space-y-3">
      {Object.entries(zmanimSubset).map(([key, value], index, arr) => (
        <React.Fragment key={key}>
          <div className="flex justify-between items-center text-base">
            <span className="text-white/80">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
            <span className="font-semibold">{value}</span>
          </div>
          {index < arr.length - 1 && <Separator className="bg-white/10" />}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-primary to-secondary p-4 sm:p-6 lg:p-8 text-white">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <Button asChild variant="ghost" className="hover:bg-white/10">
            <Link to="/">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Dashboard
            </Link>
          </Button>
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight">
              Today's Zmanim
            </h1>
            <p className="text-white/80 text-lg mt-1">
              {zmanim?.date || 'N/A'}
            </p>
          </div>
          <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-white/10">
                <Settings className="h-6 w-6" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white border-gray-700">
              <DialogHeader>
                <DialogTitle>Location Settings</DialogTitle>
                <DialogDescription>
                  Set your location to calculate Zmanim accurately.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="locationName" className="text-right">
                    Name
                  </Label>
                  <Input id="locationName" name="locationName" value={location.locationName || ''} onChange={handleLocationChange} className="col-span-3 bg-gray-700 border-gray-600" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="latitude" className="text-right">
                    Latitude
                  </Label>
                  <Input id="latitude" name="latitude" type="number" value={location.latitude} onChange={handleLocationChange} className="col-span-3 bg-gray-700 border-gray-600" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="longitude" className="text-right">
                    Longitude
                  </Label>
                  <Input id="longitude" name="longitude" type="number" value={location.longitude} onChange={handleLocationChange} className="col-span-3 bg-gray-700 border-gray-600" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="timezone" className="text-right">
                    Timezone
                  </Label>
                  <Input id="timezone" name="timezone" value={location.timezone} onChange={handleLocationChange} className="col-span-3 bg-gray-700 border-gray-600" />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleSaveLocation} variant="secondary">Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </header>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex items-center gap-2 text-2xl font-semibold">
                <MapPin className="h-6 w-6" />
                {location.locationName || 'Custom Location'}
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full md:w-[280px] justify-start text-left font-normal bg-transparent hover:bg-white/20 border-white/20 text-base",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => setSelectedDate(date || new Date())}
                  initialFocus
                  className="text-white"
                />
              </PopoverContent>
            </Popover>
        </div>

        <main>
          {zmanim ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="bg-white/5 border-0 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Coffee className="h-6 w-6" />
                    Morning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {renderZmanimList({
                    "Alos Hashachar": zmanim.alosHashachar,
                    "Sunrise": zmanim.sunrise,
                    "Sof Zman Shma (MGA)": zmanim.sofZmanShmaMGA,
                    "Sof Zman Shma (GRA)": zmanim.sofZmanShmaGRA,
                    "Sof Zman Tefilla (MGA)": zmanim.sofZmanTefillaMGA,
                    "Sof Zman Tefilla (GRA)": zmanim.sofZmanTefillaGRA,
                  })}
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-0 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Sun className="h-6 w-6" />
                    Midday
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {renderZmanimList({
                    "Chatzos": zmanim.chatzos,
                    "Mincha Gedola": zmanim.minchaGedola,
                    "Mincha Ketana": zmanim.minchaKetana,
                  })}
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-0 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Sunset className="h-6 w-6" />
                    Afternoon & Evening
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {renderZmanimList({
                    "Plag HaMincha": zmanim.plagHaMincha,
                    "Sunset": zmanim.sunset,
                    "Tzeit Hakochavim": zmanim.tzeit,
                  })}
                </CardContent>
              </Card>
            </div>
          ) : (
            <p className="text-center text-white/80">Please save a valid location to see Zmanim.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default ZmanimPage;
