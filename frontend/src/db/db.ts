// Inspired by: https://dev.to/esponges/indexeddb-your-offline-and-serverless-db-in-your-browser-with-react-3hm7
export const DATABASE_NAME = 'ProcessM.DB';
let version = 1;

export enum STORES {
    Logs = 'logs',
    Models = 'models',
}

export const initDB = (): Promise<boolean> => {
    return new Promise((resolve) => {
        const request = indexedDB.open(DATABASE_NAME, version);

        request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
            const db = (event.target as IDBOpenDBRequest).result;

            if (!db.objectStoreNames.contains(STORES.Logs)) {
                db.createObjectStore(STORES.Logs, { keyPath: 'key' });
            }

            if (!db.objectStoreNames.contains(STORES.Models)) {
                db.createObjectStore(STORES.Models, { keyPath: 'key' });
            }
        };

        request.onsuccess = (event: Event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            version = db.version;

            resolve(true);
        };

        request.onerror = () => {
            resolve(false);
        };
    });
};

export const addData = <T>(
    storeName: string,
    data: T
): Promise<T | string | null> => {
    return new Promise((resolve) => {
        const request = indexedDB.open(DATABASE_NAME, version);

        request.onsuccess = (event: Event) => {
            const db = (event.target as IDBOpenDBRequest).result;

            const tx = db.transaction(storeName, 'readwrite');
            const store = tx.objectStore(storeName);
            store.add(data);
            resolve(data);
        };

        request.onerror = () => {
            const error = request.error?.message;

            if (error) {
                resolve(error);
            } else {
                resolve('Unknown  error');
            }
        };
    });
};

export const getStoreData = <T>(storeName: STORES): Promise<T[]> => {
    return new Promise((resolve) => {
        const request = indexedDB.open(DATABASE_NAME, version);

        request.onsuccess = (event: Event) => {
            const db = (event.target as IDBOpenDBRequest).result;

            const tx = db.transaction(storeName, 'readonly');
            const store = tx.objectStore(storeName);
            const res = store.getAll();

            res.onsuccess = () => {
                const returnValue = res.result.map((result) => result.data);
                resolve(returnValue);
            };
        };
    });
};

export const getStoreObject = <T>(
    storeName: STORES,
    key: string
): Promise<T> => {
    return new Promise((resolve) => {
        const request = indexedDB.open(DATABASE_NAME, version);

        request.onsuccess = (event: Event) => {
            const db = (event.target as IDBOpenDBRequest).result;

            const tx = db.transaction(storeName, 'readonly');
            const store = tx.objectStore(storeName);
            const res = store.get(key);

            res.onsuccess = () => {
                resolve(res.result?.data);
            };

            res.onerror = () => {
                throw new Error('Unable to fetch the model');
            };
        };

        request.onerror = () => {
            throw new Error('Unable to connect to the db');
        };
    });
};

export const deleteStoreData = (
    storeName: string,
    key: string
): Promise<boolean> => {
    return new Promise((resolve) => {
        const request = indexedDB.open(DATABASE_NAME, version);

        request.onsuccess = (event: Event) => {
            const db = (event.target as IDBOpenDBRequest).result;

            const tx = db.transaction(storeName, 'readwrite');
            const store = tx.objectStore(storeName);
            const res = store.delete(key);

            res.onsuccess = () => {
                resolve(true);
            };

            res.onerror = () => {
                resolve(false);
            };
        };
    });
};
