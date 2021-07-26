

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = "/dashboard";

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register')
}

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  surveys: {
    root: path(ROOTS_DASHBOARD, 'surveys'),
    new: path(ROOTS_DASHBOARD, '/new'),
    survey: path(ROOTS_DASHBOARD, '/:sid')
  }

}

