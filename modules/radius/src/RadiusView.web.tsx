import * as React from 'react';

import { RadiusViewProps } from './Radius.types';

export default function RadiusView(props: RadiusViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
