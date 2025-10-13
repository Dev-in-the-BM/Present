import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const RemindersWidget = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reminders</CardTitle>
        <CardDescription>Don't forget these tasks.</CardDescription>
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