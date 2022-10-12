// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

// ----------------------------------------------------------------------
const ROOT_JOBS = '/jobs';
export const PATH_JOBS = {
  root: ROOT_JOBS,
}

const ROOT_JOB = '/job';
export const PATH_JOB = {
  root: ROOT_JOB,
  jobNew: `${ROOT_JOB}/new/`,
  dashboard: (id) => path(ROOT_JOB, `/dashboard/${id}`),
  jobEdit: (id) => path(ROOT_JOB, `/edit/${id}`),
  submittal: (id) => path(ROOT_JOB, `/submittal/${id}`)
};

// ----------------------------------------------------------------------
const ROOTS_UNIT = '/unit';
export const PATH_UNIT = {
  view: (jobid) => path(ROOTS_UNIT, `/view/${jobid}`),
  add: (jobid) => path(ROOTS_UNIT, `/add/${jobid}`),
  configure: (jobid) => path(ROOTS_UNIT, `/configure/${jobid}`),
  edit: (jobid, unitid) => path(ROOTS_UNIT, `/edit/${jobid}/${unitid}`),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
};
