import { Loader2 } from "lucide-react";

/**
 * Loading Spinner component
 */

export const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="animate-spin text-white mb-4" size={48} />
      <p className="text-white text-lg">Loading weather data...</p>
    </div>
  );
};
