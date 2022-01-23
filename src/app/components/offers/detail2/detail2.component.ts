import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {AuctionStatus, Offer} from '../../../models/offer';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-detail2',
  templateUrl: './detail2.component.html'
})
export class Detail2Component implements OnInit, OnChanges {
  @Input() offer: Offer;
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  form: FormGroup;

  auctionStatus = AuctionStatus;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      offerTitle: this.offer.title,
      offerDesc: this.offer.description,
      offerStatus: this.offer.auctionStatus,
      offerNumberBids: this.offer.numberOfBids,
      offerHighestBid: this.offer.valueHighestBid
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.offer && this.form != null) {
      this.updateOfferValues(changes.offer);
    }
  }

  updateOfferValues(offer) {
    this.form.setValue({
      offerTitle: this.offer.title,
      offerDesc: this.offer.description,
      offerStatus: this.offer.auctionStatus,
      offerNumberBids: this.offer.numberOfBids,
      offerHighestBid: this.offer.valueHighestBid
    });
  }

  saveOffer() {
    this.save.emit(this.form.getRawValue());
  }

  deleteOffer() {
    this.delete.emit(this.form.getRawValue());
  }
}
