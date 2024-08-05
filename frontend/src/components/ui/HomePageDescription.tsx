import { DownArrow } from '@/icons/DownArrow';
import { UpArrow } from '@/icons/UpArrow';
import React, { useState } from 'react';

export const HomePageDescription: React.FC = () => {
    const [showFullDescription, setShowFullDescription] =
        useState<boolean>(false);

    return (
        <div className="my-4">
            {!showFullDescription && (
                <div>
                    <p className="bg-gradient-to-b from-black to-white bg-clip-text text-transparent">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Praesent imperdiet hendrerit egestas. Nunc eu
                        ullamcorper est. Quisque vitae mattis felis, sagittis
                        mattis dui. Phasellus sollicitudin luctus porta. Fusce
                        ac nibh non est fringilla sagittis. Sed eu diam
                        convallis, lobortis arcu nec, placerat nunc. In
                        tincidunt pulvinar arcu, ac vestibulum tortor lobortis
                        sit amet. Sed varius, turpis id tincidunt faucibus,
                        ligula nisi laoreet nisl, quis vulputate est nunc
                        elementum tellus. Fusce nibh nibh, gravida a ullamcorper
                        id, semper a turpis. In metus nulla, vehicula laoreet
                        turpis eget, convallis pellentesque purus. Integer neque
                        sem, congue sit amet scelerisque et, sodales eget ante.
                    </p>
                    <div
                        onClick={() => setShowFullDescription(true)}
                        className="flex flex-row items-center justify-center hover:cursor-pointer"
                    >
                        <DownArrow />
                    </div>
                </div>
            )}
            {showFullDescription && (
                <div className="flex flex-col gap-3">
                    <p>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit. Etiam bibendum elit eget erat. Proin pede metus,
                        vulputate nec, fermentum fringilla, vehicula vitae,
                        justo. Integer pellentesque quam vel velit. Sed vel
                        lectus. Donec odio tempus molestie, porttitor ut,
                        iaculis quis, sem. Phasellus enim erat, vestibulum vel,
                        aliquam a, posuere eu, velit. Aliquam in lorem sit amet
                        leo accumsan lacinia. Itaque earum rerum hic tenetur a
                        sapiente delectus, ut aut reiciendis voluptatibus
                        maiores alias consequatur aut perferendis doloribus
                        asperiores repellat. Quisque porta. Etiam commodo dui
                        eget wisi. In convallis. Aliquam erat volutpat. In
                        rutrum. Donec quis nibh at felis congue commodo. Duis
                        bibendum, lectus ut viverra rhoncus, dolor nunc faucibus
                        libero, eget facilisis enim ipsum id lacus. Vivamus ac
                        leo pretium faucibus. Aenean fermentum risus id tortor.
                        Etiam bibendum elit eget erat. Sed ac dolor sit amet
                        purus malesuada congue.
                    </p>
                    <p>
                        Phasellus faucibus molestie nisl. Praesent vitae arcu
                        tempor neque lacinia pretium. Vivamus ac leo pretium
                        faucibus. Nulla est. Etiam egestas wisi a erat. Integer
                        malesuada. Donec vitae arcu. Nullam sapien sem, ornare
                        ac, nonummy non, lobortis a enim. Aenean fermentum risus
                        id tortor. Duis viverra diam non justo. Aenean placerat.
                        Fusce wisi. Sed vel lectus. Donec odio tempus molestie,
                        porttitor ut, iaculis quis, sem. Nulla turpis magna,
                        cursus sit amet, suscipit a, interdum id, felis. Nullam
                        feugiat, turpis at pulvinar vulputate, erat libero
                        tristique tellus, nec bibendum odio risus sit amet ante.
                        Etiam neque. Nullam at arcu a est sollicitudin euismod.
                        Vivamus ac leo pretium faucibus. Class aptent taciti
                        sociosqu ad litora torquent per conubia nostra, per
                        inceptos hymenaeos. Aliquam erat volutpat.
                    </p>
                    <p>
                        Nam libero tempore, cum soluta nobis est eligendi optio
                        cumque nihil impedit quo minus id quod maxime placeat
                        facere possimus, omnis voluptas assumenda est, omnis
                        dolor repellendus. Fusce consectetuer risus a nunc.
                        Maecenas lorem. Etiam dictum tincidunt diam. Class
                        aptent taciti sociosqu ad litora torquent per conubia
                        nostra, per inceptos hymenaeos. Etiam bibendum elit eget
                        erat. Lorem ipsum dolor sit amet, consectetuer
                        adipiscing elit. Vivamus luctus egestas leo.
                        Pellentesque ipsum. Duis risus.
                    </p>
                    <p>
                        Sed convallis magna eu sem. Vestibulum fermentum tortor
                        id mi. In laoreet, magna id viverra tincidunt, sem odio
                        bibendum justo, vel imperdiet sapien wisi sed libero.
                        Maecenas aliquet accumsan leo. In rutrum. Proin mattis
                        lacinia justo. Class aptent taciti sociosqu ad litora
                        torquent per conubia nostra, per inceptos hymenaeos.
                        Nullam at arcu a est sollicitudin euismod. Integer
                        tempor. Nulla est. Nullam faucibus mi quis velit.
                        Praesent in mauris eu tortor porttitor accumsan. In
                        convallis. Nullam rhoncus aliquam metus. Sed elit dui,
                        pellentesque a, faucibus vel, interdum nec, diam. Mauris
                        dictum facilisis augue. In laoreet, magna id viverra
                        tincidunt, sem odio bibendum justo, vel imperdiet sapien
                        wisi sed libero. Suspendisse nisl.
                    </p>
                    <p>
                        Sed convallis magna eu sem. Vestibulum fermentum tortor
                        id mi. In laoreet, magna id viverra tincidunt, sem odio
                        bibendum justo, vel imperdiet sapien wisi sed libero.
                        Maecenas aliquet accumsan leo. In rutrum. Proin mattis
                        lacinia justo. Class aptent taciti sociosqu ad litora
                        torquent per conubia nostra, per inceptos hymenaeos.
                        Nullam at arcu a est sollicitudin euismod. Integer
                        tempor. Nulla est. Nullam faucibus mi quis velit.
                        Praesent in mauris eu tortor porttitor accumsan. In
                        convallis. Nullam rhoncus aliquam metus. Sed elit dui,
                        pellentesque a, faucibus vel, interdum nec, diam. Mauris
                        dictum facilisis augue. In laoreet, magna id viverra
                        tincidunt, sem odio bibendum justo, vel imperdiet sapien
                        wisi sed libero. Suspendisse nisl.
                    </p>
                    <p>
                        Sed convallis magna eu sem. Vestibulum fermentum tortor
                        id mi. In laoreet, magna id viverra tincidunt, sem odio
                        bibendum justo, vel imperdiet sapien wisi sed libero.
                        Maecenas aliquet accumsan leo. In rutrum. Proin mattis
                        lacinia justo. Class aptent taciti sociosqu ad litora
                        torquent per conubia nostra, per inceptos hymenaeos.
                        Nullam at arcu a est sollicitudin euismod. Integer
                        tempor. Nulla est. Nullam faucibus mi quis velit.
                        Praesent in mauris eu tortor porttitor accumsan. In
                        convallis. Nullam rhoncus aliquam metus. Sed elit dui,
                        pellentesque a, faucibus vel, interdum nec, diam. Mauris
                        dictum facilisis augue. In laoreet, magna id viverra
                        tincidunt, sem odio bibendum justo, vel imperdiet sapien
                        wisi sed libero. Suspendisse nisl.
                    </p>
                    <p>
                        Sed convallis magna eu sem. Vestibulum fermentum tortor
                        id mi. In laoreet, magna id viverra tincidunt, sem odio
                        bibendum justo, vel imperdiet sapien wisi sed libero.
                        Maecenas aliquet accumsan leo. In rutrum. Proin mattis
                        lacinia justo. Class aptent taciti sociosqu ad litora
                        torquent per conubia nostra, per inceptos hymenaeos.
                        Nullam at arcu a est sollicitudin euismod. Integer
                        tempor. Nulla est. Nullam faucibus mi quis velit.
                        Praesent in mauris eu tortor porttitor accumsan. In
                        convallis. Nullam rhoncus aliquam metus. Sed elit dui,
                        pellentesque a, faucibus vel, interdum nec, diam. Mauris
                        dictum facilisis augue. In laoreet, magna id viverra
                        tincidunt, sem odio bibendum justo, vel imperdiet sapien
                        wisi sed libero. Suspendisse nisl.
                    </p>
                    <div
                        onClick={() => setShowFullDescription(false)}
                        className="flex flex-row items-center justify-center hover:cursor-pointer"
                    >
                        <UpArrow />
                    </div>
                </div>
            )}
        </div>
    );
};
