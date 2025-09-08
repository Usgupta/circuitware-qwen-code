/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Box, Text } from 'ink';
import Gradient from 'ink-gradient';
import { Colors } from '../colors.js';
import {
  shortAsciiLogo,
  longAsciiLogo,
  tinyAsciiLogo,
} from './CwareAsciiArt.js';
import { getAsciiArtWidth } from '../utils/textUtils.js';
import { useTerminalSize } from '../hooks/useTerminalSize.js';

// Custom ASCII art from environment variables (fallback to imported art)
const customShortAsciiLogo = process.env['CLI_ASCII_SHORT'] || '';
const customLongAsciiLogo = process.env['CLI_ASCII_LONG'] || '';
const customTinyAsciiLogo = process.env['CLI_ASCII_TINY'] || '';

interface HeaderProps {
  customAsciiArt?: string; // For user-defined ASCII art
  version: string;
  nightly: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  customAsciiArt,
  version,
  nightly,
}) => {
  const { columns: terminalWidth } = useTerminalSize();
  let displayTitle;

  // Use custom ASCII art from environment variables if available, otherwise use imported art
  const effectiveShortLogo = customShortAsciiLogo || shortAsciiLogo;
  const effectiveLongLogo = customLongAsciiLogo || longAsciiLogo;
  const effectiveTinyLogo = customTinyAsciiLogo || tinyAsciiLogo;

  const widthOfLongLogo = getAsciiArtWidth(effectiveLongLogo);
  const widthOfShortLogo = getAsciiArtWidth(effectiveShortLogo);

  if (customAsciiArt) {
    displayTitle = customAsciiArt;
  } else if (terminalWidth >= widthOfLongLogo) {
    displayTitle = effectiveLongLogo;
  } else if (terminalWidth >= widthOfShortLogo) {
    displayTitle = effectiveShortLogo;
  } else {
    displayTitle = effectiveTinyLogo;
  }

  const artWidth = getAsciiArtWidth(displayTitle);

  return (
    <Box
      alignItems="flex-start"
      width={artWidth}
      flexShrink={0}
      flexDirection="column"
    >
      {Colors.GradientColors ? (
        <Gradient colors={Colors.GradientColors}>
          <Text>{displayTitle}</Text>
        </Gradient>
      ) : (
        <Text>{displayTitle}</Text>
      )}
      {nightly && (
        <Box width="100%" flexDirection="row" justifyContent="flex-end">
          {Colors.GradientColors ? (
            <Gradient colors={Colors.GradientColors}>
              <Text>v{version}</Text>
            </Gradient>
          ) : (
            <Text>v{version}</Text>
          )}
        </Box>
      )}
    </Box>
  );
};
