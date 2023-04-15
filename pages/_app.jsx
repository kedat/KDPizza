import '../styles/globals.css';
import { Provider } from 'react-redux';
import store from '../store';
import { ThemeProvider } from 'next-themes';
import { appWithTranslation } from 'next-i18next';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute='class' enableSystem={true}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default appWithTranslation(MyApp);
