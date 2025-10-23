const BASE_URL =
  process.env.NEXT_PUBLIC_APP_ENV === 'localhost' ? 'https://api.socialguard.online/api' : 'https://api.socialguard.online/api'

// export const BASE_URL = process.env.NEXT_PUBLIC_APP_ENV === 'localhost' ? 'http://127.0.0.1:8000/api' : 'http://202.44.231.31/api';

// const BASE_URL =
//   process.env.NEXT_PUBLIC_APP_ENV === 'localhost' ? 'http://127.0.0.1:8000/api' : 'http://127.0.0.1:8000/api'

export default {
  apiUrl: BASE_URL,
  loginEndpoint: `${BASE_URL}/auth/login`,
  registerEndpoint: `${BASE_URL}/auth/register`,
  storageTokenKeyName: 'accessToken',
  userInfo: `${BASE_URL}/user/info`,
  createRole: `${BASE_URL}/role/create`,
  createOrgType: `${BASE_URL}/organization-type/create`,
  updateOrgType: `${BASE_URL}/organization-type/update`,
  createOrgGroup: `${BASE_URL}/organization-group/create`,
  updateOrgGroup: `${BASE_URL}/organization-group/update`,
  createSource: `${BASE_URL}/source/create`,
  updateSource: `${BASE_URL}/source/update`,
  createDomain: `${BASE_URL}/domain/create`,
  updateDomain: `${BASE_URL}/domain/update`,
  createOrganization: `${BASE_URL}/organization/create`,
  updateOrganization: `${BASE_URL}/organization/update`,
  updateCampaign: `${BASE_URL}/campaign/update`,
  updateContent: `${BASE_URL}/organization-content/update`,
  updateRole: `${BASE_URL}/role/update`
}
