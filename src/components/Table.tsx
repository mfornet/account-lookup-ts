import { Currency, Lockup } from "../types";
import {
    formatCurrency,
    formatLockupAccount,
    formatOwnerAccount,
} from "../utils";

interface GenericTable {
    lockups: Lockup[];
    nearPrice: number;
    currency: Currency;
}

const HEADER = ["#", "Account", "Owner", "Total", "Locked", "Staked", "Pool"];

export default function Table(props: GenericTable) {
    return (
        <div className="flex flex-col font-mono ">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full">
                            <thead className="bg-white border-b">
                                <tr>
                                    {HEADER.map((name, index) => {
                                        return (
                                            <th
                                                key={index}
                                                scope="col"
                                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                            >
                                                {name}
                                            </th>
                                        );
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {props.lockups.map((lockup, index) => {
                                    return (
                                        <tr
                                            key={index}
                                            className={
                                                (index % 2 === 0
                                                    ? "bg-gray-100"
                                                    : "bg-white") +
                                                " border-b hover:bg-gray-50"
                                            }
                                        >
                                            <td
                                                key="index"
                                                className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                                            >
                                                {index + 1}
                                            </td>
                                            <td
                                                key="account"
                                                className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                                            >
                                                {formatLockupAccount(
                                                    lockup.accountId
                                                )}{" "}
                                                <button>📋</button>
                                            </td>
                                            <td
                                                key="owner"
                                                className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                                            >
                                                {formatOwnerAccount(
                                                    lockup.owner
                                                )}
                                                {/* TODO */}
                                                <button>📋</button>
                                            </td>
                                            <td
                                                key="total"
                                                className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                                            >
                                                {formatCurrency(
                                                    lockup.total,
                                                    props.currency,
                                                    props.nearPrice
                                                )}
                                            </td>
                                            <td
                                                key="locked"
                                                className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                                            >
                                                {formatCurrency(
                                                    lockup.locked,
                                                    props.currency,
                                                    props.nearPrice
                                                )}
                                            </td>
                                            <td
                                                key="staked"
                                                className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                                            >
                                                {formatCurrency(
                                                    lockup.staked,
                                                    props.currency,
                                                    props.nearPrice
                                                )}
                                            </td>
                                            <td
                                                key="pool"
                                                className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                                            >
                                                {lockup.pool}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
