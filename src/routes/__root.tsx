import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router"

import appCss from "../styles.css?url"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Nigeria Personal PAYE Tax Calculator - NTA 2025",
      },
      {
        name: "description",
        content:
          "Calculate your Nigerian Personal Income Tax (PAYE) under the Nigeria Tax Act 2025. This is a personal tax calculator only with deductions for pension, NHF, NHIS, and rent relief.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),

  component: RootComponent,
})

function RootComponent() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>

      <body>
        <Outlet />

        <Scripts />
      </body>
    </html>
  )
}
