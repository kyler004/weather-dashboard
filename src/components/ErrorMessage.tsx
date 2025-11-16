import { AlertCircle, X } from "lucide-react";

interface ErrorMessageProps {
  message: string;
  onClose: () => void;
}

/**
 * Error message component
 */

export const ErrorMessage = ({ message, onClose }: ErrorMessageProps) => {
  return (
    <div className="glass-card p-6 mb-8 border-2 border-red-400/50 animate-fade-in">
      <div className="flex items-start gap-4">
        <AlertCircle className="text-red-300 shrink-0 mt-1" size={24} />

        {/* Error content */}
        <div className="flex-1">
          <h3 className="text-white font-semibold text-lg mb-1">
            Oops! Something went wrong
          </h3>
          <p className="txext-white/90">{message}</p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="text-white/70 hover:text-white transition-colors shrink-0"
          aria-label="Close error message"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};
