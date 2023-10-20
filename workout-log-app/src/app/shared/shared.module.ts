import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundNumberPipe } from '../pipes/round-number.pipe';
import { MessageModalComponent } from '../message-modal/message-modal.component';

@NgModule({
  declarations: [RoundNumberPipe, MessageModalComponent],
  imports: [CommonModule],
  exports: [RoundNumberPipe, MessageModalComponent],
})
export class SharedModule {}
