import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { weatherSliceActions } from '../store/weather';
import { unsplashSliceActions } from '../store/unsplash';
import Weather from './Weather';
import { useEffect } from 'react';
import { openWeatherAPIKEY, unsplashAPIKEY } from '../api/apiKey';
import moment from 'moment';

function App() {
  
  let cityName;
  const dispatch = useDispatch();
  const weather = useSelector( state => state.weather.currentWeather );
  const localTime = useSelector( state => state.weather.localTime );
  const weatherExists = useSelector( state => state.weather.exist );
  const bgcImg = useSelector( state => state.unsplash.url );
  const imgExist = useSelector( state => state.unsplash.exist );

  useEffect(() => {
      imgExist ? document.body.style.backgroundImage = `url(${ bgcImg })` :
      document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?vancouver')`;
  } );

  const getWeather = async ( lat, lon ) => {
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${ lat }&lon=${ lon }&units=metric&appid=${ openWeatherAPIKEY }`);
    const localTime = res.data.timezone / 60;
    const currentTime = moment().utcOffset( localTime ).format( 'lll' );

    dispatch( weatherSliceActions.setWeather({
      res: res.data,
      localTime: currentTime,
      exist: true
    }));
  }

  const getBackgroundImg = async ( name ) => {
    const res = await axios.get(`https://api.unsplash.com/search/photos`, {
      params: { query: name,
                per_page: 20,
                orientation: 'landscape'
      },
      headers: {
        Authorization: `Client-ID ${ unsplashAPIKEY }`
      }
    });

    const randomImg = Math.floor( (Math.random() * 20) );
    let imgUrl = res.data.results[randomImg].urls.raw + '&w=1600';

    dispatch( unsplashSliceActions.setBgcImg( {
      url: imgUrl,
      exist: true
    }) );
  }

  const getGeoCode = async ( e ) => {
    e.preventDefault();
    cityName = e.target.city.value;

    if (!cityName) {
      e.target.city.value = '';
      alert('Please enter a city name');
      return;
    }

    await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${ cityName }&limit=5&appid=${ openWeatherAPIKEY }`)
    .then( ( res ) => {
      e.target.city.value = '';
      if(res.data.length === 0) {
        alert('No weather information found');
      }

      dispatch( weatherSliceActions.setGeolocation( { 
        lat: res.data[ 0 ].lat, 
        lon: res.data[ 0 ].lon 
      }) )

      getWeather( res.data[ 0 ].lat, res.data[ 0 ].lon );

      getBackgroundImg( cityName );
    });   
    e.target.city.value = '';
};

  return (
    <div className="App">
        {
          !weatherExists && 
          <h1>Weather By City</h1>
        }
        <form className="form" onSubmit={ getGeoCode } >
          <input type="text"
          name='city'
          placeholder='Search Weather by City'
          />
          <button onSubmit={ getGeoCode }>
          <svg  xmlns="https://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21.172 24l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z"/></svg>
          </button>
        </form> 
     
        { weatherExists && <Weather weather={ weather[0] } localTime={ localTime } /> } 
    </div>
  );
}

export default App;
