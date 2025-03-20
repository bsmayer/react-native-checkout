import React from 'react';
import { View } from 'react-native';

interface SpaceProps {
  size: number;
}

/**
 * Dummy component for applying a space between elements
 */
export function Space({ size }: SpaceProps): React.ReactElement {
  return <View style={{ width: '100%', height: size }} />;
}
