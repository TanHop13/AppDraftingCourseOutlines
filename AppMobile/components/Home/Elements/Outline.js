import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { Items } from "../../Json";
import React, { useState } from "react";
import API, { endpoints } from "../../../configs/API";

const Outline = ({route}) => {
    const outlineId = route.params?.outlineID;
    const [outline, setOutline] = useState([]);
    
    const loadOutline = async () => {
        try {
            let res = await API.get(endpoints['outlines'](outlineId))
            setOutline(res.data);
        } catch (ex) {
            console.error(ex)
        }
    }
    
    React.useEffect(() => {
        loadOutline();
    }, [])

    return (
        <ScrollView>
            <View>
                <Text>
                    {outline.name}
                </Text>
            </View>
        </ScrollView>
    )
};

export default Outline;