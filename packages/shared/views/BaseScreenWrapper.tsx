import { Box, HStack, Pressable, Text } from '@gluestack-ui/themed';
import { BackgroundGradient } from '@shared/components';
import { MobileMenu } from '@shared/components/Menu';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react-native';
import { FC } from 'react';
import { useRouter } from 'solito/navigation';
import Reanimated, { useAnimatedRef } from 'react-native-reanimated';
import { ScrollBasedOpacityWrapper } from '@shared/components/Animation';
import { ScrollViewOffsetProvider } from '@shared/contexts';
import { useAnimationStore } from '@shared/zustand';

type BaseScreenWrapperProps = {
  children: React.ReactElement;
  title?: string;
  scrollable?: boolean;
  isMain?: boolean;
  hideMenu?: boolean;
};

export const BaseScreenWrapper: FC<BaseScreenWrapperProps> = ({
  children,
  title = '',
  scrollable = false,
  isMain = false,
  hideMenu = false,
}) => {
  const router = useRouter();
  const ref = useAnimatedRef<Reanimated.ScrollView>();

  const { titleScrollOffsetTrigger } = useAnimationStore();

  return (
    <>
      <BackgroundGradient />

      <ScrollViewOffsetProvider animatedRef={ref} scrollable={scrollable}>
        <Box
          pt="$7"
          h="$full"
          sx={{
            _web: {
              minHeight: '100vh',
              paddingTop: '$10',
              maxWidth: 1024,
              width: 1024,
              marginHorizontal: 'auto',
            },
          }}
        >
          {!isMain && (
            <HStack
              alignItems="center"
              justifyContent="space-between"
              m="$0"
              mt={-28}
            >
              <Pressable
                onPress={() => router.back()}
                sx={{
                  _web: {
                    display: 'none',
                  },
                }}
              >
                <HStack alignItems="center">
                  <ChevronLeftIcon color="white" size={30} />
                  <Text color="$white">Back</Text>
                </HStack>
              </Pressable>

              <ScrollBasedOpacityWrapper
                invert
                trigger={titleScrollOffsetTrigger}
              >
                <Text color="$white">{title}</Text>
              </ScrollBasedOpacityWrapper>

              {/* Mirror back button to always center title */}
              <HStack alignItems="center" style={{ opacity: 0 }}>
                <Text color="$white">Back</Text>
                <ChevronRightIcon color="white" size={30} />
              </HStack>
            </HStack>
          )}
          <Reanimated.ScrollView
            ref={ref}
            scrollEnabled={scrollable}
            style={{ paddingHorizontal: 16, width: '100%' }}
          >
            {/* <Box sx={{ _web: { width: 992 } }}> */}
            {children}
            {/* </Box> */}
          </Reanimated.ScrollView>
        </Box>

        {!hideMenu && <MobileMenu />}
      </ScrollViewOffsetProvider>
    </>
  );
};
BaseScreenWrapper.displayName = 'BaseScreenWrapper';
