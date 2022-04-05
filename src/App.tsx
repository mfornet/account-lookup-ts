import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Table from "./components/Table";
import Storage from "./storage";
import { fetchNearPrice } from "./utils";

export default function App() {
    const [nearPrice, setNearPrice] = useState(0.0);

    useEffect(() => {
        const inner = async () => {
            setNearPrice(await fetchNearPrice());
            // await updateAll(false);
        };
        inner();
    }, [nearPrice]);

    const lockups = Storage.loadData();

    return (
        <div>
            <NavBar price={nearPrice} />
            <Table lockups={lockups} nearPrice={nearPrice} currency="USDT" />
        </div>
    );
}
