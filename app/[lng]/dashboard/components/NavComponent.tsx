import Link from "next/link";import React from "react";

export default function NavComponent({
  title,
  target,
  Icon,
  classes,
  disabled,
}: NavComponentProps) {
  const commonProps = {
    className: `flex content-center rounded-md bg-primary px-5 py-2 text-white text-center ${classes} ${
      disabled ? "cursor-not-allowed opacity-50" : "hover:opacity-70"
    }`,
    // style: {
    //   backgroundColor: "hsla(197, 100%, 34%, 1)",
    // }
  };
  return disabled ? (
    <span {...commonProps}>
      {title}
      {Icon && <Icon strokeWidth={1.5} className="ms-2 my-auto" />}
    </span>
  ) : (
    <Link href={target} prefetch={true} {...commonProps}>
      {title}
      {Icon && <Icon strokeWidth={1.5} className="ms-2 my-auto" />}
    </Link>
  );
}
