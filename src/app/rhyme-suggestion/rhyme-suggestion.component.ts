import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'rhyme-suggestion',
  templateUrl: 'rhyme-suggestion.component.html',
  styleUrls: ['./rhyme-suggestion.component.scss']
})

export class RhymeSuggestionComponent implements OnInit {
  @Input() searchText: string;
  @Input() rhymeHints: string[];
  @Output() onRhymeSelected: EventEmitter<string> = new EventEmitter<string>();

  selectedWord: string;

  constructor() { }

  ngOnInit() { }

  onHintSelected(hint: string) {
    this.selectedWord = hint;
    this.onRhymeSelected.emit(hint);
  }

}