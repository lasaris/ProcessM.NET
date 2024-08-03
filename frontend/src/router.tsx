import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from './layout/MainLayout';
import { HomePage } from './pages/HomePage';

export const TargetURL = {
    HOME: '/',
};

export const router = createBrowserRouter([
    {
        path: TargetURL.HOME,
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
        ],
    },
]);
