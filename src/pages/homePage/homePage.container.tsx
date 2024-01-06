import { FC } from 'react';
import { HomePageComponent } from './homePage.component';

type HomePageContainerProps = Readonly<{
}>;

export const HomePageContainer: FC<HomePageContainerProps> = () => {
  return (
    <div>
      <HomePageComponent />
    </div>
  );
};

HomePageContainer.displayName = 'HomePageContainer';
