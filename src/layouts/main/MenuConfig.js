// components
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  user: getIcon('ic_user'),
  dashboard: getIcon('ic_dashboard'),
  download: getIcon('ic_download'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'My Jobs', path: '/jobs', icon: ICONS.dashboard },
      { title: 'My Account', path: '/account', icon: ICONS.user },
      { title: 'Resources', path: '/resources', icon: ICONS.download },
    ],
  }
];

export default navConfig;
