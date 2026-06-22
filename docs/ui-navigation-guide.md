# Trading Platform UI Navigation Guide

> Автоматически сгенерированная документация по навигации и UI элементам платформы Trading Platform.
> Последнее обновление: 2025-11-05T21:14:20.090Z

---

## 🎨 Переключение темы (Light/Dark Mode)

### Как переключиться на тёмную тему?
**Расположение:** Нижняя панель интерфейса, левый угол  
**Элемент управления:** Иконка солнца/луны (theme toggle)  
**Действие:** Кликните на иконку для переключения между светлой и тёмной темой  
**Описание:** Платформа поддерживает два режима отображения - светлый (Light) и тёмный (Dark). Переключатель находится в fouter-баре и позволяет мгновенно изменить цветовую схему интерфейса.

### Где находится переключатель темы?
В левом нижнем углу экрана, рядом с настройками профиля и уведомлениями.

---

## ⚙️ Настройки платформы

### Где находятся настройки?
**Расположение:** Нижняя панель интерфейса, левый угол → иконка шестеренки  
**Путь:** Fouter → Settings  
**Содержит:**
- Настройки профиля пользователя
- Параметры отображения
- Настройки уведомлений
- Выход из системы (Logout)

### Как открыть настройки?
1. Найдите иконку шестерёнки в левом нижнем углу экрана
2. Кликните на иконку для открытия меню пользователя

---

## � Как найти разделы платформы

### Где найти Current Session?
**Расположение:** Левое боковое меню (sidebar)  
**Иконка:** Current Session icon  
**Путь:** `/session`  
**Как открыть:** Кликните на иконку "Current Session" в левом меню навигации

### Где найти Dashboard?
**Расположение:** Левое боковое меню (sidebar)  
**Иконка:** Dashboards icon  
**Путь:** `/dashboard`  
**Как открыть:** Кликните на иконку "Dashboards" в левом меню навигации

### Где найти Winners & Losers?
**Расположение:** Левое боковое меню (sidebar)  
**Путь:** `/session/winners-losers`  
**Как открыть:** Кликните на раздел "Winners & Losers" в главном меню

### Где найти Dealing Desk?
**Расположение:** Левое боковое меню (sidebar)  
**Путь:** `/dealing`  
**Как открыть:** Найдите раздел "Dealing" или "Dealing Desk" в левом меню

### Где найти Risk Management?
**Расположение:** Левое боковое меню (sidebar)  
**Путь:** `/risk-management`  
**Как открыть:** Кликните на раздел "Risk Management" в главном меню

### Где найти Bonuses?
**Расположение:** Левое боковое меню (sidebar)  
**Иконка:** Bonuses icon  
**Путь:** `/bonuses/statistics`  
**Как открыть:** Найдите и кликните на раздел "Bonuses" в левом меню

### Где найти Directory?
**Расположение:** Левое боковое меню (sidebar)  
**Иконка:** Directory icon  
**Путь:** `/directory`  
**Как открыть:** Кликните на раздел "Directory" в главном меню

### Где найти Symbols?
**Расположение:** Левое боковое меню (sidebar)  
**Путь:** `/symbols`  
**Как открыть:** Найдите раздел "Symbols" в главном меню

---

## �📋 Основная навигация

Главное меню платформы находится в левой боковой панели. Вот структура всех доступных разделов:

### Dashboards

**Путь:** `/dashboard`  
**Иконка:** `navigation-type--dashboards`  

---

### Current Session

**Путь:** `/session`  
**Иконка:** `navigation-type--current-session`  

---

### Winners & Losers

**Путь:** `/session/winners-losers`  
**Иконка:** `navigation-type--dealing-desk`  

---

### A/B Books Net

**Путь:** `/dealing/net-comparison`  
**Иконка:** `navigation-type--risk-management`  

---

### Dynamic Leverage

**Путь:** `/risk-management/automatic-control/TriggerDynamicLeverage/report`  
**Иконка:** `navigation-type--reporting-system`  

---

### Bonuses

**Путь:** `/bonuses/statistics`  
**Иконка:** `navigation-type--bonuses`  

---

### History

**Путь:** `/bonuses/history`  
**Иконка:** `navigation-type--challenges`  

---

### Dealing Operations

**Путь:** `/operations/jobs`  
**Иконка:** `navigation-type--dealing-operations`  

---

### Settings

**Путь:** `/operations/settings`  
**Иконка:** `navigation-type--hedge-accounts`  

---

### Hedging Accounts

**Путь:** `/hedge-accounts/hedging-accounts`  
**Иконка:** `navigation-type--quotes-monitoring`  

---

### Directory

**Путь:** `/directory`  
**Иконка:** `navigation-type--directory`  

---

### Symbols

**Путь:** `/symbols`  
**Иконка:** `admin`  

---

### Site Settings

**Путь:** `/admin/settings`  
**Иконка:** `navigation-type--folder-shadow`  

---

## 🎨 UI Компоненты

Основные компоненты интерфейса:

### page-settings
**Тип:** UI Component - Компонент настроек страницы  
**Расположение:** `components/page-settings`  
**Назначение:** Управление настройками и параметрами отображения страниц платформы

### Theme Switcher (Переключатель темы)
**Расположение:** Header (верхняя панель), правый верхний угол  
**Функция:** Переключение между светлой (light) и тёмной (dark) темой интерфейса  
**Иконка:** Солнце (для светлой темы) / Луна (для тёмной темы)

### User Menu (Меню пользователя)
**Расположение:** Header, правый верхний угол  
**Содержит:**
- Профиль пользователя
- Настройки (Settings)
- Уведомления
- Выход из системы (Logout)

