import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Table from "./components/Table";
import Storage from "./storage";
import { Currency, Lockup } from "./types";
import { fetchNearPrice } from "./utils";

async function updateAll(lockups: Lockup[]): Promise<void> {
    await Promise.all(lockups.map((lockup) => lockup.update()));
    Storage.storeData(lockups);
}

export default function App() {
    const [nearPrice, setNearPrice] = useState(0.0);
    const [currency, setCurrency] = useState("NEAR" as Currency);
    const [lockups, setLockups] = useState(Storage.loadData());

    useEffect(() => {
        const inner = async () => {
            setNearPrice(await fetchNearPrice());
            await updateAll(lockups);
            setLockups(lockups);
        };
        inner();
    }, [nearPrice]);

    return (
        <div>
            <NavBar
                price={nearPrice}
                flipCurrency={() => {
                    if (currency === "NEAR") {
                        setCurrency("USDT");
                    } else {
                        setCurrency("NEAR");
                    }
                }}
                setLockups={setLockups}
            />
            <Table
                lockups={lockups}
                nearPrice={nearPrice}
                currency={currency}
            />
        </div>
    );
}
