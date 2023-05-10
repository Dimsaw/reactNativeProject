import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { getHeaderTitle } from "@react-navigation/elements";

import DefaultScreen from "../nestedScreen/defaultScreen/DefaultScreen";
import MapScreen from "../nestedScreen/mapScreen/MapScreen";
import CommentsScreen from "../nestedScreen/commentsScreen/CommentsScreen";

import Header from "../../../components/Header/header.js";

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
    return (
        <NestedScreen.Navigator>
            <NestedScreen.Screen
                name="DefaultScreen"
                component={DefaultScreen}
                options={{
                    headerTitle: 'Post',
                    header: ({ navigation, route, options, back }) => {
                        const title = getHeaderTitle(options, route.name);
                        return <Header title={title} navigation={navigation} back={back} />;
                    },
                }}
            />
            <NestedScreen.Screen
                name="MapScreen"
                component={MapScreen}
                options={{
                    headerTitle: 'Map',
                    header: ({ navigation, route, options, back }) => {
                        const title = getHeaderTitle(options, route.name);
                        return <Header title={title} navigation={navigation} back={back} />;
                    },
                }}
            />
            <NestedScreen.Screen
                name="CommentsScreen"
                component={CommentsScreen}
                options={{
                    headerTitle: 'Comments',
                    header: ({ navigation, route, options, back }) => {
                        const title = getHeaderTitle(options, route.name);
                        return <Header title={title} navigation={navigation} back={back} />;
                    },
                }}
            />
        </NestedScreen.Navigator>
    );
};

export default PostsScreen;

