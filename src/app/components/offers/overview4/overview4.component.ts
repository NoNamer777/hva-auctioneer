import {Component, OnInit} from '@angular/core';
import {Offer} from '../../../models/offer';
import {OffersService} from '../../../services/offers.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-overview4',
  templateUrl: './overview4.component.html'
})
export class Overview4Component implements OnInit {
  public offers: Offer[];
  public selectedIndex: number;
  private queryParamsSubscription: Subscription = null;

  constructor(private offersService: OffersService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe((params: Params) => {
      console.log('detail setup id=' + params.id);
      if (params.id >= this.offersService.offers.length || params.id < -1) {
        this.setSelectedIndex(-1);
        this.changeQueryParam();
      } else {
        this.setSelectedIndex(params.id || -1);
      }
    });

    this.offers = this.offersService.offers;
  }

  addRandomOffer() {
    this.selectedIndex = this.offersService.addRandomOffer();
    this.changeQueryParam();
  }

  onClickRow(index) {
    if (this.offersService.hasChanges) {
      if (confirm('are you sure to discard edited changes')) {
        this.selectedIndex = index;
      }
    } else {
      this.selectedIndex = index;
    }

    this.changeQueryParam();
  }

  changeQueryParam() {
    this.router.navigate(['edit'], {
      relativeTo: this.activatedRoute,
      queryParams: {id: this.selectedIndex}
    });
  }

  private setSelectedIndex(id: number) {
    this.selectedIndex = id;
  }
}
