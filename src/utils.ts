import { BigNumber } from "@ethersproject/bignumber";
import { AccountId, Currency } from "./types";
import * as nearApi from "near-api-js";

export async function fetchNearPrice(): Promise<number> {
    const res = await fetch(
        "https://api.binance.com/api/v3/ticker/price?symbol=NEARUSDT"
    );
    const content = await res.json();
    return parseFloat(content.price as string);
}

export function formatLockupAccount(lockupAccount: AccountId) {
    return lockupAccount.substring(0, 4) + "..." + lockupAccount.substring(36);
}

export function formatOwnerAccount(ownerAccount: AccountId) {
    return ownerAccount.substring(0, 6) + "..." + ownerAccount.substring(60);
}

export function formatCurrency(
    value: BigNumber,
    currency: Currency,
    nearPrice: number
): string {
    if (currency === "NEAR") {
        return nearApi.utils.format.formatNearAmount(value.toString(), 2) + "Ⓝ";
    } else {
        // assert(currency === "USDT");
        const valueNear = parseFloat(
            nearApi.utils.format
                .formatNearAmount(value.toString())
                .replace(",", "")
        );
        return (
            "$" +
            (valueNear * nearPrice)
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        );
    }
}
