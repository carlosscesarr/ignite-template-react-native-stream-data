import React from 'react';
import { useTheme } from 'styled-components';
import { Fontisto } from '@expo/vector-icons'
import { ActivityIndicator, Alert, Modal, View } from 'react-native';

import { useAuth } from '../../hooks/useAuth';

import LoginBannerImg from '../../assets/images/login.svg';
import LogoImg from '../../assets/images/logo.svg';

import { 
  Container,
  Content,
  LoginBanner, 
  LoginInfo, 
  Header, 
  Partner, 
  Description, 
  SignInButton,
  SignInButtonIcon,
  SignInButtonText 
} from './styles';

export function SignIn() {
  const { signIn, isLoggingIn } = useAuth();
  const theme = useTheme();


  async function handleSingnIn() {
    try {
      await signIn()
    } catch (error) {
      Alert.alert('Erro signIn', 'Ocorreu um erro ao tentar se logar do app');
    }
  }
  // creates a function to handle sign in
    // try to call and wait signIn
    // if fails, display an Alert with the title "Erro SignIn" and message "Ocorreu um erro ao tentar logar no app"

    // const signInButtonProps = {
    //   onPress: your-signIn-function
    // }

  return (
    <Container
      from={{
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 0.9,
      }}
    >
      <Content>
        <LoginBanner>
          <LoginBannerImg width="100%" />
        </LoginBanner>

        <LoginInfo>
          <Header>
            <LogoImg />
            <Partner>by twitch</Partner>
          </Header>

          <Description>
            Veja dados{'\n'}
            interessantes sobre{'\n'}
            o mundo da Twitch
          </Description>

          <SignInButton onPress={handleSingnIn}>
            <SignInButtonIcon>
              {isLoggingIn ? (
                <ActivityIndicator
                  size={20}
                  color={theme.colors.white}
                />
              ) : (
                <Fontisto
                  name='twitch'
                  size={20}
                  color={theme.colors.white}
                  style={{marginRight: 1}}
                />
              )}
            </SignInButtonIcon>

            <SignInButtonText>
              {isLoggingIn ? 'Entrando...' : 'Entrar com Twitch'}
            </SignInButtonText>
          </SignInButton>
        </LoginInfo>
      </Content>

      <Modal 
        animationType="fade"
        visible={isLoggingIn}
        statusBarTranslucent
        transparent
      >
        <View
          style={{ flex: 1, backgroundColor: 'rgba(14, 14, 16, 0.5)' }}
        />
      </Modal>
    </Container>
  );
}