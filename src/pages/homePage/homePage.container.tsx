import { FC, useEffect } from 'react';
import { HomePageComponent } from './homePage.component';
import { getValues } from '../../common/utils/api/google';

type HomePageContainerProps = Readonly<{
}>;

const GOOGLE_SHEETS_API_KEY = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY;


export const HomePageContainer: FC<HomePageContainerProps> = () => {

  useEffect(() => {
    if (GOOGLE_SHEETS_API_KEY) {
      getValues(GOOGLE_SHEETS_API_KEY, "A:F")
        .then(res => console.log("SUCCESS", res))
        .catch(err => console.error("ERROR", err))
    }
  }, [])

  return (
    <div>
      <HomePageComponent />
    </div>
  );
};

HomePageContainer.displayName = 'HomePageContainer';
