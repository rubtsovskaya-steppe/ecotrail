// ===== Мобильное меню =====
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');

if (burger && nav) {
  burger.addEventListener('click', () => {
    nav.classList.toggle('open');
    burger.classList.toggle('active');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      burger.classList.remove('active');
    });
  });
}

// ===== Яндекс.Карта =====
const YANDEX_API_KEY = 'dde1bf34-d5f9-4170-95f1-4bfa95ef40ad';

// Красивая круглая метка (SVG)
function createMarkerIcon(number) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="48" viewBox="0 0 40 48">
      <defs>
        <filter id="s" x="-20%" y="-10%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.35"/>
        </filter>
      </defs>
      <path filter="url(#s)" d="M20 0C9 0 0 9 0 20c0 14 20 28 20 28s20-14 20-28C40 9 31 0 20 0z" fill="#3d6b4f"/>
      <circle cx="20" cy="19" r="12" fill="#fff"/>
      <text x="20" y="24" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" font-weight="700" fill="#3d6b4f">${number}</text>
    </svg>
  `.trim();
  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
}

function initYandexMap() {
  const center = [51.22, 80.95];

  const map = new ymaps.Map('trail-map', {
    center: center,
    zoom: 11,
    controls: ['zoomControl', 'fullscreenControl', 'typeSelector']
  });

  const points = [
    {
      coords: [51.410882, 80.677912],
      name: 'Соссюрея мощная',
      distance: '0,3 км',
      photo: 'images/saussurea.jpg',
      desc: 'Редкое степное растение, занесённое в Красную книгу.'
    },
    {
      coords: [51.409057, 80.680057],
      name: 'Ковыль Лессинга',
      distance: '1,0 км',
      photo: 'images/kovyl-lessinga.jpg',
      desc: 'Один из видов перистых ковылей заказника.'
    },
    {
      coords: [51.405406, 80.689413],
      name: 'Ковыль Залесского',
      distance: '1,8 км',
      photo: 'images/kovyl-zalesskogo.jpg',
      desc: 'Редкий вид ковыля, охраняется на территории заказника.'
    },
    {
      coords: [51.402722, 80.701434],
      name: 'Лимониум полукустарниковый',
      distance: '2,7 км',
      photo: 'images/limonium.jpg',
      desc: 'Растёт на солонцеватых участках степи.'
    },
    {
      coords: [51.396118, 80.706927],
      name: 'Пион степной',
      distance: '3,5 км',
      photo: 'images/pion-stepnoj.jpg',
      desc: 'Цветёт в мае — начале июня.'
    },
    {
      coords: [51.393219, 80.711905],
      name: 'Тамарикс рыхлый',
      distance: '4,4 км',
      photo: 'images/tamarix.jpg',
      desc: 'Кустарник, типичный для степных и солончаковых местообитаний.'
    },
    {
      coords: [51.393648, 80.730788],
      name: 'Адонис волжский',
      distance: '5,3 км',
      photo: 'images/adonis.jpg',
      desc: 'Ярко-жёлтые цветы ранней весной.'
    },
    {
      coords: [51.390641, 80.743749],
      name: 'Ковыль перистый',
      distance: '6,2 км',
      photo: 'images/kovyl-peristyi.jpg',
      desc: 'Символ степи, один из самых узнаваемых видов.'
    }
  ];

  points.forEach((point, index) => {
    const num = index + 1;

    const balloonHtml = `
      <div class="ymap-balloon">
        <div class="ymap-balloon__img-wrap">
          <img class="ymap-balloon__img" src="${point.photo}" alt="${point.name}"
               onerror="this.parentElement.style.display='none'">
        </div>
        <div class="ymap-balloon__body">
          <div class="ymap-balloon__num">${num}</div>
          <h3 class="ymap-balloon__title">${point.name}</h3>
          <div class="ymap-balloon__dist">
            <span class="ymap-balloon__dist-icon">📍</span>
            ${point.distance} от начала тропы
          </div>
          <p class="ymap-balloon__desc">${point.desc}</p>
        </div>
      </div>
    `;

    const placemark = new ymaps.Placemark(point.coords, {
      balloonContent: balloonHtml,
      hintContent: `${num}. ${point.name}`
    }, {
      iconLayout: 'default#image',
      iconImageHref: createMarkerIcon(num),
      iconImageSize: [40, 48],
      iconImageOffset: [-20, -48],
      // Плавное открытие балуна
      balloonOffset: [0, -8],
      hideIconOnBalloonOpen: false
    });

    map.geoObjects.add(placemark);

    if (index === 0) {
      placemark.balloon.open();
    }
  });
}

// Загружаем API
(function () {
  const script = document.createElement('script');
  script.src = `https://api-maps.yandex.ru/2.1/?apikey=${YANDEX_API_KEY}&lang=ru_RU`;
  script.onload = () => ymaps.ready(initYandexMap);
  document.head.appendChild(script);
})();
