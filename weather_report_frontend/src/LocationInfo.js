import React, { Component } from 'react';

class LocationInfo extends Component {
    constructor(props) {
        super(props);
        this.state = { weather: [] };
        this.getWeather = this.getWeather.bind(this);
    }

    componentDidMount() {
        this.getWeather(this.props.text);
    }


    render() {
        const weather = this.state.weather;


        return (
            <div>
                <h1>Current Weather Conditions</h1>
                <div className="card" style={{ width: "18rem" }}>
                    <div className="card-body">
                        <h5 className="card-title">{weather[0]?.temperature ?? "Not loaded yet"} {'\u00b0'}C</h5>
                        <p className="card-text">{weather[0]?.symbolPhrase ?? "Not loaded yet"}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Feels like {weather[0]?.feelsLikeTemp ?? "Not loaded yet"} {'\u00b0'}C</li>
                        <li className="list-group-item">Visibility {Math.floor(weather[0]?.visibility ?? 0)} m</li>
                        <li className="list-group-item">Wind {weather[0]?.windSpeed ?? "Not loaded yet"} km/h </li>
                    </ul>
                </div>
                <h2>Next 7 day forecast</h2>
                <div className="card-group">
                    {weather[1]?.map((forecast, index) => (
                        <div className="card" key={index}>
                            <div className="card-body" key={index + 10}>
                                <h5 className="card-title" key={index + 100}>{forecast?.date ?? "Not yet loaded!"}</h5>
                                <p className="card-text" key={index + 1000}>{forecast.maxTemp ?? "Not loaded yet"} {'\u00b0'}C</p>
                                <p className="card-text" key={index + 10000}><small className="text-muted" key={index + 100000}>{forecast.minTemp ?? "Not loaded yet"} {'\u00b0'}C</small></p>
                            </div>
                        </div>
                    )) ?? "Not yet loaded!"}
                </div>
            </div>
        )
    }

    async getWeather(locationID) {
        let weather = await api(locationID);
        this.setState({ weather }, async () => {
            await logCurrentWeather(this.props.text);
        });
    }
}

async function api(locationID) {
    return fetch(`/api//search/${locationID}`)
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                } else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }
            return resp.json();
        })
}

async function logCurrentWeather(locationID) {
    console.log(locationID);
    return fetch(`/api//search/${locationID}`, {
        method: 'post',
        headers: new Headers({
            'Content-Type': 'application/json',
        })
    })
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                } else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }
            return resp.json();
        })
}

export default LocationInfo;