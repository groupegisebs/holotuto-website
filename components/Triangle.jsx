import React from 'react'

// Triangle décoratif réutilisable
export default function Triangle({ className, size = 20, color = '#4CC3D6', opacity = 0.25 }) {
  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={{
        width: 0,
        height: 0,
        borderLeft: `${size}px solid transparent`,
        borderRight: `${size}px solid transparent`,
        borderBottom: `${size * 1.6}px solid ${color}`,
        opacity,
      }}
    />
  )
}
