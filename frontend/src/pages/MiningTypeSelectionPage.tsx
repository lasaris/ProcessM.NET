import { MiningTypeCard } from '@/components/ui/MiningTypeCard';
import { TargetURL } from '@/router';
import React from 'react';

const imperativeDescription =
    'Aenean placerat. Nullam at arcu a est sollicitudin euismod. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor. Maecenas libero. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Sed elit dui, pellentesque a, faucibus vel, interdum nec, diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Etiam bibendum elit eget erat. Fusce suscipit libero eget elit. Nullam sit amet magna in magna gravida vehicula. Aliquam in lorem sit amet leo accumsan lacinia. Proin pede metus, vulputate nec, fermentum fringilla, vehicula vitae, justo.';
const declarativeDescription =
    'Aenean placerat. Nullam at arcu a est sollicitudin euismod. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor. Maecenas libero. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Sed elit dui, pellentesque a, faucibus vel, interdum nec, diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Etiam bibendum elit eget erat. Fusce suscipit libero eget elit. Nullam sit amet magna in magna gravida vehicula. Aliquam in lorem sit amet leo accumsan lacinia. Proin pede metus, vulputate nec, fermentum fringilla, vehicula vitae, justo.';

export const MiningTypeSelectionPage: React.FC = () => {
    return (
        <div className="flex flex-col gap-10 md:flex-row h-full items-center">
            <MiningTypeCard
                title="Imperative"
                description={imperativeDescription}
                targetUrl={TargetURL.IMPERATIVE}
            />
            <MiningTypeCard
                title="Declarative"
                description={declarativeDescription}
                targetUrl="declarative"
            />
        </div>
    );
};
