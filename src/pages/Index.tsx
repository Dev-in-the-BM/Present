import { MadeWithDyad } from "@/components/made-with-dyad";
import CalendarWidget from "@/components/CalendarWidget";
import EventsWidget from "@/components/EventsWidget";
import RemindersWidget from "@/components/RemindersWidget";
import SeasonalImage from "@/components/SeasonalImage";
import ZmanimWidget from "@/components/ZmanimWidget";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Welcome back! Here's your overview for today.</p>
        </header>
        
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <SeasonalImage />
            <EventsWidget />
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            <ZmanimWidget />
            <CalendarWidget />
            <RemindersWidget />
          </div>
        </main>
        
        <footer className="mt-8">
          <MadeWithDyad />
        </footer>
      </div>
    </div>
  );
};

export default Index;