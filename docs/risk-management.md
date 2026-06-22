# Risk Management

> Comprehensive guide covering all Risk Management features and functionality in Trading Platform platform.

---

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

