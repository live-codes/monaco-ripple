var k=window.monaco,I={comments:{lineComment:"//",blockComment:["/*","*/"]},brackets:[["{","}"],["[","]"],["(",")"]],autoClosingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'},{open:"'",close:"'"},{open:"`",close:"`"},{open:"<",close:">"}],surroundingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'},{open:"'",close:"'"},{open:"`",close:"`"},{open:"<",close:">"}],folding:{markers:{start:/^\s*\/\/\s*#?region\b/,end:/^\s*\/\/\s*#?endregion\b/}}},L={defaultToken:"",tokenPostfix:".ripple",keywords:["break","case","catch","const","continue","debugger","default","delete","do","else","export","extends","finally","for","from","function","if","import","in","instanceof","let","new","of","return","switch","this","throw","try","typeof","var","void","while","with","yield","async","await","class","enum","implements","interface","package","private","protected","public","static","component","index","key"],rippleBuiltins:["track","untrack","effect","mount","flushSync","tick","on","trackSplit","Context","Portal","TrackedArray","TrackedObject","TrackedSet","TrackedMap","TrackedDate","html","ref"],typeKeywords:["any","boolean","number","object","string","undefined","never","unknown","void","null","Component","Tracked","PropsWithChildren"],constants:["true","false","null","undefined","NaN","Infinity"],escapes:/\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,digits:/\d+(_+\d+)*/,tokenizer:{root:[{include:"@whitespaceAndComments"},{include:"@jsx"},{include:"@expressions"}],whitespaceAndComments:[[/[ \t\r\n]+/,""],[/\/\*/,"comment","@comment"],[/\/\/.*$/,"comment"]],expressions:[[/=>/,"keyword"],[/@[a-zA-Z_$][\w$]*/,"variable"],[/@(?=\()/,"variable"],[/#\[/,"keyword"],[/#\{/,"keyword"],[/\b(component)\b/,"keyword"],[/[a-z_$][\w$]*/,{cases:{"@keywords":"keyword","@rippleBuiltins":"type","@constants":"keyword","@default":"identifier"}}],[/[A-Z][\w$]*/,{cases:{"@typeKeywords":"type","@default":"type.identifier"}}],[/[{}()\[\]]/,"@brackets"],[/<=|>=|===|!==|==|!=|&&|\|\||\?\?/,"operator"],[/\+\+|--|\*\*/,"operator"],[/<<|>>>|>>/,"operator"],[/[<>]/,"operator"],[/[+\-*\/%&|^~!?:=]/,"operator"],[/(@digits)[eE]([\-+]?(@digits))?/,"number.float"],[/(@digits)\.(@digits)([eE][\-+]?(@digits))?/,"number.float"],[/0[xX][0-9a-fA-F]+/,"number.hex"],[/0[oO][0-7]+/,"number.octal"],[/0[bB][01]+/,"number.binary"],[/@digits/,"number"],[/[;,.]/,"delimiter"],[/"([^"\\]|\\.)*$/,"string.invalid"],[/'([^'\\]|\\.)*$/,"string.invalid"],[/"/,"string","@string_double"],[/'/,"string","@string_single"],[/`/,"string","@string_backtick"]],jsx:[[/<style>/,{token:"tag",next:"@styleBlock",nextEmbedded:"text/css"}],[/<tsx:react>/,"tag"],[/<\/tsx:react>/,"tag"],[/<children\s*\/>/,"tag"],[/(<\/)(@[a-zA-Z_$][\w$]*)(>)/,["delimiter","variable","delimiter"]],[/(<)(@[a-zA-Z_$][\w$]*)/,["delimiter","variable"],"@jsxStartTag"],[/(<\/)([a-zA-Z_$][\w$.-]*)(>)/,["delimiter","tag","delimiter"]],[/(<)([a-zA-Z_$][\w$.-]*)(\s*\/>)/,["delimiter","tag","delimiter"]],[/(<)([a-zA-Z_$][\w$.-]*)/,["delimiter","tag"],"@jsxStartTag"]],jsxStartTag:[[/\s+/,""],[/(\{)(ref)\b/,["delimiter.bracket","keyword"],"@jsxAttributeExpression"],[/(\{)(html)\b/,["delimiter.bracket","keyword"],"@jsxAttributeExpression"],[/\{\.\.\./,"delimiter.bracket","@jsxAttributeExpression"],[/\{/,"delimiter.bracket","@jsxAttributeExpression"],[/([a-zA-Z_$][\w$-]*)(\s*)(=)(\s*)(\{)/,["attribute.name","","delimiter","","delimiter.bracket"],"@jsxAttributeExpression"],[/([a-zA-Z_$][\w$-]*)(\s*)(=)(\s*)(")/,["attribute.name","","delimiter","","string"],"@jsxAttrStringDouble"],[/([a-zA-Z_$][\w$-]*)(\s*)(=)(\s*)(')/,["attribute.name","","delimiter","","string"],"@jsxAttrStringSingle"],[/[a-zA-Z_$][\w$-]*/,"attribute.name"],[/\/>/,"delimiter","@pop"],[/>/,"delimiter","@pop"]],jsxAttrStringDouble:[[/[^"]+/,"string"],[/"/,"string","@pop"]],jsxAttrStringSingle:[[/[^']+/,"string"],[/'/,"string","@pop"]],jsxAttributeExpression:[[/\{/,"delimiter.bracket","@jsxAttributeExpressionNested"],[/\}/,"delimiter.bracket","@pop"],{include:"@whitespaceAndComments"},{include:"@jsxExpressionContent"}],jsxAttributeExpressionNested:[[/\{/,"delimiter.bracket","@jsxAttributeExpressionNested"],[/\}/,"delimiter.bracket","@pop"],{include:"@whitespaceAndComments"},{include:"@jsxExpressionContent"}],jsxExpressionContent:[[/=>/,"keyword"],[/@[a-zA-Z_$][\w$]*/,"variable"],[/@(?=\()/,"variable"],[/[a-z_$][\w$]*/,{cases:{"@keywords":"keyword","@rippleBuiltins":"type","@constants":"keyword","@default":"identifier"}}],[/[A-Z][\w$]*/,{cases:{"@typeKeywords":"type","@default":"type.identifier"}}],[/[(\[\])]/,"@brackets"],[/<=|>=|===|!==|==|!=|&&|\|\||\?\?/,"operator"],[/\+\+|--|\*\*/,"operator"],[/<<|>>>|>>/,"operator"],[/[+\-*\/%&|^~!?:=<>]/,"operator"],[/\d+/,"number"],[/[;,.]/,"delimiter"],[/"[^"]*"/,"string"],[/'[^']*'/,"string"],[/`/,"string","@string_backtick_in_jsx"]],string_backtick_in_jsx:[[/\$\{/,"delimiter.bracket","@templateExpressionInJsx"],[/[^\\`$]+/,"string"],[/@escapes/,"string.escape"],[/\\./,"string.escape.invalid"],[/`/,"string","@pop"]],templateExpressionInJsx:[[/\{/,"delimiter.bracket","@templateExpressionInJsx"],[/\}/,"delimiter.bracket","@pop"],{include:"@whitespaceAndComments"},{include:"@jsxExpressionContent"}],styleBlock:[[/<\/style>/,{token:"tag",next:"@pop",nextEmbedded:"@pop"}],[/[^<]+/,""],[/</,""]],comment:[[/[^\/*]+/,"comment"],[/\*\//,"comment","@pop"],[/[\/*]/,"comment"]],string_double:[[/[^\\"]+/,"string"],[/@escapes/,"string.escape"],[/\\./,"string.escape.invalid"],[/"/,"string","@pop"]],string_single:[[/[^\\']+/,"string"],[/@escapes/,"string.escape"],[/\\./,"string.escape.invalid"],[/'/,"string","@pop"]],string_backtick:[[/\$\{/,"delimiter.bracket","@templateExpression"],[/[^\\`$]+/,"string"],[/@escapes/,"string.escape"],[/\\./,"string.escape.invalid"],[/`/,"string","@pop"]],templateExpression:[[/\{/,"delimiter.bracket","@templateExpression"],[/\}/,"delimiter.bracket","@pop"],{include:"@whitespaceAndComments"},{include:"@expressions"}]}},P={provideDefinition(T,e){let t=[],n=T.getWordAtPosition(e);if(!n)return null;let i=n.word,m=T.getLineContent(e.lineNumber)[n.startColumn-2]==="@",a=i,f=k.editor.getModels().filter(s=>s.getLanguageId()==="ripple");for(let s of f){let u=s.getValue().split(`
`);for(let o=0;o<u.length;o++){let r=u[o],p=r.match(new RegExp(`\\blet\\s+(${a})\\s*=\\s*track\\s*\\(`));if(p){let d=r.indexOf(p[1])+1;t.push({uri:s.uri,range:new k.Range(o+1,d,o+1,d+a.length)})}let h=r.match(new RegExp(`\\blet\\s+(${a})\\s*=\\s*#[\\[\\{]`));if(h){let d=r.indexOf(h[1])+1;t.push({uri:s.uri,range:new k.Range(o+1,d,o+1,d+a.length)})}let v=r.match(new RegExp(`\\b(const|let|var)\\s+(${a})\\s*=(?!\\s*track)`));if(v){let d=r.indexOf(v[2],r.indexOf(v[1]))+1;t.push({uri:s.uri,range:new k.Range(o+1,d,o+1,d+a.length)})}let y=r.match(new RegExp(`\\bcomponent\\s+(${a})\\s*\\(`));if(y){let d=r.indexOf(y[1])+1;t.push({uri:s.uri,range:new k.Range(o+1,d,o+1,d+a.length)})}let x=r.match(new RegExp(`\\bfunction\\s+(${a})\\s*\\(`));if(x){let d=r.indexOf(x[1])+1;t.push({uri:s.uri,range:new k.Range(o+1,d,o+1,d+a.length)})}let w=r.match(new RegExp(`\\bconst\\s+(${a})\\s*=\\s*\\(`));if(w){let d=r.indexOf(w[1])+1;t.push({uri:s.uri,range:new k.Range(o+1,d,o+1,d+a.length)})}let S=r.match(new RegExp(`\\b(interface|type)\\s+(${a})\\b`));if(S){let d=r.indexOf(S[2],r.indexOf(S[1]))+1;t.push({uri:s.uri,range:new k.Range(o+1,d,o+1,d+a.length)})}let O=r.match(new RegExp(`\\bclass\\s+(${a})\\b`));if(O){let d=r.indexOf(O[1])+1;t.push({uri:s.uri,range:new k.Range(o+1,d,o+1,d+a.length)})}let A=r.match(new RegExp(`\\bfor\\s*\\(\\s*const\\s+(${a})\\s+of\\b`));if(A){let d=r.indexOf(A[1])+1;t.push({uri:s.uri,range:new k.Range(o+1,d,o+1,d+a.length)})}let R=r.match(new RegExp(`\\bindex\\s+(${a})\\b`));if(R){let d=r.indexOf(R[1],r.indexOf("index"))+1;t.push({uri:s.uri,range:new k.Range(o+1,d,o+1,d+a.length)})}let V=r.match(new RegExp(`\\(.*\\b(${a})\\s*[,:)]`));if(V&&(r.includes("component")||r.includes("function")||r.includes("=>"))){let d=r.indexOf(V[1],r.indexOf("("))+1;t.push({uri:s.uri,range:new k.Range(o+1,d,o+1,d+a.length)})}}}let b=t.filter((s,g,u)=>g===u.findIndex(o=>o.uri.toString()===s.uri.toString()&&o.range.startLineNumber===s.range.startLineNumber&&o.range.startColumn===s.range.startColumn));return b.length>0?b:null}};var C=class{mappings=[];originalCode;generatedCode;constructor(e){this.originalCode=e,this.generatedCode=""}addMapping(e){this.mappings.push(e)}setGeneratedCode(e){this.generatedCode=e}originalToGenerated(e){for(let n of this.mappings)if(e>=n.original.offset&&e<n.original.offset+n.length){let i=e-n.original.offset;return n.generated.offset+i}let t=null;for(let n of this.mappings)n.original.offset<=e&&(!t||n.original.offset>t.original.offset)&&(t=n);if(t){let n=e-(t.original.offset+t.length);return t.generated.offset+t.length+n}return e}generatedToOriginal(e){for(let n of this.mappings)if(e>=n.generated.offset&&e<n.generated.offset+n.length){let i=e-n.generated.offset;return n.original.offset+i}let t=null;for(let n of this.mappings)n.generated.offset<=e&&(!t||n.generated.offset>t.generated.offset)&&(t=n);if(t){let n=e-(t.generated.offset+t.length);return t.original.offset+t.length+n}return e}generatedRangeToOriginal(e,t){return{start:this.generatedToOriginal(e),end:this.generatedToOriginal(t)}}};var M=class{sourceMap;output="";outputOffset=0;input="";inputOffset=0;errors=[];transform(e){return this.input=e,this.inputOffset=0,this.output="",this.outputOffset=0,this.sourceMap=new C(e),this.errors=[],this.transformTopLevel(),this.sourceMap.setGeneratedCode(this.output),{code:this.output,sourceMap:this.sourceMap,errors:this.errors}}transformTopLevel(){for(;this.inputOffset<this.input.length;)this.lookAhead("component ")?this.transformComponent():this.lookAhead("import ")||this.lookAhead("export ")?(this.copyUntil([`
`,";"]),this.copyChar()):this.lookAhead("<style>")||this.lookAhead("<style ")?this.transformStyleBlock():this.copyChar()}transformComponent(){let e=this.inputOffset;this.skip(9),this.emit("function",e,9,"component"),this.copyUntil(["{"]),this.transformBlock()}transformBlock(){if(this.currentChar()!=="{"){this.errors.push({message:"Expected opening brace",offset:this.inputOffset,length:1});return}this.copyChar();let e=1;for(;this.inputOffset<this.input.length&&e>0;){let t=this.currentChar();t==="{"?(e++,this.copyChar()):t==="}"?(e--,this.copyChar()):this.lookAhead("let @")||this.lookAhead("const @")||this.lookAhead("var @")?this.transformTrackedVariable():t==="@"&&this.isIdentifierStart(this.peekChar(1))?this.transformTrackedReference():this.lookAhead("#[")?this.transformTrackedArray():this.lookAhead("#{")?this.transformTrackedObject():this.lookAhead("#set(")?this.transformTrackedSet():this.lookAhead("#map(")?this.transformTrackedMap():t==='"'||t==="'"||t==="`"?this.copyString(t):t==="<"&&this.isJSXStart()?this.transformJSX():this.lookAhead("//")?this.copyUntil([`
`]):this.lookAhead("/*")?(this.copyUntil(["*/"]),this.copyChar(),this.copyChar()):this.copyChar()}}transformTrackedVariable(){let e=this.inputOffset,t=this.lookAhead("let ")?"let":this.lookAhead("const ")?"const":"var";this.copyChars(t.length+1);let n=this.inputOffset;this.skip(1);let i=this.inputOffset;for(;this.isIdentifierChar(this.currentChar());)this.inputOffset++;let l=this.input.slice(i,this.inputOffset);this.emit(l,n,l.length+1,"tracked-var"),this.skipWhitespace();let c="";if(this.currentChar()===":"){this.copyChar(),this.skipWhitespaceAndCopy();let m=this.outputOffset;for(;this.inputOffset<this.input.length&&this.currentChar()!=="="&&this.currentChar()!==";"&&this.currentChar()!==`
`;)this.copyChar();c=this.output.slice(m).trim()}if(this.skipWhitespaceAndCopy(),this.currentChar()==="="){this.copyChar(),this.skipWhitespaceAndCopy();let m=this.outputOffset;this.emit("__rippleTrack__(",this.inputOffset,0,"tracked-var"),this.copyExpression(),this.emit(")",this.inputOffset,0,"tracked-var")}}transformTrackedReference(){let e=this.inputOffset;this.skip(1);let t=this.inputOffset;for(;this.isIdentifierChar(this.currentChar());)this.inputOffset++;let n=this.input.slice(t,this.inputOffset),i=this.inputOffset;this.skipWhitespace();let l=this.lookAhead("=")&&!this.lookAhead("==")&&!this.lookAhead("=>"),c=this.lookAhead("++")||this.lookAhead("--"),m=this.lookAhead("+=")||this.lookAhead("-=")||this.lookAhead("*=")||this.lookAhead("/=");this.inputOffset=i,l||c||m?this.emit(n+".value",e,n.length+1,"tracked-var"):this.emit(n+".value",e,n.length+1,"tracked-var")}transformTrackedArray(){let e=this.inputOffset;this.skip(2),this.emit("new TrackedArray([",e,2,"tracked-literal");let t=1;for(;this.inputOffset<this.input.length&&t>0;)this.currentChar()==="["?(t++,this.copyChar()):this.currentChar()==="]"?(t--,t===0?(this.skip(1),this.emit("])",this.inputOffset-1,1,"tracked-literal")):this.copyChar()):this.currentChar()==="@"&&this.isIdentifierStart(this.peekChar(1))?this.transformTrackedReference():this.copyChar()}transformTrackedObject(){let e=this.inputOffset;this.skip(2),this.emit("new TrackedObject({",e,2,"tracked-literal");let t=1;for(;this.inputOffset<this.input.length&&t>0;)this.currentChar()==="{"?(t++,this.copyChar()):this.currentChar()==="}"?(t--,t===0?(this.skip(1),this.emit("})",this.inputOffset-1,1,"tracked-literal")):this.copyChar()):this.currentChar()==="@"&&this.isIdentifierStart(this.peekChar(1))?this.transformTrackedReference():this.copyChar()}transformTrackedSet(){let e=this.inputOffset;this.skip(5),this.emit("new TrackedSet([",e,5,"tracked-literal");let t=1;for(;this.inputOffset<this.input.length&&t>0;)this.currentChar()==="("?(t++,this.copyChar()):this.currentChar()===")"?(t--,t===0?(this.skip(1),this.emit("])",this.inputOffset-1,1,"tracked-literal")):this.copyChar()):this.currentChar()==="@"&&this.isIdentifierStart(this.peekChar(1))?this.transformTrackedReference():this.copyChar()}transformTrackedMap(){let e=this.inputOffset;this.skip(5),this.emit("new TrackedMap([",e,5,"tracked-literal");let t=1;for(;this.inputOffset<this.input.length&&t>0;)this.currentChar()==="("?(t++,this.copyChar()):this.currentChar()===")"?(t--,t===0?(this.skip(1),this.emit("])",this.inputOffset-1,1,"tracked-literal")):this.copyChar()):this.currentChar()==="@"&&this.isIdentifierStart(this.peekChar(1))?this.transformTrackedReference():this.copyChar()}transformStyleBlock(){let e=this.inputOffset,t=this.input.indexOf(">",this.inputOffset)+1,n=this.input.indexOf("</style>",this.inputOffset);if(n===-1){this.errors.push({message:"Unclosed <style> tag",offset:e,length:7}),this.copyChar();return}let i=n+8-this.inputOffset;this.skip(i),this.emit("/* <style> block omitted for type checking */",e,i,"template")}transformJSX(){let e=0,t=!1,n=0;for(;this.inputOffset<this.input.length;){let i=this.currentChar();if(t)i==="{"?(n++,this.copyChar()):i==="}"?(n--,n===0&&(t=!1),this.copyChar()):i==="@"&&this.isIdentifierStart(this.peekChar(1))?this.transformTrackedReference():this.copyChar();else if(i==="{")t=!0,n=1,this.copyChar();else if(i==="<")if(this.lookAhead("</")){if(this.copyUntil([">"]),this.copyChar(),e--,e===0)break}else e++,this.copyChar();else if(i==="/"&&this.peekChar(1)===">"){if(this.copyChar(),this.copyChar(),e--,e===0)break}else i===">"?this.copyChar():this.copyChar()}}currentChar(){return this.input[this.inputOffset]||""}peekChar(e){return this.input[this.inputOffset+e]||""}lookAhead(e){return this.input.slice(this.inputOffset,this.inputOffset+e.length)===e}skip(e){this.inputOffset+=e}copyChar(){let e=this.currentChar();this.output+=e,this.sourceMap.addMapping({original:{line:this.getLine(this.inputOffset),column:this.getColumn(this.inputOffset),offset:this.inputOffset},generated:{line:this.getOutputLine(),column:this.getOutputColumn(),offset:this.outputOffset},length:1,type:"identity"}),this.inputOffset++,this.outputOffset++}copyChars(e){for(let t=0;t<e;t++)this.copyChar()}emit(e,t,n,i){this.sourceMap.addMapping({original:{line:this.getLine(t),column:this.getColumn(t),offset:t},generated:{line:this.getOutputLine(),column:this.getOutputColumn(),offset:this.outputOffset},length:Math.max(e.length,n),type:i}),this.output+=e,this.outputOffset+=e.length}copyUntil(e){for(;this.inputOffset<this.input.length;){for(let t of e)if(this.lookAhead(t))return;this.copyChar()}}copyExpression(){let e=0;for(;this.inputOffset<this.input.length;){let t=this.currentChar();if((t===";"||t===","||t===`
`)&&e===0)break;if(t==="("||t==="["||t==="{")e++;else if((t===")"||t==="]"||t==="}")&&(e--,e<0))break;t==="@"&&this.isIdentifierStart(this.peekChar(1))?this.transformTrackedReference():this.copyChar()}}copyString(e){if(this.copyChar(),e==="`")for(;this.inputOffset<this.input.length;)if(this.currentChar()==="`"){this.copyChar();break}else if(this.lookAhead("${")){this.copyChar(),this.copyChar();let t=1;for(;this.inputOffset<this.input.length&&t>0;)this.currentChar()==="{"?t++:this.currentChar()==="}"&&t--,t>0&&(this.currentChar()==="@"&&this.isIdentifierStart(this.peekChar(1))?this.transformTrackedReference():this.copyChar());this.currentChar()==="}"&&this.copyChar()}else this.currentChar()==="\\"?(this.copyChar(),this.copyChar()):this.copyChar();else for(;this.inputOffset<this.input.length;)if(this.currentChar()===e){this.copyChar();break}else this.currentChar()==="\\"?(this.copyChar(),this.copyChar()):this.copyChar()}skipWhitespace(){for(;this.inputOffset<this.input.length&&/\s/.test(this.currentChar());)this.inputOffset++}skipWhitespaceAndCopy(){for(;this.inputOffset<this.input.length&&/\s/.test(this.currentChar());)this.copyChar()}isIdentifierStart(e){return/[a-zA-Z_$]/.test(e)}isIdentifierChar(e){return/[a-zA-Z0-9_$]/.test(e)}isJSXStart(){let e=this.peekChar(1);return this.isIdentifierStart(e)||e===">"||e==="/"}getLine(e){let t=1;for(let n=0;n<e&&n<this.input.length;n++)this.input[n]===`
`&&t++;return t}getColumn(e){let t=1;for(let n=e-1;n>=0&&this.input[n]!==`
`;n--)t++;return t}getOutputLine(){let e=1;for(let t=0;t<this.outputOffset&&t<this.output.length;t++)this.output[t]===`
`&&e++;return e}getOutputColumn(){let e=1;for(let t=this.outputOffset-1;t>=0&&this.output[t]!==`
`;t--)e++;return e}};var F=`
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
`,j=`
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
`,U=F+j;var E=class{monaco;transformer;shadowFiles=new Map;typesLib=null;constructor(e){this.monaco=e,this.transformer=new M,this.initialize()}initialize(){this.configureTypeScript(),this.addRippleTypes(),this.monaco.editor.onDidCreateModel(e=>{e.getLanguageId()==="ripple"&&this.registerModel(e)}),this.monaco.editor.onWillDisposeModel(e=>{e.getLanguageId()==="ripple"&&this.unregisterModel(e)}),this.registerProviders()}configureTypeScript(){}addRippleTypes(){this.typesLib=this.monaco.languages.typescript.typescriptDefaults.addExtraLib(U,"file:///node_modules/@types/ripple/index.d.ts")}registerModel(e){let t=e.uri.toString(),n=this.getShadowUri(t),i=this.transformer.transform(e.getValue()),l=this.monaco.languages.typescript.javascriptDefaults.addExtraLib(i.code,n),c=this.monaco.languages.typescript.typescriptDefaults.addExtraLib(i.code,n),m=e.onDidChangeContent(()=>{this.updateModel(e)});this.shadowFiles.set(t,{uri:n,model:e,transformResult:i,disposables:[l,c,m]})}updateModel(e){let t=e.uri.toString(),n=this.shadowFiles.get(t);if(!n)return;let i=this.transformer.transform(e.getValue());n.transformResult=i,n.disposables.slice(0,2).forEach(m=>m.dispose());let l=this.monaco.languages.typescript.javascriptDefaults.addExtraLib(i.code,n.uri),c=this.monaco.languages.typescript.typescriptDefaults.addExtraLib(i.code,n.uri);n.disposables[0]=l,n.disposables[1]=c}unregisterModel(e){let t=e.uri.toString(),n=this.shadowFiles.get(t);n&&(n.disposables.forEach(i=>i.dispose()),this.shadowFiles.delete(t))}getShadowUri(e){return e.replace(/\.ripple$/,".tsx").replace(/\.rpl$/,".tsx")}registerProviders(){this.monaco.languages.registerCompletionItemProvider("ripple",{triggerCharacters:[".","@","#","<",'"',"'","/","{",":"," "],provideCompletionItems:async(e,t,n,i)=>this.provideCompletions(e,t,n,i)}),this.monaco.languages.registerHoverProvider("ripple",{provideHover:async(e,t,n)=>this.provideHover(e,t,n)}),this.monaco.languages.registerDefinitionProvider("ripple",{provideDefinition:async(e,t,n)=>this.provideDefinition(e,t,n)}),this.monaco.languages.registerSignatureHelpProvider("ripple",{signatureHelpTriggerCharacters:["(",","],signatureHelpRetriggerCharacters:[","],provideSignatureHelp:async(e,t,n,i)=>this.provideSignatureHelp(e,t,n,i)}),this.monaco.languages.registerDocumentHighlightProvider("ripple",{provideDocumentHighlights:async(e,t,n)=>this.provideDocumentHighlights(e,t,n)}),this.monaco.languages.registerReferenceProvider("ripple",{provideReferences:async(e,t,n,i)=>this.provideReferences(e,t,n,i)}),this.monaco.languages.registerRenameProvider("ripple",{provideRenameEdits:async(e,t,n,i)=>this.provideRenameEdits(e,t,n,i),resolveRenameLocation:async(e,t,n)=>this.resolveRenameLocation(e,t,n)})}async getTypeScriptWorker(e){return(await this.monaco.languages.typescript.getTypeScriptWorker())(e)}async provideCompletions(e,t,n,i){let l=e.uri.toString(),c=this.shadowFiles.get(l);if(!c)return null;let m=e.getOffsetAt(t),a=c.transformResult.sourceMap.originalToGenerated(m);try{let f=this.monaco.Uri.parse(c.uri),s=await(await this.getTypeScriptWorker(f)).getCompletionsAtPosition(c.uri,a,{});if(!s||!s.entries)return null;let g=e.getWordUntilPosition(t),u={startLineNumber:t.lineNumber,endLineNumber:t.lineNumber,startColumn:g.startColumn,endColumn:g.endColumn};return{suggestions:[...this.getRippleSpecificCompletions(e,t),...s.entries.map(p=>this.convertCompletion(p,u))]}}catch(f){return console.error("Completion error:",f),null}}getRippleSpecificCompletions(e,t){let n=e.getLineContent(t.lineNumber),i=n[t.column-2],l=e.getWordUntilPosition(t),c={startLineNumber:t.lineNumber,endLineNumber:t.lineNumber,startColumn:l.startColumn,endColumn:l.endColumn},m=[];return i==="#"&&m.push({label:"[",kind:this.monaco.languages.CompletionItemKind.Snippet,insertText:"[$0]",insertTextRules:this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,detail:"Tracked Array",documentation:"Create a new tracked array: #[item1, item2]",range:c},{label:"{",kind:this.monaco.languages.CompletionItemKind.Snippet,insertText:"{$0}",insertTextRules:this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,detail:"Tracked Object",documentation:"Create a new tracked object: #{key: value}",range:c},{label:"set(",kind:this.monaco.languages.CompletionItemKind.Snippet,insertText:"set($0)",insertTextRules:this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,detail:"Tracked Set",documentation:"Create a new tracked set: #set(item1, item2)",range:c},{label:"map(",kind:this.monaco.languages.CompletionItemKind.Snippet,insertText:"map($0)",insertTextRules:this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,detail:"Tracked Map",documentation:"Create a new tracked map: #map([key, value], ...)",range:c}),n.trimStart().startsWith("comp")&&m.push({label:"component",kind:this.monaco.languages.CompletionItemKind.Keyword,insertText:"component ${1:Name}(${2:props}) {\n	$0\n}",insertTextRules:this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,detail:"Define a Ripple component",documentation:"Creates a new Ripple component with props",range:c}),m}convertCompletion(e,t){let n={function:this.monaco.languages.CompletionItemKind.Function,method:this.monaco.languages.CompletionItemKind.Method,property:this.monaco.languages.CompletionItemKind.Property,variable:this.monaco.languages.CompletionItemKind.Variable,class:this.monaco.languages.CompletionItemKind.Class,interface:this.monaco.languages.CompletionItemKind.Interface,module:this.monaco.languages.CompletionItemKind.Module,keyword:this.monaco.languages.CompletionItemKind.Keyword,const:this.monaco.languages.CompletionItemKind.Constant,let:this.monaco.languages.CompletionItemKind.Variable,type:this.monaco.languages.CompletionItemKind.TypeParameter,enum:this.monaco.languages.CompletionItemKind.Enum,"enum member":this.monaco.languages.CompletionItemKind.EnumMember};return{label:e.name,kind:n[e.kind]||this.monaco.languages.CompletionItemKind.Text,insertText:e.insertText||e.name,detail:e.kindModifiers,sortText:e.sortText,range:t}}async provideHover(e,t,n){let i=e.uri.toString(),l=this.shadowFiles.get(i);if(!l)return null;let c=e.getOffsetAt(t),m=l.transformResult.sourceMap.originalToGenerated(c);try{let a=this.monaco.Uri.parse(l.uri),b=await(await this.getTypeScriptWorker(a)).getQuickInfoAtPosition(l.uri,m);if(!b)return null;let s=b.displayParts||[],g=b.documentation||[],u=s.map(h=>h.text).join("");u=this.cleanupTypeSignature(u);let o=[];u&&o.push({value:"```typescript\n"+u+"\n```"}),g.length>0&&o.push({value:g.map(h=>h.text).join(`
`)});let r=e.getWordAtPosition(t),p=r?{startLineNumber:t.lineNumber,endLineNumber:t.lineNumber,startColumn:r.startColumn,endColumn:r.endColumn}:void 0;return{contents:o,range:p}}catch(a){return console.error("Hover error:",a),null}}cleanupTypeSignature(e){return e=e.replace(/__rippleTrack__<([^>]+)>/g,"Tracked<$1>"),e=e.replace(/TrackedValue<([^>]+)>/g,"Tracked<$1>"),e}async provideDefinition(e,t,n){let i=e.uri.toString(),l=this.shadowFiles.get(i);if(!l)return null;let c=e.getOffsetAt(t),m=l.transformResult.sourceMap.originalToGenerated(c);try{let a=this.monaco.Uri.parse(l.uri),b=await(await this.getTypeScriptWorker(a)).getDefinitionAtPosition(l.uri,m);return!b||b.length===0?null:b.map(s=>{let g=s.fileName.replace(".tsx",".ripple"),u=this.findShadowFileByUri(s.fileName),o=s.textSpan.start,r=s.textSpan.start+s.textSpan.length;u&&(o=u.transformResult.sourceMap.generatedToOriginal(o),r=u.transformResult.sourceMap.generatedToOriginal(r));let p=this.monaco.editor.getModel(this.monaco.Uri.parse(g));if(!p)return{uri:this.monaco.Uri.parse(g),range:{startLineNumber:1,startColumn:1,endLineNumber:1,endColumn:1}};let h=p.getPositionAt(o),v=p.getPositionAt(r);return{uri:this.monaco.Uri.parse(g),range:{startLineNumber:h.lineNumber,startColumn:h.column,endLineNumber:v.lineNumber,endColumn:v.column}}})}catch(a){return console.error("Definition error:",a),null}}findShadowFileByUri(e){for(let[,t]of this.shadowFiles)if(t.uri===e)return t}async provideSignatureHelp(e,t,n,i){let l=e.uri.toString(),c=this.shadowFiles.get(l);if(!c)return null;let m=e.getOffsetAt(t),a=c.transformResult.sourceMap.originalToGenerated(m);try{let f=this.monaco.Uri.parse(c.uri),s=await(await this.getTypeScriptWorker(f)).getSignatureHelpItems(c.uri,a,{});return!s||!s.items||s.items.length===0?null:{value:{signatures:s.items.map(g=>{let u=g.prefixDisplayParts.map(p=>p.text).join(""),o=g.suffixDisplayParts.map(p=>p.text).join(""),r=g.parameters.map(p=>p.displayParts.map(h=>h.text).join(""));return{label:u+r.join(", ")+o,parameters:g.parameters.map(p=>({label:p.displayParts.map(h=>h.text).join(""),documentation:p.documentation?.map(h=>h.text).join(`
`)})),documentation:g.documentation?.map(p=>p.text).join(`
`)}}),activeSignature:s.selectedItemIndex,activeParameter:s.argumentIndex},dispose:()=>{}}}catch(f){return console.error("Signature help error:",f),null}}async provideDocumentHighlights(e,t,n){let i=e.uri.toString(),l=this.shadowFiles.get(i);if(!l)return null;let c=e.getOffsetAt(t),m=l.transformResult.sourceMap.originalToGenerated(c);try{let a=this.monaco.Uri.parse(l.uri),b=await(await this.getTypeScriptWorker(a)).getDocumentHighlights(l.uri,m,[l.uri]);if(!b||b.length===0)return null;let s=[];for(let g of b)for(let u of g.highlightSpans){let o=l.transformResult.sourceMap.generatedToOriginal(u.textSpan.start),r=l.transformResult.sourceMap.generatedToOriginal(u.textSpan.start+u.textSpan.length),p=e.getPositionAt(o),h=e.getPositionAt(r);s.push({range:{startLineNumber:p.lineNumber,startColumn:p.column,endLineNumber:h.lineNumber,endColumn:h.column},kind:u.kind==="writtenReference"?this.monaco.languages.DocumentHighlightKind.Write:this.monaco.languages.DocumentHighlightKind.Read})}return s}catch(a){return console.error("Document highlights error:",a),null}}async provideReferences(e,t,n,i){let l=e.uri.toString(),c=this.shadowFiles.get(l);if(!c)return null;let m=e.getOffsetAt(t),a=c.transformResult.sourceMap.originalToGenerated(m);try{let f=this.monaco.Uri.parse(c.uri),s=await(await this.getTypeScriptWorker(f)).getReferencesAtPosition(c.uri,a);return!s||s.length===0?null:s.map(g=>{let u=g.fileName.replace(".tsx",".ripple"),o=this.findShadowFileByUri(g.fileName),r=g.textSpan.start,p=g.textSpan.start+g.textSpan.length;o&&(r=o.transformResult.sourceMap.generatedToOriginal(r),p=o.transformResult.sourceMap.generatedToOriginal(p));let h=this.monaco.editor.getModel(this.monaco.Uri.parse(u));if(!h)return{uri:this.monaco.Uri.parse(u),range:{startLineNumber:1,startColumn:1,endLineNumber:1,endColumn:1}};let v=h.getPositionAt(r),y=h.getPositionAt(p);return{uri:this.monaco.Uri.parse(u),range:{startLineNumber:v.lineNumber,startColumn:v.column,endLineNumber:y.lineNumber,endColumn:y.column}}})}catch(f){return console.error("References error:",f),null}}async provideRenameEdits(e,t,n,i){let l=e.uri.toString(),c=this.shadowFiles.get(l);if(!c)return null;let m=e.getOffsetAt(t),a=c.transformResult.sourceMap.originalToGenerated(m);try{let f=this.monaco.Uri.parse(c.uri),s=await(await this.getTypeScriptWorker(f)).findRenameLocations(c.uri,a,!1,!1);if(!s||s.length===0)return null;let g=[];for(let u of s){let o=u.fileName.replace(".tsx",".ripple"),r=this.findShadowFileByUri(u.fileName),p=u.textSpan.start,h=u.textSpan.start+u.textSpan.length;r&&(p=r.transformResult.sourceMap.generatedToOriginal(p),h=r.transformResult.sourceMap.generatedToOriginal(h));let v=this.monaco.editor.getModel(this.monaco.Uri.parse(o));if(!v)continue;let y=v.getPositionAt(p),x=v.getPositionAt(h);g.push({resource:this.monaco.Uri.parse(o),textEdit:{range:{startLineNumber:y.lineNumber,startColumn:y.column,endLineNumber:x.lineNumber,endColumn:x.column},text:n},versionId:void 0})}return{edits:g}}catch(f){return console.error("Rename error:",f),null}}async resolveRenameLocation(e,t,n){let i=e.getWordAtPosition(t);return i?{text:i.word,range:{startLineNumber:t.lineNumber,startColumn:i.startColumn,endLineNumber:t.lineNumber,endColumn:i.endColumn}}:null}dispose(){this.typesLib?.dispose();for(let[,e]of this.shadowFiles)e.disposables.forEach(t=>t.dispose());this.shadowFiles.clear()}};function D(T=window.monaco){return new E(T)}var J={config:I,tokens:L,definitions:P,init:D};export{J as default};
