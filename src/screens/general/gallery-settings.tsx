import { FlatList, Image, StyleSheet } from 'react-native';
import { Icon, Toast, View, WhiteSpace } from '@ant-design/react-native';
import { Layout } from '../../components/organisms';
import {
  useGetMyProfileQuery,
  useRemoveUserProfileMediaMutation,
  useUploadUserProfileMediaMutation,
} from '../../apis/profile';
import {
  GALLERY_ITEM_OPTIONS,
  IMAGE_PICKER_OPTIONS,
  IMAGE_PLACEHOLDER,
  colors,
  hp,
  wp,
} from '../../utils/constants';
import ImagePicker from 'react-native-image-crop-picker';
import { Popover } from '../../components/molecules';

export const GallerySettings = () => {
  const {
    data,
    isFetching,
    refetch: refetchMyProfileData,
  } = useGetMyProfileQuery({});

  const { media = [] } = data?.user ?? {};

  console.log('media...', isFetching, media);

  const [uploadUserProfileMedia, { isLoading: isMediaUploading }] =
    useUploadUserProfileMediaMutation();

  const [removeUserProfileMedia, { isLoading: isMediaRemoving }] =
    useRemoveUserProfileMediaMutation();

  const isLoading = isFetching || isMediaUploading || isMediaRemoving;
  const removeMediaFromGallery = (media: string) => {
    removeUserProfileMedia(media);
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
      uploadUserProfileMedia({
        uri: pickedImage?.path,
        name: `media`,
        type: pickedImage?.mime, // Adjust the MIME type according to your file type
      });
    } catch (err) {
      console.log('image picker error...', err);
      Toast.fail({
        content: err?.toString(),
        duration: 2,
      });
    }
  };

  //@ts-ignore
  const renderMediaItem = ({ item, index }) => {
    const handleMediaItemOptions = (option: any) => {
      if (option.value === 'delete') {
        removeMediaFromGallery(item);
      }
    };
    return (
      <View key={index}>
        <Popover
          triggerStyle={styles.menuButton}
          options={GALLERY_ITEM_OPTIONS}
          onPickerOptionPress={handleMediaItemOptions}>
          <Icon name="ellipsis" color={colors.black} size={20} />
        </Popover>
        <Image
          source={{ uri: item }}
          style={styles.media}
          loadingIndicatorSource={{ uri: IMAGE_PLACEHOLDER }}
        />
      </View>
    );
  };

  return (
    <Layout
      title="Gallery Settings"
      hasBack={true}
      isScrollable={false}
      rightHeader={
        <Popover
          options={IMAGE_PICKER_OPTIONS}
          onPickerOptionPress={handleImagePicker}>
          <Icon name="plus-circle" color={colors.black} size={24} />
        </Popover>
      }>
      <WhiteSpace size="md" />
      <FlatList
        data={media}
        numColumns={2}
        renderItem={renderMediaItem}
        refreshing={isLoading}
        onRefresh={refetchMyProfileData}
        showsVerticalScrollIndicator={false}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  media: {
    width: wp('40%'),
    height: 150,
    borderRadius: 10,
    borderColor: colors.black,
    borderWidth: 2,
    margin: wp('2.5%'),
  },
  menuButton: {
    backgroundColor: `${colors.grey}CC`,
    borderColor: colors.black,
    borderWidth: 2,
    position: 'absolute',
    borderRadius: 100,
    padding: 2,
    top: wp('3.5%'),
    right: wp('3.5%'),
    zIndex: 1,
  },
});
