import {Component, OnInit} from '@angular/core';
import {Offer} from '../../../models/offer';
import offers from '../../../../assets/offers.json';

@Component({
  selector: 'app-overview1',
  templateUrl: './overview1.component.html'

})
export class Overview1Component implements OnInit {
  public offers: Offer[];

  constructor() {
  }

  ngOnInit() {
    this.offers = offers;
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

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
