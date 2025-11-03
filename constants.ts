export const COLORS = ['green', 'red', 'yellow', 'blue'] as const;

export const COLOR_STYLES: Record<typeof COLORS[number], string> = {
  green: 'bg-green-500 hover:bg-green-400',
  red: 'bg-red-500 hover:bg-red-400',
  yellow: 'bg-yellow-400 hover:bg-yellow-300',
  blue: 'bg-blue-500 hover:bg-blue-400',
};

export const ACTIVE_COLOR_STYLES: Record<typeof COLORS[number], string> = {
  green: 'bg-green-300 scale-105 shadow-[0_0_20px_5px] shadow-green-400/80',
  red: 'bg-red-300 scale-105 shadow-[0_0_20px_5px] shadow-red-400/80',
  yellow: 'bg-yellow-200 scale-105 shadow-[0_0_20px_5px] shadow-yellow-300/80',
  blue: 'bg-blue-300 scale-105 shadow-[0_0_20px_5px] shadow-blue-400/80',
};

export const SEQUENCE_INTERVAL = 800;
export const HIGHLIGHT_DURATION = 400;
export const MAX_LEVEL = 5;
