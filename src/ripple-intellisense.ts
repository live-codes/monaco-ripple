// ripple-intellisense.ts

import type * as Monaco from "monaco-editor";
import { RippleTransformer, type TransformResult } from "./ripple-transformer";
import { rippleTypeDefinitions } from "./ripple-types";

interface ShadowFile {
  uri: string;
  model: Monaco.editor.ITextModel;
  transformResult: TransformResult;
  disposables: Monaco.IDisposable[];
}

export class RippleIntelliSense {
  private monaco: typeof Monaco;
  private transformer: RippleTransformer;
  private shadowFiles = new Map<string, ShadowFile>();
  private typesLib: Monaco.IDisposable | null = null;

  constructor(monaco: typeof Monaco) {
    this.monaco = monaco;
    this.transformer = new RippleTransformer();
    this.initialize();
  }

  private initialize() {
    // // Register Ripple as a language
    // this.monaco.languages.register({
    //   id: 'ripple',
    //   extensions: ['.ripple', '.rpl'],
    //   aliases: ['Ripple', 'ripple'],
    //   mimetypes: ['text/x-ripple'],
    // });

    // Configure TypeScript compiler options
    this.configureTypeScript();

    // Add Ripple type definitions
    this.addRippleTypes();

    // Listen for model creation
    this.monaco.editor.onDidCreateModel((model) => {
      if (model.getLanguageId() === "ripple") {
        this.registerModel(model);
      }
    });

    // Clean up disposed models
    this.monaco.editor.onWillDisposeModel((model) => {
      if (model.getLanguageId() === "ripple") {
        this.unregisterModel(model);
      }
    });

    // Register language features
    this.registerProviders();
  }

  private configureTypeScript() {
    // const compilerOptions: Monaco.languages.typescript.CompilerOptions = {
    //   target: this.monaco.languages.typescript.ScriptTarget.ESNext,
    //   module: this.monaco.languages.typescript.ModuleKind.ESNext,
    //   moduleResolution: this.monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    //   jsx: this.monaco.languages.typescript.JsxEmit.Preserve,
    //   jsxFactory: 'h',
    //   jsxFragmentFactory: 'Fragment',
    //   allowJs: true,
    //   checkJs: false,
    //   strict: true,
    //   noEmit: true,
    //   esModuleInterop: true,
    //   allowSyntheticDefaultImports: true,
    //   forceConsistentCasingInFileNames: true,
    //   skipLibCheck: true,
    //   lib: ['ESNext', 'DOM', 'DOM.Iterable'],
    //   // Allow some flexibility for Ripple's syntax extensions
    //   suppressImplicitAnyIndexErrors: true,
    // };
    // this.monaco.languages.typescript.typescriptDefaults.setCompilerOptions(compilerOptions);
    // this.monaco.languages.typescript.javascriptDefaults.setCompilerOptions(compilerOptions);
    // // Loosen diagnostics slightly
    // const diagnosticsOptions: Monaco.languages.typescript.DiagnosticsOptions = {
    //   noSemanticValidation: false,
    //   noSyntaxValidation: false,
    //   diagnosticCodesToIgnore: [
    //     // 'Cannot find name' for Ripple-specific identifiers that might not resolve
    //     2304,
    //     // 'Property does not exist' for dynamic properties
    //     2339,
    //     // 'Cannot find module' for Ripple-specific imports
    //     2307,
    //   ],
    // };
    // this.monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions(diagnosticsOptions);
  }

  private addRippleTypes() {
    this.typesLib =
      this.monaco.languages.typescript.typescriptDefaults.addExtraLib(
        rippleTypeDefinitions,
        "file:///node_modules/@types/ripple/index.d.ts",
      );
  }

  private registerModel(model: Monaco.editor.ITextModel) {
    const uri = model.uri.toString();
    const shadowUri = this.getShadowUri(uri);

    // Initial transform
    const transformResult = this.transformer.transform(model.getValue());

    // Add transformed code as extra lib
    const jsLib =
      this.monaco.languages.typescript.javascriptDefaults.addExtraLib(
        transformResult.code,
        shadowUri,
      );
    const tsLib =
      this.monaco.languages.typescript.typescriptDefaults.addExtraLib(
        transformResult.code,
        shadowUri,
      );

    // Listen for changes
    const changeDisposable = model.onDidChangeContent(() => {
      this.updateModel(model);
    });

    this.shadowFiles.set(uri, {
      uri: shadowUri,
      model,
      transformResult,
      disposables: [jsLib, tsLib, changeDisposable],
    });
  }

