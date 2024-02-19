import { Image, StyleSheet } from 'react-native';
import {
  ActivityIndicator,
  Toast,
  View,
  WhiteSpace,
} from '@ant-design/react-native';
import { Layout } from '../../components/organisms';
import { Form } from '../../components/molecules/form';
import { profileSections } from '../../utils/input-fields-details';
import { updateProfileSchema } from '../../utils/schemas';
import {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
  useUploadProfilePicMutation,
} from '../../apis/profile';
import {
  IMAGE_PICKER_OPTIONS,
  IMAGE_PLACEHOLDER,
  colors,
  hp,
  wp,
} from '../../utils/constants';
import { IconFill } from '@ant-design/icons-react-native';
import ImagePicker from 'react-native-image-crop-picker';
import dayjs from 'dayjs';
import { Popover } from '../../components/molecules';

export const ProfileSettings = () => {
  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: new Date(),
    country: '',
    city: '',
    zipCode: '',
    gender: '',
  };
  const { data, isFetching } = useGetMyProfileQuery({});

  const {
    profilePic = IMAGE_PLACEHOLDER,
    firstName,
    lastName,
    email,
    dateOfBirth,
    phone,
    gender,
    country,
    city,
    zipCode,
  } = data?.user ?? {};

  const [updateProfile, { isLoading: isUpateProfileLoading }] =
    useUpdateProfileMutation();
  const [updateProfilePic, { isLoading: isUpateProfilePicLoading }] =
    useUploadProfilePicMutation();

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
      updateProfilePic({
        uri: pickedImage?.path,
        name: `${firstName}_profile_pic`,
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

  return (
    <Layout title="Profile Settings" hasBack={true} isLoading={isFetching}>
      <WhiteSpace size="md" />
      <View style={{ alignSelf: 'center' }}>
        <Image
          source={{ uri: profilePic }}
          style={styles.profilePic}
          loadingIndicatorSource={{ uri: IMAGE_PLACEHOLDER }}
        />
        {isUpateProfilePicLoading && (
          <ActivityIndicator
            animating={isUpateProfilePicLoading}
            toast
            color={colors.white}
            size="large"
            styles={{ wrapper: styles.profilePic }}
          />
        )}
        <Popover
          triggerStyle={styles.imagePicker}
          options={IMAGE_PICKER_OPTIONS}
          onPickerOptionPress={handleImagePicker}>
          <IconFill name="camera" color={colors.white} size={20} />
        </Popover>
      </View>

      <WhiteSpace size="lg" />
      <Form
        sections={profileSections}
        validationSchema={updateProfileSchema}
        values={{
          firstName,
          lastName,
          email,
          dateOfBirth: dayjs(dateOfBirth).toDate(),
          phone,
          gender,
          country,
          city,
          zipCode,
        }}
        onSubmit={updateProfile}
        defaultValues={defaultValues}
        submitButtonLabel={'Update'}
        isLoading={isUpateProfileLoading}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  profilePic: {
    height: 120,
    width: 120,
    borderRadius: 100,
    borderColor: colors.black,
    borderWidth: 1,
  },
  imagePicker: {
    backgroundColor: `${colors.grey}CC`,
    borderColor: colors.white,
    borderWidth: 2,
    position: 'absolute',
    borderRadius: 100,
    padding: 5,
    bottom: 0,
    right: 0,
  },
});
