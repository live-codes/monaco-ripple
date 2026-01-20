var y=window.monaco,P={comments:{lineComment:"//",blockComment:["/*","*/"]},brackets:[["{","}"],["[","]"],["(",")"]],autoClosingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'},{open:"'",close:"'"},{open:"`",close:"`"},{open:"<",close:">"}],surroundingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'},{open:"'",close:"'"},{open:"`",close:"`"},{open:"<",close:">"}],folding:{markers:{start:/^\s*\/\/\s*#?region\b/,end:/^\s*\/\/\s*#?endregion\b/}}},L={defaultToken:"",tokenPostfix:".ripple",keywords:["break","case","catch","const","continue","debugger","default","delete","do","else","export","extends","finally","for","from","function","if","import","in","instanceof","let","new","of","return","switch","this","throw","try","typeof","var","void","while","with","yield","async","await","class","enum","implements","interface","package","private","protected","public","static","component","index","key"],rippleBuiltins:["track","untrack","effect","mount","flushSync","tick","on","trackSplit","Context","Portal","TrackedArray","TrackedObject","TrackedSet","TrackedMap","TrackedDate","html","ref"],typeKeywords:["any","boolean","number","object","string","undefined","never","unknown","void","null","Component","Tracked","PropsWithChildren"],constants:["true","false","null","undefined","NaN","Infinity"],escapes:/\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,digits:/\d+(_+\d+)*/,tokenizer:{root:[{include:"@whitespaceAndComments"},{include:"@jsx"},{include:"@expressions"}],whitespaceAndComments:[[/[ \t\r\n]+/,""],[/\/\*/,"comment","@comment"],[/\/\/.*$/,"comment"]],expressions:[[/=>/,"keyword"],[/@[a-zA-Z_$][\w$]*/,"variable"],[/@(?=\()/,"variable"],[/#\[/,"keyword"],[/#\{/,"keyword"],[/\b(component)\b/,"keyword"],[/[a-z_$][\w$]*/,{cases:{"@keywords":"keyword","@rippleBuiltins":"type","@constants":"keyword","@default":"identifier"}}],[/[A-Z][\w$]*/,{cases:{"@typeKeywords":"type","@default":"type.identifier"}}],[/[{}()\[\]]/,"@brackets"],[/<=|>=|===|!==|==|!=|&&|\|\||\?\?/,"operator"],[/\+\+|--|\*\*/,"operator"],[/<<|>>>|>>/,"operator"],[/[<>]/,"operator"],[/[+\-*\/%&|^~!?:=]/,"operator"],[/(@digits)[eE]([\-+]?(@digits))?/,"number.float"],[/(@digits)\.(@digits)([eE][\-+]?(@digits))?/,"number.float"],[/0[xX][0-9a-fA-F]+/,"number.hex"],[/0[oO][0-7]+/,"number.octal"],[/0[bB][01]+/,"number.binary"],[/@digits/,"number"],[/[;,.]/,"delimiter"],[/"([^"\\]|\\.)*$/,"string.invalid"],[/'([^'\\]|\\.)*$/,"string.invalid"],[/"/,"string","@string_double"],[/'/,"string","@string_single"],[/`/,"string","@string_backtick"]],jsx:[[/<style>/,{token:"tag",next:"@styleBlock",nextEmbedded:"text/css"}],[/<tsx:react>/,"tag"],[/<\/tsx:react>/,"tag"],[/<children\s*\/>/,"tag"],[/(<\/)(@[a-zA-Z_$][\w$]*)(>)/,["delimiter","variable","delimiter"]],[/(<)(@[a-zA-Z_$][\w$]*)/,["delimiter","variable"],"@jsxStartTag"],[/(<\/)([a-zA-Z_$][\w$.-]*)(>)/,["delimiter","tag","delimiter"]],[/(<)([a-zA-Z_$][\w$.-]*)(\s*\/>)/,["delimiter","tag","delimiter"]],[/(<)([a-zA-Z_$][\w$.-]*)/,["delimiter","tag"],"@jsxStartTag"]],jsxStartTag:[[/\s+/,""],[/(\{)(ref)\b/,["delimiter.bracket","keyword"],"@jsxAttributeExpression"],[/(\{)(html)\b/,["delimiter.bracket","keyword"],"@jsxAttributeExpression"],[/\{\.\.\./,"delimiter.bracket","@jsxAttributeExpression"],[/\{/,"delimiter.bracket","@jsxAttributeExpression"],[/([a-zA-Z_$][\w$-]*)(\s*)(=)(\s*)(\{)/,["attribute.name","","delimiter","","delimiter.bracket"],"@jsxAttributeExpression"],[/([a-zA-Z_$][\w$-]*)(\s*)(=)(\s*)(")/,["attribute.name","","delimiter","","string"],"@jsxAttrStringDouble"],[/([a-zA-Z_$][\w$-]*)(\s*)(=)(\s*)(')/,["attribute.name","","delimiter","","string"],"@jsxAttrStringSingle"],[/[a-zA-Z_$][\w$-]*/,"attribute.name"],[/\/>/,"delimiter","@pop"],[/>/,"delimiter","@pop"]],jsxAttrStringDouble:[[/[^"]+/,"string"],[/"/,"string","@pop"]],jsxAttrStringSingle:[[/[^']+/,"string"],[/'/,"string","@pop"]],jsxAttributeExpression:[[/\{/,"delimiter.bracket","@jsxAttributeExpressionNested"],[/\}/,"delimiter.bracket","@pop"],{include:"@whitespaceAndComments"},{include:"@jsxExpressionContent"}],jsxAttributeExpressionNested:[[/\{/,"delimiter.bracket","@jsxAttributeExpressionNested"],[/\}/,"delimiter.bracket","@pop"],{include:"@whitespaceAndComments"},{include:"@jsxExpressionContent"}],jsxExpressionContent:[[/=>/,"keyword"],[/@[a-zA-Z_$][\w$]*/,"variable"],[/@(?=\()/,"variable"],[/[a-z_$][\w$]*/,{cases:{"@keywords":"keyword","@rippleBuiltins":"type","@constants":"keyword","@default":"identifier"}}],[/[A-Z][\w$]*/,{cases:{"@typeKeywords":"type","@default":"type.identifier"}}],[/[(\[\])]/,"@brackets"],[/<=|>=|===|!==|==|!=|&&|\|\||\?\?/,"operator"],[/\+\+|--|\*\*/,"operator"],[/<<|>>>|>>/,"operator"],[/[+\-*\/%&|^~!?:=<>]/,"operator"],[/\d+/,"number"],[/[;,.]/,"delimiter"],[/"[^"]*"/,"string"],[/'[^']*'/,"string"],[/`/,"string","@string_backtick_in_jsx"]],string_backtick_in_jsx:[[/\$\{/,"delimiter.bracket","@templateExpressionInJsx"],[/[^\\`$]+/,"string"],[/@escapes/,"string.escape"],[/\\./,"string.escape.invalid"],[/`/,"string","@pop"]],templateExpressionInJsx:[[/\{/,"delimiter.bracket","@templateExpressionInJsx"],[/\}/,"delimiter.bracket","@pop"],{include:"@whitespaceAndComments"},{include:"@jsxExpressionContent"}],styleBlock:[[/<\/style>/,{token:"tag",next:"@pop",nextEmbedded:"@pop"}],[/[^<]+/,""],[/</,""]],comment:[[/[^\/*]+/,"comment"],[/\*\//,"comment","@pop"],[/[\/*]/,"comment"]],string_double:[[/[^\\"]+/,"string"],[/@escapes/,"string.escape"],[/\\./,"string.escape.invalid"],[/"/,"string","@pop"]],string_single:[[/[^\\']+/,"string"],[/@escapes/,"string.escape"],[/\\./,"string.escape.invalid"],[/'/,"string","@pop"]],string_backtick:[[/\$\{/,"delimiter.bracket","@templateExpression"],[/[^\\`$]+/,"string"],[/@escapes/,"string.escape"],[/\\./,"string.escape.invalid"],[/`/,"string","@pop"]],templateExpression:[[/\{/,"delimiter.bracket","@templateExpression"],[/\}/,"delimiter.bracket","@pop"],{include:"@whitespaceAndComments"},{include:"@expressions"}]}},D={provideDefinition(C,e){let t=[],n=C.getWordAtPosition(e);if(!n)return null;let i=n.word,d=C.getLineContent(e.lineNumber)[n.startColumn-2]==="@",a=i,f=y.editor.getModels().filter(o=>o.getLanguageId()==="ripple");for(let o of f){let c=o.getValue().split(`
`);for(let s=0;s<c.length;s++){let r=c[s],p=r.match(new RegExp(`\\blet\\s+(${a})\\s*=\\s*track\\s*\\(`));if(p){let g=r.indexOf(p[1])+1;t.push({uri:o.uri,range:new y.Range(s+1,g,s+1,g+a.length)})}let h=r.match(new RegExp(`\\blet\\s+(${a})\\s*=\\s*#[\\[\\{]`));if(h){let g=r.indexOf(h[1])+1;t.push({uri:o.uri,range:new y.Range(s+1,g,s+1,g+a.length)})}let v=r.match(new RegExp(`\\b(const|let|var)\\s+(${a})\\s*=(?!\\s*track)`));if(v){let g=r.indexOf(v[2],r.indexOf(v[1]))+1;t.push({uri:o.uri,range:new y.Range(s+1,g,s+1,g+a.length)})}let k=r.match(new RegExp(`\\bcomponent\\s+(${a})\\s*\\(`));if(k){let g=r.indexOf(k[1])+1;t.push({uri:o.uri,range:new y.Range(s+1,g,s+1,g+a.length)})}let x=r.match(new RegExp(`\\bfunction\\s+(${a})\\s*\\(`));if(x){let g=r.indexOf(x[1])+1;t.push({uri:o.uri,range:new y.Range(s+1,g,s+1,g+a.length)})}let S=r.match(new RegExp(`\\bconst\\s+(${a})\\s*=\\s*\\(`));if(S){let g=r.indexOf(S[1])+1;t.push({uri:o.uri,range:new y.Range(s+1,g,s+1,g+a.length)})}let w=r.match(new RegExp(`\\b(interface|type)\\s+(${a})\\b`));if(w){let g=r.indexOf(w[2],r.indexOf(w[1]))+1;t.push({uri:o.uri,range:new y.Range(s+1,g,s+1,g+a.length)})}let O=r.match(new RegExp(`\\bclass\\s+(${a})\\b`));if(O){let g=r.indexOf(O[1])+1;t.push({uri:o.uri,range:new y.Range(s+1,g,s+1,g+a.length)})}let A=r.match(new RegExp(`\\bfor\\s*\\(\\s*const\\s+(${a})\\s+of\\b`));if(A){let g=r.indexOf(A[1])+1;t.push({uri:o.uri,range:new y.Range(s+1,g,s+1,g+a.length)})}let R=r.match(new RegExp(`\\bindex\\s+(${a})\\b`));if(R){let g=r.indexOf(R[1],r.indexOf("index"))+1;t.push({uri:o.uri,range:new y.Range(s+1,g,s+1,g+a.length)})}let I=r.match(new RegExp(`\\(.*\\b(${a})\\s*[,:)]`));if(I&&(r.includes("component")||r.includes("function")||r.includes("=>"))){let g=r.indexOf(I[1],r.indexOf("("))+1;t.push({uri:o.uri,range:new y.Range(s+1,g,s+1,g+a.length)})}}}let b=t.filter((o,m,c)=>m===c.findIndex(s=>s.uri.toString()===o.uri.toString()&&s.range.startLineNumber===o.range.startLineNumber&&s.range.startColumn===o.range.startColumn));return b.length>0?b:null}};var T=class{mappings=[];originalCode;generatedCode;constructor(e){this.originalCode=e,this.generatedCode=""}addMapping(e){this.mappings.push(e)}setGeneratedCode(e){this.generatedCode=e}originalToGenerated(e){for(let n of this.mappings)if(e>=n.original.offset&&e<n.original.offset+n.length){let i=e-n.original.offset;return n.generated.offset+i}let t=null;for(let n of this.mappings)n.original.offset<=e&&(!t||n.original.offset>t.original.offset)&&(t=n);if(t){let n=e-(t.original.offset+t.length);return t.generated.offset+t.length+n}return e}generatedToOriginal(e){for(let n of this.mappings)if(e>=n.generated.offset&&e<n.generated.offset+n.length){let i=e-n.generated.offset;return n.original.offset+i}let t=null;for(let n of this.mappings)n.generated.offset<=e&&(!t||n.generated.offset>t.generated.offset)&&(t=n);if(t){let n=e-(t.generated.offset+t.length);return t.original.offset+t.length+n}return e}generatedRangeToOriginal(e,t){return{start:this.generatedToOriginal(e),end:this.generatedToOriginal(t)}}};var M=class{sourceMap;output="";outputOffset=0;input="";inputOffset=0;errors=[];transform(e){return this.input=e,this.inputOffset=0,this.output="",this.outputOffset=0,this.sourceMap=new T(e),this.errors=[],this.transformTopLevel(),this.sourceMap.setGeneratedCode(this.output),{code:this.output,sourceMap:this.sourceMap,errors:this.errors}}transformTopLevel(){for(;this.inputOffset<this.input.length;)this.lookAhead("component ")?this.transformComponent():this.lookAhead("import ")||this.lookAhead("export ")?(this.copyUntil([`
`,";"]),this.copyChar()):this.lookAhead("<style>")||this.lookAhead("<style ")?this.transformStyleBlock():this.copyChar()}transformComponent(){let e=this.inputOffset;this.skip(9),this.emit("function",e,9,"component"),this.copyUntil(["{"]),this.transformBlock()}transformBlock(){if(this.currentChar()!=="{"){this.errors.push({message:"Expected opening brace",offset:this.inputOffset,length:1});return}this.copyChar();let e=1;for(;this.inputOffset<this.input.length&&e>0;){let t=this.currentChar();t==="{"?(e++,this.copyChar()):t==="}"?(e--,this.copyChar()):this.lookAhead("let @")||this.lookAhead("const @")||this.lookAhead("var @")?this.transformTrackedVariable():t==="@"&&this.isIdentifierStart(this.peekChar(1))?this.transformTrackedReference():this.lookAhead("#[")?this.transformTrackedArray():this.lookAhead("#{")?this.transformTrackedObject():this.lookAhead("#set(")?this.transformTrackedSet():this.lookAhead("#map(")?this.transformTrackedMap():t==='"'||t==="'"||t==="`"?this.copyString(t):t==="<"&&this.isJSXStart()?this.transformJSX():this.lookAhead("//")?this.copyUntil([`
`]):this.lookAhead("/*")?(this.copyUntil(["*/"]),this.copyChar(),this.copyChar()):this.copyChar()}}transformTrackedVariable(){let e=this.inputOffset,t=this.lookAhead("let ")?"let":this.lookAhead("const ")?"const":"var";this.copyChars(t.length+1);let n=this.inputOffset;this.skip(1);let i=this.inputOffset;for(;this.isIdentifierChar(this.currentChar());)this.inputOffset++;let u=this.input.slice(i,this.inputOffset);this.emit(u,n,u.length+1,"tracked-var"),this.skipWhitespace();let l="";if(this.currentChar()===":"){this.copyChar(),this.skipWhitespaceAndCopy();let d=this.outputOffset;for(;this.inputOffset<this.input.length&&this.currentChar()!=="="&&this.currentChar()!==";"&&this.currentChar()!==`
`;)this.copyChar();l=this.output.slice(d).trim()}if(this.skipWhitespaceAndCopy(),this.currentChar()==="="){this.copyChar(),this.skipWhitespaceAndCopy();let d=this.outputOffset;this.emit("__rippleTrack__(",this.inputOffset,0,"tracked-var"),this.copyExpression(),this.emit(")",this.inputOffset,0,"tracked-var")}}transformTrackedReference(){let e=this.inputOffset;this.skip(1);let t=this.inputOffset;for(;this.isIdentifierChar(this.currentChar());)this.inputOffset++;let n=this.input.slice(t,this.inputOffset),i=this.inputOffset;this.skipWhitespace();let u=this.lookAhead("=")&&!this.lookAhead("==")&&!this.lookAhead("=>"),l=this.lookAhead("++")||this.lookAhead("--"),d=this.lookAhead("+=")||this.lookAhead("-=")||this.lookAhead("*=")||this.lookAhead("/=");this.inputOffset=i,u||l||d?this.emit(n+".value",e,n.length+1,"tracked-var"):this.emit(n+".value",e,n.length+1,"tracked-var")}transformTrackedArray(){let e=this.inputOffset;this.skip(2),this.emit("new TrackedArray([",e,2,"tracked-literal");let t=1;for(;this.inputOffset<this.input.length&&t>0;)this.currentChar()==="["?(t++,this.copyChar()):this.currentChar()==="]"?(t--,t===0?(this.skip(1),this.emit("])",this.inputOffset-1,1,"tracked-literal")):this.copyChar()):this.currentChar()==="@"&&this.isIdentifierStart(this.peekChar(1))?this.transformTrackedReference():this.copyChar()}transformTrackedObject(){let e=this.inputOffset;this.skip(2),this.emit("new TrackedObject({",e,2,"tracked-literal");let t=1;for(;this.inputOffset<this.input.length&&t>0;)this.currentChar()==="{"?(t++,this.copyChar()):this.currentChar()==="}"?(t--,t===0?(this.skip(1),this.emit("})",this.inputOffset-1,1,"tracked-literal")):this.copyChar()):this.currentChar()==="@"&&this.isIdentifierStart(this.peekChar(1))?this.transformTrackedReference():this.copyChar()}transformTrackedSet(){let e=this.inputOffset;this.skip(5),this.emit("new TrackedSet([",e,5,"tracked-literal");let t=1;for(;this.inputOffset<this.input.length&&t>0;)this.currentChar()==="("?(t++,this.copyChar()):this.currentChar()===")"?(t--,t===0?(this.skip(1),this.emit("])",this.inputOffset-1,1,"tracked-literal")):this.copyChar()):this.currentChar()==="@"&&this.isIdentifierStart(this.peekChar(1))?this.transformTrackedReference():this.copyChar()}transformTrackedMap(){let e=this.inputOffset;this.skip(5),this.emit("new TrackedMap([",e,5,"tracked-literal");let t=1;for(;this.inputOffset<this.input.length&&t>0;)this.currentChar()==="("?(t++,this.copyChar()):this.currentChar()===")"?(t--,t===0?(this.skip(1),this.emit("])",this.inputOffset-1,1,"tracked-literal")):this.copyChar()):this.currentChar()==="@"&&this.isIdentifierStart(this.peekChar(1))?this.transformTrackedReference():this.copyChar()}transformStyleBlock(){let e=this.inputOffset,t=this.input.indexOf(">",this.inputOffset)+1,n=this.input.indexOf("</style>",this.inputOffset);if(n===-1){this.errors.push({message:"Unclosed <style> tag",offset:e,length:7}),this.copyChar();return}let i=n+8-this.inputOffset;this.skip(i),this.emit("/* <style> block omitted for type checking */",e,i,"template")}transformJSX(){let e=0,t=!1,n=0;for(;this.inputOffset<this.input.length;){let i=this.currentChar();if(t)i==="{"?(n++,this.copyChar()):i==="}"?(n--,n===0&&(t=!1),this.copyChar()):i==="@"&&this.isIdentifierStart(this.peekChar(1))?this.transformTrackedReference():this.copyChar();else if(i==="{")t=!0,n=1,this.copyChar();else if(i==="<")if(this.lookAhead("</")){if(this.copyUntil([">"]),this.copyChar(),e--,e===0)break}else e++,this.copyChar();else if(i==="/"&&this.peekChar(1)===">"){if(this.copyChar(),this.copyChar(),e--,e===0)break}else i===">"?this.copyChar():this.copyChar()}}currentChar(){return this.input[this.inputOffset]||""}peekChar(e){return this.input[this.inputOffset+e]||""}lookAhead(e){return this.input.slice(this.inputOffset,this.inputOffset+e.length)===e}skip(e){this.inputOffset+=e}copyChar(){let e=this.currentChar();this.output+=e,this.sourceMap.addMapping({original:{line:this.getLine(this.inputOffset),column:this.getColumn(this.inputOffset),offset:this.inputOffset},generated:{line:this.getOutputLine(),column:this.getOutputColumn(),offset:this.outputOffset},length:1,type:"identity"}),this.inputOffset++,this.outputOffset++}copyChars(e){for(let t=0;t<e;t++)this.copyChar()}emit(e,t,n,i){this.sourceMap.addMapping({original:{line:this.getLine(t),column:this.getColumn(t),offset:t},generated:{line:this.getOutputLine(),column:this.getOutputColumn(),offset:this.outputOffset},length:Math.max(e.length,n),type:i}),this.output+=e,this.outputOffset+=e.length}copyUntil(e){for(;this.inputOffset<this.input.length;){for(let t of e)if(this.lookAhead(t))return;this.copyChar()}}copyExpression(){let e=0;for(;this.inputOffset<this.input.length;){let t=this.currentChar();if((t===";"||t===","||t===`
`)&&e===0)break;if(t==="("||t==="["||t==="{")e++;else if((t===")"||t==="]"||t==="}")&&(e--,e<0))break;t==="@"&&this.isIdentifierStart(this.peekChar(1))?this.transformTrackedReference():this.copyChar()}}copyString(e){if(this.copyChar(),e==="`")for(;this.inputOffset<this.input.length;)if(this.currentChar()==="`"){this.copyChar();break}else if(this.lookAhead("${")){this.copyChar(),this.copyChar();let t=1;for(;this.inputOffset<this.input.length&&t>0;)this.currentChar()==="{"?t++:this.currentChar()==="}"&&t--,t>0&&(this.currentChar()==="@"&&this.isIdentifierStart(this.peekChar(1))?this.transformTrackedReference():this.copyChar());this.currentChar()==="}"&&this.copyChar()}else this.currentChar()==="\\"?(this.copyChar(),this.copyChar()):this.copyChar();else for(;this.inputOffset<this.input.length;)if(this.currentChar()===e){this.copyChar();break}else this.currentChar()==="\\"?(this.copyChar(),this.copyChar()):this.copyChar()}skipWhitespace(){for(;this.inputOffset<this.input.length&&/\s/.test(this.currentChar());)this.inputOffset++}skipWhitespaceAndCopy(){for(;this.inputOffset<this.input.length&&/\s/.test(this.currentChar());)this.copyChar()}isIdentifierStart(e){return/[a-zA-Z_$]/.test(e)}isIdentifierChar(e){return/[a-zA-Z0-9_$]/.test(e)}isJSXStart(){let e=this.peekChar(1);return this.isIdentifierStart(e)||e===">"||e==="/"}getLine(e){let t=1;for(let n=0;n<e&&n<this.input.length;n++)this.input[n]===`
`&&t++;return t}getColumn(e){let t=1;for(let n=e-1;n>=0&&this.input[n]!==`
`;n--)t++;return t}getOutputLine(){let e=1;for(let t=0;t<this.outputOffset&&t<this.output.length;t++)this.output[t]===`
`&&e++;return e}getOutputColumn(){let e=1;for(let t=this.outputOffset-1;t>=0&&this.output[t]!==`
`;t--)e++;return e}};var N=`
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
`;var E=class{monaco;transformer;shadowFiles=new Map;typesLib=null;constructor(e){this.monaco=e,this.transformer=new M,this.initialize()}initialize(){this.configureTypeScript(),this.addRippleTypes(),this.monaco.editor.onDidCreateModel(e=>{e.getLanguageId()==="ripple"&&this.registerModel(e)}),this.monaco.editor.onWillDisposeModel(e=>{e.getLanguageId()==="ripple"&&this.unregisterModel(e)}),this.registerProviders()}configureTypeScript(){}addRippleTypes(){this.typesLib=this.monaco.languages.typescript.typescriptDefaults.addExtraLib(N,"file:///node_modules/@types/ripple/index.d.ts")}registerModel(e){let t=e.uri.toString(),n=this.getShadowUri(t),i=this.transformer.transform(e.getValue()),u=this.monaco.languages.typescript.javascriptDefaults.addExtraLib(i.code,n),l=this.monaco.languages.typescript.typescriptDefaults.addExtraLib(i.code,n),d=e.onDidChangeContent(()=>{this.updateModel(e)});this.shadowFiles.set(t,{uri:n,model:e,transformResult:i,disposables:[u,l,d]})}updateModel(e){let t=e.uri.toString(),n=this.shadowFiles.get(t);if(!n)return;let i=this.transformer.transform(e.getValue());n.transformResult=i,n.disposables.slice(0,2).forEach(d=>d.dispose());let u=this.monaco.languages.typescript.javascriptDefaults.addExtraLib(i.code,n.uri),l=this.monaco.languages.typescript.typescriptDefaults.addExtraLib(i.code,n.uri);n.disposables[0]=u,n.disposables[1]=l}unregisterModel(e){let t=e.uri.toString(),n=this.shadowFiles.get(t);n&&(n.disposables.forEach(i=>i.dispose()),this.shadowFiles.delete(t))}getShadowUri(e){return e.replace(/\.ripple$/,".tsx").replace(/\.rpl$/,".tsx")}registerProviders(){this.monaco.languages.registerCompletionItemProvider("ripple",{triggerCharacters:[".","@","#","<",'"',"'","/","{",":"," "],provideCompletionItems:async(e,t,n,i)=>this.provideCompletions(e,t,n,i)}),this.monaco.languages.registerHoverProvider("ripple",{provideHover:async(e,t,n)=>this.provideHover(e,t,n)}),this.monaco.languages.registerDefinitionProvider("ripple",{provideDefinition:async(e,t,n)=>this.provideDefinition(e,t,n)}),this.monaco.languages.registerSignatureHelpProvider("ripple",{signatureHelpTriggerCharacters:["(",","],signatureHelpRetriggerCharacters:[","],provideSignatureHelp:async(e,t,n,i)=>this.provideSignatureHelp(e,t,n,i)}),this.monaco.languages.registerDocumentHighlightProvider("ripple",{provideDocumentHighlights:async(e,t,n)=>this.provideDocumentHighlights(e,t,n)}),this.monaco.languages.registerReferenceProvider("ripple",{provideReferences:async(e,t,n,i)=>this.provideReferences(e,t,n,i)}),this.monaco.languages.registerRenameProvider("ripple",{provideRenameEdits:async(e,t,n,i)=>this.provideRenameEdits(e,t,n,i),resolveRenameLocation:async(e,t,n)=>this.resolveRenameLocation(e,t,n)})}async getTypeScriptWorker(e){return(await this.monaco.languages.typescript.getTypeScriptWorker())(e)}async provideCompletions(e,t,n,i){let u=e.uri.toString(),l=this.shadowFiles.get(u);if(!l)return null;let d=e.getOffsetAt(t),a=l.transformResult.sourceMap.originalToGenerated(d);try{let f=this.monaco.Uri.parse(l.uri),o=await(await this.getTypeScriptWorker(f)).getCompletionsAtPosition(l.uri,a,{});if(!o||!o.entries)return null;let m=e.getWordUntilPosition(t),c={startLineNumber:t.lineNumber,endLineNumber:t.lineNumber,startColumn:m.startColumn,endColumn:m.endColumn};return{suggestions:[...this.getRippleSpecificCompletions(e,t),...o.entries.map(p=>this.convertCompletion(p,c))]}}catch(f){return console.error("Completion error:",f),null}}getRippleSpecificCompletions(e,t){let n=e.getLineContent(t.lineNumber),i=n[t.column-2],u=e.getWordUntilPosition(t),l={startLineNumber:t.lineNumber,endLineNumber:t.lineNumber,startColumn:u.startColumn,endColumn:u.endColumn},d=[];return i==="#"&&d.push({label:"[",kind:this.monaco.languages.CompletionItemKind.Snippet,insertText:"[$0]",insertTextRules:this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,detail:"Tracked Array",documentation:"Create a new tracked array: #[item1, item2]",range:l},{label:"{",kind:this.monaco.languages.CompletionItemKind.Snippet,insertText:"{$0}",insertTextRules:this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,detail:"Tracked Object",documentation:"Create a new tracked object: #{key: value}",range:l},{label:"set(",kind:this.monaco.languages.CompletionItemKind.Snippet,insertText:"set($0)",insertTextRules:this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,detail:"Tracked Set",documentation:"Create a new tracked set: #set(item1, item2)",range:l},{label:"map(",kind:this.monaco.languages.CompletionItemKind.Snippet,insertText:"map($0)",insertTextRules:this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,detail:"Tracked Map",documentation:"Create a new tracked map: #map([key, value], ...)",range:l}),n.trimStart().startsWith("comp")&&d.push({label:"component",kind:this.monaco.languages.CompletionItemKind.Keyword,insertText:"component ${1:Name}(${2:props}) {\n	$0\n}",insertTextRules:this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,detail:"Define a Ripple component",documentation:"Creates a new Ripple component with props",range:l}),d}convertCompletion(e,t){let n={function:this.monaco.languages.CompletionItemKind.Function,method:this.monaco.languages.CompletionItemKind.Method,property:this.monaco.languages.CompletionItemKind.Property,variable:this.monaco.languages.CompletionItemKind.Variable,class:this.monaco.languages.CompletionItemKind.Class,interface:this.monaco.languages.CompletionItemKind.Interface,module:this.monaco.languages.CompletionItemKind.Module,keyword:this.monaco.languages.CompletionItemKind.Keyword,const:this.monaco.languages.CompletionItemKind.Constant,let:this.monaco.languages.CompletionItemKind.Variable,type:this.monaco.languages.CompletionItemKind.TypeParameter,enum:this.monaco.languages.CompletionItemKind.Enum,"enum member":this.monaco.languages.CompletionItemKind.EnumMember};return{label:e.name,kind:n[e.kind]||this.monaco.languages.CompletionItemKind.Text,insertText:e.insertText||e.name,detail:e.kindModifiers,sortText:e.sortText,range:t}}async provideHover(e,t,n){let i=e.uri.toString(),u=this.shadowFiles.get(i);if(!u)return null;let l=e.getOffsetAt(t),d=u.transformResult.sourceMap.originalToGenerated(l);try{let a=this.monaco.Uri.parse(u.uri),b=await(await this.getTypeScriptWorker(a)).getQuickInfoAtPosition(u.uri,d);if(!b)return null;let o=b.displayParts||[],m=b.documentation||[],c=o.map(h=>h.text).join("");c=this.cleanupTypeSignature(c);let s=[];c&&s.push({value:"```typescript\n"+c+"\n```"}),m.length>0&&s.push({value:m.map(h=>h.text).join(`
`)});let r=e.getWordAtPosition(t),p=r?{startLineNumber:t.lineNumber,endLineNumber:t.lineNumber,startColumn:r.startColumn,endColumn:r.endColumn}:void 0;return{contents:s,range:p}}catch(a){return console.error("Hover error:",a),null}}cleanupTypeSignature(e){return e=e.replace(/__rippleTrack__<([^>]+)>/g,"Tracked<$1>"),e=e.replace(/TrackedValue<([^>]+)>/g,"Tracked<$1>"),e}async provideDefinition(e,t,n){let i=e.uri.toString(),u=this.shadowFiles.get(i);if(!u)return null;let l=e.getOffsetAt(t),d=u.transformResult.sourceMap.originalToGenerated(l);try{let a=this.monaco.Uri.parse(u.uri),b=await(await this.getTypeScriptWorker(a)).getDefinitionAtPosition(u.uri,d);return!b||b.length===0?null:b.map(o=>{let m=o.fileName.replace(".tsx",".ripple"),c=this.findShadowFileByUri(o.fileName),s=o.textSpan.start,r=o.textSpan.start+o.textSpan.length;c&&(s=c.transformResult.sourceMap.generatedToOriginal(s),r=c.transformResult.sourceMap.generatedToOriginal(r));let p=this.monaco.editor.getModel(this.monaco.Uri.parse(m));if(!p)return{uri:this.monaco.Uri.parse(m),range:{startLineNumber:1,startColumn:1,endLineNumber:1,endColumn:1}};let h=p.getPositionAt(s),v=p.getPositionAt(r);return{uri:this.monaco.Uri.parse(m),range:{startLineNumber:h.lineNumber,startColumn:h.column,endLineNumber:v.lineNumber,endColumn:v.column}}})}catch(a){return console.error("Definition error:",a),null}}findShadowFileByUri(e){for(let[,t]of this.shadowFiles)if(t.uri===e)return t}async provideSignatureHelp(e,t,n,i){let u=e.uri.toString(),l=this.shadowFiles.get(u);if(!l)return null;let d=e.getOffsetAt(t),a=l.transformResult.sourceMap.originalToGenerated(d);try{let f=this.monaco.Uri.parse(l.uri),o=await(await this.getTypeScriptWorker(f)).getSignatureHelpItems(l.uri,a,{});return!o||!o.items||o.items.length===0?null:{value:{signatures:o.items.map(m=>{let c=m.prefixDisplayParts.map(p=>p.text).join(""),s=m.suffixDisplayParts.map(p=>p.text).join(""),r=m.parameters.map(p=>p.displayParts.map(h=>h.text).join(""));return{label:c+r.join(", ")+s,parameters:m.parameters.map(p=>({label:p.displayParts.map(h=>h.text).join(""),documentation:p.documentation?.map(h=>h.text).join(`
`)})),documentation:m.documentation?.map(p=>p.text).join(`
`)}}),activeSignature:o.selectedItemIndex,activeParameter:o.argumentIndex},dispose:()=>{}}}catch(f){return console.error("Signature help error:",f),null}}async provideDocumentHighlights(e,t,n){let i=e.uri.toString(),u=this.shadowFiles.get(i);if(!u)return null;let l=e.getOffsetAt(t),d=u.transformResult.sourceMap.originalToGenerated(l);try{let a=this.monaco.Uri.parse(u.uri),b=await(await this.getTypeScriptWorker(a)).getDocumentHighlights(u.uri,d,[u.uri]);if(!b||b.length===0)return null;let o=[];for(let m of b)for(let c of m.highlightSpans){let s=u.transformResult.sourceMap.generatedToOriginal(c.textSpan.start),r=u.transformResult.sourceMap.generatedToOriginal(c.textSpan.start+c.textSpan.length),p=e.getPositionAt(s),h=e.getPositionAt(r);o.push({range:{startLineNumber:p.lineNumber,startColumn:p.column,endLineNumber:h.lineNumber,endColumn:h.column},kind:c.kind==="writtenReference"?this.monaco.languages.DocumentHighlightKind.Write:this.monaco.languages.DocumentHighlightKind.Read})}return o}catch(a){return console.error("Document highlights error:",a),null}}async provideReferences(e,t,n,i){let u=e.uri.toString(),l=this.shadowFiles.get(u);if(!l)return null;let d=e.getOffsetAt(t),a=l.transformResult.sourceMap.originalToGenerated(d);try{let f=this.monaco.Uri.parse(l.uri),o=await(await this.getTypeScriptWorker(f)).getReferencesAtPosition(l.uri,a);return!o||o.length===0?null:o.map(m=>{let c=m.fileName.replace(".tsx",".ripple"),s=this.findShadowFileByUri(m.fileName),r=m.textSpan.start,p=m.textSpan.start+m.textSpan.length;s&&(r=s.transformResult.sourceMap.generatedToOriginal(r),p=s.transformResult.sourceMap.generatedToOriginal(p));let h=this.monaco.editor.getModel(this.monaco.Uri.parse(c));if(!h)return{uri:this.monaco.Uri.parse(c),range:{startLineNumber:1,startColumn:1,endLineNumber:1,endColumn:1}};let v=h.getPositionAt(r),k=h.getPositionAt(p);return{uri:this.monaco.Uri.parse(c),range:{startLineNumber:v.lineNumber,startColumn:v.column,endLineNumber:k.lineNumber,endColumn:k.column}}})}catch(f){return console.error("References error:",f),null}}async provideRenameEdits(e,t,n,i){let u=e.uri.toString(),l=this.shadowFiles.get(u);if(!l)return null;let d=e.getOffsetAt(t),a=l.transformResult.sourceMap.originalToGenerated(d);try{let f=this.monaco.Uri.parse(l.uri),o=await(await this.getTypeScriptWorker(f)).findRenameLocations(l.uri,a,!1,!1);if(!o||o.length===0)return null;let m=[];for(let c of o){let s=c.fileName.replace(".tsx",".ripple"),r=this.findShadowFileByUri(c.fileName),p=c.textSpan.start,h=c.textSpan.start+c.textSpan.length;r&&(p=r.transformResult.sourceMap.generatedToOriginal(p),h=r.transformResult.sourceMap.generatedToOriginal(h));let v=this.monaco.editor.getModel(this.monaco.Uri.parse(s));if(!v)continue;let k=v.getPositionAt(p),x=v.getPositionAt(h);m.push({resource:this.monaco.Uri.parse(s),textEdit:{range:{startLineNumber:k.lineNumber,startColumn:k.column,endLineNumber:x.lineNumber,endColumn:x.column},text:n},versionId:void 0})}return{edits:m}}catch(f){return console.error("Rename error:",f),null}}async resolveRenameLocation(e,t,n){let i=e.getWordAtPosition(t);return i?{text:i.word,range:{startLineNumber:t.lineNumber,startColumn:i.startColumn,endLineNumber:t.lineNumber,endColumn:i.endColumn}}:null}dispose(){this.typesLib?.dispose();for(let[,e]of this.shadowFiles)e.disposables.forEach(t=>t.dispose());this.shadowFiles.clear()}};function $(C=window.monaco){return new E(C)}var Z={config:P,tokens:L,definitions:D,init:$};export{Z as default};
