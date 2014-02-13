
document.addEventListener("deviceready", onDeviceReady, false);
var akey ;
var i;
var currentAppkey;
var buttonid;
var elementid;
var uid;
var uname;
var email;
var oauth;
var requestParams;
var logval = 0;
var options = {
consumerKey: 'u0xqkqG5mn5S1f6FyuXKg',
consumerSecret: 'B5L2Jfd9SSZNJ2MOI50HMgazpOGc0M3WFSRrhICJbTg',
    callbackUrl: 'http://www.nuatransmedia.com/' };
var mentionsId = 0;
var localStoreKey = "tmt5p1";

var storedAccessData, rawData = localStorage.getItem(localStoreKey);

//localStorage.clear();
function relative_time(date_str) {
    if (!date_str) {return;}
    date_str = $.trim(date_str);
    date_str = date_str.replace(/\.\d\d\d+/,""); // remove the milliseconds
    date_str = date_str.replace(/-/,"/").replace(/-/,"/"); //substitute - with /
    date_str = date_str.replace(/T/," ").replace(/Z/," UTC"); //remove T and substitute Z with UTC
    date_str = date_str.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2"); // +08:00 -> +0800
    var parsed_date = new Date(date_str);
    var relative_to = (arguments.length > 1) ? arguments[1] : new Date(); //defines relative to what ..default is now
    var delta = parseInt((relative_to.getTime()-parsed_date)/1000);
    delta=(delta<2)?2:delta;
    var r = '';
    if (delta < 60) {
        r = delta + ' seconds ago';
    } else if(delta < 120) {
        r = 'a minute ago';
    } else if(delta < (45*60)) {
        r = (parseInt(delta / 60, 10)).toString() + ' minutes ago';
    } else if(delta < (2*60*60)) {
        r = 'an hour ago';
    } else if(delta < (24*60*60)) {
        r = '' + (parseInt(delta / 3600, 10)).toString() + ' hours ago';
    } else if(delta < (48*60*60)) {
        r = 'a day ago';
    } else {
        r = (parseInt(delta / 86400, 10)).toString() + ' days ago';
    }
    return 'about ' + r;
}

function goOnline(){
	
	try {
        
		FB.init({ appId: "1519122468313167", nativeInterface: CDV.FB, useCachedDialogs: false });
        
    } catch (e) {
        alert("error= "+e);
    }
    akey=$.ajax({url: "key.txt",async: false}).responseText;
    currentAppkey = $.trim(akey.toLowerCase());
    Check($.trim(akey.toLowerCase()));
}
function offline(){
    $('#login').activity({segments: 8, width: 5, space: 12, length:15, color: 'black', speed: 2});
    navigator.notification.alert("Please Connect Your 3G or Wifi Connection");
    $('#login').activity(false);
}
function onConnectionCheck() {
    var networkState = navigator.network.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';
    if (states[networkState] == 'No network connection') {
        offline();
    }else{
        goOnline();
    }
}
function exitAppPopup() {
    navigator.notification.confirm(
                                   'Do You Want To Exit AppFizz ?'
                                   , function(button) {
                                   if (button == 2) {
                                   navigator.app.exitApp();
                                   }
                                   }
                                   , 'Exit'
                                   , 'No,Yes'
                                   );
    return false;
}
function onBackKeyDown(){
    if($('.ui-page-active').attr('id') == 'icons' ){
        //     exitAppPopup();
    	if ($(".ui-page-active .ui-panel-closed").length=='0')
    	{
    		if ($(".ui-page-active .ui-popup-active").length>'0')
        	{
        		
        	    $('#appwallLoginPage1').popup('close');
        	}
    		else{
    			$('#mypanel').panel('close');
    		}
    	    
    	}
    	else{
    		
    		exitAppPopup();
        }
    }
    else if ($('.ui-page-active').attr('id') == 'login') {
        navigator.app.exitApp();
    }
    else if ($('.ui-page-active').attr('id') == 'text') {
    	$('#mypanel').hide();
        $.mobile.changePage( "#icons",{transition: "slide",reverse: true});
        pan = 1;
        $('#mypanel').panel('open');
    }
    else{
		window.history.back();
    }
}
function onDeviceReady() {
	$('#requestcmt').hide();
    $('#entercmt').hide();
    $('#requestcmt1').hide();
    $('#entercmt1').hide();
    //	    alert(rawData);
    //	    if (rawData !== null) {
    //	        storedAccessData = JSON.parse(rawData);
    //	        options.accessTokenKey = storedAccessData.accessTokenKey;
    //	        options.accessTokenSecret = storedAccessData.accessTokenSecret;
    //
    //	        console.log("AppLaudLog: Attemping oauth with stored token key/secret");
    //	        oauth = OAuth(options);
    //	        oauth.get('https://api.twitter.com/1.1/account/verify_credentials.json?skip_status=true',
    //	                function(data) {
    //	                    var entry = JSON.parse(data.text);
    //	                    console.log("AppLaudLog: Success getting credentials. screen_name: " + entry.screen_name);
    //	                     alert(entry.screen_name);
    //
    //	                },
    //	                function(data) {
    //	                    alert('Error with stored user data. Re-start authorization.');
    //	                    options.accessTokenKey = '';
    //	                    options.accessTokenSecret = '';
    //	                    localStorage.removeItem(localStoreKey);
    //
    //	                    console.log("AppLaudLog: No Authorization from localStorage data");
    //	                }
    //	        );
    //	    } else {
    //	        console.log("AppLaudLog: No localStorage data");
    //
    //	    }
	
	
    
    FB.init({ appId: "1519122468313167", nativeInterface: CDV.FB, useCachedDialogs: false });
    
    
    document.addEventListener("backbutton", onBackKeyDown, false);
    onConnectionCheck();
    
    $(document).on('pageshow', '#icons', function(event) {
                   
                   
                   note();
                   iconsFunction();
                   
                   
                   });
    $(document).on('pageshow', '#information', function(event) {
                   informationFun();
                   });
    
    $(document).on('pageshow', '#rss', function(event) {
                   rss_contentFun();
                   
                   });
    $(document).on('pageshow', '#rsscontentPage', function(event) {
                   rss_contentPageFun();
                   });
    
    $(document).on('pageshow', '#video', function(event) {
                   videoFunc();
                   });
    $(document).on('pageshow', '#audio', function(event) {
                   audioFunc();
                   });
    $(document).on('pageshow', '#text', function(event) {
                   textFunc();
                   });
    
    $(document).on('pageshow', '#textcontent', function(event) {
                   
                   text1Func();
                   });
    
    
    $(document).on('pageshow', '#contact_form', function(event) {
                   contact_formFunc();
                   });
    
    $(document).on('pageshow', '#web_page', function(event) {
                   web_pageFunc();
                   });
    
    $(document).on('pageshow', '#subscriber', function(event) {
                   $('#subscriberback img').click(function(){
                                                  $.mobile.changePage( "#icons",{transition: "slide",reverse: true});
                                                  });
                   subscriberFunc();
                   });
    
    
    
    $(document).on('pagehide', '#icons', function(event, ui){
                   //$(event.target).refresh();
                   $('#linksList').empty();
                   $('#clear img').empty();
                   $('#info img').empty();
                   $('#back img').empty();
                   $('#back img').off('click');
                   $('#clear img').off('click');
                   $('#info img').off('click');
                   $('#apwal').off('click');
                   $('#notify').off('click');
                   $('#subscribe').off('click');
                   //        $('#rff').off('click');
                   //        $('#sec').off('click');
                   //        $('#ds').off('click');
                   //        $('#misc').off('click');
                   //        $('#i7t').off('click');
                   $('#log').off('click');
                   $('#logout').off('click');
                   $('#linksList img').off('click');
                   
                   });
    
    $(document).on('pagehide', '#log', function(event, ui){
                   $('#logback img').empty();
                   $('#logback img').off('click');
                   });
    
    $(document).on('pagehide', '#information', function(event, ui){
                   $('#back img').empty();
                   $('#back img').off('click');
                   });
    
    $(document).on('pagehide', '#rss', function(event, data){
                   $('#rssback img').empty();
                   $('#rssback img').off('click');
                   $('.rsscontentLink').empty();
                   $('.rsscontentLink').off('click');
                   });
    $(document).on('pagehide', '#rsscontentPage', function(event,data) {
                   $('#rsscontentPageback img').empty();
                   $('#rsscontentPageback img').off('click');
                   $('#rssentryText').empty();
                   });
    
    $(document).on('pagehide', '#video', function(event,data) {
                   $('#videoback img').empty();
                   $('#videoback img').off("click");
                   $('#videoppt').empty();
                   $('#videoppt div').off('click');
                   });
    
    $(document).on('pagehide', '#audio', function(event,data) {
                   $('#audioback img').empty();
                   $('#audioback img').off("click");
                   $('#audioppt').empty();
                   $('#audioppt div').off('click');
                   });
    
    $(document).on('pagehide', '#text', function(event,data) {
                   $('#textback img').empty();
                   $('#textback img').off("click");
                   $('#textListview').empty();
                   $('#textListview li').off('click');
                   });
    
    $(document).on('pagehide', '#textcontent', function(event,data) {
                   $('#textcontentback img').empty();
                   $('#textcontentback img').off("click");
                   $('#textcontentnext').off("click");
                   $('#textcontentpre').off("click");
                   $('#textcontentnext').val("");
                   $('#textcontentpre').off("");
                   $('#contentNext').empty();
                   $('#contentPre').empty();
                   $('#contentNext').off('click');
                   $('#contentPre').off('click');
                   $('#textcontentheading').empty();
                   $('#textcontentTitle').empty();
                   $('#textcontentText').empty();
                   $('#textcontentPrice').empty();
                   });
    
    $(document).on('pagehide', '#contact_form', function(event,data) {
                   $('#contactback img').empty();
                   $('#contactback img').off("click");
                   $('#contactsubject').val("");
                   $('#contactbody').val("");
                   $('#sendMail').off('click');
                   });
    
    $(document).on('pagehide', '#web_page', function(event,data) {
                   $('#web_pageback img').empty();
                   $('#web_pageback img').off("click");
                   });
    
    $(document).on('pagehide', '#subscriber', function(event,data) {
                   $('#subscriberback img').empty();
                   $('#subscriberback img').off("click");
                   });
    
    
    
    
    
    $('#map').on('pageshow', function() {
                 document.getElementById("mapheading").innerHTML=results.title;
                 document.getElementById("mapaddress").value=mapAddress;
                 $('#mapback img').click(function(){
                                         $.mobile.changePage( "#icons",{transition: "slide",reverse: true});
                                         });
                 
                 $('#mapButton').click(function(){
                                       codeAddress();
                                       });
                 
                 
                 function codeAddress() {
                 var address = document.getElementById('mapaddress').value;
                 geocoder.geocode( { 'address': address}, function(results, status) {
                                  if (status == google.maps.GeocoderStatus.OK) {
                                  map.setCenter(results[0].geometry.location);
                                  var marker = new google.maps.Marker({
                                                                      map: map,
                                                                      position: results[0].geometry.location
                                                                      });
                                  } else {
                                  alert('Geocode was not successful for the following reason: ' + status);
                                  }
                                  });
                 }
                 
                 });
    
    $(document).on('pagehide', '#map', function(event,data) {
                   $('#mapback img').empty();
                   $('#mapback img').off("click");
                   $('#mapButton').off("click");
                   });
    
    var content = $.ajax({url:"http://build.myappbuilder.com/api/incentive_programs.json?api_key="+$.trim(akey.toLowerCase()),async: false}).responseText;
    var result = $.parseJSON(content);
    
    $.each(result, function(i, v) {
           
           $("#grp").append('<option id="'+v.id+'" value="'+v.name+'">'+v.name+'</option>');
           
           });
    
}
var pan;
var contentText;
var results;
var buttons;
var bg;
var filepath;
var frame= "img/frame.png";
var idvalue
var geocoder;
var map;
var mobileDemo = { 'center': '57.7973333,12.0502107', 'zoom': 10 };
/*function generalsearchgo(){
 
 akey = document.getElementById("appkey").value.toLowerCase();
 if(localStorage.appkey1==""){
 localStorage.appkey1= 0;
 navigator.notification.alert("Enter App Key");
 }
 else if(localStorage.appkey1== undefined){
 navigator.notification.alert("Undefined App Key");
 }
 else{
 Check(akey);
 }
 }*/

function Check(val){
    $('#login').activity({segments: 8, width: 5, space: 12, length:15, color: 'black', speed: 2});
    $('#icons').activity({segments: 8, width: 5, space: 12, length:15, color: 'black', speed: 2});
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
                             function (fs)
                             {
                             filepath=fs.root.fullPath;
                             var url = "http://build.myappbuilder.com/api/apps/"+val;
                             var a = "/Data.json";
                             var Path = fs.root.fullPath +a;
                             contentText = $.ajax({url: Path,async: false}).responseText;
                             //if(contentText == '') {
                             var fileTransfer1 = new FileTransfer();
                             
                             fileTransfer1.download(url, Path,
                                                    function (entry)
                                                    {
                                                    contentText = $.ajax({url: entry.fullPath,async: false}).responseText;
                                                    results = $.parseJSON(contentText);
                                                    buttons = results.buttons;
                                                    
                                                    var pubnub = PUBNUB.init({
                                                                             //publish_key: 'pub-c-0531f1ac-f336-4028-802c-22e02496fd77',
                                                                             subscribe_key: 'sub-c-8be7e922-4d3a-11e3-8551-02ee2ddab7fe'
                                                                             
                                                                             });
                                                    
                                                    pubnub.subscribe({
                                                                     channel: $.trim(akey.toLowerCase())+'_test',
                                                                     restore: true,
                                                                     message: function(m){
                                                                     //navigator.notification.vibrate(2000);
                                                                     //                            navigator.notification.beep(1);
                                                                     //                            navigator.notification.alert(
                                                                     //                                String.fromCharCode('&#xf0f3;')+m,  // message
                                                                     //                                alertDismissed,         // callback
                                                                     //                                results.title,            // title
                                                                     //                                'Done'                  // buttonName
                                                                     //                                    );
                                                                     
                                                                     localStorage.mes=m;
                                                                     if(localStorage.mes1== undefined){
                                                                     localStorage.mes1=localStorage.mes;
                                                                     }
                                                                     else{
                                                                     localStorage.mes1=localStorage.mes+","+localStorage.mes1;
                                                                     }
                                                                     
                                                                     note();
                                                                     }
                                                                     
                                                                     });
                                                    function alertDismissed() {
                                                    // do something
                                                    }
                                                    
                                                    $.each( buttons, function (index, value){
                                                           var icurl = value["image"];
                                                           var icPath = fs.root.fullPath+"/MyAppBuilder/"+value["position"]+".png";
                                                           var fileTrans1 = new FileTransfer();
                                                           
                                                           fileTrans1.download(icurl, icPath, function (entry) {
                                                                               console.log("success"+buttons.length);
                                                                               
                                                                               },
                                                                               function (error) {
                                                                               console.log("Some error");
                                                                               }
                                                                               );
                                                           });
                                                    
                                                    timeOut=setTimeout(function() {
                                                                       $('#login').activity(false);
                                                                       $('#icons').activity(false);
                                                                       $.mobile.changePage( "#icons",{transition: "fade",reverse: false});
                                                                       }, 5000);
                                                    
                                                    },
                                                    function (error)
                                                    {
                                                    console.log("download error source " + error.source);
                                                    console.log("download error target " + error.target);
                                                    console.log("upload error code" + error.code);
                                                    console.log("http_status = " + error.http_status);
                                                    $('#login').activity(false);
                                                    localStorage.clear();
                                                    navigator.notification.alert("Invalid Key");
                                                    }
                                                    );
                             /* }else{
                              results = $.parseJSON(contentText);
                              buttons = results.buttons;
                              if(buttons.length >= 0){
                              $('#login').activity(false);
                              $.mobile.changePage( "#icons",{transition: "slide",reverse: false});
                              }else{
                              $('#login').activity(false);
                              $.mobile.changePage( "#icons",{transition: "slide",reverse: false});
                              }
                              }*/
                             }
                             );
}
function note(){
    
	if(localStorage.mes1){
		$('#count').html((localStorage.mes1).split(',').length);
	}
	else{
		$('#count').html('0');
    }
}

