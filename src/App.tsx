import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Table from "./components/Table";
import Storage from "./storage";
import { Lockup } from "./types";
import { fetchNearPrice } from "./utils";

async function updateAll(lockups: Lockup[]): Promise<void> {
    await Promise.all(lockups.map((lockup) => lockup.update()));
    Storage.storeData(lockups);
}

export default function App() {
    const [nearPrice, setNearPrice] = useState(0.0);
    const lockups = Storage.loadData();

    useEffect(() => {
        const inner = async () => {
            setNearPrice(await fetchNearPrice());
            await updateAll(lockups);
        };
        inner();
    }, [nearPrice]);

    return (
        <div>
            <NavBar price={nearPrice} />
            <Table lockups={lockups} nearPrice={nearPrice} currency="NEAR" />
        </div>
    );
}
