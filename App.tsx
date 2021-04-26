import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { withAuthenticator } from 'aws-amplify-react-native'


import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify'
import config from './src/aws-exports'
import { getUser} from './src/graphql/queries'
import { createUser } from './src/graphql/mutations';
import { useCardAnimation } from '@react-navigation/stack';
Amplify.configure(config)

const randomImages = [
  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/8.png',
  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/5.jpg',
  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/3.jpg',
  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/2.jpg',
]

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const getRandomImage = () => {
    return randomImages[Math.floor( Math.random() * randomImages.length)];
  }

  useEffect(() => {
    const fetchUser = async () => {

      const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true});

      if(userInfo){
        const userData = await API.graphql(
          graphqlOperation(
            getUser, { id: userInfo.attributes.sub }
            )
          )
          if(userData.data.getUser) {
            console.log("User is already registered in database")
            return;
          }

          const newUser = {
            id: userInfo.attributes.sub,
            name:userInfo.username,
            ImageUri: getRandomImage(),
            status: 'Hey I am using Whatsapp',
          }

          await API.graphql(
            graphqlOperation(
              createUser,
              { input: newUser }
            )
          )
    
      }
    }
    fetchUser(); 
  },[])

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App)