  private updateModel(model: Monaco.editor.ITextModel) {
    const uri = model.uri.toString();
    const shadowFile = this.shadowFiles.get(uri);

    if (!shadowFile) return;

    // Re-transform
    const transformResult = this.transformer.transform(model.getValue());
    shadowFile.transformResult = transformResult;

    // Dispose old libs
    shadowFile.disposables.slice(0, 2).forEach((d) => d.dispose());

    // Add new libs
    const jsLib =
      this.monaco.languages.typescript.javascriptDefaults.addExtraLib(
        transformResult.code,
        shadowFile.uri,
      );
    const tsLib =
      this.monaco.languages.typescript.typescriptDefaults.addExtraLib(
        transformResult.code,
        shadowFile.uri,
      );

    shadowFile.disposables[0] = jsLib;
    shadowFile.disposables[1] = tsLib;
  }

  private unregisterModel(model: Monaco.editor.ITextModel) {
    const uri = model.uri.toString();
    const shadowFile = this.shadowFiles.get(uri);

    if (shadowFile) {
      shadowFile.disposables.forEach((d) => d.dispose());
      this.shadowFiles.delete(uri);
    }
  }

  private getShadowUri(rippleUri: string): string {
    // Convert .ripple to .tsx for TypeScript processing
    return rippleUri.replace(/\.ripple$/, ".tsx").replace(/\.rpl$/, ".tsx");
  }

  private registerProviders() {
    // Completion provider
    this.monaco.languages.registerCompletionItemProvider("ripple", {
      triggerCharacters: [".", "@", "#", "<", '"', "'", "/", "{", ":", " "],
      provideCompletionItems: async (model, position, context, token) =>
        this.provideCompletions(model, position, context, token),
    });

    // Hover provider
    this.monaco.languages.registerHoverProvider("ripple", {
      provideHover: async (model, position, token) =>
        this.provideHover(model, position, token),
    });

    // Definition provider
    this.monaco.languages.registerDefinitionProvider("ripple", {
      provideDefinition: async (model, position, token) =>
        this.provideDefinition(model, position, token),
    });

    // Signature help provider
    this.monaco.languages.registerSignatureHelpProvider("ripple", {
      signatureHelpTriggerCharacters: ["(", ","],
      signatureHelpRetriggerCharacters: [","],
      provideSignatureHelp: async (model, position, token, context) =>
        this.provideSignatureHelp(model, position, token, context),
    });

    // Document highlight provider (highlights other occurrences of symbol)
    this.monaco.languages.registerDocumentHighlightProvider("ripple", {
      provideDocumentHighlights: async (model, position, token) =>
        this.provideDocumentHighlights(model, position, token),
    });

    // Reference provider
    this.monaco.languages.registerReferenceProvider("ripple", {
      provideReferences: async (model, position, context, token) =>
        this.provideReferences(model, position, context, token),
    });

    // Rename provider
    this.monaco.languages.registerRenameProvider("ripple", {
      provideRenameEdits: async (model, position, newName, token) =>
        this.provideRenameEdits(model, position, newName, token),
      resolveRenameLocation: async (model, position, token) =>
        this.resolveRenameLocation(model, position, token),
    });
  }

  private async getTypeScriptWorker(uri: Monaco.Uri): Promise<any> {
    const worker = await this.monaco.languages.typescript.getTypeScriptWorker();
    return worker(uri);
  }

  private async provideCompletions(
    model: Monaco.editor.ITextModel,
    position: Monaco.Position,
    context: Monaco.languages.CompletionContext,
    token: Monaco.CancellationToken,
  ): Promise<Monaco.languages.CompletionList | null> {
    const uri = model.uri.toString();
    const shadowFile = this.shadowFiles.get(uri);

    if (!shadowFile) return null;

    const offset = model.getOffsetAt(position);
    const tsOffset =
      shadowFile.transformResult.sourceMap.originalToGenerated(offset);

    try {
      const shadowUri = this.monaco.Uri.parse(shadowFile.uri);
      const client = await this.getTypeScriptWorker(shadowUri);

      const completions = await client.getCompletionsAtPosition(
        shadowFile.uri,
        tsOffset,
        {},
      );

      if (!completions || !completions.entries) return null;

      const word = model.getWordUntilPosition(position);
      const range: Monaco.IRange = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      // Add Ripple-specific completions
      const rippleCompletions = this.getRippleSpecificCompletions(
        model,
        position,
      );

      const suggestions: Monaco.languages.CompletionItem[] = [
        ...rippleCompletions,
        ...completions.entries.map((entry: any) =>
          this.convertCompletion(entry, range),
        ),
      ];

      return { suggestions };
    } catch (error) {
      console.error("Completion error:", error);
      return null;
    }
  }