function iconsFunction()
{
    
    $('.bg').css('background-image','url("img/bg.png")');
    $('.hd').css('background-image','url("img/nav_bar.png")');
    $('.hd').css('background-size','100%','100%');
    $('.hd').css('background-repeat','repeat-x');
    //    $('.hd').css('height','50px') ;
    $('.hd').css('text-align','center');
    $('.hd').css('color','black');
    $('.img').css('width','100%');
    
    
    
    document.getElementById("title").innerHTML=results.title;
    document.getElementById("reg1title").innerHTML=results.title;
    document.getElementById("log1title").innerHTML=results.title;
    function confirm(button1){
        if(button1==1){
            contentText="";
            onConnectionCheck();
            //$.mobile.changePage( "#login",{transition: "slide",reverse: true});
        }
        else{
            $.mobile.changePage( "#icons",{transition: "slide",reverse: false});
        }
    }
    
    $('#clear img').click(function(){
                          navigator.notification.confirm("This will clear your Current App Key.Do you want to continue?",confirm,"Please Confirm",["Yes","No"]);
                          });
    
    $('#info img').click(function(){
                         pan = 0;
                         $.mobile.changePage( "#information",{transition: "slide",reverse: false});
                         });
    
    $('#subscribe').click(function(){
                          //    	alert("hi");
                          $.mobile.changePage( "#subscriber",{transition: "slide",reverse: false});
                          });
    $('#apwal').click(function(){
                      
                      $.mobile.changePage( "#appwall",{transition: "slide",reverse: false});
                      });
    $('#notify').click(function(){
                       
                       $.mobile.changePage( "#notification",{transition: "slide",reverse: false});
                       });
    
    
    
    $.each( buttons, function (index, value){
           imagescr =filepath+'/MyAppBuilder/'+value["position"]+'.png';
           
           $('#linksList').append('<li id="'+value["position"]+'" data-icon="false"><a href="#"><img src="'+imagescr+'"class="ui-li-icon">'+value["title"]+'</a></a></li>');
           //alert(value["title"]);
           // if((value["position"]%2)!=0){
           
           //     $('#linksList').append('<div class="ui-block-a" align="center" style="height: 80px; text-align:center; background-image: url(' + frame + ');background-position: center; background-size: contain; background-repeat: no-repeat; margin: 1% 0% 20% 0%"><img id='+value["position"]+' src='+imagescr+'  style="height: 35px; width: 35px; margin-top:15px; margin-left:14px"/><br><br><br><b id='+value["position"]+' style="margin-top:12px; margin-left:16px">'+value["title"]+'</b></div>');
           //  }
           
           // else{
           
           //     $('#linksList').append('<div class="ui-block-b" align="center" style="height: 80px; text-align:center; background-image: url(' + frame + ');background-position: center; background-size: contain; background-repeat: no-repeat; margin: 1% 0% 20% 0%"><img id='+value["position"]+' src='+imagescr+'  style="height: 35px; width: 35px; margin-top:15px; margin-left:14px"/><br><br><br><b id='+value["position"]+' style="margin-top:12px; margin-left:16px">'+value["title"]+'</b></div>');
           //  }
           
           });
    
    $("#linksList").listview("refresh");
    $('#linksList li').click(function(){
                             //    	if(localStorage.log==1){
                             i = (this.id-1);
                             buttonid = (buttons[i].id);
                             //    		alert(buttonid);
                             txtContent=buttons[i].elements[0].content_type;
                             
                             if(txtContent=="rss_feed"){
                             
                             rssUrl=buttons[i].elements[0].rss_url;
                             rssTitle=buttons[i].elements[0].title;
                             entries = [];
                             $.mobile.changePage( "#rss",{transition: "slide",reverse: false});
                             }
                             else if(txtContent=="video"){
                             videoTitle=buttons[i].elements[0].title;
                             videoText=buttons[i].elements[0].text;
                             videoUrl=buttons[i].elements[0].video.url;
                             videoThumbnail=buttons[i].elements[0].video.thumbnail;
                             checkIfFileExists(filepath+"/MyAppBuilder/"+videoTitle+".png");
                             }
                             else if(txtContent == "audio"){
                             audioTitle=buttons[i].elements[0].title;
                             audioText=buttons[i].elements[0].text;
                             audioUrl=buttons[i].elements[0].audio.url;
                             audioThumbnail=buttons[i].elements[0].audio.thumbnail;
                             checkIfFileExists(filepath+"/MyAppBuilder/"+audioTitle+".png");
                             }
                             else if(txtContent=="contact_form"){
                             contact_formTitle=buttons[i].elements[0].title;
                             contact_formEmail=buttons[i].elements[0].email;
                             $.mobile.changePage( "#contact_form",{transition: "slide",reverse: false});
                             }
                             else if(txtContent=="web_page"){
                             web_pageTitle=buttons[i].elements[0].title;
                             web_pageText=buttons[i].elements[0].text;
                             web_pageUrl=buttons[i].elements[0].live_url;
                             $.mobile.changePage( "#web_page",{transition: "slide",reverse: false});
                             }
                             else if(txtContent=="map"){
                             mapAddress=buttons[i].elements[0].addresses[0].address;
                             $.mobile.changePage( "#map",{transition: "slide",reverse: false});
                             //document.location.href="map.html"
                             }
                             else{
                             
                             textTitle=buttons[i].title;
                             textPage = buttons[i].elements.length;
                             
                             textElement = buttons[i].elements;
                             if(textPage > 1){
                             $.mobile.changePage( "#text",{transition: "slide",reverse: false});
                             }
                             else{
                             textTitle1=buttons[i].elements[0].title;
                             textText1=buttons[i].elements[0].text;
                             textPrice1=buttons[i].elements[0].price
                             $.mobile.changePage( "#textcontent",{transition: "slide",reverse: false});
                             }
                             
                             }
                             //        }
                             //    	else{
                             //    		$('#appwallLoginPage1').popup('open');
                             //    	}
                             
                             });
    if(localStorage.appwallLoginData){
    	$('#log').hide();
    	$('#logout').show();
        //    	$('#mypanel').panel('open');
    }
    else{
    	$('#logout').hide();
    	$('#log').show();
        //    	$('#mypanel').panel('open');
    }
    
    $('#log').click(function(){
                    logval = 0;
                    //        $.mobile.changePage( "#log",{transition: "slide",reverse: false});
                    
                    $('#appwallLoginPage1').popup('open');
                    });
    $('#logout').click(function(){
                       if(localStorage.mes1){
                       //	        var appwallLoginData = localStorage.appwallLoginData;
                       //	        var sender_id = localStorage.sender_id;
                       var mes1 = localStorage.mes1;
                       localStorage.clear();
                       //    	    	localStorage.appwallLoginData = appwallLoginData;
                       //    	        localStorage.sender_id = sender_id;
                       localStorage.mes1 = mes1;
                       note();
                       FB.logout(function(response) {
                                 alert('logged out');
                                 });
                       window.localStorage.removeItem(localStoreKey);
                       logval = 0;
                       }
                       else{
                       localStorage.clear();
                       FB.logout(function(response) {
                                 alert('logged out');
                                 });
                       window.localStorage.removeItem(localStoreKey);
                       logval = 0;
                       }
                       
                       $('#logout').hide();
                       $('#log').show();
                       });
    
    if(pan==1){
        $('#mypanel').show();
       	$('#mypanel').panel('open');
    }
    
}

function checkIfFileExists(path){
    
    $.ajax({url: path,success: function(data){
           if(txtContent=="video"){
           $.mobile.changePage( "#video",{transition: "slide",reverse: false});
           }
           else{
           $.mobile.changePage( "#audio",{transition: "slide",reverse: false});
           }
           },error:function(data){
           if(txtContent=="video"){
           window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
                                    imagePath = fs.root.fullPath +"/MyAppBuilder/"+videoTitle+".png";
                                    var fileTransfer2 = new FileTransfer();
                                    fileTransfer2.download(videoThumbnail, imagePath, function (entry) {
                                                           videofullpath=fs.root.fullPath;
                                                           videopath=entry.fullPath;
                                                           $.mobile.changePage( "#video",{transition: "slide",reverse: false});
                                                           },
                                                           function (error) {
                                                           console.log("Some error");
                                                           }
                                                           );
                                    });
           }
           else{
           window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
                                    imagePath = fs.root.fullPath +"/MyAppBuilder/"+audioTitle+".png";
                                    var fileTransfer3 = new FileTransfer();
                                    fileTransfer3.download(audioThumbnail, imagePath, function (entry) {
                                                           audiofullpath=fs.root.fullPath;
                                                           audiopath=entry.fullPath;
                                                           $.mobile.changePage( "#audio",{transition: "slide",reverse: false});
                                                           },
                                                           function (error) {
                                                           console.log("Some error");
                                                           }
                                                           );
                                    });
           }
           }
           });
    
    
}

function informationFun(){
    
    $('#back img').click(function(){
                         $.mobile.changePage( "#icons",{transition: "slide",reverse: true});
                         });
    document.getElementById("heading").innerHTML=results.title;
    document.getElementById("description").innerHTML=results.description;
    document.getElementById("author").innerHTML=results.author;
    document.getElementById("about_author").innerHTML=results.about_author;
    document.getElementById("copyright").innerHTML=results.copyright;
    document.getElementById("price").innerHTML=results.price;
}

function renderEntries(entries) {
    
    var s = '';
    $.each(entries, function(i, v) {
           s += '<li><a href="#rsscontentPage" class="rsscontentLink" data-entryid="'+i+'">' + v.title + '</a></li>';
           });
    $("#rsslistview").html(s);
    $("#rsslistview").listview("refresh");
    $('#rss').activity(false);
    $(".rsscontentLink").click(function() {
                               selectedEntry = $(this).data("entryid");
                               
                               });
}
entries = [];
function rss_contentFun(){
    document.getElementById("rssheading").innerHTML=results.title;
    document.getElementById("rsstitle").innerHTML=rssTitle;
    
    $('#rssback img').click(function(){
                            $.mobile.changePage( "#icons",{transition: "slide",reverse: true});
                            });
    
    
    if(entries.length <=0){
        $('#rss').activity({segments: 8, width: 5, space: 6, length:7, color: 'black', speed: 2});
        $.ajax({url:rssUrl,success:function(res,code) {
               entries = [];
               var xml = $(res);
               var items = xml.find("item");
               $.each(items, function(i, v) {
                      entry = {
                      title:$(v).find("title").text(),
                      link:$(v).find("link").text(),
                      description:$.trim($(v).find("description").text())
                      };
                      entries.push(entry);
                      });
               renderEntries(entries);
               },
               error:function(jqXHR,status,error) {
               
               if(entries) {
               $("#rssstatus").html("Using cached version...");
               $('#rss').activity({segments: 8, width: 5, space: 6, length:7, color: 'black', speed: 2});
               renderEntries(entries);
               } else {
               $("#rssstatus").html("Sorry, we are unable to get the RSS and there is no cache.");
               }
               }
               });
    }else{
        $('#rss').activity({segments: 8, width: 5, space: 6, length:7, color: 'black', speed: 2});
        renderEntries(entries);
    }
    
}

function rss_contentPageFun(){
    document.getElementById("rsscontentPageheading").innerHTML=results.title;
    $('#rsscontentPageback img').click(function(){
                                       $.mobile.changePage( "#rss",{transition: "slide",reverse: true});
                                       });
    
    
    
    document.getElementById("rsscontentPageHeading1").innerHTML=entries[selectedEntry].title;
    var contentHTML = "";
    contentHTML +='<p>'+entries[selectedEntry].description+'</p>';
    contentHTML += '<p/><div id="rssurl"><a id="'+entries[selectedEntry].link + '" href="#">Read Entry on Site</a></div>';
    $("#rssentryText").html(contentHTML);
    function iabLoadStart(event) {
        //$('#rsscontentPage').activity({segments: 8, width: 5, space: 6, length:7, color: 'black', speed: 2});
        console.log(event.type + ' - ' + event.url);
    }
    
    function iabLoadStop(event) {
        console.log(event.type + ' - ' + event.url);
    }
    
    function iabLoadError(event) {
        console.log(event.type + ' - ' + event.message);
    }
    function iabClose(event) {
        
    }
    $('#rssurl a').click(function(){
                         iabRef = window.open(this.id, '_blank', 'location=no');
                         iabRef.addEventListener('loadstart', iabLoadStart);
                         iabRef.addEventListener('loadstop', iabLoadStop);
                         iabRef.removeEventListener('loaderror', iabLoadError);
                         iabRef.addEventListener('exit', iabClose);
                         });
    
    
}

function videoplay(video1){
    $('#video').activity(false);
    portrait="NO";
    CDVVideo.play(video1, portrait);
}
function checkIfVideoFileExists(path){
    $.ajax({url: path,success: function(data){
           videoplay(filepath+"/MyAppBuilder/"+videoTitle+".mp4");
           },
           error: function(data){
           
           $('#video').activity({segments: 8, width: 5, space: 12, length:15, color: 'black', speed: 2});
           var url = videoUrl;
           var imagePath;
           
           window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
                                    imagePath = fs.root.fullPath +"/MyAppBuilder/"+videoTitle+".mp4";
                                    var fileTransfer4 = new FileTransfer();
                                    fileTransfer4.download(url, imagePath, function (entry) {
                                                           videoplay(entry.fullPath);
                                                           }, function (error) {
                                                           console.log("Some error");
                                                           });
                                    
                                    })
           },
           })
}

