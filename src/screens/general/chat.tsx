import { StyleSheet } from 'react-native';
import { Icon, Toast, View } from '@ant-design/react-native';
import { Layout } from '../../components/organisms';
import {
  Bubble,
  GiftedChat,
  IMessage,
  InputToolbar,
  Send,
  Composer,
} from 'react-native-gifted-chat';
import {
  FILE_PICKER_OPTIONS,
  colors,
  fonts,
  hp,
  wp,
} from '../../utils/constants';
import { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
import { SERVER_URL } from '../../../config';
import { useRoute } from '@react-navigation/native';
import { useGetMyProfileQuery } from '../../apis/profile';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Popover } from '../../components/molecules';

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
    return [userId, currentUserId]
      .sort((a, b) => a.localeCompare(b))
      .join('__');
  }, [userId, currentUserId]);
  console.log('chatRoomId...', chatRoomId);

  const [messages, setMessages] = useState<IMessage[]>([]);

  const onSend = (newMessages: IMessage[] = []) => {
    setMessages(prevMessages => GiftedChat.append(prevMessages, newMessages));
    socket.emit(`broadcast`, { ...newMessages[0], chatRoomId });
  };

  const handleImagePicker = async (option: any) => {
    console.log('selected option', option);
    try {
      //@ts-ignore
      const pickedImage = await ImagePicker?.[option.value]?.({
        width: wp('100%'),
        height: hp('100%'),
        cropping: true,
      });
      console.log('pickedImage...', pickedImage);
      // uploadUserProfileMedia({
      //   uri: pickedImage?.path,
      //   name: `media`,
      //   type: pickedImage?.mime, // Adjust the MIME type according to your file type
      // });
    } catch (err) {
      console.log('image picker error...', err);
      Toast.fail({
        content: err?.toString(),
        duration: 2,
      });
    }
  };

  useEffect(() => {
    if (!currentUserId) return;
    // Listen for incoming messages for current user
    const currentUserBroadcast = `broadcast_${currentUserId}`;
    socket.on(currentUserBroadcast, message => {
      console.log('new message...', message);
      setMessages(prevMessages => GiftedChat.append(prevMessages, message));
    });

    return () => {
      // Disconnect the socket when component unmounts
      socket.off(currentUserBroadcast);
    };
  }, [currentUserId]);

  return (
    <Layout title="Chat" isScrollable={false}>
      <GiftedChat
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
        user={{
          _id: currentUserId, // Just a unique identifier for the user
        }}
        placeholder="Type your message here..."
        renderUsernameOnMessage
        inverted={true} // Change to true if you want to start from the bottom
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
            textStyle={{
              left: {
                fontFamily: fonts.quicksand.medium,
                fontSize: 14,
              },
              right: {
                fontFamily: fonts.quicksand.medium,
                fontSize: 14,
              },
            }}
          />
        )}
        renderInputToolbar={props => (
          <InputToolbar
            {...props}
            primaryStyle={{
              alignItems: 'center',
            }}
            containerStyle={{
              backgroundColor: `${colors.primary}80`,
              borderColor: colors.grey,
              borderWidth: 1,
              paddingTop: hp('2%'),
              paddingBottom: bottom > 0 ? bottom : hp('2%'),
              marginBottom: -bottom,
              marginHorizontal: -wp('5%'),
              paddingHorizontal: wp('5%'),
            }}
            renderComposer={props => (
              <Composer
                {...props}
                textInputStyle={{
                  fontFamily: fonts.quicksand.medium,
                  fontSize: 14,
                  color: colors.black,
                  backgroundColor: colors.white,
                  minHeight: 40,
                  textAlignVertical: 'center',
                  borderRadius: 100,
                  paddingLeft: wp('5%'),
                  paddingRight: wp('10%'),
                  lineHeight: 25,
                  alignItems: 'center',
                  marginRight: wp('2%'),
                }}
              />
            )}
            renderSend={props => (
              <Send
                {...props}
                containerStyle={{
                  borderRadius: 100,
                  backgroundColor: colors.black,
                  height: 40,
                  width: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name="send" color={colors.white} size={20} />
              </Send>
            )}
            renderActions={props => (
              <View
                {...props}
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  right: 40 + wp('4%'),
                }}>
                <Popover
                  options={FILE_PICKER_OPTIONS}
                  onPickerOptionPress={handleImagePicker}>
                  <Icon name="paper-clip" color={colors.black} size={20} />
                </Popover>
              </View>
            )}
          />
        )}
        listViewProps={{
          showsVerticalScrollIndicator: false,
          style: {
            paddingHorizontal: 20,
            marginHorizontal: -20,
            marginBottom: bottom > 0 ? hp('3%') : hp('5%'),
          },
        }}
        showUserAvatar
        alwaysShowSend
        scrollToBottom
        renderAvatarOnTop
      />
    </Layout>
  );
};

const styles = StyleSheet.create({});
