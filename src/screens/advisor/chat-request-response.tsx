import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../../routes';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Modal } from '../../components/molecules';
import { useGetMyProfileQuery } from '../../apis/profile';
import { io } from 'socket.io-client';
import { SERVER_URL } from '../../../config';
import { useEffect, useMemo } from 'react';

const socket = io(SERVER_URL);

interface onSendProps {
  isRejected?: boolean;
  isAccepted?: boolean;
}

export const ChatRequestResponse = () => {
  const { params } = useRoute();
  const { goBack }: StackNavigationProp<StackParamList> = useNavigation();
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

  const onSend = ({ isAccepted, isRejected }: onSendProps) => {
    socket.emit(`chat_request`, {
      user: { ...data?.user, _id: currentUserId },
      chatRoomId,
      isRejected,
      isAccepted,
    });
  };

  useEffect(() => {
    if (!currentUserId) return;
    // Listen for response of chat request
    const currentUserChatRequestStream = `chat_request_${currentUserId}`;
    socket.on(currentUserChatRequestStream, message => {
      console.log('chat_request_response...', message);
    });

    return () => {
      // Disconnect the socket when component unmounts
      socket.off(currentUserChatRequestStream);
    };
  }, [currentUserId]);

  return (
    <Modal
      visible={true}
      maskClosable
      onClose={goBack}
      title="Chat Request Received"
      description="A New Chat Request Recieved. Do You want to Accept?"
      onApply={() => onSend({ isAccepted: true })}
      applyButtonText="Accept"
      cancelButtonText="Reject"
      onCancel={() => onSend({ isRejected: true })}
      isLoading={false}
    />
  );
};