function videoFunc(){
    
    document.getElementById("videoheading").innerHTML=results.title;
    document.getElementById("videoTitle").innerHTML=videoTitle;
    document.getElementById("videoText").innerHTML=videoText;
    $('#videoback img').click(function(){
                              $.mobile.changePage( "#icons",{transition: "slide",reverse: true});
                              });
    var videofilepath =filepath+"/MyAppBuilder/"+videoTitle+".png";
    $('#videoppt').append('<div><img src="'+videofilepath+'" style="height: 100px; width: 100px; align:center;"/><div>');
    
    $('#videoppt div').click(function(){
                             checkIfVideoFileExists(filepath+"/MyAppBuilder/"+videoTitle+".mp4");
                             });
}


function audioplay(audio){
    $('#audio').activity(false);
    portrait="NO";
    CDVVideo.play(audio, portrait)
}
function checkIfAudioFileExists(path){
    $.ajax({url: path,success: function(data){
           audioplay(filepath+"/MyAppBuilder/"+audioTitle+".mp3");
           },
           error: function(data){
           
           $('#audio').activity({segments: 8, width: 5, space: 12, length:15, color: 'black', speed: 2});
           var url = audioUrl;
           var imagePath;
           
           window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
                                    imagePath = fs.root.fullPath +"/MyAppBuilder/"+audioTitle+".mp3";
                                    var fileTransfer5 = new FileTransfer();
                                    fileTransfer5.download(url, imagePath, function (entry) {
                                                           audioplay(entry.fullPath);
                                                           }, function (error) {
                                                           console.log("Some error");
                                                           });
                                    
                                    })
           },
           })
}
function audioFunc(){
    
    document.getElementById("audioheading").innerHTML=results.title;
    document.getElementById("audioTitle").innerHTML=audioTitle;
    document.getElementById("audioText").innerHTML=audioText;
    $('#audioback img').click(function(){
                              $.mobile.changePage( "#icons",{transition: "slide",reverse: true});
                              });
    var audiofilepath =filepath+"/MyAppBuilder/"+audioTitle+".png";
    $('#audioppt').append('<div><img src="'+audiofilepath+'" style="height: 100px; width: 100px; align:center;"/><div>');
    
    $('#audioppt div').click(function(){
                             checkIfAudioFileExists(filepath+"/MyAppBuilder/"+audioTitle+".mp3");
                             });
}

function textFunc(){
    document.getElementById("textheading").innerHTML=results.title;
    document.getElementById("textTitle").innerHTML=textTitle;
    
    $('#textback img').click(function(){
                             $('#mypanel').hide();
                             $.mobile.changePage( "#icons",{transition: "slide",reverse: true});
                             pan = 1;
                             $('#mypanel').panel('open');
                             });
    
    $.each(textElement, function (index, value){
           $('#textListview').append('<li id="'+value["position"]+'"><a>' + value["title"] + '</a></li>');
           });
    $("#textListview").listview("refresh");
    
    $("#textListview li").click(function(){
                                idvalue = (this.id-1);
                                
                                element_id = buttons[i].elements[idvalue].id;
                                //alert(element_id);
                                textTitle1=textElement[idvalue].title;
                                textText1=textElement[idvalue].text;
                                textPrice1=textElement[idvalue].price;
                                $.mobile.changePage( "#textcontent",{transition: "slide",reverse: false});
                                });
    
}

function text1Func(){
    document.getElementById("textcontentheading").innerHTML=results.title;
    document.getElementById("textcontentTitle").innerHTML=textTitle1;
    document.getElementById("textcontentText").innerHTML=textText1;
    document.getElementById("textcontentPrice").innerHTML="Price :"+textPrice1;
    $('#contentPre').html('<div><button id="textcontentpre">PREV</button></div>').trigger("create");
    $('#contentNext').html('<div><button id="textcontentnext">NEXT</button></div>').trigger("create");
    
    $('audio,video').bind('play', function() {
                          activated = this;
                          
                          $('audio,video').each(function() {
                                                if(this != activated) this.pause();
                                                });
                          });
    
    
    
    $('#textcontentback img').click(function(){
                                    window.history.back();
                                    //        	 $('#mypanel').hide();
                                    //                 $.mobile.changePage( "#icons",{transition: "slide",reverse: true});
                                    //                 pan = 1;
                                    //                 $('#mypanel').panel('open');
                                    });
    
    if(textPage==1){
        $('#contentPre').hide();
        $('#contentNext').hide();
    }
    else{
        if(idvalue==0){
            $('#contentPre').hide();
            
        }
        else{
            $('#contentPre').show();
        }
        if(idvalue==textPage-1){
            $('#contentNext').hide();
        }
        else{
            $('#contentNext').show();
        }
    }
    
    $('#textcontentnext').click(function(){
                                
                                idvalue=idvalue+1;
                                element_id = buttons[i].elements[idvalue].id;
                                textTitle1=textElement[idvalue].title;
                                textText1=textElement[idvalue].text;
                                textPrice1=textElement[idvalue].price;
                                text1Func();
                                //                document.getElementById("textcontentTitle").innerHTML=textElement[idvalue].title;
                                //                document.getElementById("textcontentText").innerHTML=textElement[idvalue].text;
                                //                document.getElementById("textcontentPrice").innerHTML="Price :"+textElement[idvalue].price;
                                
                                
                                if(textPage==1){
                                
                                $('#contentNext').hide();
                                $('#contentPre').hide();
                                }
                                else{
                                if(idvalue==0){
                                $('#contentPre').hide();
                                
                                }
                                else{
                                $('#contentPre').show();
                                }
                                if(idvalue==textPage-1){
                                $('#contentNext').hide();
                                }
                                else{
                                $('#contentNext').show();
                                }
                                }
                                
                                });
    $('#textcontentpre').click(function(){
                               
                               idvalue=idvalue-1;
                               element_id = buttons[i].elements[idvalue].id;
                               textTitle1=textElement[idvalue].title;
                               textText1=textElement[idvalue].text;
                               textPrice1=textElement[idvalue].price;
                               text1Func();
                               //                document.getElementById("textcontentTitle").innerHTML=textElement[idvalue].title;
                               //                document.getElementById("textcontentText").innerHTML=textElement[idvalue].text;
                               //                document.getElementById("textcontentPrice").innerHTML="Price : "+textElement[idvalue].price;
                               
                               if(textPage==1){
                               $('#contentNext').hide();
                               $('#contentPre').hide();
                               }
                               else{
                               if(idvalue==0){
                               $('#contentPre').hide();
                               
                               }
                               else{
                               $('#contentPre').show();
                               }
                               if(idvalue==textPage-1){
                               $('#contentNext').hide();
                               }
                               else{
                               $('#contentNext').show();
                               }
                               }
                               
                               });
    
}



function contact_formFunc(){
    document.getElementById("contactheading").innerHTML=results.title;
    document.getElementById("contactTitle").innerHTML=contact_formTitle;
    
    $('#contactback img').click(function(){
                                $.mobile.changePage( "#icons",{transition: "slide",reverse: true});
                                });
    $('#sendMail').click(function(){
                         var subject=document.getElementById("contactsubject").value;
                         var emailTextBody = document.getElementById("contactbody").value;
                         var mail = contact_formEmail;
                         //window.plugins.emailComposer.showEmailComposerWithCallback(function(result){alert(result);},[],subject,emailTextBody,[mail],[],[],true,[]);
                         window.plugins.emailComposer.showEmailComposerWithCallback(function(result){if(result == 2){navigator.notification.alert("Mail has been send");}else if(result == 1){navigator.notification.alert("Please Connect Your 3G or Wifi Connection");}},subject,emailTextBody,[mail],[],[],true,[]);
                         
                         
                         });
}


function web_pageFunc(){
    document.getElementById("web_pageheading").innerHTML=results.title;
    document.getElementById("web_pageTitle").innerHTML=web_pageTitle;
    document.getElementById("web_pageText").innerHTML=web_pageText;
    document.getElementById("web_pageurl").innerHTML=web_pageUrl;
    $('#web_pageback img').click(function(){
                                 $.mobile.changePage( "#icons",{transition: "slide",reverse: true});
                                 });
    
    function iabLoadStart1(event) {
        console.log(event.type + ' - ' + event.url);
        
    }
    function iabLoadStop1(event) {
        console.log(event.type + ' - ' + event.url);
    }
    
    function iabLoadError1(event) {
        console.log(event.type + ' - ' + event.message);
    }
    function iabClose1(event) {
        
    }
    
    $('#web_pageurl').click(function(){
                            iabRef1 = window.open(web_pageUrl, '_blank', 'location=no');
                            iabRef1.addEventListener('loadstart', iabLoadStart1);
                            iabRef1.addEventListener('loadstop', iabLoadStop1);
                            iabRef1.removeEventListener('loaderror', iabLoadError1);
                            iabRef1.addEventListener('exit', iabClose1);
                            });
}

function subscriberFunc(){
	
	
	$('#newsubscriber').click(function(){
                              
                              if((document.getElementById("uname").value=="")||(document.getElementById("email").value=="")){
                              alert("Invalid Parameters");
                              }
                              else{
                              $.post("http://build.myappbuilder.com/api/subscribers.json?api_key="+$.trim(akey.toLowerCase())+"&incentive_program_name="+document.getElementById("grp").value+"&subscriber[username]="+document.getElementById("uname").value+"&subscriber[email]="+document.getElementById("email").value,
                                     
                                     function(data,status){
                                     //alert("Data: " + data + "\nStatus: " + status);
                                     if(status=="success"){
                                     
                                     
                                     
                                     }
                                     else{
                                     
                                     
                                     }
                                     });
                              navigator.notification.alert(
                                                           'You are subscribed to '+document.getElementById("grp").value,  // message
                                                           alertDismissed,         // callback
                                                           results.title,            // title
                                                           'Ok'                  // buttonName
                                                           );
                              function alertDismissed() {
                              
                              document.getElementById("uname").value="";
                              document.getElementById("email").value="";
                              $.mobile.changePage( "#icons",{transition: "slide",reverse: true});
                              }
                              }
                              });
}

//$(document).on('pageshow','#appwall', function(event){
//               $('#appwallback img').click(function(){
//            	   $('#mypanel').hide();
//                                       $.mobile.changePage("#icons",{transition:"slide",reverse:true});
//                                       pan = 1;
//                                       $('#mypanel').panel('open');
//               });
//
//               $('#appwallTitle').append(contentText.title);
//               appWallPostFun();
//
//               });
//
//
//function appWallPostFun(){
//    var url = "http://build.myappbuilder.com/api/messages.json?api_key="+$.trim(akey.toLowerCase());
//    var responsejson = $.ajax({url: url,async: false}).responseText;
//    var messages = $.parseJSON(responsejson);
//    var bodyMgs = '';
//    var mgs_id = [];
//    var body = [];
//    var created_at = [];
//    var parent_id = [];
//    var sender = [];
//    var replyappend ='';
//    var z = 0;
//    var p = 0;
//    //alert("msgLen:"+messages.length);
//    if(messages.length > 0){
//        $.each( messages.reverse(), function( key, value ) {
//               $.each( value, function( k, v ) {
//                      if(k == "id"){
//                      mgs_id.push(v);
//                      }else if(k == "created_at"){
//                      created_at.push(v);
//                      }else if(k == "parent_id"){
//                      parent_id.push(v);
//                      }else if(k == "body"){
//                      body.push(v);
//                      }else if(k == "sender"){
//                      sender.push(v);
//                      }
//
//                      });
//               });
//    }else{
//        bodyMgs = '<a><p align="justify" class="divback" ><font color="black" size="2">No Result Found</font></p></a>';
//    }
//
//    for(var i=0;i<body.length;i++){
//
//        if(parent_id[i] == null){
//            p=0;
//            for(var j=0;j<body.length;j++){
//                p = p+1;
//                if(mgs_id[i] == parent_id[j]){
//                    z= -1;
//                    var k = parseInt(p)+z;
//
//                    replyappend +='<div ><div class="ui-grid-a" style="width:100%;"><div class="ui-block-a" style="width:15%; margin-left:2%;"><img src="img/face.png"/></div><div class="ui-block-b" style="width:80%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" align="left" style="width:25%;font-size:0.7em;">His Magesty</div><div class="ui-block-b" align="right" style="width:75%; font-size:0.7em"><table style="vertical-align: middle;"><tr><td><img src="img/clock.png" style="width:20px; height:20px;"/></td><td>'+relative_time(created_at[k])+'</td></tr></table></div><hr /><br /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;text-align: justify; text-justify: auto;">'+body[k]+'</div><br /><hr /><div class="ui-grid-a" style="width:100%;" ><div class="ui-block-a" style="width:50%;"><img src="img/delete.png" id="delete-'+k+'" class="deleteMgs" /></div><div class="ui-block-b" style="width:50%;"></div></div></div></div></div></div><br />';
//
//                }else{
//
//                }
//
//            }
//            bodyMgs +='<div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:15%; margin-left:2%;"><img src="img/face.png"/></div><div class="ui-block-b" style="width:80%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" align="left" style="width:25%;font-size:0.7em">His Magesty</div><div class="ui-block-b" align="right" style="width:75%; font-size:0.7em"><table style="vertical-align: middle;"><tr><td><img src="img/clock.png" style="width:20px; height:20px;"/></td><td>'+relative_time(created_at[i])+'</td></tr></table></div></div><hr /><br /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;text-align: justify; text-justify: auto;">'+body[i]+'</div><br /><hr /><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:50%"><img src="img/reply.png" id="reply-'+i+'" class="replyMgs" /></div><div class="ui-block-b" style="width:50%"><img src="img/delete.png" id="delete-'+i+'" class="deleteMgs"/></div></div></div></div></div><div class="replyHide" id="replyHide'+i+'" style="width:95%;margin-left:10%;"><div class="ui-grid-a" style="width:100%; "><div class="ui-block-a" style="width:70%;"><input id="replymessage'+i+'" type="text" data-mini="true" data-inline="true" placeholder="Enter Your Reply...." value="" style="border: none;background-color: transparent;"></div><div class="ui-block-b" style="width:25%;"><button id="textReplyMgs" data-mini="true" data-inline="true" onclick="javascript:replymessageFun();" ><font color="black">Reply</font></button></div></div></div><br /><div class="appendreplydata">'+replyappend+'</div><br />';
//            replyappend ='';
//
//        }else{
//            //bodyMgs +='<div style="width:95%;margin-left:5%"><div class="ui-grid-a" style="width:100%;"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:80%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:50%;font-size:0.7em">His Magesty</div><div class="ui-block-b" style="width:50%; font-size:0.7em">'+relative_time(created_at[i])+'</div><hr /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;">'+body[i]+'</div><div class="ui-grid-a" style="width:100%;" ><div class="ui-block-a" style="width:50%;"><button id="delete-'+i+'" class="deleteMgs">Delete</button></div><div class="ui-block-b" style="width:50%;"></div></div></div></div></div></div><br />';
//        }
//    }
//
//    $('#appwallListview').append(bodyMgs).trigger("create");
//    if($('.replyHide').is(':visible')){
//        $('.replyHide').toggle();
//    }else{
//
//    }
//    $(".replyMgs").click(function(){
//                         replyMgsNo1 = (this.id).split('-');
//                         replyMgsNo = mgs_id[replyMgsNo1[1]];
//                         var replyHide = "replyHide"+replyMgsNo1[1];
//                         $('#'+replyHide).toggle();
//
//                         });
//
//    $(".deleteMgs").click(function(){
//                          var deleteMgsNo = (this.id).split('-');
//                          //alert(mgs_id[deleteMgsNo[1]])
//                          $.ajax({url:'http://build.myappbuilder.com/api/messages.json?api_key='+$.trim(akey.toLowerCase())+'&message_id='+mgs_id[deleteMgsNo[1]], type:"DELETE",data:{},
//                                 success:function(response){
//                                 $('#appwallListview').empty();
//                                 appWallPostFun();
//                                 },
//                                 error:function(){ alert("Failure");}
//                                 });
//                          });
//}
//
//function replymessageFun(){
//    var replyarray = "replymessage"+replyMgsNo1[1];
//    var replymessage = $('#'+replyarray).val();
//    if(replymessage == ''){
//        navigator.notification.alert("Please Enter Your Reply...")
//    }else{
//        //alert(replyMgsNo);
//        $.ajax({url:'http://build.myappbuilder.com/api/messages.json?message[body]='+replymessage+'&message[parent_id]='+replyMgsNo+'&message[sender_id]=1&api_key='+$.trim(akey.toLowerCase()), type:"POST",data:{},
//               success:function(response){
//               $('#appwallListview').empty();
//               appWallPostFun();
//               },
//               error:function(){ alert("Failure");}
//               });
//    }
//
//}
//
//
//function postmessageFun(){
//    var postmessage = $('#postmessage').val();
//    if(postmessage == ''){
//        navigator.notification.alert("Please Enter Your Comments...")
//    }else{
//        $.ajax({url:'http://build.myappbuilder.com/api/messages.json?message[body]='+postmessage+'&message[sender_id]=1&api_key='+$.trim(akey.toLowerCase()), type:"POST",data:{},
//               success:function(response){
//               $('#appwallListview').empty();
//               appWallPostFun();
//               },
//               error:function(){ alert("Failure");}
//               });
//    }
//}

