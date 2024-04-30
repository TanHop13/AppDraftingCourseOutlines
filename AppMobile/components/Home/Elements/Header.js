import { Text, View } from "react-native"
import { FontAwesome } from "@expo/vector-icons"

const Header = ({ headerText, headerIcon }) => {
    return (
        <View style={{ flexDirection: "row" }}>
            <Text style={{ flex:1, fontSize: 20, fontWeight: "700" }}>
                {headerText}
            </Text> 
            <FontAwesome name={headerIcon} size={24} color="#8BD8A2"/>
        </View>
    );
};

export default Header;