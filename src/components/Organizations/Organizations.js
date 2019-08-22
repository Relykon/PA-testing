import React from 'react';
import OrganizationsCalls from '../../Models/OrganizationsCalls.js';
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
                // console.log(orgs)
                this.setState({ organizations: orgs });
            })
            .catch(err => Error(err, "Loading Organizations"));
    }

    loadOrganization() {
        // OrganizationsCalls.getOrganization()
        // .then(org => {
        //     console.log(org)
        //     this.setState({ organization: org });
        // })
        // .catch(err => Error(err, "Loading Organization"));
    }

    componentDidMount() {
        this.loadOrganizations();
        this.loadOrganization();
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
                <p><b>Current Rating: </b>{organization.currentRating}</p>
                <p><b>Cause: </b>{organization.cause}</p>
                <a href={organization.website}>{organization.charityName}'s Website</a>
                <p>Phone Number: {organization.phone}</p>
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