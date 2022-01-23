import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {AuctionStatus, Offer} from '../../../models/offer';
import {FormBuilder, FormGroup} from '@angular/forms';
import {OffersService} from '../../../services/offers.service';
import {isEqual} from 'lodash';

@Component({
  selector: 'app-detail3',
  templateUrl: './detail3.component.html'
})
export class Detail3Component implements OnInit, OnChanges {
  @Input() editedOfferId: number;
  @Output() editedOfferIdChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() changeChildHasChanges: EventEmitter<boolean> = new EventEmitter<boolean>();

  form: FormGroup;
  auctionStatus = AuctionStatus;
  hasChanges = false;
  offer: Offer;

  constructor(private formBuilder: FormBuilder, private offersService: OffersService) {
  }

  ngOnInit() {
    this.offer = this.offersService.offers[this.editedOfferId];
    this.form = this.formBuilder.group(this.getOfferValue());
    this.onChangeForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.editedOfferId && this.form != null) {
      this.updateOffer();
    }
  }

  onChangeForm(): void {
    this.form.valueChanges.subscribe(value => {
      const hasChanges = !isEqual(value, this.getOfferValue());
      this.hasChanges = hasChanges;
      this.changeChildHasChanges.emit(hasChanges);
    });
  }

  getOfferValue(): object {
    this.offer = this.offersService.offers[this.editedOfferId];
    return {
      offerTitle: this.offer.title,
      offerDesc: this.offer.description,
      offerStatus: this.offer.auctionStatus,
      offerNumberBids: this.offer.numberOfBids,
      offerHighestBid: this.offer.valueHighestBid
    };
  }

  updateOffer() {
    this.form.setValue(this.getOfferValue());
  }

  saveOffer() {
    const newOfferData = this.form.getRawValue();
    const offer = new Offer(
      newOfferData.offerTitle,
      new Date(),
      newOfferData.offerDesc,
      newOfferData.offerStatus,
      newOfferData.offerNumberBids,
      newOfferData.offerHighestBid
    );
    this.offersService.update(this.editedOfferId, offer);
  }

  deleteOffer(): void {
    if (this.confirmUnsavedChanges()) {
      this.offersService.remove(this.editedOfferId);
      this.editedOfferIdChange.emit(null);
    }
  }

  clearOffer(): void {
    if (this.confirmUnsavedChanges()) {
      this.form.reset();
    }
  }

  resetOffer(): void {
    if (this.confirmUnsavedChanges()) {
      this.form.reset(this.getOfferValue());
    }
  }

  cancelOffer(): void {
    if (this.confirmUnsavedChanges()) {
      this.editedOfferIdChange.emit(null);
    }
  }

  confirmUnsavedChanges(): boolean {
    return (this.hasChanges) ? confirm('are you sure to discard edited changes') : true;
  }
}
