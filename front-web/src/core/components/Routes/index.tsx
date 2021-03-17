import { isAuthenticated } from "core/utils/auth";
import React from "react";
import { Redirect, Route } from "react-router";

type Props = {
    children: React.ReactNode;
    path: string;
}

const PrivateRoute = ({ children, path }: Props) => {
    const authenticated = isAuthenticated();

    return (
        <Route
            path={path}
            render={({ location }) => authenticated ? (children) : (
                    <Redirect
                        to={{
                            pathname: "/admin/auth/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export default PrivateRoute;