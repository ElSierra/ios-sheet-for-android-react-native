import {
  NativeModulesProxy,
  EventEmitter,
  Subscription,
} from "expo-modules-core";

// Import the native module. On web, it will be resolved to Radius.web.ts
// and on native platforms to Radius.ts
import RadiusModule from "./src/RadiusModule";
import RadiusView from "./src/RadiusView";
import { ChangeEventPayload, RadiusViewProps } from "./src/Radius.types";
import { Platform } from "react-native";

// Get the native constant value.
export const PI = RadiusModule.PI;

export function hello(): string {
  return RadiusModule.hello();
}

export function getCornerRadius(): number {
  if (Platform.OS === "ios") {
    return 0;
  }
  return RadiusModule?.getCornerRadius();
}
export async function setValueAsync(value: string) {
  return await RadiusModule.setValueAsync(value);
}

const emitter = new EventEmitter(RadiusModule ?? NativeModulesProxy.Radius);

export function addChangeListener(
  listener: (event: ChangeEventPayload) => void
): Subscription {
  return emitter.addListener<ChangeEventPayload>("onChange", listener);
}

export { RadiusView, RadiusViewProps, ChangeEventPayload };
