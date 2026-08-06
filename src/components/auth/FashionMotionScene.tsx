import { Box } from '@mui/material';
import { memo, type PointerEvent } from 'react';

import handbagAsset from '@assets/auth/fashion-motion/floating-handbag.svg';
import hangerAsset from '@assets/auth/fashion-motion/floating-hanger.svg';
import ribbonAsset from '@assets/auth/fashion-motion/floating-ribbon.svg';
import ringAsset from '@assets/auth/fashion-motion/floating-ring.svg';
import sneakerAsset from '@assets/auth/fashion-motion/floating-sneaker.svg';
import sunglassesAsset from '@assets/auth/fashion-motion/floating-sunglasses.svg';
import watchAsset from '@assets/auth/fashion-motion/floating-watch.svg';

type SceneVariant = 'login' | 'register';

type FloatingItem = {
  asset: string;
  alt: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  size: { xs: number; md: number; lg: number };
  depth: number;
  duration: number;
  delay: number;
  rotate: number;
  driftX: number;
  driftY: number;
  opacity?: number;
};

type FashionMotionSceneProps = {
  variant: SceneVariant;
};

const sceneItems: Record<SceneVariant, FloatingItem[]> = {
  login: [
    {
      asset: handbagAsset,
      alt: 'Decorative rose handbag',
      top: '12%',
      right: '10%',
      size: { xs: 92, md: 132, lg: 168 },
      depth: 1.25,
      duration: 10,
      delay: 0.1,
      rotate: -7,
      driftX: 10,
      driftY: 14,
    },
    {
      asset: sneakerAsset,
      alt: 'Decorative ivory sneaker',
      bottom: '15%',
      left: '9%',
      size: { xs: 118, md: 150, lg: 190 },
      depth: 1.45,
      duration: 12,
      delay: 0.7,
      rotate: 6,
      driftX: -10,
      driftY: 12,
    },
    {
      asset: sunglassesAsset,
      alt: 'Decorative sunglasses',
      top: '46%',
      right: '18%',
      size: { xs: 104, md: 134, lg: 160 },
      depth: 0.95,
      duration: 9,
      delay: 1.1,
      rotate: 4,
      driftX: 8,
      driftY: -10,
      opacity: 0.88,
    },
    {
      asset: watchAsset,
      alt: 'Decorative wristwatch',
      bottom: '3%',
      right: '7%',
      size: { xs: 76, md: 96, lg: 126 },
      depth: 0.75,
      duration: 13,
      delay: 1.6,
      rotate: -5,
      driftX: 7,
      driftY: 12,
      opacity: 0.74,
    },
    {
      asset: ribbonAsset,
      alt: 'Decorative fabric ribbon',
      top: '7%',
      left: '7%',
      size: { xs: 118, md: 152, lg: 190 },
      depth: 0.55,
      duration: 14,
      delay: 0.3,
      rotate: -12,
      driftX: 8,
      driftY: 8,
      opacity: 0.72,
    },
  ],
  register: [
    {
      asset: hangerAsset,
      alt: 'Decorative clothing hanger',
      top: '11%',
      left: '9%',
      size: { xs: 102, md: 142, lg: 178 },
      depth: 1.2,
      duration: 11,
      delay: 0.2,
      rotate: 8,
      driftX: 10,
      driftY: 12,
    },
    {
      asset: ringAsset,
      alt: 'Decorative jewelry ring',
      top: '36%',
      right: '12%',
      size: { xs: 76, md: 108, lg: 140 },
      depth: 1.4,
      duration: 9,
      delay: 0.8,
      rotate: -8,
      driftX: -9,
      driftY: 10,
    },
    {
      asset: sneakerAsset,
      alt: 'Decorative sneaker',
      bottom: '11%',
      right: '8%',
      size: { xs: 116, md: 146, lg: 184 },
      depth: 0.95,
      duration: 12,
      delay: 1,
      rotate: -5,
      driftX: 9,
      driftY: -12,
      opacity: 0.84,
    },
    {
      asset: handbagAsset,
      alt: 'Decorative handbag',
      bottom: '10%',
      left: '10%',
      size: { xs: 88, md: 120, lg: 150 },
      depth: 0.8,
      duration: 13,
      delay: 1.5,
      rotate: 6,
      driftX: -7,
      driftY: 12,
      opacity: 0.78,
    },
    {
      asset: ribbonAsset,
      alt: 'Decorative ribbon',
      top: '5%',
      right: '25%',
      size: { xs: 112, md: 146, lg: 180 },
      depth: 0.5,
      duration: 14,
      delay: 0.4,
      rotate: 11,
      driftX: -8,
      driftY: 8,
      opacity: 0.66,
    },
  ],
};

