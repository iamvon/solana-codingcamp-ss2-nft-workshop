import { findIdentifierId } from "./pda"

export const getPoolIdentifier = () => {
    const [identifierId] = findIdentifierId()
    
}