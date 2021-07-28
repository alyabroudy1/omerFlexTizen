(function(){
var p;
let res = "no";
let res1 = "no";
let res2 = "no";
let res3 = "no";
let listDiv;
let moviesList;
let detailsPage = "details.html?";
let mainPageContainer;
let detailsPageContainer;
let sessionsPageContainer;
let videoPageContainer;

let GROUP_OF_GROUP = 0;
let GROUP = 1;
let ITEM = 2;
let RESOLUTION = 3;
let VIDEO = 4;




window.onload = function() {



    console.log('onload');
    progress.init();
    console.log('progress.init');
  //  displayVersion();

    console.log('displayversion');
    registerKeys();
    console.log('registerKeys');
    registerKeyHandler();
    console.log('registerKeysHandler');
    player = createPlayer('http://media.w3.org/2010/05/sintel/trailer.mp4');
    console.log('createPlayer');


    document.querySelector('.left').appendChild(player);



    document.body.addEventListener('unload', onUnload);


    mainPageContainer = document.getElementById("main-container");
     detailsPageContainer = document.getElementById("details-container");
     sessionsPageContainer = document.getElementById("sessions-container");
     episodePageContainer = document.getElementById("episode-container");
     videoPageContainer = document.getElementById("video-container");



    listDiv = document.getElementById("list_1");
    p = document.createElement('h1');
 //   loadFixtures();


/*
        let request = new XMLHttpRequest();
    request.open("GET", "https://re.two.re/link/14147", false);
    request.onload = () => {
        log('yesss:' + request.responseText.toString());
        res = request.responseText.toString();
    }
    request.send();


 */
    log('hello');
    let movie333 = {
        "title":"title",
        "link": "https://re.two.re/link/14147",
        "image":"bgImage",
        "state":RESOLUTION,
        "studio":'Akwam'
    };

   //let uu  = fetchAkwamVideoLink(movie333);
//    let uu  ="https://akwam.cc/download/14147/685/sonic-the-hedgehog";
  //  uu = fetchAkwamVideoLinkDownloadPage(uu);

    //log("video: "+ uu);

 //  log( makeRequest("https://re.two.re/link/14147") );
   /* fetch(movie333.link)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.body;
        })
        .then( responseBody => {
             log('response: ' + responseBody);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            log('response: error: ' + error);
        });

    */
    log('hello2');
   search('spider-man');
   }

   async function makeRequest(url) {
    let response=  await fetch(url)
           .then(response => {
               if (!response.ok) {
                   throw new Error('Network response was not ok');
               }
               return response.text();
           })
           .catch(error => {
               console.error('There has been a problem with your fetch operation:', error);
               log('response: error: ' + error);
           });
    var ss = ""+response.toString();
       return ss;
    }

function isSeries(link) {
    return link.includes("/series") || link.includes("/movies");
}

async function search(query) {
    document.getElementById("demo").innerText = "search";
    // let query = document.getElementById('search').value;
    log("search: " + query);
    let ress = await fetch("https://akwam.cc/search?q=" + query)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            log('response: error: ' + error);
        });


    let doc = document.createElement('html');
    //doc.innerHTML = res;
    doc.innerHTML = ress;
    let boxes = doc.getElementsByClassName('entry-box');
    let linkUrl = '';

    for (var item of boxes) {
        let link = item.getElementsByClassName('box')[0].getAttribute("href");

        //  linkUrl += isValidAkwamMovie(link) + '\n' +'link: '+ link;
        if (isValidAkwamMovie(link)) {

            let title = item.querySelector('[src]').getAttribute("alt");
            let image = item.querySelector('[src]').getAttribute("data-src");
            let rate = item.querySelector('.rating').textContent

            let state = ITEM;
            if (isSeries(link)) {
                state = GROUP
            }

            let movie = {
                "title": title,
                "link": link,
                "image": image,
                "rate": rate,
                "state": state,
                "studio": 'Akwam'
            };
            //linkUrl += 'title: '+ title + ', Link: ' +link  + ', image : '+ image + ', rate: '+rate+ '\n';
            linkUrl += title + '\n';
            buildMovie(movie, mainPageContainer);
        }


    }

  //  p.innerText = boxes.length + linkUrl;

    mainPageContainer.appendChild(p);
}

function isValidAkwamMovie(url){
    let con1 =  url.includes("/movie");
    let con2 =  url.includes("/series");
    let con3 =  url.includes("/episode");
    return con1 || con2 || con3;
}

