import Dashboard from './pages/Dashboard';
import Buttons from './elements/Buttons';
import Alerts from './elements/Alerts';
import Grid from './elements/Grid';
import Typography from './elements/Typography';
import Cards from './elements/Cards';
import Tabs from './elements/Tabs';
import Tables from './elements/Tables';
import Breadcrumbs from './elements/Breadcrumbs';
import Forms from './elements/Forms';
import Loaders from './elements/Loaders';
import Avatars from './elements/Avatars';
import Invoice from './pages/Invoice';
import Analytics from './pages/Analytics';
import CmsPage from './pages/Cms';
import Widgets from './pages/Widgets';
import BlankPage from './pages/BlankPage';
import SubNav from './pages/SubNav';
import Feed from './pages/Feed';
import Modals from './elements/Modals';
import ProgressBars from './elements/ProgressBars';
import PaginationPage from './elements/Pagination';
import ErrorPage from './pages/404';
import Register from './pages/Register'
import Users from './pages/Users'
import Login from './pages/Login'
// import Maps from './pages/maps/Maps'
import ReceiveMaps from './pages/maps/ReceiveMaps'
import Receive from './pages/Receive'
import Donate from './pages/Donate'
import Scan from './pages/Scan'
import Generate from './pages/Generate'

// See React Router documentation for details: https://reacttraining.com/react-router/web/api/Route
const pageList = [
  {
    name: 'Dashboard',
    path: '/home',
    component: Dashboard,
  },
  {
    name: 'Register',
    path: '/register',
    component: Register,
    isLoggedOut: true
  },
  {
    name: 'Login',
    path: '/login',
    component: Login,
    isLoggedOut: true
  },
  // {
  //   name: 'Maps',
  //   path: '/maps',
  //   component: Maps,
  // },
  {
    name: 'Receive',
    path: '/receive',
    component: Receive,
  },
  {
    name: 'Donate',
    path: '/donate',
    component: Donate,
  },
  {
    name: 'ReceiveMaps',
    path: '/receivemaps',
    component: ReceiveMaps,
  },
  {
    name: 'Users',
    path: '/users',
    component: Users,
  },
  {
    name: 'Scan',
    path: '/Scan',
    component: Scan,
  },
  {
    name: 'Generate',
    path: '/generate',
    component: Generate,
  }

];

export default pageList;
