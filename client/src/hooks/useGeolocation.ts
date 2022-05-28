import { useState, useEffect } from "react";

export const useGeolocation = (props: UseGeolocationProps) => {
  const { enabled, onChange } = props;
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (enabled && navigator.geolocation) {
      const onSuccess = (_position: GeolocationPosition) => {
        setPosition(_position);

        if (onChange) {
          onChange(_position);
        }
      };

      const onError = (error: GeolocationPositionError) =>
        setError(error.message);

      // navigator.geolocation.getCurrentPosition(onSuccess, onError);

      const watchId = navigator.geolocation.watchPosition(onSuccess, onError);
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [enabled]);

  return {
    position,
    error,
  };
};

export interface UseGeolocationProps {
  enabled: boolean;
  onChange: (position: GeolocationPosition) => void;
}
