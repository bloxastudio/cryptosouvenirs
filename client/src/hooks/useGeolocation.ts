import { useState, useEffect } from "react";

export interface UseGeolocationProps  {
    enabled: boolean
}

export const useGeolocation = (props: UseGeolocationProps) => {
    const { enabled } = props;
    const [position, setPosition] = useState<GeolocationPosition | null>(null);
    const [error, setError] = useState<string>("");
  
    useEffect(() => {
        if (enabled && navigator.geolocation) {
          const onError = (error: GeolocationPositionError) => setError(error.message);
    
          navigator.geolocation.getCurrentPosition(setPosition, onError);
    
          const watchId = navigator.geolocation.watchPosition(setPosition, onError);
          return () => navigator.geolocation.clearWatch(watchId);
        }
      }, [enabled]);

    return {
        position, error
    }
}
