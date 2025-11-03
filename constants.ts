export const COLORS = ['green', 'red', 'yellow', 'blue'] as const;

export const COLOR_STYLES: Record<typeof COLORS[number], string> = {
  green: 'bg-green-600/80 hover:bg-green-500/80 border-2 border-green-400/20',
  red: 'bg-red-600/80 hover:bg-red-500/80 border-2 border-red-400/20',
  yellow: 'bg-yellow-500/80 hover:bg-yellow-400/80 border-2 border-yellow-300/20',
  blue: 'bg-blue-600/80 hover:bg-blue-500/80 border-2 border-blue-400/20',
};

export const ACTIVE_COLOR_STYLES: Record<typeof COLORS[number], string> = {
  green: 'bg-green-400 scale-105 shadow-[0_0_30px_8px] shadow-green-400/70 border-2 border-green-300',
  red: 'bg-red-400 scale-105 shadow-[0_0_30px_8px] shadow-red-400/70 border-2 border-red-300',
  yellow: 'bg-yellow-300 scale-105 shadow-[0_0_30px_8px] shadow-yellow-300/70 border-2 border-yellow-200',
  blue: 'bg-blue-400 scale-105 shadow-[0_0_30px_8px] shadow-blue-400/70 border-2 border-blue-300',
};

export const SEQUENCE_INTERVAL = 800;
export const HIGHLIGHT_DURATION = 400;
export const MAX_LEVEL = 5;