### Main Navigation Menu (Главное меню навигации)
**Расположение:** Левая боковая панель (sidebar)  
**Функция:** Основная навигация по разделам платформы  
**Содержит:** Все главные разделы - Dashboard, Current Session, Dealing Desk, Risk Management и т.д.

---

## 🔧 Основные действия в интерфейсе

### Переключение темы (Light/Dark Mode)
**Где найти:** Верхний правый угол интерфейса  
**Элемент:** Иконка солнца/луны  
**Действие:** Клик по иконке переключает между светлой и темной темой  

### Настройки пользователя
**Где найти:** Верхний правый угол → иконка профиля  
**Содержит:** Настройки профиля, выход из системы  

### Фильтры и поиск
**Где найти:** Верхняя панель большинства страниц  
**Функции:** Фильтрация данных, поиск по таблицам, экспорт данных  

---

## 💡 Советы по навигации

1. **Быстрая навигация:** Используйте главное меню слева для перехода между основными разделами
2. **Breadcrumbs:** В верхней части страницы отображается путь к текущему разделу
3. **Избранное:** Вы можете добавить часто используемые разделы в избранное
4. **Поиск:** Глобальный поиск доступен в верхней панели

## 📍 Все доступные маршруты

Полный список путей в приложении:

- `login` - () => import('./components/user/login/login.module').then((m) => m.LoginModule)
- `register` - () => import('./components/user/register/register.module').then((m) => m.RegisterModule)
- `reset` - () => import('./components/user/reset/reset.module').then((m) => m.ResetModule)
- `reset/:resetToken` - () =>
                    import('./components/user/reset-new-password/reset-new-password.module').then(
                        (m) => m.ResetNewPasswordModule
                    )
- `lock-screen` - () =>
                    import('./components/user/lock-screen/lock-screen.module').then((m) => m.LockScreenModule)
- `playground` - () => import('./containers/playground/playground.module').then((m) => m.PlaygroundModule)
- `dealing` - () => import('./containers/a-book/a-book.module').then((m) => m.ABookModule)
- `hedge-accounts` - () =>
                    import('./containers/hedge-accounts/hedge-accounts.module').then((m) => m.HedgeAccountsModule)
- `b-book` - () => import('./containers/b-book/b-book.module').then((m) => m.BBookModule)
- `accounts` - () => import('./containers/accounts/accounts.module').then((m) => m.AccountsModule)
- `directory` - () => import('./containers/directory/directory.module').then((m) => m.DirectoryModule)
- `admin` - () => import('./containers/admin/admin.module').then((m) => m.AdminModule)
- `bonuses` - () => import('./containers/bonuses/bonuses.module').then((m) => m.BonusesPageModule)
- `challenges` - () =>
                    import('./containers/challenges/challenges.module').then((m) => m.ChallengesPageModule)
- `charts` - () => import('./containers/charts/charts.module').then((m) => m.ChartsModule)
- `accounts` - () =>
                            import('./containers/accounts/accounts-trade-state/accounts-trade-state-page.module').then(
                                (m) => m.AccountsTradeStatePageModule
                            )
- `accounts` - () =>
                            import(
                                './containers/accounts/accounts-related-profiles/accounts-related-profiles-page.module'
                            ).then((m) => m.AccountsRelatedProfilesPageModule)
- `accounts` - () =>
                            import('./containers/accounts/accounts-suspicious/accounts-suspicious-page.module').then(
                                (m) => m.AccountsSuspiciousPageModule
                            )
- `accounts` - () =>
                            import('./containers/dealing/radar/radar.module').then((m) => m.RadarPageModule)
- `symbols-control` - () =>
                            import('./containers/symbols/symbols-control/symbols-control.module').then(
                                (m) => m.SymbolsControlModule
                            )
- `control-center` - () =>
                    import('./containers/control-center/control-center.module').then((m) => m.ControlCenterModule)
- `dashboard` - () =>
                    import('./containers/dashboard/dashboard.module').then((m) => m.DashboardPageModule)
- `home` - () => import('./containers/home/home.module').then((m) => m.HomePageModule)
- `search` - () => import('./containers/search/search.module').then((m) => m.SearchModule)
- `session` - () => import('./containers/session/session.module').then((m) => m.SessionModule)
- `dealing` - () => import('./containers/dealing/dealing.module').then((m) => m.DealingModule)
- `operations` - () => import('./containers/operations/operations.module').then((m) => m.OperationsModule)
- `open-positions` - () => import('./containers/orders/orders.module').then((m) => m.OrdersModule)
- `symbols` - () =>
                    import('@app/containers/symbols/specifications.module').then((m) => m.SpecificationsModule)
- `quotes-monitoring` - () =>
                    import('./containers/quotes-monitoring/quotes-monitoring.module').then(
                        (m) => m.QuotesMonitoringModule
                    )
- `reporting-system` - () =>
                    import('./containers/reporting-system/reporting-system.module').then(
                        (m) => m.ReportingSystemModule
                    )
- `support` - () => import('./containers/support/support.module').then((m) => m.SupportPageModule)
- `user` - () => import('./components/user/profile/profile.module').then((m) => m.ProfileModule)
- `debug` - () => import('./containers/debug/debug.module').then((m) => m.DebugPageModule)
- `reports` - () => import('./containers/reports/reports.module').then((m) => m.ReportsPageModule)
- `not-available` - () =>
                    import('./views/not-available/not-available.module').then((m) => m.NotAvailableModule)

---

*Этот файл создан автоматически скриптом parse-ui-navigation.js*