  private getRippleSpecificCompletions(
    model: Monaco.editor.ITextModel,
    position: Monaco.Position,
  ): Monaco.languages.CompletionItem[] {
    const lineContent = model.getLineContent(position.lineNumber);
    const charBefore = lineContent[position.column - 2];

    const word = model.getWordUntilPosition(position);
    const range: Monaco.IRange = {
      startLineNumber: position.lineNumber,
      endLineNumber: position.lineNumber,
      startColumn: word.startColumn,
      endColumn: word.endColumn,
    };

    const completions: Monaco.languages.CompletionItem[] = [];

    // After @, suggest tracked variables in scope
    if (charBefore === "@") {
      // This would need proper scope analysis
      // For now, just provide some common suggestions
    }

    // After #, suggest tracked collection types
    if (charBefore === "#") {
      completions.push(
        {
          label: "[",
          kind: this.monaco.languages.CompletionItemKind.Snippet,
          insertText: "[$0]",
          insertTextRules:
            this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail: "Tracked Array",
          documentation: "Create a new tracked array: #[item1, item2]",
          range,
        },
        {
          label: "{",
          kind: this.monaco.languages.CompletionItemKind.Snippet,
          insertText: "{$0}",
          insertTextRules:
            this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail: "Tracked Object",
          documentation: "Create a new tracked object: #{key: value}",
          range,
        },
        {
          label: "set(",
          kind: this.monaco.languages.CompletionItemKind.Snippet,
          insertText: "set($0)",
          insertTextRules:
            this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail: "Tracked Set",
          documentation: "Create a new tracked set: #set(item1, item2)",
          range,
        },
        {
          label: "map(",
          kind: this.monaco.languages.CompletionItemKind.Snippet,
          insertText: "map($0)",
          insertTextRules:
            this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail: "Tracked Map",
          documentation: "Create a new tracked map: #map([key, value], ...)",
          range,
        },
      );
    }

    // Component keyword completion
    if (lineContent.trimStart().startsWith("comp")) {
      completions.push({
        label: "component",
        kind: this.monaco.languages.CompletionItemKind.Keyword,
        insertText: "component ${1:Name}(${2:props}) {\n\t$0\n}",
        insertTextRules:
          this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        detail: "Define a Ripple component",
        documentation: "Creates a new Ripple component with props",
        range,
      });
    }

    return completions;
  }

  private convertCompletion(
    entry: any,
    range: Monaco.IRange,
  ): Monaco.languages.CompletionItem {
    const kindMap: Record<string, Monaco.languages.CompletionItemKind> = {
      function: this.monaco.languages.CompletionItemKind.Function,
      method: this.monaco.languages.CompletionItemKind.Method,
      property: this.monaco.languages.CompletionItemKind.Property,
      variable: this.monaco.languages.CompletionItemKind.Variable,
      class: this.monaco.languages.CompletionItemKind.Class,
      interface: this.monaco.languages.CompletionItemKind.Interface,
      module: this.monaco.languages.CompletionItemKind.Module,
      keyword: this.monaco.languages.CompletionItemKind.Keyword,
      const: this.monaco.languages.CompletionItemKind.Constant,
      let: this.monaco.languages.CompletionItemKind.Variable,
      type: this.monaco.languages.CompletionItemKind.TypeParameter,
      enum: this.monaco.languages.CompletionItemKind.Enum,
      "enum member": this.monaco.languages.CompletionItemKind.EnumMember,
    };

    return {
      label: entry.name,
      kind:
        kindMap[entry.kind] || this.monaco.languages.CompletionItemKind.Text,
      insertText: entry.insertText || entry.name,
      detail: entry.kindModifiers,
      sortText: entry.sortText,
      range,
    };
  }

