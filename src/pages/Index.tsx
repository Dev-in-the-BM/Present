import { MadeWithDyad } from "@/components/made-with-dyad";
import CalendarWidget from "@/components/CalendarWidget";
import EventsWidget from "@/components/EventsWidget";
import RemindersWidget from "@/components/RemindersWidget";
import SeasonalImage from "@/components/SeasonalImage";
import ZmanimWidget from "@/components/ZmanimWidget";

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-800 dark:via-slate-900 dark:to-black p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center lg:text-left">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">Welcome back! Here's your overview for today.</p>
        </header>
        
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <SeasonalImage />
            <EventsWidget />
          </div>
          
          {/* Right Column */}
          <div className="flex flex-col gap-6">
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