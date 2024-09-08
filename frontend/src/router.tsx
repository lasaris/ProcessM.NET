import { createBrowserRouter } from 'react-router-dom';
import { LayoutWithNavbar } from './layout/LayoutWithNavbar';
import { MainLayout } from './layout/MainLayout';
import { AlphaMinerPage } from './pages/AlphaMinerPage';
import { ConformancePage } from './pages/ConformancePage';
import { DiscoverConfigure } from './pages/DiscoverConfigure';
import { DiscoverPage } from './pages/DiscoverPage';
import { DiscoverView } from './pages/DiscoverView';
import { HeuristicMinerPage } from './pages/HeuristicMinerPage';
import { HomePage } from './pages/HomePage';
import { LogOperationSelection } from './pages/LogOperationSelection';
import { Logs } from './pages/Logs';
import { ModelOperationSelection } from './pages/ModelOperationSelection';
import { Models } from './pages/Models';

export enum TargetURL {
    HOME = '/',

    // Logs Specific Pages
    LOGS = '/logs',
    LOGS_OPERATION = '/logs/operation/:entityName',
    ALPHA_MINE = '/logs/mine/alpha/:entityName',
    HEURISTIC_MINE = '/logs/mine/heuristic/:entityName',
    DISCOVER_SELECT_CONSTRAINTS = '/logs/discover/:entityName',
    DISCOVER_CONFIGURE_CONSTRAINTS = '/logs/discover/:entityName/configure',
    DISCOVER_VIEW_MODEL = '/logs/discover/:entityName/view',

    // Model Specific Pages
    MODELS = '/models',
    MODELS_OPERATION = '/models/operation/:entityName',
    CONFORMANCE = '/models/conformance/:entityName',
    EDIT = '/models/edit/:entityName',
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
        element: <LayoutWithNavbar />,
        children: [
            {
                index: true,
                element: <Logs />,
            },
            {
                path: TargetURL.LOGS_OPERATION,
                element: <LogOperationSelection />,
            },
            {
                path: TargetURL.ALPHA_MINE,
                element: <AlphaMinerPage />,
            },
            {
                path: TargetURL.HEURISTIC_MINE,
                element: <HeuristicMinerPage />,
            },
            {
                path: TargetURL.DISCOVER_SELECT_CONSTRAINTS,
                children: [
                    {
                        index: true,
                        element: <DiscoverPage />,
                    },
                    {
                        path: TargetURL.DISCOVER_CONFIGURE_CONSTRAINTS,
                        element: <DiscoverConfigure />,
                    },
                    {
                        path: TargetURL.DISCOVER_VIEW_MODEL,
                        element: <DiscoverView />,
                    },
                ],
            },
        ],
    },
    {
        path: TargetURL.MODELS,
        element: <LayoutWithNavbar />,
        children: [
            {
                index: true,
                element: <Models />,
            },
            {
                path: TargetURL.MODELS_OPERATION,
                element: <ModelOperationSelection />,
            },
            {
                path: TargetURL.EDIT,
                element: <div>Edit Page</div>,
            },
            {
                path: TargetURL.CONFORMANCE,
                element: <ConformancePage />,
            },
        ],
    },
]);
