
function Weather( { weather, localTime } ) {

    const weatherIconCode = weather.weather[0].icon;
    const weatherDescription = weather.weather[0].description;
    const descriptionArray = weatherDescription.split(' ');
    const descriptionSentence = [];
    descriptionArray.map( word => {
      const descriptionUpperCase = word[0].toUpperCase() + word.slice(1);
      descriptionSentence.push(descriptionUpperCase);
    });
    const completeSentence = descriptionSentence.join(' ');

  return (
    <div className='weather'>         
        <h2>{ weather.name }, { weather.sys.country }</h2>
        <p>{ localTime }</p>
        <p>{ Math.round( weather.main.temp.toFixed(1) ) }℃</p>
        <p>High: { Math.round( weather.main.temp_max.toFixed(1) ) }℃</p>
        <p>Low: { Math.round( weather.main.temp_min.toFixed(1) ) }℃</p>
        <p>{ completeSentence }</p>
        <img src={`https://openweathermap.org/img/wn/${ weatherIconCode }@2x.png`} alt="weather icon" />
        <p>Humidity: { weather.main.humidity }%</p>
        <p>Wind Speed: { weather.wind.speed }km/h</p>
        <p>Pressure: { weather.main.pressure } hPa</p>
    </div>
  )
}

export default Weather;