import { BigNumber } from "@ethersproject/bignumber";

export type AccountId = string;
export type Currency = "NEAR" | "USDT";

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
}
