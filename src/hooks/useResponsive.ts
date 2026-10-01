import { useWindowDimensions, Platform } from 'react-native';

export interface ResponsiveInfo {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isWide: boolean; // tablet or desktop (>= 768px)
  isWeb: boolean;
  contentMaxWidth: number;
  feedColumns: number;
  profileColumns: number;
  marketplaceColumns: number;
  communityColumns: number;
}

export function useResponsive(): ResponsiveInfo {
  const { width, height } = useWindowDimensions();

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;
  const isWide = width >= 768;
  const isWeb = Platform.OS === 'web';

  const feedColumns = width < 680 ? 2 : width < 1024 ? 3 : 4;
  const profileColumns = width < 600 ? 3 : width < 1024 ? 4 : 5;
  const marketplaceColumns = width < 720 ? 1 : width < 1100 ? 2 : 3;
  const communityColumns = width < 768 ? 1 : 2;

  return {
    width,
    height,
    isMobile,
    isTablet,
    isDesktop,
    isWide,
    isWeb,
    contentMaxWidth: 1280,
    feedColumns,
    profileColumns,
    marketplaceColumns,
    communityColumns,
  };
}