$(document).on('pagehide','#appwall', function(event,ui){
               $('#appwallback img').empty();
               
               $('#appwallListview').empty();
               $('#postmessage').val('');
               
               $('#appwallback img').off('click');
               });


$(document).on('pageshow','#notification', function(event){
               $('#notificationback img').click(function(){
                                                $('#mypanel').hide();
                                                $.mobile.changePage("#icons",{transition:"slide",reverse:true});
                                                pan = 1;
                                                $('#mypanel').panel('open');
                                                });
               
               
               notificationFun();
               
               });

function notificationFun(){
    
    //    alert(localStorage.mes1);
    //    var ar[] = localStorage.mes1.split(',');
    //    localStorage.removeItem(mes1);
    //    alert(localStorage.mes1.split(',')[0]);
    if(localStorage.mes1){
        
        $.each((localStorage.mes1).split(','), function (i, v) {
               //alert(v);
               
               //           $('#notes').append('<li><a href="#"><h2>'+v+'</h2><a href="#" class="del" id="'+i+'" data-icon="delete" data-position-to="window"></a></li>');
               
               $('#notes').append('<li><h2>'+v+'</h2></li>');
               
               });
        $('#notes .del').click(function(){
                               //alert(this.id);
                               var ind = this.id;
                               alert((localStorage.mes1).split(',')[this.id]);
                               $('#notes').empty();
                               
                               $.each((localStorage.mes1).split(','), function (i, v) {
                                      
                                      if(i==ind){
                                      //alert("hi");
                                      }
                                      else{
                                      localStorage.mes2=v;
                                      if(localStorage.mes3== undefined){
                                      localStorage.mes1=localStorage.mes2;
                                      }
                                      else{
                                      localStorage.mes3=localStorage.mes2+","+localStorage.mes3;
                                      }
                                      $('#notes').append('<li><a href="#"><h2>'+v+'</h2><a href="#" class="del" id="'+i+'" data-icon="delete" data-position-to="window"></a></li>');
                                      
                                      
                                      }
                                      });
                               alert(localStorage.mes3)
                               //                           localStorage.mes1 = localStorage.mes3;
                               $("#notes").listview("refresh");
                               note();
                               
                               });
        
        
        //                           note();
        //                           notificationFun();
        
        
        $("#notes").listview("refresh");
    }
    else{
        alert("No Notifications");
    }
    
    $('#clearnote').click(function(){
                          //
                          //        notificationFun();
                          navigator.notification.confirm(
                                                         
                                                         'Do You Want To Clear All Notifications?',
                                                         
                                                         function(button) {
                                                         if (button == 1) {
                                                         $("#notes").empty();
                                                         var log = localStorage.log;
                                                         localStorage.clear();
                                                         localStorage.log = log;
                                                         note();
                                                         }
                                                         }
                                                         , 'Clear Notification'
                                                         , 'Yes,No'
                                                         );
                          return false;
                          
                          });
}



$(document).on('pagehide','#notification', function(event,ui){
               $('#notificationback img').empty();
               $('#notificationback img').off('click');
               $('#notes').empty();
               $('#clearnote').off('click');
               
               });


/*--------------------------------- AppWall Posting----------------------*/

$(document).on('pageshow','#appwall', function(event){
               $('#appwallback').click(function(){
                                       $('#mypanel').hide();
                                       $.mobile.changePage("#icons",{transition:"slide",reverse:true});
                                       pan = 1;
                                       $('#mypanel').panel('open');
                                       
                                       });
               $('#appwallTitle').append(contentText.title);
               document.getElementById("logtitle").innerHTML=results.title;
               document.getElementById("regtitle").innerHTML=results.title;
               appWallPostFun();
               });




