import { createBrowserRouter } from 'react-router-dom';
import { LayoutWithNavbar } from './layout/LayoutWithNavbar';
import { MainLayout } from './layout/MainLayout';
import { ModelType } from './models/ImperativeModel';
import { AlphaMinerPage } from './pages/AlphaMinerPage';
import { ConformancePage } from './pages/ConformancePage';
import { DiscoverConfigure } from './pages/DiscoverConfigure';
import { DiscoverConfigureLog } from './pages/DiscoverConfigureLog';
import { DiscoverPage } from './pages/DiscoverPage';
import { DiscoverView } from './pages/DiscoverView';
import { ErrorPage } from './pages/ErrorPage';
import { HeuristicMinerPage } from './pages/HeuristicMinerPage';
import { HomePage } from './pages/HomePage';
import { LogOperationSelection } from './pages/LogOperationSelection';
import { Logs } from './pages/Logs';
import { ModelOperationSelection } from './pages/ModelOperationSelection';
import { Models } from './pages/Models';
import { OptimalAlignmentConformancePage } from './pages/OptimalAlignmentConformancePage';
import { ExistingLogWrapper } from './wrappers/ExistingLogWrapper';
import { ExistingModelWrapper } from './wrappers/ExistingModelWrapper';

export enum TargetURL {
    HOME = '/',

    // Logs Specific Pages
    LOGS = '/logs',
    LOGS_OPERATION = '/logs/operation/:entityName',
    ALPHA_MINE = '/logs/mine/alpha/:entityName',
    HEURISTIC_MINE = '/logs/mine/heuristic/:entityName',

    DISCOVER_CONFIGURE_CASE_ACTIVITY = '/logs/dsicover/:entityName/configure-log',
    DISCOVER_SELECT_CONSTRAINTS = '/logs/discover/:entityName',
    DISCOVER_CONFIGURE_CONSTRAINTS = '/logs/discover/:entityName/configure',
    DISCOVER_VIEW_MODEL = '/logs/discover/:entityName/view',

    // Model Specific Pages
    MODELS = '/models',
    MODELS_TABLE = '/models/:entityName',
    DECLARE_MODELS_OPERATION = '/models/operation/declare/:entityName',
    IMPERATIVE_MODELS_OPERATION = '/models/operation/imperative/:entityName',
    CONFORMANCE = '/models/conformance/:entityName',
    OPTIMAL_ALIGNMENT = '/models/conformance/alignment/:entityName',
}

export const router = createBrowserRouter([
    {
        path: TargetURL.HOME,
        element: <MainLayout />,
        errorElement: <ErrorPage errorMessage="Something went wrong..." />,
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
        errorElement: <ErrorPage errorMessage="Something went wrong..." />,
        children: [
            {
                index: true,
                element: <Logs />,
            },
            {
                path: TargetURL.LOGS_OPERATION,
                element: (
                    <ExistingLogWrapper>
                        <LogOperationSelection />,
                    </ExistingLogWrapper>
                ),
            },
            {
                path: TargetURL.ALPHA_MINE,
                element: (
                    <ExistingLogWrapper>
                        <AlphaMinerPage />,
                    </ExistingLogWrapper>
                ),
            },
            {
                path: TargetURL.HEURISTIC_MINE,
                element: (
                    <ExistingLogWrapper>
                        <HeuristicMinerPage />,
                    </ExistingLogWrapper>
                ),
            },
            {
                path: TargetURL.DISCOVER_CONFIGURE_CASE_ACTIVITY,
                element: (
                    <ExistingLogWrapper>
                        <DiscoverConfigureLog />,
                    </ExistingLogWrapper>
                ),
            },
            {
                path: TargetURL.DISCOVER_SELECT_CONSTRAINTS,
                children: [
                    {
                        index: true,
                        element: (
                            <ExistingLogWrapper>
                                <DiscoverPage />,
                            </ExistingLogWrapper>
                        ),
                    },
                    {
                        path: TargetURL.DISCOVER_CONFIGURE_CONSTRAINTS,
                        element: (
                            <ExistingLogWrapper>
                                <DiscoverConfigure />,
                            </ExistingLogWrapper>
                        ),
                    },
                    {
                        path: TargetURL.DISCOVER_VIEW_MODEL,
                        element: (
                            <ExistingLogWrapper>
                                <DiscoverView />,
                            </ExistingLogWrapper>
                        ),
                    },
                ],
            },
        ],
    },
    {
        path: TargetURL.MODELS,
        element: <LayoutWithNavbar />,
        errorElement: <ErrorPage errorMessage="Something went wrong..." />,
        children: [
            {
                path: TargetURL.MODELS_TABLE,
                element: <Models />,
            },
            {
                path: TargetURL.DECLARE_MODELS_OPERATION,
                element: (
                    <ExistingModelWrapper>
                        <ModelOperationSelection
                            modelType={ModelType.DECLARATIVE}
                        />
                        ,
                    </ExistingModelWrapper>
                ),
            },
            {
                path: TargetURL.IMPERATIVE_MODELS_OPERATION,
                element: (
                    <ExistingModelWrapper>
                        <ModelOperationSelection
                            modelType={ModelType.IMPERATIVE}
                        />
                        ,
                    </ExistingModelWrapper>
                ),
            },
            {
                path: TargetURL.CONFORMANCE,
                element: (
                    <ExistingModelWrapper>
                        <ConformancePage />,
                    </ExistingModelWrapper>
                ),
            },
            {
                path: TargetURL.OPTIMAL_ALIGNMENT,
                element: (
                    <ExistingModelWrapper>
                        <OptimalAlignmentConformancePage />,
                    </ExistingModelWrapper>
                ),
            },
        ],
    },
    {
        path: '*',
        element: <ErrorPage />,
        errorElement: <ErrorPage errorMessage="Something went wrong..." />,
    },
]);
