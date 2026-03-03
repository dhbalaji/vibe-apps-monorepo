# Multi-Store Price Comparison App - Specification

## Overview
An Electron desktop application that enables simultaneous price comparison across Amazon, Blinkit, and Zepto by displaying all three shopping platforms side-by-side in a single window.

## Core Requirements

### 1. Search Functionality
- **Single Search Input**: One search box at the top of the application
- **Simultaneous Search**: Searching triggers the same query across all three platforms at once
- **Search Behavior**:
  - Amazon: Direct URL-based search
  - Blinkit: Load homepage, inject search query into search input, trigger search programmatically
  - Zepto: Direct URL-based search

### 2. Layout & Display
- **Three-Column Layout**: Equal width columns displaying Amazon, Blinkit, and Zepto
- **Side-by-Side View**: All three stores visible simultaneously for at-a-glance comparison
- **No Horizontal Scroll**: Viewport constrained to window width
- **Responsive Webviews**: Each store embedded using Electron webview with full interactivity

### 3. Initial Load Behavior
- **Auto-Load on Startup**: All three store homepages load immediately when app opens
- **Location Pre-Configuration**: Automatically set location to Hosur, Tamil Nadu
  - Amazon: Set delivery location via localStorage
  - Blinkit: Set lat/lon coordinates (12.7409, 77.8253)
  - Zepto: Set user location with city and coordinates
- **Suppress Prompts**: Automatically suppress location and "continue to web" prompts

### 4. QR Code Generation
- **Per-Store QR Codes**: Each store panel has its own QR code in bottom-right corner
- **Dynamic Updates**: QR codes update automatically when navigating within each store
- **Current State Capture**: QR code reflects the exact current URL of each webview
- **Size States**:
  - Minimized: 60x60px with small label
  - Expanded: 300x300px centered with overlay
- **Interaction**:
  - Click QR code to expand
  - Click overlay to minimize
  - Hide other QR codes when one is expanded
- **Labels**: "Open Amazon app", "Open Blinkit app", "Open Zepto app"

### 5. External Browser Integration
- **Open in Browser Button**: Each store has a button to open current page in external browser
- **Current State Preservation**: Opens the exact URL currently displayed in the webview
- **Fallback**: Opens store homepage if webview hasn't loaded yet

### 6. Session Persistence
- **Persistent Sessions**: Each store uses persistent Electron partitions
  - `persist:amazon`
  - `persist:blinkit`
  - `persist:zepto`
- **Location Memory**: Location preferences persist across app restarts

### 7. User Agent Configuration
- **Desktop User Agent**: Set to avoid mobile redirects
- **Consistent Experience**: Same user agent across all three stores

## Technical Architecture

### Technology Stack
- **Framework**: Electron 28.0.0
- **QR Generation**: qrcode library (1.5.3)
- **Webview**: Electron webview with sandbox and partition support

### File Structure
```
packages/multi-store-search/
├── main.js           # Electron main process
├── search.html       # UI and renderer logic
├── package.json      # Dependencies and scripts
└── README.md         # Usage documentation
```

### Key Components

#### Main Process (main.js)
- Window creation with maximized state
- Webview tag enablement
- IPC communication setup

#### Renderer Process (search.html)
- Search input and button
- Three webview panels with headers
- QR code generation and display
- Event handling for navigation and interaction

### Store URLs
- **Amazon**: `https://www.amazon.in/s?k={query}`
- **Blinkit**: `https://blinkit.com/search?q={query}&collection=search` (with programmatic injection)
- **Zepto**: `https://www.zepto.com/search?query={query}`

## User Workflows

### Primary Workflow: Price Comparison
1. User opens app → All three stores load with Hosur location set
2. User enters product name in search box
3. User clicks "Search All" or presses Enter
4. All three stores display search results simultaneously
5. User browses products, compares prices and availability
6. User scans QR code to open specific product on mobile
7. OR user clicks "Open in Browser" to view in full browser

### Secondary Workflow: Direct Navigation
1. User opens app
2. User navigates directly within any store webview
3. QR code updates automatically to reflect current page
4. User can open current page on mobile or in browser

## Design Decisions

### Why Electron?
- Bypasses iframe X-Frame-Options restrictions
- Provides full browser context for each store
- Enables webview manipulation and script injection
- Supports persistent sessions

### Why Programmatic Search for Blinkit?
- Blinkit's URL-based search doesn't reliably trigger results
- DOM manipulation ensures search executes properly
- Simulates actual user interaction

### Why Individual QR Codes?
- Each store may be at different product/page
- User needs flexibility to open specific store on mobile
- Independent navigation states require independent QR codes

### Why Hosur, TN?
- User's specified location for delivery/availability
- Pre-configured to avoid repeated location prompts

## Future Enhancements (Out of Scope)
- Price extraction and comparison table
- Product matching across stores
- Price alerts and notifications
- Search history
- Favorites/bookmarks
- Additional store integrations
- Mobile app version

## Success Criteria
- ✅ All three stores load and display simultaneously
- ✅ Single search updates all three stores
- ✅ Location automatically set to Hosur, TN
- ✅ QR codes generate and update dynamically
- ✅ No horizontal scrolling in viewport
- ✅ External browser opens exact current page
- ✅ Sessions persist across app restarts
