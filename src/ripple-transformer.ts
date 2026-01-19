// ripple-transformer.ts

import { SourceMap, SourceMapping } from './ripple-source-map';

export interface TransformResult {
  code: string;
  sourceMap: SourceMap;
  errors: TransformError[];
}

export interface TransformError {
  message: string;
  offset: number;
  length: number;
}

interface Token {
  type: string;
  value: string;
  start: number;
  end: number;
}

export class RippleTransformer {
  private sourceMap: SourceMap;
  private output: string = '';
  private outputOffset: number = 0;
  private input: string = '';
  private inputOffset: number = 0;
  private errors: TransformError[] = [];

  transform(rippleCode: string): TransformResult {
    this.input = rippleCode;
    this.inputOffset = 0;
    this.output = '';
    this.outputOffset = 0;
    this.sourceMap = new SourceMap(rippleCode);
    this.errors = [];

    this.transformTopLevel();

    this.sourceMap.setGeneratedCode(this.output);

    return {
      code: this.output,
      sourceMap: this.sourceMap,
      errors: this.errors,
    };
  }

  private transformTopLevel() {
    while (this.inputOffset < this.input.length) {
      // Check for component keyword
      if (this.lookAhead('component ')) {
        this.transformComponent();
      }
      // Check for import/export statements (pass through)
      else if (this.lookAhead('import ') || this.lookAhead('export ')) {
        this.copyUntil(['\n', ';']);
        this.copyChar(); // include the delimiter
      }
      // Check for style blocks
      else if (this.lookAhead('<style>') || this.lookAhead('<style ')) {
        this.transformStyleBlock();
      }
      // Default: copy character as-is
      else {
        this.copyChar();
      }
    }
  }

  private transformComponent() {
    const startOffset = this.inputOffset;

    // Replace 'component' with 'function'
    this.skip('component'.length);
    this.emit('function', startOffset, 'component'.length, 'component');

    // Copy the rest until we find the opening brace
    this.copyUntil(['{']);

    // Transform the component body
    this.transformBlock();
  }

  private transformBlock() {
    if (this.currentChar() !== '{') {
      this.errors.push({
        message: 'Expected opening brace',
        offset: this.inputOffset,
        length: 1,
      });
      return;
    }

    this.copyChar(); // {

    let braceDepth = 1;

    while (this.inputOffset < this.input.length && braceDepth > 0) {
      const char = this.currentChar();

      if (char === '{') {
        braceDepth++;
        this.copyChar();
      } else if (char === '}') {
        braceDepth--;
        this.copyChar();
      }
      // Check for tracked variable declaration: let @name or const @name
      else if (this.lookAhead('let @') || this.lookAhead('const @') || this.lookAhead('var @')) {
        this.transformTrackedVariable();
      }
      // Check for tracked variable reference: @name
      else if (char === '@' && this.isIdentifierStart(this.peekChar(1))) {
        this.transformTrackedReference();
      }
      // Check for tracked array literal: #[
      else if (this.lookAhead('#[')) {
        this.transformTrackedArray();
      }
      // Check for tracked object literal: #{
      else if (this.lookAhead('#{')) {
        this.transformTrackedObject();
      }
      // Check for tracked set literal: #set(
      else if (this.lookAhead('#set(')) {
        this.transformTrackedSet();
      }
      // Check for tracked map literal: #map(
      else if (this.lookAhead('#map(')) {
        this.transformTrackedMap();
      }
      // Handle string literals (don't transform inside them)
      else if (char === '"' || char === "'" || char === '`') {
        this.copyString(char);
      }
      // Handle JSX/template sections
      else if (char === '<' && this.isJSXStart()) {
        this.transformJSX();
      }
      // Handle comments
      else if (this.lookAhead('//')) {
        this.copyUntil(['\n']);
      } else if (this.lookAhead('/*')) {
        this.copyUntil(['*/']);
        this.copyChar();
        this.copyChar();
      }
      // Default: copy as-is
      else {
        this.copyChar();
      }
    }
  }

