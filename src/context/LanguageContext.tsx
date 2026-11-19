'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ru' | 'kz';

export const translations = {
  ru: {
    // Navigation
    nav: {
      about: 'О нас',
      menu: 'Меню',
      events: 'Мероприятия',
      reviews: 'Отзывы',
      contacts: 'Контакты',
      bookTable: 'Забронировать',
      bookTableLong: 'Забронировать стол',
    },
    // Hero
    hero: {
      badge: 'Halal Этно-Ресторан',
      welcome: 'Добро пожаловать в',
      subtitle: 'Настоящий вкус казахских традиций в современном исполнении',
      viewMenu: 'Посмотреть меню',
      bookTable: 'Забронировать стол',
    },
    // About
    about: {
      tag: 'О ресторане',
      titlePrefix: 'Почему выбирают',
      titleHighlight: 'SIRNE.KZ',
      features: [
        {
          title: 'Halal кухня',
          description: 'Только халяльные продукты и соблюдение всех стандартов.',
        },
        {
          title: 'Национальные блюда',
          description: 'Традиционные казахские рецепты, передаваемые из поколения в поколение.',
        },
        {
          title: 'Банкетный зал',
          description: 'Просторный зал до 100 гостей для любого торжества.',
        },
        {
          title: 'Юрта',
          description: 'Настоящая юрта до 60 гостей — атмосфера казахского дастархана.',
        },
        {
          title: 'Детские зоны',
          description: '2 игровые зоны для детей с аниматорами.',
        },
        {
          title: 'Семейный отдых',
          description: 'Комфорт для всей семьи: тапчаны, кабинки, уютная атмосфера.',
        },
      ],
    },
    // Menu
    menu: {
      tag: 'Меню',
      titlePrefix: 'Наш',
      titleHighlight: 'дастархан',
      searchPlaceholder: 'Поиск по меню...',
      foundCount: 'Найдено:',
      dishesWord: 'блюд',
      notFound: 'Ничего не найдено',
      addToCart: 'В корзину',
      inCart: 'В корзине',
      allCategories: 'Все категории',
      filterPlaceholder: 'Все категории блюд',
    },
    // Events & Booking
    events: {
      tag: 'Мероприятия',
      titlePrefix: 'Ваш',
      titleHighlight: 'праздник с нами',
      bookBtn: 'Забронировать',
      mainCta: 'Забронировать мероприятие',
      modalTitle: 'Бронирование мероприятия',
      chooseEvent: 'Мероприятие',
      selectDate: 'Выберите желаемую дату',
      selectedDate: 'Желаемая дата:',
      continueWhatsApp: 'Продолжить в WhatsApp',
      back: 'Назад',
      changeDate: 'Изменить дату',
      confirmEvent: 'Выбранное мероприятие',
      noPastDates: 'Прошедшие даты недоступны для бронирования',
      notice: 'Отправка заявки не является автоматическим подтверждением. Менеджер свяжется с вами для согласования деталей.',
      calendarMonths: [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
      ],
      calendarDaysShort: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      items: [
        {
          id: 'hall',
          title: 'Банкетный зал',
          capacity: '100 человек',
          description: 'Просторный зал для больших торжеств с полным банкетным обслуживанием',
        },
        {
          id: 'yurt',
          title: 'Юрта',
          capacity: '60 человек',
          description: 'Настоящая казахская юрта для аутентичных праздников',
        },
        {
          id: 'family',
          title: 'Семейные мероприятия',
          capacity: '',
          description: 'Уютная атмосфера для семейных праздников любого масштаба',
        },
        {
          id: 'corporate',
          title: 'Корпоративы',
          capacity: '',
          description: 'Организация корпоративных мероприятий и тимбилдингов',
        },
        {
          id: 'wedding',
          title: 'Свадьбы',
          capacity: '',
          description: 'Незабываемый свадебный банкет с традиционным колоритом',
        },
        {
          id: 'kudalik',
          title: 'Құдалық',
          capacity: '',
          description: 'Традиционная церемония сватовства в казахском стиле',
        },
        {
          id: 'toi',
          title: 'Той',
          capacity: '',
          description: 'Большой казахский праздник — той в лучших традициях',
        },
      ],
      whatsappTemplate: (eventTitle: string, dateStr: string) =>
        `Здравствуйте! Хотел(а) бы оставить заявку на проведение мероприятия.\n\nМероприятие: ${eventTitle}\nЖелаемая дата: ${dateStr}\n\nБуду ждать обратной связи!`,
    },
    // Working hours & status
    status: {
      openNow: 'Открыто сейчас',
      closed: 'Закрыто',
      hoursText: 'Ежедневно 10:00 – 00:00',
      timezoneInfo: 'UTC+5 (Талдыкорган)',
    },
    // Reviews
    reviews: {
      tag: 'Отзывы',
      titlePrefix: 'Что говорят',
      titleHighlight: 'наши гости',
      allReviewsBtn: 'Все отзывы в 2ГИС',
      leaveReviewBtn: 'Оставить отзыв',
      verifiedSource: 'Официальная страница 2ГИС',
    },
    // Contacts
    contacts: {
      tag: 'Контакты',
      titlePrefix: 'Как нас',
      titleHighlight: 'найти',
      addressTitle: 'Адрес',
      addressValue: 'Балпық Би 61, Талдықорған',
      phoneTitle: 'Телефон',
      hoursTitle: 'Время работы',
      hoursValue: 'Ежедневно 10:00 – 00:00',
      openIn2gis: 'Открыть в 2GIS',
    },
    // Mobile actions
    mobileActions: {
      call: 'Позвонить',
      whatsapp: 'WhatsApp',
      route: 'Маршрут',
    },
    // Cart
    cart: {
      title: 'Ваш заказ',
      empty: 'Корзина пока пуста',
      namePlaceholder: 'Ваше имя',
      phonePlaceholder: 'Телефон',
      addressPlaceholder: 'Адрес доставки',
      total: 'Итого:',
      orderWhatsApp: 'Заказать через WhatsApp',
      notice: 'Нажимая на кнопку, вы перейдете в чат WhatsApp с оператором',
      alertFillAll: 'Пожалуйста, заполните все поля',
      newOrderTitle: '*Новый заказ с сайта SIRNE.KZ*',
      clientLabel: 'Клиент',
      phoneLabel: 'Тел',
      addressLabel: 'Адрес',
    },
    // Footer
    footer: {
      description: 'Halal этно-ресторан в Талдыкоргане. Настоящий вкус казахских традиций в современном исполнении.',
      navTitle: 'Навигация',
      contactsTitle: 'Контакты',
      copyright: '© 2026 SIRNE.KZ — Halal этно-ресторан. Все права защищены.',
      location: 'Талдықорған, Қазақстан',
    },
  },
  kz: {
    // Navigation
    nav: {
      about: 'Біз туралы',
      menu: 'Мәзір',
      events: 'Іс-шаралар',
      reviews: 'Пікірлер',
      contacts: 'Байланыс',
      bookTable: 'Брондау',
      bookTableLong: 'Үстел брондау',
    },
    // Hero
    hero: {
      badge: 'Halal Этно-Мейрамхана',
      welcome: 'Қош келдіңіздер:',
      subtitle: 'Заманауи үлгідегі қазақ дәстүрінің шынайы дәмі',
      viewMenu: 'Мәзірді көру',
      bookTable: 'Үстел брондау',
    },
    // About
    about: {
      tag: 'Мейрамхана туралы',
      titlePrefix: 'Неліктен',
      titleHighlight: 'SIRNE.KZ таңдайды',
      features: [
        {
          title: 'Halal тағамдар',
          description: 'Тек халал өнімдер және барлық стандарттардың қатаң сақталуы.',
        },
        {
          title: 'Ұлттық тағамдар',
          description: 'Ұрпақтан ұрпаққа жалғасып келе жатқан қазақтың дәстүрлі рецепттері.',
        },
        {
          title: 'Банкет залы',
          description: 'Кез келген салтанатқа арналған 100 қонаққа дейінгі кең зал.',
        },
        {
          title: 'Киіз үй',
          description: '60 қонаққа дейінгі нағыз қазақи киіз үй — ұлттық дастархан атмосферасы.',
        },
        {
          title: 'Балалар аймағы',
          description: 'Аниматорлары бар балаларға арналған 2 ойын аймағы.',
        },
        {
          title: 'Отбасылық демалыс',
          description: 'Бүкіл отбасы үшін жайлылық: тапшандар, жеке кабиналар, жайлы орта.',
        },
      ],
    },
    // Menu
    menu: {
      tag: 'Мәзір',
      titlePrefix: 'Біздің',
      titleHighlight: 'дастархан',
      searchPlaceholder: 'Мәзір бойынша іздеу...',
      foundCount: 'Табылды:',
      dishesWord: 'тағам',
      notFound: 'Ештеңе табылмады',
      addToCart: 'Себетке',
      inCart: 'Себетте',
      allCategories: 'Барлық санаттар',
      filterPlaceholder: 'Барлық тағам санаттары',
    },
    // Events & Booking
    events: {
      tag: 'Іс-шаралар',
      titlePrefix: 'Бізбен бірге',
      titleHighlight: 'мерекеңіз',
      bookBtn: 'Брондау',
      mainCta: 'Іс-шараны брондау',
      modalTitle: 'Іс-шараны брондау',
      chooseEvent: 'Іс-шара',
      selectDate: 'Қалаулы күнді таңдаңыз',
      selectedDate: 'Қалаулы күн:',
      continueWhatsApp: 'WhatsApp арқылы жалғастыру',
      back: 'Артқа',
      changeDate: 'Күнді өзгерту',
      confirmEvent: 'Таңдалған іс-шара',
      noPastDates: 'Өткен күндерді брондау мүмкін емес',
      notice: 'Өтінім жіберу брондаудың автоматты расталуы болып табылмайды. Менеджер мәліметтерді нақтылау үшін сізбен хабарласады.',
      calendarMonths: [
        'Қаңтар', 'Ақпан', 'Наурыз', 'Сәуір', 'Мамыр', 'Маусым',
        'Шілде', 'Тамыз', 'Қыркүйек', 'Қазан', 'Қараша', 'Желтоқсан'
      ],
      calendarDaysShort: ['Дс', 'Сс', 'Ср', 'Бс', 'Жм', 'Сн', 'Жс'],
      items: [
        {
          id: 'hall',
          title: 'Банкет залы',
          capacity: '100 адам',
          description: 'Толық банкеттік қызмет көрсетуі бар үлкен салтанаттарға арналған кең зал',
        },
        {
          id: 'yurt',
          title: 'Киіз үй',
          capacity: '60 адам',
          description: 'Шынайы ұлттық мерекелерге арналған нағыз қазақи киіз үй',
        },
        {
          id: 'family',
          title: 'Отбасылық іс-шаралар',
          capacity: '',
          description: 'Кез келген көлемдегі отбасылық мерекелер үшін жайлы орта',
        },
        {
          id: 'corporate',
          title: 'Корпоративтер',
          capacity: '',
          description: 'Корпоративтік іс-шаралар мен тимбилдингтерді ұйымдастыру',
        },
        {
          id: 'wedding',
          title: 'Үйлену тойлары',
          capacity: '',
          description: 'Дәстүрлі нақыштағы ұмытылмас үйлену тойының банкеті',
        },
        {
          id: 'kudalik',
          title: 'Құдалық',
          capacity: '',
          description: 'Қазақи дәстүрдегі құдалық рәсімі',
        },
        {
          id: 'toi',
          title: 'Той',
          capacity: '',
          description: 'Ең жақсы дәстүрдегі үлкен қазақ тойы',
        },
      ],
      whatsappTemplate: (eventTitle: string, dateStr: string) =>
        `Сәлеметсіз бе! Іс-шара өткізуге өтінім қалдырғым келеді.\n\nІс-шара: ${eventTitle}\nҚалаулы күн: ${dateStr}\n\nКері байланыс күтемін!`,
    },
    // Working hours & status
    status: {
      openNow: 'Қазір ашық',
      closed: 'Жабық',
      hoursText: 'Күн сайын 10:00 – 00:00',
      timezoneInfo: 'UTC+5 (Талдықорған)',
    },
    // Reviews
    reviews: {
      tag: 'Пікірлер',
      titlePrefix: 'Қонақтарымыздың',
      titleHighlight: 'лебіздері',
      allReviewsBtn: '2ГИС-тегі барлық пікірлер',
      leaveReviewBtn: 'Пікір қалдыру',
      verifiedSource: '2ГИС ресми парақшасы',
    },
    // Contacts
    contacts: {
      tag: 'Байланыс',
      titlePrefix: 'Бізді қалай',
      titleHighlight: 'табуға болады',
      addressTitle: 'Мекенжай',
      addressValue: 'Балпық би 61, Талдықорған',
      phoneTitle: 'Телефон',
      hoursTitle: 'Жұмыс уақыты',
      hoursValue: 'Күн сайын 10:00 – 00:00',
      openIn2gis: '2GIS арқылы ашу',
    },
    // Mobile actions
    mobileActions: {
      call: 'Қоңырау',
      whatsapp: 'WhatsApp',
      route: 'Бағыт',
    },
    // Cart
    cart: {
      title: 'Сіздің тапсырысыңыз',
      empty: 'Себет әзірге бос',
      namePlaceholder: 'Аты-жөніңіз',
      phonePlaceholder: 'Телефон',
      addressPlaceholder: 'Жеткізу мекенжайы',
      total: 'Барлығы:',
      orderWhatsApp: 'WhatsApp арқылы тапсырыс беру',
      notice: 'Түймені басқанда оператормен WhatsApp чатына өтесіз',
      alertFillAll: 'Барлық өрістерді толтырыңыз',
      newOrderTitle: '*SIRNE.KZ сайтынан жаңа тапсырыс*',
      clientLabel: 'Клиент',
      phoneLabel: 'Тел',
      addressLabel: 'Мекенжай',
    },
    // Footer
    footer: {
      description: 'Талдықорғандағы Halal этно-мейрамханасы. Заманауи үлгідегі қазақ дәстүрінің шынайы дәмі.',
      navTitle: 'Навигация',
      contactsTitle: 'Байланыс',
      copyright: '© 2026 SIRNE.KZ — Halal этно-мейрамханасы. Барлық құқықтар қорғалған.',
      location: 'Талдықорған, Қазақстан',
    },
  },
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations.ru;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('ru');

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('sirne_lang') as Language;
      if (savedLang === 'ru' || savedLang === 'kz') {
        setLangState(savedLang);
      }
    } catch {
      // ignore
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('sirne_lang', newLang);
      document.documentElement.lang = newLang;
    } catch {
      // ignore
    }
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
