import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Entrega } from './entrega.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EntregaService {

    private resourceUrl = SERVER_API_URL + 'api/entregas';

    constructor(private http: Http) { }

    create(entrega: Entrega): Observable<Entrega> {
        const copy = this.convert(entrega);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(entrega: Entrega): Observable<Entrega> {
        const copy = this.convert(entrega);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Entrega> {
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
     * Convert a returned JSON object to Entrega.
     */
    private convertItemFromServer(json: any): Entrega {
        const entity: Entrega = Object.assign(new Entrega(), json);
        return entity;
    }

    /**
     * Convert a Entrega to a JSON which can be sent to the server.
     */
    private convert(entrega: Entrega): Entrega {
        const copy: Entrega = Object.assign({}, entrega);
        return copy;
    }
}