  private transformTrackedVariable() {
    const startOffset = this.inputOffset;

    // Copy 'let', 'const', or 'var'
    const keyword = this.lookAhead('let ') ? 'let' : this.lookAhead('const ') ? 'const' : 'var';
    this.copyChars(keyword.length + 1); // keyword + space

    // Skip the @
    const atOffset = this.inputOffset;
    this.skip(1);

    // Get the variable name
    const nameStart = this.inputOffset;
    while (this.isIdentifierChar(this.currentChar())) {
      this.inputOffset++;
    }
    const varName = this.input.slice(nameStart, this.inputOffset);

    // Emit the variable name (without @)
    this.emit(varName, atOffset, varName.length + 1, 'tracked-var');

    // Look for type annotation
    this.skipWhitespace();
    let typeAnnotation = '';
    if (this.currentChar() === ':') {
      this.copyChar(); // :
      this.skipWhitespaceAndCopy();

      // Copy the type (this is simplified - real implementation needs proper parsing)
      const typeStart = this.outputOffset;
      while (
        this.inputOffset < this.input.length &&
        this.currentChar() !== '=' &&
        this.currentChar() !== ';' &&
        this.currentChar() !== '\n'
      ) {
        this.copyChar();
      }
      typeAnnotation = this.output.slice(typeStart).trim();
    }

    // Copy the = and the initial value
    this.skipWhitespaceAndCopy();
    if (this.currentChar() === '=') {
      this.copyChar(); // =
      this.skipWhitespaceAndCopy();

      // Wrap the initializer with __rippleTrack__
      const initStart = this.outputOffset;
      this.emit('__rippleTrack__(', this.inputOffset, 0, 'tracked-var');

      // Copy the initializer expression
      this.copyExpression();

      // Close the wrapper
      this.emit(')', this.inputOffset, 0, 'tracked-var');
    }
  }

  private transformTrackedReference() {
    const startOffset = this.inputOffset;

    // Skip the @
    this.skip(1);

    // Get the variable name
    const nameStart = this.inputOffset;
    while (this.isIdentifierChar(this.currentChar())) {
      this.inputOffset++;
    }
    const varName = this.input.slice(nameStart, this.inputOffset);

    // Check if this is an assignment target (e.g., @count = 5 or @count++)
    const afterName = this.inputOffset;
    this.skipWhitespace();

    const isAssignment = this.lookAhead('=') && !this.lookAhead('==') && !this.lookAhead('=>');
    const isIncDec = this.lookAhead('++') || this.lookAhead('--');
    const isCompoundAssign =
      this.lookAhead('+=') || this.lookAhead('-=') || this.lookAhead('*=') || this.lookAhead('/=');

    // Reset position
    this.inputOffset = afterName;

    if (isAssignment || isIncDec || isCompoundAssign) {
      // For assignments, we need to emit varName.value
      this.emit(varName + '.value', startOffset, varName.length + 1, 'tracked-var');
    } else {
      // For reads, emit varName.value
      this.emit(varName + '.value', startOffset, varName.length + 1, 'tracked-var');
    }
  }

  private transformTrackedArray() {
    const startOffset = this.inputOffset;

    // Skip #[
    this.skip(2);

    // Emit new TrackedArray([
    this.emit('new TrackedArray([', startOffset, 2, 'tracked-literal');

    // Copy array contents
    let bracketDepth = 1;
    while (this.inputOffset < this.input.length && bracketDepth > 0) {
      if (this.currentChar() === '[') {
        bracketDepth++;
        this.copyChar();
      } else if (this.currentChar() === ']') {
        bracketDepth--;
        if (bracketDepth === 0) {
          this.skip(1);
          this.emit('])', this.inputOffset - 1, 1, 'tracked-literal');
        } else {
          this.copyChar();
        }
      } else if (this.currentChar() === '@' && this.isIdentifierStart(this.peekChar(1))) {
        this.transformTrackedReference();
      } else {
        this.copyChar();
      }
    }
  }

  private transformTrackedObject() {
    const startOffset = this.inputOffset;

    // Skip #{
    this.skip(2);

    // Emit new TrackedObject({
    this.emit('new TrackedObject({', startOffset, 2, 'tracked-literal');

    // Copy object contents (similar to transformBlock but for objects)
    let braceDepth = 1;
    while (this.inputOffset < this.input.length && braceDepth > 0) {
      if (this.currentChar() === '{') {
        braceDepth++;
        this.copyChar();
      } else if (this.currentChar() === '}') {
        braceDepth--;
        if (braceDepth === 0) {
          this.skip(1);
          this.emit('})', this.inputOffset - 1, 1, 'tracked-literal');
        } else {
          this.copyChar();
        }
      } else if (this.currentChar() === '@' && this.isIdentifierStart(this.peekChar(1))) {
        this.transformTrackedReference();
      } else {
        this.copyChar();
      }
    }
  }

