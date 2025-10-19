import {Action, Selector, State, StateContext} from '@ngxs/store';
import {IArticle} from '../models/article.model';
import {ClearSelectedArticle, GetArticleById, GetArticles, SetSearchKeywords} from './articles.actions';
import {ArticleService} from '../services/article/article.service';
import {catchError, concatMap, EMPTY, finalize, of, tap} from 'rxjs';
import {Injectable} from '@angular/core';
import {ENTITIES_PER_PAGE} from '../constants';

export interface ArticleStateModel {
  selectedArticle: IArticle | null;
  articles: IArticle[] | null;
  totalArticles: number;
  searchKeywords: string[];
  isLoading: boolean;
}

@State<ArticleStateModel>({
  name: 'articles',
  defaults: {
    selectedArticle: null,
    articles: null,
    totalArticles: 0,
    searchKeywords: [],
    isLoading: false
  }
})
@Injectable()
export class ArticlesState {
  constructor(private articleService: ArticleService) {
  }

  @Selector()
  static isLoading(state: ArticleStateModel) {
    return state.isLoading;
  }

  @Selector()
  static selectedArticle(state: ArticleStateModel) {
    return state.selectedArticle;
  }

  @Selector()
  static articles(state: ArticleStateModel) {
    return state.articles;
  }

  @Selector()
  static totalArticles(state: ArticleStateModel) {
    return state.totalArticles;
  }

  @Selector()
  static searchKeywords(state: ArticleStateModel) {
    return state.searchKeywords;
  }

  @Action(SetSearchKeywords)
  setSearchKeywords({dispatch, patchState}: StateContext<ArticleStateModel>, {keywords}: SetSearchKeywords) {
    patchState({searchKeywords: keywords});
    dispatch(new GetArticles());
  }

  @Action(GetArticles)
  getArticles({patchState, getState}: StateContext<ArticleStateModel>) {
    patchState({isLoading: true});

    const keywords = getState().searchKeywords;

    return this.articleService.getArticles({keywords}).pipe(
      concatMap(res => {
        patchState({articles: res.results, totalArticles: res.count});

        if (!keywords?.length) {
          return of(res);
        }

        return this.articleService.getArticles({
          keywords,
          limit: ENTITIES_PER_PAGE - res.results.length,
          searchByDescription: true
        }).pipe(
          tap(descRes => {
            patchState({
              articles: res.results.length < ENTITIES_PER_PAGE ? [...res.results, ...descRes.results] : res.results,
              totalArticles: res.count + descRes.count
            });
          })
        );
      }),
      catchError(() => {
        console.error('Error while getting articles');
        return EMPTY;
      }),
      finalize(() => patchState({isLoading: false}))
    );
  }

  @Action(GetArticleById)
  getArticleById({patchState}: StateContext<ArticleStateModel>, {payload}: GetArticleById) {
    patchState({isLoading: true});
    return this.articleService.getArticleById(payload).pipe(
      tap((res: IArticle) => {
        patchState({selectedArticle: res});
      }),
      catchError(() => {
        console.error('Error while getting article by id');
        return EMPTY;
      }),
      finalize(() => {
        patchState({isLoading: false});
      })
    );
  }

  @Action(ClearSelectedArticle)
  clearSelectedArticle({patchState}: StateContext<ArticleStateModel>) {
    patchState({selectedArticle: null});
  }
}
