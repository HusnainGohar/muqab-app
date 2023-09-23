import { StyleSheet } from 'react-native';
import { hp } from '../../utils/constants';
import { WhiteSpace } from '@ant-design/react-native';
import { AuthLayout } from '../../components/organisms';
import { Text } from '../../components/atoms';

export const TermsConditions = () => {
  return (
    <AuthLayout
      title="Terms And Conditions"
      isLogin={false}
      paddingTop={hp('3%')}
      isFooter={false}
      isAuthSwitch={false}>
      <WhiteSpace size="lg" />
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo
        viverra maecenas accumsan lacus. Dignissim enim sit amet venenatis.
        Accumsan lacus vel facilisis volutpat. Non consectetur a erat nam at
        lectus urna duis convallis. Sed sed risus pretium quam vulputate
        dignissim. Nunc sed velit dignissim sodales ut. Et sollicitudin ac orci
        phasellus. Pellentesque diam volutpat commodo sed. In hendrerit gravida
        rutrum quisque non tellus orci ac auctor. Et pharetra pharetra massa
        massa ultricies. Diam maecenas sed enim ut sem. Dolor magna eget est
        lorem ipsum dolor. Senectus et netus et malesuada fames ac turpis
        egestas. Massa sapien faucibus et molestie ac feugiat sed lectus. Risus
        viverra adipiscing at in tellus integer feugiat. Dictum fusce ut
        placerat orci. Faucibus a pellentesque sit amet porttitor eget dolor
        morbi. Neque sodales ut etiam sit. Aenean euismod elementum nisi quis.
      </Text>
      <WhiteSpace size="lg" />
      <Text>
        Suscipit tellus mauris a diam maecenas sed enim ut sem. Tristique
        senectus et netus et malesuada fames. Donec ultrices tincidunt arcu non
        sodales neque. Venenatis a condimentum vitae sapien pellentesque. Nibh
        venenatis cras sed felis eget velit. Purus sit amet volutpat consequat.
        Erat pellentesque adipiscing commodo elit at imperdiet. Interdum
        consectetur libero id faucibus nisl tincidunt eget nullam. Lacinia at
        quis risus sed vulputate. Fermentum odio eu feugiat pretium nibh ipsum
        consequat nisl. Lacus vel facilisis volutpat est velit egestas. In
        dictum non consectetur a erat nam at. Sodales neque sodales ut etiam.
        Integer malesuada nunc vel risus commodo. Lectus proin nibh nisl
        condimentum id venenatis a condimentum. Mattis nunc sed blandit libero
        volutpat sed. Platea dictumst quisque sagittis purus sit. At auctor urna
        nunc id cursus metus aliquam. Non quam lacus suspendisse faucibus.
      </Text>
      <WhiteSpace size="lg" />
      <Text>
        Lorem ipsum dolor sit amet consectetur adipiscing elit duis tristique.
        Scelerisque purus semper eget duis at tellus at urna. Urna neque viverra
        justo nec ultrices dui sapien eget mi. Massa tincidunt dui ut ornare.
        Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing. Ac
        tortor dignissim convallis aenean et tortor at risus viverra. Feugiat
        pretium nibh ipsum consequat. Suspendisse ultrices gravida dictum fusce
        ut placerat orci. Lectus nulla at volutpat diam ut. Id leo in vitae
        turpis massa. Viverra nibh cras pulvinar mattis nunc sed blandit libero.
      </Text>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({});
