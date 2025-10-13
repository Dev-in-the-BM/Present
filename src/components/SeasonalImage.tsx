import { Card, CardContent } from '@/components/ui/card';

const SeasonalImage = () => {
  return (
    <Card>
      <CardContent className="p-0 aspect-video">
        <img
          src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=2070&auto=format&fit=crop"
          alt="Seasonal nature"
          className="rounded-lg object-cover w-full h-full"
        />
      </CardContent>
    </Card>
  );
};

export default SeasonalImage;