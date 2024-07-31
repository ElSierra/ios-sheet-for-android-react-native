import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { RadiusViewProps } from './Radius.types';

const NativeView: React.ComponentType<RadiusViewProps> =
  requireNativeViewManager('Radius');

export default function RadiusView(props: RadiusViewProps) {
  return <NativeView {...props} />;
}
