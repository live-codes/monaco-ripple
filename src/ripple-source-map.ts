// source-map.ts

export interface SourceMapping {
  // Original Ripple position
  original: {
    line: number; // 1-based
    column: number; // 1-based
    offset: number; // 0-based character offset
  };
  // Transformed TypeScript position
  generated: {
    line: number;
    column: number;
    offset: number;
  };
  // Length of the mapped segment
  length: number;
  // Type of transformation applied
  type: 'identity' | 'tracked-var' | 'component' | 'tracked-literal' | 'template';
}

export class SourceMap {
  private mappings: SourceMapping[] = [];
  private originalCode: string;
  private generatedCode: string;

  constructor(originalCode: string) {
    this.originalCode = originalCode;
    this.generatedCode = '';
  }

  addMapping(mapping: SourceMapping) {
    this.mappings.push(mapping);
  }

  setGeneratedCode(code: string) {
    this.generatedCode = code;
  }

  // Convert original offset to generated offset
  originalToGenerated(offset: number): number {
    // Find the mapping that contains this offset
    for (const mapping of this.mappings) {
      if (offset >= mapping.original.offset && offset < mapping.original.offset + mapping.length) {
        const relativeOffset = offset - mapping.original.offset;
        return mapping.generated.offset + relativeOffset;
      }
    }

    // If no exact mapping, find the closest one and interpolate
    let closestBefore: SourceMapping | null = null;
    for (const mapping of this.mappings) {
      if (mapping.original.offset <= offset) {
        if (!closestBefore || mapping.original.offset > closestBefore.original.offset) {
          closestBefore = mapping;
        }
      }
    }

    if (closestBefore) {
      const delta = offset - (closestBefore.original.offset + closestBefore.length);
      return closestBefore.generated.offset + closestBefore.length + delta;
    }

    return offset;
  }

  // Convert generated offset to original offset
  generatedToOriginal(offset: number): number {
    for (const mapping of this.mappings) {
      if (
        offset >= mapping.generated.offset &&
        offset < mapping.generated.offset + mapping.length
      ) {
        const relativeOffset = offset - mapping.generated.offset;
        return mapping.original.offset + relativeOffset;
      }
    }

    let closestBefore: SourceMapping | null = null;
    for (const mapping of this.mappings) {
      if (mapping.generated.offset <= offset) {
        if (!closestBefore || mapping.generated.offset > closestBefore.generated.offset) {
          closestBefore = mapping;
        }
      }
    }

    if (closestBefore) {
      const delta = offset - (closestBefore.generated.offset + closestBefore.length);
      return closestBefore.original.offset + closestBefore.length + delta;
    }

    return offset;
  }

  // Map a range from generated to original
  generatedRangeToOriginal(start: number, end: number): { start: number; end: number } {
    return {
      start: this.generatedToOriginal(start),
      end: this.generatedToOriginal(end),
    };
  }
}
