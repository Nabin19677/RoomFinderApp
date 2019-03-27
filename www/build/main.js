webpackJsonp([0],{

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatRoomPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng_socket_io__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_room_finder_api_room_finder_api__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(40);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ChatRoomPage = /** @class */ (function () {
    function ChatRoomPage(navCtrl, navParams, socket, roomFinder, storage, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.socket = socket;
        this.roomFinder = roomFinder;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.recipient = '';
        this.userObject = null;
        this.conversations = null;
        this.body = {
            conversationId: '',
            message: '',
            recipient: ''
        };
        this.body.conversationId = this.navParams.data.conversationId;
        this.body.recipient = this.navParams.data.recipient._id;
        this.recipient = this.navParams.data.recipient;
        this.socket.connect();
        this.socket.on('sentMessageSaved', function (data) {
            _this.refreshConservation();
        });
        this.gotoBottom();
    }
    ChatRoomPage.prototype.ionViewCanEnter = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get('userObject')
                .then(function (userObject) {
                _this.userObject = userObject;
                _this.roomFinder.getConversation(_this.body.conversationId).subscribe(//remember array is already sorted
                function (//remember array is already sorted
                    data) {
                    _this.conversations = data.data;
                    resolve(true);
                }, function (err) {
                    var alert = _this.alertCtrl.create({
                        title: 'Error',
                        message: 'Cannot find your conversations....',
                        buttons: ['OK']
                    });
                    alert.present();
                    reject(true);
                });
            })
                .catch(function (err) {
                reject(true);
                console.log(err);
            });
        });
    };
    ChatRoomPage.prototype.sendMessage = function () {
        var _this = this;
        this.roomFinder.sendReply(this.body).subscribe(function (data) {
            _this.body.message = '';
            _this.socket.emit('sentMessage', {});
            _this.content.scrollToBottom();
        }, function (err) {
            console.log(err);
        });
    };
    ChatRoomPage.prototype.refreshConservation = function () {
        var _this = this;
        this.roomFinder.getConversation(this.body.conversationId).subscribe(function (data) {
            _this.conversations = data.data;
            _this.gotoBottom();
        }, function (err) {
            _this.conversations = ['Some Error'];
        });
    };
    ChatRoomPage.prototype.gotoBottom = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.content._scroll) {
                _this.content.scrollToBottom();
            }
        }, 500);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */])
    ], ChatRoomPage.prototype, "content", void 0);
    ChatRoomPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-chat-room',template:/*ion-inline-start:"C:\Users\uZeR-37\Desktop\NewApp\src\pages\chat-room\chat-room.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{ recipient.fullname }}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content scrollDownOnLoad=true no-padding>\n  <ion-list>\n    <ion-item no-padding no-lines *ngFor="let conversation of conversations">\n\n        <div class="innerMesage" *ngIf="userObject._id == conversation.author" item-end  float-right text-wrap  style="color:white; background-color:#0084ff; display:inline-block; padding: 10px 10px; margin:5px; border-radius:10px;  ">\n        \n             {{ conversation.body }}\n        \n      </div>\n     \n      <div class="innerMesage" *ngIf="userObject._id == conversation.recipient" item-start float-left text-wrap style="color:black; background-color:#e6ecef; display:inline-block; padding: 10px 10px; margin:5px; border-radius:10px; ">\n         \n          {{ conversation.body }}\n      \n    </div>\n\n   \n    </ion-item>\n  </ion-list>\n</ion-content>\n\n<ion-footer>\n  <div id="footer">\n   <div class="elem"> \n     <ion-input type="text" [(ngModel)]="body.message" placeholder="Write Message......"></ion-input>\n   </div>\n   <div class="elem">\n   <button ion-button icon-only  float-right color="success" (click)="sendMessage()" >\n        <ion-icon name="send" ></ion-icon>\n    </button>\n  </div>\n  </div>\n</ion-footer>\n'/*ion-inline-end:"C:\Users\uZeR-37\Desktop\NewApp\src\pages\chat-room\chat-room.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_ng_socket_io__["Socket"],
            __WEBPACK_IMPORTED_MODULE_3__providers_room_finder_api_room_finder_api__["a" /* RoomFinderApiProvider */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], ChatRoomPage);
    return ChatRoomPage;
}());

//# sourceMappingURL=chat-room.js.map

/***/ }),

/***/ 181:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 181;

/***/ }),

/***/ 228:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 228;

/***/ }),

/***/ 23:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoomFinderApiProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RoomFinderApiProvider = /** @class */ (function () {
    // BASEURL = "http://192.168.1.87:3000/room-finder";
    function RoomFinderApiProvider(http) {
        this.http = http;
        this.BASEURL = "http://patancollegeroomfinder.herokuapp.com/room-finder";
    }
    RoomFinderApiProvider.prototype.createUser = function (data) {
        return this.http.post(this.BASEURL + "/auth/register", data);
    };
    RoomFinderApiProvider.prototype.login = function (data) {
        return this.http.post(this.BASEURL + "/auth/login", data);
    };
    RoomFinderApiProvider.prototype.getUserProfile = function () {
        return this.http.get(this.BASEURL + "/user/profile");
    };
    RoomFinderApiProvider.prototype.getRoomForHome = function () {
        return this.http.get(this.BASEURL + "/rooms/getRoomForHome");
    };
    RoomFinderApiProvider.prototype.getRoomsPosts = function () {
        return this.http.get(this.BASEURL + "/rooms/getRoomsPosts");
    };
    RoomFinderApiProvider.prototype.addRoom = function (data) {
        return this.http.post(this.BASEURL + "/rooms/addRoom", data);
    };
    RoomFinderApiProvider.prototype.search = function (data) {
        return this.http.post(this.BASEURL + "/rooms/search", data);
    };
    RoomFinderApiProvider.prototype.deleteRoom = function (id) {
        return this.http.delete(this.BASEURL + "/rooms/delete/" + id);
    };
    //Alternative
    RoomFinderApiProvider.prototype.newChat = function (recipient) {
        return this.http.post(this.BASEURL + "/chat/newChat", recipient);
    };
    RoomFinderApiProvider.prototype.getConversations = function () {
        return this.http.get(this.BASEURL + "/chat/conversations");
    };
    RoomFinderApiProvider.prototype.getConversation = function (conversationId) {
        return this.http.get(this.BASEURL + "/chat/conversation/" + conversationId);
    };
    RoomFinderApiProvider.prototype.sendReply = function (body) {
        return this.http.post(this.BASEURL + "/chat/sendReply", body);
    };
    RoomFinderApiProvider.prototype.updatePersonalInfo = function (body) {
        return this.http.put(this.BASEURL + "/user/updatePersonalInfo", body);
    };
    RoomFinderApiProvider.prototype.getPersonalInfo = function () {
        return this.http.get(this.BASEURL + "/user/getPersonalInfo");
    };
    //Notification
    RoomFinderApiProvider.prototype.sendNotifications = function (body) {
        return this.http.put(this.BASEURL + "/user/sendNotifications", body);
    };
    RoomFinderApiProvider.prototype.getNotifications = function () {
        return this.http.get(this.BASEURL + "/user/notifications");
    };
    RoomFinderApiProvider.prototype.viewNotification = function (notification) {
        return this.http.put(this.BASEURL + "/user/viewNotification", notification);
    };
    RoomFinderApiProvider.prototype.notifiedNotification = function (notification) {
        return this.http.put(this.BASEURL + "/user/notifiedNotification", notification);
    };
    //Testing
    RoomFinderApiProvider.prototype.whatIGot = function (body) {
        return this.http.post(this.BASEURL + "/rooms/testing", body);
    };
    RoomFinderApiProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["b" /* HttpClient */]])
    ], RoomFinderApiProvider);
    return RoomFinderApiProvider;
}());

//# sourceMappingURL=room-finder-api.js.map

/***/ }),

