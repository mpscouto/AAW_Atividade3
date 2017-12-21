import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Aula } from './aula.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AulaService {

    private resourceUrl = SERVER_API_URL + 'api/aulas';

    constructor(private http: Http) { }

    create(aula: Aula): Observable<Aula> {
        const copy = this.convert(aula);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(aula: Aula): Observable<Aula> {
        const copy = this.convert(aula);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Aula> {
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
     * Convert a returned JSON object to Aula.
     */
    private convertItemFromServer(json: any): Aula {
        const entity: Aula = Object.assign(new Aula(), json);
        return entity;
    }

    /**
     * Convert a Aula to a JSON which can be sent to the server.
     */
    private convert(aula: Aula): Aula {
        const copy: Aula = Object.assign({}, aula);
        return copy;
    }
}
