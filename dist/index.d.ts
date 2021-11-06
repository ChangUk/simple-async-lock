export default class SimpleAsyncLock {
    private _concurrency;
    private _available;
    private _queue;
    constructor(concurrency?: number);
    lock: (key?: string | undefined) => Promise<void>;
    unlock: (key?: string | undefined) => void;
    isLocked: (key?: string | undefined) => boolean;
}
