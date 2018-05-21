import { GlobalVarService } from './../../services/global/global-var.service';
import { Area, Project } from './../../common/data-objects';
import { DataService } from './../../services/data/data.service';
import { AuthService } from './../../services/auth/auth.service';
import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { slide } from '../../common/animations';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss'],
  animations: [
    slide
  ]
})
export class DashboardLayoutComponent implements OnInit {

  catLogoUrl: string = environment.orclserver + "/images/CATLogo.png";
  name: string = sessionStorage.getItem('name');
  sideOpen: boolean = false;

  areas: Area[] = [];
  projects: Project[] =[];

  model: {area: string, projid: number} = {area: null, projid: null};

  menu: {desc: string, route: string}[] = [
    {desc: 'Migration', route: '/'},
    {desc: 'Control', route: '/control'},
    {desc: 'Invoice Summary Report', route: '/invoice-summary'},
    {desc: 'Mega-Invoice Report', route: '/invoice-mega'},
    {desc: 'Budget Report', route: '/budget-format'}
  ];

  constructor(private authService: AuthService, private dataService: DataService, private globalVar: GlobalVarService) { }

  ngOnInit() {

    this.globalVar.currentArea.subscribe(area => {
      this.model.area = area;
      this.updateProjects();
    });

    this.globalVar.currentProject.subscribe(projid => {
      this.model.projid = projid;
    });

    this.dataService.getAreas()
      .subscribe(response => {
        this.areas = response;
        if(this.areas.length==1){
          this.model.area = this.areas[0].AR_AREA;
          this.globalVar.setArea(this.model.area);
        }
      });
  }

  areaChange() {
    this.globalVar.setArea(this.model.area);
  }

  updateProjects() {

    this.projects = [];
    this.dataService.getProjects(this.model.area)
      .subscribe(response => {
        this.projects = response;
        if(this.projects.length==1){
          this.model.projid = this.projects[0].PR_PROJID;
          this.globalVar.setProject(this.model.projid);
        }
      });
  }


  setProject() {
    this.globalVar.setProject(this.model.projid);
  }

  logout() {
    this.authService.logout();
  }

}