  private transformTrackedSet() {
    const startOffset = this.inputOffset;
    this.skip(5); // #set(
    this.emit('new TrackedSet([', startOffset, 5, 'tracked-literal');

    let parenDepth = 1;
    while (this.inputOffset < this.input.length && parenDepth > 0) {
      if (this.currentChar() === '(') {
        parenDepth++;
        this.copyChar();
      } else if (this.currentChar() === ')') {
        parenDepth--;
        if (parenDepth === 0) {
          this.skip(1);
          this.emit('])', this.inputOffset - 1, 1, 'tracked-literal');
        } else {
          this.copyChar();
        }
      } else if (this.currentChar() === '@' && this.isIdentifierStart(this.peekChar(1))) {
        this.transformTrackedReference();
      } else {
        this.copyChar();
      }
    }
  }

  private transformTrackedMap() {
    const startOffset = this.inputOffset;
    this.skip(5); // #map(
    this.emit('new TrackedMap([', startOffset, 5, 'tracked-literal');

    let parenDepth = 1;
    while (this.inputOffset < this.input.length && parenDepth > 0) {
      if (this.currentChar() === '(') {
        parenDepth++;
        this.copyChar();
      } else if (this.currentChar() === ')') {
        parenDepth--;
        if (parenDepth === 0) {
          this.skip(1);
          this.emit('])', this.inputOffset - 1, 1, 'tracked-literal');
        } else {
          this.copyChar();
        }
      } else if (this.currentChar() === '@' && this.isIdentifierStart(this.peekChar(1))) {
        this.transformTrackedReference();
      } else {
        this.copyChar();
      }
    }
  }

  private transformStyleBlock() {
    const startOffset = this.inputOffset;

    // Find the end of the style block
    const styleStart = this.input.indexOf('>', this.inputOffset) + 1;
    const styleEnd = this.input.indexOf('</style>', this.inputOffset);

    if (styleEnd === -1) {
      this.errors.push({
        message: 'Unclosed <style> tag',
        offset: startOffset,
        length: 7,
      });
      this.copyChar();
      return;
    }

    // Skip the entire style block and emit a comment placeholder
    const fullLength = styleEnd + '</style>'.length - this.inputOffset;
    this.skip(fullLength);
    this.emit('/* <style> block omitted for type checking */', startOffset, fullLength, 'template');
  }

  private transformJSX() {
    // JSX can be passed through mostly as-is since TypeScript understands it
    // We just need to handle @ references inside JSX

    let depth = 0;
    let inExpression = false;
    let expressionBraceDepth = 0;

    while (this.inputOffset < this.input.length) {
      const char = this.currentChar();

      if (inExpression) {
        if (char === '{') {
          expressionBraceDepth++;
          this.copyChar();
        } else if (char === '}') {
          expressionBraceDepth--;
          if (expressionBraceDepth === 0) {
            inExpression = false;
          }
          this.copyChar();
        } else if (char === '@' && this.isIdentifierStart(this.peekChar(1))) {
          this.transformTrackedReference();
        } else {
          this.copyChar();
        }
      } else {
        if (char === '{') {
          inExpression = true;
          expressionBraceDepth = 1;
          this.copyChar();
        } else if (char === '<') {
          if (this.lookAhead('</')) {
            // Closing tag
            this.copyUntil(['>']);
            this.copyChar();
            depth--;
            if (depth === 0) break;
          } else {
            // Opening tag
            depth++;
            this.copyChar();
          }
        } else if (char === '/' && this.peekChar(1) === '>') {
          // Self-closing tag
          this.copyChar(); // /
          this.copyChar(); // >
          depth--;
          if (depth === 0) break;
        } else if (char === '>') {
          this.copyChar();
        } else {
          this.copyChar();
        }
      }
    }
  }

  // Helper methods

  private currentChar(): string {
    return this.input[this.inputOffset] || '';
  }

  private peekChar(offset: number): string {
    return this.input[this.inputOffset + offset] || '';
  }

  private lookAhead(str: string): boolean {
    return this.input.slice(this.inputOffset, this.inputOffset + str.length) === str;
  }

  private skip(count: number) {
    this.inputOffset += count;
  }

  private copyChar() {
    const char = this.currentChar();
    this.output += char;
    this.sourceMap.addMapping({
      original: {
        line: this.getLine(this.inputOffset),
        column: this.getColumn(this.inputOffset),
        offset: this.inputOffset,
      },
      generated: {
        line: this.getOutputLine(),
        column: this.getOutputColumn(),
        offset: this.outputOffset,
      },
      length: 1,
      type: 'identity',
    });
    this.inputOffset++;
    this.outputOffset++;
  }

