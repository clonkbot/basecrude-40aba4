import { useEffect, useRef, useState } from 'react';

// TradingView Widget Component
function TradingViewWidget({ symbol, name }: { symbol: string; name: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous content
    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol: symbol,
      colorTheme: 'dark',
      isTransparent: true,
      locale: 'en',
      width: '100%'
    });

    containerRef.current.appendChild(script);
  }, [symbol]);

  return (
    <div className="relative">
      <div className="absolute -inset-px bg-gradient-to-r from-base-blue/30 to-cyan-400/30 rounded-xl blur-sm"></div>
      <div className="relative bg-petroleum-900/80 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-base-blue/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-3 h-3 rounded-full bg-base-blue animate-pulse"></div>
          <h3 className="text-lg md:text-xl font-bold text-white font-display tracking-wider">{name}</h3>
          <span className="text-xs text-cyan-400 uppercase tracking-widest">LIVE</span>
        </div>
        <div ref={containerRef} className="tradingview-widget-container min-h-[80px]"></div>
      </div>
    </div>
  );
}

// X/Twitter Feed Component
function XFeed() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setRefreshKey((k) => k + 1);
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-full">
      <div className="absolute -inset-px bg-gradient-to-b from-base-blue/20 to-transparent rounded-xl blur-sm"></div>
      <div className="relative bg-petroleum-900/80 backdrop-blur-sm rounded-xl border border-base-blue/20 h-full flex flex-col">
        <div className="p-4 border-b border-base-blue/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span className="text-white font-semibold">$OIL Live Feed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-xs text-slate-400">Refresh in {countdown}s</span>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-hidden" key={refreshKey}>
          <a
            className="twitter-timeline"
            data-theme="dark"
            data-chrome="noheader nofooter noborders transparent"
            data-tweet-limit="5"
            href="https://twitter.com/search?q=%24OIL&f=live"
          >
            Loading $OIL tweets...
          </a>
          <script async src="https://platform.twitter.com/widgets.js"></script>
        </div>
      </div>
    </div>
  );
}

// Animated Oil Drop
function OilDrop({ delay = 0 }: { delay?: number }) {
  return (
    <div
      className="absolute w-1 bg-gradient-to-b from-base-blue to-cyan-400 rounded-full animate-oil-drop opacity-60"
      style={{
        animationDelay: `${delay}s`,
        left: `${Math.random() * 100}%`,
        height: `${20 + Math.random() * 30}px`
      }}
    ></div>
  );
}

// Pipeline decoration
function Pipeline() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
        <defs>
          <linearGradient id="pipeGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0052FF" stopOpacity="0" />
            <stop offset="50%" stopColor="#00D4FF" stopOpacity="1" />
            <stop offset="100%" stopColor="#0052FF" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Horizontal pipes */}
        <line x1="0" y1="100" x2="400" y2="100" stroke="#1a2332" strokeWidth="8" />
        <line x1="0" y1="100" x2="400" y2="100" stroke="url(#pipeGlow)" strokeWidth="2" className="animate-flow" />

        <line x1="800" y1="200" x2="1200" y2="200" stroke="#1a2332" strokeWidth="8" />
        <line x1="800" y1="200" x2="1200" y2="200" stroke="url(#pipeGlow)" strokeWidth="2" className="animate-flow-reverse" />

        <line x1="0" y1="700" x2="500" y2="700" stroke="#1a2332" strokeWidth="8" />
        <line x1="0" y1="700" x2="500" y2="700" stroke="url(#pipeGlow)" strokeWidth="2" className="animate-flow" />

        {/* Vertical pipes */}
        <line x1="100" y1="0" x2="100" y2="300" stroke="#1a2332" strokeWidth="6" />
        <line x1="1100" y1="500" x2="1100" y2="800" stroke="#1a2332" strokeWidth="6" />
      </svg>
    </div>
  );
}

