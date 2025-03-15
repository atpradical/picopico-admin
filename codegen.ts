import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  // Указываем где искать GraphQL операции (queries, mutations)
  documents: ['src/services/**/*.ts'],
  generates: {
    // Секция generates определяет, что и куда генерировать

    // Первая цель генерации - папка src/services/
    'src/services/': {
      config: {
        withHooks: true, // Генерировать React хуки (useQuery, useMutation)
      },
      // Плагины определяют, что именно генерировать
      plugins: [
        'typescript-operations', // Генерирует TypeScript типы для операций
        'typescript-react-apollo', // Генерирует React хуки для Apollo Client
      ],
      // Использовать пресет near-operation-file
      preset: 'near-operation-file', // Говорит генератору создавать файлы рядом с файлами запросов
      presetConfig: {
        // Путь к файлу с базовыми типами
        baseTypesPath: './schema.types.ts',
        // Расширение для сгенерированных файлов
        extension: '.generated.tsx',
      },
    },

    // Вторая цель - файл с базовыми типами GraphQL схемы
    // путь к файлу, который будет создан генератором
    'src/services/schema.types.ts': {
      // Генерирует только TypeScript типы из GraphQL схемы
      plugins: ['typescript'],
    },
  },

  // Не выдавать ошибку если документы не найдены
  ignoreNoDocuments: true,

  // URL GraphQL API, откуда брать схему
  schema: 'https://inctagram.work/api/v1/graphql',
}

export default config
