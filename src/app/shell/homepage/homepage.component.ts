import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {GetArticles} from '../../shared/store/articles.actions';
import {ArticlesState} from '../../shared/store/articles.store';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  public articles$ = this.store.select(ArticlesState.articles);
  public totalArticles$ = this.store.select(ArticlesState.totalArticles);
  public keywords$ = this.store.select(ArticlesState.searchKeywords);
  public isLoading$ = this.store.select(ArticlesState.isLoading);
  public destroy$: Subject<void> = new Subject<void>();

  public ngOnInit() {
    this.store.dispatch(new GetArticles());
  }

  public ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
