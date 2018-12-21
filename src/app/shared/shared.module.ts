import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonsModule, CardsFreeModule, CheckboxModule, IconsModule, InputsModule, WavesModule} from 'angular-bootstrap-md';
import { NgSelectModule } from '@ng-select/ng-select';
import {TableService} from './services/table.service';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ButtonsModule,
    CardsFreeModule,
    CheckboxModule,
    IconsModule,
    InputsModule,
    WavesModule,
    NgSelectModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    ButtonsModule,
    CardsFreeModule,
    CheckboxModule,
    IconsModule,
    InputsModule,
    WavesModule,
    NgSelectModule
  ],
  providers: [TableService]
})

export class SharedModule {}
