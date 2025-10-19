import {Component, Input} from '@angular/core';
import {IArticle} from '../../shared/models/article.model';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {ARROW_ICON, CALENDAR_ICON} from '../../../assets/icons/icons';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss'
})
export class ArticleCardComponent {
  @Input() article!: IArticle;
  @Input() keywords!: string[] | null;

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    this.iconRegistry.addSvgIconLiteral('calendar', this.sanitizer.bypassSecurityTrustHtml(CALENDAR_ICON));
    this.iconRegistry.addSvgIconLiteral('arrow', this.sanitizer.bypassSecurityTrustHtml(ARROW_ICON));
  }
}
