import { useLogsDb } from '@/hooks/useLogsDb';
import { useModelsDb } from '@/hooks/useModelsDb';
import { NavLink } from '@/models/NavLink';
import { TargetURL } from '@/router';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { MyNavLink } from './MyNavLink';

export const NavBar: React.FC = () => {
    const navigate = useNavigate();
    const { entityName } = useParams();
    const { pathname } = useLocation();

    const { fetchSingleModel } = useModelsDb();
    const { fetchSingleLog } = useLogsDb();

    const [navLinks, setNavLinks] = useState<NavLink[]>([]);

    const getNavLinks = async () => {
        const links: NavLink[] = [
            {
                targetUrl: TargetURL.LOGS,
                title: 'Logs',
            },
        ];

        console.log(pathname);
        if (
            pathname.includes('models') &&
            entityName &&
            pathname.replace(entityName, '') !== '/models/'
        ) {
            const model = await fetchSingleModel(entityName);
            const targetUrl = TargetURL.MODELS_TABLE.replace(
                ':entityName',
                model.eventLogName
            );

            if (model && targetUrl) {
                links.push({
                    targetUrl,
                    title: 'Models',
                });
            }
        }

        if (pathname.includes('logs') && entityName) {
            const log = await fetchSingleLog(entityName);
            const targetUrl = TargetURL.MODELS_TABLE.replace(
                ':entityName',
                log.metadata.name
            );

            if (log && targetUrl) {
                links.push({
                    targetUrl,
                    title: 'Models',
                });
            }
        }

        return links;
    };

    // Refetch links whenever the pathname changes
    useEffect(() => {
        const updateNavLinks = async () => {
            const links = await getNavLinks();
            setNavLinks(links);
        };

        updateNavLinks();
    }, [pathname, entityName]); // Add dependencies to watch for changes

    const navigateHome = () => {
        navigate(TargetURL.HOME);
    };

    return (
        <nav className="sticky top-0 z-20 bg-white flex flex-row min-h-16 items-center justify-between gap-3 px-4 border-b">
            <h2
                onClick={navigateHome}
                className="scroll-m-20 text-2xl font-bold tracking-tight hover:cursor-pointer hover:text-blue-600 transition-colors duration-300"
            >
                ProcessM.NET
            </h2>
            <div>
                {navLinks.length > 0 && (
                    <div className="gap-8">
                        {navLinks.map((link) => {
                            return (
                                <MyNavLink
                                    key={link.title}
                                    targetUrl={link.targetUrl}
                                    title={link.title}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </nav>
    );
};
