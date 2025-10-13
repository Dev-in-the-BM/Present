
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { savePreference, getPreference, UserLocation } from '@/services/data-store';
import { calculateZmanim, ZmanimResult } from '@/services/zmanim-service';
import { Calendar as CalendarIcon, ArrowLeft, Settings, MapPin } from 'lucide-react';
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

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-primary to-secondary p-4 sm:p-6 lg:p-8 text-white">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <Button asChild variant="ghost" className="hover:bg-white/10">
            <Link to="/">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Today's Zmanim
          </h1>
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

        <main>
          <Card className="bg-white/10 border-0 text-white">
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle className="text-3xl flex items-center">
                  <MapPin className="mr-3 h-7 w-7" />
                  {location.locationName || 'Custom Location'}
                </CardTitle>
                <CardDescription className="text-white/80 text-lg mt-1">
                  {zmanim?.date || 'N/A'}
                </CardDescription>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[200px] justify-start text-left font-normal bg-transparent hover:bg-white/20 border-white/20",
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
            </CardHeader>
            <CardContent className="mt-6">
              {zmanim ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 text-xl">
                  <div className="flex justify-between items-center p-3 rounded-lg transition-all hover:bg-white/10">
                    <span className="font-semibold">Alos Hashachar:</span>
                    <span>{zmanim.alosHashachar}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg transition-all hover:bg-white/10">
                    <span className="font-semibold">Sunrise:</span>
                    <span>{zmanim.sunrise}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg transition-all hover:bg-white/10">
                    <span className="font-semibold">Sof Zman Shma (MGA):</span>
                    <span>{zmanim.sofZmanShmaMGA}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg transition-all hover:bg-white/10">
                    <span className="font-semibold">Sof Zman Shma (GRA):</span>
                    <span>{zmanim.sofZmanShmaGRA}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg transition-all hover:bg-white/10">
                    <span className="font-semibold">Sof Zman Tefilla (MGA):</span>
                    <span>{zmanim.sofZmanTefillaMGA}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg transition-all hover:bg-white/10">
                    <span className="font-semibold">Sof Zman Tefilla (GRA):</span>
                    <span>{zmanim.sofZmanTefillaGRA}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg transition-all hover:bg-white/10">
                    <span className="font-semibold">Chatzos:</span>
                    <span>{zmanim.chatzos}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg transition-all hover:bg-white/10">
                    <span className="font-semibold">Mincha Gedola:</span>
                    <span>{zmanim.minchaGedola}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg transition-all hover:bg-white/10">
                    <span className="font-semibold">Mincha Ketana:</span>
                    <span>{zmanim.minchaKetana}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg transition-all hover:bg-white/10">
                    <span className="font-semibold">Plag HaMincha:</span>
                    <span>{zmanim.plagHaMincha}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg transition-all hover:bg-white/10">
                    <span className="font-semibold">Sunset:</span>
                    <span>{zmanim.sunset}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg transition-all hover:bg-white/10">
                    <span className="font-semibold">Tzeit Hakochavim:</span>
                    <span>{zmanim.tzeit}</span>
                  </div>
                </div>
              ) : (
                <p className="text-center text-white/80">Please save a valid location to see Zmanim.</p>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default ZmanimPage;
