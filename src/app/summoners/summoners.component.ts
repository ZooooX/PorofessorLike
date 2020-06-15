import { Component, OnInit } from '@angular/core';
import { AjaxService } from '../ajax.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-summoners',
  templateUrl: './summoners.component.html',
  styleUrls: ['./summoners.component.scss']
})
export class SummonersComponent implements OnInit {

  matchInfos : any;

  summonerName : string;
  participants : object;

  team1: object[] = [];
  team2: object[] = [];
  teamsready : boolean = false;
  constructor(private ajaxService: AjaxService, private route : ActivatedRoute, private sanitizer: DomSanitizer) {}

  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  ngOnInit() {
      this.route.params.subscribe(
        (params) => {
          this.summonerName = this.route.snapshot.paramMap.get('summonerName');
          this.reset();
          this.getMatchInfos(this.summonerName);
        }
      )

  }

  //reset variables
  reset(){
    this.matchInfos = {};
    this.participants = {};
    this.team1 = [];
    this.team2 = [];
    this.teamsready= false;
  }
  getMatchInfos(summonerName:string){
    this.ajaxService.getMatchInfos(summonerName).subscribe(
      (res) => {
        this.matchInfos = res;
        console.log(res);
        this.setTeams(this.matchInfos.participants);
      }
    );
  }

  setTeams(participants: any){
    participants.forEach(element => {
      if (element.teamId == 100) {
        this.team1.push(element);
      }
      else if (element.teamId == 200) {
        this.team2.push(element);
      }
    });

    this.teamsready = true;
  }

  getSummonerWins(summoner : object){
    let infos = this.getRankInfosRanked(summoner);
    return (infos.wins);
  }

  getSummonerLosses(summoner : object){
    let infos = this.getRankInfosRanked(summoner);
    return (infos.losses);
  }

  getSummonerWinRate(summoner : object){
    let infos = this.getRankInfosRanked(summoner);
    let calc = infos.wins / (infos.wins+infos.losses) * 100;
    return calc.toFixed(2);
  }

  getSummonerTier(summoner : object){
    let infos = this.getRankInfosRanked(summoner);
    return (infos.tier);
  }

  getSummonerRank(summoner : object){
    let infos = this.getRankInfosRanked(summoner);
    return (infos.rank);
  }

  getSummonerLeaguePoints(summoner : object){
    let infos = this.getRankInfosRanked(summoner);
    return (infos.leaguePoints);
  }


  //Get the right array depending of the current gamemode
  getRankInfosRanked(summoner : any){
    let infos;
    //If RAnked flex (cf. queues.json)
    if (this.matchInfos.gameQueueConfigId == 440) {
      if (summoner.rankInfos[0]) {
        if (summoner.rankInfos[0].queueType == "RANKED_FLEX_SR") {
          infos = summoner.rankInfos[0];
        }
        else{
          if (summoner.rankInfos[1]) {
            if (summoner.rankInfos[1].queueType == "RANKED_FLEX_SR") {
              infos = summoner.rankInfos[1];
            }
          }else{
            infos = {
              rank: "unranked",
              tier: "unranked",
              losses:0,
              wins:0,
              queueType: "RANKED_FLEX_SR"
            };
          }
        }
      }
      else{
        infos = {
          rank: "unranked",
          tier: "unranked",
          losses:0,
          wins:0,
          queueType: "RANKED_FLEX_SR"
        };
      }
    }
    //If other game mode take 5v5 ranked stats
    else{
      if (summoner.rankInfos[0]) {
        if (summoner.rankInfos[0].queueType == "RANKED_SOLO_5x5") {
          infos = summoner.rankInfos[0];
        }
        else{
          if (summoner.rankInfos[1]) {
            if (summoner.rankInfos[1].queueType == "RANKED_SOLO_5x5") {
              infos = summoner.rankInfos[1];
            }
          }
          else{
            infos = {
              rank: "unranked",
              tier: "unranked",
              losses:0,
              wins:0,
              queueType: "RANKED_FLEX_SR"
            };
          }
        }
      }
      else{
        infos = {
          rank: "unranked",
          tier: "unranked",
          losses:0,
          wins:0,
          queueType: "RANKED_SOLO_5x5"
        };
      }
    }
    return infos;
  }
}
