import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import useRoute from "../../routing/routing";
import { authStateChangeUser } from "../../redux/auth/authOperation";


export const Main = ({ onReady }) => {


    const { stateChange } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authStateChangeUser());
    }, []);

    const routing = useRoute(stateChange);
    console.log('routing', routing);

    return (

        <NavigationContainer onReady={onReady}>
            {routing}
        </NavigationContainer>


    )
}