  private async provideHover(
    model: Monaco.editor.ITextModel,
    position: Monaco.Position,
    token: Monaco.CancellationToken,
  ): Promise<Monaco.languages.Hover | null> {
    const uri = model.uri.toString();
    const shadowFile = this.shadowFiles.get(uri);

    if (!shadowFile) return null;

    const offset = model.getOffsetAt(position);
    const tsOffset =
      shadowFile.transformResult.sourceMap.originalToGenerated(offset);

    try {
      const shadowUri = this.monaco.Uri.parse(shadowFile.uri);
      const client = await this.getTypeScriptWorker(shadowUri);

      const info = await client.getQuickInfoAtPosition(
        shadowFile.uri,
        tsOffset,
      );

      if (!info) return null;

      const displayParts = info.displayParts || [];
      const documentation = info.documentation || [];

      let signature = displayParts.map((p: any) => p.text).join("");

      // Clean up the signature for Ripple
      signature = this.cleanupTypeSignature(signature);

      const contents: Monaco.IMarkdownString[] = [];

      if (signature) {
        contents.push({
          value: "```typescript\n" + signature + "\n```",
        });
      }

      if (documentation.length > 0) {
        contents.push({
          value: documentation.map((d: any) => d.text).join("\n"),
        });
      }

      const word = model.getWordAtPosition(position);
      const range = word
        ? {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
          }
        : undefined;

      return { contents, range };
    } catch (error) {
      console.error("Hover error:", error);
      return null;
    }
  }

  private cleanupTypeSignature(signature: string): string {
    // Remove internal helper function references
    signature = signature.replace(/__rippleTrack__<([^>]+)>/g, "Tracked<$1>");
    signature = signature.replace(/TrackedValue<([^>]+)>/g, "Tracked<$1>");

    return signature;
  }

  private async provideDefinition(
    model: Monaco.editor.ITextModel,
    position: Monaco.Position,
    token: Monaco.CancellationToken,
  ): Promise<Monaco.languages.Definition | null> {
    const uri = model.uri.toString();
    const shadowFile = this.shadowFiles.get(uri);

    if (!shadowFile) return null;

    const offset = model.getOffsetAt(position);
    const tsOffset =
      shadowFile.transformResult.sourceMap.originalToGenerated(offset);

    try {
      const shadowUri = this.monaco.Uri.parse(shadowFile.uri);
      const client = await this.getTypeScriptWorker(shadowUri);

      const definitions = await client.getDefinitionAtPosition(
        shadowFile.uri,
        tsOffset,
      );

      if (!definitions || definitions.length === 0) return null;

      return definitions.map((def: any) => {
        // Map back to original file
        const defUri = def.fileName.replace(".tsx", ".ripple");
        const defShadowFile = this.findShadowFileByUri(def.fileName);

        let startOffset = def.textSpan.start;
        let endOffset = def.textSpan.start + def.textSpan.length;

        if (defShadowFile) {
          startOffset =
            defShadowFile.transformResult.sourceMap.generatedToOriginal(
              startOffset,
            );
          endOffset =
            defShadowFile.transformResult.sourceMap.generatedToOriginal(
              endOffset,
            );
        }

        const targetModel = this.monaco.editor.getModel(
          this.monaco.Uri.parse(defUri),
        );
        if (!targetModel) {
          return {
            uri: this.monaco.Uri.parse(defUri),
            range: {
              startLineNumber: 1,
              startColumn: 1,
              endLineNumber: 1,
              endColumn: 1,
            },
          };
        }

        const startPos = targetModel.getPositionAt(startOffset);
        const endPos = targetModel.getPositionAt(endOffset);

        return {
          uri: this.monaco.Uri.parse(defUri),
          range: {
            startLineNumber: startPos.lineNumber,
            startColumn: startPos.column,
            endLineNumber: endPos.lineNumber,
            endColumn: endPos.column,
          },
        };
      });
    } catch (error) {
      console.error("Definition error:", error);
      return null;
    }
  }

  private findShadowFileByUri(tsUri: string): ShadowFile | undefined {
    for (const [, shadowFile] of this.shadowFiles) {
      if (shadowFile.uri === tsUri) {
        return shadowFile;
      }
    }
    return undefined;
  }