/***/ 290:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IntroPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(63);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var IntroPage = /** @class */ (function () {
    function IntroPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.nextPage = __WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */];
    }
    IntroPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad IntroPage');
    };
    IntroPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-intro',template:/*ion-inline-start:"C:\Users\uZeR-37\Desktop\NewApp\src\pages\intro\intro.html"*/'<ion-slides pager>\n  <ion-slide style="background-color:#4b18a8;" >\n      <div style="position:absolute; top:5px; padding: 4px; text-align:right; z-index:1; width: 100%">\n          <button [navPush]= "nextPage" style="color:lavender; background-color: #4b18a8; font-size: 20px;" >SKIP</button>\n        </div>\n    <h1 style="color:lavender; font-family:roboto;"> Find your perfect room</h1>\n    <p  style="color:rgb(195, 195, 223); font-family:roboto;">by Location, Price and Facilities</p>\n    <img class="img" src="assets/imgs/perfect.jpg" alt="Image 1" style="width:300px; height: 300px;">\n  </ion-slide>\n\n\n  <ion-slide style="background-color:#4b18a8; margin-top: 0px;" >\n      <div style="position:absolute; top:5px; padding: 4px; text-align:right; z-index:1; width: 100%">\n          <button  [navPush]="nextPage" style="color:lavender; background-color: #4b18a8; font-size: 20px;" >SKIP</button>\n        </div>\n      <h1 style="color:lavender; font-family:roboto;"> Get every details</h1>\n      <p  style="color:rgb(195, 195, 223); font-family:roboto;">real pictures with desciption</p>\n      <img src="assets/imgs/details.jpg" alt="Image 1" style="width:250px;">\n  </ion-slide>\n\n  <ion-slide style="background-color:#4b18a8; margin-top: 0px;" >\n      <div style="position:absolute; top:5px; padding: 4px; text-align:right; z-index:1; width: 100%">\n          <button  [navPush]="nextPage"  style="color:lavender; background-color: #4b18a8; font-size: 20px;" >SKIP</button>\n        </div>\n\n      <h1 style="color:lavender; font-family:roboto;"> Instantly Book</h1>\n      <p  style="color:rgb(195, 195, 223); font-family:roboto;">the room of your choice</p>\n      <img src="assets/imgs/booking.jpg" alt="Image 1" style="width: 250px;">\n  </ion-slide>\n\n  <ion-slide style="background-color:#4b18a8; margin-top: 0px;" >\n      <div style="position:absolute; top:5px; padding: 4px; text-align:right; z-index:1; width: 100%">\n          <button  [navPush]="nextPage" style="color:lavender; background-color: #4b18a8; font-size: 20px;" >SKIP</button>\n        </div>\n        <h1 style="color:lavender; font-family:roboto;"> Direct contact to room owners</h1>\n        <p  style="color:rgb(195, 195, 223); font-family:roboto;">to get additional details of room</p>\n        <img src="assets/imgs/connect.png" alt="Image 1" style="width: 250px">\n        <div style="position:absolute; bottom:90px; padding: 4px; text-align:center;  z-index:1; width: 100%; color:aliceblue">\n          <button ion-button  [navPush]="nextPage" style="color:#ebebeb; outline-color: white; " round outline  >Let\'s Go</button>\n        </div>\n  </ion-slide>\n\n</ion-slides>\n'/*ion-inline-end:"C:\Users\uZeR-37\Desktop\NewApp\src\pages\intro\intro.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], IntroPage);
    return IntroPage;
}());

//# sourceMappingURL=intro.js.map

/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_room_finder_api_room_finder_api__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SignupPage = /** @class */ (function () {
    function SignupPage(navCtrl, storage, roomFinder, fb, alertCtrl) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.roomFinder = roomFinder;
        this.fb = fb;
        this.alertCtrl = alertCtrl;
        this.loginPage = __WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */];
    }
    SignupPage.prototype.ngOnInit = function () {
        this.signupForm = this.fb.group({
            fullname: ['', [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].pattern('(\\b[A-Z]{1}[a-z]+)( )([A-Z]{1}[a-z]+\\b)(( )([A-Z]{1}[a-z]+\\b))?')]],
            email: ['', [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].email]],
            phone: ['', [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].pattern('^9[7-8]{1}[0-9]{8}$')]],
            password: ['', [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].pattern('.{6,}')]],
            confirmPassword: ['', [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].pattern('.{6,}')]]
        });
    };
    SignupPage.prototype.save = function () {
        var _this = this;
        if (!this.signupForm.invalid) {
            if (this.signupForm.value.password == this.signupForm.value.confirmPassword) {
                this.roomFinder.createUser(this.signupForm.value).subscribe(function (data) {
                    if (data.statusCode == 200 || data.statusCode == 201) {
                        var alert_1 = _this.alertCtrl.create({
                            title: 'Successful ',
                            message: 'Account created successfully.',
                            buttons: ['OK']
                        }).present();
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
                    }
                    else if (data.statusCode == 409) {
                        var alert_2 = _this.alertCtrl.create({
                            title: 'Error',
                            message: data.statusMessage,
                            buttons: ['OK']
                        }).present();
                    }
                    else {
                        var alert_3 = _this.alertCtrl.create({
                            title: 'Unknown Error',
                            message: data.statusCode,
                            buttons: ['OK']
                        }).present();
                    }
                }, function (err) {
                    var alert = _this.alertCtrl.create({
                        title: 'Error',
                        message: 'Something went wrong.',
                        buttons: ['OK']
                    });
                    alert.present();
                });
            }
            else {
                var alert_4 = this.alertCtrl.create({
                    title: 'Error',
                    message: 'Confirm Password is not equal..',
                    buttons: ['OK']
                });
                alert_4.present();
            }
        }
        else {
            var alert_5 = this.alertCtrl.create({
                title: "INVALID",
                message: "Please fill all the field correctly",
                buttons: ['OK']
            });
            alert_5.present();
        }
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-signup',template:/*ion-inline-start:"C:\Users\uZeR-37\Desktop\NewApp\src\pages\signup\signup.html"*/'<ion-content padding>\n    <div text-center padding-top>\n        <P style="font-size: 25px; font-weight: bold">ROOM FINDER</P>\n        <img src="../../assets/imgs/logo.png" alt="Brand Logo" class="logo" style="margin-top: auto;">\n        <p style="font-size: 20px; font-weight: bold">Register your new account</p>\n\n    </div>\n\n\n    <div text-center>\n        <form [formGroup]="signupForm">\n            <ion-item>\n                <ion-label floating> Full Name</ion-label>\n                <ion-input type="text" formControlName="fullname"></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label floating> Email</ion-label>\n                <ion-input type="email" formControlName="email"></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label floating> Phone</ion-label>\n                <ion-input type="text" formControlName="phone"></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label floating> Password</ion-label>\n                <ion-input type="password" formControlName="password"></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label floating>Confirm Password</ion-label>\n                <ion-input type="password" formControlName="confirmPassword"></ion-input>\n            </ion-item>\n            <div text-center>\n                <button ion-button margin-top color="primary" block style="width:100%;" (click)=\'save()\'>Register</button>\n\n            </div>\n\n\n        </form>\n    </div>\n\n <div text-center margin-top>\n        <p style="display: inline; color:black; font-weight: bold">\n            Aleady have an account?\n        </p>\n</div>\n\n<div text-center margin-top>\n    <button margin-bottom ion-button [navPush]="loginPage" block color="green">LOGIN</button>\n</div>\n\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\uZeR-37\Desktop\NewApp\src\pages\signup\signup.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4__providers_room_finder_api_room_finder_api__["a" /* RoomFinderApiProvider */],
            __WEBPACK_IMPORTED_MODULE_5__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_room_finder_api_room_finder_api__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__room_details_room_details__ = __webpack_require__(64);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var SearchPage = /** @class */ (function () {
    function SearchPage(navCtrl, navParams, roomFinder, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.roomFinder = roomFinder;
        this.alertCtrl = alertCtrl;
        this.searchData = {
            searchParam: "",
            min: 500,
            max: 1000000
        };
        this.founded = null;
        this.searchData.searchParam = this.navParams.get('searchParam');
        this.founded = this.navParams.get('founded');
    }
    SearchPage.prototype.search = function (param) {
        var _this = this;
        if (this.searchData.searchParam != '') {
            this.roomFinder.search(param).subscribe(function (data) {
                console.log(data);
                _this.founded = data;
            }, function (err) {
                var alert = _this.alertCtrl.create({
                    title: 'Error',
                    message: 'Cannot search at the moment',
                    buttons: ['OK']
                });
                alert.present();
            });
        }
    };
    SearchPage.prototype.viewDetails = function (deal) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__room_details_room_details__["a" /* RoomDetailsPage */], { deal: deal });
    };
    SearchPage.prototype.searchRoom = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Here");
                        return [4 /*yield*/, this.search(this.searchData)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SearchPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-search',template:/*ion-inline-start:"C:\Users\uZeR-37\Desktop\NewApp\src\pages\search\search.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-toolbar>\n            <!-- <ion-searchbar [(ngModel)]="searchData.searchParam" (ionInput)="searchRoom($event)"> </ion-searchbar> -->\n            <ion-searchbar [(ngModel)]="searchData.searchParam" (keyup.enter)="searchRoom()" placeholder="Search Rooms"> </ion-searchbar>\n        </ion-toolbar>\n    </ion-navbar>\n</ion-header>\n\n<ion-content no-padding style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); ">\n    <ion-list>\n  \n      <ion-item *ngFor="let deal of founded" text-wrap no-lines>\n        <ion-card color="" text-center rounded>\n          <img src="{{ roomFinder.BASEURL +\'/RoomImage/\' + deal.roomImage[0] }}" alt="Room Image" />\n          <ion-card-content>\n            <ion-card-title>\n              <b style="font-size:17px; float: left; ">\n                <ion-icon name="pin" color="red"></ion-icon>\n                <b color="black">{{ deal.location}}</b>\n              </b>\n  \n              <b style="font-size: 17px; float: right">\n                <ion-icon name="cash" color="green"></ion-icon>\n                <b>Rs: {{deal.price}}</b>\n              </b>\n            </ion-card-title>\n  \n            <Button ion-button medium color="green" block (click)="viewDetails(deal)" style="margin-top:25px;">\n              View Details\n            </Button>\n          </ion-card-content>\n        </ion-card>\n      </ion-item>\n  \n    </ion-list>\n  </ion-content>'/*ion-inline-end:"C:\Users\uZeR-37\Desktop\NewApp\src\pages\search\search.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_room_finder_api_room_finder_api__["a" /* RoomFinderApiProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], SearchPage);
    return SearchPage;
}());

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConversationsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_room_finder_api_room_finder_api__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__chat_room_chat_room__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_call_number__ = __webpack_require__(152);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ConversationsPage = /** @class */ (function () {
    function ConversationsPage(navCtrl, navParams, roomFinder, loadingCtrl, storage, call, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.roomFinder = roomFinder;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.call = call;
        this.alertCtrl = alertCtrl;
        this.userObject = null;
        this.conversations = null;
    }
    ConversationsPage.prototype.ionViewCanEnter = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var loading = _this.loadingCtrl.create({
                content: 'Please wait...'
            });
            loading.present();
            _this.storage.get('userObject')
                .then(function (value) {
                _this.userObject = value;
                _this.roomFinder.getConversations().subscribe(function (data) {
                    console.log(data);
                    _this.conversations = data.fullChats;
                    if (data) {
                        loading.dismiss();
                        resolve(true);
                    }
                }, function (err) {
                    loading.dismiss();
                    var alert = _this.alertCtrl.create({
                        title: 'Error',
                        message: 'Cannot find your conversations....',
                        buttons: ['OK']
                    });
                    alert.present();
                    reject(true);
                });
            })
                .catch(function (err) {
                var alert = _this.alertCtrl.create({
                    title: 'Error',
                    message: 'Unknown User Error',
                    buttons: ['OK']
                });
                alert.present();
                loading.dismiss();
                reject(true);
            });
        });
    };
    ConversationsPage.prototype.gotoChat = function (conversationId, recipient) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__chat_room_chat_room__["a" /* ChatRoomPage */], {
            conversationId: conversationId,
            recipient: recipient
        });
    };
    ConversationsPage.prototype.callPerson = function (phoneNumber) {
        this.call.callNumber(String(phoneNumber), true);
    };
    ConversationsPage.prototype.getAnotherPerson = function (chat) {
        var anotherUser;
        if (chat) {
            if (this.userObject._id == chat.recipient._id) {
                anotherUser = chat.author;
            }
            else {
                anotherUser = chat.recipient;
            }
            return anotherUser;
        }
        else {
            return false;
        }
    };
    ConversationsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-conversations',template:/*ion-inline-start:"C:\Users\uZeR-37\Desktop\NewApp\src\pages\conversations\conversations.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Conversation\'s</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content no-padding no-margin>\n  <ion-list no-lines no-padding no-margin *ngIf="(conversations.length > 0)">\n    <ion-item no-padding no-margin *ngFor="let chat of conversations">\n          <ion-avatar item-start>\n            <img src="assets/imgs/man.png">\n          </ion-avatar>\n          <h2>{{ getAnotherPerson(chat[0]).fullname }}</h2>\n          <p> {{ chat[0].body }} </p>\n          <button ion-button icon-only clear medium item-end (click)="gotoChat(chat[0].conversationId,getAnotherPerson(chat[0]))">\n            <ion-icon name="chatboxes"></ion-icon>\n          </button>\n          <button ion-button icon-only clear medium item-end (click)="callPerson(getAnotherPerson(chat[0]).phone)">\n            <ion-icon name="call"></ion-icon>\n          </button>\n    </ion-item>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"C:\Users\uZeR-37\Desktop\NewApp\src\pages\conversations\conversations.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_room_finder_api_room_finder_api__["a" /* RoomFinderApiProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_call_number__["a" /* CallNumber */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], ConversationsPage);
    return ConversationsPage;
}());

