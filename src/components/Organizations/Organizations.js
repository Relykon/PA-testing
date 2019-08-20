import React from 'react';
import OrganizationsCalls from '../../Models/OrganizationsCalls.js';
// import { Link } from 'react-router-dom';

class Organizations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            organizations: []
        };
    }

    loadOrganizations() {
        OrganizationsCalls.searchOrganizations()
            .then(orgs => {
                console.log(orgs, 'Organizations')
                this.setState({ organizations: orgs });
            })
            .catch(err => Error(err, "Loading Organizations"));
    }

    render() {

        let organizationsList = this.state.organizations.map(organization => (
            <div className="OrganizationsList">
                <h3>{organization.charityName}</h3>
                <h4>{organization.tagLine}</h4>
                <p>{organization.mission}</p>
                <p>{organization.category}</p>
                <p>{organization.currentRating}</p>
                <p>{organization.cause}</p>
                <a href={organization.websiteURL}>{organization.charityName}'s Website</a>
            </div>
        ));

        return (
            <div>
                <h2>View Organizations:</h2>
                {organizationsList}
            </div>
        )
    }
};

export default Organizations;