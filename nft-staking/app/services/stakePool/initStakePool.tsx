import { AnchorProvider, Program } from "@project-serum/anchor"
import { PublicKey } from "@solana/web3.js"
import idl from "../../config/idl.json"

const PROGRAM_ID = new PublicKey(idl.metadata.address)

export const initStakePool = (provider: AnchorProvider) => {
    const program = new Program(idl, PROGRAM_ID, provider)

    await program.methods.initIdentifier()
}