function getRedirectLink(movie) {
    return detailsPage +
        "link="+ movie.link+ "&&"+
        "title="+movie.title+ "&&"+
        "image="+movie.image+ "&&"+
        "rate="+movie.rate
        ;
}

function fetchDetails(movie) {
    document.getElementById("details-page").scrollIntoView({behavior: 'smooth'});
    let div = document.createElement('p');
    let buttonElement = document.createElement('button');

    buttonElement.innerText = movie.title;
    nextAction(movie, buttonElement);
    div.innerText = movie.link;
    detailsPageContainer.appendChild(buttonElement);
    detailsPageContainer.appendChild(div);
}

function fetchSession(movie) {
    document.getElementById("sessions-page").scrollIntoView({behavior: 'smooth'});


    let div = document.createElement('p');
    let buttonElement = document.createElement('button');

    buttonElement.innerText = movie.title;
    nextAction(movie, buttonElement);
    div.innerText = movie.link;
    sessionsPageContainer.appendChild(buttonElement);
    sessionsPageContainer.appendChild(div);
}

async function fetchEpisode(movie) {
    document.getElementById("episode-page").scrollIntoView({behavior: 'smooth'});
    log("fetchEpisode: " + movie.link);
    let container = episodePageContainer;

    let titleDiv = document.createElement('div');
    titleDiv.className = "row";
    titleDiv.innerText = movie.title;

    var sosimage = document.createElement('div');
    sosimage.className = "row";

    var sosImagetag = document.createElement('img');
    sosImagetag.src = movie.image;
    console.log(movie.image);
    container.appendChild(titleDiv);
    sosimage.appendChild(sosImagetag);
    container.appendChild(sosimage);

    let qualityLinks = await fetchResolutions(movie);


    var sosDesc = document.createElement('div');
    sosDesc.className = "row";
    sosDesc.innerText = description;

    container.appendChild(sosDesc);

    for (let qLink of qualityLinks) {
        let linkDiv = document.createElement('div');
        linkDiv.className = "row";
        log("qlink: " + qLink.link);
        var linkDivLink = document.createElement('button');

        // linkDivLink.onclick = function() {playVideo(qLink.link)};
        nextAction(qLink, linkDivLink);
        linkDivLink.innerText = qLink.title;

        linkDiv.appendChild(linkDivLink)
        container.appendChild(linkDiv);
    }
    console.log(qualityLinks);


    let div = document.createElement('p');
    let buttonElement = document.createElement('button');

    buttonElement.innerText = movie.title;
    nextAction(movie, buttonElement);

    div.innerText = movie.link;
    container.appendChild(buttonElement);
    container.appendChild(div);
}

async function fetchVideo(movie) {
    document.getElementById("video-page").scrollIntoView({behavior: 'smooth'});

    log("fetchVideo: " + movie.link);
    var videoLink1 = await fetchAkwamVideoLink(movie);

    await log("videoLink1: " +videoLink1);
    let videoLink2 = await fetchAkwamVideoLinkDownloadPage(videoLink1);
    log("videoLink2: " + videoLink2);

    let div = document.createElement('p');
    let buttonElement = document.createElement('button');

    buttonElement.innerText = "Play";
    buttonElement.onclick = function () {
        play();
    };
    let buttonFullScreen = document.createElement('button');

    buttonFullScreen.innerText = "full screen";
    buttonFullScreen.onclick= function () {
        openFullscreen();
    };

    div.innerText = videoLink2;
    videoPageContainer.appendChild(buttonElement);
    videoPageContainer.appendChild(buttonFullScreen);
    videoPageContainer.appendChild(div);
   await changeSource(videoLink2);

    await player.webkitRequestFullScreen();
}

function buildMovie(movie, list){
    var div = document.createElement('div');
   // div.className = 'focusable col-lg-4 col-md-12 mb-4 mb-lg-0 border';

    var link = document.createElement('a');
    link.className = 'focusable';
    nextAction(movie, link);

    var image = document.createElement('img');
    image.className = 'w-50 shadow-1-strong rounded m-4';
    image.src= movie.image;

 /*   var title = document.createElement('div');
    title.className = '';
    title.innerText= movie.title;

    var rate = document.createElement('div');
    rate.className = '';
    rate.innerText= movie.rate + ' '+movie.studio;

  */

    link.appendChild(image);
    div.appendChild(link);
   // div.appendChild(title);
   // div.appendChild(rate);

    list.appendChild(div);
}