function App() {
  useEffect(() => {
    // Load Twitter widget script
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-petroleum-950 text-white relative overflow-x-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 bg-gradient-radial from-base-blue/5 via-transparent to-transparent"></div>
      <Pipeline />

      {/* Animated oil drops */}
      <div className="fixed top-0 left-0 w-full h-20 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <OilDrop key={i} delay={i * 0.5} />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-base-blue/20 bg-petroleum-950/90 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            {/* Logo & Brand */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-base-blue to-cyan-400 flex items-center justify-center">
                  <span className="text-xl md:text-2xl">🛢️</span>
                </div>
                <div className="absolute -inset-1 bg-base-blue/30 rounded-full blur-md -z-10 animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-display font-black tracking-tight">
                  <span className="text-white">BASE</span>
                  <span className="text-base-blue">CRUDE</span>
                </h1>
              </div>
            </div>

            {/* Contract Address */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs md:text-sm">
              <div className="flex items-center gap-2 bg-petroleum-900/80 px-3 py-2 rounded-lg border border-base-blue/30">
                <span className="text-slate-400">BASE.MEME $OIL CA:</span>
                <code className="text-cyan-400 font-mono text-xs break-all">0x21FD44bE608F1D18689CDcC8861AE74571Ae8888</code>
              </div>
              <a
                href="https://base.meme/coin/base:0x21FD44bE608F1D18689CDcC8861AE74571Ae8888?referrer=0xFCE86e6A615B40A620b1a666ff4B866Cd273c476"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gradient-to-r from-base-blue to-cyan-500 hover:from-base-blue/90 hover:to-cyan-400 text-white font-bold px-4 md:px-6 py-2 md:py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-base-blue/30 min-h-[44px]"
              >
                <span className="text-lg">🛢️</span>
                <span>BUY $OIL</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-6 md:py-10">
        {/* Hero Section */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-black mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-base-blue via-cyan-400 to-base-blue animate-gradient">
              REAL-TIME COMMODITIES
            </span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            Track $OIL and $GOLD prices live. Powered by Base chain.
          </p>
        </div>

        {/* Price Widgets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
          {/* $OIL - Primary focus */}
          <div className="lg:col-span-2 relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-base-blue/20 via-cyan-400/20 to-base-blue/20 rounded-2xl blur-xl"></div>
            <div className="relative bg-petroleum-900/90 backdrop-blur-sm rounded-2xl p-4 md:p-8 border-2 border-base-blue/40">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-base-blue to-cyan-500 flex items-center justify-center text-3xl md:text-4xl shadow-lg shadow-base-blue/30">
                    🛢️
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-display font-black text-white">$OIL</h3>
                    <p className="text-sm text-cyan-400">PRIMARY ASSET</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-green-400 font-semibold uppercase tracking-wider text-sm">Live</span>
                </div>
              </div>
              <TradingViewWidget symbol="XTCOM:OILUSDT.P" name="OIL/USDT Perpetual" />
            </div>
          </div>

          {/* $GOLD */}
          <div className="lg:col-span-2">
            <TradingViewWidget symbol="PEPPERSTONE:XAUUSD" name="$GOLD (XAU/USD)" />
          </div>
        </div>

        {/* X Feed Section */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h3 className="text-xl md:text-2xl font-display font-bold text-white flex items-center gap-3">
              <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span>$OIL Live News</span>
            </h3>
            <a
              href="https://x.com/Basecrude"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-base-blue hover:text-cyan-400 transition-colors min-h-[44px]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span className="font-semibold">@Basecrude</span>
            </a>
          </div>

          <div className="relative bg-petroleum-900/80 backdrop-blur-sm rounded-xl border border-base-blue/20 overflow-hidden">
            <div className="p-4 border-b border-base-blue/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span className="text-white font-semibold">Live $OIL Feed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-xs text-slate-400">Auto-refresh</span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <a
                href="https://x.com/search?q=%24OIL&src=typed_query&f=live"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-petroleum-800 hover:bg-petroleum-700 border border-base-blue/30 hover:border-base-blue/50 rounded-xl p-6 transition-all duration-300 group"
              >
                <svg className="w-8 h-8 text-base-blue group-hover:text-cyan-400 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <div className="text-left">
                  <p className="text-white font-bold text-lg group-hover:text-cyan-400 transition-colors">View Live $OIL Feed on X</p>
                  <p className="text-slate-400 text-sm">Click to see real-time tweets about $OIL</p>
                </div>
                <svg className="w-5 h-5 text-slate-400 group-hover:text-base-blue group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://x.com/Basecrude"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-petroleum-900/80 hover:bg-petroleum-800 border border-base-blue/30 hover:border-base-blue/50 rounded-xl px-5 py-3 transition-all duration-300 group min-h-[44px]"
          >
            <svg className="w-6 h-6 text-white group-hover:text-base-blue transition-colors" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span className="font-semibold text-white group-hover:text-base-blue transition-colors">@Basecrude</span>
          </a>

          <a
            href="https://x.com/search?q=%24OIL&src=typed_query&f=live"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-base-blue/20 hover:bg-base-blue/30 border border-base-blue/50 rounded-xl px-5 py-3 transition-all duration-300 min-h-[44px]"
          >
            <span className="text-lg">🔍</span>
            <span className="font-semibold text-cyan-400">$OIL Live Search</span>
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-base-blue/10 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-xs">
            Requested by <a href="https://x.com/BASECRUDE" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 transition-colors">@BASECRUDE</a> · Built by <a href="https://x.com/clonkbot" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 transition-colors">@clonkbot</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
