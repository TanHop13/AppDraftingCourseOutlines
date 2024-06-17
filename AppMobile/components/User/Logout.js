import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ConfirmLogout = ({ onConfirm, onCancel }) => {
    return (
        <View style={styles.container}>
            <Text style={{fontWeight: 'bold', margin: 10}}>Bạn có chắc muốn đăng xuất?</Text>
            <View style={{flexDirection: 'row'}}>
                
                <View style={{margin: 30}}>
                    <Button title="Có" onPress={onConfirm} />
                </View>
                
                <View style={{margin: 30}}>
                    <Button title="Không" onPress={onCancel} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ConfirmLogout;