import {
    PublicKey,
    TransactionInstruction,
    AddressLookupTableAccount,
    VersionedTransaction,
    TransactionMessage,
    Connection,
    AccountInfo,
  } from '@solana/web3.js';
  
  // Deserialize a base64-encoded instruction object into a Solana TransactionInstruction
  export const deserializeInstruction = (instruction: any): TransactionInstruction => {
    return new TransactionInstruction({
      programId: new PublicKey(instruction.programId),
      keys: instruction.accounts.map((key: any) => ({
        pubkey: new PublicKey(key.pubkey),
        isSigner: key.isSigner,
        isWritable: key.isWritable,
      })),
      data: Buffer.from(instruction.data, 'base64'),
    });
  };
  
  // Fetch address lookup table accounts from the Solana blockchain
  export const getAddressLookupTableAccounts = async (
    connection: Connection,
    keys: string[]
  ): Promise<AddressLookupTableAccount[]> => {
    const addressLookupTableAccounts = await connection.getMultipleAccountsInfo(
      keys.map((key) => new PublicKey(key))
    );
  
    return addressLookupTableAccounts.reduce<AddressLookupTableAccount[]>((acc, accountInfo, index) => {
      const addressLookupTableAddress = keys[index];
      if (accountInfo) {
        const addressLookupTableAccount = new AddressLookupTableAccount({
          key: new PublicKey(addressLookupTableAddress),
          state: AddressLookupTableAccount.deserialize(accountInfo.data),
        });
        acc.push(addressLookupTableAccount);
      }
      return acc;
    }, []);
  };
  