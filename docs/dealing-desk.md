# Dealing Desk

> Comprehensive guide covering all Dealing Desk features and functionality in Trading Platform platform.

---

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

