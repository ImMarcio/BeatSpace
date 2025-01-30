import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser'; 

import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

import { FloatLabelModule } from 'primeng/floatlabel';

import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    CarouselModule,
    TagModule,
    ButtonModule,
    FormsModule,
    FloatLabelModule,
    RouterModule,
    RouterOutlet
    
    
  ]
})
export class ContentUtilsModule { }
