import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: "100%",
        justifyContent: 'space-between',
        padding: 10,
    },
    leftContainer:{
        flexDirection: 'row',
    },
    username: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    status: {
        fontSize: 16,
        color: 'grey',
        flexWrap: 'wrap',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 50,
        marginRight: 15,
    },
    midContainer: {
        justifyContent: 'space-around'
    },
});

export default styles;