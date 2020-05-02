import * as React from 'react'
import Form from '../components/Form/Form'
import { connect } from 'react-redux'
import { GET_URL } from '../../constants'
// TODO везде добавить логирование
// Значения из store -> props
const mapStateToProps = state => ({
  isLoaded: state.information.isLoaded,
  result: state.information.result,
  recommendation: state.information.recommendation,
  weather: state.information.weather
});
// store reducers -> props methods
const mapDispatchToProps = dispatch => ({
  loadInformation: payload => dispatch({ type: 'LOAD_INFORMATION', payload }),
  setRecommendation: payload => dispatch({ type: 'SET_RECOMMENDATION', payload }),
  setResult: payload => dispatch({ type: 'SET_RESULT', payload }),
});

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', clothes: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.location = ''
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    if ((event.target.value.length) || (event.target.value.length === 0)) {
      this.props.loadInformation({ recommendation: '' })
    }
  }

  handleReset(event) {
    // TODO добаивть логику для reset
    // this.setState({ error: '' });
  }

  async handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(GET_URL(this.state.value))
      const result = await response.json()
      const recommendation = this.getRecommendation(result)
      this.props.setRecommendation(recommendation)
      this.props.loadInformation({ isLoaded: true, recommendation, result })
      this.props.setResult({ result })
      // await this.setState({ 
      //   city: result.name, 
      //   weather: result.weather[0].description, 
      //   temp: result.main.temp,
      //   humidity: result.main.humidity, 
      //   wind: result.wind.speed, 
      // });
    } catch (err) {
        // this.setState({ error: err})
    }
  };

  // теперь это чистая функция, которая просто отдает рекомендацию, что надеть
  // result - входной параметр
  getRecommendation(result) {
    // закомментировала, как ненужное, если испоьзвуется redux
    // if ((this.state.weather === "дождь" || this.state.weather === "небольшой дождь") && (this.state.temp >= 18)) {
    //   this.setState({clothes: "На улице тепло, но возьмите зонт"})
    // }
    // else if ((this.state.temp >= 18)) {
    //   this.setState({clothes: "На улице тепло :)"})
    // }
    // else if (this.state.weather === ("дождь" || "небольшой дождь")) {
    //   this.setState({clothes: "Возьмите зонт"})
    // }
    // else if (((this.state.temp <= 17) && (this.state.temp >= 0))) {
    //   this.setState({clothes: "На улице прохладно, утеплитесь"})
    // }
    // else if (this.state.temp < 0) {
    //   this.setState({clothes: "На улице холодно! Оденьтесь тепло!"})
    // }
    // else if (this.state.temp < -30) {
    //   this.setState({clothes: "На улице очень холодно! Останьтесь дома!"})
    // }
    let clothesRecommendation = '' // начальное значение - пустая строка
    // в качестве источника данных используем data
    // TODO добавить обработку данныз, в случае, если result - не содержит данных
    // TODO проверить структуру приходящих данных - добавила result.main.temp вместо result.temp
    if ((result.weather === "дождь" || result.weather === "небольшой дождь") && (result.temp >= 18)) {
      clothesRecommendation = "На улице тепло, но возьмите зонт"
    }
    else if ((result.temp >= 18)) {
      clothesRecommendation = "На улице тепло :)"
    }
    else if (result.weather === ("дождь" || "небольшой дождь")) {
      clothesRecommendation = "Возьмите зонт"
    }
    else if (((result.main.temp <= 17) && (result.main.temp >= 0))) {
      clothesRecommendation = "На улице прохладно, утеплитесь"
    }
    else if (result.temp < 0) {
      clothesRecommendation = "На улице холодно! Оденьтесь тепло!"
    }
    else if (result.temp < -30) {
      clothesRecommendation = "На улице очень холодно! Останьтесь дома!"
    }
    // Просто возвращаем значение рекомендации
    return clothesRecommendation
  };
  render() {
    // TODO добавить ошибку в store
    // const { error } = this.state
    return <Form handleSubmit={this.handleSubmit}/>

  }
}
// {this.props.isLoaded && <Information city={this.state.city} weather={this.state.weather} temp={this.state.temp} humidity={this.state.humidity} wind={this.state.wind}/> }
export default connect(mapStateToProps, mapDispatchToProps)(NameForm);

//const error = false
//if (error) {
//  return (
//    <Error handleReset={this.handleReset}/>
//  )
//}
//return (
//  <main className="content">
//    <form className="form" onSubmit={this.handleSubmit}>
//      <div className="form__text">Где вы хотите узнать погоду?</div>
//
//      <input className="form__input" type="text" value={this.state.value} onChange={this.handleChange} placeholder=" Город"/>
//
//      <input className="form__button" type="submit" value="Узнать" />
//    </form>
//    {this.props.isLoaded && <Information props={this.props.result}/>}
//
//    {this.props.isLoaded && <Helper clothes={this.props.recommendation}/>}
//
//  </main>
//);