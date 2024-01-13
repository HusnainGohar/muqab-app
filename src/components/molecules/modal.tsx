import { Modal as AntModal, WhiteSpace } from '@ant-design/react-native';
import { StyleSheet } from 'react-native';
import { wp } from '../../utils/constants';
import { ModalProps } from '../../utils/types';
import { Button, Text } from '../atoms';

export const Modal = ({
  title = '',
  description = '',
  onCancel,
  onApply,
  applyButtonText = 'Yes',
  cancelButtonText = 'No',
  maskClosable = true,
  transparent = true,
  visible = true,
  animated = true,
  animateAppear = true,
  animationType = 'slide',
  isLoading = false,
  children,
}: ModalProps) => {
  return (
    <AntModal
      visible={visible}
      animated={animated}
      animateAppear={animateAppear}
      animationType={animationType}
      title={<Text type="h2">{title}</Text>}
      transparent={transparent}
      onClose={onCancel}
      maskClosable={maskClosable}
      styles={{
        container: styles.container,
        innerContainer: styles.innerContainer,
        body: styles.body,
      }}>
      <WhiteSpace size="lg" />
      <Text style={styles.descriptionText}>{description}</Text>
      <WhiteSpace size="lg" />
      {children}
      <WhiteSpace size="md" />
      {!!onApply && (
        <Button
          style={styles.button}
          title={applyButtonText}
          onPress={onApply}
          isLoading={isLoading}
        />
      )}
      <WhiteSpace size="md" />
      {!!onCancel && (
        <Button
          variant="ghost"
          style={styles.button}
          title={cancelButtonText}
          onPress={onCancel}
        />
      )}
    </AntModal>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('5%'),
  },
  innerContainer: {
    alignItems: 'center',
    borderRadius: 10,
    width: wp('80%'),
  },
  body: {
    alignItems: 'center',
  },
  button: {
    width: wp('40%'),
    borderRadius: 25,
  },
  descriptionText: {
    textAlign: 'center',
    fontSize: 14,
  },
});
