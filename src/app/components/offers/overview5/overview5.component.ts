import {Component, OnInit} from '@angular/core';
import {Offer} from '../../../models/offer';
import {OffersService} from '../../../services/offers.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-overview5',
  templateUrl: './overview5.component.html'
})
export class Overview5Component implements OnInit {
  public offers: Offer[];
  public selectedIndex: number;
  private paramsSubscription: Subscription = null;

  constructor(private offersService: OffersService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.paramsSubscription = this.activatedRoute.firstChild.params.subscribe((params: Params) => {
      console.log('overview setup id=' + params.id);
      if (+params.id >= this.offersService.offers.length || +params.id < -1) {
        this.setSelectedIndex(-1);
        this.changeRoute();
      } else {
        this.setSelectedIndex(params.id || -1);
      }
    });

    this.offers = this.offersService.offers;
  }

  addRandomOffer() {
    this.selectedIndex = this.offersService.addRandomOffer();
    this.changeRoute();
  }

  onClickRow(index) {
    if (this.offersService.hasChanges) {
      if (confirm('are you sure to discard edited changes')) {
        this.selectedIndex = index;
      }
    } else {
      this.selectedIndex = index;
    }

    this.changeRoute();
  }

  changeRoute() {
    this.router.navigate(['/offers/overview5', this.selectedIndex]);
  }

  private setSelectedIndex(id: number) {
    this.selectedIndex = id;
  }
}
