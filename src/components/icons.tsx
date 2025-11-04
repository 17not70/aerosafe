import type { SVGProps } from "react";

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z" fill="hsl(var(--primary))" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
      <path d="M12 22V12" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3" fill="hsl(var(--accent))" stroke="hsl(var(--background))" strokeWidth="1" />
    </svg>
  ),
  google: (props: SVGProps<SVGSVGElement>) => (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Google</title>
      <path
        fill="currentColor"
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.05 1.05-2.86 2.25-4.82 2.25-3.64 0-6.58-3.03-6.58-6.75s2.94-6.75 6.58-6.75c2.03 0 3.38.79 4.31 1.74l2.43-2.33C18.49.88 15.93 0 12.48 0 5.88 0 0 5.88 0 12s5.88 12 12.48 12c7.25 0 12.09-4.76 12.09-12.25 0-.76-.08-1.49-.2-2.25h-11.9z"
      />
    </svg>
  ),
};
