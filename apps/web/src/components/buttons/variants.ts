export type SizeVariants = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
export const Sizes: {
  [key in SizeVariants]: string;
} = {
  xsmall: 'px-2 py-1 rounded text-xs',
  small: 'px-2 py-1 rounded text-sm',
  medium: 'px-2.5 py-1.5 rounded-md text-sm',
  large: 'px-3 py-2 rounded-md text-sm',
  xlarge: 'px-3.5 py-2.5 rounded-md text-sm',
};

export const IconSizes: {
  [key in SizeVariants]: number;
} = {
  xsmall: 14,
  small: 16,
  medium: 18,
  large: 20,
  xlarge: 20,
};

export type ColorVariants =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'success'
  | 'error';
export const Colors: {
  [key in ColorVariants]: string;
} = {
  primary:
    'text-white bg-etimo border border-transparent hover:bg-etimo/90 hover:text-white/75',
  secondary:
    'text-etimo bg-white border border-transparent hover:bg-white/90 hover:text-etimo/90',
  outline:
    'text-white bg-transparent border border-white hover:bg-white/10 hover:text-white/95 hover:border-white/95',
  success:
    'text-gray-800 bg-green-400 border border-transparent hover:bg-green-500 hover:text-gray-900',
  error:
    'text-gray-800 bg-red-400 border border-transparent hover:bg-red-500 hover:text-gray-900',
};
