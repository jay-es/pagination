# @jay-es/pagination

A simple pagination utility, with humble operation ability.

## Installation

```bash
npm install @jay-es/pagination
```

## Usage

```javascript
import { paginate } from '@jay-es/pagination';

// Creates a pagination array, showing pages near current and omitting others.
const pagination = paginate(5, 20);
console.log(pagination);
// Output: [1, null, 4, 5, 6, null, 20]

// When the total number of pages is small, no ellipsis is used.
const pagination2 = paginate(3, 7);
console.log(pagination2);
// Output: [1, 2, 3, 4, 5, 6, 7]
```

## License

[MIT](LICENSE)
