import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  summonername : string;

  constructor( private router: Router) { }

  ngOnInit(){
    let inputSearch = document.getElementById("inputSearch");

    inputSearch.addEventListener('keyup', function(event){
      if (event.keyCode == 13) {
        document.getElementById("submitSearch").click();
      }
    });
  }

  search(summonername : string){
    this.summonername = summonername;
    this.router.navigate(['/summoners', summonername]);
  }

}
