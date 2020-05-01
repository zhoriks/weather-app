import * as React from 'react'
import Information from '../Information/Information' 
import Helper from '../Helper/Helper'
import Error from '../Error/Error'  
import './form.css';
import { connect } from 'react-redux'

const mapStateToProps = state => ({ ...state.information.isLoaded });
const mapDispatchToProps = dispatch => ({
  loadInformation: payload =>
    dispatch({ type: 'LOAD_INFORMATION', payload })
});

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', clothes: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.clothesHelps = this.clothesHelps.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    if ((event.target.value.length) || (event.target.value.length === 0)) {
      this.setState({ clothes: "" });
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
      await this.props.loadInformation({isLoaded: true})
      // await this.setState({ 
      //   city: result.name, 
      //   weather: result.weather[0].description, 
      //   temp: result.main.temp,
      //   humidity: result.main.humidity, 
      //   wind: result.wind.speed, 
      // });
        this.clothesHelps()
    } catch (err) {
        this.setState({ error: err})
    }
  };

  clothesHelps() {    
    if ((this.state.weather === "дождь" || this.state.weather === "небольшой дождь") && (this.state.temp >= 18)) {
      this.setState({clothes: "На улице тепло, но возьмите зонт"})
    }
    else if ((this.state.temp >= 18)) {
      this.setState({clothes: "На улице тепло :)"})
    }
    else if (this.state.weather === ("дождь" || "небольшой дождь")) {
      this.setState({clothes: "Возьмите зонт"})
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
    const { error } = this.state
    if (error) {
      return (
        <Error handleReset={this.handleReset}/>
      )
    }
    return (
      <main className="content">
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form__text">Где вы хотите узнать погоду?</div>
          <input className="form__input" type="text" value={this.state.value} onChange={this.handleChange} placeholder=" Город"/>
          <input className="form__button" type="submit" value="Узнать" />
        </form>
        {this.props.isLoaded && <div>Is loaded</div>}
        <Helper clothes={this.state.clothes}/>
      </main>
    );
  }
}
// {this.props.isLoaded && <Information city={this.state.city} weather={this.state.weather} temp={this.state.temp} humidity={this.state.humidity} wind={this.state.wind}/> }
export default connect(mapStateToProps, mapDispatchToProps)(NameForm);