import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {HomepageComponent} from './homepage/homepage.component';
import {DetailsComponent} from './details/details.component';
import {SharedModule} from '../shared/shared-module';
import {ShellComponent} from './shell.component';
import {RouterOutlet} from '@angular/router';
import {ShellRoutingModule} from './shell-routing.module';
import { ArticleCardComponent } from './article-card/article-card.component';
import {AppModule} from '../app.module';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [ShellComponent, HomepageComponent, DetailsComponent, ArticleCardComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterOutlet,
    ShellRoutingModule,
    MatProgressSpinner,
    NgOptimizedImage
  ],
  exports: [
    ShellComponent
  ]
})
export class ShellModule { }
