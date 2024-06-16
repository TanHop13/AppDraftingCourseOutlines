import { View, Text, StatusBar, ScrollView, Image, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from "react";
import { COLORS } from "../Json";
import API, {endpoints} from "./../../configs/API"


const Home = ({navigation}) => {

    const [loading, setLoading] = useState(false);
    const [courses, setCourse] = useState([]);
    const [subjects, setSubject] = useState([]);
    const [outline, setOutline] = useState([]);

    const loadCourse = async () => {
        setLoading(true)
        try {
            let res = await API.get(endpoints['courses']);
            setCourse(res.data);
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        loadCourse();
    }, [])

    const loadSuject = async () => {
        setLoading(true)
        try {
            let res = await API.get(endpoints['subjects']);
            setSubject(res.data);
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        loadSuject();
    }, [])

    // chuyển đổi thành link đầy đủ
    const baseURL = 'https://res.cloudinary.com/dvzsftuep/';
    const loadImg = (data) => {
        const searchString = 'image/upload/';
        const link = 'http://res.cloudinary.com/dvzsftuep/image/upload/v1718008117/e83yxveneoxzwh4ehfvu.png';
        let arr = [];
        arr = subjects.filter(s => s.id == data).map(s => s.image);
        if (Array.isArray(arr)) {
            let string = arr.join();
            string = string.replace(new RegExp(searchString), '');
            if (string.includes(baseURL)) {
                return string;
            };
            let full = baseURL+string;
            return full;
        }
        return link;
    }

    const loadOutline = async () => {
        setLoading(true)
        try {
            let res = await API.get(endpoints['outlines']);
            setOutline(res.data);
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        loadOutline();
    }, [])


    // vào trang lấy link download đề cương (outline)
    let outlineChange = (subid, couid) => {
        const sub = parseInt(subid, 10);
        const cou = parseInt(couid, 10);
        
        if (!outline) {
            console.error("Mảng outline không được định nghĩa!");
            return;
        }
        
        // Lọc mảng outline
        const filteredOutlines = outline.filter(o => o.subject === sub && o.course === cou);


        if (filteredOutlines.length === 0) {
            console.error("Không tìm thấy kết quả phù hợp!");
            return;
        }
        // Điều hướng đến OutlineInfo với các ID đề cương đã lọc
        navigation.navigate("OutlineInfo", {'outlineID': filteredOutlines.map(o => o.id), 'subjectID': filteredOutlines.map(o => o.subject)});
    }

    return (
        <View style={{
            width: '100%',
            height: '100%',
            backgroundColor: "#C0D6E8"
        }}>
            <StatusBar backgroundColor={COLORS.white} barStyle={"dark-content"} />
            <ScrollView>
                <View style={{
                    padding: 16,
                    alignContent: 'center',
                    justifyContent: 'center'
                }}>
                    <View>
                        {courses===null?<ActivityIndicator/>:
                            <>
                                {courses.map(c => (
                                    <View key={c.id}>

                                        <Text style={Style.textCourse}>Khoá {c.name}</Text>

                                        {subjects.filter(s => s.course.some(co => co.id === c.id)).map(s => (
                                            <TouchableOpacity loading={loading} key={s.id} onPress={() => outlineChange(s.id, c.id)}>
                                                <View key={s.id} style={{flexDirection:'row', margin: 10}}>
                                                    {s.image?<Image style={Style.img} 
                                                            source={{ uri: loadImg(s.id) }}/>:""}
                                                    <Text style={Style.textSub}>{s.name}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                ))}
                            </>
                        }
                    </View>
                </View>
            </ScrollView>
        </View>
    )
};

const Style = StyleSheet.create({
    textCourse: {
        fontWeight: 'bold',
        fontSize: 23,
        margin: 5
    },
    textSub: {
        fontSize: 17,
        margin: 'auto'
    },
    img: {
        width: 100,
        height: 100
    },
})

export default Home;