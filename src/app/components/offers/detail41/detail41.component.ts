import {Component, HostListener, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {AuctionStatus, Offer} from '../../../models/offer';
import {FormBuilder, FormGroup} from '@angular/forms';
import {OffersService} from '../../../services/offers.service';
import {isEqual} from 'lodash';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-detail41',
  templateUrl: './detail41.component.html'
})
export class Detail41Component implements OnInit, OnChanges, OnDestroy {
  form: FormGroup;
  auctionStatus = AuctionStatus;
  hasChanges = false;
  offer: Offer;
  offerId: number;

  private queryParamsSubscription: Subscription = null;

  constructor(private formBuilder: FormBuilder,
              private offersService: OffersService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe((params: Params) => {
      console.log('detail setup id=' + params.id);
      if (params.id !== -1) {
        this.getOfferToBeEdited(params.id);
      }
    });

    this.form = this.formBuilder.group(this.getOfferValue());
    this.form.valueChanges.subscribe(value => {
      this.offersService.hasChanges = this.hasChanges = !isEqual(value, this.getOfferValue());
    });
  }

  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.offer && this.form != null) {
      this.updateOffer();
    }
  }

  getOfferValue(): object {
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
    this.offersService.update(this.offerId, offer);
    this.offersService.hasChanges = this.hasChanges = false;
  }

  deleteOffer(): void {
    if (this.confirmUnsavedChanges()) {
      this.offersService.remove(this.offerId);
      this.changeRoute();
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
      this.changeRoute();
    }
  }

  confirmUnsavedChanges(): boolean {
    return (this.hasChanges) ? confirm('are you sure to discard edited changes') : true;
  }

  getOfferToBeEdited(id) {
    if (id !== -1) {
      this.offerId = id;
      this.offer = this.offersService.offers[id];
      if (this.form != null) {
        this.updateOffer();
      }
    }
  }

  changeRoute() {
    this.router.navigate(['/offers/overview41']);
  }

  @HostListener('window:beforeunload')
  canDeactivate(): boolean {
    if (this.confirmUnsavedChanges()) {
      this.offersService.hasChanges = false;
      return true;
    }
    return false;
  }
}
