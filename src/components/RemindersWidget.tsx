import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ArrowRightCircle } from "lucide-react";

const RemindersWidget = () => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate("/reminders")}
      className="cursor-pointer hover:bg-white/20 transition-all duration-300 h-full"
    >
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Reminders</CardTitle>
          <CardDescription>Don't forget these tasks.</CardDescription>
        </div>
        <ArrowRightCircle className="h-6 w-6 text-white/80" />
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          <li className="flex items-center space-x-3 transition-all duration-300 hover:bg-white/10 p-2 rounded-md">
            <Checkbox id="reminder1" />
            <Label htmlFor="reminder1" className="text-base">
              Call the electrician
            </Label>
          </li>
          <li className="flex items-center space-x-3 transition-all duration-300 hover:bg-white/10 p-2 rounded-md">
            <Checkbox id="reminder2" defaultChecked />
            <Label
              htmlFor="reminder2"
              className="text-base line-through text-white/80"
            >
              Pick up groceries
            </Label>
          </li>
          <li className="flex items-center space-x-3 transition-all duration-300 hover:bg-white/10 p-2 rounded-md">
            <Checkbox id="reminder3" />
            <Label htmlFor="reminder3" className="text-base">
              Book flight tickets
            </Label>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default RemindersWidget;