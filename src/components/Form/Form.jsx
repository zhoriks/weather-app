import * as React from 'react'
import Information from '../Information/Information' 
import './Form.css';

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', isLoaded: false, clothes: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.clothesHelps = this.clothesHelps.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.setState({ clothes: "" });
    if (event.target.value.length) {
      this.setState ({isLoaded: false});
    }
  }

  handleReset(event) {
    this.setState({ error: '' });
  }

  async handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=9190638005eccb8c3ab7c13acd670d43&lang=ru&units=metric`)
      const result = await response.json()
      await this.setState({ 
        city: result.name, 
        weather: result.weather[0].description, 
        temp: result.main.temp,
        humidity: result.main.humidity, 
        wind: result.wind.speed, 
        isLoaded: true });
      await this.clothesHelps()
    } catch (err) {
        this.setState({ error: err})
    }
  };

  clothesHelps() {
    if (this.state.weather === ("дождь" || "небольшой дождь")) {
      this.setState({clothes: "Возьмите зонт"})
    } 
    else if ((this.state.temp >= 18)) {
      this.setState({clothes: "На улице тепло :)"})
    }
    else if (((this.state.temp <= 17) && (this.state.temp >= 0))) {
      this.setState({clothes: "На улице прохладно, утеплитесь"})
    }
    else if (this.state.temp < 0) {
      this.setState({clothes: "На улице холодно! Оденьтесь тепло!"})
    }
    else if (this.state.temp < -30) {
      this.setState({clothes: "На улице очень холодно! Останьтесь дома!"})
    }
  };

  render() {
    const { error, isLoaded } = this.state
    if (error) {
      return <div className="error">
        <div className="error__text">Такой город отыскать не удалось :(</div>
        <button className="error__button" onClick={this.handleReset}>Еще</button>
      </div>
    }
    return (
      <main className="content">
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form__text">Где вы хотите узнать погоду?</div>
          <input className="form__input" type="text" value={this.state.value} onChange={this.handleChange} placeholder=" Город"/>
          <input className="form__button" type="submit" value="Узнать" />
        </form>
        {isLoaded && <Information city={this.state.city} weather={this.state.weather} temp={this.state.temp} humidity={this.state.humidity} wind={this.state.wind}/> }
        <div className="helper">{this.state.clothes}</div>
      </main>
    );
  }
}

export default NameForm;