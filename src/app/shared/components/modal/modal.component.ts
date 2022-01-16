import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy {
  constructor() {}
  @Input() type: string = '';
  @Input() body: string = '';
  @Output() closeMeEvent = new EventEmitter();

  ngOnInit(): void {
    console.log('Modal init');
  }

  closeMe() {
    this.closeMeEvent.emit();
  }

  ngOnDestroy(): void {
    console.log('Modal destroyed');
  }

}