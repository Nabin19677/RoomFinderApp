import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Socket } from 'ng-socket-io';

//root
import { IntroPage } from '../pages/intro/intro';
import { Storage } from '@ionic/storage';
import { HomePage } from '../pages/home/home';
import { AddRoomPage } from '../pages/add-room/add-room';
import { AboutUsPage } from '../pages/about-us/about-us';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { BackgroundMode } from '@ionic-native/background-mode';
import { RoomFinderApiProvider } from '../providers/room-finder-api/room-finder-api';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  userObject;
  notifications = [];

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform,
    private plt : Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private menu: MenuController,
    private storage: Storage,
    private socket : Socket,
    private backgroundMode : BackgroundMode,
    private roomFinder : RoomFinderApiProvider,
    private localNotifications : LocalNotifications
  ) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Add Room', component: AddRoomPage },
      { title: 'About Us', component: AboutUsPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.setRoot();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async setRoot() {
    await this.storage.get('token').then(data => {
      if (data == undefined || data == null) {
        this.rootPage = IntroPage;
      } else {
        this.rootPage = LoginPage;
      }
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  openProfile() {
    this.nav.push(ProfilePage);
  }
}
