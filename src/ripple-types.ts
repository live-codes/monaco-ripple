// ripple-types.ts

// https://unpkg.com/ripple/types/index.d.ts
const rippleTypes = `
export type Component<T = Record<string, any>> = (props: T) => void;

export type CompatApi = {
	createRoot: () => void;
	createComponent: (node: any, children_fn: () => any) => void;
	jsx: (type: any, props: any) => any;
};

export type CompatOptions = {
	[key: string]: CompatApi;
};

export function mount(
	component: () => void,
	options: { target: HTMLElement; props?: Record<string, any>; compat?: CompatOptions },
): () => void;

export function tick(): Promise<void>;

export function untrack<T>(fn: () => T): T;

export function flushSync<T>(fn?: () => T): T;

export function effect(fn: (() => void) | (() => () => void)): void;

export interface TrackedArrayConstructor {
	new <T>(...elements: T[]): TrackedArray<T>; // must be used with \`new\`
	from<T>(arrayLike: ArrayLike<T>): TrackedArray<T>;
	of<T>(...items: T[]): TrackedArray<T>;
	fromAsync<T>(iterable: AsyncIterable<T>): Promise<TrackedArray<T>>;
}

export interface TrackedArray<T> extends Array<T> {}

export const TrackedArray: TrackedArrayConstructor;

export class Context<T> {
	constructor(initial_value: T);
	get(): T;
	set(value: T): void;
	#private;
}

export class TrackedSet<T> extends Set<T> {
	isDisjointFrom<U>(other: ReadonlySetLike<U> | TrackedSet<U>): boolean;
	isSubsetOf<U>(other: ReadonlySetLike<U> | TrackedSet<U>): boolean;
	isSupersetOf<U>(other: ReadonlySetLike<U> | TrackedSet<U>): boolean;
	difference<U>(other: ReadonlySetLike<U> | TrackedSet<U>): TrackedSet<T>;
	intersection<U>(other: ReadonlySetLike<U> | TrackedSet<U>): TrackedSet<T & U>;
	symmetricDifference<U>(other: ReadonlySetLike<U> | TrackedSet<U>): TrackedSet<T | U>;
	union<U>(other: ReadonlySetLike<U> | TrackedSet<U>): TrackedSet<T | U>;
	toJSON(): T[];
	#private;
}

export class TrackedMap<K, V> extends Map<K, V> {
	toJSON(): [K, V][];
	#private;
}

// Compiler-injected runtime symbols (for Ripple component development)
declare global {
	/**
	 * Runtime block context injected by the Ripple compiler.
	 * This is automatically available in component scopes and passed to runtime functions.
	 */
	var __block: any;

	/**
	 * Ripple runtime namespace - injected by the compiler
	 * These functions are available in compiled Ripple components for TypeScript analysis
	 */
	var _$_: {
		tracked<T>(value: T, block?: any): T;
		computed<T>(fn: () => T, block?: any): T;
		scope(): any;
		get_tracked(node: any): any;
		get_derived(node: any): any;
		set(node: any, value: any): any;
		// Add other runtime functions as needed for TypeScript analysis
	};
}

export function createRefKey(): symbol;

// Base Tracked interface - all tracked values have a '#v' property containing the actual value
export interface Tracked<V> {
	'#v': V;
}

// Augment Tracked to be callable when V is a Component
// This allows <@Something /> to work in JSX when Something is Tracked<Component>
export interface Tracked<V> {
	(props: V extends Component<infer P> ? P : never): V extends Component ? void : never;
}

// Helper type to infer component type from a function that returns a component
// If T is a function returning a Component, extract the Component type itself, not the return type (void)
export type InferComponent<T> = T extends () => infer R ? (R extends Component<any> ? R : T) : T;

export type Props<K extends PropertyKey = any, V = unknown> = Record<K, V>;
export type PropsWithExtras<T extends object> = Props & T & Record<string, unknown>;
export type PropsWithChildren<T extends object = {}> = Expand<
	Omit<Props, 'children'> & { children: Component } & T
>;

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

type PickKeys<T, K extends readonly (keyof T)[]> = { [I in keyof K]: Tracked<T[K[I] & keyof T]> };

type RestKeys<T, K extends readonly (keyof T)[]> = Expand<Omit<T, K[number]>>;

type SplitResult<T extends Props, K extends readonly (keyof T)[]> = [
	...PickKeys<T, K>,
	Tracked<RestKeys<T, K>>,
];

export function get<V>(tracked: Tracked<V>): V;

export function set<V>(tracked: Tracked<V>, value: V): void;

// Overload for function values - infers the return type of the function
export function track<V>(
	value: () => V,
	get?: (v: InferComponent<V>) => InferComponent<V>,
	set?: (next: InferComponent<V>, prev: InferComponent<V>) => InferComponent<V>,
): Tracked<InferComponent<V>>;
// Overload for non-function values
export function track<V>(value?: V, get?: (v: V) => V, set?: (next: V, prev: V) => V): Tracked<V>;

export function trackSplit<V extends Props, const K extends readonly (keyof V)[]>(
	value: V,
	splitKeys: K,
): SplitResult<V, K>;

export interface AddEventOptions extends ExtendedEventOptions {
	customName?: string;
}

export interface AddEventObject extends AddEventOptions, EventListenerObject {}

export interface ExtendedEventOptions extends AddEventListenerOptions, EventListenerOptions {
	delegated?: boolean;
}

export function on<Type extends keyof WindowEventMap>(
	window: Window,
	type: Type,
	handler: (this: Window, event: WindowEventMap[Type]) => any,
	options?: ExtendedEventOptions | undefined,
): () => void;

export function on<Type extends keyof DocumentEventMap>(
	document: Document,
	type: Type,
	handler: (this: Document, event: DocumentEventMap[Type]) => any,
	options?: ExtendedEventOptions | undefined,
): () => void;

export function on<Element extends HTMLElement, Type extends keyof HTMLElementEventMap>(
	element: Element,
	type: Type,
	handler: (this: Element, event: HTMLElementEventMap[Type]) => any,
	options?: ExtendedEventOptions | undefined,
): () => void;

export function on<Element extends MediaQueryList, Type extends keyof MediaQueryListEventMap>(
	element: Element,
	type: Type,
	handler: (this: Element, event: MediaQueryListEventMap[Type]) => any,
	options?: ExtendedEventOptions | undefined,
): () => void;

export function on(
	element: EventTarget,
	type: string,
	handler: EventListener,
	options?: ExtendedEventOptions | undefined,
): () => void;

export type TrackedObjectShallow<T> = {
	[K in keyof T]: T[K] | Tracked<T[K]>;
};

export type TrackedObjectDeep<T> = T extends
	| string
	| number
	| boolean
	| null
	| undefined
	| symbol
	| bigint
	? T | Tracked<T>
	: T extends TrackedArray<infer U>
		? TrackedArray<U> | Tracked<TrackedArray<U>>
		: T extends TrackedSet<infer U>
			? TrackedSet<U> | Tracked<TrackedSet<U>>
			: T extends TrackedMap<infer K, infer V>
				? TrackedMap<K, V> | Tracked<TrackedMap<K, V>>
				: T extends Array<infer U>
					? Array<TrackedObjectDeep<U>> | Tracked<Array<TrackedObjectDeep<U>>>
					: T extends Set<infer U>
						? Set<TrackedObjectDeep<U>> | Tracked<Set<TrackedObjectDeep<U>>>
						: T extends Map<infer K, infer V>
							?
									| Map<TrackedObjectDeep<K>, TrackedObjectDeep<V>>
									| Tracked<Map<TrackedObjectDeep<K>, TrackedObjectDeep<V>>>
							: T extends object
								? { [K in keyof T]: TrackedObjectDeep<T[K]> | Tracked<TrackedObjectDeep<T[K]>> }
								: T | Tracked<T>;

export type TrackedObject<T extends object = object> = T & { readonly __brand: unique symbol };

export interface TrackedObjectConstructor {
	new <T extends Object>(obj: T): TrackedObject<T>;
}

export const TrackedObject: TrackedObjectConstructor;

export class TrackedDate extends Date {
	constructor(...params: any[]);
	#private;
}

declare const REPLACE: unique symbol;

export class TrackedURLSearchParams extends URLSearchParams {
	[REPLACE](params: URLSearchParams): void;
	#private;
}

export class TrackedURL extends URL {
	get searchParams(): TrackedURLSearchParams;
	#private;
}

export function createSubscriber(start: () => void | (() => void)): () => void;

interface ReactiveValue<V> extends Tracked<V> {
	new (fn: () => Tracked<V>, start: () => void | (() => void)): Tracked<V>;
	/** @private */
	_brand: void;
}

export interface MediaQuery extends Tracked<boolean> {
	new (query: string, fallback?: boolean | undefined): Tracked<boolean>;
	/** @private */
	_brand: void;
}

export const MediaQuery: {
	new (query: string, fallback?: boolean | undefined): Tracked<boolean>;
};

export function Portal<V = HTMLElement>({
	target,
	children: Component,
}: {
	target: V;
	children?: Component;
}): void;

export type GetFunction<V> = () => V;
export type SetFunction<V> = (v: V) => void;

export function bindValue<V>(
	tracked: Tracked<V> | GetFunction<V>,
	setter?: SetFunction<V>,
): (node: HTMLInputElement | HTMLSelectElement) => void;

export function bindChecked<V>(
	tracked: Tracked<V> | GetFunction<V>,
	setter?: SetFunction<V>,
): (node: HTMLInputElement) => void;

export function bindClientWidth<V>(
	tracked: Tracked<V> | GetFunction<V>,
	setter?: SetFunction<V>,
): (node: HTMLElement) => void;

export function bindClientHeight<V>(
	tracked: Tracked<V> | GetFunction<V>,
	setter?: SetFunction<V>,
): (node: HTMLElement) => void;

export function bindContentRect<V>(
	tracked: Tracked<V> | GetFunction<V>,
	setter?: SetFunction<V>,
): (node: HTMLElement) => void;

export function bindContentBoxSize<V>(
	tracked: Tracked<V> | GetFunction<V>,
	setter?: SetFunction<V>,
): (node: HTMLElement) => void;

export function bindBorderBoxSize<V>(
	tracked: Tracked<V> | GetFunction<V>,
	setter?: SetFunction<V>,
): (node: HTMLElement) => void;

export function bindDevicePixelContentBoxSize<V>(
	tracked: Tracked<V> | GetFunction<V>,
	setter?: SetFunction<V>,
): (node: HTMLElement) => void;

export function bindInnerHTML<V>(
	tracked: Tracked<V> | GetFunction<V>,
	setter?: SetFunction<V>,
): (node: HTMLElement) => void;

export function bindInnerText<V>(
	tracked: Tracked<V> | GetFunction<V>,
	setter?: SetFunction<V>,
): (node: HTMLElement) => void;

export function bindTextContent<V>(
	tracked: Tracked<V> | GetFunction<V>,
	setter?: SetFunction<V>,
): (node: HTMLElement) => void;

export function bindNode<V>(
	tracked: Tracked<V> | GetFunction<V>,
	setter?: SetFunction<V>,
): (node: HTMLElement) => void;

export function bindGroup<V>(
	tracked: Tracked<V> | GetFunction<V>,
	setter?: SetFunction<V>,
): (node: HTMLInputElement) => void;

export function bindOffsetHeight<V>(
	tracked: Tracked<V> | GetFunction<V>,
	setter?: SetFunction<V>,
): (node: HTMLElement) => void;

export function bindOffsetWidth<V>(
	tracked: Tracked<V> | GetFunction<V>,
	setter?: SetFunction<V>,
): (node: HTMLElement) => void;

export function bindIndeterminate<V>(
	tracked: Tracked<V> | GetFunction<V>,
	setter?: SetFunction<V>,
): (node: HTMLInputElement) => void;

export function bindFiles<V>(
	tracked: Tracked<V> | GetFunction<V>,
	setter?: SetFunction<V>,
): (node: HTMLInputElement) => void;
`;

const jsxTypes = `
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

export const rippleTypeDefinitions = rippleTypes + jsxTypes;
