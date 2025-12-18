import requests
import json
import xml.etree.ElementTree as ET
from datetime import datetime
import os

# Configuration
RSS_FEED_URL = "https://news.google.com/rss/search?q=Santa+Clara+San+Mateo+Alameda+County+Real+Estate+Market&hl=en-US&gl=US&ceid=US:en"
OUTPUT_FILE = "client/public/data/news.json"

def fetch_news():
    print(f"Fetching news from {RSS_FEED_URL}...")
    try:
        response = requests.get(RSS_FEED_URL)
        response.raise_for_status()
        return response.content
    except requests.RequestException as e:
        print(f"Error fetching news: {e}")
        return None

def parse_news(xml_content):
    print("Parsing news feed...")
    root = ET.fromstring(xml_content)
    items = []
    
    # Iterate through RSS items (limit to top 10)
    for i, item in enumerate(root.findall('./channel/item')[:10]):
        title = item.find('title').text
        link = item.find('link').text
        pub_date = item.find('pubDate').text
        source = item.find('source').text if item.find('source') is not None else "News Source"
        
        # Categorization logic for specific counties
        category = "Market News"
        title_lower = title.lower()
        
        if any(x in title_lower for x in ["santa clara", "san jose", "sunnyvale", "palo alto", "mountain view"]):
            category = "Santa Clara County"
        elif any(x in title_lower for x in ["san mateo", "redwood city", "menlo park", "burlingame"]):
            category = "San Mateo County"
        elif any(x in title_lower for x in ["alameda", "oakland", "berkeley", "fremont", "hayward", "pleasanton"]):
            category = "Alameda County"
        elif "silicon valley" in title_lower:
            category = "Silicon Valley"
        elif "east bay" in title_lower:
            category = "East Bay"
        elif "rate" in title_lower or "mortgage" in title_lower:
            category = "Finance"

        # Determine trend (simplified logic)
        trend = "neutral"
        title_lower = title.lower()
        if any(x in title_lower for x in ["up", "rise", "high", "gain", "boom", "recover"]):
            trend = "up"
        elif any(x in title_lower for x in ["down", "drop", "low", "fall", "decline", "crash"]):
            trend = "down"

        news_item = {
            "id": i + 1,
            "title": title,
            "summary": title, # In a real scenario, we'd scrape the article for a summary
            "source": source,
            "trend": trend,
            "category": category,
            "link": link,
            "timestamp": pub_date,
            # Placeholder image logic
            "image": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop"
        }
        items.append(news_item)
    
    return items

def save_news(items):
    print(f"Saving {len(items)} items to {OUTPUT_FILE}...")
    
    # Ensure directory exists
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    
    with open(OUTPUT_FILE, 'w') as f:
        json.dump(items, f, indent=2)
    print("News updated successfully!")

def main():
    xml_content = fetch_news()
    if xml_content:
        news_items = parse_news(xml_content)
        save_news(news_items)

if __name__ == "__main__":
    main()
