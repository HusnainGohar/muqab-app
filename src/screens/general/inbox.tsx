import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, View, WhiteSpace } from '@ant-design/react-native';
import { Layout } from '../../components/organisms';
import { Text } from '../../components/atoms';
import { SERVER_URL } from '../../../config';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { useGetMyProfileQuery } from '../../apis/profile';
import { chatScreen, colors } from '../../utils/constants';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../../routes';
import { useNavigation } from '@react-navigation/native';

const socket = io(SERVER_URL);

export const Inbox = () => {
  const { navigate }: StackNavigationProp<StackParamList> = useNavigation();
  const [chats, setChats] = useState<string[]>([]);
  const { data } = useGetMyProfileQuery({});
  const currentUserId = data?.user?.id;
  useEffect(() => {
    if (!currentUserId) return;
    // Listen for incoming messages
    socket.on(`broadcast_${currentUserId}`, message => {
      console.log('new message...', message);
      setChats(prevChats => [...prevChats, message?.user?._id]);
    });

    return () => {
      // Disconnect the socket when component unmounts
      socket.disconnect();
    };
  }, [currentUserId]);
  const renderItem = ({ item, index }: { item: string; index: number }) => (
    <TouchableOpacity
      onPress={() => navigate(chatScreen, { userId: item })}
      style={styles.chatItem}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>{index + 1}</Text>
      </View>
      <View style={styles.chatInfo}>
        <Text style={styles.chatName}>Unknown {index + 1}</Text>
        {/* <Text style={styles.lastMessage}>{item.lastMessage}</Text> */}
      </View>
      {/* <Text style={styles.timestamp}>{item.timestamp}</Text> */}
      {/* You can replace the above timestamp with your own logic */}
      <Icon name="arrow-right" size={24} color={colors.darkGrey} />
    </TouchableOpacity>
  );
  return (
    <Layout title="Inbox" isScrollable={false}>
      <WhiteSpace size="lg" />
      <FlatList
        data={[...new Set(chats)]}
        renderItem={renderItem}
        keyExtractor={item => item}
        contentContainerStyle={styles.container}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.grey,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    fontSize: 20,
    color: colors.white,
  },
  chatInfo: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lastMessage: {
    color: colors.darkGrey,
  },
  timestamp: {
    marginLeft: 'auto',
    color: colors.darkGrey,
  },
});
