import { FC, useEffect, useState } from 'react';
import { HomePageComponent } from './homePage.component';
import { DirectorRow, getSheetData } from '../../modules/google/google';
import { PersonDetails, getPersonDetails, getPersonMovieCredits } from '../../modules/tmdb/tmdb';
import { WrapperComponent } from '../../common/components/wrapper/wrapper.component';

type HomePageContainerProps = Readonly<{
}>;


export const HomePageContainer: FC<HomePageContainerProps> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSpinning, setIsSpinning] = useState(false);
  const [directors, setDirectors] = useState<DirectorRow[]>([])
  const [spinningResult, setSpinningResult] = useState<DirectorRow | undefined>(undefined);
  const [director, setDirector] = useState<PersonDetails | undefined>(undefined);

  useEffect(() => {
    getSheetData().then(setDirectors).finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    if (!isSpinning && !!spinningResult) {
      getPersonDetails(spinningResult)
        .then(dir => getPersonMovieCredits(dir.id)
          .then(movies => ({ ...dir, movies }))
        )
        .then(setDirector)
    }
  }, [isSpinning, spinningResult])

  const spinWheel = () => {
    setIsSpinning(true);

    const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;
    const startTime = Date.now();

    const updateInterval = () => {
      const elapsed = Date.now() - startTime;
      const t = Math.min(1, elapsed / 2000); // 3000ms for 3 seconds
      const newInterval = lerp(50, 200, t); // Adjust the range (100 to 500) for speed
      const randomIndex = Math.floor(Math.random() * directors.length);
      setSpinningResult(directors[randomIndex]);
      if (t < 1) {
        setTimeout(updateInterval, newInterval);
      } else {
        setIsSpinning(false);
      }
    };
    updateInterval();
  };

  return (
    <WrapperComponent>
      <HomePageComponent director={director} isLoading={isLoading} isSpinning={isSpinning} spinningResult={spinningResult} onSpinButtonClick={spinWheel} />
    </WrapperComponent>
  );
};

HomePageContainer.displayName = 'HomePageContainer';
