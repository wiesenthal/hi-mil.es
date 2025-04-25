# Code the feature before the language

A common mistake in software development is to write a language before coding the damn feature.

Do not do that.

Less abstractly, the temptation is to create a _framework_ for the feature before you build the feature.

For example:

### Do Not

```ts
// User wants to create an avatar with a unique name
// client has to handle retries
let name = "bob"
try {
  server.createAvatar(name);
} catch {
  server.createAvatar(name + crypto.randomUUID());
}
//server
function createAvatar(
  name: string,
  description?: string,
  additionalData?: Record<string, string>
) {
  // description and additionalData are unused for now, but we might want them later
  db.avatar.insert({ name, description, additionalData });
}

function readAvatar(name: string) {
  ...
}

function updateAvatar(
  name: string,
  description?: string,
  additionalData?: Record<string, string>
) {
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

In the **Do Not** example, the server framed the avatar, and let the client work with that structure to do what it needs to.  
An implicit aristotelian model of the avatar is created before the function to create an avatar is written.

In the **Do** example, the server tries to do exactly what the client is asking for.

Don't build the zoo before the animals.
