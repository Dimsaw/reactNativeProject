import React, { useEffect } from "react";


import { NavigationContainer } from "@react-navigation/native";
import Navigation from "../../routing/routing";

import { useSelector, useDispatch } from "react-redux";

import { authStateChangeUser } from "../../redux/auth/authOperation";


export const Main = () => {
    // const dispatch = useDispatch();

    // const { stateChange } = useSelector((state) => state.auth);

    // useEffect(() => {
    //     dispatch(authStateChangeUser());
    // }, []);

    // const { routing } = Navigation(stateChange);

    return (
        <NavigationContainer >
            <Navigation />
        </NavigationContainer>
    )
}