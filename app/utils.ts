// Helper Functions

export function createId() {
    /** Creates a new Random ID */
    return crypto.randomUUID()
}

type DebouncedFunction<T extends (...args: any[]) => any> = (...args: Parameters<T>) => void;

export function debounce<T extends (...args: any[]) => any>(func: T, timeout = 300): DebouncedFunction<T> {
    let timer: NodeJS.Timeout;

    return function (this: any, ...args: Parameters<T>): void {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}