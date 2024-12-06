import { STRINGS } from "@/constants/Strings";

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <div className="text-2xl font-bold">{STRINGS.LOADING}</div>
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
