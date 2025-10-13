import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { getPreference, UserLocation } from "@/services/data-store";
import { calculateZmanim, ZmanimResult } from "@/services/zmanim-service";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { ArrowRightCircle } from "lucide-react";

const DEFAULT_LOCATION: UserLocation = {
  latitude: 31.7767,
  longitude: 35.2345,
  timezone: "Asia/Jerusalem",
  locationName: "Jerusalem",
};

const ZmanimWidget: React.FC = () => {
  const [location, setLocation] = useState<UserLocation>(DEFAULT_LOCATION);
  const [zmanim, setZmanim] = useState<ZmanimResult | null>(null);
  const [selectedDate] = useState<Date>(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const loadLocationAndZmanim = async () => {
      const savedLocation = await getPreference<UserLocation>("userLocation");
      const currentLocation = savedLocation || DEFAULT_LOCATION;
      setLocation(currentLocation);

      const calculatedZmanim = calculateZmanim(currentLocation, selectedDate);
      setZmanim(calculatedZmanim);
    };
    loadLocationAndZmanim();
  }, [selectedDate]);

  return (
    <Card
      onClick={() => navigate("/zmanim")}
      className="cursor-pointer hover:bg-white/20 transition-all duration-300 h-full flex flex-col"
    >
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Today's Zmanim</CardTitle>
          <CardDescription>For {location.locationName}</CardDescription>
          <CardDescription>{format(selectedDate, "PPP")}</CardDescription>
        </div>
        <ArrowRightCircle className="h-6 w-6 text-white/80" />
      </CardHeader>
      <CardContent className="flex-grow">
        {zmanim ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div className="font-semibold transition-all duration-300 hover:bg-white/10 p-1 rounded-md">Sunrise:</div> <div className="transition-all duration-300 hover:bg-white/10 p-1 rounded-md">{zmanim.sunrise}</div>
            <div className="font-semibold transition-all duration-300 hover:bg-white/10 p-1 rounded-md">Sof Zman Shma:</div> <div className="transition-all duration-300 hover:bg-white/10 p-1 rounded-md">{zmanim.sofZmanShmaGRA}</div>
            <div className="font-semibold transition-all duration-300 hover:bg-white/10 p-1 rounded-md">Chatzos:</div> <div className="transition-all duration-300 hover:bg-white/10 p-1 rounded-md">{zmanim.chatzos}</div>
            <div className="font-semibold transition-all duration-300 hover:bg-white/10 p-1 rounded-md">Sunset:</div> <div className="transition-all duration-300 hover:bg-white/10 p-1 rounded-md">{zmanim.sunset}</div>
            <div className="font-semibold transition-all duration-300 hover:bg-white/10 p-1 rounded-md">Tzeit Hakochavim:</div> <div className="transition-all duration-300 hover:bg-white/10 p-1 rounded-md">{zmanim.tzeit}</div>
          </div>
        ) : (
          <p className="text-center text-white/80">Loading Zmanim...</p>
        )}
      </CardContent>
      <CardFooter>
        <p className="text-xs text-white/80 text-center w-full">
          Click to see more and change location
        </p>
      </CardFooter>
    </Card>
  );
};

export default ZmanimWidget;