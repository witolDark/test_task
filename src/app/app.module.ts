import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import {ArticlesState} from './shared/store/articles.store';
import {HttpClientModule} from '@angular/common/http';
import {ShellModule} from './shell/shell.module';
import { TextLengthPipe } from './shared/pipes/text-length/text-length.pipe';
import { HighlightKeywordPipe } from './shared/pipes/highlight-keyword/highlight-keyword.pipe';
import { HighlightTruncatedDirective } from './shared/directives/highlight-truncated/highlight-truncated.directive';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxsModule.forRoot([ArticlesState], {developmentMode: /** !environment.production */ false}),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot()
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
