/* eslint-disable id-blacklist */
/* eslint-disable no-template-curly-in-string */
import type * as Monaco from "monaco-editor";
import type { languages } from "monaco-editor";

const monaco = (window as any).monaco;

export const config: languages.LanguageConfiguration = {
  comments: {
    lineComment: "//",
    blockComment: ["/*", "*/"],
  },
  brackets: [
    ["{", "}"],
    ["[", "]"],
    ["(", ")"],
    // ['<', '>'] // enabling this caused lots of errors with arrorw functions
  ],
  autoClosingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"' },
    { open: "'", close: "'" },
    { open: "`", close: "`" },
    { open: "<", close: ">" },
  ],
  surroundingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"' },
    { open: "'", close: "'" },
    { open: "`", close: "`" },
    { open: "<", close: ">" },
  ],
  folding: {
    markers: {
      start: /^\s*\/\/\s*#?region\b/,
      end: /^\s*\/\/\s*#?endregion\b/,
    },
  },
};

export const tokens: languages.IMonarchLanguage = {
  defaultToken: "",
  tokenPostfix: ".ripple",

  keywords: [
    "break",
    "case",
    "catch",
    "const",
    "continue",
    "debugger",
    "default",
    "delete",
    "do",
    "else",
    "export",
    "extends",
    "finally",
    "for",
    "from",
    "function",
    "if",
    "import",
    "in",
    "instanceof",
    "let",
    "new",
    "of",
    "return",
    "switch",
    "this",
    "throw",
    "try",
    "typeof",
    "var",
    "void",
    "while",
    "with",
    "yield",
    "async",
    "await",
    "class",
    "enum",
    "implements",
    "interface",
    "package",
    "private",
    "protected",
    "public",
    "static",
    "component",
    "index",
    "key",
  ],

  rippleBuiltins: [
    "track",
    "untrack",
    "effect",
    "mount",
    "flushSync",
    "tick",
    "on",
    "trackSplit",
    "Context",
    "Portal",
    "TrackedArray",
    "TrackedObject",
    "TrackedSet",
    "TrackedMap",
    "TrackedDate",
    "html",
    "ref",
  ],

  typeKeywords: [
    "any",
    "boolean",
    "number",
    "object",
    "string",
    "undefined",
    "never",
    "unknown",
    "void",
    "null",
    "Component",
    "Tracked",
    "PropsWithChildren",
  ],

  constants: ["true", "false", "null", "undefined", "NaN", "Infinity"],

  escapes:
    /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
  digits: /\d+(_+\d+)*/,

  tokenizer: {
    root: [
      { include: "@whitespaceAndComments" },
      { include: "@jsx" },
      { include: "@expressions" },
    ],

    whitespaceAndComments: [
      [/[ \t\r\n]+/, ""],
      [/\/\*/, "comment", "@comment"],
      [/\/\/.*$/, "comment"],
    ],

    expressions: [
      // Arrow function - must come before other operators
      [/=>/, "keyword"],

      // Reactive @ prefix
      [/@[a-zA-Z_$][\w$]*/, "variable"],
      [/@(?=\()/, "variable"],

      // Tracked collection syntax #[] and #{}
      [/#\[/, "keyword"],
      [/#\{/, "keyword"],

      // Component keyword
      [/\b(component)\b/, "keyword"],

      // Identifiers
      [
        /[a-z_$][\w$]*/,
        {
          cases: {
            "@keywords": "keyword",
            "@rippleBuiltins": "type",
            "@constants": "keyword",
            "@default": "identifier",
          },
        },
      ],

      // Type identifiers (PascalCase)
      [
        /[A-Z][\w$]*/,
        {
          cases: {
            "@typeKeywords": "type",
            "@default": "type.identifier",
          },
        },
      ],

      // Delimiters and brackets
      [/[{}()\[\]]/, "@brackets"],

      // Operators
      [/<=|>=|===|!==|==|!=|&&|\|\||\?\?/, "operator"],
      [/\+\+|--|\*\*/, "operator"],
      [/<<|>>>|>>/, "operator"],
      [/[<>]/, "operator"],
      [/[+\-*\/%&|^~!?:=]/, "operator"],

      // Numbers
      [/(@digits)[eE]([\-+]?(@digits))?/, "number.float"],
      [/(@digits)\.(@digits)([eE][\-+]?(@digits))?/, "number.float"],
      [/0[xX][0-9a-fA-F]+/, "number.hex"],
      [/0[oO][0-7]+/, "number.octal"],
      [/0[bB][01]+/, "number.binary"],
      [/@digits/, "number"],

      // Delimiter
      [/[;,.]/, "delimiter"],

      // Strings
      [/"([^"\\]|\\.)*$/, "string.invalid"],
      [/'([^'\\]|\\.)*$/, "string.invalid"],
      [/"/, "string", "@string_double"],
      [/'/, "string", "@string_single"],
      [/`/, "string", "@string_backtick"],
    ],

    jsx: [
      // JSX style tag - switch to CSS mode
      [
        /<style>/,
        { token: "tag", next: "@styleBlock", nextEmbedded: "text/css" },
      ],

      // TSX React blocks
      [/<tsx:react>/, "tag"],
      [/<\/tsx:react>/, "tag"],

      // Children component self-closing
      [/<children\s*\/>/, "tag"],

      // Dynamic component closing tags </@Component>
      [/(<\/)(@[a-zA-Z_$][\w$]*)(>)/, ["delimiter", "variable", "delimiter"]],

      // Dynamic component opening tags <@Component
      [/(<)(@[a-zA-Z_$][\w$]*)/, ["delimiter", "variable"], "@jsxStartTag"],

      // Closing tags </div>
      [/(<\/)([a-zA-Z_$][\w$.-]*)(>)/, ["delimiter", "tag", "delimiter"]],

      // Self-closing tags without attributes <br/>
      [/(<)([a-zA-Z_$][\w$.-]*)(\s*\/>)/, ["delimiter", "tag", "delimiter"]],

      // Opening tags <div
      [/(<)([a-zA-Z_$][\w$.-]*)/, ["delimiter", "tag"], "@jsxStartTag"],
    ],

    jsxStartTag: [
      [/\s+/, ""],
      // Special ref attribute
      [
        /(\{)(ref)\b/,
        ["delimiter.bracket", "keyword"],
        "@jsxAttributeExpression",
      ],
      // Special html attribute
      [
        /(\{)(html)\b/,
        ["delimiter.bracket", "keyword"],
        "@jsxAttributeExpression",
      ],
      // Spread attributes {...props}
      [/\{\.\.\./, "delimiter.bracket", "@jsxAttributeExpression"],
      // Shorthand attributes {onClick}
      [/\{/, "delimiter.bracket", "@jsxAttributeExpression"],
      // Expression attribute value
      [
        /([a-zA-Z_$][\w$-]*)(\s*)(=)(\s*)(\{)/,
        ["attribute.name", "", "delimiter", "", "delimiter.bracket"],
        "@jsxAttributeExpression",
      ],
      // Simple attribute with double-quoted string value
      [
        /([a-zA-Z_$][\w$-]*)(\s*)(=)(\s*)(")/,
        ["attribute.name", "", "delimiter", "", "string"],
        "@jsxAttrStringDouble",
      ],
      // Simple attribute with single-quoted string value
      [
        /([a-zA-Z_$][\w$-]*)(\s*)(=)(\s*)(')/,
        ["attribute.name", "", "delimiter", "", "string"],
        "@jsxAttrStringSingle",
      ],
      // Boolean attribute
      [/[a-zA-Z_$][\w$-]*/, "attribute.name"],
      // Self-closing tag />
      [/\/>/, "delimiter", "@pop"],
      // End of opening tag >
      [/>/, "delimiter", "@pop"],
    ],

    jsxAttrStringDouble: [
      [/[^"]+/, "string"],
      [/"/, "string", "@pop"],
    ],

    jsxAttrStringSingle: [
      [/[^']+/, "string"],
      [/'/, "string", "@pop"],
    ],

    jsxAttributeExpression: [
      [/\{/, "delimiter.bracket", "@jsxAttributeExpressionNested"],
      [/\}/, "delimiter.bracket", "@pop"],
      { include: "@whitespaceAndComments" },
      { include: "@jsxExpressionContent" },
    ],

    jsxAttributeExpressionNested: [
      [/\{/, "delimiter.bracket", "@jsxAttributeExpressionNested"],
      [/\}/, "delimiter.bracket", "@pop"],
      { include: "@whitespaceAndComments" },
      { include: "@jsxExpressionContent" },
    ],

    jsxExpressionContent: [
      // Arrow function
      [/=>/, "keyword"],

      // Reactive @ prefix
      [/@[a-zA-Z_$][\w$]*/, "variable"],
      [/@(?=\()/, "variable"],

      // Identifiers
      [
        /[a-z_$][\w$]*/,
        {
          cases: {
            "@keywords": "keyword",
            "@rippleBuiltins": "type",
            "@constants": "keyword",
            "@default": "identifier",
          },
        },
      ],

      // Type identifiers
      [
        /[A-Z][\w$]*/,
        {
          cases: {
            "@typeKeywords": "type",
            "@default": "type.identifier",
          },
        },
      ],

      // Brackets
      [/[(\[\])]/, "@brackets"],

      // Operators
      [/<=|>=|===|!==|==|!=|&&|\|\||\?\?/, "operator"],
      [/\+\+|--|\*\*/, "operator"],
      [/<<|>>>|>>/, "operator"],
      [/[+\-*\/%&|^~!?:=<>]/, "operator"],

      // Numbers
      [/\d+/, "number"],

      // Delimiter
      [/[;,.]/, "delimiter"],

      // Strings
      [/"[^"]*"/, "string"],
      [/'[^']*'/, "string"],
      [/`/, "string", "@string_backtick_in_jsx"],
    ],

    string_backtick_in_jsx: [
      [/\$\{/, "delimiter.bracket", "@templateExpressionInJsx"],
      [/[^\\`$]+/, "string"],
      [/@escapes/, "string.escape"],
      [/\\./, "string.escape.invalid"],
      [/`/, "string", "@pop"],
    ],

    templateExpressionInJsx: [
      [/\{/, "delimiter.bracket", "@templateExpressionInJsx"],
      [/\}/, "delimiter.bracket", "@pop"],
      { include: "@whitespaceAndComments" },
      { include: "@jsxExpressionContent" },
    ],

    styleBlock: [
      [/<\/style>/, { token: "tag", next: "@pop", nextEmbedded: "@pop" }],
      [/[^<]+/, ""],
      [/</, ""],
    ],

    comment: [
      [/[^\/*]+/, "comment"],
      [/\*\//, "comment", "@pop"],
      [/[\/*]/, "comment"],
    ],

    string_double: [
      [/[^\\"]+/, "string"],
      [/@escapes/, "string.escape"],
      [/\\./, "string.escape.invalid"],
      [/"/, "string", "@pop"],
    ],

    string_single: [
      [/[^\\']+/, "string"],
      [/@escapes/, "string.escape"],
      [/\\./, "string.escape.invalid"],
      [/'/, "string", "@pop"],
    ],

    string_backtick: [
      [/\$\{/, "delimiter.bracket", "@templateExpression"],
      [/[^\\`$]+/, "string"],
      [/@escapes/, "string.escape"],
      [/\\./, "string.escape.invalid"],
      [/`/, "string", "@pop"],
    ],

    templateExpression: [
      [/\{/, "delimiter.bracket", "@templateExpression"],
      [/\}/, "delimiter.bracket", "@pop"],
      { include: "@whitespaceAndComments" },
      { include: "@expressions" },
    ],
  },
};

export const definitions: languages.DefinitionProvider = {
  provideDefinition(model, position) {
    const definitions: Monaco.languages.Location[] = [];
    const wordAtPosition = model.getWordAtPosition(position);

    if (!wordAtPosition) return null;

    const word = wordAtPosition.word;
    const lineContent = model.getLineContent(position.lineNumber);

    // Check if we're clicking on a @ prefixed variable (e.g., @count)
    const charBefore = lineContent[wordAtPosition.startColumn - 2];
    const isReactiveAccess = charBefore === "@";
    const searchWord = isReactiveAccess ? word : word;

    // Search through all Ripple models for definitions
    const rippleModels = monaco.editor
      .getModels()
      .filter((m: Monaco.editor.ITextModel) => m.getLanguageId() === "ripple");

    for (const targetModel of rippleModels) {
      const text = targetModel.getValue();
      const lines = text.split("\n");

      for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        const line = lines[lineIndex];

        // Match: let identifier = track(...)
        const trackMatch = line.match(
          new RegExp(`\\blet\\s+(${searchWord})\\s*=\\s*track\\s*\\(`),
        );
        if (trackMatch) {
          const startCol = line.indexOf(trackMatch[1]) + 1;
          definitions.push({
            uri: targetModel.uri,
            range: new monaco.Range(
              lineIndex + 1,
              startCol,
              lineIndex + 1,
              startCol + searchWord.length,
            ),
          });
        }

        // Match: let identifier = #[...] or #{ ... }
        const trackedCollectionMatch = line.match(
          new RegExp(`\\blet\\s+(${searchWord})\\s*=\\s*#[\\[\\{]`),
        );
        if (trackedCollectionMatch) {
          const startCol = line.indexOf(trackedCollectionMatch[1]) + 1;
          definitions.push({
            uri: targetModel.uri,
            range: new monaco.Range(
              lineIndex + 1,
              startCol,
              lineIndex + 1,
              startCol + searchWord.length,
            ),
          });
        }

        // Match: const/let/var identifier = (non-track assignments)
        const variableMatch = line.match(
          new RegExp(`\\b(const|let|var)\\s+(${searchWord})\\s*=(?!\\s*track)`),
        );
        if (variableMatch) {
          const startCol =
            line.indexOf(variableMatch[2], line.indexOf(variableMatch[1])) + 1;
          definitions.push({
            uri: targetModel.uri,
            range: new monaco.Range(
              lineIndex + 1,
              startCol,
              lineIndex + 1,
              startCol + searchWord.length,
            ),
          });
        }

        // Match: component ComponentName(...)
        const componentMatch = line.match(
          new RegExp(`\\bcomponent\\s+(${searchWord})\\s*\\(`),
        );
        if (componentMatch) {
          const startCol = line.indexOf(componentMatch[1]) + 1;
          definitions.push({
            uri: targetModel.uri,
            range: new monaco.Range(
              lineIndex + 1,
              startCol,
              lineIndex + 1,
              startCol + searchWord.length,
            ),
          });
        }

        // Match: function functionName(...)
        const functionMatch = line.match(
          new RegExp(`\\bfunction\\s+(${searchWord})\\s*\\(`),
        );
        if (functionMatch) {
          const startCol = line.indexOf(functionMatch[1]) + 1;
          definitions.push({
            uri: targetModel.uri,
            range: new monaco.Range(
              lineIndex + 1,
              startCol,
              lineIndex + 1,
              startCol + searchWord.length,
            ),
          });
        }

        // Match: const ComponentName = (for arrow function components)
        const arrowComponentMatch = line.match(
          new RegExp(`\\bconst\\s+(${searchWord})\\s*=\\s*\\(`),
        );
        if (arrowComponentMatch) {
          const startCol = line.indexOf(arrowComponentMatch[1]) + 1;
          definitions.push({
            uri: targetModel.uri,
            range: new monaco.Range(
              lineIndex + 1,
              startCol,
              lineIndex + 1,
              startCol + searchWord.length,
            ),
          });
        }

        // Match: interface InterfaceName or type TypeName
        const typeMatch = line.match(
          new RegExp(`\\b(interface|type)\\s+(${searchWord})\\b`),
        );
        if (typeMatch) {
          const startCol =
            line.indexOf(typeMatch[2], line.indexOf(typeMatch[1])) + 1;
          definitions.push({
            uri: targetModel.uri,
            range: new monaco.Range(
              lineIndex + 1,
              startCol,
              lineIndex + 1,
              startCol + searchWord.length,
            ),
          });
        }

        // Match: class ClassName
        const classMatch = line.match(
          new RegExp(`\\bclass\\s+(${searchWord})\\b`),
        );
        if (classMatch) {
          const startCol = line.indexOf(classMatch[1]) + 1;
          definitions.push({
            uri: targetModel.uri,
            range: new monaco.Range(
              lineIndex + 1,
              startCol,
              lineIndex + 1,
              startCol + searchWord.length,
            ),
          });
        }

        // Match: for loop variables (for const item of items; index i; key k)
        const forLoopMatch = line.match(
          new RegExp(`\\bfor\\s*\\(\\s*const\\s+(${searchWord})\\s+of\\b`),
        );
        if (forLoopMatch) {
          const startCol = line.indexOf(forLoopMatch[1]) + 1;
          definitions.push({
            uri: targetModel.uri,
            range: new monaco.Range(
              lineIndex + 1,
              startCol,
              lineIndex + 1,
              startCol + searchWord.length,
            ),
          });
        }

        // Match: index variable in for loop
        const indexMatch = line.match(
          new RegExp(`\\bindex\\s+(${searchWord})\\b`),
        );
        if (indexMatch) {
          const startCol =
            line.indexOf(indexMatch[1], line.indexOf("index")) + 1;
          definitions.push({
            uri: targetModel.uri,
            range: new monaco.Range(
              lineIndex + 1,
              startCol,
              lineIndex + 1,
              startCol + searchWord.length,
            ),
          });
        }

        // Match: function/component parameters
        const paramMatch = line.match(
          new RegExp(`\\(.*\\b(${searchWord})\\s*[,:)]`),
        );
        if (
          paramMatch &&
          (line.includes("component") ||
            line.includes("function") ||
            line.includes("=>"))
        ) {
          const startCol = line.indexOf(paramMatch[1], line.indexOf("(")) + 1;
          definitions.push({
            uri: targetModel.uri,
            range: new monaco.Range(
              lineIndex + 1,
              startCol,
              lineIndex + 1,
              startCol + searchWord.length,
            ),
          });
        }
      }
    }

    // Remove duplicates based on uri and range
    const uniqueDefinitions = definitions.filter(
      (def, index, self) =>
        index ===
        self.findIndex(
          (d) =>
            d.uri.toString() === def.uri.toString() &&
            d.range.startLineNumber === def.range.startLineNumber &&
            d.range.startColumn === def.range.startColumn,
        ),
    );

    return uniqueDefinitions.length > 0 ? uniqueDefinitions : null;
  },
};

export default {
  config,
  tokens,
  definitions,
};
