import React from 'react';

export const HomePageDescription: React.FC = () => {
    return (
        <div className="my-4">
            <div className="flex flex-col gap-3">
                <p>
                    <span className="font-bold inline-block transition-transform duration-300 ease-in-out transform hover:scale-110">
                        <a href="https://github.com/lasaris/ProcessM.NET">
                            ProcessM.NET
                        </a>
                    </span>{' '}
                    is mainly a C# library that supports basic process mining
                    algorithms written in .NET. It is open source and licensed
                    under GPL. It is intended to be used in academia and, in the
                    future, in industry. ProcessM.NET is developed by the
                    Faculty of Informatics, Masaryk University.
                </p>
                <p>
                    This web application was written in React (TypeScript),
                    using API built on top of the above mentioned .NET library.
                </p>
            </div>
        </div>
    );
};