function loadFixtures(){
    let movie1 = {
        "title": "t1",
        "link":"link1",
        "image":"https://www.w3schools.com/howto/img_woods_wide.jpg",
        "rate":"1.1",
        "studio":'Akwam'
    };
    moviesList[0] = movie1;

    let movie2 = {
        "title": "t2",
        "link":"link2",
        "image":"https://www.w3schools.com/howto/img_5terre_wide.jpg",
        "rate":"1.1",
        "studio":'Akwam'
    };
    moviesList[1] = movie2;

    let movie3 = {
        "title": "t3",
        "link":"link3",
        "image":"https://www.w3schools.com/howto/img_mountains_wide.jpg",
        "rate":"1.1",
        "studio":'Akwam'
    };
    moviesList[2] = movie3;

    let movie4 = {
        "title": "t5",
        "link":"link5",
        "image":"https://www.w3schools.com/howto/img_lights_wide.jpg",
        "rate":"1.1",
        "studio":'Akwam'
    };
    moviesList[3] = movie4;

    let movie5 = {
        "title": "t5",
        "link":"link5",
        "image":"https://www.w3schools.com/howto/img_nature_wide.jpg",
        "rate":"1.1",
        "studio":'Akwam'
    };
    moviesList[4] = movie5;

    let movie6 = {
        "title": "t6",
        "link":"link6",
        "image":"https://www.w3schools.com/howto/img_snow_wide.jpg",
        "rate":"1.1",
        "studio":'Akwam'
    };
    moviesList[5] = movie6;
}



async function fetchResolutions(movie) {
    log("fetchResolutions: " + movie.link);
    let ress = await fetch(movie.link)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            log('response: error: ' + error);
        });

    let qualityLinks = [];
    let movieCounter = 0;
    let doc = document.createElement('html');
    //doc.innerHTML = res;
    doc.innerHTML = ress;

    //get background image and trailer link
    let boxes = doc.getElementsByClassName('row py-4');
    let bgImage = "";
    let ytLink = "";
    let p2Caption = "/link/";
    console.log("boxes:" + boxes.length);
    for (let item of boxes) {
        let imageLinks = item.querySelectorAll('[href]');
        console.log("imageLinks:" + imageLinks.length);
        for (let itemImage of imageLinks) {
            console.log("itemImage: " + itemImage.getAttribute("href"));
            if (itemImage.getAttribute("href").includes("/uploads/")) {
                bgImage = itemImage.getAttribute("href");
                //break;
            }
            if (itemImage.getAttribute("href").includes("youtube")) {
                ytLink = itemImage.getAttribute("href");
                break;
            }

        }
        if (bgImage !== "") {
            break;
        }
    }
    console.log("bgimage:" + bgImage);
    console.log("ylink:" + ytLink);
    //get description
    let decDivs = doc.querySelectorAll("h2");
    console.log("decDivs:" + decDivs.length);
    for (let div of decDivs) {
        let pdesc = div.getElementsByTagName("p");
        console.log("decDivs p:" + div.getElementsByTagName("p").length);
        if (pdesc.length > 0) {
            description = div.getElementsByTagName("p")[0].innerHTML;
            break;
        }
    }

    console.log("description:" + description);

    //get quality links
    let qlinks = doc.getElementsByClassName("tab-content quality");
    let videoUrl = "";
    let title = "";

    console.log("qlinks:" + qlinks.length);
    for (let qlink of qlinks) {
        let links = qlink.querySelectorAll('[href]');
        console.log("qlinks links:" + links.length);
        for (let qlink2 of links) {
            if (
                qlink2.getAttribute("href").includes("/link/")
                || qlink2.getAttribute("href").includes("/download/")) {
                videoUrl = qlink2.getAttribute("href");
                title = qlink2.textContent;
            }
        }

        let movie = {
            "title": title,
            "link": videoUrl,
            "image": bgImage,
            "state": RESOLUTION,
            "studio": 'Akwam'
        };
        //buildMovie(movie, listDiv);
        console.log("movie:" + movie.title);
        console.log("movie:" + movie.link);
        qualityLinks.push(movie);
        movieCounter++;
    }


    return qualityLinks;
    //listDiv.appendChild(p);
}

