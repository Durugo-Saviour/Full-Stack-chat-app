import { Zap } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center"
              style={{
                animation: "flashBlueEffect 1.5s infinite",
              }}
            >
              <Zap className="w-8 h-8 text-blue-500" />
            </div>

            <style>
              {`
    @keyframes flashBlueEffect {
      0% {
        transform: scale(1);
        box-shadow: 0 0 8px rgba(0, 191, 255, 0.5), 0 0 16px rgba(0, 191, 255, 0.4);
      }
      25% {
        transform: scale(1.1) translateX(1px);
        box-shadow: 0 0 12px rgba(0, 191, 255, 0.7), 0 0 24px rgba(0, 191, 255, 0.6);
      }
      50% {
        transform: scale(1) translateX(-1px);
        box-shadow: 0 0 10px rgba(0, 191, 255, 0.5), 0 0 20px rgba(0, 191, 255, 0.5);
      }
      75% {
        transform: scale(1.1) translateX(1px);
        box-shadow: 0 0 14px rgba(0, 191, 255, 0.75), 0 0 28px rgba(0, 191, 255, 0.6);
      }
      100% {
        transform: scale(1);
        box-shadow: 0 0 8px rgba(0, 191, 255, 0.5), 0 0 16px rgba(0, 191, 255, 0.4);
      }
    }
  `}
            </style>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-xl sm:text-2xl font-bold">Welcome to Flash</h2>
        <p className="text-gray-400 text-sm sm:text-base">
          Begin your journey through the multiverse with swift and seamless
          messaging.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
