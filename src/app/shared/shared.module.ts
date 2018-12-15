import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonsModule, CardsFreeModule, CheckboxModule, IconsModule, InputsModule, WavesModule} from 'angular-bootstrap-md';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ButtonsModule,
    CardsFreeModule,
    CheckboxModule,
    IconsModule,
    InputsModule,
    WavesModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    ButtonsModule,
    CardsFreeModule,
    CheckboxModule,
    IconsModule,
    InputsModule,
    WavesModule
  ]
})

export class SharedModule {}