function appWallPostFun(){
	if(localStorage.appwallLoginData){
		$('#requestcmt').hide();
		$('#entercmt').show();
	}
	else{
		$('#entercmt').hide();
		$('#requestcmt').show();
	}
    var url = "http://build.myappbuilder.com/api/messages.json?api_key="+currentAppkey;
    var responsejson = $.ajax({url: url,async: false}).responseText;
    var messages = $.parseJSON(responsejson);
    var bodyMgs = '';
    var mgs_id = [];
    var body = [];
    var created_at = [];
    var parent_id = [];
    var element_name = [];
    var button_name =[];
    var sender_name = [];
    var sender_id = [];
    var replyappend ='';
    var z = 0;
    var p = 0;
    //alert("msgLen:"+messages.length);
    if(messages.length > 0){
        $.each( messages, function( key, value ) {
               $.each( value, function( k, v ) {
                      if(k == "id"){
                      mgs_id.push(v);
                      }else if(k == "created_at"){
                      created_at.push(v);
                      }else if(k == "parent_id"){
                      parent_id.push(v);
                      }else if(k == "body"){
                      body.push(v);
                      }else if(k == "element_name"){
                      element_name.push(v);
                      }else if(k == "button_name"){
                      button_name.push(v);
                      }else if(k == "sender_name"){
                      sender_name.push(v);
                      }else if(k == "sender_id"){
                      sender_id.push(v);
                      }
                      });
               });
    }else{
        bodyMgs = '<a><p align="justify" class="divback" ><font color="black" size="2">No Result Found</font></p></a>';
    }
    
    for(var i=0;i<body.length;i++){
        
        if(parent_id[i] == null){
            p=0;
            for(var j=0;j<body.length;j++){
                p = p+1;
                if(mgs_id[i] == parent_id[j]){
                    z= -1;
                    var k = parseInt(p)+z;
                    if(localStorage.sender_id == sender_id[k]){
                        if(element_name[k] != null && button_name[k] != null){
                            replyappend +='<div class="ui-grid-a" style="width:100%;"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:80%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" align="left" style="width:20%;font-size:0.7em">'+sender_name[k]+'</div><div class="ui-block-b" align="right" style="width:80%; font-size:0.7em"><table style="vertical-align: middle;"><tr><td><img src="img/clock.png" style="width:20px; height:20px;"/></td><td>'+relative_time(created_at[k])+'</td></tr></table></div></div><font color="white" size="1" style="background-color:#33CCFF">&nbsp;'+button_name[k]+'</font><font size="1">&nbsp;>&nbsp;</font><font color="white" size="1" style="background-color:#33CCFF">&nbsp;'+element_name[k]+'&nbsp;</font><hr /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;"><p align="justify">'+body[k]+'</p></div><hr /><div class="ui-grid-a" style="width:100%;" ><div class="ui-block-a" style="width:25%;"><img src="img/delete.png" id="delete-'+k+'" class="deleteMgs" /></div><div class="ui-block-b" style="width:25%;"></div></div></div></div></div><br />';
                        }else if(button_name[k] != null){
                            replyappend +='<div class="ui-grid-a" style="width:100%;"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:80%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" align="left" style="width:20%;font-size:0.7em">'+sender_name[k]+'</div><div class="ui-block-b" align="right" style="width:80%; font-size:0.7em"><table style="vertical-align: middle;"><tr><td><img src="img/clock.png" style="width:20px; height:20px;"/></td><td>'+relative_time(created_at[k])+'</td></tr></table></div></div><font color="white" style="background-color:#33CCFF">&nbsp;'+button_name[k]+'&nbsp;</font><hr /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;"><p align="justify">'+body[k]+'</p></div><hr /><div class="ui-grid-a" style="width:100%;" ><div class="ui-block-a" style="width:25%;"><img src="img/delete.png" id="delete-'+k+'" class="deleteMgs" /></div><div class="ui-block-b" style="width:25%;"></div></div></div></div></div><br />';
                        }else{
                            replyappend +='<div class="ui-grid-a" style="width:100%;"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:80%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" align="left" style="width:20%;font-size:0.7em">'+sender_name[k]+'</div><div class="ui-block-b" align="right" style="width:80%; font-size:0.7em"><table style="vertical-align: middle;"><tr><td><img src="img/clock.png" style="width:20px; height:20px;"/></td><td>'+relative_time(created_at[k])+'</td></tr></table></div></div><hr /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;"><p align="justify">'+body[k]+'</p></div><hr /><div class="ui-grid-a" style="width:100%;" ><div class="ui-block-a" style="width:25%;"><img src="img/delete.png" id="delete-'+k+'" class="deleteMgs" /></div><div class="ui-block-b" style="width:25%;"></div></div></div></div></div><br />';
                        }
                    }else{
                        if(element_name[k] != null && button_name[k] != null){
                            replyappend +='<div class="ui-grid-a" style="width:100%;"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:80%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" align="left" style="width:20%;font-size:0.7em">'+sender_name[k]+'</div><div class="ui-block-b" align="right" style="width:80%; font-size:0.7em"><table style="vertical-align: middle;"><tr><td><img src="img/clock.png" style="width:20px; height:20px;"/></td><td>'+relative_time(created_at[i])+'</td></tr></table></div></div><font color="white" size="1" style="background-color:#33CCFF">&nbsp;'+button_name[k]+'</font><font size="1">&nbsp;>&nbsp;</font><font color="white" size="1" style="background-color:#33CCFF">&nbsp;'+element_name[k]+'&nbsp;</font><hr /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;"><p align="justify">'+body[k]+'</p></div><hr /><div class="ui-grid-a" style="width:100%;" ><div class="ui-block-a" style="width:25%;"></div><div class="ui-block-b" style="width:25%;"></div></div></div></div></div><br />';
                        }else if(button_name[k] != null){
                            replyappend +='<div class="ui-grid-a" style="width:100%;"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:80%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" align="left" style="width:20%;font-size:0.7em">'+sender_name[k]+'</div><div class="ui-block-b" align="right" style="width:80%; font-size:0.7em"><table style="vertical-align: middle;"><tr><td><img src="img/clock.png" style="width:20px; height:20px;"/></td><td>'+relative_time(created_at[i])+'</td></tr></table></div></div><font color="white" style="background-color:#33CCFF">&nbsp;'+button_name[k]+'&nbsp;</font><hr /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;"><p align="justify">'+body[k]+'</p></div><hr /><div class="ui-grid-a" style="width:100%;" ><div class="ui-block-a" style="width:25%;"></div><div class="ui-block-b" style="width:25%;"></div></div></div></div></div><br />';
                        }else{
                            replyappend +='<div class="ui-grid-a" style="width:100%;"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:80%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" align="left" style="width:20%;font-size:0.7em">'+sender_name[k]+'</div><div class="ui-block-b" align="right" style="width:80%; font-size:0.7em"><table style="vertical-align: middle;"><tr><td><img src="img/clock.png" style="width:20px; height:20px;"/></td><td>'+relative_time(created_at[i])+'</td></tr></table></div></div><hr /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;"><p align="justify">'+body[k]+'</p></div><hr /><div class="ui-grid-a" style="width:100%;" ><div class="ui-block-a" style="width:25%;"></div><div class="ui-block-b" style="width:25%;"></div></div></div></div></div><br />';
                        }
                    }
                }else{
                    
                }
                
            }
            
            if(localStorage.sender_id == sender_id[i]){
                if(element_name[i] != null && button_name[i] != null){
                    bodyMgs +='<div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:80%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" align="left" style="width:20%;font-size:0.7em">'+sender_name[i]+'</div><div class="ui-block-b" align="right" style="width:80%; font-size:0.7em"><table style="vertical-align: middle;"><tr><td><img src="img/clock.png" style="width:20px; height:20px;"/></td><td>'+relative_time(created_at[i])+'</td></tr></table></div></div><div class="ui-grid-a " style="width:100%"><font color="white" size="1" style="background-color:#33CCFF">&nbsp;'+button_name[i]+'</font><font size="1">&nbsp;>&nbsp;</font><font color="white" size="1" style="background-color:#33CCFF">&nbsp;'+element_name[i]+'&nbsp;</font><hr /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;"><p align="justify"><p align="justify">'+body[i]+'</p></p></div><hr /><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:25%"><img src="img/reply.png" id="reply-'+i+'" class="replyMgs" /></div><div class="ui-block-b" style="width:25%"><img src="img/delete.png" id="delete-'+i+'" class="deleteMgs"/></div></div></div></div></div><div class="replyHide" id="replyHide'+i+'" style="width:100%;"><div class="ui-grid-a" style="width:100%; "><div class="ui-block-a" style="width:70%;"><input id="replymessage'+i+'" type="text" data-mini="true" data-inline="true" placeholder="Enter Your Reply...." value="" style="border: none;background-color: transparent;"></div><div class="ui-block-b" style="width:30%;"><button id="textReplyMgs" data-mini="true" data-inline="true" onclick="javascript:replymessageFun();" ><font color="white">Reply</font></button></div></div></div></div><br /><div class="appendreplydata">'+replyappend+'</div><br />';
                    
                }else if(button_name[i] != null){
                    bodyMgs +='<div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:80%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" align="left" style="width:20%;font-size:0.7em">'+sender_name[i]+'</div><div class="ui-block-b" align="right" style="width:80%; font-size:0.7em><table style="vertical-align: middle;"><tr><td><img src="img/clock.png" style="width:20px; height:20px;"/></td><td>'+relative_time(created_at[i])+'</td></tr></table></div></div><font color="white" style="background-color:#33CCFF">&nbsp;'+button_name[i]+'&nbsp;</font><hr /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;"><p align="justify">'+body[i]+'</p></div><hr /><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:25%"><img src="img/reply.png" id="reply-'+i+'" class="replyMgs" /></div><div class="ui-block-b" style="width:25%"><img src="img/delete.png" id="delete-'+i+'" class="deleteMgs"/></div></div></div></div></div><div class="replyHide" id="replyHide'+i+'" style="width:100%;"><div class="ui-grid-a" style="width:100%; "><div class="ui-block-a" style="width:70%;"><input id="replymessage'+i+'" type="text" data-mini="true" data-inline="true" placeholder="Enter Your Reply...." value="" style="border: none;background-color: transparent;"></div><div class="ui-block-b" style="width:30%;"><button id="textReplyMgs" data-mini="true" data-inline="true" onclick="javascript:replymessageFun();" ><font color="white">Reply</font></button></div></div></div><br /><div class="appendreplydata">'+replyappend+'</div><br />';
                    
                }else{
                    bodyMgs +='<div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:80%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" align="left" style="width:20%;font-size:0.7em">'+sender_name[i]+'</div><div class="ui-block-b" align="right" style="width:80%; font-size:0.7em"><table style="vertical-align: middle;"><tr><td><img src="img/clock.png" style="width:20px; height:20px;"/></td><td>'+relative_time(created_at[i])+'</td></tr></table></div></div><hr /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;"><p align="justify">'+body[i]+'</p></div><hr /><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:25%"><img src="img/reply.png" id="reply-'+i+'" class="replyMgs" /></div><div class="ui-block-b" style="width:25%"><img src="img/delete.png" id="delete-'+i+'" class="deleteMgs"/></div></div></div></div></div><div class="replyHide" id="replyHide'+i+'" style="width:100%;"><div class="ui-grid-a" style="width:100%; "><div class="ui-block-a" style="width:70%;"><input id="replymessage'+i+'" type="text" data-mini="true" data-inline="true" placeholder="Enter Your Reply...." value="" style="border: none;background-color: transparent;"></div><div class="ui-block-b" style="width:30%;"><button id="textReplyMgs" data-mini="true" data-inline="true" onclick="javascript:replymessageFun();" ><font color="white">Reply</font></button></div></div></div><br /><div class="appendreplydata">'+replyappend+'</div><br />';
                }
            }else{
                if(element_name[i] != null && button_name[i] != null){
                    bodyMgs +='<div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:80%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" align="left" style="width:20%;font-size:0.7em">'+sender_name[i]+'</div><div class="ui-block-b" align="right" style="width:80%; font-size:0.7em"><table style="vertical-align: middle;"><tr><td><img src="img/clock.png" style="width:20px; height:20px;"/></td><td>'+relative_time(created_at[i])+'</td></tr></table></div></div><div class="ui-grid-a " style="width:100%"><font color="white" size="1" style="background-color:#33CCFF">&nbsp;'+button_name[i]+'</font><font size="1">&nbsp;>&nbsp;</font><font color="white" size="1" style="background-color:#33CCFF">&nbsp;'+element_name[i]+'&nbsp;</font><hr /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;"><p align="justify"><p align="justify">'+body[i]+'</p></p></div><hr /><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:25%"><img src="img/reply.png" id="reply-'+i+'" class="replyMgs" /></div><div class="ui-block-b" style="width:25%"></div></div></div></div></div><div class="replyHide" id="replyHide'+i+'" style="width:100%;"><div class="ui-grid-a" style="width:100%; "><div class="ui-block-a" style="width:70%;"><input id="replymessage'+i+'" type="text" data-mini="true" data-inline="true" placeholder="Enter Your Reply...." value="" style="border: none;background-color: transparent;"></div><div class="ui-block-b" style="width:30%;"><button id="textReplyMgs" data-mini="true" data-inline="true" onclick="javascript:replymessageFun();" ><font color="white">Reply</font></button></div></div></div></div><br /><div class="appendreplydata">'+replyappend+'</div><br />';
                    
                }else if(button_name[i] != null){
                    bodyMgs +='<div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:80%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" align="left" style="width:20%;font-size:0.7em">'+sender_name[i]+'</div><div class="ui-block-b" align="right" style="width:80%; font-size:0.7em"><table style="vertical-align: middle;"><tr><td><img src="img/clock.png" style="width:20px; height:20px;"/></td><td>'+relative_time(created_at[i])+'</td></tr></table></div></div><font color="white" style="background-color:#33CCFF">&nbsp;'+button_name[i]+'&nbsp;</font><hr /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;"><p align="justify">'+body[i]+'</p></div><hr /><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:25%"><img src="img/reply.png" id="reply-'+i+'" class="replyMgs" /></div><div class="ui-block-b" style="width:25%"></div></div></div></div></div><div class="replyHide" id="replyHide'+i+'" style="width:100%;"><div class="ui-grid-a" style="width:100%; "><div class="ui-block-a" style="width:70%;"><input id="replymessage'+i+'" type="text" data-mini="true" data-inline="true" placeholder="Enter Your Reply...." value="" style="border: none;background-color: transparent;"></div><div class="ui-block-b" style="width:30%;"><button id="textReplyMgs" data-mini="true" data-inline="true" onclick="javascript:replymessageFun();" ><font color="white">Reply</font></button></div></div></div><br /><div class="appendreplydata">'+replyappend+'</div><br />';
                    
                }else{
                    bodyMgs +='<div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:80%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" align="left" style="width:20%;font-size:0.7em">'+sender_name[i]+'</div><div class="ui-block-b" align="right" style="width:80%; font-size:0.7em"><table style="vertical-align: middle;"><tr><td><img src="img/clock.png" style="width:20px; height:20px;"/></td><td>'+relative_time(created_at[i])+'</td></tr></table></div></div><hr /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;"><p align="justify">'+body[i]+'</p></div><hr /><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:25%"><img src="img/reply.png" id="reply-'+i+'" class="replyMgs" /></div><div class="ui-block-b" style="width:25%"></div></div></div></div></div><div class="replyHide" id="replyHide'+i+'" style="width:100%;"><div class="ui-grid-a" style="width:100%; "><div class="ui-block-a" style="width:70%;"><input id="replymessage'+i+'" type="text" data-mini="true" data-inline="true" placeholder="Enter Your Reply...." value="" style="border: none;background-color: transparent;"></div><div class="ui-block-b" style="width:30%;"><button id="textReplyMgs" data-mini="true" data-inline="true" onclick="javascript:replymessageFun();" ><font color="white">Reply</font></button></div></div></div><br /><div class="appendreplydata">'+replyappend+'</div><br />';
                }
            }
            
            replyappend ='';
            
        }else{
            //bodyMgs +='<div style="width:95%;margin-left:5%"><div class="ui-grid-a" style="width:100%;"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:80%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:50%;font-size:0.7em">His Magesty</div><div class="ui-block-b" style="width:50%; font-size:0.7em">'+relative_time(created_at[i])+'</div><hr /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;">'+body[i]+'</div><div class="ui-grid-a" style="width:100%;" ><div class="ui-block-a" style="width:50%;"><button id="delete-'+i+'" class="deleteMgs">Delete</button></div><div class="ui-block-b" style="width:50%;"></div></div></div></div></div></div><br />';
        }
    }
    
    $('#appwallListview').append(bodyMgs).trigger("create");
    
    if($('.replyHide').is(':visible')){
        $('.replyHide').toggle();
    }else{
        
    }
    
    $(".replyMgs").click(function(){
                         replyMgsNo1 = (this.id).split('-');
                         replyMgsNo = mgs_id[replyMgsNo1[1]];
                         var replyHide = "replyHide"+replyMgsNo1[1];
                         $('#'+replyHide).toggle();
                         });
    
    $(".deleteMgs").click(function(){
                          var deleteMgsNo = (this.id).split('-');
                          //alert(mgs_id[deleteMgsNo[1]])
                          if(localStorage.appwallLoginData){
                          $.ajax({url:'http://build.myappbuilder.com/api/messages.json', type:"DELETE",data:{'api_key':currentAppkey,'message_id':mgs_id[deleteMgsNo[1]]},
                                 success:function(response){
                                 $('#appwallListview').empty();
                                 appWallPostFun();
                                 },
                                 error:function(){ alert("Failure");}
                                 });
                          }else{
                          $( "#appwallLoginPage" ).popup( "open" );
                          }
                          });
}

function replymessageFun(){
    if(localStorage.appwallLoginData){
        var replyarray = "replymessage"+replyMgsNo1[1];
        var replymessage = $('#'+replyarray).val();
        if(replymessage == ''){
            navigator.notification.alert("Please Enter Your Reply...");
        }else{
            //alert(replyMgsNo);
            $.ajax({url:'http://build.myappbuilder.com/api/messages.json', type:"POST",data:{'message[body]':replymessage,'message[parent_id]':replyMgsNo,'message[sender_id]':localStorage.sender_id,'api_key':currentAppkey},
                   success:function(response){
                   $('#appwallListview').empty();
                   appWallPostFun();
                   },
                   error:function(){ alert("Failure");}
                   });
        }
    }else{
        $( "#appwallLoginPage" ).popup( "open" );
    }
    
}



function postmessageFun(){
    
    if(localStorage.appwallLoginData){
        
        var postmessage = $('#postmessage').val();
        if(postmessage == ''){
            navigator.notification.alert("Please Enter Your Comments...");
        }else{
            $.ajax({url:'http://build.myappbuilder.com/api/messages.json', type:"POST",data:{'message[body]':postmessage,'message[sender_id]':localStorage.sender_id,'api_key':currentAppkey},
                   success:function(response){
                   $('#appwallListview').empty();
                   appWallPostFun();
                   },
                   error:function(){ alert("Failure");}
                   });
        }
    }else{
        $( "#appwallLoginPage" ).popup( "open" );
    }
    
}

$(document).on('pagehide','#appwall', function(event,ui){
               $('#appwallback').off('click');
               $('#appwallListview').empty();
               $('#postmessage').val('');
               $('#appwallTitle').empty();
               });


/*------------------------------Element AppWall ------------------------------------*/


function elementAppwallgo(){
    $.mobile.changePage("#ElementAppwall",{transition:"slide",reverse:false});
}

$(document).on('pageshow','#ElementAppwall', function(event){
               
               $('#ElementAppwallTitle').append(contentText.title);
               $('.Elementappwalllogtitle').append(contentText.title);
               ElementAppWallPostFun();
               });

function elementAppwallBack(){
	window.history.back();
}


