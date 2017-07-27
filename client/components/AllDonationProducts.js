import React, { Component } from 'react';
import axios from 'axios';


export default class AllDonationProducts extends Component {

  constructor () {
    super();
    this.state = {
      donations: []
    };
  }

  componentDidMount () {
    axios.get('/api/donations')
      .then(res => res.data)
      .then(donations => this.setState({ donations }));
  }

  render () {

    const donations = this.state.donations;

    return (
        <div>
            <h3>Support Our Kitties!!!</h3>
            <div className="row">
                {
                    donations.map(donation => (
                        <div className="col-xs-4" key={donation.id}>
                            <Link to={`/donations/${donation.id}`}>
                                <div className="caption">
                                    <h5>
                                        <span>{donation.name}</span>
                                    </h5>
                                    <small>{donation.songs.length} songs</small>
                                </div>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    )
  }
}
//maybe add description of the page 
