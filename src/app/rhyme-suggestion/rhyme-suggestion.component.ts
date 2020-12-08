import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ApplicationRef,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'rhyme-suggestion',
  templateUrl: 'rhyme-suggestion.component.html',
  styleUrls: ['./rhyme-suggestion.component.scss']
})

export class RhymeSuggestionComponent implements OnInit {
  @Input() searchText: string = null;
  @Input() isLoading: boolean;
  @Input() searchError: boolean;
  @Input() rhymeHints: string[];
  @Output() onRhymeSelected: EventEmitter<string> = new EventEmitter<string>();

  selectedWord: string;

  constructor(private applicationRef: ApplicationRef) { }

  ngOnInit() { }

  onHintSelected(hint: string) {
    this.selectedWord = hint;
    this.applicationRef.tick();
  }

}