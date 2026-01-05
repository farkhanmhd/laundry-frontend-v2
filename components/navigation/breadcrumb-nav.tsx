"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Client } from "../utils/client";

export const BreadcrumbNav = () => {
  const pathname = usePathname();
  const splittedPathnames = pathname.split("/").filter((path) => path !== "");
  // 1. Generate the full data first (Label + Cumulative Href)
  const breadcrumbs = splittedPathnames.map((path, index) => {
    // Create the nested path: /segment1/segment2/segment3
    const href = `/${splittedPathnames.slice(0, index + 1).join("/")}`;

    return {
      label: path.split("-").join(" "), // Format: "my-orders" -> "my orders"
      href,
    };
  });

  // 2. Logic: Should we hide the middle items?
  const ITEMS_TO_SHOW = 2;
  const shouldTruncate = breadcrumbs.length > ITEMS_TO_SHOW;

  // 3. Get only the items we want to render
  const visibleBreadcrumbs = shouldTruncate
    ? breadcrumbs.slice(-ITEMS_TO_SHOW)
    : breadcrumbs;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Ellipsis Logic */}
        {shouldTruncate && (
          <>
            <BreadcrumbItem>
              {/* Optional: Link the ellipsis to the parent of the first visible item?
              For now, just a static ellipsis is standard. */}
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}

        {/* Render the visible items */}
        {visibleBreadcrumbs.map((item, index) => {
          const isLastItem = index === visibleBreadcrumbs.length - 1;

          return (
            <Fragment key={item.href}>
              <BreadcrumbItem>
                {isLastItem ? (
                  <BreadcrumbPage className="font-medium capitalize">
                    <Client>{item.label}</Client>
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link className="font-medium capitalize" href={item.href}>
                      <Client>{item.label}</Client>
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLastItem && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
