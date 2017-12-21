import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Disciplina } from './disciplina.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DisciplinaService {

    private resourceUrl = SERVER_API_URL + 'api/disciplinas';

    constructor(private http: Http) { }

    create(disciplina: Disciplina): Observable<Disciplina> {
        const copy = this.convert(disciplina);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(disciplina: Disciplina): Observable<Disciplina> {
        const copy = this.convert(disciplina);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Disciplina> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Disciplina.
     */
    private convertItemFromServer(json: any): Disciplina {
        const entity: Disciplina = Object.assign(new Disciplina(), json);
        return entity;
    }

    /**
     * Convert a Disciplina to a JSON which can be sent to the server.
     */
    private convert(disciplina: Disciplina): Disciplina {
        const copy: Disciplina = Object.assign({}, disciplina);
        return copy;
    }
}
