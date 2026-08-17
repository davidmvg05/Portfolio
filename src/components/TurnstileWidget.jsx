import React, { useEffect, useRef } from 'react';

/**
 * Cloudflare Turnstile Widget Component
 * Explicit rendering with cleanup, dark theme, and strict tabindex (5).
 */
export default function TurnstileWidget({ 
  siteKey = import.meta.env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY || import.meta.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA',
  theme = 'dark',
  tabIndex = 5,
  onVerify,
  onError,
  onExpire
}) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const tryRender = () => {
      if (!isMounted || !containerRef.current) return;
      if (typeof window !== 'undefined' && window.turnstile) {
        // If a widget was previously rendered in this container, remove it first
        if (widgetIdRef.current !== null) {
          try {
            window.turnstile.remove(widgetIdRef.current);
          } catch (e) {
            // ignore removal errors
          }
          widgetIdRef.current = null;
        }

        try {
          widgetIdRef.current = window.turnstile.render(containerRef.current, {
            sitekey: siteKey,
            theme: theme,
            tabindex: tabIndex,
            callback: (token) => {
              if (onVerify) onVerify(token);
            },
            'error-callback': () => {
              if (onError) onError();
            },
            'expired-callback': () => {
              if (onExpire) onExpire();
            }
          });
        } catch (err) {
          console.warn('Turnstile render failed or already initialized:', err);
        }
      }
    };

    // If turnstile script is already ready
    if (typeof window !== 'undefined' && window.turnstile) {
      tryRender();
    } else {
      // Poll until the Turnstile API script is available
      const interval = setInterval(() => {
        if (typeof window !== 'undefined' && window.turnstile) {
          clearInterval(interval);
          tryRender();
        }
      }, 100);

      const timeout = setTimeout(() => {
        clearInterval(interval);
      }, 10000);

      return () => {
        isMounted = false;
        clearInterval(interval);
        clearTimeout(timeout);
        if (widgetIdRef.current !== null && window.turnstile) {
          try {
            window.turnstile.remove(widgetIdRef.current);
          } catch (e) {}
          widgetIdRef.current = null;
        }
      };
    }

    return () => {
      isMounted = false;
      if (widgetIdRef.current !== null && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch (e) {}
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, theme, tabIndex]);

  return (
    <div 
      className="turnstile-container" 
      style={{ 
        margin: '20px 0', 
        display: 'flex', 
        justifyContent: 'center', 
        width: '100%',
        minHeight: '65px' 
      }}
    >
      <div 
        ref={containerRef} 
        className="cf-turnstile" 
        data-sitekey={siteKey}
        data-theme={theme}
        data-tabindex={tabIndex}
      />
    </div>
  );
}
