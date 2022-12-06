export type NftStaking = {
  "version": "0.1.0",
  "name": "nft_staking",
  "instructions": [
    {
      "name": "initIdentifier",
      "accounts": [
        {
          "name": "identifier",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initStakePool",
      "accounts": [
        {
          "name": "stakePool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "identifier",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "stake",
      "accounts": [
        {
          "name": "stakePool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakePoolOriginalMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "originalMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userOriginalMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "stakePool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "identifier",
            "type": "u64"
          },
          {
            "name": "totalStaked",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "identifier",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "count",
            "type": "u64"
          }
        ]
      }
    }
  ]
};

export const IDL: NftStaking = {
  "version": "0.1.0",
  "name": "nft_staking",
  "instructions": [
    {
      "name": "initIdentifier",
      "accounts": [
        {
          "name": "identifier",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initStakePool",
      "accounts": [
        {
          "name": "stakePool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "identifier",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "stake",
      "accounts": [
        {
          "name": "stakePool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakePoolOriginalMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "originalMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userOriginalMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "stakePool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "identifier",
            "type": "u64"
          },
          {
            "name": "totalStaked",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "identifier",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "count",
            "type": "u64"
          }
        ]
      }
    }
  ]
};
