import { Subscription } from 'rxjs/Subscription';
import { SortService } from './../services/global/sort.service';
import { Directive, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[sortable-table]'
})
export class SortableTableDirective implements OnInit, OnDestroy {
  @Output()
  sorted = new EventEmitter();

  private columnSortedSubscription: Subscription;

  constructor(private sortService: SortService) { }

  ngOnInit() {
    this.columnSortedSubscription = this.sortService.columnSorted$.subscribe(event => {
      this.sorted.emit(event);
    });
  }

  ngOnDestroy() {
    this.columnSortedSubscription.unsubscribe();
  }

}
