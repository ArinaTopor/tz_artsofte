import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanySortComponent } from './components/company-sort/company-sort.component';
import { provideHttpClient } from '@angular/common/http';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LayoutComponent } from './components/layout/layout.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { CompanyItemComponent } from './components/company-item/company-item.component';
import { CompanyDetailComponent } from './components/company-detail/company-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CompanyFilterComponent } from './components/company-filter/company-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    CompanySortComponent,
    NotFoundComponent,
    LayoutComponent,
    CompanyListComponent,
    CompanyItemComponent,
    CompanyDetailComponent,
    CompanySortComponent,
    CompanyFilterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
