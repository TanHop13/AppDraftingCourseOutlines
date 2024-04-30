import { StyleSheet, StatusBar } from "react-native";


const WelStyles = StyleSheet.create({
  center: {
    flex: 1,
    marginTop: 10+StatusBar.currentHeight||0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '95%',
    height: '38%',
  },
  button: {
    backgroundColor: '#5BBCFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8, 
    marginTop: 20,
  },
});

export default WelStyles;