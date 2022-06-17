import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<void>;
  public isLoading: boolean;
  constructor(private readonly _sharedService: SharedService){
    this._unsubscribeAll = new Subject();
  }

  ngOnInit():void{
  this._sharedService.isLoading.pipe(
    takeUntil((this._unsubscribeAll)),
    tap(val => this.isLoading = val)
    ).subscribe();
  }
  
   /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
 
}
