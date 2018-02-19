import React from "react";

const APIKEY = "9797c866ca584ca6cf2800facaee5ff6";


class Heading extends React.Component {
  render() {
    return (
      <div className="main">
        <h1>Weather Forecast</h1>
        <p>Find out temperature, conditions, and more...</p>
      </div>
    );
  }
};

class Weather extends React.Component {
  render() {
    return (
      <div className="main">
        <br/>
        {this.props.city && this.props.country && <img src={`http://openweathermap.org/img/w/${this.props.icon}.png`} id="condition-image"/>}
        {this.props.city && this.props.country && <p>{this.props.city}, {this.props.country}</p>}
        {this.props.city && this.props.country && <p>{this.props.temperature} &#8451;</p>}
        {this.props.city && this.props.country && <p>Humidity: {this.props.humidity} %</p>}
        {this.props.city && this.props.country && <p>{this.props.description.toUpperCase()}</p>}
        {this.props.error && <p>{this.props.error}</p>}
      </div>
    );
  }
};

class Form extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.weatherInfo}>
        <p>
          <input type="text" name="city" placeholder="City" />
          <input type="text" name="country" placeholder="Country" />
        </p>
        <p><button>Get Weather Info</button></p>
      </form>
    );
  }
};

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,
  }


  weatherInfo = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${APIKEY}&units=metric`);
    const data = await api_call.json();
    if (data.cod == 404) {
      this.setState({
        temperature: null,
        city: null,
        country: null,
        humidity: null,
        description: null,
        icon: null,
        error: "Please make sure your inputs are valid."
      })
    } else if (city && country) {
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        error: null,
      });
    } else {
      this.setState({
        temperature: null,
        city: null,
        country: null,
        humidity: null,
        description: null,
        icon: null,
        error: "Please make sure you enter correct values."
      });
    }
  }
  render() {
    return (
      <div>
        <Heading />
        <Form weatherInfo={this.weatherInfo} />
        <Weather
          temperature={this.state.temperature}
          city={this.state.city}
          country={this.state.country}
          humidity={this.state.humidity}
          description={this.state.description}
          icon={this.state.icon}
          error={this.state.error}
        />
      </div>
    );
  }
}


export default App;