function nextAction(movie, element){
    switch (movie.state) {
        case GROUP_OF_GROUP:
            element.onclick = function (){fetchDetails(movie)};
            break;
        case GROUP:
            element.onclick = function (){fetchSession(movie)};
            break;
        case ITEM:
            element.onclick = function (){fetchEpisode(movie)};
            break;
        case RESOLUTION:
            element.onclick = function (){fetchVideo(movie)};
            break;
        case VIDEO:
            element.onclick = function (){playVideo(movie)};
            break;
        default:
            element.onclick = function (){fetchDetails(movie)};
    }
}

async function fetchAkwamVideoLinkDownloadPage(url) {
    log("fetchAkwamVideoLinkDownloadPage: " + url);
    /*  let request = new XMLHttpRequest();
      request.open("GET", url, false);
      request.onload = () => {
          log("request 2");
          res = request.responseText.toString();
      }
      request.send();

     */
    let ress = await fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            log('response: error: ' + error);
        });

   // log(ress.toString());

    doc = document.createElement('html');


    //doc.innerHTML = res;
    doc.innerHTML = ress;

    //check if security caption
    let divs = doc.getElementsByClassName('btn-loader');
    // let divs = doc.querySelectorAll('.btn-loader');
    let formCHeck = doc.querySelector(".form");

    log("isCheck ? 3: " + divs.length);

    let hs = doc.querySelectorAll('h1');
    let isCheck = divs.length === 0;
    log("isCheck ? 3: " + isCheck);
    console.log("isCheck: " + divs.length);
    //  if (!isCheck) {
    let videoCaption = "akwam.download";
    let videoCaption2 = "akwam.link";
    let videoCaption3 = "/download/";
    log("isCheck 3: " + url);
    console.log("dive: " + divs.length);
    log("isCheck 3: l: " + divs.length);
    for (let div of divs) {
        let links2 = div.querySelectorAll('[href]');
        console.log("links2: " + links2.length);
        for (let linko of links2) {
            if (linko.getAttribute("href").includes(videoCaption)
                || linko.getAttribute("href").includes(videoCaption2)
                || linko.getAttribute("href").includes(videoCaption3)
            ) {
                //  databaseMovie.child(movie.getId()).child("url").setValue(link.attr("href"));
                //movie.setUrl(link.attr("href"));
                url = linko.getAttribute("href");


                log("fetchAkwamVideoLinkDownloadPage 3: " + url);
                console.log("video: " + url);

                // movie.setUrl(url);
            }
        }
    }
    return url;
    //end if     }
}

async function fetchAkwamVideoLink(movie){
    log("fetchAkwamVideoLink: "+ movie.link);

    let ress=  await fetch(movie.link)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            log('response: error: ' + error);
        });

   // log(ress.toString());


    let qualityLinks= [];
    let movieCounter=0;
    let doc = document.createElement( 'html' );
    //doc.innerHTML = res;
    doc.innerHTML = ress;

    let url = movie.link;
    if (url.includes("/link/")) {
        log("fetchAkwamVideoLink: include /link/ ");
        let links = doc.getElementsByTagName('a');
        log("fetchAkwamVideoLink: links "+ links.length);
        let linkCaption = "akwam.";

        for (let link of links) {
            if (link.getAttribute("href").includes(linkCaption)) {
                //  databaseMovie.child(movie.getId()).child("url").setValue(link.attr("href"));
                //movie.setUrl(link.attr("href"));
                url = link.getAttribute("href");
                log("fetchAkwamVideoLink 2 a: "+ url);
                break;
            }
        }

        return url;
    }


    return '';
}


/**
 * Displays logging information on the screen and in the console.
 * @param {string} msg - Message to log.
 */
async function log(msg) {
    var logsEl = document.getElementById('logs');

    if (msg) {
        // Update logs
        console.log('[PlayerHTML5]: ', msg);
        logsEl.innerHTML += msg + '<br />';
    } else {
        // Clear logs
        logsEl.innerHTML = '';
    }

    logsEl.scrollTop = logsEl.scrollHeight;
}

/**
 * Register keys used in this application
 */
function registerKeys() {
    var usedKeys = [
        'MediaFastForward',
        'MediaPause',
        'MediaPlay',
        'MediaRewind',
        'MediaStop',
        '1'
    ];

    usedKeys.forEach(
        function (keyName) {
            tizen.tvinputdevice.registerKey(keyName);
        }
    );
}


/**
 * Handle input from remote
 */
