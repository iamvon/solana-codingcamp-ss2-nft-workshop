mod state;
use {
    anchor_lang::prelude::*,
    anchor_spl::token::{self},
    state::*,
};

declare_id!("92Uesmw2wPEL9hHqTLmxSupCjKkr6nadWLUYKzjvQ8mg");

#[program]
pub mod nft_staking {
    use super::*;

    pub fn init_identifier(ctx: Context<InitIdentifier>) -> Result<()> {
        let identifier = &mut ctx.accounts.identifier;
        identifier.bump = *ctx.bumps.get("identifier").unwrap();
        identifier.count = 1;
        Ok(())
    }

    pub fn init_stake_pool(ctx: Context<InitStakePool>) -> Result<()> {
        let stake_pool = &mut ctx.accounts.stake_pool;
        let identifier = &mut ctx.accounts.identifier;
        stake_pool.bump = *ctx.bumps.get("stake_pool").unwrap();
        stake_pool.identifier = identifier.count;
        stake_pool.total_staked = 0;

        let identifier = &mut ctx.accounts.identifier;
        identifier.count += 1;
        Ok(())
    }

    pub fn stake(ctx: Context<Stake>, amount: u64) -> Result<()> {
        let stake_pool = &mut ctx.accounts.stake_pool;

        let cpi_accounts = token::Transfer {
            from: ctx.accounts.user_original_mint_ata.to_account_info(),
            to: ctx.accounts.stake_pool_original_mint_ata.to_account_info(),
            authority: ctx.accounts.user.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_context = CpiContext::new(cpi_program, cpi_accounts);
        token::transfer(cpi_context, amount)?;

        stake_pool.total_staked = stake_pool
            .total_staked
            .checked_add(amount.try_into().unwrap())
            .expect("increase total_staked error");
        Ok(())
    }

    pub fn unstake(ctx: Context<Unstake>) -> Result<()> {
        let stake_pool = &mut ctx.accounts.stake_pool;
        let identifier = &mut ctx.accounts.identifier;

        let binding = (identifier.count-1).to_le_bytes();
        // let binding = 14_u64.to_be_bytes();
        let stake_pool_seed = [
            STAKE_POOL_PREFIX.as_bytes(),
            binding.as_ref(),
            &[stake_pool.bump],
        ];
        let stake_pool_signer = &[&stake_pool_seed[..]];

        let cpi_accounts = token::Transfer {
            from: ctx.accounts.stake_pool_original_mint_ata.to_account_info(),
            to: ctx.accounts.user_original_mint_ata.to_account_info(),
            authority: stake_pool.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_context = CpiContext::new(cpi_program, cpi_accounts).with_signer(stake_pool_signer);
        token::transfer(cpi_context, stake_pool.total_staked)?;

        stake_pool.total_staked = stake_pool
            .total_staked
            .checked_sub(stake_pool.total_staked)
            .expect("decrease total_staked error");
        Ok(())
    }
}
