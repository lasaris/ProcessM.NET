import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from './layout/MainLayout';
import { HomePage } from './pages/HomePage';
import { MiningTypeSelectionPage } from './pages/MiningTypeSelectionPage';

export const TargetURL = {
    HOME: '/',
    MINING_TYPE_SELECTION: '/mining-select',
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
            {
                path: TargetURL.MINING_TYPE_SELECTION,
                element: <MiningTypeSelectionPage />,
            },
        ],
    },
]);
