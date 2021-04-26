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
    lastMessage: {
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
    time: {
        fontSize: 14,
        color: 'grey',
        flexWrap: 'wrap',
    },
    midContainer: {
        justifyContent: 'space-around',
    },
});

export default styles;