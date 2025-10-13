import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { ArrowRightCircle } from "lucide-react";

const EventsWidget = () => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate("/events")}
      className="cursor-pointer hover:bg-white/20 transition-all duration-300 h-full"
    >
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>Your schedule for the week.</CardDescription>
        </div>
        <ArrowRightCircle className="h-6 w-6 text-white/80" />
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          <li className="flex items-center justify-between transition-all duration-300 hover:bg-white/10 p-2 rounded-md">
            <div>
              <p className="font-semibold">Team Meeting</p>
              <p className="text-sm text-white/80">
                10:00 AM - 11:00 AM
              </p>
            </div>
            <div className="text-sm text-white/80">Today</div>
          </li>
          <Separator className="bg-white/20" />
          <li className="flex items-center justify-between transition-all duration-300 hover:bg-white/10 p-2 rounded-md">
            <div>
              <p className="font-semibold">Project Deadline</p>
              <p className="text-sm text-white/80">Submit final report</p>
            </div>
            <div className="text-sm text-white/80">Tomorrow</div>
          </li>
          <Separator className="bg-white/20" />
          <li className="flex items-center justify-between transition-all duration-300 hover:bg-white/10 p-2 rounded-md">
            <div>
              <p className="font-semibold">Doctor's Appointment</p>
              <p className="text-sm text-white/80">2:00 PM</p>
            </div>
            <div className="text-sm text-white/80">Friday</div>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default EventsWidget;