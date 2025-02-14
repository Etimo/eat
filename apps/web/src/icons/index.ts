import { BackspaceIcon } from './BackspaceIcon';
import { BoardCheckmarkIcon } from './BoardCheckmarkIcon';
import { CalendarIcon } from './CalendarIcon';
import { CheckIcon } from './CheckIcon';
import { ChevronIcon } from './ChevronIcon';
import { CloseIcon } from './CloseIcon';
import { DeleteIcon } from './DeleteIcon';
import { EditIcon } from './EditIcon';
import { InfoIcon } from './InfoIcon';
import { MinusIcon } from './MinusIcon';
import { MoonIcon } from './MoonIcon';
import { PlusIcon } from './PlusIcon';
import { ShuffleIcon } from './ShuffleIcon';
import { SunIcon } from './SunIcon';

export const Icon = {
  Backspace: BackspaceIcon,
  BoardCheckmark: BoardCheckmarkIcon,
  Calendar: CalendarIcon,
  Check: CheckIcon,
  Chevron: ChevronIcon,
  Close: CloseIcon,
  Delete: DeleteIcon,
  Edit: EditIcon,
  Info: InfoIcon,
  Minus: MinusIcon,
  Moon: MoonIcon,
  Plus: PlusIcon,
  Shuffle: ShuffleIcon,
  Sun: SunIcon,
};
export type IconVariants = keyof typeof Icon;

export * from './GoogleIcon';
