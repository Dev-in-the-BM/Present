import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { ArrowRightCircle } from 'lucide-react';

const RemindersWidget = () => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate('/reminders')}
      className="cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-white/30 dark:border-gray-700/50 h-full"
    >
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Reminders</CardTitle>
          <CardDescription>Don't forget these tasks.</CardDescription>
        </div>
        <ArrowRightCircle className="h-6 w-6 text-gray-400" />
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          <li className="flex items-center space-x-3">
            <Checkbox id="reminder1" />
            <Label htmlFor="reminder1" className="text-base">Call the electrician</Label>
          </li>
          <li className="flex items-center space-x-3">
            <Checkbox id="reminder2" defaultChecked />
            <Label htmlFor="reminder2" className="text-base line-through text-muted-foreground">Pick up groceries</Label>
          </li>
          <li className="flex items-center space-x-3">
            <Checkbox id="reminder3" />
            <Label htmlFor="reminder3" className="text-base">Book flight tickets</Label>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default RemindersWidget;