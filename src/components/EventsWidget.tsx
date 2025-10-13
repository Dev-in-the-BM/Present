import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { ArrowRightCircle } from 'lucide-react';

const EventsWidget = () => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate('/events')}
      className="cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-white/30 dark:border-gray-700/50 h-full"
    >
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>Your schedule for the week.</CardDescription>
        </div>
        <ArrowRightCircle className="h-6 w-6 text-gray-400" />
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          <li className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Team Meeting</p>
              <p className="text-sm text-muted-foreground">10:00 AM - 11:00 AM</p>
            </div>
            <div className="text-sm text-muted-foreground">Today</div>
          </li>
          <Separator />
          <li className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Project Deadline</p>
              <p className="text-sm text-muted-foreground">Submit final report</p>
            </div>
            <div className="text-sm text-muted-foreground">Tomorrow</div>
          </li>
          <Separator />
           <li className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Doctor's Appointment</p>
              <p className="text-sm text-muted-foreground">2:00 PM</p>
            </div>
            <div className="text-sm text-muted-foreground">Friday</div>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default EventsWidget;