//# sourceMappingURL=conversations.js.map

/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_room_finder_api_room_finder_api__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__room_details_room_details__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng_socket_io__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng_socket_io__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var NotificationPage = /** @class */ (function () {
    function NotificationPage(navCtrl, navParams, roomFinder, alertCtrl, socket) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.roomFinder = roomFinder;
        this.alertCtrl = alertCtrl;
        this.socket = socket;
        this.notifications = [];
        this.socket.on('roomAddedNotification', function (data) {
            _this.getNotifications();
        });
    }
    NotificationPage.prototype.ionViewCanEnter = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.roomFinder.getNotifications().subscribe(function (data) {
                _this.notifications = data.notifications;
                resolve(true);
            }, function (err) {
                var alert = _this.alertCtrl.create({
                    title: 'Error',
                    message: 'Cannot get your Notifications',
                    buttons: ['OK']
                });
                alert.present();
                reject(true);
            });
        });
    };
    NotificationPage.prototype.viewNotification = function (notification) {
        var _this = this;
        this.roomFinder.viewNotification(notification).subscribe(function (data) {
            if (notification.type == "room") {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__room_details_room_details__["a" /* RoomDetailsPage */], { deal: data.room });
            }
        }, function (err) {
            var alert = _this.alertCtrl.create({
                title: 'Error',
                message: 'Something Went Wrong....might be the post have been deleted',
                buttons: ['OK']
            });
            alert.present();
        });
    };
    NotificationPage.prototype.getNotifications = function () {
        var _this = this;
        this.roomFinder.getNotifications().subscribe(function (data) {
            _this.notifications = data.notifications;
            _this.gotoBottom();
        }, function (err) {
            var alert = _this.alertCtrl.create({
                title: 'Error',
                message: 'Cannot get your Notifications',
                buttons: ['OK']
            });
            alert.present();
        });
    };
    NotificationPage.prototype.gotoBottom = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.content._scroll) {
                _this.content.scrollToBottom();
            }
        }, 500);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */])
    ], NotificationPage.prototype, "content", void 0);
    NotificationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-notification',template:/*ion-inline-start:"C:\Users\uZeR-37\Desktop\NewApp\src\pages\notification\notification.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Notification</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content no-padding>\n  <ion-list>\n    <ion-item *ngFor="let notification of notifications">\n      <ion-thumbnail item-start>\n        <img src="assets/imgs/man.png">\n      </ion-thumbnail>\n      <h2>{{ notifications.pusherName }}</h2>\n      <p text-wrap>{{notification.message}}</p>\n      <button ion-button clear item-end (click)="viewNotification(notification)">View</button>\n    </ion-item>\n  </ion-list>\n\n</ion-content>'/*ion-inline-end:"C:\Users\uZeR-37\Desktop\NewApp\src\pages\notification\notification.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_room_finder_api_room_finder_api__["a" /* RoomFinderApiProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4_ng_socket_io__["Socket"]])
    ], NotificationPage);
    return NotificationPage;
}());

//# sourceMappingURL=notification.js.map

/***/ }),

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddRoomPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_room_finder_api_room_finder_api__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_image_picker__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng_socket_io__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_ng_socket_io__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var AddRoomPage = /** @class */ (function () {
    function AddRoomPage(navCtrl, camera, roomFinder, fb, loadingCtrl, imagePicker, socket, alertCtrl) {
        this.navCtrl = navCtrl;
        this.camera = camera;
        this.roomFinder = roomFinder;
        this.fb = fb;
        this.loadingCtrl = loadingCtrl;
        this.imagePicker = imagePicker;
        this.socket = socket;
        this.alertCtrl = alertCtrl;
        this.facilities = ['Separate Kitchen', 'Attached Bathroom', 'Drinking Water', 'Dining Room'];
        this.roomImage = [];
        this.room = {};
    }
    AddRoomPage.prototype.ngOnInit = function () {
        this.addRoomForm = this.fb.group({
            typeOfRent: ['', [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required]],
            numberOfRoom: [1, [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].max(30)]],
            facilitiesAvailable: this.fb.group({
                'Separate Kitchen': [false],
                'Attached Bathroom': [false],
                'Drinking Water': [false],
                'Dining Room': [false]
            }),
            additionalFeatures: [''],
            price: [1000, [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required]],
            location: ['', [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required]]
        });
    };
    AddRoomPage.prototype.openCamera = function () {
        var _this = this;
        var options = {
            quality: 40,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            saveToPhotoAlbum: true
        };
        this.camera.getPicture(options).then(function (imageData) {
            var imgData = 'data:image/jpeg;base64,' + imageData;
            _this.roomImage.push(imgData);
        }, function (err) {
            // Handle error
        });
    };
    AddRoomPage.prototype.selectFromGallery = function () {
        var _this = this;
        var options = {
            quality: 40,
            outputType: 1
        };
        this.imagePicker.getPictures(options)
            .then(function (images) {
            images.forEach(function (image) {
                var imgData = 'data:image/jpeg;base64,' + image;
                _this.roomImage.push(imgData);
            });
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    AddRoomPage.prototype.addRoom = function () {
        var _this = this;
        if (!this.addRoomForm.invalid) {
            this.room = this.addRoomForm.value;
            this.room['RoomImage'] = this.roomImage;
            var loading_1 = this.loadingCtrl.create({
                content: 'Adding Room Please wait...'
            });
            loading_1.present();
            this.roomFinder.addRoom(this.room).subscribe(function (res) {
                if (res.statusCode == 200) {
                    _this.roomFinder.sendNotifications(res.roomData).subscribe(function (data) {
                        _this.socket.emit('roomAdded', {});
                        loading_1.dismiss();
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
                    }, function (err) {
                        loading_1.dismiss();
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
                    });
                }
                else {
                    loading_1.dismiss();
                    _this.err = "Please fill all the fields along with image";
                    var alert_1 = _this.alertCtrl.create({
                        title: "Cannot Add Room Now....",
                        message: _this.err,
                        buttons: ['OK']
                    });
                    alert_1.present();
                }
            }, function (err) {
                loading_1.dismiss();
                _this.err = "Something wrong going on with server";
                var alert = _this.alertCtrl.create({
                    title: "Cannot Add Room Now....",
                    message: _this.err,
                    buttons: ['OK']
                });
                alert.present();
            });
        }
        else {
            console.log('INVALID');
        }
    };
    AddRoomPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-add-room',template:/*ion-inline-start:"C:\Users\uZeR-37\Desktop\NewApp\src\pages\add-room\add-room.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Add Room</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <form [formGroup]=\'addRoomForm\'>\n    <ion-item>\n      <ion-label stacked ion-text color="primary"> Type of rent:</ion-label>\n      <ion-select formControlName="typeOfRent">\n        <ion-option value="flat">Flat</ion-option>\n        <ion-option value="room">Room</ion-option>\n      </ion-select>\n    </ion-item>\n\n    <ion-item>\n      <ion-label color="primary" stacked>Number of room</ion-label>\n      <ion-input type="number" name="numberOfRoom" min=1 formControlName=\'numberOfRoom\'></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label color="primary" stacked> Facilities Available </ion-label>\n    </ion-item>\n\n    <ion-list formGroupName="facilitiesAvailable">\n      <ion-item class="checkbox" *ngFor="let facility of facilities">\n        <ion-label>{{facility}}</ion-label>\n        <ion-checkbox formControlName="{{facility}}"></ion-checkbox>\n      </ion-item>\n    </ion-list>\n\n    <ion-item>\n      <ion-label stacked ion-text color="primary">Additional Features</ion-label>\n      <ion-textarea formControlName="additionalFeatures"></ion-textarea>\n    </ion-item>\n\n    <ion-item>\n      <ion-label stacked ion-text color="primary">Price(in Rs.)</ion-label>\n      <ion-input type="Number" name="price" formControlName="price"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label stacked ion-text color="primary">Location</ion-label>\n      <ion-input type="text" name="location" formControlName="location"></ion-input>\n    </ion-item>\n\n    <ion-grid>\n      <ion-row>\n        <ion-col text-center>\n          <img *ngIf="(roomImage.length == 0)" src="{{\'assets/imgs/no-image.png\' }}" style="width: 85%">\n          <ion-slides pager *ngIf="(roomImage.length > 0)">\n            <ion-slide *ngFor="let img of roomImage">\n              <img src="{{ img }}" style="width: 85%">\n            </ion-slide>\n          </ion-slides>\n        </ion-col>\n      </ion-row>\n      <ion-row text-center>\n        <ion-col col-6>\n          <button ion-button block outline color="dark" (click)="openCamera()" text-wrap>Camera</button>\n        </ion-col>\n        <ion-col col-6>\n          <button ion-button block outline color="dark" (click)="selectFromGallery()" text-wrap>Gallery</button>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n\n    <div text-center margin-top>\n      <button ion-button (click)="addRoom()" round>Add Room</button>\n    </div>\n\n    <ion-item>\n      <p ion-text color="danger"> {{err}} </p>\n    </ion-item>\n  </form>\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\uZeR-37\Desktop\NewApp\src\pages\add-room\add-room.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_3__providers_room_finder_api_room_finder_api__["a" /* RoomFinderApiProvider */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_image_picker__["a" /* ImagePicker */],
            __WEBPACK_IMPORTED_MODULE_7_ng_socket_io__["Socket"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], AddRoomPage);
    return AddRoomPage;
}());

//# sourceMappingURL=add-room.js.map

/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutUsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AboutUsPage = /** @class */ (function () {
    function AboutUsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    AboutUsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AboutUsPage');
    };
    AboutUsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-about-us',template:/*ion-inline-start:"C:\Users\uZeR-37\Desktop\NewApp\src\pages\about-us\about-us.html"*/'<!--\n  Generated template for the AboutUsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n      <button ion-button menuToggle>\n          <ion-icon name="menu"></ion-icon>\n        </button>\n    <ion-title text-center>AboutUs</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\uZeR-37\Desktop\NewApp\src\pages\about-us\about-us.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], AboutUsPage);
    return AboutUsPage;
}());

