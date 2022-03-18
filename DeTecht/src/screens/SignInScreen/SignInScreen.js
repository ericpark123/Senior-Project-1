import React, {useState} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Logo from '../../../assets/detechtlogo.jpeg'
import CustomInput from '../../components/CustomInput';
import SignInButton from '../../components/SignInButton';
import SignUpButton from '../../components/SignUpButton';
import { useNavigation } from '@react-navigation/native';


const SignInScreen = () => {
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const navigation = useNavigation();

    const onSignInPress = () => {
        console.warn("Sign in");
        // validate
        navigation.navigate('Home')
    }

    const onSignUpPress = () => {
        console.warn("onSignUpPress")
        navigation.navigate('SignUp')
    }

    return (
        <View style={styles.root}>
            <Image source={Logo} />
            <CustomInput 
                placeholder="Username" 
                value={username} 
                setValue={setUsername}
                autoCapitalize={'none'}
            />
            <CustomInput 
                placeholder="Password" 
                value={password} 
                setValue={setPassword}
                secureTextEntry={true}
                autoCapitalize={'none'}
            />
            <SignInButton text ="Sign In" onPress={onSignInPress}/>
            <SignUpButton text ="Register" onPress={onSignUpPress}/>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
       activeTintColor: 'white', 
       padding: 20,
       alignItems: 'center',
       backgroundColor: 'white',
    },
});

export default SignInScreen;