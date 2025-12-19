# Bay Area Market Pulse - Owner's Manual

Welcome to your new website! This guide will walk you through the steps to get your site online and keep it running automatically.

## 1. Deployment (Getting Online)

We recommend using **Netlify** for hosting. It is free, fast, and very easy to use.

### Step-by-Step Guide:

1.  **Download Your Project:**
    *   Download the entire `bayarea_market_pulse` folder from this workspace to your local computer.

2.  **Create a GitHub Account (Recommended):**
    *   Go to [github.com](https://github.com) and create a free account.
    *   Create a new repository named `bayarea-market-pulse`.
    *   Upload your project files to this repository.

3.  **Connect to Netlify:**
    *   Go to [netlify.com](https://netlify.com) and sign up (you can use your GitHub login).
    *   Click **"Add new site"** > **"Import from an existing project"**.
    *   Select **GitHub** and choose your `bayarea-market-pulse` repository.
    *   **Build Settings:** Netlify should detect these automatically, but just in case:
        *   **Build Command:** `npm run build`
        *   **Publish Directory:** `dist`
    *   Click **"Deploy Site"**.

4.  **Connect Your Domain:**
    *   Once deployed, go to **"Domain Settings"** in Netlify.
    *   Click **"Add custom domain"** and enter `bayareamarketpulse.com`.
    *   Follow the instructions to update your DNS settings (usually adding an A record or CNAME) at your domain registrar (GoDaddy, Namecheap, etc.).

## 2. Automation (Daily News Updates)

To make the "Daily 10" update automatically every morning, we will use **GitHub Actions**.

### Step-by-Step Guide:

1.  **Create the Workflow File:**
    *   In your project folder, create a file at this path: `.github/workflows/daily_news.yml`.
    *   Paste the content below into that file:

```yaml
name: Daily News Update

on:
  schedule:
    # Runs at 6:00 AM PST (14:00 UTC) every day
    - cron: '0 14 * * *'
  workflow_dispatch: # Allows manual trigger

jobs:
  update-news:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.9'

      - name: Install dependencies
        run: |
          pip install requests

      - name: Run news script
        run: python gather_news.py

      - name: Commit and push changes
        run: |
          git config --global user.name 'News Bot'
          git config --global user.email 'bot@bayareamarketpulse.com'
          git add client/public/data/news.json
          git commit -m "Daily news update" || exit 0
          git push
```

2.  **Push to GitHub:**
    *   Save the file and push it to your GitHub repository.

3.  **That's it!**
    *   GitHub will now wake up every morning at 6:00 AM PST, run your `gather_news.py` script, fetch the latest news for Santa Clara/San Mateo/Alameda, and update your website automatically. Netlify will detect the change and re-publish the site instantly.

## 3. Adding Leadngage Chatbot

When you receive the code snippet from Leadngage:

1.  Open the file `client/index.html`.
2.  Paste the script code just before the closing `</body>` tag.
3.  Save and deploy.

---

**Need Help?**
If you get stuck on any of these steps, simply ask your technical contact or refer to the Netlify/GitHub documentation.