const particles = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  top: `${8 + ((index * 19) % 82)}%`,
  left: `${5 + ((index * 31) % 88)}%`,
  delay: `${(index % 6) * 0.65}s`,
  size: index % 4 === 0 ? 5 : 3,
}));

function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
  if (event.pointerType !== 'mouse') {
    return;
  }

  const bounds = event.currentTarget.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
  const y = (event.clientY - bounds.top) / bounds.height - 0.5;

  event.currentTarget.style.setProperty('--auth-parallax-x', x.toFixed(3));
  event.currentTarget.style.setProperty('--auth-parallax-y', y.toFixed(3));
}

function handlePointerLeave(event: PointerEvent<HTMLDivElement>) {
  event.currentTarget.style.setProperty('--auth-parallax-x', '0');
  event.currentTarget.style.setProperty('--auth-parallax-y', '0');
}

export const FashionMotionScene = memo(function FashionMotionScene({
  variant,
}: FashionMotionSceneProps) {
  const items = sceneItems[variant];
  const isRegister = variant === 'register';

  return (
    <Box
      aria-hidden="true"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      sx={{
        '--auth-parallax-x': '0',
        '--auth-parallax-y': '0',
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'auto',
        background: isRegister
          ? 'radial-gradient(circle at 72% 18%, rgba(221,160,170,0.26), transparent 26%), linear-gradient(135deg, #2a2e3a 0%, #171a22 54%, #8b505e 140%)'
          : 'radial-gradient(circle at 82% 24%, rgba(185,105,120,0.28), transparent 28%), linear-gradient(135deg, #10131b 0%, #232735 56%, #5b3b48 140%)',
        '@media (prefers-reduced-motion: reduce)': {
          '& .fashion-floating-item, & .fashion-particle': {
            animation: 'none !important',
            transform: 'translate3d(0,0,0) rotate(var(--item-rotate)) !important',
          },
        },
        '@keyframes fashionFloat': {
          '0%, 100%': {
            transform:
              'translate3d(calc(var(--px) * var(--depth) * 1px), calc(var(--py) * var(--depth) * 1px), 0) rotate(calc(var(--item-rotate) * 1deg)) scale(1)',
          },
          '50%': {
            transform:
              'translate3d(calc((var(--px) * var(--depth) + var(--drift-x)) * 1px), calc((var(--py) * var(--depth) + var(--drift-y)) * 1px), 0) rotate(calc((var(--item-rotate) + 3) * 1deg)) scale(1.018)',
          },
        },
        '@keyframes fashionParticle': {
          '0%, 100%': { opacity: 0.15, transform: 'translate3d(0, 0, 0)' },
          '50%': { opacity: 0.46, transform: 'translate3d(0, -10px, 0)' },
        },
      }}
    >
      {particles.map((particle) => (
        <Box
          key={particle.id}
          className="fashion-particle"
          sx={{
            position: 'absolute',
            top: particle.top,
            left: particle.left,
            width: particle.size,
            height: particle.size,
            borderRadius: particle.id % 3 === 0 ? 1 : '50%',
            bgcolor: particle.id % 2 === 0 ? 'rgba(247,230,216,0.76)' : 'rgba(221,160,170,0.6)',
            transform: particle.id % 3 === 0 ? 'rotate(45deg)' : undefined,
            animation: `fashionParticle ${10 + (particle.id % 5)}s ease-in-out ${particle.delay} infinite`,
          }}
        />
      ))}

      <Box
        sx={{
          position: 'absolute',
          width: { xs: 190, md: 280, lg: 360 },
          height: { xs: 190, md: 280, lg: 360 },
          borderRadius: '50%',
          right: { xs: -80, md: -70 },
          bottom: { xs: -76, md: -110 },
          bgcolor: 'rgba(247,230,216,0.08)',
          boxShadow: 'inset 0 0 0 1px rgba(247,230,216,0.08)',
        }}
      />

      {items.map((item) => (
        <Box
          key={item.asset}
          className="fashion-floating-item"
          component="img"
          src={item.asset}
          alt=""
          loading="lazy"
          sx={{
            '--px': 'calc(var(--auth-parallax-x) * 18)',
            '--py': 'calc(var(--auth-parallax-y) * 18)',
            '--depth': item.depth,
            '--drift-x': item.driftX,
            '--drift-y': item.driftY,
            '--item-rotate': item.rotate,
            position: 'absolute',
            top: item.top,
            right: item.right,
            bottom: item.bottom,
            left: item.left,
            width: item.size,
            opacity: item.opacity ?? 0.94,
            filter: 'drop-shadow(0 24px 38px rgba(0,0,0,0.28))',
            willChange: 'transform',
            animation: `fashionFloat ${item.duration}s ease-in-out ${item.delay}s infinite`,
            pointerEvents: 'none',
            display: { xs: item.depth < 0.75 ? 'none' : 'block', md: 'block' },
          }}
        />
      ))}
    </Box>
  );
});
