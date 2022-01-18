import { useContext } from 'react';
import { MapLoadingContext } from '../contexts/MapLoadingProvider';

export const useMapLoading = () => {
  const context = useContext(MapLoadingContext);

  if (context === undefined) {
    throw new Error('useMapLoading must be used within a MapLoadingProvider');
  }

  const { isLoading, setIsLoading } = context;

  const toggleIsLoading = (bool: boolean, time: number = 0) => {
    return new Promise(() => setTimeout(() => setIsLoading(bool), time));
  };

  return {
    isLoading,
    toggleIsLoading,
  };
};
