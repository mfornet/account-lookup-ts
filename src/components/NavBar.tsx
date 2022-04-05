import { Disclosure } from "@headlessui/react";
import {
    PlusIcon,
    RefreshIcon,
    CurrencyDollarIcon,
} from "@heroicons/react/outline";

interface NavBarProps {
    price: number;
}

export default function NavBar(props: NavBarProps) {
    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between h-16">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
                        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="hidden sm:block sm:ml-6">
                                <div className="flex space-x-2 p-2">
                                    <p className="text-gray-300 rounded-md text-sm font-medium">
                                        NEAR:
                                    </p>
                                    <p className="text-gray-300 rounded-md text-sm font-medium">
                                        {props.price.toFixed(2)}$
                                    </p>
                                </div>
                            </div>
                            <input
                                type="text"
                                id="email-adress-icon"
                                className="block p-2 pl-10 pr-10 mr-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Lockup account id..."
                            />
                            <button
                                type="button"
                                className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white"
                            >
                                {/* TODO: Load new account */}
                                <PlusIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                />
                            </button>

                            <button
                                type="button"
                                className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white"
                            >
                                {/* TODO: Refresh all accounts */}
                                <RefreshIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                />
                            </button>

                            <button
                                type="button"
                                className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white"
                            >
                                {/* TODO: Change currency */}
                                <CurrencyDollarIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"></div>
                    </div>
                </div>
            )}
        </Disclosure>
    );
}
