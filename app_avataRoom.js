"use strict";
//
//  app_avataRoom.js
//
//  Created by Alezia Kurdis, December 23th, 2021.
//  Copyright 2021 Vircadia and contributors.
//
//  Application to reach the serverless 3D Avatar bookmarks room.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//
(function() {
    var jsMainFileName = "app_avataRoom.js";
    var ROOT = Script.resolvePath('').split(jsMainFileName)[0];
    var teleporterSoundFileUrl = ROOT + "components/tpsound.mp3";
    var teleportSound = SoundCache.getSound(teleporterSoundFileUrl);
    var APP_NAME = "AVATAROOM";
    var APP_ICON_INACTIVE = ROOT + "components/appicon_i.png";
    var APP_ICON_ACTIVE = ROOT + "components/appicon_a.png";
    
    var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");

    var button = tablet.addButton({
        text: APP_NAME,
        icon: APP_ICON_INACTIVE,
        activeIcon: APP_ICON_ACTIVE,
        sortOrder: 4
    });


    function clicked(){
        button.editProperties({
            isActive: true
        });
        playSound();
        var timer = Script.setTimeout(function () {
            Window.location = ROOT + "components/avataroom.json";
            button.editProperties({
                isActive: false
            });
        }, 3000);
        

    }

    button.clicked.connect(clicked);

    function cleanup() {
        Script.scriptEnding.disconnect(cleanup);
        tablet.removeButton(button);
    }
    
    function playSound() {
        Audio.playSound(teleportSound, { volume: 0.3, localOnly: true });
    };    
    
    Script.scriptEnding.connect(cleanup);
}());
