# zodfig

Type-safe, hierarchical, modular config handling with Zod.

## Installation

To install the package, run:

```sh
npm install zodfig
```

## Usage

Here is an example of how to use the `zodfig` function:

```typescript
import { z } from "zod";
import { zodfig } from "zodfig";

const schema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().min(1).max(65535),
});

const config = zodfig(schema).read();

console.log(config);
```

## Development

To run tests, use:

```sh
npm test
```

To check linting, use:

```sh
npm run lint-check
```

To fix linting issues, use:

```sh
npm run lint
```

To check formatting, use:

```sh
npm run format-check
```

To format the code, use:

```sh
npm run format
```

## License

This project is licensed under the terms of the Apache License 2.0. See the [LICENSE](LICENSE) file for details.
