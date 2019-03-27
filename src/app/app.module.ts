//Dependencies
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { CallNumber } from '@ionic-native/call-number';
import { ImagePicker } from '@ionic-native/image-picker';
import { BackgroundMode } from '@ionic-native/background-mode';
import { LocalNotifications } from '@ionic-native/local-notifications'; 

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
// const config: SocketIoConfig = { url: 'http://192.168.1.87:3000', options: {} };
const config: SocketIoConfig = { url: 'http://patancollegeroomfinder.herokuapp.com', options: {} };

//Pages
import { MyApp } from './app.component';
import { IntroPage } from '../pages/intro/intro';
import { HomePage } from '../pages/home/home';
import { BookRoomPage } from '../pages/book-room/book-room';
import { AddRoomPage } from '../pages/add-room/add-room';
import { AboutUsPage } from '../pages/about-us/about-us';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { SignupPage } from '../pages/signup/signup';
import { RoomDetailsPage } from '../pages/room-details/room-details';
import { SearchPage } from '../pages/search/search';
import { AddInfoPage } from '../pages/add-info/add-info';
import { ChatRoomPage } from '../pages/chat-room/chat-room';
import { ConversationsPage } from '../pages/conversations/conversations';
import { NotificationPage } from '../pages/notification/notification';
import { ViewPostsPage } from '../pages/view-posts/view-posts';

//Providers
import { RoomFinderApiProvider } from '../providers/room-finder-api/room-finder-api';
import { IntercepterProvider } from '../providers/intercepter/intercepter';

@NgModule({
  declarations: [
    MyApp,
    IntroPage,
    LoginPage,
    HomePage,
    BookRoomPage,
    AddRoomPage,
    AboutUsPage,
    SignupPage,
    ProfilePage,
    RoomDetailsPage,
    SearchPage,
    AddInfoPage,
    ChatRoomPage,
    ConversationsPage,
    NotificationPage,
    ViewPostsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    SocketIoModule.forRoot(config),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    IntroPage,
    LoginPage,
    HomePage,
    BookRoomPage,
    AddRoomPage,
    AboutUsPage,
    SignupPage,
    ProfilePage,
    RoomDetailsPage,
    SearchPage,
    AddInfoPage,
    ChatRoomPage,
    ConversationsPage,
    NotificationPage,
    ViewPostsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    BackgroundMode,
    LocalNotifications,
    CallNumber,
    ImagePicker,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RoomFinderApiProvider,
    { provide: HTTP_INTERCEPTORS, useClass: IntercepterProvider, multi: true }
  ]
})
export class AppModule { }
