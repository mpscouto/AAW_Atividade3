import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Falta } from './falta.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class FaltaService {

    private resourceUrl = SERVER_API_URL + 'api/faltas';

    constructor(private http: Http) { }

    create(falta: Falta): Observable<Falta> {
        const copy = this.convert(falta);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(falta: Falta): Observable<Falta> {
        const copy = this.convert(falta);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Falta> {
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
     * Convert a returned JSON object to Falta.
     */
    private convertItemFromServer(json: any): Falta {
        const entity: Falta = Object.assign(new Falta(), json);
        return entity;
    }

    /**
     * Convert a Falta to a JSON which can be sent to the server.
     */
    private convert(falta: Falta): Falta {
        const copy: Falta = Object.assign({}, falta);
        return copy;
    }
}
