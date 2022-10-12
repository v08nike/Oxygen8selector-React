import { createBrowserHistory } from 'history';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { ChartStyle } from './components/chart';
import ScrollToTop from './components/ScrollToTop';
import { ProgressBarStyle } from './components/ProgressBar';
import NotistackProvider from './components/NotistackProvider';
import MotionLazyContainer from './components/animate/MotionLazyContainer';

const history =  createBrowserHistory();

// ----------------------------------------------------------------------

export default function App() {
  return (
    <MotionLazyContainer>
      <ThemeProvider>
        <NotistackProvider>
          <ProgressBarStyle />
          <ChartStyle />
          <ScrollToTop />
          <Router history={history} />
        </NotistackProvider>
      </ThemeProvider>
    </MotionLazyContainer>
  );
}
