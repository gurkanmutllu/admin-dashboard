import User from "@/models/User";
import LoadingSpinner from "./LoadingSpinner";

export const renderAuthContent = (
  loading: boolean, 
  user: User | null, 
  content: React.ReactNode
) => {
    if (loading) {
      return <LoadingSpinner />;
    }

    if (!user) {
      return null; // Will redirect via useEffect
    }

    return content; // Authenticated durumunda content'i render et
}