import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AjaxService {



  backEndLink : string = "http://localhost:80/riot-api-master/PorofessorLike/"



  constructor(private http : HttpClient) { }


  getMatchInfos(summonerName : string){
    return (this.http.get(this.backEndLink + 'controller.php?method=get_matchInfos&summonerName='+summonerName));
  }

}
