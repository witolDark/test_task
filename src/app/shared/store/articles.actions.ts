export class GetArticles {
  static readonly type: string = 'get articles';

  constructor(public keywords?: string[]) {}
}

export class GetArticleById {
  static readonly type: string = 'get article by Id';

  constructor(public payload: number) {}
}

export class ClearSelectedArticle {
  static readonly type: string = 'clear selected selected';
}

export class SetSearchKeywords {
  static readonly type: string = 'set search keywords';

  constructor(public keywords: string[]) {}
}

export class SetOffset {
  static readonly type: string = 'set search keywords';

  constructor(public payload: number) {}
}
