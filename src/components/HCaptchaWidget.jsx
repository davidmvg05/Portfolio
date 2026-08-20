import React, { useEffect, useRef } from 'react';

/**
 * hCaptcha Widget Component
 * Explicit rendering with cleanup, dark theme, and strict tabindex (5).
 */
export default function HCaptchaWidget({ 
  siteKey = import.meta.env.VITE_HCAPTCHA_SITE_KEY || '80fe1ece-b124-453a-9800-524c2278b362',
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
      if (typeof window !== 'undefined' && window.hcaptcha) {
        // If a widget was previously rendered in this container, reset it first
        if (widgetIdRef.current !== null) {
          try {
            window.hcaptcha.reset(widgetIdRef.current);
          } catch (e) {
            // ignore errors
          }
          widgetIdRef.current = null;
        }

        try {
          widgetIdRef.current = window.hcaptcha.render(containerRef.current, {
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
          console.warn('hCaptcha render failed or already initialized:', err);
        }
      }
    };

    // If hcaptcha script is already ready
    if (typeof window !== 'undefined' && window.hcaptcha) {
      tryRender();
    } else {
      // Poll until the hCaptcha API script is available
      const interval = setInterval(() => {
        if (typeof window !== 'undefined' && window.hcaptcha) {
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
        if (widgetIdRef.current !== null && window.hcaptcha) {
          try {
            window.hcaptcha.reset(widgetIdRef.current);
          } catch (e) {}
          widgetIdRef.current = null;
        }
      };
    }

    return () => {
      isMounted = false;
      if (widgetIdRef.current !== null && window.hcaptcha) {
        try {
          window.hcaptcha.reset(widgetIdRef.current);
        } catch (e) {}
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, theme, tabIndex]);

  return (
    <div 
      className="hcaptcha-container" 
      style={{ 
        margin: '20px 0', 
        display: 'flex', 
        justifyContent: 'center', 
        width: '100%',
        minHeight: '80px'
      }}
    >
      <div 
        ref={containerRef} 
        className="h-captcha" 
        data-sitekey={siteKey}
        data-theme={theme}
        data-tabindex={tabIndex}
      />
    </div>
  );
}