function ElementAppWallPostFun(){
	if(localStorage.appwallLoginData){
		$('#requestcmt1').hide();
		$('#entercmt1').show();
	}
	else{
		$('#entercmt1').hide();
		$('#requestcmt1').show();
	}
	
    $.ajax({url:'http://build.myappbuilder.com/api/messages.json',type:"GET",data:{"api_key":currentAppkey,"element_id":element_id},
           success:function(response){
           
           var messages=response;
           var bodyMgs = '';
           var mgs_id = [];
           var body = [];
           var created_at = [];
           var parent_id = [];
           var element_name = [];
           var button_name =[];
           var sender_name = [];
           var sender_id = [];
           var replyappend ='';
           var z = 0;
           var p = 0;
           //alert("msgLen:"+messages.length);
           if(messages.length > 0){
           $.each( messages.reverse(), function( key, value ) {
                  $.each( value, function( k, v ) {
                         if(k == "id"){
                         mgs_id.push(v);
                         }else if(k == "created_at"){
                         created_at.push(v);
                         }else if(k == "parent_id"){
                         parent_id.push(v);
                         }else if(k == "body"){
                         body.push(v);
                         }else if(k == "element_name"){
                         element_name.push(v);
                         }else if(k == "button_name"){
                         button_name.push(v);
                         }else if(k == "sender_name"){
                         sender_name.push(v);
                         }else if(k == "sender_id"){
                         sender_id.push(v);
                         }
                         });
                  });
           }else{
           bodyMgs = '<a><p align="justify" class="divback" ><font color="black" size="2">No Result Found</font></p></a>';
           }
           
           for(var i=0;i<body.length;i++){
           
           if(parent_id[i] == null){
           p=0;
           for(var j=0;j<body.length;j++){
           p = p+1;
           if(mgs_id[i] == parent_id[j]){
           z= -1;
           var k = parseInt(p)+z;
           if(localStorage.sender_id == sender_id[k]){
           replyappend +='<div ><div class="ui-grid-a" style="width:100%;"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:80%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:25%;font-size:0.7em">'+sender_name[k]+'</div><div class="ui-block-b" style="width:75%; font-size:0.7em"><table style="vertical-align: middle;"><tr><td><img src="img/clock.png" style="width:20px; height:20px;"/></td><td>'+relative_time(created_at[i])+'</td></tr></table></div><p><font color="white" size="1" style="background-color:#33CCFF">&nbsp;'+button_name[k]+'</font><font size="1">&nbsp;>&nbsp;</font><font color="white" size="1" style="background-color:#33CCFF">&nbsp;'+element_name[k]+'&nbsp;</font></p><hr /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;"><p align="justify">'+body[k]+'</p></div><hr /><div class="ui-grid-a" style="width:100%;" ><div class="ui-block-a" style="width:25%;"><img src="img/delete.png" id="Elementdelete-'+k+'" class="ElementdeleteMgs" /></div><div class="ui-block-b" style="width:25%;"></div></div></div></div></div></div><br />';
           }else{
           replyappend +='<div ><div class="ui-grid-a" style="width:100%;"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:80%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:25%;font-size:0.7em">'+sender_name[k]+'</div><div class="ui-block-b" style="width:75%; font-size:0.7em"><table style="vertical-align: middle;"><tr><td><img src="img/clock.png" style="width:20px; height:20px;"/></td><td>'+relative_time(created_at[i])+'</td></tr></table></div><p><font color="white" size="1" style="background-color:#33CCFF">&nbsp;'+button_name[k]+'</font><font size="1">&nbsp;>&nbsp;</font><font color="white" size="1" style="background-color:#33CCFF">&nbsp;'+element_name[k]+'&nbsp;</font></p><hr /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;"><p align="justify">'+body[k]+'</p></div><hr /><div class="ui-grid-a" style="width:100%;" ><div class="ui-block-a" style="width:25%;"></div><div class="ui-block-b" style="width:25%;"></div></div></div></div></div></div><br />';
           }
           }else{
           
           }
           
           }
           if(localStorage.sender_id == sender_id[i]){
           bodyMgs +='<div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:85%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:25%;font-size:0.7em">'+sender_name[i]+'</div><div class="ui-block-b" style="width:75%; font-size:0.7em"><table style="vertical-align: middle;"><tr><td><img src="img/clock.png" style="width:20px; height:20px;"/></td><td>'+relative_time(created_at[i])+'</td></tr></table></div><p><font color="white" size="1" style="background-color:#33CCFF">&nbsp;'+button_name[i]+'</font><font size="1">&nbsp;>&nbsp;</font><font color="white" size="1" style="background-color:#33CCFF">&nbsp;'+element_name[i]+'&nbsp;</font></p><hr /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;"><p align="justify">'+body[i]+'</p></div><hr /><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:25%"><img src="img/reply.png" id="Elementreply-'+i+'" class="ElementreplyMgs" /></div><div class="ui-block-b" style="width:25%"><img src="img/delete.png" id="Elementdelete-'+i+'" class="ElementdeleteMgs"/></div></div></div></div></div></div><div class="ElementreplyHide" id="ElementreplyHide'+i+'" style="width:100%;"><div class="ui-grid-a" style="width:100%; "><div class="ui-block-a" style="width:70%;"><input id="Elementreplymessage'+i+'" type="text" data-mini="true" data-inline="true" placeholder="Enter Your Reply...." value="" style="border: none;background-color: transparent;"></div><div class="ui-block-b" style="width:30%;"><button id="ElementtextReplyMgs" data-mini="true" data-inline="true" onclick="javascript:ElementreplymessageFun();" ><font color="white">Reply</font></button></div></div></div><br /><div class="appendreplydata">'+replyappend+'</div><br />';
           }else{
           bodyMgs +='<div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:85%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:25%;font-size:0.7em">'+sender_name[i]+'</div><div class="ui-block-b" style="width:75%; font-size:0.7em"><table style="vertical-align: middle;"><tr><td><img src="img/clock.png" style="width:20px; height:20px;"/></td><td>'+relative_time(created_at[i])+'</td></tr></table></div><p><font color="white" size="1" style="background-color:#33CCFF">&nbsp;'+button_name[i]+'</font><font size="1">&nbsp;>&nbsp;</font><font color="white" size="1" style="background-color:#33CCFF">&nbsp;'+element_name[i]+'&nbsp;</font></p><hr /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;"><p align="justify">'+body[i]+'</p></div><hr /><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:25%"><img src="img/reply.png" id="Elementreply-'+i+'" class="ElementreplyMgs" /></div><div class="ui-block-b" style="width:25%"></div></div></div></div></div><div class="ElementreplyHide" id="ElementreplyHide'+i+'" style="width:100%;"><div class="ui-grid-a" style="width:100%; "><div class="ui-block-a" style="width:70%;"><input id="Elementreplymessage'+i+'" type="text" data-mini="true" data-inline="true" placeholder="Enter Your Reply...." value="" style="border: none;background-color: transparent;"></div><div class="ui-block-b" style="width:30%;"><button id="ElementtextReplyMgs" data-mini="true" data-inline="true" onclick="javascript:ElementreplymessageFun();" ><font color="white">Reply</font></button></div></div></div></div><br /><div class="appendreplydata">'+replyappend+'</div><br />';
           }
           replyappend ='';
           
           }else{
           //bodyMgs +='<div style="width:95%;margin-left:5%"><div class="ui-grid-a" style="width:100%;"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:80%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:50%;font-size:0.7em">His Magesty</div><div class="ui-block-b" style="width:50%; font-size:0.7em">'+relative_time(created_at[i])+'</div><hr /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;">'+body[i]+'</div><div class="ui-grid-a" style="width:100%;" ><div class="ui-block-a" style="width:50%;"><button id="delete-'+i+'" class="deleteMgs">Delete</button></div><div class="ui-block-b" style="width:50%;"></div></div></div></div></div></div><br />';
           }
           }
           
           $('#ElementappwallListview').append(bodyMgs).trigger("create");
           
           if($('.ElementreplyHide').is(':visible')){
           $('.ElementreplyHide').toggle();
           }else{
           
           }
           
           $(".ElementreplyMgs").click(function(){
                                       replyMgsNo1 = (this.id).split('-');
                                       replyMgsNo = mgs_id[replyMgsNo1[1]];
                                       var replyHide = "ElementreplyHide"+replyMgsNo1[1];
                                       $('#'+replyHide).toggle();
                                       });
           
           $(".ElementdeleteMgs").click(function(){
                                        var deleteMgsNo = (this.id).split('-');
                                        //alert(mgs_id[deleteMgsNo[1]]);
                                        if(localStorage.appwallLoginData){
                                        $.ajax({url:'http://build.myappbuilder.com/api/messages.json?api_key='+currentAppkey+'&message_id='+mgs_id[deleteMgsNo[1]], type:"DELETE",data:{},
                                               success:function(response){
                                               $('#ElementappwallListview').empty();
                                               ElementAppWallPostFun();
                                               },
                                               error:function(){ alert("Failure");}
                                               });
                                        }else{
                                        $( "#ElementappwallLoginPage" ).popup( "open" );
                                        }
                                        });
           },error:function(){ alert("Failure");}
           });
    
    
}

function ElementreplymessageFun(){
    if(localStorage.appwallLoginData){
        var replyarray = "Elementreplymessage"+replyMgsNo1[1];
        var replymessage = $('#'+replyarray).val();
        if(replymessage == ''){
            navigator.notification.alert("Please Enter Your Reply...");
        }else{
            //alert(replyMgsNo);
            //        var element_id = parseInt(currentList);
            $.ajax({url:'http://build.myappbuilder.com/api/messages.json', type:"POST",data:{"message[body]":replymessage,"message[parent_id]":replyMgsNo,"message[sender_id]":"1","api_key":currentAppkey,"element_id":element_id},
                   success:function(response){
                   $('#ElementappwallListview').empty();
                   ElementAppWallPostFun();
                   },
                   error:function(){ alert("Failure");}
                   });
        }
    }else{
        $( "#ElementappwallLoginPage" ).popup( "open" );
    }
    
}



function ElementpostmessageFun(){
    //alert(localStorage.appwallLoginData)
    if(localStorage.appwallLoginData){
        var postmessage = $('#Elementpostmessage').val();
        if(postmessage == ''){
            navigator.notification.alert("Please Enter Your Comments...");
        }else{
            //        var element_id = parseInt(currentList);
            $.ajax({url:'http://build.myappbuilder.com/api/messages.json', type:"POST",data:{"message[body]":postmessage,"message[sender_id]":localStorage.sender_id,"api_key":currentAppkey,"element_id":element_id},
                   success:function(response){
                   $('#ElementappwallListview').empty();
                   ElementAppWallPostFun();
                   },
                   error:function(){ alert("Failure");}
                   });
        }
    }else{
        $( "#ElementappwallLoginPage" ).popup( "open" );
    }
}

$(document).on('pagehide','#ElementAppwall', function(event,ui){
               $('#ElementappwallListview').empty();
               $('#Elementpostmessage').val('');
               $('#ElementAppwallTitle').empty();
               $('.Elementappwalllogtitle').empty();
               });



function buttonAppwallgo(){
    $.mobile.changePage("#ButtonAppwall",{transition:"slide",reverse:false});
}

$(document).on('pageshow','#ButtonAppwall', function(event){
               
               $('#ButtonAppwallTitle').append(contentText.title);
               ButtonAppWallPostFun();
               });

function buttonAppwallBack(){
    $.mobile.changePage("#ContentPage",{transition:"slide",reverse:true});
}


function ButtonAppWallPostFun(){
    
    
    
    $.ajax({url:'http://build.myappbuilder.com/api/messages.json',type:"GET",data:{"api_key":currentAppkey,"button_id":buttonid},
           success:function(response){
           var messages=response;
           var bodyMgs = '';
           var mgs_id = [];
           var body = [];
           var created_at = [];
           var parent_id = [];
           var element_name = [];
           var button_name =[];
           var sender_name = [];
           var sender_id = [];
           var replyappend ='';
           var z = 0;
           var p = 0;
           //alert("msgLen:"+messages.length);
           if(messages.length > 0){
           $.each( messages, function( key, value ) {
                  $.each( value, function( k, v ) {
                         if(k == "id"){
                         mgs_id.push(v);
                         }else if(k == "created_at"){
                         created_at.push(v);
                         }else if(k == "parent_id"){
                         parent_id.push(v);
                         }else if(k == "body"){
                         body.push(v);
                         }else if(k == "element_name"){
                         element_name.push(v);
                         }else if(k == "button_name"){
                         button_name.push(v);
                         }else if(k == "sender_name"){
                         sender_name.push(v);
                         }else if(k == "sender_id"){
                         sender_id.push(v);
                         }
                         });
                  });
           }else{
           bodyMgs = '<a><p align="justify" class="divback" ><font color="black" size="2">No Result Found</font></p></a>';
           }
           
           for(var i=0;i<body.length;i++){
           
           if(parent_id[i] == null){
           p=0;
           for(var j=0;j<body.length;j++){
           p = p+1;
           if(mgs_id[i] == parent_id[j]){
           z = -1;
           var k = parseInt(p)+z;
           if(localStorage.sender_id == sender_id[k]){
           replyappend +='<div ><div class="ui-grid-a" style="width:100%;"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:85%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:50%;font-size:0.7em">'+sender_name[k]+'</div><div class="ui-block-b" style="width:50%; font-size:0.7em">'+relative_time(created_at[k])+'</div><p><font color="white" size="1" style="background-color:#33CCFF">&nbsp;'+button_name[k]+'</font></p><hr /><br /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;">'+body[k]+'</div><br /><hr /><div class="ui-grid-a" style="width:100%;" ><div class="ui-block-a" style="width:25%;"><img src="img/delete.png" id="Buttondelete-'+k+'" class="ButtondeleteMgs" /></div><div class="ui-block-b" style="width:25%;"></div></div></div></div></div></div><br />';
           }else{
           replyappend +='<div ><div class="ui-grid-a" style="width:100%;"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:85%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:50%;font-size:0.7em">'+sender_name[k]+'</div><div class="ui-block-b" style="width:50%; font-size:0.7em">'+relative_time(created_at[k])+'</div><p><font color="white" size="1" style="background-color:#33CCFF">&nbsp;'+button_name[k]+'</font></p><hr /><br /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;">'+body[k]+'</div><br /><hr /><div class="ui-grid-a" style="width:100%;" ><div class="ui-block-a" style="width:25%;"></div><div class="ui-block-b" style="width:25%;"></div></div></div></div></div></div><br />';
           }
           }else{
           
           }
           
           }
           if(localStorage.sender_id == sender_id[i]){
           bodyMgs +='<div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:85%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:50%;font-size:0.7em">'+sender_name[i]+'</div><div class="ui-block-b" style="width:50%; font-size:0.7em">'+relative_time(created_at[i])+'</div></div><p><font color="white" size="1" style="background-color:#33CCFF">&nbsp;'+button_name[i]+'</font></p><hr /><br /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;">'+body[i]+'</div><br /><hr /><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:25%"><img src="img/reply.png" id="Buttonreply-'+i+'" class="ButtonreplyMgs" /></div><div class="ui-block-b" style="width:25%"><img src="img/delete.png" id="Buttondelete-'+i+'" class="ButtondeleteMgs"/></div></div></div></div></div><div class="ButtonreplyHide" id="ButtonreplyHide'+i+'" style="width:100%;"><div class="ui-grid-a" style="width:100%; "><div class="ui-block-a" style="width:70%;"><input id="Buttonreplymessage'+i+'" type="text" data-mini="true" data-inline="true" placeholder="Enter Your Reply...." value="" style="border: none;background-color: transparent;"></div><div class="ui-block-b" style="width:30%;"><button id="ButtontextReplyMgs" data-mini="true" data-inline="true" onclick="javascript:ButtonreplymessageFun();" ><font color="white">Reply</font></button></div></div></div><br /><div class="appendreplydata">'+replyappend+'</div><br />';
           }else{
           bodyMgs +='<div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:85%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:50%;font-size:0.7em">'+sender_name[i]+'</div><div class="ui-block-b" style="width:50%; font-size:0.7em">'+relative_time(created_at[i])+'</div></div><p><font color="white" size="1" style="background-color:#33CCFF">&nbsp;'+button_name[i]+'</font></p><hr /><br /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;">'+body[i]+'</div><br /><hr /><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:25%"><img src="img/reply.png" id="Buttonreply-'+i+'" class="ButtonreplyMgs" /></div><div class="ui-block-b" style="width:25%"></div></div></div></div></div><div class="ButtonreplyHide" id="ButtonreplyHide'+i+'" style="width:100%;"><div class="ui-grid-a" style="width:100%; "><div class="ui-block-a" style="width:70%;"><input id="Buttonreplymessage'+i+'" type="text" data-mini="true" data-inline="true" placeholder="Enter Your Reply...." value="" style="border: none;background-color: transparent;"></div><div class="ui-block-b" style="width:30%;"><button id="ButtontextReplyMgs" data-mini="true" data-inline="true" onclick="javascript:ButtonreplymessageFun();" ><font color="white">Reply</font></button></div></div></div><br /><div class="appendreplydata">'+replyappend+'</div><br />';
           }
           replyappend ='';
           
           }else{
           //bodyMgs +='<div style="width:95%;margin-left:5%"><div class="ui-grid-a" style="width:100%;"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:80%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:50%;font-size:0.7em">His Magesty</div><div class="ui-block-b" style="width:50%; font-size:0.7em">'+relative_time(created_at[i])+'</div><hr /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;">'+body[i]+'</div><div class="ui-grid-a" style="width:100%;" ><div class="ui-block-a" style="width:50%;"><button id="delete-'+i+'" class="deleteMgs">Delete</button></div><div class="ui-block-b" style="width:50%;"></div></div></div></div></div></div><br />';
           }
           }
           
           $('#ButtonappwallListview').append(bodyMgs).trigger("create");
           
           if($('.ButtonreplyHide').is(':visible')){
           $('.ButtonreplyHide').toggle();
           }else{
           
           }
           
           $(".ButtonreplyMgs").click(function(){
                                      replyMgsNo1 = (this.id).split('-');
                                      replyMgsNo = mgs_id[replyMgsNo1[1]];
                                      var replyHide = "ButtonreplyHide"+replyMgsNo1[1];
                                      $('#'+replyHide).toggle();
                                      });
           
           $(".ButtondeleteMgs").click(function(){
                                       var deleteMgsNo = (this.id).split('-');
                                       
                                       if(localStorage.appwallLoginData){
                                       $.ajax({url:'http://build.myappbuilder.com/api/messages.json?api_key='+currentAppkey+'&message_id='+mgs_id[deleteMgsNo[1]], type:"DELETE",data:{},
                                              success:function(response){
                                              $('#ButtonappwallListview').empty();
                                              ButtonAppWallPostFun();
                                              },
                                              error:function(){ alert("Failure");}
                                              });
                                       }else{
                                       $( "#ButtonappwallLoginPage" ).popup( "open" );
                                       }
                                       });
           },error:function(){ alert("Failure");}
           });
    
    
}

