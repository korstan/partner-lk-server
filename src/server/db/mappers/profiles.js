const getApiObject = (dbProfile) => ({
  firstname: dbProfile.firstname,
  lastname: dbProfile.lastname,
  patronymic: dbProfile.patronymic,
  email: dbProfile.email,
  phone: dbProfile.phone,
  organization: dbProfile.organization,
  inn: dbProfile.inn,
  position: dbProfile.position,
  contactPhone: dbProfile.contact_phone,
  contactAddress: dbProfile.contact_address,
  contactCountry: dbProfile.contact_country,
  contactCity: dbProfile.contact_city,
  contactStreet: dbProfile.contact_street,
  contactBuilding: dbProfile.contact_building,
  contactOffice: dbProfile.contact_office,
  extraWebsite: dbProfile.extra_website,
  extraAbout: dbProfile.extra_about,
  extraInterests: dbProfile.extra_interests,
  extraLogo: dbProfile.extra_logo,
});

const getDbObject = (apiProfile) => ({
  contact_phone: apiProfile.contactPhone,
  contact_address: apiProfile.contactAddress,
  contact_country: apiProfile.contactCountry,
  contact_city: apiProfile.contactCity,
  contact_street: apiProfile.contactStreet,
  contact_building: apiProfile.contactBuilding,
  contact_office: apiProfile.contactOffice,
  extra_website: apiProfile.extraWebsite,
  extra_about: apiProfile.extraAbout,
  extra_interests: apiProfile.extraInterests,
  extra_logo: apiProfile.extraLogo,
});

module.exports = {
  getApiObject,
  getDbObject,
};
