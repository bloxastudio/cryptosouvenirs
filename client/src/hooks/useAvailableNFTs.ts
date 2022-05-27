import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "@redux/store";
import useAxios from "axios-hooks";
import { ethers } from "ethers";

export const useAvailableNFTs = (props: useAvailableNFTsProps) => {
  const { position } = props;
  const { account } = useSelector((state: AppState) => state.blockchain);
  const [loading, setLoading] = useState(false);
  const previousPositionRef = useRef<GeolocationPosition | null>(position);

  const [{ data, error }, executeAvailableNFTs] = useAxios(
    {
      url: "/available-nfts",
      method: "POST",
    },
    { manual: true }
  );

  const getAvailableNFTs = useCallback(async () => {
    setLoading(true);
    if (
      account &&
      position &&
      (!previousPositionRef.current ||
        !areSamePositions(position, previousPositionRef.current))
    ) {
      const {
        coords: { latitude, longitude },
      } = position;

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const signedLocation = await signer.signMessage(
        ethers.utils.arrayify(ethers.utils.id(`${latitude},${longitude}`))
      );

      previousPositionRef.current = position;

      await executeAvailableNFTs({
        data: {
          walletId: account,
          latitude,
          longitude,
          signedLocation,
        },
      });
    }
    setLoading(false);
  }, [position, account]);

  useEffect(() => {
    // Refetch when position is changed
    if (data) {
      getAvailableNFTs();
    }
  }, [position]);

  return { data, loading, error, getAvailableNFTs };
};

const areSamePositions = (a: GeolocationPosition, b: GeolocationPosition) => {
  return (
    a.coords.latitude === b.coords.longitude &&
    a.coords.longitude === b.coords.longitude
  );
};

export interface useAvailableNFTsProps {
  position: GeolocationPosition | null;
}
