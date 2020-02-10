const getApiObject = (dbProfile) => ({
  firstname: dbProfile.firstname,
  lastname: dbProfile.lastname,
  patronymic: dbProfile.patronymic,
  email: dbProfile.email,
  phone: dbProfile.phone,
  organization: dbProfile.organization,
  inn: dbProfile.inn,
  position: dbProfile.position,
  contact: {
    phone: dbProfile.contact_phone,
    country: dbProfile.contact_country,
    city: dbProfile.contact_city,
    street: dbProfile.contact_street,
    building: dbProfile.contact_building,
    office: dbProfile.contact_office,
  },
  extra: {
    website: dbProfile.extra_website,
    about: dbProfile.extra_about,
    interests: dbProfile.extra_interests,
    logo: dbProfile.extra_logo,
  },
});

const getDbObject = (apiProfile) => ({
  contact_phone: apiProfile.contact.phone,
  contact_country: apiProfile.contact.country,
  contact_city: apiProfile.contact.city,
  contact_street: apiProfile.contact.street,
  contact_building: apiProfile.contact.building,
  contact_office: apiProfile.contact.office,
  extra_website: apiProfile.extra.website,
  extra_about: apiProfile.extra.about,
  extra_interests: apiProfile.extra.interests,
  extra_logo: apiProfile.extra.logo,
})

module.exports = {
  getApiObject,
  getDbObject
} 