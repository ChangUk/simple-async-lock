(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.SimpleAsyncLock = factory());
})(this, (function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    class SimpleAsyncLock {
        constructor(concurrency = 1) {
            this._available = {};
            this._queue = {};
            this.lock = (key) => __awaiter(this, void 0, void 0, function* () {
                key = key ? key : "_default";
                // Initialize at the first call
                if (!(key in this._available)) {
                    this._available[key] = this._concurrency;
                    this._queue[key] = [];
                }
                if (this.isLocked(key)) {
                    // Waits for the lock to be disabled
                    yield new Promise((resolve) => {
                        this._queue[key].push(resolve);
                    });
                }
                this._available[key] -= 1;
            });
            this.unlock = (key) => {
                key = key ? key : "_default";
                if (this._available[key] < this._concurrency)
                    this._available[key] += 1;
                const release = this._queue[key].shift();
                if (release)
                    release();
            };
            this.isLocked = (key) => {
                key = key ? key : "_default";
                return this._available[key] === 0;
            };
            if (concurrency <= 0)
                throw new Error("Only positive number allowed!");
            this._concurrency = concurrency;
        }
    }

    return SimpleAsyncLock;

}));
