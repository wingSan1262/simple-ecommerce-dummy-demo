import {createNavigationContainerRef} from '@react-navigation/native';
export const navigationRef = createNavigationContainerRef();

export const navigate = (name: any, params?: any) => {
  if (navigationRef.isReady() && navigationRef.current) {
    // @ts-ignore
    navigationRef.navigate(name, params);
  }
};

export const goBack = () => {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
};
