import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  documents: [
    './src/gql/*.graphql'
  ],
  generates: {
    './src/gql/sdk.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
      ],
      schema: './schema.graphql',
    }
  }
}
export default config
