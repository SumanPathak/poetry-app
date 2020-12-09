import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

@Injectable()
export class RhymeService {
	constructor(private httpService: HttpClient) { }

    searchRhyme(word: string): Observable<string[]> {
        let rhymeUrl = `https://api.datamuse.com/words?rel_rhy=${word}`;

        return this.httpService.get(rhymeUrl).pipe(map(response => {
            const res: any = response;	
            let rhymes = res.map((rhyme) => {
                return rhyme.word;
            });
            return <string[]>rhymes;
        }));
    }
}