import { createBrowserRouter } from 'react-router-dom';
import { LayoutWithNavbar } from './layout/LayoutWithNavbar';
import { MainLayout } from './layout/MainLayout';
import { HomePage } from './pages/HomePage';
import { Logs } from './pages/Logs';
import { MinePage } from './pages/MinePage';
import { MiningChoicePage } from './pages/MiningChoicePage';
import { Models } from './pages/Models';

export enum TargetURL {
    HOME = '/',
    LOGS = '/logs',
    OPERATION = '/operation/:logName',
    ALPHA_MINE = '/mine/alpha/:logName',
    HEURISTIC_MINE = '/mine/heuristic/:logName',
    DISCOVER = '/discover/:logName',
    CONFORMANCE = '/conformance/:logName',
    EDIT = '/edit/:logName',
    MODELS = '/models',
}

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
    {
        path: TargetURL.LOGS,
        element: (
            <LayoutWithNavbar>
                <Logs />
            </LayoutWithNavbar>
        ),
    },
    {
        path: TargetURL.MODELS,
        element: (
            <LayoutWithNavbar>
                <Models />
            </LayoutWithNavbar>
        ),
    },
    {
        path: TargetURL.ALPHA_MINE,
        element: (
            <LayoutWithNavbar>
                <MinePage />
            </LayoutWithNavbar>
        ),
    },
    {
        path: TargetURL.HEURISTIC_MINE,
        element: (
            <LayoutWithNavbar>
                <MinePage />
            </LayoutWithNavbar>
        ),
    },
    {
        path: TargetURL.DISCOVER,
        element: (
            <LayoutWithNavbar>
                <div>Discover Page</div>
            </LayoutWithNavbar>
        ),
    },
    {
        path: TargetURL.EDIT,
        element: (
            <LayoutWithNavbar>
                <div>Edit Page</div>
            </LayoutWithNavbar>
        ),
    },
    {
        path: TargetURL.CONFORMANCE,
        element: (
            <LayoutWithNavbar>
                <div>Conformance Page</div>
            </LayoutWithNavbar>
        ),
    },
    {
        path: TargetURL.OPERATION,
        element: (
            <LayoutWithNavbar>
                <MiningChoicePage />
            </LayoutWithNavbar>
        ),
    },
]);
