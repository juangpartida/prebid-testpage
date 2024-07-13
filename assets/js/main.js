/*==================== iframe integration ====================*/

function renderAdInIframe(adDivId, adId) {
    const adContainer = document.getElementById(adDivId);
    if (adContainer) {
        const iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.frameBorder = '0';
        iframe.scrolling = 'no';
        iframe.onload = function() {
            pbjs.renderAd(this.contentWindow.document, adId);
        };
        adContainer.appendChild(iframe);
    } else {
        console.log('Ad container not found for:', adDivId);
    }
}

/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu');
    });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu');
    });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction(){
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName('skills__content'),
      skillsHeader = document.querySelectorAll('.skills__header');

function toggleSkills(){
    let itemClass = this.parentNode.className;

    for(i = 0; i < skillsContent.length; i++){
        skillsContent[i].className = 'skills__content skills__close';
    }
    if(itemClass === 'skills__content skills__close'){
        this.parentNode.className = 'skills__content skills__open';
    }
}

skillsHeader.forEach((el) => {
    el.addEventListener('click', toggleSkills);
});

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target);

        tabContents.forEach(tabContent => {
            tabContent.classList.remove('qualification__active');
        });
        target.classList.add('qualification__active');

        tabs.forEach(tab => {
            tab.classList.remove('qualification__active');
        });
        tab.classList.add('qualification__active');
    });
});

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll('.services__modal'),
      modalBtns = document.querySelectorAll('.services__button'),
      modalCloses = document.querySelectorAll('.services__modal-close');

let modal = function(modalClick){
    modalViews[modalClick].classList.add('active-modal');
};

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () => {
        modal(i);
    });
});

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove('active-modal');
        });
    });
});

/*==================== PORTFOLIO SWIPER  ====================*/
let swiperPortfolio = new Swiper('.portfolio__container', {
    cssMode: true,
    loop: true,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
});

/*==================== TESTIMONIAL ====================*/
let swiperTestimonial = new Swiper('.testimonial__container', {
    loop: true,
    grabCursor: true,
    spaceBetween: 48,

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
    breakpoints: {
        568: {
            slidesPerView: 2,
        },
    }
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        const linkSelector = '.nav__menu a[href*="' + sectionId + '"]';
        const linkElement = document.querySelector(linkSelector);

        if (linkElement) {  // Check if the element exists before trying to use it
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                linkElement.classList.add('active-link');
            } else {
                linkElement.classList.remove('active-link');
            }
        } else {
            console.log('No link found for selector:', linkSelector);
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
    const nav = document.getElementById('header');
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/*==================== SHOW SCROLL TOP ====================*/ 
function scrollTop(){
    const scrollTop = document.getElementById('scroll-top');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 200) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollTop);

/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'uil-sun';

// Added: Logo change
const logoImage = document.getElementById('logo-img'); // Get the logo image element
const lightLogo = 'assets/img/logo-light.png'; // Path to light logo
const darkLogo = 'assets/img/logo-dark.png'; // Path to dark logo

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun';

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme);
  // Added: Set the correct logo based on the theme
  logoImage.src = selectedTheme === 'dark' ? darkLogo : lightLogo;
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / light theme
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
    // Added: Change the logo based on the current theme
    logoImage.src = document.body.classList.contains(darkTheme) ? darkLogo : lightLogo;
});

/*==================== PREBID INTEGRATION START ====================*/

