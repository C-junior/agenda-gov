# AgendaGov

Agenda oficial do Governador do Estado do Tocantins.

## Tecnologias utilizadas

- Vue.js 3 (Composition API)
- Vite
- Tailwind CSS
- Firebase (Firestore)

## Configuração do projeto

```bash
npm install
```

### Compilação e hot-reloads para desenvolvimento

```bash
npm run dev
```

### Compilação e minificação para produção

```bash
npm run build
```

### Visualização da build de produção localmente

```bash
npm run preview
```

## Estrutura do projeto

```
src/
├── assets/           # Imagens e outros assets
├── components/       # Componentes Vue reutilizáveis
├── composables/      # Funções reutilizáveis com Composition API
├── App.vue           # Componente raiz
└── main.js           # Ponto de entrada da aplicação
```

## Deploy no Vercel

Este projeto está configurado para deploy no Vercel como um PWA (Progressive Web App).

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente necessárias para o Firebase (se aplicável)
3. O Vercel irá automaticamente detectar o projeto Vue e fazer o build
4. O projeto será servido com as configurações de PWA

As configurações de rewrite estão incluídas no arquivo `vercel.json` para garantir que o roteamento do Vue Router funcione corretamente.

## Personalização da configuração

Veja [Vite Configuration Reference](https://vitejs.dev/config/) para mais informações.