# Como Gerenciar Papéis de Usuários no Firestore

Este guia explica como visualizar e alterar os papéis dos usuários no Firestore.

## Problema Comum

Os documentos de usuário no Firestore são criados automaticamente quando um usuário faz login pela primeira vez. Se você não vê usuários no Firestore, é porque eles ainda não fizeram login.

## Estrutura do Documento do Usuário

No Firestore, cada usuário é representado por um documento na coleção "users":
- **Coleção**: `users`
- **Documento**: ID do usuário (UID do Firebase Authentication)
- **Campos**:
  - `role`: Papel do usuário ("viewer" ou "register")
  - `email`: Email do usuário (para fácil identificação)

## Visualizando Usuários

1. Acesse o [Firebase Console](https://console.firebase.google.com/)
2. Selecione seu projeto
3. Clique em "Firestore Database" no menu lateral
4. Clique na coleção "users"
5. Você verá uma lista de documentos, cada um representando um usuário com seu email

## Forçando a Criação de Documentos de Usuário

Se você tem usuários no Firebase Authentication mas não vê seus documentos no Firestore:

1. Faça logout e login novamente com cada usuário
2. Isso automaticamente criará o documento do usuário no Firestore com o papel "viewer"

## Alterando o Papel de um Usuário

### Usando a Interface de Gerenciamento (Recomendado)

1. Faça login com a conta de administrador (por padrão, inglescursoone@gmail.com)
2. Clique no botão "Gerenciar Usuários" no cabeçalho
3. Na página de gerenciamento, você verá uma lista de usuários ordenada por email
4. Use os botões "Tornar Registrador" ou "Tornar Visualizador" para alterar os papéis
5. Clique no botão "Voltar" para retornar à página principal

### Alterando Manualmente no Firestore

1. No Firebase Console, na coleção "users", clique no documento do usuário que deseja modificar
2. Clique no ícone de edição (lápis) ao lado do campo "role"
3. Altere o valor para:
   - `viewer` para usuário comum (apenas visualização)
   - `register` para usuário com permissão para adicionar eventos
4. Clique em "Atualizar"

## Verificando o Funcionamento

Para verificar se está funcionando:

1. Faça login com um usuário
2. Verifique no Firebase Console se o documento do usuário foi criado na coleção "users"
3. Altere o papel do usuário no Firestore
4. Faça logout e login novamente
5. Verifique se as permissões do usuário mudaram (por exemplo, se agora ele pode adicionar eventos)

## Notas Importantes

- O UID do usuário no Firestore deve corresponder ao UID no Firebase Authentication
- Novos usuários recebem automaticamente o papel "viewer" por padrão
- As alterações de papel entram em vigor imediatamente após a atualização no Firestore
- A interface mostra os usuários ordenados por email para facilitar a identificação

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read access to events
    match /events/{eventId} {
      allow read: if true;
      // Only allow writes if the user has the 'register' role
      allow create, update, delete: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'register';
    }
    // Allow users to read their own role information
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if false; // Disallow clients from changing their own role
    }
  }
}