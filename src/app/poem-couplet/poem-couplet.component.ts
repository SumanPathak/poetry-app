import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PoemCoupletService } from '../shared/poem-couplet/poem-couplet.service';
import { RhymeService } from '../shared/rhyme-service/rhyme.service';

@Component({
  selector: 'app-poem-couplet',
  templateUrl: './poem-couplet.component.html',
  styleUrls: ['./poem-couplet.component.scss']
})
export class PoemCoupletComponent implements OnInit {

  poetryForm : FormGroup = this.formBuilder.group({
    searchAuthor:  new FormControl("", Validators.required),
    searchTitle:  new FormControl({ value: "", disabled: true }, [
      Validators.required
    ])
  });
  poems = <any>[]; 
  authors = <any>[];
  titles = <any>[];
  public rhymeHints: string[] = [];
  public searchText: string = null;
  disabled: boolean = true;
  @Input() coupletLines: string = '';

  constructor(
    private service: PoemCoupletService,
    private rhymeService: RhymeService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {}

  onAuthorSelected(term) {
    if (!!term.target && term.target.value != '') {
      this.poetryForm.get('searchTitle').enable();
      this.service.searchAuthor(term.target.value).subscribe(
        data => {
          this.authors = data as any[];
          this.searchText = term.target.value;
          this.getRhymes(term.target.value);
      })
    } else {
      this.poetryForm.get('searchTitle').disable();
    }
  }

  onTitleSelected(term) {
    if (!!term.target && term.target.value != '') {
      this.service.searchTitle(term.target.value).subscribe(
        data => {
          this.titles = data as any[];
          this.getRhymes(term.target.value);
      })
    }
  }

  onSubmit() {
    this.service.searchPoem(this.poetryForm).subscribe(data => {
      this.poems = data as any[];
    })
  }

  getRhymes(wordToRhyme: string): void {
    this.searchText = wordToRhyme;
    this.rhymeService.searchRhyme(wordToRhyme)
      .subscribe((response) => {
        this.updateRhymeHints(response);
      });
  }

  updateRhymeHints(hints: string[]): void {
    this.rhymeHints = hints;
  }

  onRhymeSelected(rhyme: string) {
    this.coupletLines = this.coupletLines + ' ' + rhyme;
  }
}
