import {Component, OnInit} from '@angular/core';
import {Offer} from '../../../models/offer';
import offers from '../../../../assets/offers.json';

@Component({
  selector: 'app-overview2',
  templateUrl: './overview2.component.html'
})
export class Overview2Component implements OnInit {
  public offers: Offer[];
  public currentRow: number;

  constructor() {
  }

  ngOnInit() {
    this.offers = offers;
    this.currentRow = 1;
  }

  parseDate(date) {
    return (new Date(date)).toLocaleString(undefined, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  addRandomOffer() {
    const numOffers = this.offers.length;
    this.offers.push(
      new Offer(
        'This great article offer-' + numOffers, new Date(),
        'Description offer-' + numOffers,
        Offer.getAuctionStatus(this.getRandomNumber(0, 7)),
        this.getRandomNumber(1, 20),
        this.getRandomNumber(0, 1000)
      )
    );

    this.currentRow = numOffers;
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  onClickRow(index) {
    this.currentRow = index;
  }

  saveOffer(newOfferData) {
    const offer = this.offers[this.currentRow];
    offer.title = newOfferData.offerTitle;
    offer.description = newOfferData.offerDesc;
    offer.auctionStatus = newOfferData.offerStatus;
    offer.numberOfBids = newOfferData.offerNumberBids;
    offer.valueHighestBid = newOfferData.offerHighestBid;
  }

  deleteOffer() {
    this.offers.splice(this.currentRow, 1);
    this.currentRow = null;
  }
}
