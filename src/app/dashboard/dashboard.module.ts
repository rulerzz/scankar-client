import { StatisticsComponent } from './statistics/statistics.component';
import { ReportsComponent } from './reports/reports.component';
import { BillingComponent } from './billing/billing.component';
import { ErrorComponent } from './error/error.component';
import { CodeComponent } from './code/code.component';
import { UserComponent } from './user/user.component';
import { SharedModule } from './../shared.module';
import { DashboardService } from './dashboard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { EdituserComponent } from './user/edituser/edituser.component';
import { CreateuserComponent } from './user/createuser/createuser.component';
import { DeleteuserComponent } from './user/deleteuser/deleteuser.component';
import { ChangeTablesComponent } from './user/change-tables/change-tables.component';
import { MainComponent } from './main/main.component';
import { ProcessdialogComponent } from './main/processdialog/processdialog.component';
import { StatusdialogComponent } from './main/statusdialog/statusdialog.component';
import { AccountComponent } from './account/account.component';
import { MenuComponent } from './menu/menu.component';
import { CreatecategoryComponent } from './menu/createcategory/createcategory.component';
import player from 'lottie-web';
import { LottieModule } from 'ngx-lottie';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EdititemComponent } from './menu/edititem/edititem.component';
import { TablesComponent } from './tables/tables.component';
import { AdditemComponent } from './menu/additem/additem.component';
import { AdditemComponentt } from './billing/additem/additem.component';
import { BreakupComponent } from './billing/breakup/breakup.component';
import { ShowaddonsComponent } from './tables/showaddons/showaddons.component';
import { OtherordersComponent } from './otherorders/otherorders.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { config } from '../../config/config';
import { BulkuploadComponent } from './menu/bulkupload/bulkupload.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { OrderdetaildialogComponent } from './orderdetaildialog/orderdetaildialog.component';
import { NgxHowlerService } from 'ngx-howler';
import { ReloadComponent } from './reload/reload.component';
const configuration: SocketIoConfig = { url: config.socketUrl, options: {} };
// Note we need a separate function as it's required
// by the AOT compiler.
export function playerFactory() {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
}
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'users',
        component: UserComponent,
      },
      {
        path: 'main',
        component: MainComponent,
      },
      {
        path: 'code',
        component: CodeComponent,
      },
      {
        path: 'account',
        component: AccountComponent,
      },
      {
        path: 'menu',
        component: MenuComponent,
      },
      {
        path: 'billing',
        component: BillingComponent,
      },
      {
        path: 'billing/:id',
        component: BillingComponent,
      },
      {
        path: 'billing/table/:number',
        component: BillingComponent,
      },
      {
        path: 'reports',
        component: ReportsComponent,
      },
      {
        path: 'statistics',
        component: StatisticsComponent,
      },
      {
        path: 'tables',
        component: TablesComponent,
      },
      {
        path: 'otherorders',
        component: OtherordersComponent,
      },
      {
        path: 'transactions',
        component: TransactionsComponent,
      },
      {
        path: 'reload',
        component: ReloadComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    UserComponent,
    EdituserComponent,
    CreateuserComponent,
    DeleteuserComponent,
    ChangeTablesComponent,
    TablesComponent,
    MainComponent,
    ProcessdialogComponent,
    StatusdialogComponent,
    AccountComponent,
    MenuComponent,
    ErrorComponent,
    StatisticsComponent,
    ReportsComponent,
    MenuComponent,
    BillingComponent,
    CreatecategoryComponent,
    AdditemComponent,
    EdititemComponent,
    AdditemComponentt,
    BreakupComponent,
    ShowaddonsComponent,
    OtherordersComponent,
    BulkuploadComponent,
    TransactionsComponent,
    OrderdetaildialogComponent,
    ReloadComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SocketIoModule.forRoot(configuration),
    RouterModule.forChild(routes),
    LottieModule.forRoot({ player: playerFactory }),
  ],
  providers: [DashboardService, NgxHowlerService],
  exports: [
    DashboardComponent,
    UserComponent,
    EdituserComponent,
    CreateuserComponent,
    DeleteuserComponent,
    ChangeTablesComponent,
    MainComponent,
    ProcessdialogComponent,
    StatusdialogComponent,
    AccountComponent,
    MenuComponent,
    ErrorComponent,
    StatisticsComponent,
    ReportsComponent,
    MenuComponent,
    BillingComponent,
    TablesComponent,
    AdditemComponent,
    AdditemComponentt,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule {
  constructor(ngxHowlerService: NgxHowlerService) {
    ngxHowlerService.loadScript(
      '../../assets/plugins/howler.min.js'
    );
  }
}
