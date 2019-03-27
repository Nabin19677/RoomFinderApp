import { Component } from '@angular/core';
import { NavController, ViewController, NavParams, AlertController, Platform } from 'ionic-angular';
import { RoomFinderApiProvider } from '../../providers/room-finder-api/room-finder-api';
import { RoomDetailsPage } from '../room-details/room-details';
import { SearchPage } from '../search/search';
import { ConversationsPage } from '../conversations/conversations';
import { NotificationPage } from '../notification/notification';
import { Socket } from 'ng-socket-io';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  unviewedNotification: Boolean = false;
  notifications = [];
  deals;
  searchPage = SearchPage;
  searchData = {
    searchParam: '',
    founded: null
  }

  constructor(public navCtrl: NavController,
    private viewCtrl: ViewController,
    private roomFinder: RoomFinderApiProvider,
    private navParams: NavParams,
    private socket: Socket,
    private alertCtrl: AlertController,
    private localNotifications: LocalNotifications,
    private plt: Platform) {
    this.getRoom();
    this.getNotification();
    this.socket.on('roomAddedNotification', (data) => {
      this.getNotification();
    })
  }

  viewDetails(deal) {
    this.navCtrl.push(RoomDetailsPage, { deal })
  }


  getNotification() {
    this.roomFinder.getNotifications().subscribe(data => {
      this.notifications = data.notifications;
      this.unviewedNotifications();
      this.popup(this.notifications);
    }, err => {
    });
  }

  popup(notf) {
    notf.forEach((notification, index) => {
      if (notification.notified == false) {
        this.localNotifications.schedule({
          id: index,
          text: notification.message,
          sound: this.plt.is('android') ? 'file://sound.mp3' : 'file://beep.caf',
          data: {}
        });
        this.roomFinder.notifiedNotification(notification);
      }
    });
  }

  unviewedNotifications() {
    this.notifications.forEach(notification => {
      if (notification.viewed == false) {
        this.unviewedNotification = true;
      }
    });
  }

  search() {
    if (this.searchData.searchParam != '') {
      this.roomFinder.search(this.searchData).subscribe(data => {
        this.searchData.founded = data;
        console.log(this.searchData);
        this.navCtrl.push(this.searchPage, this.searchData);
      }, err => {
        let alert = this.alertCtrl.create({
          title: 'Error',
          message: 'Cannot search for Rooms....',
          buttons: ['OK']
        });
        alert.present();
      })
    }
  }

  chatPage() {
    this.navCtrl.push(ConversationsPage);
  }

  notificationPage() {
    this.navCtrl.push(NotificationPage);
  }

  getRoom() {
    this.roomFinder.getRoomForHome().subscribe(data => {
      if (data.length != 0) {
        this.deals = data.rooms;
      } else {
        this.deals = [];
      }
    }, err => {
      let alert = this.alertCtrl.create({
        title: 'Error',
        message: 'Cannot find Rooms',
        buttons: ['OK']
      });
      alert.present();
    })
  }

}