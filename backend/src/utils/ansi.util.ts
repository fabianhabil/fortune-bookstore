export const CSI = '\x1b';

/**
 * Provide simple coloring for the console
 */
export const ANSI = {
    DARK_RED: `${CSI}[0;31m`,
    RED: `${CSI}[0;91m`,
    GREEN: `${CSI}[0;92m`,
    RESET: `${CSI}[0m`,
};