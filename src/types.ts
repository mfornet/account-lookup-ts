import { BigNumber } from "@ethersproject/bignumber";
import * as nearAPI from "near-api-js";
import { Account } from "near-api-js";

export type AccountId = string;
export type U256 = string;
export type Currency = "NEAR" | "USDT";

const OPTIONS = {
    networkId: "mainnet",
    keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: "https://rpc.mainnet.near.org",
    walletUrl: "https://wallet.mainnet.near.org",
    helperUrl: "https://helper.mainnet.near.org",
    explorerUrl: "https://explorer.mainnet.near.org",
    headers: {},
};

export class Lockup {
    /// Account id of the lockup account
    accountId: AccountId;
    /// Account id of the owner of this lockup
    owner: AccountId;
    /// Pool where funds are deposited
    pool: AccountId;

    /// Total amount of tokens. Take into account locked, staked and rewards.
    /// To account for all rewards, the staking pool must be regularly updated.
    total: BigNumber;
    /// Amount of tokens locked
    locked: BigNumber;
    /// Amount of tokens available for use right now.
    liquid: BigNumber;
    /// Amount of tokens staked on the pool
    staked: BigNumber;

    constructor(
        accountId: AccountId,
        owner: AccountId,
        pool: AccountId,
        total: BigNumber,
        locked: BigNumber,
        liquid: BigNumber,
        staked: BigNumber
    ) {
        this.accountId = accountId;
        this.owner = owner;
        this.pool = pool;
        this.total = total;
        this.locked = locked;
        this.liquid = liquid;
        this.staked = staked;
    }

    static fromJson(data: any): Lockup {
        return new Lockup(
            data.lockup,
            data.owner,
            data.pool,
            BigNumber.from(data.total),
            BigNumber.from(data.locked),
            BigNumber.from(data.liquid),
            BigNumber.from(data.staked)
        );
    }

    toJson() {
        return {
            lockup: this.accountId,
            owner: this.owner,
            pool: this.pool,
            total: this.total.toString(),
            locked: this.locked.toString(),
            liquid: this.liquid.toString(),
            staked: this.staked.toString(),
        };
    }

    async update() {
        const near = await nearAPI.connect(OPTIONS);
        const account = await near.account(this.accountId);

        const lockupContract = new LockupContract(account, this.accountId);

        // Check if the contract is a valid lockup contract by checking the owner method

        try {
            this.owner = await lockupContract.get_owner_account_id();
        } catch (e: any) {
            const err_str = e.toString();
            if (err_str.indexOf("MethodNotFound") !== -1) {
                this.owner = "Account is not a valid Lockup";
            } else if (err_str.indexOf("CodeDoesNotExist") !== -1) {
                this.owner = "Account has no code deployed";
            } else {
                throw e;
            }
            return null;
        }

        this.pool = await lockupContract.get_staking_pool_account_id();
        this.locked = await lockupContract.get_locked_amount();
        this.total = await lockupContract.get_balance();
        this.liquid = await lockupContract.get_liquid_owners_balance();

        const stakingContract = new StakingContract(account, this.pool);

        this.staked = await stakingContract.staked(this.accountId);
    }
}

interface LockupInterface extends nearAPI.Contract {
    get_owner_account_id(): Promise<AccountId>;
    get_staking_pool_account_id(): Promise<AccountId>;
    get_locked_amount(): Promise<U256>;
    get_balance(): Promise<U256>;
    get_liquid_owners_balance(): Promise<U256>;
}

class LockupContract {
    contract: LockupInterface;

    constructor(account: Account, contractId: string) {
        this.contract = new nearAPI.Contract(account, contractId, {
            viewMethods: [
                "get_owner_account_id",
                "get_staking_pool_account_id",
                "get_locked_amount",
                "get_balance",
                "get_liquid_owners_balance",
            ],
            changeMethods: [],
        }) as LockupInterface;
    }

    async get_owner_account_id(): Promise<AccountId> {
        return await this.contract.get_owner_account_id();
    }

    async get_staking_pool_account_id(): Promise<AccountId> {
        return await this.contract.get_staking_pool_account_id();
    }

    async get_locked_amount(): Promise<BigNumber> {
        return BigNumber.from(await this.contract.get_locked_amount());
    }

    async get_balance(): Promise<BigNumber> {
        return BigNumber.from(await this.contract.get_balance());
    }

    async get_liquid_owners_balance(): Promise<BigNumber> {
        return BigNumber.from(await this.contract.get_liquid_owners_balance());
    }
}
interface StakingInterface extends nearAPI.Contract {
    get_account(args: {
        account_id: string;
    }): Promise<{ staked_balance: U256 }>;
}

class StakingContract {
    contract: StakingInterface;

    constructor(account: Account, contractId: string) {
        this.contract = new nearAPI.Contract(account, contractId, {
            viewMethods: ["get_account"],
            changeMethods: [],
        }) as StakingInterface;
    }

    async get_account(accountId: AccountId): Promise<{ staked_balance: U256 }> {
        return await this.contract.get_account({ account_id: accountId });
    }

    async staked(accountId: AccountId): Promise<BigNumber> {
        return BigNumber.from(
            (await this.get_account(accountId)).staked_balance
        );
    }
}
