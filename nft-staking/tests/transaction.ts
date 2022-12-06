import { AnchorProvider, Program, Wallet, web3 } from "@project-serum/anchor"
import { Connection, PublicKey, Transaction } from "@solana/web3.js"
import { NFT_STAKING_PROGRAM_ID, STAKE_POOL_SEED, NFT_STAKING_PROGRAM, NFT_STAKING_IDL } from "./constants";
import { initPoolIdentifier, initStakePool } from "./instruction";
import { findIdentifierId, findStakePoolId } from "./pda";

export const initPoolIdentifierTx = async (
    connection: Connection,
    transaction: Transaction,
    wallet: Wallet,
): Promise<[Transaction, web3.PublicKey]> => {
    const [identifierId] = findIdentifierId()
    let initPoolIdentifierIx = await initPoolIdentifier(connection, wallet, {
        identifierId: identifierId
    })
    transaction.add(initPoolIdentifierIx)

    let hash = await connection.getLatestBlockhash("confirmed")
    transaction.recentBlockhash = hash.blockhash
    transaction.feePayer = wallet.publicKey

    return [transaction, identifierId]
}