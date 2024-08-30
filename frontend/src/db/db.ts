// Inspired by: https://dev.to/esponges/indexeddb-your-offline-and-serverless-db-in-your-browser-with-react-3hm7
export const DATABASE_NAME = 'ProcessM.DB';
let db: IDBDatabase;
let version = 1;
let request: IDBOpenDBRequest;

export enum STORES {
    Logs = 'logs',
}

export const initDB = (): Promise<boolean> => {
    return new Promise((resolve) => {
        request = indexedDB.open(DATABASE_NAME);

        request.onupgradeneeded = () => {
            db = request.result;

            if (!db.objectStoreNames.contains(STORES.Logs)) {
                console.log('Creating logs store');
                db.createObjectStore(STORES.Logs, { keyPath: 'key' });
            }
        };

        request.onsuccess = () => {
            db = request.result;
            version = db.version;

            console.log('This is the request.onsuccess - initDb', version);
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
        request = indexedDB.open(DATABASE_NAME, version);

        request.onsuccess = () => {
            console.log('request.onsuccess - addData', data);
            db = request.result;

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
        request = indexedDB.open(DATABASE_NAME, version);

        request.onsuccess = () => {
            console.log('request.onsuccess - getAllData');
            db = request.result;

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
        request = indexedDB.open(DATABASE_NAME, version);

        request.onsuccess = () => {
            db = request.result;

            const tx = db.transaction(storeName, 'readonly');
            const store = tx.objectStore(storeName);
            const res = store.get(key);

            res.onsuccess = () => {
                resolve(res.result.data);
            };
        };
    });
};

export const deleteStoreData = (
    storeName: string,
    key: string
): Promise<boolean> => {
    return new Promise((resolve) => {
        request = indexedDB.open(DATABASE_NAME, version);

        request.onsuccess = () => {
            console.log('request.onsuccess - deleteData', key);
            db = request.result;

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