  private async provideSignatureHelp(
    model: Monaco.editor.ITextModel,
    position: Monaco.Position,
    token: Monaco.CancellationToken,
    context: Monaco.languages.SignatureHelpContext,
  ): Promise<Monaco.languages.SignatureHelpResult | null> {
    const uri = model.uri.toString();
    const shadowFile = this.shadowFiles.get(uri);

    if (!shadowFile) return null;

    const offset = model.getOffsetAt(position);
    const tsOffset =
      shadowFile.transformResult.sourceMap.originalToGenerated(offset);

    try {
      const shadowUri = this.monaco.Uri.parse(shadowFile.uri);
      const client = await this.getTypeScriptWorker(shadowUri);

      const help = await client.getSignatureHelpItems(
        shadowFile.uri,
        tsOffset,
        {},
      );

      if (!help || !help.items || help.items.length === 0) return null;

      return {
        value: {
          signatures: help.items.map((item: any) => {
            const prefix = item.prefixDisplayParts
              .map((p: any) => p.text)
              .join("");
            const suffix = item.suffixDisplayParts
              .map((p: any) => p.text)
              .join("");
            const params = item.parameters.map((p: any) =>
              p.displayParts.map((d: any) => d.text).join(""),
            );

            return {
              label: prefix + params.join(", ") + suffix,
              parameters: item.parameters.map((p: any) => ({
                label: p.displayParts.map((d: any) => d.text).join(""),
                documentation: p.documentation
                  ?.map((d: any) => d.text)
                  .join("\n"),
              })),
              documentation: item.documentation
                ?.map((d: any) => d.text)
                .join("\n"),
            };
          }),
          activeSignature: help.selectedItemIndex,
          activeParameter: help.argumentIndex,
        },
        dispose: () => {},
      };
    } catch (error) {
      console.error("Signature help error:", error);
      return null;
    }
  }

  private async provideDocumentHighlights(
    model: Monaco.editor.ITextModel,
    position: Monaco.Position,
    token: Monaco.CancellationToken,
  ): Promise<Monaco.languages.DocumentHighlight[] | null> {
    const uri = model.uri.toString();
    const shadowFile = this.shadowFiles.get(uri);

    if (!shadowFile) return null;

    const offset = model.getOffsetAt(position);
    const tsOffset =
      shadowFile.transformResult.sourceMap.originalToGenerated(offset);

    try {
      const shadowUri = this.monaco.Uri.parse(shadowFile.uri);
      const client = await this.getTypeScriptWorker(shadowUri);

      const highlights = await client.getDocumentHighlights(
        shadowFile.uri,
        tsOffset,
        [shadowFile.uri],
      );

      if (!highlights || highlights.length === 0) return null;

      const result: Monaco.languages.DocumentHighlight[] = [];

      for (const fileHighlights of highlights) {
        for (const span of fileHighlights.highlightSpans) {
          const startOffset =
            shadowFile.transformResult.sourceMap.generatedToOriginal(
              span.textSpan.start,
            );
          const endOffset =
            shadowFile.transformResult.sourceMap.generatedToOriginal(
              span.textSpan.start + span.textSpan.length,
            );

          const startPos = model.getPositionAt(startOffset);
          const endPos = model.getPositionAt(endOffset);

          result.push({
            range: {
              startLineNumber: startPos.lineNumber,
              startColumn: startPos.column,
              endLineNumber: endPos.lineNumber,
              endColumn: endPos.column,
            },
            kind:
              span.kind === "writtenReference"
                ? this.monaco.languages.DocumentHighlightKind.Write
                : this.monaco.languages.DocumentHighlightKind.Read,
          });
        }
      }

      return result;
    } catch (error) {
      console.error("Document highlights error:", error);
      return null;
    }
  }

