import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {ActivatedRoute} from '@angular/router';
import {filter, map, Subject, takeUntil} from 'rxjs';
import {ClearSelectedArticle, GetArticleById} from '../../shared/store/articles.actions';
import {ArticlesState} from '../../shared/store/articles.store';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {ARROW_ICON} from '../../../assets/icons/icons';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  public selectedArticle$ = this.store.select(ArticlesState.selectedArticle);
  public isLoading$ = this.store.select(ArticlesState.isLoading);
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute) {
    this.iconRegistry.addSvgIconLiteral('arrow', this.sanitizer.bypassSecurityTrustHtml(ARROW_ICON));
  }

  public ngOnInit() {
    this.activatedRoute.params.pipe(
      filter(Boolean),
      map(params => params['id']),
      takeUntil(this.destroy$)).subscribe(id => this.store.dispatch(new GetArticleById(id)));
  }

  public ngOnDestroy() {
    this.store.dispatch(new ClearSelectedArticle())
    this.destroy$.next();
    this.destroy$.complete();
  }
}
