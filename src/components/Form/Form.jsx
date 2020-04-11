import * as React from 'react'
import './Form.css';

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', weather: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=9190638005eccb8c3ab7c13acd670d43&lang=ru&units=metric`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({ city: result.name ,weather: result.weather[0].description, temp: result.main.temp, 
            humidity: result.main.humidity, wind: result.wind.speed })
        }
      )
    event.preventDefault();
  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <label>
          Город:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Отправить" />
      </form>
      <section className="information">
              <div>Погода в городе: {this.state.city}</div>
              <div>За окном: {this.state.weather}</div>
              <div>Температура: {this.state.temp}</div>
              <div>Влажность: {this.state.humidity}</div>    
              <div>Ветер: {this.state.wind}</div>
            </section> 
      </div>
    );
  }
}

export default NameForm;