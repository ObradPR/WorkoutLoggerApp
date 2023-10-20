import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.css']
})
export class MessageModalComponent implements AfterViewInit {
  @Input() messageModal: string;
  @ViewChild('message', {static: true}) message: ElementRef; 

  constructor(){}

  ngAfterViewInit(): void {
    this.message.nativeElement.innerText = this.messageModal;
  }
}
