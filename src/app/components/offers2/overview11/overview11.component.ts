import {Component, OnInit} from '@angular/core';
import {Offer} from '../../../models/offer';
import {Offers11Service} from '../../../services2/offers11.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-overview11',
  templateUrl: './overview11.component.html'
})
export class Overview11Component implements OnInit {
  public offers: Offer[];
  public selectedIndex;
  private queryParamsSubscription: Subscription = null;
  isDataLoaded = false;

  constructor(private offersService: Offers11Service, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.offersService.getAllOffers().subscribe(
      data => {
        this.offersService.offers = data;
        this.isDataLoaded = true;
        console.log(data);

        this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe((params: Params) => {
          console.log('detail setup id=' + params.id);
          if (params.id >= this.offersService.offers.length || params.id < -1) {
            this.setSelectedIndex(-1);
            this.changeQueryParam();
          } else {
            this.setSelectedIndex(params.id || -1);
          }
        });
      }, error => console.log('error get:', error.status + ' - ' + error.error)
    );
  }

  addRandomOffer() {
    this.offersService.addRandomOffer().subscribe((data: Offer) => {
      this.offersService.offers.push(data);
      this.selectedIndex = data.id;
      this.changeQueryParam();
    }, err => {
      console.log(err);
      this.selectedIndex = -1;
    });
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
