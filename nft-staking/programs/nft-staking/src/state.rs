use anchor_spl::token::{Token, TokenAccount};

use {anchor_lang::prelude::*, anchor_spl::token::Mint};

pub const STAKE_POOL_PREFIX: &str = "stake-pool";
pub const IDENTIFIER_PREFIX: &str = "identifier";

// 5 Pubkeys for creators and collections
pub const STAKE_POOL_SIZE: usize = 8 + 1 + 8 + 1 + 32 + 32 * 5 + 256;
pub const IDENTIFIER_SIZE: usize = 8 + std::mem::size_of::<Identifier>() + 8;

#[derive(Accounts)]
pub struct InitIdentifier<'info> {
    #[account(
        init,
        payer = payer,
        space = IDENTIFIER_SIZE,
        seeds = [IDENTIFIER_PREFIX.as_bytes()],
        bump
    )]
    pub identifier: Account<'info, Identifier>,
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct InitStakePool<'info> {
    #[account(
        init,
        payer = payer,
        space = STAKE_POOL_SIZE,
        seeds = [STAKE_POOL_PREFIX.as_bytes(), identifier.count.to_le_bytes().as_ref()],
        bump
    )]
    pub stake_pool: Account<'info, StakePool>,
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account(mut)]
    pub identifier: Account<'info, Identifier>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Stake<'info> {
    #[account(mut)]
    pub stake_pool: Account<'info, StakePool>,
    #[account(mut)]
    pub stake_pool_original_mint_ata: Account<'info, TokenAccount>,
    pub original_mint: Account<'info, Mint>,
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut)]
    pub user_original_mint_ata: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct Unstake<'info> {
    #[account(mut)]
    pub stake_pool: Account<'info, StakePool>,
    #[account(mut)]
    pub stake_pool_original_mint_ata: Account<'info, TokenAccount>,
    pub original_mint: Account<'info, Mint>,
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut)]
    pub user_original_mint_ata: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
    pub identifier: Account<'info, Identifier>
}

#[account]
pub struct StakePool {
    pub bump: u8,
    pub identifier: u64,
    pub total_staked: u64
}

#[account]
pub struct Identifier {
    pub bump: u8,
    pub count: u64,
}
