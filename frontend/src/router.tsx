import { createBrowserRouter } from 'react-router-dom';
import { LayoutWithNavbar } from './layout/LayoutWithNavbar';
import { MainLayout } from './layout/MainLayout';
import { MINER_TYPE } from './models/MinerType';
import { ConformancePage } from './pages/ConformancePage';
import { DiscoverConfigure } from './pages/DiscoverConfigure';
import { DiscoverPage } from './pages/DiscoverPage';
import { DiscoverView } from './pages/DiscoverView';
import { HomePage } from './pages/HomePage';
import { LogOperationSelection } from './pages/LogOperationSelection';
import { Logs } from './pages/Logs';
import { MinePage } from './pages/MinePage';
import { ModelOperationSelection } from './pages/ModelOperationSelection';
import { Models } from './pages/Models';

export enum TargetURL {
    HOME = '/',

    // Logs Specific Pages
    LOGS = '/logs',
    LOGS_OPERATION = '/logs/operation/:logName',
    ALPHA_MINE = '/logs/mine/alpha/:logName',
    HEURISTIC_MINE = '/logs/mine/heuristic/:logName',
    DISCOVER_SELECT_CONSTRAINTS = '/logs/discover/:logName',
    DISCOVER_CONFIGURE_CONSTRAINTS = '/logs/discover/:logName/configure',
    DISCOVER_VIEW_MODEL = '/logs/discover/:logName/view',

    // Model Specific Pages
    MODELS = '/models',
    MODELS_OPERATION = '/models/operation/:modelName',
    CONFORMANCE = '/models/conformance/:logName',
    EDIT = '/models/edit/:logName',
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
                element: <MinePage miningType={MINER_TYPE.ALPHA} />,
            },
            {
                path: TargetURL.HEURISTIC_MINE,
                element: <MinePage miningType={MINER_TYPE.HEURISTIC} />,
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
