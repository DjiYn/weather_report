import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = { locations: [] };
    }

    componentDidMount() {
        this.getLocations(this.props.text);
    }
    componentDidUpdate(prevProps) {
        if (this.props.text !== prevProps.text) {
            this.getLocations(this.props.text);
        }
    }
    render() {
        return (
            <div>
                {this.state.locations.map((location, index) => (
                    <div className="card" key={location.id + 3}>
                        <div className="card-body" key={location.id + 2}>
                            <h5 className="card-title" key={location.id + 1}>
                                <Link key={location.id} to={`/${location.id}`}>{location.name}</Link>
                            </h5>
                            <h6 className="card-subtitle mb-2 text-muted" key={location.id + 4}>{location.country}</h6>
                        </div>
                    </div>
                ))}

            </div >
        )
    }


    async getLocations(keyword) {
        let locations = await api(keyword);
        if (locations.length > 5) locations = locations.slice(0, 5);
        this.setState({ locations });
    }

}


async function api(keyword) {
    return fetch(`/api/${keyword}`)
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
export default SearchResults;