var adUnits = [
    {
        code: 'ad-div-300x250',
        mediaTypes: {
            banner: {
                sizes: [[300, 250]]
            }
        },
        bids: [
            {
                bidder: 'viant',
                params: {
                    placementId: '23469191',
                    publisherId: '12345'
                },
                ortb2Imp: {
                    pmp: {
                        private_auction: 1,
                        deals: [
                            {
                                id: '1234567',
                                at: 3,
                                bidfloor: 25,
                                bidfloorcur: 'USD',
                                ext: {
                                    must_bid: 1,
                                    private_auction: 1
                                }
                            }
                        ]
                    }
                }
            }
        ]
    },
//     {
//         code: 'ad-div-160x600',
//         mediaTypes: {
//             banner: {
//                 sizes: [[160, 600]]
//             }
//         },
//         bids: [
//             {
//                 bidder: 'viant',
//                 params: {
//                     placementId: '23469191',
//                     publisherId: '12345'
//                 },
//                 ortb2Imp: {
//                     pmp: {
//                         private_auction: 1,
//                         deals: [
//                             {
//                                 id: '1234567',
//                                 at: 3,
//                                 bidfloor: 25,
//                                 bidfloorcur: 'USD',
//                                 ext: {
//                                     must_bid: 1,
//                                     private_auction: 1
//                                 }
//                             }
//                         ]
//                     }
//                 }
//             }
//         ]
//     },
//     {
//         code: 'ad-div-728x90',
//         mediaTypes: {
//             banner: {
//                 sizes: [[728, 90]]
//             }
//         },
//         bids: [
//             {
//                 bidder: 'viant',
//                 params: {
//                     placementId: '23469191',
//                     publisherId: '12345'
//                 },
//                 ortb2Imp: {
//                     pmp: {
//                         private_auction: 1,
//                         deals: [
//                             {
//                                 id: '1234567',
//                                 at: 3,
//                                 bidfloor: 25,
//                                 bidfloorcur: 'USD',
//                                 ext: {
//                                     must_bid: 1,
//                                     private_auction: 1
//                                 }
//                             }
//                         ]
//                     }
//                 }
//             }
//         ]
//     },
//     {
//         code: 'ad-div-300x600',
//         mediaTypes: {
//             banner: {
//                 sizes: [[300, 600]]
//             }
//         },
//         bids: [
//             {
//                 bidder: 'viant',
//                 params: {
//                     placementId: '23469191',
//                     publisherId: '12345'
//                 },
//                 ortb2Imp: {
//                     pmp: {
//                         private_auction: 1,
//                         deals: [
//                             {
//                                 id: '1234567',
//                                 at: 3,
//                                 bidfloor: 25,
//                                 bidfloorcur: 'USD',
//                                 ext: {
//                                     must_bid: 1,
//                                     private_auction: 1
//                                 }
//                             }
//                         ]
//                     }
//                 }
//             }
//         ]
//     }
];

// Ensure pbjs object is initialized correctly

var pbjs = pbjs || {};
pbjs.que = pbjs.que || [];

pbjs.que.push(function() {
    pbjs.addAdUnits(adUnits);

    pbjs.setConfig({
        debug: true,
        userSync: {
            userIds: [],
            syncDelay: 6000
        }
    });

    pbjs.bidderSettings = {
        standard: {
            adserverTargeting: [
                {
                    key: "hb_pb",
                    val: function(bidResponse) {
                        return bidResponse.pbLg;
                    }
                }
            ],
            priceGranularity: {
                buckets: [
                    {
                        precision: 2,
                        min: 0,
                        max: 25,
                        increment: 0.25
                    },
                    {
                        precision: 2,
                        min: 25,
                        max: 50,
                        increment: 0.25
                    },
                    {
                        precision: 2,
                        min: 50,
                        max: 100,
                        increment: 0.50
                    },
                    {
                        precision: 2,
                        min: 100,
                        max: 200,
                        increment: 1.00
                    },
                    {
                        precision: 2,
                        min: 200,
                        max: 500,
                        increment: 2.50
                    }
                ]
            }
        }
    };

    pbjs.requestBids({
        timeout: 1000,
        bidsBackHandler: function() {
            adUnits.forEach(unit => {
                var iframe = document.getElementById(unit.code + '-iframe'); // Referenced correct iframe ID
                var iframeDoc = iframe.contentWindow.document;
                var adServerTargeting = pbjs.getAdserverTargetingForAdUnitCode(unit.code); // Referenced correct ad unit code

                // If any bidders return any creatives
                if (adServerTargeting && adServerTargeting['hb_adid']) {
                    pbjs.renderAd(iframeDoc, adServerTargeting['hb_adid']);
                    console.log('Ad rendered for ' + unit.code);
                } else {
                    iframe.width = unit.mediaTypes.banner.sizes[0][0];
                    iframe.height = unit.mediaTypes.banner.sizes[0][1];
                    iframeDoc.write('<head></head><body>No ad available</body>');
                    iframeDoc.close();
                    console.log('No ad available for ' + unit.code);
                }
            });
        }
    });
});
