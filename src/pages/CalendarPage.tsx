import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 to-pink-100 dark:from-gray-800 dark:to-black p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <Button asChild variant="outline" className="mb-4">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Full Calendar</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="p-0"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarPage;