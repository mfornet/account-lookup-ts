import { Lockup } from "./types";

const LOCKUPS_STORAGE_KEY = "__INFO";

export default class Storage {
    static loadData(): Lockup[] {
        const value = localStorage.getItem(LOCKUPS_STORAGE_KEY);

        if (value === null) {
            return [];
        } else {
            return (JSON.parse(value) as any[]).map((data) => {
                return Lockup.fromJson(data);
            });
        }
    }

    static storeData(lockups: Lockup[]) {
        localStorage.setItem(
            LOCKUPS_STORAGE_KEY,
            JSON.stringify(lockups.map((lockup) => lockup.toJson()))
        );
    }
}
