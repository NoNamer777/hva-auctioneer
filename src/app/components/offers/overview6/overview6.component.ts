import {Component, OnInit} from '@angular/core';
import {Offer} from '../../../models/offer';
import {Offers2Service} from '../../../services/offers2.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-overview6',
  templateUrl: './overview6.component.html'
})
export class Overview6Component implements OnInit {
  public offers: Offer[];
  public selectedIndex: number;
  private queryParamsSubscription: Subscription = null;
  isDataLoaded = false;

  constructor(private offersService: Offers2Service, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.offersService.getAllOffers().subscribe(
      data => {
        if (data === null || data.length === 0) {
          for (let i = 0; i < 5; i++) {
            this.addRandomOffer();
          }
        } else {
          this.offersService.offers = data;
        }

        this.isDataLoaded = true;

        this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe((params: Params) => {
          console.log('detail setup id=' + params.id);
          if (params.id >= this.offersService.offers.length || params.id < -1) {
            this.setSelectedIndex(-1);
            this.changeQueryParam();
          } else {
            this.setSelectedIndex(params.id || -1);
          }
        });
      },
      error => console.log('error get:', error.status + ' - ' + error.error)
    );
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
