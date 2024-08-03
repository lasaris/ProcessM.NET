import React, { useState } from 'react';

export const HomePage: React.FC = () => {
    const [showFullDescription, setShowFullDescription] =
        useState<boolean>(false);

    return (
        <div className="flex flex-col justify-center items-center gap-4 w-4/5 md:w-3/5">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                ProcessM.NET
            </h1>
            {!showFullDescription && (
                <p className="bg-gradient-to-b from-black to-white bg-clip-text text-transparent">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Praesent imperdiet hendrerit egestas. Nunc eu ullamcorper
                    est. Quisque vitae mattis felis, sagittis mattis dui.
                    Phasellus sollicitudin luctus porta. Fusce ac nibh non est
                    fringilla sagittis. Sed eu diam convallis, lobortis arcu
                    nec, placerat nunc. In tincidunt pulvinar arcu, ac
                    vestibulum tortor lobortis sit amet. Sed varius, turpis id
                    tincidunt faucibus, ligula nisi laoreet nisl, quis vulputate
                    est nunc elementum tellus. Fusce nibh nibh, gravida a
                    ullamcorper id, semper a turpis. In metus nulla, vehicula
                    laoreet turpis eget, convallis pellentesque purus. Integer
                    neque sem, congue sit amet scelerisque et, sodales eget
                    ante.
                </p>
            )}
        </div>
    );
};
