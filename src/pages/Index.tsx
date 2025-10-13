import { MadeWithDyad } from "@/components/made-with-dyad";
import ZmanimDisplay from "@/components/ZmanimDisplay";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 py-8">
      <ZmanimDisplay />
      <MadeWithDyad />
    </div>
  );
};

export default Index;