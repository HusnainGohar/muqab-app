import { StyleSheet } from 'react-native';
import { WhiteSpace } from '@ant-design/react-native';
import { Layout } from '../../components/organisms';
import { Text } from '../../components/atoms';
import {
  Bubble,
  GiftedChat,
  IMessage,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat';
import { colors } from '../../utils/constants';
import { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
import { SERVER_URL } from '../../../config';
import { useRoute } from '@react-navigation/native';
import { useGetMyProfileQuery } from '../../apis/profile';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const socket = io(SERVER_URL);

export const Chat = () => {
  const { bottom } = useSafeAreaInsets();
  const { params } = useRoute();
  //@ts-ignore
  const userId = params?.userId;
  console.log('params...', params);
  const { data } = useGetMyProfileQuery({});
  const currentUserId = data?.user?.id;
  const chatRoomId = useMemo(() => {
    return [userId, currentUserId].sort((a, b) => a - b).join('__');
  }, [userId, currentUserId]);
  console.log('chatRoomId...', chatRoomId);

  const [messages, setMessages] = useState<IMessage[]>([]);

  const onSend = (newMessages: IMessage[] = []) => {
    setMessages(prevMessages => GiftedChat.append(prevMessages, newMessages));
    socket.emit(`broadcast`, { ...newMessages[0], chatRoomId });
  };

  useEffect(() => {
    if (!currentUserId) return;
    // Listen for incoming messages
    socket.on(`broadcast_${currentUserId}`, message => {
      console.log('new message...', message);
      setMessages(prevMessages => GiftedChat.append(prevMessages, message));
    });

    return () => {
      // Disconnect the socket when component unmounts
      socket.disconnect();
    };
  }, [currentUserId]);

  return (
    <Layout title="Chat" isScrollable={false}>
      <WhiteSpace size="lg" />
      <GiftedChat
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
        // messageIdGenerator={() => getMessageId(userId, currentUserId)}
        user={{
          _id: currentUserId, // Just a unique identifier for the user
        }}
        placeholder="Type your message here..."
        renderUsernameOnMessage
        inverted={false} // Change to true if you want to start from the bottom
        renderAvatar={null} // You can customize this as needed
        renderBubble={props => (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: colors.primary,
              },
              left: {
                backgroundColor: colors.grey,
              },
            }}
          />
        )}
        renderInputToolbar={props => (
          <InputToolbar
            {...props}
            containerStyle={{
              backgroundColor: colors.white,
              borderColor: colors.grey,
              borderWidth: 1,
              borderRadius: 20,
              marginBottom: 20 + bottom,
            }}
          />
        )}
        renderSend={props => (
          <Send
            {...props}
            containerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            }}>
            <Text style={{ color: colors.primary, marginRight: 10 }}>Send</Text>
          </Send>
        )}
        showUserAvatar
        alwaysShowSend
        scrollToBottom
        renderAvatarOnTop
      />
    </Layout>
  );
};

const styles = StyleSheet.create({});
