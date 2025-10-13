import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const EventsWidget = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
        <CardDescription>Your schedule for the week.</CardDescription>
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