function ButtonreplymessageFun(){
    if(localStorage.appwallLoginData){
	    var replyarray = "Buttonreplymessage"+replyMgsNo1[1];
	    var replymessage = $('#'+replyarray).val();
        if(replymessage == ''){
            navigator.notification.alert("Please Enter Your Reply...");
        }else{
	        
	        
	        $.ajax({url:'http://build.myappbuilder.com/api/messages.json', type:"POST",data:{"message[body]":replymessage,"message[parent_id]":replyMgsNo,"message[sender_id]":"1","api_key":currentAppkey,"button_id":buttonid},
                   success:function(response){
                   $('#ButtonappwallListview').empty();
                   ButtonAppWallPostFun();
                   },
                   error:function(){ alert("Failure");}
                   });
        }
    }else{
	    $( "#ButtonappwallLoginPage" ).popup( "open" );
    }
    
}



function ButtonpostmessageFun(){
    if(localStorage.appwallLoginData){
	    var postmessage = $('#Buttonpostmessage').val();
	    if(postmessage == ''){
            navigator.notification.alert("Please Enter Your Comments...");
	    }else{
	        
            $.ajax({url:'http://build.myappbuilder.com/api/messages.json', type:"POST",data:{"message[body]":postmessage,"message[sender_id]":localStorage.sender_id,"api_key":currentAppkey,"button_id":buttonid},
                   success:function(response){
                   $('#ButtonappwallListview').empty();
                   ButtonAppWallPostFun();
                   },
                   error:function(){ alert(" Network Failure ");}
                   });
	    }
    }else{
	    $( "#ButtonappwallLoginPage" ).popup( "open" );
    }
}

$(document).on('pagehide','#ButtonAppwall', function(event,ui){
               $('#ButtonappwallListview').empty();
               $('#Buttonpostmessage').val('');
               $('#ButtonAppwallTitle').empty();
               });

function appwallLoginFun(){
    if($('#appwallLogin').val() == "" || $('#appwallPassword').val() == ""){
        navigator.notification.confirm("Enter Your User Name And Password!",buttonPressed,"Login",'Ok');
    }else{
        var username = $('#appwallLogin').val();
        var password = $('#appwallPassword').val();
        
        $.ajax({url:"http://build.myappbuilder.com/api/login.json", type:"POST", data:{"api_key":currentAppkey,"login":username,"password":password},
               success:function(response){
               if(response.name){
               localStorage.appwallLoginData = response.name;
               }
               else{
               localStorage.appwallLoginData = response.username;
               }
               
               localStorage.sender_id = response.id;
               //        localStorage.log=1;
               $( "#appwallLoginPage" ).popup( "close" );
               
               $('#appwallListview').empty();
               appWallPostFun();
               iconsFunction();
               },
               error:function(){
               navigator.notification.alert(" Enter Your Correct Username And Password! ");
               }
               });
    }
}

function appwallLoginFun1(){
    if($('#appwallLogin1').val() == "" || $('#appwallPassword1').val() == ""){
	    navigator.notification.confirm("Enter Your User Name And Password!",buttonPressed,"Login",'Ok');
    }else{
	    var username = $('#appwallLogin1').val();
	    var password = $('#appwallPassword1').val();
	    
	    $.ajax({url:"http://build.myappbuilder.com/api/login.json", type:"POST", data:{"api_key":currentAppkey,"login":username,"password":password},
               success:function(response){
               if(response.name){
               localStorage.appwallLoginData = response.name;
               }
               else{
               localStorage.appwallLoginData = response.username;
               }
               localStorage.sender_id = response.id;
               //	        localStorage.log=1;
               $( "#appwallLoginPage1" ).popup( "close" );
               $('#appwallListview').empty();
               appWallPostFun();
               iconsFunction();
               if(logval==1){
               window.history.back();
               }
               
               },
               error:function(){
               navigator.notification.alert(" Enter Your Correct Username And Password! ");
               }
               });
    }
}
function appwallRegFun(){
	$( "#appwallLoginPage" ).popup( "close" );
	$( "#appwallRegPage" ).popup( "open" );
}
function appwallRegFun1(){
	$( "#appwallLoginPage1" ).popup( "close" );
	$( "#appwallRegPage1" ).popup( "open" );
}

function ElementappwallLoginFun(){
    if($('#ElementappwallLogin').val() == "" || $('#ElementappwallPassword').val() == ""){
        navigator.notification.confirm("Enter Your User Name And Password!",buttonPressed,"Login",'Ok');
    }else{
        var username = $('#ElementappwallLogin').val();
        var password = $('#ElementappwallPassword').val();
        $.ajax({url:"http://build.myappbuilder.com/api/login.json", type:"POST", data:{"login":username,"password":password,"api_key":currentAppkey},
               success:function(response){
               localStorage.appwallLoginData = response.name;
               localStorage.sender_id = response.id;
               $( "#ElementappwallLoginPage" ).popup( "close" );
               $('#ElementappwallListview').empty();
               ElementAppWallPostFun();
               },
               error:function(){
               navigator.notification.alert(" Enter Your Correct Username And Password! ");
               }
               });
    }
    
}

function ButtonappwallLoginFun(){
    if($('#ButtonappwallLogin').val() == "" || $('#ButtonappwallPassword').val() == ""){
        navigator.notification.confirm("Enter Your User Name And Password!",buttonPressed,"Login",'Ok');
    }else{
        var username = $('#ButtonappwallLogin').val();
        var password = $('#ButtonappwallPassword').val();
        $.ajax({url:"http://build.myappbuilder.com/api/login.json", type:"POST", data:{"login":username,"password":password,"api_key":currentAppkey},
               success:function(response){
               localStorage.appwallLoginData = response.name;
               localStorage.sender_id = response.id;
               $( "#ButtonappwallLoginPage" ).popup( "close" );
               $('#ButtonappwallListview').empty();
               ButtonAppWallPostFun();
               },
               error:function(){
               navigator.notification.alert(" Enter Your Correct Username And Password! ");
               }
               });
    }
    
}
function buttonPressed(){
    
}
function fblogin() {
    FB.login(
             function(response) {
             if (response.status=="connected") {
             uid= response.authResponse.userId;
             uname= response.authResponse.username;
             email= response.authResponse.email;
             
             alert('logged in');
             alert("uid= "+uid);
             alert("UserName= "+uname);
             alert("Email= "+email);
             $.ajax({url:"http://build.myappbuilder.com/api/login.json", type:"POST", data:{"api_key":currentAppkey,"uid":uid,"provider":"facebook"},
                    success:function(response){
                    if(response.name){
                    localStorage.appwallLoginData = response.name;
                    }
                    else{
                    localStorage.appwallLoginData = response.username;
                    }
                    localStorage.sender_id = response.id;
                    //            		        localStorage.log=1;
                    $( "#appwallLoginPage" ).popup( "close" );
                    $('#appwallListview').empty();
                    appWallPostFun();
                    iconsFunction();
                    },
                    error:function(){
                    $.ajax({url:"http://build.myappbuilder.com/api/subscribers.json", type:"POST", data:{"api_key":currentAppkey,"subscriber[username]":uname,"subscriber[email]":email,"identity[uid]":uid,"identity[provider]":"facebook"},
                           success:function(response){
                           $.ajax({url:"http://build.myappbuilder.com/api/login.json", type:"POST", data:{"api_key":currentAppkey,"uid":uid,"provider":"facebook"},
                                  success:function(response){
                                  if(response.name){
                                  localStorage.appwallLoginData = response.name;
                                  }
                                  else{
                                  localStorage.appwallLoginData = response.username;
                                  }
                                  localStorage.sender_id = response.id;
                                  //                            		        localStorage.log=1;
                                  $( "#appwallLoginPage" ).popup( "close" );
                                  $( "#appwallRegPage" ).popup( "close" );
                                  $('#appwallListview').empty();
                                  appWallPostFun();
                                  iconsFunction();
                                  },
                                  error:function(){
                                  navigator.notification.alert(" Enter Your Correct Username And Password! ");
                                  }
                                  });
                           },
                           error:function(){
                           navigator.notification.alert(" Registration canceled! ");
                           }
                           });
                    }
                    });
             }else {
             //             alert('not logged in');
             }
             },
             { scope: "email" }
             );
    
}

