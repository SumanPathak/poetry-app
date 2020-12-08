import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PoemCoupletService } from '../shared/poem-couplet/poem-couplet.service';
import { RhymeService } from '../shared/rhyme-service/rhyme.service';

@Component({
  selector: 'app-poem-couplet',
  templateUrl: './poem-couplet.component.html',
  styleUrls: ['./poem-couplet.component.scss']
})
export class PoemCoupletComponent implements OnInit {

  poetryForm : FormGroup;
  searchAuthor : FormControl = new FormControl();
  searchTitle : FormControl = new FormControl();
  poems = <any>[]; 
  authors = <any>[];
  titles = <any>[];
  private rhymeHints: string[] = [];
  public searchText: string = null;

  constructor(
    private service: PoemCoupletService,
    private rhymeService: RhymeService,
    private formBuilder: FormBuilder
  ) { 
    this.poetryForm = this.formBuilder.group({
      searchAuthor: '',
      searchTitle: ''
    });
  }

  ngOnInit(): void {

    this.searchAuthor.valueChanges.subscribe(
      term => {
        if (term != '') {
          this.service.searchAuthor(term).subscribe(
            data => {
              this.authors = data as any[];
              this.getRhymes(term);
          })
        }
    });

    this.searchTitle.valueChanges.subscribe(
      term => {
        if (term != '') {
          this.service.searchTitle(term).subscribe(
            data => {
              this.titles = data as any[];
              this.getRhymes(term);
          })
        }
    })
  }

  onSubmit() {
    this.poetryForm['searchAuthor'] = 'William Blake';
    this.poetryForm['searchTitle'] = 'A poison tree';
    console.log('Your order has been submitted', this.poetryForm);
    this.service.searchPoem(this.poetryForm).subscribe(data => {
      this.poems = data as any[];
    })
  }

  getRhymes(wordToRhyme: string): void {
    this.rhymeService.searchRhyme(wordToRhyme)
      .subscribe((response) => {
        this.updateRhymeHints(response);
      });
  }

  updateRhymeHints(hints: string[]): void {
    this.rhymeHints = hints;
  }

}
