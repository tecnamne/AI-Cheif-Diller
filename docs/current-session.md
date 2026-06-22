# Current Session

> Comprehensive guide covering all Current Session features and functionality in Trading Platform platform.

---

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

