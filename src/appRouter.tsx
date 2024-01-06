import { FC } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePageContainer } from "./pages/homePage/homePage.container";

export const AppRouter: FC = () => {

    const router = createBrowserRouter([{
        id: 'root',
        path: '/',
        children: [{
            index: true,
            Component: HomePageContainer,
            // loader: protectedLoader,
        },
        ],
    }]);

    return (
        <RouterProvider
            router={router}
            fallbackElement={null}
        />
    );
}