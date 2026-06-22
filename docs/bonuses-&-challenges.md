# Bonuses & Challenges

> Comprehensive guide covering all Bonuses & Challenges features and functionality in Trading Platform platform.

---

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

