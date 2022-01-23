import {Injectable} from '@angular/core';
import {Offer} from '../models/offer';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Offers2Service {
  readonly accessUrl = 'https://webf-auctioneer-is204-1.firebaseio.com/offers.json';
  public offers: Offer[] = [];
  private _hasChanges: boolean;

  constructor(private http: HttpClient) {
    this._hasChanges = false;
  }

  add(offer: Offer): number {
    const added = this.offers.push(offer) - 1;
    this.saveAllOffers();
    return added;
  }

  update(oIdx: number, offer: Offer) {
    this.offers[oIdx] = offer;
    this.saveAllOffers();
  }

  remove(oIdx: number): Offer {
    const removed = this.offers.splice(oIdx, 1)[0];
    this.saveAllOffers();
    return removed;
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

  public getAllOffers() {
    return this.http.get<Offer[]>(this.accessUrl);
  }

  private saveAllOffers() {
    this.http.put(this.accessUrl, this.offers)
      .subscribe(
        data => console.log('success', data),
        error => console.log('error put:', error.status + ' - ' + error.error)
      );
  }
}
