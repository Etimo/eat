'use client';
import { FC } from 'react';
import type { TextProps as RNTextProps } from 'react-native';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native';
import Reanimated, {
  SharedValue,
  useAnimatedProps,
} from 'react-native-reanimated';

Reanimated.addWhitelistedNativeProps({ text: true });

interface TextProps {
  text: SharedValue<string>;
  style?: RNTextProps['style'];
}

const ReanimatedTextInput = Reanimated.createAnimatedComponent(TextInput);

export const AnimatedTextValue: FC<TextProps> = ({ text, style = {} }) => {
  const animatedProps = useAnimatedProps(() => {
    return {
      text: text.value,
      defaul: text.value,
    } as any;
  }, []);

  const styles = StyleSheet.flatten([{ color: 'white' }, style]);
  return (
    <ReanimatedTextInput
      underlineColorAndroid="transparent"
      editable={false}
      value={text.value}
      style={styles}
      animatedProps={animatedProps}
    />
  );
};
