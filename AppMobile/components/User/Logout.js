import { useContext } from 'react';
import { Alert } from 'react-native';
import { MyContext } from '../../configs/MyContext';
import { useNavigation } from '@react-navigation/native';

const Logout = () => {
    const nav = useNavigation();
    // const { logout } = useContext(MyContext);
    // logout();
    nav.navigate('Welcome')
    return (
        Alert.alert("Đã đăng xuất")
    )
};
export default Logout;