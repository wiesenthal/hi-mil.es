# Code the feature before the language

A common mistake in software development is to write a language before coding the damn feature.

Do not do that.

Less abstractly, the temptation is to create a *framework* for the feature before you build the feature.

For example:


### Do Not
```ts
// User wants to create an avatar with a unique name
// client
server.createAvatar(name="bob");
//server
function createAvatar(name: string, description?: string, additionalData?: Record<string, string>) {

}

function readAvatar(name: string) {
  ...
}

function updateAvatar(name: string, description?: string, additionalData?: Record<string, string>) {
  ...
}

function deleteAvatar(name: string) {
  ...
}
```

### Do
```ts
// User wants to create an avatar with a unique name
// client
server.createAvatar(name="bob");
// server
function createAvatar(name: string) {
  if (!isUniqueAvatarName(name))
    name = name + crypto.randomUUID();
  
  db.avatar.insert({ name })
}

function isUniqueAvatarName(name: string) {
  return = db.avatar.findWhere({ name })
}
```


Don't build the zoo before the animals.
