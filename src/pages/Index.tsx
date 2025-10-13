
import { MadeWithDyad } from "@/components/made-with-dyad";
import CalendarWidget from "@/components/CalendarWidget";
import EventsWidget from "@/components/EventsWidget";
import RemindersWidget from "@/components/RemindersWidget";
import SeasonalImage from "@/components/SeasonalImage";
import ZmanimWidget from "@/components/ZmanimWidget";

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-primary to-secondary p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-5xl font-extrabold text-white tracking-tight">
            Good Morning
          </h1>
          <p className="text-lg text-white/80 mt-2">
            Here's your overview for today.
          </p>
        </header>
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <SeasonalImage />
            <EventsWidget />
          </div>
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