![](https://img.shields.io/badge/version-1.0.3-green.svg)

# SimpleAsyncLock

Synchronize the asynchronous for the protected resources in javascript.

## Install

### NPM

```sh
npm install simple-async-lock
```

### YARN

```sh
yarn add simple-async-lock
```

## Usage (ESM)

```js
import SimpleAsyncLock from "simple-async-lock";

// In case of mutex, `const mutex = new SimpleAsyncLock(1)`;
const semaphore = new SimpleAsyncLock(3);

const asyncTask = async () => {
	// Wait for the ongoing procedure finished
	await semaphore.lock();

	// Some procedure which should be protected to run synchronously
	const result = await some_func();

	// Let other tasks know the current task is finished
	semaphore.unlock();

	return result;
};

for (let i = 0; i < 100; i++) {
	asyncTask();
}
```

## MIT License

Copyright (c) 2021 Park ChangUk

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files
(the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify,
merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR
IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
