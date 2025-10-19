import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {SearchBarComponent} from './components/search-bar/search-bar.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {TextLengthPipe} from './pipes/text-length/text-length.pipe';
import {ReactiveFormsModule} from '@angular/forms';
import {HighlightKeywordPipe} from './pipes/highlight-keyword/highlight-keyword.pipe';
import {HighlightTruncatedDirective} from './directives/highlight-truncated/highlight-truncated.directive';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    SearchBarComponent,
    TextLengthPipe,
    HighlightKeywordPipe,
    HighlightTruncatedDirective
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    SearchBarComponent,
    MatCardModule,
    TextLengthPipe,
    HighlightKeywordPipe,
    HighlightTruncatedDirective,
    MatButtonModule
  ]
})
export class SharedModule {
}
