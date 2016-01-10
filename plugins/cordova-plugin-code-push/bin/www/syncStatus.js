
 /******************************************************************************************** 
 	 THIS FILE HAS BEEN COMPILED FROM TYPESCRIPT SOURCES. 
 	 PLEASE DO NOT MODIFY THIS FILE AS YOU WILL LOSE YOUR CHANGES WHEN RECOMPILING. 
 	 ALSO, PLEASE DO NOT SUBMIT PULL REQUESTS WITH CHANGES TO THIS FILE. 
 	 INSTEAD, EDIT THE TYPESCRIPT SOURCES UNDER THE WWW FOLDER. 
 	 FOR MORE INFORMATION, PLEASE SEE CONTRIBUTING.md. 
 *********************************************************************************************/ 


/// <reference path="../typings/codePush.d.ts" />
"use strict";
var SyncStatus;
(function (SyncStatus) {
    SyncStatus[SyncStatus["UP_TO_DATE"] = 0] = "UP_TO_DATE";
    SyncStatus[SyncStatus["UPDATE_INSTALLED"] = 1] = "UPDATE_INSTALLED";
    SyncStatus[SyncStatus["UPDATE_IGNORED"] = 2] = "UPDATE_IGNORED";
    SyncStatus[SyncStatus["ERROR"] = 3] = "ERROR";
    SyncStatus[SyncStatus["CHECKING_FOR_UPDATE"] = 4] = "CHECKING_FOR_UPDATE";
    SyncStatus[SyncStatus["AWAITING_USER_ACTION"] = 5] = "AWAITING_USER_ACTION";
    SyncStatus[SyncStatus["DOWNLOADING_PACKAGE"] = 6] = "DOWNLOADING_PACKAGE";
    SyncStatus[SyncStatus["INSTALLING_UPDATE"] = 7] = "INSTALLING_UPDATE";
})(SyncStatus || (SyncStatus = {}));
module.exports = SyncStatus;
