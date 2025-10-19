import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ApiResponse, IArticle} from '../../models/article.model';
import {ENTITIES_PER_PAGE} from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private readonly apiUrl: string = 'https://api.spaceflightnewsapi.net/v4';

  constructor(private readonly http: HttpClient) {}

  public getArticles(options: { keywords?: string[], limit?: number, searchByDescription?: boolean }) {
    let params = new HttpParams().set('limit', options.limit ? options.limit : ENTITIES_PER_PAGE);
    if (options.keywords?.length) {
      options.keywords.map((key: string) => encodeURIComponent(key));
      const mappedKeywords = options.keywords.join(',')
      params = params.append(options.searchByDescription ? 'summary_contains_one' : 'title_contains_one', mappedKeywords);
    }
    return this.http.get<ApiResponse>(`${this.apiUrl}/articles/`, { params });
  }

  public getArticleById(id: number) {
    return this.http.get<IArticle>(`${this.apiUrl}/articles/${id}/`);
  }
}
