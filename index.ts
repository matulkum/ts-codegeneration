import ts from 'typescript'

function createPropertySignature(p: {modifiers?: ReadonlyArray<ts.Modifier>, name: ts.PropertyName | string, questionToken?: ts.QuestionToken, type?: ts.TypeNode, initializer?: ts.Expression}) {
  return ts.createPropertySignature(
    p.modifiers,
    p.name,
    p.questionToken,
    p.type,
    p.initializer,
  )  
}

const StringType = ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)

const t = ts.createInterfaceDeclaration(
  undefined,
  [ts.createModifier(ts.SyntaxKind.ExportKeyword)],
  'IGeneratedInterface',
  undefined,
  undefined,
  [
    createPropertySignature({
      name: 'better',
      type: StringType,
    }),
    createPropertySignature({
      name: 'object',
      type: ts.createTypeLiteralNode([
        createPropertySignature({name: 'obje', type: StringType})
      ]),
    }),
  ]
)


// const p = createPropertySignature({name: 's', type: ts.createTypeReferenceNode('IGeneratedInterface', [])})

const resultFile = ts.createSourceFile('temp.ts', '', ts.ScriptTarget.Latest, false, ts.ScriptKind.TS)
const printer = ts.createPrinter({newLine: ts.NewLineKind.LineFeed})
console.log(printer.printNode(ts.EmitHint.Unspecified, t, resultFile))