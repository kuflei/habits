import Home from './Home';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n/i18n';

const withProviders = (Story: any) => (
    <ThemeProvider theme={{}}>
        <CssBaseline />
        <BrowserRouter>
            <I18nextProvider i18n={i18n}>
                <Story />
            </I18nextProvider>
        </BrowserRouter>
    </ThemeProvider>
);

export default {
    title: 'Pages/Home',
    component: Home,
    tags: ['autodocs'],
    decorators: [withProviders],
}

export const Default = () => <Home />;

