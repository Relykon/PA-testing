import React from 'react';
import OrganizationsCalls from '../../Models/OrganizationsCalls.js';
import './Organizations.css';
// import { Link } from 'react-router-dom';

class Organizations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            organizations: [],
            organization: {}
        };
    }

    loadOrganizations() {
        OrganizationsCalls.searchOrganizations()
            .then(orgs => {
                this.setState({ organizations: orgs });
            })
            .catch(err => Error(err, "Loading Organizations"));
    }

    componentDidMount() {
        this.loadOrganizations();
    }

    render() {

        let organizationsList = this.state.organizations.map(organization => (
            <div className="OrganizationsList">
                <hr/>
                <h3>{organization.charityName}</h3>
                <p>{organization.city}, {organization.state}</p>
                <h4>{organization.tagLine}</h4>
                <p>{organization.mission}</p>
                <p><b>Category: </b>{organization.category}</p>
                
                <p><b>Current (overall) Rating: </b>{organization.currentRating} </p>
                <ul>
                    <li><b>Rating Publication: </b>{organization.ratingDate}</li>
                    {/* <li><b>Image: </b>{organization.ratingImg}</li> */}
                    <li><b>Rating(?): </b>{organization.rating}</li>
                    <li><b>Financial Rating: </b>{organization.financialRating}</li>
                    <li><b>Accountability Rating: </b>{organization.accountabilityRating}</li>
                </ul>
                <p><b>Cause: </b>{organization.cause}</p>
                <a href={organization.website}>{organization.charityName}'s Website</a>
                <p><b>Phone Number: </b>{organization.phone}</p>
                <p><b>Email: </b>{organization.email}</p>
            </div>
        ));
        console.log(this.state.organizations, 'L30')

        return (
            <div>
                <h2>View Organizations:</h2>
                {organizationsList}
            </div>
        )
    }
};

export default Organizations;