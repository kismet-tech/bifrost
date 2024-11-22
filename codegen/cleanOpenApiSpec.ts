import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";

// Types
export interface OpenAPISpec {
  paths?: Record<string, PathItem>;
  components?: {
    schemas?: Record<string, any>;
  };
  [key: string]: any;
}

interface PathItem {
  [method: string]: Operation;
}

interface Operation {
  tags?: string[];
  [key: string]: any;
}

function findReferencedSchemas(
  operation: any,
  referencedSchemas: Set<string>,
  allSchemas: Record<string, any>,
): void {
  if (typeof operation !== "object" || operation === null) {
    return;
  }

  if (Array.isArray(operation)) {
    operation.forEach((item) =>
      findReferencedSchemas(item, referencedSchemas, allSchemas),
    );
    return;
  }

  Object.entries(operation).forEach(([key, value]) => {
    if (
      key === "$ref" &&
      typeof value === "string" &&
      value.includes("#/components/schemas/")
    ) {
      const schemaName = value.split("/").pop()!;
      referencedSchemas.add(schemaName);
      const schemaDef = allSchemas[schemaName] || {};
      findReferencedSchemas(schemaDef, referencedSchemas, allSchemas);
    } else {
      findReferencedSchemas(value, referencedSchemas, allSchemas);
    }
  });
}

function removeDefaultEndpoints(
  specData: OpenAPISpec,
  removeUntagged: boolean = true,
): OpenAPISpec {
  const modifiedSpec: OpenAPISpec = JSON.parse(JSON.stringify(specData));
  const pathsToRemove: string[] = [];
  const pathsToModify: Record<string, Record<string, Operation>> = {};

  Object.entries(modifiedSpec.paths || {}).forEach(([path, methods]) => {
    let shouldRemovePath = true;
    const modifiedMethods: Record<string, Operation> = {};

    Object.entries(methods).forEach(([method, operation]) => {
      if (method.startsWith("x-")) {
        return;
      }

      const tags = operation.tags || [];
      const keepOperation =
        tags.length > 0
          ? tags.every((tag) => tag !== "default")
          : !removeUntagged;

      if (keepOperation) {
        shouldRemovePath = false;
        modifiedMethods[method] = operation;
      }
    });

    if (shouldRemovePath) {
      pathsToRemove.push(path);
    } else if (
      Object.keys(modifiedMethods).length !== Object.keys(methods).length
    ) {
      pathsToModify[path] = modifiedMethods;
    }
  });

  pathsToRemove.forEach((path) => {
    if (modifiedSpec.paths) {
      delete modifiedSpec.paths[path];
    }
  });

  Object.entries(pathsToModify).forEach(([path, methods]) => {
    if (modifiedSpec.paths) {
      modifiedSpec.paths[path] = methods;
    }
  });

  return modifiedSpec;
}

function cleanUnusedSchemas(specData: OpenAPISpec): OpenAPISpec {
  const allSchemas = specData.components?.schemas || {};
  const referencedSchemas = new Set<string>();

  Object.values(specData.paths || {}).forEach((pathItem) => {
    Object.values(pathItem).forEach((operation) => {
      if (typeof operation === "object" && operation !== null) {
        findReferencedSchemas(operation, referencedSchemas, allSchemas);
      }
    });
  });

  let prevSize = 0;
  while (referencedSchemas.size > prevSize) {
    prevSize = referencedSchemas.size;
    Array.from(referencedSchemas).forEach((schemaName) => {
      const schema = allSchemas[schemaName] || {};
      findReferencedSchemas(schema, referencedSchemas, allSchemas);
    });
  }

  const cleanedSpec = JSON.parse(JSON.stringify(specData));
  if (cleanedSpec.components?.schemas) {
    cleanedSpec.components.schemas = Object.fromEntries(
      Object.entries(cleanedSpec.components.schemas).filter(([name]) =>
        referencedSchemas.has(name),
      ),
    );
  }

  return cleanedSpec;
}

export function processOpenAPISpec(inputFilePath: string): void {
  try {
    // Read the input file
    const rawData = readFileSync(inputFilePath, "utf-8");
    let spec: OpenAPISpec = JSON.parse(rawData);

    // Process the specification
    spec = removeDefaultEndpoints(spec);
    spec = cleanUnusedSchemas(spec);

    // Generate output file path in the same directory
    const outputFilePath = join(dirname(inputFilePath), "processedSpec.json");

    // Write the processed specification
    writeFileSync(outputFilePath, JSON.stringify(spec, null, 2));

    console.log(`Successfully processed OpenAPI specification.
Input file: ${inputFilePath}
Output file: ${outputFilePath}`);
  } catch (error) {
    console.error(`Error processing OpenAPI specification: ${error}`);
    throw error;
  }
}
