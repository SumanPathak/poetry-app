import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()  
export class PoemCoupletService {  

    constructor (private httpService: HttpClient) { }  

    searchAuthor(term) {
        var listOfAuthors = this.httpService.get('https://poetrydb.org/author/' + term)
        .pipe(
            distinctUntilChanged(),
            debounceTime(1000),
            map(
                (data: any) => {
                    this.getLastWordInPhrase(term)
                    return (
                        data.status != 404 && data.length != 0 ? data as any[] : [{"author": "No Author Found"} as any]
                    );
                }
        ));

        return listOfAuthors;  
    };

    searchTitle(term) {
        var listOfTitles = this.httpService.get('https://poetrydb.org/title/' + term)
        .pipe(
            distinctUntilChanged(),
            debounceTime(1000),
            map(
                (data: any) => {
                    this.getLastWordInPhrase(term)
                    return (
                        data.status != 404 && data.length != 0 ? data as any[] : [{"title": "No Title Found"} as any]
                    );
                }
        ));

        return listOfTitles;  
    } 
    
    searchPoem(form) {
        var lines = this.httpService.get('https://poetrydb.org/author,title/' + form.value.searchAuthor + ';' + form.value.searchTitle)
        .pipe(
            debounceTime(1000),
            map(
                (data: any) => {
                    return (
                        data.status != 404 && data.length != 0 ? data as any[] : [{"lines": ["No Poem Found"]} as any]
                    );
                }
        ));

        return lines;
    }

    getLastWordInPhrase(phrase: string): string {
        return phrase.trim().split(" ").pop().replace(/[?.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    }

}