  private copyChars(count: number) {
    for (let i = 0; i < count; i++) {
      this.copyChar();
    }
  }

  private emit(
    str: string,
    originalOffset: number,
    originalLength: number,
    type: SourceMapping['type'],
  ) {
    this.sourceMap.addMapping({
      original: {
        line: this.getLine(originalOffset),
        column: this.getColumn(originalOffset),
        offset: originalOffset,
      },
      generated: {
        line: this.getOutputLine(),
        column: this.getOutputColumn(),
        offset: this.outputOffset,
      },
      length: Math.max(str.length, originalLength),
      type,
    });
    this.output += str;
    this.outputOffset += str.length;
  }

  private copyUntil(delimiters: string[]) {
    while (this.inputOffset < this.input.length) {
      for (const delim of delimiters) {
        if (this.lookAhead(delim)) {
          return;
        }
      }
      this.copyChar();
    }
  }

  private copyExpression() {
    // Copy a single expression (simplified - real implementation needs proper parsing)
    let depth = 0;
    while (this.inputOffset < this.input.length) {
      const char = this.currentChar();

      if ((char === ';' || char === ',' || char === '\n') && depth === 0) {
        break;
      }

      if (char === '(' || char === '[' || char === '{') {
        depth++;
      } else if (char === ')' || char === ']' || char === '}') {
        depth--;
        if (depth < 0) break;
      }

      if (char === '@' && this.isIdentifierStart(this.peekChar(1))) {
        this.transformTrackedReference();
      } else {
        this.copyChar();
      }
    }
  }

  private copyString(quote: string) {
    this.copyChar(); // opening quote

    if (quote === '`') {
      // Template literal - need to handle ${} expressions
      while (this.inputOffset < this.input.length) {
        if (this.currentChar() === '`') {
          this.copyChar();
          break;
        } else if (this.lookAhead('${')) {
          this.copyChar(); // $
          this.copyChar(); // {
          // Copy expression inside ${}
          let depth = 1;
          while (this.inputOffset < this.input.length && depth > 0) {
            if (this.currentChar() === '{') depth++;
            else if (this.currentChar() === '}') depth--;

            if (depth > 0) {
              if (this.currentChar() === '@' && this.isIdentifierStart(this.peekChar(1))) {
                this.transformTrackedReference();
              } else {
                this.copyChar();
              }
            }
          }
          if (this.currentChar() === '}') this.copyChar();
        } else if (this.currentChar() === '\\') {
          this.copyChar(); // backslash
          this.copyChar(); // escaped char
        } else {
          this.copyChar();
        }
      }
    } else {
      // Regular string
      while (this.inputOffset < this.input.length) {
        if (this.currentChar() === quote) {
          this.copyChar();
          break;
        } else if (this.currentChar() === '\\') {
          this.copyChar(); // backslash
          this.copyChar(); // escaped char
        } else {
          this.copyChar();
        }
      }
    }
  }

  private skipWhitespace() {
    while (this.inputOffset < this.input.length && /\s/.test(this.currentChar())) {
      this.inputOffset++;
    }
  }

  private skipWhitespaceAndCopy() {
    while (this.inputOffset < this.input.length && /\s/.test(this.currentChar())) {
      this.copyChar();
    }
  }

  private isIdentifierStart(char: string): boolean {
    return /[a-zA-Z_$]/.test(char);
  }

  private isIdentifierChar(char: string): boolean {
    return /[a-zA-Z0-9_$]/.test(char);
  }

  private isJSXStart(): boolean {
    // Check if this < is the start of JSX (not less-than operator)
    const nextChar = this.peekChar(1);
    return this.isIdentifierStart(nextChar) || nextChar === '>' || nextChar === '/';
  }

  private getLine(offset: number): number {
    let line = 1;
    for (let i = 0; i < offset && i < this.input.length; i++) {
      if (this.input[i] === '\n') line++;
    }
    return line;
  }

  private getColumn(offset: number): number {
    let column = 1;
    for (let i = offset - 1; i >= 0 && this.input[i] !== '\n'; i--) {
      column++;
    }
    return column;
  }

  private getOutputLine(): number {
    let line = 1;
    for (let i = 0; i < this.outputOffset && i < this.output.length; i++) {
      if (this.output[i] === '\n') line++;
    }
    return line;
  }

  private getOutputColumn(): number {
    let column = 1;
    for (let i = this.outputOffset - 1; i >= 0 && this.output[i] !== '\n'; i--) {
      column++;
    }
    return column;
  }
}
