import { FC, useEffect } from 'react';
import { HomePageComponent } from './homePage.component';
import { getSheetData } from '../../common/utils/google/google';

type HomePageContainerProps = Readonly<{
}>;



export const HomePageContainer: FC<HomePageContainerProps> = () => {

  useEffect(() => {
    getSheetData().then(data => console.log(data))
  }, [])

  return (
    <div>
      <HomePageComponent />
    </div>
  );
};

HomePageContainer.displayName = 'HomePageContainer';
