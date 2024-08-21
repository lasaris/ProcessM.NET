import { createBrowserRouter } from 'react-router-dom';
import { LayoutWithNavbar } from './layout/LayoutWithNavbar';
import { MainLayout } from './layout/MainLayout';
import { MINER_TYPE } from './models/MinerType';
import { DiscoverConfigure } from './pages/DiscoverConfigure';
import { DiscoverPage } from './pages/DiscoverPage';
import { DiscoverView } from './pages/DiscoverView';
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
    CONFORMANCE = '/conformance/:logName',
    EDIT = '/edit/:logName',
    MODELS = '/models',

    //Discover
    DISCOVER_SELECT_CONSTRAINTS = '/discover/:logName',
    DISCOVER_CONFIGURE_CONSTRAINTS = '/discover/:logName/configure',
    DISCOVER_VIEW_MODEL = '/discover/:logName/view',
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
                <MinePage miningType={MINER_TYPE.ALPHA} />
            </LayoutWithNavbar>
        ),
    },
    {
        path: TargetURL.HEURISTIC_MINE,
        element: (
            <LayoutWithNavbar>
                <MinePage miningType={MINER_TYPE.HEURISTIC} />
            </LayoutWithNavbar>
        ),
    },
    {
        path: TargetURL.DISCOVER_SELECT_CONSTRAINTS,
        children: [
            {
                index: true,
                element: (
                    <LayoutWithNavbar>
                        <DiscoverPage />
                    </LayoutWithNavbar>
                ),
            },
            {
                path: TargetURL.DISCOVER_CONFIGURE_CONSTRAINTS,
                element: (
                    <LayoutWithNavbar>
                        <DiscoverConfigure />
                    </LayoutWithNavbar>
                ),
            },
            {
                path: TargetURL.DISCOVER_VIEW_MODEL,
                element: (
                    <LayoutWithNavbar>
                        <DiscoverView />
                    </LayoutWithNavbar>
                ),
            },
        ],
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
