'use client';
import {
  Box,
  FormControl,
  Heading,
  Input,
  InputField,
  InputSlot,
  VStack,
  Text,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from '@gluestack-ui/themed';
import { FC } from 'react';
import { BaseScreenWrapper } from './BaseScreenWrapper';
import {
  ChevronDownIcon,
  PlusCircleIcon,
  TimerIcon,
} from 'lucide-react-native';

const title = 'New Activity';

export const NewActivityScreen: FC = () => {
  return (
    <BaseScreenWrapper title={title}>
      <VStack>
        <Heading size="2xl" color="$white">
          {title}
        </Heading>
        <Box>
          <FormControl
            size="lg"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            isRequired={false}
          >
            <VStack space="xl">
              <VStack>
                <Select>
                  <SelectTrigger variant="outline" size="xl">
                    <SelectInput placeholder="Select option" />
                    <SelectIcon>
                      <ChevronDownIcon color={'#ffffff'} />
                    </SelectIcon>
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent bg="#2c3e50" pb="$10">
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator bg="$white" />
                      </SelectDragIndicatorWrapper>
                      <SelectItem label="UX Research" value="ux" />
                      <SelectItem label="Web Development" value="web" />
                      <SelectItem
                        label="Cross Platform Development Process"
                        value="Cross Platform Development Process"
                      />
                      <SelectItem
                        label="UI Designing"
                        value="ui"
                        isDisabled={true}
                      />
                      <SelectItem label="Backend Development" value="backend" />
                    </SelectContent>
                  </SelectPortal>
                </Select>
              </VStack>
              <VStack>
                <Text color="$white">Activity</Text>
                <Input size="xl" px="$2">
                  <InputSlot>
                    <PlusCircleIcon color={'#ffffff'} />
                  </InputSlot>
                  <InputField
                    type="text"
                    placeholder="Activity"
                    color="$white"
                    borderColor="$white"
                    placeholderTextColor="#ffffff"
                  />
                </Input>
              </VStack>
              <VStack>
                <Text color="$white">Time</Text>
                <Input size="xl" px="$2">
                  <InputSlot>
                    <TimerIcon color={'#ffffff'} />
                  </InputSlot>
                  <InputField
                    type="text"
                    placeholder="Time"
                    color="$white"
                    borderColor="$white"
                    placeholderTextColor="#ffffff"
                  />
                </Input>
              </VStack>
            </VStack>
          </FormControl>
        </Box>
      </VStack>
    </BaseScreenWrapper>
  );
};
NewActivityScreen.displayName = 'NewActivityScreen';
