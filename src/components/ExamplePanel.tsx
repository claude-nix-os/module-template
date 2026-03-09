import React, { useState, useEffect } from 'react';

interface ExamplePanelProps {
  moduleId?: string;
}

/**
 * ExamplePanel - A simple panel component demonstrating ClaudeOS module UI patterns.
 *
 * To register this panel, add it to your module definition:
 *
 *   panels: [{
 *     id: 'example-panel',
 *     title: 'Example',
 *     icon: 'Layers',
 *     component: 'components/ExamplePanel',
 *     singleton: true,
 *     defaultTab: false,
 *   }]
 */
export default function ExamplePanel({ moduleId }: ExamplePanelProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready'>('idle');
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    setStatus('loading');
    // Simulate loading data - replace with actual API calls
    const timer = setTimeout(() => {
      setItems(['Item 1', 'Item 2', 'Item 3']);
      setStatus('ready');
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleAddItem = () => {
    const newItem = `Item ${items.length + 1}`;
    setItems((prev) => [...prev, newItem]);
  };

  const handleRemoveItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: '16px', fontFamily: 'var(--font-sans, sans-serif)' }}>
      <h2 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: 600 }}>
        Example Panel
      </h2>

      <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#888' }}>
        Module: {moduleId ?? 'unknown'}
      </p>

      {status === 'loading' && (
        <p style={{ fontSize: '13px', color: '#aaa' }}>Loading...</p>
      )}

      {status === 'ready' && (
        <>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 12px 0' }}>
            {items.map((item, index) => (
              <li
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 8px',
                  borderRadius: '4px',
                  fontSize: '13px',
                  marginBottom: '4px',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                }}
              >
                <span>{item}</span>
                <button
                  onClick={() => handleRemoveItem(index)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#f44',
                    cursor: 'pointer',
                    fontSize: '12px',
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={handleAddItem}
            style={{
              padding: '6px 12px',
              fontSize: '13px',
              borderRadius: '4px',
              border: '1px solid rgba(255,255,255,0.15)',
              backgroundColor: 'rgba(255,255,255,0.08)',
              color: 'inherit',
              cursor: 'pointer',
            }}
          >
            Add Item
          </button>
        </>
      )}
    </div>
  );
}
