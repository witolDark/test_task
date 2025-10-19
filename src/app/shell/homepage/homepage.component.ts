import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ArticleService} from '../../shared/services/article/article.service';
import {Select, Store} from '@ngxs/store';
import {GetArticles, SetOffset} from '../../shared/store/articles.actions';
import {ArticlesState} from '../../shared/store/articles.store';
import {IArticle} from '../../shared/models/article.model';
import {Observable, Subject, takeUntil, withLatestFrom} from 'rxjs';
import {SharedModule} from '../../shared/shared-module';
import {ENTITIES_PER_PAGE} from '../../shared/constants';

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