//# sourceMappingURL=about-us.js.map

/***/ }),

/***/ 297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_room_finder_api_room_finder_api__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__add_info_add_info__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__view_posts_view_posts__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_background_mode__ = __webpack_require__(153);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ProfilePage = /** @class */ (function () {
    function ProfilePage(navCtrl, navParams, roomFinder, menu, loadingCtrl, storage, alertCtrl, backgroundMode) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.roomFinder = roomFinder;
        this.menu = menu;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.backgroundMode = backgroundMode;
        this.myPosts = null;
        this.menu.toggle();
    }
    ProfilePage.prototype.ionViewCanEnter = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var loading = _this.loadingCtrl.create({
                content: 'Please wait...'
            });
            loading.present();
            _this.roomFinder.getUserProfile().subscribe(function (data) {
                _this.myPosts = data.rooms;
                _this.profile = data.user;
                loading.dismiss();
                if (data) {
                    resolve(true);
                }
            }, function (err) {
                var alert = _this.alertCtrl.create({
                    title: 'Error',
                    message: 'Something went wrong...fetching your profile',
                    buttons: ['OK']
                });
                alert.present();
                reject(true);
            });
        });
    };
    ProfilePage.prototype.viewPosts = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__view_posts_view_posts__["a" /* ViewPostsPage */]);
    };
    ProfilePage.prototype.personalDetails = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__add_info_add_info__["a" /* AddInfoPage */]);
    };
    ProfilePage.prototype.logout = function () {
        var _this = this;
        this.storage.set('token', 'logedout').then(function (data) {
            console.log(data);
            _this.menu.enable(false);
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
        }).catch(function (err) {
            var alert = _this.alertCtrl.create({
                title: 'Error',
                message: 'Cannot get your user object',
                buttons: ['OK']
            });
            alert.present();
        });
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-profile',template:/*ion-inline-start:"C:\Users\uZeR-37\Desktop\NewApp\src\pages\profile\profile.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Profile</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content no-padding>\n  <ion-grid>\n    <ion-row>\n      <ion-col col-3>\n        <img src="../../assets/imgs/man.png" alt="Profile PNG" margin-vertical />\n      </ion-col>\n      <ion-col col-9>\n        <ion-item text-wrap>\n          <ion-icon name="person" item-start small></ion-icon>\n          {{ profile.fullname }}\n        </ion-item>\n        <ion-item text-wrap>\n          <ion-icon name="mail" item-start small></ion-icon>\n          {{ profile.email }}\n        </ion-item>\n        <ion-item text-wrap>\n          <ion-icon name="call" item-start small></ion-icon>\n          {{ profile.phone }}\n        </ion-item>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <ion-list inset no-padding>\n    <button ion-item (click)="personalDetails()">\n      <ion-icon name="person" item-start small ></ion-icon>\n      Personal Details\n      <ion-icon name="arrow-dropright" item-end small></ion-icon>\n    </button>\n    <button ion-item (click)="viewPosts()">\n      <ion-icon name="paper" item-start small></ion-icon>\n      View Posts\n      <ion-icon name="arrow-dropright" item-end small></ion-icon>\n    </button>\n    <button ion-item>\n      <ion-icon name="help-circle" item-start small></ion-icon>\n      Get Help\n      <ion-icon name="arrow-dropright" item-end small></ion-icon>\n    </button>\n    <br>\n    <button ion-item (click)="logout()">\n      <ion-icon name="log-out" item-start small></ion-icon>\n      Logout\n      <ion-icon name="ios-arrow-dropright-circle" item-end></ion-icon>\n    </button>\n  </ion-list>\n  \n</ion-content>'/*ion-inline-end:"C:\Users\uZeR-37\Desktop\NewApp\src\pages\profile\profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_room_finder_api_room_finder_api__["a" /* RoomFinderApiProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_background_mode__["a" /* BackgroundMode */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddInfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_room_finder_api_room_finder_api__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AddInfoPage = /** @class */ (function () {
    function AddInfoPage(navCtrl, navParams, fb, roomFinder, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fb = fb;
        this.roomFinder = roomFinder;
        this.alertCtrl = alertCtrl;
        this.yourInfo = {
            typeOfRent: '',
            gender: '',
            food: '',
            smoking: '',
            drinking: '',
            cleanliness: ''
        };
        this.room = {};
    }
    AddInfoPage.prototype.ionViewCanEnter = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.roomFinder.getPersonalInfo().subscribe(function (data) {
                _this.yourInfo = {
                    typeOfRent: data.yourInfo.typeOfRent,
                    gender: data.yourInfo.gender,
                    food: data.yourInfo.food,
                    smoking: data.yourInfo.smoking,
                    drinking: data.yourInfo.drinking,
                    cleanliness: data.yourInfo.cleanliness
                };
                resolve(true);
            }, function (err) {
                var alert = _this.alertCtrl.create({
                    title: 'Unknown Error',
                    message: "Cannot get your personal info.....",
                    buttons: ['OK']
                }).present();
                resolve(true);
            });
        });
    };
    AddInfoPage.prototype.update = function () {
        var _this = this;
        this.roomFinder.updatePersonalInfo(this.yourInfo).subscribe(function (data) {
            _this.getInfo();
            var alert = _this.alertCtrl.create({
                title: 'Successful',
                message: "Updated your personal Info",
                buttons: ['OK']
            }).present();
        }, function (err) {
            var alert = _this.alertCtrl.create({
                title: 'Unknown Error',
                message: "Cannot update your personal info.....",
                buttons: ['OK']
            }).present();
        });
    };
    AddInfoPage.prototype.getInfo = function () {
        var _this = this;
        this.roomFinder.getPersonalInfo().subscribe(function (data) {
            _this.yourInfo = data.yourInfo;
        }, function (err) {
            var alert = _this.alertCtrl.create({
                title: 'Unknown Error',
                message: "Cannot get your personal info.....",
                buttons: ['OK']
            }).present();
        });
    };
    AddInfoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-add-info',template:/*ion-inline-start:"C:\Users\uZeR-37\Desktop\NewApp\src\pages\add-info\add-info.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Personal Details</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h3 text-center style="font-weight: bold"> Type of room you want:</h3>\n  <ion-list radio-group [(ngModel)]="yourInfo.typeOfRent">\n    <ion-buttons>\n      <button ion-item>\n        <ion-label> Flat </ion-label>\n        <ion-radio value="flat"></ion-radio>\n      </button>\n      <button ion-item>\n        <ion-label> Room </ion-label>\n        <ion-radio value="room"></ion-radio>\n      </button>\n    </ion-buttons>\n  </ion-list>\n\n  <h4 text-center style="font-weight: bold">GENDER</h4>\n  <ion-list radio-group [(ngModel)]="yourInfo.gender">\n    <ion-buttons>\n      <button ion-item>\n        <ion-label> Male </ion-label>\n        <ion-radio value="male"></ion-radio>\n      </button>\n      <button ion-item>\n        <ion-label> Female </ion-label>\n        <ion-radio value="female"></ion-radio>\n      </button>\n      <button ion-item>\n        <ion-label> Other </ion-label>\n        <ion-radio value="other"></ion-radio>\n      </button>\n    </ion-buttons>\n  </ion-list>\n\n  <h3 text-center style="font-weight: bold"> LIFE STYLE </h3>\n  <h4 text-center>FOOD</h4>\n  <ion-list radio-group [(ngModel)]="yourInfo.food">\n    <ion-buttons>\n      <button ion-item>\n        <ion-label> Vegeterian </ion-label>\n        <ion-radio value="vegeterian"></ion-radio>\n      </button>\n      <button ion-item>\n        <ion-label> Non-Vegeterian </ion-label>\n        <ion-radio value="non-vegeterian"></ion-radio>\n      </button>\n    </ion-buttons>\n  </ion-list>\n\n  <h4 text-center>SMOKING</h4>\n  <ion-list radio-group [(ngModel)]="yourInfo.smoking">\n    <ion-buttons>\n      <button ion-item>\n        <ion-label> Smoker </ion-label>\n        <ion-radio value="smoker"></ion-radio>\n      </button>\n      <button ion-item>\n        <ion-label> Non-Smoker </ion-label>\n        <ion-radio value="non-smoker"></ion-radio>\n      </button>\n    </ion-buttons>\n  </ion-list>\n\n  <h4 text-center>DRINKING</h4>\n  <ion-list radio-group [(ngModel)]="yourInfo.drinking">\n    <ion-buttons>\n      <button ion-item>\n        <ion-label> Drinker </ion-label>\n        <ion-radio value="drinker"></ion-radio>\n      </button>\n      <button ion-item>\n        <ion-label> Non-Drinker </ion-label>\n        <ion-radio value="non-drinker"></ion-radio>\n      </button>\n    </ion-buttons>\n  </ion-list>\n\n  <h4 text-center>CLEANLINESS</h4>\n  <ion-list radio-group [(ngModel)]="yourInfo.cleanliness">\n    <ion-buttons>\n      <button ion-item>\n        <ion-label> Clean </ion-label>\n        <ion-radio value="clean"></ion-radio>\n      </button>\n      <button ion-item>\n        <ion-label> Average </ion-label>\n        <ion-radio value="average"></ion-radio>\n      </button>\n      <button ion-item>\n        <ion-label> Messy </ion-label>\n        <ion-radio value="messy"></ion-radio>\n      </button>\n    </ion-buttons>\n  </ion-list>\n\n  <button ion-button block outline (click)="update()"> Update </button>\n  <ion-item>\n    <p ion-text color="danger"> {{err}} </p>\n  </ion-item>\n\n</ion-content>'/*ion-inline-end:"C:\Users\uZeR-37\Desktop\NewApp\src\pages\add-info\add-info.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_2__providers_room_finder_api_room_finder_api__["a" /* RoomFinderApiProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], AddInfoPage);
    return AddInfoPage;
}());

//# sourceMappingURL=add-info.js.map

/***/ }),

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewPostsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_room_finder_api_room_finder_api__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__room_details_room_details__ = __webpack_require__(64);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ViewPostsPage = /** @class */ (function () {
    function ViewPostsPage(navCtrl, navParams, roomFinder, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.roomFinder = roomFinder;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.myPosts = [];
    }
    ViewPostsPage.prototype.ionViewCanEnter = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var loading = _this.loadingCtrl.create({
                content: 'Please wait...'
            });
            loading.present();
            _this.roomFinder.getRoomsPosts().subscribe(function (data) {
                _this.myPosts = data.rooms;
                loading.dismiss();
                if (data) {
                    resolve(true);
                }
            }, function (err) {
                var alert = _this.alertCtrl.create({
                    title: 'Error',
                    message: 'Cannot Get Your Rooms....Try Again',
                    buttons: ['OK']
                });
                alert.present();
                reject(true);
            });
        });
    };
    ViewPostsPage.prototype.viewDetails = function (deal) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__room_details_room_details__["a" /* RoomDetailsPage */], {
            owner: true,
            deal: deal
        });
    };
    ViewPostsPage.prototype.deleteRoom = function (deal) {
        var _this = this;
        this.roomFinder.deleteRoom(deal._id).subscribe(function (data) {
            _this.roomFinder.getUserProfile().subscribe(function (data) {
                _this.myPosts = data.rooms;
            }, function (err) {
                var alert = _this.alertCtrl.create({
                    title: 'Error',
                    message: 'Cannot Delete Your Room.....Try Again',
                    buttons: ['OK']
                });
                alert.present();
            });
        }, function (err) { console.log(err); });
    };
    ViewPostsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-view-posts',template:/*ion-inline-start:"C:\Users\uZeR-37\Desktop\NewApp\src\pages\view-posts\view-posts.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Posts</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content no-padding style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); ">\n  <ion-list>\n    <ion-item *ngFor="let deal of myPosts" text-wrap no-lines>\n      <ion-card color="" text-center rounded>\n        <img src="{{ roomFinder.BASEURL +\'/RoomImage/\' + deal.roomImage[0] }}" alt="Room Image" />\n        <ion-card-content>\n          <ion-card-title>\n            <b style="font-size:17px; float: left; ">\n              <ion-icon name="pin" color="red"></ion-icon>\n              <b color="black">{{ deal.location}}</b>\n            </b>\n\n            <b style="font-size: 17px; float: right">\n              <ion-icon name="cash" color="green"></ion-icon>\n              <b>Rs: {{deal.price}}</b>\n            </b>\n          </ion-card-title>\n\n          <ion-buttons position>\n            <Button ion-button medium color="green" (click)="viewDetails(deal)" start style="margin-top:25px;">\n              View \n            </Button>\n            <Button ion-button medium color="green" (click)="deleteRoom(deal)" end style="margin-top:25px;">\n              Delete\n            </Button>\n          </ion-buttons>\n         \n        </ion-card-content>\n      </ion-card>\n    </ion-item>\n\n  </ion-list>\n  <ion-item *ngIf="!myPosts">\n    <p> You have no rooms........</p>\n  </ion-item>\n</ion-content>'/*ion-inline-end:"C:\Users\uZeR-37\Desktop\NewApp\src\pages\view-posts\view-posts.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_room_finder_api_room_finder_api__["a" /* RoomFinderApiProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], ViewPostsPage);
    return ViewPostsPage;
}());

//# sourceMappingURL=view-posts.js.map

/***/ }),

