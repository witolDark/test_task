import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {debounceTime, Subject, takeUntil} from 'rxjs';
import {FormControl} from '@angular/forms';
import {Store} from '@ngxs/store';
import {SEARCH_ICON} from '../../../../assets/icons/icons';
import {SetSearchQuery} from '../../store/articles.actions';
import {ArticlesState} from '../../store/articles.store';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent implements OnInit, OnDestroy {
  public searchControl: FormControl = new FormControl('');
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private store: Store, private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    this.iconRegistry.addSvgIconLiteral('search', this.sanitizer.bypassSecurityTrustHtml(SEARCH_ICON));
  }

  public ngOnInit(): void {
    this.searchControl.setValue(this.store.selectSnapshot(ArticlesState.searchQuery), {emitEvent: false});
    this.searchControl.valueChanges.pipe(debounceTime(800), takeUntil(this.destroy$)).subscribe(query => {
      this.store.dispatch(new SetSearchQuery(query));
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
