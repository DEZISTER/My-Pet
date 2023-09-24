# To-Do-List
__ОПИС ПРОЕКТУ__

Реалізовано веб-застосунок To-Do List, який надає змогу користувачам шукати необхідні товари для своїх домашніх улюбленців. 
Для кращого пошуку надається змога пройти реєстрацію за допомогою використання JWT-token-а, після чого можна створювати, редагувати та видаляти шаблон свого домашнього улюбленця вказавши всі необхідні параметри (вага, вік, порода, вид). Після цього рекомендація основних та супутніх товарів відбувається набагато ефективніше за допомогою створеного та впровадженого в проект алгоритму рекомендування товарів.

<hr>

__ІНСТРУКЦІЯ З РОЗГОРТАННЯ__

1.	Завантажити проект із репозиторія та розархівувати його.
2.	Відкрити розархівований проект в текстовому редакторі (наприклад VS Code).
3.	В терміналі кореня директорії прописати __npm -i__ (необхідний встановлений node.js що містить npm).
4.	Зачекати встановлення бібліотек і залежностей.
5.	Ввести в терміналі команду __json-server-auth db.json -r routes.json__ для запуску сервера з backend-частиною.
6.	Ввести в терміналі команду __npm run serve__ та відкрити проект в браузері по посиланню.

<hr>

__ПЕРЕЛІК ЗАСОБІВ РЕАЛІЗАЦІЇ__

* Vue-3.js + VUEX + VueRouter + json-server-auth (JWT-token) + Axios + HTML5 + BEM + SCSS

<hr>

__ОПИС ОСНОВНИХ ПІДХОДІВ ДО РЕАЛІЗАЦІЇ__

*	_Керування станом застосунку_. Відбувалось за допомогою VUEX (з метою кращої структуризації та подальшого масштабування проекту) а також props (з метою створення перевикористовуваних компонентів, а також локальних допоміжних змінних для кращої швидкодії). Окрім цього у відповідності до технічних вимог завдання, було реалізовано збереження даних у json-server-auth та localStorage, що надає змогу зберігати стан застосунку навіть при перезавантаженні ПК.

*	_Робота з компонентами_. Було проведено декомпозицію перевикористовуваних (або потенційно перевикористовуваних) компонентів що знаходяться по шляху “@/components/Elements”. Також було реалізовано власну UI-бібліотеку із елементів що використовуються в проекті (кнопки, контейнер, інтуп) по шляху “@/components/UI”. З метою економії ресурсозатрат та чистоти коду було проведено глобальну реєстацію компонентів по шляху “@/components/componentList.js”.

*	_Іконки_. Всі наявні іконки сформовані у відповідний спрайт, з наявними інтуїтивно зрозумілими id, та знаходяться по шляху “@/images/icons.svg”.

*	_Router and SPA_. Підключено Vue-Router, який надає змогу перемішуватись між сторінками у відповідності до всіх вимог SPA, застосовуючи <router-link> або router.push(…) для переходів, а також <router-view> для відображення сторінки.

*	_Опис стилів_. Всі стилі описувались за допомогою SCSS. Наявні файли нормалізації стилів та базових налаштувань. Підключення змінних і шрифту до кожного компоненту реалізовано у vue.config.js з метою економії та чистоти коду.

*	_Опис розмітки_. Вся розмітка виконувалась у відповідності до сучасних вимог семантики із застосуванням HTML5 тегів та атрибутів до них. Класи описані у відповідності до BEM методології.

*	_UI/UX_. З метою захоплення якомога більшої кількості цільової аудиторії, було обрано створювати дизайн у стриманих, класичних для даного виду застосунків тонах. Колористика усіх полів, кнопок а також їхні іконки та опис є інтуїтивно зрозумілими.

*	_Responsive-Adaptive дизайн_. Застосунок створений за принципом «mobile first» і відповіно підтримує любі як мобільші, так і інші розширення екрану. Наявні 3 точки «перелому» а саме 480рх, 768рх та 1200рх.

*	_RestAPI та Axios_. Всі запити відбувались за допомогою Axios. Backend-частиною в даному випадку виступав json-server-auth.

*	_Робота з Vue_. Реалізація застосунку виконувалась за допомогою нових підходів у роботі з фреймворком Vue а саме використання двостороннього зв’язування за допомогою v-model у бібліотеці input-а, використанні наявних директив таких як v-for, v-if, v-slot, @click та модифікаторів до них.

<hr>

__КОНТАКТИ__

1. Telegram: @Kales_Nick
3. eMail: dezzplaygo@gmail.com