/***/ 391:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(396);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 396:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_call_number__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_image_picker__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_background_mode__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_local_notifications__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ng_socket_io__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_ng_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__app_component__ = __webpack_require__(461);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_intro_intro__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_home_home__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_book_room_book_room__ = __webpack_require__(462);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_add_room_add_room__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_about_us_about_us__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_login_login__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_profile_profile__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_signup_signup__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_room_details_room_details__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_search_search__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_add_info_add_info__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_chat_room_chat_room__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_conversations_conversations__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_notification_notification__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_view_posts_view_posts__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__providers_room_finder_api_room_finder_api__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__providers_intercepter_intercepter__ = __webpack_require__(463);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//Dependencies













// const config: SocketIoConfig = { url: 'http://192.168.1.87:3000', options: {} };
var config = { url: 'http://patancollegeroomfinder.herokuapp.com', options: {} };
//Pages
















//Providers


var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_13__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_14__pages_intro_intro__["a" /* IntroPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_book_room_book_room__["a" /* BookRoomPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_add_room_add_room__["a" /* AddRoomPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_about_us_about_us__["a" /* AboutUsPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_room_details_room_details__["a" /* RoomDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_add_info_add_info__["a" /* AddInfoPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_chat_room_chat_room__["a" /* ChatRoomPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_conversations_conversations__["a" /* ConversationsPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_notification_notification__["a" /* NotificationPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_view_posts_view_posts__["a" /* ViewPostsPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_13__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_12_ng_socket_io__["SocketIoModule"].forRoot(config),
                __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["c" /* HttpClientModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_13__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_14__pages_intro_intro__["a" /* IntroPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_book_room_book_room__["a" /* BookRoomPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_add_room_add_room__["a" /* AddRoomPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_about_us_about_us__["a" /* AboutUsPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_room_details_room_details__["a" /* RoomDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_add_info_add_info__["a" /* AddInfoPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_chat_room_chat_room__["a" /* ChatRoomPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_conversations_conversations__["a" /* ConversationsPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_notification_notification__["a" /* NotificationPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_view_posts_view_posts__["a" /* ViewPostsPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_background_mode__["a" /* BackgroundMode */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_local_notifications__["a" /* LocalNotifications */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_call_number__["a" /* CallNumber */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_image_picker__["a" /* ImagePicker */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_29__providers_room_finder_api_room_finder_api__["a" /* RoomFinderApiProvider */],
                { provide: __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HTTP_INTERCEPTORS */], useClass: __WEBPACK_IMPORTED_MODULE_30__providers_intercepter_intercepter__["a" /* IntercepterProvider */], multi: true }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 458:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 461:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng_socket_io__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_intro_intro__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_add_room_add_room__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_about_us_about_us__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_login_login__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_profile_profile__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_background_mode__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_room_finder_api_room_finder_api__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_local_notifications__ = __webpack_require__(154);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





//root










var MyApp = /** @class */ (function () {
    function MyApp(platform, plt, statusBar, splashScreen, menu, storage, socket, backgroundMode, roomFinder, localNotifications) {
        this.platform = platform;
        this.plt = plt;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.menu = menu;
        this.storage = storage;
        this.socket = socket;
        this.backgroundMode = backgroundMode;
        this.roomFinder = roomFinder;
        this.localNotifications = localNotifications;
        this.notifications = [];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */] },
            { title: 'Add Room', component: __WEBPACK_IMPORTED_MODULE_8__pages_add_room_add_room__["a" /* AddRoomPage */] },
            { title: 'About Us', component: __WEBPACK_IMPORTED_MODULE_9__pages_about_us_about_us__["a" /* AboutUsPage */] }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.setRoot();
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.setRoot = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get('token').then(function (data) {
                            if (data == undefined || data == null) {
                                _this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_intro_intro__["a" /* IntroPage */];
                            }
                            else {
                                _this.rootPage = __WEBPACK_IMPORTED_MODULE_10__pages_login_login__["a" /* LoginPage */];
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyApp.prototype.openPage = function (page) {
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.openProfile = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_11__pages_profile_profile__["a" /* ProfilePage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"C:\Users\uZeR-37\Desktop\NewApp\src\app\app.html"*/'<ion-menu id="mainMenu" [content]="content">\n  <ion-header>\n    <ion-avatar margin-top>\n      <img margin-top src="../assets/imgs/man.png" class="profilePicture" (click)="openProfile()" margin-top />\n    </ion-avatar>\n    <Button ion-button small color="google" float-right margin (click)="openProfile()"> View Profile </Button>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)" text-center>\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"C:\Users\uZeR-37\Desktop\NewApp\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4_ng_socket_io__["Socket"],
            __WEBPACK_IMPORTED_MODULE_12__ionic_native_background_mode__["a" /* BackgroundMode */],
            __WEBPACK_IMPORTED_MODULE_13__providers_room_finder_api_room_finder_api__["a" /* RoomFinderApiProvider */],
            __WEBPACK_IMPORTED_MODULE_14__ionic_native_local_notifications__["a" /* LocalNotifications */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 462:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BookRoomPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BookRoomPage = /** @class */ (function () {
    function BookRoomPage(navCtrl) {
        this.navCtrl = navCtrl;
        this.price = 0;
    }
    BookRoomPage.prototype.onInput = function () {
        console.log('Inputed');
    };
    BookRoomPage.prototype.onClick = function () {
        console.log(this.price);
    };
    BookRoomPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BookRoomPage');
    };
    BookRoomPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-book-room',template:/*ion-inline-start:"C:\Users\uZeR-37\Desktop\NewApp\src\pages\book-room\book-room.html"*/'<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\uZeR-37\Desktop\NewApp\src\pages\book-room\book-room.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]])
    ], BookRoomPage);
    return BookRoomPage;
}());

//# sourceMappingURL=book-room.js.map

/***/ }),

/***/ 463:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IntercepterProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(464);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_throw__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators__ = __webpack_require__(390);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var IntercepterProvider = /** @class */ (function () {
    function IntercepterProvider(storage, alertCtrl) {
        this.storage = storage;
        this.alertCtrl = alertCtrl;
    }
    IntercepterProvider.prototype.intercept = function (req, next) {
        var _this = this;
        var tokenPromise = this.storage.get('token');
        return __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"].fromPromise(tokenPromise)
            .mergeMap(function (token) {
            var clonedReq = _this.addToken(req, token);
            return next.handle(clonedReq).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["catchError"])(function (err) {
                var msg = err.message;
                var alert = _this.alertCtrl.create({
                    title: err.name,
                    message: msg,
                    buttons: ['OK']
                });
                alert.present();
                return Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_throw__["_throw"])(err);
            }));
        });
    };
    IntercepterProvider.prototype.addToken = function (request, token) {
        if (token) {
            var clone = void 0;
            clone = request.clone({
                setHeaders: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'token': token
                }
            });
            return clone;
        }
        return request;
    };
    IntercepterProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["a" /* AlertController */]])
    ], IntercepterProvider);
    return IntercepterProvider;
}());

