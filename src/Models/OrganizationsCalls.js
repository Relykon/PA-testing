const OrganizationsCalls = {};

const API_KEY = process.env.REACT_APP_API_KEY;
const ID = process.env.REACT_APP_ID;

OrganizationsCalls.searchOrganizations = function searchOrganizations() {
    console.log('searchOrganizations')
    const url = `https://api.data.charitynavigator.org/v2/Organizations?app_id=${ID}&app_key=${API_KEY}&pageSize=10&rated=true&state=WA&city=Seattle`;
    return fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'            
        }
    })
    .then(result => result.json())
    .then(data => OrganizationsCalls.getOrganizationDetails(data))
    .catch(err => Error(err, "Loading Organizations"));
}

OrganizationsCalls.getOrganization = function getOrganization(ein) {
    console.log('about to fetch')
    const url = `https://api.data.charitynavigator.org/v2/Organizations/${ein}?app_id=${ID}&app_key=${API_KEY}`;
    return fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(result => {
        if (result.status === 200) return result.json()
    })
    .then(data => OrganizationsCalls.simplifyOrganization(data))
    .catch(err => Error(err, "Loading Organization"));
}

OrganizationsCalls.getOrganizationDetails = function getOrganizationDetails(organizations) {
    return organizations.map(organization => OrganizationsCalls.getOrganization(organization.ein))
};

OrganizationsCalls.simplifyOrganization = function simplifyOrganization(organization) {
    console.log(organization, 'ooo')
    const orgDetails = {
        charityName: organization.charityName,
        ein: organization.ein,
        tagLine: organization.tagLine,
        mission: organization.mission,
        currentRating: organization.currentRating.score,
        website: organization.websiteURL,
        cause: organization.cause.causeName,
        category: organization.category.categoryName,
        city: organization.mailingAddress.city,
        state: organization.mailingAddress.stateOrProvince,
        phone: organization.phoneNumber
    };
    return orgDetails;
};

export default OrganizationsCalls;