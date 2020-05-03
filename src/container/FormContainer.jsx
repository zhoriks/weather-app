import * as React from 'react'
import Form from '../components/Form/Form'
import { connect } from 'react-redux'
import { GET_URL } from '../constants/index'
import { loadInformation, setRecommendation, setChange, submitValue, setError  } from '../redux/action/action'

const mapStateToProps = state => ({
  isLoaded: state.form.isLoaded,
  result: state.form.result,
  recommendation: state.form.recommendation,
  weather: state.form.weather,
  value: state.form.value,
  error: state.form.error,
});
const mapDispatchToProps = dispatch => ({
  loadInformation: payload => dispatch(loadInformation(payload)),
  setRecommendation: payload => dispatch(setRecommendation(payload)),
  setChange: payload => dispatch(setChange(payload)),
  submitValue: payload => dispatch(submitValue(payload)),
  setError: payload => dispatch(setError(payload)),
});

class FormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleChange(event) {
    this.props.setChange({ value: event.target.value })
    if ((event.target.value.length) || (event.target.value.length === 0)) {
      this.props.loadInformation({ recommendation: '' })
    }
}

  handleReset(event) {
    this.props.setError({ error: '' });
  }

  async handleSubmit(event) {
    
    event.preventDefault();
    try {
      const response = await fetch(GET_URL(this.props.value))
      const result = await response.json()
      const recommendation = this.getRecommendation(result)
      this.props.setRecommendation(recommendation)
      this.props.loadInformation({ isLoaded: true, recommendation, result })
    } catch (err) {
        this.props.setError({ error: err });
    }
  };

  getRecommendation(result) {
    let clothesRecommendation = ''

    if ((result.weather === "дождь" || result.weather === "небольшой дождь") && (result.temp >= 18)) {
      clothesRecommendation = "На улице тепло, но возьмите зонт"
    }
    else if ((result.main.temp >= 18)) {
      clothesRecommendation = "На улице тепло :)"
    }
    else if (result.weather === ("дождь" || "небольшой дождь")) {
      clothesRecommendation = "Возьмите зонт"
    }
    else if (((result.main.temp <= 17) && (result.main.temp >= 0))) {
      clothesRecommendation = "На улице прохладно, утеплитесь"
    }
    else if (result.main.temp < 0) {
      clothesRecommendation = "На улице холодно! Оденьтесь тепло!"
    }
    else if (result.main.temp < -30) {
      clothesRecommendation = "На улице очень холодно! Останьтесь дома!"
    }
    return clothesRecommendation
  };
  render() {
    return <Form 
      handleSubmit={this.handleSubmit} 
      handleChange={this.handleChange}
      handleReset={this.handleReset}
      isLoaded={this.props.isLoaded}
      result={this.props.result}
      recommendation={this.props.recommendation}
      error={this.props.error}
    />
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);