//# sourceMappingURL=intercepter.js.map

/***/ }),

/***/ 63:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__signup_signup__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_room_finder_api_room_finder_api__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var LoginPage = /** @class */ (function () {
    function LoginPage(roomFinder, storage, navCtrl, menu, fb, alertCtrl) {
        this.roomFinder = roomFinder;
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.menu = menu;
        this.fb = fb;
        this.alertCtrl = alertCtrl;
        this.SignUp = __WEBPACK_IMPORTED_MODULE_3__signup_signup__["a" /* SignupPage */];
        this.Home = __WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */];
    }
    LoginPage.prototype.ngOnInit = function () {
        this.loginForm = this.fb.group({
            phone: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(10), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('^9[7-8]{1}[0-9]{8}$')]],
            password: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]]
        });
    };
    LoginPage.prototype.userLogin = function () {
        var _this = this;
        if (!this.loginForm.invalid) {
            this.roomFinder.login(this.loginForm.value).subscribe(function (data) {
                if (data.statusCode == 200 || data.statusCode == 201) {
                    _this.storage.set('token', data.token);
                    _this.storage.set('userObject', data.userObject);
                    _this.navCtrl.setRoot(_this.Home);
                    _this.menu.enable(true);
                }
                else if (data.statusCode == 409) {
                    var alert_1 = _this.alertCtrl.create({
                        title: 'Error',
                        message: data.statusMessage,
                        buttons: ['OK']
                    });
                    alert_1.present();
                }
                else {
                    var alert_2 = _this.alertCtrl.create({
                        title: 'Unknown Error',
                        message: data.statusCode,
                        buttons: ['OK']
                    });
                    alert_2.present();
                }
            }, function (err) {
                var alert = _this.alertCtrl.create({
                    title: 'Error',
                    message: 'Connection Error....Please connect to the Internet',
                    buttons: ['OK']
                });
                alert.present();
            });
        }
        else {
            var alert_3 = this.alertCtrl.create({
                title: 'Error',
                message: 'Invalid fields....',
                buttons: ['OK']
            });
            alert_3.present();
        }
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-login',template:/*ion-inline-start:"C:\Users\uZeR-37\Desktop\NewApp\src\pages\login\login.html"*/'<ion-content padding>\n  <div text-center padding-top>\n      <P style="font-size: 25px; font-weight: bold">ROOM FINDER</P>\n      <img src="../../assets/imgs/logo.png" alt="Brand Logo" class="logo" style="margin-top: auto;">\n      <p style="font-size: 20px; font-weight: bold">Login to your account</p>\n\n  </div>\n\n\n\n  <div>\n    <form [formGroup]="loginForm">\n      <ion-list>\n        <ion-item>\n          <!-- <ion-label color="primary" style="font-size: 12px;" stacked>Phone</ion-label> -->\n          <ion-input type="text" placeholder="Enter Phone" formControlName="phone"> </ion-input>\n        </ion-item>\n        <ion-item>\n          <!-- <ion-label color="primary" style="font-size: 12px;" stacked>Password</ion-label> -->\n          <ion-input type="password" placeholder="Enter Password" formControlName="password"> </ion-input>\n        </ion-item>\n      </ion-list>\n    </form>\n  </div>\n\n\n  <div text-center margin-vertical>\n    <button ion-button block (click)=\'userLogin()\' color="green" style="margin-top: 20px;">Login</button>\n  </div>\n  <ion-row margin-top>\n    <ion-col col-4 >\n      <hr>\n    </ion-col>\n    <ion-col text-center col-4 >Don\'t have an account?</ion-col>\n    <ion-col col-4>\n      <hr>\n    </ion-col>\n  </ion-row>\n  <div text-center>\n    <button ion-button [navPush]="SignUp" color="primary" block style="margin-top:10px;">Signup</button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"C:\Users\uZeR-37\Desktop\NewApp\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__providers_room_finder_api_room_finder_api__["a" /* RoomFinderApiProvider */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 64:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoomDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_room_finder_api_room_finder_api__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_call_number__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__chat_room_chat_room__ = __webpack_require__(159);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RoomDetailsPage = /** @class */ (function () {
    function RoomDetailsPage(navCtrl, navParams, roomFinder, call, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.roomFinder = roomFinder;
        this.call = call;
        this.alertCtrl = alertCtrl;
        this.isOwner = false;
        this.deal = navParams.get('deal');
        this.isOwner = navParams.get('owner');
    }
    RoomDetailsPage.prototype.returnObjectWithTrue = function (obj) {
        var keys = Object.keys(obj);
        var filtered = keys.filter(function (key) {
            return obj[key];
        });
        return filtered;
    };
    RoomDetailsPage.prototype.contact = function (deal) {
        this.call.callNumber(String(deal.ownerPhone), true);
    };
    RoomDetailsPage.prototype.newChat = function (ownerId) {
        var _this = this;
        this.roomFinder.newChat({
            ownerId: ownerId
        }).subscribe(function (data) {
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__chat_room_chat_room__["a" /* ChatRoomPage */], {
                conversationId: data.conversation._id,
                recipient: data.recipient
            });
        }, function (err) {
            var alert = _this.alertCtrl.create({
                title: 'Error',
                message: 'Cannot make a new chat.',
                buttons: ['OK']
            });
            alert.present();
        });
    };
    RoomDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-room-details',template:/*ion-inline-start:"C:\Users\uZeR-37\Desktop\NewApp\src\pages\room-details\room-details.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Room Details</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content margin-top style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); " >\n  <ion-card>\n\n    <ion-slides pager>\n      <ion-slide *ngFor="let img of deal.roomImage">\n        <img src="{{ roomFinder.BASEURL +\'/RoomImage/\' + img }}" />\n      </ion-slide>    \n    </ion-slides>\n    <!-- <ion-card-content> -->\n      <ion-item style=" font-size: 17px">\n        <b> Number Of Rooms :</b> {{ deal.numberOfRoom }}\n        <br>\n        <hr>\n        <b>Location :</b> {{ deal.location }}\n        <br>\n        <hr>\n        <b>Owner Name:</b> {{deal.ownerName}}\n        <br>\n        <hr>\n        <b>Price(Rs) : </b>{{ deal.price }}\n        <br>\n        <hr>\n        <b>Owner Phone :</b> {{ deal.ownerPhone }}\n        <br>\n        <hr>\n        <b>Facilities Available :</b>\n        <ion-list>\n          <ion-item *ngFor="let facilities of returnObjectWithTrue(deal.facilitiesAvailable)"> {{ facilities }}\n          </ion-item>\n        </ion-list>\n        <br>\n        <hr>\n        <b>Other Facilities :</b> <br> {{ deal.additionalFacilities || \'No other facilities\' }}\n        <hr>\n        <ion-grid >\n          <ion-row>\n            <ion-col >\n              <button ion-button icon-only *ngIf="!isOwner" (click)="contact(deal)" color="green" small style="margin-left:0%; padding-top:5px; padding-bottom: 5px; padding-left: 5px;">\n                <ion-icon name="call"> CALL</ion-icon>\n              </button>\n              <button ion-button icon-only *ngIf="!isOwner" (click)="newChat(deal.ownerId)" small style="margin-left:35px; padding-top:5px; padding-bottom: 5px;">\n                <ion-icon name="chatboxes"> MESSAGE</ion-icon>\n              </button>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-item>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"C:\Users\uZeR-37\Desktop\NewApp\src\pages\room-details\room-details.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_room_finder_api_room_finder_api__["a" /* RoomFinderApiProvider */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_call_number__["a" /* CallNumber */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], RoomDetailsPage);
    return RoomDetailsPage;
}());

