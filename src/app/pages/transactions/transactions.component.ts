import { Component, OnInit } from '@angular/core';
import {
  Keypair,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  TransactionSignature,
  RpcResponseAndContext,
  SignatureResult,
  Cluster,
} from '@solana/web3.js';
import {
  sendAndConfirmTransaction,
  PublicKey,
} from '@solana/web3.js';
import { ConnectionService } from '../../connection.service';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  keypairOne!: Keypair;
  keypairTwo!: Keypair;
  transaction!: Transaction;

  //secret key from keypair necessery for signing transaction
  secretKey!: Keypair;
  //responses and confirmations:
  response!: TransactionSignature;
  confirmation!: RpcResponseAndContext<SignatureResult>;
  transactionResponse: Transaction | undefined;
  //choose network
  selectedNetwork: Cluster | any;
  //forms data

  transactionSender: string = '';
  transactionReceiver: string = '';
  transactionAmount: string = '';

  constructor(private connectionService: ConnectionService) {}
  ngOnInit(): void {
    //best option is to establish network when app is opened
    //generating keys at the moment is for learning purpose

    this.keypairOne = Keypair.generate();
    this.keypairTwo = Keypair.generate();
    this.transaction = new Transaction();
  }

  onSubmitTransaction(form: NgForm) {
    //check if possible to use array destructuring to reduce code length

    this.transactionSender = form.value.sender;
    this.transactionReceiver = form.value.receiver;
    this.transactionAmount = form.value.amount;

    if (form.value.sender == this.keypairOne.publicKey.toString()) {
      this.secretKey = this.keypairOne;
    } else {
      this.secretKey = this.keypairTwo;
    }
    
    let sender = new PublicKey(form.value.sender);
    let receiver = new PublicKey(form.value.receiver);
    let amount = Number(form.value.amount);
    //let signer = this.keypairOne.secretKey
    this.sendAndConfirm(sender, receiver, amount, this.secretKey);
  }

  async sendAndConfirm(
    sender: PublicKey,
    receiver: PublicKey,
    amount: number,
    keypair: Keypair
  ) {
    this.transactionResponse = await this.transaction.add(
      SystemProgram.transfer({
        fromPubkey: sender,
        toPubkey: receiver,
        lamports: amount,
      })
    );

    console.log(
      'Sending transaction(transaction Response)...:',
      this.transactionResponse
    );

    this.response = await sendAndConfirmTransaction(
      this.connectionService.connection,
      this.transaction,
      [keypair]
    );

    console.log('from (send and confirm transaction) response:', this.response);
  }
  //find another soloution with one function

  selectNetwork(network: Cluster) {
    this.connectionService.selectNetwork(network);
    this.selectedNetwork = network;
  }

  async activateAirdrop(number: Number) {
    console.log(LAMPORTS_PER_SOL);
    let airdropSignature =
      await this.connectionService.connection.requestAirdrop(
        number == 1 ? this.keypairOne.publicKey : this.keypairTwo.publicKey,
        LAMPORTS_PER_SOL
      );
    console.log(
      'Procceding to the confirmTransaction with airdropSignature!',
      airdropSignature
    );

    this.confirmation =
      await this.connectionService.connection.confirmTransaction(
        airdropSignature
      );
    console.log('Confirming airdrop:', this.confirmation);

   
  }
}
