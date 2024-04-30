import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { Items } from "../../Json";

const Outline = () => {
    return (
        <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {
                    Items.map((Outline, index)=> {
                        return (
                            <View 
                            style={{
                                backgroundColor: "#8BD8A2", 
                                marginRight: 30, 
                                borderRadius: 8,
                                paddingHorizontal: 16,
                                paddingVertical: 18,
                                marginVertical: 16,
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.1,
                                shadowRadius: 7,
                            }}>
                                <TouchableOpacity>
                                    <Text style={{color: "#fff", fontSize: 16,}}>
                                        {Outline.name}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
};

export default Outline;