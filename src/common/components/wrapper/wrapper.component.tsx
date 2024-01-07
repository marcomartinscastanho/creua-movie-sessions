import { FC, ReactNode } from "react";

type WrapperProps = Readonly<{
    children: ReactNode;
}>;

export const WrapperComponent: FC<WrapperProps> = (props) => {
    return <div className="page-wrapper" >
        {props.children}
    </div>
}

WrapperComponent.displayName = 'WrapperComponent';
