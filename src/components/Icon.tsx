type IconName = "home" | "search" | "plus" | "briefcase" | "shield" | "bell" | "menu" | "map" | "star" | "heart" | "message" | "user" | "cap" | "camera" | "clean" | "screen" | "globe";

export function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  const common = { className, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": true };
  const stroke = { stroke: "currentColor", strokeWidth: 1.9, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  return (
    <svg {...common}>
      {name === "home" && <path {...stroke} d="M3.5 11.5 12 4l8.5 7.5M5.5 10.5v8h13v-8M9.5 18.5v-5h5v5" />}
      {name === "search" && <path {...stroke} d="m20 20-4.4-4.4M18 10.8a7.2 7.2 0 1 1-14.4 0 7.2 7.2 0 0 1 14.4 0Z" />}
      {name === "plus" && <path {...stroke} d="M12 5v14M5 12h14" />}
      {name === "briefcase" && <path {...stroke} d="M8 7V5.8C8 4.8 8.8 4 9.8 4h4.4c1 0 1.8.8 1.8 1.8V7M4.5 8.5h15v10h-15v-10ZM4.5 12.5h15M10 12.5v1h4v-1" />}
      {name === "shield" && <path {...stroke} d="M12 21s7-3.4 7-10.2V5.5L12 3 5 5.5v5.3C5 17.6 12 21 12 21Z" />}
      {name === "bell" && <path {...stroke} d="M18 9.5c0-3.3-2.2-5.5-6-5.5S6 6.2 6 9.5c0 5-2 5.8-2 5.8h16s-2-.8-2-5.8ZM10 19h4" />}
      {name === "menu" && <path {...stroke} d="M4.5 7h15M4.5 12h15M4.5 17h15" />}
      {name === "map" && <path {...stroke} d="M12 21s6-5.2 6-10.5a6 6 0 0 0-12 0C6 15.8 12 21 12 21Z M12 12.7a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z" />}
      {name === "star" && <path {...stroke} d="m12 3 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7L6.8 19l1-5.8-4.2-4.1 5.8-.8L12 3Z" />}
      {name === "heart" && <path {...stroke} d="M20.3 8.7c0 4.7-8.3 9.3-8.3 9.3s-8.3-4.6-8.3-9.3A4.3 4.3 0 0 1 12 6.9a4.3 4.3 0 0 1 8.3 1.8Z" />}
      {name === "message" && <path {...stroke} d="M5 6h14v9H8l-3 3V6Z" />}
      {name === "user" && <path {...stroke} d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 20c1.1-3.3 3.6-5 7.5-5s6.4 1.7 7.5 5" />}
      {name === "cap" && <path {...stroke} d="m3 9 9-4 9 4-9 4-9-4ZM7 11v4.2c1.5 1.3 3.1 1.9 5 1.9s3.5-.6 5-1.9V11" />}
      {name === "camera" && <path {...stroke} d="M8.5 7.5 10 5h4l1.5 2.5H20v11H4v-11h4.5ZM12 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />}
      {name === "clean" && <path {...stroke} d="M14 4v5M10 9h8M12 9l-2 11h8L16 9M5 14l2 2m0-6-2 2m2 4-2 2" />}
      {name === "screen" && <path {...stroke} d="M4 5h16v11H4V5ZM9 20h6M12 16v4" />}
      {name === "globe" && <path {...stroke} d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3.5 12h17M12 3c2.2 2.4 3.2 5.4 3.2 9s-1 6.6-3.2 9M12 3C9.8 5.4 8.8 8.4 8.8 12s1 6.6 3.2 9" />}
    </svg>
  );
}
