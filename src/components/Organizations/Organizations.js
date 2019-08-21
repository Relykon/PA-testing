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
                console.log(this.state.organizations, 'L17')
                this.setState({ organizations: orgs });
                console.log(this.state.organizations, 'L19')
            })
            .catch(err => Error(err, "Loading Organizations"));
    }

    componentDidMount() {
        this.loadOrganizations();
    }

    render() {

        let organizationsList = this.state.organizations.map(organization => (
            <div className="OrganizationsList">
                <h3>{organization.charityName}</h3>
                <h4>{organization.tagLine}</h4>
                <p>{organization.mission}</p>
                <p>Category: {organization.category}</p>
                <p>Current Rating: {organization.currentRating}</p>
                <p>Cause: {organization.cause}</p>
                <a href={organization.websiteURL}>{organization.charityName}'s Website</a>
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