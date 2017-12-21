import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Professor } from './professor.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ProfessorService {

    private resourceUrl = SERVER_API_URL + 'api/professors';

    constructor(private http: Http) { }

    create(professor: Professor): Observable<Professor> {
        const copy = this.convert(professor);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(professor: Professor): Observable<Professor> {
        const copy = this.convert(professor);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Professor> {
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
     * Convert a returned JSON object to Professor.
     */
    private convertItemFromServer(json: any): Professor {
        const entity: Professor = Object.assign(new Professor(), json);
        return entity;
    }

    /**
     * Convert a Professor to a JSON which can be sent to the server.
     */
    private convert(professor: Professor): Professor {
        const copy: Professor = Object.assign({}, professor);
        return copy;
    }
}
