import { useEffect, useRef } from 'react';

interface PayPalHostedButtonProps {
  className?: string;
}

export function PayPalHostedButton({ className }: PayPalHostedButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const renderedRef = useRef(false);

  useEffect(() => {
    if (renderedRef.current || !containerRef.current) return;

    const renderButton = () => {
      if (
        typeof window !== 'undefined' &&
        (window as any).paypal?.HostedButtons &&
        containerRef.current &&
        !renderedRef.current
      ) {
        renderedRef.current = true;
        (window as any).paypal
          .HostedButtons({
            hostedButtonId: '4GTZXSK6DTAGC',
          })
          .render(containerRef.current);
      }
    };

    // Try immediately
    renderButton();

    // If SDK not loaded yet, poll briefly
    if (!renderedRef.current) {
      const interval = setInterval(() => {
        renderButton();
        if (renderedRef.current) clearInterval(interval);
      }, 500);
      const timeout = setTimeout(() => clearInterval(interval), 10000);
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, []);

  return (
    <div className={className}>
      <div ref={containerRef} id="paypal-container-4GTZXSK6DTAGC" className="min-h-[50px]" />
    </div>
  );
}
