import { FC } from 'react';
import { BallTriangle } from "react-loader-spinner";
import { DirectorRow } from '../../modules/google/google';
import { PersonDetails } from '../../modules/tmdb/tmdb';


type HomePageProps = Readonly<{
  isLoading: boolean;
  isSpinning: boolean;
  onSpinButtonClick: () => void;
  spinningResult?: DirectorRow;
  director?: PersonDetails;
}>;

export const HomePageComponent: FC<HomePageProps> = ({ director, isLoading, isSpinning, spinningResult, onSpinButtonClick }) => {
  if (isLoading) {
    return <BallTriangle
      radius={5}
      ariaLabel="ball-triangle-loading"
      wrapperClass="loader-wrapper"
    />
  }

  if (!spinningResult) {
    return <button className='spin-button' type='button' onClick={onSpinButtonClick}>SPIN</button>
  }

  if (isSpinning || !director) {
    return (
      <div className="spinning-director-name">
        {spinningResult?.name}
      </div>
    );
  }

  if (director) {
    return <div className="selected-director">
      <div className='selected-director__header'>
        <img src={director.image} alt={director.name} className='selected-director__photo' />
        <div className='selected-director__details'>
          <div className='selected-director__name'>{director.name}</div>
          <div className='selected-director__country'>{director.country}</div>
          <div className='selected-director__period'>{director.period}</div>
        </div>
      </div>
      <div className='selected-director__movies'>{director.movies?.map(movie => (
        <div className='selected-director__movie' key={movie.id}>
          <img src={movie.poster} className='selected-director__movie-poster' alt={movie.title} />
          <div className='selected-director__movie-details'>
            <div className='selected-director__movie-title'>{movie.title}</div>
            <div className='selected-director__movie-year'>{new Date(movie.release_date).getFullYear()}</div>
          </div>
        </div>
      ))}</div>

    </div>
  }

  return <div>Error</div>


};

HomePageComponent.displayName = 'HomePageComponent';
