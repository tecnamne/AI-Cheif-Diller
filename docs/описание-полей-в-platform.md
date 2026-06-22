# Описание-полей-в-Trading Platform

> Comprehensive guide covering all Описание-полей-в-Trading Platform features and functionality in Trading Platform platform.

---

## Принцип работы и формирования алертов в Affiliate cheating report

# Принцип работы и формирования алертов в Affiliate cheating report

![affiliate_cheating_alert.png](/.attachments/affiliate_cheating_alert-8036dbde-d17f-4bec-8518-34e05a47d8b0.png)

Пример расчёта
По счету 1547389 было два пополнения: 58260625 и 56117939, на суммы 60.00$ и 56.00$, что в сумме даёт **HistoryMaximumDepositInUsd = 116$**.  
В настройках (`settings`) выбрано следующее:

`"UsePartnershipRewardDepoRatio": true,  "PartnershipRewardDepoRatio": 50,  "PayoutRatePerLotForexInUsd": 6,  "PayoutRatePerLotNonForexInUsd": 2.5,  "MinimalAffiliateFeeInUsd": 300,`

## Как рассчитывается суммарный пороговый оборот?

**Формула расчета:**

```
affiliateTurnoverFeeInUsd = affiliateState.TotalTurnoverForexInLots * settings.PayoutRatePerLotForexInUsd 
                          + affiliateState.TotalTurnoverNonForexInLots * settings.PayoutRatePerLotNonForexInUsd
```

**Расшифровка:**  
Суммарный пороговый оборот = (суммарный оборот в лотах по форексным инструментам × 6) + (суммарный оборот в лотах по НЕфорексным инструментам × 2.5)

**Пример расчета:**  
```
affiliateTurnoverFeeInUsd = 583.26 * 6 + 787.554 * 2.5 = 5468.445
```

Где:
- 583.26 - это суммарный оборот по Forex инструментам в лотах
- 6 - ставка выплаты за лот Forex (PayoutRatePerLotForexInUsd)
- 787.554 - суммарный оборот по Non-Forex инструментам в лотах  
- 2.5 - ставка выплаты за лот Non-Forex (PayoutRatePerLotNonForexInUsd)

## Как сравнивается пороговый оборот с минимальной выплатой?

Сравниваем `affiliateTurnoverFeeInUsd` с `MinimalAffiliateFeeInUsd` из настроек:  
5468.445 > 300 — условие выполняется, необходимо проверить соотношение максимального ввода средств к оборотным средствам трейдера.

## Как рассчитывается соотношение максимального депозита к обороту?

`affiliateToSaldoRatio = HistoryMaximumDepositInUsd * settings.PartnershipRewardDepoRatio / 100`

В примере:  
affiliateToSaldoRatio = 116 * 50 / 100 = 58$

## Как определяется срабатывание алерта?

Проверяется условие:  
если `affiliateToSaldoRatio != 0` и `affiliateTurnoverFeeInUsd > affiliateToSaldoRatio`, то выдается уведомление. В рассматриваемом примере:  
5468.445 > 58 -> триггер срабатывает (уведомление отображено на скриншоте).

## Какие особенности есть в подсчёте оборота?

Форексными считаются сделки, у символов которых  
`CalcMode == EnCalcMode.TRADE_MODE_FOREX` или `CalcMode == EnCalcMode.TRADE_MODE_FOREX_NO_LEVERAGE`.  
Все остальные считаются нефорексными.

Краткое пояснение на английском:
--------------------------------

*   Minimum affiliate fee: $300. Your turnover was $5468.45 and exceeds this threshold.
    
*   Payout rate per lot for Forex instruments: $6 (applied to your Forex turnover of 583.26 lots).
    
*   Payout rate per lot for non-Forex instruments: $2.5 (applied to your non-Forex turnover of 787.554 lots).
    
*   Partnership reward vs deposit ratio: 50% (calculated as 50% of your maximum deposit of $116, which equals $58).
    
*   Because your total turnover of $5468.45 exceeds both the minimal affiliate fee ($300) and the deposit-based ratio ($58), the trigger generates the notification.
    

##Важные замечания

