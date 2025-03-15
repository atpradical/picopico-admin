module.exports = {
    extends: ['@it-incubator/eslint-config'],
    overrides: [
        {
            files: ['**/*.stories.tsx'],
            rules: {
                'no-console': 'off',
                'react-hooks/rules-of-hooks': 'off',
            },
        },
        // Добавляем правило для автогенерируемых файлов
        {
            files: [
                '**/schema.types.ts',    // все файлы schema.types.ts
                '**/generated/**/*.{ts,tsx}',   // все .ts файлы в папках generated
                '**/*.generated.{ts,tsx}',      // все файлы с суффиксом .generated.ts
                '**/graphql/**/*.{ts,tsx}',     // если используете graphql-codegen
            ],
            rules: {
                // для автогенерируемых файлов, например:
                '@typescript-eslint/no-explicit-any': 'off',
                // Здесь можно добавить и другие правила, которые стоит отключить
                '@typescript-eslint/no-unused-vars': 'off',
                'max-lines': 'off',
                'padding-line-between-statements': 'off',
                'perfectionist/sort-imports': 'off',
                'perfectionist/sort-intersection-types': 'off',
                'perfectionist/sort-object-types': 'off',
                'perfectionist/sort-union-types': 'off',
                'prettier/prettier': 'off'
            },
        },
    ],
}