import { config, tokens, definitions } from "./ripple-tokens";
import { initializeRippleIntelliSense } from "./ripple-intellisense";

export default {
  config,
  tokens,
  definitions,
  init: initializeRippleIntelliSense,
};