- Триггер требует корректных настроек в соответствии с партнёрской программой брокера, иначе возможны ложные срабатывания.
- Агрегация данных происходит путём анализа истории сделок каждого счёта, как описано в документации:  
[https://docs.example.com/risk-management/antifraud-system/affiliate-cheating/](https://docs.example.com/risk-management/antifraud-system/affiliate-cheating/)
**Теги:** HistoryMaximumDepositInUsd, Партнёрская программа, Affiliate cheating report, PayoutRate, MinimalAffiliateFee, Пороговый оборот, Формула расчёта

---

## Untitled

Карточка символа: торговые и котировочные сессии
------------------------------------------------

**Вопрос:** Какие сессии есть у символов в MetaTrader?  
**Ответ:** У МТ есть торговая и котировочная сессии. Котировочная сессия обычно шире или равна торговой.

**Вопрос:** Откуда брокер получает данные о сессиях?  
**Ответ:** Данные о сессиях брокер получает из Metatrader.

**Вопрос:** Что такое Holidays и как они влияют на сессии?  
**Ответ:** Holidays — это праздники, которые превалируют над основным расписанием. В Holidays указывается, по каким датам, с какого до какого времени и для каких групп символов они действуют.

**Вопрос:** Где задаются Holidays?  
**Ответ:** В Брокерпилоте нет механизма и прав для настройки праздников. Это осуществляется брокером за пределами Брокерпилота (в случае MT5 — через Metatrader 5 Administrator).

**Вопрос:** Существуют ли Holidays в MT4?  
**Ответ:** В MT4 праздников нет.

---

## Untitled

## Current State

1.  ***Balance*** приходит из торговой платформы.
2.  ***Credit*** приходит из торговой платформы.
3.  ***Equity*** представляет собой сумму
    `Balance + Credit + UnrealizedProfit`; Составляющие Balance и Credit
    приходят из торговой платформы.  
    `UnrealizedProfit` - это текущий профит по всем открытым позициям
    счета.
4.  ***Bonus -** с*умма всех учтенных бонусов типа
    BonusTypes.TradeBonus.  Раньше учитывался только в Амаркетс и только
    в мт4, теперь учитывается для всех брокеров.
5.  ***Actual Leverage -** в*ычисляется по формуле
    `ActualLeverage => EquityInUsd > 0 ? (NetVolumeInUsd / EquityInUsd).Normalize(2) : 0m`;  
    где` EquityInUsd => BalanceInUsd + CreditInUsd + UnrealizedProfitInUsd`,
    подробное описание выше.  
    `NetVolumeInUsd` - это суммарный нетто-объем на счете в USD.
6.  ***Net Volume, Lots*** `NetVolumeInLots`  - cуммарный нетто-объем на
    счете, объем в лотах по всем позициям.
7.  ***Net Volume, USD*** `NetVolumeInUsd` - суммарный нетто-объем на
    счете, объем в лотах по всем позициям выраженный в долларах.
8.  ***Margin -*** маржа для всех открытых позиций по счету.
9.  ***Free Margin*** приходит из торговой платформы.
10. ***Drawdown -*** просадка, считается как
    `UnrealizedProfit/(Balance + Credit)`.   
    Граничные условия: Если UnrealizedProfit >= 0 или (Balance + Credit)
    \<= 0, то равно 0.
11. ***Total Realized PnL*** `RealizedProfit` - аналогично
    TotalRealizedProfit, сумма всех закрытых профитов за всю историю
    торговли счета, разбитых по TradeReason, и сумма коррекций по счету
    за все время торговли счета TotalProfitCorrection.
12. ***Total Swaps*** `TotalSwaps` - сумма начисленных свопов по всем
    позициям счета, за всю историю его торговли, учитывая свопы по
    открытым позициям счета.
13. ***Total Swaps, USD*** `TotalSwapsInUsd` - конвертированное в
    доллары поле TotalSwaps.

##  Balance

1.  ***Equity ***  
    `Equity = Balance + Credit + UnrealizedProfit`  
    Составляющие Balance и Credit приходят из торговой платформы.  
    `UnrealizedProfit` - это текущий профит по всем открытым позициям
    счета.
2.  ***Previous Equity*** `PreviousEquity` - эквити на момент последнего
    ролловера.
3.  ***Change of Unrealized PnL***  
    `ChangeOfUnrealizedInUsd = SessionProfitInUsd - SessionRealizedProfitInUsd - SessionProfitCorrectionInUsd`  
    Когда-нибудь должны переделать и считать иначе, через формулу
    *ChangeOfUnrealized => UnrealizedProfit - StartSessionProfit;* и в
    валюте счета.  
    `SessionProfitInUsd `- сессионный профит по счету за текущую
    торговую сессию. Складывается из
    `ABookSessionProfitInUsd + BBookSessionProfitInUsd`  
    `ABookSessionProfitInUsd` - сумма профита (ABook составляющая,
    вычисляется через процент покрытия профита позиции
    SessionProfitInUsd) по всем торговым операциям счета.  
    `BBookSessionProfitInUsd` - это сумма профита (BBook составляющая,
    вычисляется через процент покрытия профита позиции
    SessionProfitInUsd) по всем торговым операциям счета.  
    Кроме того, если счет не ABook, в нем учитываются коррекции профита
    (то есть добавлена составляющая `SessionProfitCorrectionInUsd`).  
    `SessionProfitCorrectionInUsd` - это сумма профита всех балансовых
    операций SessionBalanceDeal по счету за текущую торговую сессию с
    признаком IsIncludedToSessionPnL.  
    `SessionRealizedProfitInUsd` - полный закрытый профит по счету за
    текущую торговую сессию. Складывается из
    `ABookSessionRealizedProfitInUsd + BBookSessionRealizedProfitInUsd`  
    `BBookRealizedProfitInUsd `- это сумма профита (BBook составляющая,
    вычисляется через процент покрытия профита закрытой позиции
    RealizedProfitInUsd) по всем реализованным/закрытым торговым
    операциям счета.  
    `ABookSessionRealizedProfitInUsd` - это сумма профита (ABook
    составляющая, вычисляется через процент покрытия профита закрытой
    позиции RealizedProfitInUsd) по всем реализованным/закрытым торговым
    операциям счета.
4.  ***Total PnL*** `TotalProfit` - полный профит по счету за всю его
    историю торговли, включая Realized и Unrealized
    (`TotalProfit => TotalRealizedProfit + UnrealizedProfit`).  
    `TotalRealizedProfit` - сумма всех закрытых профитов за всю историю
    торговли счета, разбитых по TradeReason, и сумма коррекций по счету
    за все время торговли счета TotalProfitCorrection.  
    `UnrealizedProfit` - профит открытых позиций по счету.
5.  ***Total Swaps*** `TotalSwaps` - сумма начисленных свопов по всем
    позициям счета, за всю историю его торговли, учитывая свопы по
    открытым позициям счета.

##  Trade Session State

1.  ***Session PnL*** `SessionProfit` - cессионный профит за текущую
    торговую сессию SessionProfit => ABookSessionProfit +
    BBookSessionProfit; Описание составляющих дано выше.
2.  ***Session Realized PnL*** `SessionRealizedProfit` - закрытый профит
    по счету за текущую сессию.  
    `SessionRealizedProfit => ABookSessionRealizedProfit + BBookSessionRealizedProfit`.
    Описание составляющих дано выше.
3.  ***Session Realized PnL, USD*** SessionRealizedProfitInUsd
    конвертированное в доллары поле SessionRealizedProfit.
4.  ***Change of Unrealized PnL, USD*** `ChangeOfUnrealizedInUsd`
    определено выше в пункте 3.
5.  ***Previous Equity, USD***` PreviousEquityInUsd` конвертированное в
    доллары поле PreviousEquity.
6.  ***Session Net Deposit, USD*** SessionBalanceProfitInUsd сумма
    балансовых операций по счету за текущую сессию, сконвертированная в
    доллары.
7.  ***Session Total Volume, Lots*** SessionTotalVolumeInLots  -
    суммарный объем торгов по счету за сессию. Складывается из открытых
    и закрытых объемов.   
    `SessionTotalVolumeInLots => SessionOpenedVolumeInLots + SessionClosedVolumeInLots`
8.  ***Session Total Volume, USD*** `SessionTotalVolumeInUsd` суммарный
    объем торгов по счету за сессию, выраженный в долларах.
9.  ***Session Max Leverage*** `SessionMaxTradeLeverage` максимальное
    торговое плечо за текущую торговую сессию на счете.
10. *** Session Max Drawdown, %*** SessionMaxDrawdown максимальная
    просадка по счету за текущую торговую сессию.
11. ***Session Agent Commissions*** SessionCommissionAgent сумма
    агентских комиссий, начисленных на счет за текущую сессию.
12. ***Session Agent Commissions, USD*** `SessionCommissionAgentInUsd`
    сумма агентских комиссий, начисленных на счет за текущую сессию,
    выраженная в долларах.

---

## Что делать, если дивиденды не начислились?

Что задаётся для расчёта дивидендов?
------------------------------------

*   Размер дивидендов на одну акцию символа в валюте символа:
    *   `DividendsForLong` — для длинной позиции
    *   `DividendsForShort` — для короткой позиции
        
*   Эти значения переводятся в валюту счёта:
    *   `oneShareInAccountCurrencyLong`
    *   `oneShareInAccountCurrencyShort`
        

Как определяется направление позиции?
-------------------------------------

*   Направление определяется значением `dir`:
    *   `BUY` (лонг) — `dir = 1`
    *   `SELL` (шорт) — `dir = -1`
        
*   Формируется значение `oneShareInAccountCurrency`:
    *   Для `BUY`: `oneShareInAccountCurrency = oneShareInAccountCurrencyLong`
    *   Для `SELL`: `oneShareInAccountCurrency = oneShareInAccountCurrencyShort * dir`
        

Формула расчёта размера начисленных дивидендов в валюте счёта
-------------------------------------------------------------

`DividendsInAccountCurrency = order.Volume * oneShareInAccountCurrency * symbol.contractSize * dir`

Логика расчёта и пример кода
----------------------------

В мастере в начислениях задаётся:  
_Дивиденды на 1 акцию символа_ в валюте (значения `DividendsForLong`, `DividendsForShort`).
Цена одной акции в валюте счёта считается так:

```csharp
var oneShareInAccountCurrencyLong = symbolDividends.DividendsForLong * accountDividends.RateBuy;

var oneShareInAccountCurrencyShort = symbolDividends.DividendsForShort * accountDividends.RateSell;
```

Определяется направление позиции:
```csharp
var dir = pos.Action == EnPositionAction.POSITION_BUY ? 1 : -1;
```

Формируется дивидендный ордер:

```csharp
var orderRecord = ordersService.ConvertMtPositionToOrderRecord(pos, TicketTypes.**OpenedPosition**);  
var order = orderRecord.GetDividendsOrder(user.Name,  
  pos.Action == EnPositionAction.**POSITION_BUY**  
    ? oneShareInAccountCurrencyLong  
    : oneShareInAccountCurrencyShort * dir,  
  pos.Action == EnPositionAction.**POSITION_BUY**  
    ? symbolDividends.DividendsForLong  
    : symbolDividends.DividendsForShort * dir,  
  symbolConfig.ContractSize);
```
Корректировка стоимости одной акции:
------------------------------------

```csharp
costOneShare = pos.Action == EnPositionAction.**POSITION_BUY**  
    ? oneShareInAccountCurrencyLong  
    : oneShareInAccountCurrencyShort * dir
```

Метод вычисления размера дивидендов в валюте счёта:
---------------------------------------------------
```csharp
private static decimal DividendsInCurrency(this OrderRecord order, decimal costOneShare, decimal contractSize) 
  
return (order.Volume * costOneShare * contractSize * (order.Cmd == TradeCommand.Buy ? 1 : -1)).Normalize(2); 
```

Начисление дивидендов:
----------------------
```csharp
managerApi5.DealerBalance(acc.Login, ord.DividendsInAccountCurrency, GetDividendsAction(), ord.Comment ?? "" );
```

Примеры расчёта знака дивиденда:
--------------------------------

*   Лонг позиция, `DividendsForLong = 10`
```csharp  
costOneShare = 10 DividendsInAccountCurrency = 1 * 10 * 1 * 1 = 10
```
    
*   Лонг позиция, `DividendsForLong = -10`
```csharp    
costOneShare = -10 DividendsInAccountCurrency = 1 * -10 * 1 * 1 = -10
```
    
*   Шорт позиция, `DividendsForShort = 10`
```csharp    
oneShareInAccountCurrencyShort = 10 costOneShare = 10 * -1 = -10 DividendsInAccountCurrency = 1 * -10 * 1 * -1 = 10
```
    
*   Шорт позиция, `DividendsForShort = -10`
    
```csharp
oneShareInAccountCurrencyShort = -10 costOneShare = -10 * -1 = 10 DividendsInAccountCurrency = 1 * 10 * 1 * -1 = -10
```
    

# Что делать, если дивиденды не начислились?
------------------------------------------

*   Возможна проблема с дисконнектом на стороне клиента.
    
*   Следует эскалировать запрос клиента для сбора списка ордеров, по которым не были начислены дивиденды, и передать клиенту для ручного назначения.
    

# Если платформа не видит символы для настройки дивидендов:
---------------------------------------------------------

*   Необходимо заполнить справочник символов, по которым могут начисляться дивиденды, на странице [/dealing/dealing-settings](),

---

