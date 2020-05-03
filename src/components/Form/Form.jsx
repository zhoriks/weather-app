import * as React from 'react'
import './form.css';
import Information from '../Information/Information'
import Helper from '../Helper/Helper'
import Error from '../Error/Error' 


function Form (props) {
    if (props.error) {
        return (
          <Error handleReset={props.handleReset}/>
        )
      }
    return (
      <main className="content">
        <form className="form" onSubmit={props.handleSubmit}>
          <div className="form__text">Где вы хотите узнать погоду?</div>

          <input className="form__input" type="text" value={props.value} onChange={props.handleChange} placeholder=" Город"/>

          <input className="form__button" type="submit" value="Узнать" />
        </form>
        {props.isLoaded && <Information 
          city={props.result.name}
          weather={props.result.weather[0].description}
          temp={props.result.main.temp}
          humidity={props.result.main.humidity}
          wind={props.result.wind.speed}
        />}
  
        {props.isLoaded && <Helper clothes={props.recommendation}/>}

      </main>
    );
}

export default Form