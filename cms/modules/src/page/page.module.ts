import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { CoreModule, setAppInjector } from '@angular-cms/core';

import { SharedModule } from '../shared/shared.module';
import { PageTreeComponent } from './page-tree.component';
import { ContentModule } from '../content/content.module';
import { PageTreeService } from './page-tree.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        CoreModule,
        ContentModule,
        SharedModule,
        RouterModule
    ],
    declarations: [
        PageTreeComponent
    ],
    entryComponents: [
        PageTreeComponent
    ],
    exports: [
        PageTreeComponent
    ],
    providers: [PageTreeService]
})
export class PageModule {
    constructor(injector: Injector) {
        setAppInjector(injector);
    }
}
