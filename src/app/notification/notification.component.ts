import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Globals } from '../helpers/globals';
import Swal from 'sweetalert2';
import { ISubscription } from "rxjs/Subscription";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private globals:Globals
    ) { }
  
  private notificationData:any=[];
  private showHideObj:Object={};
  private flagObj:Object={};
  private loader:Boolean=false;
  private innerWidth:Number= 0;
  private goback:Boolean= false;
  private rightPanel:Boolean= true;
  private leftPanel:Boolean= true;
  private isnotificationData:Boolean=false;
  private subscription: ISubscription;

  ngOnInit() {
    this.globals.LoaderGlobal=true;
    this.innerWidth = window.innerWidth;
    this.showHideNotificationContent(true,false);  
    this.setValOfShowHideObj(false);
    this.subscription = this.apiService.getNotifications().subscribe((res)=> {
      if(res.status==200){
        this.notificationData=res.response.success.notifications;
       let len= this.notificationData.length;
        this.showHideObj[len]=true;
        this.isnotificationData=true;
      }
      this.globals.LoaderGlobal=false;
    });
  }


  getNotificationData(id)
  {
      this.globals.LoaderGlobal=true;
      this.showHideNotificationContent(false,true);
      this.setValOfShowHideObj(false);
      this.showHideObj[id]=true;
      this.globals.LoaderGlobal=false;
  }

  setValOfShowHideObj(val)
  {
      this.showHideObj={
      "1":val,
      "2":val,
      "3":val,
      "4":val,
      "5":val,
      "6":val,
      "7":val,
      "8":val,
      "9":val,
      "10":val,
      "11":val,
      "12":val,
    };
  }

  takeAction(notificationId,action) {
    this.globals.LoaderGlobal=true;
       this.apiService.takeNotificationAction(notificationId,action).subscribe((res)=> {
          if(res.code==200){
              this.flagObj[notificationId]=res.data;
           } else {
            Swal.fire('Error', res.message, 'error');
          }
          this.globals.LoaderGlobal=false;
      });
  }

  showHideNotificationContent(leftPanel,rightPanel) {
    if (this.innerWidth < 768) {
        this.goback=true;
        this.rightPanel= rightPanel;
        this.leftPanel= leftPanel;
      }
  }

  backToLeftPanel() {
      this.globals.LoaderGlobal=true;
      this.rightPanel= false;
      this.leftPanel= true;
      this.globals.LoaderGlobal=false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
