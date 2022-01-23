import {Component, OnInit} from '@angular/core';
import {Offer} from '../../../models/offer';
import {OffersService} from '../../../services/offers.service';

@Component({
  selector: 'app-overview3',
  templateUrl: './overview3.component.html'
})
export class Overview3Component implements OnInit {
  public offers: Offer[];
  public selectedIndex: number;
  public childHasChanges = false;

  constructor(private offersService: OffersService) {
  }

  ngOnInit() {
    this.offers = this.offersService.offers;
    this.selectedIndex = 1;
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

  addRandomOffer() {
    this.selectedIndex = this.offersService.addRandomOffer();
  }

  onClickRow(index) {
    if (this.childHasChanges) {
      if (confirm('are you sure to discard edited changes')) {
        this.selectedIndex = index;
      }
    } else {
      this.selectedIndex = index;
    }
  }

  changeChildHasChanges(hasChanges: boolean) {
    this.childHasChanges = hasChanges;
  }
}