function registerKeyHandler() {
    document.addEventListener('keydown', function (e) {
        var seekJump = 5;
        switch (e.keyCode) {
            //key RETURN
            case 10009:
                log("RETURN");
                tizen.application.getCurrentApplication().hide();
                break;

            //key PLAY
            case 415:
                play();
                break;

            //key STOP
            case 413:
                stop();
                break;

            //key PAUSE
            case 19:
                pause();
                break;

            //key FF
            case 417:
                if (!player.seeking && player.currentTime + seekJump < player.seekable.end(0)) {
                    player.currentTime += seekJump;
                }
                break;

            //key REWIND
            case 412:
                if (!player.seeking && player.currentTime - seekJump > player.seekable.start(0)) {
                    player.currentTime -= seekJump;
                }
                break;

            //key 1
            case 49:
                log("Key 1");
                changeSource();
                break;

            default:
                log("Unhandled key: " + e.keyCode);
                break;
        }
    });
}

/**
 * Display application version
 */
function displayVersion() {
    var el = document.createElement('div');
    el.id = 'version';
    el.innerHTML = 'ver: ' + tizen.application.getAppInfo().version;
    document.body.appendChild(el);
}

var posters = ['img/SINTEL_poster.jpg', 'img/BUNNY_poster.jpg'];
var sources = ['http://media.w3.org/2010/05/sintel/trailer.mp4', 'http://media.w3.org/2010/05/bunny/trailer.mp4'];
var currentSource = 0;
var player = null;

/**
 * Creates HTML video tag and adds all event listeners
 */
function createPlayer(videoSource) {
    var _player = document.createElement('video');
    _player.width = 100;
    _player.controls = true;
    _player.poster = posters[currentSource];
    _player.src = videoSource;
    if (videoSource === null){
        _player.src = sources[currentSource];
    }
    log("createPlayer: "+videoSource);
    _player.load();

    _player.addEventListener('loadeddata', function () {
        log("Movie loaded.");
    });
    _player.addEventListener('loadedmetadata', function () {
        log("Meta data loaded.");
    });
    _player.addEventListener('timeupdate', function () {
        log("Current time: " + _player.currentTime);
        progress.updateProgress(_player.currentTime, _player.duration);
    });
    _player.addEventListener('play', function () {
        log("Playback started.");
    });
    _player.addEventListener('pause', function () {
        log("Playback paused.");
    });
    _player.addEventListener('ended', function () {
        log("Playback finished.");
        init(videoSource);
    });

    return _player;
}

    function openFullscreen() {
        MediaInstance.webkitRequestFullScreen();
    }

/**
 * Stop the player when application is closed.
 */
function onUnload() {
    log('onUnload');
    stop();
}

/**
 * Choose next source video and poster
 */
async function changeSource(videoSource) {
    currentSource += 1;

    // Last source reached, go to the first one
    if (currentSource >= sources.length) {
        currentSource = 0;
    }
log("changeSource: "+ videoSource);
    if (!player) {
        player = createPlayer(videoSource);
        document.querySelector('.left').appendChild(player);
        log("changeSource: player null: "+ videoSource);
    }
        log("changeSource: only change "+ videoSource);


   await init(videoSource);
}

/**
 * Function to init video playback.
 */
function init(videoSource) {
    player.poster = posters[currentSource];
   // player.src = sources[currentSource];
    player.src = videoSource;
    player.load();
    progress.hide();
    progress.reset();
}

/**
 * Function to start video playback.
 * Create video element if it does not exist yet.
 */
function play() {
    player.play();
}

/**
 * Function to pause video playback.
 */
function pause() {
    player.pause();
}

/**
 * Function to stop video playback.
 */
function stop() {
    player.pause();
    player.currentTime = 0;

    init('');
}

/**
 * Object handling updating of progress bar
 */
var progress = {
    init: function () {
        this.dom = document.getElementById('progress');
        this.barEl = document.getElementById('bar');
        console.log('dom: ', this.dom);
        console.log('barEl: ', this.barEl);

        this.reset();
    },

    reset: function () {
        this.barEl.style.width = 0;
        this.show();
    },

    updateProgress: function (elapsed, total) {
        var progress = 100 * elapsed / total;

        this.barEl.style.width = progress + '%';
    },

    show: function () {
        this.dom.style.visibility = "visible";
    },

    hide: function () {
        this.dom.style.visibility = "hidden";
    }
};


})();