  private async provideReferences(
    model: Monaco.editor.ITextModel,
    position: Monaco.Position,
    context: Monaco.languages.ReferenceContext,
    token: Monaco.CancellationToken,
  ): Promise<Monaco.languages.Location[] | null> {
    const uri = model.uri.toString();
    const shadowFile = this.shadowFiles.get(uri);

    if (!shadowFile) return null;

    const offset = model.getOffsetAt(position);
    const tsOffset =
      shadowFile.transformResult.sourceMap.originalToGenerated(offset);

    try {
      const shadowUri = this.monaco.Uri.parse(shadowFile.uri);
      const client = await this.getTypeScriptWorker(shadowUri);

      const references = await client.getReferencesAtPosition(
        shadowFile.uri,
        tsOffset,
      );

      if (!references || references.length === 0) return null;

      return references.map((ref: any) => {
        const refUri = ref.fileName.replace(".tsx", ".ripple");
        const refShadowFile = this.findShadowFileByUri(ref.fileName);

        let startOffset = ref.textSpan.start;
        let endOffset = ref.textSpan.start + ref.textSpan.length;

        if (refShadowFile) {
          startOffset =
            refShadowFile.transformResult.sourceMap.generatedToOriginal(
              startOffset,
            );
          endOffset =
            refShadowFile.transformResult.sourceMap.generatedToOriginal(
              endOffset,
            );
        }

        const targetModel = this.monaco.editor.getModel(
          this.monaco.Uri.parse(refUri),
        );
        if (!targetModel) {
          return {
            uri: this.monaco.Uri.parse(refUri),
            range: {
              startLineNumber: 1,
              startColumn: 1,
              endLineNumber: 1,
              endColumn: 1,
            },
          };
        }

        const startPos = targetModel.getPositionAt(startOffset);
        const endPos = targetModel.getPositionAt(endOffset);

        return {
          uri: this.monaco.Uri.parse(refUri),
          range: {
            startLineNumber: startPos.lineNumber,
            startColumn: startPos.column,
            endLineNumber: endPos.lineNumber,
            endColumn: endPos.column,
          },
        };
      });
    } catch (error) {
      console.error("References error:", error);
      return null;
    }
  }

  private async provideRenameEdits(
    model: Monaco.editor.ITextModel,
    position: Monaco.Position,
    newName: string,
    token: Monaco.CancellationToken,
  ): Promise<Monaco.languages.WorkspaceEdit | null> {
    const uri = model.uri.toString();
    const shadowFile = this.shadowFiles.get(uri);

    if (!shadowFile) return null;

    const offset = model.getOffsetAt(position);
    const tsOffset =
      shadowFile.transformResult.sourceMap.originalToGenerated(offset);

    try {
      const shadowUri = this.monaco.Uri.parse(shadowFile.uri);
      const client = await this.getTypeScriptWorker(shadowUri);

      const renameInfo = await client.findRenameLocations(
        shadowFile.uri,
        tsOffset,
        false,
        false,
      );

      if (!renameInfo || renameInfo.length === 0) return null;

      const edits: Monaco.languages.IWorkspaceTextEdit[] = [];

      for (const location of renameInfo) {
        const locUri = location.fileName.replace(".tsx", ".ripple");
        const locShadowFile = this.findShadowFileByUri(location.fileName);

        let startOffset = location.textSpan.start;
        let endOffset = location.textSpan.start + location.textSpan.length;

        if (locShadowFile) {
          startOffset =
            locShadowFile.transformResult.sourceMap.generatedToOriginal(
              startOffset,
            );
          endOffset =
            locShadowFile.transformResult.sourceMap.generatedToOriginal(
              endOffset,
            );
        }

        const targetModel = this.monaco.editor.getModel(
          this.monaco.Uri.parse(locUri),
        );
        if (!targetModel) continue;

        const startPos = targetModel.getPositionAt(startOffset);
        const endPos = targetModel.getPositionAt(endOffset);

        edits.push({
          resource: this.monaco.Uri.parse(locUri),
          textEdit: {
            range: {
              startLineNumber: startPos.lineNumber,
              startColumn: startPos.column,
              endLineNumber: endPos.lineNumber,
              endColumn: endPos.column,
            },
            text: newName,
          },
          versionId: undefined,
        });
      }

      return { edits };
    } catch (error) {
      console.error("Rename error:", error);
      return null;
    }
  }

  private async resolveRenameLocation(
    model: Monaco.editor.ITextModel,
    position: Monaco.Position,
    token: Monaco.CancellationToken,
  ): Promise<Monaco.languages.RenameLocation | null> {
    const word = model.getWordAtPosition(position);

    if (!word) return null;

    return {
      text: word.word,
      range: {
        startLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endLineNumber: position.lineNumber,
        endColumn: word.endColumn,
      },
    };
  }

  dispose() {
    this.typesLib?.dispose();
    for (const [, shadowFile] of this.shadowFiles) {
      shadowFile.disposables.forEach((d) => d.dispose());
    }
    this.shadowFiles.clear();
  }
}

// Usage
export function initializeRippleIntelliSense(
  monaco: typeof Monaco = (window as any).monaco,
): RippleIntelliSense {
  console.log(monaco);
  return new RippleIntelliSense(monaco);
}
