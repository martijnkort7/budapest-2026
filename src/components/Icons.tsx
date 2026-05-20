import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

function Base({ size = 22, children, strokeWidth = 1.6, ...rest }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

/* --- Navigation icons (TabNav) --- */

export function IconHome(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3 11 12 3l9 8" />
      <path d="M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10" />
    </Base>
  );
}

export function IconCompass(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.6 8.4-2.4 5.4-5.4 2.4 2.4-5.4 5.4-2.4Z" />
    </Base>
  );
}

export function IconSatchel(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 8h16l-1 12.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 20.5L4 8Z" />
      <path d="M8 8V6a4 4 0 0 1 8 0v2" />
      <path d="M9 13h6" />
    </Base>
  );
}

/* --- Category icons (Explore) --- */

export function IconBurger(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3 11a9 9 0 0 1 18 0H3Z" />
      <path d="M3 14h18" />
      <path d="M4 18.5h16a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z" />
    </Base>
  );
}

export function IconBeer(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M7 5h8v15a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V5Z" />
      <path d="M15 8h2.5a2.5 2.5 0 0 1 0 5H15" />
      <path d="M10 9v8M13 9v8" />
    </Base>
  );
}

export function IconMartini(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 4h16l-8 8-8-8Z" />
      <path d="M12 12v8" />
      <path d="M8 20h8" />
    </Base>
  );
}

export function IconCamera(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
      <circle cx="12" cy="13" r="3.2" />
    </Base>
  );
}

/* --- Action icons --- */

export function IconAlarm(props: IconProps) {
  return (
    <Base {...props} strokeWidth={1.8}>
      <path d="M12 3v3" />
      <path d="m5.6 6.4 2.1 2.1" />
      <path d="M3 13h3" />
      <path d="M18 13h3" />
      <path d="m18.4 6.4-2.1 2.1" />
      <circle cx="12" cy="14" r="6" />
      <path d="M12 11v3l2 1" />
    </Base>
  );
}

export function IconChevronRight(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m9 6 6 6-6 6" />
    </Base>
  );
}

export function IconClose(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M6 6 18 18" />
      <path d="M18 6 6 18" />
    </Base>
  );
}

export function IconCopy(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" />
    </Base>
  );
}

export function IconRefresh(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3 12a9 9 0 0 1 15.6-6.2L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-15.6 6.2L3 16" />
      <path d="M3 21v-5h5" />
    </Base>
  );
}

export function IconArrowSwap(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 8h13" />
      <path d="m13 4 4 4-4 4" />
      <path d="M20 16H7" />
      <path d="m11 20-4-4 4-4" />
    </Base>
  );
}

export function IconMapPin(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </Base>
  );
}

export function IconFlame(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3c1.6 3.5 4.6 4.4 5.5 8a6 6 0 0 1-11 3.5C5 12 7 10 8 8c.5 2 1.6 2.7 2.8 1.7C12 8.4 11.4 6 12 3Z" />
    </Base>
  );
}

export function IconLightbulb(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M9 19h6" />
      <path d="M10 22h4" />
      <path d="M12 3a6 6 0 0 0-3 11.2V16h6v-1.8A6 6 0 0 0 12 3Z" />
    </Base>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m5 12 4.5 4.5L19 7" />
    </Base>
  );
}

export function IconSpark(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3v4" />
      <path d="M12 17v4" />
      <path d="M3 12h4" />
      <path d="M17 12h4" />
      <path d="m5.5 5.5 2.8 2.8" />
      <path d="m15.7 15.7 2.8 2.8" />
      <path d="m18.5 5.5-2.8 2.8" />
      <path d="m8.3 15.7-2.8 2.8" />
    </Base>
  );
}
