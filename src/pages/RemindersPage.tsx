import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RemindersPage = () => {
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
            <CardTitle className="text-2xl">Reminders</CardTitle>
          </CardHeader>
          <CardContent>
            <p>A full-featured reminders page is coming soon!</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RemindersPage;