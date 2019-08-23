const OrganizationsCalls = {};

const API_KEY = process.env.REACT_APP_API_KEY;
const ID = process.env.REACT_APP_ID;

OrganizationsCalls.searchOrganizations = function searchOrganizations() {
    // console.log('searchOrganizations')
    const url = `https://api.data.charitynavigator.org/v2/Organizations?app_id=${ID}&app_key=${API_KEY}&pageSize=5&rated=true&state=WA&city=Seattle`;
    return fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'            
        }
    })
    .then(result => result.json())
    .then(data => OrganizationsCalls.getOrganizationDetails(data))
    // .then(result => OrganizationsCalls.simplifyOrgRatings(result))
    .catch(err => Error(err, "Loading Organizations"));
}

OrganizationsCalls.getOrganizationDetails = function getOrganizationDetails(organizations) {
    return Promise.all(organizations.map(organization => OrganizationsCalls.getOrganization(organization)))
};

OrganizationsCalls.getOrganization = function getOrganization(organization) {
    console.log('about to fetch')
    const url = `https://api.data.charitynavigator.org/v2/Organizations/${organization.ein}?app_id=${ID}&app_key=${API_KEY}`;
    return fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(result => {
        if (result.status === 200) return result.json()
    })
    .then(data => {
        const orgDetails = {...data, ...organization };
        return OrganizationsCalls.simplifyOrgDetails(orgDetails);
    })
    .catch(err => Error(err, "Loading Organization"));
}

// OrganizationsCalls.simplifyOrgRatings = function simplifyOrgRatings(organization) {
//     console.log(organization, 'line42')
//     const orgRatingDetails = {
//         ratingDate: organization.currentRating.publicationDate,
//         ratingImg: organization.currentRating.ratingImage.small,
//         rating: organization.currentRating.rating,
//         financialRating: organization.currentRating.financialRating.score,
//         accountabilityRating: organization.currentRating.accountabilityRating.score
//     };
//     return orgRatingDetails;
// };

OrganizationsCalls.simplifyOrgDetails = function simplifyOrgDetails(organization) {
    console.log(organization, 'ooo')
    const orgDetails = {
        charityName: organization.charityName,
        ein: organization.ein,
        tagLine: organization.tagLine,
        mission: organization.mission,
        website: organization.websiteURL,
        cause: organization.cause.causeName,
        category: organization.category.categoryName,
        city: organization.mailingAddress.city,
        state: organization.mailingAddress.stateOrProvince,
        phone: organization.phoneNumber,
        email: organization.generalEmail || 'None Available',
        currentRating: organization.currentRating.score,
        ratingDate: organization.currentRating.publicationDate,
        ratingImg: organization.currentRating.ratingImage.small,
        rating: organization.currentRating.rating,
        financialRating: organization.currentRating.financialRating.score,
        accountabilityRating: organization.currentRating.accountabilityRating.score

    };
    return orgDetails;
};

export default OrganizationsCalls;