
function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = "/dashboard";

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  surveys: {
    root: path(ROOTS_DASHBOARD, 'surveys'),
    new: path(ROOTS_DASHBOARD, '/new'),
    survey: path(ROOTS_DASHBOARD, '/:sid')
  }

}