//# sourceMappingURL=room-details.js.map

/***/ }),

/***/ 89:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_room_finder_api_room_finder_api__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__room_details_room_details__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__search_search__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__conversations_conversations__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__notification_notification__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng_socket_io__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_ng_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_local_notifications__ = __webpack_require__(154);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, viewCtrl, roomFinder, navParams, socket, alertCtrl, localNotifications, plt) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.roomFinder = roomFinder;
        this.navParams = navParams;
        this.socket = socket;
        this.alertCtrl = alertCtrl;
        this.localNotifications = localNotifications;
        this.plt = plt;
        this.unviewedNotification = false;
        this.notifications = [];
        this.searchPage = __WEBPACK_IMPORTED_MODULE_4__search_search__["a" /* SearchPage */];
        this.searchData = {
            searchParam: '',
            founded: null
        };
        this.getRoom();
        this.getNotification();
        this.socket.on('roomAddedNotification', function (data) {
            _this.getNotification();
        });
    }
    HomePage.prototype.viewDetails = function (deal) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__room_details_room_details__["a" /* RoomDetailsPage */], { deal: deal });
    };
    HomePage.prototype.getNotification = function () {
        var _this = this;
        this.roomFinder.getNotifications().subscribe(function (data) {
            _this.notifications = data.notifications;
            _this.unviewedNotifications();
            _this.popup(_this.notifications);
        }, function (err) {
        });
    };
    HomePage.prototype.popup = function (notf) {
        var _this = this;
        notf.forEach(function (notification, index) {
            if (notification.notified == false) {
                _this.localNotifications.schedule({
                    id: index,
                    text: notification.message,
                    sound: _this.plt.is('android') ? 'file://sound.mp3' : 'file://beep.caf',
                    data: {}
                });
                _this.roomFinder.notifiedNotification(notification);
            }
        });
    };
    HomePage.prototype.unviewedNotifications = function () {
        var _this = this;
        this.notifications.forEach(function (notification) {
            if (notification.viewed == false) {
                _this.unviewedNotification = true;
            }
        });
    };
    HomePage.prototype.search = function () {
        var _this = this;
        if (this.searchData.searchParam != '') {
            this.roomFinder.search(this.searchData).subscribe(function (data) {
                _this.searchData.founded = data;
                console.log(_this.searchData);
                _this.navCtrl.push(_this.searchPage, _this.searchData);
            }, function (err) {
                var alert = _this.alertCtrl.create({
                    title: 'Error',
                    message: 'Cannot search for Rooms....',
                    buttons: ['OK']
                });
                alert.present();
            });
        }
    };
    HomePage.prototype.chatPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__conversations_conversations__["a" /* ConversationsPage */]);
    };
    HomePage.prototype.notificationPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__notification_notification__["a" /* NotificationPage */]);
    };
    HomePage.prototype.getRoom = function () {
        var _this = this;
        this.roomFinder.getRoomForHome().subscribe(function (data) {
            if (data.length != 0) {
                _this.deals = data.rooms;
            }
            else {
                _this.deals = [];
            }
        }, function (err) {
            var alert = _this.alertCtrl.create({
                title: 'Error',
                message: 'Cannot find Rooms',
                buttons: ['OK']
            });
            alert.present();
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\uZeR-37\Desktop\NewApp\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-toolbar>\n      <!-- <ion-searchbar [(ngModel)]="searchData.searchParam" (ionInput)="search($event)" placeholder="Search Rooms">\n      </ion-searchbar> -->\n      <ion-searchbar [(ngModel)]="searchData.searchParam" (keyup.enter)="search()" placeholder="Search Rooms">\n      </ion-searchbar>\n      <ion-buttons end>\n        <Button ion-button color="primary" medium icon-only (click)="notificationPage()">\n          <ion-icon name="notifications"> </ion-icon>\n        </Button>\n        <Button ion-button color="primary" medium icon-only (click)="chatPage()">\n          <ion-icon name="chatbubbles"> </ion-icon>\n        </Button>\n      </ion-buttons>\n    </ion-toolbar>\n  </ion-navbar>\n</ion-header>\n\n<!-- <button ion-button *ngIf="unviewedNotification">Have notification</button> -->\n\n<ion-content no-padding style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); ">\n  <ion-list>\n\n    <ion-item *ngFor="let deal of deals" text-wrap no-lines>\n      <ion-card color="" text-center rounded>\n        <img src="{{ roomFinder.BASEURL +\'/RoomImage/\' + deal.roomImage[0] }}" alt="Room Image" />\n        <ion-card-content>\n          <ion-card-title>\n            <b style="font-size:17px; float: left; ">\n              <ion-icon name="pin" color="red"></ion-icon>\n              <b color="black">{{ deal.location}}</b>\n            </b>\n\n            <b style="font-size: 17px; float: right">\n              <ion-icon name="cash" color="green"></ion-icon>\n              <b>Rs: {{deal.price}}</b>\n            </b>\n          </ion-card-title>\n\n          <Button ion-button medium color="green" block (click)="viewDetails(deal)" style="margin-top:25px;">\n            View Details\n          </Button>\n        </ion-card-content>\n      </ion-card>\n    </ion-item>\n\n  </ion-list>\n</ion-content>'/*ion-inline-end:"C:\Users\uZeR-37\Desktop\NewApp\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_room_finder_api_room_finder_api__["a" /* RoomFinderApiProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_7_ng_socket_io__["Socket"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_local_notifications__["a" /* LocalNotifications */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ })

},[391]);
//# sourceMappingURL=main.js.map