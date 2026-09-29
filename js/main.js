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

function initYandexMap() {
  const center = [51.22, 80.95];

  const map = new ymaps.Map('trail-map', {
    center: center,
    zoom: 11,
    controls: ['zoomControl', 'fullscreenControl', 'typeSelector']
  });

  const points = [
    {
      coords: [51.400211, 80.702974],
      name: 'Ковыль перистый',
      distance: '0,2 км',
      photo: 'images/kovyl-peristyi.jpg',
      desc: 'Начало тропы. Один из символов степи.'
    },
    {
      coords: [51.408636, 80.680831],
      name: 'Эремурус алтайский',
      distance: '1,1 км',
      photo: 'images/eremurus.jpg',
      desc: 'Редкий вид, занесённый в Красную книгу.'
    },
    {
      coords: [51.399634, 80.704635],
      name: 'Пион степной',
      distance: '2,4 км',
      photo: 'images/pion-stepnoj.jpg',
      desc: 'Цветёт в мае — начале июня.'
    },
    {
      coords: [51.395363, 80.717367],
      name: 'Адонис волжский',
      distance: '3,5 км',
      photo: 'images/adonis.jpg',
      desc: 'Ярко-жёлтые цветы ранней весной.'
    },
    {
      coords: [51.391669, 80.727701],
      name: 'Лимониум полукустарниковый',
      distance: '4,8 км',
      photo: 'images/limonium.jpg',
      desc: 'Растёт на солонцеватых участках.'
    },
    {
      coords: [51.383587, 80.735451],
      name: 'Озеро Солёное',
      distance: '6,2 км',
      photo: 'images/ozero-solenoe.jpg',
      desc: 'Одна из ключевых точек заказника.'
    }
  ];

  points.forEach((point, index) => {
    const placemark = new ymaps.Placemark(point.coords, {
      balloonContentHeader: `<strong style="font-size:15px">${point.name}</strong>`,
      balloonContentBody: `
        <div style="max-width:260px; font-family: Arial, sans-serif;">
          <img src="${point.photo}" 
               alt="${point.name}"
               style="width:100%; height:140px; object-fit:cover; border-radius:8px; margin:8px 0;"
               onerror="this.style.display='none'">
          <p style="margin:0 0 6px; color:#c4a35a; font-weight:600; font-size:14px;">
            📍 ${point.distance} от начала тропы
          </p>
          <p style="margin:0; color:#555; font-size:13px; line-height:1.4;">
            ${point.desc}
          </p>
        </div>
      `,
      hintContent: point.name
    }, {
      preset: 'islands#darkGreenDotIcon'
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
