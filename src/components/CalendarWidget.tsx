import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRightCircle } from 'lucide-react';

const CalendarWidget = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate('/calendar')}
      className="cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-white/30 dark:border-gray-700/50 h-full"
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Calendar</CardTitle>
        <ArrowRightCircle className="h-6 w-6 text-gray-400" />
      </CardHeader>
      <CardContent className="flex justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md bg-transparent p-0"
        />
      </CardContent>
    </Card>
  );
};

export default CalendarWidget;