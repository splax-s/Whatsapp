import moment  from "moment";
import React from 'react';
import { 
    View, 
    Text, 
    Image, 
    TouchableWithoutFeedback
     } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { User } from "../../types"
import styles from './style';
import { useNavigation } from '@react-navigation/native'
import Navigation from "../../navigation";
import {API, graphqlOperation, Auth} from 'aws-amplify'
import {createChatRoom, createChatRoomUser} from '../../src/graphql/mutations'

export type ContactListItem = {
    user: User;
}

const contactListItem = (props: ContactListItem) => {
    const { user } = props;

    const navigation = useNavigation();

    
    const onClick = async () => {
        try {

            const newChatRoomData = await API.graphql(
                graphqlOperation(
                    createChatRoom, {
                        input: {
                          lastMessageID: "0193767e-4001-4ddc-bd9e-feef827a8f5c"
                         }
                    }
                )
            )
            if (!newChatRoomData.data) {
                console.log(" Failed to create a chat room");
                return;
              }

              const newChatRoom = newChatRoomData.data.createChatRoom;
              console.log(newChatRoom);

              await API.graphql(
                graphqlOperation(
                  createChatRoomUser, {
                    input: {
                      userID: user.id,
                      chatRoomID: newChatRoom.id,
                    }
                  }
                )
              )


              const userInfo = await Auth.currentAuthenticatedUser();
              await API.graphql(
                graphqlOperation(
                  createChatRoomUser, {
                    input: {
                      userID: userInfo.attributes.sub,
                      chatRoomID: newChatRoom.id,
                    }
                  }
                )
              )
              
              navigation.navigate('ChatRoom', {
                id: newChatRoom.id,
                name: "Hardcoded name",
              })
        } catch (e) {
            console.log(e);
        }
    }
    return(
    <TouchableWithoutFeedback onPress={onClick}>
        <View style={styles.container}>
        <View style={styles.leftContainer}>
            <Image source={{ uri: user.imageUri }} style={styles.avatar}/>

        <View style={styles.midContainer}>
        <Text style={styles.username}>{user.name}</Text>
        <Text numberOfLines={1} style={styles.status}>{user.status}</Text>
        </View>

 
        </View>
        </View>
     </TouchableWithoutFeedback>
    )
};

export default contactListItem;