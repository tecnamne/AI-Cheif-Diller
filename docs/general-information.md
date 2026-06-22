# General Information

> Comprehensive guide covering all General Information features and functionality in Trading Platform platform.

---

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

