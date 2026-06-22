# Dealing Operations

> Comprehensive guide covering all Dealing Operations features and functionality in Trading Platform platform.

---

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

