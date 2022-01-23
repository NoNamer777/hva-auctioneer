export class Offer {
  id: number;
  title: string;
  sellDate: Date;
  description: string;
  auctionStatus: AuctionStatus;
  numberOfBids: number;
  valueHighestBid: number;

  constructor(title, sellDate, description, auctionStatus, numberOfBids, valueHighestBid) {
    this.title = title;
    this.sellDate = sellDate;
    this.description = description;
    this.auctionStatus = auctionStatus;
    this.numberOfBids = numberOfBids;
    this.valueHighestBid = valueHighestBid;
  }

  static getAuctionStatus(index) {
    return AuctionStatus[index];
  }
}

export enum AuctionStatus {
  'NEW',
  'FOR_SALE',
  'SOLD',
  'PAID',
  'DELIVERED',
  'CLOSED',
  'EXPIRED',
  'WITHDRAWN'
}
