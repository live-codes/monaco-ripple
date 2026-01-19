// ripple-types.ts

export const rippleTypeDefinitions = `
// Core tracked value type
interface TrackedValue<T> {
  readonly value: T;
}

// Helper function that wraps values in tracking
declare function __rippleTrack__<T>(value: T): TrackedValue<T>;
declare function __rippleTrack__<T>(fn: () => T): TrackedValue<T>;

// Tracked collections
declare class TrackedArray<T> extends Array<T> {
  constructor(items?: T[]);

  // All mutating methods trigger reactivity
  push(...items: T[]): number;
  pop(): T | undefined;
  shift(): T | undefined;
  unshift(...items: T[]): number;
  splice(start: number, deleteCount?: number, ...items: T[]): T[];
  sort(compareFn?: (a: T, b: T) => number): this;
  reverse(): this;
  fill(value: T, start?: number, end?: number): this;
  copyWithin(target: number, start: number, end?: number): this;
}

declare class TrackedObject<T extends object> {
  constructor(obj: T);

  // Proxy-based, all property access/mutation is tracked
  [K in keyof T]: T[K];
}

declare class TrackedSet<T> extends Set<T> {
  constructor(items?: Iterable<T>);
}

declare class TrackedMap<K, V> extends Map<K, V> {
  constructor(entries?: Iterable<readonly [K, V]>);
}

declare class TrackedDate extends Date {
  constructor(...args: ConstructorParameters<typeof Date>);

  // All setters trigger reactivity
  setTime(time: number): number;
  setMilliseconds(ms: number): number;
  setSeconds(sec: number, ms?: number): number;
  setMinutes(min: number, sec?: number, ms?: number): number;
  setHours(hour: number, min?: number, sec?: number, ms?: number): number;
  setDate(date: number): number;
  setMonth(month: number, date?: number): number;
  setFullYear(year: number, month?: number, date?: number): number;
}

// Core reactivity functions
declare module 'ripple' {
  export function track<T>(value: T): TrackedValue<T>;
  export function track<T>(fn: () => T): TrackedValue<T>;

  export function untrack<T>(fn: () => T): T;

  export function effect(fn: () => void | (() => void)): () => void;

  export function computed<T>(fn: () => T): TrackedValue<T>;

  export function batch(fn: () => void): void;

  export function flushSync(fn: () => void): void;

  export function tick(): Promise<void>;
}

// Lifecycle and events
declare module 'ripple' {
  export function onMount(fn: () => void | (() => void)): void;

  export function onDestroy(fn: () => void): void;

  export function on<K extends keyof WindowEventMap>(
    target: Window,
    event: K,
    handler: (e: WindowEventMap[K]) => void,
    options?: AddEventListenerOptions
  ): void;

  export function on<K extends keyof DocumentEventMap>(
    target: Document,
    event: K,
    handler: (e: DocumentEventMap[K]) => void,
    options?: AddEventListenerOptions
  ): void;

  export function on<K extends keyof HTMLElementEventMap>(
    target: HTMLElement,
    event: K,
    handler: (e: HTMLElementEventMap[K]) => void,
    options?: AddEventListenerOptions
  ): void;

  export function on<T extends EventTarget>(
    target: T,
    event: string,
    handler: (e: Event) => void,
    options?: AddEventListenerOptions
  ): void;
}

// Component types
declare module 'ripple' {
  export type Component<P = {}> = (props: P) => void;

  export type PropsWithChildren<P = {}> = P & {
    children?: RippleNode;
  };

  export type RippleNode =
    | string
    | number
    | boolean
    | null
    | undefined
    | Element
    | RippleNode[];

  export function mount(
    component: Component | (() => void),
    target: Element | string
  ): () => void;

  export function hydrate(
    component: Component | (() => void),
    target: Element | string
  ): () => void;
}

// Context API
declare module 'ripple' {
  export class Context<T> {
    constructor(defaultValue: T);
    provide(value: T): void;
    consume(): T;
  }

  export function createContext<T>(defaultValue: T): Context<T>;
}

// Portal
declare module 'ripple' {
  export function portal(target: Element | string, content: () => void): void;

  export class Portal {
    constructor(props: { target: Element | string; children?: any });
  }
}

// Transitions
declare module 'ripple' {
  export interface TransitionConfig {
    delay?: number;
    duration?: number;
    easing?: (t: number) => number;
    css?: (t: number, u: number) => string;
    tick?: (t: number, u: number) => void;
  }

  export function fade(node: Element, params?: { delay?: number; duration?: number }): TransitionConfig;
  export function fly(node: Element, params?: { delay?: number; duration?: number; x?: number; y?: number; opacity?: number }): TransitionConfig;
  export function slide(node: Element, params?: { delay?: number; duration?: number }): TransitionConfig;
  export function scale(node: Element, params?: { delay?: number; duration?: number; start?: number; opacity?: number }): TransitionConfig;
  export function draw(node: SVGPathElement, params?: { delay?: number; duration?: number; speed?: number }): TransitionConfig;
}

// Stores (if Ripple has them)
declare module 'ripple/store' {
  export interface Writable<T> {
    subscribe(fn: (value: T) => void): () => void;
    set(value: T): void;
    update(fn: (value: T) => T): void;
  }

  export interface Readable<T> {
    subscribe(fn: (value: T) => void): () => void;
  }

  export function writable<T>(initial: T): Writable<T>;
  export function readable<T>(initial: T, start?: (set: (value: T) => void) => void | (() => void)): Readable<T>;
  export function derived<T, S>(stores: Readable<S> | Readable<S>[], fn: (values: S | S[]) => T): Readable<T>;
  export function get<T>(store: Readable<T>): T;
}

// JSX types
declare namespace JSX {
  type Element = any;

  interface ElementAttributesProperty {
    props: {};
  }

  interface ElementChildrenAttribute {
    children: {};
  }

  type IntrinsicElements = {
    [K in keyof HTMLElementTagNameMap]: HTMLAttributes<HTMLElementTagNameMap[K]>;
  } & {
    [K in keyof SVGElementTagNameMap]: SVGAttributes<SVGElementTagNameMap[K]>;
  };

  interface HTMLAttributes<T extends HTMLElement> {
    // Standard attributes
    accessKey?: string;
    className?: string;
    class?: string;
    contentEditable?: boolean | 'true' | 'false' | 'inherit';
    dir?: 'ltr' | 'rtl' | 'auto';
    draggable?: boolean | 'true' | 'false';
    hidden?: boolean;
    id?: string;
    lang?: string;
    spellcheck?: boolean | 'true' | 'false';
    style?: string | Partial<CSSStyleDeclaration>;
    tabIndex?: number;
    title?: string;
    translate?: 'yes' | 'no';

    // WAI-ARIA
    role?: string;

    // RDFa
    about?: string;
    datatype?: string;
    inlist?: boolean;
    prefix?: string;
    property?: string;
    resource?: string;
    typeof?: string;
    vocab?: string;

    // Non-standard
    autoCapitalize?: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';
    autoCorrect?: 'on' | 'off';
    autoSave?: string;
    color?: string;
    itemProp?: string;
    itemScope?: boolean;
    itemType?: string;
    itemID?: string;
    itemRef?: string;
    results?: number;
    security?: string;
    unselectable?: 'on' | 'off';

    // Event handlers
    onAbort?: (e: UIEvent) => void;
    onAnimationEnd?: (e: AnimationEvent) => void;
    onAnimationIteration?: (e: AnimationEvent) => void;
    onAnimationStart?: (e: AnimationEvent) => void;
    onBlur?: (e: FocusEvent) => void;
    onCanPlay?: (e: Event) => void;
    onCanPlayThrough?: (e: Event) => void;
    onChange?: (e: Event) => void;
    onClick?: (e: MouseEvent) => void;
    onContextMenu?: (e: MouseEvent) => void;
    onCopy?: (e: ClipboardEvent) => void;
    onCut?: (e: ClipboardEvent) => void;
    onDblClick?: (e: MouseEvent) => void;
    onDrag?: (e: DragEvent) => void;
    onDragEnd?: (e: DragEvent) => void;
    onDragEnter?: (e: DragEvent) => void;
    onDragExit?: (e: DragEvent) => void;
    onDragLeave?: (e: DragEvent) => void;
    onDragOver?: (e: DragEvent) => void;
    onDragStart?: (e: DragEvent) => void;
    onDrop?: (e: DragEvent) => void;
    onDurationChange?: (e: Event) => void;
    onEmptied?: (e: Event) => void;
    onEnded?: (e: Event) => void;
    onError?: (e: ErrorEvent) => void;
    onFocus?: (e: FocusEvent) => void;
    onInput?: (e: InputEvent) => void;
    onKeyDown?: (e: KeyboardEvent) => void;
    onKeyPress?: (e: KeyboardEvent) => void;
    onKeyUp?: (e: KeyboardEvent) => void;
    onLoad?: (e: Event) => void;
    onLoadedData?: (e: Event) => void;
    onLoadedMetadata?: (e: Event) => void;
    onLoadStart?: (e: Event) => void;
    onMouseDown?: (e: MouseEvent) => void;
    onMouseEnter?: (e: MouseEvent) => void;
    onMouseLeave?: (e: MouseEvent) => void;
    onMouseMove?: (e: MouseEvent) => void;
    onMouseOut?: (e: MouseEvent) => void;
    onMouseOver?: (e: MouseEvent) => void;
    onMouseUp?: (e: MouseEvent) => void;
    onPaste?: (e: ClipboardEvent) => void;
    onPause?: (e: Event) => void;
    onPlay?: (e: Event) => void;
    onPlaying?: (e: Event) => void;
    onProgress?: (e: ProgressEvent) => void;
    onRateChange?: (e: Event) => void;
    onReset?: (e: Event) => void;
    onScroll?: (e: UIEvent) => void;
    onSeeked?: (e: Event) => void;
    onSeeking?: (e: Event) => void;
    onSelect?: (e: UIEvent) => void;
    onStalled?: (e: Event) => void;
    onSubmit?: (e: SubmitEvent) => void;
    onSuspend?: (e: Event) => void;
    onTimeUpdate?: (e: Event) => void;
    onToggle?: (e: Event) => void;
    onTouchCancel?: (e: TouchEvent) => void;
    onTouchEnd?: (e: TouchEvent) => void;
    onTouchMove?: (e: TouchEvent) => void;
    onTouchStart?: (e: TouchEvent) => void;
    onTransitionEnd?: (e: TransitionEvent) => void;
    onVolumeChange?: (e: Event) => void;
    onWaiting?: (e: Event) => void;
    onWheel?: (e: WheelEvent) => void;

    // Ripple-specific directives
    'bind:value'?: any;
    'bind:checked'?: any;
    'bind:group'?: any;
    'bind:files'?: any;
    'bind:this'?: any;
    'on:click'?: (e: MouseEvent) => void;
    'on:input'?: (e: InputEvent) => void;
    'on:change'?: (e: Event) => void;
    'on:submit'?: (e: SubmitEvent) => void;
    'on:keydown'?: (e: KeyboardEvent) => void;
    'on:keyup'?: (e: KeyboardEvent) => void;
    'use:action'?: (node: T, params?: any) => void | { destroy?: () => void; update?: (params: any) => void };
    'in:transition'?: (node: T, params?: any) => TransitionConfig;
    'out:transition'?: (node: T, params?: any) => TransitionConfig;
    'transition:name'?: (node: T, params?: any) => TransitionConfig;

    // Allow data-* and aria-* attributes
    [key: \`data-\${string}\`]: any;
    [key: \`aria-\${string}\`]: string;

    // Catch-all for other attributes
    [key: string]: any;
  }

  interface SVGAttributes<T extends SVGElement> extends HTMLAttributes<any> {
    // SVG-specific attributes
    accentHeight?: number | string;
    accumulate?: 'none' | 'sum';
    additive?: 'replace' | 'sum';
    alignmentBaseline?: 'auto' | 'baseline' | 'before-edge' | 'text-before-edge' | 'middle' | 'central' | 'after-edge' | 'text-after-edge' | 'ideographic' | 'alphabetic' | 'hanging' | 'mathematical' | 'inherit';
    allowReorder?: 'no' | 'yes';
    alphabetic?: number | string;
    amplitude?: number | string;
    arabicForm?: 'initial' | 'medial' | 'terminal' | 'isolated';
    ascent?: number | string;
    attributeName?: string;
    attributeType?: string;
    autoReverse?: number | string;
    azimuth?: number | string;
    baseFrequency?: number | string;
    baselineShift?: number | string;
    baseProfile?: number | string;
    bbox?: number | string;
    begin?: number | string;
    bias?: number | string;
    by?: number | string;
    calcMode?: number | string;
    capHeight?: number | string;
    clip?: number | string;
    clipPath?: string;
    clipPathUnits?: number | string;
    clipRule?: number | string;
    colorInterpolation?: number | string;
    colorInterpolationFilters?: 'auto' | 'sRGB' | 'linearRGB' | 'inherit';
    colorProfile?: number | string;
    colorRendering?: number | string;
    contentScriptType?: number | string;
    contentStyleType?: number | string;
    cursor?: number | string;
    cx?: number | string;
    cy?: number | string;
    d?: string;
    decelerate?: number | string;
    descent?: number | string;
    diffuseConstant?: number | string;
    direction?: number | string;
    display?: number | string;
    divisor?: number | string;
    dominantBaseline?: number | string;
    dur?: number | string;
    dx?: number | string;
    dy?: number | string;
    edgeMode?: number | string;
    elevation?: number | string;
    enableBackground?: number | string;
    end?: number | string;
    exponent?: number | string;
    externalResourcesRequired?: number | string;
    fill?: string;
    fillOpacity?: number | string;
    fillRule?: 'nonzero' | 'evenodd' | 'inherit';
    filter?: string;
    filterRes?: number | string;
    filterUnits?: number | string;
    floodColor?: number | string;
    floodOpacity?: number | string;
    focusable?: number | string;
    fontFamily?: string;
    fontSize?: number | string;
    fontSizeAdjust?: number | string;
    fontStretch?: number | string;
    fontStyle?: number | string;
    fontVariant?: number | string;
    fontWeight?: number | string;
    format?: number | string;
    from?: number | string;
    fx?: number | string;
    fy?: number | string;
    g1?: number | string;
    g2?: number | string;
    glyphName?: number | string;
    glyphOrientationHorizontal?: number | string;
    glyphOrientationVertical?: number | string;
    glyphRef?: number | string;
    gradientTransform?: string;
    gradientUnits?: string;
    hanging?: number | string;
    height?: number | string;
    horizAdvX?: number | string;
    horizOriginX?: number | string;
    ideographic?: number | string;
    imageRendering?: number | string;
    in?: string;
    in2?: number | string;
    intercept?: number | string;
    k?: number | string;
    k1?: number | string;
    k2?: number | string;
    k3?: number | string;
    k4?: number | string;
    kernelMatrix?: number | string;
    kernelUnitLength?: number | string;
    kerning?: number | string;
    keyPoints?: number | string;
    keySplines?: number | string;
    keyTimes?: number | string;
    lengthAdjust?: number | string;
    letterSpacing?: number | string;
    lightingColor?: number | string;
    limitingConeAngle?: number | string;
    local?: number | string;
    markerEnd?: string;
    markerHeight?: number | string;
    markerMid?: string;
    markerStart?: string;
    markerUnits?: number | string;
    markerWidth?: number | string;
    mask?: string;
    maskContentUnits?: number | string;
    maskUnits?: number | string;
    mathematical?: number | string;
    mode?: number | string;
    numOctaves?: number | string;
    offset?: number | string;
    opacity?: number | string;
    operator?: number | string;
    order?: number | string;
    orient?: number | string;
    orientation?: number | string;
    origin?: number | string;
    overflow?: number | string;
    overlinePosition?: number | string;
    overlineThickness?: number | string;
    paintOrder?: number | string;
    panose1?: number | string;
    pathLength?: number | string;
    patternContentUnits?: string;
    patternTransform?: number | string;
    patternUnits?: string;
    pointerEvents?: number | string;
    points?: string;
    pointsAtX?: number | string;
    pointsAtY?: number | string;
    pointsAtZ?: number | string;
    preserveAlpha?: number | string;
    preserveAspectRatio?: string;
    primitiveUnits?: number | string;
    r?: number | string;
    radius?: number | string;
    refX?: number | string;
    refY?: number | string;
    renderingIntent?: number | string;
    repeatCount?: number | string;
    repeatDur?: number | string;
    requiredExtensions?: number | string;
    requiredFeatures?: number | string;
    restart?: number | string;
    result?: string;
    rotate?: number | string;
    rx?: number | string;
    ry?: number | string;
    scale?: number | string;
    seed?: number | string;
    shapeRendering?: number | string;
    slope?: number | string;
    spacing?: number | string;
    specularConstant?: number | string;
    specularExponent?: number | string;
    speed?: number | string;
    spreadMethod?: string;
    startOffset?: number | string;
    stdDeviation?: number | string;
    stemh?: number | string;
    stemv?: number | string;
    stitchTiles?: number | string;
    stopColor?: string;
    stopOpacity?: number | string;
    strikethroughPosition?: number | string;
    strikethroughThickness?: number | string;
    string?: number | string;
    stroke?: string;
    strokeDasharray?: string | number;
    strokeDashoffset?: string | number;
    strokeLinecap?: 'butt' | 'round' | 'square' | 'inherit';
    strokeLinejoin?: 'miter' | 'round' | 'bevel' | 'inherit';
    strokeMiterlimit?: string | number;
    strokeOpacity?: number | string;
    strokeWidth?: number | string;
    surfaceScale?: number | string;
    systemLanguage?: number | string;
    tableValues?: number | string;
    targetX?: number | string;
    targetY?: number | string;
    textAnchor?: string;
    textDecoration?: number | string;
    textLength?: number | string;
    textRendering?: number | string;
    to?: number | string;
    transform?: string;
    u1?: number | string;
    u2?: number | string;
    underlinePosition?: number | string;
    underlineThickness?: number | string;
    unicode?: number | string;
    unicodeBidi?: number | string;
    unicodeRange?: number | string;
    unitsPerEm?: number | string;
    vAlphabetic?: number | string;
    values?: string;
    vectorEffect?: number | string;
    version?: string;
    vertAdvY?: number | string;
    vertOriginX?: number | string;
    vertOriginY?: number | string;
    vHanging?: number | string;
    vIdeographic?: number | string;
    viewBox?: string;
    viewTarget?: number | string;
    visibility?: number | string;
    vMathematical?: number | string;
    width?: number | string;
    widths?: number | string;
    wordSpacing?: number | string;
    writingMode?: number | string;
    x?: number | string;
    x1?: number | string;
    x2?: number | string;
    xChannelSelector?: string;
    xHeight?: number | string;
    xlinkActuate?: string;
    xlinkArcrole?: string;
    xlinkHref?: string;
    xlinkRole?: string;
    xlinkShow?: string;
    xlinkTitle?: string;
    xlinkType?: string;
    xmlBase?: string;
    xmlLang?: string;
    xmlns?: string;
    xmlnsXlink?: string;
    xmlSpace?: string;
    y?: number | string;
    y1?: number | string;
    y2?: number | string;
    yChannelSelector?: string;
    z?: number | string;
    zoomAndPan?: string;
  }
}
`;
