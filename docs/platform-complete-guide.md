# Trading Platform Platform - Complete Documentation

> This document contains comprehensive information about all Trading Platform features, modules, and functionality.

**Generated**: 2025-11-05T20:49:30.589Z
**Total Files Processed**: 363
**Categories**: 20

---

## Table of Contents

- Bonuses & Challenges
- Current Session
- Dashboards
- Dealing Desk
- Dealing Operations
- Directory & Data
- General Information
- general
- Reporting System
- Risk Management
- Metabase,-Репортинг,-Базы-данных
- Группы-счетов-и-распределение-по-букам
- Интеграции,-доступы-и-сервера
- Общие-настройки-и-нюансы-работы-с-Trading Platform
- Описание-интерфейсов-и-функций
- Описание-ошибок
- Описание-полей-в-Trading Platform
- Регламенты
- Символы-и-их-параметры
- Формулы-и-расчеты

---

# Bonuses & Challenges

## Bonuses

# **Bonuses**

## General information

This section of Trading Platform is dedicated to the various types of bonuses that either trader or agent may receive from the broker.

**This section of **Trading Platform** supports both MT5 and MT4.**

**To make the bonus section of **Trading Platform** available for you please contact the Trading Platform support team.**

## Menu Navigation

![](i/bonuses.webp)

## Main page

In this subsection the user can see the total statistics of bonus acquisition or cancellation. On top of the screen you can select the server name, specific accounts and set the dates for which you want to get the detailed information.

| **Parameter name** | **Description** |
| --- | --- |
| **Bonus** | Bonus type (e.g. welcome bonus) |
| **Login** | Account login number |
| **Server** | Server name |
| **Account group** | Account group |
| **Date created** | Date and time of bonus accrual |
| **Bonus Amount, USD** | Bonus Amount, USD |
| **Completion rate** | Percentage number that reflects the progress towards completion of the condition that allow withdrawal of the bonuses |
| **Credited Bonus, USD** | Credited Bonus Amount, USD |
| **Deposited Bonus, USD** | Deposited Bonus Amount, USD |
| **Cancel Date** | The date of bonus cancellation |
| **Cancel Reason** | The reason for bonus cancellation |

**When you click on the specific login number in this page special menu will appear where you can completely cancel the bonus for the account or cancel a specific bonus transaction of the account.**

# Events

In this subsection, you can find and process all the notifications that were created by the system. Notifications are generated based on the settings that were applied in the Settings subsection. At the top of the page you can select the specific trade server to search.

![](i/bonus-events.webp)

If you click on the notification the popup window will appear with detailed information and options to process. Or you can process the event by clicking on the buttons in the “Actions” column.

|  |  |
| --- | --- |
| **Server** | Name of the server |
| **Time** | Recency of the event |
| **Details** | Description of the event |
| **Actions** | In this column you can see the buttons to process the event |

# History

In the “History” subsection, brokers can track historical events. At the top of the page you can select the trade server, bonus events types and set the desired time period.

![](i/bonus-history.webp)

| **Export** | Press this button to export the received into .scv file |
| --- | --- |
| **With Automatic Action ON/OFF** | Enable or disable this switch to get the history with or without the automatic actions of the Trading Platform system respectively |
| **Status** | Type of the notification |
| **Server** | Name of the server |
| **Time** | Time and date of the event |
| **Recency** | Recency of the event |
| **Action** | Manual or automatic action |
| **Details** | Description of the event |

# **Welcome bonus settings**

A welcome bonus is a transaction that is accrued as a credit (MT4) or as a bonus (MT5) to the new trading accounts (no transactions at the time of accrual) at the time of deposit made or creation of a new account in the amount specified in the settings.

| **Parameter name** | **Description** |
| --- | --- |
| **Enabled ON/OFF** | This switch enables and disables bonus selected rule |
| **Rule Name** | Type the rule name in this field to be presented on the left panel |
| **Auto Accrual Bonus ON/OFF** | Turns on/off automatic bonus accrual. |
| **Auto Convert Bonus to Deposit ON/OFF** | Turns on/off automatic bonus withdrawal. |
| **Account groups** | Account groups that are included in the bonus system survey. |

## “Credit in” section

![](i/credit-in.webp)

There are four methods by which the bonus can be accrued.

1. **Fixed Amount in USD**

| **Parameter name** | **Description** |
| --- | --- |
| **Deposit Minimum, USD** | In this field specify the minimum amount that is required to deposit on the account to get bonus value specified in the “Bonus Value, USD” field. |
| **Bonus Value, USD** | Bonus amount in USD that will be credited to the account after the amount specified in the “Deposit Minimum, USD” is deposited. |

**All conditions of the “Withdrawal” and “Credit Out” sections are available for this method.**

2. **Deposit Percentage**

| **Parameter name** | **Description** |
| --- | --- |
| **Bonus Deposit, %** | Specify the value in percents from the initial deposit |
| **Bonus Value Minimum, USD** | Specify the minimum amount of bonus in USD that can be accrued. |
| **Bonus Value Maximum, USD** | Specify the maximum amount of bonus in USD that can be accrued. |

**All conditions of the “Withdrawal” and “Credit Out” sections are available for this method.**

3. **Deposit in Parts**

| **Parameter name** | **Description** |
| --- | --- |
| **Bonus Deposit, USD** | Total amount that is required to deposit to get the bonus value. This can consist of several balance operations. |
| **Bonus Value, USD** | The bonus amount that will be credited to the accounts after the total amount specified in the “Bonus Deposit, USD” field is deposited. |
| **Bonus Value Maximum, USD** | Maximum amount that is allowed to be credited to the account. |

**All conditions of the “Withdrawal” and “Credit Out” sections are available for this method.**

4. **New Account**

This type of bonus is accrued without any deposit.

| **Parameter name** | **Description** |
| --- | --- |
| **Bonus Value, USD** | Specify the bonus value in USD that will be received upon creating the new account. |

**“Withdrawal” section is completely turned off for this method because any withdrawals are prohibited. “Credit out” section is partially available.**
### Credit in Operation Type

![](i/credit-in-type.webp)

For MT5 servers three methods of credit-in are available.

| Name | Description |
| --- | --- |
| **Bonus** | Standard method of credit-in. The user will get a bonus as a credit. All conditions and restrictions applied according to the settings. This is the only method of credit-in that is available for the MT4 servers. |
| **Balance** | **If the operation type “Balance” is selected, the trader is able to withdraw money immediately after the bonus is credited.**  |
| **Correction** | >**If the operation type “Correction” is selected, the trader is able to withdraw money immediately after the bonus is credited.** |

For MT4 servers only standard method of credit-in is available - "Bonus".

## “Withdrawal” section

![](i/withdrawal.webp)

There are 3 methods to transfer credit (bonus) funds to a trader’s deposit:

1. **Standard:** in order to transfer credit (bonus) funds to a trader’s deposit, a trader must fulfil the condition: the volume in lots specified in the bonus settings should be traded. Each trade (transaction) should be longer than the minimum period of time specified in the settings. When the bonus conditions are met, an event is created to transfer the entire bonus amount from the credit (bonus) to the deposit. It is processed either manually or automatically depending on what option is chosen in the settings.

2. **Based on the Traded Volume:** the trader should trade specified amount of lots. When this condition is met an event is created to transfer the specified bonus amount from the credit (bonus) to the deposit. It is processed either manually or automatically depending on what option is chosen in the settings.

|  |  |
| --- | --- |
| **Bonus Amount for 1 Lot Traded, USD** | In case “Based on Traded Volume” value is selected you can set the bonus amount in USD received for 1 Lot traded. |
| **Minimum Live Time Transaction, sec** | Minimum time required for the account’s transaction to be live to get the bonus. |
| **Lots Limits, lots** | How many lots of the chosen symbol groups can be traded in order for automatic bonus withdrawal to be activated. |
| **Symbol Groups** | Symbol groups that are required for the amount of lots to be traded in order for the bonus withdrawal to be allowed. |
| **PLUS button** | Press the plus button to add one more condition to the requirements |

**At least one symbol group has to be selected for the bonus section to work properly.**

**Also the withdrawal of the bonus can be completely turned off.**

**3. Traded Calculated Lots**

The bonus will be awarded to the account after the required lot volume has been traded. The required lot volume is calculated according to the formula: **Bonus Amount divided by Lot Calculation Coefficient**. EXAMPLE: You receive a $300 bonus. To withdraw the received bonus, the required lot volume = 300 / 3 =100 Lot.

| **Minimum Live Time Transaction, sec** | **Minimum time required for the account’s transaction to be live to get the bonus.** |
| --- | --- |
| **Minimum Transactions** | The minimum number of transactions that have to be made in order to get a permission to withdraw the bonus. |
| **Lot Calculation Coefficient** | The parameter that determines the amount of lots to be traded in order to be able to withdraw the bonus (**Required Lot Volume =** **Bonus Amount divided by Lot Calculation Coefficient)**. |
| **Lots Divider** | By default this equals 1. But there could be exceptions, for example, each standard lot traded for stocks is equal to one lot divided by 1000 (lots divider), or for spot indices and spot energies, each standard lot traded is equal to one lot divided by 10 (lots divider). |
| **Symbols Groups** | Symbol groups that are required for the amount of lots to be traded in order for the bonus withdrawal to be allowed. |

## “Credit out” section

![](i/credit-out.webp)

*There are two methods of automatic bonus cancellation - Full and Partial.*

**Full:** a bonus will be completely removed if a trader withdraws any amount from the account or the equity of the account drops to the level of the accrued bonus. This is possible only if the conditions of the bonus are not met, i.e. the bonus remains a credit (bonus) and is not transferred to the account deposit.

**Partial:** at the time of withdrawal of any amount it is calculated what percentage of the initial bonus deposit this amount corresponds to. The amount of the accrued bonus will be reduced by the same percentage.

The following conditions can be turned on and off with the help of the corresponding switches.

|  |  |
| --- | --- |
| **Equity Multiplier** | By default the bonus is canceled when equity of the account drops to the level of the accrued bonus (i.e. equals 1). You can adjust this parameter here. If the account equity is less than the product of this multiplier and the accrued bonus, then the bonus will be canceled. If the multiplier equals zero, then the equity will be compared to zero, and the bonus will be canceled when the equity is less than or equal to zero. If you disable this multiplier, then the condition for canceling the account equity bonus will no longer be tracked. |
| **Bonus Expiration Period, Days** | After the specified number of days the bonus will be canceled. |
| **Bonus Expiration Period without Trading, Days** | After the specified number of days without trading the bonus will be canceled. |

## **CPA (Cost Per Acquisition) bonus settings**

![](i/cpa-bonus.webp)

This type of bonus is accrued to an agent’s account as a reward manually or automatically depending on the option in the settings. It occurs when a trading account linked with the agent has fulfilled the trading requirements for the bonus. Agents' accounts or groups of accounts participating in the bonus campaign are indicated in the settings.

The bonus works from the moment the agent is added to the group specified in the bonus settings. If Trading Platform due to various reasons fails to collect data on the time of the account group change, then the bonus starts working from the moment the agent group is specified in the bonus settings.

Trading Platform takes into account traded volume on the trader’s account if the transaction lifetime corresponds to the value specified in settings. When the account associated with the agent fulfills the conditions of trading the required volume of lots, an event for accruing a bonus on the agent's deposit is created. The amount of the bonus is determined by the country of the trading account and the amount of a one-time deposit replenishment of the trading account (available settings). The event is processed either manually or automatically (option in the settings). The agent can only receive one bonus from each trading account associated with the agent’s account.

|  |  |
| --- | --- |
| **Rule Name** | Type the rule name in this field to be presented on the left panel |
| **Auto Accrual Bonus ON/OFF** | Turns on/off automatic bonus accrual. |
| **Minimum Live Time Transaction, sec** | Minimum time required for the account’s transaction to be live to get the bonus. |
| **Agent Account groups** | Account groups that are included in the bonus system survey. |
| **Agent Account** | Accounts that are included in the bonus system survey. |
| **Excluded Agent Accounts** | Accounts that are excluded in the bonus system survey. |
| **Enabled ON/OFF** | This switch shows whether the tier is included in or excluded from the selected rule. |
| **Tier** | To what tier of the countries the account belongs to. |
| **Initial Deposit, USD** | Initial Deposit Amount in USD |
| **Bonus Amount, USD** | Bonus Amount in USD |
| **Minimum Volume, Lots** | Minimum Volume required to be traded for bonus acquisition, specified in Lots |
| **Countries** | List of countries in the specified tier |
| **Plus Button** | Adds new tier to the set of rules |

## Permissions

| **MT5 Platform** | **MT4 Platform** |
| --- | --- |
| ![](i/MT5.webp) | ![](i/MT4.webp)<br /> |

---

# Current Session

## Agent Commissions

# **Agent Commissions**

## General Information

Agent commissions refer to the fees or payouts that brokers provide to their partners, affiliates, or introducing agents based on the trading activity of referred clients. These commissions are typically calculated as a percentage of the trading volume, spread, or generated revenue.

For example, when an introducing broker (IB) or affiliate brings new traders to a brokerage, they earn a commission on the trades executed by those clients. The commission structure may vary, depending on the agreement between the broker and the agent.

On this page, dealers can track and analyze these agent commissions, ensuring transparency in payouts and evaluating how much is being charged based on the actual trading volumes during a specific trading session.

## Menu Navigation

![](i/agent-commissions.webp)

## Parameters

| **Parameter Name** | **Description** |
| --- | --- |
| **Agent** | Agent trading account. |
| **Server** | Trading server name. |
| **Name** | Agent's name. |
| **Group** | Account group name. |
| **Currency** | Currency of trade records. |
| **Logins** | Number of referred trading accounts. |
| **Trades** | Number of trades executed by referred trading accounts. |
| **Trade Volume,Lots** | Total trade volume in lots. |
| **Trade Volume, USD** | Total trade volume in USD. |
| **Commissions** | Total commissions earned by the agent. |
| **Commissions, account currency** | Total commissions earned by the agent in respective acount currency. |

---

## Balances Summary

# **Balances Summary**

## General Information

All types of balance operations that are available from the drop-down list can be used to build a comprehensive report in real-time. Multiple selections for types of balance operations are provided. The user can use filters situated at the top of the screen to see balance operations from different perspectives.  

## Menu Navigation

![](i/balance-operations.webp)

The following types of balance operations are available for user search:  

### **Balance Operation Types**  

| **Parameter Name** | **Description** |
| --- | --- |
| **Additional charge** | Additional inputs/outputs. |
| **Agent commission** | Commissions paid to agents. |
| **Balance operation** | Balance operations. |
| **Bonus** | Bonus accrual. |
| **Commission** | Commissions. |
| **Correctional deal** | Correctional operations. |
| **Credit** | Credit transactions. |
| **Daily agent commission** | Daily agent commission. |
| **Daily commission** | Daily commission. |
| **Dividend** | Dividend accrual. |
| **Franked dividend** | Franked dividend accrual. |
| **Interest rate** | Accrual of annual interest. |
| **Monthly agent commission** | Monthly agent commissions. |
| **Monthly commission** | Monthly commissions. |
| **Stop out compensation** | Compensation paid to accounts that reached a negative balance and suffered stop-outs. |
| **Taxes** | Taxation. |

### **Balance Summary Columns**  

| **Column Name** | **Description** |
| --- | --- |
| **Deposit Orders** | The number of incoming operations made within the current trade session. |
| **Withdrawal Orders** | The number of outgoing transactions made within the current trade session. |
| **Deposits, USD** | The sum of deposits made by traders within the current session. |
| **Withdrawals, USD** | The total of withdrawals made by traders within the current session. |
| **Net Deposit, USD** | The balance of the incoming and outgoing transactions that were made within the current trade session. |

---

## Current Session

# **Current Session**  

## **General Information**  

The **Current Session** section in **Trading Platform** provides **real-time insights** into the trading session, aggregating data from multiple trading servers and platforms.  

📊 **Key Features:**  
✅ Real-time session data & reports  
✅ Essential PnL metrics with charts & filters  
✅ Helps detect market & trader behavior changes  

📝 *Note: If the "Dealer Side" switch is ON, agent commissions are excluded from the PnL calculation.*  

![](i/current_session/current-session.webp)  

---

## **Session PnL 📈**  

![](i/current_session/pnl_chart.webp)  

This section displays **real-time PnL tracking** based on the position of the **Dealer Side** switch. Hovering over the chart shows detailed values.  

### **Key Metrics:**  

| **Metric** | **Description** |
| --- | --- |
| **Session Total PnL** | Sum of **fixed & unfixed profit** from the start of the session. *(A-Book PnL + B-Book PnL)* |
| **A-Book Session Total PnL** | Total A-Book profit for the session, based on filters. |
| **B-Book Session Total PnL** | Total B-Book profit for the session, based on filters. |
| **Session Agents Commissions** | Sum of agent commissions paid **from trades within the session**. |
| **Session SO Compensations** | Stop-out compensations for the session, based on filters. |
| **Session Realized PnL** | **Fixed** profit from closed positions in the session. |
| **A-Book Session Realized PnL** | **Fixed** profit from A-Book closed positions in the session. |
| **B-Book Session Realized PnL** | **Fixed** profit from B-Book closed positions in the session. |
| **Change of Unrealized PnL** | **Unfixed** profit for the session. *(Formula: Total PnL - Realized PnL - PnL Corrections)* |
| **Session Net Deposit** | Total of all **balance transactions** in the session. |

---

## **Diagrams & Session Metrics 📊**  

![](i/current_session/three_tables.webp)  

The **Current Session KPIs** are divided into **three main groups**:  

1️⃣ **Session Orders**  
2️⃣ **Session Accounts**  
3️⃣ **Dealing Desk**  

All data updates **in real-time** with color-coded graphs for better visualization.  

---

## **Session Orders 📋**  

| **Metric** | **Description** |
| --- | --- |
| **Unrealized Positions** | Total number of currently open positions. |
| **Pending Positions** | Total number of pending positions. |
| **Session Opened Positions** | Positions opened during the session. |
| **Session Closed Positions** | Positions closed during the session. |
| **Balance Positions** | Total balance positions in the session. |
| **Session Opened Volume (Lots)** | Total volume of opened positions in the session. |
| **Session Closed Volume (Lots)** | Total volume of closed trades in the session. |
| **Session Total Volume (Lots)** | Total volume of all executed trades in the session. |

---

## **Session Accounts 🏦**  

| **Metric** | **Description** |
| --- | --- |
| **Total Accounts** | Number of **active trading accounts** (excluding demo & broker accounts). |
| **Active Accounts** | Accounts that placed trades during the session. |
| **New Accounts** | Accounts registered during the session. |
| **New and Funded Accounts** | New accounts that were registered **and** funded in the session. *(Formula: New Accounts - New & Funded Accounts = Quality Leads from marketing.)* |

---

## **Dealing Desk 🎛️**  

| **Metric** | **Description** |
| --- | --- |
| **Session Total PnL (USD)** | Full session profit & loss summary. |
| **Session Realized PnL (USD)** | Total profit from **closed** trades in the session. |
| **Session Net Deposit (USD)** | Balance of all **incoming & outgoing** transactions. |
| **Rollover Swaps (USD)** | Sum of all swaps **from the last rollover**. |

---

## **Symbol Chart 📉**  

![](i/current_session/symbols.webp)  

The **Symbol Chart** displays **real-time trading symbol data** (currency pairs, assets) with options to view PnL trends and navigate to the **Winners & Losers** page.  

✅ **Customizable:** Select symbols to overlay their PnL movements onto the Session PnL chart above.  

---

## **Why Use the Current Session Page? 🚀**  

🔹 **Monitor trading activity in real-time**  
🔹 **Analyze session PnL & detect potential risks**  
🔹 **Track key trading & account performance indicators**  
🔹 **Filter data for better decision-making**

---

## Deposits & Withdrawals

# **Deposits & Withdrawals**

## General Information

The **Deposits & Withdrawals** page shows all the incoming and outgoing transactions during the current trading session. The list of incoming and outgoing orders is presented in the **Operations** tab. Refer to the **Accounts** tab to see accounts that made incoming and outgoing transactions.

## Menu Navigation

![](i/deposits.webp)

### **Operations Tab**  

| **Parameter Name** | **Description** |
| --- | --- |
| **Time** | Exact time of the transaction. |
| **Server** | Name of the server. |
| **Order** | Order number. |
| **Balance type** | Type of the transaction. |
| **Amounts, USD** | Total amount of the transaction in USD. |
| **Comment** | Transaction description. |

The list of accounts that made incoming and outgoing transactions within the current session can be found in the **Accounts** tab.

## **Accounts Tab**  

![](i/deposits-2.webp)

| **Parameter Name** | **Description** |
| --- | --- |
| **Login** | Account login number. |
| **Server** | Name of the server. |
| **Name** | Trader's name. |
| **Equity, USD** | Trader's equity in USD. |
| **Session Net Deposit, USD** | Total session net deposit. |

---

## Equities by Groups

# **Equities by Groups**

## General Information

This page is designed to analyze the total equity of account groups included in a custom category. Brokers can create and name custom categories and include the desired account groups in them. Once a new category is created, it is available for analysis in the chart.

![](i/equities.webp)
![](i/equities_2.webp)

The page contains the following information blocks:

## Create an Account Group

This form allows you to create custom categories and include desired account groups. To access the settings, click the **"Account Group Categories"** button. Use filters and the search field to find account groups that should be included in the custom group.

Enter the name of the account group to include in the new custom category. Enter the name of the custom category in the **Category** field and click **Add Item**.  

Your custom category has been created and is now available in the drop-down list.

The bottom of the page contains sorted custom categories and account groups in separate tables.  

- **Custom Categories Table**: Displays all created custom categories.
- **Account Groups Table**: Shows all account groups associated with each category.

---

## New Funded Accounts

# **New Funded Accounts**

## General Information

New accounts that have been registered and funded (i.e., a deposit has been made) during the current trading session are displayed on this page. Brokers can filter the data using options available at the top of the screen. This comprehensive real-time report helps dealers monitor the Trading Session PnL of newly created and funded accounts.

## Menu Navigation

![](i/new-accounts.webp)

## Parameters

| **Parameter Name** | **Description** |
| --- | --- |
| **Equity** | The equity of the account. |
| **Actual Leverage** | The actual leverage of the account. |
| **Drawdown** | The drawdown of the account. |
| **Session Profit** | The session profit of the account. |
| **Session Total Volume, Lots** | The session's total trading volume in lots. |
| **Session Total Volume, USD** | The session's total trading volume in USD. |
| **Session Net Deposit, USD** | The balance of deposits and withdrawals of the account in USD. |

---

## PnL Details

# **PnL Details**

## General Information

![](i/pnl_details/1.webp)

**PnL Details** presents the PnL of a trading session sorted by account groups, symbol groups, and trade reasons in both values and charts. Aggregated from multiple trading servers, the data is compiled into a comprehensive real-time report. Brokers can monitor key metrics of the current trading session as they update in real time.  

To view data from a specific trading server, brokers can use the **"Trade Servers"** filter at the top of the screen. Additionally, PnL data can be inverted to display traders' PnL instead of the broker's PnL.  

Brokers can apply filters to refine the displayed data. A set of filters is available at the top of the screen, along with **filter templates** that allow users to save specific filter values for future use.  

The **"Trade Servers"** filter enables sorting of the displayed data by trading server.  

To see traders' profits instead of the broker's profits, turn off the **"Dealer Side"** switch.

---

## Session PnL Details

![](i/pnl_details/2.webp)

Three sections of the current trading session's PnL are presented in graphical format:  

1. **PnL by account groups**  
2. **PnL by symbol groups**  
3. **PnL by trading reasons**  

All data is displayed in real time. Hover over a chart column to see a floating tooltip with the exact PnL value.

At the bottom of the screen, session PnL data is divided into three groups:

- **Session PnL by account groups**
- **Session PnL by symbol groups**
- **Session PnL by trading reasons**  

Users can use the available controls to sort the data as needed.

![](i/pnl_details/3.webp)

---

## Session Realized

# **Session Realized**

## General Information

This section displays all realized positions of the current trading session. The page is divided into two sections, which are identical unless filters are applied.  

When a filter is applied, the **right section** displays the filtered data, while the **left section** remains unchanged. This allows brokers to compare filtered data with unfiltered data. A detailed breakdown of each position is presented in the chart below the aggregated values.

![](i/session-realized/session-realized.webp)

---

## Positions Chart

| **Parameter Name** | **Description** |
| --- | --- |
| **Total Profit (+ commissions & swaps)** | Total profit of all realized positions in the current session (in USD). |
| **Total Volume, Lots** | Total volume of all realized positions (in Lots). |
| **Total Volume, USD** | Total volume of all realized positions (in USD). |
| **Realized Positions Now** | Number of realized positions in the current session. |
| **Active Accounts** | Number of accounts that had trades in the current session. |
| **Export to CSV** | Export closed positions in CSV format. |

The **Position Chart** will appear when the user clicks on a value in the **Profit** column on the left.

![](i/session-realized/session-realized-chart.webp)

---

## Export to CSV

All closed positions from the trading session can be exported to CSV by clicking the **"Export to CSV"** button.

---

## Stop Outs

# **Stop Outs**

## General Information

Accounts that have reached the predefined **Margin Level** threshold (e.g., 20%) during the current trading session and were forced to stop trading are listed on this page.

## Menu Navigation

![](i/stop-outs.webp)

## Parameters

| **Parameter Name** | **Description** |
| --- | --- |
| **Equity** | The equity of the account, denominated in the account currency. |
| **Actual Leverage** | The actual leverage of the account. |
| **Total Profit (USD)** | The total profit of the account presented in USD. |
| **Session Profit (USD)** | The session profit of the account presented in USD. |
| **Margin (USD)** | The margin of the account presented in USD. |
| **Margin Level** | The ratio of equity to margin, expressed as a percentage. |

---

## Top Accounts Volumes

# **Top Accounts Volumes**

## General Information

The **"Top Accounts Volumes"** subsection displays accounts with the highest trading volumes in the current session.  

![](i/top_accounts_volumes.webp)

### **Key Metrics Table**

| **Parameter Name** | **Description** |
| --- | --- |
| **Equity** | The account's current equity. |
| **Actual Leverage** | The actual leverage applied to the account. |
| **Drawdown** | The maximum decline in account balance from peak to trough. |
| **Total Profit, USD** | The total profit earned in USD. |
| **Session Profit, USD** | The profit earned during the current session in USD. |
| **Session Total Volume, Lots** | The total trading volume during the session, measured in Lots. |
| **Session Total Volume, USD** | The total trading volume during the session, measured in USD. |

To view detailed information about an account’s total trading volume, session PnL, and other metrics, the user can click on the **login** in the **"Login"** column. This will open a pop-up window with additional account details.

---

## Top Symbol Volumes

# **Top Symbol Volumes**

## General Information

This section displays the maximum volumes for symbols traded in the current trading session.

![](i/top_symbol_volumes.webp)

### **Key Metrics Table**

| **Parameter Name** | **Description** |
| --- | --- |
| **Opened Orders** | Number of currently open orders. |
| **Closed Orders** | Number of orders closed during the session. |
| **Unrealized Orders** | Number of unrealized (open but not closed) orders. |
| **Unrealized Volume (Lots)** | Unrealized trading volume in Lots. |
| **Session Realized PnL (USD)** | Profit and Loss (PnL) realized during the session, measured in USD. |
| **Change in Unrealized PnL (USD)** | Change in unrealized PnL during the session, measured in USD. |
| **Session PnL (USD)** | Total PnL for the session, measured in USD. |
| **Session Total Volume (Lots)** | Total trading volume for the session, measured in Lots. |
| **Session Total Volume (USD)** | Total trading volume for the session, measured in USD. |

---

## **Symbol Top Buyers & Sellers Table**

The **top buyers and sellers** for a specific trading symbol can be analyzed in a dedicated section. To access this section, click on the **symbol name**.  

Metrics are provided for the highest buyers and sellers of the trading session for each symbol.

### **Top Buyers & Sellers Metrics**

| **Parameter Name** | **Description** |
| --- | --- |
| **Session Buy Volume (Lots)** | Total volume of buy orders during the session, measured in Lots. |
| **Session Buy Volume (USD)** | Total volume of buy orders during the session, measured in USD. |
| **Session Sell Volume (Lots)** | Total volume of sell orders during the session, measured in Lots. |
| **Session Sell Volume (USD)** | Total volume of sell orders during the session, measured in USD. |

---

## Winners & Losers

# **Winners & Losers**

## General Information

The **Winners and Losers** subsection displays the most profitable and least profitable groups of traders in the current trading session.  

On this page, dealers can analyze **profits, losses, and total assets** for each of these trader groups.  
**Note:** The information on this page is presented **from the trader’s perspective**.

![](i/winners.webp)

---

- **Pinned Columns:** The first and last columns can be pinned to **prevent movement or hiding**.  

## **Table Metrics:**

| **Parameter Name** | **Description** |
| --- | --- |
| **Login** | The ID number of displayed account. |
| **Equity** | Total balance of funds for the account (realized + unrealized PnL). |
| **Session PnL, USD** | Total profit generated by the account during the session. |
| **Session Realized PnL** | Total **realized** profit for the account during the session. |

---

### Account Info Modal

Hovering over a login will display a **detailed modal window**, which present the following information:  

- **Personalized account information**  
- **Session details**  
- **PnL history chart**  

This modal provides deeper insights into individual trader performance.

---

# Dashboards

## Dashboards

# **Dashboards**  

## **General Information**  

The **Dashboards** section allows dealers to create **customized data panels** with widgets displaying **key trading and risk metrics**.  

### **Key Features**  

- Dealers can **create their own dashboards**, use **pre-set templates**, or **add widgets** from a built-in library.  
- Each **widget** has adjustable **settings** to customize the displayed data.  
- Dashboards provide **real-time monitoring** of key performance indicators (KPIs) related to **PnL, trading volumes, quotations, and risk exposure**.  
- Users can **import/export dashboards**, customize layouts, and remove dashboards as needed.  

This functionality ensures that **critical trading data** is easily accessible in a structured and **visual format**, helping dealers make **informed decisions quickly**.  

---

## **Menu Navigation**  

You can find the **Dashboards** section under:  
📌 **Risk Management** → **Dashboards**  

![Dashboards](i/dashboards.webp)  

---

## **Dashboard Templates**  

Trading Platform provides **pre-set dashboards** that display different trading metrics.  

### **1. Total PnL & Winners (Pre-set Dashboard)**  

This dashboard contains six widgets displaying:  

- **Total Monthly PnL**  
- **Weekly PnL**  
- **Daily PnL**  
- **Session PnL Chart**  
- **Profitability of account groups**  
- **Profitability by trade reasons**  

Additionally, it includes a widget showing **daily, weekly, and monthly winners**.  

---

### **2. Dealing Streams (Pre-set Dashboard)**  

This dashboard displays:  

- **Quotation flow (price feed) on the left**  
- **100 last executed orders on the right**  

---

### **3. Big Picture (Pre-set Dashboard)**  

This dashboard contains **five widgets** that provide real-time trading insights:  

- **Net volumes by geolocation**  
- **Net exposure by symbols**  
- **Net exposure pie chart**  
- **Last executed orders list**  

---

### **4. Geo Net Volumes (Pre-set Dashboard)**  

This dashboard contains **three widgets** that visualize net volumes based on:  

- **Traders vs. Robots**  
- **B-Book vs. A-Book**  
- **Overall summary of net exposure**  

---

### **5. Current Rates (Pre-set Dashboard)**  

This dashboard provides a **live quotation feed** for frequently traded symbols, including:  

- **High and low rate values**  
- **Floating spreads**  

📌 **Use the control panel in the top-right corner to:**  

- Import dashboards  
- Export dashboards  
- Add new widgets  
- Remove dashboards  

---

### **6. Executor (Pre-set Dashboard)**  

This dashboard displays the **flow of the last executed orders** from multiple trade servers.  

📌 **Use the control panel in the top-right corner to:**  

- Import dashboards  
- Export dashboards  
- Add new widgets  
- Remove dashboards  

---

## **Creating a Custom Dashboard**  

In addition to pre-set dashboards, dealers can **create fully customized dashboards** by:  

1. Adding widgets from the **widget library**  
2. Arranging the widget layout as needed  

📌 **This flexibility allows users to track only the metrics that matter to them.**  

---

## **Control Elements & Actions**  

Located in the **top-right corner** of the dashboard, the control panel allows users to:  

| **Action** | **Description** |  
|-----------|---------------|  
| **Import Dashboard** | Upload a saved dashboard configuration. |  
| **Export Dashboard** | Save the current dashboard layout. |  
| **Add Widget** | Select and add widgets from the library. |  
| **Delete Dashboard** | Remove a dashboard from the system. |  

---

By utilizing the **Dashboards** feature, dealers can efficiently monitor trading performance, detect risks, and improve decision-making in real time.

---

# Dealing Desk

## A/B Books Net

# **A/B Books Net**

## General Information

This section is part of the company's **risk management strategy**. Brokers can compare **B-Book net volumes** with **A-Book hedged net volumes**. This tool helps **evaluate risk levels** and make **adjustments if needed**. The **graph bar on the rightt** represents the ratio of **A and B-Books**.

## Menu Navigation

![](i/ab-books-net.webp)

## Parameters

| **Parameter Name** | **Description** |
| --- | --- |
| **Volume In Base Asset** | The net volume of A/B Book in asset currency. |
| **Volume In USD** | The net volume of A/B Book in USD. |
| **Lots** | The net number of lots. |
| **Lots Buy** | The number of buying lots. |
| **Lots Sell** | The number of selling lots. |
| **Comparison, %** | The ratio of A-Book volume to B-Book volume, %. |

## Control Elements

This section allows **viewing data from different perspectives**:

- **Dealer Side Toggle**: Turn **off** to view the trader’s perspective.  
- **Collect Symbol Suffixes Toggle**: Turn **on** to group symbols with suffixes (e.g., *EURUSDc, EURUSDd, EURUSDcents*) under the main symbol (*EURUSD*). Turn **off** to view each suffix separately.

---

## The A-Book Settings

# **The A-Book Settings**  

On this page a dealer can configure which **account groups**, **individual accounts**, or **account IDs** should be reflected as **A-Book** in **Trading Platform**.  
If the broker aggregates data from multiple trade servers, the **A-Book settings must be configured separately for each server**.  

⚠ **Priority Rule:** The **A-Book Accounts** section **takes precedence** over the settings in the **A-Book Account Groups** section.  

![A-Book Settings](i/abook-settings/abook-settings.webp)  

---

## **Adding Accounts to A-Book**  

![A-Book Account Groups](i/abook-settings/abook-account-groups.webp)  

| **Parameter Name** | **Description** |
| --- | --- |
| **Accounts Groups** | Adds groups of accounts to A-Book processing. |
| **Excluded Accounts** | Excludes specific accounts from A-Book processing. |
| **Symbols** | Adds trade symbols to A-Book processing. |
| **Symbols: Percent of Coverage, %** | Specifies A-Book coverage percentage for individual symbols. |
| **Symbols Groups** | Adds symbol groups to A-Book processing. |
| **Excluded Symbols** | Excludes specific symbols from A-Book processing. |
| **Symbols Groups: Percent of Coverage, %** | Specifies A-Book coverage percentage for symbol groups. |
| **Included Till** | Expiration date for the setting. |
| **Description** | Description or comments for the setting. |
| **Active** | Toggle to enable or disable the setting. |

### 📌 **How to Add Accounts to A-Book?**

1️⃣ **Press the "Add" button** to include the desired values in A-Book.  
2️⃣ A-Book settings allow **full and partial coverage reflection** of trade symbols.  
3️⃣ Define the **hedged-to-unhedged ratio** as a **% of coverage**.  

---

## **Activating or Deactivating A-Book Settings**  

If an A-Book setting **needs to be temporarily disabled**, use:

- The **"Active" toggle** inside the settings page.  
- The **"Activate" button** on the rule card.  

![A-Book Activation](i/abook-settings/abook-activate.webp)  

📌 The **total number** of account groups, accounts, or account IDs is displayed on the far right of the page.  

---

## **A-Book Account Identification Logic**  

🔹 **An account will be marked as A-Book if:**  
✅ Even if it has **no open orders** but included into any active rule.  
✅ It has **open orders only for symbols included in the A-Book settings**.  

🔸 **An account will be marked as C-Book if:**  
❌ An order is opened for a **symbol with coverage less than 100%**.  
❌ An order is opened for a **symbol that is not included in the A-Book settings**.

---

## Dealing Events

# **Dealing Events**

Dealing events refer to specific actions or occurrences within a broker’s trading system that impact **orders, positions, and overall market activity**. These events are monitored to ensure **fair trading, risk management, and compliance** with the broker's policies. Each dealing event provides insights into **trading activity, risk exposure, and system behavior**, helping brokers manage operations efficiently.

## Menu Navigation

![](i/dealing-events.webp)

To retrieve historical dealing events:
1. Select the desired event type from the **"Event Types"** drop-down menu.
2. Click the **"Get History"** button.
3. If needed, export the list as a **.csv file** for external analysis.

---

## Dealing Streams

# **Dealing Streams**

## General Information

This section displays the **real-time quotes stream** on the **left** (with their status) and the **stream of executions** on the **right**.

## Menu Navigation

![](i/dealing-streams.webp)

## Parameters

| **Parameter Name** | **Description** |
| --- | --- |
| **Include Close Only** | Includes only closed orders in the flow. |
| **Collect Symbol Suffixes** | Turn **on** to summarize symbols with suffixes (e.g., *EURUSDc, EURUSDd, EURUSDcents*) under the main symbol (*EURUSD*). Turn **off** to display symbols with suffixes separately. |
| **Trade Servers** | Select a specific trading server. |
| **Symbols Groups** | Select a specific symbol group. |
| **Top** | The number of symbols/quotes displayed on the left. |

The **candlestick chart** for a symbol’s quote flow can be accessed by clicking on the symbol name.

---

## Exposures

# **Exposures**

## General Information

The **"Exposures"** section displays all asset exposures. This page presents asset volumes in both the asset's native currency and USD. 

Refer to the **graph bar indicator** for a visual representation of actual market sentiment. Use filters to sort data by **geolocation, account groups, trading servers,** and other criteria.

## Menu Navigation

![](i/exposures.webp)

## Parameters

| **Parameter Name** | **Description** |
| --- | --- |
| **Currency** | The name of the financial instrument. |
| **Volume** | The total volume in the asset's native currency. |
| **Net Total** | The total value of the asset in USD. |
| **Rate** | The current exchange rate. |
| **Net Total, USD** | The total asset volume converted to USD. |
| **Graph Bar** | A visual representation of the asset volume in USD. |

---

## Margin Calls

# **Margin Calls**

## General Information

This section displays accounts with **unprofitable trades** that are approaching a potential **stop-out**. Brokers can monitor the **"Margin Call"** status and take appropriate action.

## Menu Navigation

![](i/margin-calls.webp)

## Parameters

| **Parameter Name** | **Description** |
| --- | --- |
| **Equity (in account currency)** | The equity of the account, denominated in its currency. |
| **Actual Leverage** | The actual leverage of the account. |
| **Total PnL, USD** | The total profit/loss of the account. |
| **Session PnL, USD** | The profit/loss of the account for the current session. |
| **Margin (in account currency)** | The margin of the account, denominated in its currency. |
| **Margin Level, %** | The margin level of the account. |

---

## Net By Countries

# **Net By Countries**

## General Information

This section provides a graphical representation of **Net Volumes by Country**.  

Hover over a country on the map to display a tooltip containing key indicators.  

Use the **Net Volume (USD)** slider bar on the left to adjust the **Net Volume**, which dynamically updates the visual representation.  

You can refine the displayed data by applying various filters.

## Menu Navigation

![](i/net-by-countries.webp)

---

## Net Summary

# **Net Summary**

## General Information

This page displays the **Net Volumes** of all symbols. The data can be sorted using various criteria.

## Menu Navigation

![](i/net-summary/net-summary.webp)

Use the **Quick Search** text field to quickly find a specific symbol.

## Parameters

| **Parameter Name** | **Description** |
| --- | --- |
| **Total Unrealized Profit (+ Commissions & Swaps), USD** | The total unrealized profit of all deals, including commissions and swaps. |
| **Total Unrealized Profit, USD** | The total unrealized profit of all deals, excluding commissions and swaps. |
| **Active Accounts Orders - Sell** | The number of active sell orders. |
| **Active Accounts Balances Summary, USD** | The total balance of active accounts. |
| **Active Accounts Equities Summary, USD** | The total equity of active accounts. |
| **Active Accounts Orders - Buy** | The number of active buy orders. |
| **Total Net Volume, USD** | The total net volume history. |
| **Active Accounts Total Leverage** | The total leverage of active accounts. |
| **Active Accounts Total Drawdown** | The total drawdown of active accounts. |
| **Active Accounts Lots - Buy** | The total buy lots of active accounts. |
| **Active Accounts Lots - Sell** | The total sell lots of active accounts. |
| **Buy, VWAP** | The volume-weighted average price of buy orders. |
| **Sell, VWAP** | The volume-weighted average price of sell orders. |
| **VWAP** | The overall volume-weighted average price. |

## Sentiment Indicators

Sentiment indicators provide a quick overview of market trends.

![](i/net-summary/sentiments.webp)

## Market Makers

While viewing the **Net Summary**, brokers can also access a detailed view of **Session Market Makers** for a selected trading symbol.  

To access this section, click on the **trading instrument name**.

![](i/net-summary/market-makers.webp)

> **Note:**  
>
> - The **number of displayed accounts** can be adjusted using the **filter option** at the top of the page.
> - **Locked and hedged positions** are not included in the market makers list.  

## Market Makers Parameters

| **Parameter Name** | **Description** |
| --- | --- |
| **Summarized Equities, USD** | The total equity of accounts buying or selling a selected trading symbol. |
| **Lots** | The total **BUY** or **SELL** lots in open positions for the selected instrument. |
| **Total Profit, USD** | The total profit of accounts buying or selling a selected symbol. |
| **Total Trade Session Profit, USD** | The total trade session profit of accounts buying or selling a selected symbol. |
| **Symbol's Session Profit, USD** | The session profit for the selected symbol. |
| **Symbol's Session Realized Profit, USD** | The realized session profit for the selected symbol. |
| **Volume in USD** | The total volume of all open trades for the selected symbol. |

---

## Top Clients

# **Top Clients**

## General Information

## Menu Navigation

![](i/top-clients.webp)

## Parameters

| **Parameter Name** | **Description** |
| --- | --- |
| **Actual Leverage** | The account's actual leverage (**Net Volume ÷ Account Equity**). |
| **Drawdown (%)** | The account's drawdown percentage. |
| **Lots** | The total trading volume of the account in lots. |
| **Net Volume, USD** | The account's total net volume in USD. |
| **Session PnL, USD** | The account's profit/loss for the current session. |
| **Total PnL, USD** | The account's total profit/loss across all sessions. |
| **Equity, USD** | The account's total equity. |

---

## Top Margin

# **Top Margin**

## General Information

This section displays the **top accounts sorted by margin level**. These accounts have **the highest trading leverages**, making it crucial to closely monitor them as potential sources of **broker losses**. The data is presented in **real-time** in a **comprehensive report**.

## Menu Navigation

![](i/top-margin.webp)

## Parameters

| **Parameter Name** | **Description** |
| --- | --- |
| **Actual Leverage** | The actual leverage of the account. |
| **Drawdown, %** | The drawdown of the account. |
| **Lots** | The number of lots. |
| **Session Profit, USD** | The session profit of the account in USD. |
| **Total Profit, USD** | The total profit of the account in USD. |
| **Equity, USD** | The equity of the account in USD. |
| **Margin Level, %** | The margin level of the account. |

---

## Top Volumes

# **Top Volumes**

## General Information

This section displays accounts with the **highest trading volumes**. Their performance is evaluated using key indicators listed below.  

Use the **filters** at the top of the screen to customize the data representation. The **number of displayed accounts** can also be adjusted using the drop-down menu in the filter settings.

## Menu Navigation

![](i/top-volumes.webp)

## Parameters

| **Parameter Name** | **Description** |
| --- | --- |
| **Equity** | The account's total equity. |
| **Actual Leverage** | The account's actual leverage (**Net Volume ÷ Account Equity**). |
| **Drawdown (%)** | The account's drawdown percentage. |
| **Lots** | The total number of lots traded by the account. |
| **Net Volume, USD** | The account's total net volume in USD. |
| **Session PnL, USD** | The account's profit/loss for the current session. |
| **Total PnL, USD** | The account's total profit/loss across all sessions. |

---

## Winners & Losers

# **Winners & Losers**

## General Information

This section displays **the most profitable accounts ("Winners")** and **the most unprofitable accounts ("Losers")** for a selected historical period. The number of displayed accounts is adjustable. 

- **Winners** are shown on the **left side** of the screen.  
- **Losers** are shown on the **right side** of the screen.  

## Menu Navigation

![](i/winners-losers.webp)

| **Parameter Name** | **Description** |
| - | - |
| **Accounts** | The number of displayed accounts. |
| **Summarized Equities, USD** | The total equity of the selected accounts. |
| **Lots** | The total number of lots traded by the selected accounts. |
| **Total PnL, USD** | The total profit/loss of the selected accounts. |
| **PnL for period, USD** | The total **profit/loss (PnL)** of the selected accounts within the specified period. |
| **Total Trade Session PnL, USD** | The total trade session profit of the selected number of accounts. |
| **Equity, USD** | The equity of each account in USD. |

### **Filtering by Period**  
Brokers can filter the data using the **"Period"** filter to view:  

✔ **Daily** winners & losers  
✔ **Weekly** winners & losers  
✔ **Monthly** winners & losers  
✔ **All-time** winners & losers  

![](i/wl-period.webp)

⚠ **Note:**  

- Only the **current calendar month** is available in this section.  
- Data from **previous months** can be accessed in the reporting system.

---

# Dealing Operations

## Dealing Operations

---
title: Dealing Operations
---

# **Dealing Operations**

This page allows brokers to schedule and manage tasks related to **dividend accruals, swap adjustments, and symbol rollovers**. It provides a **visual calendar view**, offering a clear overview of scheduled and canceled operations.

### Key Features:

- **Calendar View:** Easily track scheduled operations by date.
- **Task Filters:** View **swaps**, **dividends**, or **all operations** in the calendar.
- **Task Details:** Click on any scheduled task to see its details.

## Scheduling a Task

To schedule a new task, click one of the action buttons located near the **thumbnail calendar**.

![](i/swaps-b.webp)

### Calendar Navigation:

- **Dots** next to a date indicate scheduled tasks.
- Click on a **date** to view all tasks for that day in the **right panel**.
- Click on a **task** to open its detailed view.

## Select the Operation Type

Choose the type of operation you wish to perform:

- [**Dividends adjustment**](/dealing-operations/dividends-adjustment)
- [**Change Swaps**](/dealing-operations/swaps)
- [**Symbol Rollover**](/dealing-operations/symbol-rollover)

---

## Dividends Adjustment

---
title: Dividends Adjustment
---

# **Dividends Adjustment**

This section allows brokers to process **dividend payments** for traders holding open CFD positions. Brokers can apply dividends either to a **specific trade server** or, if operating multiple servers, to **all orders across multiple trade servers**. Traders can also be notified about dividend payments through **push notifications** in instant messaging apps.

Navigate to **Dealing Operations > Dividends Adjustment** in the left-side menu.

![](i/dividends.webp)

---
⚠️ Before proceeding make sure you selected the desired symbol groups to be applicable for the operation in the **Dealing desk - Dealing settings** section

![](i/div-groups.png)

⚠️ To choose which fields are available for configuration, go to **Dealing Operations → Settings** and enable the desired fields along with their threshold values.

![](i/operations-settings.webp)

---
## Dividends Adjustment for a Single Symbol

![](i/dividends-settings.webp)

1. Select the **date** and click **Dividends Adjustment**.
2. Fill in the required data in the window that appears. Scroll down to view all available parameters.
3. The description of all parameters is provided in the table below.

---

### Parameter Descriptions  

| Parameter                 | Description                                                                                                                                         |
|---------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| **Server**                | Select the server where the dividend operation should be executed.                                          |
| **Dividends from CSV**     | Turn this switch **ON** if you are uploading a CSV file. See the CSV upload process below for details.   |
| **Symbol**                | Choose the symbol.                                                                                          |
| **Collect Symbol Suffixes** | Turn **ON** to group symbols with suffixes (e.g., *EURUSDc, EURUSDd, EURUSDcents*) under the main symbol (*EURUSD*). Turn **OFF** to display them separately. |
| **Long Dividends**        | Can be **positive or negative**: Positive values mean dividends are **accrued**, negative values mean dividends are **deducted**, and 0 means no accrual. |
| **Short Dividends**       | Works the same way as **Long Dividends**, but applies to short positions.                                   |
| **Long Tax %**            | The tax percentage applied to the **accrued dividends**. If dividends are 0, tax will also be 0.            |
| **Short Tax %**           | The tax percentage applied to the **accrued dividends** for short positions.                               |
| **Delayed**               | Turn **ON** to schedule the dividend operation for a future date/time. If **OFF**, the operation will be executed immediately. |
| **Applied Date**          | Select the **time and date** for the operation and enter any relevant comments.  ⚠️ *Dividends can only be accrued when the trading session for the instrument is closed.* |
| **Dividends Deal Comment** | By default, the system fills this field as `"Div.Adjustment for #SYMBOL"`, e.g., `Div.Adjustment for AUDUSD`. You can customize it using the format `"#SYMBOL_dividend position #POSITION_ID"`. |
| **Use Conversion Rates**   | Turn **ON** if you need to apply a custom conversion rate instead of the actual market rate. Select currencies and enter the desired rate. |
| **Check Margin**          | If **ON**, the system checks if the dividend accrual will result in a **stop-out**. If **OFF**, the operation proceeds without verification. |

---

⚠️ **If any errors or incorrect data are present, the "Preview and Schedule" button will be inactive.**

### Final Steps:

1. **Review all entered data carefully.**  
2. Click **"Preview and Schedule"** to see a summary with preliminary calculations.  
3. If everything is correct, click **"Schedule Job"** to finalize the process.  
4. The dividend task will now appear in the **calendar**, where you can edit or cancel it at any time.  

---

## Uploading Dividends via CSV File  

1. Navigate to **Dealing Operations > Dividends Adjustment** in the left-side menu.
2. Choose one or multiple **servers**.
3. Turn **ON** the **"Dividends from CSV"** switch.
4. Click **"Show the format details"** to see the CSV template.
5. Ensure the **trading session for the instrument is closed** before proceeding.
6. Prepare your CSV file according to the below provided template.

⚠️ Note: If you re-upload tasks from the same file (for example, after making changes and wanting to update the scheduler), duplicate tasks — identified by matching time and instrument — will be canceled and marked as "Canceled" in the system.

## 🧾 Column Definitions

| Column                  | Type                   | Example              |
|-------------------------|------------------------|----------------------|
| **Symbol**              | string                 | `AAPL`               |
| **Collect Symbol Suffixes** | number (0 or 1)     | `1`                  |
| **Long Dividends**      | number                 | `1.85`               |
| **Short Dividends**     | number                 | `-1.85`              |
| **Delayed**             | number (1 only)        | `1`                  |
| **Applied Date (UTC)**  | `DD.MM.YYYY HH:mm`     | `31.01.2025 23:10`   |
| **Check Margin**        | number (0 or 1)        | `0`                  |

---

## 📂 Example File: `Example.csv`

```csv
Symbol;Collect Symbol Suffixes;Long Dividends;Short Dividends;Delayed;Applied Date;Check Margin
AAPL.US;1;1.85;-1.85;1;31.01.2025 23:10:00;0
EURUSD;1;15.64;-10;0;31.01.2025;0
```


7. Upload the file.

### Required CSV Parameters  

| Parameter                 | Description                                                                                                                      |
|---------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| **Symbol**                | Symbol name.                                                                                                                   |
| **Collect Symbol Suffixes** | `ON` - Upload all suffix variants. `OFF` - Group all symbol suffixes. |
| **Long Dividends**        | Can be **positive or negative**: Positive values **accrue dividends**, negative values **deduct dividends**, and 0 means no accrual. |
| **Short Dividends**       | Works the same way as **Long Dividends**, but applies to short positions.                                                        |
| **Delayed**               | Default = `ON` (delayed operation).                                                                                              |
| **Applied Date**          | Set the **non-trading time** (date/time format). Future dates will appear as scheduled tasks in the calendar.                   |
| **Check Margin**          | `ON` - The system checks for stop-outs before processing. `OFF` - The accrual proceeds without verification.                     |

### Uploading the File:

1. Click **"Choose File"** to upload your CSV.
2. The system will validate the file and display the results in a preview window.
3. **Status indicators**:
   - ✅ **Green dot**: No errors detected.
   - ❌ **Red dot**: Errors found. Hover over the dot to see the error details.
4. The file will only be uploaded if it contains **no errors**.

---

## **Permissions**  

### Required Permissions for Dividend Adjustments  

| **MT4**                                      | **MT5**                              |
|----------------------------------------------|--------------------------------------|
| ![](i/div-mt4.webp)**Access Rights:** Accountant (deposit/credit/withdraw money) |![](i/div-perm-01.webp) ![](i/div-perm-02.webp)**Access Rights:** Accountant (balance operations) |
| **Operations:** Trading Transactions → Dealer, Trading Transactions → Edit/Delete Trades | **Operations:** Dealing → Dealer |

---

## Change Swaps

---
title: Change Swaps
---

# **Change Swaps**

This section allows brokers to modify rollover swaps by uploading a CSV file. The system processes the file and retains a history of previous uploads for analysis. It also supports custom swaps for specific symbol groups within selected account groups.

To access this feature, go to **Dealing Operations > Change Swaps** in the left-side menu.

![](i/swaps.webp)

Before proceeding, ensure your CSV file follows the required format.
Once ready, upload your file and configure the parameters in the newly opened window as described below.

![](i/swaps-settings.webp)

| Operation               | Description                                                                                                                                                                                                                   |
|-------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Choose File**         | Select the prepared CSV file following the provided format.                                                                                                                                                                  |
| **Servers**             | Specify one or more servers where swaps will be applied.                                                                                                                                                                     |
| **Collect Symbol Suffixes** | Enable this option to merge symbols with suffixes (e.g., EURUSDc, EURUSDd, EURUSDcents) into a single entry (EURUSD). Disable it to display all symbols separately.                                                   |
| **Set Custom Swaps**    | Custom swaps are normally applied on top of standard swaps. If the switch **«Set Custom Swaps»** is set to ON, then the values of custom swaps will be recalculated automatically. Custom swaps are calculated as a percentage to the basic rollover swaps. For instance, if the specified value of the custom swap is 200%, then the rollover swap of a particular symbol should be multiplied by 2. The value of the custom swap can either be positive (200%) or negative (-200%).                                               |
| **Delayed**   | If disabled, changes are applied immediately. Enable this option to schedule the swap update for a specific date and time. Scheduled jobs will appear on the calendar, marked with a dot.                                   |

After setting the parameters, click **"Preview and Schedule"** to review the data.

![](i/swaps-e.webp)

⚠️ **Important:** Before proceeding, visually verify that the new swap values do not deviate by more than **10%** from the previous values.

To assist in this, the **"Preview and Schedule"** function will highlight any values exceeding a **10% difference** in red with an exclamation mark.

Use the **"Search"** field to quickly locate specific symbols.

Once verified, click **"Schedule"** to apply the changes. The scheduled task will now appear in the system’s calendar.

## Permissions

To modify swaps, the following permissions must be granted in the **Manager API** for MT4 and MT5:

| Platform | Swap Application Method |
|----------|-------------------------|
| **MT4**  | Uses **CManagerInterface::CfgUpdateSymbol**. Requires **ADMIN** permissions in the Manager API. |
| **MT5**  | Uses **IMTAdminAPI::SymbolUpdate**. Requires a separate **ADMIN LOGIN** for a dedicated connection to MT5. **[More Info] - swaps-f** |

![](i/swaps-f-permissoin.webp)

---

## Untitled

## **Symbol Rollover**  

This section allows brokers to **adjust open CFD positions** on futures contracts when they reach their **expiration date**. The adjustment ensures that the **profit and loss (PnL) of open positions is corrected** at the time of the underlying instrument’s delivery.  

This process is available in **MT4 and MT5** and functions as a **technical price adjustment**. It removes **non-market factors** caused by contract expiration, ensuring smooth transitions between expiring and new contracts.  

Brokers can apply rollover corrections to:
  
- A **specific trade server**  
- **All trade servers** within the dealing desk (for brokers operating multiple servers)  

**Rollover corrections can be applied as:**  
✔ **Swaps**  
✔ **Commissions**  
✔ **Direct instrument price adjustments**  

Brokers can **schedule** rollover operations in advance if needed.  

---

## **Menu Navigation**  

Navigate to **Dealing Operations > Symbol Rollover** in the left-side menu.  

![](i/symbol-rollover.webp)  

---

## **How to Apply Rollover Corrections**  

1. **Select the trading symbols**  
   - Use the **Symbol** dropdown to choose the expiring CFD contract.  
   - Use the **New Symbol** dropdown to choose the new contract.  

2. **Enter correction values**  
   - Specify the **Buy Points** (long positions)  
   - Specify the **Sell Points** (short positions)  

3. **Adjust settings**  
   - **Collect Symbol Suffixes** if applicable.  
   - Set the **Applied Date** (execution time and date).  
   - If needed, enable the **Delayed** option to schedule execution for specific time and date.  

![](i/symbol-settings.webp)  

| **Parameter**                | **Description**  |
|-----------------------------|----------------|
| **Symbol**                   | Select the expiring CFD. |
| **New Symbol**               | Select the new CFD contract. |
| **Buy Points (points)**       | Enter the price adjustment for **long positions**. |
| **Sell Points (points)**      | Enter the price adjustment for **short positions**. |
| **Collect Symbol Suffixes**   | Merge all symbol suffix variations into one. |
| **Applied Date**              | Select the **date and time** for execution. |

### **Scheduling and Execution**

✅ **Delayed Execution**: If you want to schedule the symbol rollover for a specific time, turn on the **Delayed** switch and use the time selector.  
⚠️ **Important**: Symbol rollover can **only** be executed **outside of the trading session** for that instrument. If attempted during trading hours, the system will show a red warning message.  

---

### **Finalizing the Rollover**  

1. Click **"Preview and Schedule"** to **review the changes** before applying them.  
2. If everything is correct, click **"Schedule Job"** to confirm the symbol rollover.  
3. The rollover **task will appear in the calendar view**, where it can be edited or canceled if needed.  

---

## **Compensation Processing Modes**  

There are **three different modes** for handling rollover adjustments. The broker’s **internal policy** determines which mode should be applied:  

- **Swaps**: The price adjustment is applied as a swap.  
- **Commissions**: The adjustment is processed as a commission charge.  
- **Direct Instrument Price Adjustment**: The instrument price is modified directly.  

### **How to Select the Compensation Mode**  

1. Navigate to **Dealing Desk - Dealing Settings** in the left-side menu.  
2. Under **"Symbols Rollover & Dividends"**, choose the preferred processing mode.  
3. Save the setting.  

⚠️ **Each trading server requires its own mode selection.**  

![](i/symbol-mode.webp)  

---

This process ensures a **smooth transition between expiring and new CFD contracts**, maintaining **PnL accuracy** while following the broker’s preferred **compensation method**.

---

# Directory & Data

## Untitled

---
title: Accounts
---

---

## Untitled

---
title: Open Positions
---

---

## Untitled

---
title: Symbol
---

---

# General Information

## Untitled



---

## You are on the main page. Let’s see how things work here.

---
title: Page Layout
---

# **You are on the main page. Let’s see how things work here.**  

We've invested **long hours and relentless effort** to create a **user-friendly interface** for **Trading Platform**, incorporating **valuable feedback** and **suggestions** from our clients.  

Below are the **main areas** you need to know about.  

![Main page](i/Main%20page/main-page.webp)  

---

## **Omni-search (1)**  

Simply **start typing** the desired name in the search field, and you'll see **all relevant options** in the dropdown menu, allowing for **instant navigation**. The search covers:  

✔ **Pages**  
✔ **Accounts**  
✔ **Account groups**  
✔ **Symbols**  
✔ **Symbol groups**  
✔ **Triggers**  
✔ **Trigger rules**  

![Omni-search](i/Main%20page/search.webp)  

---

## **Documentary Repository (2)**  

We maintain and regularly update the **system documentation** **here**. It includes:  

📌 **Detailed descriptions** of all menu sections  
📌 **Key settings** for triggers  
📌 **Step-by-step guides** for system navigation  

Click the **“?” icon** to access this manual and find all the necessary information.  

![Manual](i/Main%20page/link-to-the.webp)  

---

## **Menu (3)**  

The menu is divided into **sections and subsections**. From here, you can:  

🔹 **Monitor dealing activities**  
🔹 **Configure risk management triggers**  
🔹 **Upload swaps, bonuses, and dividends**  
🔹 **View hedge accounts**  
🔹 **Manage user permissions**  

---

## **Notifications (4)**  

You will receive **real-time notifications** for the triggers that have been set up.  

📩 Click on notifications to view a **list of recent alerts**.  
🔗 Press the link to learn [**How to process the notification**](/general-information/notifications).  

![Notifications](i/Main%20page/notifications.webp)  

---

## **Lightning Icon (5)**  

🔴 **Red**: Indicates a problem with **server connections**.  
🟢 **Green**: Everything is functioning properly.  

By clicking the **lightning icon**, you can:  

✔ See the list of **connected servers** and their detailed information  

![Lightening](i/Main%20page/lightning.webp)  

---

## **User Settings (6)**  

Within **User Settings**, you can:  

🎨 **Switch between light and dark themes**  
🖥 **Expand Trading Platform to full-screen mode**  
🔇 **Mute/unmute sounds**  
⚙ **Access advanced user settings**  
🚪 **Log out of the system**

## 🔕 Semaphore Sound Notifications Control

This section displays signals from **two key triggers**:  

⚡ **New Rates Absence**  
⚡ **Orders Execution**  

![](i/main-settings/mute.webp)

By default, all semaphore notification sounds are **enabled**.

> **Important:** This mute functionality only affects **semaphore audio notifications**.  
> **Trigger sounds remain independent** and can be managed using a separate control button located at the **bottom left** of the interface, under the navigation menu.

![](i/main-settings/sound.webp)

---

## 🔧 Mute Options for Semaphores

![](i/main-settings/mute-01.webp)

In the **semaphore dropdown**, users can control sound notifications using the mute buttons:

- **For 1 hour** – disables sound for 1 hour.
- **Until tomorrow** – disables sound until the **next session starts** (i.e., the next **rollover** at 12:00 AM in the user’s time zone).
- **Forever** – permanently disables sound notifications for semaphores.

---

## 🔄 Mute State Indicators

When sound is muted:
- The speaker icon changes to indicate mute status.
- A label **"Muted"** appears **under the flag icon in the status bar**.
- This label is visible **regardless of whether the semaphore dropdown is open or closed**.

To **restore sound notifications**, use the **"Resume sound notifications"** button that appears in place of the mute options.

---

## 🔁 Behavior and Persistence

- The **mute state is preserved** even if global sounds are toggled off/on.  
  For example, if semaphore sounds are muted **"Until tomorrow"**, they will automatically return to that state when global sound is re-enabled.
- When the tab is inactive, muted semaphore sounds will **reactivate** after the selected mute duration ends.
- Selecting **"Notifications only"** or **"Disabled"** for **"Semaphores events"** in `Profile → Notifications` disables all audio.  
  In this case, the semaphore dropdown will always display:

  > **Audio disabled by global settings**

---

## Economic Calendar

# **Economic Calendar**

## **Economic Calendar Overview**

![](i/economic-calendar/calendar.webp)

The Economic Calendar displays key upcoming macroeconomic events that may influence market activity. Each entry provides the following details:

* Time & Date of the event
* Country associated with the announcement
* Event name (e.g., Nonfarm Employment Change, Interest Rate Decision, PMI)
* Current, Forecast, and Previous values (if available)

Events are listed in chronological order and updated in real time.

## **Visual Highlights**

![](i/economic-calendar/calendar-expanded.webp)

* Events happening within the next hour are highlighted with a red background to signal urgency.
* A countdown timer shows how many minutes remain until the next scheduled event.
* Events are fetched from [Investing.com Economic Calendar](https://www.investing.com). 

Brokers need to see upcoming events in the economic calendar for several important reasons: 

🔔 1. Risk Management

Upcoming economic events (like interest rate decisions, CPI reports, or NFP releases) can cause significant market volatility. Brokers need to:

* Anticipate sharp price movements that may affect client positions.
* Adjust risk parameters, such as margin requirements, before high-impact events.
* Prevent overexposure or liquidity issues during volatile periods.

📊 2. Liquidity Planning

Events that affect market sentiment can lead to spreads widening, low liquidity, or slippage. Brokers use the calendar to:

* Communicate with liquidity providers in advance.
* Adjust execution strategies.
* Plan for off-book coverage or hedging needs.

🧠 3. Client Support & Education

Economic calendars help brokers:

* Proactively inform traders about high-impact events.
* Provide commentary or analysis to help clients make informed decisions.
* Align client expectations with market conditions.

⚙️ 4. Internal Operations & System Load

High-impact news often increases trading volume. Brokers need time to:

* Ensure infrastructure scaling (especially during spikes in order traffic).
* Test or adjust risk engines and trading system performance.
* Monitor for potential system overloads or latency.

📅 5. Strategic Planning

Brokers use economic calendars to:

* Schedule maintenance windows away from high-volatility periods.
* Time promotions, communications, or feature releases during quieter periods.
* Align internal operations (e.g., Dealing Desk shifts) with known volatility cycles.

✅ Summary

The economic calendar is not just a trader’s tool — it's a core operational resource for brokers. It supports risk control, execution quality, client engagement, and overall business stability.

---

## Trigger System

# **Trigger System**

## **General information**

Trading Platform uses trigger system to identify various threats and notify users about them. Trigger is a small program that detects certain trading conditions. When the condition is fulfilled, the system generates notification for the user to process.  

The list of notifications can be found at the top of the page, where only the last three notifications are displayed.

![](i/notifications_list.webp)

The overall number of unprocessed notifications can be found in the green circle above the notifications.

![](i/notifications_number.webp)

The triggers are divided into categories and can be found in the **Risk Management** section of Trading Platform.

The number of unprocessed notifications is displayed in red next to the name of the related category.

![](i/unprocessed.webp)

When you click on the Risk Management section, you will see the list of all unprocessed notifications from all triggers.

Each trigger is presented as a card on which relevant information can be identified

![](i/trigger_card.webp)

Top right - total number of unprocessed notifications.

Left bottom - total number of rules created.

Rules notifications color codes:

| **Parameter name** | **Description** |
| --- | --- |
| Green | Notice |
| Yellow | Warning |
| Red | Critical |
| Grey | Number of inactive rules |
| View report |See all unprocessed notifications |
| Configure | Create and edit the rules |

If you forget the name of the trigger that you are looking for you can always use our Omni search at the top os each page to find the desired trigger.

In order to  to Process the notification just click on it. You will see all the information about the event. At the bottom of the page you will find control elements that will help you process the event.

---

## Configuration of servers, exclusions, and clusters

---
title: Main Settings
---

# **Configuration of servers, exclusions, and clusters**

---

## **1. Server Configuration**

You can configure real and demo servers using these settings. This helps you differentiate the vital metrics of the **Current Session** and fine-tune existing tools of the **Risk Management** system.  

**Step 1** – Navigate to **Dealing Desk** – **Dealing Settings** on the left-side menu.  
**Step 2** – Select **Server Mode** in the internal menu.  
**Step 3** – Click on the server at the top of the list on the screen. It will be highlighted.  
**Step 4** – Press the **Edit Settings** button.  

![server-mode](i/main-settings/serever-a.webp)

Verify the correct server name, define if the server is **Real** or **Demo**, and then save the settings. After that, perform the procedure on all servers.

![server-mode](i/main-settings/server-b.webp)

Click the lightning icon in the top-right corner of the screen and switch between the Real, Demo, and All sections to see the results of the settings.

![server-mode](i/main-settings/server-c.webp)

---

## **2. Exclusion Configuration**

You can define a list of exclusions for symbol groups, account groups, and individual accounts for each server. These will be excluded from all calculations results for a specific server. If needed, you can easily return them to the calculations later.  

**Step 1** – Navigate to **Dealing Desk** – **Dealing Settings** on the left-side menu.  
**Step 2** – Select **Exclusion** in the internal menu.  
**Step 3** – Choose the server at the top of the list on the screen. It will be highlighted.  
**Step 4** – Press the **Edit Settings** button.  

![server-mode](i/main-settings/exclusion-a.webp)

Select **Edit list** for **Symbol Groups** or **Accounts Group** to manage exclusions in the opened window. Check the necessary groups and click **Update** in the new window.

![server-mode](i/main-settings/exclusion-b.webp)

If you want to add individual accounts, place them in the **Excluded Accounts** field. Press the **Save button** in both cases.  

Navigate to **Dealing Desk** – **Dealing Settings**, then choose **Exclusion** – **Edit settings** to remove exclusions. After that, save the changes.

![server-mode](i/main-settings/exclusion-c.webp)

---

## **3. Clusters Configuration**

Clusters are groups of servers combined for a specific purpose, such as dividing the visibility of servers among different departments within the company. The responsibility for creating clusters lies with the administrator of the Trading Platform website on the broker's side.

**Step 1** – Choose **Dealing Desk** – **Dealing Settings** on the left-side menu.  
**Step 2** – Select **Clusters** in the internal menu.  
**Step 3** – Choose the server at the top of the list on the screen. It will be highlighted.  
**Step 4** – Press the **Edit Settings** button.  

![server-mode](i/main-settings/cluster-a.webp)

**Step 5** – In the opened window, you can create a new cluster by assigning it a name and adding the necessary servers.  
**Step 6** – To add servers to a cluster, select them from the list of available servers and click **Add to Cluster**.  
**Step 7** – After configuring the cluster,

---

## New User Registration

# **New User Registration**

## **Welcome to Trading Platform! 🚀**

Congratulations! 🎉 You’ve received your **invitation letter**—this means the **Trading Platform team has completed the installation** of your product.  

🔹 **Next step:** Click the **link provided in the email** to begin your registration.  

![](i/invitation_letter.webp)

---

## **Setting Up Your Password 🔐**

The **first thing** you need to do is **create a secure password** for logging in.  

✅ Password requirements:  
- Length should be **at least 12 characters long**  
- **No restrictions on special characters**  

![](i/new_password.webp)

---

## **Logging In for Registered Users**  

If you’ve **already registered**, you can **log in** immediately using your **email and password**.  

![](i/login_screen.webp)

---

## **Forgot Your Password? 🤔**  

If you **forgot your password**, don't worry! You can **reset it** in just a few steps:  

1️⃣ Click **"Forgot Password?"** on the login page.  
2️⃣ Enter your **email address** on the next screen.  

![](i/reset_password.webp)

3️⃣ Click **"Send reset password email"** and check your inbox for a reset link.  

⚠️ **Note:** Password recovery is available **only for registered users**.  

---

🎯 **That’s it! You’re now ready to start using Trading Platform.** If you need assistance, feel free to reach out to our support team. 🚀

---

## How to Work with Notifications

---
title: Notifications
---

# **How to Work with Notifications**

All notifications from the triggers are displayed in the top right corner of the screen. You can view all of them by pressing the “See all” button or switch between their levels of disturbance by sorting them.

![server-mode](i/notifications/notification-b.webp)

---

## **Processing of the Notifications**

By clicking on the notification field, you can start processing it. After reviewing the account, you can make a decision.

![server-mode](i/notifications/notification-c.webp)

**The Accept Button**: You are confident that the trading of this account is transparent, and you accept the event. The notification is considered processed and vanishes from the notification stream.

**The Suspicious Button**: Marks the account with a flag, which will be displayed in the "Suspicious" page in the **Risk Management** section of the menu. You can add your comment to the flag to quickly identify the account in various reports.

**The Exclude Account Button**: Excludes the account from the trigger checklist.  

**The Block Trading Button**: Blocks trading (the account can log in but cannot trade; becomes read-only). 

To process multiple notifications at once, hold the **Ctrl** key and click each desired notification. A control panel will appear, allowing you to take action on all selected items simultaneously.

![](i/notifications/control.webp)

---

## **Notification History**

The history of notifications is available by pressing **"Risk Management"** in the left-side menu (1).

![server-mode](i/notifications/notification-a.webp)

You can switch between two sections: the **“Event List”** (unprocessed notifications) and the **“All Triggers”** (unprocessed notifications divided by the name of triggers).  

You can choose notifications for a specific trigger by pressing the name of the trigger (3). To see all processed notifications, click the **“Hide Processed”** button (4). By pressing **“Accept It All”**, you accept all unprocessed notifications (5). Here, you are also able to export this data to Excel.

---

## Technical Requirements

# **Technical Requirements**

Below you will find the necessary permissions that should be granted in the **MT Manager API console** to establish a connection between our system and your trading platform.

This document also outlines the **technical requirements** for the **hardware and software** necessary to install our frontend and backend components.

---

## Whitelist of IPs

When we receive the credentials for the connection, we will provide the list of our IPs that we will use to connect to your **MT4/MT5 servers**.

> ⚠️ If frontend/backend is installed in **Trading Platform**'s cloud, please add IPs provided to your **whitelist**.

---

## MT5 Connection and Permission Requirements

To integrate with MT5, the following are the **minimum requirements** for our system to go live:

- Export your **server settings** to a `.json` file (see Picture No. 3).
- The export must include:
  - `CommonConfig`
  - `TradeServer`
  - `OrdersRange`
  - `DealsRange`

> ⚠️ **Please ensure you remove any sensitive network configurations or IP addresses** from the `.json` file before sending it to us.

### Example `.json` file settings

![server-mode](i/tech-requirements-saas/json.webp)

- **Picture No.2** – Export Settings

![](i/tech-requirements-saas/export-01.webp)

- **Picture No.3** – Context Menu for Export

![](i/tech-requirements-saas/export-02.webp)

### Picture References

- **Picture No.4** – MT5 Permissions  
  *Required checkboxes are highlighted in red frames.*

![](i/tech-requirements-saas/mt5-permissions.webp)

---

## MT4 Connection Requirements

For MT4:

- Checking **"Connections"** is optional.
- You will have access to groups of accounts that you specify in the **Manager** interface.

- **Picture No.5** – MT4 Permissions

![](i/tech-requirements-saas/mt4-permissions.webp)

---

## Additional Permissions

If you would like to utilize **triggers** that allow direct control of **leverage** and **spreads** inside the MT platforms, **Admin permissions** are required along with a few additional checkboxes.

- **Picture No.5** – Additional Permissions  
  *Required checkboxes are highlighted in red frames.*

![](i/tech-requirements-saas/admin-permissions.webp)

---

## Installation Information

Your installation option is self-hosting.  You are required to provide us with hardware and software specified below.

# Server Configuration Requirements
---

## 🖥️ Backend: Windows Server

### **1 Server**
| Requirement     | Minimum               | Recommended            |
|-----------------|------------------------|--------------------------|
| CPU             | 1 Core, 2 Threads     | 2 Cores, 4 Threads      |
| RAM             | 24 GB                | 33 GB                   |
| Storage         | 100 GB               | 100 GB                  |

### **2 Servers**
| Requirement     | Minimum               | Recommended            |
|-----------------|------------------------|--------------------------|
| CPU             | 2 Cores, 4 Threads    | 4 Cores, 8 Threads      |
| RAM             | 34 GB                | 48–64 GB                |
| Storage         | 100 GB               | 150 GB                  |

### **5+ Servers**
| Requirement     | Minimum               | Recommended            |
|-----------------|------------------------|--------------------------|
| CPU             | 5 Cores, 10 Threads   | 6 Cores, 12 Threads     |
| RAM             | 64 GB                | 80–128 GB               |
| Storage         | 140 GB               | 150 GB                  |

---

## 🌐 Frontend: Linux Server (LTS)

### **1 / 2 / 5+ Servers**
| Requirement     | Minimum               | Recommended            |
|-----------------|------------------------|--------------------------|
| CPU             | 1 Core, 2 Threads     | 2 Cores, 4 Threads      |
| RAM             | 4 GB                 | 4 GB                    |
| Storage         | 20 GB                | 40 GB                   |

> **Hotplug Capable:** Support for adding 4 CPU cores and 8–16 GB RAM and Storage.

---

## 🗃️ Database: RDS or Linux Ubuntu LTS + PostgreSQL

### **1 Server**
| Requirement     | Minimum               | Recommended            |
|-----------------|------------------------|--------------------------|
| CPU             | 2 Cores, 4 Threads    | 3 Cores, 6 Threads      |
| RAM             | 4 GB                 | 8 GB                    |
| Storage         | 200 GB               | 200 GB                  |

### **2 Servers**
| Requirement     | Minimum               | Recommended            |
|-----------------|------------------------|--------------------------|
| CPU             | 2 Cores, 4 Threads    | 3 Cores, 6 Threads      |
| RAM             | 4 GB                 | 8 GB                    |
| Storage         | 400 GB               | 600 GB                  |

### **5+ Servers**
| Requirement     | Minimum               | Recommended            |
|-----------------|------------------------|--------------------------|
| CPU             | 2 Cores, 4 Threads    | 3 Cores, 6 Threads      |
| RAM             | 4 GB                 | 8 GB                    |
| Storage         | 1 TB                 | 1 TB                    |

⚠️ **We expect the following rights for PostgreSQL:
read, write, delete, create tables, modify tables, drop tables, create databases, drop databases, create drop schemas.**

Server Connection Diagram

![](i/tech-requirements-saas/connection-diagram.webp)

# 🔌 **Trading Platform Port & Connection Requirements**

## 🚪 Required Open Ports

### Backend Server
- **Ports to open:**  
  `14500`, `3389`, `5986`, `10050`, `10051`

### Frontend Server
- **Ports to open:**  
  `22`, `80`, `443`, `7701`, `10050`, `10051`

### Database Server
- **Ports to open:**  
  `5432`, `10050`, `10051`

---

## 🌐 Connection Options

### Option 1: Trading Platform Hosts DNS
- A DNS record in the format of `brokername.example.com` is created by the **Trading Platform** team.
- This DNS points to the **Trading Platform** server.
- **Trading Platform** sets up and configures **Nginx** for the frontend server.
- ⚠️ **If ports 80 and 443 are closed** to the internet, obtaining an SSL certificate for `brokername.example.com` may not be possible.

---

### Option 2: Client Hosts DNS
- The client creates the **DNS record** on their own DNS server.
- The client sets up the **SSL connection** on their own web server.
- The **Trading Platform** team provides the **location path** and **proxy_pass** configuration.

---

### Option 3: SSH Tunnel (SSL-Friendly)
- A DNS record in the format `brokername.example.com` is created by the **Trading Platform** team.
- The DNS points to the **Trading Platform** server.
- All frontend traffic is **tunneled through SSH** to the frontend server.
- ✅ No issues with **SSL certificate issuance** in this configuration.

---

## Technical Requirements

# **Technical Requirements**

Below you will find the necessary permissions that should be granted in the **MT Manager API console** to establish a connection between our system and your trading platform.

This document also outlines the **technical requirements** for the **hardware and software** necessary to install our frontend and backend components.

---

## Whitelist of IPs

When we receive the credentials for the connection, we will provide the list of our IPs that we will use to connect to your **MT4/MT5 servers**.

> ⚠️ If our frontend/backend is installed in **Trading Platform**'s cloud, please add IPs provided to your **whitelist**.

---

## MT5 Connection and Permission Requirements

To integrate with MT5, the following are the **minimum requirements** for our system to go live:

- Export your **server settings** to a `.json` file (see Picture No. 3).
- The export must include:
  - `CommonConfig`
  - `TradeServer`
  - `OrdersRange`
  - `DealsRange`

> ⚠️ **Please ensure you remove any sensitive network configurations or IP addresses** from the `.json` file before sending it to us.

### Example `.json` file settings

![server-mode](i/tech-requirements-saas/json.webp)

- **Picture No.2** – Export Settings

![](i/tech-requirements-saas/export-01.webp)

- **Picture No.3** – Context Menu for Export

![](i/tech-requirements-saas/export-02.webp)

### Picture References

- **Picture No.4** – MT5 Permissions  
  *Required checkboxes are highlighted in red frames.*

![](i/tech-requirements-saas/mt5-permissions.webp)

---

## MT4 Connection Requirements

For MT4:

- Checking **"Connections"** is optional.
- You will have access to groups of accounts that you specify in the **Manager** interface.

- **Picture No.5** – MT4 Permissions

![](i/tech-requirements-saas/mt4-permissions.webp)

---

## Additional Permissions

If you would like to utilize **triggers** that allow direct control of **leverage** and **spreads** inside the MT platforms, **Admin permissions** are required along with a few additional checkboxes.

- **Picture No.5** – Additional Permissions  
  *Required checkboxes are highlighted in red frames.*

![](i/tech-requirements-saas/admin-permissions.webp)

---

## Installation Information

Your installation will use the **SaaS** model (**Trading Platform cloud-based deployment**).

- Both **frontend** and **backend** are hosted in the ExampleCorp cloud.
- Full IT infrastructure is provided, monitored, and maintained by the IndigoSoft team.

### Infrastructure Includes

- **Windows Server** (for backend)
- **Linux Server** (for frontend)
- **PostgreSQL Database** (100 GB)

> 🛠️ You do not need to prepare or maintain any of the hardware or software required for the Trading Platform installation—**we take care of everything**.

---

## The Overall Triggers Configuration

---
title: Trigger System
---

# **The Overall Triggers Configuration**

All triggers are situated in the **Risk Management** section of the left-side menu and are divided into subsections:

- **Automatic Control**  
- **Antifraud System**  
- **Event Triggers**  
- **Additional**  
- **Hedge Account**  
- **Broker Integration**  

Every trigger has a rule or several rules that you configure yourself. A rule is a set of parameters that defines the conditions of a trigger execution.

---

## **The Main Requirements in the Rules**

**Requirement 1:** Accounts, account groups, or symbol groups must be defined in the rule of the trigger. Otherwise, the trigger does not operate. The only exception is the **Accounts Event** trigger.

**Requirement 2:** Two identical accounts or groups of accounts cannot be included in different rules of the same trigger. The only exception is the **Accounts Event** trigger.

---

## **How to Set Up Rules of the Trigger?**

**Step 1:** Select one of the subsections of the trigger and press **“Configure.”**

![server-mode](i/triggers-configuration/triggers-a.webp)

**Step 2:** Select a server for which you are configuring the rule, press **“Add Rule”** (it will appear on the list of rules) or press the **“Edit”** button to edit an existing rule.

![server-mode](i/triggers-configuration/triggers-b.webp)

**Step 3:** Set the parameters in the opened window.

- Enter **“Rule Name.”**  
- Turn on the **“Active”** button.  
- Choose the level of disturbance. This helps you differentiate between important and informative notifications. The level of disturbance has 3 types of notifications:  
  - **Critical**: An intensive audible signal with a red color notification. The sound is played continuously for unread alerts and every 5 minutes for read but unprocessed notifications.  
  - **Warning**: A moderate audible signal played once. The sound is played every 5 minutes for unread or unprocessed notifications.  
  - **Notice**: A moderate audible signal played once. The sound is played every 5 minutes for unread or unprocessed notifications.  

Notifications from this trigger will be colored according to these settings.

- Make sure to enter the accounts, groups of accounts, or groups of symbols that will apply for the rule. The trigger doesn’t react if accounts, groups of accounts, symbols, or groups are not defined.

- Press the **Save Changes** button

![server-mode](i/triggers-configuration/triggers-c.webp)

You can see the outcome of saving the rules:

- **In Process** - The green button is spinning, and the "Edit" button is inactive; the rule cannot be edited.  
- **Done** - The green button has stopped spinning, and the "Edit" button is active; the rule can be edited.

![server-mode](i/triggers-configuration/triggers-d.webp)

---

## Permission Management System

# **Permission Management System**

Trading Platform has a highly flexible permissions management system that allows you to categorize user permissions by offices, servers, and functions within the system.  

Navigate to **Administration** – **Users** on the left-side menu to manage permissions. You will find two important buttons: **Add User** and **Permissions**.

![server-mode](i/user-permissions/user-permissions-a.webp)

---

## **Adding a New User**

Press the **Add User** button to add a new user.  
Enter the name, e-mail, and an expiration date (if necessary). Press the **Send Invite** button. A user will receive the activation link by email, which is valid for 24 hours.

![server-mode](i/user-permissions/user-permission-b.webp)

---

## **Managing Permissions**

Click the **Permissions** button to add or remove permissions.  
Scroll down to find the following blocks:  

- **Basic UI Features**  
- **Site Administration**  
- **Accounts**  
- **A-Book**  
- **B-Book**  
- **Dealing**  
- **Risk Management**  
- **Dealing Desk Operations**  
- **Bonuses**  
- **Dealing Corrections**  
- **Quotes Monitoring**  
- **Dashboards**  

Then, use the switch to activate or deactivate specific sections. You can also manage permissions using the **Enable All** or **Disable All** buttons.

![server-mode](i/user-permissions/user-permission-c.webp)

---

# general

## Welcome to Trading Platform

# **Welcome to Trading Platform**

Our mission is to provide innovative software solutions that reduce your workload, increase transparency, and enhance PnL. We believe that teamwork is essential for achieving great results.

Below you will find information about the **Trading Platform** interface and its basic settings.

Please use the relevant section on the left panel to navigate to the desired chapter.

![Main page](i/middlesize.webp)

### [How to Register a New User](/general-information/new-user-registration)

### [Basic Navigation](/general-information/base-page)

### [Basic Configuraion](general-information/main-settings/)

### [How to Process Notifications](/general-information/notifications)

### [Trigger Configuration](/general-information/general-information-and-navigation-system)

### [How to Manage User Permissions](/general-information/user-permissions)

---

## Untitled



---

## Untitled



---

## Untitled



---

## Untitled



---

## Untitled



---

## Untitled



---

## Untitled



---

## Untitled

https://wiki.example.com/e/ru/4dep/12b/qa/regulations

---

## Untitled



---

## Untitled



---

# Reporting System

## Reporting System

# **Reporting System**

Historical data is just as important for a broker as current market conditions, which is why we have developed the concept of historical reports — **Reporting**. By clicking on the reporting button, the broker is directed to an external system **Metabase** where all historical data is stored and accumulated.

Our reporting collection includes over forty different reports and dashboards. Daily, weekly, and monthly PnL, reports by accounts, account groups, and instrument groups — these are just a small fraction of what can be found. Thanks to the flexible filtering system, you can access almost any subset of historical data. Additionally, with the export function, reports can be downloaded in a convenient format for further analysis.

If you require a specific report that is not currently available in our collection, just let us know. We have all the necessary data from your dealing desk, and it will be no trouble for us to provide you with the required information in the format that best suits your needs.

![](i/reporting-menu.webp)

**Note:** Historical reporting does not appear instantly after the installation of **Trading Platform**.

Please allow at least one day for changes to appear for a symbol, and other periods will adjust accordingly once enough historical data has accumulated for a week or month. This means that initially, larger periods will be calculated from the start of the history. For example, once a week’s data is accumulated, the six-month period will begin from that point.

## Reports List

![](i/reporting-chart.webp)

## **Out-of-the-box Reports**

| **N** | **Name of the report** | **Comments** |
| - | - | - |
| 1. | **Year-to-date P&L Report** | This is a report showing your cumulative P&L. Time filter should be used to set the start date. |
| 2. | **Daily P&L** | This report is a sum of your daily closed profit and the difference in floating (unrealized) profit between a given day and the day before. Daily P&L = Closed P&L + Change Of Float - Commissions. |
| 3. | **Floating P&L** | Your daily floating PnL for all open positions including swaps. |
| 4. | **Closed P&L** | This report shows your daily closed (realized) profit. It includes commissions and swaps. |
| 5. | **Change Of Float** | This report shows the given day's floating PnL. Floating P&L (current date) - Floating P&L (previous day) = Change of Float (current date) |
| 6. | **Year-to-daily Total Volume, lots** | This is your cumulative report showing the total volume in lots. Time filter should be used to set the start date. |
| 7. | **Year-to-daily Open Volume, lots** | This is your cumulative report showing opened volume in lots. Time filter should be used to set the start date. |
| 8. | **Year-to-Daily Closed Volume, Lots** | This is your cumulative report showing closed volume in lots. Time filter should be used to set the start date. |
| 9. | **Daily Total Volume, Lots** | This is your daily total volume in lots. |
| 10. | **Daily Opened Volume, Lots** | This is your daily opened volume in lots. |
| 11. | **Daily Closed Volume, Lots** | This is your daily closed volume in lots. |
| 12. | **Daily Total Volume, USD** | This is your daily total volume in USD. |
| 13. | **Daily Opened Volume, USD** | This is your daily opened volume in USD. |
| 14. | **Daily Closed Volume, USD** | This is your daily closed volume in USD. |
| 15. | **Daily Money Flow Report, USD** | This report shows the difference between deposit and withdrawal. |
| 16. | **Daily Deposits Report, USD** | This report shows your daily total deposit. |
| 17. | **Daily Withdrawals Report, USD** | This report shows your daily withdrawal. |
| 18. | **Daily Active Accounts** | This report shows the accounts that made trades or balance transactions. |
| 19. | **Balance, USD** | This report shows the total balance at EOD. |
| 20. | **Daily Commissions, USD** | This report shows the daily agent commissions. |
| 21. | **Equity, USD** | This report shows the total equity at EOD. |
| 22. | **Daily Swaps, USD** | This report shows your total swaps. |
| 23. | **Clients Ended In SO** | This report shows the number of accounts ended with SO. |
| 24. | **Daily Negative Balance Adjustments, USD** | This report shows your daily adjustments of negative balances. |

---

# Risk Management

## CID Control

# **CID Control**

## General Information

The **CID Control** trigger is designed to detect when a trader logs into the trading platform using a specific **Computer Identification Number (CID)**.  

- When the system detects a login from a **specified CID list**, a **notification is generated** for the user.  
- If the **Auto Block Trade** option is enabled, **Trading Platform** can automatically block trading on affected accounts.  

Additionally, the trigger can be used to **identify accounts with multiple CIDs**. To reduce excessive notifications, the system allows checking **Total Realized Profit** and **Minimum Realized Profit** of detected accounts before generating a notification.

---

## **Menu Navigation**

The **CID Control** trigger is located under:  
**Risk Management** → **Additional**  

![](i/cid_control/navigation.webp)

---

Trading Platform's Trigger Rules System

Trading Platform's Notification System

## **Settings Overview**

![](i/cid_control/settings_1.webp)  
![](i/cid_control/settings_2.webp)  

### **Available Settings**

| **Parameter Name** | **Description** |
| --- | --- |
| **Rule Name** | Allows users to assign a custom name to each rule. |
| **Detect Several CIDs** | Triggers a notification if the specified number of CIDs is detected on a single account. Enabling this option reveals additional settings. |
| **CID Count** | The number of different CIDs on a single account that should trigger the notification. |
| **Check Total Realized Profit** | Generates a notification only if the **realized profit** of a detected account **exceeds a specified amount**. |
| **Minimum Realized Profit (USD)** | Filters accounts by monitoring only those with a minimum specified **realized profit** in USD. |
| **Auto Block Trade** | If enabled, trading on the account is automatically **blocked** when a connection from a specified CID is detected. |
| **CID** | Defines the **Unique Computer Identification Number (CID)** that the system should monitor. |
| **Excluded Accounts** | Lists accounts that should be excluded from trigger monitoring. Start typing an account number in the **"Select Account"** field, then choose from the dropdown list. |

---

## **Permissions Required**

This trigger requires specific **Manager API** permissions.

| **Permissions in MT4** | **Permissions in MT5** |
| --- | --- |
| ![](i/cid_control/MT4.webp) | ![](i/cid_control/MT5.webp) |

---

## **Trigger Logic**

The trigger continuously **monitors account authentication** on the trading server and verifies each account’s **Computer Identification Number (CID)**.

✅ **If a detected CID matches the configured list**, a **notification** is generated.  
✅ **If "Detect Several CIDs" mode is enabled**, a notification is triggered when a single account is used with multiple CIDs.  
✅ **If "Auto Block Trade" is enabled**, trading on affected accounts is blocked automatically.

---

## Failed Stop Outs

# **Failed Stop Outs**  

## **General Information**  

The **Failed Stop Outs** trigger helps brokers detect accounts that have reached a **stop-out level** with **zero or negative equity** but **still have open trades**. Once detected, the system generates a **notification**.

---

## **Menu Navigation**  

📌 You can find the **Failed Stop Outs** trigger under:  
**Risk Management** → **Additional**  

![Failed Stop Outs](i/failed-stop-outs/failed-stop-outs.webp)  

---

## **Edit Settings**  

![Failed Stop Outs Settings](i/failed-stop-outs/failed-stop-outs-settings.webp)  

| **Parameter Name** | **Description** |
| - | - |
| **Excluded Accounts** | Specify accounts that should be excluded from monitoring. |

---

## **Permissions**  

| **MT4** | **MT5** |
| - | - |
| No specific permissions required. | No specific permissions required. |

---

## **Trigger Logic**  

1. The trigger **monitors accounts every minute**.
2. For each account, the system **calculates actual equity**.
3. If **equity is below 0** and there are **open positions**, the trigger **generates a notification**.
4. If the account remains in **negative equity for 1 hour**, a **new notification is generated**.

---

## Invalid Balances

# **Invalid Balances**

## General Information

The **Invalid Balances** trigger performs a **weekly check** of account balances to detect discrepancies that may arise due to **manual transaction changes**.  
For example, an issue may occur if a dealer **removes orders** without properly adjusting the account balance.

- If **Automatic Balance Correction** is enabled, the system will **automatically fix** detected mismatches.  
- If **Automatic Balance Correction** is disabled, a **notification** is sent to the dealer for manual confirmation before correction.

---

## **Menu Navigation**

The **Invalid Balances** trigger is located under:  
📂 **Risk Management** → **Additional**  

![](i/invalid_balances/navi.webp)

---

Trading Platform's Trigger Rules System

Trading Platform's Notification System

## **Settings Overview**

![](i/invalid_balances/settings.webp)

### **Available Settings**

| **Parameter Name** | **Description** |
| --- | --- |
| **Automatic Balance Correction** | Enables or disables automatic balance correction. |
| **Minimal Detectable Mismatch (USD)** | If the detected mismatch is **below** this value, no notification will be generated. |
| **Weekday** | The **day** when the weekly balance check will be performed. |
| **Hour** | The **time** when the balance check will start. |

---

## **Permissions Required**

🛠 **MT5:** `"Accountant (deposit/withdraw)"` permission required.  
🛠 **MT4:** **Admin** permission required.

| **MT4** | **MT5** |
| --- | --- |
| ![](i/invalid_balances/mt4_01.webp)![](i/invalid_balances/mt4_02.webp)![](i/invalid_balances/mt4_03.webp) | ![](i/invalid_balances/mt5_01.webp)![](i/invalid_balances/mt5_02.webp) |

---

## **Trigger Logic**

📌 **The trigger runs a weekly check** on account balances at the **specified day and time**.  
📌 **It verifies balances** by comparing all executed orders of the account.  
📌 If an incorrect balance is detected:  

- ✅ **If automation is ON**, the balance is **automatically corrected**.  
- 🚨 **If automation is OFF**, a **notification** is generated for dealer approval.  

The system utilizes **MetaQuotes' built-in features** to correct the balance.

---

## IP Control

# **IP Control**

## General Information

The **IP Control** trigger is designed to detect logins from specific **IP addresses**.  
When a trader logs into the trading platform from an IP listed in the settings, the system generates a **notification** for the user.

This feature helps dealers **identify** situations where connections originate from specific **corporate IPs**, such as those belonging to an **internal broker's network**.

Additionally, the trigger can **detect accounts using multiple IPs**, allowing brokers to monitor unusual login patterns.

---

## **Menu Navigation**

The **IP Control** trigger is located under:  
**Risk Management** → **Additional**  

![](i/ip_control/navigation.webp)

---

## **Settings Overview**

![](i/ip_control/settings_1.webp)  
![](i/ip_control/settings_2.webp)  

The following settings can be applied to the rule:

| **Parameter Name** | **Description** | 
| --- | --- |
| **Add IP** | Specify **IPs** to be monitored. You can enter: <br /> - A **single IP** (e.g., `127.0.0.1`) <br /> - An **IP range** (e.g., `127.0.0.1-20` or `127.0.0.1/20`). |
| **Detect Several IPs** | If enabled, the trigger sends a **notification** when an account is accessed from multiple IPs. Additional parameters appear when this option is activated. |
| **IP Count** | The **number of IPs** that must be detected on a single account before triggering a notification. |
| **Excluded Account Groups** | Specify **account groups** that should be **excluded** from monitoring. |
| **Excluded Accounts** | Specify **individual accounts** that should be **excluded** from monitoring. |

---

## **Permissions**

| **MT4** | **MT5** |
| --- | --- |
| No specific permissions required. | No specific permissions required. |

---

## **Trigger Logic**

📌 The system **checks the IP address** of traders logged into the trading platform.  
📌 If a login **matches an IP** specified in the settings, a **notification is triggered**.  
📌 If **multiple IP detection** is enabled, a notification is generated **when an account logs in from a specified number of different IPs**.

---

## Mini Accounts

# **Mini Accounts**  

## **General Information**  

The **Mini Accounts** trigger detects **cent accounts** with **equity exceeding a specified threshold** and notifies dealers accordingly.

---

## **Menu Navigation**  

📌 You can find the **Mini Accounts** trigger under:  
**Risk Management** → **Additional**  

![Mini Accounts](i/mini-accounts/mini-accounts.webp)  

---

## **Edit Settings**  

![Mini Accounts Settings](i/mini-accounts/mini-accounts-settings.webp)  

| **Parameter Name** | **Description** |
| - | - |
| **Active** | Enables/disables the trigger. |
| **Auto Block Trade** | Automates account blocking if enabled. |
| **Equity Threshold, USD** | Sets the threshold value that triggers an alert. |
| **Excluded Accounts** | Lists accounts excluded from monitoring. |

---

## **Permissions Required by the Trigger**  

The trigger does **not** require specific permissions in the **Manager API**.

| **MT5** | **MT4** |
| - | - |
| No specific permissions required. | No specific permissions required. |

---

## **Trigger Logic**  

1. The system **monitors mini accounts** in real-time.  
2. If an account’s **equity exceeds the threshold**, the trigger **generates a notification**.  
3. If **Auto Block Trade** is **enabled**, the system **automatically blocks trading** for the detected account.  
4. **Accounts with open positions are not blocked.**  
5. **New mini account groups added to the MT server are automatically detected** and displayed in the system.

---

## Overdue Credits

# **Overdue Credits**

## General Information

The trigger is designed to detect accounts with overdue credits and notify the dealer accordingly. If the automation of the trigger is ON, the trigger detects an overdue credit and creates a credit out order (cancels the credit) from trader's balance alongside a notification.

## Menu Navigation

📌 You can find the **Overdue Credits** trigger under:  
**Risk Management** → **Additional**

![](i/overdue-credits/overdue-credits.webp)

## Edit Settings

![](i/overdue-credits/overdue-credits-settings.webp)

| **Parameter name** | **Description** |
| --- | --- |
| **Auto Credit Out** | The trigger automation. If enabled, the trigger automatically createsa credit out order. |
| **Excluded Accounts** | The list of accounts excluded from monitoring. |
| **Excluded Accounts Groups** | The list of accounts groups excluded from monitoring. |

## Permissions

| **MT4** | **MT5** |
| --- | --- |
| No specific permissions are required. | No specific permissions are required. |

## Trigger Logic

Once a minute, the trigger searches for overdue credits and notifies the dealer about them if found. If the dealer hides the notification and the credit situation does not change, the trigger shows its notification another time the day after. If automation is enabled, the trigger generates a notification and automatically creates a credit out order.

---

## Rejected Orders

# **Rejected Orders**  

## **General Information**  

The **Rejected Orders** trigger monitors the **MT4 error log** for **rejected trades**.  
If any rejected trades are detected, the trigger **generates a notification**.  

⏳ **Checks are performed every 5 minutes.**  

---

## **Menu Navigation**  

📌 You can find the **Rejected Orders** trigger under:  
**Risk Management** → **Additional**  

![Rejected Orders](i/rejected-orders/rejected-orders.webp)  

---

## **Edit Settings**  

![Rejected Orders Settings](i/rejected-orders/rejected-orders-settings.webp)  

| **Parameter Name** | **Description** |
| --- | --- |
| **Excluded Accounts** | The list of accounts excluded from monitoring. |

---

## **Trigger Logic**  

1. The trigger **scans the MT4 error log** for rejected trade attempts.  
2. If an account **places an order that gets rejected**, **a notification is generated**.  
3. The trigger **runs checks every 5 minutes** to ensure real-time detection.  
4. **Excluded accounts** are ignored by the trigger.

---

## Stealing Quotes

# **Stealing Quotes**

## General Information

The **Stealing Quotes** trigger is designed to detect trading accounts that **establish a Datafeed Center or gateway connection** to the broker’s trading server to obtain (steal) quotes.  

Once per hour, this trigger reads **MT logs** and identifies the **account IDs** involved in such activities.

---

## **Menu Navigation**

The **Stealing Quotes** trigger is located under:  
**Risk Management** → **Additional**  

![](i/stealing_quotes/navi.webp)

---

## **Settings Overview**

![](i/stealing_quotes/settings.webp)

The following setting is available for this trigger:

| **Parameter Name** | **Description** |
| --- | --- |
| **Excluded Accounts** | Specifies a list of accounts that should be **ignored** by the trigger. |

---

## **Permissions Required by the Trigger**

To function properly, this trigger requires **specific permissions** in the **Manager API**:

| **MT5 Permissions** | **MT4 Permissions** |
| --- | --- |
| **Permission to access server logs.** | *Not applicable.* |

---

## **Trigger Logic**

📌 **Detection Frequency:** Once per hour, the trigger **analyzes MT5 logs** to detect logins that attempt to establish **Datafeed Center or gateway connections** to the trading server.  
📌 **Identified Accounts:** If any **suspicious logins** are found, the **account IDs** are included in a **trigger notification**.  
📌 **Repeated Alerts:** If the dealer does not **process the notification**, the trigger **generates another notification after 24 hours**.

---

## Stop Out Abusers

# **Stop Out Abusers**  

## **General Information**  

The **Stop Out Abusers** trigger detects accounts with **specified negative balances** and notifies a dealer accordingly.  
It helps **reduce the dealing desk's workload** and **identify potential stop-out compensation abusers**.

---

## **Menu Navigation**  

📌 You can find the **Stop Out Abusers** trigger under:  
**Risk Management** → **Additional**  

![Stop Out Abusers](i/stop-out-abusers/stop-out-abusers.webp)  

---

## **Edit Settings**  

![Stop Out Abusers Settings](i/stop-out-abusers/stop-out-abusers-settings.webp)  

| **Parameter Name** | **Description** |
| --- | --- |
| **Skip accounts with pending orders** | The trigger will **not** generate a notification if the account has pending orders. |
| **Stop out threshold, USD** | The trigger will generate a notification for accounts whose **negative balance** is equal to or greater than the specified value. |
| **Excluded Accounts** | The list of accounts excluded from monitoring. |
| **Excluded Account Groups** | The list of account groups excluded from monitoring. |

---

## **Permissions**  

The trigger does **not** require specific permissions in the **Manager API**.

| **MT5** | **MT4** |
| --- | --- |
| No specific permissions required. | No specific permissions required. |

---

## **Trigger Logic**  

1. The system **checks for negative balances every minute**.  
2. If an account’s **negative balance meets or exceeds the threshold**, the trigger **generates a notification**.  
3. If the account has **pending orders**, the notification is **not** generated (if the corresponding setting is enabled).  
4. **Excluded accounts and groups are ignored** by the trigger.

---

## Trade Request Flood

# **Trade Request Flood**

## **General Information**

The **Trade Request Flood** trigger is designed to detect trading accounts that **send an excessive number of requests** (bad traffic) to the trade server. Upon detection, it generates a **notification for the dealer**.  

📌 If **automation is enabled**, the trigger can **automatically block trading** on the account (*requires trading server permissions*).  

---

## **Menu Navigation**

The **Trade Request Flood** trigger is located under:  
**Risk Management** → **Additional**  

![](i/trade-request-flood/trade-request-flood.webp)

---

## **Settings Overview**

![](i/trade-request-flood/flood-settings.webp)

### **Available Settings**

| **Parameter Name** | **Description** |
| --- | --- |
| **Rule Name** | Assign a specific name to the rule. |
| **Auto Block Trade** | Enables **automatic account blocking** if excessive requests are detected. |
| **Block Time Interval (seconds)** | Defines the duration for which trading is **blocked** after a violation. |
| **Minimum Number of Session Requests** | The **minimum number of trade requests** required to **trigger an alert**. |
| **Count of Trades** | The **threshold** for the number of trades executed over a specified period. |
| **Time Interval of Requests (seconds)** | The **time window** within which trade requests are counted. |
| **Reasons** | Activates the trigger for orders with selected reasons. |
| **Account Groups** | Specify account groups for monitoring. |
| **Included accounts** | Specify individual accounts for monitoring. |

---

## **Permissions Required**

| **MT4** | **MT5** |
| --- | --- |
| No specific permissions required. | No specific permissions required. |

---

## **Trigger Logic**

1. **Continuous Monitoring:** The system monitors trading accounts **in real-time** whenever orders are sent to the trade server.  
2. **Request Calculation:** The trigger **counts the number of orders** over the specified **time interval**.  
3. **Threshold Exceeded:** If the trade request count **exceeds the configured limit**, the system:  
   - **Generates a notification** for the dealer.  
   - If **automation is enabled**, **blocks trading** on the account.  

🚨 *If an account is blocked, it remains read only for the duration set in the "Block Time Interval" parameter.*

---

## Aggregated Accounts

# **Aggregated Accounts**  

## **General Information**  

The **Aggregated Accounts** section in Trading Platform allows brokers to **combine multiple actual accounts** into a **single virtual account profile** to view **aggregated metrics**.  

📌 This helps identify traders who **split their activities** across multiple accounts to:  
- **Optimize profits**  
- **Bypass restrictions**  
- **Manipulate trading conditions**  

---

## **Menu Navigation**  

You can find the **Aggregated Accounts** page in **Risk Management** section.  

![Aggregated Accounts](i/aggregated-accounts.webp)  

---

## **Aggregated Information**  

Users can **aggregate account data** based on various criteria, including:  

- **Logins**  
- **Names**  
- **Emails**  
- **Agents**  
- **CIDs**  
- **IP Addresses**  
- **ID Numbers**  
- **Account Groups**  
- **Countries**  

### **How to Use**  

1. **Start typing** the desired parameter.  
2. Matching **account numbers** will appear in the drop-down menu.  
3. **Select the required accounts** and click **"Aggregate"**.  
4. The system will generate a **"Virtual Profile"** with detailed analytics.  

---

## **Virtual Profile Tabs**  

The aggregated account profile includes multiple **data analysis tabs**:  

- **Trade** – Overview of trading activity.  
- **Graphs** – Visual representation of trading patterns.  
- **Exposure** – Open positions and risk analysis.  
- **Trade History** – Past transactions.  
- **Deposit History** – Account funding records.  
- **Issues History** – Log of detected trading issues.  
- **Bonus History** – Bonuses credited to the accounts.  
- **Comments** – Dealer notes and remarks.  

📌 **Quick Access Alternative**:
  
On the **Account Information** page, go to the **User Tracks** tab and click the **three-dot control button**.  

![Link to Aggregate](i/link-to-aggregate.webp)  

---

## **Saving Presets**  

📌 Users can **save filter parameters as a preset**, allowing for **quick access** to specific account groupings with **one click**.

---

## Achieved Profit

# **Achieved Profit**

## General Information  

The **Achieved Profit** trigger detects the **percentage of profit** a trader achieves while considering all deposit and withdrawal operations.  

📌 The Achieved Profit trigger allows you to create multiple rules for the same account or account group.
If several rules are triggered simultaneously, the rule with the highest Threshold value takes priority.

---

## **Menu Navigation**  

You can find the **Achieved Profit** trigger under:  
📌 **Risk Management** → **Anti-Fraud System**  

![](i/achieved-profit/achieved-profit.webp)  

---

## **Edit Settings ⚙️**  

![](i/achieved-profit/achieved-profit-settings.webp)  

### **Available Settings**  

| **Parameter Name** | **Description** |
| --- | --- |
| **Rule Name** | Assign a specific name to the rule. |
| **Minimum Equity, USD** | Set the **minimum account equity** in USD required for the trigger to activate. |
| **Profit, %** | Define the **profit percentage threshold** (e.g., **100% means the account has doubled**). |
| **Account Age Counter** | Set the **maximum number of days** the account must exist. |
| **Account Groups** | Select **account groups** to monitor. |
| **Accounts** | Enter specific **account numbers** to monitor. |

---

## **Permissions**  

| **MT4** | **MT5** |
| --- | --- |
| No specific permissions are required. | No specific permissions are required. |

---

## **Trigger Logic 🔍**  

The **Achieved Profit** trigger calculates profit based on the **trader’s own funds**. It examines **all deposit and withdrawal transactions** to determine the account's profit percentage.  

### **How It Works**  

1️⃣ **Establishing the "Base Point"**  
   - The trigger **analyzes all deposit and withdrawal transactions**.  
   - It sets a **Base Point** for profit calculation.  
   - **Withdrawals of trade profits do NOT lower the Base Point**, but **withdrawals of personal funds do**.  

2️⃣ **Trigger Activation**  
   - If the **profit percentage threshold is exceeded**, the trigger **generates a notification**.  
   - If the **account equity falls below the threshold**, the notification remains until handled.  

3️⃣ **Notification Handling & Updates**  
   - If the **trigger settings are modified**, all previous notifications that no longer match the new criteria are **automatically deleted**.  

---

🎯 **Key Takeaways:**  
✅ Monitors profit percentage based on **real trader funds**  
✅ **Ignores** profit withdrawals but **tracks** personal fund withdrawals  
✅ Alerts when profit exceeds a **defined threshold**  
✅ Supports **customizable account selection & age tracking**

---

## Affiliate Cheating

# **Affiliate Cheating**  

## **General Information**  

The **Affiliate Cheating** trigger detects **trader accounts abusing affiliate program vulnerabilities** to generate unfair profits. If such accounts are detected, the trigger **notifies the dealer** for review.  

---

## **Menu Navigation**  

📌 You can find the **Affiliate Cheating** trigger under:  
**Risk Management** → **Anti-Fraud System**  

![Affiliate Cheating](i/affiliate-cheating/affiliate-cheating.webp)  

---

## **Edit Settings**  

![Affiliate Cheating Settings](i/affiliate-cheating/affiliate-cheating-settings.webp)  

### **Configuration Options**  

| **Parameter Name** | **Description** |
| - | - |
| **Use Agent ID** | Process accounts with a specified Agent ID only. |
| **Minimum Affiliate Fee, USD** | The total **minimum affiliate fee** (in USD) gained by one agent required to trigger a notification. |
| **Lifetime of Deals, sec** | The **minimum trade duration** threshold used for analysis. |
| **Depth of Trade History, days** | The **history depth** (in days) analyzed by the trigger. |
| **Use Partnership Reward From SPREAD / TRADING VOLUMES** | Choose whether partnership rewards are calculated based on **spread** or **trading volume**. |

---

### **Settings for SPREAD-Based Partnership Reward**  

| **Parameter Name** | **Description** |
| - | - |
| **Payout Rate per One Spread for FOREX Instruments, %** | **Percentage-based** payout per spread for Forex instruments. |
| **Payout Rate per One Spread for Non-FOREX Instruments, %** | **Percentage-based** payout per spread for non-Forex instruments. |
| **Ratio in Spreads Between Partnership Reward and Profit, %** | The ratio (in %) between **partnership rewards and trader profits**. |

---

### **Settings for TRADING VOLUME-Based Partnership Reward**  

| **Parameter Name** | **Description** |
| - | - |
| **Payout Rate per One Lot for FOREX Instruments, USD** | **Fixed payout per lot** for Forex instruments (in USD). |
| **Payout Rate per One Lot for Non-FOREX Instruments, USD** | **Fixed payout per lot** for non-Forex instruments (in USD). |
| **Ratio Between Partnership Reward and Profit, %** | The ratio (in %) between **partnership rewards and trader profits**. |

---

### **Exclusions**  

| **Parameter Name** | **Description** |
| - | - |
| **Excluded Accounts Groups** | Specify **account groups** to be excluded from monitoring. |
| **Excluded Symbols Groups** | Specify **symbol groups** to be excluded from monitoring. |
| **Excluded Accounts** | Specify **individual accounts** to be excluded from monitoring. |

---

## **Trigger Logic**  

1. The trigger **analyzes the trade history** of each account.  
2. It **calculates trading volumes** and **partnership rewards**.  
3. If **any thresholds are exceeded**, such as:  
   - **Ratio between partnership reward and profit**  
   - **Ratio between partnership reward and deposit**  
   - **Ratio in spreads between partnership reward and profit**  
   
   🚨 **A notification is generated** for dealer to process.  
4. The notification **remains active** until processed by the dealer.

---

## Agent Commissions

# **Agent Commissions**  

## **General Information**  

The **Agent Commissions** trigger is designed to **manage agent commissions** based on the **lifetime of a trade**.  

---

## **Menu Navigation**  

📌 You can find the **Agent Commissions** trigger under:  
**Risk Management** → **Anti-Fraud System**  

![Agent Commissions](i/agent-commissions/agent-commissions.webp)  

---

## **Edit Settings**  

![Agent Commissions Settings](i/agent-commissions/agent-commissions-settings.webp)  

### **Configuration Options**  

| **Parameter Name** | **Description** |
| - | - |
| **Rule Name** | A user can assign a specific name to the rule. |
| **Auto Update Balance** | If set to **ON**, the trigger **automatically cancels agent commissions**. If set to **OFF**, the trigger **generates a notification** with an option to cancel the commission manually. |
| **Position Lifetime, sec** | If the trade **lifetime is less** than this threshold and the agent’s interest is accrued, the trigger will react. |
| **Accounts Groups** | Select which **account groups** should be monitored. |
| **Included Accounts** | Select **individual accounts** to be monitored. |

---

## **Permissions**  

| **MT4** | **MT5** |
| - | - |
| **Admin** | **Admin**<br/>![Permissions MT5](i/agent-commissions/permissions-mt5.webp) |
| | Two permissions should be **checked**:<br/>**Access accounts** and **Edit accounts**<br/>![Permissions MT5.1](i/agent-commissions/permissions-mt501.webp) |

---

## **Trigger Logic**  

- The **Position Lifetime** threshold defines the **maximum trade duration** required before agent commissions are canceled.  
- If a trade **closes before** the specified threshold, and agent commissions were accrued, the trigger **will react**.  
- **Reaction depends on the Auto Update Balance setting**:  
  - If **ON**, the trigger **automatically cancels commissions**.  
  - If **OFF**, it **generates a notification** with an option to cancel the commission manually.

---

## Sharp Deals

# **Sharp Deals**

## General Information  

The **Sharp Deals** trigger is designed to identify accounts that execute a **series of profitable transactions** under specific conditions.  

---

## **Menu Navigation**  

You can find the **Detect Sharp Deals** trigger under:  
**Risk Management** → **Anti-Fraud System**

![](i/detect-sharp-deals/sharp-deals.webp)  

---

## **Edit Settings ⚙️**  

![](i/detect-sharp-deals/sharp-deals-settings.webp)  

### **Available Settings**  

| **Parameter Name** | **Description** |
| --- | --- |
| **Rule Name** | Assign a specific name to the rule. |
| **Count of Sharp Deals** | Number of transactions required for the trigger to activate. |
| **Check profit/commission ratio** | Optional parameter. |
| **Profit/commission ratio** | Profit should be bigger specified number of times than the full cost of the opening position, which includes taxes and commissions. |
| **Profit** | Minimum order profit (in USD) required to trigger an alert. |
| **Order Life Time** | Maximum lifetime of a single position before it is considered for monitoring. |
| **Check Total PnL** | If enabled (**ON**), the trigger considers the total realized profit of the account. |
| **Minimum TOTAL PnL, USD** | The minimum total profit (in USD) to be taken into account. |
| **Periods** | Specify the exact time periods during which the trigger should be activated. |
| **Account Groups** | Specify account groups for monitoring. |
| **Included accounts** | Specify individual accounts for monitoring. |

---

## **Permissions**  

| **MT4** | **MT5** |
| --- | --- |
| No specific permissions are required. | No specific permissions are required. |

---

## **Trigger Logic 🔍**  

The trigger **monitors and remembers** successful transactions, analyzing them at the moment of closing.  

### **Trigger Activation Conditions:**  

✅ **Order lifetime** does not exceed the **Order Life Time** parameter.  

✅ **Order profit exceeds** one of the following thresholds:  

- **Profit in USD** exceeds the **Cost of Trading** parameter.  
- **Profit in USD** exceeds the **Profit in USD** parameter.  

✅ If the number of successful transactions in the current session **equals or exceeds** the **Count of Sharp Deals** setting, the trigger generates a **notification** with details of the detected transactions and the corresponding accounts.  

---

🎯 **Key Takeaways:**  
✅ Monitors **profitable trades** with short lifetimes.  
✅ Ensures **profits exceed trade costs** before triggering.  
✅ Tracks **multiple transactions** before generating an alert.  
✅ Supports **account-specific and group exclusions** for flexibility.

---

## Large Volume by Account

# **Large Volume by Account**

## **General Information**  

The **Large Volume by Account** trigger detects accounts with **high trading volumes** in their **open trades**.  

📌 **Real-time monitoring:** The trigger continuously **analyzes trade volumes** and instantly **generates a notification** when an account exceeds the predefined threshold.  

---

## **Menu Navigation**  

You can find the **Large Volume by Account** trigger under:  
**Risk Management** → **Anti-Fraud System**

![](i/large-volumes-by-account/large-volumes-by-account.webp)  

---

## **Edit Settings ⚙️**  

![](i/large-volumes-by-account/large-volumes-settings.webp)  

### **Available Settings**  

| **Parameter Name** | **Description** |
| --- | --- |
| **Check Trading Volumes** | Choose how the trigger evaluates trading volume: **in Lots or USD.** |
| **Minimum Volume** | The **minimum total volume** of all open trades required to generate a notification. |
| **Custom Settings for Account** | Define **specific accounts** that should be monitored with custom settings. |
| **Excluded Accounts** | List of accounts **excluded from monitoring.** |

---

## **Permissions**  

| **MT4** | **MT5** |
| --- | --- |
| No specific permissions are required. | No specific permissions are required. |

---

## **Trigger Logic 🔍**  

The trigger starts monitoring orders when they are being pumped by the trade server.

For newly created orders of an account, the trigger checks the total volume of opened orders (in USD or in Lots) so that they are not exceeding the threshold level specified in the settings. In case the minimue volume exceeds the threshold level, the trigger generates a notification. The notification will remain relevant until it’s processed by the dealer.

---

## Large Volume by Order

# **Large Volume by Order**

## **General Information**  

The **Large Volume by Order** trigger detects **individual trades** with **large volumes** in **real-time.**  

📌 **Instant alerts:** As soon as an order **exceeds the predefined volume threshold**, a notification is generated.  

---

## **Menu Navigation**  

📌 **Risk Management** → **Anti-Fraud System**  

![](i/large-volumes-by-order/large-volumes-by-order.webp)  

---

## **Edit Settings ⚙️**  

![](i/large-volumes-by-order/large-volumes-by-order-settings.webp)  

### **Available Settings**  

| **Parameter Name** | **Description** |
| --- | --- |
| **Rule Name** | Assign a **custom name** to the rule. |
| **Check Trading Volumes (USD or Lots)** | Select the **unit of measurement** (USD or Lots) for trade volume analysis. |
| **Minimum Volume (USD or Lots)** | Set the **minimum trade volume** required for the trigger to react. |
| **Symbols Groups** | Specify **groups of trading instruments** to monitor. |
| **Included Symbols** | Select **specific trading symbols** for monitoring. |

---

## **Permissions**  

| **MT4** | **MT5** |
| --- | --- |
| No specific permissions are required. | No specific permissions are required. |

---

## **Trigger Logic 🔍**  

### **How It Works:**  

1️⃣ The trigger **monitors new trade orders** in real-time as they are processed by the trading server.  

2️⃣ It checks if the **order volume** (in USD or Lots) **exceeds the predefined threshold.**  

3️⃣ **If the trade volume surpasses the limit,** the trigger **immediately generates a notification.**  

4️⃣ **The notification stays active** until it is processed by the dealer.  

---

🎯 **Key Takeaways:**  
✅ **Instant detection** of **large-volume trades.**  
✅ **Flexible volume settings** (monitor in **USD or Lots**).  
✅ **Targeted monitoring** with **symbol group and individual symbol selection.**  
✅ **Essential anti-fraud tool** for detecting potential high-risk trades.

---

## Latency Arbitrage

# **Latency Arbitrage**

## **General Information**  

The **Latency Arbitrage** trigger detects and alerts brokers about **profitable trades executed during price feed gaps** (missing quotes in the trading platform).  

📌 **Purpose:** Identifies traders exploiting delayed market data for unfair advantages.  

---

## **Menu Navigation**  

📌 **Risk Management** → **Anti-Fraud System**  

![](i/latency-arbitrage/latency-arbitrage.webp)  

---

## **Edit Settings ⚙️**  

![](i/latency-arbitrage/latency-arbitrage-settings.webp)  

### **Available Settings**  

| **Parameter Name** | **Description** |
| --- | --- |
| **Gap, Seconds** | Defines the **minimum time between ticks** that qualifies as a price gap. |
| **Profit, USD** | The **minimum profit** required for a trade to be considered in the trigger. |
| **Check Total Realized PnL** | Enables/disables total realized profit monitoring. |
| **Minimum Total Realized PnL, USD** | The **minimum total profit** required for the trigger to react. |
| **Maximum Duration of Deals, Minutes** | The **maximum trade lifetime** to be considered as latency arbitrage. |
| **Excluded Account Groups** | List of **account groups** excluded from monitoring. |
| **Excluded Symbol Groups** | List of **trading symbols** excluded from monitoring. |

---

## **Permissions**  

| **MT4** | **MT5** |
| --- | --- |
| No specific permissions are required. | No specific permissions are required. |

---

## **Trigger Logic 🔍**  

### **How It Works:**  

1️⃣ The trigger **monitors price feed gaps** where **no quotes were available** for an extended time.  

2️⃣ If a trade is **opened during a gap period**, it is flagged for monitoring.  

3️⃣ If the trade is **closed within the time limit** set by **Maximum Duration of Deals**, it is further analyzed.  

4️⃣ If the **profit exceeds** the **Profit in USD** threshold, a **notification is generated.**  

5️⃣ If a trade **remains open longer than the threshold**, it is **removed from monitoring** (not considered latency arbitrage).  

---

🎯 **Key Takeaways:**  
✅ **Detects traders exploiting price feed gaps.**  
✅ **Customizable profit & duration thresholds.**  
✅ **Filters out long-term trades to prevent false alerts.**  
✅ **Essential anti-fraud tool for brokers.**

---

## New Rates Absence

# **New Rates Absence**  

## **General Information**  

The **New Rates Absence** semaphore monitors the consistency of the **quotes flow**. If the **price feed of a trading symbol** is missing for a specified period, the semaphore **generates a notification**.  

🔹 The semaphore can be configured **individually** for:  
- **All symbols**  
- **Groups of symbols**  
- **Single trading symbols**  
- Symbols can also be **excluded** from the semaphore coverage.  

---

## **Menu Navigation**  

📌 You can find the **New Rates Absence** trigger under:  
**Risk Management** → **Anti-Fraud System**  

![New Rates Absence](i/new-rates/new-rates.webp)  

---

## **Edit Settings**  

![New Rates Absence Settings](i/new-rates/new-rates-settings.webp)  

### **Configuration Options**  

- **Control Individual Symbols**:  
  - Enabling this switch **automatically applies monitoring to all symbols**.  
  - When enabled, **symbol-specific settings become unavailable**.  
- **Custom Symbol & Group Selection**:  
  - Users can **manually add specific symbols or groups** for monitoring.  
- **Session Type Selection**:  
  - Users must **define which session type** to analyze:  
    - **Quote Session** – The period when the terminal **receives quotes**.  
    - **Trade Session** – The period when trading is **allowed**.  
  - The **quoting session** is typically **longer than or equal to** the trading session.  

### **Semaphore Modes**  

- Two monitoring modes can be configured:  
  1. **Daytime Mode**  
  2. **Nighttime Mode**  
- Each mode supports **two types of notifications**:  
  - **Warning**  
  - **Alert**  
- Users must **specify the desired time interval (in seconds)** for each notification type.  

---

## **Notifications**  

The notifications generated by the semaphore can be found by clicking the ⚡ **Lightning** button at the top right of the screen.  

![Lightning Button](i/new-rates/lightning.webp)  
![New Rates Alert](i/new-rates/new-rates-alert.webp)  

### **Notification Options**  

| **Parameter Name** | **Description** |
| --- | --- |
| **Open Settings** | Direct link to the semaphore settings. |
| **Ignore Symbol** | Excludes the symbol from monitoring. |

---

## **Semaphore Logic**  

If the **specified timeout for quotes** is exceeded, the semaphore **generates a notification** for the dealer.

---

## Orders Execution

# **Orders Execution**  

## **General Information**  

The **Orders Execution** semaphore ensures the **consistency of order execution** on the trading server.  
🔹 If **order execution stops** for a specified period, the semaphore **generates a notification**.  

---

## **Menu Navigation**  

📌 You can find the **Orders Execution** trigger under:  
**Risk Management** → **Anti-Fraud System**  

![Orders Execution](i/orders-execution/orders-execution.webp)  

---

## **Edit Settings**  

![Orders Execution Settings](i/orders-execution/orders-execution-settings.webp)  

### **Configuration Options**  

- The semaphore allows **two different monitoring modes**:  
  1. **Daytime Mode**  
  2. **Nighttime Mode**  
- **Threshold Setting**:  
  - Define the **daytime hours** threshold.  
- **Notification Intervals**:  
  - Each mode supports **two types of alerts**:  
    - **Warning**  
    - **Alert**  
- **Weekend Mode**:  
  - Additional **weekend mode settings** are available for the semaphore.  

---

## **Notifications**  

The notifications generated by the semaphore can be accessed by clicking the ⚡ **Lightning** button at the top right of the screen.  

| **Parameter Name** | **Description** |
| --- | --- |
| **Open Settings** | Direct link to the semaphore settings. |

---

## **Semaphore Logic**  

If the **specified timeout for order execution** is exceeded, the semaphore **generates a notification** for the dealer.

---

## Scalpers HFT

# **Scalpers HFT**  

## **General Information**  

The **Scalpers HFT** trigger is designed to **detect high-frequency trading (HFT) scalping activities in real-time**. Unlike standard trading strategies where positions are held for extended periods, scalping involves opening and closing multiple trades **within seconds** to capture small price movements (pips).  

📌 **Key Features:**  
✅ **Real-time detection** of scalping patterns  
✅ **Threshold-based monitoring** to prevent false positives  
✅ **Customizable filters** for accounts, groups, and session PnL  

---

## **Menu Navigation**  

You can find the **Scalpers HFT** trigger under:  
**Risk Management** → **Anti-Fraud System**  

![](i/scalpers-hft/scalpers.webp)  

---

## **Edit Settings ⚙️**  

![](i/scalpers-hft/scalpers-settings.webp)  

| **Parameter Name** | **Description** |
| --- | --- |
| **Number of HFT Deals** | The minimum number of trades required for the trigger to activate. |
| **Interval (sec)** | The maximum lifetime of each trade (in seconds) before being flagged as HFT. |
| **Check Total Profit of Detected HFT Deals** | If enabled, the trigger verifies whether the total profit from detected HFT deals exceeds a specified threshold. |
| **Total Profit of Detected HFT Deals (USD)** | The profit threshold (in USD) that, if exceeded, triggers a notification. |
| **Check TOTAL PnL (USD)** | Enables or disables total realized PnL monitoring. |
| **Minimum TOTAL PnL (USD)** | The minimum total realized profit (since account registration) required for the trigger to activate. |
| **Use Session PnL** | Enables or disables monitoring of session-based PnL. |
| **Minimum Session Profit (USD)** | The minimum profit in the current session required for the trigger to react. |
| **Reason** | The trigger activates only for orders with the selected reason. |
| **Accounts Groups** | Specify which account groups should be monitored. |
| **Accounts** | Specify individual accounts to be monitored. |

---

## **Permissions 🛡️**  

| **MT4** | **MT5** |
| --- | --- |
| No specific permissions required. | No specific permissions required. |

---

## **Trigger Logic 🔎**  

The **Scalpers HFT** trigger continuously **monitors** all executed trades **within the current session** to detect **HFT activity**.  

### **Detection Criteria:**

1️⃣ **Short-Lived Trades:** If a trade’s lifetime is **below the set threshold (seconds)**, it is flagged.  
2️⃣ **High Trade Count:** The trigger counts the number of flagged trades and **compares it to the required threshold**.  
3️⃣ **Total Profit Check (if enabled):** If enabled, the trigger **verifies** whether the total profit of flagged trades **exceeds the defined USD threshold**.  
4️⃣ **Total Realized PnL Check (if enabled):** The trigger only reacts to accounts where the **Total Realized PnL exceeds the threshold**.  
5️⃣ **Session Profit Check (if enabled):** The trigger will only react to accounts that are **profitable in the current session**. **Accounts with negative session profits are ignored.**  

### **How Notifications Are Triggered 🚨**

🔹**Number of HFT Deals** and **Interval (sec)** conditions should be fullfulled simultaneously in order for the trigger to generate a notification.  
🔹 If **multiple criteria are enabled**, the notification is sent **when all conditions are fulfilled**.  
🔹 The notification includes the **account details and a list of transaction IDs** flagged as scalping trades.  

---

## **Why Use the Scalpers HFT Trigger? 🚀**  

🔹 **Prevent abuse of scalping strategies** that exploit short-term price inefficiencies.  
🔹 **Improve risk management** by detecting high-frequency traders in real-time.  
🔹 **Customize monitoring rules** to fit different trading environments and strategies.  
🔹 **Ensure compliance** with internal risk policies and trading regulations.

---

## Series of Bad Rates

# **Series of Bad Rates**  

## **General Information**  

The **Series of Bad Rates** trigger detects a **series of oppositely directed price movements** that may indicate a **technical issue on the Liquidity Provider (LP) side**. When such events occur, the trigger **notifies a dealer** accordingly.  

---

## **Menu Navigation**  

📌 You can find the **Series of Bad Rates** trigger under:  
**Risk Management** → **Anti-Fraud System**  

![Series of Bad Rates](i/series-of-bad-rates/bad-rates.webp)  

---

## **Edit Settings**  

![Series of Bad Rates Settings](i/series-of-bad-rates/bad-rates-settings.webp)  

The following settings can be applied to the rule:  

| **Parameter Name** | **Description** |
| --- | --- |
| **Rule Name** | Assign a custom name to the rule. |
| **Number of Shifts** | Defines how many **opposite price movements** are required for the trigger to activate. |
| **Duration of Unstable New Rates Flow** | The time limit (in seconds) for detecting **a series of opposite price movements**. |
| **Change Detection** | Choose the unit for measurement: **percentage (%) or average spreads**. |
| **Price Change in Percents/Spreads** | The threshold value (in % or spreads) to determine whether a price movement is significant enough to activate the trigger. |
| **Symbol Groups** | Select groups of symbols to be monitored. |
| **Included Symbols** | Select specific symbols to be monitored. |

---

## **Notifications**  

When triggered, the notification includes a **TradingView chart** of the affected symbol.  

📌 **Important:** If the notification is not processed in real-time, the gap may no longer be visible on the chart.

![](i/series-of-bad-rates/case01.webp)
![](i/series-of-bad-rates/case02.webp)

## **Permissions**  

| **MT4** | **MT5** |
| --- | --- |
| No specific permissions are required. | No specific permissions are required. |

---

## **Trigger Logic**  

- The **price movement** is measured based on the selected unit (**percentage or spreads**).  
- For **each price tick**, the trigger **compares the current tick with the previous one** and checks for two conditions:  
  1. The price change **exceeds the defined threshold** (in % or spreads).  
  2. The price movement **is in the opposite direction** to the previous one.  
- If these conditions are met, the trigger **records the price tick**.  
- If **the number of shifts** occurs within a time **shorter than the "Duration of Unstable New Rates Flow"**, the trigger **detects an event** and generates a **notification** for the dealer.

## **Key Use Cases**

In the fast-paced world of trading, maintaining a stable quote flow is essential for fair and transparent execution. However, low liquidity and technical issues with liquidity providers (LPs) can cause price distortions that traders may exploit. The **Series of Bad Rates** effectively detects such anomalies, ensuring brokers can react swiftly and prevent potential trading issues before they escalate.  

### **1. Detecting Unstable Quote Flow (Price “Saw” Formation)**

![](i/series-of-bad-rates/case03.webp)

When liquidity drops, price movements can become erratic, forming a **"saw" pattern** on the chart. Skilled traders take advantage of this by placing limit orders to profit from artificial price swings. The trigger identifies these patterns in real-time, allowing brokers to:  

✅ **Investigate the source** of abnormal price behavior  
✅ **Adjust liquidity settings** to stabilize pricing  
✅ **Prevent traders from exploiting abnormal fluctuations**  

### **2. Identifying Liquidity Provider Quote Stream Failures**

A more severe issue occurs when an LP's quote stream breaks down, causing two unrelated trading pairs to merge into one stream. For instance, a failure could result in **USDJPY and EURUSD merging into a single EURUSD chart.**  

If such an anomaly goes unnoticed:  
⚠️ **Traders may execute trades on non-existent instruments**  
⚠️ **The broker may need to cancel transactions, leading to disputes**  
⚠️ **Clients could file complaints with regulators and post negative reviews**  

With this trigger in place, brokers receive **immediate notifications** of such incidents, enabling them to:  
🔹 **Pause trading on the affected instrument** before traders exploit it  
🔹 **Coordinate with LPs to restore the correct quote stream**  
🔹 **Prevent reputational damage and regulatory issues**

---

## Admin Fees

# **Admin Fees**  

## **General Information**  

The **Admin Fees** trigger allows brokers to charge commissions on **open positions carried over through a rollover to the next day**, including holidays and weekends.  

---

## **Menu Navigation**  

📌 You can find the **Admin Fees** trigger under:  
**Risk Management** → **Automatic Control**  

![Admin Fees](i/admin-fees/admin-fees.webp)  

---

## **Edit Settings**  

![Admin Fees Settings](i/admin-fees/admin-fees-settings.webp)  

Below is a list of all the settings that can be applied to this rule:  

| **Parameter Name** | **Description** |
| --- | --- |
| **Rule Name** | The name of the selected rule. |
| **Fee Type** | Select the fee type to apply. Options: **USD or percentage**. |
| **Long Positions Fee, USD** | Set the fee amount for **long positions**. |
| **Short Positions Fee, USD** | Set the fee amount for **short positions**. |
| **Admin Fees Free Period** | After how many days of keeping the position open the trigger starts applying fees. |
| **Time Accrual (Hours)** | Set the hour when the fee will be applied. |
| **Time Accrual (Minutes)** | Set the exact minute when the fee will be applied. |
| **Comment for Transaction** | A comment attached to the operation, visible to the trader on the trading platform. |
| **Check Margin** | Enable margin and balance checks before applying the fee. |
| **Account Groups** | Select account groups to be monitored. |
| **Included Accounts** | Select individual accounts to be monitored. |
| **Symbol Groups** | Choose symbol groups to be monitored. |
| **Included Symbols** | Select specific symbols to be monitored. |

---

## **Permissions**  

### MT5 Permissions  

![Admin Fees Permissions](i/admin-fees/admim-fees-permissions-mt5.webp)  

---

## **Trigger Logic**  

- The **trigger executes** at the time specified in the **"Time Accrual"** settings.  
- The fee is **applied only once per day** on an eligible position.  
- If Trading Platform is restarted, the fee will be applied **after the next rollover process completes**.  
- If the fee **cannot be applied** (e.g., due to communication issues with the MT server or lack of necessary permissions), a **manual accrual button** will appear in the notification window.  

### **Fee Application Notification**  

- The **Risk Management** section logs fee applications.  
- A **successful fee charge** is marked as:  
  📌 *“Admin fees were charged automatically by AI.”*  
- If the fee **was not applied**, it remains in the **list of unprocessed notifications**, and a **manual accrual option** becomes available.  

### **Fee Calculation**  

- The **fee calculation type** (percentage or USD) is set **separately for long and short positions**.  
- The trigger calculates and applies the appropriate fee amount to each position using predefined formulas.  
- **Admin Fees Free Period**: The trigger does not apply fees during the **free period** (in days) from the position’s opening date.

---

## Change Spread by Period

# **Change Spread by Period**

## General Information

The **Change Spread by Period** trigger directly manages the **spread size** of a trading symbol according to a **weekly schedule** set in the trigger settings. This helps brokers prevent **arbitrage cheating** caused by differences between the **fixed spread and the floating spread** across trading sessions. This trigger is particularly useful for **widening the fixed spread** when necessary.

## Menu Navigation

You can find the **Change Spread by Period** trigger under:  
📌 **Risk Management** → **Automatic Control**  

![](i/change-spread-by-period/change-spread-by-period.webp)

## Edit Settings

![](i/change-spread-by-period/change-spread-by-period-settings.webp)

### **Parameters & Descriptions**

| **Parameter Name** | **Description** |
|--------------------|----------------|
| **Enabled/Disabled** | Enables or disables a specific setting for a particular trading symbol. |
| **Use Spread Filter** | Enables or disables a spread filter with **Max** and **Min** values (supported only on MT5). |
| **Remove Symbol** | Removes a particular setting for a specific trading symbol. |
| **Default Spread (points)** | The default spread size of the selected trading symbol. |
| **Default Spread Balance (points)** | Defines how the default spread size should be balanced. Supported by both MT4 & MT5. |
| **Spread (points)** | A new spread size applied to the selected symbol within a specified time period. |
| **Spread Balance** | The balance of the new spread size applied to the selected symbol within a specified time period. |
| **Default Spread Min (points)** | If “Use Spread Filter” is ON, this sets the **minimum** spread value (MT5 only). |
| **Default Spread Max (points)** | If “Use Spread Filter” is ON, this sets the **maximum** spread value (MT5 only). |
| **Time** | The time period during which the trigger applies the new spread size. |
| **Symbol Groups** | Specify **groups of trading instruments** to monitor. |
| **Included Symbols** | Select **specific trading symbols** for monitoring. |

## Setting Up a New Spread Size

The **new spread size** can be set in two ways:  
✔ **With** the “Spread Filter”  
✔ **Without** the “Spread Filter”  

### **Steps to Configure the New Spread Size**

1. **Define Default Spread Values**  
   - For a selected symbol, specify the **Default Spread** and **Default Spread Balance**.  
   - These values will be applied **outside** of the scheduled periods.
   - Both values must be specified in **points**.
   - If the **Spread Balance** is set to **0**, the spread points will be **equally distributed** for long and short positions.

2. **Set the Time Period**  
   - Choose a **weekday** and set the **start and end time** when the new spread size should be applied.

3. **Specify the New Spread Values**  
   - Enter the **new spread size** in the **Spread** field (in points).  
   - Define the **Spread Balance**, which determines how the spread is allocated.  

4. **(Optional) Enable Spread Filter (MT5 Only)**  
   - If the “Use Spread Filter” switch is **ON**, the new spread size and spread balance will be applied **alongside** the spread filter.  
   - Set **Spread Min** and **Spread Max** values.  

## Permissions

| **MT4** | **MT5** |
|---------|---------|
| Not applicable | ![](i/change-spread-by-period/permissions.webp) |
|  | ![](i/change-spread-by-period/permissions_01.webp) |
|  | ![](i/change-spread-by-period/permissions_02.webp) |

## Trigger Logic

The trigger **manages spread size** by applying a **specific spread value** to a selected trading symbol during predefined time periods.

📌 **Note:**  
The **Spread Filter** feature is **only supported on the MT5 platform**.

## **Key Use Cases** 

Fixed spread accounts are a popular choice among traders who prefer a **guaranteed entry price** without worrying about slippage caused by spread widening. However, **improper risk management** on these accounts can expose brokers to **arbitrage abuse**, leading to unfair trading profits for some clients.  

The **Change Spread by Period** trigger helps brokers **detect and prevent arbitrage strategies** that take advantage of fixed spread pricing under low liquidity conditions.  

### **1. Arbitrage Opportunities in Fixed Spread Accounts**

Most brokers offer account types with a **fixed spread**, ensuring a predictable cost of trading. However, during **low liquidity periods (e.g., at night), spreads on floating instruments widen significantly**, while the fixed spread remains unchanged. This creates a **highly profitable environment for arbitrage traders** who exploit these differences using automated tools.  

🔹 **How Arbitrageurs Operate:**

- They compare real market quotes with the broker’s **fixed spread** prices.

- When the **ask price moves away from standard values**, the bid price follows, creating a **temporary price spike (hairpin)**.  
- Using automated advisors, they quickly enter and exit trades, capturing a **risk-free profit** before the price spike corrects itself.  
- On **floating spread symbols**, these spikes do not occur, as the bid price stays in place while the ask price moves, creating a wide spread that prevents arbitrage.  

### **2. Automated Spread Widening to Neutralize Arbitrage**

A proven way to counter this exploit is to **adjust the fixed spread dynamically** during low-liquidity hours. Based on personal experience:  

- **Optimal time window:** **23:00 – 06:00**, when liquidity is lowest.

- **Spread expansion factor:**  
  - **Major instruments:** Increase by **2x** (e.g., from **3 to 6 pips**).  
  - **Cross rates:** Increase by **up to 5x** (e.g., from **8 to 12 pips**).  

✅ **Why This Works:**

- Normal traders **do not trade actively during low liquidity hours**, so their strategy remains unaffected.  
- Arbitrage traders **lose their edge**, as the expanded fixed spread eliminates the price distortions they rely on.  
- Brokers maintain **fair trading conditions** while protecting themselves from unnecessary losses.  

## **Conclusion**

Without proper controls, **fixed spread accounts can become a major liability** for brokers due to arbitrage abuse. By implementing **automated spread widening** during **low liquidity hours**, brokers can eliminate these unfair advantages while ensuring a **balanced and sustainable trading environment** for all clients.

---

## Change Spread by Volume

# **Change Spread by Volume**

## General Information

The trigger **"Change Spread by Volume"** directly manages the spread size of a trading symbol. It sets a new spread size for a trading instrument when the total net volume of all open trades for this trading symbol reaches a specified threshold. This trigger works exclusively with the **MT5** platform.

## Menu Navigation

You can find the **Change Spread by Volume** trigger under:  
📌 **Risk Management** → **Automatic Control**

![](i/change-spread-by-volume/change-spread-by-volume.webp)

## Edit Settings

![](i/change-spread-by-volume/change-spread-by-volume-settings.webp)

| **Parameter Name** | **Description** |
|--------------------|---------------|
| **Enabled/Disabled** | Enables or disables a specific trading symbol setting. |
| **Period (minutes)** | The interval for checking the net volume of a symbol. |
| **Volumes Max (lots)** | The maximum value of the trading volume in lots for the trigger setting. |
| **Spread (points)** | The number of spread points applied to the selected trading instrument. |

## Adding a New Symbol

Users can configure how frequently the volume is checked for a selected trading symbol and define the maximum trading volume (in lots) that must be reached before applying a new spread size.

A new spread value is specified in points and can be an even or odd number. Click on the **"Add"** button.

Set the volume range with the respective spread size, and add as many pairs of volume ranges and corresponding spread values as needed. The spread points can be separately balanced for **Bid** and **Ask** prices.

| **Parameter Name** | **Description** |
|--------------------|---------------|
| **Sell Spread Balance (points)** | Defines how the spread is distributed between the **Bid** and **Ask** prices when the net volume is SELL. |
| **Buy Spread Balance (points)** | Defines how the spread is distributed between the **Bid** and **Ask** prices when the net volume is BUY. |
| **Exposure in Lots** | The volume range (in lots). When the total trading volume for the selected symbol exceeds this threshold, a new spread value is applied. |

## Permissions

| **MT4** | **MT5** |
|--------|--------|
| Not applicable | ![](i/change-spread-by-period/permissions.webp) |
|  | ![](i/change-spread-by-period/permissions_01.webp) |
|  | ![](i/change-spread-by-period/permissions_02.webp) |

## Trigger Logic

The trigger monitors specific trading instruments and the total volume of all open trades for each symbol. When the total trading volume in lots exceeds the predefined threshold, the trigger alerts the broker in real-time and directly applies a new spread value in points.

---

## Dynamic Leverage

# **Dynamic Leverage**

## General Information

The **Dynamic Leverage** trigger is designed to help dealers set periods of increased margin requirements on any instrument. This is particularly useful when high market volatility is expected.

> **Note:** To function properly, this trigger requires the installation of our plugin on your trading server. Please contact our customer support team for installation instructions.

## Menu Navigation

You can find the **Dynamic Leverage** trigger under:  
📌 **Risk Management** → **Automatic Control**

![](i/dynamic-leverage/dynamic-leverage.webp)

## Edit Settings

![](i/dynamic-leverage/dynamic-leverage-settings.webp)

| **Parameter Name** | **Description** |
|--------------------|---------------|
| **Rule Name** | Assign a specific name to the rule. |
| **Process Positions** | Choose whether the trigger should apply to **all open positions** or **new positions only**. |
| **Process Positions Opened Outside Specified Period** | Determines whether positions opened outside the specified time period should be processed.<br />Refer to the **Trigger Logic** section for details on how this setting affects performance. |
| **Operation Mode** | Defines how the **MarginRate** parameter is changed for the trading symbol. <br />✅ Use **"Leverage"** if leverage is included in the formula for calculating **MarginRate**. <br />✅ In other cases, it is advisable to use **"Percentage"**. |
| **Leverage** | Create additional time periods with specific leverage by entering the desired leverage and clicking "Add". |
| **Start Time (Weekday, HH:MM)** | Set the start time (weekday, hour, and minutes). |
| **End Time (Weekday, HH:MM)** | Set the end time (weekday, hour, and minutes). |
| **Volume Range (Lots)** | Define the volume range (in lots) for the specified time period. |
| **Account Groups** | Specify which account groups should be monitored. |
| **Accounts** | Select individual accounts for monitoring. |
| **Symbol Groups** | Choose which symbol groups should be monitored. |
| **Included Symbols** | Select specific symbols to be monitored. |
| **Included Agents** | Specify agent IDs that should be processed. |
| **Excluded Agents** | Specify agent IDs that should be excluded from processing. |

### **Percentage-Based Leverage Adjustments**

If percentage values are used, all calculations are based on the **current leverage**.

You can either:

- **Increase leverage** — for example, set **200%** to double the current leverage.
- **Decrease leverage** — for example, set **50%** to reduce the leverage by half.

## Permissions

Since this trigger requires our plugin to be installed on the trading server, all **permissions are managed by the plugin** and cannot be overridden.

## Trigger Logic

The **Dynamic Leverage** trigger adjusts the leverage for specific trading symbols or groups of symbols based on the trading volume within a predefined range. The leverage size is controlled **for individual trading orders**.

### **Understanding the "Process Positions Opened Outside Specified Period" Setting**

This setting determines whether the trigger should **process open positions that were created outside the specified time period**.

- **If set to "Off"** → The trigger **only** processes **new positions** that are opened during the time period defined in the settings.
- **If set to "On"** → The trigger **also** processes **existing open positions** that were created outside the specified period when that period is reached again.

The new notification with the indication of the source leverage and margin rate will be created by the trigger when the period of the changed leverage ends.

## Example of changing the leverage in the trigger

We have an order with the leverage L0. The group of symbols G1 had the leverage L1 in the time range from D1 till D2 and in the same group of symbols G1, we have the leverage L2 in the time range from D3 till D4. The order’s volume is in the range of both settings and D2=D3. In this case when time hits D2 the leverage of the L1 order will change back to L0 and then immediately to L2. When the time hits D4 the leverage will go back to L0. And thus 4 issues will be created to change the order’s leverage.

---

## Leverage by Equity

# **Leverage by Equity**

## General Information

The **Leverage by Equity** trigger is designed to automatically or manually adjust trading leverage for groups of accounts or individual accounts based on their equity levels. Once a new leverage is set, the trigger generates a notification. Additionally, users can control leverage on weekends to prevent potential exploitation of price gaps at market opening.

## Menu Navigation

You can find the **Leverage by Equity** trigger under:  
📌 **Risk Management** → **Automatic Control**

![](i/leverage-by-equity/leverage-by-equity.webp)

## Edit Settings

![](i/leverage-by-equity/leverage-by-equity-settings.webp)

| **Parameter Name** | **Description** |
|--------------------|---------------|
| **Leverages** | Enter the leverage value in USD and click **Add** to create a tier. |
| **Automatic Leverage Change** | Choose the operation mode: **ON** - leverage is changed automatically; **OFF** - user confirmation is required from the notification. |
| **Check Margin Level** | Uses a margin level threshold to prevent traders with low margin levels from hitting stop-out. |
| **Weekend Settings** | Expands the weekend-related settings. |
| **Automatic Change Weekend Leverage** | Enables/disables automatic leverage changes during weekends. |
| **Account Groups** | Specify account groups to be monitored. |
| **Included Accounts** | Select individual accounts for monitoring. |

The **Leverage by Equity** trigger operates by pre-setting trading leverage rules. Each rule consists of an equity range (in USD) and its corresponding leverage size. By creating multiple rules, you establish a **leverage ladder** that the trigger follows.

## Note on Automation

When automation is **enabled**, the trigger **automatically** adjusts trading leverage. Notifications regarding automatic changes can be found in the **Risk Management** section of Trading Platform.

## Permissions

| **MT4** | **MT5** |
|--------|--------|
| ![](i/leverage-by-equity/permissions-mt4.webp) | ![](i/leverage-by-equity/permissions-mt5.webp) |

## Trigger Logic

The **Leverage by Equity** trigger **only reduces leverage**; it does not affect positions with leverage already lower than the specified settings.

### **Monitoring Process (Every 5 Seconds)**

1. The trigger **checks the equity** of each monitored account.
2. It **compares the account’s leverage** with the predefined settings:
   - **If the account's equity falls within the set range and has the correct leverage, no action is taken.**
   - **If the leverage is higher than the allowed setting, a notification is generated.**  
     - If **automation is ON**, Trading Platform **automatically** updates the leverage in the trading platform.
     - If **automation is OFF**, the dealer must manually approve the change.
   - **If the leverage is lower than the specified range, a notification suggests increasing it.**  
     - This only happens if leverage was previously lowered manually or by the trigger.

### **New Enhancements**  

### **1. Detecting External Leverage Changes & Storing Maximum Leverage**

- If the trigger detects that leverage was changed externally (i.e., manually adjusted in the trading platform by a dealer or by a trader in the personal cabinet), it records this change.  
- If an existing notification exists and the leverage does not match the predefined tier in the ladder settings, the trigger **identifies the new maximum leverage and stores it** in the database.  
- **For new accounts with no previous notifications:**  
  - The trigger captures the initial leverage and stores it as the **maximum allowed leverage**.  

### **2. Identifying Non-Matching Leverage & Updating Maximum Leverage**

- The goal is **not** just to detect an increase in leverage but to identify any leverage that does not align with the predefined ladder settings.  
- **Example scenario:**  
  - The ladder is set to **200 → 1000**.  
  - A notification is being created for **1000**, but the trigger detects **any outside leverage (not 1000)**.  
  - The new leverage (e.g., **500**) is then stored as the **new maximum leverage**.  
  - Moving forward, any step in the **200 → 1000** range will instead set leverage to **500**.  
  - If leverage is **manually** changed again outside Trading Platform (e.g., to **300**), the trigger records this and will now use **300** as the maximum leverage.  

### **3. Enforcing Maximum Leverage Limits**

- Each time leverage is adjusted based on the ladder, the trigger checks the **maximum recorded leverage**.  
- The new leverage will **never exceed** this stored maximum.  

### **4. Improved Notifications**

- Notifications will now include **maximum leverage restrictions** when this limit is reached.  
- This provides better visibility for dealers on how leverage is being managed.  

### **5. Handling Equity Fluctuations**

- If the account's equity **returns to initial one**, the **notification remains for one hour** (default).  
- However, if the equity **changes sharply within that hour** (default threshold: **10%**), a **new notification is generated immediately**.

### 6. **Weekend Settings**

- If **Weekend Settings** is enabled, the trigger **lowers leverage during weekends** and **automatically restores it afterward**.
  - **If automation is ON**, the change is applied automatically.
  - **If automation is OFF**, the dealer must manually approve the change.

---

---

## Net Dynamic Leverage

# **Net Dynamic Leverage**

## General Information

The **Net Dynamic Leverage** trigger is designed to automatically adjust leverage in real time. It analyzes the total volume of open positions on a single account for a single instrument and, based on pre-configured rules, adjusts the margin requirements of the open positions for the analyzed instrument. Margin requirements for positions in other instruments remain unchanged.

Leverage adjustments can be set using either numerical values or percentages, and can be scheduled by specifying days of the week and time, depending on the total net volume of the selected instrument.

 **Note:** To function properly, this trigger requires the installation of our plugin on your trading server. Please contact our customer support team for installation instructions. Plugin supports **MT4** and **MT5** platforms.

## Menu Navigation

You can find the **Dynamic Leverage** trigger under:  
📌 **Risk Management** → **Automatic Control**

![](i/net-dynamic-leverage/ndl-menu.webp)

## Edit Settings

![](i/net-dynamic-leverage/ndl-04.webp)

| **Parameter Name** | **Description** |
|--------------------|---------------|
| **Rule Name** | Assign a specific name to the rule. |
| **Active Accounts only** | When this feature is enabled, the trigger will apply only to active traders. If a trader is inactive, the margin requirements for open positions will remain unchanged. An account is considered active if trading is performed within a time period specified in the active rule — that is, within the scope of a **HMR** (High Margin Requirements) period . |
| **Operation Mode** | Defines how the **MarginRate** parameter is changed for the trading symbol. <br />✅ Use **"Leverage"** if leverage is included in the formula for calculating **MarginRate**. <br />✅ In other cases, it is advisable to use **"Percentage"**. |
| **Leverage** | Create additional time periods with specific leverage by entering the desired leverage and clicking **"Add"**. |
| **Start Time (Weekday, HH:MM)** | Set the start time (weekday, hour, and minutes). |
| **End Time (Weekday, HH:MM)** | Set the end time (weekday, hour, and minutes). |
| **Volume Range (Lots)** | Define the volume range (in lots) for the specified time period. |
| **Account Groups** | Specify which account groups should be monitored. |
| **Accounts** | Select individual accounts for monitoring. |
| **Symbol Groups** | Choose which symbol groups should be monitored. |
| **Included Symbols** | Select specific symbols to be monitored. |
| **Included Agents** | Specify agent IDs that should be processed. |
| **Excluded Agents** | Specify agent IDs that should be excluded from processing. |

## 🛑 **Required Parameters**

The following parameters **must be** configured for the trigger to work properly:

### **Instrument(s)**

1. **Symbol Groups**: Specifies the group of symbols to which the trigger will be applied.
2. **Included Symbols**: Specifies the individual symbols affected by the trigger.

### **Account(s)/Account Groups**

1. **Account Groups**: Defines the group of accounts to which the trigger will be applied.
2. **Included Accounts**: Specifies individual accounts affected by the trigger.
3. **Included Agents**: Specifies the agents for whom the trigger settings will apply.

---

## **Account Types**

The trigger supports the following account types:

- **Hedging**
- **Netting**

---

## **Calculation Types**

The trigger supports four types of margin calculations:

1. **Forex No Leverage** – Margin without leverage.
2. **Forex** – For currency pairs.
3. **CFD** – For Contracts for Difference.
4. **CFD No Leverage** – CFDs without leverage.

---

## **"Active Accounts Only" Feature**

![](i/net-dynamic-leverage/ndl-01.webp)

When this feature is enabled, the trigger will apply **only to active traders**.  
If a trader is inactive, margin requirements on open positions will **remain unchanged**.

An account is considered active if trading is performed within a time period specified in the active rule — that is, within the scope of a **HMR** (High Margin Requirements) period .

---

## **Core Functionality**

### **Dynamic Leverage Adjustment**

The trigger automatically adjusts leverage when certain conditions are met:

- **As the total volume of all open positions on specified account(s) (in lots) increases**:  
  Leverage increases when the trader’s total position volume exceeds a configured threshold.

### **Percentage-Based Leverage Adjustments**

If percentage values are used, all calculations are based on the **current leverage**.

You can either:

- **Increase leverage** — for example, set **200%** to double the current leverage.
- **Decrease leverage** — for example, set **50%** to reduce the leverage by half.

---

## **Notes**

- When creating a leverage change rule tier, keep in mind that the adjustment occurs **up to the maximum volume threshold**.
- The next rule tier takes effect **only after** the previous one’s maximum threshold is reached.
- When the HMR period, specified in any rule, ends, the leverage is automatically reverted to the value that was active before the rule was applied.

## Permissions

Since this trigger requires our plugin to be installed on the trading server, all **permissions are managed by the plugin** and cannot be overridden.

# 📘 Example: Margin Calculations with Net Dynamic Leverage

This example demonstrates how margin requirements are calculated based on position volume and trigger-defined leverage rules.

---

## 🔧 Account & Symbol Setup

- **Account Leverage**: 1:1000
- **Symbol**: USDJPY  
  - **Initial Margin Rate (BUY)**: 1.0  
  - **Initial Margin Rate (SELL)**: 1.0  
  - **Hedged Margin**: 50,000 (per 1 lot)  
  - **Contract Size**: 100,000 (per 1 lot)

---

## ⚙️ Trigger Rule Settings

| Volume Range (lots) | Leverage |
|---------------------|----------|
| 0.01 – 2.00         | 100      |
| 2.01 – 15.00        | 10       |

---

## ▶️ Action Sequence & Margin Calculations

### ✅ 1. Open BUY 0.2 lot
- **Calculation**:  
  `0.2 * 100,000 / 100 = 200`
- **Expected Margin**: 200  
- **Actual Margin**: ✅ **200**

---

### ✅ 2. Open additional BUY 0.5 lot
- **Total Volume**: 0.2 + 0.5 = 0.7 lot  
- **Calculation**:  
  `0.7 * 100,000 / 100 = 700`
- **Expected Margin**: 700  
- **Actual Margin**: ✅ **700**

---

### ✅ 3. Open SELL 0.3 lot
- **Hedged Volume**: 0.3 lot  
- **Net BUY Volume**: 0.7 - 0.3 = 0.4 lot  
- **Calculation**:  
  `0.3 * 50,000 / 100 + 0.4 * 100,000 / 100 = 150 + 400 = 550`
- **Expected Margin**: 550  
- **Actual Margin**: 🔒 **700** *(Fact remains unchanged while margin decreases)*

---

### ✅ 4. Open additional SELL 1.1 lot
- **Total SELL Volume**: 0.3 + 1.1 = 1.4 lot  
- **Total BUY Volume**: 0.7 lot  
- **Hedged Volume**: 0.7 lot  
- **Net SELL Volume**: 1.4 - 0.7 = 0.7 lot  
- **Calculation**:  
  `0.7 * 50,000 / 100 + 0.7 * 100,000 / 100 = 350 + 700 = 1050`
- **Expected Margin**: 1050  
- **Actual Margin**: ✅ **1050**

---

### ✅ 5. Close SELL 1.1 lot
- **Remaining SELL Volume**: 0.3 lot  
- **Net BUY Volume**: 0.7 - 0.3 = 0.4 lot  
- **Calculation**:  
  `0.3 * 50,000 / 100 + 0.4 * 100,000 / 100 = 150 + 400 = 550`
- **Expected Margin**: 550  
- **Actual Margin**: ✅ **550**

---

### ✅ 6. Close SELL 0.3 lot and Open BUY 1.3 lot (Total = 2 lots)  
- **Total BUY Volume**: 0.2 + 0.5 + 1.3 = 2.0 lots  
- **Trigger edge case – leverage changes to 10**
- **Calculation**:  
  `2.0 * 100,000 / 10 = 20,000`
- **Expected Margin**: 20,000  
- **Actual Margin**: ✅ **20,000**

---

### ✅ 7. Open SELL 0.1 lot
- **Hedged Volume**: 0.1 lot  
- **Net BUY Volume**: 2.0 - 0.1 = 1.9 lot  
- **Leverage returns to 100 (volume < 2.01)**
- **Calculation**:  
  `0.1 * 50,000 / 100 + 1.9 * 100,000 / 100 = 50 + 1900 = 1950`
- **Expected Margin**: 1950  
- **Actual Margin**: ✅ **1950**

---

## 📌 Notes

- Margin is calculated dynamically based on net exposure and the applicable leverage from the volume range.
- Hedged positions use a reduced margin based on the **hedged margin value**.
- Leverage rules are applied at the **moment the volume threshold is crossed**.

---

## Swaps Free Accounts

# **Swaps Free Accounts**  

## **General Information**  

This trigger allows certain accounts, account groups, symbols, and symbol groups to be **swaps free** for a specified consecutive period of days.  

## **Menu Navigation**  

📌 You can find the **Swaps Free Accounts** trigger under:  
**Risk Management** → **Automatic Control**  

![Swaps Free Accounts](i/swaps-free/swaps-free.webp)  

---

## **Edit Settings**  

![Swaps Free Settings](i/swaps-free/swaps-free-settings.webp)  

The table below lists all the settings available for configuring this rule:  

| **Parameter Name** | **Description** |
| --- | --- |
| **Rule Name** | The name of the selected rule. |
| **Long Positions Swaps** | Indicates whether swaps are cleared for long positions. **Enabled = cleared**, **disabled = not cleared**. |
| **Short Positions Swaps** | Indicates whether swaps are cleared for short positions. **Enabled = cleared**, **disabled = not cleared**. |
| **Set Free Period Start Date** | Select the start date of the swaps-free period. |
| **Use Volumes** | Enable volume-based calculation. |
| **Max Volume for Swaps Free, Lots** | Set the maximum volume (in lots) of **one** position to be eligible for swaps-free trading. |
| **Swaps Free Period, Days** | Number of days without swaps. |
| **Account Groups** | Specify the account groups to be monitored. |
| **Included Accounts** | Select individual accounts for monitoring. |
| **Symbol Groups** | Choose which symbol groups should be monitored. |
| **Included Symbols** | Select specific symbols to be monitored. |

---

## **Permissions**

| **MT4** | **MT5** |
|---------|---------|
| Not applicable | ![](i/swaps-free/swap-free-permissions.webp) |
  

## **Trigger Logic**  

When the rule is enabled, the system checks **all open positions** that match the rule settings.  
📌 **Swaps are canceled** for these positions **for the specified period** in the rule settings.  

- If a position **was already open before** enabling the rule **and matches the criteria**, the swaps-free period will be **adjusted accordingly**.  
- If **"Set Free Period Start Date"** is enabled, swaps will be canceled starting from the **specified start date** for the defined period.  
- If **"Set Free Period Start Date"** is disabled, the **swaps-free period starts from the moment the position was opened**.  

---

### Trigger Effect

- When the trigger activates, **all swaps accumulated for the position up to the current day are reset to zero**.
- If the trigger **later becomes inactive** for the same position (i.e., conditions are no longer met), **swaps will no longer be reset**, and **accumulation will resume** from that point onward.

---

### 📘 Example

Assume the following:

- `Use volumes` = ✅ enabled  
- Max allowed lots = **10**  
- Position size = **5 lots**  
- `Swaps Free Period, Days` = **14 days**  
- Position opened on: **2025-05-01**  
- `Set Free Period Start Date` = **2025-05-01**  
- Current date = **2025-05-10**

Since:
- 5 ≤ 10 (lot size is valid)
- The position is 9 days old (≤ 14 days)
- Current date (May 10) is within the promotion period (May 1 → May 15)

➡️ **Trigger is active. All swaps on this position will be reset to zero.**

If the position remains open until **2025-05-20**, the trigger becomes inactive (swap-free period ends), and **swap accumulation resumes** from that date.

---

### 🧭 Timeline Diagram

```text
Position opened → 2025-05-01
Trigger window  → [2025-05-01 → 2025-05-15]
Current date    → 2025-05-10 ✅ Trigger Active
↓
┌─────────────┬────────────────────────────┐
│    Date     │       Swap Behavior        │
├─────────────┼────────────────────────────┤
│ May 01-15   │ Swaps reset daily (0)      │
│ May 16+     │ Swaps accumulate normally  │
└─────────────┴────────────────────────────┘

---

## Trade Restriction Period

# **Trade Restriction Period**  

## **General Information**  

The **Trade Restriction Period** trigger sets specific time periods when **opening new positions** on certain **symbols or groups of symbols** is **prohibited** for traders.  

The trigger has **two operational modes**:  
1. **Close Only** – Traders can close existing positions but **cannot open new ones**.  
2. **Trade Disabled** – **All trading is completely prohibited**, including closing positions.  

---

## **Menu Navigation**  

📌 You can find the **Trade Restriction Period** trigger under:  
**Risk Management** → **Automatic Control**  

![Trade Restriction Period](i/trade-restriction-period/trp.webp)  

---

## **Edit Settings**  

![Trade Restriction Period Settings](i/trade-restriction-period/trp-settings.webp)  

| **Parameter Name** | **Description** |
| --- | --- |
| **Trade Mode** | Choose between two options: **Close Only** (allows closing positions but prohibits opening new ones) or **Trade Disabled** (completely prohibits trading). |

---

## **Permissions**  

| **MT4** | **MT5** |
|--------|--------|
| ![MT4 Permissions](i/trade-restriction-period/trp-permissions-mt4.webp) | ![MT5 Permissions](i/trade-restriction-period/trp-permissions-mt5.webp) |

---

## **Trigger Logic**  

- The trigger **automatically adjusts trading permissions** for specified symbols over selected time periods.  
- If the trigger is **turned off during a restricted period**, trading immediately **returns to its original mode**.  
- The restriction applies **independently for MT4 and MT5**, ensuring compatibility across platforms.

---

## Abnormal Volatility

# **Abnormal Volatility**

## **General Information**  

The **Abnormal Volatility** trigger detects **real-time volatility spikes** in trading instruments and alerts the broker accordingly. It identifies sudden price deviations by comparing **short-term (1-minute) vs. long-term (60-minute) volatility**.

---

## **Menu Navigation**  

📌 You can find the **Abnormal Volatility** trigger under:  
**Risk Management** → **Event Triggers**  

![Abnormal Volatility](i/abnormal-volatility/abnormal-volatility.webp)  

---

## **Edit Settings**  

![Abnormal Volatility Settings](i/abnormal-volatility/abnormal-volatility-settings.webp)  

| **Parameter Name** | **Description** |
| - | - |
| **Rule Name** | Assign a custom name to the rule. |
| **Vhigh to Vlow Ratio** | Defines the **volatility threshold** as the ratio of **1-minute standard deviation (Vlo)** to **60-minute standard deviation (Vhi)**. Default setting: **10**. |
| **Symbol Groups** | Select groups of symbols to monitor. |
| **Included Symbols** | Specify individual symbols for monitoring. |

---

## **Notifications**  

When triggered, the notification includes a **TradingView chart** of the affected symbol.  

📌 **Important:** If the notification is not processed in real-time, the volatility spike may no longer be visible on the chart.  

![High Volatility](i/abnormal-volatility/high-volatility.webp)  

---

## **Permissions**  

| **MT4** | **MT5** |
| - | - |
| No specific permissions required. | No specific permissions required. |

---

## **Trigger Logic**  

1. The trigger **calculates volatility** using historical price data:
   - **Vhi** = Standard deviation of **60-minute** timeframe.
   - **Vlo** = Standard deviation of **1-minute** timeframe.
2. It **compares the ratio** of short-term to long-term volatility (**Vlo / Vhi**).
3. If the ratio **exceeds the threshold** (e.g., **>2**), the system **generates a notification**.

The standard deviation **Vhi** is calculated based on hourly candles (closing prices) over the last 31 days (i.e., one month). As a result, by definition, this value is quite stable and changes slowly.

For calculating the standard deviation on minute candles **Vlo**, the last 100 one-minute candles are used.

The trigger is activated if the ratio **Vlo** / **Vhi** >= Threshold (where the threshold is configured in the rule for the symbol).

This means the numerator can change quite quickly compared to the denominator. However, the denominator also changes over time, which means the trigger threshold may need to be adjusted from time to time because the market evolves.

If the trigger settings are not adjusted accordingly, and the current market remains relatively stable, the system may generate periodic notifications (once per hour — this interval is implemented to avoid constant second-by-second triggering). This behavior is actually an indication that the trigger needs reconfiguration.

In summary: the **Abnormal Volatility** trigger uses market parameters measured at significantly different time scales. While this makes the activation threshold relatively stable, it may still degrade over time as the market changes. As a result, the trigger might need to be recalibrated occasionally for specific symbols — for example, if the market has changed to the point where the old coefficient is always triggering (or no longer triggers at all).

---

## Account Events

# **Account Events**

## General Information

The **Account Events** trigger is designed to alert brokers to various states of accounts based on specified requirements that can be customized in the settings. Either single accounts or groups of accounts can be added to the trigger coverage. Once a specified event is detected, the trigger generates a real-time notification for the dealer to process.

## Menu Navigation

You can find the **Account Events** trigger under:  
**Risk Management** → **Event Triggers**

![](i/account-events/account-events.webp)

## Edit Settings

![](i/account-events/account-events-settings.webp)

Each requirement can be enabled separately by selecting it from the dropdown list. A requirement can also be deleted by clicking on the requirement name and then selecting the “Delete This Requirement” button.

📌 **Note:** Individual accounts in this trigger can be specified in multiple rules. Also, multiple requirements can be selected for a single account. A notification will be generated for the account if even one requirement is fulfilled.

## Types of Requirements

### **Exceeded Lifetime Position**

![](i/account-events/exceed-lifetime-position.webp)

| **Parameter**       | **Description** |
|---------------------|----------------|
| **Alert level, days** | A real-time notification will be generated for an account with open positions whose lifetime exceeds the specified number of days. |

### **Transaction in the Time Range**

![](i/account-events/transaction-in-time-range.webp)

A real-time notification will be generated for an account that placed and closed positions within the specified time range. You can also specify certain symbols and a minimum required profit.

### **Exceeded Floating Profit**

![](i/account-events/exceed-floating-profit.webp)

| **Parameter**       | **Description** |
|---------------------|----------------|
| **Alert level, USD** | A real-time notification will be generated for an account that has reached a floating profit above the specified threshold. |

### **Exceeded Negative Floating Profit**

![](i/account-events/exceed-negative-floating-profit.webp)

| **Parameter**       | **Description** |
|---------------------|----------------|
| **Alert level, USD** | A real-time notification will be generated for an account that has reached a negative floating profit beyond the specified threshold. |

### **Exceeded Profit of One Transaction**

![](i/account-events/exceed-profit-of-one-transaction.webp)

| **Parameter**       | **Description** |
|---------------------|----------------|
| **Alert level, USD** | A real-time notification will be generated for an account where the profit of a single transaction has exceeded the specified amount in USD. |

### **Short Lifetime Position**

![](i/account-events/short-lifetime-position.webp)

| **Parameter**       | **Description** |
|---------------------|----------------|
| **Alert level, seconds** | A real-time notification will be generated for an account that made a transaction with a lifetime shorter than the specified value (in seconds). |

### **Account Inactivity**

![](i/account-events/account-inactivity.webp)

| **Parameter**         | **Description** |
|-----------------------|----------------|
| **Inactive Days**     | Number of days without trading activity. |
| **Account Equity, USD** | Minimum equity required to start account monitoring. |

The **Account Inactivity** requirement detects accounts with an equity level higher than the specified threshold (**Account Equity, USD**) and that have had no trading activity for longer than the specified number of days (**Inactive Days**).

### **Low Margin Level on Account**

![](i/account-events/account-low-margin-level.webp)

| **Parameter**                   | **Description** |
|----------------------------------|----------------|
| **Margin Level, %**              | The threshold used by the trigger to detect accounts whose margin level falls below the specified value. |
| **Maximum Credit, in account currency** | Maximum allowable credit level for the account. Once the specified amount is reached, no further notifications will be generated for the specified account (**Previously credited amount + Credit Amount - Maximum Credit**). |
| **Credit Amount, in account currency** | The amount of money that should be credited to the account in case of a trigger event. |
| **Credit Comment**               | A comment that will be used in the description of the credit transaction. |
| **Auto Credit, ON/OFF**          | If activated, the account will be credited automatically. |

This requirement notifies the dealer of accounts with a margin level below the specified value so that they can be credited with the specified amount of money. The credited amount is in the account’s currency.  

📌 **Automation:**  
- If **Auto Credit** is **ON**, the system credits the accounts automatically.  
- If **Auto Credit** is **OFF**, the credit amount is only applied after the dealer manually processes the trigger notification.

### **The Detector of Locked Positions**

![](i/account-events/detector-of-locked-position.webp)

A real-time notification is generated for an account with locked (oppositely directed) positions. The trigger alerts the dealer to locked positions on the account if the time interval between the opening of oppositely directed positions is less than the **Opening Time Difference** (in seconds).

A notification is generated every time an account places locked positions with a time interval shorter than specified in the settings.

### **Exceed Total Realized Profit**

![](i/account-events/exceed-total-realized-profit.webp)

| **Parameter**        | **Description** |
|----------------------|----------------|
| **Alert level, USD** | A real-time notification will be generated for an account that has reached a total realized profit exceeding the specified threshold. |
| **Reason Filter**    | Profit can be categorized by trade reason. |

## **Permissions 🛡️**

| **MT4** | **MT5** |
|--------|--------|
| No specific permissions required. | No specific permissions required. |

---

## Churning Control

# **Churning Control**

## General Information

This trigger is designed to identify **churning**, a practice where excessive trading volumes are generated on a trader's account primarily to produce commissions, rather than to meet investment objectives. This activity typically does not result in a significant **PnL** (Profit and Loss) change.  

Once an account is detected frequently buying and selling large volumes with minimal impact on the trader's investment performance, the trigger generates a notification.

## Menu Navigation

You can find the **Churning Control** trigger under:  
**Risk Management** → **Event Triggers**

![](i/churning-control/churning-control.webp)

## Edit Settings

![](i/churning-control/churning-control-settings.webp)

| **Parameter Name** | **Description** |
|--------------------|----------------|
| **Only with agent IDs** | The trigger will ignore accounts without an agent ID. |
| **Depth of trade history, days** | The time period (in days) of an account's trade history that will be analyzed by the trigger. |
| **Minimum trade orders** | The minimum number of orders placed over the specified time period required for further account analysis. |
| **Minimum volume, USD** | The minimum total trading volume in USD required for an account to be analyzed. |
| **Ratio between volume and PnL** | The ratio of the account's total trading volume (USD) to the account's PnL (USD) during the current trading session. If the ratio exceeds the specified value, a notification will be generated. |
| **Excluded Account Groups** | Account groups that are excluded from monitoring. |
| **Excluded Accounts** | Specific accounts that are excluded from monitoring. |

## Permissions

| **MT4** | **MT5** |
|--------|--------|
| No specific permissions required. | No specific permissions required. |

## Trigger Logic

The trigger operates based on **one parameter and three thresholds** that need to be configured:

### **1. Depth of Analysis**

- The depth of account trading history to be analyzed, measured in days.

### **2. Three Thresholds for Analysis**

- **Minimum number of orders** placed over the specified time period.  
- **Minimum total volume** of these orders in USD.  
- **Ratio of PnL to total volume** (if this ratio exceeds the specified value, a notification is generated).

### **Process Workflow:**

- If the account **does not** meet one of the first two thresholds (minimum orders or minimum volume), the analysis stops.  
- If the account meets **both** threshold values, the trigger calculates PnL from the orders placed during the period and compares it to the total trading volume (USD).  
- If the **PnL-to-volume ratio exceeds the third threshold**, a **notification** is generated.

---

## Insiders

# **Insiders**

## **General Information**  

The **Insiders** trigger detects transactions where a **large profit is gained within a short time** after opening a trade.  

⚠️ **This type of trading is commonly associated with Insider Trading.**  
📌 The trigger **notifies the dealer** about traders who may be engaging in **insider trading.**  

🔹 **Global Settings:** The trigger settings apply **to all account groups**, though specific accounts can be **excluded** if needed.  

---

## **Menu Navigation**  

📌 You can find the **Insiders** trigger under:  
**Risk Management** → **Event Triggers**

![](i/insiders/insiders.webp)  

---

## **Edit Settings ⚙️**  

![](i/insiders/insiders-settings.webp)  

### **Available Settings**  

| **Parameter Name** | **Description** |
| --- | --- |
| **Transaction Monitoring Time** | If a trade makes a profit **within this time**, the trigger activates. |
| **Profit in Spreads** | The trigger reacts if the profit exceeds the specified value. |
| **Use Profit, USD** | The trigger reacts if the profit exceeds the specified value. |
| **Use Profit in Commissions** | The trigger reacts if the profit exceeds the specified value. |
| **Check Total Realized PnL** | Enables/disables realized PnL monitoring. |
| **Minimum Total Realized PnL, USD** | The **minimum** total realized profit required for the trigger to generate a notification. |
| **Check Unrealized PnL** | Enables/disables unrealized PnL monitoring. |
| **Minimal Unrealized PnL, USD** | The **minimum** unrealized profit required for the trigger to generate a notification. |

---

## **Permissions**  

| **MT4** | **MT5** |
| --- | --- |
| No specific permissions are required. | No specific permissions are required. |

---

## **Trigger Logic 🔍**  

### **How It Works:**  

1️⃣ When a **new order is created**, the trigger **monitors** it for a specific **time period** (set in Transaction Monitoring Time).  

2️⃣ During this time, the trigger **analyzes the trade’s profit** using either:  
   - **USD profit** (if the "Use Profit, USD" setting is enabled).  
   - **Profit in spreads** (measuring the difference between the actual price and the initial order price).  

3️⃣ **If the profit exceeds the defined thresholds**, the system **generates a notification** marking the account as a **possible insider.**  

4️⃣ If the transaction **closes with a loss**, the notification is **removed.**  

### **Additional Filters:**  

✅ The trigger **ignores accounts with a negative total profit.**  
✅ It **ignores accounts where the total symbol volume** is **less than or equal** to the individual order volume (to filter out hedging positions).  

---

🎯 **Key Takeaways:**  
✅ Detects **suspicious rapid profits** potentially linked to **insider trading.**  
✅ Uses **multiple profit thresholds** (USD, spreads, commissions) to improve accuracy.  
✅ **Ignores losing trades & negative PnL accounts** to reduce false positives.  
✅ Ensures **detailed transaction insights** in the dealer's notifications.

---

## Rates Gaps

# **Rates Gaps**  

## **General Information**  

The **Rates Gaps** trigger detects **price feed gaps** and **incorrect quotes** in trading instrument price streams. When an unusual price gap is identified, the system **notifies the dealer** accordingly.

---

## **Menu Navigation**  

📌 You can find the **Rates Gaps** trigger under:  
**Risk Management** → **Event Triggers**  

![Rates Gaps](i/rates-gaps/rates-gaps.webp)  

---

## **Edit Settings**  

![Rates Gaps Settings](i/rates-gaps/rates-gaps-settings.webp)  

| **Parameter Name** | **Description** |
| - | - |
| **Rule Name** | Assign a custom name to the rule. |
| **Minimum Quote Gap** | Set the **threshold value (in %)** for price differences to trigger a notification. |
| **Symbol Groups** | Select groups of symbols to monitor. |
| **Included Symbols** | Specify individual symbols for monitoring. |

---

## **Notifications**  

When triggered, the notification includes a **TradingView chart** of the affected symbol.  

📌 **Important:** If the notification is not processed in real-time, the gap may no longer be visible on the chart.  

![Rates Gaps Chart](i/rates-gaps/rates-gaps-chart.webp)  

---

## **Permissions**  

| **MT4** | **MT5** |
| - | - |
| No specific permissions required. | No specific permissions required. |

---

## **Trigger Logic**  

1. The trigger **monitors live price feeds** for trading instruments.
2. It **compares the actual symbol price** with the previous quote.
3. If the **price difference exceeds the set threshold**, the system **generates a notification** for the dealer.

---

## Run Uppers

# **Run Uppers**  

## **General Information**  

The **Run Uppers** trigger detects trader accounts with a **"Low Start"** strategy, where traders consistently generate profitable trades in recent transactions. This may indicate **exploitation of dealing desk vulnerabilities**.  

---

## **Menu Navigation**  

📌 You can find the **Run Uppers** trigger under:  
**Risk Management** → **Event Triggers**  

![Run Uppers](i/run-uppers/run-uppers.webp)  

---

## **Edit Settings**  

![Run Uppers Settings](i/run-uppers/run-uppers-settings.webp)  

| **Parameter Name** | **Description** |
| --- | --- |
| **Count of Trades** | The number of most recent trades (including open orders) analyzed for profitability patterns. |
| **Sensitivity** | A **notional value** that defines the **ratio of profitable trades to unprofitable trades**. |

---

## **Permissions**  

| **MT4** | **MT5** |
| --- | --- |
| No specific permissions required. | No specific permissions required. |

---

## **Trigger Logic**  

1. The trigger **monitors account profitability** when new orders are processed by the trade server.  
2. It **analyzes the most recent trades** (as defined by the **Count of Trades** setting).  
3. If the profitability ratio **exceeds the Sensitivity threshold**, the trigger generates a **notification**.  
4. 🚨 The notification **remains active** until processed by a dealer.

---

## Spread Widening

# **Spread Widening**  

## **General Information**  

This trigger is designed to help brokers **monitor liquidity providers (LPs)** by tracking spread widening for a specified symbol. It alerts the user when the spread exceeds a predefined threshold.

---

## **Menu Navigation**  

📌 You can find the **Spread Widening** trigger under:  
**Risk Management** → **Event Triggers**  

![Spread Widening](i/spread-widening/spread-widening.webp)  

---

## **Edit Settings**  

![](i/spread-widening/spread-widening-settings.webp)  

| **Parameter Name** | **Description** |
|--------------------|-----------------|
| **Rule Name** | Assign a custom name to the rule. |
| **Active** | Toggle the rule on or off. |
| **Severity** | Set the importance level of the notification: **Critical**, **Warning**, or **Notice**. |
| **Spread Threshold** | Set the **number of points** that, when exceeded, will trigger a notification. |
| **Ticks Count** | Define the number of ticks within the specified time window that must exceed the threshold for a notification to be created. |
| **Time Window (minutes)** | Defines the duration (from **1** to **60** minutes) during which the system tracks ticks that exceed the spread threshold. A notification is created only if the number of such ticks within the current window reaches or exceeds the **Ticks Count** value. Multiple threshold breaches within the same window do **not** generate additional notifications. A new notification can only be created when a **new time window** starts and the condition is met again. |
| **Symbols Groups** | Select groups of symbols to monitor. |
| **Included Symbols** | Specify individual symbols for monitoring. |

---

## Permissions

| **MT4** | **MT5** |
|---------|---------|
| No specific permissions required. | No specific permissions required. |

---

## Trigger Logic

1. The user **configures the trigger rule**, defining:
   - **Spread threshold**
   - **Ticks count**
   - **Time window**
   - **Symbols to monitor**

2. Once activated, the trigger monitors spreads for the selected symbols.

3. If the **spread surpasses the threshold**:
   - The system counts the number of exceeding ticks within the defined time window.  
   - If the **number of ticks ≥ configured Ticks Count**, a **notification is created**.  
   - No additional notifications will be generated until a **new time window starts**.

---

## Example

- **Spread threshold**: 100 points  
- **Ticks count**: 2  
- **Time window**: 5 minutes  

👉 If within 5 minutes the spread exceeds 100 points **at least twice**, a notification will be created.  
If it continues to exceed within the same window, no new notification will appear.  
A new notification may be generated when the **next 5-minute window begins**.

---

## Symbol Unusual PnL

# **Symbol Unusual PnL**  

## **General Information**  

The **Symbol Unusual PnL** trigger detects **abnormal profit and loss (PnL) fluctuations** for specific trading symbols. It calculates a **60-day historical average** PnL for each symbol and compares it to the **current session's PnL**. If the actual PnL exceeds the historical average **by a user-defined threshold**, a **notification is sent to the dealer**.  

---

## **Menu Navigation**  

📌 You can find the **Symbol Unusual PnL** trigger under:  
**Risk Management** → **Event Triggers**  

![Symbol Unusual PnL](i/symbol-unusual-pnl/symbol-unusual-pnl.webp)  

---

## **Edit Settings**  

![Symbol Unusual PnL Settings](i/symbol-unusual-pnl/symbol-unusual-pnl-settings.webp)  

| **Parameter Name** | **Description** |
| - | - |
| **Rule Name** | Assign a custom name to the rule. |
| **Threshold Level** | Defines the **multiplier** by which the **actual session PnL** must exceed the **historical average PnL** (calculated over 60 days) to trigger a notification. |
| **Minimum Clients Profit (USD)** | The **minimum session profit** required for a client account to appear in the notification. If the profit is below this value, the account is **not included**. |
| **Symbol Groups** | Select groups of symbols to monitor. |
| **Included Symbols** | Specify individual symbols for monitoring. |

---

## **Permissions**  

| **MT4** | **MT5** |
| - | - |
| No specific permissions required. | No specific permissions required. |

---

## **Trigger Logic**  

1. The trigger **calculates the 60-day historical average PnL** for each symbol.  
2. It **compares the actual session PnL** to the historical average.  
3. If the actual session PnL **exceeds the threshold multiplier**, a **notification is generated**.  
4. The notification displays **the 10 most profitable accounts** for the affected symbol during the session.

---

## Trader Activity

# **Trader Activity**

## General Information

The **Trader Activity** trigger is designed to detect specific activities in specified traders' accounts. Traders can be tracked in real-time using their **account IDs, IPs, CIDs, emails, or names**. The following activities can be detected by the trigger:

- A trader has opened a position;
- A trader has closed a position;
- A trader has placed a pending order;
- A trader has deleted a pending order;
- A trader has made either a deposit or a withdrawal;
- A trader has modified an open position or pending order.

Once the activities specified in the settings are detected, the trigger generates a **real-time notification** for the dealer to process.

## Menu Navigation

You can find the **Trader Activity** trigger under:  
**Risk Management** → **Event Triggers**

![](i/trader-activity/trader-activity.webp)

## Edit Settings

![](i/trader-activity/trader-activity-settings.webp)  
![](i/trader-activity/trader-activity-activities.webp)

| **Parameter Name** | **Description** |
|--------------------|----------------|
| **Rule Name** | A user can assign a specific name to the created rule. |
| **Detectable Activity Types** | Select the types of activities that the trigger will alert you to for the specified accounts, account groups, countries, emails, IPs, and surnames. The activities that can be detected include:<br /> - A trader has opened a position;<br /> - A trader has closed a position;<br /> - A trader has placed a pending order;<br /> - A trader has deleted a pending order;<br /> - A trader has made either a deposit or a withdrawal;<br /> - A trader has modified an open position or pending order.<br /> Multiple selections are allowed. |
| **Countries** | Select the desired countries from the drop-down list. A **real-time notification** will be generated when trades are detected from the selected countries. Multiple selections are allowed. |
| **E-mail Addresses** | Type the email address in this field. A **real-time notification** will be generated when trades are detected from users with the selected email addresses. |
| **IP Addresses** | Type the IP addresses in this field. It is possible to specify **IP ranges** in this setting. A **real-time notification** will be generated when trades are detected from specified IPs (e.g., `255.255.255.1`) or **IP ranges** (e.g., `255.255.255.0/12`). |
| **CID** | A **real-time notification** will be generated when a trade is detected from the selected CID. |
| **ID Numbers** | A **real-time notification** will be generated when a trade is detected from the selected ID numbers. |
| **Surnames** | Type the surname in this field. A **real-time notification** will be generated when trades are detected from users with the specified surnames. |
| **Minimum Session PnL, USD** | A **real-time notification** will be generated when the specified PnL value is reached. |
| **Minimum Deposit, USD** | A **real-time notification** will be generated when the specified deposit value is reached. |
| **Operation Comment** | Specify a description in the trading platform by which the activity can be identified. |
| **Account Groups** | Groups of accounts that are included in the monitoring. |
| **Included Accounts** | Individual accounts that are included in the current rule. |
| **Symbol Groups** | Groups of symbols that are included in the current rule. |
| **Symbols** | Specific symbols that are included in the current rule. |

## Trigger Logic

The trigger continuously monitors the settings specified in different rules. Once a specified activity is detected, it generates a **real-time notification**, which can then be processed by the dealer.

---

## Margin Level

# **Margin Level**  

## **General Information**  

The **Margin Level** trigger monitors **free margin on hedge accounts** and notifies the dealer when a specified threshold is reached.  

📌 **Important:** This feature requires a **direct connection to the LP** to monitor hedge accounts properly.  

---

## **Menu Navigation**  

📌 You can find the **Margin Level** trigger under:  
**Risk Management** → **Hedge Accounts**  

![Margin Level](i/margin-level/margin-level.webp)  

---

## **Edit Settings**  

![Margin Level Settings](i/margin-level/margin-level-settings.webp)  

| **Parameter Name** | **Description** |
| --- | --- |
| **Rule Name** | A user can give a specific name to the rule. |
| **Margin Level, %** | When free margin reaches this level, a notification is generated. |
| **Included Accounts** | The accounts monitored by this rule. |
| **Excluded Accounts** | The accounts **not** monitored by this rule. |

---

## **Trigger Logic**  

1. **Monitors free margin levels** of selected hedge accounts.  
2. When the **specified margin level** is reached:  
   - A **notification** is generated for the dealer.  
3. If an account belongs to multiple rules, the **first rule in the list** will generate the notification.

---

## Swap Change Alert

# **Swap Change Alert**  

## **General Information**  

The **Swap Change Alert** trigger detects **changes in swaps on hedge accounts** and notifies the dealer accordingly.  

📌 **Important:** This feature requires a **direct connection to the LP** to monitor hedge accounts properly.  

---

## **Menu Navigation**  

📌 You can find the **Swap Change Alert** trigger under:  
**Risk Management** → **Hedge Accounts**  

![Swap Change Alert](i/swap-change-alert/swap-change-alert.webp)  

---

## **Edit Settings**  

![Swap Change Alert Settings](i/swap-change-alert/swap-change-alert-settings.webp)  

| **Parameter Name** | **Description** |
| --- | --- |
| **Rule Name** | A user can give a specific name to the rule. |
| **Short Swaps Change Percentage, %** | Defines the percentage change in **short swaps** that triggers a notification. |
| **Long Swaps Change Percentage, %** | Defines the percentage change in **long swaps** that triggers a notification. |
| **Included Accounts** | The hedge accounts monitored by this rule. |
| **Excluded Accounts** | The hedge accounts **not** monitored by this rule. |

---

## **Trigger Logic**  

1. **Monitors swap values** on selected hedge accounts.  
2. When the **specified change in swaps** is reached:  
   - A **notification** is generated for the dealer.  
3. If an account belongs to multiple rules, the **first rule in the list** will generate the notification.

---

## Radar

# **Radar**  

## **General Information**  

The **Radar** section provides brokers with a **real-time overview of the most profitable traders** within their system. By using customizable filters, brokers can **identify high-performing traders** based on specific financial and trading parameters.  

This feature is particularly useful for:  
- **Monitoring large or aggressive traders** who may pose risks to the brokerage.  
- **Identifying trading strategies** that consistently generate significant profits.  
- **Detecting potential arbitrage or suspicious activity** by setting alerts for unusually high gains.  
- **Assessing leverage usage** to prevent excessive risk-taking.  

By setting **minimum thresholds** for key metrics such as **equity, balance, trading volume, leverage, and unrealized profit**, brokers can **filter and track specific traders** that meet their criteria. The **Radar** ensures that brokers have immediate visibility into **high-impact trading activity**, allowing them to respond proactively to potential risks or opportunities.  

---

## **Menu Navigation**  

📌 You can find the **Radar** page in **Risk Management** section.

![Radar](i/radar.webp)  

---

## **Radar Filters**  

Brokers can fine-tune the **Radar** by setting the following **minimum values**:  

| **Parameter Name**         | **Description** |
|----------------------------|---------------|
| **Min Equity, USD**       | Sets a minimum equity threshold. |
| **Min Balance, USD**      | Sets a minimum balance threshold. |
| **Min Volume, USD**       | Sets a minimum trading volume threshold in USD. |
| **Min Volume, Lots**      | Sets a minimum trading volume threshold in Lots. |
| **Min Unrealized Profit, USD** | Sets a minimum unrealized profit threshold. |
| **Min Leverage**          | Sets a minimum leverage threshold. |
| **Total PnL to Balance, %** | Sets a minimum percentage of total profit to balance. |

---

## **How It Works**  

1. **Adjust filters** – Set the minimum values for the traders you want to monitor.  
2. **View filtered traders** – The system displays traders who meet the criteria.  
3. **Monitor in real time** – Get insights into profitable accounts and their trading activity.

---

## Related Profiles

# **Related Profiles**  

## **General Information**  

The **Related Profiles** section in Trading Platform helps brokers **identify accounts and logins** that are **connected** by specific criteria.  

📌 This makes it easy to **detect clients with multiple accounts** based on:  
- **CID number**  
- **IP address**  
- **Email**  
- **Full name**  
- **ID number**  

---

## **Menu Navigation**  

You can find the **Related Profiles** page in **Risk Management** section.

![Related Profiles](i/related-profiles.webp)  

---

## **Searching for Related Information**  

1. **Select a parameter** from the drop-down menu.  
2. The system will display **all related logins** and their **total count**.  
3. You can **export** the results in **.CSV format** for further analysis.  

### **Navigating to Aggregated Accounts**  
📌 Clicking on a **parameter value** in the search chart will **redirect you to the Aggregated Accounts page** for a deeper analysis.  

---

## **Permissions for MT5**  

![Related Profiles Permissions](i/related-profiles-permissions.webp)

---

## Suspicious Accounts

# **Suspicious Accounts**  

## **General Information**  

The **Suspicious** section lists accounts that have been **flagged by the broker** as potentially risky or engaging in **suspicious activities**.  

---

## **Menu Navigation**  

📌 You can find the **Suspicious** section under:  
**Risk Management** → **Suspicious**  

![Suspicious](i/suspicious.webp)  

---

## **Suspicious Accounts Table**  

| **Parameter Name**       | **Description** |
|--------------------------|---------------|
| **Login**               | Account login number. |
| **Server**              | Trading server on which the account operates. |
| **Group**               | Group of accounts the flagged account belongs to. |
| **Net Volume, USD**     | The net trading volume of the account in USD. |
| **Margin Level, %**     | The margin level of the account. |
| **Equity**              | The equity of the account in its currency. |
| **Session PnL, USD**    | The account’s profit/loss for the current session. |
| **Total PnL, USD**      | The account’s total profit/loss. |
| **Reason for Suspicion** | Broker’s comment explaining why the account was flagged. |
| **Actions**             | Controls for managing the flagged account. |

---

## **Marking an Account as "Suspicious"**  

There are two ways to flag an account as **Suspicious**:  

1. **Using "Search Accounts"**  
   - Navigate to **Search Accounts**.  
   - Locate the account you want to mark.  
   - Flag it as **Suspicious**.  

2. **Via Account Information Page**  
   - Click on the account’s login number.  
   - Open the account details.  
   - Mark the account as **Suspicious** directly from the page.  

📌 **Note:** Flagging an account as **Suspicious** does not automatically apply restrictions but helps brokers monitor high-risk accounts more effectively.

---

# Metabase,-Репортинг,-Базы-данных

## Untitled

## Как найти Daily carried swaps в Metabase?

Брокер может просмотреть Daily carried swaps через специальные отчеты в Metabase:

**Для общего обзора:**
Используйте готовый отчет по ссылке:  
https://metabase.example.com/question/69-daily-swaps
![image_(4).png](/.attachments/image_(4)-5b6069f6-9e96-4a10-93fd-743077775236.png)
Этот отчет показывает сводные данные по накопленным свопам.

**Для детализации по счетам:**
Примените фильтры в отчете Account State:  
https://metabase.example.com/question/3-account-state?Time=thismonth  
![image_(5).png](/.attachments/image_(5)-d232a6e3-577f-487b-8159-1959b76174ad.png)
Здесь можно отфильтровать данные по конкретным аккаунтам и временному периоду (например, за текущий месяц).

**Важно:**
Оба отчета работают с историческими данными и обновляются после ежедневного ролловера. Текущие (еще не обработанные) свопы можно проверить непосредственно в интерфейсе Trading Platform.

---

## Untitled

## Как исключение счетов влияет на данные в Metabase?

При исключении счета из Trading Platform важно учитывать, что исторические данные в Metabase **не пересчитываются автоматически**. Информация останется в том виде, в котором она была на момент генерации отчетов, даже если счет позднее был исключен из системы.

## Можно ли обновить данные после исключения счета?

Да, по специальному запросу брокера техническая поддержка может выполнить **перемиграцию данных репортинга**. В этом случае:

1. Все отчеты будут пересчитаны с учетом текущего списка счетов
2. Исключенные счета не будут учитываться в обновленных данных
3. Процесс занимает от 30 минут до нескольких часов
4. Обычно выполняется в выходные дни из-за высокой нагрузки на БД

## Рекомендации:
- Для актуальной аналитики планируйте перемиграцию после массового исключения счетов
- Учитывайте время обработки при запросе пересчета
- Исторические данные до перемиграции сохранят исходные значения

---

## Untitled

## Как выбрать конкретный сервер в отчетах Trading Platform?

По умолчанию система показывает агрегированные данные по всем серверам MT4/MT5. Для получения отчетности по отдельному серверу:

1. Найдите раздел выбора серверов в интерфейсе репортинга
2. В соответствующей секции выберите нужный вам сервер из списка
3. Примените настройки - отчет пересчитается только для выбранного сервера

![reporting_server_filter.png](/.attachments/reporting_server_filter-8a2aff8c-58b3-4508-9b1b-ab70de99dcda.png)
**Важно:**  
- Выбор сервера доступен как для MT4, так и для MT5
- Можно выбирать несколько серверов одновременно
- Для возврата к сводной статистике по всем серверам сбросьте выбор

**Примечание:**  
Некоторые отчеты могут требовать дополнительной фильтрации после выбора сервера для более детализированных результатов.

---

## Untitled

## Как скачать полный отчёт в Account State без ограничений?

В Metabase по умолчанию действует ограничение на выгрузку 1000 строк. Для получения полного отчёта выполните следующие действия:  

1. Нажмите кнопку **Open Editor** (пример интерфейса: open_editor.png)  
![open_editor.png](/.attachments/open_editor-e94a2b51-0238-4c6e-9eb6-b4254e70c2dc.png =700x)
2. В открывшемся редакторе запроса найдите параметр **LIMIT 1000**  
3. Удалите это ограничение из запроса  
4. Сохраните изменения (пример сохранения: 
 
![limit1000_editor_save.png](/.attachments/limit1000_editor_save-aa167722-6c3a-4a17-b8c1-23bb0750dbad.png =700x)

После этих действий станет доступна полная выгрузка данных.

Данная процедура позволяет обойти ограничение в 1000 строк и получить полные данные по всем счетам за выбранный период. Полученный файл будет содержать все строки.

---

## Untitled

## Когда становятся доступны исторические данные в репортинге?

После подключения репортинга необходимо учитывать следующие временные особенности:

1. **Первичная загрузка данных**  
   Минимальный срок ожидания составляет 1 сутки - только после этого появляются первые дневные изменения по символам.

2. **Формирование исторических периодов**  
   - Недельные данные: начнут корректно отображаться после накопления полной недели истории  
   - Месячные/квартальные данные: будут рассчитываться от точки накопления недельной истории  

3. **Важный нюанс**  
   Пока не накоплена достаточная история, все расширенные периоды (неделя/месяц/квартал) будут автоматически рассчитываться от самой ранней доступной даты в системе.

**Пример:**  
Если репортинг подключен 1 июня:
- 2 июня появятся данные за 1 июня
- Корректные недельные отчеты будут доступны с 8 июня
- Месячные отчеты с 1 июля будут считать данные от 1 июня

---

## Untitled

## Почему нельзя экспортировать данные отчет в репортинге, например, Winners/Losers за весь год?

В Metabase действует системное ограничение на экспорт больших объемов данных - нельзя выгрузить более 2000 строк за один раз. При попытке экспорта отчета Winners/Losers за 12 месяцев (2023 год) это ограничение препятствует полной выгрузке всех данных.

## Как можно получить полные данные за год?

1. **Разделение периода**  
   - Экспортируйте данные поквартально или помесячно  
   - Затем объедините файлы вручную  

2. **Альтернативные способы**  
   - Используйте API для последовательной выгрузки данных  
   - Сохраняйте отчеты регулярно в течение года  

3. **Техническое решение**  
   - Для брокеров с доступом к БД можно выполнить прямой SQL-запрос  

**Примечание:**  
Это ограничение является особенностью Metabase:  
[Обсуждение на discourse.metabase.com](https://discourse.metabase.com/search?q=Display%20more%20than%202000%20rows)

---

## Untitled

##Каков расчёт оборота в USD в репортинге?
Если нет прямой котировки с USD, то считаем по кросс-курсам.  
     
 ##Где берется курс конвертации по мультивалютным счетам для пересчета в USD?

Мы формируем отчет EOD и все пересчитывается по текущему курсу в USD.

---

## Untitled

## Как устроено хранение данных в Trading Platform?

Trading Platform использует гибридную систему хранения данных. Нода (сервер приложений) хранит в оперативной памяти данные текущей сессии и состояние счетов с начала календарного месяца. База данных используется только для долгосрочного хранения информации и получает данные однократно при ежедневном ролловере.

## Почему выбрана такая архитектура?

Архитектура выбрана для обеспечения максимальной производительности. Прямые запросы к базе данных были бы слишком медленными для работы в реальном времени и создавали бы чрезмерную нагрузку на серверы. Хранение оперативных данных в памяти ноды позволяет мгновенно обрабатывать запросы.

## Как работает месячный цикл данных?

Нода начинает новый цикл 1 числа каждого месяца, постепенно накапливая данные. К 31 числу объем достигает максимума, после чего вся информация сбрасывается и цикл начинается заново. Это позволяет точно рассчитывать месячный PnL по календарным месяцам.

## Где хранятся данные текущей сессии?

Все данные текущей сессии, включая расчеты просадок и дневных PnL, хранятся исключительно в памяти ноды. База данных подключается только один раз в сутки во время ролловера для записи итоговых данных.

## Почему возможны неточности в первые сутки работы с новым брокером?

В первые сутки возможны неточности в суточном PnL из-за отсутствия данных предыдущего ролловера. Эта ситуация автоматически корректируется в последующие дни работы системы.

## Как формируются отчеты по периодам?

Отчеты формируются строго по календарным периодам. Например, 31 марта не войдет в недельный отчет с 1 по 6 апреля, так как эти даты принадлежат разным месяцам. Месячные отчеты всегда считаются с 1 по последнее число месяца.

---

## Untitled

## Как обновляются данные в репортинге Trading Platform?

Система получает "сырые" данные (котировки, события) через MT API, после чего самостоятельно рассчитывает состояния счетов и сохраняет их в собственной БД. Эти данные проходят агрегацию перед отображением в отчетах. Важные особенности:

1. **Синхронизация с MT5**  
   На ролловере данные сверяются с отчетами MT5, но прямая работа с БД MT не осуществляется

2. **Доступность данных**  
   - Текущая сессия: доступна только в интерфейсе Trading Platform  
   - Закрытые сессии: появляются в репортинге после миграции  

## Как модифицировать отчеты?

1. **Правильный способ**  
   - Скопировать стандартный отчет в Custom Reports  
   - Вносить изменения только в копию  

2. **Важно**  
   Прямое редактирование дефолтных отчетов приведет к потере изменений при обновлениях системы. В таком случае можно обратиться в поддержку для восстановления оригинальных отчетов.

## Особенности работы с Metabase
Данные выгружаются в Metabase только после закрытия торгового дня, поэтому онлайн-аналитика через репортинг невозможна.

---

## Untitled

## Почему данные за первый день в репортинге могут быть некорректными?

В репортинге Trading Platform существует особенность учета данных за первый день. Статистика может отображаться неточно из-за отсутствия информации о нереализованной прибыли (unrealized PnL) с предыдущего торгового дня. Это связано с тем, что система не имеет исторических данных для расчета правильного начального состояния позиций.

## Как это влияет на отчеты?

1. **Для всех дней, кроме первого**  
   - Данные отображаются корректно  
   - Учитывается полная история позиций  

2. **Для первого дня**  
   - Возможны расхождения в unrealized PnL  
   - Нет данных о предыдущем состоянии позиций  
   - Статистика по объему может быть неполной  

## Рекомендации по работе с отчетностью
При анализе данных рекомендуется:
- Не учитывать первый день для точных расчетов
- Использовать данные, начиная со второго дня подключения репортинга
- Для первых дней делать поправку на возможные неточности

**Важно:** Эта особенность касается только первого дня после подключения репортинга, все последующие дни учитываются полностью и корректно.

![reporting_1st_day_pnl.png](/.attachments/reporting_1st_day_pnl-255d321c-7b79-4395-b576-634f63463972.png =850x)

---

## Untitled

## Как проверить и устранить проблемы таймаутов в репортинге?

При возникновении ошибок медленного выполнения SQL-запросов 
```sql
SELECT "Timestamp", "UnrealizedProfitInUsd", "RolloverSwapsInUsd", "Login", "AccountGroup", "Balance", "BalanceInUsd", "Credit", "CreditInUsd", "Volume", "SessionMaxDrawdown", "SessionMaxTradeLeverage", "Margin", "MarginInUsd", "UnrealizedProfit", "TotalRealizedProfit", "TotalRealizedProfitInUsd", "TotalProfitCorrection", "TotalProfitCorrectionInUsd", "BalanceProfitDay", "CreditProfitDay", "RealizedProfitDay", "RealizedProfitDayInUsd", "SessionOpenedVolumeInLots", "SessionOpenedVolumeInUsd", "SessionClosedVolumeInLots", "SessionClosedVolumeInUsd", "ABookSessionProfit", "ABookSessionProfitInUsd", "BBookSessionProfit", "BBookSessionProfitInUsd", "UpdateTimeUtc", "SessionTradeOrders", "CommissionAgent", "CommissionAgentInUsd", "Commission", "CommissionInUsd", "SessionProfitCorrection", "SessionProfitCorrectionInUsd", "IsReal"
FROM "AccountStateDaily"
WHERE "Timestamp" >= '2021-08-31 00:00:00.000'
ORDER BY "UpdateTimeUtc", "Timestamp", "Login" LIMIT 200000;
```
рекомендуется:

1. **Провести переиндексацию таблиц**  
   Основное решение - обслуживание таблицы AccountStateDaily, особенно проблемного поля UpdateTimeUtc. Аналогичную процедуру стоит выполнить для всех таблиц, используемых в репортинге, не только для конкретного брокера.

2. **Проверка таймаутов**  
   - Уточнить установленное значение таймаута в настройках подключения к БД  
   - Вручную выполнить проблемный запрос и замерить время выполнения  
   - Сравнить с настроенным значением таймаута

## Как отследить успешность миграций данных?

1. **Мониторинг через ReportMigrationMetadata**  
   Эта таблица содержит информацию о статусе миграций. Отсутствие записи для MT5 (как на приложенном скриншоте) указывает на незавершенную миграцию.

![reportmigrationmetadata.png](/.attachments/reportmigrationmetadata-4fb92653-58aa-48c5-afc7-8f58a68317c0.png =600x)
2. **Анализ логов**  
   Логи миграции данных содержат детали ошибок (пример в приложенном фрагменте лога), которые помогают диагностировать проблему.

```sql
 2024-10-14 16:11:34.1230|DEBUG|PilotDatabaseService.Execute: $SELECT "Timestamp", "UnrealizedProfitInUsd", "RolloverSwapsInUsd", "Login", "AccountGroup", "Balance", "BalanceInUsd", "Credit", "CreditInUsd", "Volume", "SessionMaxDrawdown", "SessionMaxTradeLeverage", "Margin", "MarginInUsd", "UnrealizedProfit", "TotalRealizedProfit", "TotalRealizedProfitInUsd", "TotalProfitCorrection", "TotalProfitCorrectionInUsd", "BalanceProfitDay", "CreditProfitDay", "RealizedProfitDay", "RealizedProfitDayInUsd", "SessionOpenedVolumeInLots", "SessionOpenedVolumeInUsd", "SessionClosedVolumeInLots", "SessionClosedVolumeInUsd", "ABookSessionProfit", "ABookSessionProfitInUsd", "BBookSessionProfit", "BBookSessionProfitInUsd", "UpdateTimeUtc", "SessionTradeOrders", "CommissionAgent", "CommissionAgentInUsd", "Commission", "CommissionInUsd", "SessionProfitCorrection", "SessionProfitCorrectionInUsd", "IsReal" FROM "AccountStateDaily" 
	Line  2249: reporting-1          |                                    WHERE "Timestamp" >= '2021-08-31 00:00:00.000'
	Line  2250: reporting-1          |                                    ORDER BY "UpdateTimeUtc", "Timestamp", "Login" LIMIT 200000;
	Line  2251: reporting-1          | 2024-10-14 16:11:48.1051|DEBUG|Batch acquisition of 0 triggers
	Line  2252: reporting-1          | 2024-10-14 16:12:06.1507|ERROR|57014: canceling statement due to user request
	Line  2253: reporting-1          | 2024-10-14 16:12:06.1543|ERROR|   at Npgsql.Internal.NpgsqlConnector.ReadMessageLong(Boolean async, DataRowLoadingMode dataRowLoadingMode, Boolean readingNotifications, Boolean isReadingPrependedMessage)
	Line  2254: reporting-1          |    at System.Runtime.CompilerServices.PoolingAsyncValueTaskMethodBuilder`1.StateMachineBox`1.System.Threading.Tasks.Sources.IValueTaskSource<TResult>.GetResult(Int16 token)
	Line  2255: reporting-1          |    at Npgsql.NpgsqlDataReader.<ReadMessage>g__ReadMessageSequential|49_0(NpgsqlConnector connector, Boolean async)
	Line  2256: reporting-1          |    at Npgsql.NpgsqlDataReader.NextResult(Boolean async, Boolean isConsuming, CancellationToken cancellationToken)
	Line  2257: reporting-1          |    at Npgsql.NpgsqlDataReader.NextResult(Boolean async, Boolean isConsuming, CancellationToken cancellationToken)
	Line  2258: reporting-1          |    at Npgsql.NpgsqlCommand.ExecuteReader(Boolean async, CommandBehavior behavior, CancellationToken cancellationToken)
	Line  2259: reporting-1          |    at Npgsql.NpgsqlCommand.ExecuteReader(Boolean async, CommandBehavior behavior, CancellationToken cancellationToken)
	Line  2260: reporting-1          |    at Npgsql.NpgsqlCommand.ExecuteDbDataReaderAsync(CommandBehavior behavior, CancellationToken cancellationToken)
	Line  2261: reporting-1          |    at Dapper.SqlMapper.QueryAsync[T](IDbConnection cnn, Type effectiveType, CommandDefinition command) in /_/Dapper/SqlMapper.Async.cs:line 434
	Line  2262: reporting-1          |    at Bp.Reporting.Core.Database.PilotDatabaseService.InitialSelectQueryAsync[TPilotEntity](IDbConnection connection, String nodeTable, Int32 batchCount, DateTime migrationFrom)
	Line  2263: reporting-1          |    at Bp.Reporting.Core.Database.PilotDatabaseConnection.InitialSelectQueryAsync[TPilotEntity](String nodeTable, Int32 batchCount, DateTime migrationFrom) in /source/Bp.Reporting/Bp.Reporting/Core/Database/PilotDatabaseConnection.cs:line 47
	Line  2264: reporting-1          |    at Bp.Reporting.Workers.Load.WorkerLoadBase`1.ExecuteJob(IReadOnlyList`1 entities) in /source/Bp.Reporting/Bp.Reporting/Workers/Load/WorkerLoadBase.cs:line 55
	Line  2265: reporting-1          |    at Bp.Entities.WorkerBase.Execute(IReadOnlyList`1 entities) in /source/Bp.Domain/Bp.Entities/WorkerBase.cs:line 47
	Line  2266: reporting-1          | 2024-10-14 16:12:06.1547|ERROR|57014: canceling statement due to user request
```
**Рекомендации:**  
При повторяющихся таймаутах необходимо комплексное обслуживание БД и проверка всех связанных таблиц, а не только явно проблемных.

---

## Untitled

## Какие существуют ограничения в Metabase?  
Metabase сохраняет данные только с момента подключения системы. Для получения информации за более ранние периоды потребуются альтернативные источники данных, так как Metabase не мог собирать эти данные ранее. В интерфейсе действует ограничение на отображение 2000 строк, но при выгрузке отчета в файл это ограничение снимается. Отчеты по разным серверам необходимо выгружать отдельно.  

## Какие форматы данных поддерживает Metabase для импорта?  
Система поддерживает импорт данных в форматах SQL, CSV, XLSX, а также через API. Вся необходимая документация по работе с этими форматами доступна в разделе Admin section.  

## Как интерпретировать Trade Reason State?  
Один и тот же торговый счет может учитываться одновременно в разных категориях (например, Mobile Device и Client), если по нему были совершены сделки, попадающие под разные критерии Reason. Достаточно хотя бы одной сделки в каждой категории для такого отображения.  

![trade_reason_state.png](/.attachments/trade_reason_state-4332d10f-0b51-4bbd-97f0-8bd9fc86c793.png =600x)

## Почему в отчетах может отображаться нулевая комиссия?  
Значение "0" в графе Commissions in USD означает, что в течение выбранной сессии по данному счету не было зафиксировано комиссионных сборов. При этом отчет отражает общее состояние счета в указанный период.  

![agent_state_comissions_reporting.png](/.attachments/agent_state_comissions_reporting-3db3766c-21d7-40a6-bf28-6e30e15cee58.png =600x)

## Какие возможности визуализации данных доступны в репортинге?  
Metabase предоставляет гибкие инструменты для настройки визуализаций. Раздел **Country State** позволяет анализировать данные с различными сортировками по странам. 

![country_state.png](/.attachments/country_state-5527692b-6df7-44d5-9083-afd29adbb7a7.png =800x)

Для работы со счетами из конкретной страны (например, Кении за период с 1 по 22 ноября) предназначен отчет **Account State**, который отображает соответствующие данные по выбранным фильтрам.  
![country_state_example.png](/.attachments/country_state_example-384a728c-254b-45c4-a509-46275ea89e8b.png =800x)

---

## Untitled

## Что означает символ "Other" в отчетах Trading Platform?

Символ "Other" используется в репортинге для обозначения операций, не связанных с конкретными торговыми инструментами. К таким операциям относятся:

- Балансовые проводки (пополнения/снятия)
- Кредитные операции
- Корректировки счетов
- Технические начисления/списания

## Как технически формируется "Other"?

В SQL-запросах системы используется специальная конструкция:
```sql
COALESCE(NULLIF("Symbol", ''), 'Other') AS "Symbol"
```
Эта запись означает:
1.  Если поле "Symbol" пустое (NULLIF)
    
2.  Тогда подставляется значение 'Other' (COALESCE)
    
3.  Результат выводится в колонку "Symbol"
    
Таким образом все операции без указанного символа автоматически группируются под меткой "Other" в отчетах.

---

## Untitled

## Как создать группу пользователей в Metabase?

1. **Создание группы**  
   Перейдите в раздел **Admin > Groups**, нажмите "Create group", введите название группы и сохраните.

![metabase_admin.png](/.attachments/metabase_admin-fd9879ce-a5a6-4d5d-9d67-1703178b22ca.png =450x)

2. **Настройка прав доступа**  
   В разделе **Permissions** выберите созданную группу и настройте необходимые права доступа к данным и отчетам.

3. **Добавление пользователей**  
   В разделе **Users** выберите нужных пользователей и назначьте их в созданную группу.

**Где найти инструкции?**  
Подробная документация доступна на официальном сайте Metabase:  
[Metabase Groups Documentation](https://www.metabase.com/docs/latest/administration-guide/08-groups.html)

####Как сделать тестовые доступы в Metabase?
![image.png](/.attachments/image-810152b1-5f0d-4af6-a2e0-64c0ec298ff1.png =850x)

![image.png](/.attachments/image-a8c90db2-cc8f-4a44-97f2-4494c2328806.png =850x)

---

## Untitled

## Что хранится в таблице AccountDailyState?

Таблица AccountDailyState в базе данных Trading Platform содержит ключевую информацию о просадках и плече по счетам. В ней хранятся два основных показателя:

1. **Максимальная просадка** (Max Drawdown)  
2. **Максимальное актуальное плечо** (Max Current Leverage)  

Эти данные используются для построения графиков просадок в интерфейсе Trading Platform.

## Где находится эта таблица?

В архитектуре системы:
- Основная таблица **AccountDailyState** находится в главной базе данных
- Ее аналог **ExtremumValues** существует в базе ноды для оперативного доступа

## Как используются эти данные?

1. Для расчета и отображения исторических графиков просадок  
2. Для анализа рисков по счетам  
3. При формировании отчетов о торговой активности  

**Важно:**  
Данные в таблице обновляются ежедневно после ролловера и содержат сведения на конец каждого торгового дня.

---

## Untitled

## Как отфильтровать счета по стране в Trading Platform?

Для фильтрации счетов по странам используйте отчет Top Volume, где доступен фильтр Countries. Этот инструмент позволяет просматривать все счета выбранной страны вместе с торговыми объемами. Фильтрация работает только при наличии соответствующих пермишенов и заполненных данных о стране для каждого счета.

## Как исключить определенную страну из расчетов профита?

Чтобы исключить счета конкретной страны из расчетов:
1. Создайте отдельную группу для счетов этой страны
2. Перейдите в Dealing Settings > Exclusions
3. Добавьте созданную группу в список исключений.
Это полностью уберет выбранные счета из всех расчетов системы.

---

## Untitled

## Какие данные хранит Trading Platform об удаленных и архивных счетах MT5?

Trading Platform сохраняет полную историю торговли по всем счетам, созданным после его установки, включая те, которые позже были удалены с MT5-сервера. Для счетов, удаленных до внедрения системы, данные отсутствуют. Архивированные счета MT5 могут продолжать отображаться в интерфейсе (раздел Aggregated accounts), так как MT5 не отправляет уведомления об архивации.

## Почему архивные счета MT5 остаются видимыми в Trading Platform?

Архивированные счета остаются в системе из-за отсутствия механизма оповещения об архивации со стороны MT5. Trading Platform продолжает считать такие счета активными, пока не будет выполнена полная пересинхронизация баз данных.

## Как выполняется синхронизация данных после разрыва соединения?

При восстановлении связи Trading Platform автоматически загружает все сделки, совершенные во время отключения. Система полностью восстанавливает историю операций без потери данных. Этот процесс требует стабильного соединения между Trading Platform и MT5-сервером.

## Как обновить данные по архивным счетам?

Для актуализации информации требуется ручная полная синхронизация баз:
- Выполняется техподдержкой по запросу
- Проводится в согласованное время из-за высокой нагрузки
- Гарантирует корректное отображение статуса всех счетов

## Какие технические ограничения существуют?

Основные ограничения связаны с:
1. Отсутствием автоматических уведомлений об архивации из MT5
2. Высокой нагрузкой на сервер при полной синхронизации
3. Необходимостью ручного вмешательства для критических обновлений

**Рекомендации:**
- Регулярно проверять актуальность данных
- Планировать синхронизации в периоды низкой нагрузки
- Обращаться в поддержку при обнаружении расхождений

---

## Untitled

## Что включает Year-to-Date PnL?

Year-to-Date PnL показывает общий финансовый результат с начала года, включая:
- Суммарный PnL по всем сделкам (реализованные и нереализованные)
- Агентские комиссии (rebates)
- Все корректировки и переносы позиций

Данные обновляются ежедневно и отражают актуальное состояние на текущую дату.

---

# Группы-счетов-и-распределение-по-букам

## Untitled

**Вопрос:** Где можно посмотреть список открытых ордеров в
Брокерпилоте?  
**Ответ:** На странице
`https://*брокер*.platform.example.com/new/open-positions` отображается
список всех открытых ордеров за текущую сессию.

**Вопрос:** Как найти нужные ордера среди открытых позиций?  
**Ответ:** Вы можете воспользоваться фильтрами в верхней части
интерфейса: Trade servers, Countries, Account groups, Trade reasons,
Symbol groups и Symbols. Это позволяет отфильтровать список по нужным
критериям.

**Вопрос:** Как выгрузить открытые ордера для анализа?  
**Ответ:** Нажмите кнопку **"Export"** в правом верхнем углу страницы.
На скриншоте она выделена красной рамкой и стрелкой. Система сгенерирует
файл Excel со всеми отфильтрованными позициями.

**Вопрос:** Как сравнить открытые позиции с реализованными?  
**Ответ:** Перейдите на страницу
`https://*брокер*.platform.example.com/new/session/realized-orders?Book=%22BBook%22`,
примените те же фильтры и выгрузите данные. Это позволит сопоставить
открытые и закрытые позиции.

**Вопрос:** Что делать, если фильтрация временно недоступна в
интерфейсе?  
**Ответ:** Вы можете всё равно выполнить экспорт и произвести фильтрацию
в Excel вручную.

**Вопрос:** Что показывает скриншот?  
**Ответ:** Скриншот отображает страницу с открытыми позициями в
Брокерпилоте. В правом верхнем углу выделена кнопка **"Export"** — она
используется для выгрузки отфильтрованных данных. Слева и сверху
находятся панели фильтрации. В таблице ниже представлены открытые ордера
с деталями: номер ордера, сервер, логин, страна, символ, объём, цена
открытия, рыночная цена и причина сделки

 

![](/4dep/12b/photo_2025-04-25_21-58-56.jpg)

---

## Untitled

**Вопрос:** Какие операции считаются коррекциями в Trading Platform?  
**Ответ:** Только те, которые брокер сам определит как коррекции. По
умолчанию Trading Platform не классифицирует операции автоматически как
correction.

**Вопрос:** Как система узнаёт, что считать коррекцией?  
**Ответ:** Мы собираем список рекомендаций от брокера с конкретными
типами операций, комментариями или условиями, по которым нужно
определить коррекции. На основе этого настраивается фильтрация.

**Вопрос:** Можно ли использовать комментарии к сделкам для определения
коррекций?  
**Ответ:** Да, если брокер заранее укажет, какие именно комментарии или
типы сделок следует учитывать как corrections. Без этого Pilot не будет
автоматически выделять такие операции.

**Вопрос:** Что нужно сделать брокеру, чтобы коррекции учитывались
правильно?  
**Ответ:** Брокер должен предоставить список типов операций или
комментариев, которые следует учитывать как коррекции. После этого мы
настраиваем фильтрацию и обработку данных в системе.

---

## Untitled

**Вопрос:** Какие варианты добавления доступны в Trading Platform?  
**Ответ:** Сейчас поддерживаются только два типа добавления —
**символы** и **группы счётов**.

**Вопрос:** Можно ли массово добавить все символы, содержащие, например,
«JPY»?  
**Ответ:** Нет. Массового выбора по маске нет; каждый символ нужно
добавлять вручную, если они не принадлежат отдельной группе.

**Вопрос:** Что произойдёт, если удалить символы из группы?  
**Ответ:** Алерты по этим символам могут продолжить приходить, пока не
будет перезагружена соответствующая нода.

**Вопрос:** Что нужно сделать после удаления символов, чтобы алерты
прекратились?  
**Ответ:** Брокер должен обратиться к команде Trading Platform, чтобы мы
вручную перезагрузили ноды и обновили конфигурацию.

---

## Untitled

## Почему невозможно исключить счёт из правила, если его группа отсутствует?
Ответ: Потому что исключение конкретного счёта возможно только в том случае, если в правиле уже используется соответствующая группа аккаунтов. Если группа не указана в правиле, то исключение не сработает.

## Что произойдёт, если в триггере указаны несуществующие группы?
Ответ: При генерации отчёта появится ошибка:
The following Account group(s) could not be found


## Что делать, если триггер удалён из MT5?
Ответ: Если триггер был удалён из MT5, Trading Platform автоматически обновит все связанные расчёты.

## Что делать, если триггер создавался вручную и содержит неактуальные группы?
Ответ: Необходимо либо удалить соответствующее правило вручную, либо убрать несуществующие группы из настроек триггера. В противном случае при построении отчёта будет возникать ошибка.

## Что делать, если брокер удалил открытую сделку, но она продолжает отображаться?
Ответ: Для корректного отображения необходимо перезапустить систему Trading Platform.

tags: mt5, группы счетов, триггер, настройки триггера

---

## Untitled

**Вопрос:** Учитывает ли Trading Platform PnL по открытым позициям при
переводе счёта на A-book?  
**Ответ:** Нет. Если на момент перевода на A-book на счёте уже была
открыта позиция, её PnL не будет учтён. В настоящее время поддержка
этого сценария отсутствует. Только новые сделки после перехода будут
попадать в учёт как A-book.

**Вопрос:** Почему может отличаться информация между разными отчётами
(например, в B-book net summary)?  
**Ответ:** Различия возможны из-за разных суффиксов символов и расчётов
в разных валютах. Например, по XAGUSD объём в долларах может быть
рассчитан как 58 млн, а по символу — как 2 млн. Это объясняется разными
базовыми валютами, поэтому значения не обязаны совпадать.

**Вопрос:** Почему PnL в A-book может быть отрицательным, даже если
сделки прибыльные?  
**Ответ:** Часто trading profit по умолчанию включается в расчёты
A-book. Поэтому итоговая метрика Total PnL по сессии может быть
отрицательной.

---

## Untitled

**Вопрос:** Что можно исключить из расчётов на сервере в Trading Platform?  
**Ответ:** Вы можете исключать группы символов, группы счетов и
конкретные счета. Исключённые элементы не отображаются в фильтрах и не
участвуют в расчётах PnL, но продолжают обрабатываться системой.

**Вопрос:** Как перейти к настройке исключений?  
**Ответ:** Перейдите в раздел Dealing Desk → Dealing Settings в левом
меню. Выберите пункт Exclusion. Выберите нужный сервер (например,
cTrader) в верхней панели. Нажмите кнопку Edit settings.

![](https://docs.example.com/assets/images/exclusion-a-e3c4e341a601d94103e5a3e2a4782981.webp =800x)

**Вопрос:** Как исключить группы символов или групп счетов?  
**Ответ:** Нажмите Edit list напротив нужного раздела (Excluded Symbol
Groups или Excluded Account Groups). Отметьте нужные группы галочками.
Нажмите Update, затем Save.

![](https://docs.example.com/assets/images/exclusion-b-dcb86c3a1ba3bc2035893d9c9d21347b.webp =800x)
![](https://docs.example.com/assets/images/exclusion-c-c12798cbeeab40ba5490208bf982001c.webp =800x)

**Вопрос:** Как исключить конкретные счета?  
**Ответ:** Введите номер счета в поле Excluded Accounts. Затем нажмите
Save.

**Вопрос:** Как удалить исключения?  
**Ответ:** Перейдите в Dealing Desk → Dealing Settings → Exclusion,
нажмите Edit settings. Удалите элементы, используя иконку корзины.
Подтвердите изменения кнопкой Save.

---

## Untitled

**Вопрос:** Почему после деления позиций по букам отображаются
округлённые значения?  
**Ответ:** Если значение нельзя поделить на равные части (например, при
делении 1.99 на 2), результат будет округлён. По умолчанию округление
выполняется до двух знаков после запятой, поэтому визуально в интерфейсе
может отобразиться -1.00 вместо -0.995.

![rounding_value.png](/.attachments/rounding_value-f49f8ed7-85bb-4edd-9428-68c3449cb84f.png)

**Вопрос:** Возникает ли ошибка в расчётах при этом округлении?  
**Ответ:** Нет. Несмотря на визуальное округление на фронтенде, данные с
бэка приходят корректные и используются в расчётах.

**Вопрос:** Что делать, если логин не отображается как A-book, хотя
должен?  
**Ответ:** Нужно проверить настройки A-book. Возможно, по счёту открыта
позиция по криптовалютам, которые не указаны в A-book. Тогда при
открытии позиций по другим инструментам (например, Forex) система
отразит их как A-book.

**Вопрос:** Почему иногда нужно делать выгрузку, чтобы увидеть
правильные значения A-book?  
**Ответ:** Это может быть связано с багом в отображении на сайте (в
Summary). В таких случаях необходимо создать баг-задачу и передать её в
команду.

---

## Untitled

**Вопрос:** Почему группа аккаунтов не распределяется в ожидаемый бук
(A/B/C/D-book)?  
**Ответ:** Возможны несколько причин:
- Группа уже включена в другое правило.
- Группа относится к другому серверу.

**Вопрос:** Пример: почему группа, заканчивающаяся на «-R», не помечена
как STP/не B-book?  
**Ответ:** Группа `USD-TI-SD-O43-R` не была добавлена в настройки A-book
на сервере `Live6`. После добавления группы в конфигурацию, аккаунты
начали отображаться корректно.

**Вопрос:** Пример: почему аккаунт отображается как A-book, если его
группа — B-book?  
**Ответ:** Группа аккаунта входит в одно из правил в A-book Settings.
Нужно проверить и при необходимости скорректировать список групп,
включённых в A-book.

---

## Untitled

**Вопрос:** Почему из правил в Trading Platform исчезают группы?  
**Ответ:** Если группы становятся недоступными для Trading Platform, они
автоматически удаляются из правил.

**Вопрос:** Почему группы могут стать недоступными?  
**Ответ:** Это связано с изменениями, внесёнными в настройки групп на
стороне Metatrader. Если группа перестаёт быть доступной, Trading Platform
больше не может её использовать в правилах.

---

## Untitled

**Вопрос:** Почему в A-book отображаются разные котировки для одного
символа?  
**Ответ:** В разделе Net summary может отображаться одна котировка, а
при переходе по ссылке — другая. Это связано с разной логикой
отображения данных. Для получения полной картины необходимо учитывать
хеджированные объёмы.

**Вопрос:** Как посмотреть полные объёмы в A-book?  
**Ответ:** В Net summary нужно нажать кнопку **Split Hedged Volumes**,
чтобы раскрыть и учесть все части объёма.

**Вопрос:** Как проверить, какие логины имеют exposure по определённому
инструменту в A-book и B-book?  
**Ответ:** Перейдите в **Dealing Desk → Net Summary**, выберите нужный
инструмент или символ. Там отобразятся логины, имеющие exposure.

---

## Untitled

**Вопрос:** Почему значения Hedging summary и A-Book Strategy могут
отличаться в Session Summary?  
**Ответ:** Они могут отличаться, если настройки A-book, групп аккаунтов
или процентного покрытия заданы некорректно.

**Вопрос:** Что нужно сделать, чтобы значения совпадали?  
**Ответ:** Брокеру необходимо проверить настройки A-book, убедиться в
правильности распределения групп аккаунтов и корректности покрытия в
процентах. Если все параметры заданы правильно — значения Hedging
summary и A-Book Strategy будут совпадать.

**Вопрос:** Как убедиться, что данные отображаются корректно?  
**Ответ:** Если данные по хэдж-счетам совпадают с отображаемыми в
Trading Platform, то всё настроено верно, и дополнительных действий не
требуется.

---

## Untitled

**Вопрос:** Что происходит с позициями, уже отмеченными как B-book, при
переводе счёта на A-book?  
**Ответ:** Все позиции, ранее отмеченные как B-book, сохранят этот
статус. Изменение не применяется к уже открытым сделкам.

**Вопрос:** Когда начнут применяться настройки A-book после перевода
счёта?  
**Ответ:** Новые настройки применяются только к позициям, открытым после
переключения счёта на A-book.

**Вопрос:** Зачем сохраняется статус B-book для старых позиций?  
**Ответ:** Это необходимо для корректного учёта исторических сделок и
точной отчётности за прошлые дни.

---

## Untitled

### Типы буков и логика распределения в Пилоте

**Вопрос:** Кто такие клиенты A-book?  
**Ответ:** Это, как правило, крупнейшие клиенты или аккаунты самого
брокера. Они могут иметь прямой выход на поставщика ликвидности, а
брокер зарабатывает с комиссии за лот или спред, независимо от прибыли
или убытков клиента.

**Вопрос:** Что означает B-book?  
**Ответ:** Это модель, при которой брокер сам выступает в роли
маркет-мейкера. Все ордера обрабатываются внутри брокера, не выходя на
внешний рынок. Прибыль трейдера равна убыткам брокера.

**Вопрос:** Что такое C-book/D-book?  
**Ответ:** Это дополнительная классификация, используемая брокером по
своему усмотрению. Часто применяется смешанная модель — мелкие ордера
остаются в B-book, крупные передаются в A-book.

**Вопрос:** Как определяется распределение по букам в cTrader?  
**Ответ:** cTrader сам определяет распределение и передаёт его Пилоту.
Чтобы понять, почему счёт попал в определённый book, нужно проверить
настройки распределения на сервере cTrader.

**Вопрос:** Что такое 'Account sentiment'?  
**Ответ:** Это столбец, показывающий соотношение покупателей и продавцов
по головам. Учитываются и полностью залокированные позиции. Например, 1
лот buy и 1 лот sell дадут соотношение 50:50.

**Вопрос:** Как настраивается распределение по букам в Пилоте?  
**Ответ:** Автоматически — по признаку вроде MtDeal.DealerID в MT5. Если
такого поля нет или используется распределение по группам, то брокеру
нужно настроить это вручную.

**Вопрос:** Почему счёт с 50% покрытием по USDJPY попал в A-book?  
**Ответ:** Если на момент экспорта не было открытых позиций, счёт
считается A-book по умолчанию. Если бы были активные позиции по
инструменту с 50% покрытием, он бы классифицировался как C-book.

**Вопрос:** Какой диапазон значений можно фильтровать в новом и старом
UI?  
**Ответ:** В новом интерфейсе можно фильтровать значения от 50 до 500
(топ покупателей/продавцов на B-book), в старом — от 5 до 5000.
Возможно, в будущем это будет унифицировано.

---

## Untitled

**Вопрос:** Учитывается ли отключённый счёт (disabled) в расчётах PnL в
Trading Platform?  
**Ответ:** Да. Если счёт отключён в Metatrader, его данные, включая PnL,
продолжают учитываться и отображаться в дашбордах Trading Platform.

**Вопрос:** Почему отключённый счёт всё ещё участвует в расчётах?  
**Ответ:** Потому что в системе Trading Platform он всё ещё существует и по
нему есть карточка. Enable/Disable в Metatrader означает только
разрешение или запрет торговли, а не исключение из расчётов.

![tradedisabled_mt.png](/.attachments/tradedisabled_mt-89ee7063-7a24-4f6d-bae5-b135217d701b.png)

**Вопрос:** Как исключить отключённый счёт из расчётов?  
**Ответ:** Брокер может добавить этот счёт в список исключений в разделе
**Dealing Settings**. После этого счёт перестанет участвовать в
расчётах.

---

## Untitled

**Вопрос:** Есть ли способ проверить фактический чистый объём без учёта
A-book и B-book?  
**Ответ:** Нет. В Trading Platform чистые объёмы рассчитываются с учётом
настроек для A-book и B-book, а также с исключением счетов и групп,
указанных в исключениях.

---

## Untitled

**Вопрос:** Почему брокер не видит часть групп аккаунтов в списке A-book
или B-book?  
**Ответ:** Возможно, брокер проверяет отображение только по одному типу
бука, тогда как нужные группы относятся к другому (например, помечены
как C-book или D-book). Рекомендуется проверить все буки.

**Вопрос:** Что делать, если отключённый счёт из Metatrader продолжает
отображаться в Trading Platform?  
**Ответ:** Необходимо вручную добавить этот счёт в исключения в разделе
Dealing Settings → Exclusion. Только так он будет исключён из
отображения и расчётов в системе.

---

# Интеграции,-доступы-и-сервера

## Untitled

### Как получать данные из Trading Platform через API?

Брокер может получать данные из Trading Platform на свой сайт, например, информацию о спредах, используя API. Для этого он должен запросить у вас эндпоинт и предоставить API-документацию.

* * *

### Что нужно для подключения по API?

Для подключения по API брокеру нужен **токен**, который он сам создаёт в разделе Administration > Users. Первым шагом он должен выполнить запрос авторизации с этим токеном. В ответ он получит **сессионный токен**, который будет использоваться для всех последующих запросов.

* * *

### Где найти документацию по API?

Документацию по использованию API можно найти по ссылке: [https://support.example.com/articles/BA-A-2116583454/Trading Platform-API-documentation](https://support.example.com/articles/BA-A-2116583454/Trading Platform-API-documentation).

* * *

### Какие запросы доступны по API?

Через API доступны **все запросы** независимо от выбранных разрешений.

---

## Untitled

### Deriv: Вопросы по обновлению

Компания **Deriv** иногда обращается к нам с просьбой разрешить обновление, которое они проводят на своей стороне. Они могут выполнить его без нашего разрешения, но всё равно запрашивают его.

* * *

### Что делать в таких случаях?

На всякий случай, если поступает подобный запрос, следует уточнить возможность обновления у **команды Customer Success** или технической поддержки.

---

## Untitled

### Почему вместо имени пользователя в уведомлениях отображается ID?

Такая ситуация возникает, если у вас **нет разрешения** (**permission**) **"View Users"**. Также вместо имени пользователя может отображаться его ID, если этот пользователь был **удалён** из системы.

![user_id.png](/.attachments/user_id-169eee0b-6d8c-4675-8974-607ee86f13e2.png =850x)

![view_users_permission_new_ui.png](/.attachments/view_users_permission_new_ui-84dcd8a2-963a-45d0-8998-592c7e7aab01.png =550x)

---

## Untitled

### Какие дополнительные доступы нужны для МТ5 при установке нового менеджера?

Для установки нового менеджера в Trading Platform на **МТ5**, помимо доступов к разделам **Summary** и **Exposure**, необходимы дополнительные разрешения (пермишены) в Manager API.

![mt5_access.png](/.attachments/mt5_access-e9138341-e2c0-4cc9-889a-951bf15eabac.png =450x)

### Какие пермишены нужны в разделе Dealing?

В разделе **Dealing** требуются следующие доступы:
*   **Access orders and positions** — для просмотра ордеров, сделок и позиций.
    
*   **Edit orders, positions, and deals** — для редактирования ордеров, сделок и позиций.
    
*   **Delete orders, positions, and deals** — для удаления ордеров, сделок и позиций.
    
*   **Dealer** — для выполнения торговых операций.
    
*   **Supervisor** — для просмотра всей очереди запросов от клиентских групп.
    
*   **Show raw quotes without spread difference** — для просмотра котировок без учёта спреда.
    
*   **Throw in quotes** — для выставления котировок.
    
*   **Modify spread and execution mode** — для изменения спреда и режима исполнения.
    
*   **Risk manager** — для получения информации о позициях клиентов и покрывающих позициях компании.
    
*   **Edit groups (margin settings)** — для изменения настроек маржи в группах.
    
*   **Edit groups (commission settings)** — для изменения настроек комиссий в группах.
    
*   **Receive reports** — для запроса и получения отчётов.
    

* * *

### Какие пермишены нужны в разделе User servers access?

В разделе **User servers access** необходимы доступы:
*   **show basic UI features**
    
*   **Show issues**
    
*   **Show alerts** (отвечают за отображение алертов, включая алерты семафоров и алерты от триггеров в разделе **Risk Management**).
    

* * *

### Где можно найти полную документацию по пермишенам?

Полный список пермишенов для Manager API при SaaS описан в документе: [https://docs.google.com/document/d/1_9CA_wdZpbeo5HrxNTICazSHI_tH6l8cdSkIcZKDx8o/edit?tab=t.0](https://docs.google.com/document/d/1_9CA_wdZpbeo5HrxNTICazSHI_tH6l8cdSkIcZKDx8o/edit?tab=t.0).

---

## Untitled

### Повлияет ли замена лицензий МТ-серверов на интеграцию с нашими продуктами?

Нет, **замена лицензий** МТ-серверов, связанная с ребрендингом, **не повлияет** на интеграцию с нашими продуктами.

---

## Untitled

### Как запросить установку демо-сервера в Trading Platform?
Для добавления демо-сервера необходимо выполнить следующие шаги:

1. Обратиться в Customer Success с запросом на добавление демо-сервера
2. Получить и заполнить специальную форму конфигурации
3. Предоставить json-файл с настройками сервера

### Какие особенности установки демо-сервера?
- Услуга предоставляется бесплатно
- Процесс инициируется после получения заполненной формы и конфигурационного файла
- Все настройки выполняются командой Trading Platform

---

## Untitled

### Как изменить почту для логина в Trading Platform?

Чтобы изменить почту для логина в Trading Platform, брокеру необходимо предоставить новый список адресов электронной почты. Мы протестируем эти изменения на нашей тестовой площадке. Если всё пройдёт успешно и не вызовет сбоев, мы заменим почтовые адреса для всех сотрудников из предоставленного списка.

---

## Untitled

```json{
"BrokerName" : "brokername",
"Environment" : "prod",
"Name": "Quotes Metatrader",
"NodeName": "Quotes MT5Live",
"TimeZone" : 120,`
```
Параметр "TimeZone" : выставить в 120 минут это UTC+2
Котировщик перегрузить

![quotes_timezone.png](/.attachments/quotes_timezone-b0958fab-0ef0-4cee-bda9-7aee8c8e07ec.png =700x)

---

## Untitled

### Возможно ли подключить Trading Platform к бриджу Centroid?

Нет, на данный момент у нас нет интеграции с мостом **Centroid**. Мы разрабатываем собственный мост.

---

## Untitled

### Как интегрировать виджет Trading Platform?

#### Инструкция по интеграции:
1. Добавьте файл `widgets.js` на вашу страницу:
   - Разместите сразу после тега `<body>`
   - Или внутри тега `<head>`

2. Вставьте код из `index.html` в нужное место страницы, где должен отображаться виджет

3. В теге виджета:
   ```html
   <bp-widget api="ВАШ_API_ЭНДПОИНТ">
Замените `ВАШ_API_ЭНДПОИНТ` на адрес вашего сервера.

4.  Проверьте работу:
    *   Откройте страницу в браузере
   
    *   Убедитесь в успешном подключении виджета
        

#### Дополнительные возможности:

*   Кастомизация стилей через блок `<style>`
    
*   Гибкое управление макетом виджета
    
*   Настройка под конкретные требования

---

## Untitled

### Как календарь праздников влияет на триггеры?

Для отслеживания праздников и их учёта в работе триггеров на **МТ4** необходимы админские разрешения (**admin permission**) для **Manager API**, чтобы система могла читать конфигурацию праздников. На **МТ5** такой проблемы нет.

* * *

### Как Брокерпилот решает эту проблему?

Брокерпилот умеет транслировать настройки праздников с **МТ5** на **МТ4**, если у брокера есть нода МТ5. Другой способ — использовать специальный плагин для **МТ4**, который будет передавать эти настройки в Брокерпилот, даже без предоставления админских разрешений.

---

## Untitled

### Что делать, если брокер переносит сервер?

Брокер должен уведомить нас перед началом переноса сервера. Это позволит нам отключить сервисы и избежать сбоев. После завершения миграции брокеру следует снова связаться с нами для их повторного включения.

---

## Untitled

### Почему не отображаются символы в Change Swaps Specifications?

Если символы не отображаются, брокеру необходимо проверить разрешения (**пермишены**). Они должны быть выданы через **Admin API**, а не через **Manager API**.

* * *

### Какие пермишены нужны?

Необходимо убедиться, что у вас есть разрешение **"Connect using MetaTrader 5 Administrator"**.

![connect_using_metatrader_5_administrator.png](/.attachments/connect_using_metatrader_5_administrator-08b629e9-18aa-4f9f-83e0-b5c7c45eff68.png =700x)

---

## Untitled

##Почему Session PnL может отображаться некорректно после подключения нового хедж-счёта?

При подключении нового хедж-счёта, показатель Session PnL за текущий день отображается неверно. 

Для нового счёта данные прошлого ролловера отсутствуют, поэтому весь Floating PnL попадает в Session PnL. Это влияет на общую статистику.

Эта проблема является временной и решается после ролловера, тогда данные будут синхронизированы.

Также это происходит на начальном этапе установки Trading Platform.

---

## Untitled

### Как установить плагин на MT4?

Для установки плагина на MetaTrader 4 необходимо скопировать файл в каталог плагина на сервере, а затем **перезапустить MT4**. Перезапуск подразумевает остановку сервера. Это может занять до получаса, и в течение этого времени торговля будет приостановлена. Рекомендуется выполнять такие работы в **выходные дни** для минимизации влияния на торговый процесс.

* * *

### Как установить плагин на MT5?

Чтобы установить плагин на MetaTrader 5, достаточно скопировать файл в каталог плагинов и нажать кнопку **"Обновить"** в интерфейсе MT5. Перезапуск сервера при этом не требуется, и торговля не останавливается.

---

## Untitled

### Когда обновляется информация isPrime в Trading Platform?

Информация из isPrime обновляется через API **на следующий день**. Эта особенность может вызывать вопросы у брокеров, так как отличается от работы других интегрированных сервисов.

---

## Untitled

### Как подключить хедж-счет в MT5?

Для подключения хедж-счета в MT5 требуется специальное решение через торговый советник, так как прямое подключение отличается от других систем.

* * *

![mt5_hedge_expert.png](/.attachments/mt5_hedge_expert-486af961-623f-4de1-ac2b-1d3c38e53683.png =900x)
### Как это работает?

Создается отдельный терминал MT5, к которому подключается один счет. Используются логин и пароль брокера с **правами инвестора** (доступ через API не поддерживается). На этом терминале устанавливается специальный **советник (Expert Advisor)**, в котором указана целевая хедж-нода. Обмен данными возможен только через этот советник. Доступ к данным осуществляется в **режиме чтения**. Для каждого счета необходим отдельный терминал.

---

## Untitled

### Почему в праздничные дни на MT4 срабатывает семафор?

На серверах MT4 нет встроенных настроек для праздничных дней, которые бы отключали торговлю. В Trading Platform эти настройки загружаются с **MT5-ноды**. Если брокер устанавливает праздничные дни непосредственно перед событием, эти настройки могут не успеть примениться, так как на MT4 не приходит соответствующее уведомление (ивент).

* * *

### Как избежать срабатывания семафора в праздники?

Для корректного учёта праздничных дней брокеру следует настраивать их **заранее**, чтобы дать системе время загрузить настройки из MT5. Перезапуск системы также помогает применить текущие настройки праздников.

---

## Untitled

### Зачем нужно разрешение Metatrader 5 Administrator?

Разрешение Metatrader 5 Administrator необходимо для работы триггеров по спредам и балансовым операциям, таких как **Agent Comissions**, **Trade restriction Period**, **Change Spread by Period**, **Change Spread by Volume** и других.

* * *

### Почему этого разрешения не было в первоначальном списке необходимых разрешений?

В первоначальном списке разрешений (Technical Requirements) указаны только те, что необходимы для базовой работы Брокерпилота. Остальные разрешения, включая Metatrader 5 Administrator, брокер предоставляет по мере необходимости при активации новых триггеров.

* * *

### Где брокер может посмотреть требуемые разрешения для триггеров?

Брокер может найти список необходимых разрешений для триггеров в документации, в нижней части каждой страницы, в разделе **#Permissions**.

---

## Untitled

### Логи сервера MT (MT4, MT5, Метака)
Можно дать только сам брокер. В МТ, в консоли есть инструмент выгрузки лога, в том числе с фильтром - по менеджеру, счету, имени плагина.
#### Логи плагина
Лежат у брокера в папке логов, в каталоге сервера. Для Dynamic Leverage, например, путь будет выглядеть как` logs\platform_netleverages`

### Логи ноды
Независимо, где установлен Trading Platform (как SaaS или On Premise), доступ есть только у наших Dev Ops и админов.

---

## Untitled

### С каких IP-адресов Trading Platform подключается к клиенту?

Доступ к системе клиента осуществляется с IP-адресов: **203.0.113.10/32** и **203.0.113.11/32**.

* * *

### Что еще нужно предоставить клиенту?

Также необходимо уточнить у команды **DevOps** адрес сервера, на котором установлен клиент, и сообщить эту информацию клиенту.

---

## Untitled

### Что делать, если учётная запись заблокирована?

Если после нескольких неудачных попыток входа в систему учётная запись была заблокирована, пользователь увидит сообщение **"Account locked due to too many failed login attempts"**. Разблокировать аккаунт можно как на нашей стороне, так и на стороне брокера, если ему были переданы все права управления пользователями.

* * *

### Как разблокировать аккаунт?

Если права управления переданы брокеру, ему нужно выполнить следующие шаги:
1.  Зайти на сайт Trading Platform.
    
2.  Открыть раздел **Users**.
    
3.  Включить фильтр **Show Blocked**.
    
4.  Найти и разблокировать нужную учётную запись.
   

![show_blocked_old_ui.png](/.attachments/show_blocked_old_ui-ce414137-8cbc-4644-8cfb-7656f32857ca.png)

### Кто должен разблокировать права?

Если сотрудник брокера просит разблокировать какие-либо права, нужно убедиться, что сам брокер контролирует выдачу прав. Как правило, права сотрудникам брокера должны выдавать их коллеги, а не мы.

* * *

### Можно ли настроить двухфакторную аутентификацию?

Брокер может включить двухфакторную аутентификацию (2FA) для своих сотрудников в настройках сайта. Например, по ссылке: [https://broker.example.com/new/admin/settings](https://broker.example.com/new/admin/settings).

* * *

### Можно ли задать требования к паролю?

На данный момент нет опции, которая позволяет заставить сотрудников брокера использовать определённый формат паролей (с заглавными, строчными буквами или специальными символами).

---

## Untitled

### Сколько плагинов в Trading Platform?

В Trading Platform есть четыре плагина:
*   **Dynamic Leverage.** Этот плагин позволяет управлять маржинальными требованиями для открытых позиций в определённые периоды, например, во время новостей.
    
*   **Swaps Changer.** Этот плагин работает на **MT4** и **MT5** и позволяет централизованно менять свопы на всех серверах через сайт Trading Platform без предоставления административных разрешений для Manager API.
    
*   **Дополнительный CID Control.** (только для **MT4**) Он передаёт в Trading Platform IP-адреса и CID онлайн-сессий клиентов для анализа, агрегации групп счетов и поиска аффилированных счетов.
    
*   **Email Sender.** (только для **MT4**) Этот плагин позволяет делать автоматическую email-рассылку с уведомлениями, акциями и важными обновлениями. Он поддерживает шаблоны, массовую отправку и настройку получателей по группам клиентов.

---

## Untitled

### Особенности создания учётной записи для демо-счетов

Наши системы могут работать с разными типами подключений, а также с диапазонами счетов и групп. Создать учётную запись для демо-счетов можно так же, как и для реальных, используя тот же **Access** и те же права. Важно только убрать права на редактирование счетов и сделок, если они есть на рабочей (production) площадке.

* * *

### Что важно учитывать?

Важно, чтобы **не было общих счетов** с реальными, так как это может привести к дублированию данных.

---

## Untitled

### Сообщение "No Items found" при начислении дивидендов

Сообщение **"No Items found"** появляется, когда для выбранного инструмента на сервере **не разрешено начисление дивидендов**.

* * *

### Что нужно сделать, чтобы исправить ошибку?

Брокеру следует зайти в настройки сервера в Trading Platform и проверить, добавлена ли группа данного инструмента в раздел **дивидендов**. Важно помнить, что **дивиденды по инструментам FOREX не начисляются**.

---

## Untitled

### Можно ли создать отдельное тестовое окружение для брокера?

Да, это возможно. Есть два варианта создания тестового окружения, в зависимости от технических возможностей брокера.

* * *

### Как создать тестовое окружение, если у брокера есть отдельный сервер?

Брокер предоставляет нам URL для подключения, а также логин и пароль менеджера. Мы подключаем его как новую ноду в Брокерпилоте, разворачиваем для неё отдельную базу и настраиваем тип «демо». В дальнейшем брокер сможет выбирать, какой сервер использовать (демо или реальный) при формировании отчетов. Доступен также смешанный режим.

* * *

### Что делать, если у брокера нет отдельного сервера?

Брокер создаёт новый аккаунт менеджера в МТ, который имеет доступ только к группе счетов, предназначенной для тестирования. Этот аккаунт подключается к Брокерпилоту. Важно, чтобы счета в тестовой группе не пересекались со счетами, доступными на основном подключении.

* * *

### К кому обращаться для создания тестового окружения?

Для согласования технической конфигурации такого запроса необходимо обратиться к аккаунт-менеджерам.

---

## Untitled

### Что происходит с данными при сбое сервера?

При сбое или потере соединения с сервером MT5 мы мгновенно получаем оповещение через нашу систему мониторинга **Zabbix**.

* * *

### Как происходит восстановление данных после дисконнекта?

После восстановления соединения Trading Platform автоматически запрашивает у MT5 все пропущенные данные и восстанавливает их. Обычно этот процесс занимает от **30 до 60 секунд**. Вы всегда будете видеть актуальную информацию на сайте. В случае длительного отсутствия соединения мы информируем наших администраторов и клиента, чтобы установить причину.

---

## Untitled

### Как настроить отображение времени в правом верхнем углу?

Время на сайте зависит от сервера (ноды), с которого оно отображается. Чтобы управлять приоритетом отображения, используется параметр **"TopBarPriority"**. Чем ниже значение этого параметра, тем выше приоритет у ноды.

* * *

### По какому времени отображается информация в Trading Platform?

Время операций со счетами, таких как смена плеча или последнее подключение, всегда отображается по времени **сервера МТ**.

---

## Untitled

### Как интегрировать виджет Trading Platform через Widget JS?

Для интеграции виджета необходимо выполнить следующие шаги:

1. Добавьте файл widgets.js на вашу страницу. Разместите его непосредственно после открывающего тега <body> или внутри раздела <head>.

2. Вставьте HTML-код из файла index.html в то место страницы, где должен отображаться виджет.

3. В теге виджета <bp-widget api="https://example.com/public-api"...> замените значение атрибута api на адрес API вашего сервера.

4. После выполнения этих шагов откройте страницу в браузере для проверки корректного подключения виджета.

### Особенности работы виджета:
Виджет использует защищенное соединение между фронтендом и бекендом, что исключает возможность внешних подключений к бекенду. Важно отметить, что это именно виджет, а не полноценное API. Он подключается по схеме: домен_брокера/widget.js. При необходимости можно передавать список символов для отображения определенных данных.

### Как установить Trading Platform через API?
Для установки через API воспользуйтесь официальной документацией по использованию API Trading Platform (Trading Platform API Usage Documentation), где подробно описаны все необходимые методы и параметры интеграции.

---

## Untitled

### Можно ли настроить плагин Dynamic Leverage без интерфейса Trading Platform?

Теоретически, настроить плагин **Dynamic Leverage** можно и без интерфейса Trading Platform, однако для этого потребуется участие наших разработчиков. Клиенту не следует сообщать об этой возможности, так как она не является стандартной процедурой.

---

## Untitled

### Что представляет собой Hedge нода в системе Trading Platform?
Hedge нода является специализированным серверным компонентом, предназначенным исключительно для работы с хедж-счетами. Ее основная функциональная задача заключается в получении данных по хедж-счетам, их сохранении в базе данных и последующем отображении в интерфейсе Trading Platform.

### Каковы ключевые отличия Hedge ноды от стандартных нод?
Главное отличие Hedge ноды от обычных нод MT4/MT5 заключается в ограниченном функционале. В то время как стандартные ноды обеспечивают взаимодействие с торговой платформой MetaTrader, Hedge нода выполняет  функции сбора и передачи данных.
 
### Почему система генерирует уведомления о хедж-счетах?
Уведомления появляются в случаях, когда в системе одновременно присутствуют как активные, так и неактивные хедж-счета. Наличие хотя бы одного отключенного хедж-счета будет являться постоянным источником таких уведомлений до момента решения проблемы.
![image_4.png](/.attachments/image_4-6e2c888a-2e51-48d1-aa30-1a6ae5a240a5.png)
### Как устранить проблему с уведомлениями?
Чтобы убрать это уведомление, необходимо актуализировать список хедж-счетов в системе, удалив неиспользуемые или отключённые счета, либо перезапустить.

![image_5.png](/.attachments/image_5-fc970902-4d5b-4d8f-8973-8ff253d28038.png)

---

# Общие-настройки-и-нюансы-работы-с-Trading Platform

## Untitled

## Что представляет собой раздел Challenges в Trading Platform?

Раздел Challenges - это специализированный функционал, разработанный по запросу проп-фирм для управления торговыми испытаниями. Система предоставляет базовые инструменты для настройки правил прохождения челленджей, но не гарантирует полное соответствие специфическим требованиям каждого брокера.

## Какие возможности предоставляет функционал?

1. **Самостоятельная настройка правил**  
   Брокер может конфигурировать параметры челленджей аналогично триггерным правилам.

2. **Ограниченный набор параметров**  
   Доступно всего 5 основных параметров (см. скриншот в системе).

3. **Гибкость применения**  
   Функционал позволяет адаптировать Challenges под различные сценарии.

## Какие ограничения важно учитывать?

- Разработчики не предоставляют рекомендаций по настройке значений параметров
- Нет экспертной поддержки по оптимизации правил челленджей
- Функционал является базовой реализацией и может требовать доработок под конкретные нужды

---

## Untitled

### Что происходит со спредом в Change Spread By Period, когда период увеличенного/уменьшенного спреда заканчивается?

Спред возвращается на изначальное значение.

 

### Что будет со спредом, если выключить триггер Change Spread by Period?

Ничего не поменяется. Спред изменяется только во время обозначенного
периода.

---

## Untitled

### Что такое Dashboards в Trading Platform?
Dashboards - это функционал, позволяющий собрать все часто используемые отчеты на одной панели. Вы можете настроить дашборд под свои задачи и выводить его на отдельный монитор для удобного мониторинга.

### Какие виджеты доступны в Dashboards?
Система предлагает обширную библиотеку настраиваемых виджетов, включая:

### Основные торговые виджеты:
1. **Unrealized Orders** - показывает общее количество всех текущих открытых ордеров в дилинговом центре
2. **Pending Orders** - отображает количество активных отложенных ордеров
3. **Session Opened Orders** - счетчик ордеров, открытых в текущей торговой сессии
4. **Session Closed Orders** - количество ордеров, закрытых в текущей сессии

---

## Untitled

#### Что значит кнопка Ignore this Symbol в уведомлениях? 

Если в алертах нажать "Ignore this symbol", то символ перемещается в
настройку семафора в список Excluded Symbols.  
После этого Брокерпилот перестает его контролировать и создавать
алерты. 

####  Как восстановить уведомления по символу после нажатия кнопки Ignore symbol?

Чтобы восстановить уведомления, необходимо удалить символ из списка
исключенных в  Excluded Symbols list.

---

## Untitled

### Как работает триггер Invalid Balances?
Триггер Invalid Balances не производит самостоятельных расчетов, а получает данные о балансах напрямую через API MetaTrader. Его основная функция - сравнивать эти данные с информацией в Trading Platform и выявлять возможные расхождения.

### Что делать при подозрительном срабатывании триггера?

#### Первичная проверка:
1. Откройте консоль MetaTrader
2. Проверьте балансы счетов, по которым получены алерты
3. Сравните с отображаемыми данными в Trading Platform

#### Если в MetaTrader данные корректны:
Требуется диагностика на стороне Trading Platform:
1. Проверить логи API-запросов
2. Убедиться в корректности подключения к MT
3. Проверить время последней синхронизации данных
4. Исключить проблемы с кэшированием

#### Дополнительные действия:
- Убедитесь, что триггер использует актуальные API-методы
- Проверьте наличие обновлений для плагина интеграции
- При повторяющихся ошибках - обратитесь в техническую поддержку

### Важные особенности:
- Триггер работает только с данными, полученными из MetaTrader
- Не производит самостоятельных финансовых расчетов
- Зависит от корректности работы MT API
- Требует периодической проверки при частых срабатываниях

---

## Untitled

Если в триггере указано Accepted by the AI, это означает, что либо нет закрытых позиций, либо трейдер закрыл позиции за пределами настроек триггера, — таким образом, алерт становится неактуальным.

![image.png](/.attachments/image-47525b82-4bb3-4d0e-9079-f707b399a59f.png)

---

## Untitled

#### Что делает триггер Latency Arbitrage?

Триггер показывает, что была задержка котировок и в этот момент был
создан ордер.   
 

#### Какие вычисления делает триггер?

Никаких вычислений триггер не делает. Иной информации, кроме как разрыв
котировок у разных брокеров и период отставания котировки на инструмент,
триггер не показывает.

---

## Untitled

#### Как срабатывает триггер "Negative Balances"? При наличии отрицательного баланса и эквити, или только при отрицательном балансе?

Триггер сработает, если остаток на счете станет отрицательным после
завершения торгов. Если на счёте нет открытых позиций, но они появятся,
то будут приходить алерты по другому триггеру - **Stop Outs Control
(если настроен).**

Если уведомление не было обработано, то новое уведомление не поступит.  
Если уведомление было обработано, то при повторном выполнении условий,
оно появится снова

 

#### То есть, пока позиция в рынке, триггер Negative Balances не будет создавать оповещение?

Если позиция на рынке, это значит, что эквити в плюсе. Иначе сработает
стоп-аут.   
Триггер не будет оповещать, если баланс отрицательный, но эквити в
плюсе.

В случае, если эквити всего счета окажется в минусе, а позиция не
закроется, сработает триггер контроля стоп-аута (stop out control)

Такая ситуация возможна, если произошел сбой экзекьютора, либо
котировочная сессия открыта, а торговая еще не началась. Такое бывает
редко, но возможно.

---

## Untitled

#### Почему New Rates Absence пишет No orders Execution для MT4, когда ордера исполняются?

По такого рода обращениям необходимо срочно перезапустить ноду.

---

## Untitled

### Что значит параметр Number of HFT Deals в триггере Scalpers HFT?

 Это минимальное количество сделок для анализа триггером.

###  Учитывает ли триггер Scalpers HFT плавающие ордера?

Нет, не учитывает. В таких случаях, уведомления не будет.

---

## Untitled

**Вопрос:** Как работает триггер Run Uppers?

**Ответ:** Чем выше значение параметра **Sensitivity**, тем чаще срабатывает триггер.

---

**Вопрос:** Как рассчитывается условие для срабатывания триггера Run Uppers?

**Ответ:**  
Триггер анализирует последние по времени открытия сделки (с учётом открытых и уже закрытых).  
На момент срабатывания может быть виден другой профит, чем тот, на основании которого было сгенерировано уведомление.

Алгоритм следующий:

1. Для каждой сделки берётся абсолютное значение профита.
2. Считаются натуральные логарифмы от этих значений отдельно для прибыльных и убыточных сделок.
3. Получаются две суммы: `profitLn` и `lossLn`.
4. Далее вычисляется: `Ratio = profitLn / lossLn`.
5. Если `Ratio > Sensitivity` (указанное в настройках), триггер срабатывает.

---

**Вопрос:** На каких платформах работает Run Uppers?

**Ответ:** Триггер работает только на **MT4**. Для **MT5** он пока не реализован.

---

## Untitled

## В чем разница между Change Swaps и Swaps Free Accounts?

**Change Swaps** — это инструмент для массового обновления значений свопов через CSV-файл. Он позволяет:
- Загружать новые значения свопов для всех или выбранных серверов
- Настраивать кастомные свопы для отдельных групп символов
- Изменять параметры самих торговых инструментов

**Swaps Free Accounts** — это триггер, который:
- Отменяет начисление свопов для определенных счетов/групп
- Работает с уже открытыми позициями
- Действует в течение заданного периода времени

## Как они взаимодействуют?

1. При одновременном использовании:
   - Change Swaps обновляет базовые значения свопов
   - Swaps Free Accounts принудительно обнуляет свопы для подпадающих под условия счетов

2. Технический процесс:
   - MT сначала начисляет свопы при ролловере
   - Затем триггер проверяет условия
   - Для swap-free счетов значение свопа устанавливается в 0

## Влияют ли CSV-свопы на swap-free счета?

Нет, загруженные через CSV значения не применяются к счетам, включенным в правила Swaps Free Accounts. Триггер имеет приоритет и будет продолжать обнулять свопы на этих счетах независимо от загруженных значений.

---

## Untitled

**Вопрос:** Почему на графике Session Total PnL в разделе Current
Session отображается time gap — разрыв по времени, например между 13:00
и 04:17?  
**Ответ:** Такой разрыв на графике возникает, если в указанный
промежуток не было ни одной новой сделки или обновления позиции.
Поскольку данные строятся по событиям, отсутствие активности приводит к
пропуску времени в графике.

![time gap two days.png](/.attachments/time%20gap%20two%20days-5fa8a606-a90d-4c49-8156-606e042ab25c.png)

---

## Untitled

## Как работает Trader Activity Trigger?

Trader Activity Trigger отслеживает активность трейдеров в реальном времени и отправляет уведомления дилерам при определенных действиях. Триггер реагирует на:
- Открытие/закрытие позиций
- Установку/удаление отложенных ордеров
- Изменение параметров позиций и ордеров
- Депозиты (при превышении заданного порога)
- Операции вывода средств

## Как происходит идентификация трейдера?

Идентификация осуществляется по следующим параметрам:
- Номер счета
- IP-адрес
- Client ID (CID)
- Email
- Фамилия трейдера

## Как обрабатывается CID в триггере?

Триггер не определяет точный CID, с которого была совершена операция. Уведомление генерируется, если в списке CID есть хотя бы один счет, соответствующий условиям правила.

## Какие настройки доступны в триггере?

Основные параметры конфигурации:
- **Minimum deposit** - минимальная сумма депозита для срабатывания
- **Minimum session PnL** - минимальный PnL за сессию

## Можно ли настроить порог для операций вывода?

Нет, в текущей версии отдельного параметра для минимальной суммы вывода не предусмотрено. Триггер отслеживает все операции вывода без пороговых ограничений.

---

## Untitled

### Как убрать уведомления об ошибках в Scheduled Jobs в старом UI?

Необработанные уведомления не убрать, они уже стали историей.

Сам ошибочный Job из Trading Platform не удалить, но можно уточнить у
техподдержки возможность удаления в базе.

---

## Untitled

## В каких браузерах Пилот работает стабильно?
Пилот стабильно работает в:
- Microsoft Edge
- Google Chrome (последняя актуальная версия)

## Почему важно использовать рекомендуемые браузеры?
Использование других браузеров может привести к:
- Некорректной работе функционала
- Снижению производительности системы
- Проблемам с отображением интерфейса

## Что делать при жалобах на медленную работу Trading Platform?
1. Уточнить используемый браузер
2. Для Chrome - проверить актуальность версии
3. При проблемах в Chrome:
   - Запросить скриншоты ping/tracert:
     ```
     ping брокер.example.com
     tracert брокер.example.com
     ```
   - Предложить сбросить кеш браузера

## Как сбросить кеш в Chrome?
Инструкция по очистке кеша:  
https://support.google.com/accounts/answer/32050?hl=ru&co=GENIE.Platform%3DDesktop

## Что делать при отсутствии доступа к сайту?
В некоторых случаях помогает:
- Перезагрузка компьютера
- Очистка кеша DNS
- Проверка сетевых подключений

---

## Untitled

### В какой валюте начисляется бонус в Trading Platform?

Бонус начисляется в валюте счёта.

 
### Как рассчитывается бонус в Trading Platform, если валюты клиента и агента отличаются?

Бонус будет рассчитываться в долларовом эквиваленте, используя валюту
агента.

---

## Untitled

### Можно ли восстановить настройки триггера?

Если настройки триггера были импортированы с другого сервера или
удалены, то для попытки восстановления нужно обратиться в техподдержку

 

### Если получится, то как они будут восстановлены?

У нас нет точного списка настроек в БД, ищутся все уникальные правила и
по их последним версиям восстанавливаются. Из-за этого может
восстановиться не всё.

---

## Untitled

**Вопрос:** Где в Trading Platform отображается показатель Current Unrealized PnL?

**Ответ:** Найти его можно в следующих разделах интерфейса:

1. **Current Session** — блок **Dealing Desk** (второй сверху).
2. **Current Session** — самый нижний блок с таблицей, где отображается сводная информация по торговым инструментам.
3. **Dealing Desk > Net Summary**.

---

## Untitled

### Где посмотреть историю уведомлений в **Old UI?**

Перейдите в **Risk Management \> Issues History**.

В фильтре выберите нужный триггер и дополнительные условия.

Для просмотра семафоров (**New Rates Absence, Orders Execution
Control**) перейдите в **Risk Management \> Events History** и выберите
в фильтре **Semaphore**.

 

### Где посмотреть историю уведомлений в **New UI?:**

Нажмите **Risk Management \> Event List**.

Тот же экран открывается при нажатии на **See All Unconfirmed** в окне
последних уведомлений (в верхней правой части экрана).

 

### С какого момента хранится история уведомлений?

Вся история в BP отображается **только с момента установки приложения**.

---

## Untitled

## Можно ли в Trading Platform мониторить спреды?

Да, в Trading Platform доступен мониторинг спредов. Для этого нужно перейти на страницу **Quotes Monitoring**, где отображаются текущие значения спредов в режиме реального времени.  

## Есть ли автоматические уведомления при изменении спреда?

Нет, в текущей версии Trading Platform отсутствует встроенный семафор (автоматическое уведомление) при выходе спреда за заданные границы. Контроль значений спреда осуществляется вручную через интерфейс Quotes Monitoring.  

## Какие ограничения есть у текущего функционала?

1. Нет возможности настроить автоматические алерты при достижении спредом определенных значений  
2. Отсутствует история изменений спреда  
3. Все проверки необходимо выполнять визуально  

Для комплексного мониторинга рекомендуется использовать дополнительное ПО или регулярно проверять страницу Quotes Monitoring вручную.

---

## Untitled

## Поддерживает ли Trading Platform автоматическую обработку дробления акций (Stock Split)?

Нет, в текущей версии Trading Platform отсутствует функционал для автоматической обработки операций дробления акций (stock split), включая обратные сплиты. В отличие от MT5, где такая возможность предусмотрена как стандартная дилинговая операция, Trading Platform не выполняет автоматической корректировки при дроблении акций.

---

## Untitled

## Есть ли в Trading Platform функционал для загрузки настроек праздников?
Нет, в Trading Platform отсутствует функционал для управления настройками праздников.

## Где можно настроить праздничные дни?
Настройка праздников осуществляется исключительно через Metatrader 5 Administrator.

## Почему нельзя настроить праздники через Trading Platform?
В системе:
1. Отсутствует соответствующий механизм настройки
2. Нет необходимых прав доступа для изменения этих параметров
3. Данная функциональность специально вынесена в MT5 Administrator

## Какие настройки праздников доступны в MT5 Administrator?
Через MT5 Administrator можно настроить:
- Даты праздников
- Периоды нерабочих дней
- Особые условия торговли в праздничные дни

---

## Untitled

## Как загрузить дивиденды для нескольких символов одновременно?
Для массовой загрузки дивидендов используйте CSV-файл с заранее подготовленными данными.

## Есть ли шаблон CSV-файла для загрузки дивидендов?
Пример файла доступен здесь:  
[div.csv](/.attachments/div-60e76c63-5081-4df2-b801-61f8a355c2f2.csv)

## Какие преимущества у этого метода?
- Одновременное обновление дивидендов по множеству инструментов
- Стандартизированный формат данных
- Минимизация ручного ввода

---

## Untitled

## Как загрузить дивиденды через корректировку свопов?

Для начисления дивидендов через свопы необходимо:
1. Перейти в Dealing Settings > CFD Rollover & Dividends
![symbolsrollover_dividendsmode.png](/.attachments/symbolsrollover_dividendsmode-3ed4c790-5400-49fb-a478-3c1713752262.png =600x)

2. Выбрать Symbols Rollover & Dividends Mode
3. Активировать режим "Add Swaps"

![dividendsmode_add_swaps.png](/.attachments/dividendsmode_add_swaps-8c3b9a44-f1dc-4937-9b7c-ebc0ed692731.png =700x)

## В чем особенность этого способа начисления?
- Является системной настройкой всей ноды
- Не влияет на стандартный функционал загрузки CSV

## Как альтернативно можно загрузить дивиденды?
Доступен стандартный способ через CSV-файл:
1. Подготовить файл с дивидендами
2. Загрузить в разделе "Scheduling Dividends adjustment"
3. Установить параметры начисления

## Где найти визуальные инструкции?
В системе доступны примеры настроек:

 ![symbolsrollover_dividendsmode.png](/.attachments/symbolsrollover_dividendsmode-3ed4c790-5400-49fb-a478-3c1713752262.png =800x)

---

## Untitled

### При загрузке CSV-файла свопов в **Scheduling Change swaps** появляется ошибка, как убрать? 

-   Убедиться, что загружаемый файл имеет формат CSV.
-   Убедиться, что загружаемый файл не имеет дубликатов.
-   Рекомендуется использовать символ ";" в качестве разделителя
    (semicolon delimiter \\ separator). Есть полезный гайд
    https://www.ablebits.com/office-addins-blog/change-excel-csv-delimiter/#csv-separator,
    это поможет если экспорте файл отображается некорректно
-   Проверить, совпадает ли название и описание символов на выбранном
    сервере с загружаемым файлом.
-   Проверить, включены ли свопы в карточках символов (Enable swaps =
    on).

![symbol_settings_enable_swaps.png](/.attachments/symbol_settings_enable_swaps-e9189682-ab71-423d-a152-0b4b4e2e3a46.png =450x)
 

### Как из репортинга Metabase получить информацию об уже начисленных свопах?

Уже начисленные свопы можно загрузить из Metabase по ссылке типа
[https://metabase.**имяброкера**.example.com/question/8-symbol-state?Time=past90days](https://metabase.example.com/question/8-symbol-state?Time=past90days).
Таблица истории свопов есть у нас в БД SwapsHistory, надо обращаться в
теххподдержку для выгрузки.

 

### Что означает параметр Collect Symbol Suffixes в **Scheduling Change swaps?**

Если этот параметр включен, Брокерпилот автоматически соберёт все
символы с суффиксами по типу EURUSDc, EURUSDd, EURUSDcents и объединяет
их в один общий символ например, EURUSD.  
Если выключен, символы с суффиксами будут отображаются отдельно от
основного, парсинг будет работать строго в соответствии с файлом csv.

 

### Можно ли загрузить свопы из одного CSV-файла на несколько серверов?

При загрузке на разные сервера свопов из одного списка (даже если
инструменты и символы на серверах разные), то свопы обновятся по тем
символам, которые присутствуют на сервере. Соответственно, можно
использовать один список.

 

### Какие разрешения (пермишены) нужны для изменения свопов на MT5?

Чтобы обновлялись свопы на МТ5 нужны соответствующие пермишны. 

![changeswaps_permissions_mt5.png](/.attachments/changeswaps_permissions_mt5-052d0f89-25f4-4220-8bc5-bcbf5fefc41b.png =550x)



### Зачем для изменения свопов на MT5 нужно разрешение администратора?

Administrator права нужны, чтобы менять свопы. В Manager есть только
ограниченный набор полей, которые он может менять. Свопы не входят в
него.   
Поэтому нужен точечный админ пермишен. 

 

### Как происходит изменение свопов в Trading Platform?

Фактически, для изменения свопов, в назначенное время (когда
запланированы jobs) устанавливается админское подключение. 

 

### Можно ли реализовать изменение свопов через Trading Platform, не выдавая разрешение администратора?

У нас есть плагин, через который можно менять свопы не выдавая админ
права. Его надо установить на сервер. Это как альтернатива.  
 

### Почему запланированная операция в **Scheduling Change swaps** не выполнилась, результат Failed job?

Одной из причин может быть неудачная попытка подключения, может
потребоваться проверка логов.

---

## Untitled

#### Почему уведомления не пропадают, пока не обновить страницу?

Может быть проблема в связи браузера и фронта.  
Одно из возможных решений - перезапуск сервиса для исправления проблемы.

---

## Untitled

**Вопрос:** Правильно ли я понимаю, что при установке исключения на бессрочный период уведомления от всех модулей перестанут поступать на этот счёт?

**Ответ:** Исключение работает только в рамках текущего триггера — счёт исключается из обработки именно этим триггером.  
Список исключённых счетов можно найти в настройках системы, в разделе **Exclusion**.

---

## Untitled

## Можно ли использовать Trading Platform на мобильных устройствах?

Нет, в текущей версии Trading Platform не поддерживает работу на мобильных устройствах. Система официально не тестировалась и не адаптирована для мобильных платформ, поэтому использование через смартфоны или планшеты невозможно.

## Какие браузеры поддерживаются?

Официально поддерживается только работа в **Google Chrome**. В других браузерах:
- Функционал может работать некорректно
- Возможны проблемы с отображением интерфейса
- Некоторые функции могут быть недоступны

Для стабильной работы следует использовать исключительно десктопную версию Google Chrome. Мобильные устройства и альтернативные браузеры не гарантируют корректного функционирования системы.

---

## Untitled

### Можно ли в виджетах в Dashboards вывести историческую информацию?

Фильтра по исторической информации в виджетах нет. Вся информация там
актуальна на текущую дату и менять это не планируется. 

 

### Где посмотреть историческую информацию или сводку за определённый период?

Это можно сделать в секции Reporting (Metabase). Там же можно выгрузить
отчёт, если нужно.

---

## Untitled

## Как Trading Platform изменяет торговое плечо на счетах?

Trading Platform предлагает два основных способа управления торговым плечом:

**1. Автоматический режим**
При использовании триггеров "Leverage by Equity" или "Leverage by Volume" система автоматически изменяет плечо при достижении заданных условий. После изменения Trading Platform уведомляет пользователя о произведенной корректировке.

**2. Ручной режим**
Если брокер предпочитает ручное управление, можно настроить систему на отправку уведомлений при достижении определенных значений на счете. Получив такое уведомление, администратор может вручную изменить параметры плеча через интерфейс.

**Важно:** Автоматический режим обеспечивает более оперативное реагирование на изменения рыночных условий, в то время как ручной режим дает полный контроль над процессом, но требует постоянного мониторинга со стороны сотрудников брокера.

---

## Untitled

##Как найти ID пользователя?

Чтобы найти ID пользователя, найдите его профиль, нажмите на опцию
"Change permissions" и скопируйте ID из адресной строки браузера в
открывшемся окне

---

## Untitled

## Как настроить фильтрацию по странам в Trading Platform?

Для реализации фильтрации по странам необходимо выполнить одно из следующих условий:

1. **Наличие прав доступа**  
   У пользователя должен быть пермишен на просмотр пользовательских данных (доступ к персональной информации клиентов).

2. **Дополнительная интеграция**  
   При отсутствии прямого доступа к данным о странах можно реализовать внешнюю интеграцию. Для этого брокеру потребуется:
   - Сформировать словарь соответствий "логин-страна"
   - Обеспечить передачу этих данных в Trading Platform
   - Настроить механизм синхронизации информации

После выполнения любого из этих условий фильтр по странам станет доступен в интерфейсе системы. Важно отметить, что без одного из этих решений использование фильтрации по странам будет невозможно, так как система по умолчанию не имеет доступа к этой информации.

---

## Untitled

### Как переключиться между версиями Trading Platform?

#### Переход в новую версию:
1. **Из старой версии**:
   - Используйте кнопку в верхней панели навигации
   - Или вручную добавьте `/new/` в URL адрес (например: `platform.example.com/new/dashboard`)

2. **Из новой версии**:
   - Нажмите кнопку возврата в нижней части основного меню
   - Или удалите `/new/` из URL адреса

#### Особенности перехода:
- Все брокеры уже имеют доступ к новой версии
- Если кнопка перехода не отображается, изменение URL вручную гарантированно сработает
- Обе версии используют одну и ту же базу данных - все изменения синхронизируются

---

## Untitled

### Как получить CID и IP на сервере MT5 с помощью плагина Trading Platform?

#### Почему был разработан специальный плагин?
Плагин создан для решения проблем предыдущего метода:
1. Неполучение полных логов из MetaTrader
2. Высокая нагрузка на сервер при частом чтении логов

#### Как работает плагин?
- Получает данные CID и IP напрямую с сервера MT4/MT5
- Передает информацию в Trading Platform без промежуточных логов
- Требует перезагрузки сервера после установки
- Начинает сбор данных в течение 24 часов после установки (в этот период отчеты недоступны)

#### Особенности отображения данных:
- Настроенные CID отображаются в правилах триггера
- Для доступа к данным требуются специальные permissions
- Некоторые пользователи могут не видеть информацию без соответствующих прав

#### Важные замечания:
1. Убедитесь, что у пользователя есть необходимые права доступа
2. Учитывайте 24-часовой период сбора данных после установки
3. Не забывайте перезагружать сервер после установки плагина

---

## Untitled

## Как работает триггер Rates Gaps?

Когда разрыв между ценами превышает установленный минимальный порог (например, 5%), система генерирует алерт. Все значения от этого порога до бесконечности будут считаться значимыми и вызывать уведомление.

---

## Untitled

### Как работает триггер Series of Bad Rates?

Триггер сравнивает текущий ценовой тик с предыдущим и проверяются два
условия:

1\. Изменение цены должно превышать заданный порог **Price change in
spreads/percents.**  
2. Направление движения цены должно быть противоположным предыдущему.
Если порог превышен, то триггер запоминает тик.

Если это происходит количество раз, указанное в параметре **Number of
shifts**, и в течение периода времени, меньшего чем в параметре Duration
of unstable new rates flow, то генерируется уведомление.

Для триггера важно именно постоянное разнонаправленное движение тиков —
так пила и образуется на графике.

 

### Я думаю, что Series of Bad Rates ложно сработал, что делать?

1.  Можно проверить тиковую историю в админке.  Так как триггер
    определяет пилы на котировках, свечной график этого не показывает (у
    нас тиковый не отображается сейчас на UI).  
    Примеры пил есть в
    [документации](https://support.example.com/articles/BPIM-A-95781011/2.-4.-4-The-Trigger-Series-of-Bad-Rates).
2.   Можно уменьшить чувствительность триггера, таким образом, увеличив
    порог срабатывания.

---

## Untitled

## Как создать кластер в Trading Platform?

Для создания кластера выполните следующие шаги:

1. Перейдите в раздел **Dealing Settings > Servers**
2. Найдите нужный сервер и откройте его настройки
3. Выберите опцию **Cluster** и нажмите **Edit Settings**
4. Введите название нового кластера
5. Нажмите **Add item** для сохранения

После создания кластера он появится в общем списке. 
![clusters1.png](/.attachments/clusters1-2980f27a-5008-44f7-8bb8-329f909eb096.png =850x)

## Как настроить доступ пользователей к кластерам?

Для ограничения доступа:
1. Перейдите в **Administration > Users**
2. Откройте права доступа нужного пользователя
3. В секции **User Server Access** отключите тумблер полного доступа
4. Выберите конкретные кластеры, которые должны быть доступны пользователю

Это позволяет ограничивать видимость серверов для разных групп пользователей. 
![clusters2.png](/.attachments/clusters2-e516cdba-a926-4b72-9b2f-00e37eb3b56d.png)

**Дополнительные материалы:**  
[Видеоинструкция по работе с кластерами](https://drive.google.com/file/d/18YVLlhOG_4qk9e-nS_KSrpfkuFyjdUeP/view)

---

## Untitled

## Какие доступы нужны для включения триггера Trade Restriction Period?
We need these permissions to manage trade mods. The trigger directly
manages trade modes of symbols over specific time frames on both MT4 and
MT5.

![](https://support.example.com/api/files/162-20197?sign=MTc0MjA4MzIwMDAwMHwxLTI4fDE2Mi0yMDE5N3xWZURGa1lKaHNrRjU0SWhfSEFEdWpXOGhpMFVlX0ZTTmZoSklKbmNHMmZBDQo&updated=1739481018286)

![](https://support.example.com/api/files/162-20199?sign=MTc0MjA4MzIwMDAwMHwxLTI4fDE2Mi0yMDE5OXwxanVDMHdJLTc5VGNJaGtiX1NpVWM2N2w0bDNUZVR6MVRObTE2TkZuV0NnDQo&updated=1739481018286)

---

## Untitled

**Вопрос:** Можно ли создать кастомные группы в Trading Platform?

**Ответ:**  
Да, кастомные группы доступны как в старом, так и в новом интерфейсе:  
`/accounts/accounts-custom-groups` и `/new/accounts/accounts-custom-groups`.

**Вопрос:** Как добавить кастомную группу?

**Ответ:**  
На текущий момент есть два способа:

1. Обратиться в техподдержку Trading Platform.
2. Создать кастомную группу через настройки менеджера (см. скриншот в интерфейсе).

---

## Untitled

**Вопрос:** Как контролировать Margin Requirements для не-форекс инструментов в Trading Platform?

**Ответ:**  
Для этой цели рекомендуется использовать триггер **Dynamic Leverage**.  
Он позволяет эффективно отслеживать и управлять маржинальными требованиями по инструментам, отличным от форекс.

---

## Untitled

## Можно ли применить CFD Rollover к конкретному аккаунту?

Да, для этого используется инструмент **Symbol Rollover**. Подробная документация доступна по ссылке:  
https://docs.example.com/dealing-operations/symbol-rollover

## Как работает CFD Rollover?

1. Позволяет корректировать открытые CFD-позиции по фьючерсам при их экспирации
2. Автоматически пересчитывает PnL на момент поставки актива
3. Обеспечивает корректный перенос позиций

## Какие требования для настройки?

- Необходимо включить специальный пермишен в настройках системы
- Требуется явно указать конкретный аккаунт для применения rollover
- Настройки применяются индивидуально для каждого инструмента

## В каких случаях это используется?

При истечении срока действия:
- Фьючерсных контрактов
- CFD-позиций
- Других производных инструментов с фиксированной датой экспирации

## Как проверить результат применения Rollover?

После выполнения операции:
1. Проверьте историю позиций на аккаунте
2. Убедитесь в корректности пересчитанного PnL
3. Проверьте новые параметры перенесенной позиции

---

## Untitled

**Вопрос:** Можно ли настроить, чтобы разные пользователи в Trading Platform
получали разные уведомления?  
**Ответ:** Нет. В одном экземпляре Trading Platform все пользователи видят
одинаковые уведомления. Возможности распределять типы триггеров или
алертов по пользователям нет.

**Вопрос:** Есть ли обходное решение?  
**Ответ:** Да. Можно настроить интеграцию с Telegram и создать отдельные
каналы, в которые будут поступать уведомления только по определённым
триггерам или семафорам. Это требует предварительной настройки
фильтрации на стороне интеграции.

**Вопрос:** Какая информация о пользователях отображается в
уведомлениях?  
**Ответ:** В новом интерфейсе в уведомлениях отображается, какой
пользователь их обработал.

---

## Untitled

**Есть ли в Trading Platform функция возврата списаний?**  
Нет, на данный момент такой функционал отсутствует .

**Как можно сделать возврат списаний?**  
Возврат можно выполнить двумя способами:
1. Через консоль менеджера (требуются права администратора)
2. Путем полного удаления транзакций из истории аккаунта.

---

## Untitled

## Почему не отображаются все серверы в списке?

Основная причина - включенное ограничение по кластерам. Когда брокер активирует кластерную фильтрацию, в интерфейсе отображаются только серверы, принадлежащие к выбранному кластеру.

## Как решить эту проблему?

1. Перейдите в настройки серверов
2. Найдите параметры кластеризации
3. Закрепите нужные серверы в соответствующий кластер
4. Сохраните изменения


![снимок_экрана_2025-03-28_081313.png](/.attachments/снимок_экрана_2025-03-28_081313-fb99cef8-12f4-4882-9fc0-26087faa9cbb.png)

---

## Untitled

## Как работает триггер Dynamic Leverage (бывший Leverage by Volume)?

Триггер Dynamic Leverage (в старом интерфейсе назывался Leverage by Volume) предназначен для автоматического снижения рисков брокера во время важных рыночных событий. Основные функции:

1. **Автоматическое регулирование плеча**  
   - Снижает плечо во время повышенных маржинальных требований (ПМТ)  
   - Возвращает стандартные значения после нормализации рынка  
   - Работает только с новыми позициями, открытыми в заданный период

2. **Технические особенности**  
   - На сервере может быть активен только один экземпляр плагина  
   - Поддерживает два режима работы: Leverage и Percentage  
   - Изменения применяются к каждой сделке индивидуально  
   - Обработка событий происходит последовательно сверху вниз

3. ###Формула для Percentage Mode  
  `100 / platform percentage * 10000`
 
Примеры расчета:  
- Маржа $100 при 200% → $200  
- Маржа $100 при 50% → $50  

**Важно:**  
- Не поддерживается только понижение плеча без последующего повышения  
- При проблемах с применением изменений нужно проверить позицию плагина в списке  
- Отсутствие сервера в списке может указывать на его отключение

---

## Untitled

## Что означает алерт New Rates Absence?

Алерт New Rates Absence сигнализирует о прекращении потока исполнения ордеров в течение заданного временного интервала (по умолчанию 5-10 минут). Этот триггер активируется только при полном отсутствии новых исполнений на протяжении всего указанного периода. Важно понимать, что срабатывание не обязательно указывает на проблему - оно может отражать естественные паузы в торговой активности.

## Как работают настройки этого алерта?

Брокер может гибко настроить параметры мониторинга:
- Разные временные thresholds для дневных и ночных часов
- Специальные условия для выходных дней
- Чувствительность детектирования (5/10/15 минут)

Ключевая особенность: система не реагирует на единичные "зависшие" ордера, если общий поток исполнений продолжается. Алерт срабатывает исключительно при полном прекращении активности по всем инструментам.

## В каких случаях возможны ложные срабатывания?

Ложные уведомления могут поступать:
- Во время естественных рыночных пауз (например, между торговыми сессиями)
- При резком снижении торговой активности
- В периоды технических остановок, запланированных брокером

Для минимизации ложных сигналов рекомендуется тщательная настройка временных параметров под конкретный торговый режим брокера.

---

## Untitled

**Вопрос:** Где можно посмотреть обработанные оповещения (processed notifications) в Trading Platform?

**Ответ:**  
Перейдите в раздел **Risk Management**.  
По умолчанию обработанные уведомления скрыты. Чтобы их отобразить, необходимо **отключить фильтр Hide processed**.

---

## Untitled

## Как работают вместе Dynamic Leverage и Leverage by Equity?

При одновременной активации Dynamic Leverage и Leverage by Equity возникает следующая ситуация:

1. **Leverage by Equity** изменяет общее плечо в карточке счета, устанавливая базовое значение (например, 500)

2. **Dynamic Leverage** (реализованный через серверный плагин) модифицирует плечо для каждого отдельного ордера (например, снижая до 200 во время рыночных событий)

## Что увидит трейдер?

- В карточке счета будет отображаться значение от Leverage by Equity (500)
- Фактические ордера будут исполняться с плечом от Dynamic Leverage (200)

## Какой триггер имеет приоритет?

Dynamic Leverage обладает операционным приоритетом, так как:
- Работает на уровне сервера
- Применяется непосредственно к ордерам
- Обычно активируется на короткие периоды (30-60 минут)

---

## Untitled

**Вопрос:** Что изменилось в логике работы триггера Admin Fee?

**Ответ:** Появилась возможность отключить проверку margin при взимании admin fee. Это позволяет списывать admin fee даже с аккаунтов с небольшим балансом, уходя в минус. Ранее подобные действия приводили к ошибке.

**Где это настраивается:**  
Настройка доступна в триггере **Admin fees**. По умолчанию создаётся балансовая транзакция без учёта маржи, но это поведение можно изменить в параметрах триггера.

**Условия списания admin fee:**
1. Наличие открытой позиции по счёту.
2. Соответствие текущей дате дням, указанным в настройках триггера.

**Важно:**  
Если опция *Check margin* активна — admin fee будет списываться даже при отсутствии свободной маржи на счёте.

---

## Untitled

## Почему не работают звуковые оповещения триггеров и семафоров?

Основная причина: клиент мог отключить звук в одном из окон интерфейса Trading Platform. При отключении звука в любом окне браузера это действие распространяется на весь аккаунт.

## Как решить проблему со звуковыми оповещениями?

1. Проверить и включить звук во всех открытых окнах Trading Platform
2. В новом интерфейсе использовать иконку звука в левом нижнем углу
3. Убедиться, что настройки оповещений активны в профиле

## Где найти настройки звука в новом интерфейсе?

В обновленном интерфейсе управление звуком находится:
- На верхней панели (в классической версии)
- В левом нижнем углу экрана (в новом интерфейсе)

## Почему отключение звука в одном окне влияет на все?
Система Trading Platform синхронизирует настройки звука на уровне аккаунта, поэтому изменение в любом окне применяется ко всем сессиям.

---

## Untitled

## Как работает плагин Dynamic Leverage?

Плагин Dynamic Leverage теперь имеет усовершенствованную логику работы во время Периодов Повышенных Маржинальных Требований (ПМТ). Основные изменения:

1. **Селективное применение**  
   Плагин не изменяет маржинальные требования для счетов, которые не ведут активную торговлю в период ПМТ. Если позиции были открыты до начала ПМТ и по ним не было сделок внутри этого периода - их параметры не изменяются.

2. **Защита долгосрочных инвесторов**  
   Счета с позициями, удерживаемыми месяцами без торговой активности в ПМТ, не подвергаются изменениям маржинальных требований.

## Как плагин взаимодействует с MetaTrader?

Механизм работы с MT5/MT4:
- Изменяет только Margin Rate для позиций
- Не модифицирует настройки самих инструментов
- Для каждого счета выполняет:
  - Поиск всех позиций по указанному инструменту (например, EURUSD)
  - Расчет нетто-объема
  - Определение плеча по установленным правилам
  - Корректировку margin_rate для всех соответствующих позиций

## Какое время используется в настройках?
Все временные параметры в настройках плагина используют серверное время торгового терминала.

---

## Untitled

**Вопрос:** Как в Trading Platform найти акции, содержащие определённое слово, например "kurd"?


**Ответ:**  На март 2024 года прямого поиска по ключевым словам (через маски или подстроки) в Trading Platform нет.  
Вместо этого можно воспользоваться разделом **Session Summary** и применить фильтр **Countries** для уточнения нужных бумаг.

---

## Untitled

## Как искать клиентов по торговому инструменту?
Система позволяет осуществлять поиск клиентов на основе используемых торговых инструментов.

## Где найти разделение ордеров на открытые и закрытые?
Для просмотра отдельно открытых и закрытых ордеров:
1. Откройте вкладку "Current Session"
2. Прокрутите страницу вниз
3. В нижней части интерфейса вы увидите разделение ордеров на:
   - Открытые (Active)
   - Закрытые (Closed)

## Как работает фильтрация ордеров?
Фильтрация позволяет:
- Анализировать активные позиции по инструменту
- Просматривать историю закрытых сделок
- Сравнивать торговую активность по разным инструментам

## Можно ли экспортировать эти данные?
Да, данные как по открытым, так и по закрытым ордерам доступны для экспорта в стандартных форматах отчетности.

---

## Untitled

## Что показывает тумблер Dealer Side в Trading Platform?

Тумблер Dealer Side в Trading Platform позволяет анализировать данные с позиции дилера или трейдера, в зависимости от выбранного типа бука. В разделе Current Session при работе с B-Book он отображает как сторону дилера, так и трейдера, тогда как для C-Book по умолчанию показывается только сторона брокера. При переключении тумблера в PnL Details система либо показывает чистый профит трейдеров (когда выключен), либо исключает агентские комиссии из расчёта PnL (когда включен). Однако у некоторых брокеров, где агентские комиссии не учитываются в калькуляции, переключение тумблера может не влиять на отображаемые значения.

## Как настроен виджет Session PnL Summary в старом интерфейсе?

В старом интерфейсе тумблер Dealer Side доступен только при выбранном B-Book, так как для A-Book и C-Book его использование не имеет практического смысла. Этот элемент управления позволяет брокеру переключаться между отображением данных с позиции дилера и трейдера, обеспечивая гибкий анализ торговой активности. Важно отметить, что конкретное поведение тумблера и отображаемые данные могут варьироваться в зависимости от бизнес-логики и настроек конкретного брокера, включая особенности учёта агентских комиссий и других финансовых показателей.

---

## Untitled

## Как Trading Platform получает CID и IP для счетов MT5?

Trading Platform не использует логи MT5 для определения CID и IP-адресов. Вместо этого система получает данные об онлайн-сессиях через Manager API. Это архитектурное решение делает процесс более эффективным, чем анализ логов.

## Как брокер может предоставить исторические данные CID и IP?

Брокер может отправить историю CID и IP-адресов в любом удобном формате. После обработки эти данные будут отображаться в базе Trading Platform. Если CID настроен, его можно будет увидеть в правилах триггера.

## Почему несколько ID могут иметь одинаковый CID?

Один CID может соответствовать нескольким ID из-за:
- Использования мобильных устройств с плавающими IP-адресами
- Применения VPN-соединений
- Особенностей сетевой инфраструктуры

Эти связи можно проследить в user tracks.

## Как проверить корректность CID в системе?

Если возникают сомнения в точности CID:
1. Рекомендуйте брокеру проверить эти CID непосредственно в MT
2. Данные в Trading Platform синхронизируются с MT-сервером
3. Триггеры по CID осуществляют долгосрочный мониторинг аутентификаций

## Где найти дополнительную информацию?
По клику на CID можно получить полные данные о связанных сессиях и устройствах.

---

## Untitled

---
title: Почему происходит задержка при сохранении или изменении правила?
description: 
published: true
date: 2025-06-02T18:55:58.937Z
tags: сервер, настройки триггера, правила, change spread by period
editor: markdown
dateCreated: 2025-06-02T18:55:58.937Z
---

На момент реализации функционала в апреле 2025, задержка в самом триггере составлять от 10 до 20 секунд. Также добавляется время на связь с сервером.

---

## Untitled

**Вопрос:** Почему в Current Session один и тот же инструмент может
отображаться дважды?  
**Ответ:** Это происходит, если у символа разные значения в поле
Description. Даже при одинаковом имени символа разные описания приводят
к его дублированию в списке.

**Вопрос:** Может ли это быть связано с разными серверами?  
**Ответ:** Да. Если один и тот же символ настроен на разных серверах с
разными описаниями, он будет отображаться как отдельные строки.

---

## Untitled

## Почему значения могут различаться на разных серверах?

Различия в данных между серверами возникают из-за особенностей сбора информации в Trading Platform. Когда у клиента есть несколько логинов на разных серверов, система отображает агрегированные данные для всей группы, что может не совпадать с показателями конкретного аккаунта в MT5.

## Как получить согласованные данные?

1. Для точного сравнения необходимо выбрать один конкретный сервер
2. При таком выборе значения в Trading Platform и MT5 должны совпадать

## Что делать при расхождениях данных?

Если брокер отмечает различия:
1. Уточните, сравнивает ли он данные между Trading Platform и MT5
2. Запросите полное имя группы для проверки
3. Учтите, что Trading Platform показывает сводные данные по группе, а не по отдельным аккаунтам

**Важно:**  
Различия не указывают на ошибку - они отражают разные принципы сбора данных (агрегированные в BP vs индивидуальные в MT5).

---

## Untitled

## Почему не отображаются Issues в триггере Leverage by Equity?

**Основные причины:**
1. Уведомление может быть в счетчике, но не отображаться на сайте
2. Система показывает только неавтоматические issues (auto=false)
3. Возможно неконсистентное состояние обработки issue

```sql
SELECT "Id", "Type", "Actor", "Time", "TimeUtc", "Status", "Processed", "Login", "Symbol", "Json", "Auto", "TicketId", "Category", "UpdateTimeUtc"
FROM public."Issues"
WHERE "Processed" = false
```

Как исправить проблему?
-----------------------

1.  Найти необработанные issues
    
2.  Для автоматических issues (auto=true) изменить значение на false
    
3.  Проверить наличие необходимых данных для внесения в список
    

Где можно посмотреть историю Issues?
------------------------------------

Полную историю можно найти в:
*   Issue History
*   Логах ошибок и действий системы

---

## Untitled

## Почему произошло обнуление свопов?
Обнуление свопов происходит при срабатывании триггера Swaps Free Accounts, когда:
1. Счет включен в правило "своп-фри"
2. Позиция открыта меньше дней, чем указано в настройках "Swaps Free Period"

## Как работает механизм обнуления свопов?
1. MT-сервер начисляет свопы
2. Триггер проверяет условия:
   - Включен ли счет в правило
   - Сколько дней открыта позиция
3. Если условия выполнены - свопы обнуляются (записывается 0)

## Почему после перенастройки правила пропали вчерашние свопы?
При изменении настроек:
- Система применяет новые правила ко всем позициям
- Если позиция теперь соответствует условиям обнуления - свопы аннулируются

## В какое время происходит обнуление свопов?
Обнуление выполняется:
- Каждые 15 минут после начисления свопов MT-сервером
- В тестовом режиме - сразу после принудительного начисления

## Как настроить обнуление свопов для конкретного счета?
Пример настройки:
1. Включить нужный счет в правило
2. Указать символы (например, major)
3. Установить Swaps Free Period (например, 99 дней)
4. Сохранить настройки

## Где найти документацию по этой функции?
Подробная документация доступна по ссылке:  
https://docs.example.com/risk-management/automatic-control/swaps-free-accounts/

---

## Untitled

## Почему отображается кнопка Unlock для триггеров?

Кнопка Unlock появляется в трех основных случаях:
1. Функционал триггеров изначально не активирован в системе (требуется запрос в Customer Success)
2. Выбран неправильный Server Mode (Demo/Real/All)
3. Для триггера Dynamic Leverage - не работает соответствующий серверный плагин

## Как разблокировать триггеры?

1. Проверить у брокера:
   - Включены ли необходимые разрешения
   - Правильно ли выбран Server Mode
2. Для Dynamic Leverage:
   - Убедиться в работоспособности плагина
3. Если проблема не решается - оформить запрос на активацию

## Где найти документацию по настройке разрешений?
В системе доступна соответствующая статья с требованиями к разрешениям (предоставить брокеру ссылку или скриншот документации).

---

## Untitled

## Почему в Leverage by Equity появилось ограничение максимального плеча?

Ранние версии триггера имели нечеткую логику ограничения максимального плеча. В текущей реализации система стала детектировать и фиксировать в базе данных все изменения максимального плеча, включая те, что были сделаны вне настроек самого триггера.

## Как теперь работает это ограничение?

1. **Фиксация ограничений**  
   Триггер запоминает в БД установленное максимальное плечо, даже если оно было изменено вручную через админку.

2. **Прозрачность работы**  
   При достижении лимита система создает запись в Issues, четко указывая текущее значение ограничения.

3. **Гибкость управления**  
   Максимальное плечо теперь можно всегда проверить и при необходимости изменить, так как его текущий уровень всегда известен системе.

**Пример:**  
Если в настройках триггера установлен диапазон 500-1000, но через админку вручную задано ограничение в 800, система будет работать в диапазоне 500-800 и уведомит об этом в Issues.

![leverage_by_equity_was_limited_by_max.png](/.attachments/leverage_by_equity_was_limited_by_max-63c9966d-2273-4fe3-b28c-18ed5fa27d4c.png)

---

## Untitled

## Почему при поиске не отображаются все счета?
Проблема возникает из-за того, что менеджер пилота MT5 не имеет доступа к серверным логам и не может получить информацию о CID (Client IDs) счетов.

## Как решить эту проблему?
Для исправления ситуации необходимо:
1. Предоставить соответствующие разрешения (пермишны)
2. Обеспечить доступ к серверным логам

## Какие именно разрешения нужны?
Требуются права доступа, позволяющие:
- Чтение серверных логов
- Получение информации о Client ID (CID)
- Доступ к данным об аккаунтах

---

## Untitled

## Что такое триггер Leverage by Equity?
Это инструмент для автоматического или ручного изменения торгового плеча для групп счетов или отдельных аккаунтов.

## Как работает запоминание максимального плеча?
С 28.02.25 триггер запоминает максимально допустимое плечо на счете:
- Если установлен диапазон 500-1000
- А в админке вручную задано 800
- Триггер будет работать в диапазоне 500-800
- В событиях появится уведомление об ограничении

## Как триггер реагирует на ручные изменения плеча?
Если клиент или брокер вручную выставили максимальное плечо:
- Триггер не сможет поднять плечо выше этого значения
- Автоматические изменения будут ограничены ручной настройкой

## Почему не приходят алерты об изменениях?
Алерты не генерируются когда:
- Изменения выполняются автоматически роботом
- Для проверки нужно смотреть Issues History в карточке счета

## Как включить автоматическое изменение плеча?
Необходимо:
1. Проверить что настройка "Automatic change leverage" = ON
2. При значении OFF изменения требуют ручного подтверждения

![account_change_leverage_by_ai.png](/.attachments/account_change_leverage_by_ai-eecf893c-887d-4ff4-80ef-75c753d989c1.png)

---

## Untitled

**Как строится график PnL Session Summary в Пилоте?**  
График формируется на основе пятиминутных данных, сохраняемых в бэкенде. Текущая точка обновляется в режиме реального времени (раз в несколько секунд), но фиксируется на графике только в начале каждой минуты.  

**Почему пропал кратковременный пик PnL?**  
Если пик прибыли/убытка (например, из-за выхода новостей) возник между 30-й и 31-й минутами:  
1. В реальном времени он отобразится на графике.  
2. При фиксации данных на 31-й минуте система запишет итоговое значение PnL *на конец минуты*, а не промежуточный экстремум.  
3. Как следствие, кратковременные колебания могут не сохраниться в итоговом графике.  

Фиксация данных происходит дискретно (раз в минуту), а не непрерывно.  

**Пример:**  
- В 15:30:00 — PnL = $10,000 (пик).  
- В 15:30:59 — PnL вернулся к $5,000.  
- На графике за 15:31 отобразится $5,000, а пик $10,000 не сохранится.

---

## Untitled

## Почему в Daily Charts может быть пустой график?

Пустой график в разделе Daily Charts карточки счета не всегда означает техническую ошибку. Это может происходить по следующей причине: когда трейдер начинает торговать утром определенного дня, система уже отображает данные по торговой сессии, но дневной график остается пустым до конца торгового дня. Это нормальное поведение системы, так как дневные данные формируются и отображаются полностью только после завершения торгового дня.

## Как проверить, является ли это ошибкой?

Если трейдер уже совершил сделки в текущем дне, но график Daily Charts пустой:
1. Проверьте, что сделки действительно были выполнены в этот день
2. Убедитесь, что рассматривается правильная дата
3. Дождитесь окончания торгового дня - график должен обновиться

![dailycharts_notshown.png](/.attachments/dailycharts_notshown-9ad45a2b-33f1-4e81-bf51-97fe0e832b74.png)

**Теги:** карточка счета, daily charts, график, accounts, торговая сессия

---

## Untitled

**Пустой список стран**

## Почему может быть пустым список стран в интерфейсе?
Список стран может отсутствовать по двум причинам:
1. У Trading Platform нет доступа к персональным данным клиентов
2. Брокер (например, Deriv) изначально не предоставляет эти данные

**Решение:**  
Проверить у сотрудника брокера наличие соответствующих прав доступа.


## Почему на карте "Net by Countries" нет данных?
Если фильтр Country не содержит данных (как у Deriv), карта "Net by Countries" также будет пустой.

## Почему невозможно выбрать конкретную страну?
Проблема возникает когда:
- Страна отсутствует в списке MT-сервера
- Брокер не добавил эту страну в свою базу

**Решение:**  
Новые страны автоматически появляются в интерфейсе после их добавления на MT-сервер.

## Где можно проверить страну клиента?
Информация о стране доступна в карточке конкретного счета, если эти данные предоставлены брокером.

![no_countries.png](/.attachments/no_countries-6695e2a2-abb2-4061-af6e-02705fdf4f14.png =250x)

---

## Untitled

## Как работает Trading Platform в выходные дни?

Trading Platform функционирует в штатном режиме в выходные дни. Однако если у брокера нет регулярной работы по выходным, рекомендуется заранее уточнить все технические моменты.

## Нужно ли учитывать какие-то особенности работы в выходные?

Да, важно учитывать следующие нюансы:
- При запланированных обновлениях системы в выходные дни необходимо уведомлять брокера за 30 минут до начала апдейта
- Такое же уведомление требуется при любых других технических работах, проводимых в выходные
- Рекомендуется заранее согласовать график возможных обновлений на выходные дни

## Какие рекомендации для брокеров?
Брокерам, работающим по выходным, следует:
1. Уточнять статус системы перед началом работы
2. Быть готовыми к возможным обновлениям
3. Проверять получение уведомлений о технических работах

---

## Untitled

## Как работает разделение балансовых операций в Trading Platform?

Система позволяет фильтровать и разделять балансовые операции, определяя какие из них должны учитываться в PnL (прибыли/убытках), а какие - во вводе/выводе средств (Deposits). Это особенно важно для операций, которые брокер использует для компенсаций и корректировок.

## Как настроить фильтрацию операций?

Для настройки необходимо:
1. Брокер должен предоставить примеры различных типов операций
2. Определить, какие комментарии к операциям должны исключаться из Deposits/Withdrawals
3. Уточнить, нужно ли учитывать CORRECTION и SO_COMPENSATION в расчете профита

## Какие типы операций обычно фильтруются?

Примеры часто используемых комментариев:
- Corrections
- Trading correction  
- Trading compensation  
- Spike correction  
- СО компенсация  
- negative balance compensation

## Где проверяются результаты фильтрации?

После настройки результаты можно проверить:
- На странице Deposits & Withdrawals
- В отчетах по операциям
- В расчетах сессионного PnL

## Как решается проблема некорректного отображения операций?

Если операция отображается в MT как балансовая, но не учитывается в PnL:
1. Запросить у брокера список учитываемых типов операций
2. Обновить конфигурацию ноды
3. Проверить отображение в интерфейсе

**Техническая реализация:**  
Список фильтруемых операций вносится в конфигурационный файл ноды, что позволяет гибко настраивать учет операций в зависимости от потребностей брокера.

---

## Untitled

## В каких случаях требуется начислять разные ABS-значения для лонгов и шортов?

Разные абсолютные значения для длинных и коротких позиций (например, +10 для лонгов и -20 для шортов) могут потребоваться в нескольких практических ситуациях:

1. **Корректировка индексов**  
   При работе с индексами, содержащими акции с дивидендными выплатами (например, Nikkei 225), где массовые выплаты могут значительно влиять на цену индекса. Разные значения позволяют точнее отразить экономический эффект.

2. **Специфические требования LP**  
   Когда поставщики ликвидности (LP) передают корректировки через свопы, но брокер хочет отразить их как дивидендные начисления.

3. **Арбитражные стратегии**  
   Для клиентов, специализирующихся на дивидендном арбитраже и точно отслеживающих ex-dividend dates.

## Как технически реализовано начисление?

- **Положительное значение (+X)** → начисление дивидендов  
- **Отрицательное значение (-X)** → списание дивидендов  
- **Разные значения** → независимое управление лонгами/шортами

## Практический пример:
28.03.2025 для индекса Nikkei потребовались разные корректировки из-за одновременных выплат 250-300 компаний. Брокер мог:
1. Получить своп-корректировку от LP  
2. Либо самостоятельно настроить дивидендные выплаты с разными ABS-значениями  

Такой подход дает брокерам гибкость в управлении корпоративными действиями без изменения структуры свопов.

---

## Untitled

### Как часто обновляются данные в Current Session?
Данные в разделе Current Session обновляются с разной периодичностью в зависимости от компонента системы:

#### Обработка данных в реальном времени:
- Бэкенд Trading Platform обрабатывает новые состояния ордеров и счетов мгновенно при получении котировок
- Задержки составляют десятки миллисекунд (сетевые факторы + время обработки)
- Скорость получения данных идентична MetaTrader Manager

#### Отображение на веб-интерфейсе:
- Данные на странице обновляются периодически (раз в несколько секунд)
- Частота оптимизирована для оперативного мониторинга без перегрузки клиентского трафика
- Не соответствует внутренней частоте обработки в ядре системы

#### API-запросы:
- Время обработки: от 500 мс до 3-4 секунд
- Зависит от объема данных и производительности оборудования
- Особенно заметно при сложных запросах (Net Volumes с фильтрацией)

#### Ключевые особенности:
1. Все вычисления (эквити, профит, флоатинг) выполняются внутри Trading Platform
2. Данные не запрашиваются через MT API
3. Позволяет гибко настраивать отчеты
4. Сохраняется баланс между актуальностью и нагрузкой

---

## Untitled

### Что такое сжатие торговых ордеров?

Сжатие торговых ордеров — это процесс, который может выполняться на серверах **MT4**. Он заключается в том, что ордера с нескольких счетов объединяются в один с общим финансовым результатом.

* * *

### Зачем нужно сжатие ордеров?

Сжатие ордеров помогает уменьшить размер базы данных, особенно на старых счетах с большой историей. При этом удаляется ненужная история и заменяется одной операцией, например, удаляется вся торговая история до определённой даты. Это облегчает работу сервера.

---

## Untitled

## Какие действия необходимы после смены пароля?
После изменения пароля обязательно:
1. Уведомите техническую поддержку Trading Platform
2. Укажите новые учетные данные

## Почему важно уведомлять поддержку?
Уведомление необходимо для:
- Синхронизации изменений на стороне Trading Platform
- Предотвращения проблем с доступом
- Обеспечения безопасности системы

## Как быстро применяются изменения?
Изменения вступают в силу после обработки запроса технической поддержкой (обычно в течение рабочего дня)


![Image](https://dev.azure.com/example-org/081600f4-3deb-4799-be83-afca28cb74b5/_apis/wit/attachments/e41cdedc-7494-45d7-90e8-e9651a81e08b?fileName=image.png =700x)

---

## Untitled

## Как создать тестовое окружение в Trading Platform?
Для создания тестового окружения необходимо:
1. Создать менеджера с доступом к тестовой группе счетов
2. Предоставить нам логин и пароль этого менеджера
3. Настроить необходимые пермишены (описаны в документации: https://docs.example.com/)

## Какие рекомендации по группам счетов для тестирования?
Рекомендуется использовать отдельные группы счетов для тестового и real окружения, чтобы избежать путаницы в данных.

## Можно ли подключить отдельный тестовый сервер?
Да, вы можете подключить отдельный тестовый сервер как новую среду в Trading Platform.

## Как подключить отдельный сервер?
Для подключения:
1. Предоставьте URL тестового сервера
2. Укажите логин и пароль менеджера
3. Мы развернём отдельную базу и настроим демо-среду

## Как переключаться между тестовым и реальным окружением?
В интерфейсе Trading Platform доступны:
- Режим "демо" (тестовое окружение)
- Режим "реал" (реал окружение)
- All: Смешанный режим просмотра

---

## Untitled

## Есть ли в Trading Platform параметр "среднее время удержания сделки"?

Нет, в текущей версии Trading Platform отсутствует параметр "среднее время удержания сделки". Эта метрика не рассчитывается системой и не хранится в наших базах данных.

## Можно ли как-то получить эти данные?

К сожалению, нет. При запросах брокеров о предоставлении информации о среднем времени удержания сделок необходимо сообщить, что:
1. Такой функционал не реализован в системе
2. Данные не собираются и не хранятся
3. Нет технической возможности предоставить эту информацию

## Какие альтернативы доступны?
Брокер может:
- Рассчитывать этот показатель самостоятельно на основе выгруженных данных о сделках
- Использовать другие доступные в системе метрики для анализа торгового поведения

---

## Untitled

## Какие технические требования предъявляются к серверам?
Основные технические требования включают:
- Процессор: 2 ядра на 20,000–25,000 активных аккаунтов
- Количество нод: должно соответствовать числу MT-серверов у брокера
- ОС: любая стабильная версия Ubuntu
- СУБД: PostgreSQL версии 17 или выше

## Как будет организован доступ к серверам?
Доступ может быть предоставлен:
1. Через DNS
2. Через IP-доступ
Выбор способа остается на усмотрение брокера.

## Где найти полные технические требования?
Технические требования доступны по ссылке:  
[Требования к серверам](https://docs.google.com/document/d/1pskOKG2viRdqSl7-W7Xwh8W1T5UsZ6FYoSRSfVfSAQA/edit?usp=drivesdk](https://docs.google.com/document/d/1pskOKG2viRdqSl7-W7Xwh8W1T5UsZ6FYoSRSfVfSAQA/edit?usp=drivesdk))  

## Как планировать ресурсы?
Для обеспечения хорошей производительности рекомендуется:
- 2 CPU ядра на каждые 20,000–25,000 активных аккаунтов
- Соответствие количества нод количеству MT-серверов
- Использование стабильных версий ПО

---

## Untitled

## Можно ли настроить Telegram-уведомления от Trading Platform?

Да, техническая поддержка Trading Platform может настроить индивидуальные Telegram-каналы для получения уведомлений из системы. Эта функция работает как дополнение к основному интерфейсу и позволяет получать важную информацию, такую как текущий PnL или срабатывание триггеров, непосредственно в Telegram.

## Какие данные нужно предоставить для настройки?

Для подключения Telegram-уведомлений необходимо сообщить в техподдержку:

1. **Список триггеров/семафоров**, по которым требуются уведомления  
2. **Количество необходимых каналов** в Telegram  
3. **Принцип группировки** уведомлений:  
   - По типам триггеров  
   - По уровню доступа сотрудников  
4. **Параметры фильтрации** (если нужно сократить количество сообщений):  
   - Например, получать уведомления только по определенной группе символов  
5. **Список каналов** с указанием распределения уведомлений  

## Можно ли получать уведомления в Slack?

В данный момент интеграция со Slack находится в разработке и недоступна для использования. Доступны только Telegram-уведомления.

## Как происходит подключение?

После получения всех необходимых данных и завершения настроек, техническая поддержка отправит пригласительную ссылку для подключения к Telegram-каналу. Обратите внимание, что данная функция не доступна для самостоятельной настройки через интерфейс Trading Platform и требует обращения в техподдержку.

---

## Untitled

## Учитываются ли свопы в Current Unrealized PnL?

Да, свопы автоматически учитываются в расчете Current Unrealized PnL. Вам не нужно добавлять их отдельно, так как они уже включены в формулу расчета.

## Как рассчитывается Session PnL?

Формула расчета: Session PnL = Current Unrealized PnL - Previous Unrealized PnL (rollover's floating) + Session Realized PnL

## Какие компоненты включает формула?
1. **Current Unrealized PnL** - текущая плавающая прибыль/убыток (уже включает свопы)
2. **Previous Unrealized PnL** - плавающий результат на момент предыдущего ролловера 
3. **Session Realized PnL** - зафиксированная прибыль/убыток за сессию

## Нужно ли отдельно проверять свопы?
Нет, система автоматически учитывает все свопы при расчете Current Unrealized PnL, поэтому дополнительная проверка не требуется.

---

## Untitled

[Это Introducing Brokers
(IB)](https://support.example.com/articles/SD-A-81461561/IB-Introducing-Broker-predstavlyayushij-Broker),
которым выплачиваются агентские комиссии. У счетов есть поле Agent ID,
которое ссылается на логин агента, получающего комиссионные выплаты с
торговли на счете. Под этими логинами IB можно объединить все счета в
партнерской сети и получать отчетность только по указанным агентам.



## Как работает фильтр "Agents" в Trading Platform?

Фильтр "Agents" позволяет группировать и анализировать счета по Introducing Brokers (IB) - партнерам, получающим агентские комиссии. В системе каждому торговому счету присвоено поле Agent ID, содержащее логин агента, которому начисляются комиссионные с операций по этому счету.  

**Основное применение:**  
- Формирование отчетности по конкретным IB  
- Анализ активности партнерской сети  
- Мониторинг эффективности работы агентов  

**Принцип работы:**  
При выборе определенного Agent ID в фильтре система отображает все счета, привязанные к этому агенту, что позволяет получить сводные данные по его клиентской базе.  

**Важно:**  
Для корректной работы фильтра необходимо, чтобы поле Agent ID было заполнено для всех учитываемых счетов.

---

## Untitled

## Чем полезна фильтрация трейдеров по домену почты?

Для выявления подозрительных аккаунтов, группового анализа клиентов.

## Какими способами это можно сделать?
1. **Через веб-интерфейс**  
   Используйте специальную ссылку формата:  
   `https://[имяброкера].example.com/accounts/accounts-related-profiles?RelationType="Email"&Search="@163.com"&Top=100`  
   Где:
   - `@163.com` - искомый почтовый домен
   - `Top=100` - количество отображаемых результатов

2. **Через прямой запрос к БД**  
   - Выполняется технической поддержкой Trading Platform
   - Позволяет найти все счета с указанным почтовым доменом
   - Требует официального запроса от брокера

---

## Untitled

**Вопрос:** Что означает цветная точка рядом с названием триггера в Trading Platform?

**Ответ:**  
Цветная точка указывает на уровень приоритета, выставленный в настройках каждого правила, а также на активность правил.

Значения:

- 🔴 Красный — **Critical**
- 🟡 Жёлтый — **Warning**
- 🟢 Зелёный — **Notice**

---

## Untitled

## Почему в Sum of session realized PnL значения выделяются цветом?

Цветовое выделение в Sum of session realized PnL основано на общем Session PnL, а не на конкретном значении realized PnL. Это означает, что даже при положительном realized PnL, цвет может быть красным.

---

## Untitled

## Что произойдет с бонусами при удалении группы или отключении правила?

При удалении группы из бонусного правила или полном отключении правила все ранее начисленные бонусы сохранятся на счетах клиентов. Однако система прекратит автоматическое управление этими бонусами - не будет осуществляться их автоматическая отмена, не будет собираться статистика для возможного вывода средств. Дальнейшее управление такими бонусами потребуется выполнять вручную через административную панель.  

Для бонусов, начисленных вручную (не через автоматику Trading Platform), отмена через систему невозможна, так как эти операции изначально не контролировались платформой.  

Если впоследствии бонусные правила будут изменены или повторно активированы, новые начисления будут происходить автоматически при соблюдении всех условий. Если автоматическое начисление не срабатывает, следует проверить включение соответствующих групп счетов в настройках обновленного правила.  

**Важно:** Отключение правила не приводит к обратному списанию уже начисленных бонусов, но полностью останавливает автоматическое управление ими.

---

## Untitled

### Что означает статус "Incomplete" в триггерах Trading Platform?
Статус "Incomplete" указывает на неполную настройку триггера. Это означает, что:

### Почему триггер получает статус "Incomplete"?
- Не создано ни одного правила для триггера
- Или созданные правила не активированы
- Конфигурация триггера не завершена

### Как устранить статус "Incomplete"?
1. Откройте настройки триггера
2. Создайте хотя бы одно правило
3. Активируйте созданное правило
4. Сохраните изменения

### Дополнительная информация:
- Красный цвет метки специально сделан ярким для привлечения внимания
- При наведении на индикатор отображается:
  - Количество активных правил
  - Количество неактивных правил
- После настройки хотя бы одного правила статус "Incomplete" исчезает

### Важно:
Даже если триггер в статусе "Incomplete", это не влияет на работу других, полностью настроенных триггеров в системе.

---

## Untitled

## Что такое Netting в торговле?

Netting — это система учета позиций, при которой противоположные сделки по одному финансовому инструменту суммируются в единую чистую (нетто) позицию. Например, если трейдер открывает длинную позицию на 1 лот и короткую позицию на 1 лот по тому же инструменту, его итоговая позиция будет нулевой. Этот подход позволяет консолидировать рыночную экспозицию и упрощает управление рисками.

## Как работает плагин Net Dynamic Leverage?

Плагин Net Dynamic Leverage автоматически регулирует торговое плечо при возникновении перекошенных объемов (например, когда преобладают только покупки или только продажи по конкретному инструменту). Его основные функции:

1. **Балансировка рисков**  
   Снижает плечо при значительном дисбалансе объемов, защищая брокера от потенциальных убытков при резких движениях рынка.

2. **Автоматическая корректировка**  
   Динамически изменяет маржинальные требования на основе анализа нетто-позиций.

## Почему нулевой нетто-объем снижает риски?

При равных объемах покупки и продажи:
- Прибыль одних клиентов компенсирует убытки других
- Брокер не несет чистого рыночного риска
- Нет необходимости хеджировать позиции на межбанковском рынке

Таким образом, Net Dynamic Leverage помогает поддерживать сбалансированную книгу ордеров, минимизируя потенциальные убытки брокера. Когда нетто-позиция стремится к нулю, риск для брокера существенно снижается.

---

## Untitled

**Вопрос:** Где можно взять шаблон для загрузки short swap и long swap?

**Ответ:** Шаблон прикреплён ниже.  

[Swaps Example.csv](/.attachments/Swaps%20Example-03449bb2-5ff7-45b2-af04-068c0def5ce8.csv)

---

## Untitled

**Можно ли загрузить свопы для групп символов?**  
Нет, в текущей версии системы нет возможности загружать свопы для групп символов из-за технических сложностей с объединением различных кастомизаций.

**Как хранятся данные о свопах?**  
Система хранит только факты изменений свопов с указанием даты, но не сохраняет ежедневные значения свопов. Для получения значений на конкретную дату нужно экспортировать историю изменений и выполнить расчет вручную.

**Что делать, если не работает изменение свопов?**  
Рекомендуется:
1. Использовать файл-образец
2. Проверить наличие сепаратора (semicolon) в файле
3. Повторить попытку загрузки

**Как экспортировать архивные данные?**  
Для некоторых отчетов (например, winners and losers report) рекомендуется использовать 7-zip вместо WinRar, так как последний может некорректно открывать архивы.

**Почему могут обнуляться свопы?**  
Свопы автоматически обнуляются триггером Swaps Free Account при выполнении условий:
1. Счет включен в программу своп-фри
2. Позиция открыта меньше дней, чем указано в настройках (например, 7 дней при настройке в 10 дней)

**Как проверить историю изменений свопов?**  
Все операции со свопами можно просмотреть в карточке соответствующего счета.

**Важное замечание:**  
Применение правила своп-фри может привести к массовому обнулению ранее начисленных свопов, если позиции соответствуют условиям отмены.

---

# Описание-интерфейсов-и-функций

## Untitled

Триггер анализирует общий объем открытых позиций **ОДНОГО** счета по
**ОДНОМУ** инструменту и, в соответствии с настроенными ранее правилами,
меняет маржинальные требования открытых позиций на анализируемом
инструменте. Маржинальные требования позиций других инструментов не
меняются.  
  
Net Dynamic Leverage  активируется в пилоте по запросу пользователя. В
этом случае после согласования с Customer Success брокеру высылаются файлы
плагина и мануал.  
Статья тут:
https://docs.example.com/risk-management/automatic-control/dynamic-leverage/

Дополнительных пермишнов менеджеру для работы с триггером не требуется.

Лимиты плеча системно ограничены: от 0 до максимума в 999999999

Мануал:
[/12b/plugins_installation_manual\_(2).pdf](/12b/plugins_installation_manual_(2).pdf)  
Файл плагина:
[/12b/platform_netleverages64.dll\_(1).zip](/12b/platform_netleverages64.dll_(1).zip)  
[Описание функционала на
русском](https://support.example.com/articles/DEV-A-134/Feature-Trigger-Net-Dynamic-Leverage)

Логика триггера такова, что маржа будет пересчитаны для всех позиций,
если в период ПМТ были изменения (ордера были открыты или закрыты).
Когда период ПМТ заканчивается, уровень маржи возвращается к исходному
значению до начала ПМТ.

На данный момент при настройке временного периода появляется
предупреждение “the range to and from is ore than 1 hour' 

![](/12b/image_(6).png)

##### Ограничения нет, это лишь оповещение. Range можно выставить больше чем час.

##### Если пишет брокер по неправильным расчетам плагина Net Dynamic Leverage, лучше уточнить:

-   скрины настроек правил триггера из BP. Нужно убедиться, что правило
    включено.
-   по какому символу была торговля и скриншот (или словами) этого
    символа в админке Mt4\\mt5, а именно значение Hedging Margin.
-   Скрины торгов, в принципе то что брокеры обычно присылают
-   скрин (или словами) из админки mt4\\mt5 - плечо аккаунта
-   не работает ли параллельно у брокера еще какой-то плагин по
    изменению маржи
-   Если это mt5, то дополнительно уточнить режим аккаута (hedging или
    netting)
-   в идеале логи плагина с сервера. В логах, помимо другой полезной
    информации, отображаются пустые правила, втч если брокер выключил
    правило. Вывод: если брокер не удалял ручками правило и оно
    осталось, то он его выключил внутри ПМТ.
-   как брокер пришел к выводу что расчеты неправильные (его расчеты)  
    Уточнение:   
    Настоящие лимиты задаются только в MT — в правилах указываются лишь
    числовые значения объёмов, при достижении которых срабатывают
    триггеры. Это значит, что клиенту брокера не удастся открыть объём,
    больше чем указан в МТ.  
    Для корректного отображения дэшборда крайне рекомендуется
    использовать плагин в новом интерфейсе

---

## Untitled

### Что такое триггер "Account Events" и для чего он нужен?  
Триггер "Account Events" позволяет отслеживать различные события на конкретном счете или группе счетов, задавая специальные условия в гибких настройках.  

### Какие события можно отслеживать с помощью этого триггера?  
- Слишком низкий уровень маржи на счете;  
- Превышение определенного уровня плавающей прибыли;  
- Неактивность счета в течение заданного периода;  
- Прибыль по одной сделке, превышающая установленную сумму;  
- И многие другие события.  

### Можно ли создавать несколько правил для одного счета?  
Да, можно создать множество правил с разными условиями. При этом один счет или группа счетов могут быть включены в несколько правил одновременно, что обеспечивает гибкость при мониторинге дилинговых ситуаций.

---

## Untitled

### Что такое триггер "Achieved Profit"?
Триггер "Achieved Profit" предназначен для раннего обнаружения подозрительной активности на счетах. Он отслеживает рост депозита на заданный процент от базовой суммы и генерирует уведомления при достижении указанного порога.

### Как работает триггер "Achieved Profit"?
Триггер срабатывает, когда баланс счета увеличивается на указанный процент от базового депозита. Например:
- Если трейдер внес 100$ и установлен порог 50%
- Триггер сработает при достижении 150$
- При расчетах учитываются все пополнения и снятия

### Детальный алгоритм расчёта Achieved Profit с учётом вводов и выводов

**Ключевой принцип:** Триггер рассчитывает профит на основе **собственных средств трейдера**, а не просто баланса счёта.

**Алгоритм определения Base Point (базовой точки):**

1. **Начальный депозит = Base Point**
   - Трейдер вносит 1000$ → Base Point = 1000$

2. **Дополнительные депозиты увеличивают Base Point**
   - Трейдер вносит ещё 500$ → Base Point = 1500$
   - Это защищает от ложных срабатываний при пополнении счёта

3. **Вывод торгового профита НЕ уменьшает Base Point**
   - Трейдер заработал 300$ (баланс 1800$) и вывел 300$
   - Base Point остаётся 1500$ (баланс теперь 1500$)
   - Это важно! Система помнит, что трейдер уже заработал эти деньги

4. **Вывод собственных средств УМЕНЬШАЕТ Base Point**
   - Трейдер решил вывести 200$ собственных средств
   - Base Point уменьшается с 1500$ до 1300$

**Пример полного цикла:**

| Действие | Баланс | Base Point | Профит % |
|----------|--------|------------|----------|
| Депозит 1000$ | 1000$ | 1000$ | 0% |
| Заработал 500$ | 1500$ | 1000$ | 50% |
| Депозит ещё 1000$ | 2500$ | 2000$ | 25% |
| Заработал 1000$ | 3500$ | 2000$ | 75% |
| Вывел профит 500$ | 3000$ | 2000$ | 50% |
| Заработал 2000$ | 5000$ | 2000$ | **150%** ← Триггер сработает при пороге 100% |

**Формула расчёта:**
```
Profit % = ((Current Equity - Base Point) / Base Point) × 100
```

**Важные нюансы:**
- Если Equity падает ниже Base Point, профит становится отрицательным
- Уведомление остаётся активным, даже если Equity временно упало ниже порога
- При изменении настроек триггера старые несоответствующие уведомления автоматически удаляются

### Как настроить минимальный порог срабатывания?
Чтобы избежать избыточных уведомлений:
- Можно установить минимальное значение эквити
- Триггер будет игнорировать счета с балансом ниже установленного минимума
- Это помогает сосредоточиться на значимых изменениях

### Какую функцию выполняет этот триггер в системе?
"Achieved Profit" помогает:
- Выявлять потенциально подозрительную активность на ранних этапах
- Контролировать необычно быстрый рост депозитов
- Своевременно предупреждать дилеров о возможных рисках

---

## Untitled

### Что такое триггер "Spread by Period"?
Триггер "Spread by Period" помогает брокерам управлять рисками на счетах с фиксированным спредом, предотвращая арбитражные атаки в периоды низкой ликвидности рынка.

### Как арбитражеры используют фиксированные спреды?
Ночью при низкой ликвидности арбитражеры сравнивают рыночные котировки с фиксированными спредами брокера. Когда реальный спред расширяется:
- На фиксированных спредах образуются ценовые "шпильки"
- Ask цена уходит от стандартных значений
- Bid цена следует за Ask, сохраняя фиксированный спред
- Автоматизированные системы быстро фиксируют прибыль на этих движениях

### Какие настройки доступны в триггере?
Триггер позволяет:
- Устанавливать временные периоды расширения спреда (например, с 23:00 до 6:00)
- Настраивать размер спреда для отдельных символов
- Применять изменения для групп связанных инструментов

### Какие существуют ограничения?
Важное ограничение:
- Нельзя настроить спред для конкретного клиента - изменения применяются ко всем трейдерам одновременно

### Почему это важно для брокеров?
Ночное расширение спреда:
- Защищает от арбитражных атак
- Не мешает обычным клиентам (они редко торгуют ночью)
- Поддерживает стабильность торговых условий

---

## Untitled

### Что такое Email Sender в Trading Platform?
Email Sender - это функционал для массовой рассылки электронных писем трейдерам через почтовый сервер MT4/MT5. Он позволяет создавать, хранить и редактировать шаблоны писем, управлять списками рассылки и планировать отправку.

### Как активировать Email Sender?
Функция включается по запросу через @devops-team. Для работы требуются права:
- Connect using Metatrader Manager
- Send emails
![email_sender_mt_permissions.png](/.attachments/email_sender_mt_permissions-46147a96-a7fb-4b60-ad0e-e3e4a623d8f4.png)

### Какие основные настройки доступны?
При создании рассылки можно настроить:
- Торговый сервер для отправки
- Группы счетов (Account groups)
- Конкретные включаемые/исключаемые аккаунты
- Отложенную отправку (дата/время)
- Адрес отправителя, тему и текст письма
- HTML-шаблоны писем

![email_sender_preview.png](/.attachments/email_sender_preview-d5373389-0657-43ce-a6cd-439743e76e7c.png)

### Как происходит процесс отправки?
После заполнения обязательных полей:
1. Становится доступна кнопка Preview and Schedule
2. Открывается окно предпросмотра письма
3. Подтверждается создание задачи на отправку

### Какие известны особенности работы?
1. В предпросмотре могут не отображаться пробелы между строками, но в итоговом письме форматирование сохраняется
2. При ошибках нужно проверять права доступа
3. Система ведет статистику по выполненным рассылкам
4. Можно редактировать запланированные рассылки

### Как устранить ошибку "Failed. The task is completed with errors"?
Необходимо проверить:
- Наличие всех требуемых permissions
- Корректность введенных данных
- Доступность почтового сервера
- Правильность указания групп/аккаунтов
![emailsender_error.png](/.attachments/emailsender_error-f9dc0303-f877-4307-a1a5-efdd04548036.png)

![emailsender_preview_formatting.png](/.attachments/emailsender_preview_formatting-d9dc390d-371b-417b-892b-0d1b1481abbe.png)
![emailsender_testmt.png](/.attachments/emailsender_testmt-57a2dc17-a825-449a-a7ee-f18f4ac67064.png)

---

## Untitled

### Для чего предназначен триггер “IP Control” в Брокерпилоте?  
Триггер “IP Control” предназначен для контроля внутренних и внешних угроз, включая возможное читерство и мошенничество со стороны сотрудников брокера. Он помогает обнаружить подозрительную активность внутри компании, регистрируя онлайн сессии торговой платформы с IP-адресов офисов компании.

### Как настраивается триггер “IP Control”?  
В настройках триггера можно указать диапазоны IP-адресов офисов, где работают сотрудники компании.

### Что происходит при обнаружении сессий с IP-адресов компании, если сотрудникам запрещено торговать на счетах клиентов?  
Появляются уведомления в риск-системе, которые служат своевременным предупреждением брокера о возможных сомнительных операциях внутри компании.

### Какую пользу приносит быстрый отклик на уведомления триггера?  
Быстрая реакция на уведомления помогает предотвратить финансовые потери компании из-за внутреннего саботажа.

### Какие режимы работы есть у триггера “IP Control”?  
- Первый режим — контроль по IP-адресам офисов сотрудников.  
- Второй режим — выявление сразу нескольких онлайн сессий в торговом терминале, что помогает искать счета-сателлиты, используемые для читерства (например, перелив бонусов, читерство на SO compensations и др.).

### Почему иногда в “Supervised address” отсутствует кнопка “exclude accounts”?  
Кнопка “exclude accounts” в “Supervised address” может отсутствовать для части сообщений. Для решения нужно запросить настройки плагина и передать информацию тестировщикам для анализа ситуации. Для некоторых сообщений кнопка присутствует, для некоторых — нет.

---

## Untitled

### Что такое триггер "Latency Arbitrage"?
Триггер "Latency Arbitrage" обнаруживает ситуации, когда трейдеры используют автоматизированные утилиты для сравнения котировок разных брокеров и получения прибыли на отставании котировок конкретного брокера.

### Как работает триггер "Latency Arbitrage"?
Триггер отслеживает периоды отсутствия котировок (например, 30-40 секунд для EURUSD) и проверяет, не открывали ли трейдеры сделки в эти промежутки. При обнаружении таких сделок система показывает:
- Размер полученной прибыли
- Период отставания котировок
- Использованный торговый инструмент
- Тиковый график с визуализацией всплеска активности

### Как триггер помогает выявлять группы арбитражеров?
Триггер обнаруживает целые группы мошенников по следующим признакам:
- Одинаковое время срабатывания триггера
- Совпадение точек входа и выхода
- Использование одного инструмента и объема
- Распределение сделок по разным серверам и клиентам

### Почему этот триггер так важен для брокеров?
Как показывает практика, один такой случай может принести брокеру убыток $540 и более. Систематические атаки могут выкачать сотни тысяч долларов из PnL брокера.

### В чем простота и эффективность этого триггера?
Несмотря на простую логику работы (отслеживание отставания котировок), этот триггер является одним из самых прибыльных инструментов для клиентов Trading Platform, позволяя предотвращать значительные финансовые потери.

---

## Untitled

### Что такое Notifications Severity в Брокерпилоте?  
Notifications Severity — это настройка степени важности уведомлений от триггеров, которая помогает дилерам определять приоритеты при обработке. Уведомления разделены на три уровня: легкая, средняя и критическая опасность.  

### Как работают уровни важности уведомлений?  
Каждому уровню соответствует свой цвет и звуковой сигнал:  
- 🟢 **Зеленый** — требует внимания (легкая опасность);  
- 🟡 **Желтый** — потенциально серьезная угроза (средняя опасность);  
- 🔴 **Красный** — требует немедленных действий (критическая опасность).  

### Зачем нужна настройка важности уведомлений?  
Она позволяет дилерам быстро оценивать серьезность угроз и реагировать в правильном порядке: сначала на критические уведомления, затем на менее срочные. Это помогает эффективнее управлять рисками в дилинге.

---

## Untitled

### Что такое параметр "Profit in Commissions" в триггере Insiders?
Параметр "Profit in Commissions" позволяет учитывать комиссионные доходы при анализе потенциальных инсайдерских сделок. Он относится ко всем балансовым операциям с типом COMMISSION в MetaTrader.

### Какие типы операций учитываются?
Параметр анализирует:
- Операции COMMISSION FROM (комиссии списанные)
- Операции COMMISSION TO (комиссии полученные)
Эти типы операций специфичны для платформы MT5.

### Как интерпретировать этот параметр?
Параметр показывает:
- Размер профита, выраженного в комиссионных доходах
- Общую сумму комиссий, заработанных трейдером
- Вклад комиссионных операций в общий финансовый результат

---

## Untitled

### Что такое Radar в Брокерпилоте?
Radar - это страница мониторинга в реальном времени, которая позволяет быстро получать списки активных трейдеров по заданным параметрам. Это ключевой инструмент для оперативного анализа торговой активности.

### Какие преимущества дает Radar?
Radar позволяет:
1. Мгновенно получать срезы данных по активным трейдерам
2. Существенно сокращать время анализа
3. Быстрее принимать решения, снижая финансовые риски

### Как работает фильтрация в Radar?
Вы можете:
- Задавать любые параметры поиска (например, торговое плечо 1000 и объем продаж 10 лотов)
- Сохранять часто используемые фильтры для быстрого доступа
- Быстро переключаться между сохраненными фильтрами

### Какие дополнительные возможности есть у Radar?
Получив список трейдеров, вы можете:
- Перейти на страницу любого трейдера для детального анализа
- Просмотреть все уведомления триггеров по конкретному трейдеру
- Увидеть индивидуальные комментарии к счетам (если они были добавлены)

---

## Untitled

## Как работает Spread by Exposure в текущей версии?

По умолчанию функционал Spread by Exposure использует главный аккаунт Trading Platform для своих расчетов и операций. 

## Можно ли использовать дополнительный аккаунт для Spread by Exposure?
Да, такая возможность появится в ближайшем релизе. Брокеры, которым требуется выделенный аккаунт (аналогично тому, как это реализовано в Spread by Period/Admin Fee), могут обратиться в техническую поддержку для настройки дополнительного аккаунта после выхода соответствующего обновления.

---

## Untitled

### Что такое Stealing Quotes?

**Stealing Quotes** — это триггер, который определяет, что трейдер использует подключение к платформе брокера, чтобы получать от него котировки и передавать их в другую свою торговую систему.

### Почему важно отслеживать Stealing Quotes?

Важно отслеживать это явление, так как брокер тратит свои ресурсы на обслуживание таких клиентов (проведение KYC, онбординг, работа менеджеров), хотя они не ведут реальную торговлю. Вместо этого они используют брокера как бесплатный источник котировок, что может быть невыгодно для компании.

---

## Untitled

### Что такое триггер "Stop Outs Control" и зачем он нужен?  
Триггер "Stop Outs Control" помогает выявить счета, у которых не сработал стоп-аут, эквити счета отрицательное, но открытые позиции не закрываются. Это позволяет дилерам своевременно узнавать о проблемах в дилинге и реагировать на них, предотвращая дальнейшие убытки.  

### Как работает триггер "Stop Outs Control"?  
При обнаружении счета с отрицательным эквити и незакрытыми позициями дилеры получают уведомление. Если проблема не решается в течение часа, они получают повторный алерт. Это может указывать на проблемы с экзекутором (например, он перестал исполнять ордера) или неработающий плагин стоп-аутов.  

### Как включить Stop Out в метрику Total Session PnL?  
Stop Out можно настроить как часть метрики в Total Session PnL, например, отображая Daily PnL + Stop outs compensation. Брокеру объясняют настройку этой функции при обучении продукту.  

### Где можно сбросить негативные алерты по аккаунтам с большим минусом?  
Для сброса алертов можно использовать инструмент [Stop out Abusers](https://docs.example.com/risk-management/additional/stop-out-abusers/).

---

## Untitled

### Что такое Top Volumes в Trading Platform?
Top Volumes - это страница, отображающая счета с наибольшими объемами. Он помогает дилерам оперативно выявлять наиболее активных трейдеров и анализировать их торговую активность.

### Какие данные отображаются в Top Volumes?
Основная функция инструмента - показывать:
- Список счетов с самыми высокими торговыми объемами
- Возможность перехода к информации по каждому аккаунту

### Как анализировать нет-позиции с помощью Top Volumes?
Для просмотра нет-позиций (чистых позиций) необходимо:
1. Открыть список Top Volumes
2. Выбрать интересующий аккаунт
3. Перейти на страницу конкретного счета

---

## Untitled

### Что такое триггер "Trade Request Flood"?
Триггер "Trade Request Flood" предназначен для защиты торгового сервера от чрезмерной нагрузки, вызванной автоматизированными торговыми системами. Он отслеживает количество запросов от трейдеров и блокирует подозрительную активность.

### Как работает этот триггер?
Триггер анализирует два ключевых параметра:
- Общее количество обращений к серверу в течение торговой сессии
- Количество сделок в секунду
При превышении установленных лимитов система автоматически принимает меры.

### Какие действия предпринимает триггер при обнаружении подозрительной активности?
В зависимости от настроек триггер может:
1. Автоматически блокировать торговлю на указанный период времени
2. Генерировать уведомление для дилера, который затем принимает решение вручную

### Почему этот триггер важный для брокеров?
Триггер защищает от двух основных угроз:
- Перегрузки торгового сервера, которая может привести к его обрушению
- Злоупотреблений со стороны трейдеров, использующих агрессивные торговые роботы

### Как настраивается триггер?
В настройках можно указать:
- Максимальное допустимое количество обращений к серверу
- Лимит сделок в секунду
- Тип реакции (автоблокировка или уведомление)
- Продолжительность блокировки (если выбрана автоблокировка)

---

## Untitled

### Что такое триггер "Trade Restriction Period"?
Триггер "Trade Restriction Period" позволяет временно запрещать открытие новых позиций по выбранным торговым инструментам или группам инструментов в течение заданного периода времени.

### Какие режимы работы предусматривает триггер?
Триггер предлагает два варианта ограничений:
1. Режим "close-only" - разрешает только закрытие существующих позиций
2. Полное ограничение - запрещает любые торговые операции, оставляя только возможность просмотра котировок

### Как работает временное ограничение?
Ограничение действует строго в течение указанного в настройках периода. Если триггер будет отключен до окончания этого периода, торговые ограничения автоматически снимаются.

### Для чего используется этот триггер?
Триггер применяется в ситуациях, когда необходимо временно ограничить торговую активность по определенным инструментам, например:
- Во время важных экономических новостей
- При технических работах
- Для предотвращения манипуляций рынком
- В случае обнаружения подозрительной активности

### Как снимаются торговые ограничения?
Ограничения автоматически прекращают действовать:
1. По истечении установленного периода времени
2. При досрочном отключении триггера
3. При изменении настроек триггера

---

## Untitled

### Почему необходимо автоматическое управление торговым плечом?
Автоматическое управление торговым плечом критически важно для защиты брокера от значительных финансовых потерь. Без автоматизации дилеры физически не успевают реагировать на быстрые изменения рыночной ситуации и манипулятивные стратегии трейдеров.

### Как работает автоматическое управление плечом в Trading Platform?
Система Trading Platform реализует комплексную защиту через:
1. Автоматическое снижение торгового плеча при росте эквити счета
2. Триггер контроля волатильности для предупреждения о резких ценовых изменениях
3. Триггер Achieved Profit для обнаружения быстрого удвоения депозита
4. Триггер Large Volumes by Account для контроля необычно больших объемов

### Какую угрозу представляют манипулятивные стратегии?
Трейдеры могут использовать "пирамидальные" стратегии, когда:
- Открываются последовательные позиции по тренду
- Stop-Loss переносится в безубыточную зону
- Прибыль растет в геометрической прогрессии
- С $2000-5000 депозита можно получить до $500k прибыли
Без автоматики брокер несет огромные убытки.

### Какие преимущества дает автоматизация?
Автоматизированная система позволяет:
- Мгновенно реагировать на изменения
- Автоматически корректировать торговые условия
- Предотвращать манипулятивные схемы
- Минимизировать финансовые потери брокера
- Обеспечивать контроль даже в высоковолатильных условиях

---

## Untitled

### Что такое агрегация счетов и какие проблемы она решает?
Агрегация счетов помогает брокерам выявлять трейдеров, использующих несколько учетных записей для мошеннических схем. Она позволяет бороться с искусственным увеличением торговых объемов, злоупотреблением партнерскими программами, использованием брокера как обменника валют и манипуляциями со стоп-аут компенсациями.

### Какие инструменты для агрегации счетов предоставляет Trading Platform?
Trading Platform предлагает два основных инструмента: Aggregated Accounts и Related Profiles. Aggregated Accounts анализирует активность по различным параметрам, а Related Profiles выявляет группы скоординировано работающих трейдеров, так называемые "фермы".

### Как именно работает инструмент Aggregated Accounts?
Инструмент Aggregated Accounts создает комплексные отчеты, объединяя данные по совпадающим IP-адресам, идентификаторам устройств (CID), данным агентов, адресам электронной почты и именам трейдеров. Это позволяет брокерам оценивать риски и принимать меры против различных мошеннических схем.

### Какие возможности предоставляет инструмент Related Profiles?
Инструмент Related Profiles специально разработан для обнаружения организованных групп трейдеров, которые работают согласованно. Он помогает выявлять случаи злоупотребления партнерскими программами, использования брокера для обмена валюты и попыток получения необоснованных стоп-аут компенсаций.

### Почему агрегация счетов так важна для брокеров?
Агрегация счетов критически важна, потому что позволяет предотвращать значительные финансовые потери, вызванные скоординированными действиями мошенников. Она дает брокерам инструменты для защиты от различных схем обмана, включая искусственное накручивание торговых объемов и манипуляции с компенсациями.

### Как агрегация счетов помогает в борьбе с "фермами" трейдеров?
Агрегация счетов позволяет выявлять целые сети взаимосвязанных аккаунтов, которые работают как единый механизм. Это особенно полезно против организованных групп, пытающихся обойти лимиты брокера или злоупотребить его сервисами в корыстных целях.

---

## Untitled

### Как изменить часовой пояс в Trading Platform?
Для серверов MT4 и MT5 часовой пояс изменяется автоматически. Для хедж-нод требуется ручная настройка и обязательный перезапуск системы после изменения.

### Что происходит при ручном изменении времени на сервере брокером?
При ручном изменении времени сервера MetaTrader обычно отправляет уведомление о смене времени. Если такое уведомление не приходит, существует риск временного несоответствия в отображении времени сделок в Trading Platform. Ситуация нормализуется только во время следующего ролловера. Особенно важно учитывать, что при смене часового пояса (например, +2 или -1 час) могут возникнуть "нестандартные" торговые сутки продолжительностью 23 или 25 часов, что повлияет на количество сделок в текущей сессии.

### Почему требуется перезапуск ноды при смене часового пояса?
Перезапуск ноды критически важен, так как при запуске система получает актуальное время сервера и определяет период своего простоя. Это позволяет корректно выгрузить все накопленные данные за время отсутствия и гарантировать точность временных меток. В текущей реализации система еще не поддерживает "горячее" обновление времени без перезапуска.

### Как отображается время различных операций в Trading Platform?
Все временные метки в Trading Platform (включая смену торгового плеча, последние подключения и другие операции) отображаются согласно времени сервера MetaTrader, а не локальному времени рабочей станции.

### Какие действия должен выполнить брокер при смене времени?
Брокеру необходимо заранее уведомить техническую поддержку Trading Platform о планируемой смене времени или часового пояса. После выполнения изменений требуется перезапуск хедж-нод и ожидание завершения проверки системы специалистами. Это гарантирует корректную обработку всех временных меток и отсутствие расхождений в данных.

---

## Untitled

**Вопрос:**  
В отчёте Current Trade Session – Session Summary отображается
нереализованная прибыль по EURUSD. Как понять, на каких счетах она
накоплена?

**Ответ:**  
Для детализации информации по нереализованной прибыли перейдите в
раздел:

**Dealing Desk → Net Summary → Выберите нужный символ (например,
EURUSD)**  
  
**Теги:** Net Summary, Unrealized PnL, Current Trade Session, Dealing
Desk


![image_(1).png](/.attachments/image_(1)-966573c1-4663-4288-adb6-c7f019a17a96.png)

![image_(2).png](/.attachments/image_(2)-6f5a0c37-dfb6-4ed4-ae4d-90992cb33c21.png)

---

## Untitled

## Как работает параметр Minimum number of session requests в триггере Trade Requests Flood?

Параметр определяет минимальное количество торговых запросов за сессию, необходимое для активации проверки триггера. Система работает в два этапа:

1. Сначала проверяет, превышено ли указанное минимальное количество запросов (например, 1000)
2. Только при превышении этого порога начинает анализировать частоту запросов в заданном интервале

**Пример:**  
При значении параметра 1000 триггер будет игнорировать всех клиентов с количеством запросов менее 1000 за сессию. Для клиентов с 1000+ запросами система проверит, как часто эти запросы создаются, и только затем может сгенерировать уведомление.

---

## Untitled

### Вопрос  
Как работает фильтр CID в секции Aggregated Accounts?

### Ответ  
Фильтр CID в секции Aggregated Accounts работает по логике И (AND).

---

## Untitled

### Как исключить сервер из расчетов в Trading Platform?
Для исключения сервера из расчетов текущей сессии (Current Session) доступны два варианта:
1. Полное отключение сервера
2. Пометить сервер как демо-сервер

### Какие режимы работы серверов доступны в настройках?
Система предлагает три режима фильтрации серверов:
- **All** - учитываются все серверы (и демо, и реальные)
- **Demo** - расчеты производятся только по демо-серверам
- **Real** - учитываются исключительно реальные серверы

Теги:
Сервер, Current Session, Demo, Real, Отключение сервера, Режимы сервера

---

## Untitled

## Как работает кнопка Exclude account в уведомлениях?

При нажатии кнопки Exclude account система исключает указанный счет из мониторинга в рамках конкретного триггера на заданный период времени. Во время действия исключения новые уведомления по этому счету генерироваться не будут.

![issue_exclude.png](/.attachments/issue_exclude-8277e043-ddf2-4f24-90af-9464282527f3.png)

## Где можно проверить текущие исключения?

Все активные исключения отображаются в настройках соответствующего триггера. Исключенные счета остаются видимыми в этом списке на весь период действия исключения.

## Когда возобновится мониторинг счета?

Мониторинг автоматически возобновится после истечения срока исключения. До этого момента триггер не будет создавать новых уведомлений по исключенному счету.

---

## Untitled

### Какие настройки расписания доступны для управления плечом (leverage)?
В Trading Platform предусмотрены разные подходы к настройке расписания для управления торговым плечом в зависимости от используемого триггера.

### Как работает настройка расписания в Net Dynamic Leverage?
Триггер Dynamic Leverage поддерживает настройку расписания:
- Позволяет задавать временные периоды с разными значениями плеча
- Обеспечивает гибкое управление плечом по объему торгов

### Какие возможности есть у Leverage by Equity?
Триггер Leverage by Equity имеет ограниченные возможности:
- Не поддерживает настройку расписания
- Предоставляет опцию контроля выходных дней

### Почему Leverage by Equity не поддерживает расписание?
1. Этот триггер предназначен для других целей управления плечом
2. Для работы по расписанию рекомендуется использовать Dynamic Leverage
3. Контроль выходных дней покрывает основные потребности

### Какой триггер выбрать для управления плечом по расписанию?
Для полноценного управления плечом по расписанию следует использовать Dynamic Leverage

---

## Untitled

## Что такое User Tracks в Trading Platform?

User Tracks - это журнал активности трейдера, где сохраняются CID (Client ID) и IP-адреса, использованные для доступа к счету. Данные начинают записываться только после установки Trading Platform, историческая информация (до установки) недоступна.

## Как найти все счета по IP-адресу?

Для поиска всех счетов, связанных с конкретным IP:
1. Откройте вкладку User Tracks в карточке счета
2. Кликните правой кнопкой на нужном IP
3. Выберите "Find Multiple Accounts"
4. Система перенесет вас в Aggregated Accounts с отфильтрованными результатами

## Почему нет User Tracks в Aggregated Accounts?

Вкладка User Tracks доступна только в карточке отдельного счета, так как содержит индивидуальные данные по активности конкретного трейдера. В Aggregated Accounts эта информация не отображается, поскольку раздел предназначен для агрегированных данных по группе счетов.

---

## Untitled

### Что такое триггер "Insiders"?
Триггер "Insiders" предназначен для выявления потенциальных случаев инсайдерской торговли. Он помогает дилерам обнаруживать подозрительные сделки, когда трейдеры могут использовать закрытую информацию о предстоящих крупных событиях компаний для получения незаконной прибыли.

### Как работает триггер "Insiders"?
Триггер анализирует необычно крупные сделки и резкие скачки прибыли на счетах. При обнаружении подозрительной активности он генерирует уведомление, указывающее на возможный случай инсайдерской торговли. Важно понимать, что триггер выступает лишь первичным фильтром и не подтверждает факт инсайдерской торговли.

### Что делать при получении уведомления?
При получении уведомления дилер должен провести тщательную проверку:
- Проанализировать историю торговли клиента
- Проверить данные клиента в CRM-системе
- Изучить источник средств на счете
- Установить связь клиента с компаниями, чьи акции он торгует
Только комплексная проверка может подтвердить или опровергнуть подозрения.

### Как правильно настроить триггер?
Для эффективной работы рекомендуется:
- Установить минимальный порог прибыли 
- Настроить период анализа сделок
- Учитывать типичные объемы торговли клиента
Правильная настройка поможет минимизировать ложные срабатывания.

### Какие ограничения есть у триггера?
Триггер имеет следующие особенности:
- Не закрывает ордера автоматически
- Не гарантирует факт инсайдерской торговли
- Требует ручной проверки каждого случая

---

## Untitled

### Как Trading Platform обеспечивает совместимость с обновлениями MT5?
Команда Trading Platform внимательно отслеживает все обновления торговой платформы MT5. На текущий момент проблем с совместимостью после обновлений не возникает, система продолжает стабильно работать.

### Все ли новые функции MT5 поддерживаются в Trading Platform?
Не все новые функции, появляющиеся в MT5, сразу становятся доступными в Trading Platform. Однако разработчики рассматривают возможность интеграции наиболее востребованных и полезных функций в будущих версиях системы.

---

## Untitled

### Как Trading Platform обрабатывает удаленные счета из MT5?
Если брокер удаляет счет в MT5, информация о нем сохраняется в Trading Platform. Однако если счет был удален до установки Trading Platform, система не может получить данные об этом счете, так как они отсутствуют в истории MT5.

### Что происходит при разрыве соединения между Trading Platform и MT5?
При временном разрыве соединения:
1. После восстановления подключения Trading Platform автоматически синхронизирует все сделки
2. Синхронизация происходит по последнему номеру сделки
3. Все торговые операции, совершенные во время отключения, будут корректно отражены в системе

---

## Untitled

### Вопрос  
Что такое параметр Check Margin Level в настройке автоматизации триггера leverage by equity и как он работает?

### Ответ  
Параметр **Check Margin Level** в настройке автоматизации триггера *leverage by equity* задаётся в виде числового значения, которое отражает процент уровня маржи и служит порогом для управления автоматическим изменением кредитного плеча.

- В **старом интерфейсе** это было представлено в виде полоски с выбором процента.
- В **новом интерфейсе** необходимо вводить числовое значение.

Если уровень маржи на счёте **опускается до значения порога или ниже**,то:

- **Автоматическое изменение плеча не сработает.**
- Вместо этого будет сгенерировано **уведомление для брокера** — это сигнал, что уровень маржи стал критически низким и брокеру нужно обратить внимание для принятия дальнейших действий.

Если уровень маржи находится **выше установленного порога**, автоматизация изменения кредитного плеча применяется.

Таким образом, параметр Check Margin Level выступает как защитный порог, предотвращающий автоматическую смену плеча в условиях повышенного риска, одновременно информируя брокера для контроля ситуации.

> Нулевое значение или слишком низкий порог (например, 0%) рискованны, так как система не будет блокировать изменение плеча даже при критическом снижении уровня маржи.
{.is-warning}


---
**Пример:**  
Check Margin Level = 50%
Можно вручную выставлять ограничение больше 100%, новый интерфейс это позволяет
- При уровне маржи **50% и ниже** — автоматизация изменения плеча не сработает, но появится уведомление брокеру.  
- При уровне маржи **выше 50%** — автоматическое изменение плеча будет выполнено автоматически.

---

## Untitled

## Как работает плагин Trading PlatformNetLeverages с позициями, открытыми до ПМТ?

Плагин пересчитывает маржу по всем позициям инструмента, если во время периода повышенных маржинальных требований (ПМТ) происходит любая торговая активность. Это ожидаемое поведение, а не ошибка.

**Ключевые моменты:**
- Позиции, открытые до ПМТ, остаются без изменений, пока счет неактивен
- Любая торговая операция в ПМТ (открытие/закрытие) запускает пересчет маржи для всех позиций по этому инструменту
- Пересчет выполняется для сохранения единой маржинальной нагрузки по инструменту
- Система работает с нетто-объемом, не разделяя "старые" и "новые" позиции

**Пример:**
1. До ПМТ: 1 лот EURUSD с маржей $55 (плечо 1:2000)
2. В ПМТ: плечо меняется на 1:500
3. Открывается еще 1 лот EURUSD
4. Результат: оба лота пересчитываются → итоговая маржа $440

---

## Untitled

### **Что означают показатели в блоке серверов в Trading Platform?**

![image.png](/.attachments/image-e976cb04-58db-4df8-b521-46011283b33c.png)

*   **Status**: Показывает текущее состояние сервера. Если указано **`ONLINE`**, это означает, что сервер работает и доступен.
    
*   **Time**: Указывает точное время и дату на сервере.
    
*   **Timezone**: Обозначает часовой пояс, в котором работает сервер. В данном случае это **`UTC (+3)`**.
    
*   **Sessions**: Это количество трейдеров, которые в данный момент подключены к серверу. Это значение берется из платформы MetaTrader.
    
*   **DB Version**: Версия нашей базы данных.
    
*   **Platform version**: Это версия нашего коннектора.

---

## Untitled

### Как Trading Platform обрабатывает отложенные ордера?
Trading Platform учитывает только активные отложенные ордера при расчетах торговых объемов, аналогично тому как учитываются Stop-Loss и Take-Profit для открытых позиций. Это позволяет получать точные данные о текущей рыночной активности.

### Почему Trading Platform не хранит историю отложенных ордеров?
Система сознательно не сохраняет историю отложенных ордеров по двум основным причинам:
1. Технические ограничения - хранение таких данных потребовало бы огромных ресурсов и привело бы к созданию чрезмерно больших таблиц в базе данных, сравнимых по объему с таблицами сделок (которые могут содержать до миллиарда записей)
2. Практическая целесообразность - анализ архивных данных по отложенным ордерам не дает существенной пользы для текущих расчетов и риск-менеджмента

### Как получить данные по старым отложенным ордерам при необходимости?
Если требуется проанализировать исторические отложенные ордера, Trading Platform рекомендует запрашивать эти данные напрямую в торговой платформе. Такой подход обеспечивает баланс между производительностью системы и возможностью доступа к информации при необходимости.

---

## Untitled

### Что такое семафоры в Trading Platform?

**Семафоры** — это специальные, критически важные оповещения в системе Trading Platform, которые помогают контролировать состояние дилинга. Они отображаются в виде большого красного круга с цифрами в правом нижнем углу экрана и сигнализируют о проблемах, требующих немедленного внимания.

### За что отвечают семафоры?

Семафоры предназначены для контроля двух ключевых процессов:
*   **Непрерывности потока котировок (New rates control):** Если котировки по определенному торговому символу перестают поступать в течение заданного времени, генерируется уведомление.
    
*   **Потока исполнения ордеров (Orders execution control):** Если поток исполнения ордеров по какой-либо причине прекращается, также срабатывает оповещение.
    
Эти уведомления служат сигналом для брокера, что необходимо разобраться в ситуации и, возможно, связаться с поставщиком ликвидности.

### Чем отличаются warnings и alerts?

Уведомления-семафоры делятся на **warnings** (предупреждения) и **alerts** (тревоги). Разница между ними заключается в интенсивности оповещения.

### Можно ли настроить семафоры?

Да, вы можете настроить семафоры в соответствии со своими потребностями. Например, для контроля новых котировок (New rates control) можно:
*   Настроить разные временные интервалы для уведомлений для разных торговых символов.
    
*   Установить разные интервалы времени для уведомлений в дневные и ночные часы.
    
Для контроля исполнения ордеров (Orders execution control) также доступны настройки временных интервалов для дневных и ночных часов, а также для выходных дней.

---

## Untitled

## Как понять статус правил в интерфейсе Trading Platform?

В новом интерфейсе Trading Platform статус правил отображается с помощью специальных иконок:

![rule_state_ui.png](/.attachments/rule_state_ui-088fc26c-a2a1-40ce-86e6-a2682a58dc69.png)

**Иконка "Занято"** (вращающаяся пунктирная окружность) означает, что правило находится в процессе сохранения или активации. В этом состоянии:
- Кнопки редактирования (edit) и удаления (delete) временно недоступны
- Изменение параметров правила заблокировано
- Система обрабатывает внесенные изменения

## Что делать, если правило долго сохраняется?

1. **Подождать** - обычно обработка занимает несколько секунд
2. **Обновить страницу** - если состояние не меняется длительное время
3. **Проверить статус** - после обновления страницы

**Пример ситуации:**  
После добавления нового правила иконка "Занято" может отображаться до завершения всех фоновых процессов активации. Это нормальное поведение системы.

---

## Untitled

### Что представляет собой карточка счёта в Брокерпилоте?  
Карточка счёта — это одна из ключевых функций Брокерпилота, позволяющая быстро переходить от общей картины к деталям, мгновенно погружаться в анализ конкретного счета и оценивать текущую ситуацию.

### Как можно попасть на страницу конкретного счёта?  
Из любого отчёта или любого уведомления триггера можно перейти на страницу конкретного счёта для детального анализа.

### Какую информацию отображает страница счёта?  
Страница счёта отображает:  
- Подробные данные о трейдере (личные данные клиента)  
- Текущее состояние баланса  
- Общий PnL  
- Данные по торговой сессии  
- Вкладки с различными графиками и экспозицией  
- Торговую историю  
- Историю пополнения счёта  
- Все уведомления, появлявшиеся в Брокерпилоте по этому счёту  
- Логи торгового сервера  
- Информацию о том, с каких IP и CID клиент торговал и в какое время  

### Можно ли добавлять комментарии к счету?  
Да, страницу счета можно пометить, добавив свой комментарий. Это позволяет в любых отчётах и таблицах идентифицировать счёт и следить за действиями клиента.

### Какой доступ к странице счёта доступен пользователю?  
Мгновенный доступ возможен:  
- Из любого отчёта, где отображается номер счёта  
- Из любого уведомления, в котором упоминается счёт  
- Через секцию “Accounts”, где также есть поиск по счетам и отдельные списки помеченных и заблокированных счетов

---

## Untitled

### Что такое триггер Account Events?

**Account Events** — это триггер, который позволяет отслеживать и обнаруживать ордера, размещенные в определенное время по конкретным торговым символам. Он полезен для выявления аномальной торговой активности, например, когда трейдеры пытаются использовать ценовые разрывы (гэпы) в периоды выхода важных новостей.

### Как работает триггер Account Events?

Триггер позволяет настроить следующие условия:
*   **Время:** Вы можете задать временной диапазон для отслеживания
    
*   **Символ:** Выбрать конкретные торговые символы 
    
Когда ордера соответствуют заданным параметрам, триггер генерирует уведомление. Он ничего не рассчитывает, а просто выводит оповещение.

### Какие еще функции есть у триггера Account Events?

Триггер также имеет специальную опцию **"Detector of locked positions"**, которая позволяет обнаруживать заблокированные (локированные) позиции на одном торговом счете.

---

## Untitled

### Что такое триггер "Scalpers HFT" и для чего он нужен?
Триггер "Scalpers HFT" предназначен для выявления и контроля высокочастотных торговых стратегий (HFT) и скальпинга. Он помогает брокерам отслеживать нежелательные торговые практики в соответствии с их внутренней политикой, оперативно уведомляя дилеров о подозрительной активности.

### Какие типы торговли выявляет этот триггер?
Триггер идентифицирует два основных типа торговли: скальпинг (краткосрочные сделки длительностью от секунд до минут) и HFT (сверхбыструю алгоритмическую торговлю). Он анализирует характер сделок и их временные параметры.

### Что будет, если отметить счет в уведомлении как "suspicious"?
- Аккаунт получает специальную иконку-метку
- Эта отметка носит исключительно информационный характер
- На работу системы и логику триггеров метка не влияет
- Маркировка сохраняется до тех пор, пока пользователь не снимет ее вручную

### Что означает ошибка `the following account Group(s) could not be found`?
Данная ошибка появляется при при открытии правила, когда в настройках триггера указаны несуществующие группы счетов. Это происходит при удалении групп из торговой платформы без соответствующего обновления настроек триггера.
Если триггер удаляется из МТ5, пилот немедленно обновляет данные всех расчётов. Но если правила триггеров были созданы вручную, надо так же удалить правило/а которые включают в себя есть эти группы из триггера или убрать данные группы из настроек правила триггера.
![hft_error.png](/.attachments/hft_error-ebddba29-2afc-4787-8f96-3523b46c0151.png)

### Как работает кнопка "Exclude account"?
Кнопка "Exclude account" позволяет исключить конкретный аккаунт из мониторинга в рамках данного триггера. При её использовании выбранный счёт перестаёт отслеживаться, но существующие алерты сохраняются.
![photo_2025-06-03_08-20-46.jpg](/.attachments/photo_2025-06-03_08-20-46-97861b0c-2055-4c93-8f43-01a2026563ac.jpg)

### Какие основные параметры настройки имеет триггер?
Триггер позволяет настраивать временной интервал между сделками (Interval), минимальный уровень прибыли (Minimum PnL), а также привязывать мониторинг к определённым группам счетов. После срабатывания устанавливается 24-часовой таймаут для данного счёта.

### Как подтвердить алерт и что происходит после подтверждения?
При нажатии кнопки "Confirm" текущее оповещение исчезает, но при повторном срабатывании условий триггера новый алерт будет создан автоматически. Подтверждение не влияет на статус счёта в системе.

---

## Untitled

### Что такое триггер Swaps Free Accounts?

**Swaps Free Accounts** — это триггер, который позволяет автоматически отменять свопы для счетов или групп счетов в заданный промежуток времени. Он помогает брокерам управлять специальными программами, такими как счета без свопов (исламские счета), и автоматически обнуляет свопы, начисленные на открытые позиции, которые соответствуют заданным правилам.

### Как работает триггер Swaps Free Accounts?

Триггер отслеживает открытые ордера и их позиции. Когда платформа Metatrader начисляет свопы после переноса позиций (ролловера), триггер проверяет, соответствуют ли они заданным условиям. Если условия выполняются, триггер автоматически обнуляет начисленные свопы для соответствующей позиции.

### При каких условиях срабатывает триггер Swaps Free Accounts?

Триггер срабатывает, если соблюдаются следующие условия:
*   Включена опция **"Use volumes"** и количество лотов меньше или равно максимальному значению, указанному в поле **"Max Volume For Swaps Free, Lots value"**.
    
*   Срок открытой позиции не превышает длительность периода **"swaps free"**.
    
*   Включена опция **"Set Free Period Start Date"** и текущая дата находится в интервале от даты старта акции до даты старта плюс длительность периода без свопов.
    

### Почему правило может не срабатывать?

Если клиент утверждает, что его счет должен быть без свопов, но с него все равно взимается комиссия, это может быть связано с тем, что правило было деактивировано или удалено брокером. Также следует проверить, соответствуют ли параметры позиции клиента (объем, срок) настройкам триггера.

### Можно ли экспортировать настройки Swaps Free Accounts?

Да, можно экспортировать настройки, но только для одного сервера за раз. Экспорт доступен в формате JSON и включает все правила для выбранного сервера. В старом интерфейсе (Old UI) также есть возможность экспортировать настройки одного конкретного правила в формате CSV.

---

## Untitled

## Как взаимодействуют триггеры в Trading Platform?

В системе действует строгое правило: для каждого счета одновременно может быть активно только одно правило в рамках одного типа триггера. Если вы пытаетесь применить новое правило к счету, который уже включен в другое правило того же триггера, новое правило не сработает - система продолжит применять первое (изначальное) правило.

## Как правильно изменить правило для счета?

Для корректного изменения правил необходимо:
1. Удалить счет из текущей группы правил
2. Добавить его в новую группу с требуемыми настройками
3. Убедиться, что счет не числится в других правилах того же триггера

---

## Untitled

### Возможно ли включить свопы для счетов из безсвоповой группы?

Да, это возможно. Для этой задачи вы можете использовать функционал **Swap Free Accounts** в обратном порядке.

* * *

### Как это сделать?

Вы можете создать правило в **Swap Free Accounts** для конкретного счёта, указав период **Swap Free Period** до нужной даты. После окончания этого периода свопы начнут начисляться автоматически.

* * *

### Подходит ли для этой задачи Admin Fee?

Нет, **Admin Fee** для этой задачи не подходит. Этот функционал позволяет начислять только **фиксированную комиссию** по счёту или группе счетов вручную, а не автоматически в соответствии с текущими свопами.

---

## Untitled

## Что такое злоупотребление защитой от отрицательного баланса?

Некоторые трейдеры используют несколько счетов для открытия противоположных сделок, злоупотребляя защитой от отрицательного баланса. Они открывают сделки на полный баланс: один счет получает прибыль, а противоположный уходит в стоп-аут с компенсацией. В результате трейдер удваивает прибыль за счет брокера.

## Как выявить такие случаи в Trading Platform?

1. Проверьте компенсации стоп-аутов в разделе Deposit and Withdrawal с фильтром "Stop Out Compensations"
2. Определите подозрительные счета с большими компенсациями
3. В Aggregated Accounts найдите связанные счета по:
   - IP-адресам
   - CID
   - ID
   - Имени
   - Почте

## Какие меры профилактики существуют?

Используйте триггер "Leverage by Equity" для автоматического снижения плеча на выходных. Это уменьшает возможности для манипуляций в периоды высокой волатильности при открытии/закрытии рынков.

## Почему Aggregated Accounts эффективен?

Инструмент выявляет связи между счетами на разных серверах и платформах, анализируя технические и персональные данные. Это помогает обнаруживать скоординированные действия между счетами одного трейдера или группы.

---

## Untitled

### Что такое триггер "Overdue Credits"?
Триггер "Overdue Credits" создан для обнаружения и обработки просроченных кредитных ордеров в платформе МТ4, где отсутствует встроенная функция для таких операций.

### Как работает триггер "Overdue Credits"?
Триггер выполняет следующие действия:
1. Ежеминутно проверяет все счета на наличие просроченных кредитных ордеров
2. Предоставляет два варианта обработки:
   - Уведомление для ручного анализа и закрытия
   - Автоматическое закрытие ордера со списанием кредита

### Где можно найти историю автоматических закрытий?
Все автоматические закрытия кредитных ордеров фиксируются и доступны для просмотра в логе истории событий.

### Какие ограничения имеет триггер?
Триггер не поддерживает:
- Автоматическое списание при запросе вывода средств (SD-1260)
- Отображение только определенных групп аккаунтов без дополнительной настройки

### Как настроить триггер для работы с конкретными группами аккаунтов?
Для отслеживания только определенных групп:
1. Добавьте нужные группы в Accounts Group
2. Все остальные группы добавьте в Excluded Account Groups
3. Триггер будет реагировать только на указанные группы аккаунтов

---

# Описание-ошибок

## Untitled

### Что делать, если возникает ошибка "Instance reachability check failed"?

Если пользователь сталкивается с ошибкой **"Instance reachability check failed"**, он может безопасно перезагрузить инстанс без каких-либо негативных последствий.

![aws_error.png](/.attachments/aws_error-90e34a6e-b747-447b-81fb-0c1e321366e9.png)

---

## Untitled

### Что делать, если возникает ошибка обновления в разделе Stealing Quotes?

Если клиент сталкивается с ошибкой обновления в разделе **Stealing Quotes**, это означает, что у него **нет необходимых разрешений**. Клиенту нужно предоставить соответствующие разрешения, указанные в документации, после чего мы перезапустим сервисы на нашей стороне, чтобы изменения вступили в силу.

* * *

### Что означает сообщение об ошибке?
`Mt5TradeServerLogsService: JournalRequest from 27.02.2025 18:47:24, to 28.02.2025 6:47:24, filter= Datafeed | Gateway, sError on call ManagerWrapper5.LoggerServerRequest, MT5Api error - Not enough permissions`

Сообщение об ошибке, например, **"MT5Api error - Not enough permissions"**, указывает на то, что у учётной записи менеджера недостаточно прав для чтения логов и выполнения операций, необходимых для работы функции Stealing Quotes.

![error_of_updating.png](/.attachments/error_of_updating-04193ddf-d7b3-428b-8dd9-c64a9cf76cdc.png)

---

## Untitled

### Что делать при алерте "No orders execution"?

Если брокер получает алерт **"No orders execution for more than … sec"**, это означает, что требуется перезапустить мастер или ноду. Необходимо создать тикет для наших администраторов, чтобы они решили эту проблему.

---

## Untitled

### Что делать, если виджет не обновляется?

Если основное число в виджете **зависло** и не обновляется, выполните следующие действия:
*   **Обновите страницу** или **перезапустите браузер**.
    
*   Узнайте, наблюдают ли другие дилеры ту же проблему.
    
*   Проверьте настройки виджета.
    
*   Сравните текущий интерфейс с рабочей версией.
    
*   **Удалите** и снова **добавьте виджет**.

---

## Untitled

### Что делать, если показатели PnL не сходятся?

Часто брокеры сообщают, что данные PnL в Trading Platform не совпадают с данными их платформы. Для расследования таких случаев необходимо запросить у клиента следующую информацию:
*   **Ожидаемое значение.** Брокер должен предоставить ожидаемое значение и, по возможности, скриншот, где сравниваются показатели в Trading Platform и на его платформе (например, по полю **Realized PnL**).
    
*   **Сравнение прибыли за сессию.** Критически важно сравнивать только прибыль за текущую сессию (**session profit**). В истории MT4/5 может отображаться прибыль за прошлые сессии, что приводит к расхождениям. Если количество ордеров совпадает, но значения PnL отличаются, потребуется наше расследование.
    

* * *

### Что делать при расхождениях в Unrealized PnL?

Если есть расхождения в **Unrealized PnL**, уточните, на каком именно сервере они наблюдаются. Крупным брокерам может быть полезно проверять серверы постепенно.

* * *

### Как проверить расхождения на топ-5 счетах?

Брокеры могут сравнить топ-аккаунты через раздел **Winners & Losers**. Для этого нужно открыть карточку счёта в Trading Platform и сопоставить показатели с данными на платформе, а также проверить расхождения в открытых позициях. Запросите конкретные логины, по которым наблюдаются несоответствия.

* * *

### Как проверить полноту данных?

Попросите брокера подтвердить в **Metabase**, что данные существуют для **всех клиентов**, так как некоторые аккаунты могли быть исключены в Trading Platform.

* * *

### Что делать, если значения на дашборде не обновляются?

Если значения на дашборде не обновляются, запросите у брокера его настройки дашборда (где перечислены активные серверы). Посоветуйте брокеру поочерёдно удалять и добавлять серверы — проблема может быть в одном из них.

* * *

**Примечание:** Для недавно подключённых брокеров MT5 этот алгоритм помогает выявить пробелы в расчётах. Как правило, достаточно проверить 100–500 высокоактивных счетов, где разница превышает примерно 30%.

---

## Untitled

### Что делать, если графики свечей отображаются некорректно?

Если на графиках свечей видны аномальные скачки, которые не совпадают с данными на стороне брокера, необходимо проверить историю на сервере брокера. Вероятно, скачок произошёл именно там, а наш котировщик лишь отобразил его. Если это был **ложный скачок**, команда брокера должна **исправить исторические цены**, и после этого мы проведём повторную миграцию данных.

![wrong_candle.png](/.attachments/wrong_candle-01a18f64-3d61-4f3e-8d6c-498d6621c681.png)

---

## Untitled

### Почему сервер не отображается в настройках триггера?

Если брокер не видит нужный сервер во вкладках настроек триггера, например, в **Dynamic Leverage**, это, скорее всего, связано с **проблемами подключения**.

---

## Untitled

### Что означает ошибка "Gateway Exception" с сообщением "No rights to read logs in manager API"?

Ошибка **"Backend time out"** и **"Gateway Exception"** с сообщением **"No rights to read logs in manager API"** означает, что у аккаунта, используемого для подключения, недостаточно прав для чтения логов в **Manager API**. Для доступа к ним необходимы дополнительные разрешения.

![no_rights_to_read_logs.png](/.attachments/no_rights_to_read_logs-1ff21c29-2665-4bad-ae94-24abb4db3d3c.png)

---

## Untitled

### Что делать, если возникает ошибка "The "Included" group is not found"?

Ошибка **"The "Included" group is not found"** возникает, если Trading Platform не может найти указанную группу. Ранее у нас была функция автоматического удаления групп, которая сейчас отключена, но пользователи могут сталкиваться с этой ситуацией по следующим причинам:
*   Группа была добавлена в список исключений в Trading Platform.
    
*   Группа была удалена в MetaTrader.
    
*   Учётная запись, подключённая к Trading Platform, не имеет прав доступа к этой группе.

![included_group_is_not_found.png](/.attachments/included_group_is_not_found-c452a056-4d3a-4022-85ae-31beedf53441.png)

---

## Untitled

### Что означает ошибка при добавлении символов?
 
`Gateway Exception {"ResponseNode":"ResponseNodeError","Node":"Real","Platform":"Mt5","Result":"Chain request Bp.Requests.Contracts.Api.Requests.Triggers.RequestValidateTriggerSettings error "}`

Ошибка означает, что у системы нет прав на чтение логов **MetaTrader**. Пока менеджеру не будут предоставлены соответствующие разрешения, система не будет функционировать должным образом.

---

## Untitled

Question: what means the Trading View: Gateway Exception error

```json
Gateway Exception {"ResponseNode":"ResponseNodeError","Node":"MT5real","Platform":"Mt5","Result":"Chain request Bp.Requests.Contracts.Api.Requests.RequestTradingViewApi error "}
```
Answer: This error typically indicates that the quotation services are down, resulting in missing chart displays. Immediate action required:

Immediate action required:
Escalate the issue to DevOps team and request verification of quotation services in order to fix the issue. 

![](image.png)


**Теги:** Trading View, Gateway Exception, DevOps, Ошибка, MT5, Котировщик

---

## Untitled

### Почему возникают ошибки в Session Summary после изменения доступов?

Ошибки или несовпадения данных на странице **Session Summary** могут появиться после изменения прав доступа и разрешений. Чтобы новые настройки вступили в силу и проблемы были устранены, требуется перезапуск соответствующего сервиса, который выполнят наши специалисты.

---

## Untitled

### Почему не находится аккаунт в Trading Platform?

Это может быть связано с проблемами с поиском, фильтрами или настройками исключений. Прежде всего, необходимо проверить список подключенных серверов, включая те, что находятся на нашей стороне. Если у вас уже есть скриншот, нужно уточнить:
*   какой именно аккаунт ищется (запросите ссылку на страницу, где его нет, или прямую ссылку на сам аккаунт);
    
*   к какому серверу относится искомый аккаунт.
    
![cannot_searchaccount.png](/.attachments/cannot_searchaccount-7af2c5a0-e3cf-43f2-91cd-38f0b843e93a.png)
* * *

### Почему аккаунт недоступен менеджеру?

Если аккаунт не отображается в Trading Platform вообще, это значит, что он недоступен для аккаунта нашего менеджера, который мы используем для подключения. Для решения этой проблемы брокеру нужно настроить доступы со своей стороны. Он может проверить это в своей админ-панели (на примере MT5, как на скриншоте), найдя номер аккаунта. Если отсутствуют несколько аккаунтов, возможно, наша учётная запись менеджера не имеет доступа ко всей группе счетов из-за настроек разрешений.

![mt_account_search.png](/.attachments/mt_account_search-5f402fc0-1bb9-40e9-9d3d-be56ff3b0dab.png)

---

## Untitled

### Почему график PnL резко падает?

Резкое падение графика PnL может быть вызвано несколькими причинами:
*   **Бездействие браузера.** Продолжительное бездействие может привести к завершению торговой сессии. Так как Trading Platform отображает данные только за текущую сессию, достаточно **обновить страницу**, чтобы увидеть актуальную информацию.
![pnl_chart.png](/.attachments/pnl_chart-3e5964c0-cb85-4345-9806-7d219fd8059f.png)
    
*   **Расхождения хедж-счетов.** Различия между **Session PnL** и **Unrealized PnL** могут возникать для позиций, которые открыты более 24 часов. Чтобы исправить это, перейдите в раздел **Hedging Accounts**, выберите нужный счёт и проверьте обновлённый список открытых позиций для получения точных данных.

---

## Untitled

### Почему некоторые колонки отображаются некорректно при экспорте данных из Trading Platform?

Это происходит из-за проблем с автоматическим определением формата при импорте файла. Чтобы это исправить, нужно правильно открыть файл, а затем сохранить его в подходящем формате.

![wrong_separator_sheet.png](/.attachments/wrong_separator_sheet-804e889f-8c30-4d22-8675-407bbc147c42.png)
* * *

### Как исправить некорректное отображение колонок?

Чтобы исправить проблему, необходимо:
1.  Открыть файл с помощью программы **Neat Office**.
    
2.  В окне **Text Import** установить **Character set** на **Cyrillic (Windows-1251)**.
    
3.  В разделе **Separated by** включить разделитель **Semicolon** (точка с запятой).
    
4.  Сохранить файл, перейдя в **File → Save As** и выбрав формат **Excel 2007-2019**.

![separator_setting.png](/.attachments/separator_setting-02641e53-8926-4091-97c4-748e029c4e39.png)

---

# Описание-полей-в-Trading Platform

## Принцип работы и формирования алертов в Affiliate cheating report

# Принцип работы и формирования алертов в Affiliate cheating report

![affiliate_cheating_alert.png](/.attachments/affiliate_cheating_alert-8036dbde-d17f-4bec-8518-34e05a47d8b0.png)

Пример расчёта
По счету 1547389 было два пополнения: 58260625 и 56117939, на суммы 60.00$ и 56.00$, что в сумме даёт **HistoryMaximumDepositInUsd = 116$**.  
В настройках (`settings`) выбрано следующее:

`"UsePartnershipRewardDepoRatio": true,  "PartnershipRewardDepoRatio": 50,  "PayoutRatePerLotForexInUsd": 6,  "PayoutRatePerLotNonForexInUsd": 2.5,  "MinimalAffiliateFeeInUsd": 300,`

##Как рассчитывается суммарный пороговый оборот?

`affiliateTurnoverFeeInUsd =  affiliateState.TotalTurnoverForexInLots * settings.PayoutRatePerLotForexInUsd + affiliateState.TotalTurnoverNonForexInLots * settings.PayoutRatePerLotNonForexInUsd`

Расшифровка:  
(суммарный пороговый оборот = суммарный оборот в лотах по форексным инструментам * 6 + суммарный оборот в лотах по НЕфорексным инструментам * 2.5)
В примере:  
affiliateTurnoverFeeInUsd = 583.26 * 6 + 787.554 * 2.5 = 5468.445

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

# Регламенты

## Untitled

Если происходит критическая ситуация, которая влияет на работу клиента
или всей системы, НЕОБХОДИМО СРАЗУ:

Сообщить в чат команды/дежурному инженеру

Позвонить, если ситуация требует немедленного реагирования

При необходимости — оповестить клиента, не дожидаясь полного анализа

------------------------------------------------------------------------

### ❗ Примеры ситуаций, когда нужно реагировать без промедлений:

❌ **Нет cоединения с нодой, Ошибка Gateway Exception,
ResponseNodeError**  
— Не загружается информация в системе, графики пустые, данные не
обновляются.

🔌 **Нет подключения к сайту**  
— Невозможно загрузить сайт  
— Достаточно просто **открыть сайт**, чтобы убедиться в наличии
проблемы.

🌐 **Сайт не обновляется**  
— Данные на интерфейсе не актуализируются, графики и виджеты
"зависли".  
 

------------------------------------------------------------------------

### **Что делать:**

**НЕ ждать** — сразу сообщать в техническую поддержку

**Звонить** при отсутствии реакции в течение 1–2 минут.

**Завести задачу** (если не создана) и приложить всё, что есть:

Скриншоты

Ошибки из логов

Время возникновения

Имя клиента / сервера / узла

**Сообщить клиенту**, что мы уже занимаемся проблемой. Не нужно просить
"подождать, пока выясним". Просто подтвердите:  
*"Видим проблему, уже передали ответственным, решение в работе."*

---

## 📘 Основные принципы написания статей

# 📘 Основные принципы написания статей

---

## ✍️ Краткость и точность

Статья должна быть **лаконичной**, но при этом **достаточно информативной**.  
Избегайте избыточных объяснений, не относящихся к сути вопроса.

---

## 📐 Структурированность

Информация должна подаваться **логично и по делу**.  
Лучше разделить текст на небольшие **блоки или абзацы**, чтобы было удобно читать.

---

## 💬 Простота и ясность формулировок

- Используйте **нейтральный, понятный язык**.
- Технические термины — только если **действительно необходимы**.
- Не усложняйте текст без нужды.

---

# 🧾 Форматирование статей

## 🏷 Название статьи

Название должно быть **конкретным** и сразу показывать, о чём пойдёт речь.

- ✅ Хорошо: `Формула расчёта Margin Level`  
- 🚫 Плохо: `Инфо по марже`

---

## 📝 Основной текст

Пишите в формате **справки** или **инструкции**, а не как переписку с клиентом.

### Рекомендуемый стиль:

1. 📌 Общий контекст (если нужно)
2. 📖 Основная информация или логика
3. 🧮 Пояснения, формулы или ссылки
4. 🧭 Пошаговая инструкция (если описывается настройка)
5. 🧩 Проблема и решение (если применимо)

#### Пример:
- **Проблема:** краткое описание сути  
- **Решение:** чёткий и короткий порядок действий

---

## 🔖 Теги

Указываются внизу статьи — они помогают находить нужные материалы.

**Формат:**  
`**Теги:** PnL, Ошибки, Настройки, Интеграции`

---

# 🗂 Размещение и логика

## 📁 Разделы

Размещайте статьи в **логически подходящих разделах**.  
Если нужного раздела нет — **создайте его** или уточните у ответственного.

---

## 🔍 Проверка на дубли

Перед созданием статьи:
- Проверьте **по ключевым словам**, нет ли уже похожего материала.
- Избегайте дублирования информации.

---

# 🧠 Как отличить качественную статью от слабой

## ✅ Хорошая статья:

- Написана как **краткое руководство**, а не пересказ ситуации
- Содержит **пояснение**, **формулу** или **структуру действия**
- Позволяет **любому новому сотруднику** быстро понять тему без лишних вопросов

## 🚫 Плохая статья:

- Скопирован **фрагмент переписки** или тикета без доработки
- Нет пояснения, **откуда брать информацию** или **зачем она нужна**
- Слишком **общий заголовок** и нет логики в подаче текста

---

## Untitled

### 👨‍💻 Порядок, в котором разработчики берут задачи в работу (если нет хотфиксов):

1. Задачи от техподдержки с **приоритетом 1**
2. Задачи, связанные с целями спринта *(если уже были взяты дежурным)*
3. Задачи от техподдержки с **приоритетом 2**
4. **Обычные задачи из спринта**
5. Задачи от техподдержки с **приоритетом 3** *(по умолчанию)*
6. Задачи от техподдержки с **приоритетом 4**

---

### 📥 Порядок карточек на доске

Если несколько задач имеют одинаковый приоритет (например, приоритет 2), разработчики ориентируются на порядок карточек на доске:  
**в работу берётся та задача, что расположена выше.**

---

### 👤 Назначение исполнителя

- Когда задача передаётся на 3-ю линию, **исполнитель по умолчанию не назначается**.
- Это сделано для того, чтобы не возникало ложного впечатления, что задача уже находится в работе.
- Разработчик, который берёт задачу, **должен назначить себя исполнителем**.

Это обеспечивает прозрачность: другие участники команды видят, какие задачи уже обрабатываются, а какие ещё свободны.

---

### ⚠️ Приоритеты

Любой приоритет, **отличный от стандартного (3)** — то есть **1, 2 или 4** — может быть установлен **только после согласования** с **ответственной командой**.

---

## :satellite: 1. Процесс взаимодействия технической поддержки с IT (инфраструктурный запрос)

# :satellite: 1. Процесс взаимодействия технической поддержки с IT (инфраструктурный запрос)

## 1.1 Создание задачи
Специалист технической поддержки создаёт задачу на 1 линию, в которую добавляет:

- подробное описание запроса;
- скриншоты или другие материалы;
- все доступные вводные данные.

## 1.2 Передача задачи в проект IT
Специалист технической поддержки вручную создаёт **копию задачи** в проекте IT.  
При создании копии:

- выбрать **Project**: `Trading Platform`
- выбрать **Work item type**: `Product Backlog Item`
- поставить галочки:
  - `Include existing links`
  - `Include existing attachments`
- после создания копии изменить поле **Area** на `Trading Platform\IT`
- проверяет что тайтл и описание соответствуют друг другу(иногда обращение клиента могли понять не совсем корректно) 

## 1.3 Завершение задачи в проекте IT
После выполнения задачи специалист из отдела IT:

- тегает автора задачи в комментарии или сообщает об этом в Slack-канале
- переводит свою задачу в статус `Done`

## 1.4 Завершение задачи на стороне техподдержки
После получения уведомления от IT, специалист технической поддержки:

- уведомляет клиента о выполнении запроса
- переводит свою задачу в статус `Done`

---

# :bug: 2. Процесс взаимодействия технической поддержки с QA (возможный дефект продукта)

## 2.1 Выявление возможного дефекта
Специалист технической поддержки создаёт задачу и переводит её на **вторую линию**, в которую добавляет:

- подробное описание проблемы
- скриншоты или другие материалы
- шаги воспроизведения
- все доступные вводные данные

## 2.2 Подтверждение дефекта
Если дефект удаётся воспроизвести:

- QA создаёт **отдельную баг-задачу**
- в исходной задаче создаётся **связь с баг-задачей**
- исходная задача переводится в статус `1st line`
- **исполнителем (Assignee)** снова назначается тот, кто передал задачу (обычно специалист 1-й линии)

## 2.3 Уведомление клиента
После подтверждения дефекта специалист технической поддержки уведомляет клиента, что **проблема признана багом** и будет исправлена в одном из будущих релизов.

> :pushpin: Это стандартный сценарий — после такого уведомления задача **закрывается**.

Если клиент **отдельно просит уведомить его** при исправлении:

- в баг-задаче, в разделе **Acceptance Criteria**, сотрудник технической поддержки указывает, что **после устранения бага необходимо уведомить ТП**, чтобы техподдержка могла сообщить клиенту.

## 2.4 Завершение
После стандартного уведомления клиента задача переводится в статус `Done`.

> :pushpin: Под уведомлением понимается сообщение клиенту о признании бага и его последующем исправлении.

> :warning: Задача **не остаётся открытой** до момента исправления — она **закрывается сразу** после информирования клиента.

Если баг **не подтверждён** или требуется **дополнительная информация** — задача возвращается в `1st line` с пояснением.

> :warning: В отсутствие QA (отгул, больничный, отпуск) **исполнителем назначается дежурный программист**.

---

# :hammer_and_pick: 3. Процесс взаимодействия технической поддержки с Customer Success (запрос на доработку)

## 3.1 Обработка задачи
Если в ходе обработки запроса на одной из линий ТП выясняется, что необходима **доработка продукта**, специалист технической поддержки:

- уточняет у клиента, **что именно он хочет изменить или доработать**
- выясняет, **какую задачу** это должно решать для клиента
- старается собрать **максимум информации**, чтобы задача была понятна другим командам
- **заполняет задачу**

## 3.2 Передача задачи
- меняет поле **Area** на `Trading Platform Support\Customer Success`
- меняет статус **State** на `New`

> :pushpin: После этого задача **автоматически покидает доску технической поддержки** и появляется у команды Customer Success.

---

# :bell: Уведомление брокера

Если задача требует уведомления брокера (например, после выполнения задачи IT или исправления бага), необходимо:

- установить для задачи статус **`Notify The Broker`**

После уведомления брокера:

- перевести задачу в статус **`Done`**

---

# Символы-и-их-параметры

## Untitled

## Почему в разделе Scheduling Dividends Adjustments отсутствуют символы?

Символы необходимо предварительно настроить в Dealing Settings > CFD Rollover для каждого сервера. Без этой настройки список останется пустым.

## Почему недоступен предварительный просмотр и расписание?

Функционал планирования дивидендов блокируется во время торговой сессии. Настройки доступны только в нерабочие часы, о чем указано внизу страницы.

## В каком времени указываются параметры расписания?

Все временные параметры в настройках указываются в UTC, а не в серверном времени. Это важно учитывать при планировании выплат.

## Как работают отрицательные значения Short dividends?

При отрицательном значении система выполняет обратную операцию Sell вместо стандартного начисления. Это позволяет реализовать особые сценарии дивидендных выплат.

## Как загрузить дивиденды из файла?

Для файловой загрузки необходимо:
1. Проверить наличие пермишенов (см. документацию)
2. Подготовить файл в требуемом формате
3. Загрузить вне торговой сессии

## Что делать при ошибках после настройки?

При возникновении проблем:
1. Проверьте логи через ссылку на Job
2. Убедитесь в наличии прав доступа
3. Проверьте время выполнения настройки (вне торговой сессии)
4. Сверьте временную зону (UTC)

![снимок_экрана_2025-04-30_081747.png](/.attachments/снимок_экрана_2025-04-30_081747-6851a848-664a-4353-b9e0-d92bbd8bc2eb.png)

**Документация:**  
[Dividends Adjustment Permissions](https://docs.example.com/dealing-operations/dividends-adjustment/)

---

## Untitled

## Почему в уведомлениях триггеров появляются символы, не участвующие в правилах?

Возникновение таких ситуаций связано с особенностями работы системы. После переноса символов между группами или изменения правил Trading Platform продолжает использовать предыдущие данные о принадлежности символов до момента перезапуска сервиса. Это временное состояние, которое автоматически корректируется после рестарта системы.

## Как решить проблему некорректного отображения символов?

Для немедленного устранения проблемы требуется выполнить перезапуск сервиса Trading Platform.

---

## Untitled

## Как определяется спред в Trading Platform?

Спреды в Trading Platform рассчитываются по следующим правилам: для форексных инструментов с точностью 3 или 5 знаков спред делится на 10 и отображается в микропунктах. Например:
- При котировке 1.12340/1.12345 (5 знаков) спред будет 0.5
- При котировке 1.1230/1.1234 (4 знака) - 4
- При котировке 1.120/1.123 (3 знака) - 0.3 (3 микропункта = 0.3 пункта)

![spread_characters.png](/.attachments/spread_characters-ec51be29-1b26-4a90-943b-da2e97c61f6f.png =700x)
## За какой период агрегируются данные о спредах?

Данные о спредах накапливаются с момента запуска котировочного сервиса до его следующего перезапуска (обычно во время обновлений на выходных). Такой подход позволяет избежать использования ресурсоемкой инфраструктуры с базами данных.

## Как просмотреть данные о спредах?

Через интерфейс Trading Platform можно запросить доступ к функционалу Quotes Monitoring, где отображаются текущие спреды. Для подключения этого инструмента необходимо обратиться в техническую поддержку.

## Как рассчитываются средние/максимальные/минимальные спреды?

Показатели SpreadAverage, SpreadMax и SpreadMin рассчитываются за весь период работы котировочного сервиса (от последнего перезапуска). В расчетах используются микропункты для обеспечения единообразия данных независимо от точности инструмента.

---

## Untitled

## Почему в интерфейсе дублируется отображение одного символа?

Проблема возникает из-за различий в описаниях (symbol description) для технически одинаковых символов. Trading Platform группирует символы по полю Description, и если описания различаются - система воспринимает их как разные инструменты, даже если торговые символы выглядят одинаково.

## Как выявить и устранить проблему дублирования?

**Для Old UI:**
1. Перейдите в Specifications > Symbols
2. Введите символ в поле поиска
3. Сравните описания для всех вариантов символа

**Для New UI:**
1. Откройте Current Session
2. Используйте Quick Search для поиска символа
3. Проверьте описания в таблице символов

Для устранения дублирования необходимо унифицировать описания символов в настройках системы.

## Какие последствия, если оставить разные описания?

Если оставить разные описания:
- Trading Platform будет считать символы разными инструментами
- Торговая статистика разделится между "копиями" символа
- В интерфейсе будут отображаться несколько строк одного символа
- При выборе символов в различных разделах придется помнить, какой именно вариант нужен

**Важно:**  
При клике на любой из дублированных символов в дашборде система перенаправит на общую страницу инструмента, так как технически это один и тот же символ.

---

## Untitled

## Как Trading Platform получает данные о contract size?

Trading Platform берет параметры символов, включая размер контракта (contract size), напрямую с серверов MT5.

---

## Untitled

## Как Trading Platform определяет базовый символ и суффиксы?

Система использует следующий алгоритм обработки символов:
1. Сначала проверяется поле Source для каждого символа - если оно заполнено и указывает на существующий символ, этот символ считается базовым
2. Если Source отсутствует или ссылается на несуществующий символ, тогда текущий символ считается базовым
3. При включенной опции "Collect Suffixes" система группирует символы по полю Description
4. Из каждой группы выбирается символ с наиболее коротким названием в качестве основного

## Как происходит агрегация данных по разным серверам?

При объединении данных с нескольких серверов система повторяет процесс выбора базового символа отдельно для каждого сервера. Это позволяет корректно агрегировать данные для инструментов с разными названиями, но одинаковым описанием (например, XAUUSD и GOLD). В результате формируется единая отчетность, где все варианты символов учитываются как один инструмент.

---

## Untitled

## Как объединить несколько вариантов символа для анализа статистики?

Для комбинирования статистики по разным вариантам одного символа (например, EURUSD.s, EURUSD и EURUSD.r) необходимо выполнить два условия:

1. **Совпадение описаний**  
   Все комбинируемые символы должны иметь идентичное поле Description в настройках. Это ключевое требование для группировки.

2. **Включение опции Collect Symbol Suffixes**  
   В разделе Current Session > Session Summary активируйте переключатель "Collect Symbol Suffixes". Это заставит систему рассматривать все символы с одинаковым описанием как одну группу.

После активации Trading Platform автоматически объединит статистику по всем символам группы в единые показатели. Например, данные по EURUSD.s, EURUSD и EURUSD.r будут агрегированы как по одному инструменту при условии полного совпадения их описаний.

**Важно:**  
- Проверьте описания символов в Dealing Settings перед комбинированием  
- Изменения применяются только к текущей сессии  
- Для постоянной группировки требуется настройка на уровне символов

---

## Untitled

## Почему возникают ложные алерты по символам в Trading Platform?

Ложные алерты могут появляться по нескольким причинам. Наиболее распространенная ситуация - получение уведомлений по символу, у которого еще не наступила дата First Trade (например, алерт 24 июля для символа с датой начала торгов 26 июля). Также возможны случаи, когда символ перенесен в группу, не участвующую в правилах, но сервис Trading Platform еще не был перезапущен после этого изменения.

## Как решить проблему ложных алертов?

Для временного решения проблемы техническая поддержка может добавить проблемный символ в исключения до момента исправления ошибки. После выхода фикса символ нужно будет удалить из исключений. Если проблема связана с изменением групп символов, требуется перезапуск сервиса Trading Platform. Также рекомендуется проверить текущие настройки - часто ложные срабатывания вызваны некорректными настройками на стороне брокера.

## Какие действия необходимы при изменении групп символов?

После любых изменений в группах символов или их настройках обязателен перезапуск сервиса Trading Platform. Без этого система продолжит использовать старые данные о принадлежности символов к группам, что может приводить к некорректным алертам. При возникновении проблем сначала стоит уточнить время последнего изменения групп и сравнить его с временем последнего рестарта сервиса.

---

## Untitled

## Как работает группировка символов по описанию в Trading Platform?

Символы с одинаковым описанием (Symbol description) автоматически объединяются в системе. Это может вызывать нежелательное слияние разных инструментов.

## Как разделить слившиеся символы?

Измените описание одного из символов в настройках MT5. После синхронизации Trading Platform будет отображать их как отдельные инструменты.
![oldui_symbol_description.png](/.attachments/oldui_symbol_description-1488838a-1dd9-4468-8f88-448402db451d.png)

---

## Untitled

## Как работает фильтр по Symbol level в Trading Platform?

Фильтр по уровню символов (Symbol level) может приводить к отсутствию данных в отчете Session Top Performer Dashboard при включенной опции Collect Symbol Suffixes. Это происходит из-за особенностей обработки суффиксов символов при фильтрации.

## Как решить проблему с отображением данных?

Для корректного отображения отфильтрованных данных необходимо:
1. Отключить опцию Collect Symbol Suffixes
2. Повторно применить фильтр по Symbol level
3. Проверить отображение данных в отчете

После выполнения этих действий система начнет корректно отображать отфильтрованные данные в Session Top Performer Dashboard. Важно учитывать, что эта настройка влияет только на текущую сессию и не требует перезапуска сервиса.

---

# Формулы-и-расчеты

## Untitled

## Как рассчитывается соотношение Vhigh to Vlow в Abnormal Volatility Trigger?
Соотношение Vhigh to Vlow = Sigma1Min / Sigma1h, где:
- Sigma1Min - стандартное отклонение минутного таймфрейма
- Sigma1h - стандартное отклонение часового таймфрейма

## Какие допустимые значения параметра волатильности?
Допустимый диапазон: от 1 до 50 (в старом интерфейсе 1-100%)

## При каком условии срабатывает алерт?
Алерт возникает когда: Sigma1Min / Sigma1h ≥ заданного порога (Threshold)

## Как рассчитывается Sigma1h (часовое отклонение)?
По ценам закрытия часовых свечей за последние 31 день

## Как рассчитывается Sigma1Min (минутное отклонение)?
По ценам закрытия 100 последних минутных свечей

## Что означает стандартное отклонение в этом контексте?
Мера волатильности, показывающая разброс цен закрытия относительно их среднего значения

## Что нужно для корректной работы?
Необходимо предварительное накопление данных по нормальной волатильности для каждого торгового инструмента

---

## Untitled

Что такое Actual Leverage?
Это фактическое кредитное плечо (ФКП). Оно отображено в карточке счета.

Как рассчитывается Actual Leverage?
Actual Leverage = Current Net Volume (in account currency) / Current Equity

---

## Untitled

##Как рассчитываются Average Price и VWAP в графе Net Summary?**  
В графе Net Summary значение Average Price рассчитывается как Volume Weighted Average Price (VWAP).

###Формула расчёта VWAP:  
`Сумма (цена × объём) по всем сделкам / Общий объём сделок`

##Как Trading Platform работает с хеджинговыми счетами?**  
Trading Platform может подключаться к счёту LP (Liquidity Provider) по клиентским реквизитам и получать данные.

##К каким системам может подключаться Trading Platform?**  
Подключение возможно к:
*   Терминалам MT4/MT5
    
*   FIX API
    
*   API различных LP, которые поддерживаются системой

---

## Untitled

##Как рассчитывается Change Of Unrealized PnL
Change Of Unrealized = Current Unrealized - Previous Unrealized (EOD)

---

## Untitled

### Как рассчитывается ChangePercent в эндпоинте CurrentRates?  

Параметр `ChangePercent` (и его вариации, такие как `MonthChangePercent`, `ThreeMonthsChangePercent` и др.) рассчитывается на основе свечной истории цены закрытия.  

Формула для расчёта:
`((Bid - Цена Bid на закрытии сессии) / Цена Bid на закрытии сессии) * 100`


#### Как определяются периоды для MonthChangePercent, ThreeMonthsChangePercent и других?  
Для параметров:  
- `MonthChangePercent` – берётся изменение за последний **1 месяц** (календарные дни).  
- `ThreeMonthsChangePercent` – изменение за **3 месяца**.  
- Аналогично для полугода и года.  

> **Примечание:** Расчёты производятся от текущей даты назад, с учётом календарных дней.

---

## Untitled

**Вопрос:** Как работает условие срабатывания триггера в настройках
Insiders?  
**Ответ:** Триггер срабатывает, если одновременно выполняются **все
три** условия:

Profit in USD ≥ 10 USD,

Profit in Spreads ≥ 5,

Transaction Monitoring Time ≤ 5 секунд.

![insiders_settings.png](/.attachments/insiders_settings-d6832367-f1b0-4043-9564-3465c46ee1cd.png =650x)

**Вопрос:** Можно ли использовать только одно из условий?  
**Ответ:** Да, имеет смысл использовать либо условие по прибыли в USD,
либо по прибыли в спредах, чтобы избежать дублирующей фильтрации.
Включение всех параметров одновременно требует, чтобы каждый ордер
соответствовал им всем.

![](/4dep/12b/qa_assets/insiders_settings.png)

---

## Untitled

**Вопрос:** Что отслеживает триггер Large Volumes by account?  
**Ответ:** Триггер реагирует на пересчитанный (совокупный) объем всех открытых позиций на счете.

**Вопрос:** Когда генерируется алерт по этому триггеру?  
**Ответ:** Алерт генерируется в момент открытия новой позиции, если совокупный объем позиций превышает установленный алертный уровень.

**Вопрос:** Как считается объем?  
**Ответ:** Объем считается как произведение лотов на размер контракта.

**Вопрос:** Что показывает открытый объем?  
**Ответ:** Открытый объем показывает количество активных контрактов.

**Вопрос:** Что показывает закрытый объем?  
**Ответ:** Закрытый объем показывает количество завершенных сделок.

---

## Untitled

**Вопрос:** За какой период отображается информация в Session Summary?  
**Ответ:** В Session Summary отображаются только данные за текущую
сессию.

**Вопрос:** Как рассчитываются показатели в Session Summary?  
**Ответ:** Состояние счётов фиксируется в момент ролловера. Все значения
рассчитываются от этого зафиксированного состояния и обновляются в
течение всей сессии.

**Вопрос:** Какая формула используется для расчёта итогового значения
PnL по стороне дилера?  
**Ответ:** Summary PnL (dealer side) = A-book session PnL – B-book
session PnL.

---

## Untitled

##Как рассчитывается Session PnL?
Session PnL = Current Unrealized PnL - Previous Unrealized PnL
(rollover’s floating)+ Session Realized PnL

---

## Untitled

**Вопрос:** Как рассчитываются поинты для порога Spread threshold в
триггере Spread Widening?  
**Ответ:** Поинты рассчитываются по следующей формуле:  
`SpreadInPoints = (AskPrice - BidPrice) × 10^Digits`

**Вопрос:** Что означает параметр Digits в формуле?  
**Ответ:** Digits — это количество знаков после запятой у символа. Оно
берётся из настроек символа.

**Вопрос:** Как интерпретировать результат?  
**Ответ:** Результат указывает значение спреда в пунктах, которое
сравнивается с пороговым значением в триггере Spread threshold.

---

## Untitled

**Вопрос:** Как Пилот рассчитывает объём в долларах США по сделке?  
**Ответ:** Пилот использует следующую формулу для расчёта объёма в
USD:  
`volume_in_lots × price × contract_size × курс котируемой валюты к USD`

**Вопрос:** Что означает `contract_size` в этой формуле?  
**Ответ:** Это полный размер контракта, указанный в настройках символа.
Пилот использует именно это значение при всех вычислениях.

**Вопрос:** Почему важно учитывать курс котируемой валюты к USD?  
**Ответ:** Потому что цена сделки может быть в другой валюте. Для
корректного расчёта значения в долларах Пилот учитывает валютный курс к
USD.

---

## Untitled

**Вопрос:** Зачем используется триггер Symbol Unusual PnL?  
**Ответ:** Он помогает выявлять подозрительную торговую активность,
опираясь не только на поведение трейдера, но и на внешние показатели —
например, резкое превышение средней прибыли (PnL) по инструменту. Это
позволяет дилеру вовремя отреагировать и провести анализ.

**Вопрос:** Как рассчитывается средний PnL?  
**Ответ:** Среднее значение PnL считается по инструменту за последние
**60 календарных дней**, включая выходные.

**Вопрос:** Что происходит при превышении среднего значения?  
**Ответ:** Если у трейдера по конкретному инструменту PnL превышает
заданный порог, то в интерфейсе дилера появляется уведомление. В нём
отображаются **10 наиболее успешных счетов** по этому инструменту за
текущую торговую сессию.

**Вопрос:** Можно ли задать минимальный порог для учета PnL?  
**Ответ:** Да, в настройках можно указать минимальное значение PnL
счета, при котором он будет участвовать в формировании уведомления. Это
помогает снизить количество ложных или нерелевантных срабатываний.

---

## Untitled

**Вопрос:** Почему в списке виннеров/лузеров отображается инструмент, по
которому сегодня не было торгов?  
**Ответ:** Это может быть связано с переносом свопов на новую сессию.
Если прибыль по инструменту соответствует размеру свопов, то именно они
и учитываются в расчёте.

---

## Untitled

**Вопрос:** На чём основан алгоритм подсчёта Doubled Accounts и Achieved
Profit?  
**Ответ:** Алгоритм основывается на анализе экстремумов графика вводов и
выводов, а также на моментах потери капитала с последующим
возобновлением торговли после пополнения счёта.

---

## Untitled

## В виджете Net Exposure можно посмотреть позиции хедж-счетов?
Виджет Net Exposure не отображает позиции хедж-счетов. Для мониторинга таких позиций следует использовать специализированные инструменты.

## Где можно отслеживать позиции хедж-счетов?
Брокер может использовать:
1. Альтернативный дашборд (пример на скриншоте)
2. Специальный отчет по соотношению объемов B-Book к чистым объемам хедж-счетов:  
platform.example.com/hedge-accounts/hedge-coverage-pnl

## Почему информация при клике на символы может отличаться от данных в дашборде?
В некоторых случаях при клике на символы может отображаться информация, расходящаяся с данными дашборда. Это известная особенность текущей реализации.

## Что делать при расхождении данных?
Рекомендуется:
1. Проверить данные в новом интерфейсе (UI)
2. Сравнить показатели из разных источников
3. В случае значительных расхождений - обратиться в техническую поддержку

---

## Untitled

**Вопрос:** Как строится график максимальной просадки на счете?  
**Ответ:**  
График строится по точкам, где каждая точка — это значение просадки за конкретные сутки. Значение рассчитывается внутри суток сравнением с предыдущим значением.

**Вопрос:** Как считается просадка для графика?  
**Ответ:**
*   Если прибыль больше или равна нулю (нет убытка) или баланс больше или равен нулю (счет пуст/отрицательный), просадка считается нулевой.
*   Если есть убыток и баланс положительный, просадка вычисляется по формуле: отношение UnrealizedProfit к (Balance + Credit) в процентах.
*   Результат округляется до четырёх знаков после запятой.

---

## Untitled

## Почему в API появляются странные значения в SwapYearDays и SwapFlags?
В API могут отображаться необычные значения (например, 4294967295) в параметрах SwapYearDays и SwapFlags. Это происходит из-за особенностей преобразования данных в коннекторе.

## Какая причина появления значения 4294967295?
Причина в том, что:
1. От поставщика данных приходит значение "-1"
2. В нашем коннекторе используется беззнаковый целочисленный тип (unsigned integer)
3. При преобразовании "-1" в беззнаковый тип получается максимально возможное значение для 32-битного числа - 4,294,967,295 (0xFFFFFFFF)

## Какие параметры могут содержать такие значения?
Аномальные значения могут появляться в:
- SwapYearDays (дни начисления свопов)
- SwapFlags (флаги свопов)
- Других аналогичных параметрах групп символов

## Как интерпретировать значение 4294967295?
Фактически это означает, что получено отрицательное значение (-1), которое система не смогла корректно обработать из-за ограничений типа данных.

---

## Untitled

## Как рассчитывается Net Deposit?
Net Deposit - это сумма всех балансовых операций по счёту за текущую сессию, которые распознаются в BP как BALANCE.

## Почему значение Net Deposit отличается от Deposit в МТ?
Отличие возникает потому, что:
1. В Net Deposit учитывается сальдо только по операциям, распознанным как BALANCE
2. Операции с комментариями типа 'History compression', 'Se-', 'Correction' распознаются как CORRECTION и не включаются в расчёт

## Как брокер может получить значение, совпадающее с МТ?
Брокеру необходимо учитывать ВСЕ балансовые операции, включая операции с комментариями 'History compression', 'Se-', 'Correction'.

## Как получить значение, совпадающее с Пилотом?
Нужно исключить из расчёта операции с комментариями 'History compression', 'Se-', 'Correction'.

---

## Untitled

**Вопрос:**  
Что происходит при выборе режима `Percentage` в триггере **Dynamic
Leverage** — увеличивается плечо или уменьшается?

**Ответ:**  
Если в настройках выбран вариант `Percentage`, то новое значение плеча
рассчитывается **на основе текущего плеча** по формуле:

`Новое плечо = Текущее плечо × (Процент / 100)`

###  

![](https://docs.example.com/assets/images/dynamic-leverage-settings-1cb9d33685bb66e3098d47e6e910ceae.webp)

###  🔹 Примеры:

Если указано **200%**, то плечо **увеличится в 2 раза**  
(например, с 1:100 → 1:200)

Если указано **50%**, то плечо **уменьшится в 2 раза**  
(например, с 1:100 → 1:50)

Таким образом, процент может быть как **больше**, так и **меньше 100**,
в зависимости от желаемого результата.

------------------------------------------------------------------------

**Теги:** Dynamic Leverage, Процентное плечо, Автоматическая смена
плеча, Risk Management, Триггеры

---

## Untitled

## Как рассчитывается Average Spread в Trading Platform?

Средний спред (Average Spread) рассчитывается динамически при получении каждой котировки с использованием формулы:  
`spread = (marketPrice - price) * digits.SymbolPoints() * (buyOrder ? 1 : -1)`  

Расчет начинается заново после каждого перезапуска ноды и не привязан к фиксированному временному периоду. Настройки символа (digits, SymbolPoints) напрямую влияют на результат расчета. Нулевые значения появляются при недостатке данных или сразу после перезагрузки системы.

---

## Untitled

Session profit is calculated using the following formula:  
`UnrealizedProfitInUsd + RealizedProfitInUsd - StartSessionProfitInUsd`

 
`UnrealizedProfitInUsd` - это текущий профит  
`StartSessionProfitInUsd` - это UnrealizedProfitInUsd, которая фиксируется
в момент ролловера.

---

## Untitled

**Вопрос:**

У меня вопрос по среднему спреду. Мы вытягиваем средние спреды по
инструментам для определенных разделов сайтов.

Но в этот понедельник (02.12) у нас средние спреды были сильно завышены.
Скажите пж за какой период высчитывается средний спред? у меня есть
предположение, что спред был завышен, так как период среднего спреда был
неправильный

 

**Ответ:**

 

Мы считаем средний спред в реалтайм, по новым приходящим котировкам. Это
значит, что на перезапуске сервиса он сбрасывается и начинает статистика
считаться заново (Перезапуск происходит в выходные и на запуске с
первыми котировками начинается новый расчет). Это позволяет нам не
использовать БД. При этом средний спред обсчитывается с момента запуска
и до 5 дней (момента обновления сервиса). Средний спред на старте
восстанавливается буквально в течение 15 минут максимум, если вы в
понедельник видели завышенные спреды, я бы рекомендовал проверить потоки
котировок за этот период, возможно спреды действительно были большие

---

## Untitled

Все расчеты и конвертации валют производятся по курсам, которые действовали на момент выполнения операции ролловера.

Теги: Конвертация валют, Курс валют, Ролловер, Расчеты, Операции

---

## Untitled

**Вопрос:** Почему при создании операции планирования дивидендов комментарии остаются пустыми?
**Ответ:** Это может происходить, если в настройках отключено отображение поля для ввода комментариев. Чтобы комментарии можно было указывать, необходимо включить отображение соответствующего поля в интерфейсе.
**Дополнительная информация:**  
Такая ситуация могла возникнуть после отката июньского обновления — в некоторых случаях поле отключалось автоматически.
**Изменения в новом интерфейсе:**  
Теперь нельзя вручную вводить отрицательное значение в поле short dividends. Значение указывается без минуса, и система автоматически интерпретирует его как отрицательное при расчётах.

---

## Untitled

**Вопрос:** Что видит Брокерпилот в центовых группах счетов по валюте?  
**Ответ:** В центовых группах счетов Брокерпилот видит, что валюта счета — USC.

**Вопрос:** Как рассчитывается корректный курс валюты для центовых счетов?  
**Ответ:**
*   Если котировка, например, USDUSD 1:100, то расчёты в долларах считаются верно.
*   Если невозможно выставить такой курс (отношение 1:100) между центом и долларом, приходится искусственно занижать значения в долларах.
*   Если курс равен 1:1, требуется модификация со стороны Брокерпилота.
    
**Вопрос:** В какой валюте Брокерпилот считает значения по счетам и по серверу?  
**Ответ:**
*   Аккаунты всегда считаются в валюте счета (USC для центовых).
*   Показатели по серверу (профиты и прочее) приводятся к USD по курсу.

---

## Untitled

**Вопрос:** Существует ли минимальный порог для взимания Admin Fee в системе?  
**Ответ:** Минимального порога для Admin Fee в системе нет, однако дробные значения указывать нельзя.

**Вопрос:** Какая стратегия округления используется при расчёте Admin Fee?  
**Ответ:** Используется стратегия округления `MidpointRounding.AwayFromZero`, которая означает округление до ближайшего целого числа. Если значение находится ровно посередине между двумя числами, оно округляется в сторону, наиболее удалённую от нуля.

**Вопрос:** Какие особенности возникают из-за такого округления?  
**Ответ:** Из-за такого округления на счетах с остатками в долях цента баланс может отображаться как 0.

**Вопрос:** Как происходит взимание Admin Fee?  
**Ответ:** Admin Fee взимается постепенно, процесс может занять 30-40 минут, что является стандартной практикой.

---

## Untitled

## Почему группы аккаунтов могут не отображаться в Пилоте?
Группы аккаунтов могут не отображаться, если отсутствуют соответствующие разрешения (пермишны).

## Как работает срок действия бонуса?
Бонус должен отменяться через указанное количество дней (по умолчанию 365) после начисления, если он не переведён на депозит. Система запоминает настройки экспирации на момент создания бонуса.

## Сколько правил бонусов можно создать для одной группы?
Для одной группы аккаунтов может быть только одно активное правило бонусов. Можно исключить аккаунты из первого правила после начисления бонусов и вручную добавить их во второе правило.

## Можно ли начислять бонус несколько раз для одной группы аккаунтов?
Нет, такой возможности нет. Можно только исключить аккаунты из первого правила и добавить их во второе правило вручную.

## Как рассчитывается бонус при изменении плеча?
Пример расчёта:
1. Исходное плечо XAUUSD: 500 * 1.2 (margin_divider) = 600
2. Требуемое плечо: 400
3. Понижающий коэффициент: 400/600 = 0.666666
4. При открытии позиции с margin_rate 2511.54 система применяет коэффициент 3767.31
5. Итоговое увеличение маржи: с 603.06 до 904.15

## Какие условия для начисления Welcome бонуса?
Welcome бонус начисляется только новым счетам без торговых операций после первого пополнения.

## Как предотвратить начисление новых бонусов?
Установите параметры:
- Bonus Deposit % = 0
- Bonus Value = 0 
- Maximum USD = 0
При этом существующие бонусы будут списываться при выводе средств и автоматически удаляться через 30 дней.

## Как создать новое правило бонусов?
Нажмите кнопку "Create setting", затем отредактируйте появившееся новое правило внизу списка.

## Можно ли удалить бонус без влияния на будущие списания?
Нет, невозможно удалить бонус с аккаунта клиента без влияния на будущие операции списания средств.

---

## Untitled

### Вопрос  
Что такое TotalRealizedProfit (Realized Profit) и как он рассчитывается?  

### Ответ  
TotalRealizedProfit (Realized Profit) — это общая сумма всего закрытого PnL за всю торговую историю аккаунта, включая все изменения, применённые к аккаунту за активный период.  

На английском:  
*TotalRealizedProfit (Realized Profit) is the cumulative sum of all closed profits and losses throughout the account's entire trading history, including all adjustments made to the account over its active period.*

---

## Untitled

**Вопрос:** Почему Daily PNL на стороне брокера отличается от Daily PNL на стороне клиента?  
**Ответ:**  
PnL на стороне брокера включает агентские комиссии и другие потенциальные затраты. Кроме того, существует разделение между A-Book и B-Book.

**Вопрос:** Как считается PnL брокера?  
**Ответ:**  
PnL брокера считается как разница:  
**PnL = ABook PnL - BBook PnL**

**Вопрос:** Как считается PnL клиента?  
**Ответ:**  
Для клиентов PnL считается как сумма:  
**PnL = ABook PnL + BBook PnL**  
Различия между брокером и клиентом нет.

**Вопрос:** Почему на примере профит брокера минимален?  
**Ответ:**  
На примере, показанном на скриншоте, профит брокера формируется только комиссиями и маркапами, что является дополнительными затратами на спред и услуги. Основная прибыль идёт клиенту, поэтому профит брокера минимален.

**Вопрос:** Что происходит, когда счет клиента находится на A-Book и он заработал $1000?  
**Ответ:**  
Эти $1000 остаются у клиента, брокер их напрямую не получает. Профит брокера формируется только из комиссий и маркапов (наценок на спред или услуги). Поэтому прибыль брокера будет минимальной или близкой к нулю.

**Вопрос:** В чём ключевое отличие между PnL клиента и брокера?  
**Ответ:**  
Для клиента PnL — это чистая прибыль, а для брокера — косвенные доходы через комиссии и маркапы.

---

## Untitled

**Вопрос:** Почему PnL в дэшборде и в разделе Winners Losers могут отличаться?  
**Ответ:**  
В Trading Platform хранится информация только за текущий месяц (с 1 числа). В разделе Winners Losers отображается информация только для топ-100 счетов и их сумма, что может не совпадать с полным PnL в дэшборде.

**Вопрос:** Что делать, если в отчётности по символу не отображаются данные по некоторым позициям?  
**Ответ:**  
Если при клике по отчёту отсутствует информация, например по профитным символам, поможет перезагрузка страницы.

**Вопрос:** Можно ли отобразить A-Book клиентов по сессиям в Winners Losers?  
**Ответ:**  
На данный момент такой возможности нет, однако можно просмотреть информацию по каждому символу отдельно.### Как формируется график максимальной просадки на счете?

---

## Untitled

**Вопрос:** Что означает значение Average Daily PnL в триггере Symbol
Unusual PnL?  
**Ответ:** Это среднее значение дневного PnL за последние 60 календарных
дней по конкретному инструменту.

**Вопрос:** Как рассчитывается значение Average Daily PnL?  
**Ответ:** Используется следующая формула:  
`Session PnL = Current Unrealized PnL – Previous Unrealized PnL (с учётом
rollover’s floating) + Session Realized PnL`

---

## Untitled

**Вопрос:** Почему Session PnL не равен Floating PnL?  
**Ответ:** Session PnL рассчитывается по ценам на конец дня (EOD), в отличие от Floating PnL.

**Вопрос:** Какие операции входят в коррекцию Session PnL?  
**Ответ:** В коррекции учитываются операции типов “CorrectionBalanceTypes”:
*   “BONUS”
*   “SO_COMPENSATION”
*   “COMMISSION”
    
**Вопрос:** Как определяются типы операций для коррекции?  
**Ответ:** Типы операций определяются по комментариям в балансовых операциях:
*   “CustomSoCompensationFilter”: [“Balance fixed”] — считается SO_COMPENSATION
*   “CustomBonusFilter”: [“Bonus transferred”] — считается BONUS
*   “CustomCommissionFilter”: [“Inactive account fee”] — считается COMMISSION


Важно: Для уточнения нужно обращаться к DevOps по каждому конкретному брокеру

---

## Untitled

## Как интерпретировать данные в алерте Sharp Deals?
Информация в алерте отображается согласно настройкам триггера. Например, алерт может показывать обнаружение 3 Sharp deals за последние 24 часа.

## Что означает значение Total PNL в алерте?
Total PNL отражает совокупную прибыль/убыток по ВСЕМ сделкам по ВСЕМ торговым инструментам, а не только за последние 24 часа (в отличие от условия обнаружения Sharp deals).

## Где ещё можно увидеть этот PnL?
Тот же показатель PnL доступен для просмотра в разделе Trades History (подробнее см. SD-A-81461413: Описание полей в карточке счета).

## Как понять, какие именно сделки попали в алерт?
Количество Sharp deals в алерте показывает число подозрительных сделок, обнаруженных за установленный период (например, 24 часа). Для деталей по конкретным сделкам нужно обратиться к истории торгов.

---

## Untitled

## Что такое Margin Level (Уровень маржи)?
Margin Level - это ключевой показатель в торговле на финансовых рынках, особенно на Форекс, который отражает соотношение доступных средств к сумме залога, необходимого для поддержания открытых позиций.

## Как рассчитывается Margin Level?
Формула расчёта:

Margin Level = (Equity / Margin) × 100%

## Что означают компоненты формулы?
- **Equity** - текущий баланс счёта с учётом плавающей прибыли/убытка
- **Margin** - сумма залога, необходимая для поддержания открытых позиций

## Пример расчёта Margin Level:
При:
- Equity = $1,000
- Margin = $1,000
Расчёт:
Margin Level = (1,000 / 1,000) × 100% = 100%

---

