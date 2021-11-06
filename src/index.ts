export default class SimpleAsyncLock {
	private _concurrency: number;
	private _available: {
		[key: string]: number;
	} = {};
	private _queue: {
		[key: string]: Array<(value?: any) => void>;
	} = {};

	constructor(concurrency: number = 1) {
		if (concurrency <= 0) throw new Error("Only positive number allowed!");
		this._concurrency = concurrency;
	}

	public lock = async (key?: string) => {
		key = key ? key : "_default";

		// Initialize at the first call
		if (!(key in this._available)) {
			this._available[key] = this._concurrency;
			this._queue[key] = [];
		}

		if (this.isLocked(key)) {
			// Waits for the lock to be disabled
			await new Promise((resolve) => {
				this._queue[key as string].push(resolve);
			});
		}

		this._available[key] -= 1;
	};

	public unlock = (key?: string) => {
		key = key ? key : "_default";

		if (this._available[key] < this._concurrency) this._available[key] += 1;

		const release = this._queue[key].shift();
		if (release) release();
	};

	public isLocked = (key?: string): boolean => {
		key = key ? key : "_default";
		return this._available[key] === 0;
	};
}
