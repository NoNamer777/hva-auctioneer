import {Injectable} from '@angular/core';
import {Offer} from '../models/offer';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  public offers: Offer[];
  private _hasChanges: boolean;

  constructor() {
    this.offers = [];
    for (let i = 0; i < 6; i++) {
      this.addRandomOffer();
    }

    this._hasChanges = false;
  }

  add(offer: Offer): number {
    return this.offers.push(offer) - 1;
  }

  update(oIdx: number, offer: Offer) {
    this.offers[oIdx] = offer;
  }

  remove(oIdx: number): Offer {
    return this.offers.splice(oIdx, 1)[0];
  }

  addRandomOffer() {
    const numOffers = this.offers.length;
    return this.add(
      new Offer(
        'This great article offer-' + numOffers,
        new Date(),
        'Description offer-' + numOffers,
        Offer.getAuctionStatus(this.getRandomNumber(0, 7)),
        this.getRandomNumber(1, 20),
        this.getRandomNumber(0, 1000)
      )
    );
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  get hasChanges(): boolean {
    return this._hasChanges;
  }

  set hasChanges(value: boolean) {
    this._hasChanges = value;
  }
}
