import { ReactNode, memo } from 'react';

interface RenderIfProps {
    children: ReactNode;
    condition: boolean;
}

const RenderIf = ({ children, condition }: RenderIfProps) => {
    if (condition) {
        return children;
    }

    return <></>;
}

export default memo(RenderIf);