function fblogin1() {
    FB.login(
             function(response) {
             if (response.status=="connected") {
             uid= response.authResponse.userID;
             uname= response.authResponse.userName;
             email= response.authResponse.Email;
             //            	    alert('logged in');
             //		    	  alert("uid= "+uid);
             //		    	  alert("UserName= "+uname);
             //		    	  alert("Email= "+email);
             
             $.ajax({url:"http://build.myappbuilder.com/api/login.json", type:"POST", data:{"api_key":currentAppkey,"uid":uid,"provider":"facebook"},
                    success:function(response){
                    //            		    	  alert("uid= "+uid);
                    //              		    	  alert("UserName= "+uname);
                    //              		    	  alert("Email= "+email);
                    if(response.name){
                    localStorage.appwallLoginData = response.name;
                    }
                    else{
                    localStorage.appwallLoginData = response.username;
                    }
                    localStorage.sender_id = response.id;
                    //            		        localStorage.log=1;
                    $( "#appwallLoginPage1" ).popup( "close" );
                    $('#appwallListview').empty();
                    appWallPostFun();
                    iconsFunction();
                    if(logval==1){
                    window.history.back();
                    }
                    },
                    error:function(){
                    //            		    	  uid= response.authResponse.userId;
                    //         	            	 uname= response.authResponse.username;
                    //         	            	 email= response.authResponse.email;
                    $.ajax({url:"http://build.myappbuilder.com/api/subscribers.json", type:"POST", data:{"api_key":currentAppkey,"subscriber[username]":uname,"subscriber[email]":email,"identity[uid]":uid,"identity[provider]":"facebook"},
                           success:function(response){
                           
                           //                    		    	  alert("uid= "+uid);
                           //                    		    	  alert("UserName= "+uname);
                           //                    		    	  alert("Email= "+email);
                           $.ajax({url:"http://build.myappbuilder.com/api/login.json", type:"POST", data:{"api_key":currentAppkey,"uid":uid,"provider":"facebook"},
                                  success:function(response){
                                  
                                  if(response.name){
                                  localStorage.appwallLoginData = response.name;
                                  }
                                  else{
                                  localStorage.appwallLoginData = response.username;
                                  }
                                  localStorage.sender_id = response.id;
                                  //                            		        localStorage.log=1;
                                  $( "#appwallLoginPage1" ).popup( "close" );
                                  $( "#appwallRegPage1" ).popup( "close" );
                                  $('#appwallListview').empty();
                                  appWallPostFun();
                                  iconsFunction();
                                  if(logval==1){
                                  window.history.back();
                                  }
                                  },
                                  error:function(response){
                                  
                                  navigator.notification.alert(" Login after registration cancelled! ");
                                  }
                                  });
                           },
                           error:function(){
                           //                    		    	  alert("uid= "+uid);
                           //                      		    	  alert("UserName= "+uname);
                           //                      		    	  alert("Email= "+email);
                           navigator.notification.alert(" Registration canceled! ");
                           }
                           });
                    }
                    });
             } else {
             alert('not logged in');
             }
             },
             { scope: "email" }
             );
    
}
function twitter(){
    
    
    // Set childBrowser callback to detect our oauth_callback_url
    if (typeof window.plugins.childBrowser.onLocationChange !== "function") {
        window.plugins.childBrowser.onLocationChange = function(loc){
            console.log("AppLaudLog: onLocationChange : " + loc);
            //alert(loc);
            // If user hit "No, thanks" when asked to authorize access
            if (loc.indexOf("http://www.nuatransmedia.com/?") < 0) {
            	
                //            	  alert(loc.indexOf("http://www.nuatransmedia.com/"));
                
                //                window.plugins.childBrowser.close();
                return;
            }
            
            // Same as above, but user went to app's homepage instead
            // of back to app. Don't close the browser in this case.
            else if (loc.indexOf("http://www.nuatransmedia.com/?denied")>=0) {
                //            	alert("sd1");
                window.plugins.childBrowser.close();
                return;
            }
            
            // The supplied oauth_callback_url for this session is being loaded
            else if (loc.indexOf("http://www.nuatransmedia.com/?") >= 0) {
                //            	alert("sd2");
                var index, verifier = '';
                var params = loc.substr(loc.indexOf('?') + 1);
                
                params = params.split('&');
                for (var i = 0; i < params.length; i++) {
                    var y = params[i].split('=');
                    if(y[0] === 'oauth_verifier') {
                        verifier = y[1];
                    }
                }
                
                // Exchange request token for access token
                oauth.get('https://api.twitter.com/oauth/access_token?oauth_verifier='+verifier+'&'+requestParams,
                          function(data) {
                          //                	alert('uid');
                          var accessParams = {};
                          var qvars_tmp = data.text.split('&');
                          for (var i = 0; i < qvars_tmp.length; i++) {
                          var y = qvars_tmp[i].split('=');
                          accessParams[y[0]] = decodeURIComponent(y[1]);
                          }
                          console.log('AppLaudLog: ' + accessParams.oauth_token + ' : ' + accessParams.oauth_token_secret);
                          
                          oauth.setAccessToken([accessParams.oauth_token, accessParams.oauth_token_secret]);
                          
                          // Save access token/key in localStorage
                          var accessData = {};
                          accessData.accessTokenKey = accessParams.oauth_token;
                          accessData.accessTokenSecret = accessParams.oauth_token_secret;
                          console.log("AppLaudLog: Storing token key/secret in localStorage");
                          localStorage.setItem(localStoreKey, JSON.stringify(accessData));
                          
                          oauth.get('https://api.twitter.com/1.1/account/verify_credentials.json?skip_status=true',
                                    function(data) {
                                    //                            	alert('uid1');
                                    var entry = JSON.parse(data.text);
                                    
                                    console.log("AppLaudLog: screen_name: " + entry.screen_name);
                                    //                                        alert(entry.screen_name);
                                    //                                        alert(entry.id);
                                    
                                    uid= entry.id;
                                    uname= entry.screen_name;
                                    email= entry.email;
                                    //                                   	    alert('logged in');
                                    
                                    $.ajax({url:"http://build.myappbuilder.com/api/login.json", type:"POST", data:{"api_key":currentAppkey,"uid":uid,"provider":"twitter"},
                                           success:function(response){
                                           //                                   		    	  alert("uid= "+uid);
                                           //                                     		    	  alert("UserName= "+uname);
                                           //                                     		    	  alert("Email= "+email);
                                           if(response.name){
                                           localStorage.appwallLoginData = response.name;
                                           }
                                           else{
                                           localStorage.appwallLoginData = response.username;
                                           }
                                           localStorage.sender_id = response.id;
                                           //                                   		        localStorage.log=1;
                                           $( "#appwallLoginPage" ).popup( "close" );
                                           $('#appwallListview').empty();
                                           appWallPostFun();
                                           iconsFunction();
                                           if(logval==1){
                                           window.history.back();
                                           }
                                           },
                                           error:function(){
                                           
                                           $.ajax({url:"http://build.myappbuilder.com/api/subscribers.json", type:"POST", data:{"api_key":currentAppkey,"subscriber[username]":uname,"subscriber[email]":email,"identity[uid]":uid,"identity[provider]":"twitter"},
                                                  success:function(response){
                                                  
                                                  //                                           		    	  alert("uid= "+uid);
                                                  //                                           		    	  alert("UserName= "+uname);
                                                  //                                           		    	  alert("Email= "+email);
                                                  $.ajax({url:"http://build.myappbuilder.com/api/login.json", type:"POST", data:{"api_key":currentAppkey,"uid":uid,"provider":"twitter"},
                                                         success:function(response){
                                                         
                                                         if(response.name){
                                                         localStorage.appwallLoginData = response.name;
                                                         }
                                                         else{
                                                         localStorage.appwallLoginData = response.username;
                                                         }
                                                         localStorage.sender_id = response.id;
                                                         //                                                   		        localStorage.log=1;
                                                         $( "#appwallLoginPage" ).popup( "close" );
                                                         $( "#appwallRegPage" ).popup( "close" );
                                                         $('#appwallListview').empty();
                                                         appWallPostFun();
                                                         iconsFunction();
                                                         if(logval==1){
                                                         window.history.back();
                                                         }
                                                         },
                                                         error:function(response){
                                                         //                                                   		    	  alert(response.id);
                                                         navigator.notification.alert(" Login after registration cancelled! ");
                                                         }
                                                         });
                                                  },
                                                  error:function(){
                                                  //                                           		    	  alert("uid= "+uid);
                                                  //                                             		    	  alert("UserName= "+uname);
                                                  //                                             		    	  alert("Email= "+email);
                                                  navigator.notification.alert(" Registration canceled! ");
                                                  }
                                                  });
                                           }
                                           });
                                    
                                    },
                                    function(data) {
                                    alert('Error getting user credentials'+data);
                                    console.log("AppLaudLog: Error " + data);
                                    
                                    }
                                    );
                          window.plugins.childBrowser.close();
                          },
                          function(data) {
                          alert('Error : No Authorization');
                          console.log("AppLaudLog: 1 Error " + data);
                          
                          }
                          );
            }
        };
    } // end if
    
    // Note: Consumer Key/Secret and callback url always the same for this app.
    
    oauth = OAuth(options);
    oauth.get('https://api.twitter.com/oauth/request_token',
              function(data) {
              requestParams = data.text;
              console.log("AppLaudLog: requestParams: " + data.text);
              window.plugins.childBrowser.showWebPage('https://api.twitter.com/oauth/authorize?'+data.text,
                                                      { showLocationBar : false });
              },
              function(data) {
              alert('Error : No Authorization');
              console.log("AppLaudLog: 2 Error " + data);
              
              }
              );
    mentionsId = 0;
    
    
}
function twitter1(){
    
    
    
    // Set childBrowser callback to detect our oauth_callback_url
    if (typeof window.plugins.childBrowser.onLocationChange !== "function") {
        //        alert("hi");
        window.plugins.childBrowser.onLocationChange = function(loc){
            console.log("AppLaudLog: onLocationChange : " + loc);
            //alert(loc);
            // If user hit "No, thanks" when asked to authorize access
            if (loc.indexOf("http://www.nuatransmedia.com/?") < 0) {
            	
                //            	  alert(loc.indexOf("http://www.nuatransmedia.com/"));
                
                //                window.plugins.childBrowser.close();
                return;
            }
            
            // Same as above, but user went to app's homepage instead
            // of back to app. Don't close the browser in this case.
            else if (loc.indexOf("http://www.nuatransmedia.com/?denied")>=0) {
                //            	alert("sd1");
                window.plugins.childBrowser.close();
                return;
            }
            
            // The supplied oauth_callback_url for this session is being loaded
            else if (loc.indexOf("http://www.nuatransmedia.com/?")>= 0) {
                //            	alert("sd2");
                var index, verifier = '';
                var params = loc.substr(loc.indexOf('?') + 1);
                
                params = params.split('&');
                for (var i = 0; i < params.length; i++) {
                    var y = params[i].split('=');
                    if(y[0] === 'oauth_verifier') {
                        verifier = y[1];
                    }
                }
                
                // Exchange request token for access token
                oauth.get('https://api.twitter.com/oauth/access_token?oauth_verifier='+verifier+'&'+requestParams,
                          function(data) {   
                          //                	alert('uid');
                          var accessParams = {};
                          var qvars_tmp = data.text.split('&');
                          for (var i = 0; i < qvars_tmp.length; i++) {
                          var y = qvars_tmp[i].split('=');
                          accessParams[y[0]] = decodeURIComponent(y[1]);
                          }
                          console.log('AppLaudLog: ' + accessParams.oauth_token + ' : ' + accessParams.oauth_token_secret);
                          
                          oauth.setAccessToken([accessParams.oauth_token, accessParams.oauth_token_secret]);
                          
                          // Save access token/key in localStorage
                          var accessData = {};
                          accessData.accessTokenKey = accessParams.oauth_token;
                          accessData.accessTokenSecret = accessParams.oauth_token_secret;
                          console.log("AppLaudLog: Storing token key/secret in localStorage");
                          localStorage.setItem(localStoreKey, JSON.stringify(accessData));
                          
                          oauth.get('https://api.twitter.com/1.1/account/verify_credentials.json?skip_status=true',
                                    function(data) {
                                    //                            	alert('uid1');
                                    var entry = JSON.parse(data.text);
                                    
                                    console.log("AppLaudLog: screen_name: " + entry.screen_name);
                                    //                                        alert(entry.screen_name);
                                    //                                        alert(entry.id);
                                    
                                    uid= entry.id;
                                    uname= entry.screen_name;
                                    email= entry.email; 
                                    //                                   	    alert('logged in');
                                    
                                    $.ajax({url:"http://build.myappbuilder.com/api/login.json", type:"POST", data:{"api_key":currentAppkey,"uid":uid,"provider":"twitter"},
                                           success:function(response){
                                           //                                   		    	  alert("uid= "+uid);
                                           //                                     		    	  alert("UserName= "+uname);
                                           //                                     		    	  alert("Email= "+email);
                                           if(response.name){
                                           localStorage.appwallLoginData = response.name;
                                           }
                                           else{
                                           localStorage.appwallLoginData = response.username;
                                           }
                                           localStorage.sender_id = response.id;
                                           //                                   		        localStorage.log=1;
                                           $( "#appwallLoginPage1" ).popup( "close" );
                                           $('#appwallListview').empty();
                                           appWallPostFun();
                                           iconsFunction();
                                           if(logval==1){
                                           window.history.back();
                                           }
                                           },
                                           error:function(){
                                           
                                           $.ajax({url:"http://build.myappbuilder.com/api/subscribers.json", type:"POST", data:{"api_key":currentAppkey,"subscriber[username]":uname,"subscriber[email]":email,"identity[uid]":uid,"identity[provider]":"twitter"},
                                                  success:function(response){
                                                  
                                                  //                                           		    	  alert("uid= "+uid);
                                                  //                                           		    	  alert("UserName= "+uname);
                                                  //                                           		    	  alert("Email= "+email);
                                                  $.ajax({url:"http://build.myappbuilder.com/api/login.json", type:"POST", data:{"api_key":currentAppkey,"uid":uid,"provider":"twitter"},
                                                         success:function(response){
                                                         
                                                         if(response.name){
                                                         localStorage.appwallLoginData = response.name;
                                                         }
                                                         else{
                                                         localStorage.appwallLoginData = response.username;
                                                         }
                                                         localStorage.sender_id = response.id;
                                                         //                                                   		        localStorage.log=1;
                                                         $( "#appwallLoginPage1" ).popup( "close" );
                                                         $( "#appwallRegPage1" ).popup( "close" );
                                                         $('#appwallListview').empty();
                                                         appWallPostFun();
                                                         iconsFunction();
                                                         if(logval==1){
                                                         window.history.back();
                                                         }
                                                         },
                                                         error:function(response){
                                                         alert(response.id);
                                                         navigator.notification.alert(" Login after registration cancelled! ");
                                                         }
                                                         });
                                                  },
                                                  error:function(){
                                                  //                                           		    	  alert("uid= "+uid);
                                                  //                                             		    	  alert("UserName= "+uname);
                                                  //                                             		    	  alert("Email= "+email);
                                                  navigator.notification.alert(" Registration canceled! ");
                                                  }
                                                  });
                                           }
                                           });
                                    
                                    },
                                    function(data) { 
                                    alert('Error getting user credentials'+data); 
                                    console.log("AppLaudLog: Error " + data); 
                                    
                                    }
                                    );                                         
                          window.plugins.childBrowser.close();
                          },
                          function(data) { 
                          alert('Error : No Authorization'); 
                          console.log("AppLaudLog: 1 Error " + data); 
                          
                          }
                          );
            }
        };  
    } // end if
    
    // Note: Consumer Key/Secret and callback url always the same for this app.        
    
    oauth = OAuth(options);
    oauth.get('https://api.twitter.com/oauth/request_token',
              function(data) {
              requestParams = data.text;
              console.log("AppLaudLog: requestParams: " + data.text);
              window.plugins.childBrowser.showWebPage('https://api.twitter.com/oauth/authorize?'+data.text, 
                                                      { showLocationBar : false });
              
              },
              function(data) { 
              alert('Error : No Authorization'); 
              console.log("AppLaudLog: 2 Error " + data); 
              
              }
              );
    mentionsId = 0;
    
}



function login(){
	logval = 1;
	$('#mypanel').hide();
    $.mobile.changePage("#icons",{transition:"slide",reverse:true});
    pan = 1;
    $('#mypanel').panel('open');
    setTimeout(function(){
               $("#appwallLoginPage1").popup('open');
               },1000);
	
	
}

function reg(){
    
    var fname = $('#appwallRegFnam').val();
    var lname = $('#appwallRegLnam').val();
    var uname = $('#appwallRegid').val();
    var password = $('#appwallRegPassword').val();
    var phone = $('#appwallRegPhone').val();
    var email = $('#appwallRegEmail').val();
    if(fname==null||lname==null||uname==null||password==null||phone==null||email==null){
        navigator.notification.alert(" Enter all values! ");
    }
    else{
        $.ajax({url:"http://build.myappbuilder.com/api/subscribers.json", type:"POST", data:{"api_key":currentAppkey,"subscriber[firstname]":fname,"subscriber[lastname]":lname,"subscriber[username]":uname,"subscriber[password]":password,"subscriber[password_confirmation]":password,"subscriber[phone]":phone,"subscriber[email]":email},
               success:function(response){
               //	    	 
               //	    	  alert(uname);
               //	    	  alert(email);
               $.ajax({url:"http://build.myappbuilder.com/api/login.json", type:"POST", data:{"api_key":currentAppkey,"login":uname,"password":password},
                      success:function(response){
	    	    	  if(response.name){
                      localStorage.appwallLoginData = response.name;
                      }
	    	    	  else{
                      localStorage.appwallLoginData = response.username;
                      }
                      localStorage.sender_id = response.id;
                      //	    	        localStorage.log=1;
                      $( "#appwallLoginPage" ).popup( "close" );
                      $( "#appwallRegPage" ).popup( "close" );
                      
                      $('#appwallListview').empty();
                      appWallPostFun();
                      iconsFunction();
                      },
                      error:function(){
                      navigator.notification.alert(" Enter Your Correct Username And Password! ");
                      }
                      });
               },
               error:function(){
               navigator.notification.alert(" Registration canceled! ");
               }
               });
    }
    
}

function reg1(){
    
    var fname = $('#appwallRegFnam1').val();
    var lname = $('#appwallRegLnam1').val();
    var uname = $('#appwallRegid1').val();
    var password = $('#appwallRegPassword1').val();
    var phone = $('#appwallRegPhone1').val();
    var email = $('#appwallRegEmail1').val();
    if(fname==null||lname==null||uname==null||password==null||phone==null||email==null){
        navigator.notification.alert(" Enter all values! ");
    }
    else{
        $.ajax({url:"http://build.myappbuilder.com/api/subscribers.json", type:"POST", data:{"api_key":currentAppkey,"subscriber[firstname]":fname,"subscriber[lastname]":lname,"subscriber[username]":uname,"subscriber[password]":password,"subscriber[password_confirmation]":password,"subscriber[phone]":phone,"subscriber[email]":email},
               success:function(response){
               //	    	 
               //	    	  alert(uname);
               //	    	  alert(email);
               $.ajax({url:"http://build.myappbuilder.com/api/login.json", type:"POST", data:{"api_key":currentAppkey,"login":uname,"password":password},
                      success:function(response){
	    	    	  if(response.name){
                      localStorage.appwallLoginData = response.name;
                      }
	    	    	  else{
                      localStorage.appwallLoginData = response.username;
                      }
                      localStorage.sender_id = response.id;
                      //	    	        localStorage.log=1;
                      $( "#appwallLoginPage1" ).popup( "close" );
                      $( "#appwallRegPage1" ).popup( "close" );
                      $('#appwallListview').empty();
                      appWallPostFun();
                      iconsFunction();
                      },
                      error:function(){
                      navigator.notification.alert(" Enter Your Correct Username And Password! ");
                      }
                      });
               },
               error:function(){
               navigator.notification.alert(" Registration canceled! ");
               }
               });
    }
    
}