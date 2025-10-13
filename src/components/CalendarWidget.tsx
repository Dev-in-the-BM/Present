import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRightCircle } from "lucide-react";

const CalendarWidget = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate("/calendar")}
      className="cursor-pointer hover:bg-white/20 transition-all duration-300 h-full"
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Calendar</CardTitle>
        <ArrowRightCircle className="h-6 w-6 text-white/80" />
      </CardHeader>
      <CardContent className="flex justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md bg-transparent p-0 text-white animate-fade-in"
        />
      </CardContent>
    </Card>
  );
};

export default CalendarWidget;