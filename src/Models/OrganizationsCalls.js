const OrganizationsCalls = {};

// const API_KEY = process.env.REACT_APP_API_KEY;
// const ID = process.env.APP_ID;

OrganizationsCalls.searchOrganizations = function searchOrganizations() {
    console.log('searchOrganizations')
    const url = `https://api.data.charitynavigator.org/v2/Organizations?app_id=2c89e638&app_key=d3c949aec82ec22b164ff99c22503f6d&pageSize=10&rated=true&state=WA&city=Seattle`;
    return fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
            // 'apikey': API_KEY,
            // 'id': ID
        }
    })
    .then(result => result.json())
    .then(data => OrganizationsCalls.simplifyOrganizations(data))
    .catch(err => Error(err, "Loading Organizations"));
}

OrganizationsCalls.simplifyOrganizations = function simplifyOrganizations(organizations) {
    return organizations.map(organization => {
         const orgDetails = {
             charityName: organization.charityName,
             ein: organization.ein,
             tagLine: organization.tagLine,
             mission: organization.mission,
             currentRating: organization.currentRating.rating,
             website: organization.websiteURL,
             cause: organization.cause.causeName,
             category: organization.category.categoryName
         };
         return orgDetails;
    })
};

export default OrganizationsCalls;