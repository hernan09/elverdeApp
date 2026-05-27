import React from 'react';

const ChartTooltip = ({ active, payload, label, color = '#2d6a4f', labelName = 'Valor' }) => {
  if (!active || !payload || !payload.length) return null;

  const value = payload[0]?.value;
  const formattedValue = typeof value === 'number'
    ? '$ ' + value.toLocaleString('es-AR')
    : value;

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: '1px solid rgba(45, 106, 79, 0.12)',
      borderRadius: '12px',
      padding: '12px 16px',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06), 0 2px 6px rgba(0, 0, 0, 0.03)',
      minWidth: '140px',
    }}>
      <div style={{
        fontSize: '11px',
        fontWeight: 500,
        color: '#9ca3af',
        fontFamily: 'DM Sans, sans-serif',
        letterSpacing: '0.03em',
        textTransform: 'uppercase',
        marginBottom: '6px',
      }}>
        {label}
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: color,
          flexShrink: 0,
        }} />
        <span style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '16px',
          fontWeight: 600,
          color: '#1a1a1a',
          letterSpacing: '-0.01em',
        }}>
          {formattedValue}
        </span>
      </div>
      <div style={{
        fontSize: '11px',
        fontWeight: 400,
        color: '#9ca3af',
        fontFamily: 'DM Sans, sans-serif',
        marginTop: '4px',
      }}>
        {labelName}
      </div>
    </div>
  );
};

export default ChartTooltip;
